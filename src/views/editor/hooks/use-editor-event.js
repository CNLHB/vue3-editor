import { reactive, toRefs,computed } from 'vue'
import { useStore } from 'vuex'
import { COMMITS,GETTERS} from '../../../store/const/editor'

export default function useEditorEvent (ele, {
  isEnterWrap = true
} = {}) {
   const store =  useStore()
   const hoverEleList =  computed(()=>store.getters[GETTERS.HOVER_ELE_LIST])
   const isDagger =  computed(()=>store.state.editor.isDagger)

  const state = reactive({
       x: 0,
       y: 0,
       startX:0,
       startY:0,
       moveX:0,
       moveY:0,
       target:null
    })
  const body = document.body
  function bindEditEvents () {
    ele.value.addEventListener('mousedown', handleMouseDown)
    body.addEventListener('mousemove', handleMouseMove,true)
  }

  function unbindEditEvents () {
    ele.value.removeEventListener('mousedown', handleMouseDown)
    ele.value.removeEventListener('mousemove', handleMouseMove)
    body.removeEventListener('mouseup', handleMouseUp)
  }
  function handleMouseDown (event) {
    console.log('editor');
    state.target = event.target
    // console.log(state.target);
    // console.log(state.target.getBoundingClientRect());
    console.log(hoverEleList.value);
    if(hoverEleList.value.length===0){
        store.commit(COMMITS.SET_SELECT_ID,'')

        return 
    }else{
        const {id} = hoverEleList.value[hoverEleList.value.length-1]
        store.commit(COMMITS.SET_SELECT_ID,id)
    }


  }
  const ignoreEle = ['mask','dot_']
  function handleMouseMove (event) {
    state.target = event.target
    const dataId = state.target.getAttribute('data-id')
    const offset = getOffSet(state.target)
    let pointerInfo = {
        x:event.offsetX+offset.left,
        y:event.offsetY+offset.top,
        mX:event.pageX,
        mY:event.pageY,
        clientX:event.clientX,
        clientY:event.clientY,
        cx:event.offsetX+offset.left,
        cy:event.offsetY+offset.top,

    }
    //||isDagger
    if(ignoreEle.some(item=>item===dataId||(dataId&&dataId.startsWith(item)))){
        delete pointerInfo.x
        delete pointerInfo.y
        
    }
    if(isDagger.value){
        delete pointerInfo.x
        delete pointerInfo.y
        
    }
    store.commit(COMMITS.SET_POINTER_INFO,pointerInfo)
  }
  function handleMouseUp (event) {
    ele.value.removeEventListener('mousemove', handleMouseMove)
  }
  function getOffSet(curEle){
    var totalLeft = null,totalTop = null,par = curEle.offsetParent;
    //首先加自己本身的左偏移和上偏移
    totalLeft+=curEle.offsetLeft;
    totalTop+=curEle.offsetTop
    //只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
    while(par&&par.getAttribute('data-id')!=='editor_ele_box'){
      if(navigator.userAgent.indexOf("MSIE 8.0")===-1){
        //累加父级参照物的边框
        totalLeft+=par.clientLeft;
        totalTop+=par.clientTop
      }
      
      //累加父级参照物本身的偏移
      totalLeft+=par.offsetLeft;
      totalTop+=par.offsetTop
      par = par.offsetParent;
    }

    return{
      left:totalLeft,
      top:totalTop
    }
  }
  return {
    ...toRefs(state),
    unbindEditEvents,
    bindEditEvents
  }
}
