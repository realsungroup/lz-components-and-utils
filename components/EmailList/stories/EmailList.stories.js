import React from 'react';
import { storiesOf } from '@storybook/react';
import EmailList from '../EmailList';
import '../style/index.less'

storiesOf('邮件列表', module).add('邮件列表', () => <EmailList />)