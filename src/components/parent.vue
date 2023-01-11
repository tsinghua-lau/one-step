<script setup lang="ts">
import { ref, reactive } from 'vue';
import Children from './children.vue';

let name = ref('footer');
</script>

<template>
    <Children>
        <template v-slot:header>
            <div>我是具名插槽</div>
        </template>
    </Children>
</template>

<style scoped></style>
