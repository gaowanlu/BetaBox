const path = require("path");
//定义规则
module.exports = {
    entry: "./dist/main.js",
    output: {
        path: path.resolve(__dirname, "./dist"),
        filename: "bundle.js",
        environment: {
            arrowFunction: false
        }
    },
    devServer: {
        port: 8080,
        contentBase: 'www'
    }
};