<template>
    <div class="ani-box">
        <LottieAni :src="dataJson1" />
    </div>
    <div class="ani-box">
        <LottieAni :src="dataJson" />
    </div>

    <div class="ani-box">
        <RunSvg :fillColor="'#000'" :stroke="'red'" :lineWidth="10">
            <path
                d="M511.6 76.3C264.3 76.2 64 276.4 64 523.5 64 718.9 189.3 885 363.8 946c23.5 5.9 19.9-10.8 19.9-22.2v-77.5c-135.7 15.9-141.2-73.9-150.3-88.9C215 726 171.5 718 184.5 703c30.9-15.9 62.4 4 98.9 57.9 26.4 39.1 77.9 32.5 104 26 5.7-23.5 17.9-44.5 34.7-60.8-140.6-25.2-199.2-111-199.2-213 0-49.5 16.3-95 48.3-131.7-20.4-60.5 1.9-112.3 4.9-120 58.1-5.2 118.5 41.6 123.2 45.3 33-8.9 70.7-13.6 112.9-13.6 42.4 0 80.2 4.9 113.5 13.9 11.3-8.6 67.3-48.8 121.3-43.9 2.9 7.7 24.7 58.3 5.5 118 32.4 36.8 48.9 82.7 48.9 132.3 0 102.2-59 188.1-200 212.9 23.5 23.2 38.1 55.4 38.1 91v112.5c0.8 9 0 17.9 15 17.9 177.1-59.7 304.6-227 304.6-424.1 0-247.2-200.4-447.3-447.5-447.3z"
                p-id="5380"
            ></path>
        </RunSvg>
    </div>
    <SeamlessScroll ref="scroll" :data="listData" :class-option="classOption" class="warp">
        <ul class="item">
            <li v-for="(item, index) in listData" :key="index">
                <span class="title" v-text="item.title" />
            </li>
        </ul>
    </SeamlessScroll>
</template>

<script lang="ts" setup>
import LottieAni from '../../components/lottie/index.vue';
import dataJson1 from '@/assets/json/43108-business-team.json';
import dataJson from '@/assets/json/data.json';
import SeamlessScroll from '@/components/ReSeamlessScroll/index.vue';
const classOption = reactive({
    direction: 'top',
});
const listData = ref([
    {
        title: 'js 数据结构与算法之 Map_js中map数据结构---1---',
    },
    {
        title: 'js 数据结构与算法之 Map_js中map数据结构---2---',
    },
    {
        title: 'js 数据结构与算法之 Map_js中map数据结构---3---',
    },
    {
        title: 'js 数据结构与算法之 Map_js中map数据结构---4---',
    },
    {
        title: 'js 数据结构与算法之 Map_js中map数据结构---5---',
    },
    {
        title: 'js 数据结构与算法之 Map_js中map数据结构---6---',
    },
    {
        title: 'js 数据结构与算法之 Map_js中map数据结构---7---',
    },
    {
        title: 'js 数据结构与算法之 Map_js中map数据结构---8---',
    },
    {
        title: 'js 数据结构与算法之 Map_js中map数据结构---9---',
    },
]);
</script>
<style lang="scss">
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

.warp {
    height: 270px;
    width: 360px;
    margin: 0 auto;
    overflow: hidden;

    ul {
        list-style: none;
        padding: 0;
        margin: 0 auto;

        li,
        a {
            height: 30px;
            line-height: 30px;
            display: flex;
            justify-content: space-between;
            font-size: 15px;
        }
    }
}
</style>
