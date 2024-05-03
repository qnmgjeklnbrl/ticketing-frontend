<template>
  <div class="container">
    <div class="row justify-content-start">
      <div class="col-md-4 mb-4" v-for="c in coupons" :key="c.coupon.couponId">
        <div class="card">
          <div class="card-body">
            <h5 class="card-title">{{ c.coupon.name }}</h5>
            <p class="card-text">할인률: {{ c.coupon.percent * 100 }}%</p>
            <p class="card-text">유효기간: {{ c.coupon.endDate }}</p>
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
  name: 'MyCouponsComponent',
  data() {
    return {
      coupons: [] // 쿠폰 데이터를 저장할 배열
    }
  },
  created() {
    // 컴포넌트가 생성될 때 쿠폰 데이터를 가져오는 메서드 호출
    this.getMyCoupons();
  },
  setup() {
    const member = computed(() => store.state.member);
    return {
      member
    }
  },
  methods: {
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
  }
};
</script>

<style scoped>
/* 추가적인 스타일링을 여기에 작성하세요 */
</style>
