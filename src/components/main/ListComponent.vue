<template>
  <!-- 검색 창 -->
  <div class="row justify-content-center">
    <div class="col-md-2 mt-3 text-end">
      <div class="dropdown d-inline-block">
        <button @click="getPerfCategories" class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton"
                data-bs-toggle="dropdown" aria-expanded="false">
          {{ selectedCategory ? selectedCategory : '공연 카테고리 선택' }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li v-for="(category, index) in categories" :key="index">
            <a @click="selectCategory(category)" class="dropdown-item" href="#">{{ category.name }}</a>
          </li>
        </ul>
      </div>
    </div>
    <div class="col-md-8 mt-3 text-start">
      <form class="input-group">
        <input v-model="title" type="text" class="form-control rounded-start" placeholder="검색어를 입력하세요" aria-label="검색어를 입력하세요"
               aria-describedby="button-addon2">
        <button @click="getPerfDetails" class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">검색</button>
      </form>
    </div>
  </div>
  <!-- 검색 결과 리스트 -->
  <div class="album py-5">
    <div class="container">
      <div class="row row-cols-1 row-cols-sm-2 row-cols-md-4 g-3">
        <div v-for="i in infos" :key="i" class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top svg-container" width="100%" height="225"
                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                 preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"/>
            </svg>
            <div class="card-body">
              <p class="card-text overflow-hidden mb-0"><strong>{{ i.type }}</strong></p> <!-- 줄 구분을 위해 mb-1 클래스 추가 -->
              <p class="card-text overflow-hidden mb-0">{{ i.artist }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" @click="getRemainSeats(i.price, i.id)"
                          data-bs-toggle="modal" data-bs-target="#reservationModal">예매하기
                  </button> <!-- 가격 정보를 전달 -->
                </div>
                <small class="text-body-secondary">{{ i.price }}원</small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- 좌우 버튼 -->
  <div class="row mt-3">
    <div class="col text-center">
      <button id="prevButton" class="btn btn-secondary" @click="clickPrevious">이전</button>
      <button id="nextButton" class="btn btn-secondary" @click="clickNext">다음</button>
    </div>
  </div>

  <reservation-modal :seats="seats" :price="selectedPrice"/> <!-- price prop 추가 -->
</template>

<script>
import ReservationModal from './ReservationModal.vue';
import axios from "axios"; // 모달 컴포넌트 불러오기

export default {
  name: 'ListComponent',
  data() {
    return {
      categories: null,
      click: 0,
      infos: null,
      seats: null,
      selectedPrice: null, // 선택된 가격 정보 추가
      selectedCategory: null,
      button: 'next',
      index: 0,
      size: 5,
      perfId: null,
      title: null,
    }
  },
  mounted() {
    this.getPerfDetails();
  },
  methods: {
    getPerfDetails() {
      axios.post('http://localhost:8081/perform-detail/all', {
        button: this.button,
        index: this.index,
        size: this.size,
        perfId: this.perfId,
        title: this.title
      })
          .then(response => {
            this.infos = response.data;
            console.log(this.infos);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    getRemainSeats(price, id) { // 가격 정보를 전달하는 메서드로 수정
      this.selectedPrice = price; // 가격 정보 설정
      axios.get(`http://localhost:8081/reservation/available/${id}`)
          .then(response => {
            this.seats = response.data;
            console.log(this.seats);
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    getPerfCategories() {
      axios.get('http://localhost:8081/perform/all')
          .then(response => {
            this.categories = response.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    selectCategory(category) {
      this.perfId = category.performanceId;
      this.selectedCategory = category.name;
    },
    clickPrevious() {
      this.button = 'previous';
      this.index = this.infos[0].id;
      this.getPerfDetails();
      this.updateButtons();
      console.log(this.infos);
      console.log(this.button);
    },
    clickNext() {
      this.button = 'next';
      this.index = this.infos[this.infos.length - 1].id;
      this.getPerfDetails();
      this.updateButtons();
    },
    updateButtons() {
      if(this.infos == null && this.button === 'next') {
        document.getElementById('nextButton').disabled = true;
      } else {
        document.getElementById('nextButton').disabled = false;
      }

      if(this.infos == null && this.button == 'previous') {
        document.getElementById('prevButton').disabled = true;
      } else {
        document.getElementById('prevButton').disabled = false;
      }
    }
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
.input-group {
  width: 90%;
}
</style>
