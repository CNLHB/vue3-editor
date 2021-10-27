import { cloneDeep } from "lodash"
import { forEach } from "@/utils"
import { defaultImgData } from "./config"
const state = () => {
  return {
    pointerInfo:{
      x:0,
      y:0,
      mX:0,
      mY:0
    },
    title: '',
    curCanvas: {
      width: 1500, // 画板宽
      height: 1500, // 画板高
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
      element: defaultImgData?defaultImgData:[],
    },
    canvasScaleRatio: 1,
    materialPanelWidth: 60,
    selectId:'',
    selectIds:[]
    
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
  }
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
  }
}

const actions = {}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
}
