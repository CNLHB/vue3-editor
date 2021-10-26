<template>
  <div class="t_left">
    <div class="logo">
      <a href="/editor/index"> 海报设计 </a>
    </div>
    <div class="l_setting">
      <div>
        <el-button class="custom_btn" type="text"> 设置 </el-button>
      </div>
      <div>
        <el-button class="custom_btn" type="text"> 视图 </el-button>
      </div>
    </div>
    <div class="tool_line"></div>

    <div class="l_action">
      <el-button class="custom_btn disabled" type="text">
        <span class="action_btn undo"></span>
      </el-button>
      <el-button class="custom_btn custom_btn_redo" type="text">
        <span class="action_btn redo disabled"></span>
      </el-button>
    </div>
    <div class="doc_title"> 
        <DocTitle></DocTitle>
    </div>
  </div>
</template>

<script>
import { reactive, toRefs } from 'vue'
import { useMouse, usePreferredDark, useLocalStorage } from '@vueuse/core'
import DocTitle from './doc-title.vue'
export default {
  name: 'tool-left',
  components:{
    DocTitle
  },
  setup(props) {
    const state = reactive({
      domRef: null,
    })
    // tracks mouse position
    const { x, y } = useMouse({})

    return { x, y }
    return {
      ...toRefs(state),
    }
  },
}
</script>

<style scoped lang="less">
.t_left {
  display: flex;
  align-items: center;
}
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;
}
.l_setting {
  display: flex;
  align-items: center;
}

.custom_btn {
  padding: 0 12px;
  color: #444950;
  &:hover {
    background-color: #f1f2f4;
    border-color: #f1f2f4;
  }

  &.custom_btn_redo {
    margin-left: 0;
  }
}
.tool_line {
  width: 0;
  height: 20px;
  margin: 0 8px;
  border-left: 1px solid #dadde1;
}
.l_action {
  display: flex;
  .action_btn {
    display: inline-block;
    font-size: 12px;
    padding: 0;
    width: 20px;
    height: 20px;
  }
  .undo {
    background: url(../../imgs/redo_ennable.png) no-repeat center;
    transform: rotateY(180deg);
    &.disabled {
      background: url(../../imgs/undo_disable.png) no-repeat center;
      transform: rotateY(0deg);
      cursor: not-allowed;
    }
  }
  .redo {
    background: url(../../imgs/redo_ennable.png) no-repeat center;
    &.disabled {
      background: url(../../imgs/undo_disable.png) no-repeat center;
      transform: rotateY(180deg);
      cursor: not-allowed;
    }
  }
}
.doc_title{
  margin-left: 20px;
}
</style>