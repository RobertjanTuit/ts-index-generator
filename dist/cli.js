#!/usr/bin/env node
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var commander_1 = __importDefault(require("commander"));
var helpers_1 = require("./helpers");
var pkg = (fs_1.default.existsSync('./package.json')) ? require('./package.json') : require('../package.json');
commander_1.default
    .version(pkg.version)
    .option('-i, --ignore [patterns...]', 'Ignored file patterns', function (s) { return s.split(','); }, [])
    .arguments('<path>')
    .action(function (rootPath) {
    helpers_1.clearIndexes(rootPath);
    helpers_1.getIndexes(rootPath, { ignore: commander_1.default.ignore }).forEach(function (index) {
        fs_1.default.appendFileSync(index.path, index.export + "\n");
    });
})
    .parse(process.argv);
