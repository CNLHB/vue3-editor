<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="canvasSvgConfig.viewBox.join(' ')"
    :width="canvasSvgConfig.width"
    :height="canvasSvgConfig.height"
  >
    <defs>
      <pattern
        id="canvasPattern"
        :x="gridPattern.bbox.x"
        :y="gridPattern.bbox.y"
        :width="canvasSvgConfig.width / 10"
        :height="canvasSvgConfig.height / 10"
        patternUnits="userSpaceOnUse"
      >
        <rect
          :x="gridPattern.bbox.x"
          :y="gridPattern.bbox.y"
          :width="gridPattern.bbox.width"
          :height="gridPattern.bbox.height"
          :fill="gridPattern.fill"
          :stroke="gridPattern.stroke.color"
          :strokeWidth="gridPattern.stroke.width"
        />
      </pattern>
    </defs>
    <rect
      fill="url(#canvasPattern)"
      :stroke="gridPattern.stroke.color"
      :x="gridPattern.bbox.x"
      :y="gridPattern.bbox.y"
      :width="canvasSvgConfig.width"
      :height="canvasSvgConfig.height"
    />
  </svg>
</template>

<script setup>
import { computed, ref, reactive, toRefs, toRef } from "@vue/reactivity";
const canvasSvgConfig = reactive({
  viewBox: [0, 0, 500, 500],
  width: 500,
  height: 500,
});
const gridPattern = reactive({
  bbox: {
    x: 0,
    y: 0,
    width: 100,
    height: 100,
  },
  stroke: {
    color: "#aaa",
    width: 1,
  },
  fill: "none",
});
</script>
<style lang="less" scoped>
</style>