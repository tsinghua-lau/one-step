<template>
  <div>
    <div class="main-content">
      <Motion :delay="100">
        <img src="../assets/status/404.png" class="noFound" alt="" />
      </Motion>
    </div>
  </div>
</template>

<script setup lang="ts">
import Motion from '../untils/motion';
import { getCurrentInstance, onMounted } from 'vue';

const instance = getCurrentInstance();
if (instance != null) {
  const _this = instance.appContext.config.globalProperties; //vue3获取当前this

  onMounted(() => {
    console.log(_this.$route.params);
  });
}
</script>

<style scoped lang="scss">
.main-content {
  width: 100%;
  height: 100%;
  .noFound {
    width: 50%;
  }
}
</style>
