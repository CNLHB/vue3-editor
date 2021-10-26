<!--  -->
<template>
  <div class="editor_wrap" ref="editorRef">
    <div class="editor_wrap_box gb_scroll layout_center">
        <div class="editor_cnt_box">
            <div class="editor_ele_box">
                <img @click="clickhandle" class="item_img" src="../imgs/qrcode_sample.png" alt="">
            </div>
            <div class="editor_select_box">

            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive,toRefs,toRef } from 'vue';
import useEleEvent from '../hooks/usr-ele-event';

export default {
    setup(props){
      const state = reactive({
        editorRef:null
      })
      const {bindEditEvents} = useEleEvent(toRef(state, 'editorRef'))
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
.editor_wrap{
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  padding: 30px;
  box-sizing: border-box;
}
.editor_wrap_box{
  position: relative;
    height: 100%;
    white-space: nowrap;
    overflow: overlay !important;
}
.editor_cnt_box{
  position: relative;
  z-index: 1;
  display: inline-block;
  white-space: normal;
  box-sizing: border-box;
}
.editor_ele_box{
   display: inline-block;
  width: 300px;
  height: 300px;
  background: #fff;
  // 配合layout_center实现水平垂直居中
  vertical-align: middle;

}
.layout_center{
  text-align: center;
  &:after {
    content: '';
    display: inline-block;
    height: 100%;
    vertical-align: middle;
}
  
}
.item_img{
  position: absolute;
  top: 30px;
  left: 30px;
  width: 100px;
  height:100px;
}
</style>