import React from 'react';
import { storiesOf } from '@storybook/react';
import RsPwTable from '../RsPwTable';
const   columnDefs= [{
    headerName: "Make", field: "make",sortable:true,filter:true
  },  {
    headerName: "Price", field: "price"
  },
  {
    headerName: "model", field: "model"
  }
];
 const  autoGroupColumnDef={
    headerName: "Model",
    field: "model",
    cellRenderer:'agGroupCellRenderer',
    cellRendererParams: {
      checkbox: true
    }
  };

const   rowData= [{
    make: "Toyota", model: "Celica", price: 35000
  }, {
    make: "Ford", model: "Mondeo", price: 32000
  }, {
    make: "Porsche", model: "Boxter", price: 72000
  },{
    make: "Porsche2", model: "Boxter2", price: 72000
   }];
//  storiesOf('表格组件', module).add('表格组件', () => <RsPwTable style={{
//   height: "600px",
//   width: "100%"
// }} columnDefs={columnDefs}  rowData={rowData}/>)