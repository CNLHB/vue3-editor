<script setup>
import { ref } from "vue";
import { sidebarConfig } from "./config";

const activeIdx = ref(0);

const sidebarBtnClick = (idx) => (activeIdx.value = idx);
</script>

<template>
  <div class="sidebar">
    <ul class="sidebar-list">
      <li
        class="sidebar-btn"
        v-for="(item, i) of sidebarConfig"
        :key="item.key"
        @click="() => sidebarBtnClick(i)"
      >
        <div :class="{ active: activeIdx === i }">
          <i :class="'iconfont ' + item.icon"></i>
          <h6>{{ item.text }}</h6>
        </div>
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
    div {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 2px;
        border-radius: 1px;
        background-color: currentColor;
        opacity: 0;
      }
      i {
        font-size: 22px;
      }
      h6 {
        line-height: 1.5;
      }
      &.active,
      &:hover {
        color: var(--theme);
        &::before {
          opacity: 1;
        }
      }
    }
  }
}
</style>