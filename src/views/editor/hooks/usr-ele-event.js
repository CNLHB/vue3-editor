import { reactive, toRefs } from 'vue'

export default function useeleEvent (ele, {
  isEnterWrap = true
} = {}) {
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
    body.addEventListener('mouseup', handleMouseUp)
  }

  function unbindEditEvents () {
    ele.value.removeEventListener('mousedown', handleMouseDown)
    ele.value.removeEventListener('mousemove', handleMouseMove)
    body.removeEventListener('mouseup', handleMouseUp)
  }
  function handleMouseDown (event) {
      console.log('down');
    console.log(event);
    console.log(event.target);
    state.target = event.target
    ele.value.addEventListener('mousemove', handleMouseMove)
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
