// 折线图默认配置
export const lineDefaultOption: echarts.EChartOption = {
  // 标题
  title: {
    show: true,
    text: '主标题',
    subtext: ''
  },
  // 图例
  legend: {
    show: true
  },
  // 提示框
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        show: true
      },
      restore: {
        show: true
      },
      dataView: {
        show: true
      },
      dataZoom: { show: true },
      magicType: {
        show: true,
        type: ['line', 'bar', 'stack', 'tiled']
      }
    }
  },
  // 系列列表
  series: [
    {
      name: '图例一',
      data: [1, 2, 3, 4, 5, 6, 7],
      type: 'line'
    }
  ],
  // x 轴
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  // y 轴
  yAxis: {
    type: 'value'
  }
};

// 柱状图默认配置
export const barDefaultOption: echarts.EChartOption = {
  // 标题
  title: {
    show: true,
    text: '标题'
  },
  // 图例
  legend: {
    show: true
  },
  // 提示框
  tooltip: {
    show: true,
    trigger: 'axis'
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        show: true
      },
      restore: {
        show: true
      },
      dataView: {
        show: true
      },
      dataZoom: { show: true },
      magicType: {
        show: true,
        type: ['line', 'bar', 'stack', 'tiled']
      }
    }
  },
  // 系列列表
  series: [
    {
      name: '图例一',
      data: [1, 2, 3, 4, 5, 6, 7],
      type: 'bar'
    }
  ],
  // x 轴
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  // y 轴
  yAxis: {
    type: 'value'
  }
};

// 饼图默认配置
export const pieDefaultOption: echarts.EChartOption = {
  // 标题
  title: {
    show: true,
    text: '标题'
  },
  // 图例
  legend: {
    show: true
  },
  // 提示框
  tooltip: {
    show: true,
    trigger: 'item'
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {
        show: true
      },
      restore: {
        show: true
      },
      dataView: {
        show: true
      },
      dataZoom: { show: true },
      magicType: {
        show: true,
        type: ['line', 'bar', 'stack', 'tiled']
      }
    }
  },
  // 系列列表
  series: [
    {
      type: 'pie',
      roseType: 'radius',
      data: [
        {
          name: '周一',
          value: 3
        },
        {
          name: '周二',
          value: 2
        },
        {
          name: '周三',
          value: 3
        },
        {
          name: '周四',
          value: 4
        },
        {
          name: '周五',
          value: 5
        },
        {
          name: '周六',
          value: 6
        },
        {
          name: '周日',
          value: 7
        }
      ]
    }
  ]
};
