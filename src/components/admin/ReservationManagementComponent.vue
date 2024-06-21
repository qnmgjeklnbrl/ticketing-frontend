<template>
  <div class="container mt-5">
    <div class="dropdown">
      <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {{ selectedCategoryName || '카테고리 선택' }}
      </button>
      <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
        <li v-for="category in performances" :key="category.id">
          <a class="dropdown-item" href="#" @click="updateSelectedCategoryName(category.name)">
            {{ category.name }}
          </a>
        </li>
      </ul>
    </div>
    <div>
      <ul style="display: block; padding: 0; list-style-type: none;">
        <li v-for="performance in performDetail" :key="performance.id" style="margin: 10px; padding: 10px; border: 1px solid #ccc; border-radius: 8px; cursor: pointer;" data-bs-toggle="modal" data-bs-target="#detailModal" @click="fetchSeatReservation(performance.id)">
          <div><strong>아티스트:</strong> {{ performance.artist }}</div>
          <div><strong>공연 시작 시간:</strong> {{ new Date(performance.startTime).toLocaleString('ko-KR') }}</div>
          <div><strong>공연 종료 시간:</strong> {{ new Date(performance.endTime).toLocaleString('ko-KR') }}</div>
          <div><strong>가격:</strong> {{ performance.price }}원</div>
        </li>
      </ul>
    </div>
    <div class="pagination-buttons">
      <button @click="clickPrevious()" :disabled="isFirstPage">
         <i class="fas fa-arrow-left"></i> 이전
      </button>
      <button @click="clickNext()" :disabled="isLastPage">
        다음 <i class="fas fa-arrow-right"></i>
      </button>
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
                  <span v-if="!seat.available" class="reservation-mark" @click="fetchMemberSeatReservation(seat.seatReservationId)" >X</span>
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
      memberSeatReservation: [],
      perfSearchDto: {
        perfId: null,
        title: null,
        button: "next",
        index: null,
        size: 5,

      },
      isFirstPage: true,
      isLastPage: false,
      idxInfo: {
        maxIdx: null,
        minIdx: null
      },
      


    };
  },
  mounted() {
    this.fetchCategories();
    this.fetchFirstAndLastIdx();
    
    
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
      axios.get(`${process.env.VUE_APP_API_URL}/perform/all`)
        .then(response => {
          this.performances = response.data;
          if (this.selectedCategoryName) {
            this.updateSelectedCategoryName(this.selectedCategoryName);
          }
        })
        .catch(error => {
          console.error('카테고리 리스트 가져오기 실패:', error);
        });
    },
    updateSelectedCategoryName(name) {
      this.selectedCategoryName = name;
      this.perfSearchDto.index = null;
      this.perfSearchDto.button = 'next';
      this.isFirstPage = true;
      this.isLastPage = false;
      
      const selectedPerformance = this.performances.find(performance => performance.name === name);
      if (selectedPerformance) {
        this.perfSearchDto.perfId = selectedPerformance.performanceId;
        this.fetchPerformances();
        this.fetchFirstAndLastIdx();
      } else {
        console.error('선택된 카테고리에 해당하는 공연이 없습니다.');
      }
    },
   async fetchPerformances() {
    try{
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/perform-detail/all`, this.perfSearchDto, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
        
        this.performDetail = response.data;
        console.log(this.performDetail);
        this.performDetail.sort((a, b) => b.id - a.id );
       
        if(this.performDetail[0].id === this.idxInfo.maxIdx && this.performDetail[this.performDetail.length-1].id === this.idxInfo.minIdx){
          console.log("1");
          this.isFirstPage = true;
          this.isLastPage = true;
        }
        
          
    }catch(error){
        console.error('공연 정보 가져오기 실패:', error);
    }
    },
    fetchSeatReservation(performanceDetailId){
        
        axios.get(`${process.env.VUE_APP_API_URL}/reservation/all/${performanceDetailId}`)
        .then(response => {
          this.seatReservation = response.data;
       
        })
        .catch(error => {
          console.error('좌석 예약 현황 가져오기 실패:', error);
        });
    },
    fetchMemberSeatReservation(seatReservationId){
       
        axios.get(`${process.env.VUE_APP_API_URL}/reservation/by-seat/${seatReservationId}`)
        .then(response => {
          this.memberSeatReservation = response.data;
       
        })
        .catch(error => {
          console.error('회원 예약 현황 가져오기 실패:', error);
        });
    },
    async clickPrevious() {
    // 이전 페이지 로직
    
      this.perfSearchDto.button = 'previous';
      this.perfSearchDto.index = this.performDetail[0].id ;
      await this.fetchPerformances();
      if(this.performDetail[0].id === this.idxInfo.maxIdx){
        this.isFirstPage = true;
        this.isLastPage = false;
      }else{
        this.isFirstPage = false;
        this.isLastPage = false;
      }
      
      
    },
    async clickNext() {
    // 다음 페이지 로직
    
      this.perfSearchDto.button = 'next';
      this.perfSearchDto.index = this.performDetail[this.performDetail.length-1].id ;
      await this.fetchPerformances();
      if(this.performDetail[this.performDetail.length-1].id === this.idxInfo.minIdx){
        this.isLastPage = true;
        this.isFirstPage = false;
      }else{
        this.isFirstPage = false;
        this.isLastPage = false;
      }
      
      
      
    },
    async fetchFirstAndLastIdx(){
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/perform-detail/get-idxinfo/${this.perfSearchDto.perfId}`)
        this.idxInfo = response.data;
        console.log(this.idxInfo);
        this.fetchPerformances();
      } catch (error) {
        console.error('첫 인덱스 가져오기 실:', error);
      }
      
    },
    
    
  }
})
</script>

<style scoped>
.seat-name {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid black; /* 테두 추가 */
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
.modal-dialog {
  width: fit-content;
  max-width: 100%;
}
.pagination-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-buttons button {
  padding: 10px 20px;
  background-color: #f8f9fa;
  border: 1px solid #ccc;
  border-radius: 10px;
  cursor: pointer;
  margin: 0 10px; /* 버튼 사이의 간격 */
}
.pagination-buttons button:disabled {
  color: #ccc;
  cursor: not-allowed;
}
</style>

