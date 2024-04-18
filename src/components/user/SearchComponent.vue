<template>
    <div class="row">
        <div class="col-md-6 offset-md-3 mt-3">
          <form class="input-group">
            <input type="text" class="form-control rounded-start" placeholder="검색어를 입력하세요" aria-label="검색어를 입력하세요" aria-describedby="button-addon2">
            <button class="btn btn-outline-secondary rounded-end" type="button" id="button-addon2">검색</button>
          </form>
        </div>
    </div>
</template>

<script>
export default {
  name: 'SearchComponent',
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
