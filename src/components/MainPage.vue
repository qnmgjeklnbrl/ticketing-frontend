<template>
  메인페이지 입니다.

  <p> 현재 click : {{click}}</p>
  <button @click="change()">버튼눌러봐</button>
</template>

<script>
export default {
  name: 'MainPage',
  data() {
    return {
      click : 0,
    }
  },
  methods: {
    change() {
      this.click++;
    },
  },
  components: {
  }
}
</script>

<style scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>