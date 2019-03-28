import React from 'react';
import './DashboardPageRow.less';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Icon, Row, Col, Tooltip, Modal } from 'antd';
import DashboardPageCol from './DashboardPageCol';
import DashboardPageRuler from '../DashboardPageRuler';

interface DashboardPageRowProps {
  mode: string; // 模式：'edit' 表示编辑；'view' 表示查看
  type: string; // 类型：'add' 表示添加行；'row' 表示正常行
  onAddRow: any; // 添加行的回调
  selectedRow: any; // 选择的行
}

interface OptionalChartInterface {
  chartType: string; // 图表类型，如：'line' 表示折线图
  iconType: string; // 图表字体图标类型，如：'line-chart' 使用折线的字体图标
  tooltip: string; // 提示信息，如：'双击添加折线图'
}

const optionalChartList: Array<OptionalChartInterface> = [
  {
    chartType: 'blank',
    iconType: 'border',
    tooltip: '空白'
  },
  {
    chartType: 'line',
    iconType: 'line-chart',
    tooltip: '折线图'
  },
  {
    chartType: 'bar',
    iconType: 'bar-chart',
    tooltip: '柱状图'
  },
  {
    chartType: 'pie',
    iconType: 'pie-chart',
    tooltip: '饼图'
  }
];

const defaultAddColSpan = 2;

function getColWidth(dashboardPageWidth: number, gutter: number): number {
  return (dashboardPageWidth - 12 * gutter) / 12;
}

/**
 * 仪表盘页面的行
 */
export default class DashboardPageRow extends React.Component<
  DashboardPageRowProps & any,
  any
> {
  static propTypes = {
    type: PropTypes.oneOf(['add', 'row']),
    onAddRow: PropTypes.func,
    selectedRow: PropTypes.object,
    rowItem: PropTypes.object
  };

  state = {
    modalVisible: false,
    selectedChart: 'blank',
    resizing: false // 是否处于设置列尺寸状态
  };

  handleRowClick = () => {
    const { onActiveRow, rowItem } = this.props;
    onActiveRow && onActiveRow(rowItem);
  };

  handleConfirmDeleteRow = rowItem => {
    this.props.onDeleteRow && this.props.onDeleteRow(rowItem);
  };

  hanleDeleteRow = rowItem => {
    // 存在列的话，提醒用户
    if (rowItem.cols.length) {
      return Modal.confirm({
        title: '提示',
        content: '本行存在添加的列，您确定要删除本行吗？',
        onOk: () => this.handleConfirmDeleteRow(rowItem)
      });
    }
    this.handleConfirmDeleteRow(rowItem);
  };

  handleAddCol = e => {
    e.stopPropagation();
    this.setState({ modalVisible: true });
  };

  handleSelectChart = type => {
    this.setState({ selectedChart: type });
  };

  handleAddChart = e => {
    e.stopPropagation();
    const { rowItem, onAddChart } = this.props;
    onAddChart && onAddChart(rowItem, this.state.selectedChart);
    this.handleCancel();
  };

  handleCancel = () => {
    this.setState({ modalVisible: false });
  };

  getDragGrid = () => {
    const { rowItem, dashboardPageWidth } = this.props;
    const colWidth =
      (parseInt(dashboardPageWidth, 10) - 11 * rowItem.gutter) / 12;
    const result = colWidth + rowItem.gutter;
    return [result, result];
  };

  getResizeGrid = () => {
    const { rowItem, dashboardPageWidth } = this.props;
    const colWidth =
      (parseInt(dashboardPageWidth, 10) - 11 * rowItem.gutter) / 12;
    const result = colWidth + rowItem.gutter;
    return [result, 1];
  };

  handleStop = positionProps => {
    console.log({ positionProps });
  };

  handleResize = () => {
    if (!this.state.resizing) {
      this.setState({ resizing: true });
    }
  };

  handleResizeStop = (rowItem, colItem, delta) => {
    this.setState({ resizing: false });
    this.props.onResizeStop && this.props.onResizeStop(rowItem, colItem, delta);
  };

  isHasSpace = rowItem => {
    let span = 0;
    rowItem.cols.forEach(colItem => {
      span += colItem.span;
    });
    if (span < 24) {
      return true;
    }
    return false;
  };

  render() {
    const {
      mode,
      rowItem,
      selectedRow,
      selectedCol,
      onActiveCol,
      onDeleteCol,
      dashboardPageWidth,
      baseURL
    } = this.props;
    const { modalVisible, selectedChart, resizing } = this.state;

    const dragGrid: any = this.getDragGrid();
    const resizeGrid = this.getResizeGrid();

    // 编辑模式
    if (mode === 'edit') {
      return (
        <div
          className={classNames('dashboard-page-row', {
            'dashboard-page-row--selected':
              selectedRow && selectedRow.id === rowItem.id
          })}
          style={{ marginTop: rowItem.top, marginBottom: rowItem.bottom }}
          onClick={this.handleRowClick}
        >
          <DashboardPageRuler gutter={rowItem.gutter} />
          <Tooltip title="删除行">
            <Icon
              type="delete"
              className="dashboard-page-row__operation-delete"
              onClick={() => this.hanleDeleteRow(rowItem)}
            />
          </Tooltip>
          {rowItem.cols.map(colItem => (
            <DashboardPageCol
              key={colItem.id}
              mode={mode}
              rowItem={rowItem}
              colItem={colItem}
              selectedCol={selectedCol}
              resizeGrid={resizeGrid}
              onActiveCol={onActiveCol}
              onResizeStop={this.handleResizeStop}
              onDeleteCol={onDeleteCol}
              onResize={this.handleResize}
              baseURL={baseURL}
            />
          ))}
          {/* 添加列按钮 */}
          <div
            className="dashboard-page-row-add-col"
            onClick={this.handleAddCol}
            style={{
              width: getColWidth(dashboardPageWidth, rowItem.gutter),
              marginLeft: rowItem.gutter / 2
            }}
          >
            <Icon type="plus" style={{ fontSize: 20 }} />
          </div>

          {/* 选择图表 */}
          <Modal
            visible={modalVisible}
            title="选择图表"
            onOk={this.handleAddChart}
            onCancel={this.handleCancel}
          >
            <div className="dashboard-page-row__select-chart">
              {optionalChartList.map(
                (optionalChart: OptionalChartInterface) => {
                  return (
                    <span
                      key={optionalChart.chartType}
                      className={classNames(
                        'dashboard-page-row__select-chart-item',
                        {
                          'dashboard-page-row__select-chart-item--selected':
                            optionalChart.chartType === selectedChart
                        }
                      )}
                      style={{ display: 'inline-block' }}
                      onClick={() =>
                        this.handleSelectChart(optionalChart.chartType)
                      }
                    >
                      <div>
                        <Icon type={optionalChart.iconType} />
                        <br />
                        {optionalChart.tooltip}
                      </div>
                    </span>
                  );
                }
              )}
            </div>
          </Modal>
        </div>
      );
    }

    // 查看模式
    return (
      <Row gutter={rowItem.gutter}>
        {rowItem.cols.map(colItem => (
          <Col key={colItem.id} span={colItem.span}>
            <DashboardPageCol
              mode={mode}
              colItem={colItem}
              baseURL={this.props.baseURL}
            />
          </Col>
        ))}
      </Row>
    );
  }
}
