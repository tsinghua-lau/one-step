import { defineStore } from 'pinia';
import { message } from 'ant-design-vue';
import router from '@/router/router';
/**
 * 这个 第一个参数main，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。
 * 将返回的函数命名为use...（更好的语义化） 是跨可组合项的约定，以使其符合你的使用习惯。
 */
interface route {
    key: string;
    path: string;
    title: string;
}
export const useStore = defineStore('main', {
    state: () => {
        return {
            count: 0,
            list: [1, 2, 3, 4],
            selectedKeys: ['1'],
            activeKey: '1',
            ROUTE_INFO: [
                {
                    key: '1',
                    path: '/echarts',
                    title: 'echarts',
                },
                {
                    key: '2',
                    path: '/map',
                    title: 'map',
                },
                {
                    key: '3',
                    path: '/list',
                    title: 'list',
                },
            ],
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
        //     debugger;
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
            this.activeKey = typeof obj == 'object' ? obj.key : obj;
        },

        /**
         * @param isCurrent
         *@param index
         */
        DEL_ROUTE_INFO(isCurrent?: boolean, index?: number): void {
            if (this.ROUTE_INFO.length === 1) {
                message.success('只剩一个啦~');
                return;
            }
            this.ROUTE_INFO.splice(index, 1);
            if (index === 0) {
                this.activeKey = this.ROUTE_INFO[0].key;
            }

            if (isCurrent && index !== 0) {
                this.activeKey = this.ROUTE_INFO[index - 1].key;
            }
            const obj = this.ROUTE_INFO.find(p => p.key === this.activeKey);
            if (obj) {
                router.push({ path: obj.path });
                this.selectedKeys = [obj.key];
            }
        },
        /**
         * @param obj
         *
         */
        ADD_ROUTE_INFO(obj: route): void {
            if (this.ROUTE_INFO.find(p => p.key === obj.key)) {
                return;
            } else {
                this.ROUTE_INFO.push(obj);
                this.changeActiveKey(obj);
                router.push({ path: obj.path });
            }
        },
    },
    persist: {
        enabled: true, // 开启数据缓存
        strategies: [
            {
                key: 'myuser', //存储key值
                storage: localStorage, // 默认是sessionStorage
                paths: ['selectedKeys', 'activeKey'], //指定字段存储数据
            },
        ],
    },
});
