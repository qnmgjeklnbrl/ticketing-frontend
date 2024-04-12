<template>
    <CarouselComponent></CarouselComponent>
    <SearchComponent></SearchComponent>
    <ListComponent></ListComponent>
</template>

<script>
import CarouselComponent from "@/components/CarouselComponent.vue"
import SearchComponent from "@/components/SearchComponent.vue";
import ListComponent from "@/components/ListComponent.vue";

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
