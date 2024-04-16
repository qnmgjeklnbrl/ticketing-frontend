<template>
    <CarouselComponent></CarouselComponent>
    <ListComponent></ListComponent>
</template>

<script>
import CarouselComponent from "@/components/user/CarouselComponent.vue"
import ListComponent from "@/components/user/ListComponent.vue";

export default {
  name: 'MainPage',
  components: {
    CarouselComponent,
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
