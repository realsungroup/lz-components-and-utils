import {
  lineDefaultOption,
  barDefaultOption,
  pieDefaultOption
} from './chartDefaultOption';
import cloneDeep from 'lodash/cloneDeep';

type AFType = '' | 'min' | 'max' | 'avg' | 'count' | 'count(distinct)' | 'sum';
type SortType = '' | 'desc' | 'asc';

// 字段 接口（后端返回的）
export interface FieldInterface {
  id: string; // 字段 id（内部字段名称）
  text: string; // 字段含义
  af?: AFType; // 改字段调用的聚合函数名称
  sort?: SortType; // 分类字段排序
  records?: Array<any>; // 调用聚合函数后得到的记录
}

export const setItem = (key: string, value: string): void => {
  return localStorage.setItem(key, value);
};

export const getItem = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const removeItem = (key: string): void => {
  return localStorage.removeItem(key);
};

/**
 * 触发原生事件
 * @param name 事件名称
 */
export const triggerNativeEvent = (name: string): void => {
  const event = new Event(name);
  window.dispatchEvent(event);
};

/**
 * 获取 col 的样式
 * @param gutter 栅格间隔
 * @param cols 列数据
 * @param isAddBtn 是否是添加列的列，默认值：false
 * @param colItem 列项
 */
export const getColStyle = (
  gutter: number,
  cols,
  isAddBtn = false,
  colItem
): any => {
  // dashboardPage 宽度
  const width = getItem('dashboardPageWidth');
  const colWidth = (parseInt(width, 10) - 11 * gutter) / 12;
  const margin = gutter / 2;

  // 添加按钮列的样式
  if (isAddBtn) {
    const style: any = {
      width: colWidth
    };
    // // 起点
    // if (cols.length > 0) {
    //   style.marginLeft = margin;
    // }
    style.marginLeft = margin;

    return style;

    // 其他列的样式
  } else {
    const gutterWidth = gutter * (colItem.span / 2 - 1);
    const width = (colItem.span / 2) * colWidth + gutterWidth;

    const style: any = {
      width
    };

    const index = cols.findIndex(col => col.id === colItem.id);

    if (index === 0) {
      style.marginRight = margin;
    } else {
      style.margin = `0 ${margin}px`;
    }

    return style;
  }
};

/**
 * 表格数据转换为树数据
 * @param tableData 表格数据
 * @param idField id 字段
 * @param pidField pid 字段
 * @param parentNode 父节点数据
 */
export const table2Tree = (
  tableData: Array<any>,
  idField: string,
  pidField: string,
  parentNode?: any
): Array<object> => {
  const ret: Array<any> = [];

  if (!tableData) {
    return ret;
  }

  // parentNode 存在
  if (parentNode) {
    tableData.forEach(tableItem => {
      if (tableItem[pidField] === parentNode[idField]) {
        parentNode.children && parentNode.children.push({ ...tableItem });
      }
    });

    // parentNode 不存在
  } else {
    tableData.forEach(tableItem => {
      const index = ret.findIndex(
        item => item[idField] === tableItem[pidField]
      );

      if (index === -1) {
        ret.push({ ...tableItem, children: [] });
      } else {
        ret[index].children.push(tableItem);
        ret[index].children[
          ret[index].children.length - 1
        ].children = table2Tree(tableData, idField, pidField, tableItem);
      }
    });
  }

  return ret;
};

interface ParamsInterface {
  type?: string; // 图表类型，如：'line'

  // 图表属性的配置
  titleVisible?: boolean; // 标题是否显示
  title?: string; // 标题
  subTitle?: string; // 副标题
  legendVisible?: boolean; // 图例是否显示
  tooltipVisible?: boolean; // 提示框是否显示
  toolboxVisible?: boolean; // 工具栏是否显示

  // 数据绑定配置
  records?: Array<any>; // 图表绑定的资源的记录
  aAreaFields?: Array<FieldInterface>; // a 区域的字段列表
  bAreaFields?: Array<FieldInterface>; // b 区域的字段列表
}

/**
 * 计算图表接收的 option
 * @param params 参数
 *
 * @param oldOption 旧 option
 * @param calcChartProp 是否计算图表功能相关的配置
 * @param calcChartDataBinding 是否计算图表数据绑定相关的配置
 */
