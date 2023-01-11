import { ComponentInternalInstance, getCurrentInstance } from 'vue';
export default function useCurrentInstance(): any {
    const { appContext } = getCurrentInstance() as ComponentInternalInstance;
    const proxy = appContext.config.globalProperties;
    return {
        proxy,
    };
}
