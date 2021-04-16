"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});
var ajax = {
    //创建ajax对象
    $createXMLHttpRequest: function $createXMLHttpRequest() {
        var xmlhttp = {};
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;
    },
    //get方法
    get: function get(obj) {
        var requestURL = obj.url + "?";
        var dataKeys = Object.keys(obj.data);
        for (var i = 0; i < dataKeys.length; i++) {
            if (i != 0) {
                requestURL += "&";
            }
            requestURL += dataKeys[i] + "=";
            requestURL += obj.data[dataKeys[i]].toString();
        }
        //创建XMLHttpRequest对象
        var ajax = this.$createXMLHttpRequest();
        ajax.onreadystatechange = function () {
            obj.call(ajax); //回调函数
        };
        ajax.open("GET", requestURL, true);
        //设置请求头
        if (obj.contentType) ajax.setRequestHeader("Content-type", obj.contentType);else ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //发起请求
        ajax.send();
    },
    post: function post(obj) {
        var ajax = this.$createXMLHttpRequest();
        ajax.onreadystatechange = function () {
            obj.call(ajax);
        };
        ajax.open("POST", obj.url, true);
        if (obj.contentType) ajax.setRequestHeader("Content-type", obj.contentType);else ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(obj.data);
    }
};
exports.ajax = ajax;
// ajax.get({
//     url: "index.html",
//     data: "",
//     call(ajax) {
//         console.log(ajax.readyState);
//         console.log(ajax.status);
//         ajax.abort();
//         if (ajax.readyState == 4 && ajax.status == 200) {
//             console.log(ajax.response);
//         }
//     }
// });