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
    <div class="full">
        <FullscreenExitOutlined :style="{ fontSize: '20px', color: '#000' }" @click="fullScreen" v-if="isFullScreen" />
        <FullscreenOutlined :style="{ fontSize: '20px', color: '#000' }" @click="fullScreen" v-else />
    </div>
</template>
<style lang="scss">
.full {
    > span {
        padding: 7px;
        border-radius: 3px;
        > &:hover {
            background: #eee;
        }
    }
}
</style>
