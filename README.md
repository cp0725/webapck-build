### 打包前源代码的分析：
* index.js :  打包入口文件
* a.js: 模块a抛出了一个方法，
* b.js: 模块b抛出了一个对象，并且引用了d模块。
* c.js: 模块c只有两句声明
* d:js: 模块d引用了e、a、b
* e:js: 模块e对this做了console.log操作，webpack打包会把全局的this指向undefined。


### 关于webpack:
不同版本的webpack打包编译的输出代码会有一定差异，这里用 4.26 和 3.1 分别做编译来分析编译生成的代码。


### 首先以 v3.1 为例对大概流程进行分析：
* 整个文件是个自执行函数，作用是防止全局变量污染。传入了一个数组参数modules。
* 自执行函数内部一开始新建了一个对象installedModules，用来记录打包了哪些模块（缓存）。
* 然后新建了函数__webpack_require__，是整个自执行函数最核心的部分。
* __webpack_require__函数的参数是 moduleId，表示需要的执行的模块的index下标。
* __webpack_require__(__webpack_require__.s = 2) 这句表示要从第二个模块开始执行。
* 其实首先执行的第二个模块就是我们的打包入口 index.js 。


### 那么当传入了moduleId之后，__webpack_require__内部发生了什么？
首先通过moduleId判断这个模块是否引入过。如果已经引入过的话，则直接返回。否则 installedModules 去记录下这次引入。这样子如果别的文件也要引入这个模块的话，避免去重复执行相同的代码。然后通过 modules[moduleId].call 去执行了引入的JS文件。


### 如何在模块内调用其他模块？
`modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);`
modules 是模块列表，moduleId 是被执行的模块的index，模块的执行是通过call来触发的，并把 __webpack_require__ 函数当成参数做了穿入，那么在模块内调用 __webpack_require__(moduleId)，就可以调用到其他模块了。


### v4.26 和 v3.1 生成的代码有什么差异？
v4.26 和 v3.1 生成的代码其实没有太大差异，他们都是把模块组装成一个 list/obj，然后作为参数传入到一个自执行的函数里，不同点是 v3.1 把模块组装成了一个list，通过 index 来调用模块，而 v4.26 是把模块组装成了一个 obj，各模块的引入路径就是他的 key，模块之间通过 key 来引用。还有一个不同点，v3.1 里模块内的代码是以正常的代码包在一个 function 里执行的，而 v4.26 是把模块内的代码转成字符串用 eval( ) 函数包裹再放在 function 里。



---------