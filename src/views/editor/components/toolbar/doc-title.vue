<template>
        <el-input
        v-if="inputVisible"
        ref="inputRef"
        v-model="inputValue"
        class="input-new-tag"
        size="mini"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >{{inputValue}}</el-button
      >
</template>

<script>
import {nextTick, reactive,toRefs} from 'vue'
export default {
  name: "tool-right",
  setup(props) {
    const state = reactive({
        inputVisible:false,
        inputValue:'文档标题',
        inputRef:null
    })
    function handleInputConfirm(){
        state.inputVisible = false

    }
    function showInput(){
        state.inputVisible = true
        nextTick((_) => {
            state.inputRef.focus()
      })
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
.button-new-tag{
    max-width: 150px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
</style>