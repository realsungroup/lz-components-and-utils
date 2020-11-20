import React from 'react';
import { storiesOf } from '@storybook/react';
import AdvSearch from '../AdvSearch';
import './index.css';
import '../style/index.less';

const testFields = [
  {
    label: '姓名',
    value: 'name',
    control: 'Input',
  },
  {
    label: '年龄',
    value: 'age',
    control: 'Input',
  },
  {
    label: '性别',
    value: 'sex',
    control: 'Input',
  },
];
const searchList = [
  {
    logicSymbol: 'and',
    compareSymbol: '=',
    field: 'yearmonth',
    control: 'Input',
    value: '201908',
  },
]; // 搜索列表

class AdvSearchDemo extends React.Component {
  state = {
    searchList: searchList,
  };

  handleChange = (search, searchList) => {
    console.log('search:', search);
    this.setState({ searchList });
  };

  render() {
    const { searchList } = this.state;
    return (
      <AdvSearch
        fields={testFields}
        initialSearchList={searchList}
        onChange={this.handleChange}
      />
    );
  }
}

storiesOf('AdvSearch 高级搜索', module).add('AdvSearch', () => (
  <div style={{ width: 500 }}>
    <AdvSearchDemo></AdvSearchDemo>
  </div>
));
