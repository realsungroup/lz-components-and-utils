import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import "ag-grid-enterprise/chartsModule";
import "./style";
import PropTypes from "prop-types";
import http, { makeCancelable } from "../../util/api";

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
  // width: number;
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
  filterParams: object;
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
      sideBar: true,
      tabName: ""
    };
  }

  async componentDidUpdate(prevProps) {
    const { cparm1, cparm2, cmswhere } = this.props;
    if (
      prevProps.cparm1 !== cparm1 ||
      prevProps.cparm2 !== cparm2 ||
      prevProps.cmswhere !== cmswhere
    ) {
      this.props.onSetLoading && this.props.onSetLoading(true);
      // await this.getColumns(this.props);
      await this.getRowData();
      this.props.onSetLoading && this.props.onSetLoading(false);
    }
  }

  getColumns = async props => {
    const httpParams: any = {};
    const {
      resid,
      dblinkname,
      baseURL,
      isAllEnableRowGroup = false,
      isAllEnableValue = false
    } = props || this.props;
    if (baseURL) {
      httpParams.baseURL = baseURL;
    }
    let p3 = makeCancelable(
      http(httpParams).getTableColumnDefine({ resid, dblinkname })
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
        // width: item.CS_SHOW_WIDTH,
        resizable: true,
        pivot: false,
        sortable: true,
        checkboxSelection: false,
        filter: item.filter,
        filterParams: {},
        headerCheckboxSelection: false,
        chartDataType: item.chartType,
        enablePivot: item.enablePivot,
        rowGroup: item.rowGroup,
        enableRowGroup: isAllEnableRowGroup ? true : item.enableRowGroup,
        enableValue: isAllEnableValue ? true : item.enableValue,
        aggFunc: item.aggFunc
      };
      //后台未配置filter
      if (!column.filter) {
        switch (item.ColType) {
          case 4:
          case 8:
            column.filter = "agDateColumnFilter";
            break;
          case 1:
          case 5:
            column.filter = "agTextColumnFilter";
            break;
          default:
            column.filter = "agNumberColumnFilter";
            break;
        }
      }
      // filter为日期filter，则使用自定义的comparator
      if (column.filter === "agDateColumnFilter") {
        column.filterParams = {
          // provide comparator function
          comparator: function(filterLocalDateAtMidnight, cellValue) {
            var dateAsString = cellValue;
            if (dateAsString == null) return 0;

            // In the example application, dates are stored as dd/mm/yyyy
            // We create a Date object for comparison against the filter date
            var dateParts = dateAsString.split("-");
            var day = Number(dateParts[2]);
            var month = Number(dateParts[1]) - 1;
            var year = Number(dateParts[0]);
            var cellDate = new Date(year, month, day);
            // Now that both parameters are Date objects, we can compare
            if (cellDate < filterLocalDateAtMidnight) {
              return -1;
            } else if (cellDate > filterLocalDateAtMidnight) {
              return 1;
            } else {
              return 0;
            }
          }
        };
      }
      if (index === 0) {
        column.checkboxSelection = true;
        column.headerCheckboxSelection = true;
      }
      return column;
    });
    this.props.onSetTabName &&
      this.props.onSetTabName(res.ResourceData.ResName, this.props.index);
    return columns;
  };

  _p1: any;
  getRowData = async () => {
    const { cmswhere, keyValue, baseURL, cparm1, cparm2 } = this.props;
    const httpParams: any = {};
    if (baseURL) {
      httpParams.baseURL = baseURL;
    }
    this._p1 = makeCancelable(
      http(httpParams).getTable({
        resid: this.props.resid,
        cmswhere,
        key: keyValue,
        cparm1,
        cparm2
      })
    );
    let res: any;
    try {
      res = await this._p1.promise;
      this.setState({ rowData: res.data });
      return res.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  onGridReady = async params => {
    this.gridApi = params.api;
    this.props.index === 0 &&
      this.props.onSetLoading &&
      this.props.onSetLoading(true);
    this.setState({ loading: true });
    const columnDefs = await this.getColumns(this.props);
    const rowData = await this.getRowData();
    params.api.addAggFunc("mid", midFunc);
    params.api.addAggFunc("countDistinct", countDistinctFunc);
    this.setState({ columnDefs, rowData });
    this.props.index === 0 &&
      this.props.onSetLoading &&
      this.props.onSetLoading(false);
  };

  componentDidMount() {}

  render() {
    const { rowData, columnDefs, defaultColDef, sideBar } = this.state;
    const { localeText, pivotMode = false } = this.props;
    return (
      <div className="lz-ag-grid">
        <AgGridReact
          defaultColDef={defaultColDef}
          rowSelection="multiple"
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
          localeText={localeText}
          pivotMode={pivotMode}
        ></AgGridReact>
      </div>
    );
  }
}

export default LZAGGrid;
