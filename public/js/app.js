webpackJsonp([0],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueResource = __webpack_require__(3);
	
	var _vueResource2 = _interopRequireDefault(_vueResource);
	
	var _App = __webpack_require__(4);
	
	var _App2 = _interopRequireDefault(_App);
	
	var _router = __webpack_require__(10);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _store = __webpack_require__(23);
	
	var _store2 = _interopRequireDefault(_store);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	window.noop = function () {};
	
	_vue2.default.use(_vueResource2.default);
	
	_vue2.default.http.interceptors.push(function (request, next) {
	    request.headers.set('X-CSRF-TOKEN', Laravel.csrfToken);
	
	    next();
	});
	
	var app = new _vue2.default(_vue2.default.util.extend({
	    router: _router2.default,
	    store: _store2.default
	}, _App2.default));
	
	app.$mount('#app');

/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(5)
	
	/* template */
	var __vue_template__ = __webpack_require__(9)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\Code\\Code\\crip-laravel\\crip-competitions\\resources\\assets\\js\\components\\App.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-41b943df", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-41b943df", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] App.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function($) {'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _actions = __webpack_require__(7);
	
	var aTypes = _interopRequireWildcard(_actions);
	
	var _mutations = __webpack_require__(8);
	
	var mTypes = _interopRequireWildcard(_mutations);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	    mounted: function mounted() {
	        console.log('Component ready. Checking user authorisation.');
	        this.$store.dispatch(aTypes.USER_AUTHORISE_CHECK);
	    },
	
	
	    computed: {
	        user: function user() {
	            return this.$store.state.auth.user;
	        },
	        app_name: function app_name() {
	            return $('title').text();
	        },
	        user_name: function user_name() {
	            if (this.$store.state.auth.user.authenticated) return this.$store.state.auth.user.name;
	
	            return 'Actions';
	        }
	    },
	
	    methods: {
	        logout: function logout() {
	            this.$store.commit(mTypes.USER_UNAUTHORISED);
	        }
	    }
	
	};
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(6)))

