<template>
    <CarouselComponent></CarouselComponent>
    <SearchComponent></SearchComponent>
    <ListComponent></ListComponent>
</template>

<script>
import CarouselComponent from "@/components/user/CarouselComponent.vue"
import SearchComponent from "@/components/user/SearchComponent.vue";
import ListComponent from "@/components/user/ListComponent.vue";

export default {
  name: 'MainPage',
  components: {
    CarouselComponent,
    SearchComponent,
    ListComponent
  },
  data() {
    return {
    }
  },
  methods: {
  },
};
</script>

<style scoped>
</style>
