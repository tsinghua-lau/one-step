<script setup lang="ts">
import { message } from 'ant-design-vue';
import AMapLoader from '@amap/amap-jsapi-loader';
import useCurrentInstance from '@/untils/useCurrentInstance';
const { proxy } = useCurrentInstance();
window._AMapSecurityConfig = {
    securityJsCode: '917efe6c9a96689c7af4d8f05dcfbc75',
};

onBeforeMount(() => {});

onMounted(() => {
    initMap
        .then(map => {
            message.success('地图加载完毕');
            markeMaker(map);
        })
        .catch(error => {});
});

const initMap = new Promise<void>((resolve, reject) => {
    var map = AMapLoader.load({
        key: '003668f24c514d45f6f71f88d6829112',
        version: '1.4.15',
        plugins: [], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        AMapUI: {
            version: '1.1',
            plugins: [],
        },
        Loca: { version: '1.3.2' },
    })
        .then(AMap => {
            let map = new AMap.Map('container', {
                zooms: [4, 16],
                zoom: 8,
                center: [120.153576, 30.287459],
                viewMode: '3D',
                layers: [
                    //使用多个图层
                    // new AMap.TileLayer.Satellite(),
                    new AMap.TileLayer.RoadNet(),
                ],
            });

            resolve(map);
        })
        .catch(e => {
            console.log(e);
            reject(e);
        });
});

const markeMaker = (map: any) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const marker = new AMap.Marker({
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: [120.153576, 30.287459],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        offset: new AMap.Pixel(-13, -30),
    });
    marker.setMap(map);
};
</script>

<template>
    <div id="container"></div>
</template>

<style scoped lang="scss">
#container {
    width: 100%;
    height: 100%;
    overflow: hidden;
}
</style>
