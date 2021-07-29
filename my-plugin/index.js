const MarkdownIt = require('markdown-it');
const path = require('path');
const childProcess = require('child_process');
const fs = require('fs');

// 定义转译工具
const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
});

// 读取文件内容
var str = fs.readFileSync(
    path.resolve(__dirname, './test.md'),
    'utf-8'
)

// markdown -> html
var result = md.render(str)

// 写入文件
fs.writeFileSync(
    path.resolve(__dirname, './test.html'), result
)

let cmd = ''
switch (process.platform) {
    case 'wind32':
        cmd = 'start';
        break;

    case 'linux':
        cmd = 'xdg-open';
        break;

    case 'darwin':
        cmd = 'open';
        break;
}

// 打开浏览器
childProcess.exec(`${cmd} ./test.html`)
