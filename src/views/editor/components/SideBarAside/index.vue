<script setup>
import { computed, reactive, ref } from "vue";

const boxState = reactive({
  isShrinked: false,
});

const boxClass = computed(() => ({
  "sidebar-aside": true,
  isShrinked: boxState.isShrinked,
}));

const shrinkHandler = () => {
  boxState.isShrinked = !boxState.isShrinked;
};
</script>

<template>
  <div :class="boxClass">
    <i class="shrink" @click="shrinkHandler"></i>
  </div>
</template>

<style lang='less' scoped>
.sidebar-aside {
  position: relative;
  height: 100%;
  border-left: 1px solid @lineColor;
  background-color: @whiteTheme;
  transition: transform 0.14s ease-out;
  .shrink {
    content: "";
    position: absolute;
    left: 100%;
    top: 50%;
    transform: translateY(-50%);
    width: 30px;
    height: 80px;
    background-color: @whiteTheme;
    clip-path: ellipse(15px 30px at 0% 50%);
    cursor: pointer;
  }
  &.isShrinked {
    transform: translateX(-100%);
    .shrink {
      top: 100%;
    }
  }
}
</style>