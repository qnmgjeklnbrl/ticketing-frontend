<template>
  <div class="admin-page-container">
    <SidebarComponent @changeComponent="changeComponent"></SidebarComponent>
    <div class="main-contents">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import SidebarComponent from "@/components/mypage/SidebarComponent.vue";
import MyCouponsComponent from "@/components/mypage/MyCouponsComponent.vue";
import MyReservationComponent from "@/components/mypage/MyReservationComponent.vue";


export default {
  components: {
    SidebarComponent,
    MyCouponsComponent,
    MyReservationComponent,
  },
  name: 'MyPage',
  data() {
    return {
      currentComponent: null,
    }
  },
  methods: {
    changeComponent(componentName) {
      if (componentName === 'MyCouponsComponent') {
        this.currentComponent = MyCouponsComponent;
      }
      else if (componentName === 'MyReservationComponent') {
        this.currentComponent = MyReservationComponent;
      }
    }
  }
}
</script>

<style scoped>

</style>
