<template>
  <div class="container">
    <div class="row justify-content-startㅎ">
      <div class="col-md-4 mb-4" v-for="reservation in reservations" :key="reservation.id">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ reservation.seatReservation.performanceDetail.performance.name }}</h5>
            <p class="card-text">아티스트: {{ reservation.seatReservation.performanceDetail.artist }}</p>
            <p class="card-text">시작 시간: {{ reservation.seatReservation.performanceDetail.startTime }}</p>
            <p class="card-text">끝나는 시간: {{ reservation.seatReservation.performanceDetail.endTime }}</p>
            <p class="card-text">좌석명: {{ reservation.seatReservation.seat.name }}</p>
            <p class="card-text">좌석등급: {{ reservation.seatReservation.seat.grade }}</p>
            <p class="card-text">결제금액: {{ reservation.totalPrice }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {computed} from "vue";
import store from "@/common/store/store";
import axios from "axios";

export default {
  name: 'MyReservationComponent',
  data() {
    return {
      reservations: []
    }
  },
  created() {
    // 컴포넌트가 생성될 때 예약 데이터를 가져오는 메서드 호출
    this.getMyReservations();
  },
  setup() {
    const member = computed(() => store.state.member);
    return {
      member
    }
  },
  methods: {
    getMyReservations() {
      axios.get(`http://localhost:8081/reservation/${this.member.memberId}`)
          .then(response => {
            this.reservations = response.data;
            console.log(this.reservations);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
  }
};
</script>

<style scoped>
/* 추가적인 스타일링을 여기에 작성하세요 */
</style>
