<script setup lang="ts">
import * as echarts from 'echarts';
import { echart1, echart2, echart3, echart4, echartInit5, echart6 } from './echart';
import _rawData from './data.json';
onMounted(() => {
    nextTick(() => {
        const op1 = echarts.init(document.getElementById('echart1') as HTMLDivElement);
        op1.setOption(echart1);
        const op2 = echarts.init(document.getElementById('echart2') as HTMLDivElement);
        op2.setOption(echart2);
        const op3 = echarts.init(document.getElementById('echart3') as HTMLDivElement);
        op3.setOption(echart3);
        const op4 = echarts.init(document.getElementById('echart4') as HTMLDivElement);
        op4.setOption(echart4);
        echartInit5(_rawData);

        const op6 = echarts.init(document.getElementById('echart6') as HTMLDivElement);
        op6.setOption(echart6);
        window.addEventListener('resize', () => {
            setTimeout(() => {
                op1.resize();
                op2.resize();
                op3.resize();
                op4.resize();
                op6.resize();
            }, 100);
        });
    });
});
</script>

<template>
    <div class="echarts-content">
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

<style lang="scss" scoped>
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
        height: 32vh;
    }
    .echarts-content {
        height: 100%;
    }

    .ant-row {
        margin-bottom: 18px;
    }
}
</style>
