<template>
    <div class="album py-5">
      <div class="container">
        <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
          <div v-for="i in infos" :key="i" class="col">
            <div class="card shadow-sm">
              <svg class="bd-placeholder-img card-img-top svg-container" width="100%" height="225" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail" preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title><rect width="100%" height="100%" fill="#55595c"/></svg>
              <div class="card-body">
                <p class="card-text overflow-hidden">{{ i.info }}</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <button type="button" class="btn btn-sm btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#reservationModal">예매하기</button>
                  </div>
                  <small class="text-body-secondary">{{ i.price }}원</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

  <reservation-modal :seats="seats"/>
</template>

<script>
import ReservationModal from './ReservationModal.vue'; // 모달 컴포넌트 불러오기

export default {
  name: 'ListComponent',
  data() {
    return {
      click: 0,
      infos: [
        {
          info: "이 세계를 강타할 이동우가 돌아왔다!",
          price: 90000,
        },
        {
          info: "싱글 골퍼 김장군의 똥꼬쑈!",
          price: 100000,
        },
        {
          info: "이 세계를 강타할 이동우가 돌아왔다!",
          price: 200000,
        },
        {
          info: "싱글 골퍼 김장군의 똥꼬쑈!",
          price: 90000,
        }
      ]
    }
  },
  methods: {
  },
  components: {
    ReservationModal,
  }
};
</script>

<style scoped>
.overflow-hidden {
  height: 40px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
