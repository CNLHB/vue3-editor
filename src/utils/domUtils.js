import {
  renderEleStyle,
  renderTextStyle
} from '../views/editor/methods'

export const selectDomById = (id) => {
  const oDiv = document.querySelector(`div[data-id=${id}]`);
  return oDiv;
};

function rotation(x, y, arrowX, arrowY, angle) {
  const newX =
    (x - arrowX) * Math.cos(angle) - (y - arrowY) * Math.sin(angle) + arrowX
  const newY =
    (x - arrowX) * Math.sin(angle) + (y - arrowY) * Math.cos(angle) + arrowY
  return {
    x: newX,
    y: newY
  }
}
export const createPointer = (ele) => {
  if (!ele) return []
  // 还需要算旋转后的真实值
  let {
    x,
    y,
    props
  } = ele || {};
  let rotate = props.rotate || 0
  if (!x) return [];
  //(rotate > 0 ? -rotate : rotate)
  const angle = (Math.PI * rotate) / 180
  const rotateX = x + props.width / 2
  const rotateY = y + props.height / 2
  /**
   * 0  1   2
   * 3      4
   * 5  6   7
   */
  // const arr = [
  //   { ...rotation(x,y,rotateX,rotateY,angle), visible: true },
  //   { x: x + props.width / 2, y: y, visible: true },
  //   { x: x + props.width, y: y, visible: true },
  //   { x: x, y: y + props.height / 2, visible: true },
  //   { x: x + props.width, y: y + props.height / 2, visible: true },
  //   { x: x, y: y + props.height, visible: true },
  //   { x: x + props.width / 2, y: y + props.height, visible: true },
  //   { x: x + props.width, y: y + props.height, visible: true },
  // ];
  const arr = [{
      ...rotation(x, y, rotateX, rotateY, angle),
      visible: true,
      cursor: 'nwse-resize'
    },
    {
      ...rotation(x + props.width / 2, y, rotateX, rotateY, angle),
      visible: true,
      cursor: 'ns-resize'
    },
    {
      ...rotation(x + props.width, y, rotateX, rotateY, angle),
      visible: true,
      cursor: 'nesw-resize'
    },
    {
      ...rotation(x, y + props.height / 2, rotateX, rotateY, angle),
      visible: true,
      cursor: 'ew-resize'
    },
    {
      ...rotation(x + props.width, y + props.height / 2, rotateX, rotateY, angle),
      visible: true,
      cursor: 'ew-resize'
    },
    {
      ...rotation(x, y + props.height, rotateX, rotateY, angle),
      visible: true,
      cursor: 'nesw-resize'
    },
    {
      ...rotation(x + props.width / 2, y + props.height, rotateX, rotateY, angle),
      visible: true,
      cursor: 'ns-resize'
    },
    {
      ...rotation(x + props.width, y + props.height, rotateX, rotateY, angle),
      visible: true,
      cursor: 'nwse-resize'
    },
  ];
  return arr;
};


export const updateElePosition = function (ele) {
  const {
    type
  } = ele
  if (Array.isArray(ele)) {
    ele.forEach(e => {
      const {
        type
      } = e
      const dom = document.querySelector(`[data-id="${e.id}"]`)
      if (dom) {
        const style = type !== 'text' ? renderEleStyle(e) : renderTextStyle(e)
        // left: 422.067px; top: 113.633px; width: 32.4667px; height: 32.4667px;
        //  opacity: 1; transform: rotate(250deg); transform-origin: center center; box-shadow: none;
        let styleText = ''
        Object.keys(style).forEach(key => {
          styleText += `${key}:${style[key]};`
        })
        console.log(styleText);
        // dom.setAttribute('style', styleText)
        dom.style.left = style.left
        dom.style.top = style.top
      }
    })
  } else {
    const dom = document.querySelector(`[data-id="${ele.id}"]`)
    if (dom) {
      const style = type !== 'text' ? renderEleStyle(ele) : renderTextStyle(ele)
      dom.style.left = style.left
      dom.style.top = style.top
      Object.keys(style).forEach(key => {
        // dom.style[key] = style[key]

      })
    }
  }
}

export function createRect(selEle) {
  /**
  * 和角公式
  * bx=ax*cosβ-ay*sinβ
    by=ay*cosβ+ax*sinβ
  */
  let {
    width: BWidth,
    height: BHeight,
    rotate
  } = selEle.props // 选中元素 拖拽的最后的元素,有旋转特殊处理,角度转弧度
  const angle = (Math.PI * (rotate > 0 ? -rotate : rotate)) / 180
  const arrowX = selEle.x + BWidth / 2 // 圆心
  const arrowY = selEle.y + BHeight / 2
  // 四个顶点求最小值做为对齐点
  const x = selEle.x
  const y = selEle.y
  const x1 = x + BWidth
  const y1 = y
  const x2 = x
  const y2 = y + BHeight
  const x3 = x + BWidth
  const y3 = y + BHeight
  const newXY = rotation(x, y, arrowX, arrowY, angle)
  const newXY1 = rotation(x1, y1, arrowX, arrowY, angle)
  const newXY2 = rotation(x2, y2, arrowX, arrowY, angle)
  const newXY3 = rotation(x3, y3, arrowX, arrowY, angle)
  const minX = Math.min(newXY.x, newXY1.x, newXY2.x, newXY3.x)
  const minY = Math.min(newXY.y, newXY1.y, newXY2.y, newXY3.y)
  /**
   * 这里因为旋转后视觉宽高发生了变化，需要获取宽高
   */
  const dom = document.querySelector(`div[data-id="${selEle.id}"]`)
  if (!dom) return {
    BWidth: 0,
    BHeight: 0,
    left: 0,
    top: 0
  }
  BWidth = dom.getBoundingClientRect().width
  BHeight = dom.getBoundingClientRect().height
  return {
    BWidth,
    BHeight,
    top: minY,
    left: minX
  }
}