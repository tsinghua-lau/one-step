import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import router from '@/router/router';

/**
 * 这个 第一个参数main，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。
 * 将返回的函数命名为use...（更好的语义化） 是跨可组合项的约定，以使其符合你的使用习惯。
 */
interface route {
    key?: string;
    path: string;
    title: string;
    name: string;
}
export const useStore = defineStore('main', {
    state: () => {
        return {
            count: 0,
            list: [1, 2, 3, 4],
            selectedKeys: ['echarts'],
            activeKey: 'echarts',
            ROUTE_INFO: [
                {
                    name: 'echarts',
                    path: '/echarts',
                    title: 'echarts',
                },
            ],
            userName: '',
        };
    },
    /**
     * 用来封装计算属性 有缓存功能  类似于computed
     */
    getters: {
        getNum(state) {
            return `我是一个计数器${state.count}`;
        },
        // getSelectedKeys(state) {
        //     return state.selectedKeys;
        // },

        //或者不使用state传递参数直接使用this
        //getNum(){
        //    return `我是一个计数器${this.count}`
        // }
    },
    /**
     * 编辑业务逻辑  类似于methods
     */
    actions: {
        changeState() {
            this.count = 123;
        },
        /**
         * 左侧菜单
         * @param arr
         */
        changeSelectedKeys(arr: any): void {
            this.selectedKeys = arr;
        },
        /**
         * header
         * @param obj
         */
        changeActiveKey(obj: any): void {
            this.activeKey = typeof obj == 'object' ? obj.name : obj;
        },
        /**
         *
         * @param name
         */
        changeUsername(name: string): void {
            this.userName = name;
        },

        /**
         * @param isCurrent
         * @param index
         */
        DEL_ROUTE_INFO(isCurrent?: boolean, index?: number): void {
            if (this.ROUTE_INFO.length === 1) {
                message.success('只剩一个啦~', 1);
                return;
            }
            alert(index);
            this.ROUTE_INFO.splice(index, 1);
            if (index === 0) {
                this.activeKey = this.ROUTE_INFO[0].name;
            }

            if (isCurrent && index !== 0) {
                this.activeKey = this.ROUTE_INFO[index - 1].name;
            }
            const obj = this.ROUTE_INFO.find(p => p.name === this.activeKey);
            if (obj) {
                router.push({ path: obj.path });
                this.selectedKeys = [obj.name];
            }
        },
        /**
         * @param obj
         *
         */
        ADD_ROUTE_INFO(obj: route): void {
            this.ROUTE_INFO.push(obj);
            this.changeActiveKey(obj);
            router.push({ path: obj.path });
        },
        /**
         * 关闭其它
         * @param currentTab
         */
        CLOSE_OHTERS(currentTab: string): void {
            this.ROUTE_INFO = this.ROUTE_INFO.filter(p => p.name == currentTab);
        },
        /**
         * 关闭当前
         * @param currentTab
         */
        CLOSE_CURRENT(currentTab: string): void {
            if (this.ROUTE_INFO.length === 1) {
                message.success('只剩一个啦~', 1);
                return;
            }
            const index = this.ROUTE_INFO.findIndex(p => p.name === currentTab);
            index !== -1 && this.ROUTE_INFO.splice(index, 1);
        },
    },
    persist: {
        enabled: true, // 开启数据缓存
        strategies: [
            {
                key: 'myuser', //存储key值
                storage: localStorage, // 默认是sessionStorage
                paths: ['selectedKeys', 'activeKey', 'userName', 'ROUTE_INFO'], //指定字段存储数据
            },
        ],
    },
});
