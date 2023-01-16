<script setup lang="ts">
import AnimateList from '@/components/AnimateList.vue';
</script>

<template>
    <main>
        <AnimateList tag="div" :duration="2" :delay="0.2">
            <p v-for="(num, index) of 10" :data-index="index" :key="index">
                {{ num }}
            </p>
        </AnimateList>
    </main>
</template>

<style lang="scss" scoped>
div {
    width: 100%;
    // padding: 20px;
    box-sizing: border-box;
    p {
        width: 100%;

        margin-bottom: 0.5rem;
        background-color: #9333ea;
        padding: 0.5rem;
        color: #fff;
        text-align: left;
    }
}
</style>