export const calcChartOptionByParams = (
  params: ParamsInterface,
  oldOption?: echarts.EChartOption,
  calcChartProp: boolean = true,
  calcChartDataBinding: boolean = true
): echarts.EChartOption => {
  // 默认 y 轴单位 offset
  const DEFAULT_UNIT_OFFSET = 50;
  const {
    type,
    titleVisible,
    title,
    subTitle,
    legendVisible,
    tooltipVisible,
    toolboxVisible,
    // 数据绑定相关的
    aAreaFields,
    bAreaFields,
    records
  } = params;

  let option: echarts.EChartOption;
  if (oldOption) {
    option = cloneDeep(oldOption);
  } else {
    let willBeCloneOption;
    switch (type) {
      case 'line': {
        willBeCloneOption = lineDefaultOption;
        break;
      }
      case 'bar': {
        willBeCloneOption = barDefaultOption;
        break;
      }
      case 'pie': {
        willBeCloneOption = pieDefaultOption;
        break;
      }
    }
    option = cloneDeep(willBeCloneOption);
  }

  // 计算图表功能相关的配置
  if (calcChartProp) {
    option.title = {
      ...option.title,
      show: titleVisible,
      text: title,
      subtext: subTitle
    };
    option.legend = { ...option.legend, show: legendVisible };
    option.tooltip = { ...option.tooltip, show: tooltipVisible };
    option.toolbox = { ...option.toolbox, show: toolboxVisible };
  }

  // 改变 option 中的 xAxis
  let xAxis: echarts.EChartOption.XAxis = { type: 'category' };
  // 改变 option 中的 yAxis
  let yAxis: any = [{ type: 'value' }];
  // 改变 option 中的 series
  let series: any = [];
  // 该表 grid 配置
  let grid: any = { left: '10%' };

  // 计算数据绑定相关的配置
  if (calcChartDataBinding) {
    switch (type) {
      case 'line':
      case 'bar': {
        if (aAreaFields.length) {
          // 分类字段了列表最后一个字段
          const field = aAreaFields[0];
          const id = field.id;

          // 使用了聚合函数
          if (field.af) {
            xAxis.data = field.records.map((record: any) => record[id]);

            // 未使用聚合函数
          } else {
            xAxis.data = records.map((record: any) => record[id]);
          }
        }

        const bAreaFieldsLen = bAreaFields.length;
        if (bAreaFieldsLen) {
          grid.left = bAreaFieldsLen * DEFAULT_UNIT_OFFSET;
          bAreaFields.forEach((field, index) => {
            const seriesObj = {
              name: field.text,
              type: type,
              data: {},
              yAxisIndex: index
            };
            const yAxisObj = {
              name: field.text,
              type: 'value',
              position: 'left',
              offset: index * DEFAULT_UNIT_OFFSET
            };
            const id = field.id;
            // 未使用聚合函数
            if (!field.af) {
              seriesObj.data = records.map((record: any) => record[id]);

              // 使用了聚合函数
            } else {
              seriesObj.data = field.records.map((record: any) => record[id]);
            }
            series.push(seriesObj);
            yAxis[index] = yAxisObj;
          });
        }
        break;
      }
      case 'pie': {
        let categoryField: any = {},
          valueField: any = {};
        if (aAreaFields.length && bAreaFields.length) {
          categoryField = aAreaFields[0];
        }
        if (bAreaFields.length) {
          valueField = bAreaFields[0];
        }
        const seriesObj = { type: 'pie', roseType: 'radius', data: [] };
        let willLoopRecords;
        // 值字段使用了聚合函数
        if (valueField.af) {
          willLoopRecords = valueField.records;
          // 未使用聚合函数
        } else {
          willLoopRecords = records;
        }
        willLoopRecords.forEach(record => {
          seriesObj.data.push({
            name: record[categoryField.id],
            value: record[valueField.id]
          });
        });
        series.push(seriesObj);
        break;
      }
      default: {
        xAxis = {
          type: 'category',
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
        };
        grid = { left: '10%' };
        yAxis = { type: 'value' };
        series = [
          {
            name: '图例一',
            data: [1, 2, 3, 4, 5, 6, 7],
            type: 'line'
          }
        ];
      }
    }
  }
  return { ...option, xAxis, yAxis, series, grid };
};
