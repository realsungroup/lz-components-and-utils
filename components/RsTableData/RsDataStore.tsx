import http, { makeCancelable } from '../util/api';
const RsDataStore={
    resid:0,
    dblinkname:"",
    gridOption:null,
    RsTableData:null,
    async getRows(params) {
        console.log(JSON.stringify(params, null, 1));
        console.log("resid=",this.resid);
        console.log("dblinkname=",this.dblinkname);
       // params.successCallback([],0);
         const {
            startRow,
            endRow,
            rowGroupCols,
            valueCols,
            pivotCols,
            pivotMode,
            groupKeys,
            filterModel,
            sortModel
           }=params;
        const pageSize=endRow-startRow;
        const pageIndex=  Math.floor(startRow/pageSize);
        const httpParams={};
        const tableparams = {
            resid:this.resid,
            
            pageindex:pageIndex,
            pagesize: pageSize,
            
            dblinkname:this.dblinkname
          };
          let p3 =makeCancelable(http(httpParams).getTable(tableparams));
          let res:any;
          try {
            console.log("start getrows",tableparams);
            this.RsTableData.setState({loading:true});
            res = await  p3.promise;
            console.log('endgetrows',res);
            //this.gridOption.api.PaginationProxy.totalPages=200;
            console.log('total', res.total);
           let lastrow=res.total<=endRow?res.total:-1;
           params.successCallback(res.data,lastrow);
           this.RsTableData.setState({loading:false});
           
           //params.successCallback([],-1);
          } catch (error) {

            console.error(error);
            params.failCallback(error);
          }
          return this;
       
    }

}; 
export default RsDataStore;