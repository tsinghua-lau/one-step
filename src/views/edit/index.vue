<template>
    <editor v-model="text" pageFullScreen></editor>
</template>

<script lang="ts" setup>
import { defineComponent } from 'vue';
import Editor from 'md-editor-v3';
import 'md-editor-v3/lib/style.css';
const text = ref('');
</script>
