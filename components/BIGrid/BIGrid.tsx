import React from "react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import "ag-grid-enterprise";
import "ag-grid-enterprise/chartsModule";
import "./style";
import PropTypes, { element } from "prop-types";
import { Spin, Tabs } from "antd";
import LZAGGrid from "./LZAGGrid";
import zhCN from "./locales/zh-CN";

const { TabPane } = Tabs;

interface BIGrid {
  // gridApi: any;
  bigrid?: any;
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
    gridProps: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      tabNames: [], //tab页显示的名字
      containerHeight: 0,
      loading: false
    };
  }

  componentDidMount() {
    this.setState({ containerHeight: this.bigrid.clientHeight });
  }

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
    const { loading, tabNames, containerHeight } = this.state;
    const {
      gridProps,
      language,
      height = "100%",
      isAllEnableValue = false,
      isAllEnableRowGroup = false
    } = this.props;
    let localeText = null;
    if (language === "zhCN") {
      localeText = zhCN;
    }
    return (
      <div
        className="ag-theme-balham bi-grids"
        style={{ height }}
        ref={element => (this.bigrid = element)}
      >
        <Spin spinning={loading}>
          <Tabs defaultActiveKey={gridProps[0].resid.toString()} type="card">
            {gridProps.map((props, index) => {
              return (
                <TabPane
                  tab={tabNames[index] || props.resid}
                  key={props.resid.toString()}
                  forceRender
                >
                  <div style={{ height: containerHeight - 56, width: "100%" }}>
                    <LZAGGrid
                      {...props}
                      onSetTabName={this.handleSetTabName}
                      onSetLoading={this.handleSetLoading}
                      index={index}
                      localeText={localeText}
                      isAllEnableValue={
                        props.isAllEnableValue === undefined
                          ? isAllEnableValue
                          : props.isAllEnableValue
                      }
                      isAllEnableRowGroup={
                        props.isAllEnableRowGroup === undefined
                          ? isAllEnableRowGroup
                          : props.isAllEnableRowGroup
                      }
                    />
                  </div>
                </TabPane>
              );
            })}
          </Tabs>
        </Spin>
      </div>
    );
  }
}

export default BIGrid;
