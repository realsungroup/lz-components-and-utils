import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

interface DashboardPageRulerProps {
  gutter: number; // 栅格间隔
}

const MAX_COLUMN_COUNT = 12;

function getGridColumns(): Array<any> {
  const ret = [];
  let i = MAX_COLUMN_COUNT;
  while (i--) {
    ret.push(i);
  }
  return ret;
}

/**
 * 仪表盘页面栅格系统背景尺
 */
export default class DashboardPageRuler extends React.Component<
  DashboardPageRulerProps,
  any
> {
  static propTypes = {
    gutter: PropTypes.number
  };

  static defaultProps = {
    gutter: 16
  };

  state = {
    columns: getGridColumns()
  };

  render() {
    const { columns } = this.state;
    const { gutter } = this.props;
    return (
      <div className="dashboard-page-ruler">
        {columns.map((item, index) => (
          <div
            key={item}
            className={classNames('dashboard-page-ruler__column', {
              'dashboard-page-ruler__column--start': index === 0,
              'dashboard-page-ruler__column--end': index === columns.length - 1
            })}
            style={{ margin: `0px ${gutter / 2}px` }}
          />
        ))}
      </div>
    );
  }
}
