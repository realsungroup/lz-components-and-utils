
import React from 'react';

import {defaultProps,propTypes} from './propTypes';
import http, { makeCancelable } from '../util/api';
import RsDataStore from './RsDataStore';
import {Spin} from 'antd'
import { AgGridReact } from "ag-grid-react";
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import "ag-grid-enterprise";
interface agColumnDef{
  headerName :String
  field:String
  width:number
  filter:String

}
interface RsTableData{
   
  api:any
  datasource:any
}
class RsTableData extends React.Component<any, any> {
    
    constructor(props){
        super(props)
        this.datasource=RsDataStore;
        this.state = {
          loading: true,
          rowData: [], // 表格数据
          columnDefs: [] ,// 表格列配置信息,
          
          
        };
       
    };

    componentDidMount = async()=>{
       

    } 
    componentWillUnmount =async()=>{

    }
    initVariables = props =>{

    }
     
    onGridReady=async (gridOption)=>{
      this.api=gridOption.api;
      console.log(gridOption);
      this.setState({loading:true});
      const {rowModelType,resid,dblinkname}=this.props;

      let columnDefs=await this.getColumns(this.props);
      this.setState({columnDefs: columnDefs});
      this.datasource.RsTableData=this;
      this.datasource.resid=resid;
      this.datasource.dblinkname=dblinkname||"";
      this.api.setDatasource(this.datasource);
       //let rowData= await this.getRowData(this.props);
       // this.setState({rowData:rowData});
      
     
      this.setState({loading:false});
     
      
      
    }
    onPaginationChanged= (e)=>{
      console.log(e);
     // e.api.paginationGoToNextPage();
    }
    getColumns = async(props)=>{
      const httpParams = {};
      const {resid,dblinkname}=props||this.props;
      let p3= makeCancelable(
        http(httpParams).getTableColumnDefine({ resid: resid, dblinkname})
      );
      let res:any;
      try {
        res = await p3.promise;
      } catch (err) {
        console.error(err);
        return [];
      }
///
//agNumberColumnFilter	A Number Filter for number comparisons.
// agTextColumnFilter	A Text Filter for string comparisons.
// agDateColumnFilter	A Date Filter for date comparisons.
//agSetColumnFilter	A Set Filter, influenced by how filters work in Microsoft Excel. This is an ag-Grid-Enterprise feature.
      let columns=res.data.map(item =>{ 
        let column :agColumnDef={field:item.ColName,headerName:item.ColDispName,width:item.CS_SHOW_WIDTH,filter:'agDateColumnFilter'};
        return column;
      });
      return columns;
    }
    render() {
        const  {loading}=this.state;
         
        return (
          <Spin spinning={loading}> 
          <div 
            className="ag-theme-balham"
            style={{
              height: "800px",
              width: "100%"
            }}
          >
            
             <AgGridReact

             columnDefs={this.state.columnDefs}
             rowData={this.state.rowData}
             onGridReady={this.onGridReady}
             onPaginationChanged={this.onPaginationChanged}
             {...this.props}
             >
           </AgGridReact>
           {/* <RsPwTable
              columnDefs={this.state.columnDefs}
              autoGroupColumnDef={this.state.autoGroupColumnDef}
              rowData={this.state.rowData}
              defaultColDef={this.state.defaultColDef}
              onGridReady={this.onGridReady}
           
              {...this.props}
               >
            </RsPwTable> */}
          </div>
          </Spin>
        );
      };
};
export default RsTableData;