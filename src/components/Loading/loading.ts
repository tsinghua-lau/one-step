import myLoad from './index.vue';

const $loading = createApp(myLoad, {}).mount(document.createElement('div'));

const loading = {
    show(tip?: string, textColor?: any) {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        //@ts-ignore
        $loading.reload(true, tip, textColor);
        document.body.appendChild($loading.$el);
    },

    hide() {
        setTimeout(() => {
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            //@ts-ignore
            $loading.reload(false);
        }, 500);
    },
};
export default loading;
