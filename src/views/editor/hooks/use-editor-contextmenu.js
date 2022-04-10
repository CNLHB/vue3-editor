import { reactive, toRefs, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { ignoreEle } from '../../../config'
import { ACTIONS, COMMITS, GETTERS } from '../../../store/const/editor'
import { isParentEle } from '../methods'
import { createPointerInfo } from '../methods/event'

export default function useEditorContextMenu(ele, {
  isEnterWrap = true
} = {}) {
  const store = useStore()
  const hoverEleList = computed(() => store.getters[GETTERS.HOVER_ELE_LIST])
  const isDagger = computed(() => store.state.editor.isDagger)
  const selectId = computed(() => store.state.editor.selectId)
  const selectInfo = computed(() => store.getters[GETTERS.SELECT_INFO])
  const pointerInfo = computed(() => store.state.editor.pointerInfo)

  const state = reactive({
    isContextMenuOpen: false,
    menuPst: { x: 0, y: 0 },
    target: null,
    wrapperRef: null

  })
  function bindEvent() {
    state.wrapperRef.addEventListener('mousedown', handleMouseDown)
    state.wrapperRef.addEventListener('contextmenu', handleContextMenu)
  }
  onMounted(() => {
    state.wrapperRef = document.querySelector('#editorWrapper')
    bindEvent()
  }),


    function unBindEditContextMenu() {
      ele.value.removeEventListener('contextmenu', handleContextMenu)
    }
  function handleMouseDown(event) {
    console.log(88);
    if(state.isContextMenuOpen){
      state.isContextMenuOpen = false
      store.commit(COMMITS.DISABLED_DAGGER, false)
      return
    }
  }
  function handleMouseMove(event) {
  }

  function handleMouseUp(event) {


  }
  function onSelectMenu() {
    state.isContextMenuOpen = false;
    store.commit(COMMITS.DISABLED_DAGGER, false)

  }
  function handleContextMenu(event) {
    event.preventDefault();
    if(state.isContextMenuOpen){
      state.isContextMenuOpen = false
      store.commit(COMMITS.DISABLED_DAGGER, false)
      return
    }
    store.commit(COMMITS.DISABLED_DAGGER, true)
    state.isContextMenuOpen = true
    state.menuPst.x = event.pageX
    state.menuPst.y = event.pageY
    console.log('menu');
  }
  return {
    ...toRefs(state),
    onSelectMenu,
  }
}
