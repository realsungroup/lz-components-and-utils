import React from 'react'
import { Row, message } from 'antd'
import EmailTable from './Table'
import Editor from './Editor'
import Menu from './Menu'
import http from '../util/api'

interface EmailListProps {
  resid: Number
}

export default class EmailList extends React.Component<EmailListProps, any> {
  state = {
    title: '', // 邮件标题
    emailData: [], // 邮件列表内容
    cmscolumninfo: [], // 字段列表
    selectRow: {}, // 列表某行数据选中
    stringSelect: '', // 选中的字段
  }

  // 编辑框ref
  editorRef = null

  componentDidMount() {
    this.getData()
  }

  /**
   * 获取列表数据
   *
   * @memberof EmailList
   */
  getData = async () => {
    try {
      const { resid } = this.props
      const { error, data } = await http().getEmailTemplateList({ resid })
      if (error === 0 && data && Array.isArray(data.data)) {
        this.setState({
          emailData: data.data,
          cmscolumninfo: data.cmscolumninfo,
          title: data.resdata.ResName
        })
      } else throw new Error('获取数据失败')
    } catch (error) {
      message.error(error.message || '系统异常')
      console.log('getData error =>', error)
    }
  }

  /**
   * 保存数据
   *
   * @memberof EmailList
   */
  saveData = async () => {
    this.transformSomeString(true)
    const { selectRow } = this.state
    try {
      const { error } = await http().saveEmailTemplate({
        ...selectRow,
        ASEND_RESID: 610800378133
      })
      if (error === 0) {
        message.success('保存成功')
        this.editorRef && this.editorRef.handleHiddenEditor()
        this.getData()
      } else throw new Error('保存数据失败')
    } catch (error) {
      message.error(error.message || '系统异常')
    }
  }

  /**
   * 转换字段
   *
   * @param isToString false 字段 => 中文 | true 中文 => 字段
   * @memberof EmailList
   */
  transformSomeString = (isToString: Boolean) => {
    const { selectRow }: { selectRow: any } = this.state
    let { ASEND_CONTENT } = selectRow
    this.state.cmscolumninfo.forEach(({ ColDispName, ColName }) => {
      isToString
        ? (ASEND_CONTENT = ASEND_CONTENT.replace(
            new RegExp(ColDispName, 'g'),
            '[' + ColName + ']'
          ))
        : (ASEND_CONTENT = ASEND_CONTENT.replace(
            eval('/\\[' + ColName + '\\]/g'),
            ColDispName
          ))
    })
    selectRow.ASEND_CONTENT = ASEND_CONTENT
    this.setState({ selectRow })
  }

  /**
   * 提交事件
   *
   * @memberof EmailList
   */
  onSubmit = () => this.getData()

  /**
   * 列表某行内容配置事件
   * @param val 这列数据
   * @memberof EmailList
   */
  onContentEdit = val => {
    const selectRow = JSON.parse(JSON.stringify(val))
    this.setState({ selectRow }, () => {
      this.transformSomeString(false)
      this.editorRef && this.editorRef.handleShowEditor()
    })
  }

  // ###################### 编辑框事件 ######################
  /**
   * 邮件标题监听事件
   *
   * @memberof EmailList
   */
  onChangeEmailTitle = ({ target: { value } }) => {
    let { selectRow }: { selectRow: any } = this.state
    selectRow.ASEND_EMAIL_TITLE = value
    this.setState({ selectRow })
  }

  /**
   * 邮件内容监听事件
   *
   * @param val 富文本内容
   * @memberof EmailList
   */
  changeEmailContent = val => {
    let { selectRow }: { selectRow: any } = this.state
    selectRow.ASEND_CONTENT = val
    this.setState({ selectRow })
  }

  /**
   * 字段选中事件
   *
   * @memberof EmailList
   */
  onChangeEmailSelect = ({ target: { value } }) => {
    this.setState({
      stringSelect: value
    })
  }

  /**
   * 字段确定事件
   *
   * @memberof EmailList
   */
  onSureEmailSelect = () => {
    let { stringSelect }: { stringSelect: String } = this.state
    this.editorRef.editorRef && this.editorRef.editorRef.editor.cmd.do('insertHTML', `<span>${stringSelect}</span>`)
  }

  render() {
    const { title, emailData, selectRow, cmscolumninfo } = this.state
    const {
      onContentEdit,
      onSubmit,
      saveData,
      onChangeEmailTitle,
      changeEmailContent,
      onChangeEmailSelect,
      onSureEmailSelect
    } = this

    return (
      <Row className="email-list">
        <Editor
          data={selectRow}
          cmscolumninfo={cmscolumninfo}
          ref={_ => (this.editorRef = _)}
          onSave={saveData}
          onChangeEmailTitle={onChangeEmailTitle}
          changeEmailContent={changeEmailContent}
          onChangeEmailSelect={onChangeEmailSelect}
          onSureEmailSelect={onSureEmailSelect}
        />
        <h3>{title}</h3>
        <Menu className="email-list__menu" onSubmit={onSubmit} />
        <EmailTable data={emailData} onContentEdit={onContentEdit} />
      </Row>
    )
  }
}
