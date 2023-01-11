<script setup lang="ts">
import { useStore } from '@/store/index';
import { getBookingList } from '@/api/index';
import { storeToRefs } from 'pinia';
import children from './children.vue';
import * as echarts from 'echarts';
import Parent from './parent.vue';
import useCurrentInstance from '../untils/useCurrentInstance';
const { proxy } = useCurrentInstance();

onMounted(() => {
    const myChart = echarts.init(document.getElementById('yyy') as HTMLElement);
    myChart.setOption({
        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
            type: 'value',
        },
        series: [
            {
                data: [820, 932, 901, 934, 1290, 1330, 1320],
                type: 'line',
                areaStyle: {},
            },
        ],
    });
});

const emit = defineEmits<{
    (e: 'change', id: number): void;
    (e: 'update', array: number[]): void;
}>();

//props 类型 方式一
//从它的参数中推导类型:
// const props = defineProps({
//   name: { type: String, required: true },
//   age: Number
// })

//props 类型方式二
// 通过泛型参数来定义 props 的类型
// const props = defineProps<{
//   name: string
//   age?: number
// }>()

//props 类型方式三 封装泛型
// interface Props {
//   name: string
//   age?: number
// }

// const props = defineProps<Props>()

// props 类型 定义默认值
// 方式一
// interface Props {
//   mydata: object;
// }
// const props = withDefaults(defineProps<Props>(), {
//   mydata: () => {
//     return {a:1};
//   },
// });

// 方式二
const props = withDefaults(
    defineProps<{
        name: string;
        title?: string;
        nums: number[];
    }>(),
    {
        title: '测试标题',
        nums: () => [10, 20, 30, 40, 50],
    }
);

const { title, nums } = toRefs(props);

//emit使用
// const change = () => {

//   emit("change", 123);
//   emit("update", []);
// };
const change = (): void => {
    emit('change', 123);
    emit('update', []);
};

const onMitt = () => {
    //发送
    proxy.$bus.$emit('currentRoute', '哈哈'); //发送当前路由信息
};
const fun7 = <T>(x: T, y: T): T[] => {
    return [x, y];
};

fun7<string>('a', 'b');

// ref类型 方式一
const initCode = ref<string | number>('123');

// ref类型 方式二
interface User {
    name: string;
    age: string | number;
}

const user = ref<User>({
    name: '前端开发爱好者',
    age: '',
});

//ref类型 方式三
const initCode2: Ref<string | number> = ref('200');

//ref类型 定义数组
let list1 = ref<number[]>([1, 2, 3]);
let list2 = ref<string[]>(['1', '2', 'a']);
let list3 = ref<any[]>([
    1,
    true,
    'abc',
    {
        id: 2,
    },
]);

let list4 = ref<Array<string>>(['历史', '地理', '生物']);
let list5 = ref<Array<number | string>>(['dasahk', 10]);

let list6 = ref<(number | string | boolean)[]>(['hasd', true, 36]);

//ref 定义布尔类型
let isAdult = ref<boolean>(false);

//ref 定义数字
let age = ref<number>(17);
age.value--;
//ref  any
let sim = ref<any>('seven');

//元组类型 Tuple
//元组类型允许表示一个已知元素数量和类型的数组，各元素的类型不必相同，且数组各项类型与定义一一对应。元组的长度和类型不可变：
// let arr1 = ref<[number, string]>([8, "haode"]);
// let arr1 = ref<[number, string]>(["haode", 10]); //错误

// 声明一个void类型的变量没什么大用，只能赋予undefined和 null两种值
let unusable: void = undefined;

//但是我们通常在定义函数的时候用它，当一个函数没有返回值时，你通常会见到其返回值类型是void
const warnUser = (x: number, y: number): void => {
    console.log('This is my warning message');
    if (x > y) {
        console.log('x>y');
    } else {
        console.log('x<y');
    }
};

// Null 和Undefined
// 默认情况下Null 和Undefined是所有类型的子类型。 就是说你可以把 Null 和Undefined赋值给number类型的变量
// undefind类型
let u = undefined;

// null类型
let n = null;

