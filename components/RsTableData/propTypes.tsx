import PropTypes from 'prop-types';

/**
 * 可使用的实例方法参照：./README.md
 */

export const defaultProps = {
  size: 'middle',
  dataMode: 'main',
  storeWay: 'be',
  hasAdd: true,
  hasModify: true,
  hasDelete: true,
  hasBeSort: true,
  defaultColumnWidth: 200,
  hasRowModify: true,
  hasRowView: true,
  hasRowDelete: true,
  hasBeBtns: false,
  actionBarWidth: 300,
  actionBarFixed: true,
  recordFormName: 'default',
  editFormName: 'default',
  subtractH: 0,
  advSearchFormName: 'default',
  recordFormType: 'modal',
  recordFormContainerProps: {},
  advSearchValidationFields: [],
  hasRowEdit: false,
  hasAdvSearch: true,
  advSearchContainerType: 'drawer',
  formProps: {},
  hasResizeableBox: true,
  width: '100%',
  height: '100%',
  hasZoomInOut: false,
  defaultPagination: {
    current: 1,
    pageSize: 10,
    showSizeChanger: true,
    showQuickJumper: true
  },
  bordered: true,
  importContainerProps: {},
  importContainerType: 'drawer',
  rowEditText: '编辑',
  enEditText: 'Edit',
  rowModifyText: '修改',
  enRowModifyText: 'Modify',
  rowViewText: '查看',
  enRowViewText: 'View',
  rowDeleteText: '删除',
  enRowDeleteText: 'Delete',
  addText: '添加',
  enAddText: 'Add',
  modifyText: '修改',
  enModifyText: 'Modify',
  recordFormFormWidth: '50%',
  recordFormTabsWidth: '50%',
  advSearch: {
    searchComponent: 'both',
    containerType: 'drawer',
    formName: 'default',
    validationFields: [],
    isUseTableFields: true,
    fields: []
  },
  hasRowSelection: false,
  importConfig: {
    mode: 'be',
    saveState: 'editoradd',
    containerType: 'drawer'
  }
};

