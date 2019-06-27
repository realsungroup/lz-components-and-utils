import React from 'react'
import { Button, Input, Row, Col, Form, Select, Table } from 'antd'
import EmailTable from './Table'
import Editor from './Editor'
import http from '../util/api'

const FormItem = Form.Item
const { Option } = Select

export default class EmailList extends React.Component<any, any> {
  state = {
    isEditorShow: false,
    emailData: [],
    cmscolumninfo: [],
    selectRow: {},
    stringSelect: ''
  }

  editorRef = null

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    try {
      const { error, data } = await http().getEmailTemplateList({
        resid: 610800378133
      })
      if (error === 0 && data && Array.isArray(data.data)) {
        this.setState({ emailData: data.data, cmscolumninfo: data.cmscolumninfo })
      }
    } catch (error) {
      console.log('getData error =>', error)
    }
  }

  saveData = async () => {
    const {
      selectRow } = this.state
    try {
      const { error, data } = await http().saveEmailTemplate({
        // ASEND_ID,
        // ASEND_CONTENT //邮件内容html
        ...selectRow,
        ASEND_RESID: 610800378133,
      })
    } catch (error) {}
  }

  handleSubmit = () => this.getData()

  onContentEdit = val => {
    console.log('onContentEdit', val)
    this.editorRef && this.editorRef.handleShowEditor()
    this.setState({ selectRow: val })
  }

  onChangeEmailTitle = ({ target: { value } }) => { console.log('onChangeEmailTitle', value)
    let { selectRow }: { selectRow: any } = this.state
    selectRow.ASEND_EMAIL_TITLE = value
    this.setState({ selectRow })
  }

  changeEmailContent = val => {
    let { selectRow }: { selectRow: any } = this.state
    selectRow.ASEND_CONTENT = val
    this.setState({ selectRow })
  }

  onChangeEmailSelect = ({ target: { value }}) => {
    this.setState({
      stringSelect: value
    })

    
  }

  onSureEmailSelect = () => {
    let { selectRow, stringSelect }: { selectRow: any, stringSelect:String } = this.state
    // selectRow.ASEND_CONTENT += `<p>${stringSelect}</p>`
    const arr = selectRow.ASEND_CONTENT.split('</p>')
    selectRow.ASEND_CONTENT = arr[0] + `${stringSelect}</p>`
    this.setState({ selectRow })
    // this.editorRef.appendContent(`<p>${stringSelect}</p>`)
  }

  render() {
    const { isEditorShow, emailData, selectRow, cmscolumninfo } = this.state
    const { onContentEdit, saveData, onChangeEmailTitle, changeEmailContent, onChangeEmailSelect, onSureEmailSelect } = this

    console.log('emailData', emailData)
 
    return (
      <Row className="email-list">
        <Editor
          data={selectRow}
          cmscolumninfo={cmscolumninfo}
          ref={_ => (this.editorRef = _)}
          visible={isEditorShow}
          onSave={saveData}
          onChangeEmailTitle={onChangeEmailTitle}
          changeEmailContent={changeEmailContent}
          onChangeEmailSelect={onChangeEmailSelect}
          onSureEmailSelect={onSureEmailSelect}
        />
        <h3>这是一个标题</h3>
        <Form className="email-list__form" layout="inline">
          <FormItem label="标题">
            <Select className="email-list__select-field" placeholder="标题">
              <Option value="1" />
            </Select>
          </FormItem>
          <FormItem label="状态">
            <Select className="email-list__select-field" placeholder="状态">
              <Option value="1" />
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={this.handleSubmit}>
              提交
            </Button>
          </FormItem>
          <FormItem>
            <Button type="primary">重置</Button>
          </FormItem>
        </Form>
        <Form layout="inline">
          <FormItem>
            <Button type="primary" icon="plus">
              新建
            </Button>
          </FormItem>
          <FormItem>
            <Button>批量操作</Button>
          </FormItem>
        </Form>
        {/* <Table dataSource={[{a:'a', b:'b'}]} /> */}
        <EmailTable data={emailData} onContentEdit={onContentEdit} />
      </Row>
    )
  }
}
