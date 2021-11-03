import { reactive, toRefs,computed } from 'vue'
import { useStore } from 'vuex'
import { ignoreEle } from '../../../config'
import { ACTIONS, COMMITS,GETTERS} from '../../../store/const/editor'
import { isParentEle } from '../methods'
import { createPointerInfo } from '../methods/event'

export default function useEditorEvent (ele, {
  isEnterWrap = true
} = {}) {
   const store =  useStore()
   const hoverEleList =  computed(()=>store.getters[GETTERS.HOVER_ELE_LIST])
   const isDagger =  computed(()=>store.state.editor.isDagger)
   const canvasScaleRatio =  computed(()=>store.state.editor.canvasScaleRatio)
   const selectId =  computed(()=>store.state.editor.selectId)
   const selectInfo =  computed(()=>store.getters[GETTERS.SELECT_INFO])
   const body = document.body
  const state = reactive({
       x: 0,
       y: 0,
       startX:0,
       startY:0,
       moveX:0,
       moveY:0,
       target:null,
       selectInfo:{x:0,y:0}
    })
  function bindEditEvents () {
    ele.value.addEventListener('mousedown', handleMouseDown)
    ele.value.addEventListener('contextmenu', handleContextMenu)
    body.addEventListener('mousemove', handleMouseMove)
    body.addEventListener('mouseup', handleMouseUp)
  }

  function unbindEditEvents () {
    ele.value.removeEventListener('mousedown', handleMouseDown)
    ele.value.removeEventListener('mousemove', handleMouseMove)
    body.removeEventListener('mouseup', handleMouseUp)
  }
  function handleMouseDown (event) {
    if(event.button===2){
      return 
    }
    console.log('editor');
    let target = event.target
    state.target = target
    state.startX = event.pageX
    state.startY = event.pageY
    // console.log(state.target.getBoundingClientRect());
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
    let target = event.target
    if(state.target){
      state.moveX = event.pageX - state.startX
      state.moveY = event.pageY- state.startY
    }
    if(!isParentEle(target,'id','editorWrapper'))return 
    // console.log(target);
    let pointerInfo = createPointerInfo(event)
    const dataId = target.getAttribute('data-id')
    //||isDagger
    if(ignoreEle.some(item=>item===dataId||(dataId&&dataId.startsWith(item)))){
        // delete pointerInfo.x
        // delete pointerInfo.y
        
    }
    if(isDagger.value){
        // delete pointerInfo.x
        // delete pointerInfo.y
        
    }
    store.commit(COMMITS.SET_POINTER_INFO, {movePst:{x:state.moveX ,y:state.moveY},...pointerInfo})
    if(selectId.value&&state.target){
      store.commit(COMMITS.SET_IS_DAGGER,true)
      store.commit(COMMITS.DAGGER_ELE, {id:selectId.value,x:state.moveX + state.selectInfo.x  ,y:state.moveY+ state.selectInfo.y})
      // console.log(hoverEleList.value);

    }
  }

  function handleMouseUp (event) {
    state.target = null
    state.selectInfo = {x:0,y:0}
    // console.log('up');
    store.commit(COMMITS.SET_IS_DAGGER,false)

  }
  function handleContextMenu(event){
    event.preventDefault();
  }
  return {
    ...toRefs(state),
    unbindEditEvents,
    bindEditEvents
  }
}
