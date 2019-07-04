import React from 'react'
import { Modal, Form, Button, Input } from 'antd'
import LZWangEditor from '../LZWangEditor'
import EmailSelect from '../Select'
import './index.less'

const FormItem = Form.Item

interface EditorProps {
  data: any
  changeEmailContent: Function
  onSave: Function
  onChangeEmailTitle: any
  cmscolumninfo: Array<any>
  onChangeEmailSelect: Function
  onSureEmailSelect: Function
}

export default class Editor extends React.Component<EditorProps, any> {
  editorRef: any

  selectRef: any

  state = {
    isEditorShow: false,
    isSelectOpen: false
  }

  constructor(props) {
    super(props)
    
  }

  /**
   * 显示编辑框
   *
   * @memberof Editor
   */
  handleShowEditor = () => this.setState({ isEditorShow: true })

  /**
   * 隐藏编辑框
   *
   * @memberof Editor
   */
  handleHiddenEditor = () => {
    this.selectRef.handleCloseSelect()
    this.setState({ isEditorShow: false })
  }

  /**
   * 提交
   *
   * @memberof Editor
   */
  handleSubmit = () => {
    const { onSave } = this.props
    typeof onSave === 'function' && onSave()
  }

  render() {
    const { isEditorShow } = this.state
    const {
      handleHiddenEditor,
      handleSubmit,
      props: {
        data,
        onChangeEmailTitle,
        cmscolumninfo,
        onChangeEmailSelect,
        onSureEmailSelect,
        changeEmailContent
      }
    } = this
    return (
      <Modal
        className="email-editor"
        width={800}
        footer={null}
        visible={isEditorShow}
        title={data.ASEND_TITLE}
        onCancel={handleHiddenEditor}
      >
        <Form layout="inline">
          <FormItem>
            <Input
              value={data.ASEND_EMAIL_TITLE}
              onChange={onChangeEmailTitle}
            />
          </FormItem>
          <FormItem>
            <EmailSelect
              ref={_ => this.selectRef = _}
              data={cmscolumninfo}
              onChange={onChangeEmailSelect}
              onClick={onSureEmailSelect}
            />
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={handleSubmit}>
              保存
            </Button>
          </FormItem>
        </Form>
        <LZWangEditor 
          ref={_ => this.editorRef = _}
          content={data.ASEND_CONTENT}
          changeEmailContent={changeEmailContent}
        />
      </Modal>
    )
  }
}
