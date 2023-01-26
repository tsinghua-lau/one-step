<template>
    <div class="one-tags">
        <ul class="container">
            <li v-for="(item, index) in tags" :key="item.path" @click="changeTags(item)" :class="{ active: activeKey === item.name }">
                <img src="@/assets/github.png" alt="" />
                <span>{{ item.title }}</span>
                <div class="close" @click.stop="closeTag(item)"><CloseOutlined /></div>
                <div class="line"></div>
            </li>
        </ul>
    </div>
</template>
<script lang="ts" setup>
import router from '@/router/router';
import { CloseOutlined } from '@ant-design/icons-vue';
import { useStore } from '@/store/index';
import { storeToRefs } from 'pinia';
debugger;

const { activeKey, ROUTE_INFO } = storeToRefs(useStore());
const store = useStore();
const tags = ROUTE_INFO;

const changeTags = (obj: any) => {
    store.changeActiveKey(obj);
    store.changeSelectedKeys([obj.name]);
    router.push({ path: `${obj.path}` });
};
const closeTag = (item: any) => {
    let index = store.ROUTE_INFO.findIndex(p => p.name === item.name);
    store.DEL_ROUTE_INFO(activeKey.value == item.name ? true : false, index);
};
</script>
<style lang="scss" scoped>
.one-tags {
    color: #000;
    height: 100%;
    height: 30px;
    margin: 5px 0px;

    .container {
        background: #ddd;
        height: 40px;
        padding: 8px 8px 0;
        box-sizing: border-box;
        display: flex;
        justify-content: flex-start;
        overflow: hidden;

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

            img {
                width: 16px;
                height: 16px;
                margin-left: 10px;
                margin-right: 10px;
            }
            span {
                white-space: normal;
                text-align: center;
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
</style>
