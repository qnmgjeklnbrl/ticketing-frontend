<!-- Login.vue -->
<template>
    <div>
      <input v-model="username" placeholder="Username" />
      <input v-model="password" type="password" placeholder="Password" />
      <button @click="login">Login</button>
    </div>
</template>
  
  <script setup>
  import { ref } from 'vue';
  
  const username = ref('');
  const password = ref('');
  
  const login = () => {
    // 로그인 처리 로직을 여기에 작성하세요.
    console.log('로그인 버튼이 클릭되었습니다.');
  };
  </script>
  