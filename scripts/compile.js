'use strict';
const spawn = require('cross-spawn');
const path = require('path');
const chalk = require('chalk');
const fs = require('fs-extra');
const less = require('less');

// babel components/ -d lib/ --extensions .ts,.tsx,.js --ignore components/**/*.stories.js
const result = spawn.sync(
  'babel',
  [
    'components',
    '-d',
    'lib',
    '--extensions',
    '.ts,.tsx,.js',
    '--ignore',
    'components/**/*.stories.js'
  ],
  {
    stdio: 'inherit'
  }
);

less.render(
  `
  @import './index.css';
  @color: #fff;
  div {
    color: @color;
  }
  `,
  {},
  function(error, output) {
    if (error) {
      return console.log(chalk.red(error.message));
    }
    console.log({ output });
  }
);
