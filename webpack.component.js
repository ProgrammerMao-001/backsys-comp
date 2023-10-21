const glob = require("glob") // 匹配文件的插件(node自带)
const list = {}
// {
//     "demo": "./components/lib/demo/index.js",
//     "packName": "./components/lib/a/index.js"
// } // list 最终需要的格式
async function makeList(dirPath, list) {
    const files = glob.sync(`${dirPath}/**/index.js`)
    for (let file of files) {
        const component = file.split(/[/.]/)[2]
        list[component] = `./${file}`
    }
}
makeList("components/lib/", list)
console.log(list)

module.exports = {
    entry: list,
    output: {
        fileName: `[name].umd.js` // 最终的文件：demo.und.js
    }
}
