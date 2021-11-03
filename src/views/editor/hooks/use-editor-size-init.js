import { computed, reactive, toRefs, watch, onMounted, nextTick } from 'vue'
import { useStore } from 'vuex'
import { editorHozPaddingDist, editorVerPaddingDist } from '../../../config'
import { COMMITS, GETTERS } from '../../../store/const/editor'
export default function useEditorSizeInit () {
  const store = useStore()
  const state = reactive({
    viewWidth: 0,
    viewHeight: 0,
    ratio: 1,
    isCenterView: false
  })
  const canvasRealSize = computed(() => store.getters[GETTERS.CANVAS_REAL_SIZE])
  const canvasScaleRatio = computed(() => store.state.editor.canvasScaleRatio)
  const materialPanelWidth = computed(() => store.state.editor.materialPanelWidth)
  let initTimer = 0

  watch(canvasRealSize, () => {
    initSize()
  })

  watch(canvasScaleRatio, (val) => {
    changeRatio(val)
  })

  watch(materialPanelWidth, () => {
    nextTick(() => {
      clearTimeout(initTimer)
      initTimer = setTimeout(() => {
        initSize()
      }, 350)
    })
  })

  onMounted(() => {
    initSize()
  })

  function initSize (ratio) {
    const wrapper = document.querySelector('#editorWrapper')

    if (wrapper) {
      const editorWrapperH = wrapper.clientHeight
      const editorWrapperW = wrapper.clientWidth
      const { width, height } = canvasRealSize.value || {}
      if (width < height) {
        if ((height + editorVerPaddingDist) > editorWrapperH) {
          state.ratio = ratio || (editorWrapperH - editorVerPaddingDist) / height
          state.viewWidth = width * state.ratio
          state.viewHeight = height * state.ratio
        } else {
          if ((width + editorHozPaddingDist) > editorWrapperW) {
            state.ratio = ratio || (editorWrapperW - editorHozPaddingDist) / width
          } else {
            state.ratio = ratio || 1
          }

          state.viewWidth = width * state.ratio
          state.viewHeight = height * state.ratio
        }
      } else {
        if ((width + editorHozPaddingDist) > editorWrapperW) {
          state.ratio = ratio || (editorWrapperW - editorHozPaddingDist) / width
          state.viewWidth = width * state.ratio
          state.viewHeight = height * state.ratio
        } else {
          if ((height + editorVerPaddingDist) > editorWrapperH) {
            state.ratio = ratio || (editorWrapperH - editorVerPaddingDist) / height
          } else {
            state.ratio = ratio || 1
          }
          state.viewWidth = width * state.ratio
          state.viewHeight = height * state.ratio
        }
      }
      store.commit(COMMITS.SET_CANVAS_SCALE_RATIO, state.ratio)

      // 可视区不满屏垂直居中展示
    }
  }

  function changeRatio (ratio) {
    initSize(ratio)
  }

  return {
    ...toRefs(state),
    initSize
  }
}
