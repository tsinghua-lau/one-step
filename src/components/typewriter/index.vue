<template>
    {{ typewriterText }}
</template>

<script setup lang="ts">
import { onMounted, ref, toRefs, withDefaults } from 'vue';
const props = withDefaults(
    defineProps<{
        text: string;
    }>(),
    {
        text: '',
    }
);

let { text } = toRefs(props);
let typewriterText = ref('');
onMounted(() => {
    startWrite();
});
const startWrite = async () => {
    let r = text.value.split('');
    for (let i = 0; i < r.length; i++) {
        const el = r[i];
        await cc(el);
    }
};
const cc = (element: string) => {
    return new Promise<void>((resolve, reject) => {
        let T1: ReturnType<typeof setTimeout | any> = setTimeout(() => {
            typewriterText.value = typewriterText.value + element + ' ✏️';
            let T2: ReturnType<typeof setTimeout | any> = setTimeout(() => {
                typewriterText.value = typewriterText.value.replace(' ✏️', '');
                clearTimeout(T2);
                T2 = null;
            }, 80);
            resolve();
            clearTimeout(T1);
            T1 = null;
        }, 100);
    });
};
</script>
<style type="text/css"></style>
