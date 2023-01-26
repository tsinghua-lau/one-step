<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TypeTest from '../../components/TypeTest.vue';
import useCurrentInstance from '../../untils/useCurrentInstance';

const { proxy } = useCurrentInstance();
onMounted(() => {
    //接受
    debugger;
    proxy.$bus.on('currentRoute', (item: string) => {
        //RouteRecordRaw是当前路由对象类型，可从vue-router中取
        console.log('currentRoute===>', item);
    });
});

const nums = ref<number[]>([1, 2, 3, 4, 5, 6]);

const change = (val: any) => {
    nums.value[0]++;
    console.log(val);
};
</script>

<template>
    <TypeTest :name="'123'" :mydata="{ a: 1 }" :title="'我是标题'" @change="change" :nums="nums" />
</template>

<style scoped>
.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
}
.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
