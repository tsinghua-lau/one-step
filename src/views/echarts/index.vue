<script setup lang="ts">
import * as echarts from 'echarts';
import { echart1, echart2, echart3, echart4, echartInit5, echart6 } from './echart';
import _rawData from './data.json';
onMounted(() => {
    nextTick(() => {
        echarts.init(document.getElementById('echart1') as HTMLDivElement).setOption(echart1);
        echarts.init(document.getElementById('echart2') as HTMLDivElement).setOption(echart2);
        echarts.init(document.getElementById('echart3') as HTMLDivElement).setOption(echart3);
        echarts.init(document.getElementById('echart4') as HTMLDivElement).setOption(echart4);
        echartInit5(_rawData);
        echarts.init(document.getElementById('echart6') as HTMLDivElement).setOption(echart6);
    });
});
</script>

<template>
    <div>
        <a-row :gutter="[16, 16]">
            <a-col :span="8">
                <a-card title="Card title1" :bordered="false">
                    <div id="echart1"></div>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="Card title2" :bordered="false">
                    <div id="echart2"></div>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="Card title3" :bordered="false">
                    <div id="echart3"></div>
                </a-card>
            </a-col>
        </a-row>
        <a-row :gutter="[16, 16]">
            <a-col :span="8">
                <a-card title="Card title4" :bordered="false">
                    <div id="echart4"></div>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="Card title5" :bordered="false">
                    <div id="echart5"></div>
                </a-card>
            </a-col>
            <a-col :span="8">
                <a-card title="Card title6" :bordered="false">
                    <div id="echart6"></div>
                </a-card>
            </a-col>
        </a-row>
    </div>
</template>

<style lang="scss">
#app {
    background-color: #eee;
    overflow: hidden;
    #echart1,
    #echart2,
    #echart3,
    #echart4,
    #echart5,
    #echart6 {
        width: 100%;
        height: 320px;
    }

    .ant-row {
        margin-bottom: 18px;
    }
}
</style>
