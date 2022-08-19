let {addWebpackAlias, override} =require('customize-cra')
const path = require("path");

module.exports= override(
    addWebpackAlias({
        '@': path.join(__dirname, "src"),
    })
)