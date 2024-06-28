<template>
  <!-- 검색 창 -->
  <div class="row justify-content-center">
    <div class="col-md-2 mt-3 text-end">
      <div class="dropdown d-inline-block">
        <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
          {{ selectedCategoryName || '카테고리 선택' }}
        </button>
        <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
          <li v-for="category in performances" :key="category.id">
            <a class="dropdown-item" href="#" @click="updateSelectedCategoryName(category.name)">
              {{ category.name }}
            </a>
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
        <div v-for="performance in performDetail" :key="performance.id" class="col">
          <div class="card shadow-sm">
            <svg class="bd-placeholder-img card-img-top svg-container" width="100%" height="225"
                 xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Placeholder: Thumbnail"
                 preserveAspectRatio="xMidYMid slice" focusable="false"><title>Placeholder</title>
              <rect width="100%" height="100%" fill="#55595c"/>
            </svg>
            <div class="card-body">
              <p class="card-text overflow-hidden mb-0"><strong>{{ performance.type }}</strong></p> <!-- 줄 구분을 위해 mb-1 클래스 추가 -->
              <p class="card-text overflow-hidden mb-0">{{ performance.artist }}</p>
              <div class="d-flex justify-content-between align-items-center">
                <div class="btn-group">
                  <button type="button" class="btn btn-sm btn-outline-secondary" @click="getRemainSeats(performance.price, performance.id)"
                          data-bs-toggle="modal" data-bs-target="#reservationModal">예매하기
                  </button> <!-- 가격 정보를 전달 -->
                </div>
                <small class="text-body-secondary">{{ performance.price }}원</small>
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
      <button id="prevButton" class="btn btn-secondary" @click="clickPrevious()" :disabled="isFirstPage">이전</button>
      <button id="nextButton" class="btn btn-secondary" @click="clickNext()" :disabled="isLastPage">다음</button>
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
      performances: [],
      click: 0,
      performDetail: [],
      seats: null,
      selectedPrice: null, // 선택된 가격 정보 추가
      selectedCategoryName: null,
      perfSearchDto: {
        perfId: null,
        title: null,
        button: "next",
        index: null,
        size: 5,
      },
      isFirstPage: true,
      isLastPage: false,
      idxInfo: {
        maxIdx: null,
        minIdx: null
      },
    }
  },
  mounted() {
    this.fetchCategories();
    this.fetchFirstAndLastIdx();
  },
  methods: {
    async fetchPerformances() {
      try{
      const response = await axios.post(`${process.env.VUE_APP_API_URL}/perform-detail/all`, this.perfSearchDto, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
        
        this.performDetail = response.data;
        console.log(this.performDetail);
        this.performDetail.sort((a, b) => b.id - a.id );
       
        if(this.performDetail[0].id === this.idxInfo.maxIdx && this.performDetail[this.performDetail.length-1].id === this.idxInfo.minIdx){
          console.log("1");
          this.isFirstPage = true;
          this.isLastPage = true;
        }
        
          
      }catch(error){
          console.error('공연 정보 가져오기 실패:', error);
      }
    },
    getRemainSeats(price, id) { // 가격 정보를 전달하는 메서드로 수정
      this.selectedPrice = price; // 가격 정보 설정
      axios.get(`${process.env.VUE_APP_API_URL}/reservation/available/${id}`)
          .then(response => {
            this.seats = response.data;
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    fetchCategories() {
      axios.get(`${process.env.VUE_APP_API_URL}/perform/all`)
          .then(response => {
            this.performances = response.data;
            if (this.selectedCategoryName) {
            this.updateSelectedCategoryName(this.selectedCategoryName);
          }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    },
    updateSelectedCategoryName(name) {
      this.selectedCategoryName = name;
      this.perfSearchDto.index = null;
      this.perfSearchDto.button = 'next';
      this.isFirstPage = true;
      this.isLastPage = false;
      
      const selectedPerformance = this.performances.find(performance => performance.name === name);
      if (selectedPerformance) {
        this.perfSearchDto.perfId = selectedPerformance.performanceId;
        this.fetchPerformances();
        this.fetchFirstAndLastIdx();
      } else {
        console.error('선택된 카테고리에 해당하는 공연이 없습니다.');
      }
    },
    selectCategory(category) {
      this.perfId = category.performanceId;
      this.selectedCategory = category.name;
    },
    async clickPrevious() {
      this.perfSearchDto.button = 'previous';
      this.perfSearchDto.index = this.performDetail[0].id;
      await this.fetchPerformances();
      if (this.performDetail[0].id === this.idxInfo.maxIdx) {
        this.isFirstPage = true;
        this.isLastPage = false;
      } else {
        this.isFirstPage = false;
        this.isLastPage = false;
      }
    },
    async clickNext() {
      this.perfSearchDto.button = 'next';
      this.perfSearchDto.index = this.performDetail[this.performDetail.length - 1].id;
      await this.fetchPerformances();
      if (this.performDetail[this.performDetail.length - 1].id === this.idxInfo.minIdx) {
        this.isLastPage = true;
        this.isFirstPage = false;
      } else {
        this.isFirstPage = false;
        this.isLastPage = false;
      }
    },
    
    async fetchFirstAndLastIdx(){
      try {
        const response = await axios.get(`${process.env.VUE_APP_API_URL}/perform-detail/get-idxinfo/${this.perfSearchDto.perfId}`)
        this.idxInfo = response.data;
        console.log(this.idxInfo);
        this.fetchPerformances();
      } catch (error) {
        console.error('첫 인덱스 가져오기 실:', error);
      }
      
    },
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
