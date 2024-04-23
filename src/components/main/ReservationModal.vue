<template>
  <div>
    <!-- 모달 -->
    <div class="modal fade" id="reservationModal" tabindex="-1" aria-labelledby="reservationModalLabel"
         aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-lg"> <!-- modal-lg 클래스 추가 -->
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="reservationModalLabel">좌석 예약하기</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body d-flex justify-content-between"> <!-- 좌우 정렬을 위해 justify-content-between 클래스 추가 -->
            <!-- 좌석 테이블 -->
            <div class="seat-table">
              <div class="seat-grid">
                <template v-for="(rowSeats, index) in seatRows" :key="index">
                  <div class="seat-row">
                    <div v-for="s in rowSeats" :key="s.seat.id" class="seat"
                         :class="{
                          'reserved': !s.available,
                          'selected': selectedSeat === s,
                          'vip': s.seat.grade === 'VIP' && s.available,
                          'dark-gold': s.seat.grade === 'VIP' && s.available && selectedSeat === s // VIP 자리인 경우 어두운 골드색
                          }"
                         @click="toggleSeat(s)">
                      <span v-if="!s.available" class="reservation-mark"></span>
                      {{ s.seat.name }}
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <!-- 우측 영역 -->
            <div class="reservation-info d-flex flex-column align-items-center justify-content-between"
                 style="width: 300px;"> <!-- 우측 영역의 너비 조절 및 정렬 수정 -->
              <!-- 쿠폰 선택 -->
              <div class="dropdown mb-3">
                <button class="btn btn-secondary dropdown-toggle" type="button" id="couponDropdown"
                        data-bs-toggle="dropdown" aria-expanded="false" @click="getMyCoupons()">
                  {{ selectedCoupon ? selectedCoupon.coupon.name : '쿠폰을 선택해주세요' }} <!-- 선택한 쿠폰 표시 -->
                </button>
                <ul class="dropdown-menu" aria-labelledby="couponDropdown">
                  <!-- 쿠폰 목록 -->
                  <li v-for="(c, index) in coupons" :key="index">
                    <a class="dropdown-item" href="#" @click="selectCoupon(c)">{{ c.coupon.name }}</a>
                  </li>
                </ul>
              </div>
              <!-- 총 가격 -->
              <div class="total-price mt-auto"> <!-- 하단에 표시되도록 수정 -->
                총 가격: {{ finalPrice === null ? updatePrice : finalPrice }} 원
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="initialModal" type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
            <button type="button" class="btn btn-dark" @click="reserveSeat">예약하기</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import {computed} from "vue";
import store from "@/common/store/store";

export default {
  name: 'ReservationModal',
  data() {
    return {
      selectedSeat: null,
      selectedCoupon: null, // 선택한 쿠폰
      coupons: null,
      updatePrice: null,
      finalPrice: null,
      id : 1
    };
  },
  setup() {
    const member = computed(() => store.state.member);
    return {
      member
    }
  },
  props: ['seats', 'price'],
  computed: {
    seatRows() {
      const rows = {};
      if (this.seats != null) {
        this.seats.forEach(s => {
          const rowChar = s.seat.name.charAt(0);
          if (!rows[rowChar]) {
            rows[rowChar] = [];
          }
          rows[rowChar].push(s);
        });
      }
      return Object.values(rows);
    }
  },
  methods: {
    toggleSeat(seat) {
      this.finalPrice = null;
      this.selectedSeat = (this.selectedSeat === seat) ? null : seat;
      if (seat.seat.grade === 'VIP') {
        this.updatePrice = this.price * 1.2;
      } else {
        this.updatePrice = this.price;
      }
    },
    reserveSeat() {
      if (this.selectedSeat && this.selectedSeat.available) {
        axios.post(`http://localhost:8081/reservation/save`, {
          memberId : this.member.memberId,
          seatReservationId : this.selectedSeat.seatReservationId,
          totalPrice : this.finalPrice,
          memberCouponId : this.selectedCoupon.memberCouponId,
        })
          .then(() => {
            alert("예약 성공");
            this.selectedCoupon = null;
          })
          .catch(error => {
            alert(error.response.data.message);
            console.error('Error fetching data:', error);
          });
      }
    },
    selectCoupon(c) {
      this.selectedCoupon = c;
      this.finalPrice = this.updatePrice * c.coupon.percent;
    },
    getMyCoupons() {
      axios.get(`http://localhost:8081/member-coupon/all/${this.member.memberId}`)
          .then(response => {
            this.coupons = response.data;
            console.log(this.coupons);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    initialModal() {
      this.selectedCoupon = null;
      this.finalPrice = null;
      this.updatePrice = null;
    },
  }
}
;
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
  cursor: pointer;
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

.modal-dialog {
  width: fit-content;
  max-width: 100%;
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

.vip {
  background-color: #ffc107;
}

.dark-gold {
  background-color: #7E6E41; /* 어두운 골드색 배경색 */
}
</style>
