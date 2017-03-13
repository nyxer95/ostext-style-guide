/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*
	 OpenStax Style Guide
	*/
	'use strict';

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _riot = __webpack_require__(1);

	var _riot2 = _interopRequireDefault(_riot);

	__webpack_require__(2);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var AbstractDataModel = function () {
	  function AbstractDataModel(request) {
	    var _this = this;

	    _classCallCheck(this, AbstractDataModel);

	    _riot2.default.observable(this);

	    // This request is made asynchronously in the <head>
	    // of the main html chunk in order to load JSON data quickly.
	    json_request.then(function (data, xhr) {
	      _this.setModelData(data);
	    }, // success
	    function (data, xhr) {
	      console.error(data, xhr.status);
	    }); // error
	  }

	  _createClass(AbstractDataModel, [{
	    key: 'setModelData',
	    value: function setModelData(data) {
	      this.data = data.sort(function (a, b) {
	        var va = a['name'].split(',')[0].split('.');
	        var vb = b['name'].split(',')[0].split('.');
	        for (var i = 0; i < va.length; ++i) {
	          va[i] = Number(va[i]);
	        }
	        for (var i = 0; i < vb.length; ++i) {
	          vb[i] = Number(vb[i]);
	        }
	        if (va[0] > vb[0]) return 1;
	        if (va[0] < vb[0]) return -1;
	        if (va[1] > vb[1]) return 1;
	        if (va[1] < vb[1]) return -1;
	        if (va[2] > vb[2]) return 1;
	        if (va[2] < vb[2]) return -1;

	        return 0;
	      });
	      this.trigger('updated', data);
	    }
	  }, {
	    key: 'setItem',
	    value: function setItem(idx, val) {
	      this.data[idx] = val;
	    }
	  }, {
	    key: 'getItem',
	    value: function getItem(idx) {
	      return this.data[idx];
	    }
	  }]);

	  return AbstractDataModel;
	}();

	var StyleGuideApp = function StyleGuideApp() {
	  _classCallCheck(this, StyleGuideApp);

	  _riot2.default.observable(this);

	  this.model = new AbstractDataModel(json_request); // json_request is global.
	};

	var app = new StyleGuideApp();

	// Clean this up.
	window.riot = _riot2.default;
	window.app = app;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* Riot v3.3.2, @license MIT */
	(function (global, factory) {
		 true ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.riot = global.riot || {})));
	}(this, (function (exports) { 'use strict';

	var __TAGS_CACHE = [];
	var __TAG_IMPL = {};
	var GLOBAL_MIXIN = '__global_mixin';
	var ATTRS_PREFIX = 'riot-';
	var REF_DIRECTIVES = ['ref', 'data-ref'];
	var IS_DIRECTIVE = 'data-is';
	var CONDITIONAL_DIRECTIVE = 'if';
	var LOOP_DIRECTIVE = 'each';
	var LOOP_NO_REORDER_DIRECTIVE = 'no-reorder';
	var SHOW_DIRECTIVE = 'show';
	var HIDE_DIRECTIVE = 'hide';
	var T_STRING = 'string';
	var T_OBJECT = 'object';
	var T_UNDEF  = 'undefined';
	var T_FUNCTION = 'function';
	var XLINK_NS = 'http://www.w3.org/1999/xlink';
	var XLINK_REGEX = /^xlink:(\w+)/;
	var WIN = typeof window === T_UNDEF ? undefined : window;
	var RE_SPECIAL_TAGS = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?|opt(?:ion|group))$/;
	var RE_SPECIAL_TAGS_NO_OPTION = /^(?:t(?:body|head|foot|[rhd])|caption|col(?:group)?)$/;
	var RE_RESERVED_NAMES = /^(?:_(?:item|id|parent)|update|root|(?:un)?mount|mixin|is(?:Mounted|Loop)|tags|refs|parent|opts|trigger|o(?:n|ff|ne))$/;
	var RE_HTML_ATTRS = /([-\w]+) ?= ?(?:"([^"]*)|'([^']*)|({[^}]*}))/g;
	var CASE_SENSITIVE_ATTRIBUTES = { 'viewbox': 'viewBox' };
	var RE_BOOL_ATTRS = /^(?:disabled|checked|readonly|required|allowfullscreen|auto(?:focus|play)|compact|controls|default|formnovalidate|hidden|ismap|itemscope|loop|multiple|muted|no(?:resize|shade|validate|wrap)?|open|reversed|seamless|selected|sortable|truespeed|typemustmatch)$/;
	var IE_VERSION = (WIN && WIN.document || {}).documentMode | 0;

	/**
	 * Check Check if the passed argument is undefined
	 * @param   { String } value -
	 * @returns { Boolean } -
	 */
	function isBoolAttr(value) {
	  return RE_BOOL_ATTRS.test(value)
	}

	/**
	 * Check if passed argument is a function
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isFunction(value) {
	  return typeof value === T_FUNCTION
	}

	/**
	 * Check if passed argument is an object, exclude null
	 * NOTE: use isObject(x) && !isArray(x) to excludes arrays.
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isObject(value) {
	  return value && typeof value === T_OBJECT // typeof null is 'object'
	}

	/**
	 * Check if passed argument is undefined
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isUndefined(value) {
	  return typeof value === T_UNDEF
	}

	/**
	 * Check if passed argument is a string
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isString(value) {
	  return typeof value === T_STRING
	}

	/**
	 * Check if passed argument is empty. Different from falsy, because we dont consider 0 or false to be blank
	 * @param { * } value -
	 * @returns { Boolean } -
	 */
	function isBlank(value) {
	  return isUndefined(value) || value === null || value === ''
	}

	/**
	 * Check if passed argument is a kind of array
	 * @param   { * } value -
	 * @returns { Boolean } -
	 */
	function isArray(value) {
	  return Array.isArray(value) || value instanceof Array
	}

	/**
	 * Check whether object's property could be overridden
	 * @param   { Object }  obj - source object
	 * @param   { String }  key - object property
	 * @returns { Boolean } -
	 */
	function isWritable(obj, key) {
	  var descriptor = Object.getOwnPropertyDescriptor(obj, key);
	  return isUndefined(obj[key]) || descriptor && descriptor.writable
	}

	/**
	 * Check if passed argument is a reserved name
	 * @param   { String } value -
	 * @returns { Boolean } -
	 */
	function isReservedName(value) {
	  return RE_RESERVED_NAMES.test(value)
	}

	var check = Object.freeze({
		isBoolAttr: isBoolAttr,
		isFunction: isFunction,
		isObject: isObject,
		isUndefined: isUndefined,
		isString: isString,
		isBlank: isBlank,
		isArray: isArray,
		isWritable: isWritable,
		isReservedName: isReservedName
	});

	/**
	 * Shorter and fast way to select multiple nodes in the DOM
	 * @param   { String } selector - DOM selector
	 * @param   { Object } ctx - DOM node where the targets of our search will is located
	 * @returns { Object } dom nodes found
	 */
	function $$(selector, ctx) {
	  return (ctx || document).querySelectorAll(selector)
	}

	/**
	 * Shorter and fast way to select a single node in the DOM
	 * @param   { String } selector - unique dom selector
	 * @param   { Object } ctx - DOM node where the target of our search will is located
	 * @returns { Object } dom node found
	 */
	function $(selector, ctx) {
	  return (ctx || document).querySelector(selector)
	}

	/**
	 * Create a document fragment
	 * @returns { Object } document fragment
	 */
	function createFrag() {
	  return document.createDocumentFragment()
	}

	/**
	 * Create a document text node
	 * @returns { Object } create a text node to use as placeholder
	 */
	function createDOMPlaceholder() {
	  return document.createTextNode('')
	}

	/**
	 * Create a generic DOM node
	 * @param   { String } name - name of the DOM node we want to create
	 * @returns { Object } DOM node just created
	 */
	function mkEl(name) {
	  return document.createElement(name)
	}

	/**
	 * Set the inner html of any DOM node SVGs included
	 * @param { Object } container - DOM node where we'll inject new html
	 * @param { String } html - html to inject
	 */
	/* istanbul ignore next */
	function setInnerHTML(container, html) {
	  if (!isUndefined(container.innerHTML))
	    { container.innerHTML = html; }
	    // some browsers do not support innerHTML on the SVGs tags
	  else {
	    var doc = new DOMParser().parseFromString(html, 'application/xml');
	    var node = container.ownerDocument.importNode(doc.documentElement, true);
	    container.appendChild(node);
	  }
	}

	/**
	 * Remove any DOM attribute from a node
	 * @param   { Object } dom - DOM node we want to update
	 * @param   { String } name - name of the property we want to remove
	 */
	function remAttr(dom, name) {
	  dom.removeAttribute(name);
	}

	/**
	 * Get the value of any DOM attribute on a node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { String } name - name of the attribute we want to get
	 * @returns { String | undefined } name of the node attribute whether it exists
	 */
	function getAttr(dom, name) {
	  return dom.getAttribute(name)
	}

	/**
	 * Set any DOM attribute
	 * @param { Object } dom - DOM node we want to update
	 * @param { String } name - name of the property we want to set
	 * @param { String } val - value of the property we want to set
	 */
	function setAttr(dom, name, val) {
	  var xlink = XLINK_REGEX.exec(name);
	  if (xlink && xlink[1])
	    { dom.setAttributeNS(XLINK_NS, xlink[1], val); }
	  else
	    { dom.setAttribute(name, val); }
	}

	/**
	 * Insert safely a tag to fix #1962 #1649
	 * @param   { HTMLElement } root - children container
	 * @param   { HTMLElement } curr - node to insert
	 * @param   { HTMLElement } next - node that should preceed the current node inserted
	 */
	function safeInsert(root, curr, next) {
	  root.insertBefore(curr, next.parentNode && next);
	}

	/**
	 * Minimize risk: only zero or one _space_ between attr & value
	 * @param   { String }   html - html string we want to parse
	 * @param   { Function } fn - callback function to apply on any attribute found
	 */
	function walkAttrs(html, fn) {
	  if (!html)
	    { return }
	  var m;
	  while (m = RE_HTML_ATTRS.exec(html))
	    { fn(m[1].toLowerCase(), m[2] || m[3] || m[4]); }
	}

	/**
	 * Walk down recursively all the children tags starting dom node
	 * @param   { Object }   dom - starting node where we will start the recursion
	 * @param   { Function } fn - callback to transform the child node just found
	 * @param   { Object }   context - fn can optionally return an object, which is passed to children
	 */
	function walkNodes(dom, fn, context) {
	  if (dom) {
	    var res = fn(dom, context);
	    var next;
	    // stop the recursion
	    if (res === false) { return }

	    dom = dom.firstChild;

	    while (dom) {
	      next = dom.nextSibling;
	      walkNodes(dom, fn, res);
	      dom = next;
	    }
	  }
	}

	var dom = Object.freeze({
		$$: $$,
		$: $,
		createFrag: createFrag,
		createDOMPlaceholder: createDOMPlaceholder,
		mkEl: mkEl,
		setInnerHTML: setInnerHTML,
		remAttr: remAttr,
		getAttr: getAttr,
		setAttr: setAttr,
		safeInsert: safeInsert,
		walkAttrs: walkAttrs,
		walkNodes: walkNodes
	});

	var styleNode;
	var cssTextProp;
	var byName = {};
	var remainder = [];
	var needsInject = false;

	// skip the following code on the server
	if (WIN) {
	  styleNode = (function () {
	    // create a new style element with the correct type
	    var newNode = mkEl('style');
	    setAttr(newNode, 'type', 'text/css');

	    // replace any user node or insert the new one into the head
	    var userNode = $('style[type=riot]');
	    /* istanbul ignore next */
	    if (userNode) {
	      if (userNode.id) { newNode.id = userNode.id; }
	      userNode.parentNode.replaceChild(newNode, userNode);
	    }
	    else { document.getElementsByTagName('head')[0].appendChild(newNode); }

	    return newNode
	  })();
	  cssTextProp = styleNode.styleSheet;
	}

	/**
	 * Object that will be used to inject and manage the css of every tag instance
	 */
	var styleManager = {
	  styleNode: styleNode,
	  /**
	   * Save a tag style to be later injected into DOM
	   * @param { String } css - css string
	   * @param { String } name - if it's passed we will map the css to a tagname
	   */
	  add: function add(css, name) {
	    if (name) { byName[name] = css; }
	    else { remainder.push(css); }
	    needsInject = true;
	  },
	  /**
	   * Inject all previously saved tag styles into DOM
	   * innerHTML seems slow: http://jsperf.com/riot-insert-style
	   */
	  inject: function inject() {
	    if (!WIN || !needsInject) { return }
	    needsInject = false;
	    var style = Object.keys(byName)
	      .map(function(k) { return byName[k] })
	      .concat(remainder).join('\n');
	    /* istanbul ignore next */
	    if (cssTextProp) { cssTextProp.cssText = style; }
	    else { styleNode.innerHTML = style; }
	  }
	};

	/**
	 * The riot template engine
	 * @version v3.0.3
	 */
	/**
	 * riot.util.brackets
	 *
	 * - `brackets    ` - Returns a string or regex based on its parameter
	 * - `brackets.set` - Change the current riot brackets
	 *
	 * @module
	 */

	/* global riot */

	/* istanbul ignore next */
	var brackets = (function (UNDEF) {

	  var
	    REGLOB = 'g',

	    R_MLCOMMS = /\/\*[^*]*\*+(?:[^*\/][^*]*\*+)*\//g,

	    R_STRINGS = /"[^"\\]*(?:\\[\S\s][^"\\]*)*"|'[^'\\]*(?:\\[\S\s][^'\\]*)*'|`[^`\\]*(?:\\[\S\s][^`\\]*)*`/g,

	    S_QBLOCKS = R_STRINGS.source + '|' +
	      /(?:\breturn\s+|(?:[$\w\)\]]|\+\+|--)\s*(\/)(?![*\/]))/.source + '|' +
	      /\/(?=[^*\/])[^[\/\\]*(?:(?:\[(?:\\.|[^\]\\]*)*\]|\\.)[^[\/\\]*)*?(\/)[gim]*/.source,

	    UNSUPPORTED = RegExp('[\\' + 'x00-\\x1F<>a-zA-Z0-9\'",;\\\\]'),

	    NEED_ESCAPE = /(?=[[\]()*+?.^$|])/g,

	    FINDBRACES = {
	      '(': RegExp('([()])|'   + S_QBLOCKS, REGLOB),
	      '[': RegExp('([[\\]])|' + S_QBLOCKS, REGLOB),
	      '{': RegExp('([{}])|'   + S_QBLOCKS, REGLOB)
	    },

	    DEFAULT = '{ }';

	  var _pairs = [
	    '{', '}',
	    '{', '}',
	    /{[^}]*}/,
	    /\\([{}])/g,
	    /\\({)|{/g,
	    RegExp('\\\\(})|([[({])|(})|' + S_QBLOCKS, REGLOB),
	    DEFAULT,
	    /^\s*{\^?\s*([$\w]+)(?:\s*,\s*(\S+))?\s+in\s+(\S.*)\s*}/,
	    /(^|[^\\]){=[\S\s]*?}/
	  ];

	  var
	    cachedBrackets = UNDEF,
	    _regex,
	    _cache = [],
	    _settings;

	  function _loopback (re) { return re }

	  function _rewrite (re, bp) {
	    if (!bp) { bp = _cache; }
	    return new RegExp(
	      re.source.replace(/{/g, bp[2]).replace(/}/g, bp[3]), re.global ? REGLOB : ''
	    )
	  }

	  function _create (pair) {
	    if (pair === DEFAULT) { return _pairs }

	    var arr = pair.split(' ');

	    if (arr.length !== 2 || UNSUPPORTED.test(pair)) {
	      throw new Error('Unsupported brackets "' + pair + '"')
	    }
	    arr = arr.concat(pair.replace(NEED_ESCAPE, '\\').split(' '));

	    arr[4] = _rewrite(arr[1].length > 1 ? /{[\S\s]*?}/ : _pairs[4], arr);
	    arr[5] = _rewrite(pair.length > 3 ? /\\({|})/g : _pairs[5], arr);
	    arr[6] = _rewrite(_pairs[6], arr);
	    arr[7] = RegExp('\\\\(' + arr[3] + ')|([[({])|(' + arr[3] + ')|' + S_QBLOCKS, REGLOB);
	    arr[8] = pair;
	    return arr
	  }

	  function _brackets (reOrIdx) {
	    return reOrIdx instanceof RegExp ? _regex(reOrIdx) : _cache[reOrIdx]
	  }

	  _brackets.split = function split (str, tmpl, _bp) {
	    // istanbul ignore next: _bp is for the compiler
	    if (!_bp) { _bp = _cache; }

	    var
	      parts = [],
	      match,
	      isexpr,
	      start,
	      pos,
	      re = _bp[6];

	    isexpr = start = re.lastIndex = 0;

	    while ((match = re.exec(str))) {

	      pos = match.index;

	      if (isexpr) {

	        if (match[2]) {
	          re.lastIndex = skipBraces(str, match[2], re.lastIndex);
	          continue
	        }
	        if (!match[3]) {
	          continue
	        }
	      }

	      if (!match[1]) {
	        unescapeStr(str.slice(start, pos));
	        start = re.lastIndex;
	        re = _bp[6 + (isexpr ^= 1)];
	        re.lastIndex = start;
	      }
	    }

	    if (str && start < str.length) {
	      unescapeStr(str.slice(start));
	    }

	    return parts

	    function unescapeStr (s) {
	      if (tmpl || isexpr) {
	        parts.push(s && s.replace(_bp[5], '$1'));
	      } else {
	        parts.push(s);
	      }
	    }

	    function skipBraces (s, ch, ix) {
	      var
	        match,
	        recch = FINDBRACES[ch];

	      recch.lastIndex = ix;
	      ix = 1;
	      while ((match = recch.exec(s))) {
	        if (match[1] &&
	          !(match[1] === ch ? ++ix : --ix)) { break }
	      }
	      return ix ? s.length : recch.lastIndex
	    }
	  };

	  _brackets.hasExpr = function hasExpr (str) {
	    return _cache[4].test(str)
	  };

	  _brackets.loopKeys = function loopKeys (expr) {
	    var m = expr.match(_cache[9]);

	    return m
	      ? { key: m[1], pos: m[2], val: _cache[0] + m[3].trim() + _cache[1] }
	      : { val: expr.trim() }
	  };

	  _brackets.array = function array (pair) {
	    return pair ? _create(pair) : _cache
	  };

	  function _reset (pair) {
	    if ((pair || (pair = DEFAULT)) !== _cache[8]) {
	      _cache = _create(pair);
	      _regex = pair === DEFAULT ? _loopback : _rewrite;
	      _cache[9] = _regex(_pairs[9]);
	    }
	    cachedBrackets = pair;
	  }

	  function _setSettings (o) {
	    var b;

	    o = o || {};
	    b = o.brackets;
	    Object.defineProperty(o, 'brackets', {
	      set: _reset,
	      get: function () { return cachedBrackets },
	      enumerable: true
	    });
	    _settings = o;
	    _reset(b);
	  }

	  Object.defineProperty(_brackets, 'settings', {
	    set: _setSettings,
	    get: function () { return _settings }
	  });

	  /* istanbul ignore next: in the browser riot is always in the scope */
	  _brackets.settings = typeof riot !== 'undefined' && riot.settings || {};
	  _brackets.set = _reset;

	  _brackets.R_STRINGS = R_STRINGS;
	  _brackets.R_MLCOMMS = R_MLCOMMS;
	  _brackets.S_QBLOCKS = S_QBLOCKS;

	  return _brackets

	})();

	/**
	 * @module tmpl
	 *
	 * tmpl          - Root function, returns the template value, render with data
	 * tmpl.hasExpr  - Test the existence of a expression inside a string
	 * tmpl.loopKeys - Get the keys for an 'each' loop (used by `_each`)
	 */

	/* istanbul ignore next */
	var tmpl = (function () {

	  var _cache = {};

	  function _tmpl (str, data) {
	    if (!str) { return str }

	    return (_cache[str] || (_cache[str] = _create(str))).call(data, _logErr)
	  }

	  _tmpl.hasExpr = brackets.hasExpr;

	  _tmpl.loopKeys = brackets.loopKeys;

	  // istanbul ignore next
	  _tmpl.clearCache = function () { _cache = {}; };

	  _tmpl.errorHandler = null;

	  function _logErr (err, ctx) {

	    err.riotData = {
	      tagName: ctx && ctx.__ && ctx.__.tagName,
	      _riot_id: ctx && ctx._riot_id  //eslint-disable-line camelcase
	    };

	    if (_tmpl.errorHandler) { _tmpl.errorHandler(err); }
	    else if (
	      typeof console !== 'undefined' &&
	      typeof console.error === 'function'
	    ) {
	      if (err.riotData.tagName) {
	        console.error('Riot template error thrown in the <%s> tag', err.riotData.tagName);
	      }
	      console.error(err);
	    }
	  }

	  function _create (str) {
	    var expr = _getTmpl(str);

	    if (expr.slice(0, 11) !== 'try{return ') { expr = 'return ' + expr; }

	    return new Function('E', expr + ';')    // eslint-disable-line no-new-func
	  }

	  var
	    CH_IDEXPR = String.fromCharCode(0x2057),
	    RE_CSNAME = /^(?:(-?[_A-Za-z\xA0-\xFF][-\w\xA0-\xFF]*)|\u2057(\d+)~):/,
	    RE_QBLOCK = RegExp(brackets.S_QBLOCKS, 'g'),
	    RE_DQUOTE = /\u2057/g,
	    RE_QBMARK = /\u2057(\d+)~/g;

	  function _getTmpl (str) {
	    var
	      qstr = [],
	      expr,
	      parts = brackets.split(str.replace(RE_DQUOTE, '"'), 1);

	    if (parts.length > 2 || parts[0]) {
	      var i, j, list = [];

	      for (i = j = 0; i < parts.length; ++i) {

	        expr = parts[i];

	        if (expr && (expr = i & 1

	            ? _parseExpr(expr, 1, qstr)

	            : '"' + expr
	                .replace(/\\/g, '\\\\')
	                .replace(/\r\n?|\n/g, '\\n')
	                .replace(/"/g, '\\"') +
	              '"'

	          )) { list[j++] = expr; }

	      }

	      expr = j < 2 ? list[0]
	           : '[' + list.join(',') + '].join("")';

	    } else {

	      expr = _parseExpr(parts[1], 0, qstr);
	    }

	    if (qstr[0]) {
	      expr = expr.replace(RE_QBMARK, function (_, pos) {
	        return qstr[pos]
	          .replace(/\r/g, '\\r')
	          .replace(/\n/g, '\\n')
	      });
	    }
	    return expr
	  }

	  var
	    RE_BREND = {
	      '(': /[()]/g,
	      '[': /[[\]]/g,
	      '{': /[{}]/g
	    };

	  function _parseExpr (expr, asText, qstr) {

	    expr = expr
	          .replace(RE_QBLOCK, function (s, div) {
	            return s.length > 2 && !div ? CH_IDEXPR + (qstr.push(s) - 1) + '~' : s
	          })
	          .replace(/\s+/g, ' ').trim()
	          .replace(/\ ?([[\({},?\.:])\ ?/g, '$1');

	    if (expr) {
	      var
	        list = [],
	        cnt = 0,
	        match;

	      while (expr &&
	            (match = expr.match(RE_CSNAME)) &&
	            !match.index
	        ) {
	        var
	          key,
	          jsb,
	          re = /,|([[{(])|$/g;

	        expr = RegExp.rightContext;
	        key  = match[2] ? qstr[match[2]].slice(1, -1).trim().replace(/\s+/g, ' ') : match[1];

	        while (jsb = (match = re.exec(expr))[1]) { skipBraces(jsb, re); }

	        jsb  = expr.slice(0, match.index);
	        expr = RegExp.rightContext;

	        list[cnt++] = _wrapExpr(jsb, 1, key);
	      }

	      expr = !cnt ? _wrapExpr(expr, asText)
	           : cnt > 1 ? '[' + list.join(',') + '].join(" ").trim()' : list[0];
	    }
	    return expr

	    function skipBraces (ch, re) {
	      var
	        mm,
	        lv = 1,
	        ir = RE_BREND[ch];

	      ir.lastIndex = re.lastIndex;
	      while (mm = ir.exec(expr)) {
	        if (mm[0] === ch) { ++lv; }
	        else if (!--lv) { break }
	      }
	      re.lastIndex = lv ? expr.length : ir.lastIndex;
	    }
	  }

	  // istanbul ignore next: not both
	  var // eslint-disable-next-line max-len
	    JS_CONTEXT = '"in this?this:' + (typeof window !== 'object' ? 'global' : 'window') + ').',
	    JS_VARNAME = /[,{][\$\w]+(?=:)|(^ *|[^$\w\.{])(?!(?:typeof|true|false|null|undefined|in|instanceof|is(?:Finite|NaN)|void|NaN|new|Date|RegExp|Math)(?![$\w]))([$_A-Za-z][$\w]*)/g,
	    JS_NOPROPS = /^(?=(\.[$\w]+))\1(?:[^.[(]|$)/;

	  function _wrapExpr (expr, asText, key) {
	    var tb;

	    expr = expr.replace(JS_VARNAME, function (match, p, mvar, pos, s) {
	      if (mvar) {
	        pos = tb ? 0 : pos + match.length;

	        if (mvar !== 'this' && mvar !== 'global' && mvar !== 'window') {
	          match = p + '("' + mvar + JS_CONTEXT + mvar;
	          if (pos) { tb = (s = s[pos]) === '.' || s === '(' || s === '['; }
	        } else if (pos) {
	          tb = !JS_NOPROPS.test(s.slice(pos));
	        }
	      }
	      return match
	    });

	    if (tb) {
	      expr = 'try{return ' + expr + '}catch(e){E(e,this)}';
	    }

	    if (key) {

	      expr = (tb
	          ? 'function(){' + expr + '}.call(this)' : '(' + expr + ')'
	        ) + '?"' + key + '":""';

	    } else if (asText) {

	      expr = 'function(v){' + (tb
	          ? expr.replace('return ', 'v=') : 'v=(' + expr + ')'
	        ) + ';return v||v===0?v:""}.call(this)';
	    }

	    return expr
	  }

	  _tmpl.version = brackets.version = 'v3.0.3';

	  return _tmpl

	})();

	/* istanbul ignore next */
	var observable$1 = function(el) {

	  /**
	   * Extend the original object or create a new empty one
	   * @type { Object }
	   */

	  el = el || {};

	  /**
	   * Private variables
	   */
	  var callbacks = {},
	    slice = Array.prototype.slice;

	  /**
	   * Public Api
	   */

	  // extend the el object adding the observable methods
	  Object.defineProperties(el, {
	    /**
	     * Listen to the given `event` ands
	     * execute the `callback` each time an event is triggered.
	     * @param  { String } event - event id
	     * @param  { Function } fn - callback function
	     * @returns { Object } el
	     */
	    on: {
	      value: function(event, fn) {
	        if (typeof fn == 'function')
	          { (callbacks[event] = callbacks[event] || []).push(fn); }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Removes the given `event` listeners
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    off: {
	      value: function(event, fn) {
	        if (event == '*' && !fn) { callbacks = {}; }
	        else {
	          if (fn) {
	            var arr = callbacks[event];
	            for (var i = 0, cb; cb = arr && arr[i]; ++i) {
	              if (cb == fn) { arr.splice(i--, 1); }
	            }
	          } else { delete callbacks[event]; }
	        }
	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Listen to the given `event` and
	     * execute the `callback` at most once
	     * @param   { String } event - event id
	     * @param   { Function } fn - callback function
	     * @returns { Object } el
	     */
	    one: {
	      value: function(event, fn) {
	        function on() {
	          el.off(event, on);
	          fn.apply(el, arguments);
	        }
	        return el.on(event, on)
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    },

	    /**
	     * Execute all callback functions that listen to
	     * the given `event`
	     * @param   { String } event - event id
	     * @returns { Object } el
	     */
	    trigger: {
	      value: function(event) {
	        var arguments$1 = arguments;


	        // getting the arguments
	        var arglen = arguments.length - 1,
	          args = new Array(arglen),
	          fns,
	          fn,
	          i;

	        for (i = 0; i < arglen; i++) {
	          args[i] = arguments$1[i + 1]; // skip first argument
	        }

	        fns = slice.call(callbacks[event] || [], 0);

	        for (i = 0; fn = fns[i]; ++i) {
	          fn.apply(el, args);
	        }

	        if (callbacks['*'] && event != '*')
	          { el.trigger.apply(el, ['*', event].concat(args)); }

	        return el
	      },
	      enumerable: false,
	      writable: false,
	      configurable: false
	    }
	  });

	  return el

	};

	/**
	 * Specialized function for looping an array-like collection with `each={}`
	 * @param   { Array } list - collection of items
	 * @param   {Function} fn - callback function
	 * @returns { Array } the array looped
	 */
	function each(list, fn) {
	  var len = list ? list.length : 0;
	  var i = 0;
	  for (; i < len; ++i) {
	    fn(list[i], i);
	  }
	  return list
	}

	/**
	 * Check whether an array contains an item
	 * @param   { Array } array - target array
	 * @param   { * } item - item to test
	 * @returns { Boolean } -
	 */
	function contains(array, item) {
	  return array.indexOf(item) !== -1
	}

	/**
	 * Convert a string containing dashes to camel case
	 * @param   { String } str - input string
	 * @returns { String } my-string -> myString
	 */
	function toCamel(str) {
	  return str.replace(/-(\w)/g, function (_, c) { return c.toUpperCase(); })
	}

	/**
	 * Faster String startsWith alternative
	 * @param   { String } str - source string
	 * @param   { String } value - test string
	 * @returns { Boolean } -
	 */
	function startsWith(str, value) {
	  return str.slice(0, value.length) === value
	}

	/**
	 * Helper function to set an immutable property
	 * @param   { Object } el - object where the new property will be set
	 * @param   { String } key - object key where the new property will be stored
	 * @param   { * } value - value of the new property
	 * @param   { Object } options - set the propery overriding the default options
	 * @returns { Object } - the initial object
	 */
	function defineProperty(el, key, value, options) {
	  Object.defineProperty(el, key, extend({
	    value: value,
	    enumerable: false,
	    writable: false,
	    configurable: true
	  }, options));
	  return el
	}

	/**
	 * Extend any object with other properties
	 * @param   { Object } src - source object
	 * @returns { Object } the resulting extended object
	 *
	 * var obj = { foo: 'baz' }
	 * extend(obj, {bar: 'bar', foo: 'bar'})
	 * console.log(obj) => {bar: 'bar', foo: 'bar'}
	 *
	 */
	function extend(src) {
	  var obj, args = arguments;
	  for (var i = 1; i < args.length; ++i) {
	    if (obj = args[i]) {
	      for (var key in obj) {
	        // check if this property of the source object could be overridden
	        if (isWritable(src, key))
	          { src[key] = obj[key]; }
	      }
	    }
	  }
	  return src
	}

	var misc = Object.freeze({
		each: each,
		contains: contains,
		toCamel: toCamel,
		startsWith: startsWith,
		defineProperty: defineProperty,
		extend: extend
	});

	var settings$1 = extend(Object.create(brackets.settings), {
	  skipAnonymousTags: true
	});

	var EVENTS_PREFIX_REGEX = /^on/;

	/**
	 * Trigger DOM events
	 * @param   { HTMLElement } dom - dom element target of the event
	 * @param   { Function } handler - user function
	 * @param   { Object } e - event object
	 */
	function handleEvent(dom, handler, e) {
	  var ptag = this.__.parent,
	    item = this.__.item;

	  if (!item)
	    { while (ptag && !item) {
	      item = ptag.__.item;
	      ptag = ptag.__.parent;
	    } }

	  // override the event properties
	  /* istanbul ignore next */
	  if (isWritable(e, 'currentTarget')) { e.currentTarget = dom; }
	  /* istanbul ignore next */
	  if (isWritable(e, 'target')) { e.target = e.srcElement; }
	  /* istanbul ignore next */
	  if (isWritable(e, 'which')) { e.which = e.charCode || e.keyCode; }

	  e.item = item;

	  handler.call(this, e);

	  if (!e.preventUpdate) {
	    var p = getImmediateCustomParentTag(this);
	    // fixes #2083
	    if (p.isMounted) { p.update(); }
	  }
	}

	/**
	 * Attach an event to a DOM node
	 * @param { String } name - event name
	 * @param { Function } handler - event callback
	 * @param { Object } dom - dom node
	 * @param { Tag } tag - tag instance
	 */
	function setEventHandler(name, handler, dom, tag) {
	  var eventName,
	    cb = handleEvent.bind(tag, dom, handler);

	  // avoid to bind twice the same event
	  dom[name] = null;

	  // normalize event name
	  eventName = name.replace(EVENTS_PREFIX_REGEX, '');

	  // cache the callback directly on the DOM node
	  if (!dom._riotEvents) { dom._riotEvents = {}; }

	  if (dom._riotEvents[name])
	    { dom.removeEventListener(eventName, dom._riotEvents[name]); }

	  dom._riotEvents[name] = cb;
	  dom.addEventListener(eventName, cb, false);
	}

	/**
	 * Update dynamically created data-is tags with changing expressions
	 * @param { Object } expr - expression tag and expression info
	 * @param { Tag } parent - parent for tag creation
	 */
	function updateDataIs(expr, parent) {
	  var tagName = tmpl(expr.value, parent),
	    conf, isVirtual, head, ref;

	  if (expr.tag && expr.tagName === tagName) {
	    expr.tag.update();
	    return
	  }

	  isVirtual = expr.dom.tagName === 'VIRTUAL';
	  // sync _parent to accommodate changing tagnames
	  if (expr.tag) {

	    // need placeholder before unmount
	    if(isVirtual) {
	      head = expr.tag.__.head;
	      ref = createDOMPlaceholder();
	      head.parentNode.insertBefore(ref, head);
	    }

	    expr.tag.unmount(true);
	  }

	  expr.impl = __TAG_IMPL[tagName];
	  conf = {root: expr.dom, parent: parent, hasImpl: true, tagName: tagName};
	  expr.tag = initChildTag(expr.impl, conf, expr.dom.innerHTML, parent);
	  each(expr.attrs, function (a) { return setAttr(expr.tag.root, a.name, a.value); });
	  expr.tagName = tagName;
	  expr.tag.mount();
	  if (isVirtual)
	    { makeReplaceVirtual(expr.tag, ref || expr.tag.root); } // root exist first time, after use placeholder

	  // parent is the placeholder tag, not the dynamic tag so clean up
	  parent.__.onUnmount = function() {
	    var delName = expr.tag.opts.dataIs,
	      tags = expr.tag.parent.tags,
	      _tags = expr.tag.__.parent.tags;
	    arrayishRemove(tags, delName, expr.tag);
	    arrayishRemove(_tags, delName, expr.tag);
	    expr.tag.unmount();
	  };
	}

	/**
	 * Update on single tag expression
	 * @this Tag
	 * @param { Object } expr - expression logic
	 * @returns { undefined }
	 */
	function updateExpression(expr) {
	  if (this.root && getAttr(this.root,'virtualized')) { return }

	  var dom = expr.dom,
	    attrName = expr.attr,
	    isToggle = contains([SHOW_DIRECTIVE, HIDE_DIRECTIVE], attrName),
	    value = tmpl(expr.expr, this),
	    isValueAttr = attrName === 'riot-value',
	    isVirtual = expr.root && expr.root.tagName === 'VIRTUAL',
	    parent = dom && (expr.parent || dom.parentNode),
	    old;

	  if (expr.bool)
	    { value = value ? attrName : false; }
	  else if (isUndefined(value) || value === null)
	    { value = ''; }

	  if (expr._riot_id) { // if it's a tag
	    if (expr.isMounted) {
	      expr.update();

	    // if it hasn't been mounted yet, do that now.
	    } else {
	      expr.mount();

	      if (isVirtual)
	        { makeReplaceVirtual(expr, expr.root); }

	    }
	    return
	  }

	  old = expr.value;
	  expr.value = value;

	  if (expr.update) {
	    expr.update();
	    return
	  }

	  if (expr.isRtag && value) { return updateDataIs(expr, this) }
	  if (old === value) { return }
	  // no change, so nothing more to do
	  if (isValueAttr && dom.value === value) { return }

	  // textarea and text nodes have no attribute name
	  if (!attrName) {
	    // about #815 w/o replace: the browser converts the value to a string,
	    // the comparison by "==" does too, but not in the server
	    value += '';
	    // test for parent avoids error with invalid assignment to nodeValue
	    if (parent) {
	      // cache the parent node because somehow it will become null on IE
	      // on the next iteration
	      expr.parent = parent;
	      if (parent.tagName === 'TEXTAREA') {
	        parent.value = value;                    // #1113
	        if (!IE_VERSION) { dom.nodeValue = value; }  // #1625 IE throws here, nodeValue
	      }                                         // will be available on 'updated'
	      else { dom.nodeValue = value; }
	    }
	    return
	  }

	  // remove original attribute
	  if (!expr.isAttrRemoved || !value) {
	    remAttr(dom, attrName);
	    expr.isAttrRemoved = true;
	  }

	  // event handler
	  if (isFunction(value)) {
	    setEventHandler(attrName, value, dom, this);
	  // show / hide
	  } else if (isToggle) {
	    if (attrName === HIDE_DIRECTIVE) { value = !value; }
	    dom.style.display = value ? '' : 'none';
	  // field value
	  } else if (isValueAttr) {
	    dom.value = value;
	  // <img src="{ expr }">
	  } else if (startsWith(attrName, ATTRS_PREFIX) && attrName !== IS_DIRECTIVE) {
	    attrName = attrName.slice(ATTRS_PREFIX.length);
	    if (CASE_SENSITIVE_ATTRIBUTES[attrName])
	      { attrName = CASE_SENSITIVE_ATTRIBUTES[attrName]; }
	    if (value != null)
	      { setAttr(dom, attrName, value); }
	  } else {
	    if (expr.bool) {
	      dom[attrName] = value;
	      if (!value) { return }
	    }

	    if (value === 0 || value && typeof value !== T_OBJECT) {
	      setAttr(dom, attrName, value);
	    }
	  }
	}

	/**
	 * Update all the expressions in a Tag instance
	 * @this Tag
	 * @param { Array } expressions - expression that must be re evaluated
	 */
	function updateAllExpressions(expressions) {
	  each(expressions, updateExpression.bind(this));
	}

	var IfExpr = {
	  init: function init(dom, tag, expr) {
	    remAttr(dom, CONDITIONAL_DIRECTIVE);
	    this.tag = tag;
	    this.expr = expr;
	    this.stub = document.createTextNode('');
	    this.pristine = dom;

	    var p = dom.parentNode;
	    p.insertBefore(this.stub, dom);
	    p.removeChild(dom);

	    return this
	  },
	  update: function update() {
	    var newValue = tmpl(this.expr, this.tag);

	    if (newValue && !this.current) { // insert
	      this.current = this.pristine.cloneNode(true);
	      this.stub.parentNode.insertBefore(this.current, this.stub);

	      this.expressions = [];
	      parseExpressions.apply(this.tag, [this.current, this.expressions, true]);
	    } else if (!newValue && this.current) { // remove
	      unmountAll(this.expressions);
	      if (this.current._tag) {
	        this.current._tag.unmount();
	      } else if (this.current.parentNode)
	        { this.current.parentNode.removeChild(this.current); }
	      this.current = null;
	      this.expressions = [];
	    }

	    if (newValue) { updateAllExpressions.call(this.tag, this.expressions); }
	  },
	  unmount: function unmount() {
	    unmountAll(this.expressions || []);
	    delete this.pristine;
	    delete this.parentNode;
	    delete this.stub;
	  }
	};

	var RefExpr = {
	  init: function init(dom, parent, attrName, attrValue) {
	    this.dom = dom;
	    this.attr = attrName;
	    this.rawValue = attrValue;
	    this.parent = parent;
	    this.hasExp = tmpl.hasExpr(attrValue);
	    this.firstRun = true;

	    return this
	  },
	  update: function update() {
	    var value = this.rawValue;
	    if (this.hasExp)
	      { value = tmpl(this.rawValue, this.parent); }

	    // if nothing changed, we're done
	    if (!this.firstRun && value === this.value) { return }

	    var customParent = this.parent && getImmediateCustomParentTag(this.parent);

	    // if the referenced element is a custom tag, then we set the tag itself, rather than DOM
	    var tagOrDom = this.tag || this.dom;

	    // the name changed, so we need to remove it from the old key (if present)
	    if (!isBlank(this.value) && customParent)
	      { arrayishRemove(customParent.refs, this.value, tagOrDom); }

	    if (isBlank(value)) {
	      // if the value is blank, we remove it
	      remAttr(this.dom, this.attr);
	    } else {
	      // add it to the refs of parent tag (this behavior was changed >=3.0)
	      if (customParent) { arrayishAdd(
	        customParent.refs,
	        value,
	        tagOrDom,
	        // use an array if it's a looped node and the ref is not an expression
	        null,
	        this.parent.__.index
	      ); }
	      // set the actual DOM attr
	      setAttr(this.dom, this.attr, value);
	    }

	    this.value = value;
	    this.firstRun = false;
	  },
	  unmount: function unmount() {
	    var tagOrDom = this.tag || this.dom;
	    var customParent = this.parent && getImmediateCustomParentTag(this.parent);
	    if (!isBlank(this.value) && customParent)
	      { arrayishRemove(customParent.refs, this.value, tagOrDom); }
	    delete this.dom;
	    delete this.parent;
	  }
	};

	/**
	 * Convert the item looped into an object used to extend the child tag properties
	 * @param   { Object } expr - object containing the keys used to extend the children tags
	 * @param   { * } key - value to assign to the new object returned
	 * @param   { * } val - value containing the position of the item in the array
	 * @param   { Object } base - prototype object for the new item
	 * @returns { Object } - new object containing the values of the original item
	 *
	 * The variables 'key' and 'val' are arbitrary.
	 * They depend on the collection type looped (Array, Object)
	 * and on the expression used on the each tag
	 *
	 */
	function mkitem(expr, key, val, base) {
	  var item = base ? Object.create(base) : {};
	  item[expr.key] = key;
	  if (expr.pos) { item[expr.pos] = val; }
	  return item
	}

	/**
	 * Unmount the redundant tags
	 * @param   { Array } items - array containing the current items to loop
	 * @param   { Array } tags - array containing all the children tags
	 */
	function unmountRedundant(items, tags) {
	  var i = tags.length,
	    j = items.length;

	  while (i > j) {
	    i--;
	    remove.apply(tags[i], [tags, i]);
	  }
	}


	/**
	 * Remove a child tag
	 * @this Tag
	 * @param   { Array } tags - tags collection
	 * @param   { Number } i - index of the tag to remove
	 */
	function remove(tags, i) {
	  tags.splice(i, 1);
	  this.unmount();
	  arrayishRemove(this.parent, this, this.__.tagName, true);
	}

	/**
	 * Move the nested custom tags in non custom loop tags
	 * @this Tag
	 * @param   { Number } i - current position of the loop tag
	 */
	function moveNestedTags(i) {
	  var this$1 = this;

	  each(Object.keys(this.tags), function (tagName) {
	    moveChildTag.apply(this$1.tags[tagName], [tagName, i]);
	  });
	}

	/**
	 * Move a child tag
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to move
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function move(root, nextTag, isVirtual) {
	  if (isVirtual)
	    { moveVirtual.apply(this, [root, nextTag]); }
	  else
	    { safeInsert(root, this.root, nextTag.root); }
	}

	/**
	 * Insert and mount a child tag
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Tag } nextTag - instance of the next tag preceding the one we want to insert
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function insert(root, nextTag, isVirtual) {
	  if (isVirtual)
	    { makeVirtual.apply(this, [root, nextTag]); }
	  else
	    { safeInsert(root, this.root, nextTag.root); }
	}

	/**
	 * Append a new tag into the DOM
	 * @this Tag
	 * @param   { HTMLElement } root - dom node containing all the loop children
	 * @param   { Boolean } isVirtual - is it a virtual tag?
	 */
	function append(root, isVirtual) {
	  if (isVirtual)
	    { makeVirtual.call(this, root); }
	  else
	    { root.appendChild(this.root); }
	}

	/**
	 * Manage tags having the 'each'
	 * @param   { HTMLElement } dom - DOM node we need to loop
	 * @param   { Tag } parent - parent tag instance where the dom node is contained
	 * @param   { String } expr - string contained in the 'each' attribute
	 * @returns { Object } expression object for this each loop
	 */
	function _each(dom, parent, expr) {

	  // remove the each property from the original tag
	  remAttr(dom, LOOP_DIRECTIVE);

	  var mustReorder = typeof getAttr(dom, LOOP_NO_REORDER_DIRECTIVE) !== T_STRING || remAttr(dom, LOOP_NO_REORDER_DIRECTIVE),
	    tagName = getTagName(dom),
	    impl = __TAG_IMPL[tagName],
	    parentNode = dom.parentNode,
	    placeholder = createDOMPlaceholder(),
	    child = getTag(dom),
	    ifExpr = getAttr(dom, CONDITIONAL_DIRECTIVE),
	    tags = [],
	    oldItems = [],
	    hasKeys,
	    isLoop = true,
	    isAnonymous = !__TAG_IMPL[tagName],
	    isVirtual = dom.tagName === 'VIRTUAL';

	  // parse the each expression
	  expr = tmpl.loopKeys(expr);
	  expr.isLoop = true;

	  if (ifExpr) { remAttr(dom, CONDITIONAL_DIRECTIVE); }

	  // insert a marked where the loop tags will be injected
	  parentNode.insertBefore(placeholder, dom);
	  parentNode.removeChild(dom);

	  expr.update = function updateEach() {
	    // get the new items collection
	    var items = tmpl(expr.val, parent),
	      frag = createFrag(),
	      isObject$$1 = !isArray(items) && !isString(items),
	      root = placeholder.parentNode;

	    // object loop. any changes cause full redraw
	    if (isObject$$1) {
	      hasKeys = items || false;
	      items = hasKeys ?
	        Object.keys(items).map(function (key) {
	          return mkitem(expr, items[key], key)
	        }) : [];
	    } else {
	      hasKeys = false;
	    }

	    if (ifExpr) {
	      items = items.filter(function(item, i) {
	        if (expr.key && !isObject$$1)
	          { return !!tmpl(ifExpr, mkitem(expr, item, i, parent)) }

	        return !!tmpl(ifExpr, extend(Object.create(parent), item))
	      });
	    }

	    // loop all the new items
	    each(items, function(item, i) {
	      // reorder only if the items are objects
	      var
	        doReorder = mustReorder && typeof item === T_OBJECT && !hasKeys,
	        oldPos = oldItems.indexOf(item),
	        isNew = oldPos === -1,
	        pos = !isNew && doReorder ? oldPos : i,
	        // does a tag exist in this position?
	        tag = tags[pos],
	        mustAppend = i >= oldItems.length,
	        mustCreate =  doReorder && isNew || !doReorder && !tag;

	      item = !hasKeys && expr.key ? mkitem(expr, item, i) : item;

	      // new tag
	      if (mustCreate) {
	        tag = new Tag$1(impl, {
	          parent: parent,
	          isLoop: isLoop,
	          isAnonymous: isAnonymous,
	          tagName: tagName,
	          root: dom.cloneNode(isAnonymous),
	          item: item,
	          index: i,
	        }, dom.innerHTML);

	        // mount the tag
	        tag.mount();

	        if (mustAppend)
	          { append.apply(tag, [frag || root, isVirtual]); }
	        else
	          { insert.apply(tag, [root, tags[i], isVirtual]); }

	        if (!mustAppend) { oldItems.splice(i, 0, item); }
	        tags.splice(i, 0, tag);
	        if (child) { arrayishAdd(parent.tags, tagName, tag, true); }
	      } else if (pos !== i && doReorder) {
	        // move
	        if (contains(items, oldItems[pos])) {
	          move.apply(tag, [root, tags[i], isVirtual]);
	          // move the old tag instance
	          tags.splice(i, 0, tags.splice(pos, 1)[0]);
	          // move the old item
	          oldItems.splice(i, 0, oldItems.splice(pos, 1)[0]);
	        }

	        // update the position attribute if it exists
	        if (expr.pos) { tag[expr.pos] = i; }

	        // if the loop tags are not custom
	        // we need to move all their custom tags into the right position
	        if (!child && tag.tags) { moveNestedTags.call(tag, i); }
	      }

	      // cache the original item to use it in the events bound to this node
	      // and its children
	      tag.__.item = item;
	      tag.__.index = i;
	      tag.__.parent = parent;

	      if (!mustCreate) { tag.update(item); }
	    });

	    // remove the redundant tags
	    unmountRedundant(items, tags);

	    // clone the items array
	    oldItems = items.slice();

	    root.insertBefore(frag, placeholder);
	  };

	  expr.unmount = function() {
	    each(tags, function(t) { t.unmount(); });
	  };

	  return expr
	}

	/**
	 * Walk the tag DOM to detect the expressions to evaluate
	 * @this Tag
	 * @param   { HTMLElement } root - root tag where we will start digging the expressions
	 * @param   { Array } expressions - empty array where the expressions will be added
	 * @param   { Boolean } mustIncludeRoot - flag to decide whether the root must be parsed as well
	 * @returns { Object } an object containing the root noode and the dom tree
	 */
	function parseExpressions(root, expressions, mustIncludeRoot) {
	  var this$1 = this;

	  var tree = {parent: {children: expressions}};

	  walkNodes(root, function (dom, ctx) {
	    var type = dom.nodeType, parent = ctx.parent, attr, expr, tagImpl;
	    if (!mustIncludeRoot && dom === root) { return {parent: parent} }

	    // text node
	    if (type === 3 && dom.parentNode.tagName !== 'STYLE' && tmpl.hasExpr(dom.nodeValue))
	      { parent.children.push({dom: dom, expr: dom.nodeValue}); }

	    if (type !== 1) { return ctx } // not an element

	    var isVirtual = dom.tagName === 'VIRTUAL';

	    // loop. each does it's own thing (for now)
	    if (attr = getAttr(dom, LOOP_DIRECTIVE)) {
	      if(isVirtual) { setAttr(dom, 'loopVirtual', true); } // ignore here, handled in _each
	      parent.children.push(_each(dom, this$1, attr));
	      return false
	    }

	    // if-attrs become the new parent. Any following expressions (either on the current
	    // element, or below it) become children of this expression.
	    if (attr = getAttr(dom, CONDITIONAL_DIRECTIVE)) {
	      parent.children.push(Object.create(IfExpr).init(dom, this$1, attr));
	      return false
	    }

	    if (expr = getAttr(dom, IS_DIRECTIVE)) {
	      if (tmpl.hasExpr(expr)) {
	        parent.children.push({isRtag: true, expr: expr, dom: dom, attrs: [].slice.call(dom.attributes)});
	        return false
	      }
	    }

	    // if this is a tag, stop traversing here.
	    // we ignore the root, since parseExpressions is called while we're mounting that root
	    tagImpl = getTag(dom);
	    if(isVirtual) {
	      if(getAttr(dom, 'virtualized')) {dom.parentElement.removeChild(dom); } // tag created, remove from dom
	      if(!tagImpl && !getAttr(dom, 'virtualized') && !getAttr(dom, 'loopVirtual'))  // ok to create virtual tag
	        { tagImpl = { tmpl: dom.outerHTML }; }
	    }

	    if (tagImpl && (dom !== root || mustIncludeRoot)) {
	      if(isVirtual && !getAttr(dom, IS_DIRECTIVE)) { // handled in update
	        // can not remove attribute like directives
	        // so flag for removal after creation to prevent maximum stack error
	        setAttr(dom, 'virtualized', true);

	        var tag = new Tag$1({ tmpl: dom.outerHTML },
	          {root: dom, parent: this$1},
	          dom.innerHTML);
	        parent.children.push(tag); // no return, anonymous tag, keep parsing
	      } else {
	        var conf = {root: dom, parent: this$1, hasImpl: true};
	        parent.children.push(initChildTag(tagImpl, conf, dom.innerHTML, this$1));
	        return false
	      }
	    }

	    // attribute expressions
	    parseAttributes.apply(this$1, [dom, dom.attributes, function(attr, expr) {
	      if (!expr) { return }
	      parent.children.push(expr);
	    }]);

	    // whatever the parent is, all child elements get the same parent.
	    // If this element had an if-attr, that's the parent for all child elements
	    return {parent: parent}
	  }, tree);

	  return { tree: tree, root: root }
	}

	/**
	 * Calls `fn` for every attribute on an element. If that attr has an expression,
	 * it is also passed to fn.
	 * @this Tag
	 * @param   { HTMLElement } dom - dom node to parse
	 * @param   { Array } attrs - array of attributes
	 * @param   { Function } fn - callback to exec on any iteration
	 */
	function parseAttributes(dom, attrs, fn) {
	  var this$1 = this;

	  each(attrs, function (attr) {
	    var name = attr.name, bool = isBoolAttr(name), expr;

	    if (contains(REF_DIRECTIVES, name)) {
	      expr =  Object.create(RefExpr).init(dom, this$1, name, attr.value);
	    } else if (tmpl.hasExpr(attr.value)) {
	      expr = {dom: dom, expr: attr.value, attr: attr.name, bool: bool};
	    }

	    fn(attr, expr);
	  });
	}

	/*
	  Includes hacks needed for the Internet Explorer version 9 and below
	  See: http://kangax.github.io/compat-table/es5/#ie8
	       http://codeplanet.io/dropping-ie8/
	*/

	var reHasYield  = /<yield\b/i;
	var reYieldAll  = /<yield\s*(?:\/>|>([\S\s]*?)<\/yield\s*>|>)/ig;
	var reYieldSrc  = /<yield\s+to=['"]([^'">]*)['"]\s*>([\S\s]*?)<\/yield\s*>/ig;
	var reYieldDest = /<yield\s+from=['"]?([-\w]+)['"]?\s*(?:\/>|>([\S\s]*?)<\/yield\s*>)/ig;
	var rootEls = { tr: 'tbody', th: 'tr', td: 'tr', col: 'colgroup' };
	var tblTags = IE_VERSION && IE_VERSION < 10 ? RE_SPECIAL_TAGS : RE_SPECIAL_TAGS_NO_OPTION;
	var GENERIC = 'div';


	/*
	  Creates the root element for table or select child elements:
	  tr/th/td/thead/tfoot/tbody/caption/col/colgroup/option/optgroup
	*/
	function specialTags(el, tmpl, tagName) {

	  var
	    select = tagName[0] === 'o',
	    parent = select ? 'select>' : 'table>';

	  // trim() is important here, this ensures we don't have artifacts,
	  // so we can check if we have only one element inside the parent
	  el.innerHTML = '<' + parent + tmpl.trim() + '</' + parent;
	  parent = el.firstChild;

	  // returns the immediate parent if tr/th/td/col is the only element, if not
	  // returns the whole tree, as this can include additional elements
	  /* istanbul ignore next */
	  if (select) {
	    parent.selectedIndex = -1;  // for IE9, compatible w/current riot behavior
	  } else {
	    // avoids insertion of cointainer inside container (ex: tbody inside tbody)
	    var tname = rootEls[tagName];
	    if (tname && parent.childElementCount === 1) { parent = $(tname, parent); }
	  }
	  return parent
	}

	/*
	  Replace the yield tag from any tag template with the innerHTML of the
	  original tag in the page
	*/
	function replaceYield(tmpl, html) {
	  // do nothing if no yield
	  if (!reHasYield.test(tmpl)) { return tmpl }

	  // be careful with #1343 - string on the source having `$1`
	  var src = {};

	  html = html && html.replace(reYieldSrc, function (_, ref, text) {
	    src[ref] = src[ref] || text;   // preserve first definition
	    return ''
	  }).trim();

	  return tmpl
	    .replace(reYieldDest, function (_, ref, def) {  // yield with from - to attrs
	      return src[ref] || def || ''
	    })
	    .replace(reYieldAll, function (_, def) {        // yield without any "from"
	      return html || def || ''
	    })
	}

	/**
	 * Creates a DOM element to wrap the given content. Normally an `DIV`, but can be
	 * also a `TABLE`, `SELECT`, `TBODY`, `TR`, or `COLGROUP` element.
	 *
	 * @param   { String } tmpl  - The template coming from the custom tag definition
	 * @param   { String } html - HTML content that comes from the DOM element where you
	 *           will mount the tag, mostly the original tag in the page
	 * @returns { HTMLElement } DOM element with _tmpl_ merged through `YIELD` with the _html_.
	 */
	function mkdom(tmpl, html) {
	  var match   = tmpl && tmpl.match(/^\s*<([-\w]+)/),
	    tagName = match && match[1].toLowerCase(),
	    el = mkEl(GENERIC);

	  // replace all the yield tags with the tag inner html
	  tmpl = replaceYield(tmpl, html);

	  /* istanbul ignore next */
	  if (tblTags.test(tagName))
	    { el = specialTags(el, tmpl, tagName); }
	  else
	    { setInnerHTML(el, tmpl); }

	  return el
	}

	/**
	 * Another way to create a riot tag a bit more es6 friendly
	 * @param { HTMLElement } el - tag DOM selector or DOM node/s
	 * @param { Object } opts - tag logic
	 * @returns { Tag } new riot tag instance
	 */
	function Tag$2(el, opts) {
	  // get the tag properties from the class constructor
	  var ref = this;
	  var name = ref.name;
	  var tmpl = ref.tmpl;
	  var css = ref.css;
	  var attrs = ref.attrs;
	  var onCreate = ref.onCreate;
	  // register a new tag and cache the class prototype
	  if (!__TAG_IMPL[name]) {
	    tag$1(name, tmpl, css, attrs, onCreate);
	    // cache the class constructor
	    __TAG_IMPL[name].class = this.constructor;
	  }

	  // mount the tag using the class instance
	  mountTo(el, name, opts, this);
	  // inject the component css
	  if (css) { styleManager.inject(); }

	  return this
	}

	/**
	 * Create a new riot tag implementation
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   tmpl - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	function tag$1(name, tmpl, css, attrs, fn) {
	  if (isFunction(attrs)) {
	    fn = attrs;

	    if (/^[\w\-]+\s?=/.test(css)) {
	      attrs = css;
	      css = '';
	    } else
	      { attrs = ''; }
	  }

	  if (css) {
	    if (isFunction(css))
	      { fn = css; }
	    else
	      { styleManager.add(css); }
	  }

	  name = name.toLowerCase();
	  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

	  return name
	}

	/**
	 * Create a new riot tag implementation (for use by the compiler)
	 * @param   { String }   name - name/id of the new riot tag
	 * @param   { String }   tmpl - tag template
	 * @param   { String }   css - custom tag css
	 * @param   { String }   attrs - root tag attributes
	 * @param   { Function } fn - user function
	 * @returns { String } name/id of the tag just created
	 */
	function tag2$1(name, tmpl, css, attrs, fn) {
	  if (css) { styleManager.add(css, name); }

	  __TAG_IMPL[name] = { name: name, tmpl: tmpl, attrs: attrs, fn: fn };

	  return name
	}

	/**
	 * Mount a tag using a specific tag implementation
	 * @param   { * } selector - tag DOM selector or DOM node/s
	 * @param   { String } tagName - tag implementation name
	 * @param   { Object } opts - tag logic
	 * @returns { Array } new tags instances
	 */
	function mount$1(selector, tagName, opts) {
	  var tags = [];

	  function pushTagsTo(root) {
	    if (root.tagName) {
	      var riotTag = getAttr(root, IS_DIRECTIVE);

	      // have tagName? force riot-tag to be the same
	      if (tagName && riotTag !== tagName) {
	        riotTag = tagName;
	        setAttr(root, IS_DIRECTIVE, tagName);
	      }

	      var tag = mountTo(root, riotTag || root.tagName.toLowerCase(), opts);

	      if (tag)
	        { tags.push(tag); }
	    } else if (root.length)
	      { each(root, pushTagsTo); } // assume nodeList
	  }

	  // inject styles into DOM
	  styleManager.inject();

	  if (isObject(tagName)) {
	    opts = tagName;
	    tagName = 0;
	  }

	  var elem;
	  var allTags;

	  // crawl the DOM to find the tag
	  if (isString(selector)) {
	    selector = selector === '*' ?
	      // select all registered tags
	      // & tags found with the riot-tag attribute set
	      allTags = selectTags() :
	      // or just the ones named like the selector
	      selector + selectTags(selector.split(/, */));

	    // make sure to pass always a selector
	    // to the querySelectorAll function
	    elem = selector ? $$(selector) : [];
	  }
	  else
	    // probably you have passed already a tag or a NodeList
	    { elem = selector; }

	  // select all the registered and mount them inside their root elements
	  if (tagName === '*') {
	    // get all custom tags
	    tagName = allTags || selectTags();
	    // if the root els it's just a single tag
	    if (elem.tagName)
	      { elem = $$(tagName, elem); }
	    else {
	      // select all the children for all the different root elements
	      var nodeList = [];

	      each(elem, function (_el) { return nodeList.push($$(tagName, _el)); });

	      elem = nodeList;
	    }
	    // get rid of the tagName
	    tagName = 0;
	  }

	  pushTagsTo(elem);

	  return tags
	}

	// Create a mixin that could be globally shared across all the tags
	var mixins = {};
	var globals = mixins[GLOBAL_MIXIN] = {};
	var mixins_id = 0;

	/**
	 * Create/Return a mixin by its name
	 * @param   { String }  name - mixin name (global mixin if object)
	 * @param   { Object }  mix - mixin logic
	 * @param   { Boolean } g - is global?
	 * @returns { Object }  the mixin logic
	 */
	function mixin$1(name, mix, g) {
	  // Unnamed global
	  if (isObject(name)) {
	    mixin$1(("__unnamed_" + (mixins_id++)), name, true);
	    return
	  }

	  var store = g ? globals : mixins;

	  // Getter
	  if (!mix) {
	    if (isUndefined(store[name]))
	      { throw new Error('Unregistered mixin: ' + name) }

	    return store[name]
	  }

	  // Setter
	  store[name] = isFunction(mix) ?
	    extend(mix.prototype, store[name] || {}) && mix :
	    extend(store[name] || {}, mix);
	}

	/**
	 * Update all the tags instances created
	 * @returns { Array } all the tags instances
	 */
	function update$1() {
	  return each(__TAGS_CACHE, function (tag) { return tag.update(); })
	}

	function unregister$1(name) {
	  delete __TAG_IMPL[name];
	}

	var version = 'v3.3.2';


	var core = Object.freeze({
		Tag: Tag$2,
		tag: tag$1,
		tag2: tag2$1,
		mount: mount$1,
		mixin: mixin$1,
		update: update$1,
		unregister: unregister$1,
		version: version
	});

	// counter to give a unique id to all the Tag instances
	var __uid = 0;

	/**
	 * We need to update opts for this tag. That requires updating the expressions
	 * in any attributes on the tag, and then copying the result onto opts.
	 * @this Tag
	 * @param   {Boolean} isLoop - is it a loop tag?
	 * @param   { Tag }  parent - parent tag node
	 * @param   { Boolean }  isAnonymous - is it a tag without any impl? (a tag not registered)
	 * @param   { Object }  opts - tag options
	 * @param   { Array }  instAttrs - tag attributes array
	 */
	function updateOpts(isLoop, parent, isAnonymous, opts, instAttrs) {
	  // isAnonymous `each` tags treat `dom` and `root` differently. In this case
	  // (and only this case) we don't need to do updateOpts, because the regular parse
	  // will update those attrs. Plus, isAnonymous tags don't need opts anyway
	  if (isLoop && isAnonymous) { return }

	  var ctx = !isAnonymous && isLoop ? this : parent || this;
	  each(instAttrs, function (attr) {
	    if (attr.expr) { updateAllExpressions.call(ctx, [attr.expr]); }
	    opts[toCamel(attr.name)] = attr.expr ? attr.expr.value : attr.value;
	  });
	}


	/**
	 * Tag class
	 * @constructor
	 * @param { Object } impl - it contains the tag template, and logic
	 * @param { Object } conf - tag options
	 * @param { String } innerHTML - html that eventually we need to inject in the tag
	 */
	function Tag$1(impl, conf, innerHTML) {
	  if ( impl === void 0 ) impl = {};
	  if ( conf === void 0 ) conf = {};


	  var opts = extend({}, conf.opts),
	    parent = conf.parent,
	    isLoop = conf.isLoop,
	    isAnonymous = !!conf.isAnonymous,
	    skipAnonymous = settings$1.skipAnonymousTags && isAnonymous,
	    item = cleanUpData(conf.item),
	    index = conf.index, // available only for the looped nodes
	    instAttrs = [], // All attributes on the Tag when it's first parsed
	    implAttrs = [], // expressions on this type of Tag
	    expressions = [],
	    root = conf.root,
	    tagName = conf.tagName || getTagName(root),
	    isVirtual = tagName === 'virtual',
	    propsInSyncWithParent = [],
	    dom;

	  // make this tag observable
	  if (!skipAnonymous) { observable$1(this); }
	  // only call unmount if we have a valid __TAG_IMPL (has name property)
	  if (impl.name && root._tag) { root._tag.unmount(true); }

	  // not yet mounted
	  this.isMounted = false;

	  defineProperty(this, '__', {
	    isAnonymous: isAnonymous,
	    instAttrs: instAttrs,
	    innerHTML: innerHTML,
	    tagName: tagName,
	    index: index,
	    isLoop: isLoop,
	    // these vars will be needed only for the virtual tags
	    virts: [],
	    tail: null,
	    head: null,
	    parent: null,
	    item: null
	  });

	  // create a unique id to this tag
	  // it could be handy to use it also to improve the virtual dom rendering speed
	  defineProperty(this, '_riot_id', ++__uid); // base 1 allows test !t._riot_id
	  defineProperty(this, 'root', root);
	  extend(this, { opts: opts }, item);
	  // protect the "tags" and "refs" property from being overridden
	  defineProperty(this, 'parent', parent || null);
	  defineProperty(this, 'tags', {});
	  defineProperty(this, 'refs', {});

	  dom = isLoop && isAnonymous ? root : mkdom(impl.tmpl, innerHTML, isLoop);

	  /**
	   * Update the tag expressions and options
	   * @param   { * }  data - data we want to use to extend the tag properties
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'update', function tagUpdate(data) {
	    var nextOpts = {},
	      canTrigger = this.isMounted && !skipAnonymous;

	    // make sure the data passed will not override
	    // the component core methods
	    data = cleanUpData(data);
	    extend(this, data);
	    updateOpts.apply(this, [isLoop, parent, isAnonymous, nextOpts, instAttrs]);
	    if (this.isMounted && isFunction(this.shouldUpdate) && !this.shouldUpdate(data, nextOpts)) { return this }

	    // inherit properties from the parent, but only for isAnonymous tags
	    if (isLoop && isAnonymous) { inheritFrom.apply(this, [this.parent, propsInSyncWithParent]); }
	    extend(opts, nextOpts);
	    if (canTrigger) { this.trigger('update', data); }
	    updateAllExpressions.call(this, expressions);
	    if (canTrigger) { this.trigger('updated'); }

	    return this

	  }.bind(this));

	  /**
	   * Add a mixin to this tag
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'mixin', function tagMixin() {
	    var this$1 = this;

	    each(arguments, function (mix) {
	      var instance, obj;
	      var props = [];

	      // properties blacklisted and will not be bound to the tag instance
	      var propsBlacklist = ['init', '__proto__'];

	      mix = isString(mix) ? mixin$1(mix) : mix;

	      // check if the mixin is a function
	      if (isFunction(mix)) {
	        // create the new mixin instance
	        instance = new mix();
	      } else { instance = mix; }

	      var proto = Object.getPrototypeOf(instance);

	      // build multilevel prototype inheritance chain property list
	      do { props = props.concat(Object.getOwnPropertyNames(obj || instance)); }
	      while (obj = Object.getPrototypeOf(obj || instance))

	      // loop the keys in the function prototype or the all object keys
	      each(props, function (key) {
	        // bind methods to this
	        // allow mixins to override other properties/parent mixins
	        if (!contains(propsBlacklist, key)) {
	          // check for getters/setters
	          var descriptor = Object.getOwnPropertyDescriptor(instance, key) || Object.getOwnPropertyDescriptor(proto, key);
	          var hasGetterSetter = descriptor && (descriptor.get || descriptor.set);

	          // apply method only if it does not already exist on the instance
	          if (!this$1.hasOwnProperty(key) && hasGetterSetter) {
	            Object.defineProperty(this$1, key, descriptor);
	          } else {
	            this$1[key] = isFunction(instance[key]) ?
	              instance[key].bind(this$1) :
	              instance[key];
	          }
	        }
	      });

	      // init method will be called automatically
	      if (instance.init)
	        { instance.init.bind(this$1)(); }
	    });
	    return this
	  }.bind(this));

	  /**
	   * Mount the current tag instance
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'mount', function tagMount() {
	    var this$1 = this;

	    root._tag = this; // keep a reference to the tag just created

	    // Read all the attrs on this instance. This give us the info we need for updateOpts
	    parseAttributes.apply(parent, [root, root.attributes, function (attr, expr) {
	      if (!isAnonymous && RefExpr.isPrototypeOf(expr)) { expr.tag = this$1; }
	      attr.expr = expr;
	      instAttrs.push(attr);
	    }]);

	    // update the root adding custom attributes coming from the compiler
	    implAttrs = [];
	    walkAttrs(impl.attrs, function (k, v) { implAttrs.push({name: k, value: v}); });
	    parseAttributes.apply(this, [root, implAttrs, function (attr, expr) {
	      if (expr) { expressions.push(expr); }
	      else { setAttr(root, attr.name, attr.value); }
	    }]);

	    // initialiation
	    updateOpts.apply(this, [isLoop, parent, isAnonymous, opts, instAttrs]);

	    // add global mixins
	    var globalMixin = mixin$1(GLOBAL_MIXIN);

	    if (globalMixin && !skipAnonymous) {
	      for (var i in globalMixin) {
	        if (globalMixin.hasOwnProperty(i)) {
	          this$1.mixin(globalMixin[i]);
	        }
	      }
	    }

	    if (impl.fn) { impl.fn.call(this, opts); }

	    if (!skipAnonymous) { this.trigger('before-mount'); }

	    // parse layout after init. fn may calculate args for nested custom tags
	    parseExpressions.apply(this, [dom, expressions, isAnonymous]);

	    this.update(item);

	    if (!isAnonymous) {
	      while (dom.firstChild) { root.appendChild(dom.firstChild); }
	    }

	    defineProperty(this, 'root', root);
	    defineProperty(this, 'isMounted', true);

	    if (skipAnonymous) { return }

	    // if it's not a child tag we can trigger its mount event
	    if (!this.parent) {
	      this.trigger('mount');
	    }
	    // otherwise we need to wait that the parent "mount" or "updated" event gets triggered
	    else {
	      var p = getImmediateCustomParentTag(this.parent);
	      p.one(!p.isMounted ? 'mount' : 'updated', function () {
	        this$1.trigger('mount');
	      });
	    }

	    return this

	  }.bind(this));

	  /**
	   * Unmount the tag instance
	   * @param { Boolean } mustKeepRoot - if it's true the root node will not be removed
	   * @returns { Tag } the current tag instance
	   */
	  defineProperty(this, 'unmount', function tagUnmount(mustKeepRoot) {
	    var this$1 = this;

	    var el = this.root,
	      p = el.parentNode,
	      ptag,
	      tagIndex = __TAGS_CACHE.indexOf(this);

	    if (!skipAnonymous) { this.trigger('before-unmount'); }

	    // clear all attributes coming from the mounted tag
	    walkAttrs(impl.attrs, function (name) {
	      if (startsWith(name, ATTRS_PREFIX))
	        { name = name.slice(ATTRS_PREFIX.length); }
	      remAttr(root, name);
	    });

	    // remove this tag instance from the global virtualDom variable
	    if (tagIndex !== -1)
	      { __TAGS_CACHE.splice(tagIndex, 1); }

	    if (p || isVirtual) {
	      if (parent) {
	        ptag = getImmediateCustomParentTag(parent);

	        if (isVirtual) {
	          Object.keys(this.tags).forEach(function (tagName) {
	            arrayishRemove(ptag.tags, tagName, this$1.tags[tagName]);
	          });
	        } else {
	          arrayishRemove(ptag.tags, tagName, this);
	          if(parent !== ptag) // remove from _parent too
	            { arrayishRemove(parent.tags, tagName, this); }
	        }
	      } else {
	        while (el.firstChild) { el.removeChild(el.firstChild); }
	      }

	      if (p)
	        { if (!mustKeepRoot) {
	          p.removeChild(el);
	        } else {
	          // the riot-tag and the data-is attributes aren't needed anymore, remove them
	          remAttr(p, IS_DIRECTIVE);
	        } }
	    }

	    if (this.__.virts) {
	      each(this.__.virts, function (v) {
	        if (v.parentNode) { v.parentNode.removeChild(v); }
	      });
	    }

	    // allow expressions to unmount themselves
	    unmountAll(expressions);
	    each(instAttrs, function (a) { return a.expr && a.expr.unmount && a.expr.unmount(); });

	    // custom internal unmount function to avoid relying on the observable
	    if (this.__.onUnmount) { this.__.onUnmount(); }

	    if (!skipAnonymous) {
	      this.trigger('unmount');
	      this.off('*');
	    }

	    defineProperty(this, 'isMounted', false);

	    delete this.root._tag;

	    return this

	  }.bind(this));
	}

	/**
	 * Detect the tag implementation by a DOM node
	 * @param   { Object } dom - DOM node we need to parse to get its tag implementation
	 * @returns { Object } it returns an object containing the implementation of a custom tag (template and boot function)
	 */
	function getTag(dom) {
	  return dom.tagName && __TAG_IMPL[getAttr(dom, IS_DIRECTIVE) ||
	    getAttr(dom, IS_DIRECTIVE) || dom.tagName.toLowerCase()]
	}

	/**
	 * Inherit properties from a target tag instance
	 * @this Tag
	 * @param   { Tag } target - tag where we will inherit properties
	 * @param   { Array } propsInSyncWithParent - array of properties to sync with the target
	 */
	function inheritFrom(target, propsInSyncWithParent) {
	  var this$1 = this;

	  each(Object.keys(target), function (k) {
	    // some properties must be always in sync with the parent tag
	    var mustSync = !isReservedName(k) && contains(propsInSyncWithParent, k);

	    if (isUndefined(this$1[k]) || mustSync) {
	      // track the property to keep in sync
	      // so we can keep it updated
	      if (!mustSync) { propsInSyncWithParent.push(k); }
	      this$1[k] = target[k];
	    }
	  });
	}

	/**
	 * Move the position of a custom tag in its parent tag
	 * @this Tag
	 * @param   { String } tagName - key where the tag was stored
	 * @param   { Number } newPos - index where the new tag will be stored
	 */
	function moveChildTag(tagName, newPos) {
	  var parent = this.parent,
	    tags;
	  // no parent no move
	  if (!parent) { return }

	  tags = parent.tags[tagName];

	  if (isArray(tags))
	    { tags.splice(newPos, 0, tags.splice(tags.indexOf(this), 1)[0]); }
	  else { arrayishAdd(parent.tags, tagName, this); }
	}

	/**
	 * Create a new child tag including it correctly into its parent
	 * @param   { Object } child - child tag implementation
	 * @param   { Object } opts - tag options containing the DOM node where the tag will be mounted
	 * @param   { String } innerHTML - inner html of the child node
	 * @param   { Object } parent - instance of the parent tag including the child custom tag
	 * @returns { Object } instance of the new child tag just created
	 */
	function initChildTag(child, opts, innerHTML, parent) {
	  var tag = new Tag$1(child, opts, innerHTML),
	    tagName = opts.tagName || getTagName(opts.root, true),
	    ptag = getImmediateCustomParentTag(parent);
	  // fix for the parent attribute in the looped elements
	  defineProperty(tag, 'parent', ptag);
	  // store the real parent tag
	  // in some cases this could be different from the custom parent tag
	  // for example in nested loops
	  tag.__.parent = parent;

	  // add this tag to the custom parent tag
	  arrayishAdd(ptag.tags, tagName, tag);

	  // and also to the real parent tag
	  if (ptag !== parent)
	    { arrayishAdd(parent.tags, tagName, tag); }

	  // empty the child node once we got its template
	  // to avoid that its children get compiled multiple times
	  opts.root.innerHTML = '';

	  return tag
	}

	/**
	 * Loop backward all the parents tree to detect the first custom parent tag
	 * @param   { Object } tag - a Tag instance
	 * @returns { Object } the instance of the first custom parent tag found
	 */
	function getImmediateCustomParentTag(tag) {
	  var ptag = tag;
	  while (ptag.__.isAnonymous) {
	    if (!ptag.parent) { break }
	    ptag = ptag.parent;
	  }
	  return ptag
	}

	/**
	 * Trigger the unmount method on all the expressions
	 * @param   { Array } expressions - DOM expressions
	 */
	function unmountAll(expressions) {
	  each(expressions, function(expr) {
	    if (expr instanceof Tag$1) { expr.unmount(true); }
	    else if (expr.unmount) { expr.unmount(); }
	  });
	}

	/**
	 * Get the tag name of any DOM node
	 * @param   { Object } dom - DOM node we want to parse
	 * @param   { Boolean } skipDataIs - hack to ignore the data-is attribute when attaching to parent
	 * @returns { String } name to identify this dom node in riot
	 */
	function getTagName(dom, skipDataIs) {
	  var child = getTag(dom),
	    namedTag = !skipDataIs && getAttr(dom, IS_DIRECTIVE);
	  return namedTag && !tmpl.hasExpr(namedTag) ?
	                namedTag :
	              child ? child.name : dom.tagName.toLowerCase()
	}

	/**
	 * With this function we avoid that the internal Tag methods get overridden
	 * @param   { Object } data - options we want to use to extend the tag instance
	 * @returns { Object } clean object without containing the riot internal reserved words
	 */
	function cleanUpData(data) {
	  if (!(data instanceof Tag$1) && !(data && isFunction(data.trigger)))
	    { return data }

	  var o = {};
	  for (var key in data) {
	    if (!RE_RESERVED_NAMES.test(key)) { o[key] = data[key]; }
	  }
	  return o
	}

	/**
	 * Set the property of an object for a given key. If something already
	 * exists there, then it becomes an array containing both the old and new value.
	 * @param { Object } obj - object on which to set the property
	 * @param { String } key - property name
	 * @param { Object } value - the value of the property to be set
	 * @param { Boolean } ensureArray - ensure that the property remains an array
	 * @param { Number } index - add the new item in a certain array position
	 */
	function arrayishAdd(obj, key, value, ensureArray, index) {
	  var dest = obj[key];
	  var isArr = isArray(dest);
	  var hasIndex = !isUndefined(index);

	  if (dest && dest === value) { return }

	  // if the key was never set, set it once
	  if (!dest && ensureArray) { obj[key] = [value]; }
	  else if (!dest) { obj[key] = value; }
	  // if it was an array and not yet set
	  else {
	    if (isArr) {
	      var oldIndex = dest.indexOf(value);
	      // this item never changed its position
	      if (oldIndex === index) { return }
	      // remove the item from its old position
	      if (oldIndex !== -1) { dest.splice(oldIndex, 1); }
	      // move or add the item
	      if (hasIndex) {
	        dest.splice(index, 0, value);
	      } else {
	        dest.push(value);
	      }
	    } else { obj[key] = [dest, value]; }
	  }
	}

	/**
	 * Removes an item from an object at a given key. If the key points to an array,
	 * then the item is just removed from the array.
	 * @param { Object } obj - object on which to remove the property
	 * @param { String } key - property name
	 * @param { Object } value - the value of the property to be removed
	 * @param { Boolean } ensureArray - ensure that the property remains an array
	*/
	function arrayishRemove(obj, key, value, ensureArray) {
	  if (isArray(obj[key])) {
	    var index = obj[key].indexOf(value);
	    if (index !== -1) { obj[key].splice(index, 1); }
	    if (!obj[key].length) { delete obj[key]; }
	    else if (obj[key].length === 1 && !ensureArray) { obj[key] = obj[key][0]; }
	  } else
	    { delete obj[key]; } // otherwise just delete the key
	}

	/**
	 * Mount a tag creating new Tag instance
	 * @param   { Object } root - dom node where the tag will be mounted
	 * @param   { String } tagName - name of the riot tag we want to mount
	 * @param   { Object } opts - options to pass to the Tag instance
	 * @param   { Object } ctx - optional context that will be used to extend an existing class ( used in riot.Tag )
	 * @returns { Tag } a new Tag instance
	 */
	function mountTo(root, tagName, opts, ctx) {
	  var impl = __TAG_IMPL[tagName],
	    implClass = __TAG_IMPL[tagName].class,
	    tag = ctx || (implClass ? Object.create(implClass.prototype) : {}),
	    // cache the inner HTML to fix #855
	    innerHTML = root._innerHTML = root._innerHTML || root.innerHTML;

	  // clear the inner html
	  root.innerHTML = '';

	  var conf = extend({ root: root, opts: opts }, { parent: opts ? opts.parent : null });

	  if (impl && root) { Tag$1.apply(tag, [impl, conf, innerHTML]); }

	  if (tag && tag.mount) {
	    tag.mount(true);
	    // add this tag to the virtualDom variable
	    if (!contains(__TAGS_CACHE, tag)) { __TAGS_CACHE.push(tag); }
	  }

	  return tag
	}

	/**
	 * makes a tag virtual and replaces a reference in the dom
	 * @this Tag
	 * @param { tag } the tag to make virtual
	 * @param { ref } the dom reference location
	 */
	function makeReplaceVirtual(tag, ref) {
	  var frag = createFrag();
	  makeVirtual.call(tag, frag);
	  ref.parentNode.replaceChild(frag, ref);
	}

	/**
	 * Adds the elements for a virtual tag
	 * @this Tag
	 * @param { Node } src - the node that will do the inserting or appending
	 * @param { Tag } target - only if inserting, insert before this tag's first child
	 */
	function makeVirtual(src, target) {
	  var this$1 = this;

	  var head = createDOMPlaceholder(),
	    tail = createDOMPlaceholder(),
	    frag = createFrag(),
	    sib, el;

	  this.root.insertBefore(head, this.root.firstChild);
	  this.root.appendChild(tail);

	  this.__.head = el = head;
	  this.__.tail = tail;

	  while (el) {
	    sib = el.nextSibling;
	    frag.appendChild(el);
	    this$1.__.virts.push(el); // hold for unmounting
	    el = sib;
	  }

	  if (target)
	    { src.insertBefore(frag, target.__.head); }
	  else
	    { src.appendChild(frag); }
	}

	/**
	 * Move virtual tag and all child nodes
	 * @this Tag
	 * @param { Node } src  - the node that will do the inserting
	 * @param { Tag } target - insert before this tag's first child
	 */
	function moveVirtual(src, target) {
	  var this$1 = this;

	  var el = this.__.head,
	    frag = createFrag(),
	    sib;

	  while (el) {
	    sib = el.nextSibling;
	    frag.appendChild(el);
	    el = sib;
	    if (el === this$1.__.tail) {
	      frag.appendChild(el);
	      src.insertBefore(frag, target.__.head);
	      break
	    }
	  }
	}

	/**
	 * Get selectors for tags
	 * @param   { Array } tags - tag names to select
	 * @returns { String } selector
	 */
	function selectTags(tags) {
	  // select all tags
	  if (!tags) {
	    var keys = Object.keys(__TAG_IMPL);
	    return keys + selectTags(keys)
	  }

	  return tags
	    .filter(function (t) { return !/[^-\w]/.test(t); })
	    .reduce(function (list, t) {
	      var name = t.trim().toLowerCase();
	      return list + ",[" + IS_DIRECTIVE + "=\"" + name + "\"]"
	    }, '')
	}


	var tags = Object.freeze({
		getTag: getTag,
		inheritFrom: inheritFrom,
		moveChildTag: moveChildTag,
		initChildTag: initChildTag,
		getImmediateCustomParentTag: getImmediateCustomParentTag,
		unmountAll: unmountAll,
		getTagName: getTagName,
		cleanUpData: cleanUpData,
		arrayishAdd: arrayishAdd,
		arrayishRemove: arrayishRemove,
		mountTo: mountTo,
		makeReplaceVirtual: makeReplaceVirtual,
		makeVirtual: makeVirtual,
		moveVirtual: moveVirtual,
		selectTags: selectTags
	});

	/**
	 * Riot public api
	 */
	var settings = settings$1;
	var util = {
	  tmpl: tmpl,
	  brackets: brackets,
	  styleManager: styleManager,
	  vdom: __TAGS_CACHE,
	  styleNode: styleManager.styleNode,
	  // export the riot internal utils as well
	  dom: dom,
	  check: check,
	  misc: misc,
	  tags: tags
	};

	// export the core props/methods
	var Tag$$1 = Tag$2;
	var tag$$1 = tag$1;
	var tag2$$1 = tag2$1;
	var mount$$1 = mount$1;
	var mixin$$1 = mixin$1;
	var update$$1 = update$1;
	var unregister$$1 = unregister$1;
	var observable = observable$1;

	var riot$1 = extend({}, core, {
	  observable: observable$1,
	  settings: settings,
	  util: util,
	});

	exports.settings = settings;
	exports.util = util;
	exports.Tag = Tag$$1;
	exports.tag = tag$$1;
	exports.tag2 = tag2$$1;
	exports.mount = mount$$1;
	exports.mixin = mixin$$1;
	exports.update = update$$1;
	exports.unregister = unregister$$1;
	exports.observable = observable;
	exports['default'] = riot$1;

	Object.defineProperty(exports, '__esModule', { value: true });

	})));


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _riot = __webpack_require__(1);

	var _riot2 = _interopRequireDefault(_riot);

	var _lunr = __webpack_require__(3);

	var _lunr2 = _interopRequireDefault(_lunr);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	_riot2.default.tag2('style-guide-navigation', '<li each="{sections}">\n    <a href="#{id}">{name}</a>\n   </li>', '', '', function (opts) {
	  this.sections = [];

	  this.setSections = function () {
	    this.sections = [];

	    opts.sections.map(function (section) {
	      this.sections.push({ id: section['name'].split(',')[0],
	        name: section['name'].split(',')[1] });
	    }.bind(this));
	  }.bind(this);

	  this.on('sections-updated', function () {
	    this.setSections();
	    this.update();
	  });
	});

	_riot2.default.tag2('style-guide-search', '<div class="control is-grouped">\n     <p class="control is-expanded has-icon">\n       <input class="input" type="text" onkeyup="{search}" placeholder="Search for content, elements, layout, typography...">\n       <span class="icon is-medium">\n         <i class="fa fa-search"></i>\n       </span>\n     </p>\n   </div>\n   <div class="search-results menu">\n     <ul each="{results}" class="menu-list sg-search-result">\n       <li>\n         <a href="#{id}">{name}</a>\n       </li>\n     </ul>\n   </div>', '', '', function (opts) {
	  this.results = [];

	  this.search = function (e) {
	    this.result_refs = opts.index.search(e.target.value);
	    this.results = [];

	    this.result_refs.map(function (result_ref) {
	      opts.sections.map(function (section) {
	        if (section['name'].split(',')[0] == result_ref.ref) {
	          this.results.push({ id: section['name'].split(',')[0],
	            name: section['name'].split(',')[1] });
	        }
	      }.bind(this));
	    }.bind(this));

	    this.update();
	  }.bind(this);
	});

	_riot2.default.tag2('style-guide', '<nav class="side-nav menu is-hidden-touch menu">\n     <ul class="menu-list">\n       <style-guide-navigation class="sg-navigation" sections="{sections}"></style-guide-navigation>\n     </ul>\n   </nav>\n   <main class="main section">\n     <div class="container">\n       <style-guide-sections class="sg-sections">\n         <style-guide-search class="search" index="{index}" sections="{sections}"></style-guide-search>\n         <section each="{sections}" id="{name.split(\',\')[0]}" class="section">\n           <div class="columns">\n             <div class="column is-three-quarters-desktop is-12-tablet">\n               <div class="content">\n                 <h2 class="title is-2">{name.split(\',\')[1]}</h2>\n                 <p>{description}</p>\n                 <div class="sg-html-example">\n                   <p>Raw HMTL</p>{raw_html}\n                 </div>\n                 <div class="sg-html-example">\n                   <p>Cooked HTML</p>{cooked_html}\n                 </div>\n                 <div class="sg-css-example">\n                   <p>Rule Set CSS</p>{rule_set}\n                 </div>\n               </div>\n             </div>\n             <div class="column is-hidden-touch">\n               <h3>In this section</h3>\n             </div>\n           </div>\n         </section>\n       </style-guide-sections>\n     </div>\n   </main>', '', '', function (opts) {
	  this.sections = [];

	  this.resetSearchIndex = function () {
	    this.index = (0, _lunr2.default)(function () {
	      this.field('name', { boost: 10 });
	      this.field('description', { boost: 6 });
	      this.ref('id');
	    });
	  }.bind(this);

	  this.setSections = function (data) {

	    this.sections = data;

	    this.resetSearchIndex();

	    this.sections.map(function (section) {
	      this.index.add({
	        id: section['name'].split(',')[0],
	        name: section['name'].split(',')[1],
	        description: section['description']
	      });
	    }.bind(this));

	    this.update();
	    this.tags['style-guide-navigation'].trigger('sections-updated');
	  }.bind(this);

	  opts.model.on('updated', function (data) {
	    this.setSections(data);
	  }.bind(this));
	});

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
	 * lunr - http://lunrjs.com - A bit like Solr, but much smaller and not as bright - 1.0.0
	 * Copyright (C) 2017 Oliver Nightingale
	 * @license MIT
	 */

	;(function(){

	/**
	 * Convenience function for instantiating a new lunr index and configuring it
	 * with the default pipeline functions and the passed config function.
	 *
	 * When using this convenience function a new index will be created with the
	 * following functions already in the pipeline:
	 *
	 * lunr.StopWordFilter - filters out any stop words before they enter the
	 * index
	 *
	 * lunr.stemmer - stems the tokens before entering the index.
	 *
	 * Example:
	 *
	 *     var idx = lunr(function () {
	 *       this.field('title', 10)
	 *       this.field('tags', 100)
	 *       this.field('body')
	 *       
	 *       this.ref('cid')
	 *       
	 *       this.pipeline.add(function () {
	 *         // some custom pipeline function
	 *       })
	 *       
	 *     })
	 *
	 * @param {Function} config A function that will be called with the new instance
	 * of the lunr.Index as both its context and first parameter. It can be used to
	 * customize the instance of new lunr.Index.
	 * @namespace
	 * @module
	 * @returns {lunr.Index}
	 *
	 */
	var lunr = function (config) {
	  var idx = new lunr.Index

	  idx.pipeline.add(
	    lunr.trimmer,
	    lunr.stopWordFilter,
	    lunr.stemmer
	  )

	  if (config) config.call(idx, idx)

	  return idx
	}

	lunr.version = "1.0.0"
	/*!
	 * lunr.utils
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * A namespace containing utils for the rest of the lunr library
	 */
	lunr.utils = {}

	/**
	 * Print a warning message to the console.
	 *
	 * @param {String} message The message to be printed.
	 * @memberOf Utils
	 */
	lunr.utils.warn = (function (global) {
	  return function (message) {
	    if (global.console && console.warn) {
	      console.warn(message)
	    }
	  }
	})(this)

	/**
	 * Convert an object to a string.
	 *
	 * In the case of `null` and `undefined` the function returns
	 * the empty string, in all other cases the result of calling
	 * `toString` on the passed object is returned.
	 *
	 * @param {Any} obj The object to convert to a string.
	 * @return {String} string representation of the passed object.
	 * @memberOf Utils
	 */
	lunr.utils.asString = function (obj) {
	  if (obj === void 0 || obj === null) {
	    return ""
	  } else {
	    return obj.toString()
	  }
	}
	/*!
	 * lunr.EventEmitter
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * lunr.EventEmitter is an event emitter for lunr. It manages adding and removing event handlers and triggering events and their handlers.
	 *
	 * @constructor
	 */
	lunr.EventEmitter = function () {
	  this.events = {}
	}

	/**
	 * Binds a handler function to a specific event(s).
	 *
	 * Can bind a single function to many different events in one call.
	 *
	 * @param {String} [eventName] The name(s) of events to bind this function to.
	 * @param {Function} fn The function to call when an event is fired.
	 * @memberOf EventEmitter
	 */
	lunr.EventEmitter.prototype.addListener = function () {
	  var args = Array.prototype.slice.call(arguments),
	      fn = args.pop(),
	      names = args

	  if (typeof fn !== "function") throw new TypeError ("last argument must be a function")

	  names.forEach(function (name) {
	    if (!this.hasHandler(name)) this.events[name] = []
	    this.events[name].push(fn)
	  }, this)
	}

	/**
	 * Removes a handler function from a specific event.
	 *
	 * @param {String} eventName The name of the event to remove this function from.
	 * @param {Function} fn The function to remove from an event.
	 * @memberOf EventEmitter
	 */
	lunr.EventEmitter.prototype.removeListener = function (name, fn) {
	  if (!this.hasHandler(name)) return

	  var fnIndex = this.events[name].indexOf(fn)
	  this.events[name].splice(fnIndex, 1)

	  if (!this.events[name].length) delete this.events[name]
	}

	/**
	 * Calls all functions bound to the given event.
	 *
	 * Additional data can be passed to the event handler as arguments to `emit`
	 * after the event name.
	 *
	 * @param {String} eventName The name of the event to emit.
	 * @memberOf EventEmitter
	 */
	lunr.EventEmitter.prototype.emit = function (name) {
	  if (!this.hasHandler(name)) return

	  var args = Array.prototype.slice.call(arguments, 1)

	  this.events[name].forEach(function (fn) {
	    fn.apply(undefined, args)
	  })
	}

	/**
	 * Checks whether a handler has ever been stored against an event.
	 *
	 * @param {String} eventName The name of the event to check.
	 * @private
	 * @memberOf EventEmitter
	 */
	lunr.EventEmitter.prototype.hasHandler = function (name) {
	  return name in this.events
	}

	/*!
	 * lunr.tokenizer
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * A function for splitting a string into tokens ready to be inserted into
	 * the search index. Uses `lunr.tokenizer.separator` to split strings, change
	 * the value of this property to change how strings are split into tokens.
	 *
	 * @module
	 * @param {String} obj The string to convert into tokens
	 * @see lunr.tokenizer.separator
	 * @returns {Array}
	 */
	lunr.tokenizer = function (obj) {
	  if (!arguments.length || obj == null || obj == undefined) return []
	  if (Array.isArray(obj)) return obj.map(function (t) { return lunr.utils.asString(t).toLowerCase() })

	  return obj.toString().trim().toLowerCase().split(lunr.tokenizer.separator)
	}

	/**
	 * The sperator used to split a string into tokens. Override this property to change the behaviour of
	 * `lunr.tokenizer` behaviour when tokenizing strings. By default this splits on whitespace and hyphens.
	 *
	 * @static
	 * @see lunr.tokenizer
	 */
	lunr.tokenizer.separator = /[\s\-]+/

	/**
	 * Loads a previously serialised tokenizer.
	 *
	 * A tokenizer function to be loaded must already be registered with lunr.tokenizer.
	 * If the serialised tokenizer has not been registered then an error will be thrown.
	 *
	 * @param {String} label The label of the serialised tokenizer.
	 * @returns {Function}
	 * @memberOf tokenizer
	 */
	lunr.tokenizer.load = function (label) {
	  var fn = this.registeredFunctions[label]

	  if (!fn) {
	    throw new Error('Cannot load un-registered function: ' + label)
	  }

	  return fn
	}

	lunr.tokenizer.label = 'default'

	lunr.tokenizer.registeredFunctions = {
	  'default': lunr.tokenizer
	}

	/**
	 * Register a tokenizer function.
	 *
	 * Functions that are used as tokenizers should be registered if they are to be used with a serialised index.
	 *
	 * Registering a function does not add it to an index, functions must still be associated with a specific index for them to be used when indexing and searching documents.
	 *
	 * @param {Function} fn The function to register.
	 * @param {String} label The label to register this function with
	 * @memberOf tokenizer
	 */
	lunr.tokenizer.registerFunction = function (fn, label) {
	  if (label in this.registeredFunctions) {
	    lunr.utils.warn('Overwriting existing tokenizer: ' + label)
	  }

	  fn.label = label
	  this.registeredFunctions[label] = fn
	}
	/*!
	 * lunr.Pipeline
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * lunr.Pipelines maintain an ordered list of functions to be applied to all
	 * tokens in documents entering the search index and queries being ran against
	 * the index.
	 *
	 * An instance of lunr.Index created with the lunr shortcut will contain a
	 * pipeline with a stop word filter and an English language stemmer. Extra
	 * functions can be added before or after either of these functions or these
	 * default functions can be removed.
	 *
	 * When run the pipeline will call each function in turn, passing a token, the
	 * index of that token in the original list of all tokens and finally a list of
	 * all the original tokens.
	 *
	 * The output of functions in the pipeline will be passed to the next function
	 * in the pipeline. To exclude a token from entering the index the function
	 * should return undefined, the rest of the pipeline will not be called with
	 * this token.
	 *
	 * For serialisation of pipelines to work, all functions used in an instance of
	 * a pipeline should be registered with lunr.Pipeline. Registered functions can
	 * then be loaded. If trying to load a serialised pipeline that uses functions
	 * that are not registered an error will be thrown.
	 *
	 * If not planning on serialising the pipeline then registering pipeline functions
	 * is not necessary.
	 *
	 * @constructor
	 */
	lunr.Pipeline = function () {
	  this._stack = []
	}

	lunr.Pipeline.registeredFunctions = {}

	/**
	 * Register a function with the pipeline.
	 *
	 * Functions that are used in the pipeline should be registered if the pipeline
	 * needs to be serialised, or a serialised pipeline needs to be loaded.
	 *
	 * Registering a function does not add it to a pipeline, functions must still be
	 * added to instances of the pipeline for them to be used when running a pipeline.
	 *
	 * @param {Function} fn The function to check for.
	 * @param {String} label The label to register this function with
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.registerFunction = function (fn, label) {
	  if (label in this.registeredFunctions) {
	    lunr.utils.warn('Overwriting existing registered function: ' + label)
	  }

	  fn.label = label
	  lunr.Pipeline.registeredFunctions[fn.label] = fn
	}

	/**
	 * Warns if the function is not registered as a Pipeline function.
	 *
	 * @param {Function} fn The function to check for.
	 * @private
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.warnIfFunctionNotRegistered = function (fn) {
	  var isRegistered = fn.label && (fn.label in this.registeredFunctions)

	  if (!isRegistered) {
	    lunr.utils.warn('Function is not registered with pipeline. This may cause problems when serialising the index.\n', fn)
	  }
	}

	/**
	 * Loads a previously serialised pipeline.
	 *
	 * All functions to be loaded must already be registered with lunr.Pipeline.
	 * If any function from the serialised data has not been registered then an
	 * error will be thrown.
	 *
	 * @param {Object} serialised The serialised pipeline to load.
	 * @returns {lunr.Pipeline}
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.load = function (serialised) {
	  var pipeline = new lunr.Pipeline

	  serialised.forEach(function (fnName) {
	    var fn = lunr.Pipeline.registeredFunctions[fnName]

	    if (fn) {
	      pipeline.add(fn)
	    } else {
	      throw new Error('Cannot load un-registered function: ' + fnName)
	    }
	  })

	  return pipeline
	}

	/**
	 * Adds new functions to the end of the pipeline.
	 *
	 * Logs a warning if the function has not been registered.
	 *
	 * @param {Function} functions Any number of functions to add to the pipeline.
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.add = function () {
	  var fns = Array.prototype.slice.call(arguments)

	  fns.forEach(function (fn) {
	    lunr.Pipeline.warnIfFunctionNotRegistered(fn)
	    this._stack.push(fn)
	  }, this)
	}

	/**
	 * Adds a single function after a function that already exists in the
	 * pipeline.
	 *
	 * Logs a warning if the function has not been registered.
	 *
	 * @param {Function} existingFn A function that already exists in the pipeline.
	 * @param {Function} newFn The new function to add to the pipeline.
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.after = function (existingFn, newFn) {
	  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

	  var pos = this._stack.indexOf(existingFn)
	  if (pos == -1) {
	    throw new Error('Cannot find existingFn')
	  }

	  pos = pos + 1
	  this._stack.splice(pos, 0, newFn)
	}

	/**
	 * Adds a single function before a function that already exists in the
	 * pipeline.
	 *
	 * Logs a warning if the function has not been registered.
	 *
	 * @param {Function} existingFn A function that already exists in the pipeline.
	 * @param {Function} newFn The new function to add to the pipeline.
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.before = function (existingFn, newFn) {
	  lunr.Pipeline.warnIfFunctionNotRegistered(newFn)

	  var pos = this._stack.indexOf(existingFn)
	  if (pos == -1) {
	    throw new Error('Cannot find existingFn')
	  }

	  this._stack.splice(pos, 0, newFn)
	}

	/**
	 * Removes a function from the pipeline.
	 *
	 * @param {Function} fn The function to remove from the pipeline.
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.remove = function (fn) {
	  var pos = this._stack.indexOf(fn)
	  if (pos == -1) {
	    return
	  }

	  this._stack.splice(pos, 1)
	}

	/**
	 * Runs the current list of functions that make up the pipeline against the
	 * passed tokens.
	 *
	 * @param {Array} tokens The tokens to run through the pipeline.
	 * @returns {Array}
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.run = function (tokens) {
	  var out = [],
	      tokenLength = tokens.length,
	      stackLength = this._stack.length

	  for (var i = 0; i < tokenLength; i++) {
	    var token = tokens[i]

	    for (var j = 0; j < stackLength; j++) {
	      token = this._stack[j](token, i, tokens)
	      if (token === void 0 || token === '') break
	    };

	    if (token !== void 0 && token !== '') out.push(token)
	  };

	  return out
	}

	/**
	 * Resets the pipeline by removing any existing processors.
	 *
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.reset = function () {
	  this._stack = []
	}

	/**
	 * Returns a representation of the pipeline ready for serialisation.
	 *
	 * Logs a warning if the function has not been registered.
	 *
	 * @returns {Array}
	 * @memberOf Pipeline
	 */
	lunr.Pipeline.prototype.toJSON = function () {
	  return this._stack.map(function (fn) {
	    lunr.Pipeline.warnIfFunctionNotRegistered(fn)

	    return fn.label
	  })
	}
	/*!
	 * lunr.Vector
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * lunr.Vectors implement vector related operations for
	 * a series of elements.
	 *
	 * @constructor
	 */
	lunr.Vector = function () {
	  this._magnitude = null
	  this.list = undefined
	  this.length = 0
	}

	/**
	 * lunr.Vector.Node is a simple struct for each node
	 * in a lunr.Vector.
	 *
	 * @private
	 * @param {Number} The index of the node in the vector.
	 * @param {Object} The data at this node in the vector.
	 * @param {lunr.Vector.Node} The node directly after this node in the vector.
	 * @constructor
	 * @memberOf Vector
	 */
	lunr.Vector.Node = function (idx, val, next) {
	  this.idx = idx
	  this.val = val
	  this.next = next
	}

	/**
	 * Inserts a new value at a position in a vector.
	 *
	 * @param {Number} The index at which to insert a value.
	 * @param {Object} The object to insert in the vector.
	 * @memberOf Vector.
	 */
	lunr.Vector.prototype.insert = function (idx, val) {
	  this._magnitude = undefined;
	  var list = this.list

	  if (!list) {
	    this.list = new lunr.Vector.Node (idx, val, list)
	    return this.length++
	  }

	  if (idx < list.idx) {
	    this.list = new lunr.Vector.Node (idx, val, list)
	    return this.length++
	  }

	  var prev = list,
	      next = list.next

	  while (next != undefined) {
	    if (idx < next.idx) {
	      prev.next = new lunr.Vector.Node (idx, val, next)
	      return this.length++
	    }

	    prev = next, next = next.next
	  }

	  prev.next = new lunr.Vector.Node (idx, val, next)
	  return this.length++
	}

	/**
	 * Calculates the magnitude of this vector.
	 *
	 * @returns {Number}
	 * @memberOf Vector
	 */
	lunr.Vector.prototype.magnitude = function () {
	  if (this._magnitude) return this._magnitude
	  var node = this.list,
	      sumOfSquares = 0,
	      val

	  while (node) {
	    val = node.val
	    sumOfSquares += val * val
	    node = node.next
	  }

	  return this._magnitude = Math.sqrt(sumOfSquares)
	}

	/**
	 * Calculates the dot product of this vector and another vector.
	 *
	 * @param {lunr.Vector} otherVector The vector to compute the dot product with.
	 * @returns {Number}
	 * @memberOf Vector
	 */
	lunr.Vector.prototype.dot = function (otherVector) {
	  var node = this.list,
	      otherNode = otherVector.list,
	      dotProduct = 0

	  while (node && otherNode) {
	    if (node.idx < otherNode.idx) {
	      node = node.next
	    } else if (node.idx > otherNode.idx) {
	      otherNode = otherNode.next
	    } else {
	      dotProduct += node.val * otherNode.val
	      node = node.next
	      otherNode = otherNode.next
	    }
	  }

	  return dotProduct
	}

	/**
	 * Calculates the cosine similarity between this vector and another
	 * vector.
	 *
	 * @param {lunr.Vector} otherVector The other vector to calculate the
	 * similarity with.
	 * @returns {Number}
	 * @memberOf Vector
	 */
	lunr.Vector.prototype.similarity = function (otherVector) {
	  return this.dot(otherVector) / (this.magnitude() * otherVector.magnitude())
	}
	/*!
	 * lunr.SortedSet
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * lunr.SortedSets are used to maintain an array of uniq values in a sorted
	 * order.
	 *
	 * @constructor
	 */
	lunr.SortedSet = function () {
	  this.length = 0
	  this.elements = []
	}

	/**
	 * Loads a previously serialised sorted set.
	 *
	 * @param {Array} serialisedData The serialised set to load.
	 * @returns {lunr.SortedSet}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.load = function (serialisedData) {
	  var set = new this

	  set.elements = serialisedData
	  set.length = serialisedData.length

	  return set
	}

	/**
	 * Inserts new items into the set in the correct position to maintain the
	 * order.
	 *
	 * @param {Object} The objects to add to this set.
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.add = function () {
	  var i, element

	  for (i = 0; i < arguments.length; i++) {
	    element = arguments[i]
	    if (~this.indexOf(element)) continue
	    this.elements.splice(this.locationFor(element), 0, element)
	  }

	  this.length = this.elements.length
	}

	/**
	 * Converts this sorted set into an array.
	 *
	 * @returns {Array}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.toArray = function () {
	  return this.elements.slice()
	}

	/**
	 * Creates a new array with the results of calling a provided function on every
	 * element in this sorted set.
	 *
	 * Delegates to Array.prototype.map and has the same signature.
	 *
	 * @param {Function} fn The function that is called on each element of the
	 * set.
	 * @param {Object} ctx An optional object that can be used as the context
	 * for the function fn.
	 * @returns {Array}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.map = function (fn, ctx) {
	  return this.elements.map(fn, ctx)
	}

	/**
	 * Executes a provided function once per sorted set element.
	 *
	 * Delegates to Array.prototype.forEach and has the same signature.
	 *
	 * @param {Function} fn The function that is called on each element of the
	 * set.
	 * @param {Object} ctx An optional object that can be used as the context
	 * @memberOf SortedSet
	 * for the function fn.
	 */
	lunr.SortedSet.prototype.forEach = function (fn, ctx) {
	  return this.elements.forEach(fn, ctx)
	}

	/**
	 * Returns the index at which a given element can be found in the
	 * sorted set, or -1 if it is not present.
	 *
	 * @param {Object} elem The object to locate in the sorted set.
	 * @returns {Number}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.indexOf = function (elem) {
	  var start = 0,
	      end = this.elements.length,
	      sectionLength = end - start,
	      pivot = start + Math.floor(sectionLength / 2),
	      pivotElem = this.elements[pivot]

	  while (sectionLength > 1) {
	    if (pivotElem === elem) return pivot

	    if (pivotElem < elem) start = pivot
	    if (pivotElem > elem) end = pivot

	    sectionLength = end - start
	    pivot = start + Math.floor(sectionLength / 2)
	    pivotElem = this.elements[pivot]
	  }

	  if (pivotElem === elem) return pivot

	  return -1
	}

	/**
	 * Returns the position within the sorted set that an element should be
	 * inserted at to maintain the current order of the set.
	 *
	 * This function assumes that the element to search for does not already exist
	 * in the sorted set.
	 *
	 * @param {Object} elem The elem to find the position for in the set
	 * @returns {Number}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.locationFor = function (elem) {
	  var start = 0,
	      end = this.elements.length,
	      sectionLength = end - start,
	      pivot = start + Math.floor(sectionLength / 2),
	      pivotElem = this.elements[pivot]

	  while (sectionLength > 1) {
	    if (pivotElem < elem) start = pivot
	    if (pivotElem > elem) end = pivot

	    sectionLength = end - start
	    pivot = start + Math.floor(sectionLength / 2)
	    pivotElem = this.elements[pivot]
	  }

	  if (pivotElem > elem) return pivot
	  if (pivotElem < elem) return pivot + 1
	}

	/**
	 * Creates a new lunr.SortedSet that contains the elements in the intersection
	 * of this set and the passed set.
	 *
	 * @param {lunr.SortedSet} otherSet The set to intersect with this set.
	 * @returns {lunr.SortedSet}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.intersect = function (otherSet) {
	  var intersectSet = new lunr.SortedSet,
	      i = 0, j = 0,
	      a_len = this.length, b_len = otherSet.length,
	      a = this.elements, b = otherSet.elements

	  while (true) {
	    if (i > a_len - 1 || j > b_len - 1) break

	    if (a[i] === b[j]) {
	      intersectSet.add(a[i])
	      i++, j++
	      continue
	    }

	    if (a[i] < b[j]) {
	      i++
	      continue
	    }

	    if (a[i] > b[j]) {
	      j++
	      continue
	    }
	  };

	  return intersectSet
	}

	/**
	 * Makes a copy of this set
	 *
	 * @returns {lunr.SortedSet}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.clone = function () {
	  var clone = new lunr.SortedSet

	  clone.elements = this.toArray()
	  clone.length = clone.elements.length

	  return clone
	}

	/**
	 * Creates a new lunr.SortedSet that contains the elements in the union
	 * of this set and the passed set.
	 *
	 * @param {lunr.SortedSet} otherSet The set to union with this set.
	 * @returns {lunr.SortedSet}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.union = function (otherSet) {
	  var longSet, shortSet, unionSet

	  if (this.length >= otherSet.length) {
	    longSet = this, shortSet = otherSet
	  } else {
	    longSet = otherSet, shortSet = this
	  }

	  unionSet = longSet.clone()

	  for(var i = 0, shortSetElements = shortSet.toArray(); i < shortSetElements.length; i++){
	    unionSet.add(shortSetElements[i])
	  }

	  return unionSet
	}

	/**
	 * Returns a representation of the sorted set ready for serialisation.
	 *
	 * @returns {Array}
	 * @memberOf SortedSet
	 */
	lunr.SortedSet.prototype.toJSON = function () {
	  return this.toArray()
	}
	/*!
	 * lunr.Index
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * lunr.Index is object that manages a search index.  It contains the indexes
	 * and stores all the tokens and document lookups.  It also provides the main
	 * user facing API for the library.
	 *
	 * @constructor
	 */
	lunr.Index = function () {
	  this._fields = []
	  this._ref = 'id'
	  this.pipeline = new lunr.Pipeline
	  this.documentStore = new lunr.Store
	  this.tokenStore = new lunr.TokenStore
	  this.corpusTokens = new lunr.SortedSet
	  this.eventEmitter =  new lunr.EventEmitter
	  this.tokenizerFn = lunr.tokenizer

	  this._idfCache = {}

	  this.on('add', 'remove', 'update', (function () {
	    this._idfCache = {}
	  }).bind(this))
	}

	/**
	 * Bind a handler to events being emitted by the index.
	 *
	 * The handler can be bound to many events at the same time.
	 *
	 * @param {String} [eventName] The name(s) of events to bind the function to.
	 * @param {Function} fn The serialised set to load.
	 * @memberOf Index
	 */
	lunr.Index.prototype.on = function () {
	  var args = Array.prototype.slice.call(arguments)
	  return this.eventEmitter.addListener.apply(this.eventEmitter, args)
	}

	/**
	 * Removes a handler from an event being emitted by the index.
	 *
	 * @param {String} eventName The name of events to remove the function from.
	 * @param {Function} fn The serialised set to load.
	 * @memberOf Index
	 */
	lunr.Index.prototype.off = function (name, fn) {
	  return this.eventEmitter.removeListener(name, fn)
	}

	/**
	 * Loads a previously serialised index.
	 *
	 * Issues a warning if the index being imported was serialised
	 * by a different version of lunr.
	 *
	 * @param {Object} serialisedData The serialised set to load.
	 * @returns {lunr.Index}
	 * @memberOf Index
	 */
	lunr.Index.load = function (serialisedData) {
	  if (serialisedData.version !== lunr.version) {
	    lunr.utils.warn('version mismatch: current ' + lunr.version + ' importing ' + serialisedData.version)
	  }

	  var idx = new this

	  idx._fields = serialisedData.fields
	  idx._ref = serialisedData.ref

	  idx.tokenizer(lunr.tokenizer.load(serialisedData.tokenizer))
	  idx.documentStore = lunr.Store.load(serialisedData.documentStore)
	  idx.tokenStore = lunr.TokenStore.load(serialisedData.tokenStore)
	  idx.corpusTokens = lunr.SortedSet.load(serialisedData.corpusTokens)
	  idx.pipeline = lunr.Pipeline.load(serialisedData.pipeline)

	  return idx
	}

	/**
	 * Adds a field to the list of fields that will be searchable within documents
	 * in the index.
	 *
	 * An optional boost param can be passed to affect how much tokens in this field
	 * rank in search results, by default the boost value is 1.
	 *
	 * Fields should be added before any documents are added to the index, fields
	 * that are added after documents are added to the index will only apply to new
	 * documents added to the index.
	 *
	 * @param {String} fieldName The name of the field within the document that
	 * should be indexed
	 * @param {Number} boost An optional boost that can be applied to terms in this
	 * field.
	 * @returns {lunr.Index}
	 * @memberOf Index
	 */
	lunr.Index.prototype.field = function (fieldName, opts) {
	  var opts = opts || {},
	      field = { name: fieldName, boost: opts.boost || 1 }

	  this._fields.push(field)
	  return this
	}

	/**
	 * Sets the property used to uniquely identify documents added to the index,
	 * by default this property is 'id'.
	 *
	 * This should only be changed before adding documents to the index, changing
	 * the ref property without resetting the index can lead to unexpected results.
	 *
	 * The value of ref can be of any type but it _must_ be stably comparable and
	 * orderable.
	 *
	 * @param {String} refName The property to use to uniquely identify the
	 * documents in the index.
	 * @param {Boolean} emitEvent Whether to emit add events, defaults to true
	 * @returns {lunr.Index}
	 * @memberOf Index
	 */
	lunr.Index.prototype.ref = function (refName) {
	  this._ref = refName
	  return this
	}

	/**
	 * Sets the tokenizer used for this index.
	 *
	 * By default the index will use the default tokenizer, lunr.tokenizer. The tokenizer
	 * should only be changed before adding documents to the index. Changing the tokenizer
	 * without re-building the index can lead to unexpected results.
	 *
	 * @param {Function} fn The function to use as a tokenizer.
	 * @returns {lunr.Index}
	 * @memberOf Index
	 */
	lunr.Index.prototype.tokenizer = function (fn) {
	  var isRegistered = fn.label && (fn.label in lunr.tokenizer.registeredFunctions)

	  if (!isRegistered) {
	    lunr.utils.warn('Function is not a registered tokenizer. This may cause problems when serialising the index')
	  }

	  this.tokenizerFn = fn
	  return this
	}

	/**
	 * Add a document to the index.
	 *
	 * This is the way new documents enter the index, this function will run the
	 * fields from the document through the index's pipeline and then add it to
	 * the index, it will then show up in search results.
	 *
	 * An 'add' event is emitted with the document that has been added and the index
	 * the document has been added to. This event can be silenced by passing false
	 * as the second argument to add.
	 *
	 * @param {Object} doc The document to add to the index.
	 * @param {Boolean} emitEvent Whether or not to emit events, default true.
	 * @memberOf Index
	 */
	lunr.Index.prototype.add = function (doc, emitEvent) {
	  var docTokens = {},
	      allDocumentTokens = new lunr.SortedSet,
	      docRef = doc[this._ref],
	      emitEvent = emitEvent === undefined ? true : emitEvent

	  this._fields.forEach(function (field) {
	    var fieldTokens = this.pipeline.run(this.tokenizerFn(doc[field.name]))

	    docTokens[field.name] = fieldTokens

	    for (var i = 0; i < fieldTokens.length; i++) {
	      var token = fieldTokens[i]
	      allDocumentTokens.add(token)
	      this.corpusTokens.add(token)
	    }
	  }, this)

	  this.documentStore.set(docRef, allDocumentTokens)

	  for (var i = 0; i < allDocumentTokens.length; i++) {
	    var token = allDocumentTokens.elements[i]
	    var tf = 0;

	    for (var j = 0; j < this._fields.length; j++){
	      var field = this._fields[j]
	      var fieldTokens = docTokens[field.name]
	      var fieldLength = fieldTokens.length

	      if (!fieldLength) continue

	      var tokenCount = 0
	      for (var k = 0; k < fieldLength; k++){
	        if (fieldTokens[k] === token){
	          tokenCount++
	        }
	      }

	      tf += (tokenCount / fieldLength * field.boost)
	    }

	    this.tokenStore.add(token, { ref: docRef, tf: tf })
	  };

	  if (emitEvent) this.eventEmitter.emit('add', doc, this)
	}

	/**
	 * Removes a document from the index.
	 *
	 * To make sure documents no longer show up in search results they can be
	 * removed from the index using this method.
	 *
	 * The document passed only needs to have the same ref property value as the
	 * document that was added to the index, they could be completely different
	 * objects.
	 *
	 * A 'remove' event is emitted with the document that has been removed and the index
	 * the document has been removed from. This event can be silenced by passing false
	 * as the second argument to remove.
	 *
	 * @param {Object} doc The document to remove from the index.
	 * @param {Boolean} emitEvent Whether to emit remove events, defaults to true
	 * @memberOf Index
	 */
	lunr.Index.prototype.remove = function (doc, emitEvent) {
	  var docRef = doc[this._ref],
	      emitEvent = emitEvent === undefined ? true : emitEvent

	  if (!this.documentStore.has(docRef)) return

	  var docTokens = this.documentStore.get(docRef)

	  this.documentStore.remove(docRef)

	  docTokens.forEach(function (token) {
	    this.tokenStore.remove(token, docRef)
	  }, this)

	  if (emitEvent) this.eventEmitter.emit('remove', doc, this)
	}

	/**
	 * Updates a document in the index.
	 *
	 * When a document contained within the index gets updated, fields changed,
	 * added or removed, to make sure it correctly matched against search queries,
	 * it should be updated in the index.
	 *
	 * This method is just a wrapper around `remove` and `add`
	 *
	 * An 'update' event is emitted with the document that has been updated and the index.
	 * This event can be silenced by passing false as the second argument to update. Only
	 * an update event will be fired, the 'add' and 'remove' events of the underlying calls
	 * are silenced.
	 *
	 * @param {Object} doc The document to update in the index.
	 * @param {Boolean} emitEvent Whether to emit update events, defaults to true
	 * @see Index.prototype.remove
	 * @see Index.prototype.add
	 * @memberOf Index
	 */
	lunr.Index.prototype.update = function (doc, emitEvent) {
	  var emitEvent = emitEvent === undefined ? true : emitEvent

	  this.remove(doc, false)
	  this.add(doc, false)

	  if (emitEvent) this.eventEmitter.emit('update', doc, this)
	}

	/**
	 * Calculates the inverse document frequency for a token within the index.
	 *
	 * @param {String} token The token to calculate the idf of.
	 * @see Index.prototype.idf
	 * @private
	 * @memberOf Index
	 */
	lunr.Index.prototype.idf = function (term) {
	  var cacheKey = "@" + term
	  if (Object.prototype.hasOwnProperty.call(this._idfCache, cacheKey)) return this._idfCache[cacheKey]

	  var documentFrequency = this.tokenStore.count(term),
	      idf = 1

	  if (documentFrequency > 0) {
	    idf = 1 + Math.log(this.documentStore.length / documentFrequency)
	  }

	  return this._idfCache[cacheKey] = idf
	}

	/**
	 * Searches the index using the passed query.
	 *
	 * Queries should be a string, multiple words are allowed and will lead to an
	 * AND based query, e.g. `idx.search('foo bar')` will run a search for
	 * documents containing both 'foo' and 'bar'.
	 *
	 * All query tokens are passed through the same pipeline that document tokens
	 * are passed through, so any language processing involved will be run on every
	 * query term.
	 *
	 * Each query term is expanded, so that the term 'he' might be expanded to
	 * 'hello' and 'help' if those terms were already included in the index.
	 *
	 * Matching documents are returned as an array of objects, each object contains
	 * the matching document ref, as set for this index, and the similarity score
	 * for this document against the query.
	 *
	 * @param {String} query The query to search the index with.
	 * @returns {Object}
	 * @see Index.prototype.idf
	 * @see Index.prototype.documentVector
	 * @memberOf Index
	 */
	lunr.Index.prototype.search = function (query) {
	  var queryTokens = this.pipeline.run(this.tokenizerFn(query)),
	      queryVector = new lunr.Vector,
	      documentSets = [],
	      fieldBoosts = this._fields.reduce(function (memo, f) { return memo + f.boost }, 0)

	  var hasSomeToken = queryTokens.some(function (token) {
	    return this.tokenStore.has(token)
	  }, this)

	  if (!hasSomeToken) return []

	  queryTokens
	    .forEach(function (token, i, tokens) {
	      var tf = 1 / tokens.length * this._fields.length * fieldBoosts,
	          self = this

	      var set = this.tokenStore.expand(token).reduce(function (memo, key) {
	        var pos = self.corpusTokens.indexOf(key),
	            idf = self.idf(key),
	            similarityBoost = 1,
	            set = new lunr.SortedSet

	        // if the expanded key is not an exact match to the token then
	        // penalise the score for this key by how different the key is
	        // to the token.
	        if (key !== token) {
	          var diff = Math.max(3, key.length - token.length)
	          similarityBoost = 1 / Math.log(diff)
	        }

	        // calculate the query tf-idf score for this token
	        // applying an similarityBoost to ensure exact matches
	        // these rank higher than expanded terms
	        if (pos > -1) queryVector.insert(pos, tf * idf * similarityBoost)

	        // add all the documents that have this key into a set
	        // ensuring that the type of key is preserved
	        var matchingDocuments = self.tokenStore.get(key),
	            refs = Object.keys(matchingDocuments),
	            refsLen = refs.length

	        for (var i = 0; i < refsLen; i++) {
	          set.add(matchingDocuments[refs[i]].ref)
	        }

	        return memo.union(set)
	      }, new lunr.SortedSet)

	      documentSets.push(set)
	    }, this)

	  var documentSet = documentSets.reduce(function (memo, set) {
	    return memo.intersect(set)
	  })

	  return documentSet
	    .map(function (ref) {
	      return { ref: ref, score: queryVector.similarity(this.documentVector(ref)) }
	    }, this)
	    .sort(function (a, b) {
	      return b.score - a.score
	    })
	}

	/**
	 * Generates a vector containing all the tokens in the document matching the
	 * passed documentRef.
	 *
	 * The vector contains the tf-idf score for each token contained in the
	 * document with the passed documentRef.  The vector will contain an element
	 * for every token in the indexes corpus, if the document does not contain that
	 * token the element will be 0.
	 *
	 * @param {Object} documentRef The ref to find the document with.
	 * @returns {lunr.Vector}
	 * @private
	 * @memberOf Index
	 */
	lunr.Index.prototype.documentVector = function (documentRef) {
	  var documentTokens = this.documentStore.get(documentRef),
	      documentTokensLength = documentTokens.length,
	      documentVector = new lunr.Vector

	  for (var i = 0; i < documentTokensLength; i++) {
	    var token = documentTokens.elements[i],
	        tf = this.tokenStore.get(token)[documentRef].tf,
	        idf = this.idf(token)

	    documentVector.insert(this.corpusTokens.indexOf(token), tf * idf)
	  };

	  return documentVector
	}

	/**
	 * Returns a representation of the index ready for serialisation.
	 *
	 * @returns {Object}
	 * @memberOf Index
	 */
	lunr.Index.prototype.toJSON = function () {
	  return {
	    version: lunr.version,
	    fields: this._fields,
	    ref: this._ref,
	    tokenizer: this.tokenizerFn.label,
	    documentStore: this.documentStore.toJSON(),
	    tokenStore: this.tokenStore.toJSON(),
	    corpusTokens: this.corpusTokens.toJSON(),
	    pipeline: this.pipeline.toJSON()
	  }
	}

	/**
	 * Applies a plugin to the current index.
	 *
	 * A plugin is a function that is called with the index as its context.
	 * Plugins can be used to customise or extend the behaviour the index
	 * in some way. A plugin is just a function, that encapsulated the custom
	 * behaviour that should be applied to the index.
	 *
	 * The plugin function will be called with the index as its argument, additional
	 * arguments can also be passed when calling use. The function will be called
	 * with the index as its context.
	 *
	 * Example:
	 *
	 *     var myPlugin = function (idx, arg1, arg2) {
	 *       // `this` is the index to be extended
	 *       // apply any extensions etc here.
	 *     }
	 *
	 *     var idx = lunr(function () {
	 *       this.use(myPlugin, 'arg1', 'arg2')
	 *     })
	 *
	 * @param {Function} plugin The plugin to apply.
	 * @memberOf Index
	 */
	lunr.Index.prototype.use = function (plugin) {
	  var args = Array.prototype.slice.call(arguments, 1)
	  args.unshift(this)
	  plugin.apply(this, args)
	}
	/*!
	 * lunr.Store
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * lunr.Store is a simple key-value store used for storing sets of tokens for
	 * documents stored in index.
	 *
	 * @constructor
	 * @module
	 */
	lunr.Store = function () {
	  this.store = {}
	  this.length = 0
	}

	/**
	 * Loads a previously serialised store
	 *
	 * @param {Object} serialisedData The serialised store to load.
	 * @returns {lunr.Store}
	 * @memberOf Store
	 */
	lunr.Store.load = function (serialisedData) {
	  var store = new this

	  store.length = serialisedData.length
	  store.store = Object.keys(serialisedData.store).reduce(function (memo, key) {
	    memo[key] = lunr.SortedSet.load(serialisedData.store[key])
	    return memo
	  }, {})

	  return store
	}

	/**
	 * Stores the given tokens in the store against the given id.
	 *
	 * @param {Object} id The key used to store the tokens against.
	 * @param {Object} tokens The tokens to store against the key.
	 * @memberOf Store
	 */
	lunr.Store.prototype.set = function (id, tokens) {
	  if (!this.has(id)) this.length++
	  this.store[id] = tokens
	}

	/**
	 * Retrieves the tokens from the store for a given key.
	 *
	 * @param {Object} id The key to lookup and retrieve from the store.
	 * @returns {Object}
	 * @memberOf Store
	 */
	lunr.Store.prototype.get = function (id) {
	  return this.store[id]
	}

	/**
	 * Checks whether the store contains a key.
	 *
	 * @param {Object} id The id to look up in the store.
	 * @returns {Boolean}
	 * @memberOf Store
	 */
	lunr.Store.prototype.has = function (id) {
	  return id in this.store
	}

	/**
	 * Removes the value for a key in the store.
	 *
	 * @param {Object} id The id to remove from the store.
	 * @memberOf Store
	 */
	lunr.Store.prototype.remove = function (id) {
	  if (!this.has(id)) return

	  delete this.store[id]
	  this.length--
	}

	/**
	 * Returns a representation of the store ready for serialisation.
	 *
	 * @returns {Object}
	 * @memberOf Store
	 */
	lunr.Store.prototype.toJSON = function () {
	  return {
	    store: this.store,
	    length: this.length
	  }
	}

	/*!
	 * lunr.stemmer
	 * Copyright (C) 2017 Oliver Nightingale
	 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
	 */

	/**
	 * lunr.stemmer is an english language stemmer, this is a JavaScript
	 * implementation of the PorterStemmer taken from http://tartarus.org/~martin
	 *
	 * @module
	 * @param {String} str The string to stem
	 * @returns {String}
	 * @see lunr.Pipeline
	 */
	lunr.stemmer = (function(){
	  var step2list = {
	      "ational" : "ate",
	      "tional" : "tion",
	      "enci" : "ence",
	      "anci" : "ance",
	      "izer" : "ize",
	      "bli" : "ble",
	      "alli" : "al",
	      "entli" : "ent",
	      "eli" : "e",
	      "ousli" : "ous",
	      "ization" : "ize",
	      "ation" : "ate",
	      "ator" : "ate",
	      "alism" : "al",
	      "iveness" : "ive",
	      "fulness" : "ful",
	      "ousness" : "ous",
	      "aliti" : "al",
	      "iviti" : "ive",
	      "biliti" : "ble",
	      "logi" : "log"
	    },

	    step3list = {
	      "icate" : "ic",
	      "ative" : "",
	      "alize" : "al",
	      "iciti" : "ic",
	      "ical" : "ic",
	      "ful" : "",
	      "ness" : ""
	    },

	    c = "[^aeiou]",          // consonant
	    v = "[aeiouy]",          // vowel
	    C = c + "[^aeiouy]*",    // consonant sequence
	    V = v + "[aeiou]*",      // vowel sequence

	    mgr0 = "^(" + C + ")?" + V + C,               // [C]VC... is m>0
	    meq1 = "^(" + C + ")?" + V + C + "(" + V + ")?$",  // [C]VC[V] is m=1
	    mgr1 = "^(" + C + ")?" + V + C + V + C,       // [C]VCVC... is m>1
	    s_v = "^(" + C + ")?" + v;                   // vowel in stem

	  var re_mgr0 = new RegExp(mgr0);
	  var re_mgr1 = new RegExp(mgr1);
	  var re_meq1 = new RegExp(meq1);
	  var re_s_v = new RegExp(s_v);

	  var re_1a = /^(.+?)(ss|i)es$/;
	  var re2_1a = /^(.+?)([^s])s$/;
	  var re_1b = /^(.+?)eed$/;
	  var re2_1b = /^(.+?)(ed|ing)$/;
	  var re_1b_2 = /.$/;
	  var re2_1b_2 = /(at|bl|iz)$/;
	  var re3_1b_2 = new RegExp("([^aeiouylsz])\\1$");
	  var re4_1b_2 = new RegExp("^" + C + v + "[^aeiouwxy]$");

	  var re_1c = /^(.+?[^aeiou])y$/;
	  var re_2 = /^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/;

	  var re_3 = /^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/;

	  var re_4 = /^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/;
	  var re2_4 = /^(.+?)(s|t)(ion)$/;

	  var re_5 = /^(.+?)e$/;
	  var re_5_1 = /ll$/;
	  var re3_5 = new RegExp("^" + C + v + "[^aeiouwxy]$");

	  var porterStemmer = function porterStemmer(w) {
	    var   stem,
	      suffix,
	      firstch,
	      re,
	      re2,
	      re3,
	      re4;

	    if (w.length < 3) { return w; }

	    firstch = w.substr(0,1);
	    if (firstch == "y") {
	      w = firstch.toUpperCase() + w.substr(1);
	    }

	    // Step 1a
	    re = re_1a
	    re2 = re2_1a;

	    if (re.test(w)) { w = w.replace(re,"$1$2"); }
	    else if (re2.test(w)) { w = w.replace(re2,"$1$2"); }

	    // Step 1b
	    re = re_1b;
	    re2 = re2_1b;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      re = re_mgr0;
	      if (re.test(fp[1])) {
	        re = re_1b_2;
	        w = w.replace(re,"");
	      }
	    } else if (re2.test(w)) {
	      var fp = re2.exec(w);
	      stem = fp[1];
	      re2 = re_s_v;
	      if (re2.test(stem)) {
	        w = stem;
	        re2 = re2_1b_2;
	        re3 = re3_1b_2;
	        re4 = re4_1b_2;
	        if (re2.test(w)) {  w = w + "e"; }
	        else if (re3.test(w)) { re = re_1b_2; w = w.replace(re,""); }
	        else if (re4.test(w)) { w = w + "e"; }
	      }
	    }

	    // Step 1c - replace suffix y or Y by i if preceded by a non-vowel which is not the first letter of the word (so cry -> cri, by -> by, say -> say)
	    re = re_1c;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      w = stem + "i";
	    }

	    // Step 2
	    re = re_2;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      suffix = fp[2];
	      re = re_mgr0;
	      if (re.test(stem)) {
	        w = stem + step2list[suffix];
	      }
	    }

	    // Step 3
	    re = re_3;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      suffix = fp[2];
	      re = re_mgr0;
	      if (re.test(stem)) {
	        w = stem + step3list[suffix];
	      }
	    }

	    // Step 4
	    re = re_4;
	    re2 = re2_4;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      re = re_mgr1;
	      if (re.test(stem)) {
	        w = stem;
	      }
	    } else if (re2.test(w)) {
	      var fp = re2.exec(w);
	      stem = fp[1] + fp[2];
	      re2 = re_mgr1;
	      if (re2.test(stem)) {
	        w = stem;
	      }
	    }

	    // Step 5
	    re = re_5;
	    if (re.test(w)) {
	      var fp = re.exec(w);
	      stem = fp[1];
	      re = re_mgr1;
	      re2 = re_meq1;
	      re3 = re3_5;
	      if (re.test(stem) || (re2.test(stem) && !(re3.test(stem)))) {
	        w = stem;
	      }
	    }

	    re = re_5_1;
	    re2 = re_mgr1;
	    if (re.test(w) && re2.test(w)) {
	      re = re_1b_2;
	      w = w.replace(re,"");
	    }

	    // and turn initial Y back to y

	    if (firstch == "y") {
	      w = firstch.toLowerCase() + w.substr(1);
	    }

	    return w;
	  };

	  return porterStemmer;
	})();

	lunr.Pipeline.registerFunction(lunr.stemmer, 'stemmer')
	/*!
	 * lunr.stopWordFilter
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * lunr.generateStopWordFilter builds a stopWordFilter function from the provided
	 * list of stop words.
	 *
	 * The built in lunr.stopWordFilter is built using this generator and can be used
	 * to generate custom stopWordFilters for applications or non English languages.
	 *
	 * @module
	 * @param {Array} token The token to pass through the filter
	 * @returns {Function}
	 * @see lunr.Pipeline
	 * @see lunr.stopWordFilter
	 */
	lunr.generateStopWordFilter = function (stopWords) {
	  var words = stopWords.reduce(function (memo, stopWord) {
	    memo[stopWord] = stopWord
	    return memo
	  }, {})

	  return function (token) {
	    if (token && words[token] !== token) return token
	  }
	}

	/**
	 * lunr.stopWordFilter is an English language stop word list filter, any words
	 * contained in the list will not be passed through the filter.
	 *
	 * This is intended to be used in the Pipeline. If the token does not pass the
	 * filter then undefined will be returned.
	 *
	 * @module
	 * @param {String} token The token to pass through the filter
	 * @returns {String}
	 * @see lunr.Pipeline
	 */
	lunr.stopWordFilter = lunr.generateStopWordFilter([
	  'a',
	  'able',
	  'about',
	  'across',
	  'after',
	  'all',
	  'almost',
	  'also',
	  'am',
	  'among',
	  'an',
	  'and',
	  'any',
	  'are',
	  'as',
	  'at',
	  'be',
	  'because',
	  'been',
	  'but',
	  'by',
	  'can',
	  'cannot',
	  'could',
	  'dear',
	  'did',
	  'do',
	  'does',
	  'either',
	  'else',
	  'ever',
	  'every',
	  'for',
	  'from',
	  'get',
	  'got',
	  'had',
	  'has',
	  'have',
	  'he',
	  'her',
	  'hers',
	  'him',
	  'his',
	  'how',
	  'however',
	  'i',
	  'if',
	  'in',
	  'into',
	  'is',
	  'it',
	  'its',
	  'just',
	  'least',
	  'let',
	  'like',
	  'likely',
	  'may',
	  'me',
	  'might',
	  'most',
	  'must',
	  'my',
	  'neither',
	  'no',
	  'nor',
	  'not',
	  'of',
	  'off',
	  'often',
	  'on',
	  'only',
	  'or',
	  'other',
	  'our',
	  'own',
	  'rather',
	  'said',
	  'say',
	  'says',
	  'she',
	  'should',
	  'since',
	  'so',
	  'some',
	  'than',
	  'that',
	  'the',
	  'their',
	  'them',
	  'then',
	  'there',
	  'these',
	  'they',
	  'this',
	  'tis',
	  'to',
	  'too',
	  'twas',
	  'us',
	  'wants',
	  'was',
	  'we',
	  'were',
	  'what',
	  'when',
	  'where',
	  'which',
	  'while',
	  'who',
	  'whom',
	  'why',
	  'will',
	  'with',
	  'would',
	  'yet',
	  'you',
	  'your'
	])

	lunr.Pipeline.registerFunction(lunr.stopWordFilter, 'stopWordFilter')
	/*!
	 * lunr.trimmer
	 * Copyright (C) 2017 Oliver Nightingale
	 */

	/**
	 * lunr.trimmer is a pipeline function for trimming non word
	 * characters from the begining and end of tokens before they
	 * enter the index.
	 *
	 * This implementation may not work correctly for non latin
	 * characters and should either be removed or adapted for use
	 * with languages with non-latin characters.
	 *
	 * @module
	 * @param {String} token The token to pass through the filter
	 * @returns {String}
	 * @see lunr.Pipeline
	 */
	lunr.trimmer = function (token) {
	  return token.replace(/^\W+/, '').replace(/\W+$/, '')
	}

	lunr.Pipeline.registerFunction(lunr.trimmer, 'trimmer')
	/*!
	 * lunr.stemmer
	 * Copyright (C) 2017 Oliver Nightingale
	 * Includes code from - http://tartarus.org/~martin/PorterStemmer/js.txt
	 */

	/**
	 * lunr.TokenStore is used for efficient storing and lookup of the reverse
	 * index of token to document ref.
	 *
	 * @constructor
	 */
	lunr.TokenStore = function () {
	  this.root = { docs: {} }
	  this.length = 0
	}

	/**
	 * Loads a previously serialised token store
	 *
	 * @param {Object} serialisedData The serialised token store to load.
	 * @returns {lunr.TokenStore}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.load = function (serialisedData) {
	  var store = new this

	  store.root = serialisedData.root
	  store.length = serialisedData.length

	  return store
	}

	/**
	 * Adds a new token doc pair to the store.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to store the doc under
	 * @param {Object} doc The doc to store against the token
	 * @param {Object} root An optional node at which to start looking for the
	 * correct place to enter the doc, by default the root of this lunr.TokenStore
	 * is used.
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.add = function (token, doc, root) {
	  var root = root || this.root,
	      key = token.charAt(0),
	      rest = token.slice(1)

	  if (!(key in root)) root[key] = {docs: {}}

	  if (rest.length === 0) {
	    root[key].docs[doc.ref] = doc
	    this.length += 1
	    return
	  } else {
	    return this.add(rest, doc, root[key])
	  }
	}

	/**
	 * Checks whether this key is contained within this lunr.TokenStore.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to check for
	 * @param {Object} root An optional node at which to start
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.has = function (token) {
	  if (!token) return false

	  var node = this.root

	  for (var i = 0; i < token.length; i++) {
	    if (!node[token.charAt(i)]) return false

	    node = node[token.charAt(i)]
	  }

	  return true
	}

	/**
	 * Retrieve a node from the token store for a given token.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to get the node for.
	 * @param {Object} root An optional node at which to start.
	 * @returns {Object}
	 * @see TokenStore.prototype.get
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.getNode = function (token) {
	  if (!token) return {}

	  var node = this.root

	  for (var i = 0; i < token.length; i++) {
	    if (!node[token.charAt(i)]) return {}

	    node = node[token.charAt(i)]
	  }

	  return node
	}

	/**
	 * Retrieve the documents for a node for the given token.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to get the documents for.
	 * @param {Object} root An optional node at which to start.
	 * @returns {Object}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.get = function (token, root) {
	  return this.getNode(token, root).docs || {}
	}

	lunr.TokenStore.prototype.count = function (token, root) {
	  return Object.keys(this.get(token, root)).length
	}

	/**
	 * Remove the document identified by ref from the token in the store.
	 *
	 * By default this function starts at the root of the current store, however
	 * it can start at any node of any token store if required.
	 *
	 * @param {String} token The token to get the documents for.
	 * @param {String} ref The ref of the document to remove from this token.
	 * @param {Object} root An optional node at which to start.
	 * @returns {Object}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.remove = function (token, ref) {
	  if (!token) return
	  var node = this.root

	  for (var i = 0; i < token.length; i++) {
	    if (!(token.charAt(i) in node)) return
	    node = node[token.charAt(i)]
	  }

	  delete node.docs[ref]
	}

	/**
	 * Find all the possible suffixes of the passed token using tokens
	 * currently in the store.
	 *
	 * @param {String} token The token to expand.
	 * @returns {Array}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.expand = function (token, memo) {
	  var root = this.getNode(token),
	      docs = root.docs || {},
	      memo = memo || []

	  if (Object.keys(docs).length) memo.push(token)

	  Object.keys(root)
	    .forEach(function (key) {
	      if (key === 'docs') return

	      memo.concat(this.expand(token + key, memo))
	    }, this)

	  return memo
	}

	/**
	 * Returns a representation of the token store ready for serialisation.
	 *
	 * @returns {Object}
	 * @memberOf TokenStore
	 */
	lunr.TokenStore.prototype.toJSON = function () {
	  return {
	    root: this.root,
	    length: this.length
	  }
	}

	  /**
	   * export the module via AMD, CommonJS or as a browser global
	   * Export code from https://github.com/umdjs/umd/blob/master/returnExports.js
	   */
	  ;(function (root, factory) {
	    if (true) {
	      // AMD. Register as an anonymous module.
	      !(__WEBPACK_AMD_DEFINE_FACTORY__ = (factory), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__))
	    } else if (typeof exports === 'object') {
	      /**
	       * Node. Does not work with strict CommonJS, but
	       * only CommonJS-like enviroments that support module.exports,
	       * like Node.
	       */
	      module.exports = factory()
	    } else {
	      // Browser globals (root is window)
	      root.lunr = factory()
	    }
	  }(this, function () {
	    /**
	     * Just return a value to define the module export.
	     * This example returns an object, but the module
	     * can return a function as the exported value.
	     */
	    return lunr
	  }))
	})();


/***/ }
/******/ ]);