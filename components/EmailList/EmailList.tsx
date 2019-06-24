import React from 'react'
import { Button, Input, Row, Col, Form, Select, Table } from 'antd';
import EmailTable from './Table';
import Editor from './Editor';
import http from '../util/api';

const FormItem = Form.Item
const { Option } = Select

export default class EmailList extends React.Component<any, any> {
    componentDidMount() {

    }

    getData = async () => { console.log('getData =>')
        try {
            console.log('getData =>', http())
            // const res = await http().getEmailTemplateList()
            const res = await http().getTable({
                resid: 610800378133
              });
            console.log('getData =>', res)
        } catch (error) {
            console.log('getData error =>', error)
        }
    }

    handleSubmit = () => this.getData()

    render() {

        return (
            <Row className="email-list">
                <Editor />
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
                <EmailTable />
            </Row>
        )
    }
}