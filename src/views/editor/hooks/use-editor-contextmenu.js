import { reactive, toRefs,computed } from 'vue'
import { useStore } from 'vuex'
import { ignoreEle } from '../../../config'
import { ACTIONS, COMMITS,GETTERS} from '../../../store/const/editor'
import { isParentEle } from '../methods'
import { createPointerInfo } from '../methods/event'

export default function useEditorContextMenu (ele, {
  isEnterWrap = true
} = {}) {
   const store =  useStore()
   const hoverEleList =  computed(()=>store.getters[GETTERS.HOVER_ELE_LIST])
   const isDagger =  computed(()=>store.state.editor.isDagger)
   const selectId =  computed(()=>store.state.editor.selectId)
   const selectInfo =  computed(()=>store.getters[GETTERS.SELECT_INFO])
   const pointerInfo =  computed(()=>store.state.editor.pointerInfo)
   
  const state = reactive({
       isContextMenuOpen:false,
       menuPst:{x:0,y:0},
       target:null,

    })
  function bindEditContextMenu () {
    // ele.value.addEventListener('mousedown', handleMouseDown)
    ele.value.addEventListener('contextmenu', handleContextMenu)
  }

  function unBindEditContextMenu () {
    ele.value.removeEventListener('mousedown', handleMouseDown)
    ele.value.removeEventListener('mousemove', handleMouseMove)
  }
  function handleMouseDown (event) {

    console.log(hoverEleList.value);
    if(hoverEleList.value.length===0){
        store.dispatch(ACTIONS.SET_GROUP_SELECT_IDS,'')
        return 
    }else{
        const {id} = hoverEleList.value[hoverEleList.value.length-1]
        console.log('select id ======',id);
        store.dispatch(ACTIONS.SET_GROUP_SELECT_IDS,id)

    }
    // 顺序不能乱
    if(selectInfo.value){
      state.selectInfo.x = selectInfo.value.x
      state.selectInfo.y = selectInfo.value.y
    }

  }
  function handleMouseMove (event) {
  }

  function handleMouseUp (event) {


  }
  function onSelectMenu(){

  }
  function handleContextMenu(event){
    event.preventDefault();
    state.isContextMenuOpen = true
  }
  return {
    ...toRefs(state),
    onSelectMenu,
    bindEditContextMenu,
    unBindEditContextMenu
  }
}
