import React,{ Fragment } from 'react'
import { Table, Button } from 'antd'

export default (props) => {
    const columns = [
        {
          title: 'Name',
          dataIndex: 'name',
          render: text => <a href="javascript:;">{text}</a>,
        },
        {
          title: '状态',
          dataIndex: 'age',
        //   render: () => 
        },
        {
          title: '更新时间',
          dataIndex: 'address',
        },
        {
            title: '操作',
            dataIndex: '',
            render: () => <Button type="link">内容配置</Button>
        }
      ];
      const data = [
        {
          key: '1',
          name: 'John Brown',
          age: 32,
          address: 'New York No. 1 Lake Park',
        },
        {
          key: '2',
          name: 'Jim Green',
          age: 42,
          address: 'London No. 1 Lake Park',
        },
        {
          key: '3',
          name: 'Joe Black',
          age: 32,
          address: 'Sidney No. 1 Lake Park',
        },
        {
          key: '4',
          name: 'Disabled User',
          age: 99,
          address: 'Sidney No. 1 Lake Park',
        },
        {
            key: '5',
            name: ''
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
        <Table rowSelection={rowSelection} columns={columns} dataSource={data} />
    )
} 