/***/ },
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var USER_AUTHORISE = exports.USER_AUTHORISE = 'auth/USER_AUTHORISE';
	var USER_AUTHORISE_CHECK = exports.USER_AUTHORISE_CHECK = 'auth/USER_AUTHORISE_CHECK';
	var USER_AUTHORISE_GET_DETAILS = exports.USER_AUTHORISE_GET_DETAILS = 'auth/USER_AUTHORISE_CHECK';

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var USER_AUTHORISED = exports.USER_AUTHORISED = 'auth/USER_AUTHORISED';
	var USER_UNAUTHORISED = exports.USER_UNAUTHORISED = 'auth/USER_UNAUTHORISED';
	var USER_AUTHORISE_ERROR = exports.USER_AUTHORISE_ERROR = 'auth/USER_AUTHORISE_ERROR';
	var USER_DETAILS_UPDATED = exports.USER_DETAILS_UPDATED = 'auth/USER_DETAILS_UPDATED';

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    attrs: {
	      "id": "app-view"
	    }
	  }, [_vm._h('nav', {
	    staticClass: "navbar navbar-default navbar-static-top"
	  }, [_vm._h('div', {
	    staticClass: "container"
	  }, [_vm._h('div', {
	    staticClass: "navbar-header"
	  }, [_vm._m(0), " ", " ", _vm._h('a', {
	    staticClass: "navbar-brand",
	    attrs: {
	      "href": "/"
	    }
	  }, [_vm._s(_vm.app_name)])]), " ", _vm._h('div', {
	    staticClass: "collapse navbar-collapse",
	    attrs: {
	      "id": "app-navbar-collapse"
	    }
	  }, [_vm._h('ul', {
	    staticClass: "nav navbar-nav"
	  }, [" "]), " ", " ", _vm._h('ul', {
	    staticClass: "nav navbar-nav navbar-right"
	  }, [_vm._h('li', {
	    staticClass: "dropdown"
	  }, [_vm._h('a', {
	    staticClass: "dropdown-toggle",
	    attrs: {
	      "href": "#",
	      "data-toggle": "dropdown",
	      "role": "button",
	      "aria-expanded": "false"
	    }
	  }, ["\n              " + _vm._s(_vm.user_name) + " ", _vm._h('span', {
	    staticClass: "caret"
	  })]), " ", _vm._h('ul', {
	    staticClass: "dropdown-menu",
	    attrs: {
	      "role": "menu"
	    }
	  }, [_vm._h('li', [_vm._h('router-link', {
	    attrs: {
	      "to": {
	        name: 'home'
	      }
	    }
	  }, ["Home"])]), " ", (!_vm.user.authenticated) ? _vm._h('li', [_vm._h('router-link', {
	    attrs: {
	      "to": {
	        name: 'login'
	      }
	    }
	  }, ["Login"])]) : _vm._e(), " ", (!_vm.user.authenticated) ? _vm._h('li', [_vm._h('router-link', {
	    attrs: {
	      "to": {
	        name: 'signup'
	      }
	    }
	  }, ["Sign Up"])]) : _vm._e(), " ", (_vm.user.authenticated) ? _vm._h('li', [_vm._h('a', {
	    on: {
	      "click": function($event) {
	        $event.preventDefault();
	        _vm.logout($event)
	      }
	    }
	  }, ["Logout"])]) : _vm._e()])])])])])]), " ", _vm._h('div', {
	    staticClass: "container"
	  }, [_vm._h('div', {
	    staticClass: "row"
	  }, [_vm._h('div', {
	    staticClass: "col-md-8 col-md-offset-2"
	  }, [_vm._h('router-view')])])])])
	},staticRenderFns: [function (){var _vm=this;
	  return _vm._h('button', {
	    staticClass: "navbar-toggle collapsed",
	    attrs: {
	      "type": "button",
	      "data-toggle": "collapse",
	      "data-target": "#app-navbar-collapse"
	    }
	  }, [_vm._h('span', {
	    staticClass: "sr-only"
	  }, ["Toggle Navigation"]), " ", _vm._h('span', {
	    staticClass: "icon-bar"
	  }), " ", _vm._h('span', {
	    staticClass: "icon-bar"
	  }), " ", _vm._h('span', {
	    staticClass: "icon-bar"
	  })])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-41b943df", module.exports)
	  }
	}

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vueRouter = __webpack_require__(11);
	
	var _vueRouter2 = _interopRequireDefault(_vueRouter);
	
	var _routes = __webpack_require__(12);
	
	var routes = _interopRequireWildcard(_routes);
	
	var _ChildHolder = __webpack_require__(13);
	
	var _ChildHolder2 = _interopRequireDefault(_ChildHolder);
	
	var _Home = __webpack_require__(15);
	
	var _Home2 = _interopRequireDefault(_Home);
	
	var _Login = __webpack_require__(18);
	
	var _Login2 = _interopRequireDefault(_Login);
	
	var _Signup = __webpack_require__(21);
	
	var _Signup2 = _interopRequireDefault(_Signup);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vueRouter2.default);
	
	exports.default = new _vueRouter2.default({
	    mode: 'history',
	    scrollBehavior: function scrollBehavior() {
	        return { y: 0 };
	    },
	    routes: [{ path: '/home', name: routes.home.name, component: _Home2.default }, {
	        path: '/auth', component: _ChildHolder2.default, children: [{ path: 'login', name: routes.login.name, component: _Login2.default }, { path: 'signup', name: routes.signup.name, component: _Signup2.default }]
	    }, { path: '/auth', redirect: '/auth/login' }, { path: '*', redirect: '/home' }]
	});

