/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/css/index.less":
/*!****************************!*\
  !*** ./src/css/index.less ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://music-webpack/./src/css/index.less?");

/***/ }),

/***/ "./src/js/audio.js":
/*!*************************!*\
  !*** ./src/js/audio.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass AudioManage{\r\n    constructor(){\r\n        this.audio = new Audio();  //创建一个audio实例\r\n        this.status = 'pause';  //播放状态\r\n    }\r\n    // 加载音乐\r\n    load(src){\r\n        this.audio.src = src;\r\n        this.audio.load();  //加载音乐\r\n    }\r\n    // 播放音乐\r\n    play(){\r\n        this.audio.play();\r\n        this.status = 'play';\r\n    }\r\n    // 暂停播放\r\n    pause(){\r\n        this.audio.pause();\r\n        this.status = 'pause';\r\n    }\r\n    // 音乐播放完成事件\r\n    end(fn){\r\n        this.audio.onended = fn;\r\n    }\r\n    // 跳到音乐的某个时间点\r\n    playTo(time){\r\n        this.audio.currentTime = time;  //单位为秒\r\n    }\r\n}\r\nconst music = new AudioManage();\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (music);\n\n//# sourceURL=webpack://music-webpack/./src/js/audio.js?");

/***/ }),

/***/ "./src/js/gaussBlur.js":
/*!*****************************!*\
  !*** ./src/js/gaussBlur.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n(function (root) {\r\n\tfunction gaussBlur(imgData) {\r\n\t\tvar pixes = imgData.data;\r\n\t\tvar width = imgData.width;\r\n\t\tvar height = imgData.height;\r\n\t\tvar gaussMatrix = [],\r\n\t\t\tgaussSum = 0,\r\n\t\t\tx, y,\r\n\t\t\tr, g, b, a,\r\n\t\t\ti, j, k, len;\r\n\r\n\t\tvar radius = 10;\r\n\t\tvar sigma = 5;\r\n\r\n\t\ta = 1 / (Math.sqrt(2 * Math.PI) * sigma);\r\n\t\tb = -1 / (2 * sigma * sigma);\r\n\t\t//生成高斯矩阵\r\n\t\tfor (i = 0, x = -radius; x <= radius; x++, i++) {\r\n\t\t\tg = a * Math.exp(b * x * x);\r\n\t\t\tgaussMatrix[i] = g;\r\n\t\t\tgaussSum += g;\r\n\r\n\t\t}\r\n\t\t//归一化, 保证高斯矩阵的值在[0,1]之间\r\n\t\tfor (i = 0, len = gaussMatrix.length; i < len; i++) {\r\n\t\t\tgaussMatrix[i] /= gaussSum;\r\n\t\t}\r\n\t\t//x 方向一维高斯运算\r\n\t\tfor (y = 0; y < height; y++) {\r\n\t\t\tfor (x = 0; x < width; x++) {\r\n\t\t\t\tr = g = b = a = 0;\r\n\t\t\t\tgaussSum = 0;\r\n\t\t\t\tfor (j = -radius; j <= radius; j++) {\r\n\t\t\t\t\tk = x + j;\r\n\t\t\t\t\tif (k >= 0 && k < width) {//确保 k 没超出 x 的范围\r\n\t\t\t\t\t\t//r,g,b,a 四个一组\r\n\t\t\t\t\t\ti = (y * width + k) * 4;\r\n\t\t\t\t\t\tr += pixes[i] * gaussMatrix[j + radius];\r\n\t\t\t\t\t\tg += pixes[i + 1] * gaussMatrix[j + radius];\r\n\t\t\t\t\t\tb += pixes[i + 2] * gaussMatrix[j + radius];\r\n\t\t\t\t\t\t// a += pixes[i + 3] * gaussMatrix[j];\r\n\t\t\t\t\t\tgaussSum += gaussMatrix[j + radius];\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\ti = (y * width + x) * 4;\r\n\t\t\t\t// 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题\r\n\t\t\t\t// console.log(gaussSum)\r\n\t\t\t\tpixes[i] = r / gaussSum;\r\n\t\t\t\tpixes[i + 1] = g / gaussSum;\r\n\t\t\t\tpixes[i + 2] = b / gaussSum;\r\n\t\t\t\t// pixes[i + 3] = a ;\r\n\t\t\t}\r\n\t\t}\r\n\t\t//y 方向一维高斯运算\r\n\t\tfor (x = 0; x < width; x++) {\r\n\t\t\tfor (y = 0; y < height; y++) {\r\n\t\t\t\tr = g = b = a = 0;\r\n\t\t\t\tgaussSum = 0;\r\n\t\t\t\tfor (j = -radius; j <= radius; j++) {\r\n\t\t\t\t\tk = y + j;\r\n\t\t\t\t\tif (k >= 0 && k < height) {//确保 k 没超出 y 的范围\r\n\t\t\t\t\t\ti = (k * width + x) * 4;\r\n\t\t\t\t\t\tr += pixes[i] * gaussMatrix[j + radius];\r\n\t\t\t\t\t\tg += pixes[i + 1] * gaussMatrix[j + radius];\r\n\t\t\t\t\t\tb += pixes[i + 2] * gaussMatrix[j + radius];\r\n\t\t\t\t\t\t// a += pixes[i + 3] * gaussMatrix[j];\r\n\t\t\t\t\t\tgaussSum += gaussMatrix[j + radius];\r\n\t\t\t\t\t}\r\n\t\t\t\t}\r\n\t\t\t\ti = (y * width + x) * 4;\r\n\t\t\t\tpixes[i] = r / gaussSum;\r\n\t\t\t\tpixes[i + 1] = g / gaussSum;\r\n\t\t\t\tpixes[i + 2] = b / gaussSum;\r\n\t\t\t}\r\n\t\t}\r\n\t\t//end\r\n\t\treturn imgData;\r\n\t}\r\n\r\n\t//1、增加了第二个参数\r\n\tfunction blurImg(src, ele) {\r\n\t\tvar canvas = document.createElement('canvas');\r\n\t\tele=ele||document.body;\r\n\t\t\r\n\t\t//2、这两个值越小，图片就会越模糊\r\n\t\tcanvas.width=100;\r\n\t\tcanvas.height=100;\r\n\r\n\t\tvar context = canvas.getContext('2d');\r\n\r\n\t\t//3、把img对象放到了这里\r\n\t\tvar img = new Image();\r\n\t\timg.src = src;\r\n\t\timg.onload = function () {\r\n\t\t\tcontext.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);\r\n\t\t\tvar imgData=context.getImageData(0, 0, canvas.width, canvas.height);\r\n\t\t\tvar gaussData=gaussBlur(imgData);\r\n\t\t\tcontext.putImageData(gaussData, 0, 0);\r\n\t\t\tvar imgSrc = canvas.toDataURL();\r\n\r\n\t\t\tele.style.backgroundImage='url('+imgSrc+')';\r\n\t\t}\r\n\t}\r\n\t\r\n\r\n\troot.blurImg = blurImg;\r\n\t\r\n})(window.player || (window.player = {}));\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (window.player.blurImg);\n\n//# sourceURL=webpack://music-webpack/./src/js/gaussBlur.js?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_index_less__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/index.less */ \"./src/css/index.less\");\n/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./render.js */ \"./src/js/render.js\");\n/* harmony import */ var _audio_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./audio.js */ \"./src/js/audio.js\");\n/* harmony import */ var _indexControl_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./indexControl.js */ \"./src/js/indexControl.js\");\n/* harmony import */ var _listControl_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./listControl.js */ \"./src/js/listControl.js\");\n/* harmony import */ var _progress_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./progress.js */ \"./src/js/progress.js\");\n\r\n\r\n\r\n\r\n\r\n\r\n\r\nclass MusicPlayer {\r\n    constructor(dom) {\r\n        this.wrap = dom;         //容器\r\n        this.dataList = [];      //请求到的数据\r\n        // this.now = 0;            //现在播放的歌曲的索引\r\n        this.indexObj = null;\r\n        this.rotateTimer = null; //图片旋转的定时器\r\n        this.deg = 0;            //图片旋转的角度\r\n        this.curIndex = null;    //当前播放歌曲的索引值\r\n    }\r\n    init() {\r\n        this.getDom();\r\n        this.getdata('./mock/data.json');\r\n    }\r\n    // 获取dom元素\r\n    getDom() {\r\n        this.recond = document.querySelector('.songImg img');   //歌曲图片\r\n        this.controlBtns = document.querySelectorAll('.control li');    //按钮组\r\n    }\r\n    // 获取渲染数据\r\n    async getdata(url) {\r\n        this.dataList = await fetch(url).then(resp => resp.json());\r\n        this.listPlay();\r\n        this.indexObj = new _indexControl_js__WEBPACK_IMPORTED_MODULE_3__.default(this.dataList.length);\r\n\r\n        // this.loadMusic(this.now);\r\n        this.loadMusic(this.indexObj.index);\r\n        this.musicControl();\r\n        this.proDrag()\r\n    }\r\n    // 加载音乐\r\n    loadMusic(index) {\r\n        (0,_render_js__WEBPACK_IMPORTED_MODULE_1__.default)(this.dataList[index]);\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.load(this.dataList[index].audioSrc);\r\n        _progress_js__WEBPACK_IMPORTED_MODULE_5__.default.pro.init(index);\r\n\r\n        if (_audio_js__WEBPACK_IMPORTED_MODULE_2__.default.status === 'play') {\r\n            _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.play();\r\n            this.controlBtns[2].className = 'playing';\r\n            this.imgRotate(this.deg); //旋转图片\r\n\r\n            _progress_js__WEBPACK_IMPORTED_MODULE_5__.default.pro.proPlay();\r\n        }\r\n\r\n        this.list.changeSelect(index);  //把歌曲列表的选中歌曲 和 现在加载的歌曲统一\r\n\r\n        this.curIndex = index;      //存储 当前加载的歌曲的对应索引值\r\n        // 当音乐播放完成要切歌\r\n        _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.end(() => {\r\n            this.loadMusic(this.indexObj.next());\r\n        })\r\n    }\r\n    // 控制音乐\r\n    musicControl() {\r\n        // 上一首\r\n        this.controlBtns[1].addEventListener('touchend', () => {\r\n            _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.status = 'play';\r\n            // this.now--;\r\n            // this.loadMusic(this.now);  \r\n            this.loadMusic(this.indexObj.prev());   //加载上一首歌曲\r\n            this.deg = 0;   //切歌后，图片的旋转角度要变成0\r\n\r\n\r\n        })\r\n        // 播放/暂停\r\n        this.controlBtns[2].addEventListener('touchend', () => {\r\n            if (_audio_js__WEBPACK_IMPORTED_MODULE_2__.default.status === 'play') {\r\n                _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.pause();\r\n                this.controlBtns[2].className = '';\r\n                this.imgStop();\r\n                _progress_js__WEBPACK_IMPORTED_MODULE_5__.default.pro.proStop();//进度条定时器关闭\r\n            } else {\r\n                _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.play();\r\n                this.controlBtns[2].className = 'playing';\r\n                this.imgRotate(this.deg)\r\n                _progress_js__WEBPACK_IMPORTED_MODULE_5__.default.pro.proPlay();//进度条定时器开启\r\n            }\r\n        })\r\n        // 下一首\r\n        this.controlBtns[3].addEventListener('touchend', () => {\r\n            _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.status = 'play';\r\n            // this.now++;\r\n            // this.loadMusic(this.now);\r\n            this.loadMusic(this.indexObj.next());       //加载下一首歌曲\r\n            this.deg = 0;   //切歌后，图片的旋转角度要变成0\r\n\r\n        })\r\n    }\r\n    // 旋转图片\r\n    imgRotate(deg) {\r\n        clearInterval(this.rotateTimer);\r\n\r\n        this.rotateTimer = setInterval(() => {\r\n            deg = +this.deg + 0.2;\r\n            this.recond.style.transform = `rotate(${deg}deg)`;  //图片旋转\r\n            this.deg = deg; //把上一次旋转的角度存起来，方便暂停后再次播放时能获取到上一次的旋转角度\r\n        }, 1000 / 60);\r\n    }\r\n    // 停止旋转图片\r\n    imgStop() {\r\n        clearInterval(this.rotateTimer);\r\n    }\r\n    // 列表切歌\r\n    listPlay() {\r\n        this.list = (0,_listControl_js__WEBPACK_IMPORTED_MODULE_4__.default)(this.dataList, this.wrap);\r\n\r\n        // 列表按钮点击事件\r\n        this.controlBtns[4].addEventListener('touchend', () => {\r\n            this.list.slideUp();\r\n        })\r\n        // 列表关闭按钮点击事件\r\n        document.querySelector('.close').addEventListener('touchend', () => {\r\n            this.list.slideDown();\r\n        })\r\n        // 列表歌曲注册事件\r\n        this.list.musicList.forEach((item, index) => {\r\n            item.addEventListener('touchend', () => {\r\n                if (this.curIndex == index) {\r\n                    return;\r\n                }\r\n                _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.status = 'play';\r\n                this.indexObj.index = index;\r\n                this.loadMusic(index);\r\n                this.list.slideDown();\r\n            })\r\n        })\r\n    }\r\n    // 进度条拖拽\r\n    proDrag() {\r\n        const circle = _progress_js__WEBPACK_IMPORTED_MODULE_5__.default.drag(document.querySelector('.circle'));\r\n        circle.init();\r\n\r\n        // 拖拽按下\r\n        circle.start = (pre) => {\r\n\r\n        };\r\n\r\n        // 拖拽中\r\n        circle.move = (pre) => {\r\n            _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.pause();\r\n            this.controlBtns[2].className = '';\r\n            this.imgStop();\r\n            _progress_js__WEBPACK_IMPORTED_MODULE_5__.default.pro.proStop();//进度条定时器关闭\r\n        };\r\n\r\n        // 拖拽结束\r\n        circle.end = (pre) => {\r\n            _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.audio.currentTime = _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.audio.duration * pre;\r\n            _audio_js__WEBPACK_IMPORTED_MODULE_2__.default.play();\r\n            this.controlBtns[2].className = 'playing';\r\n            this.imgRotate(this.deg)\r\n            _progress_js__WEBPACK_IMPORTED_MODULE_5__.default.pro.proPlay();//进度条定时器开启\r\n        }\r\n    }\r\n\r\n}\r\nconst musicPlayer = new MusicPlayer(document.querySelector('#wrap'));\r\nmusicPlayer.init();\n\n//# sourceURL=webpack://music-webpack/./src/js/index.js?");

