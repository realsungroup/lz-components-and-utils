import PropTypes from 'prop-types';

export const defaultProps = {
  fields: [],
  confirmText: '确定',
  enConfirmText: 'Confirm'
};

export const propTypes = {
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
