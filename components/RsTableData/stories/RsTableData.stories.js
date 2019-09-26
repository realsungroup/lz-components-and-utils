import React from 'react';
import { storiesOf } from '@storybook/react';
import RsTableData from '../RsTableData';
const defaultColDef={
    
    // make every column editable
    editable: false,
    // make every column use 'text' filter by default
    sortable:true,
    resizable:true,
    filter:true,
     
     
 }
storiesOf('表格数据组件', module).add('表格数据组件', () => <RsTableData  
resid={507309704555} 
defaultColDef={defaultColDef}     animateRows={true} debug={false}  

pagination={true}
cacheBlockSize={100}
maxBlocksInCache={10}
pagination={true}
paginationPageSize={100}
defaultColDef={defaultColDef}   
rowModelType={"infinite"}
// rowModelType={"serverSide"}
infiniteInitialRowCount={1}

cacheBlockSize={100}
cacheOverflowSize={2}
maxConcurrentDatasourceRequests= {2}
sideBar={"filters"}
floatingFilter={true}
/>)