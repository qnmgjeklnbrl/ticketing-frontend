<template>
  <div class="modal fade" id="reservationModal" tabindex="-1" aria-labelledby="reservationModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-fullscreen">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="reservationModalLabel">좌석 예약 현황</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          좌석을 선택 해주세요
          <table>
            <tr v-for="(rowSeats, index) in seatRows" :key="index">
              <td v-for="seat in rowSeats" :key="seat.id" @click="selectSeat(seat)">
                <span class="seat-name" :class="{ 'vip-seat': seat.grade === 'VIP' }">
                  {{ seat.seatName }}
                  <span v-if="!seat.available" class="reservation-mark" @click.stop="alertReservedSeat">X</span>
                </span>
              </td>
            </tr>
          </table>
          <div class="mt-3">
            <label for="couponSelect">쿠폰 선택:</label>
            <select id="couponSelect" v-model="selectedCoupon" class="form-select">
              <option :value="null">선택</option>
              <option v-for="coupon in coupons" :key="coupon.couponId" :value="coupon">{{ coupon.name }} ({{ coupon.percent * 100 }}% 할인)</option>
            </select>
          </div>
          <div class="mt-3">
            <h5>선택한 좌석: {{  selectedSeat?.seatName }}</h5>
          </div>
          <div class="mt-3">
            <h5>총 결제 금액: {{  totalPrice }}원</h5>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">닫기</button>
          <button type="button" class="btn btn-primary" @click="saveReserve()">예약하기</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import axios from 'axios';

export default {
  name: 'ReservationModalComponent',
  props: {
    seatRows: {
      type: Array,
      required: true
    },
    price: {
      type: Number,
      required: true
    }
   
  },
  watch: {
    selectedCoupon() {
      this.calculateTotalPrice();
    }
  },
  data() {
    return {
      selectedCoupon: null,
      totalPrice: 0,
      selectedSeat: null,
      
    };
  },
  setup() {
    const store = useStore();
    const member = computed(() => store.state.member);

    return {
      member
    };
  },
  mounted() {
    
    this.fetchCoupons();
  },
  methods: {
    fetchCoupons() {
      axios.get(`${process.env.VUE_APP_API_URL}/member-coupon/all/${this.member.memberId}`)
        .then(response => {
          this.coupons = response.data;
          
        })
        .catch(error => {
          console.error('쿠폰 조회 실패', error);
        });
    },
    fetchMemberSeatReservation(seatReservationId) {
      this.$emit('fetch-member-seat-reservation', seatReservationId);
    },
    selectSeat(seat) {
      if (!seat.available) {
        alert('이미 예약된 좌석입니다.');
        return;
      }
      this.selectedSeat = seat;
      this.totalPrice = this.price;
      
      this.calculateTotalPrice(seat.grade);
    },
    alertReservedSeat() {
      alert('이미 예약된 좌석입니다.');
    },
    calculateTotalPrice() {
      if (!this.selectedSeat) {
        this.totalPrice = 0;
        return;
      }
      axios.post(`${process.env.VUE_APP_API_URL}/reservation/price`, {
        price: this.price,
        grade: this.selectedSeat.grade,
        couponDiscount: this.selectedCoupon?.percent
      })
        .then(response => {
          this.totalPrice = response.data;
        })
        .catch(error => {
          console.error('가격 계산 실패', error);
        });
    },
    saveReserve() {
      
      
      if(this.selectedSeat == null) {
        alert('좌석을 선택해주세요');
        return;
      }
    axios.post(`${process.env.VUE_APP_API_URL}/reservation/save`, {
        memberId: this.member.memberId,
        seatReservationId: this.selectedSeat.seatReservationId,
        memberCouponId: this.selectedCoupon?.memberCouponId,
        totalPrice: this.totalPrice
      })
      .then(response => {
        console.log(response.data);
        alert('예약 완료');
        this.updateSeatStatus(this.selectedSeat.seatReservationId);
        this.fetchCoupons();
      })
      .catch(error => {
        console.error('예약 실패', error);
      });
    },
    updateSeatStatus(seatReservationId) {
      // seatRows 배열에서 해당 좌석을 찾아 available 상태를 false로 변경
      this.seatRows.forEach(row => {
        const seat = row.find(s => s.seatReservationId === seatReservationId);
        if (seat) {
          seat.available = false;
        }
      });
    }
  },

};
</script>

<style scoped>
.seat-name {
  position: relative;
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid black;
  text-align: center;
  line-height: 30px;
}
.vip-seat {
  background-color: yellow;
}
.reservation-mark {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: red;
  font-size: 20px;
}
.modal-dialog.modal-fullscreen {
  max-width: 100%;
}
</style>