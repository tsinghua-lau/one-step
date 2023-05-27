// jsx写法，这只能创建无状态的组件

import { ref } from 'vue';
import { message } from 'ant-design-vue';

import  './index.css';

// const renderDom = () => {
//   return (
//     <>

// <div class={['box',flg.value?'active':'']}>动态class</div>
// <div v-show={!flg.value}>雪见</div>
// { flg.value?<div>hellow tsx</div>:null}

// <input v-model={arr.value} />
//       <div>{v.value}</div>

// <input v-model={[str.value,['trim']]}/>

//      {
//               arr.value.map(v=>{
//                   return <div key="v">No.{v}</div>;
//               })
//             }
//              <div data-arr={arr}>1</div>
//              <div onClick={handleClick}>点击事件</div>
//     </>

//   );
// };
import { defineComponent } from 'vue';

type Props = {
    title?: string;
};

export default defineComponent({
    emits: ['acc'],
    props: {
        title: String,
    },

    setup(props: Props, { emit }) {
        const v = ref<string>('我是jsx写法');

        const arr = ref<string[]>(['1', '2', 'a']); // v-for

        const str = ref<string>(' abc ');

        const flg = ref<boolean>(true); // v-if or v-show

        const handleClick = (): void => {
            message.success('点击事件');
        };
        console.log(arr.value);

        const a = ref<string>('12');
        const myClick = () => {
            emit('acc', 'tsx传参');
            message.success('myClick!');
        };
        return () => (
            <>
                <div class={['box', flg.value ? 'active' : '']}>动态class</div>
                <div v-show={!flg.value}>雪见</div>
                {flg.value ? <div>hellow tsx</div> : null}

                <input type='text' v-model={v.value} />
                <div>{v.value}</div>

                <input type='text' v-model={[str.value, ['trim']]} />

                {arr.value.map(v => {
                    return <div key="v">No.{v}</div>;
                })}
                <div data-arr={arr}>1</div>
                <button  onClick={handleClick}>点击事件</button>
                <br />
                <button onClick={myClick}>点我触发emit</button>
            </>
        );
    },
    // render() {
    //     return renderDom();
    // },
});
