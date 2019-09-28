import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import "ag-grid-enterprise/chartsModule";
import "./style";
import PropTypes from "prop-types";
import http, { makeCancelable } from "../../util/api";
import { Spin, Tabs } from "antd";

const { TabPane } = Tabs;

//中位值函数
const midFunc = (values: Array<number>) => {
  let _values = Array.from(new Set(values));
  _values.sort((a: number, b: number) => {
    return a - b;
  });
  _values = _values.filter(item => {
    return !isNaN(item);
  });
  const isEven = _values.length % 2 === 0;
  let value = 0;
  const midIndex = Math.floor(_values.length / 2);
  //偶数个数
  if (isEven) {
    value = (_values[midIndex] + _values[midIndex - 1]) / 2;
  } else {
    //奇数个数
    value = _values[midIndex];
  }
  return value;
};

const countDistinctFunc = values => {
  let _values = Array.from(new Set(values));
  return _values.length;
};

interface LZAGGrid {
  gridApi: any;
}

interface agColumnDef {
  headerName: String;
  field: String;
  width: number;
  filter: String;
  pivot: boolean;
  sortable: boolean;
  resizable: boolean;
  checkboxSelection: boolean;
  headerCheckboxSelection: boolean;
  chartDataType: string;
  enablePivot: boolean;
  rowGroup: boolean;
  enableRowGroup: boolean;
  enableValue: boolean;
  aggFunc: string;
}

class LZAGGrid extends React.Component<any, any> {
  static propTypes = {
    resid: PropTypes.oneOf([PropTypes.number, PropTypes.string]).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      defaultColDef: {
        sortable: true,
        resizable: true
      },
      columnDefs: [],
      rowData: [],
      sideBar: true
    };
  }

  getColumns = async props => {
    const httpParams = {};
    const { resids, dblinkname } = props || this.props;
    let p3 = makeCancelable(
      http(httpParams).getTableColumnDefine({ resid: resids[0], dblinkname })
    );
    let res: any;
    try {
      res = await p3.promise;
    } catch (err) {
      console.error(err);
      return [];
    }
    let columns = res.data.map((item, index) => {
      let column: agColumnDef = {
        field: item.ColName,
        headerName: item.ColDispName,
        width: item.CS_SHOW_WIDTH,
        resizable: true,
        pivot: false,
        sortable: true,
        checkboxSelection: false,
        filter: item.filter,
        headerCheckboxSelection: false,
        chartDataType: item.chartType,
        enablePivot: item.enablePivot,
        rowGroup: item.rowGroup,
        enableRowGroup: item.enableRowGroup,
        enableValue: item.enableValue,
        aggFunc: item.aggFunc
      };
      if (index === 0) {
        column.checkboxSelection = true;
        column.headerCheckboxSelection = true;
      }
      this.setState({
        tabNames: [...this.state.tabNames, res.ResourceData.ResName]
      });
      return column;
    });
    return columns;
  };

  _p1: any;
  getRowData = async () => {
    this._p1 = makeCancelable(
      http().getTable({
        resid: this.props.resid
      })
    );
    let res: any;
    try {
      res = await this._p1.promise;
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  onGridReady = async params => {
    this.gridApi = params.api;
    this.setState({ loading: true });
    const columnDefs = await this.getColumns(this.props);
    const rowData = await this.getRowData();
    params.api.addAggFunc("mid", midFunc);
    params.api.addAggFunc("countDistinct", countDistinctFunc);
    this.setState({ columnDefs, rowData, loading: false });
  };

  componentDidMount() {}

  render() {
    const { loading, rowData, columnDefs, defaultColDef, sideBar } = this.state;
    console.log(columnDefs);
    return (
      <TabPane
        style={{ height: "100vh", width: "100%" }}
        tab={this.props.resids[0]}
        key="1"
      >
        <AgGridReact
          defaultColDef={defaultColDef}
          // rowSelection="multiple"
          columnDefs={columnDefs}
          rowData={rowData}
          onGridReady={this.onGridReady}
          pagination={true}
          paginationPageSize={100}
          floatingFilter={true}
          // rowMultiSelectWithClick={true} //是否可以单击选中
          sideBar={sideBar}
          enableRangeSelection={true}
          enableCharts={true}
        ></AgGridReact>
      </TabPane>
    );
  }
}

export default LZAGGrid;
