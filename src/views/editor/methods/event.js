


export const createPointerInfo = (event)=>{
    const target = event.target
    const offset = getOffSet(target)
    let pointerInfo = {
      x: event.offsetX + offset.left,//画布坐标
      y: event.offsetY + offset.top,
      mX: event.pageX,
      mY: event.pageY,
      clientX: event.clientX,
      clientY: event.clientY,
      cx: event.offsetX + offset.left,//编辑器坐标，用于右键菜单
      cy: event.offsetY + offset.top,
    }
    return pointerInfo
}
function getOffSet(curEle){
    var totalLeft = null,totalTop = null,par = curEle.offsetParent;
    //首先加自己本身的左偏移和上偏移
    totalLeft+=curEle.offsetLeft;
    totalTop+=curEle.offsetTop
    //只要没有找到body，我们就把父级参照物的边框和偏移也进行累加
    while(par&&par.getAttribute('data-id')!=='editor_ele_box'){
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