export const propTypes = {
  /**
   * 表格标题
   */
  title: PropTypes.string,

  /**
   * 数据模式
   * 可选：'main' | 'sub'
   * 默认：'main'
   * 描述：'main' 表示主表数据；'sub' 表示子表数据
   */
  dataMode: PropTypes.oneOf(['main', 'sub']),

  /**
   * 表格数据存储方式
   * 可选：'fe' | 'be'
   * 默认：'be'
   * 描述：'fe' 表示表格数据存储在前端，每次添加、修改表格数据时，只是在前端添加，而不发送请求进行后端数据的添加；'be' 表示数据存储在后端，每次添加、修改都会发送请求，修改后端数据库的表格数据
   */
  storeWay: PropTypes.oneOf(['fe', 'be']),

  /**
   * 表格尺寸
   * 默认：'middle'
   */
  size: PropTypes.oneOf(['large', 'middle', 'small']),

  /**
   * 表格宽度
   * 默认：'100%'
   */
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * 表格高度
   * 默认：'100%'
   */
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),

  /**
   * 主表id
   * 默认：-
   */
  resid: PropTypes.number.isRequired,

  /**
   * 预设查询编号
   * 默认：-
   */
  mtsid: PropTypes.number,

  /**
   * 子表 id
   * 默认：-
   */
  subresid: (props, propName, componentName) => {
    // 当 dataMode 为 "sub" 且 storeWay 为 "be" 时，subresid 是必传的
    if (props.dataMode === 'sub' && props.storeWay === 'be') {
      return typeof props[propName] === 'number'
        ? null
        : new Error('lz-table: subresid 无效，subresid 必须为 number 类型');
    }
  },

  /**
   * 主表记录编号
   * 默认：-
   */
  hostrecid: (props, propName, componentName) => {
    // 当 dataMode 为 "sub" 且 storeWay 为 "be" 时，hostrecid 是必传的
    if (props.dataMode === 'sub' && props.storeWay === 'be') {
      return typeof props[propName] === 'number'
        ? null
        : new Error('lz-table: hostrecid 无效，hostrecid 必须为 number 类型');
    }
  },

  /**
   * 要获取数据的字段
   * 默认：-
   * 例子：'C3_511302422114,C3_511302066880,C3_511302131411'
   */
  cmscolumns: PropTypes.string,

  /**
   * where 子句
   * 默认：-
   * 例子：'C3_511302422114 = 1'
   */
  cmswhere: PropTypes.string,

  // 按钮相关的 props
  /**
   * 默认分页配置
   * 默认：{ current: 1, pageSize: 10 }
   */
  defaultPagination: PropTypes.object,

  /**
   * 是否有后端排序功能
   * 默认：true
   */
  hasBeSort: PropTypes.bool,

  // ===========================================================
  // 表格列相关的 props ==========================================
  // ===========================================================
  /**
   * 默认列宽度
   * 默认：200
   */
  defaultColumnWidth: PropTypes.number,

  /**
   * 自定义列宽度
   * 默认：-
   * 如：{ '姓名': 100, '工号': 150 }
   */
  columnsWidth: PropTypes.object,

  /**
   * 固定列
   * 默认：-
   * 如：['姓名', '工号']
   */
  fixedColumns: PropTypes.array,

  // ===========================================================
  // 操作栏相关的 props ===============================================
  // ===========================================================
  /**
   * 操作栏的宽度
   * 默认：300
   */
  actionBarWidth: PropTypes.number,

  /**
   * 操作栏是否固定在右侧（注意：固定列时，不能开启行内编辑功能）
   * 默认：true
   */
  actionBarFixed: PropTypes.bool,

  // ===========================================================
  // 窗体名称相关的 props =========================================
  // ===========================================================
  /**
   * 记录表单所用窗体的窗体名称
   * 默认：default
   */
  recordFormName: PropTypes.string,

  /**
   * 行内编辑所用窗体的窗体名称
   * 默认：default
   */
  rowEditFormName: PropTypes.string,

  /**
   * 记录表单中 PwForm 组件接收的 props
   * 默认：{}
   */
  formProps: PropTypes.object,

  /**
   * 高级字典表格的配置
   * 默认：-
   */
  AdvDicTableProps: PropTypes.object,

  /**
   * 自定义行按钮
   * 默认：-
   */
  customRowBtns: PropTypes.array,
  // 如：
  // [
  //   (record, btnSize) => {
  //     return <Button>按钮1</Button>
  //   },
  //   (record, btnSize) => {
  //     return <Button>按钮2</Button>
  //   }
  // ]
  // record 表示当前记录
  // btnSize 表示按钮尺寸

  /**
   * 表格高度 - scroll.y 的值（当横向滚动条被遮住时，需要添加这个参数。其值为 TableData 组件除去中间内容的其他高度）
   * 默认：0
   */
  subtractH: PropTypes.number,

  // ===========================================================
  // 按钮相关的 props ============================================
  // ===========================================================
  /**
   * 是否有添加按钮
   * 默认：true
   */
  hasAdd: PropTypes.bool,

  /**
   * 添加按钮文字
   * 默认：'添加'
   */
  addText: PropTypes.string,

  /**
   * 添加按钮文字（英文）
   * 默认：'Add'
   */
  enAddText: PropTypes.string,

  /**
   * 是否有修改按钮
   * 默认：true
   */
  hasModify: PropTypes.bool,

  /**
   * 修改按钮文字
   * 默认：'修改'
   */
  modifyText: PropTypes.string,

  /**
   * 修改按钮文字（英文）
   * 默认：'Modify'
   */
  enModifyText: PropTypes.string,

  /**
   * 是否有删除按钮
   * 默认：true
   */
  hasDelete: PropTypes.bool,

  /**
   * 是否有行编辑按钮（注意：开启行内编辑时，不能固定操作栏！）
   * 默认：false
   */
  hasRowEdit: PropTypes.bool,

  /**
   * 行编辑按钮文字
   * 默认：'编辑'
   */
  rowEditText: PropTypes.string,

  /**
   * 行编辑按钮文字（英文）
   * 默认：'Edit'
   */
  enRowEditText: PropTypes.string,

  /**
   * 是否有行修改按钮
   * 默认：true
   */
  hasRowModify: PropTypes.bool,

  /**
   * 行修改按钮文字
   * 默认：'修改'
   */
  rowModifyText: PropTypes.string,

  /**
   * 行修改按钮文字（英文）
   * 默认：'Modify'
   */
  enRowModifyText: PropTypes.string,

  /**
   * 是否有行查看按钮
   * 默认：true
   */
  hasRowView: PropTypes.bool,

  /**
   * 行查看按钮文字
   * 默认：'查看'
   */
  rowViewText: PropTypes.string,

  /**
   * 行查看按钮文字（英文）
   * 默认：'View'
   */
  enRowViewText: PropTypes.string,

  /**
   * 是否有行删除按钮
   * 默认：true
   */
  hasRowDelete: PropTypes.bool,

  /**
   * 行删除按钮文字
   * 默认：'删除'
   */
  rowDeleteText: PropTypes.string,

  /**
   * 行删除按钮文字（英文）
   * 默认：'View'
   */
  enRowDeleteText: PropTypes.string,

  /**
   * 是否有后端按钮
   * 默认：false
   */
  hasBeBtns: PropTypes.bool,

  /**
   * 渲染自定义行按钮：为一个函数数组
   * 默认：-
   */
  renderRowBtns: PropTypes.array,

  // 高级搜索相关 props
  /**
   * 是否有高级搜索功能
   * 默认：true
   */
  hasAdvSearch: PropTypes.bool,

  /**
   * 高级搜索配置
   * 默认：
   * {
   *   searchComponent: 'both',
   *   containerType: 'drawer',
   *   formName: 'default',
   *   validationFields: [],
   *   isUseTableFields: true,
   *   fields: []
   * }
   */
  advSearch: PropTypes.shape({
    /**
     * 高级搜索使用的组件
     * 'PwForm' 表示使用 PwForm 组件，其对应后端的窗体；'AdvSearch' 表示使用 AdvSearch 组件；'both' 表示使用两种组件
     * 默认：'both'
     */
    searchComponent: PropTypes.oneOfType([
      PropTypes.oneOf(['PwForm', 'AdvSearch', 'both']),
      PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string, // 标题
          name: PropTypes.oneOf(['PwForm', 'AdvSearch']), // 高级搜索所使用的组件
          order: PropTypes.number // 排序
        })
      )
    ]),

    /**
     * 高级搜索所在的容器类型：'modal' 模态窗 | 'drawer' 抽屉
     * 默认：'drawer'
     */
    containerType: PropTypes.oneOf(['modal', 'drawer']),

    /**
     * 高级搜索中容器组件所接收的 props
     * 默认：-
     */
    containerProps: PropTypes.object,

    /**
     * 高级搜索使用的窗体名称（当 searchComponent 为 PwForm 时）
     * 默认：'default'
     */
    formName: PropTypes.string,

    /**
     * 高级搜索中 PwForm 组件所接收的 props
     * 默认：-
     */
    formProps: PropTypes.object,

    /**
     * 高级搜索中需要验证的字段，如：['name', 'age']（当 searchComponent 为 PwForm 时）
     * 默认：[]，表示不验证任何字段
     */
    validationFields: PropTypes.array,

    /**
     * AdvSearch 组件是否接收使用表格中的字段（若 isUseTableFields 为 true，则 fields 会与表格中的字段合并，然后传给 AdvSearch 组件）
     * 默认：true
     */
    isUseTableFields: PropTypes.bool,

    /**
     * AdvSearch 组件接收的 fields props（若 isUseTableFields 为 true，则会与表格中的字段合并，然后传给 AdvSearch 组件）
     * 默认：[]
     */
    fields: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string, // label
        value: PropTypes.string, // value
        control: PropTypes.oneOf(['Input']) // 所用控件
      })
    )
  }),

  /**
   * 高级搜索所在的容器类型：'modal' 模态窗 | 'drawer' 抽屉
   * 默认：'drawer'
   */
  advSearchContainerType: PropTypes.oneOf(['modal', 'drawer']),

  /**
   * 高级搜索使用的窗体名称
   * 默认：'default'
   */
  advSearchFormName: PropTypes.string,

  /**
   * 高级搜索中容器组件所接收的 props
   * 默认：-
   */
  advSearchContainerProps: PropTypes.object,

  /**
   * 高级搜索中 PwForm 组件所接收的 props
   * 默认：-
   */
  advSearchFormProps: PropTypes.object,

  /**
   * 高级搜索中需要验证的字段，如：['name', 'age']
   * 默认：[]，表示不验证任何字段
   */
  advSearchValidationFields: PropTypes.array,

  // ===========================================================
  // 下载文件相关 props ==========================================
  // ===========================================================
  /**
   * 下载的文件名称：若此值为 undefined，则会使用 title 作为下载的文件名称
   * 默认：-
   */
  downloadFileName: PropTypes.string,

  /**
   * 下载的文件类型
   * 默认：'xls'
   */
  fileType: PropTypes.string,

  // ===========================================================
  // 记录表单相关 props ==========================================
  // ===========================================================

  /**
   * 记录表单中左侧表单的宽度
   * 默认：'50%'
   */
  recordFormFormWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * 记录表单中右侧 tabs 的宽度
   * 默认：'50%'
   */
  recordFormTabsWidth: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number
  ]),

  /**
   * 记录表单所在容器的类型
   * 可选: 'modal' 模态窗 | 'drawer' 抽屉
   * 默认：'modal'
   */
  recordFormType: PropTypes.oneOf(['modal', 'drawer']),

  /**
   * 记录表单容器（Modal/Drawer）所接收的 props
   * 默认：-
   */
  recordFormContainerProps: PropTypes.object,

  // ===========================================================
  // 记录表单中的子表相关 props ===================================
  // ===========================================================

  /**
   * 记录表单中的子表配置
   * 默认：-
   */
  subTableArrProps: PropTypes.array,
  // [
  //   {
  //     subTableName: '子表', // 必选（若不选则标签页标题为子表的 resid）
  //     subResid: 666, // 必选
  //     tableProps: { // 可选，TableData 组件接收的 props
  //       width: 777,
  //       height: 888
  //     }
  //   }
  // ]

  /**
   * 内部字段数组（修改了该数组内的内部字段所对应的控件的值之后，会调用 api 请求后端使用计算公式计算出保存前的记录）
   * 默认：-
   * 例如：['C3_592244738975', 'C3_592244739145']
   */
  beforeSaveFields: PropTypes.array,

  /**
   * 是否有边框
   * 默认：true
   */
  bordered: PropTypes.bool,

  // ===========================================================
  // 导入数据功能相关 props ======================================
  // ===========================================================

  /**
   * 导入功能配置
   * 默认：{ mode: 'be', saveState: 'editoradd', containerType: 'drawer' }
   */
  importConfig: PropTypes.shape({
    mode: PropTypes.oneOf(['fe', 'be']).isRequired, // 处理 Excel 数据的模式：'fe' 表示前端处理 Excel；'be' 表示后端处理Excel
    saveState: PropTypes.oneOf(['editoradd', 'added']).isRequired, // 保存数据时的状态：'editoradd' 表示表中如果已存在该记录，则更新记录，不会报错；'added' 表示如果已存在该记录，则不能够插入该记录，而是抛出错误给前端
    containerType: PropTypes.oneOf(['modal', 'drawer']), // 导入控件所在的容器类型：'modal' 模态窗 | 'drawer' 抽屉
    containerProps: PropTypes.object // 容器（'modal' | 'drawer'）接收的 props（参考 ant-design Modal/Drawer 组件的 props）
  }),

  /**
   * action bar 区域额外的内容
   * 默认：-
   * 可选：jsx 或 ({ dataSource: [], selectedRowKeys: [], data: [], recordFormData }) => {} dataSource 表示表格数据，selectedRowKeys 表示选中行的 key（即 REC_ID），data 表示 PwForm 接收的 data props；recordFormData 表示记录表单数据
   */
  actionBarExtra: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /**
   * header 区域额外的内容
   * 默认：-
   * 可选：jsx 或 (tableData: []) => {}
   */
  headerExtra: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  /**
   * 是否有 rowSelection
   * 默认：false
   */
  hasRowSelection: PropTypes.bool,

  /**
   * 基地址
   * 默认：-
   */
  baseURL: PropTypes.string,

  /**
   * 下载文件的基地址
   * 默认：-
   */
  downloadBaseURL: PropTypes.string,

  /**
   * 数据库链接名称（当你想要用其他数据库时使用）
   * 默认：-
   */
  dblinkname: PropTypes.string
};
