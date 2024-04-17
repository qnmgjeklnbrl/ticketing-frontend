<template>
  <div class="container mt-5">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {{ selectedCategoryName || '카테고리 선택' }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li v-for="category in performances" :key="category.id">
          <a class="dropdown-item" href="#" @click="fetchPerformances(category.performanceId)">
            {{ category.name }}
          </a>
        </li>
      </ul>
    </div>
    <div>
      <ul style="display: block; padding: 0; list-style-type: none;">
        <li v-for="performance in performDetail" :key="performance.id" style="margin: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 8px; cursor: pointer;" data-bs-toggle="modal" data-bs-target="#detailModal" @click="fetchSeatReservation(performance.performanceDetailId)">
          <div><strong>아티스트:</strong> {{ performance.artist }}</div>
          <div><strong>공연 시작 시간:</strong> {{ new Date(performance.startTime).toLocaleString('ko-KR') }}</div>
          <div><strong>공연 종료 시간:</strong> {{ new Date(performance.endTime).toLocaleString('ko-KR') }}</div>
          <div><strong>가격:</strong> {{ performance.price }}원</div>
        </li>
      </ul>
    </div>
  </div>
  <div class="modal fade" id="detailModal" tabindex="-1" aria-labelledby="detailModalLabel" aria-hidden="true">
    <div class="modal-dialog" >
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="detailModalLabel">공연 예약현황</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <table>
            <tr v-for="(rowSeats, index) in seatRows" :key="index">
              <td v-for="seat in rowSeats" :key="seat.id">
                <span class="seat-name" >
                  {{ seat.seatName }}
                  <span v-if="!seat.available" class="reservation-mark" @click="fetchMemberSeatReservation(seat.seatReservationId)">X</span>
                </span>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { markRaw} from 'vue';

export default markRaw({
  name: 'ReservationManagementComponent',
  data() {
    return {
      performances: [],
      performDetail: [],
      selectedCategoryName: null,
      selectedPerformance: null,
      seatReservation: [],
      memberSeatReservation: []
    };
  },
  mounted() {
    this.fetchCategories();
  },
  computed: {
    seatRows() {
      const rows = {};
      this.seatReservation.forEach(seat => {
        const rowChar = seat.seatName.charAt(0);
        if (!rows[rowChar]) {
          rows[rowChar] = [];
        }
        rows[rowChar].push(seat);
      });
      return Object.values(rows);
    }
  },
  methods: {
    fetchCategories() {
      axios.get('http://localhost:8080/perform/all')
        .then(response => {
          this.performances = response.data;
        })
        .catch(error => {
          console.error('카테고리 리스트 가져오기 실패:', error);
        });
    },
    fetchPerformances(performanceId) {
      this.selectedCategoryName = this.performances.find(category => category.performanceId === performanceId).name;
      axios.get(`http://localhost:8080/perform-detail/${performanceId}`)
        .then(response => {
          this.performDetail = response.data;
         
        })
        .catch(error => {
          console.error('공연 정보 가져오기 실패:', error);
        });
    },
    fetchSeatReservation(performanceDetailId){
        console.log("fetchSeatReservation 실행")
        axios.get(`http://localhost:8080/reservation/all/${performanceDetailId}`)
        .then(response => {
          this.seatReservation = response.data;
       
        })
        .catch(error => {
          console.error('좌석 예약 현황 가져오기 실패:', error);
        });
    },
    fetchMemberSeatReservation(seatReservationId){
        console.log(seatReservationId)
        axios.get(`http://localhost:8080/reservation/by-seat/${seatReservationId}`)
        .then(response => {
          this.memberSeatReservation = response.data;
       
        })
        .catch(error => {
          console.error('회원 예약 현황 가져오기 실패:', error);
        });
    }
    
  }
})
</script>

<style scoped>
.seat-name {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid black; /* 테두리 추가 */
  text-align: center;
  line-height: 30px; /* 세로 중앙 정렬 */
}

.reservation-mark {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: red;
  font-size: 20px;
}
</style>