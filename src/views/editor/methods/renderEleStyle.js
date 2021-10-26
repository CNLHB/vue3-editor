function renderEleStyle (info) {
    const { x, y, zIndex, props } = info || {}
    const { width, height, opacity, rotate, radius = 0, imgShadows = [], transforms, transformOrigin } = props || {}
  
    let nextImgShadows = {}
  
    if (imgShadows.length > 0) {
      const shadows = imgShadows.map((item) => {
        const { color = {}, blur, x, y, spread } = item || {}
        return `${x}px ${y}px ${blur}px ${spread}px ${color.color}`
      }).join(',')
  
      nextImgShadows = {
        'box-shadow': shadows
      }
    } else {
      nextImgShadows = {
        'box-shadow': 'none'
      }
    }
  
    return {
      left: `${x}px`,
      top: `${y}px`,
      width: width ? `${width}px` : 'auto',
      height: height ? `${height}px` : 'auto',
      'z-index': zIndex,
      opacity,
      transform: transforms ? `${transforms.join(' ')}` : `rotate(${rotate}deg)`,
      'transform-origin': transformOrigin || 'center',
      'border-radius': `${radius}px`,
      ...nextImgShadows
    }
  }
  
  export default renderEleStyle
  