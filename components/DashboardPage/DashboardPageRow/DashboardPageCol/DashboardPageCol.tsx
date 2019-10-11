import React from "react";
import PropTypes from "prop-types";
import { Icon, Tooltip, Drawer, Button, Modal } from "antd";
import DashboardChart from "./DashboardChart";
import Resizable from "re-resizable";
import classNames from "classnames";
import AdvSearch from "../../../AdvSearch";
import BIGrid from "../../../BIGrid";

/**
 * 仪表盘页面的列
 */
export default class DashboardPageCol extends React.Component<any, any> {
  static propTypes = {
    type: PropTypes.oneOf(["add", "row"]),
    onAddRow: PropTypes.func
  };
  state = {
    isShowGrid: false,
    drawerVisivble: false
  };
  handleDoSearch = (where, searchList) => {
    let {
      mode,

      colIndex,
      rowIndex,
      rows
    } = this.props;
    //colItem.settingForm.where=where;
    let newRows = {};
    if (where == undefined) {
      where = "";
    }
    if (searchList == undefined) {
      searchList = [];
    }
    newRows = JSON.parse(JSON.stringify(rows));

    newRows[rowIndex].cols[colIndex].settingForm.where = where;
    newRows[rowIndex].cols[colIndex].settingForm.searchList = searchList;
    this.props.onSearch && this.props.onSearch(mode, newRows);
  };
  handleColClick = e => {
    e.stopPropagation();
    const { selectedCol, colItem, rowItem, onActiveCol } = this.props;
    onActiveCol && onActiveCol(rowItem, colItem);
  };

  handleResizeStop = delta => {
    const { rowItem, colItem, onResizeStop } = this.props;
    onResizeStop && onResizeStop(rowItem, colItem, delta);
  };

  handleResize = () => {
    this.props.onResize && this.props.onResize();
  };

  handleDeleteCol = () => {
    const { rowItem, colItem, onDeleteCol } = this.props;
    Modal.confirm({
      title: "提示",
      content: "您确定要删除该列吗？",
      onOk: () => onDeleteCol && onDeleteCol(rowItem, colItem)
    });
  };

  toggleIsShowGrid = () => {
    this.setState({
      // isShowGrid: !this.state.isShowGrid,
      drawerVisivble: !this.state.drawerVisivble
    });
  };
  render() {
    const {
      mode,
      rowItem,
      colItem,
      selectedCol,
      resizeGrid,
      onDeleteCol,
      settingForm,
      showSearchBar
    } = this.props;
    const { drawerVisivble } = this.state;
    const { fields, searchList } = colItem.settingForm;
    const isShowSearchBar =
      showSearchBar &&
      searchList &&
      Array.isArray(searchList) &&
      searchList.length > 0;
    const aDvFields = fields.map(item => {
      return { value: item.id, label: item.text, control: "Input" };
    });
    // 编辑列
    if (mode === "edit") {
      return (
        <Resizable
          className={classNames("dashboard-page-col", {
            "dashboard-page-col--selected":
              selectedCol && selectedCol.id === colItem.id
          })}
          size={{
            width: colItem.width,
            height: colItem.height
          }}
          style={{
            marginLeft: colItem.marginLeft,
            marginRight: colItem.marginRight
          }}
          grid={resizeGrid}
          onClick={e => this.handleColClick(e)}
          snap={colItem.snap}
          onResizeStop={(
            event: MouseEvent | TouchEvent,
            direction: any,
            refToElement: HTMLDivElement,
            delta: any
          ) => this.handleResizeStop(delta)}
          onResize={this.handleResize}
        >
          <Tooltip title="删除图表">
            <Icon
              type="delete"
              className="dashboard-page-col__operation-delete"
              onClick={this.handleDeleteCol}
            />
          </Tooltip>

          <DashboardChart {...colItem.props} mode="edit" />
        </Resizable>
      );
    }
    // 查看列
    return (
      <div>
        {isShowSearchBar && (
          <div style={{ width: 500 }}>
            <AdvSearch
              fields={aDvFields}
              initialSearchList={searchList}
              readOnly={true}
              onConfirm={this.handleDoSearch}
            />
          </div>
        )}
        <div style={{ padding: 8 }}>
          <Tooltip title="动态表格">
            <Icon
              style={{ fontSize: 20, color: "#63a0a7" }}
              type="table"
              onClick={this.toggleIsShowGrid}
            />
          </Tooltip>
        </div>
        <DashboardChart
          style={{ height: colItem.height }}
          mode="view"
          {...colItem.props}
        />
        {/* )} */}
        <Drawer
          visible={drawerVisivble}
          onClose={this.toggleIsShowGrid}
          width="100%"
        >
          <BIGrid
            gridProps={[
              {
                resid: colItem.settingForm.resid,
                baseURL: this.props.baseURL,
                cmswhere: colItem.settingForm.where
              }
            ]}
            language="zhCN"
            height="calc(100vh - 48px)"
            isAllEnableRowGroup={true}
            isAllEnableValue={true}
          />
        </Drawer>
      </div>
    );
  }
}
