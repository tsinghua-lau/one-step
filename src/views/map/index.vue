<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader';
import useCurrentInstance from '@/untils/useCurrentInstance';
import zhData from '@/assets/json/zh.json';

const { proxy } = useCurrentInstance();
const isadd = ref(false);
let mapObj: any = null;
let massMarks: any = null;
let markObj: any = null;
let markList: any = [];
let satelliteLayer: any = null;
let polygon: any = null;
let province = null; // 行政区域图层
let provinceBorder = null; // 行政区域边界图层
let provinceOutside = null; // 行政区域外部遮罩图层
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
        plugins: ['AMap.DistrictLayer', 'AMap.DistrictSearch'], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
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

const handleAddSatelliteLayer = () => {
    mapObj?.add(satelliteLayer);
};

const handleRemoveSatelliteLayer = () => {
    mapObj?.remove(satelliteLayer);
};

const hollowOut = (handle: string, map?: any) => {
    map = map || mapObj;
    if (handle === 'del') {
        polygon && polygon.hide();
        province.hide(); // 行政区域图层
        map.remove(provinceBorder);
        provinceOutside.hide(); // 行政区域图层
        setMapCenterzoom([119.13, 33.53], 4);
        isadd.value = false;
        return;
    }
    if (handle === 'add' && isadd.value) {
        return;
    }
    isadd.value = true;

    setMapCenterzoom([119.13, 32.53], 7);
    function createMvMapPolygon(path: any[][], config = {}) {
        if (polygon) {
            polygon.show();
        } else {
            polygon = new AMap.Polygon({
                path: path,
                ...config,
            });
            map.add(polygon);
        }

        return polygon;
    }

    /**
     * 绘制多边形
     * @param {*} config
     * @returns
     */
    function createMvMapProvince(config: any = {}) {
        return new Promise((resolve, reject) => {
            province = null; // 行政区域图层
            provinceBorder = null; // 行政区域边界图层
            provinceOutside = null; // 行政区域外部遮罩图层
            let cityConfig = {
                codeName: '江苏省',
                code: '320000',
                citycode: '',
            };

            province
                ? province
                : (province = new AMap.DistrictLayer.Province({
                      zIndex: config.zIndex || 10,
                      adcode: [cityConfig.code],
                      depth: config.depth || 1,
                      zooms: config.zooms || [3, 20],
                      styles: {
                          fill:
                              config.fillFunction ||
                              function () {
                                  return config.fillColor || 'rgba(1,49,133,0)'; // 中国地级市填充色
                              },
                          'city-stroke': config.cityBorderColor || '#fff', // 中国地级市边界
                          'stroke-width': config.strokeWidth || 1, // 2.0
                          'province-stroke': 'cornflowerblue',
                          'county-stroke': config.countyBorderColor || 'rgba(255,255,255,0.3)', // 中国区县边界
                      },
                  }));
            province.setMap(map);
            // 实例化一个行政区查询实例

            const district = new AMap.DistrictSearch({
                extensions: 'all',
            });
            // 查询行政边界
            district.search(cityConfig.codeName, function (result: string, districtList: { districtList: { boundaries: any }[] }) {
                if (result !== 'complete') {
                    reject(districtList.districtList);
                    return;
                }
                const outer = [new AMap.LngLat(-360, 90, true), new AMap.LngLat(-360, -90, true), new AMap.LngLat(360, -90, true), new AMap.LngLat(360, 90, true)];
                const bounds = districtList.districtList[0].boundaries;

                // 行政边界描边
                if (config.provinceBorder) {
                    provinceBorder
                        ? provinceBorder
                        : (provinceBorder = bounds.map((item: any) => {
                              return new AMap.Polyline({
                                  path: item,
                                  strokeColor: config.provinceBorder.borderColor || '#fff',
                                  strokeWeight: config.provinceBorder.borderWeight || 2,
                                  zIndex: config.provinceBorder.zIndex || 50,
                              });
                          }));
                    map.add(provinceBorder);
                }

                // 外部遮罩
                if (config.provinceOutside) {
                    const pathArray = [outer];
                    pathArray.push.apply(pathArray, bounds);
                    provinceOutside = createMvMapPolygon(pathArray, {
                        strokeColor: config.provinceOutside.borderColor || '#fff',
                        strokeWeight: config.provinceOutside.borderWeight || 0,
                        fillColor: config.provinceOutside.fillColor || 'rgba(1,49,133,1)',
                        fillOpacity: config.provinceOutside.fillOpacity === undefined ? 1 : config.provinceOutside.fillOpacity,
                        bubble: config.provinceOutside.bubble,
                        zIndex: config.provinceOutside.zIndex || 999,
                    });
                }

                resolve({ province, provinceBorder, provinceOutside });
            });
        }).catch(e => {
            console.log(e);
        });
    }
    // return new Promise((resolve, reject) => {

    createMvMapProvince({
        code: '320000',
        depth: 2,
        // fillColor: 'rgba(241, 246, 250, 0.6)',
        cityBorderColor: '#6D91D8', // 中国地级市边界
        strokeWidth: 1,
        zooms: [4, 9],
        provinceOutside: {
            fillColor: 'rgba(241, 246, 250, 0.8)',
            // fillOpacity: 0.9
        },
        provinceBorder: {
            borderColor: '#6D91D8',
            borderWeight: 5,
        },
    });
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
    massMarks.on('mouseover', function (e: { data: { lnglat: any; name: any } }) {
        markObj.setPosition(e.data.lnglat);
        markObj.setLabel({ content: `🚩${e.data.name}` });
    });
    massMarks.setMap(map);
};

const setMapCenterzoom = (center: Array<number | string>, zoom: number) => {
    center ? center : (center = [116.397428, 39.90923]);
    mapObj.setCenter(center);
    mapObj.setZoom(zoom);
};
</script>

<template>
    <div id="container">
        <div class="btn">
            <a-button type="primary" @click="handleAddSatelliteLayer">添加卫星图</a-button>
            <a-button type="primary" danger @click="handleRemoveSatelliteLayer">删除卫星图</a-button>
            <br />
            <a-button type="primary" @click="markeMaker({ handle: 'add' })">添加点标记</a-button>
            <a-button type="primary" danger @click="markeMaker({ handle: 'del' })">删除点标记</a-button>
            <br />
            <a-button type="primary" @click="initMassMarks({ handle: 'add' })">加载海量点</a-button>
            <a-button type="primary" danger @click="initMassMarks({ handle: 'del' })">销毁海量点</a-button>

            <br />
            <a-button type="primary" @click="hollowOut('add', mapObj)">绘制省界</a-button>
            <a-button type="primary" danger @click="hollowOut('del', mapObj)">隐藏省界</a-button>
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
