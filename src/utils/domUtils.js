export const selectDomById = (id) => {
  const oDiv = document.querySelector(`div[data-id=${id}]`);
  return oDiv;
};
export const createPointer = (ele) => {
  // 还需要算旋转后的真实值
  let { x, y, props } = ele || {};
  if (!x) return [];
  /**
   * 0  1   2
   * 3      4
   * 5  6   7
   */
  const arr = [
    { x, y, visible: true },
    { x: x + props.width / 2, y: y, visible: true },
    { x: x + props.width, y: y, visible: true },
    { x: x, y: y + props.height / 2, visible: true },
    { x: x + props.width, y: y + props.height / 2, visible: true },
    { x: x, y: y + props.height, visible: true },
    { x: x + props.width / 2, y: y + props.height, visible: true },
    { x: x + props.width, y: y + props.height, visible: true },
  ];
  console.log(arr);
  return arr;
};
