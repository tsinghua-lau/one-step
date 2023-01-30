import { reactive } from 'vue';

export interface Theme {
    theme: 'dark' | 'light';
    mode: 'vertical' | 'inline' | 'horizontal';
    width: string;
    collapsed: boolean;
    collapsedWidth: string;
    showTags: boolean;
    showBreadcrumb: boolean;
    showSubMenuName: boolean;
    showHeader: boolean;
}

const theme = reactive<Theme>({
    theme: 'dark',
    mode: 'inline',
    width: '208px',
    collapsed: false,
    collapsedWidth: '80px',
    showBreadcrumb: true, //
    showTags: true, // 显示Tab
    showSubMenuName: true, // 显示Logo
    showHeader: true, // 显示Header
});

export const useTheme = function () {
    return theme;
};
