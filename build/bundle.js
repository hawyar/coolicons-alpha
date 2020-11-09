'use strict';

require('spicymkdir');
require('path');
require('axios');
require('chalk');
require('fs');
require('http');

require('dotenv').config();

const file = process.env.FILE_ID;
const token = process.env.FIGMA_TOKEN;

const camelCase = require('camelcase');
function index () {
  console.log('version ' + version);
}

module.exports = index;
