import React from 'react';
import './DashboardPageSizeBar.less';
import { debounce } from 'lodash';

const DEBOUNCE_WAIT = 200;

/**
 * 显示仪表盘页面宽高的 bar
 */
export default class DashboardPageSizeBar extends React.Component<any, any> {
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

  render() {
    const { dashboardPageWidth } = this.props;
    return (
      <div className="dashboard-page-size-bar">{dashboardPageWidth + 'px'}</div>
    );
  }
}
