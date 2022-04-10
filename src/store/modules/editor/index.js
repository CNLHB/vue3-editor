import {
  cloneDeep
} from "lodash"
import {
  forEach
} from "@/utils"
import {
  defaultImgData
} from "./config"
import {
  createPointer,
} from "../../../utils/domUtils"
const state = () => {
  return {
    pointerInfo: {
      x: 0,
      y: 0,
      mX: 0,
      mY: 0,
      cx: 0,
      cy: 0,
      movePst: {
        x: 0,
        y: 0
      }
    },
    title: '',
    curCanvas: {
      title: '',
      palette: {
        width: 1500, // 画板宽
        height: 1500, // 画板高
        bgImage: '', // 画板背景图
        bgColor: {
          type: 'linear',
          style: 'background-image: linear-gradient(90deg, rgba(0, 245, 255, 1) 0%,rgba(31, 0, 255, 1) 100%);',
          color: {
            hex: '#ffffff',
            rgba: {
              r: 0,
              g: 0,
              b: 0,
              a: 1
            },
            color: 'rgba(255, 255, 255, 1)'
          },
          deg: 90,
          colors: [{
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
      },
      element: defaultImgData ? defaultImgData : [],
    },
    canvasScaleRatio: 1,
    materialPanelWidth: 60,
    selectId: '',
    selectIds: [],
    daggerEleList: [],
    isDagger: false,
    disabledDagger: false,
    historyUndoData: [],
    historyRedoData: [],

  }
}

function getRatioElements(element, ratio) {
  return cloneDeep(element).map(item => {
    const {
      x,
      y,
      props,
      type
    } = item || {}
    const {
      width,
      height,
      fontSize,
      radius
    } = props || {}

    item.x = x * ratio
    item.y = y * ratio

    if (item.props) {
      item.props.width = width * ratio
      item.props.height = height * ratio
      item.props.radius = radius * ratio
    }

    if (type === 'text') {
      item.props.fontSize = fontSize * ratio
    }

    return item
  })
}
const getters = {
  currentElementInfoMap(state, getters) {
    const infoMap = {}
    getters.viewCanvas.element &&
      getters.viewCanvas.element.forEach(item => {
        infoMap[item.id] = item
      })
    return infoMap
  },
  daggerEleListRadio(state) {
    const ratio = state.canvasScaleRatio
    return getRatioElements(state.daggerEleList, ratio)
  },
  // 预览图数据
  preViewCanvas(state) {
    const copyCurCanvas = cloneDeep(state.curCanvas)
    const {
      element
    } = copyCurCanvas || {}

    if (!Array.isArray(element)) {
      return state.curCanvas
    }
    const ratio = PREVIEW_WIDTH / state.curCanvas.palette.width

    // const copyElement = getRatioElements(element, ratio)

    // copyCurCanvas.element = copyElement

    return copyCurCanvas
  },
  // 视图渲染数据
  viewCanvas(state) {
    const copyCurCanvas = cloneDeep(state.curCanvas)
    const {
      element
    } = copyCurCanvas || {}

    if (!Array.isArray(element)) {
      return state.curCanvas
    }

    const ratio = state.canvasScaleRatio
    const copyElement = getRatioElements(element, ratio)

    copyCurCanvas.element = copyElement

    return copyCurCanvas
  },
  // 画布真实宽高
  canvasRealSize(state) {
    const {
      palette
    } = state.curCanvas
    const {
      width,
      height
    } = palette || {}
    return {
      width,
      height
    }
  },
  hoverEleList(state, getters) {
    const copyCurCanvas = cloneDeep(getters.viewCanvas)
    const {
      x,
      y
    } = cloneDeep(state.pointerInfo)
    const {
      element
    } = copyCurCanvas || {}
    let container = element.filter(item => {
      let l = item.x + item.props.width
      let t = item.y + item.props.height
      if (x >= item.x && x <= l && y > item.y && y <= t) {
        return true
      }
      return false
    })
    return container
  },
  selectInfo(state, getters) {
    // console.log();
    const currentElementInfoMap = getters.currentElementInfoMap
    return currentElementInfoMap[state.selectId]
    const copyCurCanvas = cloneDeep(state.curCanvas)
    const {
      element
    } = copyCurCanvas || {}
    return element.find(item => String(item.id) === String(state.selectId))
  },
  selectGroupInfo(state, getters) {
    // console.log();
    const ratio = state.canvasScaleRatio

    const currentElementInfoMap = getters.currentElementInfoMap
    return state.selectIds.map(id=>currentElementInfoMap[id])
    // return getRatioElements(, ratio) 
  },
  getDaggerPointers(state, getters) {
    const copyCurCanvas = cloneDeep(getters.viewCanvas)
    const draggerList = getters.daggerEleListRadio
    const {
      element
    } = copyCurCanvas || {}
    return createPointer((draggerList.length>0?draggerList:element).find(item => String(item.id) === String(state.selectId)))
  },

}

const mutations = {
  setDocTitle(state, title) {
    state.title = title
  },
  setCanvasScaleRatio(state, scale) {
    state.canvasScaleRatio = scale
  },
  setMaterialPanelWidth(state, width) {
    console.log(width);
    state.materialPanelWidth = width
  },
  setPointerInfo(state, pointerInfo) {
    forEach(pointerInfo, (item, value) => {
      state.pointerInfo[item] = value
    })
  },
  setSelectId(state, selectId) {
    state.selectId = selectId
    if(!selectId){
      state.selectIds = []
    }
    // if(state.selectIds.length===0){
    //   state.selectId = selectId
    //   return 
    // }
    // if(state.selectId===selectId){
    //   state.selectId = ''
    // }
  },
  setSelectGroupId(state, selectId) {
    if (selectId) {
      const index = state.selectIds.indexOf(selectId)
      if(index!==-1) {
        state.selectIds.splice(index, 1)
        state.selectId = state.selectIds[0]||''
        return 
      }
      state.selectIds.push(selectId)
    } else {
      state.selectIds = []
    }
  },
  setIsDagger(state, flag) {
    state.isDagger = flag
  },
  setDisabledDagger(state, flag) {
    state.disabledDagger = flag
  },
  updateCurCanvasElement(state, eleData) {
    if (state.disabledDagger) return
    let updateIndex
    const copyElement = cloneDeep(eleData)
    const {
      x,
      y,
      props
    } = copyElement || {}
    const {
      width,
      height,
      rotate,
      fontSize,
      radius
    } = props || {}

    copyElement.x = x / state.canvasScaleRatio
    copyElement.y = y / state.canvasScaleRatio

    if (copyElement.props) {
      copyElement.props.width = width / state.canvasScaleRatio
      copyElement.props.height = height / state.canvasScaleRatio
      copyElement.props.rotate = rotate
      copyElement.props.radius = radius / state.canvasScaleRatio
    }

    if (copyElement.props && copyElement.type === 'text') {
      copyElement.props.fontSize = fontSize / state.canvasScaleRatio
    }

    const {
      id
    } = copyElement || {}
    const {
      element
    } = state.curCanvas || {}

    for (let index = 0; index < element.length; index++) {
      if (id === element[index].id) {
        updateIndex = index
        break
      }
    }
    if (typeof updateIndex === 'number') {
      state.curCanvas.element[updateIndex] = copyElement
    } else {
      state.curCanvas.element.push(copyElement)
    }

  },
  updateDaggerList(state){
    const daggerEleList = state.daggerEleList
    const {
      element
    } = state.curCanvas || {}
    daggerEleList.forEach(ele=>{
      let updateIndex = element.findIndex(item => String(item.id) === String(ele.id))
      state.curCanvas.element[updateIndex] = ele

    })
   state.daggerEleList = []
  },
  draggerEle(state, eleData) {
    if (state.disabledDagger) return
    let updateIndex
    let updateDaggerIndex
    const copyElement = cloneDeep(eleData)
    const daggerEleList = state.daggerEleList
    const {
      element
    } = state.curCanvas || {}
    const {
      ids,
      x,
      y
    } = copyElement || {}
    // copyElement.x = x / state.canvasScaleRatio
    // copyElement.y = y / state.canvasScaleRatio
    // return

    ids.forEach(id => {
      updateIndex = element.findIndex(item => String(item.id) === String(id))
      updateDaggerIndex = daggerEleList.findIndex(item => String(item.id) === String(id))
      if (updateIndex === -1) {

      } else {
        let ele = daggerEleList.find(item => String(item.id) === String(id))
        let newEle = cloneDeep(ele)
        state.daggerEleList[updateDaggerIndex] = newEle
      }
    })


  },
  pushHistoryUndo (state, { data, isClearRedo = true }) {
    state.historyUndoData.push(data)
    if (isClearRedo) {
      state.historyRedoData = []
    } else {
      state.historyRedoData.pop()
    }
  },
  pushHistoryRedo (state, data) {
    state.historyRedoData.push(data)
    state.historyUndoData.pop()
  },
  clearHistory (state) {
    state.historyUndoData = []
    state.historyRedoData = []
  },
}

const actions = {
  setSelectId({
    state,
    commit
  }, id) {
    commit('setSelectId', id)
    commit('setSelectGroupId', id)
  },
  draggerEleList({
    state,
    commit,
  }, updateEle) {
    const {
      element
    } = state.curCanvas || {}
    const daggerEleList = state.daggerEleList
    const {
      ids,
      x,
      y,
      infoMap
    } = updateEle || {}
    if (daggerEleList.length !== 0) {
      daggerEleList.forEach(function (ele) {
        ele.x = Number(x) + Number(infoMap[ele.id].x)
        ele.y = Number(y) + Number(infoMap[ele.id].y)
        ele.x = ele.x / state.canvasScaleRatio
        ele.y = ele.y / state.canvasScaleRatio
      })
      commit('draggerEle', updateEle)
      return
    }
    ids.forEach(id => {
      let ele = element.find(item => String(item.id) === String(id))
      if (ele) {
        const newEle = cloneDeep(ele)
        if(infoMap[id]){
          newEle.x = Number(x) + Number(infoMap[id].x)
          newEle.y = Number(y) + Number(infoMap[id].y)
        }
        newEle.x = newEle.x / state.canvasScaleRatio
        newEle.y = newEle.y / state.canvasScaleRatio
        state.daggerEleList.push(newEle)
      }
    })
    commit('draggerEle', updateEle)

  },
  updateEleProps ({ commit, getters }, props) {
    return new Promise((resolve, reject) => {
      let copyData = cloneDeep(getters.selectInfo)

      // 有些属性改变是异步的，但是又不完全是已选元素，比如加载的时候，切换了元素
      if (props?._eleId) {
        copyData = cloneDeep(getters.currentElementInfoMap[props?._eleId])
      }

      copyData.props = {
        ...copyData.props,
        ...props
      }

      commit('updateCurCanvasElement', copyData)
      resolve()
    })
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}