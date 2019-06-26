import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Form, Button, Input } from 'antd'
import WangEditor from 'wangeditor'

const FormItem = Form.Item

// declare global {
//     interface Window { MyNamespace: any; }
// }

// window.MyNamespace = window.MyNamespace || {};

// window.wangEditor = window.wangEditor || {};

// declare var window: Window & { wangEditor: function() {} }

export default class Editor extends React.Component<any, any> {
  editorRef: React.RefObject<HTMLDivElement>
  // editorRef:HTMLDivElement;

  setEditorRef: any

  state = {
    isEditorShow: false
  }

  constructor(props) {
    super(props)
    // this.editorRef = React.createRef()
    // this.editorRef = null;
    this.setEditorRef = element => {
      this.editorRef = element
      console.log('setEditorRef', element)

      var editor = new WangEditor(element)
      // var editor = new WangEditor(this.editorRef.current)
      editor.create()
    }
  }

  componentDidMount() {
    console.log(
      'componentDidMount-->',
      this.editorRef,
      this.refs.editorElem,
      document.querySelector('#editor')
    )
    // var E = window['wangEditor']
    // var editor = new E(this.editorRef)
    // setTimeout(() => {
    //     console.log('componentDidMount-22->', this.editorRef)

    //     console.log('componentDidMount-33->', ReactDOM.findDOMNode(this.editorRef))
    //     var editor = new WangEditor(ReactDOM.findDOMNode(this.editorRef))
    //     editor.create()
    // }, 3000);

    // var E = window.wangEditor
  }

  componentDidUpdate() {
    console.log(
      'componentDidUpdate-->',
      this.editorRef,
      this.refs.editorElem,
      document.querySelector('#editor')
    )
  }

  handleShowEditor = () => {
    this.setState({ isEditorShow: true })

    setTimeout(() => {
      console.log(
        'handleShowEditor-->',
        this.editorRef,
        this.editorRef.current,
        this.refs.editorElem
      )
      console.log('handleShowEditor-->', ReactDOM.findDOMNode(this.editorRef))
    }, 2000)
  }

  handleHiddenEditor = () => this.setState({ isEditorShow: false })

  render() {
    const { isEditorShow } = this.state
    const { handleHiddenEditor } = this
    return (
      <Modal visible={isEditorShow} title="xxx邮件xxx">
        <Form layout="inline">
          <FormItem>
            <Input />
          </FormItem>
          <FormItem>
            <Button type="primary" onClick={handleHiddenEditor}>
              保存
            </Button>
          </FormItem>
        </Form>
        <div
          ref={this.setEditorRef}
          style={{ width: 800, height: 200 }}
          id="editor"
        />
        {/* <div
          ref={this.editorRef}
          style={{ width: 800, height: 200 }}
          id="editor"
        /> */}
        {/* <div ref={(ref) => this._div = ref}></div> */}
        <div
          ref="editorElem"
          style={{ textAlign: 'left', width: 900, margin: '10px auto' }}
        />
      </Modal>
    )
  }
}
