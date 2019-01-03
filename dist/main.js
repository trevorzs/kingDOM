/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/dom_node_collection.js":
/*!************************************!*\
  !*** ./src/dom_node_collection.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("class DOMNodeCollection {\n  constructor(nodeArray){\n    this.nodes = nodeArray;\n  }\n\n  html(arg){\n    if (typeof arg === \"string\"){\n      for (var i = 0; i < this.nodes.length; i++) {\n        this.nodes[i].innerHTML = arg;\n      }\n    }else if (this.nodes[0]){\n        return this.nodes[0].innerHTML;\n    }\n  }\n\n  value(){\n    if (this.nodes[0]){\n        return this.nodes[0].value;\n    }else{\n      return null;\n    }\n  }\n\n  empty(){\n    this.html(\"\");\n  }\n\n  append(arg){\n    if (arg.constructor.name === \"DOMNodeCollection\"){\n      for (var i = 0; i < this.nodes.length; i++) {\n        for (var j = 0; j < arg.nodes.length; j++) {\n          this.nodes[i].innerHTML += input.nodes[j].outerHTML;\n        }\n      }\n    } else if (arg instanceof HTMLElement){\n      this.nodes.forEach(node => node.innerHTML += input.outerHTML);\n    }else if (typeof arg === 'string'){\n      this.nodes.forEach(node => node.innerHTML += arg);\n    }\n  }\n\n  attr (attribute, value) {\n    if (value) {\n      this.nodes.forEach(node => node.setAttribute(attribute, value));\n    } else {\n      return this.nodes[0].getAttribute(attribute);\n    }\n  }\n\n  addClass(arg){\n    for (var i = 0; i < this.nodes.length; i++) {\n      this.nodes[i].classList.add(arg);\n    }\n  }\n\n  removeClass(arg){\n    for (var i = 0; i < this.nodes.length; i++) {\n      this.nodes[i].classList.remove(arg);\n    }\n  }\n\n  children() {\n    let nodeList = [];\n    for (var i = 0; i < this.nodes.length; i++) {\n      const childNodes = this.nodes[i].children;\n      nodeList = nodeList.concat(Array.from(childNodes));\n    }\n    return new DOMNodeCollection(childNodes);\n  }\n\n  parent() {\n    let nodeList = [];\n    for (var i = 0; i < this.nodes.length; i++) {\n      const parent = this.nodes[i].parentNode;\n      if (!parent.visited){\n        nodeList.push(parent);\n        parent.visited = true;\n      }\n    }\n    for (var i = 0; i < nodeList.length; i++) {\n      nodeList[i].visited = false;\n    }\n    return new DOMNodeCollection(nodeList);\n  }\n\n  find(selector){\n    let nodeList = [];\n    for (var i = 0; i < this.nodes.length; i++) {\n      const selected = this.nodes[i].querySelectorAll(selector);\n      nodeList = nodeList.push(selected);\n    }\n    return new DOMNodeCollection(nodeList);\n  }\n\n  remove(){\n    this.nodes.forEach(node => node.outerHTML = \"\");\n    this.nodes = [];\n  }\n\n  on(eventType, callback){\n    for (var i = 0; i < this.nodes.length; i++) {\n      const node = this.nodes[i];\n      node.addEventListener(eventType, callback);\n      node.listener = callback;\n    }\n  }\n\n  off(eventType){\n    for (var i = 0; i < this.nodes.length; i++) {\n      const node = this.nodes[i];\n      node.removeEventListener(eventType, node.listener);\n      node.listener = null;\n    }\n  }\n}\n\nmodule.exports = DOMNodeCollection;\n\n\n//# sourceURL=webpack:///./src/dom_node_collection.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const DOMNodeCollection = __webpack_require__(/*! ./dom_node_collection */ \"./src/dom_node_collection.js\");\nlet docReady = false;\nconst docCallbacks = [];\n\n$l = (argument) => {\n  switch (typeof argument) {\n    case \"string\":\n      const nodeList = document.querySelectorAll(argument);\n      const nodeArray = Array.from(nodeList);\n      return new DOMNodeCollection(nodeArray);\n    case \"object\":\n      if (argument instanceof HTMLElement){\n        return new DOMNodeCollection([argument]);\n      }\n    case \"function\":\n      if (docReady){\n        argument();\n      }else{\n        docCallbacks.push(argument);\n      }\n  }\n}\n\n$l.extend = (...args) => {\n  let base = args[0];\n  for (var i = 1; i < args.length; i++) {\n    Object.assign(base,args[i]);\n  }\n  return base;\n}\n\n$l.ajax = (options) => {\n  let params = {\n    method: \"GET\",\n    url: \"\",\n    data: {},\n    contentType: 'application/x-www-form-urlencoded; charset=UTF-8',\n    dataType: 'json',\n    success: () => {},\n    error: () => {},\n  };\n\n  if (options){\n    params = $l.extend(params,options);\n  }\n\n  return new Promise((resolve,reject) => {\n    const req = new XMLHttpRequest();\n    req.open(params.method,params.url);\n    req.onload = () => {\n      if (req.status === 200){\n        resolve(JSON.parse(req.response));\n      }else{\n        reject(Error(req.statusText));\n      }\n    }\n    req.send(JSON.stringify(params.data));\n  })\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", function(){\n  docReady = true;\n  docCallbacks.forEach(func => func());\n  getValues(\"USD\",$l(\"input\").value());\n  setup();\n})\n\nconst setup = ()=>{\n  getValues(\"USD\",$l(\"input\").value());\n  $l(\"input\").on(\"change\", ()=>{\n    getValues(\"USD\",$l(\"input\").value());\n  });\n  $l(\"span\").nodes.forEach(span => {\n    $l(span).on(\"click\", (e) => {\n      toggleAll();\n      $l(span).addClass(\"selected\");\n      getValues($l(span).html(),$l(\"input\").value());\n    })\n  })\n}\n\nconst toggleAll = () => {\n  $l(\"span\").nodes.forEach(span => {\n    $l(span).removeClass(\"selected\");\n  })\n}\n\nconst getValues = (currency, value) => {\n  $l.ajax({method: \"GET\",\n    url: `https://api.exchangeratesapi.io/latest?base=${currency}`}).then((response)=>{\n      $l(\"#AUD\").html(\"AUD $ \"+calculatePrice(response.rates.AUD,value));\n      $l(\"#HKD\").html(\"HKD $ \"+calculatePrice(response.rates.HKD,value));\n      $l(\"#USD\").html(\"USD $ \"+calculatePrice(response.rates.USD,value));\n      $l(\"#JPY\").html(\"JPY ¥ \"+calculatePrice(response.rates.JPY,value));\n    })\n}\n\nconst calculatePrice =(price,value) => {\n  return (price*value).toFixed(2).toString();\n}\n\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ })

/******/ });