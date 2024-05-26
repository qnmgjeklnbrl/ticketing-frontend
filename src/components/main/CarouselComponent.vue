<template>
  <div id="concertCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button v-for="(coupon, index) in coupons" :key="index"
              type="button"
              :data-bs-target="'#concertCarousel'"
              :data-bs-slide-to="index"
              :class="{ active: index === 0 }"
              aria-label="Slide {{ index + 1 }}"
              :aria-current="index === 0 ? 'true' : null">
      </button>
    </div>
    <div class="carousel-inner">
      <div v-for="(coupon, index) in coupons" :key="index" class="carousel-item" :class="{ active: index === 0 }">
        <img src="https://via.placeholder.com/800x200" class="d-block w-100" alt="Concert 1">
        <div class="carousel-caption d-none d-md-block">
          <h5>{{ coupon.name }}</h5>
          <p>남은 수량: {{ coupon.quantity }}</p>
          <button @click="saveCoupon(coupon.couponId)" class="btn btn-dark">쿠폰 받기</button>
        </div>
      </div>
    </div>
    <button class="carousel-control-prev" type="button" data-bs-target="#concertCarousel" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#concertCarousel" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>


</template>
<script>
import axios from "axios";
import store from "@/common/store/store";
import {computed} from "vue";

export default {
  name: 'CarouselComponent',
  data() {
    return {
      coupons: null,
    }
  },
  mounted() {
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
      axios.get(`${process.env.API_URL}/coupon/all`)
          .then(response => {
            this.coupons = response.data;
            console.log(this.coupons);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    saveCoupon(couponId) {
      axios.post(`${process.env.API_URL}/member-coupon/save`, {
        memberId: this.member.memberId,
        couponId: couponId
      })
          .then(response => {
            this.coupons = response.data;
            alert("발급 성공");
            this.getMyCoupons();
          })
          .catch(error => {
            console.error('Error fetching data:', error);
            alert(error.response.data.message);
          });
    }
  },
};
</script>

<style scoped>
#concertCarousel .carousel-item img {
  object-fit: cover; /* 이미지를 캐러셀 크기에 맞게 조절 */
  width: 100%;
  height: 400px;
}
</style>
