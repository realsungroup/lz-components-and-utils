import React from 'react'
import WangEditor from 'wangeditor'

export default class LZWangEditor extends React.Component<any, any> {

  editorRef: any

  setEditorRef: any

  editor: any

  constructor(props) {
    super(props)
    this.setEditorRef = element => {
      this.editorRef = element

      const editor = new WangEditor(element)
      const { content, changeEmailContent } = this.props
      editor.customConfig.onchange = html => {
        // html 即变化之后的内容
        typeof changeEmailContent === 'function' && changeEmailContent(html)
      }
      editor.create()
      this.editor = editor
      // 设置初始内容
      this.editor.txt.html(content)
    }
  }

  render() {
    return (
      <div
        className="email-editor__editor"
        ref={this.setEditorRef}
        id="editor"
      />
    )
  }
}
