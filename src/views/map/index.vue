<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import useCurrentInstance from '@/untils/useCurrentInstance';
import zhData from '@/assets/json/zh.json';

const { proxy } = useCurrentInstance();
let mapObj: any = null;
let massMarks: any = null;
let markObj: any = null;
let markList: any = [];
let satelliteLayer: any = null;
window._AMapSecurityConfig = {
    securityJsCode: '917efe6c9a96689c7af4d8f05dcfbc75',
};
onBeforeUnmount(() => {
    mapObj && (mapObj.destroy(), (mapObj = null));
});
onMounted(() => {
    initMap
        .then(map => {
            mapObj = map;
            proxy.$message.success('地图加载完毕');
            satelliteLayer = new AMap.TileLayer.Satellite();
            // markeMaker(map);
            // initMassMarks({ map });
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
                zoom: 5,
                center: [110.153576, 37.287459],
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

const markeMaker = (obj: any) => {
    let { map, handle } = obj;
    map ? map : (map = mapObj);
    if (handle === 'del') {
        if (markList.length) {
            map.remove(markList);
            markList.length = 0;
        }
        return;
    } else if (handle === 'add') {
        if (markList.length) return;
    }

    const marker = new AMap.Marker({
        icon: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png',
        position: [120.153576, 30.287459],
        offset: new AMap.Pixel(-13, -30),
    });
    marker.setLabel({
        offset: new AMap.Pixel(1, 1), //设置文本标注偏移量
        content: "<div class='info'>🏙️这里是杭州</div>", //设置文本标注内容
        direction: 'bottom', //设置文本标注方位
    });
    marker.setMap(map);
    markList.push(marker);
};

const initMassMarks = (obj: any) => {
    let { map, handle } = obj;
    map ? map : (map = mapObj);
    if (handle === 'del') {
        if (massMarks) {
            massMarks.clear();
            massMarks = null;
        }
        if (markObj) {
            map.remove([markObj]);
            markObj = null;
        }
        return;
    } else if (handle === 'add') {
        if (massMarks) return;
    }
    // 创建样式对象
    var styleObject = {
        url: '//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png', // 图标地址
        size: new AMap.Size(10, 15), // 图标大小
        anchor: new AMap.Pixel(5, 5), // 图标显示位置偏移量，基准点为图标左上角
    };

    massMarks = new AMap.MassMarks(zhData, {
        zIndex: 100, // 海量点图层叠加的顺序
        zooms: [3, 19], // 在指定地图缩放级别范围内展示海量点图层
        style: styleObject, // 设置样式对象
    });
    markObj = new AMap.Marker({ content: ' ', map: map });
    massMarks.on('mouseover', function (e) {
        markObj.setPosition(e.data.lnglat);
        markObj.setLabel({ content: `🚩${e.data.name}` });
    });
    massMarks.setMap(map);
};
</script>

<template>
    <div id="container">
        <div class="btn">
            <a-button type="primary" @click="mapObj.add(satelliteLayer)">添加卫星图</a-button>
            <a-button type="primary" danger @click="mapObj.remove(satelliteLayer)">删除卫星图</a-button>
            <br />
            <a-button type="primary" @click="markeMaker({ handle: 'add' })">添加点标记</a-button>
            <a-button type="primary" danger @click="markeMaker({ handle: 'del' })">删除点标记</a-button>
            <br />
            <a-button type="primary" @click="initMassMarks({ handle: 'add' })">加载海量点</a-button>
            <a-button type="primary" danger @click="initMassMarks({ handle: 'del' })">销毁海量点</a-button>
        </div>
    </div>
</template>

<style scoped lang="scss">
#container {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
    .btn {
        position: absolute;
        right: 10px;
        top: 10px;
        z-index: 99;
        button {
            margin: 5px;
        }
    }
    :deep(.amap-marker-label) {
        border: none;
    }
}
</style>
