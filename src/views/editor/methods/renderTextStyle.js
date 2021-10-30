function renderTextStyle (info, opts = {}) {
    const props = info?.props || {}
    let decoration = ''
    let textShadow = ''
  
    if (!props.textDecoration && !props.underline) {
      decoration = 'none'
    } else {
      decoration = `${props.textDecoration || ''} ${props.underline || ''}`
    }
  
    if (props.textShadow) {
      textShadow = props.textShadow.map((item) => {
        const { color = {}, blur, x, y } = item || {}
        return `${x}px ${y}px ${blur}px ${color.color}`
      }).join(',')
    }
  
    return {
      'font-family': `DF_${props.fontFamily?.fontId}`,
      'font-size': `${props.fontSize}px`,
      'font-weight': props.fontWeight,
      'font-style': props.fontStyle,
      'text-decoration': decoration,
      'text-align': props.textAlign,
       color: props.color?.color,
      'letter-spacing': `${props.letterSpacing}px`,
      'line-height': props.rowSpacing,
      'text-shadow': textShadow,
      ...opts
    }
  }
  
  export default renderTextStyle
  