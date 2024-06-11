<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <h3>공연 카테고리 등록</h3>
        <hr>
        <div class="input-group mb-3">
          <input type="text" class="form-control" v-model="name" placeholder="카테고리 이름을 입력하세요" aria-label="카테고리 이름">
          <button class="btn btn-outline-secondary" type="button" @click="registerPerformanceCategory">카테고리 등록</button>
        </div>
        <!-- 부트스트랩 드롭다운 추가 -->
        <div class="dropdown">
          <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
            {{ perfbtnmsg }}
          </button>
          <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <li v-for="category in categories" :key="category.id">
              <a class="dropdown-item" href="#" @click.prevent="selectCategory(category.name); getPerformancedetail(category.id)">
                {{ category.name }}
              </a>
            </li>
          </ul>
        </div>
        <hr>
        <h3>개별 공연 등록</h3>
        <hr>
        <div class="mb-3">
          <input type="text" class="form-control mb-2" :placeholder="perfbtnmsg" aria-label="공연 ID" disabled>
          <input type="text" class="form-control mb-2" v-model="performanceDetailDto.artist" placeholder="아티스트 이름을 입력하세요" aria-label="아티스트 이름">
          <lavel>공연 시작 시간</lavel>
          <input type="datetime-local" class="form-control mb-2" v-model="performanceDetailDto.startTime" aria-label="공연 시작 시간">
          <lavel>공연 종료 시간</lavel>
          <input type="datetime-local" class="form-control mb-2" v-model="performanceDetailDto.endTime" aria-label="공연 종료 시간">
          <input type="number" class="form-control mb-2" v-model="performanceDetailDto.price" placeholder="가격을 입력하세요" aria-label="가격">
          <button class="btn btn-outline-secondary" type="button" @click="registerPerformanceDetail">공연 등록</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { markRaw } from 'vue';

export default markRaw({
  name: 'PerformanceManagementComponent',
  data() {
    return {
      name: '',
      categories: [] ,// 카테고리 리스트를 저장할 배열
      performanceDetails: [],
      perfbtnmsg :'카테고리 선택',
      performanceDetailDto: {
        performanceId: null,
        artist: '',
        startTime: null,
        endTime: null,
        price: null
      }
    };
  },
  mounted() {
    this.fetchCategories(); // 컴포넌트가 마운트될 때 카테고리 리스트를 가져옵니다.
  },
  methods: {
    fetchCategories() {
      axios.get(`${process.env.VUE_APP_API_URL}/perform/all`)
        .then(response => {
          this.categories = response.data; // 응답 데이터를 categories 배열에 저장
          console.log(this.categories)
        })
        .catch(error => {
          alert('카테고리 리스트 가져오기 실패:', error);
        });
    },
    registerPerformanceCategory() {
      axios.post(`${process.env.VUE_APP_API_URL}/perform/save`, { name: this.name })
        .then(() => {
          alert('성공적으로 카테고리를 등록했습니다.');
          this.fetchCategories(); // 카테고리 리스트를 다시 가져옵니다.
        })
        .catch(error => {
          alert('카테고리 등록 중 오류가 발생했습니다:', error);
        });
    },
    selectCategory(perfname) {
      this.perfbtnmsg = perfname;
    },
    getPerformancedetail(perfid){
      axios.get(`${process.env.VUE_APP_API_URL}/perform-detail/${perfid}`)
        .then(response=>{
          this.performanceDetails = response.data;
        })
        .catch(error => {
          console.log('카테고리별 공연디테일 불러오기 실패', error);
        })
    },
   registerPerformanceDetail(){
      this.performanceDetailDto.performanceId = this.categories.find(category => category.name === this.perfbtnmsg).performanceId;
      axios.post(`${process.env.VUE_APP_API_URL}/perform-detail/save`,{
        performanceId : this.performanceDetailDto.performanceId,
        artist : this.performanceDetailDto.artist,
        startTime : this.performanceDetailDto.startTime,
        endTime : this.performanceDetailDto.endTime,
        price : this.performanceDetailDto.price
      })
      .then(() => {
        alert('성공적으로 공연 디테일을 등록했습니다.');
      })
      .catch(error => {
        alert('공연 디테일 등록 중 오류가 발생했습니다:', error);
        console.log(this.performanceDetailDto);
        console.log(this.categories.find(category => category.name === this.perfbtnmsg).performanceId);
      });
  }
  },
});
</script>

<style>
/* 필요한 추가 스타일 */
 
</style>

