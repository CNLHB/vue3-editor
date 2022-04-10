<!--  -->
<template>
  <div  @mousedown="handleClick" ref="menuRef" v-if="isContextMenuOpen" class="menu_wrap menu" :style="renderMenuStyle">
      <el-menu mode="horizontal" @select="handleSelect">
     <!-- <el-menu-item index="1">Processing Center</el-menu-item> -->
    <!-- <el-sub-menu index="2">
      <template #title>Workspace</template>
      <el-menu-item index="2-1">item one</el-menu-item>
      <el-menu-item index="2-2">item two</el-menu-item>
      <el-menu-item index="2-3">item three</el-menu-item>
      <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
    </el-sub-menu>
    <el-menu-item index="3" disabled>Info</el-menu-item>
    <el-menu-item index="4">Orders</el-menu-item> -->
      <el-menu-item-group index="1">
        <el-menu-item index="copy"><span>复制</span><i>⌘ + C</i></el-menu-item>
        <el-sub-menu index="2-4">
        <template #title>item four</template>
        <el-menu-item index="2-4-1">item one</el-menu-item>
        <el-menu-item index="2-4-2">item two</el-menu-item>
        <el-menu-item index="2-4-3">item three</el-menu-item>
      </el-sub-menu>
        <el-menu-item index="paste" :disabled="isPasteDisabled"><span>粘贴</span><i>⌘ + V</i></el-menu-item>
      </el-menu-item-group>
    </el-menu>
  </div>
</template>

<script>

import { reactive, toRefs ,toRef,computed, watch, watchEffect, onMounted} from 'vue'
import { useStore } from 'vuex'
import { GETTERS } from '@commits/editor'
import { useEditorContextMenu } from '../hooks'

export default {

    setup(props){
      const store = useStore()
            const state = reactive({
                menuRef:null,
                isCopyDisabled:true,
                isPasteDisabled:true,
      })
     const { isContextMenuOpen, menuPst, onSelectMenu} = useEditorContextMenu()
     watchEffect(()=>{
     })
        const pointerInfo =  computed(()=>store.state.editor.pointerInfo);
        // watch(()=>pointerInfo.value,(current,parent)=>{
        //     // console.log(current);
        // },{deep:true})

        const renderMenuStyle = computed(()=>{
            return {
                left: menuPst.value.x + 'px',
                top: menuPst.value.y + 'px',
                zIndex:111

            }
        })

        function handleSelect(item){
          console.log(item);
          onSelectMenu()
        }
        function handleClick(e){
          e.stopPropagation()
        }
      return {
        ...toRefs(state),
        isContextMenuOpen,
        renderMenuStyle,
        pointerInfo,
        handleSelect,
        handleClick
      }
    }
}

</script>
<style lang='less' scoped>

.menu_wrap{
    position: fixed;
    top:0;
    left: 0;
    width: 150px;
}
.menu {
//   position: absolute;
//   left: 50%;
//   top: 0;
  z-index: 1000;
  border: 1px solid var(--lineColor);
  border-radius: 4px;
//   opacity: 0;
  transition: opacity .35s;
  :deep(.el-menu) {
    // .el-menu {
      min-width: 200px;
      border: 0 none;
      padding: 5px 0;
    // }
    .el-menu-item {
      &.is-disabled {
        opacity: 1;
        color: var(--disabledColor);
      }
    }
    .el-menu-item, .el-submenu__title {
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 36px;
      padding: 0 15px;
      line-height: normal;
      i {
        width: auto;
        text-align: right;
        font-size: 12px;
        font-style: normal;
        // color: var(--disabledColor);
        &.menu_icon {
          color: #333;
        }
      }
      &.menu_item_delete {
        color: var(--dangerColor);
      }
    }
    .el-menu-item-group__title {
      position: relative;
      padding: 5px 0!important;
    }
    .menu_group_line {
      position: absolute;
      right: 15px;
      left: 15px;
      top: 50%;
      transform: translateY(-50%);
      height: 1px;
      background: var(--lineColor);
      overflow: hidden;
    }
    .el-menu-item-group {
      outline: none!important;
      &:nth-child(1) {
        .el-menu-item-group__title {
          display: none;
        }
      }
    }
    .el-submenu__title .el-submenu__icon-arrow {
      display: none;
    }

    .el-popper {
      transition: none!important;
      border: 1px solid var(--lineColor);
      .el-menu-item {
        color: #333;
        &:hover {
          background: #ecf5ff;
          color: #333;
        }
        &.is-disabled {
          opacity: 1;
          color: var(--disabledColor);
        }
      }
    }

    .menu_ele_group {
      .el-menu--horizontal {
        max-width: 220px;
        max-height: 272px;
        overflow: auto;
        box-sizing: border-box;
      }
      .el-menu {
        overflow: visible;
      }
    }

    .menu_ele {
      position: relative;
      height: auto;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      margin: 5px 0;
      .menu_ele_img {
        --width: 50px;
        min-width: var(--width);
        min-width: var(--width);
        width: var(--width);
        height: var(--width);
        display: flex;
        align-items: center;
        justify-content: center;
        margin-right: 10px;
        border: 1px solid var(--lineColor);
        border-radius: 8px;
        overflow: hidden;
        img {
          max-width: 90%;
          max-height: 90%;
        }
      }
      .menu_ele_desc {
        flex: 1;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        font-size: 14px;
        padding: 0 10px 0 0;
      }
      .menu_ele_lock_layer {
        position: absolute;
        right: 10px;
        top: 50%;
        transform: translateY(-60%);
        width: 10px;
        height: 10px;
        text-align: right;
      }
    }

  }
}
</style>