import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import "ag-grid-enterprise/chartsModule";
import "./style";
import PropTypes from "prop-types";
import http, { makeCancelable } from "../util/api";
import { Spin, Tabs } from "antd";
import LZAGGrid from "./LZAGGrid";
import zhCN from "./locales/zh-CN";

const { TabPane } = Tabs;

interface BIGrid {
  // gridApi: any;
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

class BIGrid extends React.Component<any, any> {
  static propTypes = {
    resids: PropTypes.array.isRequired,
    gridProps: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      tabNames: [], //tab页显示的名字
      loading: false
    };
  }

  componentDidMount() {}

  handleSetTabName = (name, index) => {
    let tabNames = [...this.state.tabNames];
    tabNames[index] = name;
    this.setState({
      tabNames: tabNames
    });
  };

  handleSetLoading = loading => {
    this.setState({ loading });
  };

  render() {
    const { loading, tabNames } = this.state;
    const { gridProps, language } = this.props;
    let localeText = null;
    if (language === "zhCN") {
      localeText = zhCN;
    }
    return (
      <Spin spinning={loading}>
        <div className="ag-theme-balham bi-grids">
          <Tabs defaultActiveKey={gridProps[0].resid.toString()} type="card">
            {gridProps.map((props, index) => {
              return (
                <TabPane
                  tab={tabNames[index]}
                  key={props.resid.toString()}
                  forceRender
                >
                  <div style={{ height: "100vh", width: "100%" }}>
                    <LZAGGrid
                      {...props}
                      onSetTabName={this.handleSetTabName}
                      onSetLoading={this.handleSetLoading}
                      index={index}
                      key={index}
                      localeText={localeText}
                    />
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </div>
      </Spin>
    );
  }
}

export default BIGrid;
