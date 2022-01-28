#!/usr/bin/env node

import fs from 'fs';
import program from 'commander';
import { clearIndexes, getIndexes } from './helpers';

const pkg = (fs.existsSync('./package.json')) ? require('./package.json') : require('../package.json'); // eslint-disable-line import/no-unresolved

program
  .version(pkg.version)
  .option('-i, --ignore [patterns...]', 'Ignored file patterns', s => s.split(','), [])
  .arguments('<path>')
  .action(rootPath => {
    clearIndexes(rootPath);
    getIndexes(rootPath, { ignore: program.ignore }).forEach(index => {
      fs.appendFileSync(index.path, `${index.export}\n`);
    });
  })
  .parse(process.argv);
