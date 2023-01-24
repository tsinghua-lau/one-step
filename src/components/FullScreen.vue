<script setup lang="ts">
import { ref } from 'vue';
import { FullscreenOutlined, FullscreenExitOutlined } from '@ant-design/icons-vue';

const isFullScreen = ref<boolean>(false);
const fullScreen = () => {
    isFullScreen.value ? document.exitFullscreen() : document.documentElement.requestFullscreen();
    isFullScreen.value = !isFullScreen.value;
};

document.addEventListener('fullscreenchange', e => {
    isFullScreen.value = Boolean(document.fullscreenElement);
});
</script>

<template>
    <div class="flex items-center cursor-pointer text-[#574b90]">
        <FullscreenExitOutlined :style="{ fontSize: '20px', color: '#08c' }" @click="fullScreen" v-if="isFullScreen" />
        <FullscreenOutlined :style="{ fontSize: '20px', color: '#08c' }" @click="fullScreen" v-else />
    </div>
</template>
