<script setup lang="ts">
import { ref, useAttrs, reactive } from 'vue';

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
</script>

<template>
    <div class="box">
        <header class="header">
            <slot name="header">123</slot>
        </header>
        <main class="main">
            <div v-for="(item, index) in data" :key="index">
                <slot :data="item" :index="index"></slot>
            </div>
        </main>
        <footer class="footer">
            <slot name="footer"></slot>
        </footer>
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
