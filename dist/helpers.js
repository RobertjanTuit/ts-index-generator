"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var glob_1 = __importDefault(require("glob"));
var lodash_1 = __importDefault(require("lodash"));
function clearIndexes(rootPath) {
    var indexes = glob_1.default.sync(rootPath + "/**/index.ts");
    indexes.forEach(function (file) {
        if (fs_1.default.existsSync(file)) {
            fs_1.default.unlinkSync(file);
        }
    });
}
exports.clearIndexes = clearIndexes;
function getIndexes(rootPath, _a) {
    var _b = _a.ignore, ignore = _b === void 0 ? [] : _b;
    var files = glob_1.default.sync(rootPath + "/**/*.(ts|tsx)", {
        nodir: true,
        ignore: ['**/index.ts'].concat(ignore),
    });
    return lodash_1.default(files)
        .flatMap(function (file) {
        var filename = path_1.default.basename(file).split('.').slice(0, -1).join('.');
        var parents = path_1.default.relative(rootPath, path_1.default.dirname(file)).split(path_1.default.sep);
        var contents = fs_1.default.readFileSync(file, 'utf8').trim();
        if (contents.startsWith('// no-export')) {
            return [];
        }
        return lodash_1.default(parents)
            .map(function (_0, idx) {
            var before = parents.slice(0, -idx);
            var after = parents.slice(-idx);
            if (before.length === 0) {
                return {
                    export: "export * from './" + filename + "';",
                    path: path_1.default.join(rootPath, after.join('/'), 'index.ts'),
                };
            }
            return {
                export: "export * from './" + after[0] + "/index';",
                path: path_1.default.join(rootPath, before.join('/'), 'index.ts'),
            };
        })
            .compact()
            .uniqWith(lodash_1.default.isEqual)
            .value();
    })
        .uniqWith(lodash_1.default.isEqual)
        .value();
}
exports.getIndexes = getIndexes;
