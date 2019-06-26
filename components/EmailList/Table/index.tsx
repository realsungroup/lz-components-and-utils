import React,{ Fragment } from 'react'
import { Table, Button } from 'antd'

export default (props) => {
    const columns = [
        {
          title: '邮件标题',
          dataIndex: 'ASEND_EMAIL_TITLE',
          render: text => <a href="javascript:;">{text}</a>,
        },
        {
          title: '标题',
          dataIndex: 'ASEND_TITLE'
        },
        {
          title: '状态',
          dataIndex: 'ASEND_TYPE',
        //   render: () => 
        },
        {
          title: '更新时间',
          dataIndex: 'ASEND_EDTTIME',
        },
        {
            title: '操作',
            dataIndex: '',
            render: (val) => <Button type="link" onClick={props.onContentEdit.bind(null, val)}>内容编辑</Button>
        }
      ];
      // rowSelection object indicates the need for row selection
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        getCheckboxProps: record => ({
          disabled: record.name === 'Disabled User', // Column configuration not to be checked
          name: record.name,
        }),
      };
    return (
        <Table rowSelection={rowSelection} columns={columns} dataSource={props.data} rowKey={({ ASEND_ID }) => ASEND_ID} />
    )
} 

