import React from 'react';
import './DashboardChart.less';
import EchartsOfReact from 'echarts-of-react';
import PropTypes from 'prop-types';

/**
 * 仪表盘中的图表组件
 */
export default class DashboardChart extends React.Component<any, any> {
  static propTypes = {
    /**
     * 模式
     * 可选：'edit' 编辑模式 | 'view' 查看模式
     */
    mode: PropTypes.oneOf(['edit', 'view']),

    /**
     * css 选择器：id
     */
    id: PropTypes.string,

    /**
     * Echarts 图表接收的 option
     */
    option: PropTypes.object
  };

  state = {};

  render() {
    const { mode, id, option } = this.props;

    // 编辑模式
    if (mode === 'edit') {
      return (
        <div className="dashboard-chart">
          <EchartsOfReact
            id={id}
            defaultWidth="100%"
            defaultHeight="100%"
            option={option}
            notMerge={true}
          />
        </div>
      );
    }

    const { style } = this.props;
    // 查看模式
    return (
      <div className="dashboard-chart" style={style}>
        <EchartsOfReact
          id={id}
          defaultWidth="100%"
          defaultHeight="100%"
          option={option}
          notMerge={true}
        />
      </div>
    );
  }
}
