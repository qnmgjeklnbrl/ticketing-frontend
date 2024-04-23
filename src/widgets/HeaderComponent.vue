<template>
  <div class="container">
    <header class="d-flex flex-wrap justify-content-center py-3 mb-4 border-bottom">
      <a @click="router().push('/')" class="d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none">
        <svg class="bi me-2" width="40" height="32"><use xlink:href="#bootstrap"/></svg>
        <img src="../assets/logo.png" alt="대체 문자" width="40px">
        <span class="fs-4">Ticketing</span>
      </a>
      <ul class="nav nav-pills">
        <li v-if="!member" class="nav-item"><button @click="router().push('/login')" class="nav-link">로그인</button></li>
        <li v-if="!member" class="nav-item"><button @click="router().push('/signup')" class="nav-link">회원가입</button></li>
        <li v-if="member" class="nav-item nav-link">{{member.name}}님 반갑습니다!</li>
        <li v-if="member" class="nav-item"><button @click="logout" class="nav-link">로그아웃</button></li>
        <li class="nav-item"><button @click="router().push('/mypage')" class="nav-link">마이페이지</button></li>
      </ul>
    </header>
  </div>
</template>


<script>
import {router} from "@/routes";
import {useStore} from "vuex";
import {computed} from "vue";
import store from "@/common/store/store";

export default {
  name: 'HeaderComponent',
  methods: {
    router() {
      return router
    },
    logout() {
      store.commit('setMember', null);
    }
  },
  setup() {
    const store = useStore();
    const member = computed(() => store.state.member);

    return {
      member,
    }
  },
  components: {}
}
</script>


<style scoped>
.nav-link {
  color: black;
}
</style>
