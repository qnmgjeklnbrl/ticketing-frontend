<template>
  <div class="sidebar">
    <!-- 사이드바 로고 또는 타이틀 -->
    <div class="sidebar-header">
      <h3>Menu</h3>
    </div>

    <!-- 사이드바 메뉴 리스트 -->
    <ul class="list-unstyled components">
      <li class="active" @click="handleClick('PerformanceManagementComponent')">
        <a href="#" >공연 등록</a>
      </li>
      <li class="active" @click="handleClick('SeatManagementComponent')">
        <a href="#">좌석 등록</a>
      </li>
      <li class="active" @click="handleClick('ReservationManagementComponent')">
        <a href="#" >예약 현황</a>
      </li>
      <li>
        <a href="#">쿠폰 관리</a>
      </li>
     
    </ul>
  </div>

</template>

<script>

export default {
    name: 'SidebarComponent',
    methods: {
    handleClick(componentName) {
      this.$emit('changeComponent', componentName);
      
    }
  }

}
</script>

<style scoped>
* {
  text-decoration: none; /* 모든 글자의 밑줄 제거 */
}
.sidebar {

  
  text-decoration: none; /* a태그 밑줄 제거 */
  height: 100vh;
  width: 250px;
  left: 0;
  top: 0;
  background-color: #27292b; /* 배경색 변경 */
  overflow-x: hidden;
  padding-top: 20px;
  font-family: 'Roboto', sans-serif; /* 폰트 변경 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* 그림자 추가 */
  border-right: 1px solid #484e53;
  border-top-right-radius: 10px; /* 둥근 테두리 */
  border-bottom-right-radius: 10px;
}

.sidebar-header, .components {
  padding-left: 20px;
}

.sidebar-header {
  margin-bottom: 20px;
  border-bottom: 1px solid #484e53;
}

.sidebar-header h3 {
  color: #EAECEE; /* 헤더 글자 색상 변경 */
  font-size: 20px;
}

.components {
  font-size: 16px;
}

.list-unstyled {
  margin-bottom: 20px;
}

.list-unstyled a {
  color: #EAECEE; /* 링크 글자 색상 변경 */
  padding: 10px 15px;
  display: block;
  border-radius: 10px;
  margin: 5px 0;
  font-weight: 500; /* 글자 두께 조정 */
}

.list-unstyled a:hover {
  color: #34495E; /* 호버 시 배경색 변경 */
  padding-left: 30px; /* 좌측 패딩을 늘려서 들여쓰기 효과 */
}
</style>

