/**
 * COMMITS
 */

// 更新文档标题
const SET_DOC_TITLE = 'editor/setDocTitle'
// 更新文档标题
const SET_POINTER_INFO = 'editor/setPointerInfo'
// 更新选择框样式
const UPDATE_SELECT_STYLE = 'editor/updateSelectStyle'

// 更新元素Hover框样式
const UPDATE_HOVER_STYLE = 'editor/updateHoverStyle'

// 设置选择元素ID
const SET_SELECT_ELEID = 'editor/setSelectEleId'

// 设置选择Hover元素ID
const SET_HOVER_ELEID = 'editor/setHoverEleId'

// 更改元素层级
const CHANGE_ELEMENT_INDEX = 'editor/changeElementIndex'

// 增加回撤记录
const PUSH_HISTORY_UNDO = 'editor/pushHistoryUndo'

// 增加重做记录
const PUSH_HISTORY_REDO = 'editor/pushHistoryRedo'

// 清理历史记录
const CLEAR_HISTORY = 'editor/cleareHistory'

// 更新当前画布元素数据
const UPDATE_CUR_CANVAS_ELEMENT = 'editor/updateCurCanvasElement'

// 更新当前画板数据
const UPDATE_CUR_CANVAS = 'editor/updateCurCanvas'

// 删除画面元素
const DELETE_CANVAS_ELEMENT = 'editor/deleteCanvasElement'

// 设置画布缩放比例
const SET_CANVAS_SCALE_RATIO = 'editor/setCanvasScaleRatio'

// 设置素材面板拖拽元素信息
const SET_MATERIAL_GHOST_INFO = 'editor/setMaterialGhostInfo'

// 选中框缩放操作点是否在拖拽
const SET_IS_SELECT_POT_DRAG = 'editor/setIsSelectPotDrag'

// 画面文本元素是否正在编辑
const SET_IS_EDITING_ELE_TEXT = 'editor/setIsEditEleText'

// 画面素是否正在编辑右侧面板
const SET_IS_EDIT_PANEL_PROPS = 'editor/setIsEditPanelProps'

// 设置素材面板宽度
const SET_MATERIAL_PANEL_WIDTH = 'editor/setMaterialPanelWidth'

// 更新选中元素复制数据
const UPDATE_ELE_COPY_DATA = 'editor/updateEleCopyData'

// 设置画面标题
const SET_CANVAS_TITLE = 'editor/setCanvasTitle'

// 更新画布属性
const UPDATE_CANVAS_PALETTE = 'editor/updateCanvasPalette'

// 是否正在编辑
const IS_PANEL_EDITING = 'editor/setIsPanelEditing'

// 设置元素异步加载状态MAP
const SET_ELE_LOADING_MAP = 'editor/setEleLoadingMap'

// 设置页面标题
const SET_PAGE_TITLE = 'editor/setPageTitle'

// 设置角色
const SET_USER_ROLE = 'editor/setUserRole'

// 除下载外禁用编辑器
const SET_EDITOR_DISABLED = 'editor/setEditorDisabled'

// 唤起顶栏保存
const CALL_TOOLBAR_SAVE = 'editor/callToolBarSave'

// 设置按键（组合键）值
const SET_PRESS_KEYS = 'editor/setPressKeys'

// 设置多选元素id
const SET_GROUP_SELECT_ELE_ID = 'editor/setGroupSelectEleId'

// 设置多选元素框样式
const SET_GROUP_SELECT_ELE_STYLE = 'editor/setGroupSelectEleStyle'

export const COMMITS = {
  UPDATE_SELECT_STYLE,
  UPDATE_HOVER_STYLE,
  SET_SELECT_ELEID,
  CHANGE_ELEMENT_INDEX,
  PUSH_HISTORY_UNDO,
  UPDATE_CUR_CANVAS_ELEMENT,
  UPDATE_CUR_CANVAS,
  PUSH_HISTORY_REDO,
  SET_MATERIAL_GHOST_INFO,
  SET_CANVAS_SCALE_RATIO,
  SET_IS_SELECT_POT_DRAG,
  SET_IS_EDITING_ELE_TEXT,
  SET_MATERIAL_PANEL_WIDTH,
  CLEAR_HISTORY,
  UPDATE_ELE_COPY_DATA,
  DELETE_CANVAS_ELEMENT,
  SET_CANVAS_TITLE,
  SET_IS_EDIT_PANEL_PROPS,
  UPDATE_CANVAS_PALETTE,
  IS_PANEL_EDITING,
  SET_ELE_LOADING_MAP,
  SET_PAGE_TITLE,
  SET_USER_ROLE,
  SET_EDITOR_DISABLED,
  CALL_TOOLBAR_SAVE,
  SET_HOVER_ELEID,
  SET_PRESS_KEYS,
  SET_GROUP_SELECT_ELE_ID,
  SET_GROUP_SELECT_ELE_STYLE,
  SET_DOC_TITLE,
  SET_POINTER_INFO
}

/**
 * GETTERS
 */

// 画面视图数据（和真实数据有比例关系）
const VIEW_CANVAS = 'editor/viewCanvas'

// 侧栏预览canvas数据（测栏canvas为某固定比例）
const PREVIEW_CANVAS = 'editor/preViewCanvas'

// 视图画布元素数据map
const CURRENT_ELEMENT_INFO_MAP = 'editor/currentElementInfoMap'

// 选中元素数据
const SEL_ELE_INFO = 'editor/selEleInfo'

// 视图画面层叠元素
const SELECT_ELE_OVERLAP = 'editor/selectEleOverlap'

// 画布真实尺寸
const CANVAS_REAL_SIZE = 'editor/canvasRealSize'

// 是否单击多选
const IS_PRESS_CLICK = 'editor/isPressClick'

const GROUP_SELECT_ELE_DATA = 'editor/groupSelectEleData'

export const GETTERS = {
  VIEW_CANVAS,
  PREVIEW_CANVAS,
  CURRENT_ELEMENT_INFO_MAP,
  SELECT_ELE_OVERLAP,
  CANVAS_REAL_SIZE,
  SEL_ELE_INFO,
  IS_PRESS_CLICK,
  GROUP_SELECT_ELE_DATA
}

// 更新选择框、hover框样式
const TO_UPDATE_OPERATE_SIZE = 'editor/updateOperateSize'

// 更新画布元素属性
const TO_UPDATE_ELE_PROPS = 'editor/updateEleProps'

// 保存当前编辑器信息
const TO_SAVE = 'editor/save'

// 编辑器信息另存为
const TO_SAVE_AS = 'editor/saveAs'

// 获取已存在编辑器信息
const TO_GET_PAGE_DATA = 'editor/getPageData'

// 历史记录
const TO_PUSH_HISTORY_UNDO = 'editor/toPushHistoryUndo'

export const ACTIONS = {
  TO_UPDATE_OPERATE_SIZE,
  TO_UPDATE_ELE_PROPS,
  TO_SAVE,
  TO_SAVE_AS,
  TO_GET_PAGE_DATA,
  TO_PUSH_HISTORY_UNDO
}
