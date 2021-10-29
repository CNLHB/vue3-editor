export const selectDomById = (id) => {
  const oDiv = document.querySelector(`div[data-id=${id}]`);
  return oDiv;
};
function rotation (x, y, arrowX, arrowY, angle) {
  const newX =
    (x - arrowX) * Math.cos(angle) - (y - arrowY) * Math.sin(angle) + arrowX
  const newY =
    (x - arrowX) * Math.sin(angle) + (y - arrowY) * Math.cos(angle) + arrowY
  return { x: newX, y: newY }
}
export const createPointer = (ele) => {
  if(!ele)return []
  // 还需要算旋转后的真实值
  let { x, y, props } = ele || {};
  let rotate = props.rotate||0
  if (!x) return [];
  //(rotate > 0 ? -rotate : rotate)
  const angle = (Math.PI * rotate) / 180
  const rotateX  = x + props.width / 2
  const rotateY  = y + props.height / 2
  console.log(rotate);
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
  const arr = [
    { ...rotation(x,y,rotateX,rotateY,angle), visible: true },
    { ...rotation(x + props.width / 2,y,rotateX,rotateY,angle), visible: true },
    { ...rotation(x + props.width,y,rotateX,rotateY,angle), visible: true },
    {...rotation(x ,y+ props.height / 2,rotateX,rotateY,angle), visible: true },
    { ...rotation(x+ props.width ,y+ props.height / 2,rotateX,rotateY,angle), visible: true },
    {...rotation(x,y+ props.height ,rotateX,rotateY,angle),visible: true },
    { ...rotation(x+ props.width / 2,y+ props.height ,rotateX,rotateY,angle), visible: true },
    {...rotation(x+ props.width,y+ props.height ,rotateX,rotateY,angle), visible: true },
  ];
  console.log(arr);
  return arr;
};
