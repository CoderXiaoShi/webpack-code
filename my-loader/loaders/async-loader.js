
const sleep = num => new Promise((resolve) => {
    setTimeout(() => {
        resolve()
    }, num)
})

module.exports = function(content) {
    const callback = this.async();
    ;(async () => {
        await sleep(3000)
        content = content.replace(/程序员小石/g, '程序员小石: www.xinglong.tech');
        callback(
            null,
            content
        )
    })();
}
