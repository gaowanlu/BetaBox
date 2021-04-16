/*!
 * Slago.js v0.0.1
 * (c) 2021-2021 Wanlu Gao
 * Released under the MIT License.
 * GitHub  https://github.com/gaowanlu/Slago.js
 */
import { ajax } from './ajax.js';
import { template } from './template.js';
let Slago = (function () {
    //create namespace for build content of window.Slago
    let namespace = {};
    //template
    namespace.template = template;//from template.js
    //ajax
    namespace.ajax = ajax;//from ajax.js
    return namespace; //namespace content into window.Slago
})();
export { Slago };