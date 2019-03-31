// d.js 没有抛出任何内容引入d.js只是为执行d.js的代码
const dModules = require('./d.js')
module.exports = {
  name: '我是b',
  info: '模块b抛出了一个object',
  dModules: dModules
}