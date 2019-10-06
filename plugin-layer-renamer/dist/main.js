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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/main.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const nameConvertRule = [
    { target: "アセット", expected: "asset" },
    { target: "シェイプ", expected: "shape" },
    { target: "シンボル", expected: "symbol" },
    { target: "レイヤー", expected: "layer" },
    { target: "グループ化", expected: "group" },
    { target: "グループ", expected: "group" },
    { target: "フォント", expected: "font" },
    { target: "グラフィック", expected: "graphic" },
    { target: "ビデオ", expected: "video" },
    { target: "フォルダー", expected: "folder" },
    { target: "トゥイーン", expected: "tween" },
    { target: "名称未設定", expected: "untitled" },
    { target: "長方形", expected: "rectangle" },
    { target: "楕円形", expected: "ellipse" },
    { target: "線", expected: "line" },
    { target: "リピートグリッド", expected: "RepeatGrid" },
    { target: "アートボード", expected: "ArtBoard" },
    { target: "パス", expected: "path" },
    { target: "画像", expected: "image" }
];
/**
 * 日本語から英語に変更します。
 */
function convertJpToEn(jp) {
    let name = jp;
    nameConvertRule.forEach(item => {
        name = name.split(item.target).join(item.expected);
    });
    name = name
        .split("　")
        .join(" ")
        .split(" ")
        .join("_");
    return name;
}
/**
 * ノードの子の名前を変更する。
 * @param {SceneNode} node
 */
function renameChildren(node) {
    // console.log("node.children:" + node.children);
    node.children.forEach((childNode, i) => {
        // 孫の名前の変更は出来ないので、再帰はしない
        // renameChildren(childNode);
        // 名前を変更する
        const name = convertJpToEn(childNode.name);
        childNode.name = name;
    });
}
/**
 * 選択されているファイルをリネームする。
 */
function renameSelection(selection) {
    selection.items.forEach((childNode, i) => {
        // console.log("node :" + i, name);
        // 現状、ルート以外で、以下の関数を実行するとエラーが表示される
        // 「Plugin Error: Plugin made a change outside the current edit context
        // https://adobexdplatform.com/plugin-docs/reference/core/edit-context.html
        renameChildren(childNode);
        // 選択しているノードの名前を変更する
        const name = convertJpToEn(childNode.name);
        childNode.name = name;
    });
}
// メニューとして出力する
module.exports = {
    commands: {
        // コマンドが押されたらこの関数を呼び出す
        menuCommand: selection => {
            renameSelection(selection);
        }
    }
};


/***/ })

/******/ });