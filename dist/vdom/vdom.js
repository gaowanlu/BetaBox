"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.temp = exports.vdom = undefined;

var _h = require("snabbdom/build/h.js");

//虚拟DOM
var vdom = {};
vdom.dom = {
    "sel": "div",
    "data": {
        "class": {
            "box": true
        }
    },
    "children": [{
        "sel": "h3",
        "text": "我是一个标题"
    }, {
        "sel": "ul",
        "data": {},
        "children": [{
            "sel": "li",
            text: "牛奶"
        }, {
            "sel": "li",
            text: "咖啡"
        }, {
            "sel": "li",
            text: "可乐"
        }]
    }]
};
var temp = (0, _h.h)('a', {
    props: { href: "www.baidu.com" }
}, '百度');
//虚拟节点属性
/*
{
    children:,孩子节点
    data:,属性样式
    elm:,真正dom节点
    key:,vnode唯一标识
    sel:,//tagname
    text://里面的html
}
*/
exports.vdom = vdom;
exports.temp = temp;