<template>
  <div class="admin-page-container">
    <SidebarComponent @changeComponent="changeComponent"></SidebarComponent>
    <div class="main-contents">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>

<script>
import SidebarComponent from './SidebarComponent.vue';
import PerformanceManagementComponent from './PerformanceManagementComponent.vue';
import SeatManagementComponent from './SeatManagementComponent.vue';
import ReservationManagementComponent from './ReservationManagementComponent.vue';

export default {
  components: {
    SidebarComponent,
    PerformanceManagementComponent,
    SeatManagementComponent,
    ReservationManagementComponent
  },
  data() {
    return {
      currentComponent: null
    };
  },
  methods: {
    changeComponent(componentName) {
      if (componentName === 'PerformanceManagementComponent') {
        this.currentComponent = PerformanceManagementComponent;
      }
      else if (componentName === 'SeatManagementComponent') {
        this.currentComponent = SeatManagementComponent;
      }
      else if (componentName === 'ReservationManagementComponent') {
        this.currentComponent = ReservationManagementComponent;
      }
      // 다른 컴포넌트에 대한 조건 추가
    }
  }
}
</script>

<style>
.admin-page-container {
  display: flex; /* Flexbox를 사용하여 자식 요소들을 수평으로 배치 */
}

.sidebar-component { /* 클래스 이름이나 요소 선택자를 실제 사이드바 컴포넌트에 맞게 조정해야 할 수도 있습니다. */
  margin-right: 20px; /* 사이드바와 메인 컨텐츠 사이의 간격 */
}

.main-contents {
  flex-grow: 1; /* 남은 공간을 모두 차지하도록 설정 */
}
</style>
