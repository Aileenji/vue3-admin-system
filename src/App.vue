<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useAppAStore } from './stores/modules/app'
</script>

<template>
  <el-config-provider :locale="useAppAStore().locale" :size="useAppAStore().size">
    <RouterView />
  </el-config-provider>
</template>

<style scoped></style>
