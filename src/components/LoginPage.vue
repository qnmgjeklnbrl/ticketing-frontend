<template>
  <div class="container">
    <div class="d-flex align-items-center py-4 first">
      <main class="form-signin w-100 m-auto">
        <form>
          <h1 class="h3 mb-3 fw-normal">로그인 창</h1>

          <div class="form-floating">
            <input type="email" class="form-control" id="floatingInput" placeholder="name@example.com">
            <label for="floatingInput">이메일</label>
          </div>
          <div class="form-floating">
            <input type="password" class="form-control" id="floatingPassword" placeholder="Password">
            <label for="floatingPassword">비밀번호</label>
          </div>

          <div class="form-check text-start my-3">
            <input class="form-check-input" type="checkbox" value="remember-me" id="flexCheckDefault">
            <label class="form-check-label" for="flexCheckDefault">
              아이디 비번 기억
            </label>
          </div>
          <button class="btn btn-dark w-100 py-2" type="submit">로그인</button>
        </form>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LoginPage'
  // 여기에 필요한 데이터, 메소드 등을 추가합니다.
}
</script>

<style scoped>
/* Global Styles */
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}

/* Form Styles */
.form-signin {
  max-width: 400px;
  padding: 15px;
  margin: auto;
}

.form-floating {
  margin-bottom: 1rem;
}

/* Dropdown Styles */
.dropdown-menu {
  min-width: 8rem;
}

.dropdown-item {
  cursor: pointer;
}

/* Optional: Style for active item */
.dropdown-item.active {
  background-color: #e9ecef;
}

/* Optional: Style for dropdown toggle */
.dropdown-toggle {
  outline: none; /* Remove default focus style */
}

/* Optional: Style for form checkbox */
.form-check-input {
  margin-top: 0.3rem;
}

/* Optional: Style for 'Remember me' label */
.form-check-label {
  margin-bottom: 0;
}
</style>