/***/ }),

/***/ "./src/js/indexControl.js":
/*!********************************!*\
  !*** ./src/js/indexControl.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nclass Index {\r\n    constructor(len) {\r\n        this.index = 0;\r\n        this.len = len;\r\n    }\r\n\r\n    // 上一首\r\n    prev() {\r\n        return this.get(-1);\r\n    }\r\n    // 下一首\r\n    next() {\r\n        return this.get(1);\r\n    }\r\n    // 获取index\r\n    get(val) {\r\n        this.index = (this.index + val + this.len) % this.len;\r\n        return this.index;\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Index);\n\n//# sourceURL=webpack://music-webpack/./src/js/indexControl.js?");

/***/ }),

/***/ "./src/js/listControl.js":
/*!*******************************!*\
  !*** ./src/js/listControl.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _audio__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio */ \"./src/js/audio.js\");\n\r\n\r\nfunction listControl (data,wrap) {\r\n    let list = document.createElement('div'),\r\n        dl = document.createElement('dl'),\r\n        dt = document.createElement('dt'),\r\n        close = document.createElement('div'),\r\n        musicList = [];\r\n    \r\n    list.className = 'list';\r\n    dt.innerHTML = '播放列表';\r\n    close.className = 'close';\r\n    close.innerHTML = '关闭';\r\n    dl.appendChild(dt);\r\n\r\n    data.forEach((item,index) =>{\r\n        let dd = document.createElement('dd');\r\n        dd.innerHTML = `${item.name}`;\r\n\r\n        dd.addEventListener('touchend',()=>{\r\n            changeSelect(index);\r\n        })\r\n\r\n        dl.appendChild(dd);\r\n        musicList.push(dd);\r\n    })\r\n    list.appendChild(dl);\r\n    list.appendChild(close);\r\n    wrap.appendChild(list);\r\n\r\n    changeSelect(0);    //默认让第一首歌成为选中状态\r\n\r\n    const disY = list.offsetHeight;\r\n    list.style.transform = `translateY(${disY}px)`;\r\n    // 滑出\r\n    function slideUp(){\r\n        list.style.transition = '.3s';\r\n        list.style.transform = `translateY(0px)`;\r\n    }\r\n    // 隐藏\r\n    function slideDown(){\r\n        list.style.transition = '.3s';\r\n        list.style.transform = `translateY(${disY}px)`;\r\n    }\r\n    // 切换选中的元素\r\n    function changeSelect(index){\r\n        for(let i = 0; i < musicList.length; i++){\r\n            musicList[i].className = '';\r\n        }\r\n        musicList[index].className = 'active';\r\n    }\r\n    return {\r\n        musicList,\r\n        slideUp,\r\n        slideDown,\r\n        changeSelect\r\n    }\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (listControl);\n\n//# sourceURL=webpack://music-webpack/./src/js/listControl.js?");