/***/ },
/* 11 */,
/* 12 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var home = exports.home = { name: 'home' };
	var login = exports.login = { name: 'login' };
	var signup = exports.signup = { name: 'signup' };

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(14)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\Code\\Code\\crip-laravel\\crip-competitions\\resources\\assets\\js\\components\\ChildHolder.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-16eff226", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-16eff226", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] ChildHolder.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', [_vm._h('router-view')])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-16eff226", module.exports)
	  }
	}

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(16)
	
	/* template */
	var __vue_template__ = __webpack_require__(17)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\Code\\Code\\crip-laravel\\crip-competitions\\resources\\assets\\js\\components\\Home.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-d50df5de", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-d50df5de", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Home.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _actions = __webpack_require__(7);
	
	var aTypes = _interopRequireWildcard(_actions);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	exports.default = {
	    mounted: function mounted() {
	        this.$store.dispatch(aTypes.USER_AUTHORISE_GET_DETAILS);
	    },
	
	
	    computed: {
	        user: function user() {
	            return this.$store.state.auth.user;
	        }
	    }
	
	}; //
	//
	//
	//
	//
	//

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._m(0)
	},staticRenderFns: [function (){var _vm=this;
	  return _vm._h('div', [_vm._h('h4', ["Home.vue"])])
	}]}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-d50df5de", module.exports)
	  }
	}

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* script */
	__vue_exports__ = __webpack_require__(19)
	
	/* template */
	var __vue_template__ = __webpack_require__(20)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\Code\\Code\\crip-laravel\\crip-competitions\\resources\\assets\\js\\components\\auth\\Login.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-8d8254b2", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-8d8254b2", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Login.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _actions = __webpack_require__(7);
	
	var aTypes = _interopRequireWildcard(_actions);
	
	var _routes = __webpack_require__(12);
	
	var routes = _interopRequireWildcard(_routes);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	//
	
	exports.default = {
	    mounted: function mounted() {
	        if (this.$store.state.auth.user.authenticated) this.$router.push(routes.home);
	    },
	    data: function data() {
	        return {
	            credentials: {
	                email: '',
	                password: ''
	            }
	        };
	    },
	
	
	    computed: {
	        error: function error() {
	            return this.$store.state.auth.error;
	        }
	    },
	
	    methods: {
	        login: function login() {
	            var credentials = Object.assign({}, this.credentials);
	            this.$store.dispatch(aTypes.USER_AUTHORISE, { credentials: credentials, route: routes.home });
	        }
	    }
	
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    staticClass: "col-sm-4 col-sm-offset-4",
	    attrs: {
	      "id": "login-view"
	    }
	  }, [_vm._h('h2', ["Log In"]), " ", _vm._h('p', ["Log in to your account to get some great quotes."]), " ", (_vm.error) ? _vm._h('div', {
	    staticClass: "alert alert-danger"
	  }, [_vm._h('p', [_vm._s(_vm.error)])]) : _vm._e(), " ", _vm._h('div', {
	    staticClass: "form-group"
	  }, [_vm._h('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.credentials.email),
	      expression: "credentials.email"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "text",
	      "name": "email",
	      "placeholder": "Enter your username"
	    },
	    domProps: {
	      "value": _vm._s(_vm.credentials.email)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.credentials.email = $event.target.value
	      }
	    }
	  })]), " ", _vm._h('div', {
	    staticClass: "form-group"
	  }, [_vm._h('input', {
	    directives: [{
	      name: "model",
	      rawName: "v-model",
	      value: (_vm.credentials.password),
	      expression: "credentials.password"
	    }],
	    staticClass: "form-control",
	    attrs: {
	      "type": "password",
	      "name": "password",
	      "placeholder": "Enter your password"
	    },
	    domProps: {
	      "value": _vm._s(_vm.credentials.password)
	    },
	    on: {
	      "input": function($event) {
	        if ($event.target.composing) { return; }
	        _vm.credentials.password = $event.target.value
	      }
	    }
	  })]), " ", _vm._h('button', {
	    staticClass: "btn btn-primary",
	    on: {
	      "click": function($event) {
	        _vm.login()
	      }
	    }
	  }, ["Access"])])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-8d8254b2", module.exports)
	  }
	}

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	var __vue_exports__, __vue_options__
	var __vue_styles__ = {}
	
	/* template */
	var __vue_template__ = __webpack_require__(22)
	__vue_options__ = __vue_exports__ = __vue_exports__ || {}
	if (
	  typeof __vue_exports__.default === "object" ||
	  typeof __vue_exports__.default === "function"
	) {
	if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
	__vue_options__ = __vue_exports__ = __vue_exports__.default
	}
	if (typeof __vue_options__ === "function") {
	  __vue_options__ = __vue_options__.options
	}
	__vue_options__.__file = "D:\\Code\\Code\\crip-laravel\\crip-competitions\\resources\\assets\\js\\components\\auth\\Signup.vue"
	__vue_options__.render = __vue_template__.render
	__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
	
	/* hot reload */
	if (false) {(function () {
	  var hotAPI = require("vue-hot-reload-api")
	  hotAPI.install(require("vue"), false)
	  if (!hotAPI.compatible) return
	  module.hot.accept()
	  if (!module.hot.data) {
	    hotAPI.createRecord("data-v-8a14676c", __vue_options__)
	  } else {
	    hotAPI.reload("data-v-8a14676c", __vue_options__)
	  }
	})()}
	if (__vue_options__.functional) {console.error("[vue-loader] Signup.vue: functional components are not supported and should be defined in plain js files using render functions.")}
	
	module.exports = __vue_exports__


