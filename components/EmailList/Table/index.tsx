import React, { Fragment } from 'react'
import { Table, Button, Divider } from 'antd'

interface EmailTableProps {
  data: Array<any>;
  onContentEdit: Function
}

export default (props:EmailTableProps) => {
  const columns = [
    {
      title: '邮件标题',
      dataIndex: 'ASEND_EMAIL_TITLE'
    },
    {
      title: '标题',
      dataIndex: 'ASEND_TITLE'
    },
    {
      title: '更新时间',
      dataIndex: 'ASEND_EDTTIME'
    },
    {
      title: '操作',
      dataIndex: '',
      // align:'center',
      render: val => (
        <Fragment>
          <Button type="link" >
            字段定义
          </Button>
          <Divider type="vertical" />
          <Button type="link" onClick={props.onContentEdit.bind(null, val)}>
            内容编辑
          </Button>
          <Divider type="vertical" />
          <Button type="link" >
            发送频率
          </Button>
        </Fragment>
      )
    }
  ]
  // rowSelection object indicates the need for row selection
  const rowSelection = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows
      )
    },
    getCheckboxProps: record => ({
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name
    })
  }  
  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={props.data}
      rowKey={({ ASEND_ID }) => ASEND_ID}
    />
  )
}
