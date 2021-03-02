/*!
 * Open.js v0.1.6
 * (c) 2021-2021 Wanlu Gao (China)
 * Released under the MIT License.
 * GitHub  https://github.com/gaowanlu/Open.js
 */
if (window.Open == undefined) {
    window.Open = (function () {
        console.log("😜Open.js V0.1.4 Started IMageShare\t" + "http://119.3.180.71");
        console.log("😜Open.js GitHub:\t" + "https://github.com/gaowanlu/Open.js");
        var namespace = {};
        /*namespace
         *       |-select
         *           |-get_name_type
         *           |-get_nodes
         */
        namespace.select = function (name, parent) {
            function get_name_type(string) { //判断标志类型
                if (typeof (string) == "string" && string.length > 2 && string[0] == '.') {
                    return "class";
                } else if (typeof (string) == "string" && string.length > 2 && string[0] == '#') {
                    return "id";
                } else if (typeof (string) == "string" && string.length > 0) {
                    return "tag";
                } else {
                    return null;
                }
            }

            function get_nodes(name, doc) { //获得节点
                let name_type = get_name_type(name);
                if (!name_type) return null;
                if (doc) {
                    if (name_type == "class") {
                        return doc.getElementsByClassName(name.slice(1, name.length));
                    } else if (name_type == "id") {
                        return doc.getElementById(name.slice(1, name.length));
                    } else if (name_type == "tag") {
                        return doc.getElementsByTagName(name);
                    } else {
                        return null;
                    }
                } else {
                    if (name_type == "class") {
                        return document.getElementsByClassName(name.slice(1, name.length));
                    } else if (name_type == "id") {
                        return document.getElementById(name.slice(1, name.length));
                    } else if (name_type == "tag") {
                        return document.getElementsByTagName(name);
                    } else {
                        return null;
                    }
                }
            }
            return get_nodes(name, parent);
        }; //--namespace.select--


        /*namespace
         *       |-createNode
         */
        namespace.createNode = function (tag, styleObj, cssList, state) {
            let type = typeof (tag);
            if (type != "string") { //@判断参数类型
                return null;
            }
            let newNode = null;
            //@使用异常避免没有相应的tag名称而造成崩溃
            try {
                newNode = document.createElement(tag);
            } catch (err) {
                return null;
            }
            if (newNode) {
                try { //添加style
                    try {
                        this.style(newNode, styleObj);
                    } catch (err) {}
                } catch (err) {}
                try { //添加css name
                    for (let i = 0; i < cssList.length; i++) {
                        try {
                            newNode.classList.add(cssList[i]);
                        } catch (err) {}
                    }
                } catch (err) {}
                try { //添加属性
                    for (let i in state) {
                        try {
                            newNode[i] = state[i];
                        } catch (err) {}
                    }
                } catch (err) {}
            }
            newNode.OPENJS_child = {};
            return newNode;
        }; //--namespace.createNode--


        /*namespace
         *       |-print
         */
        namespace.print = window.console.log;
        //--namespace.print--


        /*namespace
         *       |-deleteNode
         */
        namespace.deleteNode = function (nodes, index) {
            if (typeof (nodes) != 'object' || typeof (index) != "number")
                return null;
            if (nodes && nodes.length == undefined) {
                //delete this node
                try {
                    nodes.parentNode.removeChild(nodes);
                } catch (err) {}
            } else if (nodes && nodes.length > 0 && index < nodes.length) {
                if (index == -1) { //delete all nodes
                    while (nodes.length) {
                        try {
                            nodes[0].parentNode.removeChild(nodes[0]);
                        } catch (err) {}
                    }
                } else { //delete first node
                    try {
                        nodes[index].parentNode.removeChild(nodes[index]);
                    } catch (err) {}
                }
            }
        }; //--namespace.deleteNode

        /*namespace
         *       |-px
         */
        namespace.px = function (flag) {
            let type = typeof (flag);
            if (type == "string") {
                //去掉全部空格
                flag = flag.replace(/(^\s*)|(\s*$)/g, "");
                //检测字符串是否全为数组组成
                if (Number(flag) + '' !== NaN + '') { //@全为数字
                    //判断是否合法
                    if (Number(flag) < 0) {
                        flag = 0;
                    } else {
                        flag = Math.floor(parseFloat(flag));
                    }
                    return parseInt(flag).toString() + "px";
                }
                //判断是否为"500px"格式
                let stringArray = flag.split('');
                if (stringArray.length >= 3) {
                    if (stringArray[stringArray.length - 1] != "x" || stringArray[stringArray.length - 2] != "p") {
                        return null;
                    }
                    let tempArray = stringArray.slice(0, stringArray.length - 2);
                    let tempString = tempArray.join('');
                    //判断tempString是否全为数字
                    if (Number(tempString) + '' !== NaN + '') {
                        return flag;
                    }
                }
                //判断是否为"89%"格式
                stringArray = flag.split('');
                if (stringArray.length >= 2) {
                    if (stringArray[stringArray.length - 1] != '%') {
                        return null;
                    }
                    let tempArray = stringArray.slice(0, stringArray.length - 1);
                    let tempString = tempArray.join('');
                    //判断tempString是否全为数字
                    if (Number(tempString + '' !== NaN + '')) {
                        return flag;
                    }
                }
                //错误格式参数
                return null;
            } else if (type == "number") { //数字类型
                if (flag < 0) {
                    flag = 0;
                } else {
                    flag = Math.floor(flag);
                }
                return parseInt(flag).toString() + "px";
            } else {
                return null;
            }
        } //--namespace.px--

        /*namespace
         *       |-style
         */
        namespace.style = function (nodes, style, index) {
            if (typeof (nodes) != "object") {
                return null;
            }
            //style is a string
            if (typeof (style) == "string") {
                if (nodes && nodes.length == undefined) {
                    try {
                        nodes.setAttribute("style", style);
                    } catch (err) {}
                } else if (nodes && (index < nodes.length || index == -1)) {
                    if (index == -1) {
                        //change all style of nodes
                        for (let i = 0; i < nodes.length; i++) {
                            try {
                                nodes[i].setAttribute("style", style);
                            } catch (err) {}
                        }
                    } else if (index >= 0) {
                        try {
                            nodes[index].setAttribute("style", style);
                        } catch (err) {}
                    }
                }
                return true;
            } //--style is a string--

            //style is a object-content array
            if (typeof (style) == "object" && style.length != undefined && style.length >= 0) {
                if (nodes && nodes.length == undefined) {
                    for (let i = 0; i < style.length; i++) {
                        for (let key in style[i]) {
                            try {
                                nodes.style[key] = style[i][key]
                            } catch (err) {}
                        }
                    }
                } else if (nodes && (index < nodes.length || index == -1)) {
                    if (index == -1) {
                        //change all style of nodes
                        for (let k = 0; k < style.length; k++) {
                            for (let i = 0; i < nodes.length; i++) {
                                for (let key in style[k]) {
                                    try {
                                        nodes[i].style[key] = style[k][key]
                                    } catch (err) {}
                                }
                            }
                        }
                    } else if (index >= 0) {
                        for (let k = 0; k < style.length; k++) {
                            for (let key in style[k]) {
                                try {
                                    nodes[index].style[key] = style[k][key]
                                } catch (err) {}
                            }
                        }
                    }
                }
                return true;
            } //--style is a object-content array--

            //style is a object
            if (typeof (style) == "object" && style.length == undefined) {
                if (nodes && nodes.length == undefined) {
                    for (let key in style) {
                        try {
                            nodes.style[key] = style[key]
                        } catch (err) {}
                    }
                } else if (nodes && (index < nodes.length || index == -1)) {
                    if (index == -1) {
                        //change all style of nodes
                        for (let i = 0; i < nodes.length; i++) {
                            for (let key in style) {
                                try {
                                    nodes[i].style[key] = style[key]
                                } catch (err) {}
                            }
                        }
                    } else if (index >= 0) {
                        for (let key in style) {
                            try {
                                nodes[index].style[key] = style[key]
                            } catch (err) {}
                        }
                    }
                }
                return true;
            } //--style is a object--

        } //--namespace.style--

        /*namespace
         *       |-class
         */
        namespace.class = function (nodes, classList, type, index) {
            if (typeof (nodes) != "object" || !classList || classList.length == undefined) {
                return null;
            }
            if (type == "+") { //add class name
                if (nodes.length == undefined) { // one node
                    for (let i = 0; i < classList.length; i++) {
                        try {
                            nodes.classList.add(classList[i]);
                        } catch (err) {}
                    }
                } else if (index == -1) { // all nodes
                    for (let i = 0; i < nodes.length; i++) {
                        for (let j = 0; j < classList.length; j++) {
                            try {
                                nodes[i].classList.add(classList[j]);
                            } catch (err) {}
                        }
                    }
                } else if (index >= 0 && (index < nodes.length || index == -1)) { //index node
                    for (let i = 0; i < classList.length; i++) {
                        try {
                            nodes[index].classList.add(classList[i]);
                        } catch (err) {}
                    }
                }
            } else if (type == "-") { //delete class name
                if (nodes.length == undefined) { // one node
                    for (let i = 0; i < classList.length; i++) {
                        try {
                            nodes.classList.remove(classList[i]);
                        } catch (err) {}
                    }
                } else if (index == -1) { // all nodes
                    for (let i = 0; i < nodes.length; i++) {
                        for (let j = 0; j < classList.length; j++) {
                            try {
                                nodes[i].classList.remove(classList[j]);
                            } catch (err) {}
                        }
                    }
                } else if (index >= 0 && (index < nodes.length || index == -1)) { //index node
                    for (let i = 0; i < classList.length; i++) {
                        try {
                            nodes[index].classList.remove(classList[i]);
                        } catch (err) {}
                    }
                }
            }
        } //--namespace.class--

        /*namespace
         *       |-ajax
         *           |-get
         *           |-post
         *           |-$createXMLHttpRequest
         */
        /*
         *所有现代浏览器均支持 XMLHttpRequest 对象（IE5 和 IE6 使用 ActiveXObject）
         */
        namespace.ajax = {};
        //创建XMLHttpRequest对象
        namespace.ajax.$createXMLHttpRequest = function () {
            let xmlhttp = {};
            if (window.XMLHttpRequest) {
                xmlhttp = new XMLHttpRequest();
            } else {
                xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            }
            return xmlhttp;
        };
        namespace.ajax.get = function (url, fun) {
            if (typeof (url) != "string" || typeof (fun) != "function") {
                return null;
            }
            let ajax = this.$createXMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    let data = {};
                    data.responseText = ajax.responseText + "";
                    data.json = JSON.parse(data.responseText);
                    fun(data);
                }
            }
            ajax.open("GET", url, true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            ajax.send();
        };
        namespace.ajax.post = function (url, json_obj, fun, post_string) {
            if (typeof (url) != "string" || typeof (fun) != "function") {
                return null;
            }
            console.log(json_obj);
            let content = JSON.stringify(json_obj);
            console.log("id=123&password=123&" + "Open_post_json=" + content);
            let ajax = this.$createXMLHttpRequest();
            ajax.onreadystatechange = function () {
                if (ajax.readyState == 4 && ajax.status == 200) {
                    let data = {};
                    data.responseText = ajax.responseText + "";
                    data.json = JSON.parse(data.responseText);
                    fun(data);
                }
            }
            ajax.open("POST", url, true);
            ajax.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            if (post_string) {
                ajax.send(post_string + "&Open_post_json=" + content);
                console.log(post_string + "&Open_post_json=" + content);
            } else {
                ajax.send("Open_post_json=" + content);
            }
        };//--namespace.ajax--

        /*Open.js模板引擎,借鉴于https://github.com/janl/mustache.js
         *对外接口Open.template.engin(templateString,dataObject)
         */
        namespace.template = {
            /*扫描器
             *template(模板字符串)
             */
            Scanner: function (template) {
                this.template = template; //模板字符串

                this._pointer = 0; //指针

                this._tail = this.template; //尾字符串

                this.show = function () {
                    //显示模板字符串
                    console.log(this.template);
                };

                this.scan = function (flag) {
                    if (this._tail.indexOf(flag) == 0) {
                        //tag有多长，指针后移多少位
                        this._pointer += flag.length; //更新_tail

                        this._tail = this.template.substr(this._pointer);
                    }
                };

                this.scanUntil = function (flag) {
                    //记录指针开始位置
                    let start = this._pointer; //当尾巴字符串的开头不是stopFlag时，说明还没有扫描到stopFag

                    while (this._tail.indexOf(flag) != 0 && !this._over()) {
                        //指针向后移动
                        this._pointer++; //更新_tail

                        this._tail = this.template.substr(this._pointer);
                    } //返回经过的字符串


                    return this.template.substr(start, this._pointer - start);
                }; //判断是否扫描完毕


                this._over = function () {
                    if (this._pointer == this.template.length) {
                        return true;
                    } else {
                        return false;
                    }
                };
            }, //END-function Scanner(template)

            /*生成tokens
             *parseTokens(template)
             */
            parseTokens: function (template) {
                let tokens = []; //创建扫描器

                let scanner = new this.Scanner(template); //扫描器工作

                while (!scanner._over()) {
                    //收集标记前的内容
                    let words = scanner.scanUntil("{{");
                    tokens.push(['text', words]);
                    scanner.scan("{{"); //收集{{key}}中的key

                    words = scanner.scanUntil("}}"); //判断key的类型

                    switch (words[0]) {
                        case '/':
                            tokens.push(['/', words.substr(1)]);
                            break;

                        case '#':
                            tokens.push(['#', words.substr(1)]);
                            break;

                        default:
                            if (words) tokens.push(['name', words]);;
                    }

                    scanner.scan("}}");
                }

                return this.nestTokens(tokens); //返回嵌套标准形式
            }, //function parseTokens(template)

            /*将tokens变为嵌套形式
             *tokens(未进行嵌套操作的tokens)
             */
            nestTokens: function (tokens) {
                let nestToken = [];
                let operateStack = [];
                operateStack.push(nestToken); //整体入栈

                for (let i = 0; i < tokens.length; i++) {
                    if (operateStack.length == 0) {
                        //栈为空则结束
                        break;
                    }
                    switch (tokens[i][0]) {
                        case '#':
                            operateStack[operateStack.length - 1].push(tokens[i]);
                            tokens[i].push([]);
                            operateStack.push(tokens[i][2]);
                            break;

                        case '/':
                            //出栈
                            operateStack.pop();
                            break;

                        default:
                            //text直接入栈
                            operateStack[operateStack.length - 1].push(tokens[i]);
                            break;
                    }
                }

                return nestToken;
            }, //END-function nestTokens(tokens)

            /*将tokens变为HTML字符串
             *parseHTML
             */
            parseHTML: function (tokens, data) {
                let domString = "";

                for (let i = 0; i < tokens.length; i++) {
                    let array = tokens[i];
                    switch (array[0]) {
                        case "text":
                            domString += array[1];
                            break;

                        case "name":
                            domString += this.lookup(data, array[1].toString());
                            break;

                        case "#":
                            domString += this.parseArray(array, data);
                            break;

                        default:
                            break;
                    }
                }

                return domString;
            }, //END-function parseHTML

            /*处理数组，结合parseHTML实现递归
             *接受token 形如:['#','student',[]]
             */
            parseArray: function (token, data) {
                let resultString = ""; //得到要迭代的数组

                let circleArray = this.lookup(data, token[1]);

                for (let i = 0; i < circleArray.length; i++) {
                    //进行对象的合并,合并{'.':circleArray[i]}与circleArray[i]
                    let tempObj = {
                        '.': circleArray[i]
                    };
                    for (let key in circleArray[i]) {
                        tempObj[key] = circleArray[i][key];
                    }
                    resultString += this.parseHTML(token[2], tempObj);
                }
                //{...circleArray[i],'.': circleArray[i]}
                return resultString;
            },


            /*形如data:{a:{b:"ds"}}
             *lookup函数，lookup(data,"a.b")返回data.a.b
             */
            lookup: function (data, keyWords) {
                if (!data || !keyWords) return "";
                let deleteBlank = keyWords.replace(/^\s+|\s+$/g, ""); //js去掉两头空格

                if (keyWords.indexOf(".") != -1 && keyWords != '.') {
                    //有点,且不是一个点
                    //有点
                    let keyWordsArray = deleteBlank.split("."); //开始迭代

                    let temp = data;

                    for (let i = 0; i < keyWordsArray.length; i++) {
                        temp = temp[keyWordsArray[i]];
                    }

                    return temp;
                }

                return data[keyWords];
            }, //END-function lookup

            /*engin
             */
            engin: function (template, data) {
                if (!template) return "";
                return this.parseHTML(this.parseTokens(template), data);
            } //END-function engin

        };//--namespace.template--

        //-----------------------
           return namespace;  //|---__--__--__-->>>>执行window.Open=namespace
        //-----------------------
    })() //window.Open

} else { //if(window.Open==undefined)
    console.log("😜Open.js Error:window.Open,it already exists");
}