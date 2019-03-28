import React, { Fragment } from 'react';
import { Icon } from 'antd';
import PropTypes from 'prop-types';
import DashboardPageRow from './DashboardPageRow';
import debounce from 'lodash/debounce';
import classNames from 'classnames';

interface DashboardPageInterface {
  mode: string; // 模式：'edit' 编辑 | 'view' 查看
  dashboardId: number; // 仪表盘 id
  rows: any; // 行数据
  activeChartId: string; // 在编辑模式下，被激活的图表的 id
  onResizeStop: any; // 在编辑模式下，改变图表尺寸停止时的回调
  onStop: any; // 在编辑模式下，改变图表位置停止时的回调
  onDeleteChart: any; // 在编辑模式下，删除某个图表时的回调
}

const DEBOUNCE_WAIT = 100;

/**
 * 仪表盘页面组件（所有的图表组成一个页面的组件）
 */
export default class DashboardPage extends React.Component<
  DashboardPageInterface & any,
  any
> {
  static propTypes = {
    mode: PropTypes.oneOf(['edit', 'view']).isRequired,
    rows: PropTypes.array.isRequired,
    activeChartId: PropTypes.string,
    onResizeStop: PropTypes.func,
    onStop: PropTypes.func,
    onDeleteChart: PropTypes.func
  };

  state = {};

  dashboardPage: Element;

  handleDebounceResize: any;
  componentDidMount = () => {
    this.dashboardPage = document.querySelector('.dashboard-page');
    this.handleResize();
    this.handleDebounceResize = debounce(this.handleResize, DEBOUNCE_WAIT);
    // resiz 事件注册在 window 上才会生效
    // 注册在普通 tag 上无效
    window.addEventListener('resize', this.handleDebounceResize);
  };

  componentWillUnmount = () => {
    window.removeEventListener('resize', this.handleDebounceResize);
  };

  handleResize = () => {
    const width = this.dashboardPage.clientWidth;
    if (width === this.props.dashboardPageWidth) {
      return;
    }
    this.props.onWindowResize && this.props.onWindowResize(width);
  };

  // 改变图表位置
  handleStop = (positionProps: any, id: string): void => {
    this.props.onStop && this.props.onStop(positionProps, id);
  };

  // 改变图表的尺寸
  handleResizeStop = (delta: any, chartItem: any) => {
    this.props.onResizeStop && this.props.onResizeStop(delta, chartItem);
  };

  // 删除图表
  handleDeleteChart = (chartItem: any) => {
    this.props.onDeleteChart && this.props.onDeleteChart(chartItem);
  };

  handleAddRow = () => {
    this.props.onAddRow && this.props.onAddRow();
  };

  handleActiveRow = rowItem => {
    this.props.onActiveRow && this.props.onActiveRow(rowItem);
  };

  handleDeleteRow = rowItem => {
    this.props.onDeleteRow && this.props.onDeleteRow(rowItem);
  };

  renderContent = () => {
    const {
      mode,
      selectedRow,
      selectedCol,
      onAddChart,
      onActiveCol,
      onDeleteRow,
      onResizeStop,
      onDeleteCol,
      rows,

      dashboardPageWidth,
      baseURL
    } = this.props;
    return (
      <Fragment>
        {rows.map(rowItem => (
          <DashboardPageRow
            mode={mode}
            key={rowItem.id}
            type={rowItem.type}
            onActiveRow={this.handleActiveRow}
            onDeleteRow={onDeleteRow}
            onAddChart={onAddChart}
            onActiveCol={onActiveCol}
            rowItem={rowItem}
            selectedRow={selectedRow}
            selectedCol={selectedCol}
            onResizeStop={onResizeStop}
            onDeleteCol={onDeleteCol}
            dashboardPageWidth={dashboardPageWidth}
            baseURL={baseURL}
          />
        ))}
        {mode === 'edit' && (
          <div className="dashboard-page-add-row" onClick={this.handleAddRow}>
            <Icon type="plus" style={{ fontSize: 40 }} />
          </div>
        )}
      </Fragment>
    );
  };

  render() {
    return (
      <div
        className={classNames('dashboard-page', {
          'dashboard-page__view': this.props.mode === 'view'
        })}
      >
        {this.renderContent()}
      </div>
    );
  }
}
