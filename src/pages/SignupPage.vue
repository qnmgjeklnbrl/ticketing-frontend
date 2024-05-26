<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card">
          <div class="card-header">
            <h3 class="text-center">회원가입</h3>
          </div>
          <div class="card-body">
            <div class="form-group mb-3">
              <label for="username">사용자명</label>
              <input v-model="signUpDto.name" type="text" class="form-control" id="username"
                     placeholder="사용자명을 입력하세요">
            </div>
            <div class="form-group mb-3">
              <label for="email">이메일 주소</label>
              <input v-model="signUpDto.email" type="email" class="form-control" id="email"
                     placeholder="이메일 주소를 입력하세요">
            </div>
            <div class="form-group mb-3">
              <label for="password">비밀번호</label>
              <input v-model="signUpDto.password" type="password" class="form-control" id="password"
                     placeholder="��밀번호를 입력하세요">
            </div>
            <div class="form-group">
              <button @click="signUpRequest" type="submit" class="btn btn-dark btn-block">가입하기</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: 'SignupPage',
  data() {
    return {
      signUpDto: {
        name: null,
        email: null,
        password: null
      }
    }
  },
  methods: {
    signUpRequest() {
      axios.post(`${process.env.API_URL}/member/signup`, this.signUpDto)
          .then(response => {
            if (response.status === 200) {
              alert('회원가입 완료');
            }
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
    }
  }
}
</script>

<style scoped>

</style>
</style>