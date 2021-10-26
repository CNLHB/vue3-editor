import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex'
import { COMMITS } from '../../../store/const/editor'

export default function useEditorEvent (ele, {
  isEnterWrap = true
} = {}) {
   const store =  useStore()

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
    ele.value.addEventListener('mousemove', handleMouseMove)
    // body.addEventListener('mouseup', handleMouseUp)
  }

  function unbindEditEvents () {
    ele.value.removeEventListener('mousedown', handleMouseDown)
    ele.value.removeEventListener('mousemove', handleMouseMove)
    body.removeEventListener('mouseup', handleMouseUp)
  }
  function handleMouseDown (event) {
      console.log('editor');
    state.target = event.target
  }
  function handleMouseMove (event) {
    state.target = event.target
    const pointerInfo = {
        x:event.offsetX,
        y:event.offsetY,
    }
    store.commit(COMMITS.SET_POINTER_INFO,pointerInfo)
    console.log(event.pageX);
    console.log(event.pageY);
    console.log(event.clientX);
    console.log(event.clientY);
    console.log(event.offsetY);
    console.log(event.offsetY);
  }
  function handleMouseUp (event) {
    ele.value.removeEventListener('mousemove', handleMouseMove)
  }

  return {
    ...toRefs(state),
    unbindEditEvents,
    bindEditEvents
  }
}
