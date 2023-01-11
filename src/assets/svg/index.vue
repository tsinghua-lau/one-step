<script lang="ts" setup>
import { computed } from 'vue';
const props = defineProps({
  name: {
    type: String,
    required: true,
  },
  color: {
    type: String,
    default: '',
  },
});
const iconName = computed(() => `#icon-${props.name}`);
const svgClass = computed(() => {
  if (props.name) return `svg-icon icon-${props.name}`;
  return 'svg-icon';
});
</script>
<template>
  <svg :class="svgClass" v-bind="$attrs" :style="{ color: color }">
     <!-- use 元素在 SVG 文档内取得目标节点，并在别的地方复制它们 -->
    <use :xlink:href="iconName"></use>
  </svg>
</template>
<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  // 图标基线问题
  vertical-align: middle;
  // 定义svg图标颜色，currentColor是一个变量，表示当前元素的color值，如果当前元素未设置color值，则从父元素继承
  fill: currentColor;
  overflow: hidden;
}
</style>