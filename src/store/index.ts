import { defineStore } from 'pinia';

/**
 * 这个 第一个参数main，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。
 * 将返回的函数命名为use...（更好的语义化） 是跨可组合项的约定，以使其符合你的使用习惯。
 */
export const useStore = defineStore('main', {
    state: () => {
        return {
            count: 0,
            list: [1, 2, 3, 4],
            selectedKeys: ['1'],
            activeKey: '1',
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
         * @param arr
         */
        changeActiveKey(obj: any): void {
            this.activeKey = obj.key;
            this.changeSelectedKeys([obj.key]);
        },
        changeActiveKey2(key: string): void {
            this.activeKey = key;
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
