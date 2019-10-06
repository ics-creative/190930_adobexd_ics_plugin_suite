module.exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/commnads/commandTree.ts":
/*!*************************************!*\
  !*** ./src/commnads/commandTree.ts ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const createTree_1 = __webpack_require__(/*! ./createTree */ "./src/commnads/createTree.ts");
const drawLines_1 = __webpack_require__(/*! ./drawLines */ "./src/commnads/drawLines.ts");
const lineData = createTree_1.default();
function commandTree(selection) {
    drawLines_1.default(selection, lineData);
}
exports.default = commandTree;


/***/ }),

/***/ "./src/commnads/commandTriangle.ts":
/*!*****************************************!*\
  !*** ./src/commnads/commandTriangle.ts ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const createTriangle_1 = __webpack_require__(/*! ./createTriangle */ "./src/commnads/createTriangle.ts");
const drawLines_1 = __webpack_require__(/*! ./drawLines */ "./src/commnads/drawLines.ts");
// import Vue from "vue";
// import Dialog from "./Dialog.vue";
/**
 * ダイアログを呼び出す
 */
// function createDialog(): HTMLDialogElement {
//   document.body.innerHTML = `<dialog><div class="container"></div></dialog>`;
//   const dialog = document.querySelector("dialog");
//   const container = document.querySelector(".container");
//   new Vue({
//     el: container,
//     components: { Dialog },
//     render(h) {
//       return h(Dialog, { props: { dialog, results: [] } });
//     }
//   });
//   return dialog;
// }
const lineData = createTriangle_1.default();
function commandTriangle(selection) {
    // createDialog().showModal();
    drawLines_1.default(selection, lineData);
}
exports.default = commandTriangle;


/***/ }),

/***/ "./src/commnads/createTree.ts":
/*!************************************!*\
  !*** ./src/commnads/createTree.ts ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const LENGTH_MULTIPLY = 0.8;
const DEGREE_BRANCH = 45;
function createTree() {
    const lines = [];
    // フラクタルの木を描く
    drawTree(0, 0, 400, 270, 10);
    // 枝を描く
    function drawTree(x1, // 始点のX座標
    y1, // 始点のY座標
    leng, // 枝の長さ
    angle, // 枝の伸びる方向(角度)
    level) {
        // 再帰レベル
        // 次の枝の座標を算出
        const x2 = leng * Math.cos((angle * Math.PI) / 180) + x1;
        const y2 = leng * Math.sin((angle * Math.PI) / 180) + y1;
        // 線の種類を設定
        // 枝を結ぶ
        lines.push({
            startX: x1,
            startY: y1,
            endX: x2,
            endY: y2,
            color: 0xFF0000
        });
        // 細分化
        if (level > 0) {
            // 細分化レベルを更新
            level = level - 1;
            // 次の枝を描く
            drawTree(x2, y2, leng * LENGTH_MULTIPLY, angle + DEGREE_BRANCH, level);
            drawTree(x2, y2, leng * LENGTH_MULTIPLY, angle - DEGREE_BRANCH, level);
        }
    }
    return lines;
}
exports.default = createTree;


/***/ }),

/***/ "./src/commnads/createTriangle.ts":
/*!****************************************!*\
  !*** ./src/commnads/createTriangle.ts ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function createTriangle() {
    // ステージを作成
    // 正三角形の一辺の大きさを指定
    const SIZE = 600;
    // 正三角形の高さを求める
    const HEIGHT = SIZE * Math.sin((60 * Math.PI) / 180);
    const lines = [];
    // フラクタルの三角形を描く
    drawTriangle(6, 0, HEIGHT, SIZE / 2, 0, SIZE, HEIGHT);
    // 三角形を描く関数
    function drawTriangle(level, x1, y1, x2, y2, x3, y3) {
        // 再帰レベルが0になったら描く
        if (level <= 0) {
            // 三角形を描く
            lines.push({
                startX: x1,
                startY: y1,
                endX: x2,
                endY: y2,
                color: 0xff0000
            });
            lines.push({
                startX: x2,
                startY: y2,
                endX: x3,
                endY: y3,
                color: 0xff0000
            });
        }
        else {
            // 再帰レベルが 0 になるまで細分化を行う
            // 正三角形の3辺の中点を求める
            // 1辺目の中点
            const nx1 = (x1 + x2) / 2;
            const ny1 = (y1 + y2) / 2;
            // 2辺目の中点
            const nx2 = (x2 + x3) / 2;
            const ny2 = (y2 + y3) / 2;
            // 3辺目の中点
            const nx3 = (x3 + x1) / 2;
            const ny3 = (y3 + y1) / 2;
            // 再帰レベルを更新
            level = level - 1;
            // 中点を元に細分化を行う
            drawTriangle(level, x1, y1, nx1, ny1, nx3, ny3);
            drawTriangle(level, x2, y2, nx1, ny1, nx2, ny2);
            drawTriangle(level, x3, y3, nx2, ny2, nx3, ny3);
        }
    }
    return lines;
}
exports.default = createTriangle;


/***/ }),

/***/ "./src/commnads/drawLines.ts":
/*!***********************************!*\
  !*** ./src/commnads/drawLines.ts ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const scenegraph_1 = __webpack_require__(/*! scenegraph */ "scenegraph");
const commands = __webpack_require__(/*! commands */ "commands");
function drawLines(selection, lineData) {
    // [1]
    const lines = []; // [2]
    lineData.forEach(data => {
        // [3]
        const line = new scenegraph_1.Line(); // [4.i]
        line.setStartEnd(
        // [4.ii]
        data.startX, data.startY, data.endX, data.endY);
        line.strokeEnabled = true; // [4.iii]
        line.stroke = new scenegraph_1.Color("#FF0000"); // [4.iv]
        line.strokeWidth = 3; // [4.v]
        line.strokeEndCaps = scenegraph_1.GraphicNode.STROKE_CAP_ROUND; // [4.v]
        lines.push(line); // [4.vi]
        selection.editContext.addChild(line); // [4.vii]
    });
    selection.items = lines; // [5]
    commands.group(); // [6]
}
exports.default = drawLines;


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const commandTriangle_1 = __webpack_require__(/*! ./commnads/commandTriangle */ "./src/commnads/commandTriangle.ts");
const commandTree_1 = __webpack_require__(/*! ./commnads/commandTree */ "./src/commnads/commandTree.ts");
// メニューとして出力する
module.exports = {
    commands: {
        commandTriangle: commandTriangle_1.default,
        commandTree: commandTree_1.default
    }
};


/***/ }),

/***/ "commands":
/*!***************************!*\
  !*** external "commands" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("commands");

/***/ }),

/***/ "scenegraph":
/*!*****************************!*\
  !*** external "scenegraph" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("scenegraph");

/***/ })

/******/ });