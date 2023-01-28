<template>
    <div v-show="!visible" class="setting-drawer-btn-wrap" @click="visible = true">
        <SettingOutlined class="setting-drawer-btn" />
    </div>
    <a-drawer v-model:visible="visible" class="setting-drawer" placement="right" width="280px" :closable="false">
        <template #handle>
            <div v-show="visible" class="setting-drawer-btn-wrap" style="right: 280px; z-index: 2000" @click="visible = !visible">
                <CloseOutlined class="setting-drawer-btn" />
            </div>
        </template>
        <div>
            <h3 class="drawer-title">系统布局配置</h3>
            <div class="drawer-item">
                <span>侧边栏主题颜色</span>
                <a-select v-model:value="theme" class="select">
                    <a-select-option value="dark">暗黑</a-select-option>
                    <a-select-option value="light">明亮</a-select-option>
                </a-select>
            </div>

            <div class="drawer-item">
                <span>折叠LOGO</span>
                <a-switch v-model:checked="showSubMenuName" />
            </div>
            <div class="drawer-item">
                <span>显示Tab</span>
                <a-switch v-model:checked="showTags" />
            </div>
        </div>
    </a-drawer>
</template>

<script lang="ts">
import { defineComponent, ref, toRefs } from 'vue';
import { useTheme } from '@/hooks/theme';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue';

export default defineComponent({
    components: { SettingOutlined, CloseOutlined },
    setup() {
        const visible = ref(false);
        const theme = useTheme();

        return { visible, ...toRefs(theme) };
    },
});
</script>

<style lang="scss" scoped>
.setting-drawer-btn-wrap {
    position: absolute;
    top: 240px;
    right: 0;
    z-index: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    font-size: 16px;
    text-align: center;
    background: #1890ff;
    border-radius: 4px 0 0 4px;
    cursor: pointer;
    pointer-events: auto;
}

.setting-drawer-btn {
    font-size: 20px;
    color: #fff;
}

.drawer-title,
.drawer-item {
    font-size: 14px;
}

.drawer-title {
    line-height: 22px;
    margin: 12px 0;
}

.drawer-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 0;

    .select {
        width: 80px;
    }
}
</style>
