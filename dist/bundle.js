// 自执行函数 防止变量污染  webpack -v 4.26
(function(modules) {
	// 模块缓存
 	var installedModules = {};
	// require 函数（核心执行方法）
 	function __webpack_require__(moduleId) {
		// 检查模块是否在缓存中
 		if(installedModules[moduleId]) {
 			return installedModules[moduleId].exports;
    }
		// 创建一个新模块（并将其放入缓存中）
 		var module = installedModules[moduleId] = {
 			i: moduleId,
 			l: false,
 			exports: {}
 		};

		// 执行模块功能
 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
    module.l = true;  // 将模块标记为已加载
    return module.exports; // 返回模块的导出
 	}

	// 记录传入的模块队列 (全部模块)
   __webpack_require__.m = modules;
	// 记录模块缓存 （执行过的模块）
 	__webpack_require__.c = installedModules;
	// 为Harmony导出定义getter函数
   __webpack_require__.d = function(exports, name, getter) {
 		if(!__webpack_require__.o(exports, name)) {
 			Object.defineProperty(exports, name, { 
         enumerable: true, 
         get: getter 
      });
 		}
 	};

 	// define __esModule on exports
 	__webpack_require__.r = function(exports) {
 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
 		}
 		Object.defineProperty(exports, '__esModule', { value: true });
 	};

 	// create a fake namespace object
 	// mode & 1: value is a module id, require it
 	// mode & 2: merge all properties of value into the ns
 	// mode & 4: return value when already ns object
 	// mode & 8|1: behave like require
 	__webpack_require__.t = function(value, mode) {
 		if(mode & 1) value = __webpack_require__(value);
 		if(mode & 8) return value;
 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
 		var ns = Object.create(null);
 		__webpack_require__.r(ns);
 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
 		return ns;
 	};

 	// getDefaultExport function for compatibility with non-harmony modules
 	__webpack_require__.n = function(module) {
 		var getter = module && module.__esModule ?
 			function getDefault() { return module['default']; } :
 			function getModuleExports() { return module; };
 		__webpack_require__.d(getter, 'a', getter);
 		return getter;
 	};

 	// Object.prototype.hasOwnProperty.call
 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
 	// __webpack_public_path__
 	__webpack_require__.p = "";
  // 从模块队列的第一个开始执行
 	return __webpack_require__(__webpack_require__.s = "./index.js");
})
({
  "./a.js": (function(module, exports) {
    eval("module.exports = function(){\n  let name = '我是a，是一个Function'\n  let info = '模块a抛出了一个方法，并返回 name + info'\n  return name + info\n}\n\n\n//# sourceURL=webpack:///./a.js?");
  }),
  "./b.js": (function(module, exports, __webpack_require__) {
    eval("// d.js 没有抛出任何内容引入d.js只是为执行d.js的代码\nconst dModules = __webpack_require__(/*! ./d.js */ \"./d.js\")\nmodule.exports = {\n  name: '我是b',\n  info: '模块b抛出了一个object',\n  dModules: dModules\n}\n\n//# sourceURL=webpack:///./b.js?");
  }),
  "./c.js": (function(module, exports) {
    eval("const name = \"我是c\"\nconst info = \"模块c只有两句面向过程的语句\"\n\n//# sourceURL=webpack:///./c.js?");
  }),
  "./d.js": (function(module, exports, __webpack_require__) {
    eval("const eModules = __webpack_require__(/*! ./e.js */ \"./e.js\")\nconst aModules = __webpack_require__(/*! ./a.js */ \"./a.js\")\nconst bModules = __webpack_require__(/*! ./b.js */ \"./b.js\")\n\n\n//# sourceURL=webpack:///./d.js?");
  }),
  "./e.js": (function(module, exports) {
    eval("console.log(this)\n\n//# sourceURL=webpack:///./e.js?");
  }),
  "./index.js": (function(module, exports, __webpack_require__) {
    eval("const aModules =  __webpack_require__(/*! ./a.js */ \"./a.js\") // a.js 是一个方法\nconst A = aModules()\nconsole.log('在入口文件输出A', A)\n\nconst bModules = __webpack_require__(/*! ./b.js */ \"./b.js\")  // b.js 是一个object\nconsole.log('在入口文件输出B', bModules)\n\nconst cModules = __webpack_require__(/*! ./c.js */ \"./c.js\") // c.js 未抛出内容 只引入c啥也不干\n\n\n\n//# sourceURL=webpack:///./index.js?");
  })
})