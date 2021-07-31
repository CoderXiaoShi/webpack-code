
const sleep = num => new Promise((resolve) => {
    setTimeout(() => {
        resolve()
    }, num)
})

const replace = function(content) {
    console.log('进入 async-loader.js')

    const callback = this.async();

    (async () => {
        console.log('开始异步编译')
        await sleep(3000)
        const result = content.replace(/程序员小石/g, '程序员小石: http://www.xinglong.tech');
        console.log('编译结束')
        callback(null, result);
    })();
}
module.exports = replace;
