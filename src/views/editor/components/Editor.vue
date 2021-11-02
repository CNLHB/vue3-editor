<template>
  <div class="editor_wrapper" ref="editorRef" id="editorWrapper">
    <Canvas
      id="editorCanvas"
    />

    <ScaleBar />

    <ContextMenu />

  </div>
</template>

<script>
import { onMounted, reactive,toRefs,toRef } from 'vue';
import useEditorEvent from '../hooks/use-editor-event';
import Canvas from './Canvas.vue';
import ScaleBar from './ScaleBar.vue';
import ContextMenu from './ContextMenu.vue';
export default {
    components:{
        Canvas,
        ScaleBar,
        ContextMenu
    },
    setup(props){
      const state = reactive({
        editorRef:null
      })
      const { bindEditEvents} = useEditorEvent(toRef(state, 'editorRef'))

      onMounted(()=>{
        bindEditEvents()
      })
        function clickhandle(event){
          console.log(event);
        }
        return {
          ...toRefs(state),
          clickhandle
        }
    }
}

</script>
<style lang='less' scoped>
.editor_wrapper{
  width: 100%;
    height: 100%;
    position: relative;
   overflow: hidden;
  // padding: 30px;
  // box-sizing: border-box;

}
</style>