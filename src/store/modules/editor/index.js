import { cloneDeep } from "lodash"
import { defaultImgData } from "./config"

const state = () => {
  return {
    title: '',
    curCanvas: {
      width: 750, // 画板宽
      height: 1334, // 画板高
      bgImage: '', // 画板背景图
      bgColor: {
        type: 'linear',
        style: 'background: #ffffff',
        color: {
          hex: '#ffffff',
          rgba: { r: 0, g: 0, b: 0, a: 1 },
          color: 'rgba(255, 255, 255, 1)'
        },
        deg: 90,
        colors: [
          {
            color: 'rgba(255, 255, 255, 1)',
            hex: '#ffffff',
            pst: 100
          },
          {
            color: 'rgba(0, 0, 0, 1)',
            hex: '#000000',
            pst: 0
          }
        ]
      }, // 画板背景色
      element: [defaultImgData],
    },
    canvasScaleRatio: 1,
    materialPanelWidth: 60,
    
  }
}

const getters = {
  preViewCanvas (state) {
    const copyCurCanvas = cloneDeep(state.curCanvas)
    const { element } = copyCurCanvas || {}

    if (!Array.isArray(element)) {
      return state.curCanvas
    }

    const ratio = PREVIEW_WIDTH / state.curCanvas.palette.width

    // const copyElement = getRatioElements(element, ratio)

    // copyCurCanvas.element = copyElement

    return copyCurCanvas
  },
  viewCanvas (state) {
    const copyCurCanvas = cloneDeep(state.curCanvas)
    const { element } = copyCurCanvas || {}

    if (!Array.isArray(element)) {
      return state.curCanvas
    }

    const ratio = state.canvasScaleRatio
    // const copyElement = getRatioElements(element, ratio)

    // copyCurCanvas.element = copyElement

    return copyCurCanvas
  },
}

const mutations = {
  setDocTitle(state, title) {
    state.title = title
  },
  setMaterialPanelWidth (state, width) {
    console.log(width);
    state.materialPanelWidth = width
  },
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
