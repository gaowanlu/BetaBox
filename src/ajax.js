/*
abort()中断请求
getAllResponseHeaders()获得所有响应头内容,readyState小于3时返回null
getResponseHeader(name)
open()初始化http请求参数
send()发送http请求
setRequestHeader()设置请求头
readyState属性 获得请求状态[0,4]
onreadystatechange事件 当readyState变化时调用
status属性 服务器返回的http状态码,当readyState==4时才有状态码,否则读取异常
statusText属性 'OK' 'Not Found'等等
resposeXML属性 对请求的响应，解析为XML作为Document对象返回
responseText属性 当readyState==3时说明接收到了响应头，响应体为空字符串
                    readyState==4时说明全部数据接受完成
readyState状态值
    0 Uninitialized 初始化状态
    1 Open Open 方法被调用,send()方法未调用
    2 Sent send 被调用http发送到服务器,未接受响应
    3 Receiving 所有响应头接收完毕,响应体开始接受但未完毕
    4 Loaded http响应所有数据接受完毕
*/
let ajax = {
    //创建ajax对象
    $createXMLHttpRequest: function () {
        let xmlhttp = {};
        if (window.XMLHttpRequest) {
            xmlhttp = new XMLHttpRequest();
        } else {
            xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
        }
        return xmlhttp;
    },
    //get方法
    get: function (obj) {
        let requestURL = obj.url + "?";
        let dataKeys = Object.keys(obj.data);
        for (let i = 0; i < dataKeys.length; i++) {
            if (i != 0) {
                requestURL += "&";
            }
            requestURL += dataKeys[i] + "=";
            requestURL += obj.data[dataKeys[i]].toString();
        }
        //创建XMLHttpRequest对象
        let ajax = this.$createXMLHttpRequest();
        ajax.onreadystatechange = function () {
            obj.call(ajax); //回调函数
        };
        ajax.open("GET", requestURL, true);
        //设置请求头
        if (obj.contentType)
            ajax.setRequestHeader("Content-type", obj.contentType);
        else
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        //发起请求
        ajax.send();
    },
    post: function (obj) {
        let ajax = this.$createXMLHttpRequest();
        ajax.onreadystatechange = function () {
            obj.call(ajax);
        }
        ajax.open("POST", obj.url, true);
        if (obj.contentType)
            ajax.setRequestHeader("Content-type", obj.contentType);
        else
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        ajax.send(obj.data);
    }
};
export {
    ajax
};
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