import React from 'react'
import ReactDOM from 'react-dom'
import { Modal, Form, Button, Input, Select, Tabs, Radio } from 'antd'
import WangEditor from 'wangeditor'

console.log('WangEditor=>', WangEditor)

const FormItem = Form.Item

const { TabPane } = Tabs
// declare global {
//     interface Window { MyNamespace: any; }
// } 

// window.MyNamespace = window.MyNamespace || {};

// window.wangEditor = window.wangEditor || {};

// declare var window: Window & { wangEditor: function() {} }

export default class Editor extends React.Component<any, any> {
    editorRef: React.RefObject<HTMLDivElement>
    // editorRef:HTMLDivElement;

    editor: any

    setEditorRef: any

    state = {
        isEditorShow: false,
        isSelectOpen: false
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
            editor.customConfig.onchange = html => {
                // html 即变化之后的内容
                console.log(html)
                const { changeEmailContent } = this.props
                typeof changeEmailContent === 'function' && changeEmailContent(html)
            }
            editor.create()
            this.editor = editor
        }
    }

    componentWillReceiveProps(props) {
        if (props.data && this.editor) this.editor.txt.html(props.data.ASEND_CONTENT)
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
    }

    handleHiddenEditor = () => this.setState({ isEditorShow: false })

    handleSubmit = () => {
        const { onSave } = this.props
        typeof onSave === 'function' && onSave()
    }

    render() {
        const { isEditorShow } = this.state
        const { handleHiddenEditor, handleSubmit } = this
        return (
            <Modal visible={isEditorShow} title="xxx邮件xxx" onCancel={handleHiddenEditor}>
                <Form layout="inline">
                    <FormItem>
                        <Input value={this.props.data.ASEND_EMAIL_TITLE} onChange={this.props.onChangeEmailTitle} />
                    </FormItem>
                    <FormItem>
                        <Button type="primary" onClick={handleSubmit}>
                            保存
            </Button>
                    </FormItem>
                    <FormItem>
                        <Select
                            style={{ width: 300 }}
                            notFoundContent=""
                            open={this.state.isSelectOpen}
                            onFocus={() => this.setState((prevState, porps) =>({ isSelectOpen: !prevState.isSelectOpen }))}
                            dropdownRender={menu => ( 
                                <div>
                                    {/* onChange={callback} */}
                                    <Tabs defaultActiveKey="1" >
                                        <TabPane tab="Tab 1" key="1">
                                            Content of Tab Pane 1
                                        </TabPane>
                                        <TabPane tab="Tab 2" key="2">
                                            Content of Tab Pane 2
                                            </TabPane>
                                        <TabPane tab="Tab 3" key="3">
                                            {/* onChange={this.onChange} value={this.state.value} */}
                                            <Radio.Group >
                                                <Radio value={1}>
                                                    Option A
                            </Radio>
                                                <Radio value={2}>
                                                    Option B
                            </Radio>
                                                <Radio value={3}>
                                                    Option C
                            </Radio>
                                                <Radio value={4}>
                                                    More...
                            </Radio>
                                            </Radio.Group>
                                        </TabPane>
                                    </Tabs>
                                    <Button onClick={() => this.setState({ isSelectOpen: false })}>确认选择</Button>
                                </div>
                            )}
                        >

                        </Select>
                    </FormItem>
                </Form>
                <div
                    ref={this.setEditorRef}
                    style={{ height: 200 }}
                    id="editor"
                />
                {/* <div
          ref="editorElem"
          style={{ textAlign: 'left', margin: '10px auto' }}
        /> */}
            </Modal>
        )
    }
}
