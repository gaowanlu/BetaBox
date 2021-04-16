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
export { ajax };
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