/***/ }),

/***/ "./src/js/progress.js":
/*!****************************!*\
  !*** ./src/js/progress.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _audio_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./audio.js */ \"./src/js/audio.js\");\n\r\nclass Progress {\r\n    constructor() {\r\n        this.timer = null;//定时器\r\n        this.duration = 0;//总时长\r\n        this.width = 0;//进度条播放的长度\r\n\r\n        this.getDom();// 获取进度条相关元素\r\n        this.init(0);\r\n    }\r\n    // 获取进度条相关元素\r\n    getDom() {\r\n        this.curTime = document.querySelector('.curTime');\r\n        this.totalTime = document.querySelector('.totalTime');\r\n        this.drag = document.querySelector('.drag');\r\n        this.circle = document.querySelector('.circle');\r\n        this.front = document.querySelector('.frontBg');\r\n        this.backBg = document.querySelector('.backBg');\r\n    }\r\n    // 换算时间\r\n    getTime(time) {  //time单位为秒\r\n        let m = Math.floor(time / 60);\r\n        let s = Math.round(time % 60);\r\n        m = m < 10 ? '0' + m : m;\r\n        s = s < 10 ? '0' + s : s;\r\n        return `${m}:${s}`;\r\n    }\r\n    // 进度条初始化\r\n    async init(index) {\r\n        const data = await fetch('./mock/data.json').then(resp => resp.json());\r\n        this.duration = data[index].duration;\r\n        this.curTime.innerHTML = this.getTime(0);\r\n        this.totalTime.innerHTML = this.getTime(this.duration)\r\n        this.circle.style.transform = 'translateX(0)';\r\n        this.front.style.width = 0 + 'px';\r\n    }\r\n    // 开始播放\r\n    proPlay() {\r\n        clearInterval(this.timer);\r\n        this.curTime.innerHTML = this.getTime(_audio_js__WEBPACK_IMPORTED_MODULE_0__.default.audio.currentTime);\r\n        this.timer = setInterval(() => {\r\n            // music.audio.currentTime 有误差 0.93 所以要用round 向上取整\r\n            this.curTime.innerHTML = this.getTime(_audio_js__WEBPACK_IMPORTED_MODULE_0__.default.audio.currentTime);\r\n\r\n            this.width = Math.round(_audio_js__WEBPACK_IMPORTED_MODULE_0__.default.audio.currentTime) / this.duration * this.drag.clientWidth;\r\n\r\n            this.circle.style.transform = `translateX(${this.width}px)`;\r\n            this.front.style.width = Math.round(_audio_js__WEBPACK_IMPORTED_MODULE_0__.default.audio.currentTime) / this.duration * 100 + '%';\r\n        }, 1000);\r\n    }\r\n    // 停止播放\r\n    proStop() {\r\n        clearInterval(this.timer);\r\n    }\r\n}\r\nclass Drag {\r\n    // 拖拽\r\n    constructor(obj) {\r\n        this.obj = obj; //要拖拽的元素\r\n        this.startPointX = 0; //拖拽按下时的位置\r\n        this.startLeft = 0; //按下时已经走的距离\r\n        this.percent = 0; //拖拽的百分比\r\n        this.init();\r\n    }\r\n   \r\n\r\n    init(){\r\n        // 拖拽按下\r\n        this.obj.addEventListener('touchstart',(e) =>{\r\n            // changedTouches 触发当前事件的手指列表\r\n            this.startPointX = e.changedTouches[0].pageX;   //拖拽按下时的位置\r\n            this.startLeft = parseFloat(this.obj.style.transform.split('(')[1]);    //按下时元素离左边的距离\r\n\r\n            this.start && this.start();\r\n        })\r\n        // 开始拖拽\r\n        this.obj.addEventListener('touchmove',(e) =>{\r\n            this.disPointX = e.changedTouches[0].pageX - this.startPointX; //拖动的距离\r\n            \r\n            let l = this.disPointX + this.startLeft; //小圆点要走的距离\r\n            if(l < 0){\r\n                l = 0;\r\n            }else if(l > this.obj.offsetParent.offsetWidth){\r\n                l = this.obj.offsetParent.offsetWidth;\r\n            }\r\n\r\n            this.obj.style.transform = `translateX(${l}px)`;\r\n            document.querySelector('.frontBg').style.width = l + 'px';\r\n            // 计算百分比\r\n            this.percent = l / this.obj.offsetParent.offsetWidth;\r\n            this.end && this.move(this.percent);\r\n            e.preventDefault();\r\n        })\r\n        // 拖拽结束\r\n        this.obj.addEventListener('touchend',(e) =>{\r\n            this.end && this.end(this.percent);\r\n        })\r\n    }\r\n\r\n}\r\nfunction getDrag(obj) {\r\n    return new Drag(obj)\r\n}\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({\r\n    pro: new Progress(),\r\n    drag: getDrag\r\n});\n\n//# sourceURL=webpack://music-webpack/./src/js/progress.js?");

