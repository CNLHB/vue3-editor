<template>
        <el-input
        v-if="inputVisible"
        ref="saveTagInput"
        v-model="inputValue"
        class="input-new-tag"
        size="mini"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >文档标题</el-button
      >
</template>

<script>
import {reactive,toRefs} from 'vue'
export default {
  name: "tool-right",
  setup(props) {
    const state = reactive({
        inputVisible:false,
        inputValue:'文档标题'
    })
    function handleInputConfirm(){
        state.inputVisible = false

    }
    function showInput(){
        state.inputVisible = true
    }
    return {
        ...toRefs(state),
        handleInputConfirm,
        showInput
    }
  }
}
</script>

<style scoped lang="less">
.t_right{
  justify-self: flex-end;
}
</style>