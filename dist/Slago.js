'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.Slago = undefined;

var _ajax = require('./ajax.js');

var _template = require('./template.js');

/*!
 * Slago.js v0.0.1
 * (c) 2021-2021 Wanlu Gao
 * Released under the MIT License.
 * GitHub  https://github.com/gaowanlu/Slago.js
 */
var Slago = function () {
    //create namespace for build content of window.Slago
    var namespace = {};
    //template
    namespace.template = _template.template; //from template.js
    //ajax
    namespace.ajax = _ajax.ajax; //from ajax.js
    return namespace; //namespace content into window.Slago
}();
exports.Slago = Slago;