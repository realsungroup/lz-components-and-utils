import React from 'react'
import { Modal, Form, Button, Input } from 'antd'

const FormItem = Form.Item

export default class Editor extends React.Component<any,any> {
    render() {
        return (
            <Modal visible={true} title="xxx邮件xxx">
                <FormItem>
                    <Input />
                </FormItem>
                <FormItem>
                    <Button type="primary">保存</Button>
                </FormItem>
            </Modal>
        )
    }
}