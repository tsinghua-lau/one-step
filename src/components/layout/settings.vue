<template>
    <div v-show="!visible" class="setting-drawer-btn-wrap" @click="visible = true">
        <SettingOutlined class="setting-drawer-btn" />
    </div>
    <a-drawer v-model:visible="visible" class="setting-drawer" placement="right" width="280px" :closable="false">
        <template #handle>
            <div v-show="visible" class="setting-drawer-btn-wrap" style="" @click="visible = !visible">
                <CloseOutlined :style="{ marginTop: '10px' }" class="setting-drawer-btn" />
            </div>
        </template>
        <div>
            <h3 class="drawer-title">系统布局设置</h3>
            <div class="drawer-item">
                <span>侧边栏主题颜色</span>
                <a-select v-model:value="theme" class="select">
                    <a-select-option value="dark">暗黑</a-select-option>
                    <a-select-option value="light">明亮</a-select-option>
                </a-select>
            </div>
            <div class="drawer-item">
                <span>显示Logo</span>
                <a-switch v-model:checked="showSubMenuName" />
            </div>
            <div class="drawer-item">
                <span>显示Tab</span>
                <a-switch v-model:checked="showTags" @click="onMitt" />
            </div>
            <div class="drawer-item">
                <span>显示Header</span>
                <a-switch v-model:checked="showHeader" @click="onMitt" />
            </div>
        </div>
    </a-drawer>
</template>

<script lang="ts" setup>
import { useTheme } from '@/hooks/theme';
import useCurrentInstance from '@/untils/useCurrentInstance';
import { SettingOutlined, CloseOutlined } from '@ant-design/icons-vue';

const { proxy } = useCurrentInstance();
const { theme, showHeader, showSubMenuName, showTags } = toRefs(useTheme());
const visible = ref(false);
const onMitt = () => {
    //发送
    proxy.$bus.emit('initE', '');
};
</script>

<style lang="scss" scoped>
.setting-drawer-btn-wrap {
    font-size: 16px;
    text-align: center;
    cursor: pointer;
    pointer-events: auto;
}

.setting-drawer-btn {
    font-size: 20px;
    color: #25272b;
    margin-top: 14px;
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
