import React from 'react';
import { storiesOf } from '@storybook/react';
import AdvSearch from '../AdvSearch';
import './index.css';
import '../style/index.less';

const testFields = [
  {
    label: '姓名',
    value: 'name',
    control: 'Input'
  },
  {
    label: '年龄',
    value: 'age',
    control: 'Input'
  },
  {
    label: '性别',
    value: 'sex',
    control: 'Input'
  }
];

storiesOf('AdvSearch 高级搜索', module).add('AdvSearch', () => (
  <div style={{ width: 500 }}>
    <AdvSearch fields={testFields} />
  </div>
));
