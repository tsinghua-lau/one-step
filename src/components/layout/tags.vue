<template>
    <div class="one-tags">
        <ul class="container">
            <TransitionGroup name="fade">
                <li v-for="(item, index) in tags" :key="item.path" @contextmenu.prevent="openMenu($event, item)" @click="changeTags(item)" :class="{ active: activeKey === item.name }">
                    <img src="@/assets/github.png" alt="" />
                    <span>{{ item.title }}</span>
                    <div class="close" @click.stop="closeTag(item)"><CloseOutlined /></div>
                    <div class="line"></div>
                </li>
            </TransitionGroup>
        </ul>
    </div>
    <ul v-show="visible" :style="{ left: left + 'px', top: top + 'px' }" class="contextmenu">
        <li @click="closeOhters">
            <column-width-outlined :style="{ fontSize: '16px', color: '#f55a00', verticalAlign: 'sub' }" />
            关闭其它
        </li>
        <li @click="closeCurrent">
            <CloseOutlined :style="{ fontSize: '16px', color: '#f55a00', verticalAlign: 'sub' }" />
            关闭当前
        </li>
        <li @click="reloadFn">
            <reload-outlined :style="{ fontSize: '16px', color: '#f55a00', verticalAlign: 'sub' }" />
            重载当前
        </li>
    </ul>
</template>
<script lang="ts" setup>
import router from '@/router/router';
import { CloseOutlined, ColumnWidthOutlined, ReloadOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store/index';
import { storeToRefs } from 'pinia';
import { useTheme } from '@/hooks/theme';
const { theme } = toRefs(useTheme());
const { activeKey, ROUTE_INFO } = storeToRefs(useStore());
const store = useStore();
const tags = ROUTE_INFO;
const visible = ref(false);
const top = ref(0);
const left = ref(0);
interface TwoDPoint {
    name: any;
}
const currentTabInfo = ref();

watch(
    () => visible.value,
    newValue => {
        if (newValue) {
            document.body.addEventListener('click', closeMenu);
        } else {
            document.body.removeEventListener('click', closeMenu);
        }
    }
);

const openMenu = (e, item) => {
    currentTabInfo.value = item.name;
    const x = e.pageX; //这个应该是相对于整个浏览器页面的x坐标，左上角为坐标原点（0,0）
    const y = e.pageY; //这个应该是相对于整个浏览器页面的y坐标，左上角为坐标原点（0,0）
    top.value = y;
    left.value = x;
    visible.value = true; //显示菜单
};

const reload = inject('reload');

const reloadFn = () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    reload();
};

const closeMenu = () => {
    visible.value = false; //关闭菜单
};

const closeOhters = () => {
    store.CLOSE_OHTERS(currentTabInfo.value);
};

const closeCurrent = () => {
    const index = store.ROUTE_INFO.findIndex(p => p.name === currentTabInfo.value);
    store.DEL_ROUTE_INFO(activeKey.value == currentTabInfo.value ? true : false, index);
};

const changeTags = (obj: any) => {
    store.changeActiveKey(obj);
    store.changeSelectedKeys([obj.name]);
    router.push({ path: `${obj.path}` });
};
const closeTag = (item: any) => {
    const index = store.ROUTE_INFO.findIndex(p => p.name === item.name);
    store.DEL_ROUTE_INFO(activeKey.value == item.name ? true : false, index);
};
</script>
<style lang="scss" scoped>
.one-tags {
    color: #000;
    height: 100%;
    margin: 5px 0px;

    .container {
        background: #ddd;
        height: 40px;
        padding: 8px 8px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        overflow: hidden;
        margin-bottom: 0;

        @keyframes goTag {
            0% {
                bottom: -32px;
            }
            100% {
                bottom: 0;
            }
        }
        @keyframes outTag {
            0% {
                bottom: 0;
            }
            100% {
                transform: translateY(-100px);
            }
        }
        .fade-enter-active {
            animation: goTag 0.15s 1 linear;
        }
        .fade-leave-to {
            animation: outTag 0.3s 1 linear;
        }
        li {
            position: relative;
            font-size: 12px;
            border-radius: 10px 10px 0 0;
            // flex-basis: 140px;
            display: inline-block;
            padding: 0 4px;
            display: flex;
            width: fit-content;
            align-items: center;
            z-index: 1;
            cursor: default;
            // animation: goTag 0.15s 1 linear;
            .fade-leave-to {
                animation: outTag 0.2s 1 linear;
            }

            img {
                width: 16px;
                height: 16px;
                margin-left: 10px;
                margin-right: 10px;
            }
            span {
                white-space: nowrap;
                text-align: center;
                // flex-basis: 140px;
            }

            .line {
                display: none;
                left: -1px;
                top: 6px;
                position: absolute;
                width: 1px;
                height: 20px;
                background: #909090;
            }

            .close {
                font-size: 10px;
                border-radius: 50%;
                cursor: pointer;
                font-weight: 100;
                width: 24px;
                height: 24px;
                text-align: center;
                display: flex;
                justify-content: center;
                align-items: center;
                &:hover {
                    background: #d0d0d0;
                }
            }
            &:hover {
                cursor: pointer;
            }
            &::before,
            ::after {
                position: absolute;
                content: '';
                width: 20px;
                height: 20px;
                border-radius: 50%;
                bottom: -4px;
                border: 5px solid transparent;
                border-top: 5px solid transparent;
                bottom: -5px;
            }
            &::before {
                left: -16px;
                transform: rotate(135deg);
            }

            &::after {
                right: -16px;
                transform: rotate(-138deg);
            }
        }
    }

    li.active {
        background: #fff;
        z-index: 2;

        &::before,
        &::after {
            position: absolute;
            content: '';
            width: 20px;
            height: 20px;
            border-radius: 50%;
            bottom: -4px;
            border: 5px solid transparent;
            border-top: 5px solid #fff;
        }
    }

    li + li:not(.active) .line {
        display: block;
    }

    li:hover:not(.active) {
        background: #ededed;

        .line {
            display: none !important;
        }

        &::before,
        &::after {
            border-top: 5px solid #ededed;
        }
    }

    li:hover + li {
        .line {
            display: none !important;
        }
    }
}
.contextmenu {
    margin: 0;
    background: #fff;
    z-index: 3000;
    position: fixed; //关键样式设置固定定位
    list-style-type: none;
    padding: 5px 0;
    border-radius: 4px;
    font-size: 12px;
    font-weight: 400;
    color: #333;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, 0.3);
}

.contextmenu li {
    margin: 0;
    padding: 7px 16px;
    cursor: pointer;
}
.contextmenu li:hover {
    background: #eee;
}
</style>
