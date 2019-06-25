import React from 'react'
import { Button, Input, Row, Col, Form, Select, Table } from 'antd';
import EmailTable from './Table';
import Editor from './Editor';
import http from '../util/api';

const FormItem = Form.Item
const { Option } = Select

export default class EmailList extends React.Component<any, any> {

    state = {
        isEditorShow: false,
        emailData: []
    }

    editorRef = null

    componentDidMount() {
        this.getData()
    }

    getData = async () => { 
        try {
<<<<<<< HEAD
            const { error, data } = await http().getEmailTemplateList({
                resid: 610800378133
            })
            if(error === 0 && data && Array.isArray(data.data)) {
                this.setState({ emailData: data.data })
            }
=======
            console.log('getData =>', http())
            const res = await http().getEmailTemplateList({resid:610800378133});
          //  const res = await http().getTable({
           //     resid: 610800378133
           //   });
            console.log('getData =>', res)
>>>>>>> a7a1f396a7da75fbe1d1ac016fa11c7833c3d3a7
        } catch (error) {
            console.log('getData error =>', error)
        }
    }

    handleSubmit = () => this.getData()

    onContentEdit = (val) => { 
        console.log('onContentEdit', val)
        this.editorRef && this.editorRef.handleShowEditor()
    }

    render() {

        const { isEditorShow, emailData } = this.state
        const { onContentEdit } = this

        console.log('emailData', emailData)

        return (
            <Row className="email-list">
<<<<<<< HEAD
                <Editor
                    ref={_ => this.editorRef = _}
                    visible={isEditorShow} 
                />
=======
             
             
>>>>>>> a7a1f396a7da75fbe1d1ac016fa11c7833c3d3a7
                <h3>这是一个标题</h3>
                <Form className="email-list__form" layout="inline">
                    <FormItem label="标题">
                        <Select
                            className="email-list__select-field"
                            placeholder="标题"
                        >
                            <Option value="1" />
                        </Select>
                    </FormItem>
                    <FormItem label="状态">
                        <Select
                            className="email-list__select-field"
                            placeholder="状态"
                        >
                            <Option value="1" />
                        </Select>
                    </FormItem>
                    <FormItem>
                        <Button 
                            type="primary"
                            onClick={this.handleSubmit}
                        >
                            提交
                        </Button>
                    </FormItem>
                    <FormItem>
                        <Button
                            type="primary"
                        >
                            重置
                        </Button>
                    </FormItem>
                </Form>
                <Form layout="inline">
                    <FormItem>
                        <Button type="primary" icon="plus">新建</Button>
                    </FormItem>
                    <FormItem>
                        <Button>批量操作</Button>
                    </FormItem>
                </Form>
                {/* <Table dataSource={[{a:'a', b:'b'}]} /> */}
                <EmailTable 
                    data={emailData}
                    onContentEdit={onContentEdit}
                />
            </Row>
        )
    }
}