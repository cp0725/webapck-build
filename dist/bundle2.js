// 自执行函数 防止变量污染  webpack -v 3.1
(function (modules) {
	// 模块缓存
	var installedModules = {};
	// require 函数（核心执行方法）
	function __webpack_require__(moduleId) {
		// 检查模块是否在缓存中
		if (installedModules[moduleId]) {
			return installedModules[moduleId].exports;
		}
		// 创建一个新模块（并将其放入缓存中）
		var module = installedModules[moduleId] = {
			i: moduleId,
			l: false,
			exports: {}
		}

		// 执行模块功能
		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
		module.l = true; // 将模块标记为已加载
		return module.exports;  // 返回模块的导出
	}

	// 记录传入的模块队列 (全部模块)
	__webpack_require__.m = modules;
	// 记录模块缓存 （执行过的模块）
	__webpack_require__.c = installedModules;

	// 为Harmony导出定义getter函数
	__webpack_require__.d = function (exports, name, getter) {
		if (!__webpack_require__.o(exports, name)) {
			Object.defineProperty(exports, name, {
				configurable: false,
				enumerable: true,
				get: getter
			})
		}
	}

	// 用于与非协调模块兼容的getdefaultexport函数
	__webpack_require__.n = function (module) {
		var getter = module && module.__esModule ?
			function getDefault() { return module['default']; } :
			function getModuleExports() { return module; };
		__webpack_require__.d(getter, 'a', getter);
		return getter;
	};

	// Object.prototype.hasOwnProperty.call
	__webpack_require__.o = function (object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
	// __webpack_public_path__
	__webpack_require__.p = "";
	// 从模块队列的第一个开始执行
	return __webpack_require__(__webpack_require__.s = 2);
})
	([
		/* 0 */
		(function (module, exports, __webpack_require__) {
			"use strict";
			module.exports = function () {
				var name = '我是a，是一个Function';
				var info = '模块a抛出了一个方法，并返回 name + info';
				return name + info;
			};
		}),
		/* 1 */
		(function (module, exports, __webpack_require__) {
			"use strict";
			// d.js 没有抛出任何内容引入d.js只是为执行d.js的代码
			var dModules = __webpack_require__(3);
			module.exports = {
				name: '我是b',
				info: '模块b抛出了一个object',
				dModules: dModules
			};
		}),
		/* 2 */
		(function (module, exports, __webpack_require__) {
			"use strict";
			var aModules = __webpack_require__(0); // a.js 是一个方法
			var A = aModules();
			console.log('在入口文件输出A', A);

			var bModules = __webpack_require__(1); // b.js 是一个object
			console.log('在入口文件输出B', bModules);

			var cModules = __webpack_require__(5); // c.js 未抛出内容 只引入c啥也不干
		}),
		/* 3 */
		(function (module, exports, __webpack_require__) {
			"use strict";
			var eModules = __webpack_require__(4);
			var aModules = __webpack_require__(0);
			var bModules = __webpack_require__(1);
		}),
		/* 4 */
		(function (module, exports, __webpack_require__) {
			"use strict";
			console.log(undefined);
		}),
		/* 5 */
		(function (module, exports, __webpack_require__) {
			"use strict";
			var name = "我是c";
			var info = "模块c只有两句面向过程的语句";
		})
	]);