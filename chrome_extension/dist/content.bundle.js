/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/pilotSite/select.js":
/*!*********************************!*\
  !*** ./src/pilotSite/select.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   selectors: () => (/* binding */ selectors),
/* harmony export */   setField: () => (/* binding */ setField)
/* harmony export */ });
/* harmony import */ var _selectorScraping_scrape__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../selectorScraping/scrape */ "./src/selectorScraping/scrape.js");


const selectors = {
  options: {
    itemCategory: `#trade > div.top > div > div.search-bar.search-advanced > div > div.search-advanced-pane.blue > div:nth-child(1) > div.filter-group-body > div:nth-child(1) > span > div.multiselect.filter-select.modified > div.multiselect__content-wrapper > ul > li > span > span`,
  },
  inputsContainer: {
    minMaxSelectors: {
      min: `span > input[placeholder='min']`,
      max: `span > input[placeholder='max']`
    },
    containers: `.filter.filter-property`,
    containersIndexMapping: (0,_selectorScraping_scrape__WEBPACK_IMPORTED_MODULE_0__.getMapOfFields)(),
  }
}

const getMinMaxFields = (inputContainer) => {
  const { min, max } = selectors.inputsContainer.minMaxSelectors;
  const minField = inputContainer.querySelector(min);
  const maxField = inputContainer.querySelector(max);
  return {
    minField,
    maxField
  }
}

function setInput(inputElement, desiredValue) {
  inputElement.value = desiredValue; // Change the value
  inputElement.dispatchEvent(new Event('change')); // Trigger the change event
}

const setField = (fieldName, value) => {
  const inputContainerSelectors = selectors.inputsContainer.containers;
  const inputContainers = document.querySelectorAll(inputContainerSelectors);
  const indexOfTarget = selectors.inputsContainer.containersIndexMapping[fieldName];
  const targetInputContainer = inputContainers[indexOfTarget];

  const { minField, maxField } = getMinMaxFields(targetInputContainer);
  console.log(minField, fieldName, value)
  setInput(minField, value);
}


/***/ }),

/***/ "./src/selectorScraping/scrape.js":
/*!****************************************!*\
  !*** ./src/selectorScraping/scrape.js ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   getMapOfFields: () => (/* binding */ getMapOfFields)
/* harmony export */ });
function getAllFields() {
  var selector = `.filter.filter-property`;
  return document.querySelectorAll(selector);
}

function getTitle(element) { 
  var name = element.querySelector(`span > div.filter-title`).innerText;
  var nameNoFluff = name.trim();
  return nameNoFluff;
};

function getMapOfFields() {
  var elesRaw = getAllFields();
  var elesIndexWithName = [...elesRaw].map((ele, i) => [getTitle(ele), i]);
  var map = {};
  elesIndexWithName.forEach(([name, index]) => map[name] = index);
  return map;
}


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
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!************************!*\
  !*** ./src/content.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pilotSite_select__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pilotSite/select */ "./src/pilotSite/select.js");


// On website.
console.log("Content script injected!"); 

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "SEARCH") {
    console.log("Received message:", message.payload);
    (0,_pilotSite_select__WEBPACK_IMPORTED_MODULE_0__.setField)("Armour", 10);
    sendResponse({ reply: "Hello from content script!" });
  }
});



})();

/******/ })()
;
//# sourceMappingURL=content.bundle.js.map