// 表示永远不会存在值的类型，常用来定义抛出异常或根本就不会有返回值的函数
// never 类型是任何类型的子类型，也可以赋值给任何类型；没有类型是never的子类型或者可以赋值给类型（除了never本身）
// never 和 void 之间的区别是void 意味着至少要返回一个 undefined 或者 null ，而 never 意味着不会正常执行到 函数的终点
// 返回never的函数必须存在无法达到的终点
const error = (message: string): never => {
    throw new Error(message);
};

const infiniteLoop = (): never => {
    while (true) {}
};
// 推断的返回值类型为never
const fail = () => {
    return error('Something failed');
};

// Object 类型
// object 表示非原始类型，也就是除number，string，boolean，symbol,null或者undefined之外的类型，使用object类型，就可以更好的表示想Object.create这样的API
const create = (o: object | null): void => {};

create({
    prop: 0,
}); // OK
create(null); // OK

// create(42); // Error
// create("string"); // Error
// create(false); // Error
// create(undefined); // Error

// 类型断言
// 类型断言好比其它语言里的类型转换，但是不进行特殊的数据检查和解构。 它没有运行时的影响，只是在编译阶段起作用。
let someValue1: any = 'this is a string';
let strLength1: number = (<string>someValue1).length;

// 另一个为 as 语法：
let someValue: any = 'this is a string';
let strLength: number = (someValue as string).length;

// 类型别名 type

type abc = string | number[];
type n = number;

let n1: abc;
n1 = '4';
n1 = [1];

const fn1 = (str: abc): n => {
    return str.length;
};
fn1('a');

//  接口继承接口
// 二维坐标接口
interface TwoDPoint {
    x: number;
    y: number;
}
//三维坐标中的z坐标接口
interface ThreeDPoint {
    z: number;
}

//四维坐标接口继承了二维坐标接口的x，y坐标和三维接口的z坐标
interface FourDPoint extends ThreeDPoint, TwoDPoint {
    //内还定义了四维坐标独有的时间坐标
    time: Date;
}
//实例化四维坐标接口
const poi2 = reactive<FourDPoint>({
    z: 100,
    x: 200,
    y: 300,
    time: new Date(),
});
console.log(poi2, 'poi2'); //Proxy对象{{z: 100,x: 200,y: 300,time: Mon Oct 11 2021 15:29:15 GMT+0800 (中国标准时间)}}

// 泛型（Generics）是指在定义函数、接口或类的时候，不预先指定具体的类型，而在使用的时候再指定类型的一种特性。
// 写法是 <变量类型> 泛型变量 T ，T 表示任何类型,也可以用其他字母代替
function declaration<T>(x: T, y: T): T[] {
    return [x, y];
}

//函数表达式方式
const expression = <T>(n1: T, n2: T): T[] => {
    return [n1, n2];
};

//使用
// 单类型
console.log(declaration<string>('1', '2')); //['1','2']
console.log(expression<boolean>(true, false)); //[true,false]
console.log(expression<number>(6, 7)); //[6,7]

//联合类型
console.log(expression<number | string>(6, 'a')); //[6,"a"]

//当我们不给传类型的时候，类型推断编译器会自动的帮我们判断传入的是什么类型,此时传入的数据只能为单一类型
console.log(expression(1, 23)); //[1,23]

//泛型的约束
//错误示范 求变量的长度
// let variable1 = <T>(str: T): number => {
//   return str.length;     // T是变量，未指定类型，未必会有length这个属性
// };
//修改：
// 给参数限制类型
let limit1 = <T>(str: string | T[]): number => {
    return str.length;
};
console.log(limit1<number>([1, 3])); //2

//或者给泛型变量添加约束 extends
let limit2 = <T extends string>(arr: T): number => {
    return arr.length;
};
console.log(limit2<string>('one')); //3

//泛型的接口约束：就是让这个变量必须有length属性,此时就限定了变量类型有length属性，只能为string ，或者数组类型
interface ILengthNum {
    length: number;
}
const limit3 = <T extends ILengthNum>(str: T): number => {
    return str.length;
};
console.log(limit3<string>('oneworld')); //8
console.log(limit3<string[]>(['dasjd', 'dhksah', 'dahskdha'])); //3
console.log(limit3<number[]>([12, 456, 79, 465])); //4

