<!--  -->
<template>
  <div class="toolbar">
    <ToolLeft></ToolLeft>
    <ToolRight></ToolRight>
  </div>
</template>

<script>
import ToolLeft from './toolbar/tool-left.vue'
import ToolRight from './toolbar/tool-right.vue'
export default {
  components:{
    ToolLeft,
    ToolRight
  },
    setup(props){
        
    }
}

</script>
<style lang='less' scoped>
.toolbar{
  display: flex;
  margin: 0 20px;
  height: 100%;
  width: 100%;
  
  align-items: center;
  justify-content: space-between;

}
</style>