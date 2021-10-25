<script setup>
import { sidebarConfig } from "./config";
</script>

<template>
  <div class="sidebar">
    <ul class="sidebar-list">
      <li
        class="sidebar-btn"
        v-for="item of sidebarConfig"
        :key="item.key"
        @click="item.handler"
      >
        <i :class="'iconfont ' + item.icon"></i>
        <h6>{{ item.text }}</h6>
      </li>
    </ul>
  </div>
</template>

<style lang='less' scoped>
.sidebar {
  width: 60px;
  position: relative;
  height: 100%;
  background: #fff;
  .sidebar-btn {
    padding: 18px 0;
    text-align: center;
    cursor: pointer;
    transition: 0.1s color;
    i {
      font-size: 22px;
    }
    h6 {
      line-height: 1.5;
    }
    &:hover {
      color: var(--theme);
    }
  }
}
</style>