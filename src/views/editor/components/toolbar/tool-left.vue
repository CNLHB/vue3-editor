<template>
  <div class="t_left">
      <div class="logo">
    <a href="/editor/index">
      海报设计
    </a>
  </div>
  <div class="l_setting">
    <div>
      <el-button class="custom_btn" type="text">
        设置
      </el-button>
    </div>
    <div>
      <el-button class="custom_btn" type="text">
        视图
      </el-button>
      
    </div>
  </div>
     <div class="tool_line"></div>

    <div class="l_action ">
      <el-button  class="custom_btn" type="text">
        撤回
      </el-button>
    </div>
    <div>
      <el-button class="custom_btn" type="text">
        重做
      </el-button>
  </div>
  </div>
</template>

<script>
import {reactive,toRefs} from 'vue'
import { useMouse, usePreferredDark, useLocalStorage } from '@vueuse/core'


export default {
  name: "tool-left",
  setup(props) {
    const state = reactive({
      domRef:null
    })
    // tracks mouse position
    const { x, y } = useMouse({
    })


    return { x, y}
    return {
        ...toRefs(state)
    }
  }
}
</script>

<style scoped lang="less">
.t_left{
  display: flex;
  align-items: center;
}
.logo{
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 40px;

}
.l_setting{
  display: flex;
  align-items: center;
}

  .custom_btn{
    padding: 0 12px;
    color: #444950;
    &:hover{
      background-color: #f1f2f4;
      border-color: #f1f2f4;
    }
  }
.tool_line{
    width: 0;
    height: 20px;
    margin: 0 8px;
    border-left: 1px solid #dadde1;
}
.l_action{
  display: flex;
    .undo{
        font-size: 12px;
    width: 19px;
    height: 18px;
    min-height: 0;
    padding: 0;
    border: 0 none;
    transition: none!important;
    background-color: transparent!important;
    background: url(../imgs/undo_disable.png) no-repeat center;

  }
  
}
</style>