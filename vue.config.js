// const webpack = require('webpack'); 
// module.exports = {
//     configureWebpack: {
//         plugins: [
//             new webpack.ProvidePlugin({
//                 $: 'jquery',
//                 jQuery: 'jquery',
//                 "window.jQuery": 'jquery',
//             })
//         ]
//     }
// }
const webpack = require("webpack");

module.exports = {
 configureWebpack: {

   plugins: [
     new webpack.ProvidePlugin({
       $: "jquery",
       jQuery: "jquery",
       "window.jQuery": "jquery",
       Popper: ["popper.js", "default"]
     })
   ]
 }
};