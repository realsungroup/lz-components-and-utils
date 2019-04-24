import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip, Modal, message } from 'antd';
import { calcChartOptionByParams } from '../../../util';
import DashboardChart from './DashboardChart';
import Resizable from 're-resizable';
import classNames from 'classnames';
import http from '../../../util/api';

/**
 * 仪表盘页面的列
 */
export default class DashboardPageCol extends React.Component<any, any> {
  static propTypes = {
    type: PropTypes.oneOf(['add', 'row']),
    onAddRow: PropTypes.func
  };

  state = {
    hasData: false, // 在查看模式下，是否已经请求到了数据
    option: null // 在查看模式下通用请求后端数据计算得到的 option
  };

  componentDidMount = async () => {
    if (this.props.mode !== 'view') {
      return;
    }
    const { settingForm } = this.props.colItem;
    const { resid, bAreaFields, aAreaFields, where } = settingForm;

    const categoryFieldItem = aAreaFields[0];
    const categoryField = categoryFieldItem.id;
    const sort = categoryFieldItem.sort;

    const pArr = bAreaFields
      .map((fieldItem, index) => {
        const af = fieldItem.af;
        if (af) {
          const valueField = fieldItem.id;
          const aggregateFunctionObj = {
            min: `${categoryField},min(${valueField}) ${valueField}`,
            max: `${categoryField},max(${valueField}) ${valueField}`,
            avg: `${categoryField},avg(${valueField}) ${valueField}`,
            count: `${categoryField},count(${valueField}) ${valueField}`,
            'count(distinct)': `${categoryField},count(distinct ${valueField}) ${valueField}`,
            sum: `${categoryField},sum(${valueField}) ${valueField}`
          };
          const params: any = {
            resid,
            fields: aggregateFunctionObj[af],
            groupby: categoryField,
            cmswhere: where
          };
          if (sort) {
            params.orderby = `${categoryField} ${sort}`;
          }
          return http({ baseURL: this.props.baseURL }).getFieldAggregateValue(
            params
          );
        } else {
          return http({ baseURL: this.props.baseURL }).getTable({
            resid,
            sortField: categoryField,
            sortOrder: sort,
            cmswhere: where
          });
        }
      })
      .filter(item => item);
    let res;
    try {
      res = await Promise.all(pArr);
    } catch (err) {
      console.error(err);
      return message.error(err.message);
    }

    // 修改 aAreaFields 和 bAreaFields
    bAreaFields.forEach((fieldItem, index) => {
      // 本字段使用了聚合函数
      if (fieldItem.af) {
        fieldItem.sort = sort;
        fieldItem.records = res[index].data;
        aAreaFields[0].records = res[index].data;
        aAreaFields[0].sort = sort;
        // 未使用聚合函数
      } else {
        settingForm.records = res[index].data;
        settingForm.aAreaFields[0].sort = sort;
      }
    });

    // 计算得到 option
    const option = calcChartOptionByParams({
      type: this.props.colItem.chartType,
      ...settingForm
    });
    this.setState({ hasData: true, option });
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
      title: '提示',
      content: '您确定要删除该列吗？',
      onOk: () => onDeleteCol && onDeleteCol(rowItem, colItem)
    });
  };

  render() {
    const {
      mode,
      rowItem,
      colItem,
      selectedCol,
      resizeGrid,
      onDeleteCol
    } = this.props;

    // 编辑列
    if (mode === 'edit') {
      return (
        <Resizable
          className={classNames('dashboard-page-col', {
            'dashboard-page-col--selected':
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

    if (!this.state.hasData) {
      return <span>加载中...</span>;
    }

    // 查看列
    return (
      <DashboardChart
        style={{ height: colItem.height }}
        mode="view"
        {...colItem.props}
        option={this.state.option}
      />
    );
  }
}
