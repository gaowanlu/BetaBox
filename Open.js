/*!
 * Open.js v0.1.4
 * (c) 2021-2021 Wanlu Gao (China)
 * Released under the MIT License.
 * GitHub  https://github.com/gaowanlu/Open.js
 */

window.Open=(function(){
var namespace={};


/*namespace
*       |-select
*           |-get_name_type
*           |-get_nodes
*/
    namespace.select=function(name,parent){
        function get_name_type(string){//判断标志类型
            if(typeof(string)=="string"&&string.length>2&&string[0]=='.'){
                return "class";
            }else if(typeof(string)=="string"&&string.length>2&&string[0]=='#'){
                return "id";
            }else if(typeof(string)=="string"&&string.length>0){
                return "tag";
            }else {
                return null;
            }
        }
        function get_nodes(name,doc){//获得节点
            console.log(name,doc);
            let name_type=get_name_type(name);
            console.log(name_type);
            if(!name_type)return null;
            if(doc){
                if(name_type=="class"){
                    return doc.getElementsByClassName(name.slice(1,name.length));
                }else if(name_type=="id"){
                    return doc.getElementById(name.slice(1,name.length));
                }else if(name_type=="tag"){
                    return doc.getElementsByTagName(name);
                }else{
                    return null;
                }
            }else{
                if(name_type=="class"){
                    return document.getElementsByClassName(name.slice(1,name.length));
                }else if(name_type=="id"){
                    return document.getElementById(name.slice(1,name.length));
                }else if(name_type=="tag"){
                    return document.getElementsByTagName(name);
                }else{
                    return null;
                }
            }
        }
        return get_nodes(name,parent);
    };//--namespace.select--


/*namespace
*       |-createNode
*/
    namespace.createNode=function(tag,styleObj,cssList,state){
        let type=typeof(tag);
        if(type!="string"){//@判断参数类型
            return null;
        }
        let newNode=null;
        //@使用异常避免没有相应的tag名称而造成崩溃
        try{newNode=document.createElement(tag);}catch(err){return null;}
        if(newNode){
            try{//添加style
                try{this.style(newNode,styleObj);}catch(err){}
            }catch(err){}
            try{//添加css name
                for(let i=0;i<cssList.length;i++){
                    try{newNode.classList.add(cssList[i]);}catch(err){}
                }
            }catch(err){}
            try{//添加属性
                for(let i in state){
                    try{newNode[i]=state[i];}catch(err){}
                }
            }catch(err){}
        }
        newNode.OPENJS_child={};
        return newNode;
    };//--namespace.createNode--


/*namespace
*       |-print
*/
    namespace.print=window.console.log;
    //--namespace.print--


/*namespace
*       |-deleteNode
*/
    namespace.deleteNode=function(nodes,index){
        if(typeof(nodes)!='object'||typeof(index)!="number")
            return null;
        if(nodes&&nodes.length==undefined){
            //delete this node
            try{nodes.parentNode.removeChild(nodes);}catch(err){}
        }else if(nodes&&nodes.length>0&&index<nodes.length){
            if(index==-1){//delete all nodes
                while(nodes.length){
                    try{nodes[0].parentNode.removeChild(nodes[0]);}catch(err){}
                }
            }else{//delete first node
                try{nodes[index].parentNode.removeChild(nodes[index]);}catch(err){}
            }
        }
    };//--namespace.deleteNode

/*namespace
*       |-px
*/
    namespace.px=function(flag){
        let type=typeof(flag);
        if(type=="string"){
            //去掉全部空格
            flag=flag.replace(/(^\s*)|(\s*$)/g, "");
            //检测字符串是否全为数组组成
            if(Number(flag)+'' !==NaN+'' ){//@全为数字
                //判断是否合法
                if(Number(flag)<0){
                    flag=0;
                }else{
                    flag=Math.floor(parseFloat(flag));
                }
                return parseInt(flag).toString()+"px";
            }
            //判断是否为"500px"格式
            let stringArray=flag.split('');
            if(stringArray.length>=3){
                if(stringArray[stringArray.length-1]!="x"||stringArray[stringArray.length-2]!="p"){
                    return null;
                }
                let tempArray=stringArray.slice(0,stringArray.length-2);
                let tempString=tempArray.join('');
                //判断tempString是否全为数字
                if(Number(tempString)+'' !==NaN+''){
                    return flag;
                }
            }
            //判断是否为"89%"格式
            stringArray=flag.split('');
            if(stringArray.length>=2){
                if(stringArray[stringArray.length-1]!='%'){
                    return null;
                }
                let tempArray=stringArray.slice(0,stringArray.length-1);
                let tempString=tempArray.join('');
                //判断tempString是否全为数字
                if(Number(tempString+''!==NaN+'')){
                    return flag;
                }
            }
            //错误格式参数
            return null;
        }else if(type=="number"){//数字类型
            if(flag<0){
                flag=0;
            }else{
                flag=Math.floor(flag);
            }
            return parseInt(flag).toString()+"px";
        }else{
            return null;
        }
    }//--namespace.px--

/*namespace
*       |-style
*/
    namespace.style=function(nodes,style,index){
        if(typeof(nodes)!="object"){
            return null;
        }
        //style is a string
        if(typeof(style)=="string"){
            if(nodes&&nodes.length==undefined){
                try{nodes.setAttribute("style",style);}catch(err){}
            }else if(nodes&&(index<nodes.length||index==-1)){
                if(index==-1){
                    //change all style of nodes
                    for(let i=0;i<nodes.length;i++){
                        try{nodes[i].setAttribute("style",style);}catch(err){}
                    }
                }else if(index>=0){
                    try{nodes[index].setAttribute("style",style);}catch(err){}
                }
            }
            return true;
        }//--style is a string--

        //style is a object-content array
        if(typeof(style)=="object"&&style.length!=undefined&&style.length>=0){
            if(nodes&&nodes.length==undefined){
                for(let i=0;i<style.length;i++){
                    for(let key in style[i]){
                        try{nodes.style[key]=style[i][key]}catch(err){}
                    }
                }
            }else if(nodes&&(index<nodes.length||index==-1)){
                if(index==-1){
                    //change all style of nodes
                    for(let k=0;k<style.length;k++){
                        for(let i=0;i<nodes.length;i++){
                            for(let key in style[k]){
                                try{nodes[i].style[key]=style[k][key]}catch(err){}
                            }
                        }                        
                    }
                }else if(index>=0){
                    for(let k=0;k<style.length;k++){
                        for(let key in style[k]){
                            try{nodes[index].style[key]=style[k][key]}catch(err){}
                        }                        
                    }
                }
            }
            return true;
        }//--style is a object-content array--

        //style is a object
        if(typeof(style)=="object"&&style.length==undefined){
            if(nodes&&nodes.length==undefined){
                for(let key in style){
                    try{nodes.style[key]=style[key]}catch(err){}
                }
            }else if(nodes&&(index<nodes.length||index==-1)){
                if(index==-1){
                    //change all style of nodes
                    for(let i=0;i<nodes.length;i++){
                        for(let key in style){
                            try{nodes[i].style[key]=style[key]}catch(err){}
                        }
                    }
                }else if(index>=0){
                    for(let key in style){
                        try{nodes[index].style[key]=style[key]}catch(err){}
                    }
                }
            }
            return true;
        }//--style is a object--

    }//--namespace.style--

/*namespace
*       |-class
*/
    namespace.class=function(nodes,classList,type,index){
        if(typeof(nodes)!="object"||!classList||classList.length==undefined){
            return null;
        }
        if(type=="+"){//add class name
            if(nodes.length==undefined){// one node
                for(let i=0;i<classList.length;i++){
                    try{nodes.classList.add(classList[i]);}catch(err){}
                }
            }else if(index==-1){// all nodes
                for(let i=0;i<nodes.length;i++){
                    for(let j=0;j<classList.length;j++){
                        try{nodes[i].classList.add(classList[j]);}catch(err){}
                    }
                }
            }else if(index>=0&&(index<nodes.length||index==-1)){//index node
                for(let i=0;i<classList.length;i++){
                    try{nodes[index].classList.add(classList[i]);}catch(err){}
                }
            }
        }else if(type=="-"){//delete class name
            if(nodes.length==undefined){// one node
                for(let i=0;i<classList.length;i++){
                    try{nodes.classList.remove(classList[i]);}catch(err){}
                }
            }else if(index==-1){// all nodes
                for(let i=0;i<nodes.length;i++){
                    for(let j=0;j<classList.length;j++){
                        try{nodes[i].classList.remove(classList[j]);}catch(err){}
                    }
                }
            }else if(index>=0&&(index<nodes.length||index==-1)){//index node
                for(let i=0;i<classList.length;i++){
                    try{nodes[index].classList.remove(classList[i]);}catch(err){}
                }
            }
        }
    }//--namespace.class--

return namespace;
})();