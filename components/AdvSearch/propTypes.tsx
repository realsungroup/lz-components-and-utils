import PropTypes from 'prop-types';

export const defaultProps = {
  fields: [],
  initialSearchList: [
    {
      logicSymbol: '',
      compareSymbol: '',
      field: '',
      control: 'Input',
      value: ''
    }
  ] ,// 搜索列表
  confirmText: '确定',
  enConfirmText: 'Confirm',
  readOnly:false
};

export const propTypes = {
  readOnly:PropTypes.bool,
  /**
   * 可高级查询的字段
   * 默认：[]
   */
  fields: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string, // 字段名称
      value: PropTypes.string, // 字段值
      control: PropTypes.oneOf(['Input']) // 所用控件名称
    })
  ),
  /**
   * 初始化加载的查询条件
   * 默认：【】
   * {
        logicSymbol: 'and',
        compareSymbol: '=',
        field: 'yearmonth',
        control: 'Input',
        value: '201908'
      }
   */
  initialSearchList:PropTypes.arrayOf(
    PropTypes.shape({
      logicSymbol: PropTypes.string, // 逻辑符号
      compareSymbol: PropTypes.string, //比较付号
      field: PropTypes.string, // 字段
      control: PropTypes.oneOf(['Input']),// 所用控件名称
      value: PropTypes.string, // 字段值
    })
  ),

  /**
   * 点确认按钮时的回调函数，如：(where) => void，where 表示 where 子句
   * 默认：-
   */
  onConfirm: PropTypes.func,

  // 如：
  // [
  //   {
  //     label: '姓名',
  //     value: 'name',
  //     control: 'Input'
  //   },
  //   {
  //     label: '年龄',
  //     value: 'age',
  //     control: 'Input'
  //   },
  //   {
  //     label: '出生日期',
  //     value: 'birthday',
  //     control: 'DatePicker'
  //   }
  // ]
  /**
   * 确定按钮文本（中文）
   * 默认：'确定'
   */
  confirmText: PropTypes.string,

  /**
   * 确定按钮文本（英文）
   * 默认：'Confirm'
   */
  enCofirmText: PropTypes.string
};
