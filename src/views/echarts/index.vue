<script setup lang="ts">
import * as echarts from 'echarts';
import { echart1, echart2, echart3, echart4, echart5, echart6 } from './echart';
import _rawData from './data.json';
import useCurrentInstance from '@/untils/useCurrentInstance';

const { proxy } = useCurrentInstance();
var op1 = null;
var op2 = null;
var op3 = null;
var op4 = null;
var op5 = null;
var op6 = null;

const initAllEcharts = (): void => {
    nextTick(() => {
        if (op1) {
            op1.dispose();
            op2.dispose();
            op3.dispose();
            op4.dispose();
            op5.dispose();
            op6.dispose();
        }
        op1 = echarts.init(document.getElementById('echart1') as HTMLDivElement);
        op1.setOption(echart1);

        op2 = echarts.init(document.getElementById('echart2') as HTMLDivElement);
        op2.setOption(echart2);

        op3 = echarts.init(document.getElementById('echart3') as HTMLDivElement);
        op3.setOption(echart3);

        op4 = echarts.init(document.getElementById('echart4') as HTMLDivElement);
        op4.setOption(echart4);

        op5 = echarts.init(document.getElementById('echart5') as HTMLDivElement);
        op5.setOption(echart5(_rawData));

        op6 = echarts.init(document.getElementById('echart6') as HTMLDivElement);
        op6.setOption(echart6);

        window.addEventListener('resize', () => {
            echartsResize();
        });
    });
};

const echartsResize = (): void => {
    op1.resize();
    op2.resize();
    op3.resize();
    op4.resize();
    op5.resize();
    op6.resize();
};
onMounted(() => {
    initAllEcharts();
    proxy.$bus.on('initE', (item?: string) => {
        nextTick(() => {
            echartsResize();
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
        <a-row :gutter="[16, 16]" style="height: 50%">
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
        height: 100%;
    }
    .echarts-content {
        height: 100%;
    }

    .ant-row {
        height: 48%;
        &:first-child {
            margin-bottom: 18px;
        }
        .ant-col {
            height: 100%;
            .ant-card {
                height: 100%;
                :deep(.ant-card-body) {
                    height: calc(100% - 50px);
                }
            }
        }
    }
}
</style>