/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports={render:function (){var _vm=this;
	  return _vm._h('div', {
	    attrs: {
	      "id": "signup-view"
	    }
	  }, ["\n  Signup.vue\n"])
	},staticRenderFns: []}
	module.exports.render._withStripped = true
	if (false) {
	  module.hot.accept()
	  if (module.hot.data) {
	     require("vue-hot-reload-api").rerender("data-v-8a14676c", module.exports)
	  }
	}

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _vuex = __webpack_require__(24);
	
	var _vuex2 = _interopRequireDefault(_vuex);
	
	var _auth = __webpack_require__(25);
	
	var _auth2 = _interopRequireDefault(_auth);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_vue2.default.use(_vuex2.default);
	
	var store = new _vuex2.default.Store({
	    modules: { auth: _auth2.default }
	});
	
	exports.default = store;

/***/ },
/* 24 */,
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	
	var _mutations, _actions;
	
	var _vue = __webpack_require__(1);
	
	var _vue2 = _interopRequireDefault(_vue);
	
	var _router = __webpack_require__(10);
	
	var _router2 = _interopRequireDefault(_router);
	
	var _settings = __webpack_require__(26);
	
	var _settings2 = _interopRequireDefault(_settings);
	
	var _mutations2 = __webpack_require__(8);
	
	var mTypes = _interopRequireWildcard(_mutations2);
	
	var _actions2 = __webpack_require__(7);
	
	var aTypes = _interopRequireWildcard(_actions2);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }
	
	var state = {
	
	    user: {
	        authenticated: false,
	        name: '',
	        email: ''
	    },
	
	    error: ''
	
	};
	
	var mutations = (_mutations = {}, _defineProperty(_mutations, mTypes.USER_AUTHORISED, function (state) {
	    state.user.authenticated = true;
	    _vue2.default.http.headers.common['Authorization'] = {
	        'Authorization': 'Bearer ' + localStorage.getItem('token')
	    };
	}), _defineProperty(_mutations, mTypes.USER_UNAUTHORISED, function (state) {
	    localStorage.removeItem('token');
	    state.user.authenticated = false;
	}), _defineProperty(_mutations, mTypes.USER_AUTHORISE_ERROR, function (state, error) {
	    state.error = error;
	}), _defineProperty(_mutations, mTypes.USER_DETAILS_UPDATED, function (state, payload) {
	    state.user.name = payload.name;
	    state.user.email = payload.email;
	}), _mutations);
	
	var actions = (_actions = {}, _defineProperty(_actions, aTypes.USER_AUTHORISE, function (_ref, _ref2) {
	    var commit = _ref.commit;
	    var credentials = _ref2.credentials,
	        route = _ref2.route;
	
	    _vue2.default.http.post(_settings2.default.apiUrl('authenticate'), credentials).then(function (_ref3) {
	        var data = _ref3.data;
	
	        localStorage.setItem('token', data.token);
	        commit(mTypes.USER_AUTHORISED);
	
	        if (route) _router2.default.push(route);
	    }, function (_ref4) {
	        var data = _ref4.data;
	
	        commit(mTypes.USER_AUTHORISE_ERROR, data.error);
	    });
	}), _defineProperty(_actions, aTypes.USER_AUTHORISE_CHECK, function (_ref5) {
	    var commit = _ref5.commit;
	
	    console.log(aTypes.USER_AUTHORISE_CHECK, !!localStorage.getItem('token'));
	    if (localStorage.getItem('token')) commit(mTypes.USER_AUTHORISED);
	}), _defineProperty(_actions, aTypes.USER_AUTHORISE_GET_DETAILS, function (_ref6) {
	    var commit = _ref6.commit,
	        state = _ref6.state;
	
	    if (state.user.authenticated && localStorage.getItem('token')) {
	        _vue2.default.http.get(_settings2.default.apiUrl('authenticate')).then(function (_ref7) {
	            var data = _ref7.data;
	
	            commit(mTypes.USER_DETAILS_UPDATED, data);
	        }, function (r) {
	            return _settings2.default.handleError(r);
	        });
	    }
	}), _actions);
	
	exports.default = { state: state, mutations: mutations, actions: actions };

/***/ },
/* 26 */
/***/ function(module, exports) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.default = {
	    apiRoot: '/api/',
	    /**
	     * @param {string} path
	     * @returns {string}
	     */
	    apiUrl: function apiUrl(path) {
	        var url = path.replace(new RegExp("^[\\/]+"), '');
	        return '' + this.apiRoot + url;
	    },
	    handleError: function handleError(errorResponse) {
	        console.error('settings.handleError', errorResponse);
	    }
	};

/***/ }
]);
//# sourceMappingURL=app.js.map