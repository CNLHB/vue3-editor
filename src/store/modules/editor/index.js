import { cloneDeep } from "lodash"
import { forEach } from "@/utils"
import { defaultImgData } from "./config"
import { createPointer } from "../../../utils/domUtils"
const state = () => {
  return {
    pointerInfo:{
      x:0,
      y:0,
      mX:0,
      mY:0,
      cx:0,
      cy:0,
      movePst:{
        x:0,
        y:0
      }
    },
    title: '',
    curCanvas: {
      width: 1500, // 画板宽
      height: 1500, // 画板高
      bgImage: '', // 画板背景图
      bgColor: {
        type: 'linear',
        style: 'background-image: linear-gradient(90deg, rgba(0, 245, 255, 1) 0%,rgba(31, 0, 255, 1) 100%);',
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
      element: defaultImgData?defaultImgData:[],
    },
    canvasScaleRatio: 1,
    materialPanelWidth: 60,
    selectId:'',
    selectIds:[],
    isDagger: false
    
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
  hoverEleList(state){
    const copyCurCanvas = cloneDeep(state.curCanvas)
    const {x,y} = cloneDeep(state.pointerInfo)
    const { element } = copyCurCanvas || {}
    let container = element.filter(item=>{
        let l = item.x + item.props.width
        let t = item.y + item.props.height
        // console.log(x);
        // console.log(y);
        // console.log(t);
        // console.log(t);
        if(x>=item.x&&x<=l&&y>item.y&&y<=t){
          return true
        }
        return false
    })
    return container
  },
  selectInfo(state){
    const copyCurCanvas = cloneDeep(state.curCanvas)
    const { element } = copyCurCanvas || {}
    return element.find(item=>String(item.id)===String(state.selectId))
  },
  getDaggerPointers(state){
    const copyCurCanvas = cloneDeep(state.curCanvas)
    const { element } = copyCurCanvas || {}
    return createPointer(element.find(item=>String(item.id)===String(state.selectId)))
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
  setPointerInfo(state,pointerInfo){
    forEach(pointerInfo,(item,value)=>{
      state.pointerInfo[item] = value
    })
  },
  setSelectId(state,selectId){
    state.selectId = selectId
  },
  setSelectGroupId(state,selectId){
    if(selectId){
      state.selectIds.push(selectId)
    }else{
      state.selectIds = []
    }
  },
  setIsDagger(state,flag){
    state.isDagger = flag
  },
  updateCurCanvasElement(state,eleData){
    let updateIndex
    const copyElement = cloneDeep(eleData)
    const { x, y, props } = copyElement || {}
    const { width, height, rotate, fontSize, radius } = props || {}

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

    const { id } = copyElement || {}
    const { element } = state.curCanvas || {}

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
  draggerEle(state,eleData){
    let updateIndex
    const copyElement = cloneDeep(eleData)
    const { element } = state.curCanvas || {}
    const { id, x, y } = copyElement || {}
    copyElement.x = x / state.canvasScaleRatio
    copyElement.y = y / state.canvasScaleRatio
    updateIndex = element.findIndex(item=>String(item.id)===String(id))
    if(updateIndex===-1){

    }else{
      const ele = cloneDeep(state.curCanvas.element[updateIndex])
      ele.x = Number(copyElement.x)
      ele.y = Number(copyElement.y)
      state.curCanvas.element[updateIndex] = ele
    }

  }
}

const actions = {
  setSelectId({state,commit},id){
      commit('setSelectId',id)
      commit('setSelectGroupId',id)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
