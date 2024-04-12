<template>
  <div>
    <!-- 모달 -->
    <div class="modal fade" id="reservationModal" tabindex="-1" aria-labelledby="reservationModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reservationModalLabel">좌석 예약하기</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-flex justify-content-center">
            <!-- 좌석 예약 표시 -->
            <div class="seat-grid">
              <template v-for="(rowSeats, index) in seatRows" :key="index">
                <div class="seat-row">
                  <div v-for="seat in rowSeats" :key="seat.id" class="seat"
                       :class="{'reserved': seat.reserved, 'selected': selectedSeat === seat }"
                       @click="toggleSeat(seat)">
                    <span v-if="seat.reserved" class="reservation-mark"></span>
                    {{ seat.name }}
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" class="btn btn-dark" @click="reserveSeat">예약하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReservationModal',
  data() {
    return {
      selectedSeat : null,
      seats: [
        {id: 1, name: 'A1', reserved: false},
        {id: 2, name: 'A2', reserved: false},
        {id: 3, name: 'A3', reserved: true},
        {id: 4, name: 'A4', reserved: true},
        {id: 5, name: 'A5', reserved: false},
        {id: 6, name: 'A6', reserved: false},
        {id: 7, name: 'A7', reserved: false},
        {id: 8, name: 'A8', reserved: false},
        {id: 9, name: 'A9', reserved: false},
        {id: 10, name: 'A10', reserved: false},
        {id: 11, name: 'B1', reserved: false},
        {id: 12, name: 'B2', reserved: false},
        {id: 13, name: 'B3', reserved: false},
        {id: 14, name: 'B4', reserved: false},
        {id: 15, name: 'B5', reserved: false},
        {id: 16, name: 'B6', reserved: false},
        {id: 17, name: 'B7', reserved: false},
        {id: 18, name: 'B8', reserved: false},
        {id: 19, name: 'B9', reserved: false},
        {id: 20, name: 'B10', reserved: false},
        {id: 21, name: 'C1', reserved: false},
        {id: 22, name: 'C2', reserved: false},
        {id: 23, name: 'C3', reserved: false},
        {id: 24, name: 'C4', reserved: false},
        {id: 25, name: 'C5', reserved: false},
        {id: 26, name: 'C6', reserved: false},
        {id: 27, name: 'C7', reserved: false},
        {id: 28, name: 'C8', reserved: false},
        {id: 29, name: 'C9', reserved: false},
        {id: 30, name: 'C10', reserved: false},
        {id: 31, name: 'D1', reserved: false},
        {id: 32, name: 'D2', reserved: false},
        {id: 33, name: 'D3', reserved: false},
        {id: 34, name: 'D4', reserved: false},
        {id: 35, name: 'D5', reserved: false},
        {id: 36, name: 'D6', reserved: false},
        {id: 37, name: 'D7', reserved: false},
        {id: 38, name: 'D8', reserved: false},
        {id: 39, name: 'D9', reserved: false},
        {id: 40, name: 'D10', reserved: false},
        {id: 41, name: 'E1', reserved: false},
        {id: 42, name: 'E2', reserved: false},
        {id: 43, name: 'E3', reserved: false},
        {id: 44, name: 'E4', reserved: false},
        {id: 45, name: 'E5', reserved: false},
        {id: 46, name: 'E6', reserved: false},
        {id: 47, name: 'E7', reserved: false},
        {id: 48, name: 'E8', reserved: false},
        {id: 49, name: 'E9', reserved: false},
        {id: 50, name: 'E10', reserved: false}
      ]
    };
  },
  computed: {
    seatRows() {
      const rows = {};
      this.seats.forEach(seat => {
        const rowChar = seat.name.charAt(0);
        if (!rows[rowChar]) {
          rows[rowChar] = [];
        }
        rows[rowChar].push(seat);
      });
      return Object.values(rows);
    }
  },
  methods: {
    toggleSeat(seat) {
      this.selectedSeat = (this.selectedSeat === seat) ? null : seat;
    },
    reserveSeat() {
      if (this.selectedSeat && !this.selectedSeat.reserved) {
        // 좌석 예약 처리 코드
        console.log("Selected seat:", this.selectedSeat);
        // 여기서 API 호출을 통해 예약 처리를 수행할 수 있습니다.
        // API 요청 후 성공/실패 여부에 따라 UI를 업데이트할 수 있습니다.
        // 성공적으로 예약되면 모달을 닫고, 실패하면 사용자에게 알림을 표시할 수 있습니다.
      }
    }
  }
};
</script>

<style scoped>
.seat-grid {
  display: grid;
  gap: 5px; /* 각 좌석 간의 간격 조절 */
}

.seat-row {
  display: flex;
}

.seat {
  position: relative;
  width: 30px; /* 각 좌석의 너비 */
  height: 30px; /* 각 좌석의 높이 */
  background-color: #ddd; /* 기본 배경색 */
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 5px; /* 좌석 간의 간격 조절 */
  cursor : pointer;
  pointer-events: auto;

}

.selected {
  background-color: #aaa; /* 클릭된 좌석의 배경색 변경 */
}

.reserved {
  background-color: #aaa; /* 예약된 좌석 배경색 */
}

.reservation-mark {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 12px;
  height: 12px;
  background-color: transparent;
}

.reservation-mark:before,
.reservation-mark:after {
  content: '';
  position: absolute;
  width: 100%;
  height: 2px;
  background-color: red;
  top: 50%;
  left: 0;
}

.reservation-mark:before {
  transform: rotate(45deg);
}

.reservation-mark:after {
  transform: rotate(-45deg);
}

</style>
