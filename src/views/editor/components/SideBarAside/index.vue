<script setup>
import { computed, reactive, ref } from "vue";
import { useStore } from "vuex";
import { COMMITS } from "@commits/editor";
const store = useStore()
const boxState = reactive({
  isShrinked: true,
});

const boxClass = computed(() => ({
  "sidebar-aside": true,
  isShrinked: boxState.isShrinked,
}));

const shrinkHandler = () => {
  boxState.isShrinked = !boxState.isShrinked;
  store.commit(COMMITS.SET_MATERIAL_PANEL_WIDTH,!boxState.isShrinked?350:60)
  console.log('关闭');

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
  z-index: 2;

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