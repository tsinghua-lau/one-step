<script setup lang="ts">
import { ref, onMounted } from 'vue';
import TypeTest from '../../components/TypeTest.vue';
import useCurrentInstance from '../../untils/useCurrentInstance';
import { message } from 'ant-design-vue';
const { proxy } = useCurrentInstance();
onMounted(() => {
    //接收
    proxy.$bus.on('currentRoute', (item: string) => {
        message.success(`另一个组件也接收:'${item}`, 1);
    });
});

const nums = ref<number[]>([1, 2, 3, 4, 5, 6]);
const number = ref<number>(0);

const change = (val: any) => {
    nums.value[0]++;
};
const updata = (val: any) => {
    number.value += 2;
};
</script>

<template>
    <TypeTest :name="'123'" :mydata="{ a: 1 }" :title="'我是标题'" @change="change" @updata="updata" :nums="nums" />

    <p>number==>{{ number }}</p>
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
