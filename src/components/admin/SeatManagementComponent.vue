<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div cass="col-md-8">
        <h3>좌석 등록</h3>
        <hr>
        <form @submit.prevent="registerSeat">
          <div class="mb-3">
            <label for="rowInput" class="form-label">행 수</label>
            <input type="number" class="form-control mb-2" id="rowInput" v-model="row" required>
          </div>
          <div class="mb-3">
            <label for="colInput" class="form-label">열 수</label>
            <input type="number" class="form-control mb-2" id="colInput" v-model="col" required>
          </div>
          <button type="submit" class="btn btn-outline-secondary">등록</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { markRaw } from 'vue';

export default markRaw({
  name: 'SeatManagementComponent',
  data() {
    return {
      row: null,
      col: null
    };
  },
  methods: {
    registerSeat() {
      axios.post(`http://localhost:8080/seat/all?row=${this.row}&col=${this.col}`)
        .then(() => {
          alert('좌석이 성공적으로 등록되었습니다.');
        })
        .catch(error => {
          alert('좌석 등록 중 오류가 발생했습니다: ' + error);
        });
    }
  }
});
</script>

<style scoped>

h3 {
  color: #343a40; /* 제목 색상 변경 */
}
hr {
  border-top: 1px solid #dee2e6; /* 구분선 색상 변경 */
}
</style>