<template>
    <div class="ani-box">
        <LottieAni :src="dataJson1" />
    </div>
    <div class="ani-box">
        <LottieAni :src="dataJson" />
    </div>
    <div class="ani-box">
        <!-- <MukButton size="large" type="primary">我是测试组件</MukButton> -->
    </div>
</template>

<script lang="ts" setup>
import LottieAni from '../../components/lottie/index.vue';
import dataJson1 from '../../assets/43108-business-team.json';
import dataJson from '../../assets/data.json';
</script>
<style lang="scss" scoped>
.ani-box {
    width: 200px;
    height: 300px;
    border: 1px solid #ccc;
    border-radius: 20px;
    box-shadow: 0px 2px 2px 1px #abb3cf;
    transition: all 0.5s;
    margin-right: 30px;
    margin-bottom: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    float: left;
    &:hover {
        transform: scale(1.1);
    }
}
</style>
