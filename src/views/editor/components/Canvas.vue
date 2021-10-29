<!--  -->
<template>
  <div class="editor_wrap gb_scroll" ref="editorRef">
    <div class="editor_wrap_box gb_scroll layout_center">
      <div class="editor_cnt_box">
        <div class="editor_cnt_bg">
          <CanvasGrid></CanvasGrid>
        </div>
        <div
          class="editor_ele_box"
          data-id="editor_ele_box"
          :style="editorStyle"
        >
          <!-- <div class="editor_bg" :style="paletteBgInfo?.style"></div> -->
          <div class="editor_eles_wrap">
            <template v-for="item in canvasData.element" :key="item.id">
              <EleItem :item="item" :type="1" />
            </template>
          </div>
        </div>
        <div class="editor_select_box">
          <div class="editor_ele_hover">
            <!-- :style="hoverStyle" -->
            <!-- <div v-if="isEleHoverLayerLock" class="editor_ele_select_lock_text">图层已锁定</div> -->
          </div>
          <!--  :style="selectStyle" -->
          <div class="editor_ele_select" :class="{select_box:!selectId}">
            <div
              class="dagger_pointer"
              :data-id="'dot_' + index"
              v-for="(pointer, index) in daggerPointer"
              :key="index"
              :style="{ left: pointer.x - 6 + 'px', top: pointer.y - 6 + 'px' }"
              @mousedown="handleClick(index, $event)"
              @mousemove="handleMouseMove"
            ></div>
          </div>
        </div>
      </div>

      <div class="mask" data-id="mask"></div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed, reactive, toRefs, toRef } from "vue";
import { GETTERS } from "@commits/editor";
import useEleEvent from "../hooks/usr-ele-event";
import EleItem from "./EleItem.vue";
import CanvasGrid from "./canvas-grid/index.vue";

import { useStore } from "vuex";

export default {
  components: {
    EleItem,
    CanvasGrid,
  },
  setup(props) {
    const store = useStore();

    const canvasScaleRatio = computed(
      () => store.state.editor.canvasScaleRatio
    );
    const hoverEleList = computed(() => store.getters[GETTERS.HOVER_ELE_LIST]);
    const selectId = computed(() => store.state.editor.selectId);
    const selectInfo = computed(() => store.getters[GETTERS.SELECT_INFO]);
    const viewCanvas = computed(() => store.getters[GETTERS.VIEW_CANVAS]);
    const daggerPointer = computed(
      () => store.getters[GETTERS.GET_DAGGER_POINTERS]
    );
    const hoverStyle = computed(() => {
      if (hoverEleList.value.length === 0) return { display: "none" };
      const { x, y, props } = hoverEleList.value[hoverEleList.value.length - 1];
      return {
        left: x + "px",
        top: y + "px",
        width: props.width + "px",
        height: props.height + "px",
      };
    });
    const selectStyle = computed(() => {
      if (!selectInfo.value) return {};
      const { x, y, props } = selectInfo.value;
      return {
        left: x + "px",
        top: y + "px",
        width: props.width + "px",
        height: props.height + "px",
      };
    });
    // const preViewCanvas = computed(() => store.getters[GETTERS.PREVIEW_CANVAS])
    const canvasData = computed(() => {
      //   if (type.value === 'view') {
      //     return preViewCanvas.value
      //   }

      return viewCanvas.value;
    });
    const state = reactive({
      editorRef: null,
      editorStyle: {
        width: canvasData.value.width + "px",
        height: canvasData.value.height + "px",
      },
    });

    const { bindEditEvents } = useEleEvent(toRef(state, "editorRef"));
    onMounted(() => {
      // bindEditEvents()
    });
    function clickhandle(event) {
      console.log(event);
    }
    function handleClick(id, event) {
      event.stopPropagation();
      console.log(id);
    }
    function handleMouseMove(event) {
      event.stopPropagation();
    }
    return {
      ...toRefs(state),
      clickhandle,
      canvasData,
      hoverEleList,
      handleClick,
      handleMouseMove,
      hoverStyle,
      selectStyle,
      daggerPointer,
      selectId
    };
  },
};
</script>
<style lang='less' scoped>
.editor_wrap {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
.editor_wrap_box {
  position: relative;
  height: 100%;
  padding: 30px;
  box-sizing: border-box;

  white-space: nowrap;
  overflow: overlay !important;
}
.editor_cnt_box {
  position: relative;
  z-index: 1;
  display: inline-block;
  white-space: normal;
  box-sizing: border-box;
  background: #fff;
  .editor_cnt_bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
  }
}
.editor_ele_box {
  display: inline-block;
  width: 500px;
  height: 750px;
  box-shadow: 0 0 20px rgb(0 0 0 / 10%);
  // 配合layout_center实现水平垂直居中
  vertical-align: middle;
  position: relative;
  overflow: hidden;
  .editor_eles_wrap {
    height: 100%;
    width: 100%;
  }
}
.layout_center {
  text-align: center;
  &:after {
    content: "";
    display: inline-block;
    height: 100%;
    vertical-align: middle;
  }
}

.editor_select_box {
  pointer-events: initial;
  .editor_ele_hover {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    pointer-events: none;
    z-index: 10;
    box-sizing: border-box;
  }

  .editor_ele_select {
    .editor_ele_hover;
    &.select_box{
      border: 1px solid @hoverColor;

    }

  }
  .dagger_pointer {
    position: absolute;
    background: #fff;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    border: 1px solid @hoverColor;
    box-sizing: border-box;
    pointer-events: initial;
    cursor: pointer;
  }
}

.mask {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>