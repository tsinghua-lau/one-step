<template>
    <p><Button :dashed="true" theme="primary" disabled>我是一个按钮</Button></p>
    <p><Button theme="info">我是一个按钮</Button></p>
    <p><Button theme="primary" size="small">我是一个按钮</Button></p>
    <p><Button round theme="success" disabled>我是一个按钮</Button></p>
</template>

<script setup lang="ts">
import Button from '@/lib/button/index.vue';
</script>

<style lang="scss" scoped></style>
