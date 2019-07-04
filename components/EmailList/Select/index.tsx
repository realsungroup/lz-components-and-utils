import React from 'react'
import { Select, Tabs, Radio, Button, Divider } from 'antd'
import './index.less'

const { TabPane } = Tabs

interface EmailSelectProps {
    data:Array<any>;
    onClick: Function;
    onChange: any
}

export default class EmailSelect extends React.Component<EmailSelectProps, any> {
  state = {
    isSelectOpen: false
  }

  /**
   * 打开关闭下拉框
   *
   * @memberof EmailSelect
   */
  handleToggleSelect = () => this.setState((prevState: any) => ({
    isSelectOpen: !prevState.isSelectOpen
  }))

  /**
   * 打开下拉框
   *
   * @memberof EmailSelect
   */
  handleOpenSelect = () => this.setState({ isSelectOpen: true })

  /**
   * 关闭下拉框
   *
   * @memberof EmailSelect
   */
  handleCloseSelect = () => this.setState({ isSelectOpen: false })

  /**
   * 确认
   *
   * @memberof EmailSelect
   */
  handleSure = () => {
    const { onClick } = this.props
    typeof onClick === 'function' && onClick()
    this.handleCloseSelect()
  }

  render() {
    const mapData = {}
    // ColResDataSort 分类处理
    this.props.data.forEach(element => {
      if (mapData[element.ColResDataSort]) {
        mapData[element.ColResDataSort].push(element)
      } else {
        mapData[element.ColResDataSort] = [element]
      }
    })
    const { handleToggleSelect, handleSure, props: { onChange } } = this
    const { isSelectOpen } = this.state

    return (
      <Select
        dropdownClassName="email-select"
        style={{ width: 220 }}
        notFoundContent=""
        open={isSelectOpen}
        placeholder="插入字段"
        onFocus={handleToggleSelect}
        dropdownRender={menu => (
          <div>
            <Tabs defaultActiveKey="0">
              {Object.keys(mapData).map((item, index) => (
                <TabPane tab={item} key={String(index)}>
                  <Radio.Group onChange={onChange}>
                    {mapData[item].map(({ ColDispName, ColName }) => (
                      <Radio 
                        className="email-select__radio"
                        value={ColDispName}
                        key={ColName}
                      >
                        {ColDispName}
                      </Radio>
                    ))}
                  </Radio.Group>
                </TabPane>
              ))}
            </Tabs>
            <Divider className="email-select__line" />
            <Button
              className="email-select__sure-btn"
              type="primary"
              onClick={handleSure}
            >
              确认选择
            </Button>
          </div>
        )}
      /> 
    )
  }
}
