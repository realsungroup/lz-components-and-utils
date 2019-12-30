import React from "react";
import { Button, message, Progress } from "antd";
import { defaultProps, propTypes } from "./propTypes";
import http, { makeCancelable } from "../util/api";
import { setItem, getItem } from "../util";
import { AgGridReact } from "ag-grid-react";
import AdvSearch from "../AdvSearch";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import "ag-grid-enterprise/chartsModule";
import "./style";

const testFields = [
  {
    label: "考勤月份",
    value: "考勤月份",
    control: "Input"
  }
];

const searchList = [
  {
    compareSymbol: "=",
    field: "考勤月份",
    control: "Input",
    value: "20191101"
  }
]; // 搜索列表

// const httpParam = { baseURL: "http://kingofdinner.realsun.me:5201" };
const httpParam = { baseURL: "http://10.108.2.66:1001" };

const returnFormatter = params => {
  return params.value ? params.value.replace(/\r?\n|\r/gm, ",") : params.value;
};
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
  valueFormatter?: Function;
}

/**
 * Socket测试
 */
export default class SocketTest extends React.Component<any, any> {
  static propTypes = propTypes;
  static defaultProps = defaultProps;

  state = {
    messages: [],
    defaultColDef: {
      sortable: true,
      resizable: true
    },
    total: undefined,
    current: undefined,
    columnDefs: [],
    rowData: [],
    sideBar: true
  };
  _url = "";
  inputRef = undefined;
  heartTimer: any = null;
  reconnectTimer: any = null;
  websocket: any;
  serverTimer: any = null;
  isReconnectting: boolean = false;

  componentDidMount = async () => {
    await this.getWebSocketService();
    this.createWebSocket(this._url);
  };
  componentWillUnmount() {
    console.log("componentWillUnmount");
    clearTimeout(this.heartTimer);
    clearTimeout(this.serverTimer);
    clearTimeout(this.reconnectTimer);
    this.websocket && this.websocket.close(1000);
    this.websocket = null;
    this.onMessage = null;
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
        valueFormatter:
          item.formatter === "ag-trimenter" ? returnFormatter : null,
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
    this.setState({ columnDefs: columns });
  };

  getWebSocketService = async () => {
    try {
      const res = await http(httpParam).getWebSocketService();
      const { data } = res;
      setItem("accessToken", res.data.accessToken);
      this._url = `ws:${data.Endpoint}:${data.Port}${data.Paths[0]}`;
    } catch (error) {
      this.startWebSocketService();
    }
  };

  startWebSocketService = async () => {
    try {
      const res = await http(httpParam).getWebSocketService();
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * 重新连接
   */
  reconnect = url => {
    this.isReconnectting = true;
    this.reconnectTimer = setTimeout(() => {
      if (this.isReconnectting) {
        return;
      }
      console.log("已断开连接，重新连接中... ");
      this.createWebSocket(url);
    }, 2000);
  };

  /**
   * 创建websocket实例
   */
  createWebSocket = async url => {
    const sessionid = getItem("sessionid");
    if (sessionid !== "undefined") {
      url += "?sessionid=" + sessionid;
    }
    if ("WebSocket" in window) {
      try {
        this.websocket = new WebSocket(url);
      } catch (error) {
        await this.getWebSocketService();
        this.createWebSocket(url);
      }
    } else {
      // 浏览器不支持 WebSocket
      alert("您的浏览器不支持 WebSocket!");
    }
    this.websocket.onopen = this.onOpen;
    this.websocket.onmessage = this.onMessage;
    this.websocket.onerror = this.onError;
    this.websocket.onclose = this.onClose;
    this.isReconnectting = false;
  };

  /**
   * 开始心跳检测
   */
  startHeart = () => {
    this.heartTimer = setTimeout(() => {
      this.send("ping");
      // console.log("ping!");
      this.serverTimer = setTimeout(() => {
        //如果超过一定时间还没重置，说明后端主动断开了
        this.websocket.close();
      }, 5000);
    }, 5000);
  };

  /**
   * 重置心跳检测
   */
  resetHeart = () => {
    clearTimeout(this.heartTimer);
    clearTimeout(this.serverTimer);
    return this;
  };

  /**
   * websocket onopen事件
   */
  onOpen = event => {
    this.startHeart();
  };

  /**
   * websocket onmessage事件
   */
  onMessage = event => {
    let data;
    this.resetHeart().startHeart();
    if (event.data != "pong") {
      const hasSessionid = event.data.includes("sessionid");
      try {
        if (hasSessionid) {
          data = JSON.parse(event.data);
          setItem("sessionid", data.data.sessionid);
        } else {
          data = JSON.parse(event.data);
        }
      } catch (error) {
        data = event.data;
      }
      if (Array.isArray(data.data)) {
        this.gridApi.updateRowData({ add: data.data });
        this.setState({
          current: data.intDataPageIndex,
          total: data.dataPages
        });
      }
      console.log(event);
    } else {
      console.log("pong!");
    }
  };

  /**
   * websocket onerror事件
   */
  onError = event => {
    console.log("onError:", event);
  };

  /**
   * websocket onclose事件
   */
  onClose = e => {
    console.log(
      "websocket 断开: " + e.code + " " + e.reason + " " + e.wasClean
    );
    if (![1000].includes(e.code)) {
      clearTimeout(this.reconnectTimer);
      clearTimeout(this.heartTimer);
      clearTimeout(this.serverTimer);
      this.reconnect(this._url);
    }
  };

  send = message => {
    if (this.websocket && this.websocket.readyState === WebSocket.OPEN) {
      this.websocket.send(message);
    }
  };

  gridApi: any = null;
  onGridReady = async params => {
    this.gridApi = params.api;
    await this.getColumns(this.props);
    params.api.addAggFunc("mid", midFunc);
    params.api.addAggFunc("countDistinct", countDistinctFunc);
  };

  handleSearch = (where, searchList) => {
    this.send(
      JSON.stringify({
        dblinkname: "",
        accesstoken: getItem("accessToken"),
        action: "getTable",
        data: {
          resid: "629462405981",
          cmswhere: "考勤月份 = 201911",
          pagesize: 0,
          pageindex: 0,
          datasplitsize: 10000,
          datasplitdelay: 2000
        }
      })
    );
  };

  render() {
    const {
      rowData,
      columnDefs,
      defaultColDef,
      sideBar,
      total,
      current
    } = this.state;
    const { pivotMode = false } = this.props;
    const percent = Number.parseFloat(((current / total) * 100).toFixed(2));

    return (
      <div>
        <div className="socket_ag-grid_header">
          <div className="socket_ag-grid_advsearch">
            <AdvSearch
              fields={testFields}
              initialSearchList={searchList}
              onConfirm={this.handleSearch}
            />
          </div>

          <div className="socket_ag-grid_progress">
            <Progress type="line" percent={percent} />
          </div>
        </div>
        <div className="socket_ag-grid_wrapper ag-theme-balham">
          <AgGridReact
            defaultColDef={defaultColDef}
            rowSelection="multiple"
            columnDefs={columnDefs}
            rowData={rowData}
            onGridReady={this.onGridReady}
            pagination={true}
            paginationPageSize={1000}
            floatingFilter={true}
            // rowMultiSelectWithClick={true} //是否可以单击选中
            sideBar={sideBar}
            enableRangeSelection={true}
            enableCharts={true}
            // localeText={localeText}
            pivotMode={pivotMode}
          ></AgGridReact>
        </div>
      </div>
    );
  }
}
