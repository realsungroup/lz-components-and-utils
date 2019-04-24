import React from 'react';
import PropTypes from 'prop-types';
import { Icon, Tooltip, Modal } from 'antd';
import DashboardChart from './DashboardChart';
import Resizable from 're-resizable';
import classNames from 'classnames';

/**
 * 仪表盘页面的列
 */
export default class DashboardPageCol extends React.Component<any, any> {
  static propTypes = {
    type: PropTypes.oneOf(['add', 'row']),
    onAddRow: PropTypes.func
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

    // 查看列
    return (
      <DashboardChart
        style={{ height: colItem.height }}
        mode="view"
        {...colItem.props}
      />
    );
  }
}
