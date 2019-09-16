const fs = require('fs');
const path = require('path');
/**
* node_modules 里面的lib 不需要打包，运行时再从外部获取
* @type {{}}
*/
let externals = {};
fs.readdirSync('node_modules')
    .filter(function (dir) {
        return ['.bin'].indexOf(dir) === -1;
    })
    .forEach(function (dir) {
        externals[dir] = 'commonjs ' + dir;
    });

module.exports = {
    mode: 'production', // webpack4新增属性，默认返回production,提供一些默认配置，例如cache:true
    entry: '../src/app.js',
    output: { // 输出
        path: path.join(__dirname, '../dist/'),
        filename: '[name].js'
    },
    context: __dirname, // 上下文
    node: { // 是否 polyfill 或 mock 某些 Node.js 全局变量和模块
        __filename: false,
        __dirname: false
    },
    externals: externals, // 防止将某些 import 的包(package)打包到 bundle 中，而是在运行时(runtime)再去从外部获取这些扩展依赖(external dependencies)
    target: 'node', // 告知 webpack 为目标(target)指定为Node.js 环境可用
    resolve: {
        extensions: ['.js'] // 自动解析确定的扩展
    }
};