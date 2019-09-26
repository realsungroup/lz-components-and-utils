import React from 'react';
import { AgGridReact } from 'ag-grid-react';


import {defaultProps,propTypes} from './propTypes';
interface RsPwTable{
  gridApi:any
}
class RsPwTable extends React.Component<any, any> {
    static propTypes = propTypes;
    static defaultProps = defaultProps;
    

    constructor(props){ 
        super(props)
        const {columnDefs,autoGroupColumnDef,rowData,rowModelType}=this.props;
         
        this.state = {
            columnDefs: columnDefs,
            autoGroupColumnDef: autoGroupColumnDef,
            rowData: rowData
          };
    };
    componentDidMount=async()=>{
      const {RsDataSource,rowModelType}=this.props;
      if (rowModelType==='serverSide')
      {
       
      }
    }
    componentWillReceiveProps = async nextProps => {
      const {columnDefs,autoGroupColumnDef,rowData,rowModelType}=this.props;
      if (rowModelType==='serverSide')
      {
       
      }
      else
      {
        if (columnDefs!==nextProps.columnDefs)
        {
          this.setState({columnDefs:nextProps.columnDefs});
        }
        if (rowData!==nextProps.rowData)
        {
          this.setState({rowData:nextProps.rowData});
        }
      }
      
    }
    componentDidUpdate=()=>{
    
    };
    
    
    onPaginationChanged(e) {
      console.log(e);
      
    }
    render() {
        const {onGridReady}=this.props;
        return (
           
        
            <AgGridReact
             
              columnDefs={this.state.columnDefs}
          
              
              rowModelType={"infinite"} 
              
              
             
              {...this.props}
              >
            </AgGridReact>
         
        );
      };
};
//   groupSelectsChildren={true}
//autoGroupColumnDef={this.state.autoGroupColumnDef}
export default RsPwTable;