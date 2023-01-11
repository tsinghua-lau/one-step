import { defineStore } from "pinia";

/**
 * 这个 第一个参数main，也称为 id，是必要的，Pinia 使用它来将 store 连接到 devtools。
 * 将返回的函数命名为use...（更好的语义化） 是跨可组合项的约定，以使其符合你的使用习惯。
 */
export const useStore = defineStore("main", {
  state: () => {
    return {
      count: 0,
      list: [1, 2, 3, 4],
    };
  },
  /**
   * 用来封装计算属性 有缓存功能  类似于computed
   */
  getters: {
    getNum(state) {
      return `我是一个计数器${state.count}`;
    },

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
  },
});
