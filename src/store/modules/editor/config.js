// 数据结构定义
import imgUrl from '../../../assets/images/logo.png'

export const defaultTextData = {
    type: 'text',
    x: 0, // 文本框画板位置x
    y: 0, // 文本框画板位置y
    props: {
      // width: 111, // 文本框宽
      // height: 111, // 文本框高
      fontFamily: {
        fontId: '190',
        name: 'SourceHanSansCN',
        previewUrl: 'https://sslstatic.xiaoyusan.com/dev/huatuo_auth/1502429822.png',
        sourceUrl: 'https://sslstatic.xiaoyusan.com/dev/course/aiwa_1625818028_SourceHanSansCN-Bold.otf'
      }, // 字体
      fontSize: 90, // 字号大小
      fontWeight: 'normal', // 字体粗细
      fontStyle: 'normal', // 字体样式，斜体：italic
      textDecoration: '', // 字体装饰，下划线： underline；中划线：line-through
      textAlign: 'left', // 字体对齐方式
      color: {
        hex: '#000000',
        rgba: { r: 0, g: 0, b: 0, a: 1 },
        color: 'rgba(0,0,0,1)'
      }, // 字颜色
      letterSpacing: 0, // 字间距
      text: '双击编辑文本', // 文本内容
      textContent: '双击编辑文本', // 纯文本内容，text 有些会有dom结构
      opacity: 1, // 字体透明度
      rotate: 0 // 字体旋转
    }
  }
  export const defaultImgData = [
    {
      type: 'img',
      id:1,
      x: 30, // 画板位置x
      y: 50, // 画板位置y
      src:imgUrl,
      props: {
        width:100,
        height:100,
        opacity: 1, // 透明度
        rotate: 0, //
        imgShadows: [] 
      }
    },
    {
      type: 'img',
      id:2,
      x: 300, // 画板位置x
      y: 500, // 画板位置y
      src:imgUrl,
      props: {
        width:100,
        height:100,
        opacity: 1, // 透明度
        rotate: 0, //
        imgShadows: [] 
      }
    },
    {
      type: 'img',
      id:3,
      x: 1300, // 画板位置x
      y: 350, // 画板位置y
      src:'https://sslstatic.xiaoyusan.com/beta/cmspic/1502457499.jpeg',
      props: {
        width:100,
        height:100,
        opacity: 1, // 透明度
        rotate: 0, //
        imgShadows: [] 
      }
    },
    {
      type: 'img',
      id:4,
      x: 300, // 画板位置x
      y: 350, // 画板位置y
      src:'https://sslstatic.xiaoyusan.com/beta/cmspic/1502457499.jpeg',
      props: {
        width:100,
        height:100,
        opacity: 1, // 透明度
        rotate: 30, //
        imgShadows: [] 
      }
    },
    {
      type: 'img',
      id:5,
      x: 320, // 画板位置x
      y: 350, // 画板位置y
      src:'https://sslstatic.xiaoyusan.com/beta/cmspic/1502457499.jpeg',
      props: {
        width:100,
        height:100,
        opacity: 1, // 透明度
        rotate: 0, //
        imgShadows: [] 
      }
    },
    {
      type: 'img',
      id:6,
      x: 120, // 画板位置x
      y: 150, // 画板位置y
      src:'https://sslstatic.xiaoyusan.com/beta/cmspic/1502457499.jpeg',
      props: {
        width:100,
        height:100,
        opacity: 1, // 透明度
        rotate: 45, //
        imgShadows: [] 
      }
    }
  ]

const canvas = {

}
