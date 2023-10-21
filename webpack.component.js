const path = require("path")
const glob = require("glob") // 匹配文件的插件(node自带)
const list = {}
const { VueLoaderPlugin } = require("vue-loader")
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
makeList("components/lib/", list) // 遍历components/lib/ 下的所有index.js文件，并将其路径存入list

module.exports = {
    entry: list,
    mode: "development",
    output: {
        fileName: '[name].umd.js', // 最终的文件：demo.und.js
        path: path.resolve(__dirname, "dist"),
        library: "mui",
        libraryTarget: "umd",
    },
    plugin: [
        new VueLoaderPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: "vue-loader"
                    }
                ]
            }
        ]
    }

}