//多个类型参数
const multi = <N, S>(sum: [N, S]): [S, N] => {
    return [sum[1], sum[0]]; //实现的是交换数组内两项的位置
};
console.log(multi<number, string>([1, 'one'])); //["one",1]

//reactive类型 方式一

type obj = {
    name: string;
    age: number;
};

const data = reactive<obj[]>([
    {
        name: '奇异',
        age: 18,
    },
    {
        name: '灵儿',
        age: 19,
    },
]);

//reactive类型 方式二
interface User {
    name: string;
    age: string | number;
}

const user2: User = reactive({
    name: '前端开发爱好者',
    age: '20',
});

//reactive类型 方式三
interface User {
    name: string;
    age: string | number;
}

const user3 = reactive<User>({
    name: '前端开发爱好者',
    age: '20',
});

//枚举类型
enum Color {
    red,
    blue,
    green,
}

// 取索引
let c1 = ref<Color>(Color.blue); // 1
// 取内容
let c2 = ref<string>(Color[2]); // green

//枚举默认值,默认值可以为小数
enum Color2 {
    red = 1.5,
    blue = 10,
    green = 20,
}
let c3 = ref<Color2>(Color2.blue); // 10
let c4 = ref<string>(Color2[10]); // blue 根据默认值取对应内容

//若是只有一个添加默认值如下
enum Color3 {
    red,
    blue = 5,
    green,
}
let c5 = ref<Color3>(Color3.red); //0 未加默认值，默认从0 开始
let c6 = ref<Color3>(Color3.blue); //5  //默认值5
let c7 = ref<Color3>(Color3.green); //6  //从默认值开始+1
let c8 = ref<string>(Color3[6]); //green

//任意值,任意值后面不能加别的类型（未赋予默认值）
enum Color4 {
    red,
    blue = 5,
    green = <any>'abccc',
    //   green = <any>4,  //4
    //   green = <any>true, //true
    //   yellow, //undefined
    yellow = 'BALUE'.length,
}
let c9 = ref<Color4>(Color4.blue);
let c10 = ref<Color4>(Color4.green); //abccc
let c11 = ref<Color4>(Color4.yellow); //5
let c12 = ref<string>(Color4[<any>'abccc']); //green

// computed 类型 方式一
//从其计算函数的返回值上推导出类型
const computed1 = computed(() => count.value + '前端开发爱好者');

//通过泛型参数显式指定 computed() 类型
const computed2 = computed<string>(() => {
    return '前端开发爱好者';
});

const _getBookingList = async () => {
    const params = {
        sourceCity: 123,
        startTime: '2022-04-01 00:00:00',
        endTime: '2022-04-02 00:00:00',
    };
    const { data } = await getBookingList(params);
    if (data) {
        console.log(data);
    }
};

//解构
const { count, list } = storeToRefs(useStore());
const store = useStore();
let num = ref<number | string>('666');
</script>

<template>
    <div class="box">
        <svg-icon name="vue" color="#eee" />
        <button @click="store.count++">++</button>
        {{ num }}
        <br />
        <div class="test"></div>
        <a-button type="dashed">Dashed Button</a-button>
        {{ store.count }}
        <button @click="_getBookingList">发送请求</button>
        <br />
        {{ count }}
        <br />
        computed=> {{ computed1 }}
        <br />
        props.title=> {{ title }}
        <br />
        {{ nums }}
        <br />
        <button @click="change">emit change</button>
        <br />
        <div style="width: 300px; height: 300px; border: 1px solid red" id="yyy"></div>
        <br />
        <button @click="onMitt">onMitt</button>
        <Parent />
    </div>
</template>

<style scoped>
.header {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 100px;
    background-color: red;
}

.main {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 600px;
    height: 300px;
    background-color: aqua;
}

.footer {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 600px;
    height: 100px;
    background-color: #7f7fef;
}
</style>
