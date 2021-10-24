<!--  -->
<template>
  <div class="wrap">
    <div class="header">
      <ToolBar></ToolBar>
    </div>
    <div class="main">
      <div class="main_l">
        <SideBar />
      </div>
      <div class="main_m" :style="{left:paddingLeft}">
        <Editor />
      </div>
      <div class="main_r">
        <Panel />
      </div>
    </div>
  </div>
</template>

<script>
import { reactive,toRefs } from 'vue'
import Editor from './components/Editor.vue'
import Panel from './components/Panel.vue'
import SideBar from './components/SideBar.vue'
import ToolBar from "./components/ToolBar.vue"
export default {
    components:{
        ToolBar,
        SideBar,
        Editor,
        Panel
    },
    setup(props){
        const state = reactive({
          paddingLeft:'350px'//65px   350px
        })
        return {
          ...toRefs(state)
        }
    }
}

</script>
<style lang="less"  scoped>
.wrap {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  overflow: hidden;
  background: @lineColor;
}
.header{
    position: relative;
  display: flex;
  align-items: center;
  height: @editorToolBarHeight;
  background: #fff;
  box-shadow: 0 1px 10px rgba(0,0,0, 0.01);
  border-bottom: 1px solid @lineColor;
  box-sizing: border-box;
}
.main {
  position: absolute;
  top: @editorToolBarHeight;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
}
.main_l {
  position: relative;
  z-index: 10;
  height: 100%;
}
.main_r {
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  width: @editorPropsPanelWidth;
}
.main_m {
  position: absolute;
  top: 0;
  bottom: 0;
  right: @editorPropsPanelWidth;
  left: @editorSideBarMaterialWidth;
  transition: left .35s;
}

.disabled_editor {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  z-index: 2046;
  cursor: not-allowed;
}
</style>