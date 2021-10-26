<template>
  <div class="editor_wrapper" id="editorWrapper">
    <Canvas
      id="editorCanvas"
    />

    <!-- <ScaleBar /> -->
    <!-- <ContextMenu /> -->

  </div>
</template>

<script>
import { onMounted, reactive,toRefs,toRef } from 'vue';
import useEleEvent from '../hooks/usr-ele-event';
import Canvas from './Canvas.vue';
export default {
    components:{
        Canvas
    },
    setup(props){

      const state = reactive({
        editorRef:null
      })
      onMounted(()=>{
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
}
</style>