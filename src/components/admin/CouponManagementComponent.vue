<template>
  <div class="container mt-4">
    <h3 class=" mb-3">쿠폰 등록</h3>
    <form @submit.prevent="registerCoupon" class="mb-4">
      <div class="mb-3">
        <input type="text" v-model="coupon.name" placeholder="쿠폰 이름" class="form-control">
      </div>
      <div class="mb-3">
        <input type="number" v-model="coupon.percent" placeholder="할인율 (%)" class="form-control">
      </div>
      <div class="mb-3">
        <input type="number" v-model="coupon.quantity" placeholder="수량" class="form-control">
      </div>
      <div class="mb-3">
        <label for="endDate">종료 날짜</label>
        <input type="date" v-model="coupon.endDate" class="form-control">
      </div>
      <button type="submit" class="btn btn-primary">등록</button>
    </form>
    <h3 class=" mb-3">쿠폰 목록</h3>
    <ul class="list-group">
      <li v-for="coupon in coupons" :key="coupon.id" class="list-group-item">
        이름: {{ coupon.name }}, 할인율: {{ coupon.percent }}, 수량: {{ coupon.quantity }}, 종료 날짜: {{ coupon.endDate }} 
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      coupon: {
        couponId: null,
        name: '',
        percent: null,
        endDate: null,
        quantity: null
      },
      coupons: []
    };
  },
  mounted() {
    this.fetchCoupons();
  },
  methods: {
    registerCoupon() {
      axios.post('http://localhost:8081/coupon/save', {
        name: this.coupon.name,
        percent : this.coupon.percent/100,
        quantity: this.coupon.quantity,
        endDate: this.coupon.endDate
      })
      .then(() => {
        alert('쿠폰이 등록되었습니다.');
        this.fetchCoupons(); // 쿠폰 등록 후 목록 새로고침
      })
      .catch(error => {
        alert('쿠폰 등록 실패: ' + error);
      });
    },
    fetchCoupons() {
      axios.get('http://localhost:8081/coupon/all')
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

<style scoped>
h3 {
  color: #000; /* 검은색으로 변경 */
}
div {
  font-family: 'Arial', sans-serif;
}

h3 {
  color: #333;
  margin-bottom: 20px;
}

form {
  margin-bottom: 20px;
}

input[type="text"],
input[type="number"],
input[type="date"] {
  padding: 8px;
  margin: 5px 0;
  box-sizing: border-box;
  border: 2px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #343a40;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #343a40;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  padding: 8px;
  margin-top: 5px;
  background-color: #f9f9f9;
  border: 1px solid #ddd;
  border-radius: 4px;
}
</style>
