


export const createPointerInfo = (event, boxId)=>{
    const target = event.target
    const offset = getOffSet(target,'editor_ele_box')
    const offsetEditor = getOffSet(target,'editor_wrapper')
    let pointerInfo = {
      x: event.offsetX + offset.left,//画布坐标
      y: event.offsetY + offset.top,
      mX: event.pageX,//编辑器坐标，用于右键菜单
      mY: event.pageY,
      clientX: event.clientX,
      clientY: event.clientY,
      cx: event.offsetX + offsetEditor.left,
      cy: event.offsetY + offsetEditor.top,
    }
    return pointerInfo
}
function getOffSet(curEle,boxId='editor_ele_box'){
    var totalLeft = null,totalTop = null,par = curEle.offsetParent;
    //首先加自己本身的左偏移和上偏移
    totalLeft+=curEle.offsetLeft;
    totalTop+=curEle.offsetTop
    //只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
    while(par&&(par.getAttribute('data-id')!==boxId&&par.getAttribute('id')!==boxId)){
      if(navigator.userAgent.indexOf("MSIE 8.0")===-1){
        //累加父级参照物的边框
        totalLeft+=par.clientLeft;
        totalTop+=par.clientTop
      }
      
      //累加父级参照物本身的偏移
      totalLeft+=par.offsetLeft;
      totalTop+=par.offsetTop
      par = par.offsetParent;
    }

    return{
      left:totalLeft,
      top:totalTop
    }
  }