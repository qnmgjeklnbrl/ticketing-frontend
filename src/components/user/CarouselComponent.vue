<template>

  <div id="concertCarousel" class="carousel slide" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#concertCarousel" data-bs-slide-to="0" class="active"
              aria-current="true"
              aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#concertCarousel" data-bs-slide-to="1"
              aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#concertCarousel" data-bs-slide-to="2"
              aria-label="Slide 3"></button>
    </div>

    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://via.placeholder.com/800x200" class="d-block w-100" alt="Concert 1">
        <div class="carousel-caption d-none d-md-block">
          <h5>콘서트 제목 1</h5>
          <p>콘서트 설명이 여기에 들어갑니다.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://via.placeholder.com/800x200" class="d-block w-100" alt="Concert 2">
        <div class="carousel-caption d-none d-md-block">
          <h5>콘서트 제목 2</h5>
          <p>콘서트 설명이 여기에 들어갑니다.</p>
        </div>
      </div>
      <div class="carousel-item">
        <img src="https://via.placeholder.com/800x200" class="d-block w-100" alt="Concert 3">
        <div class="carousel-caption d-none d-md-block">
          <h5>콘서트 제목 3</h5>
          <p>콘서트 설명이 여기에 들어갑니다.</p>
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
export default {
  name: 'CarouselComponent',
  data() {
    return {}
  },
  methods: {},
};
</script>

<style scoped>
#concertCarousel .carousel-item img {
  object-fit: cover; /* 이미지를 캐러셀 크기에 맞게 조절 */
  width: 100%;
  height: 400px;
}
</style>
