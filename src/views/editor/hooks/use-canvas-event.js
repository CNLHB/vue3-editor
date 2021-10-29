import { reactive, toRefs } from 'vue'
import { useStore } from 'vuex/types/index.js'

export default function useCanvasEvent (ele, {
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

    body.addEventListener('mouseup', handleMouseUp)
  }

  function unbindEditEvents () {
    ele.value.removeEventListener('mousedown', handleMouseDown)
    ele.value.removeEventListener('mousemove', handleMouseMove)
    body.removeEventListener('mouseup', handleMouseUp)
  }
  function handleMouseDown (event) {
      console.log('down');
    state.target = event.target
    // ele.value.addEventListener('mousemove', handleMouseMove)
  }
  function handleMouseMove (event) {
      console.log(event);
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
