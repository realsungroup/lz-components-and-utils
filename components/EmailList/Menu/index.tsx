import React, { Fragment } from 'react'
import { Form, Select, Button } from 'antd'
import './index.less'

const FormItem = Form.Item

const { Option } = Select

export default porps => {

  const { onSubmit } = porps

  return (
    <Fragment>
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
          <Button type="primary" onClick={onSubmit}>
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
    </Fragment>
  )
}


