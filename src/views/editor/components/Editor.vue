<!--  -->
<template>
  <div class="editor_wrap">
    <div class="editor_wrap_box gb_scroll layout_center">
        <div class="editor_cnt_box">
            <div class="editor_ele_box">
                <img class="item_img" src="../imgs/qrcode_sample.png" alt="">
            </div>
            <div class="editor_select_box">

            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {
    setup(props){
        
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
  width: 1000px;
  height: 1000px;
  background: #fff;
}
.layout_center{
  // display: flex;
  // justify-content: center;
  // align-items: center;
  
}
.item_img{
  position: absolute;
  top: 30px;
  left: 30px;
  width: 100px;
  height:100px;
}
</style>