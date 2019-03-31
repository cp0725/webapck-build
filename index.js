const aModules =  require('./a.js') // a.js 是一个方法
const A = aModules()
console.log('在入口文件输出A', A)

const bModules = require('./b.js')  // b.js 是一个object
console.log('在入口文件输出B', bModules)

const cModules = require('./c.js') // c.js 未抛出内容 只引入c啥也不干

