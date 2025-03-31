<template>
  <div>
    <!-- 面包屑导航 -->
    <NavBar />
    <!-- 标签页 -->
    <TagsView />
    <!-- 主内容 -->
    <AppMain />
  </div>
</template>

<script setup lang="ts">
import NavBar from './components/NavBar/NavBar.vue'
import TagsView from './components/tagsView/TagsView.vue'
import AppMain from './components/AppMain.vue'
</script>

<style>

</style>