/***/ }),

/***/ "./src/js/render.js":
/*!**************************!*\
  !*** ./src/js/render.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ render)\n/* harmony export */ });\n/* harmony import */ var _gaussBlur_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gaussBlur.js */ \"./src/js/gaussBlur.js\");\n\r\n// 渲染图片\r\nfunction renderImg(src){\r\n    (0,_gaussBlur_js__WEBPACK_IMPORTED_MODULE_0__.default)(src);\r\n    const img = document.querySelector('.songImg img');\r\n    img.src = src;\r\n}\r\n// 渲染歌曲信息\r\nfunction renderInof(info){\r\n    const singer = document.querySelector('.singer');\r\n    const name = document.querySelector('.name');\r\n    const album = document.querySelector('.album');\r\n    singer.innerHTML = info.singer;\r\n    name.innerHTML = info.name;\r\n    album.innerHTML = info.album;\r\n}\r\n// 渲染是否喜欢\r\nfunction renderIslike(isLike){\r\n    const lis = document.querySelectorAll('.control li');\r\n    lis[0].className = isLike ? 'liking':'';\r\n}\r\nfunction render(data){\r\n    renderImg(data.image);\r\n    renderInof(data);\r\n    renderIslike(data.isLike);\r\n}\r\n\n\n//# sourceURL=webpack://music-webpack/./src/js/render.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/js/index.js");
/******/ 	
/******/ })()
;