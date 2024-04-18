<template>
  <div>
    <h3>쿠폰 등록</h3>
    <form @submit.prevent="registerCoupon">
      <input type="text" v-model="couponName" placeholder="쿠폰 이름">
      <input type="number" v-model="percent" placeholder="할인율 (%)">
      <input type="number" v-model="quantity" placeholder="수량">
      <button type="submit">등록</button>
    </form>
    <ul>
      <li v-for="coupon in coupons" :key="coupon.id">
        이름: {{ coupon.name }}, 할인율: {{ coupon.discountRate }}%, 수량: {{ coupon.quantity }}
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      couponName: '',
      percent: null,
      quantity: null,
      coupons: []
    };
  },
  mounted() {
    this.fetchCoupons();
  },
  methods: {
    registerCoupon() {
      axios.post('http://localhost:8080/coupons', {
        name: this.couponName,
        discountRate: this.percent,
        quantity: this.quantity
      })
      .then(response => {
        alert('쿠폰이 등록되었습니다.');
        this.fetchCoupons(); // 쿠폰 등록 후 목록 새로고침
      })
      .catch(error => {
        alert('쿠폰 등록 실패: ' + error);
      });
    },
    fetchCoupons() {
      axios.get('http://localhost:8080/coupons')
      .then(response => {
        this.coupons = response.data;
      })
      .catch(error => {
        console.error('쿠폰 목록 가져오기 실패:', error);
      });
    }
  }
};
</script>

<style>

</style>