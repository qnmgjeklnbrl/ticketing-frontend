<template>
    <HeaderComponent></HeaderComponent>
    <router-view></router-view>
    <FooterComponent></FooterComponent>
</template>

<script>
import HeaderComponent from "@/widgets/HeaderComponent.vue";
import FooterComponent from "@/widgets/FooterComponent.vue";

export default {
  name: 'App',
  components: {
    HeaderComponent,
    FooterComponent,
  }
}
</script>

<style>
::-webkit-scrollbar {
  display: none;
}
</style>
