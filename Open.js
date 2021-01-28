//@OpenJs对象构造器
function OpenJs(dom){    
    function factory(dom){
        //@创建空对象openjs即返回值
        let openjs={
            class:null,
            id:null,
            dom:null
        };
        //为openjs对象添加dom属性即相对应的dom对象
        openjs.dom=OPENJS_get_dom_obj(openjs,dom);
        return openjs;
    }
    return factory(dom);
}

//@判断dom标志的种类是class名称还是id名称
function OPENJS_dom_flag_type(string){
    if(typeof(string)=="string"&&string[0]=='.'){
        return "className";
    }else if(typeof(string)=="string"&&string[0]=='#'){
        return "id";
    }else{
        return "null";
    }
}

//@获得dom对象
function OPENJS_get_dom_obj(obj,string){
    if(OPENJS_dom_flag_type(string)=="className"){
        let name=string.slice(1,string.length);//@去除开头的.字符
        obj.class=name;//@更新标志
        obj.id=null;
        return document.getElementsByClassName(name);//@返回DOM对象
    }else if(OPENJS_dom_flag_type(string)=="id"){
        let name=string.slice(1,string.length);//@去除开头的.字符
        obj.id=name;//@更新标志
        obj.class=null;
        return document.getElementById(name);//返回DOM对象
    }else{
        return null;
    }
}

//@将数字或者数字字符串转为形如 "600px" 的字符串
function OPENJS_Px(flag){
    let type=typeof(flag);
    if(type=="string"){
        //检测字符串是否全为数组组成
        if(Number(flag)+'' !==NaN+'' ){//@全为数字
            //判断是否合法
            if(Number(flag)<0){
                flag=0;
            }else{
                flag=Math.floor(parseFloat(flag));
            }
            return parseInt(flag).toString()+"px";
        }else{
            return null;
        }
    }else if(type=="number"){
        if(flag<0){
            flag=0;
        }else{
            flag=Math.floor(flag);
        }
        return parseInt(flag).toString()+"px";
    }else{
        return null;
    }
}

//@创建新的HTML DOM元素
function OPENJS_createDOM(tag){
    let type=typeof(tag);
    if(type!="string"){//@判断参数类型
        return null;
    }
    let newNode=null;
    //@使用异常避免没有相应的tag名称而造成崩溃
    try{newNode=document.createElement(tag);}catch(err){return null;}
    return newNode;
}


//@为DOM元素新加classname或者去掉classname
function OPENJS_DELETE_OR_ADD_CLASSNAME(flag,classname,index,type){
    let DOMs=OpenJs(flag);
    if(flag.id){//可以直接让OpenJS对象做flag
        DOMs=OpenJs(flag.id);
    }else if(flag.class){
        DOMs=OpenJs(flag.class);
    }
    if(DOMs&&DOMs.dom){//DOM获取成功
        if(DOMs.id){//获得一个节点
            if(type==1){
                try{DOMs.dom.classList.remove(classname);}catch(err){}
            }else{
                try{DOMs.dom.classList.add(classname);}catch(err){} 
            }   
        }else if(DOMs.class){//获得节点LIST对象
            if(typeof(index)=="number"&&index>=0&&index<DOMs.dom.length){
                if(type==1){
                    try{DOMs.dom[index].classList.remove(classname);}catch(err){}
                }else{
                    try{DOMs.dom[index].classList.add(classname);}catch(err){} 
                }   
            }else{
                for(let i=0;i<DOMs.dom.length;i++){
                    if(type==1){
                        try{DOMs.dom[i].classList.remove(classname);}catch(err){}
                    }else{
                        try{DOMs.dom[i].classList.add(classname);}catch(err){}
                    } 
                }
            }
        }
    }
}


//@更改DOM元素的style
function OPENJS_style(flag,obj,index){
    if(typeof(obj)!="object"){
        return null;
    }
    let DOMs=OpenJs(flag);
    if(flag.id){//可以直接让OpenJS对象做flag
        DOMs=OpenJs(flag.id);
    }else if(flag.class){
        DOMs=OpenJs(flag.class);
    }
    if(DOMs&&DOMs.dom){//DOM获取成功
        if(DOMs.id){//获得一个节点
            //遍历obj
            for(let key in obj){
                try{DOMs.dom.style[key]=obj[key]}catch(err){}
            }
        }else if(DOMs.class){//获得节点LIST对象
            if(typeof(index)=="number"&&index>=0&&index<DOMs.dom.length){
                for(let key in obj){
                    try{DOMs.dom[index].style[key]=obj[key]}catch(err){}
                }
            }else{
                //遍历节点
                for(let i=0;i<DOMs.dom.length;i++){
                    for(let key in obj){
                        try{DOMs.dom[i].style[key]=obj[key]}catch(err){}
                    }
                }
            }
        }
    }
}

//@为DOM元素追加新的class或者去掉指定的class
function OPENJS_deleteClass(flag,classname,index){
    OPENJS_DELETE_OR_ADD_CLASSNAME(flag,classname,index,1);
}

//@为DOM元素删除classname
function OPENJS_addClass(flag,classname,index){
    OPENJS_DELETE_OR_ADD_CLASSNAME(flag,classname,index,0);
}

//@删除DOM元素
function OPENJS_deleteDOM(flag,index){
    let DOMs=OpenJs(flag);
    if(flag.id){//可以直接让OpenJS对象做flag
        DOMs=OpenJs(flag.id);
    }else if(flag.class){
        DOMs=OpenJs(flag.class);
    }
    if(DOMs&&DOMs.dom){//DOM获取成功
        if(DOMs.id){//获得一个节点
            //获得节点的父节点
            let parentNode=DOMs.dom.parentNode;
            //删除指定节点
            try{parentNode.removeChild(DOMs.dom);}catch(err){}
        }else if(DOMs.class){//获得节点LIST对象
            if(typeof(index)=="number"&&index>=0&&index<DOMs.dom.length){
                //删除指定下标元素
                let Node=DOMs.dom[index];
                //获得Node父节点并删除Node
                let parentNode=Node.parentNode;
                try{parentNode.removeChild(Node);}catch(err){}
            }else{
                //迭代数组删除
                while(DOMs.dom.length){
                    let Node=DOMs.dom[0];
                    //获得Node父节点并删除Node
                    let parentNode=Node.parentNode;
                    try{parentNode.removeChild(Node);}catch(err){}
                } 
            }
        }
    }
}



