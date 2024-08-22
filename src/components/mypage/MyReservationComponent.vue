<template>
  <div class="container">
    <div v-if="reservations.length > 0" class="row justify-content-start">
      <div class="col-md-4 mb-4" v-for="reservation in reservations" :key="reservation.id">
        <div class="card">
          <div class="card-body">
            <p class="card-text">아티스트: {{ reservation.performanceDetail.artist }}</p>
            <p class="card-text">시작 시간: {{ reservation.performanceDetail.startTime }}</p>
            <p class="card-text">끝나는 시간: {{ reservation.performanceDetail.endTime }}</p>
            <p class="card-text">좌석명: {{ reservation.seatName }}</p>
            <p class="card-text">좌석등급: {{ reservation.grade }}</p>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info" role="alert">
      예약한 공연이 없습니다.
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import api from '@/api';

export default {
  name: 'MyReservationComponent',
  setup() {
    const store = useStore();
    const reservations = ref([]);
    const member = store.state.member;

    const getMyReservations = async () => {
      try {
        const response = await api.get(`/reservation/all/by-member/${member.memberId}`);
        reservations.value = response.data;
        console.log(reservations.value);
      } catch (error) {
        console.error('예약 정보 가져오기 실패:', error);
        reservations.value = []; // 에러 발생 시 빈 배열로 설정
      }
    };

    onMounted(getMyReservations);

    return {
      reservations,
      member
    };
  }
};
</script>

<style scoped>
/* 추가적인 스타일링을 여기에 작성하세요 */
</style>