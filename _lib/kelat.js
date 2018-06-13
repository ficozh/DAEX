/**
 * kelat JavaScript Library v1.2.4-beta
 * http://git.oschina.net/ficozhe/K-UI
 * https://github.com/ficozh/KUI
 *
 * Date: 2017-01-03
 */
(function(Global, factory){
    if(typeof module === "object" && typeof module.exports === "object"){
        module.exports = Global.document ?
            factory(Global, true) :
            function(w){
                if(!w.document){
                    throw new Error("kelat requires window & document");
                };
                return factory(w);
            };
    }else{
        Global.$$ = factory(Global);
    };
}(typeof window !== "undefined" ? window : this,function(window){
'use strict';
// 版本
var version = "1.2.4";
var classType = {};
var toString = classType.toString;
var hasOwn = classType.hasOwnProperty;
var KUIAPP = {
    //类型
    type : function( obj ) {
        if(obj === null){
            return obj + "";
        }
        //支持：Android的<4.0 功能正则表达式
        return typeof obj === "object" || typeof obj === "function" ? classType[ toString.call(obj) ] || "object" : typeof obj;
    },
    //是否为数组
    isArray : function(arr){
        return (Object.prototype.toString.apply(arr) === '[object Array]') ? true : false;
    },
    //是否在Window容器
    isWindow : function(obj) {
        return obj != null && obj === obj.window;
    }
};
//是否普通对象
KUIAPP.isPlainObject = function(obj) {
    // 不是普通的对象:
    // - 任何对象或值，其内部的 [[Class]] 属性不是 "[object Object]"
    // - DOM节点
    // - window窗口
    if(KUIAPP.type(obj) !== "object" || obj.nodeType || KUIAPP.isWindow(obj != null && obj === obj.window)){
        return false;
    };
    if(obj.constructor && !hasOwn.call( obj.constructor.prototype, "isPrototypeOf" )){
        return false;
    };
    //如果没有返回
    //|obj|是一个普通的对象, 通过创建 {} 或新构造的对象
    return true;
};

//扩展 --- 功能参考 jQuery
KUIAPP.Extend = function(){
    var options, name, src, copy, copyIsArray, clone,
        target = arguments[0] || {},
        index = 1,
        length = arguments.length,
        deep = false;
    //深拷贝情况处理
    if(typeof target === "boolean"){
        deep = target;
        //跳过 boolean 和 target
        target = arguments[index] || {};
        index++;
    }
    //当目标是一个字符串或深拷贝的情况下
    if(typeof target !== "object" && typeof target !=="function"){
        target = {};
    };
    //扩展 kelat 本身，如果只有一个参数传递
    if(index === length ){
        target = this;
        index--;
    };
    for(;index< length;index++){
        //只处理非空/未定义的值
        if((options = arguments[index]) != null){
            //扩展基本对象
            for(name in options){
                src = target[name];
                copy = options[name];
                //防止无限循环
                if(target === copy){ continue; };
                //递归合并纯对象或数组
                if(deep && copy && (KUIAPP.isPlainObject(copy) || (copyIsArray = KUIAPP.isArray(copy)))){
                    if(copyIsArray){
                        copyIsArray = false;
                        clone = src && KUIAPP.isArray(src) ? src : [];
                    }else{
                        clone = src && KUIAPP.isPlainObject(src) ? src : {};
                    };
                    //不移动原始对象并克隆
                    target[name] = KUIAPP.Extend(deep, clone, copy);
                //不带未定义的值
                }else if(copy !== undefined){
                    target[name] = copy;
                };
            };
        };
    };
    //返回修改过的对象
    return target;
};

//设置语言
var KUILocale = {
  "SYSTEM_LANGUAGE": {
    "MODAL": {
        TIPS:'提示',
        OK:'确定',
        CANCEL:'取消'
    },
    "IMG":{
        IMGTIPS:'图片格式不正确或者跨域请求！',
        IMGPlaceholder :'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7'
    },
    "LOADING": [
      '正在加载...'
    ]
  },
  "WrapperArea": 'WrapperArea',
  "id": "zh-cn"
};

window['kelatlocale'] = KUILocale;

/***** 定义局部参数 *****/
var Local = {
    //网址
    website:'https://github.com/ficozh/KUI',
    //图片
    ImgPlaceholder:kelatlocale.SYSTEM_LANGUAGE.IMG.IMGPlaceholder,
    ImgLazyLoadThreshold : 0,
    ImgLazyLoadSequential: true,
    ImgTips : kelatlocale.SYSTEM_LANGUAGE.IMG.IMGTIPS,
    // 区域设定
    WrapperArea : kelatlocale.WrapperArea,
    // 层高
    LayerIndex : '2000',
    // 加载
    LoadingTitle : kelatlocale.SYSTEM_LANGUAGE.LOADING,
    LoadingHtml : '<span class="Loading LoadingWhite"></span>',
    // 模态框
    ModalTitle : kelatlocale.SYSTEM_LANGUAGE.MODAL.TIPS,
    ModalButtonOk : kelatlocale.SYSTEM_LANGUAGE.MODAL.OK,
    ModalButtonCancel : kelatlocale.SYSTEM_LANGUAGE.MODAL.CANCEL,
    isModalPopover : false,
    // 正则
    RegExpr : {
        rnotwhite : ( /\S+/g ),
        rclass : /[\t\r\n\f]/g,
        trim   : /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        device : {
            android : /(Android);?[\s\/]+([\d.]+)?/,
            ipad    : /(iPad).*OS\s([\d_]+)/,
            ipod    : /(iPod)(.*OS\s([\d_]+))?/,
            iphone  : /(iPhone\sOS)\s([\d_]+)/,
        }
    },
    // 特性支持检测
    support : (function(){
        /***** 事件检测 *****/
        var desktopEvents = ['mousedown', 'mousemove', 'mouseup'];
        if(window.navigator.pointerEnabled){
            desktopEvents = ['pointerdown', 'pointermove', 'pointerup'];
        }else if(window.navigator.msPointerEnabled){
            desktopEvents = ['MSPointerDown', 'MSPointerMove', 'MSPointerUp'];
        };
        var support = {};
            support['touch'] = !!(('ontouchstart' in window) || window.DocumentTouch && document instanceof DocumentTouch);
            //选中检查 checked="checked" or checked
            support['rchecked'] = /checked\s*(?:[^=]|=\s*.checked.)/i,
            //事件检测
            support['desktopEvents'] = desktopEvents;
            //事件类型
            support['onClick'] = 'click';
            /**滚动条位置
             * @return {Array} 滚动条 X,滚动条 Y
             */
            support['GetPageScroll'] = function() {
                var x = "",y = "";
                if(window.pageYOffset){
                    //除了IE
                    y = window.pageYOffset;x = window.pageXOffset;
                }else if(document.documentElement && document.documentElement.scrollTop){
                    //IE 6严格
                    y = document.documentElement.scrollTop;x = document.documentElement.scrollLeft;
                }else if(document.body){
                    //所有其他的IE
                    y = document.body.scrollTop;x = document.body.scrollLeft;
                };
                return {X:x,Y:y};
            };
            /**页面位置及窗口大小
             * @return {Array} 页面宽度 PageW,页面高度 PageH,窗口宽度 WinW,窗口高度 WinH
             */
            support['GetPageSize'] = function() {
                var _ScrW = "",_ScrH = "";
                if(window.innerHeight && window.scrollMaxY){
                    //Mozilla
                    _ScrW = window.innerWidth + window.scrollMaxX;_ScrH = window.innerHeight + window.scrollMaxY;
                }else if (document.body.scrollHeight > document.body.offsetHeight){
                    //all but IE Mac
                    _ScrW = document.body.scrollWidth;_ScrH = document.body.scrollHeight;
                }else if (document.body){
                    //IE Mac
                    _ScrW = document.body.offsetWidth;_ScrH = document.body.offsetHeight;
                };
                var _WinW = "",_WinH = "";
                if(window.innerHeight){
                    //all except IE
                    _WinW = window.innerWidth;_WinH = window.innerHeight;
                }else if(document.documentElement && document.documentElement.clientHeight){
                    //IE 6 Strict Mode
                    _WinW = document.documentElement.clientWidth;_WinH = document.documentElement.clientHeight;
                }else if(document.body){
                    //other
                    _WinW = document.body.clientWidth;_WinH = document.body.clientHeight;
                };
                //页面小于窗口,设置和窗口相等
                var _PageW = (_ScrW < _WinW) ? _WinW : _ScrW;
                var _PageH = (_ScrH < _WinH) ? _WinH : _ScrH;
                return {"PageW":_PageW,"PageH":_PageH,"WinW":_WinW,"WinH":_WinH};
            };
        return support;
    })()
};

//提示信息
(function(){
    if(!window.isHello){
        var KUI ="kelat.js " + version + " - ✰ KUI ✰ ";
        var KUIMail ="\n\n如有任何意见和建议可发送邮件至 ficozh@163.com\n\n";
        var Padding = 'padding:5px 0';
        var Padding0CF = 'background:#0CF;'+Padding;
        var Padding111 = 'background:#111;color:#FFF;'+Padding;
        var PaddingCFF = 'background:#CFF;'+Padding;
        var Color000 = 'color:#000';
        if(navigator.userAgent.toLowerCase().indexOf("chrome") > -1){
            var Copyright = ["%c %c "+KUI+" %c %c " + Local.website + " %c %c " + KUIMail,Padding0CF,Padding111,Padding0CF,PaddingCFF,Padding0CF,Color000];
            window.console.log.apply(console, Copyright)
        }else{
            window.console && window.console.log(KUI + Local.website + KUIMail);
        }
        window.isHello = !0;
    }
})();

/***** 创建对象 *****/
if(!window['kelat']){
    window['kelat'] = function(selector, context){
        return new window['kelat']['kelatDom'](selector, context);
    };
    window['kelat']['version'] = version;
}else{
    return
};
/***** DOM 操作 *****/
/** 获得类 */
function getClass(elem) {
    return elem.getAttribute && elem.getAttribute( "class" ) || "";
};

var kelatDom = (function(){
    var kelatDom = function(arr){
        var _this = this, i = 0;
        //创建数组对象
        for(i = 0; i < arr.length; i++){
            _this[i] = arr[i];
        }
        _this.length = arr.length;
        //返回集合的方法
        return this;
    };
    var $ = function(selector, context){
        var arr = [], i = 0;
        if(selector && !context){
            if(selector instanceof kelatDom){
                return selector;
            };
        };
        if(selector){
            //String
            if(typeof selector === 'string'){
                var els, tempParent, html; 
                    selector = html = selector.replace(Local.RegExpr.trim,'');
                if(html.indexOf('<') >= 0 && html.indexOf('>') >= 0){
                    var toCreate = 'div';
                    if(html.indexOf('<li') === 0){toCreate = 'ul';}
                    if(html.indexOf('<tr') === 0){toCreate = 'tbody';}
                    if(html.indexOf('<td') === 0 || html.indexOf('<th') === 0){toCreate = 'tr';}
                    if(html.indexOf('<tbody') === 0){toCreate = 'table';}
                    if(html.indexOf('<option') === 0){toCreate = 'select';}
                    tempParent = document.createElement(toCreate);
                    tempParent.innerHTML = html;
                    for(i = 0; i < tempParent.childNodes.length; i++){
                        arr.push(tempParent.childNodes[i]);
                    };
                }else{
                    if(!context && selector[0] === '#' && !selector.match(/[ .<>:~]/)){
                        //纯ID选择器
                        els = [document.getElementById(selector.split('#')[1])];
                    }else{
                        //其他选择
                        els = (context || document).querySelectorAll(selector);
                    };
                    for(i = 0; i < els.length; i++){
                        if (els[i]) arr.push(els[i]);
                    };
                };
            }
            //节点/单元
            else if(selector.nodeType || selector === window || selector === document){
                arr.push(selector);
            }
            //对DOM元素或实例数组
            else if(selector.length > 0 && selector[0].nodeType){
                for(i = 0; i < selector.length; i++){
                    arr.push(selector[i]);
                }
            }
        }
        return new kelatDom(arr);
    };

    kelatDom.prototype = {
        //类和属性
        addClass: function(className){
            var classes, elem, cur, curValue, clazz, j, finalValue,i = 0;
            if(typeof className === "function"){
                return this.each(function(j){
                    $$(this).addClass(className.call(this, j, getClass(this)));
                });
            };
            if(typeof className === "string" && className ){
                classes = className.match(Local.RegExpr.rnotwhite) || [];
                while(( elem = this[ i++ ] )){
                    curValue = getClass(elem);
                    cur = elem.nodeType === 1 && (" " + curValue + " ").replace(Local.RegExpr.rclass," ");
                    if(cur){
                        j=0;
                        while((clazz = classes[ j++ ])){
                            if(cur.indexOf(" " + clazz + " ") < 0){
                                cur += clazz + " ";
                            }
                        }
                        // Only assign if different to avoid unneeded rendering.
                        finalValue = cur.replace(Local.RegExpr.trim,'');
                        if(curValue !== finalValue){
                            elem.setAttribute("class", finalValue);
                        }
                    }
                }
            }
            return this;
        },
        removeClass: function(className){
            var classes = className.split(' ');
            for(var i = 0; i < classes.length; i++){
                for(var j = 0; j < this.length; j++){
                    if(typeof this[j].classList !== 'undefined'){
                        this[j].classList.remove(classes[i]);
                    }
                }
            }
            return this;
        },
        hasClass: function(className){
            return !this[0] ? false : this[0].classList.contains(className);
        },
        toggleClass: function(className){
            var classes = className.split(' ');
            for(var i = 0; i < classes.length; i++){
                for(var j = 0; j < this.length; j++){
                    if(typeof this[j].classList !== 'undefined'){
                        this[j].classList.toggle(classes[i]);
                    }
                }
            }
            return this;
        },
        attr: function(attrs, value){
            if(arguments.length === 1 && typeof attrs === 'string'){
                //获取attr
                if(this[0]) return this[0].getAttribute(attrs);
                else return undefined;
            }else{
                //设定attrs
                for(var i = 0; i < this.length; i++) {
                    if(arguments.length === 2){
                        //String
                        this[i].setAttribute(attrs, value);
                    }else{
                        //Object
                        for(var attrName in attrs){
                            this[i][attrName] = attrs[attrName];
                            this[i].setAttribute(attrName, attrs[attrName]);
                        }
                    }
                }
                return this;
            }
        },
        removeAttr: function(attr){
            for(var i = 0; i < this.length; i++){
                this[i].removeAttribute(attr);
            }
            return this;
        },
        prop: function(props, value){
            if(arguments.length === 1 && typeof props === 'string'){
                //获取
                return this[0] ? this[0][props] : undefined;
            }else{
                //设定
                for(var i = 0; i < this.length; i++){
                    if(arguments.length === 2){
                        // String
                        this[i][props] = value;
                    }else{
                        // Object
                        for(var propName in props){
                            this[i][propName] = props[propName];
                        }
                    }
                }
                return this;
            }
        },
        dataset: function(){
            var el = this[0];
            if(el){
                var dataset = {};
                if(el.dataset){
                    for(var dataKey in el.dataset){
                        dataset[dataKey] = el.dataset[dataKey];
                    }
                }else{
                    for(var i = 0; i < el.attributes.length; i++){
                        var attr = el.attributes[i];
                        if(attr.name.indexOf('data-') >= 0){
                            dataset[$.toCamelCase(attr.name.split('data-')[1])] = attr.value;
                        }
                    }
                }
                for(var key in dataset){
                    if(dataset[key] === 'false') { dataset[key] = false; }
                    else if (dataset[key] === 'true') { dataset[key] = true; }
                    else if (parseFloat(dataset[key]) === dataset[key] * 1) { dataset[key] = dataset[key] * 1; }
                }
                return dataset;
            }else {
                return undefined;
            }
        },
        val: function(value){
            if(typeof value === 'undefined'){
                return this[0] ? this[0].value : undefined;
            }else{
                for(var i = 0; i < this.length; i++){
                    this[i].value = value;
                }
                return this;
            }
        },
        //变换
        transform : function(transform){
            for(var i = 0; i < this.length; i++){
                var elStyle = this[i].style;
                elStyle.webkitTransform = elStyle.MsTransform = elStyle.msTransform = elStyle.MozTransform = elStyle.OTransform = elStyle.transform = transform;
            }
            return this;
        },
        transition: function(duration){
            if(typeof duration !== 'string'){
                duration = duration + 'ms';
            }
            for(var i = 0; i < this.length; i++){
                var elStyle = this[i].style;
                elStyle.webkitTransitionDuration = elStyle.MsTransitionDuration = elStyle.msTransitionDuration = elStyle.MozTransitionDuration = elStyle.OTransitionDuration = elStyle.transitionDuration = duration;
            }
            return this;
        },
        //事件
        on: function(eventName, targetSelector, listener, capture){
            function handleLiveEvent(e) {
                var target = e.target;
                if($(target).is(targetSelector)) {
                    listener.call(target, e);
                }else{
                    var parents = $(target).parents();
                    for(var k = 0; k < parents.length; k++){
                        if($(parents[k]).is(targetSelector)){
                            listener.call(parents[k], e);
                        }
                    }
                }
            }
            var events = eventName.split(' ');
            var i, j;
            for(i = 0; i < this.length; i++){
                if(typeof targetSelector === 'function' || targetSelector === false){
                    // Usual events
                    if(typeof targetSelector === 'function'){
                        listener = arguments[1];
                        capture = arguments[2] || false;
                    }
                    for(j = 0; j < events.length; j++){
                        this[i].addEventListener(events[j], listener, capture);
                    }
                }else{
                    //Live events
                    for(j = 0; j < events.length; j++){
                        if(!this[i].kelatDomLiveListeners) this[i].kelatDomLiveListeners = [];
                        this[i].kelatDomLiveListeners.push({listener: listener, liveListener: handleLiveEvent});
                        this[i].addEventListener(events[j], handleLiveEvent, capture);
                    }
                }
            }
            return this;
        },
        off: function(eventName, targetSelector, listener, capture){
            var events = eventName.split(' ');
            for(var i = 0; i < events.length; i++){
                for(var j = 0; j < this.length; j++){
                    if(typeof targetSelector === 'function' || targetSelector === false){
                        //异常事件
                        if(typeof targetSelector === 'function'){
                            listener = arguments[1];
                            capture = arguments[2] || false;
                        }
                        this[j].removeEventListener(events[i], listener, capture);
                    }else{
                        //Live event
                        if(this[j].kelatDomLiveListeners){
                            for(var k = 0; k < this[j].kelatDomLiveListeners.length; k++){
                                if(this[j].kelatDomLiveListeners[k].listener === listener){
                                    this[j].removeEventListener(events[i], this[j].kelatDomLiveListeners[k].liveListener, capture);
                                }
                            }
                        }
                    }
                }
            }
            return this;
        },
        once: function(eventName, targetSelector, listener, capture){
            var dom = this;
            if(typeof targetSelector === 'function'){
                listener = arguments[1];
                capture = arguments[2];
                targetSelector = false;
            }
            function proxy(e){
                listener.call(e.target, e);
                dom.off(eventName, targetSelector, proxy, capture);
            }
            return dom.on(eventName, targetSelector, proxy, capture);
        },
        trigger: function(eventName, eventData){
            var events = eventName.split(' ');
            for(var i = 0; i < events.length; i++){
                for(var j = 0; j < this.length; j++){
                    var evt;
                    try{
                        evt = new CustomEvent(events[i], {detail: eventData, bubbles: true, cancelable: true});
                    }catch(e){
                        evt = document.createEvent('Event');
                        evt.initEvent(events[i], true, true);
                        evt.detail = eventData;
                    }
                    this[j].dispatchEvent(evt);
                }
            }
            return this;
        },
        transitionEnd: function(callback){
            var events = ['webkitTransitionEnd', 'transitionend', 'oTransitionEnd', 'MSTransitionEnd', 'msTransitionEnd'], i, dom = this;
            function fireCallBack(e){
                /*jshint validthis:true */
                if(e.target !== this){ return; }
                callback.call(this, e);
                for(i = 0; i < events.length; i++){
                    dom.off(events[i], fireCallBack);
                }
            }
            if(callback){
                for(i = 0; i < events.length; i++){
                    dom.on(events[i], fireCallBack);
                }
            }
            return this;
        },
        animationEnd: function(callback){
            var events = ['webkitAnimationEnd', 'OAnimationEnd', 'MSAnimationEnd', 'animationend'], i, dom = this;
            function fireCallBack(e){
                callback(e);
                for(i = 0; i < events.length; i++){
                    dom.off(events[i], fireCallBack);
                }
            }
            if(callback){
                for(i = 0; i < events.length; i++){
                    dom.on(events[i], fireCallBack);
                }
            }
            return this;
        },
        //尺寸/样式
        width: function(){
            if(this[0] === window){
                return window.innerWidth;
            }else{
                return (this.length > 0) ? parseFloat(this.css('width')) : null;
            }
        },
        outerWidth: function(includeMargins){
            if(this.length > 0){
                if(includeMargins){
                    var styles = this.styles();
                    return this[0].offsetWidth + parseFloat(styles.getPropertyValue('margin-right')) + parseFloat(styles.getPropertyValue('margin-left'));
                }else{
                    return this[0].offsetWidth;
                }
            }else{
                return null;
            }
        },
        height: function(){
            if(this[0] === window){
                return window.innerHeight;
            }else{
                return (this.length > 0) ? parseFloat(this.css('height')) : null ;
            }
        },
        outerHeight: function(includeMargins){
            if(this.length > 0){
                if(includeMargins){
                    var styles = this.styles();
                    return this[0].offsetHeight + parseFloat(styles.getPropertyValue('margin-top')) + parseFloat(styles.getPropertyValue('margin-bottom'));    
                }else{
                    return this[0].offsetHeight;
                }
            }else{
                return null;
            }
        },
        offset: function(){
            if(this.length > 0){
                var el = this[0];
                var box = el.getBoundingClientRect();
                var body = document.body;
                var clientTop  = el.clientTop  || body.clientTop  || 0;
                var clientLeft = el.clientLeft || body.clientLeft || 0;
                var scrollTop  = window.pageYOffset || el.scrollTop;
                var scrollLeft = window.pageXOffset || el.scrollLeft;
                return {
                    top: box.top  + scrollTop  - clientTop,
                    left: box.left + scrollLeft - clientLeft
                };
            }else{
                return null;
            }
        },
        hide: function(){
            for(var i = 0; i < this.length; i++){
                this[i].style.display = 'none';
            }
            return this;
        },
        show: function(){
            for(var i = 0; i < this.length; i++){
                this[i].style.display = 'block';
            }
            return this;
        },
        styles: function(){
            if(this[0]){ return window.getComputedStyle(this[0], null); }
        },
        css: function(props, value){
            var i;
            if(arguments.length === 1){
                if(typeof props === 'string'){
                    if(this[0]) return window.getComputedStyle(this[0], null).getPropertyValue(props);
                }else{
                    for(i = 0; i < this.length; i++){
                        for(var prop in props){
                            this[i].style[prop] = props[prop];
                        }
                    }
                    return this;
                }
            }
            if(arguments.length === 2 && typeof props === 'string'){
                for(i = 0; i < this.length; i++){
                    this[i].style[props] = value;
                }
                return this;
            }
            return this;
        },
        //DOM操作
        each: function(callback){
            for(var i = 0; i < this.length; i++){
                callback.call(this[i], i, this[i]);
            }
            return this;
        },
        filter: function(callback){
            var matchedItems = [];
            var dom = this;
            for(var i = 0; i < dom.length; i++){
                if(callback.call(dom[i], i, dom[i])) matchedItems.push(dom[i]);
            }
            return new kelatDom(matchedItems);
        },
        html: function(html){
            if(typeof html === 'undefined'){
                return this[0] ? this[0].innerHTML : undefined;
            }else{
                for(var i = 0; i < this.length; i++) {
                    this[i].innerHTML = html;
                }
                return this;
            }
        },
        text: function(text){
            if(typeof text === 'undefined'){
                return this[0] ? this[0].textContent.trim() : null;
            }else{
                for(var i = 0; i < this.length; i++){
                    this[i].textContent = text;
                }
                return this;
            }
        },
        is: function(selector){
            if(!this[0] || typeof selector === 'undefined') return false;
            var compareWith, i;
            if(typeof selector === 'string'){
                var el = this[0];
                if(el === document) return selector === document;
                if(el === window) return selector === window;
                if(el.matches){ return el.matches(selector);}
                else if(el.webkitMatchesSelector){return el.webkitMatchesSelector(selector);}
                else if(el.mozMatchesSelector){return el.mozMatchesSelector(selector);}
                else if(el.msMatchesSelector){return el.msMatchesSelector(selector);}
                else{
                    compareWith = $(selector);
                    for(i = 0; i < compareWith.length; i++){
                        if(compareWith[i] === this[0]){
                            return true;
                        };
                    }
                    return false;
                }
            }else if(selector === document){return this[0] === document;}
            else if(selector === window){return this[0] === window;}
            else {
                if(selector.nodeType || selector instanceof kelatDom){
                    compareWith = selector.nodeType ? [selector] : selector;
                    for(i = 0; i < compareWith.length; i++){
                        if(compareWith[i] === this[0]) return true;
                    }
                    return false;
                }
                return false;
            }
    
        },
        indexOf: function(el){
            for(var i = 0; i < this.length; i++){
                if(this[i] === el) return i;
            }
        },
        index: function(){
            if(this[0]){
                var child = this[0];
                var i = 0;
                while((child = child.previousSibling) !== null){
                    if(child.nodeType === 1) i++;
                }
                return i;
            }else{
                return undefined;
            }
        },
        eq: function(index){
            if(typeof index === 'undefined') return this;
            var length = this.length;
            var returnIndex;
            if(index > length - 1){
                return new kelatDom([]);
            }
            if(index < 0){
                returnIndex = length + index;
                if (returnIndex < 0) return new kelatDom([]);
                else return new kelatDom([this[returnIndex]]);
            }
            return new kelatDom([this[index]]);
        },
        append: function(newChild){
            var i, j;
            for(i = 0; i < this.length; i++){
                if(typeof newChild === 'string'){
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newChild;
                    while (tempDiv.firstChild) {
                        this[i].appendChild(tempDiv.firstChild);
                    }
                }else if(newChild instanceof kelatDom){
                    for(j = 0; j < newChild.length; j++){
                        this[i].appendChild(newChild[j]);
                    }
                }else{
                    this[i].appendChild(newChild);
                }
            }
            return this;
        },
        appendTo: function(parent){
            $(parent).append(this);
            return this;
        },
        prepend: function(newChild){
            var i, j;
            for(i = 0; i < this.length; i++){
                if(typeof newChild === 'string'){
                    var tempDiv = document.createElement('div');
                    tempDiv.innerHTML = newChild;
                    for(j = tempDiv.childNodes.length - 1; j >= 0; j--){
                        this[i].insertBefore(tempDiv.childNodes[j], this[i].childNodes[0]);
                    }
                    // this[i].insertAdjacentHTML('afterbegin', newChild);
                }else if(newChild instanceof kelatDom){
                    for(j = 0; j < newChild.length; j++){
                        this[i].insertBefore(newChild[j], this[i].childNodes[0]);
                    }
                }else{
                    this[i].insertBefore(newChild, this[i].childNodes[0]);
                }
            }
            return this;
        },
        prependTo: function(parent){
            $(parent).prepend(this);
            return this;
        },
        insertBefore: function(selector){
            var before = $(selector);
            for(var i = 0; i < this.length; i++){
                if(before.length === 1){
                    before[0].parentNode.insertBefore(this[i], before[0]);
                }else if(before.length > 1){
                    for(var j = 0; j < before.length; j++){
                        before[j].parentNode.insertBefore(this[i].cloneNode(true), before[j]);
                    }
                }
            }
        },
        insertAfter: function(selector){
            var after = $(selector);
            for (var i = 0; i < this.length; i++) {
                if (after.length === 1) {
                    after[0].parentNode.insertBefore(this[i], after[0].nextSibling);
                }
                else if (after.length > 1) {
                    for (var j = 0; j < after.length; j++) {
                        after[j].parentNode.insertBefore(this[i].cloneNode(true), after[j].nextSibling);
                    }
                }
            }
        },
        next: function(selector){
            if(this.length > 0){
                if(selector){
                    if(this[0].nextElementSibling && $(this[0].nextElementSibling).is(selector)){
                        return new kelatDom([this[0].nextElementSibling]);
                    }else{
                        return new kelatDom([]);
                    };
                }else{
                    if(this[0].nextElementSibling){
                        return new kelatDom([this[0].nextElementSibling]);
                    }else{
                        return new kelatDom([]);
                    };
                }
            }
            else return new kelatDom([]);
        },
        nextAll: function(selector){
            var nextEls = [];
            var el = this[0];
            if(!el) return new kelatDom([]);
            while(el.nextElementSibling){
                var next = el.nextElementSibling;
                if(selector){
                    if($(next).is(selector)) nextEls.push(next);
                }
                else nextEls.push(next);
                el = next;
            }
            return new kelatDom(nextEls);
        },
        prev: function(selector){
            if(this.length > 0){
                if(selector){
                    if(this[0].previousElementSibling && $(this[0].previousElementSibling).is(selector)) return new kelatDom([this[0].previousElementSibling]);
                    else return new kelatDom([]);
                }else{
                    if (this[0].previousElementSibling) return new kelatDom([this[0].previousElementSibling]);
                    else return new kelatDom([]);
                }
            }
            else return new kelatDom([]);
        },
        prevAll: function(selector){
            var prevEls = [];
            var el = this[0];
            if(!el) return new kelatDom([]);
            while(el.previousElementSibling){
                var prev = el.previousElementSibling;
                if(selector){
                    if($(prev).is(selector)) prevEls.push(prev);
                }
                else prevEls.push(prev);
                el = prev;
            }
            return new kelatDom(prevEls);
        },
        siblings: function (selector) {
            return this.nextAll(selector).add(this.prevAll(selector));
        },
        parent: function(selector){
            var parents = [];
            for(var i = 0; i < this.length; i++){
                if(this[i].parentNode !== null){
                    if(selector){
                        if($(this[i].parentNode).is(selector)) parents.push(this[i].parentNode);
                    }else{
                       parents.push(this[i].parentNode);
                    }
                }
            }
            return $($.unique(parents));
        },
        parents: function(selector){
            var parents = [];
            for(var i = 0; i < this.length; i++){
                var parent = this[i].parentNode;
                while(parent){
                    if(selector){
                        if($(parent).is(selector)) parents.push(parent);
                    }else{
                        parents.push(parent);
                    }
                    parent = parent.parentNode;
                }
            }
            return $($.unique(parents));
        },
        closest: function(selector){
            var closest = this;
            if(typeof selector === 'undefined'){
                return new kelatDom([]);
            }
            if(!closest.is(selector)){
                closest = closest.parents(selector).eq(0);
            }
            return closest;
        },
        find : function(selector){
            var foundElements = [];
            for(var i = 0; i < this.length; i++){
                var found = this[i].querySelectorAll(selector);
                for(var j = 0; j < found.length; j++){
                    foundElements.push(found[j]);
                }
            }
            return new kelatDom(foundElements);
        },
        children: function(selector){
            var children = [];
            for(var i = 0; i < this.length; i++){
                var childNodes = this[i].childNodes;
                for(var j = 0; j < childNodes.length; j++){
                    if(!selector){
                        if(childNodes[j].nodeType === 1) children.push(childNodes[j]);
                    }else{
                        if(childNodes[j].nodeType === 1 && $(childNodes[j]).is(selector)) children.push(childNodes[j]);
                    }
                }
            }
            return new kelatDom($.unique(children));
        },
        remove: function(){
            for(var i = 0; i < this.length; i++){
                if(this[i].parentNode) this[i].parentNode.removeChild(this[i]);
            }
            return this;
        },
        add: function(){
            var dom = this;
            var i, j;
            for(i = 0; i < arguments.length; i++){
                var toAdd = $(arguments[i]);
                for(j = 0; j < toAdd.length; j++){
                    dom[dom.length] = toAdd[j];
                    dom.length++;
                }
            }
            return dom;
        },
        empty: function () {
            for (var i = 0; i < this.length; i++) {
                var el = this[i];
                if (el.nodeType === 1) {
                    for (var j = 0; j < el.childNodes.length; j++) {
                        if (el.childNodes[j].parentNode) el.childNodes[j].parentNode.removeChild(el.childNodes[j]);
                    }
                    el.textContent = '';
                }
            }
            return this;
        }
    };
    
    //事件扩展
    (function(){
        var shortcuts = ('click blur focus focusin focusout keyup keydown keypress submit change mousedown mousemove mouseup mouseenter mouseleave mouseout mouseover touchstart touchend touchmove resize scroll').split(' ');
        var notTrigger = ('resize scroll').split(' ');
        function createMethod(name) {
            kelatDom.prototype[name] = function(targetSelector, listener, capture){
                var i;
                if(typeof targetSelector === 'undefined'){
                    for(i = 0; i < this.length; i++){
                        if(notTrigger.indexOf(name) < 0){
                            if(name in this[i]) {
                                this[i][name]();
                            }else{
                                $(this[i]).trigger(name);
                            }
                        }
                    }
                    return this;
                }else{
                    return this.on(name, targetSelector, listener, capture);
                }
            };
        }
        for(var i = 0; i < shortcuts.length; i++){
            createMethod(shortcuts[i]);
        }
    })();


    // Global Ajax Setup
    var globalAjaxOptions = {};
    $.ajaxSetup = function(options){
        if(options.type) options.method = options.type;
        $.each(options, function (optionName, optionValue){
            globalAjaxOptions[optionName]  = optionValue;
        });
    };
    
    //Ajax
    var _jsonpRequests = 0;
    $.ajax = function(options){
        var defaults = {
            method: 'GET',
            data: false,
            async: true,
            cache: true,
            processData: true,
            user: '',
            password: '',
            headers: {},
            xhrFields: {},
            statusCode: {},
            dataType: 'text',
            contentType: 'application/x-www-form-urlencoded',
            timeout: 0
        };
        var callbacks = ['beforeSend', 'error', 'complete', 'success', 'statusCode'];
        //For jQuery guys
        if(options.type){
            options.method = options.type;
        };
        //合并全局和默认值
        $.each(globalAjaxOptions, function (globalOptionName, globalOptionValue){
            if(callbacks.indexOf(globalOptionName) < 0) defaults[globalOptionName] = globalOptionValue;
        });    
        //XHR回调和事件
        function fireAjaxCallback(eventName, eventData, callbackName){
            var a = arguments;
            if(eventName){
                $(document).trigger(eventName, eventData);
            };
            if(callbackName){
                // Global callback
                if(callbackName in globalAjaxOptions){
                    globalAjaxOptions[callbackName](a[3], a[4], a[5], a[6]);
                };
                // Options callback
                if(options[callbackName]){
                    options[callbackName](a[3], a[4], a[5], a[6]);
                };
            };
        };    
        // 循环选项和缺省值
        $.each(defaults, function(prop, defaultValue){
            if(!(prop in options)){
                options[prop] = defaultValue;
            };
        });
        //默认URL
        if(!options.url){
            options.url = window.location.toString();
        }
        //参数前缀
        var paramsPrefix = options.url.indexOf('?') >= 0 ? '&' : '?';
        //UC方法
        var _method = options.method.toUpperCase();
        //Data to modify GET URL
        if((_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE') && options.data){
            var stringData;
            if(typeof options.data === 'string'){
                //Should be key=value string
                if(options.data.indexOf('?') >= 0){
                    stringData = options.data.split('?')[1];
                }else{
                    stringData = options.data;
                };
            }else{
                // Should be key=value object
                stringData = $.serializeObject(options.data);
            };
            if(stringData.length){
                options.url += paramsPrefix + stringData;
                if(paramsPrefix === '?'){
                    paramsPrefix = '&';
                };
            };
        };
        //JSONP
        if(options.dataType === 'json' && options.url.indexOf('callback=') >= 0){
            var callbackName = 'kelat_jsonp_' + Date.now() + (_jsonpRequests++);
            var abortTimeout;
            var callbackSplit = options.url.split('callback=');
            var requestUrl = callbackSplit[0] + 'callback=' + callbackName;
            if(callbackSplit[1].indexOf('&') >= 0){
                var addVars = callbackSplit[1].split('&').filter(function (el) { return el.indexOf('=') > 0; }).join('&');
                if(addVars.length > 0){
                    requestUrl += '&' + addVars;
                };
            };
            //创建脚本
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.onerror = function(){
                clearTimeout(abortTimeout);
                fireAjaxCallback(undefined, undefined, 'error', null, 'scripterror');
            };
            script.src = requestUrl;
            //处理器
            window[callbackName] = function(data){
                clearTimeout(abortTimeout);
                fireAjaxCallback(undefined, undefined, 'success', data);
                script.parentNode.removeChild(script);
                script = null;
                delete window[callbackName];
            };
            document.querySelector('head').appendChild(script);
            if(options.timeout > 0){
                abortTimeout = setTimeout(function () {
                    script.parentNode.removeChild(script);
                    script = null;
                    fireAjaxCallback(undefined, undefined, 'error', null, 'timeout');
                }, options.timeout);
            };    
            return;
        };
        //缓存GET / HEAD请求
        if(_method === 'GET' || _method === 'HEAD' || _method === 'OPTIONS' || _method === 'DELETE'){
            if(options.cache === false){
                options.url += (paramsPrefix + '_nocache=' + Date.now());
            };
        };
        //创建XHR
        var xhr = new XMLHttpRequest();
        //保存请求URL
        xhr.requestUrl = options.url;
        xhr.requestParameters = options;
        //打开XHR
        xhr.open(_method, options.url, options.async, options.user, options.password);
        //创建POST数据
        var postData = null;
        if((_method === 'POST' || _method === 'PUT' || _method === 'PATCH') && options.data){
            if(options.processData){
                var postDataInstances = [ArrayBuffer, Blob, Document, FormData];
                //POST数据
                if(postDataInstances.indexOf(options.data.constructor) >= 0){
                    postData = options.data;
                }else{
                    //POST Headers
                    var boundary = '---------------------------' + Date.now().toString(16);
                    if(options.contentType === 'multipart\/form-data'){
                        xhr.setRequestHeader('Content-Type', 'multipart\/form-data; boundary=' + boundary);
                    }else{
                        xhr.setRequestHeader('Content-Type', options.contentType);
                    };
                    postData = '';
                    var _data = $.serializeObject(options.data);
                    if(options.contentType === 'multipart\/form-data'){
                        boundary = '---------------------------' + Date.now().toString(16);
                        _data = _data.split('&');
                        var _newData = [];
                        for(var i = 0; i < _data.length; i++) {
                            _newData.push('Content-Disposition: form-data; name="' + _data[i].split('=')[0] + '"\r\n\r\n' + _data[i].split('=')[1] + '\r\n');
                        }
                        postData = '--' + boundary + '\r\n' + _newData.join('--' + boundary + '\r\n') + '--' + boundary + '--\r\n';
                    }else{
                        postData = options.contentType === 'application/x-www-form-urlencoded' ? _data : _data;
                    }
                }
            }else{
                postData = options.data;
            };
        };
        // 附加 headers
        if(options.headers){
            $.each(options.headers, function(headerName, headerCallback){
                xhr.setRequestHeader(headerName, headerCallback);
            });
        }    
        // 检查跨域
        if(typeof options.crossDomain === 'undefined'){
            options.crossDomain = /^([\w-]+:)?\/\/([^\/]+)/.test(options.url) && RegExp.$2 !== window.location.host;
        }    
        if(!options.crossDomain){
            xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
        }    
        if(options.xhrFields){
            $.each(options.xhrFields, function (fieldName, fieldValue) {
                xhr[fieldName] = fieldValue;
            });
        }    
        var xhrTimeout;
        //句柄XHR
        xhr.onload = function(e){
            if(xhrTimeout) clearTimeout(xhrTimeout);
            if((xhr.status >= 200 && xhr.status < 300) || xhr.status === 0){
                var responseData;
                if(options.dataType === 'json'){
                    try{
                        responseData = JSON.parse(xhr.responseText);
                        fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                    }catch(err){
                        fireAjaxCallback('ajaxError', {xhr: xhr, parseerror: true}, 'error', xhr, 'parseerror');
                    };
                }else{
                    responseData = xhr.responseType === 'text' || xhr.responseType === '' ? xhr.responseText : xhr.response;
                    fireAjaxCallback('ajaxSuccess', {xhr: xhr}, 'success', responseData, xhr.status, xhr);
                };
            }else{
                fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
            }
            if(options.statusCode){
                if(globalAjaxOptions.statusCode && globalAjaxOptions.statusCode[xhr.status]){
                    globalAjaxOptions.statusCode[xhr.status](xhr);
                };
                if(options.statusCode[xhr.status]){
                    options.statusCode[xhr.status](xhr);
                };
            };
            fireAjaxCallback('ajaxComplete', {xhr: xhr}, 'complete', xhr, xhr.status);
        };    
        xhr.onerror = function(e){
            if(xhrTimeout) clearTimeout(xhrTimeout);
            fireAjaxCallback('ajaxError', {xhr: xhr}, 'error', xhr, xhr.status);
        };    
        // Ajax start callback
        fireAjaxCallback('ajaxStart', {xhr: xhr}, 'start', xhr);
        fireAjaxCallback(undefined, undefined, 'beforeSend', xhr);    
        // Send XHR
        xhr.send(postData);    
        // Timeout
        if(options.timeout > 0){
            xhr.onabort = function(){
                if(xhrTimeout) clearTimeout(xhrTimeout);
            };
            xhrTimeout = setTimeout(function(){
                xhr.abort();
                fireAjaxCallback('ajaxError', {xhr: xhr, timeout: true}, 'error', xhr, 'timeout');
                fireAjaxCallback('ajaxComplete', {xhr: xhr, timeout: true}, 'complete', xhr, 'timeout');
            }, options.timeout);
        };    
        // Return XHR object
        return xhr;
    };
    //Ajax扩展
    (function(){
        var methods = ('get post getJSON').split(' ');
        function createMethod(method){
            $[method] = function(url, data, success){
                return $.ajax({
                    url: url,
                    method: method === 'post' ? 'POST' : 'GET',
                    data: typeof data === 'function' ? undefined : data,
                    success: typeof data === 'function' ? data : success,
                    dataType: method === 'getJSON' ? 'json' : undefined
                });
            };
        }
        for(var i = 0; i < methods.length; i++){
            createMethod(methods[i]);
        };
    })();
    

    //DOM库工具
    $.each = function(obj, callback){
        if(typeof obj !== 'object') return;
        if(!callback) return;
        var i, prop;
        if(KUIAPP.isArray(obj) || obj instanceof kelatDom){
            //数组 Array
            for(i = 0; i < obj.length; i++){
                callback(i, obj[i]);
            };
        }else{
            //对象 Object
            for(prop in obj){
                if(obj.hasOwnProperty(prop)){
                    callback(prop, obj[prop]);
                };
            };
        };
    };
    $.unique = function(arr){
        var unique = [];
        for(var i = 0; i < arr.length; i++){
            if(unique.indexOf(arr[i]) === -1) unique.push(arr[i]);
        };
        return unique;
    };
    $.serializeObject = $.param = function(obj, parents){
        if(typeof obj === 'string') return obj;
        var resultArray = [];
        var separator = '&';
        parents = parents || [];
        var newParents;
        function var_name(name){
            if(parents.length > 0){
                var _parents = '';
                for(var j = 0; j < parents.length; j++){
                    if(j === 0){
                        _parents += parents[j];
                    }else{
                        _parents += '[' + encodeURIComponent(parents[j]) + ']';
                    };
                };
                return _parents + '[' + encodeURIComponent(name) + ']';
            }else{
                return encodeURIComponent(name);
            };
        };
        function var_value(value){
            return encodeURIComponent(value);
        }
        for(var prop in obj){
            if(obj.hasOwnProperty(prop)){
                var toPush;
                if(KUIAPP.isArray(obj[prop])){
                    toPush = [];
                    for(var i = 0; i < obj[prop].length; i ++){
                        if(!KUIAPP.isArray(obj[prop][i]) && typeof obj[prop][i] === 'object'){
                            newParents = parents.slice();
                            newParents.push(prop);
                            newParents.push(i + '');
                            toPush.push($.serializeObject(obj[prop][i], newParents));
                        }else{
                            toPush.push(var_name(prop) + '[]=' + var_value(obj[prop][i]));
                        };                        
                    };
                    if(toPush.length > 0) resultArray.push(toPush.join(separator));
                }else if(typeof obj[prop] === 'object'){
                    //对象转换为指定数组
                    newParents = parents.slice();
                    newParents.push(prop);
                    toPush = $.serializeObject(obj[prop], newParents);
                    if(toPush !== ''){
                        resultArray.push(toPush);
                    };
                }else if(typeof obj[prop] !== 'undefined' && obj[prop] !== ''){
                    //字符串或空白值
                    resultArray.push(var_name(prop) + '=' + var_value(obj[prop]));
                }
            }
        }
        return resultArray.join(separator);
    };
    $.toCamelCase = function(string){
        return string.toLowerCase().replace(/-(.)/g, function(match, group1) {
            return group1.toUpperCase();
        });
    };
    $.dataset = function(el){
        return $(el).dataset();
    };
    $.getTranslate = function(el, axis){
        var matrix, curTransform, curStyle, transformMatrix;
        //自动轴检测
        if(typeof axis === 'undefined'){
            axis = 'x';
        };
        curStyle = window.getComputedStyle(el, null);
        if(window.WebKitCSSMatrix){
            curTransform = curStyle.transform || curStyle.webkitTransform;
            if(curTransform.split(',').length > 6){
                curTransform = curTransform.split(', ').map(function(a){
                    return a.replace(',','.');
                }).join(', ');
            };
            // Some old versions of Webkit choke when 'none' is passed; pass
            // empty string instead in this case
            transformMatrix = new WebKitCSSMatrix(curTransform === 'none' ? '' : curTransform);
        }else{
            transformMatrix = curStyle.MozTransform || curStyle.OTransform || curStyle.MsTransform || curStyle.msTransform  || curStyle.transform || curStyle.getPropertyValue('transform').replace('translate(', 'matrix(1, 0, 0, 1,');
            matrix = transformMatrix.toString().split(',');
        }
    
        if(axis === 'x'){
            if(window.WebKitCSSMatrix){
                //最新的 Chrome and webkits
                curTransform = transformMatrix.m41;
            }else if(matrix.length === 16){
                //Crazy IE10 Matrix
                curTransform = parseFloat(matrix[12]);
            }else{
                //正常的浏览器
                curTransform = parseFloat(matrix[4]);
            };
        };
        if(axis === 'y'){
            if(window.WebKitCSSMatrix){
                //最新的 Chrome and webkits
                curTransform = transformMatrix.m42;
            }else if(matrix.length === 16){
                //Crazy IE10 Matrix
                curTransform = parseFloat(matrix[13]);
            }else{
                //正常的浏览器
                curTransform = parseFloat(matrix[5]);
            };
        };        
        return curTransform || 0;
    };
    
    $.requestAnimationFrame = function(callback){
        if (window.requestAnimationFrame){
            return window.requestAnimationFrame(callback);
        }else if(window.webkitRequestAnimationFrame){
            return window.webkitRequestAnimationFrame(callback);
        }else{
            return window.setTimeout(callback, 1000 / 60);
        }
    };
    $.cancelAnimationFrame = function(id){
        if(window.cancelAnimationFrame){
            return window.cancelAnimationFrame(id);
        }else if(window.webkitCancelAnimationFrame){
            return window.webkitCancelAnimationFrame(id);
        }else{
            return window.clearTimeout(id);
        }  
    };
    //链接到原型
    $.fn = kelatDom.prototype;
    //插件
    $.fn.scrollTo = function(left, top, duration, easing, callback){
        if (arguments.length === 4 && typeof easing === 'function') {
            callback = easing;
            easing = undefined;
        }
        return this.each(function(){
            var el = this;
            var currentTop, currentLeft, maxTop, maxLeft, newTop, newLeft, scrollTop, scrollLeft;
            var animateTop = top > 0 || top === 0;
            var animateLeft = left > 0 || left === 0;
            if(typeof easing === 'undefined'){
                easing = 'swing';
            }
            if(animateTop){
                currentTop = el.scrollTop;
                if(!duration){
                    el.scrollTop = top;
                }
            }
            if (animateLeft) {
                currentLeft = el.scrollLeft;
                if(!duration){
                    el.scrollLeft = left;
                }
            }
            if(!duration) return;
            if(animateTop){
                maxTop = el.scrollHeight - el.offsetHeight;
                newTop = Math.max(Math.min(top, maxTop), 0);
            }
            if(animateLeft){
                maxLeft = el.scrollWidth - el.offsetWidth;
                newLeft = Math.max(Math.min(left, maxLeft), 0);
            }
            var startTime = null;
            if(animateTop && newTop === currentTop) animateTop = false;
            if(animateLeft && newLeft === currentLeft) animateLeft = false;
            function render(time){
                if(time === undefined){
                    time = +(new Date());
                }
                if(startTime === null){
                    startTime = time;
                }
                var done;
                var progress = Math.max(Math.min((time - startTime) / duration, 1), 0);
                var easeProgress = easing === 'linear' ? progress : (0.5 - Math.cos( progress * Math.PI ) / 2);
                if(animateTop) scrollTop = currentTop + (easeProgress * (newTop - currentTop));
                if(animateLeft) scrollLeft = currentLeft + (easeProgress * (newLeft - currentLeft));
                if(animateTop && newTop > currentTop && scrollTop >= newTop){
                    el.scrollTop = newTop;
                    done = true;
                }
                if(animateTop && newTop < currentTop && scrollTop <= newTop){
                    el.scrollTop = newTop;
                    done = true;
                };
                if(animateLeft && newLeft > currentLeft && scrollLeft >= newLeft){
                    el.scrollLeft = newLeft;
                    done = true;
                };
                if(animateLeft && newLeft < currentLeft && scrollLeft <= newLeft){
                    el.scrollLeft = newLeft;
                    done = true;
                };
                if(done){
                    if(callback) callback();
                    return;
                };
                if(animateTop) el.scrollTop = scrollTop;
                if(animateLeft) el.scrollLeft = scrollLeft;
                $.requestAnimationFrame(render);
            }
            $.requestAnimationFrame(render);
        });
    };
    $.fn.scrollTop = function(top, duration, easing, callback){
        if(arguments.length === 3 && typeof easing === 'function'){
            callback = easing;
            easing = undefined;
        }
        var dom = this;
        if(typeof top === 'undefined'){
            if (dom.length > 0) return dom[0].scrollTop;
            else return null;
        }
        return dom.scrollTo(undefined, top, duration, easing, callback);
    };
    $.fn.scrollLeft = function(left, duration, easing, callback){
        if(arguments.length === 3 && typeof easing === 'function'){
            callback = easing;
            easing = undefined;
        }
        var dom = this;
        if(typeof left === 'undefined'){
            if (dom.length > 0) return dom[0].scrollLeft;
            else return null;
        }
        return dom.scrollTo(left, undefined, duration, easing, callback);
    };
    return $;
})();
window['kelat']['kelatDom'] = kelatDom;

var $$ = kelatDom;

/***** fn方法 *****/
window['kelat']['fn'] = window['kelat'].prototype = {
    //特性检测
    support : Local.support,
    //层边界
    layerBorder : function(){
        return [].forEach.call(document.querySelectorAll('*'),function(a){
            a.style.outline="1px solid #"+(~~(Math.random()*(1<<24))).toString(16);
        });
    },
    /** 设备&操作系统探测
     * @alias device
     * @return {Object}
     */
    device : (function(){
        //定义设备对象    
        var device = {};
        var ua = navigator.userAgent;
        var html = document.querySelector('html');
        var metaViewport = document.querySelector('meta[name="viewport"]');

        var windows = ua.match(/(Windows Phone);?[\s\/]+([\d.]+)?/);
        var android = ua.match(/(Android);?[\s\/]+([\d.]+)?/);
        var ipad = ua.match(/(iPad).*OS\s([\d_]+)/);
        var ipod = ua.match(/(iPod)(.*OS\s([\d_]+))?/);
        var iphone = !ipad && ua.match(/(iPhone\sOS|iOS)\s([\d_]+)/);
        var iphoneX = iphone && window.screen.width === 375 && window.screen.height === 812;
        device.browse = device.ios = device.android = device.iphone = device.ipad = device.androidChrome = false;
        
        // Android
        if(android){
            device.os = 'android';
            device.osVersion = android[2];
            device.android = true;
            device.androidChrome = ua.toLowerCase().indexOf('chrome') >= 0;
        };
        if(ipad || iphone || ipod){
            device.os = 'ios';
            device.ios = true;
        };
        // iOS
        if(iphone && !ipod){
            device.osVersion = iphone[2].replace(/_/g, '.');
            device.iphone = true;
            device.iphoneX = iphoneX;
        };
        if(ipad){
            device.osVersion = ipad[2].replace(/_/g, '.');
            device.ipad = true;
        };
        if(ipod){
            device.osVersion = ipod[3] ? ipod[3].replace(/_/g, '.') : null;
            device.iphone = true;
        };
        // iOS 8+ changed UA
        if(device.ios && device.osVersion && ua.indexOf('Version/') >= 0){
            if(device.osVersion.split('.')[0] === '10'){
                device.osVersion = ua.toLowerCase().split('version/')[1].split(' ')[0];
            };
        };
        // Webview
        device.webView = (iphone || ipad || ipod) && ua.match(/.*AppleWebKit(?!.*Safari)/i);
        
        // Minimal UI
        if(device.os && device.os === 'ios'){
            var osVersionArr = device.osVersion.split('.');
            device.minimalUi = !device.webView && (ipod || iphone) && (osVersionArr[0] * 1 === 7 ? osVersionArr[1] * 1 >= 1 : osVersionArr[0] * 1 > 7) && 
            metaViewport && metaViewport.getAttribute('content').indexOf('minimal-ui') >= 0;
        };

        //检查状态栏和全屏幕应用程序模式
        device.needsStatusbarOverlay = function needsStatusbarOverlay() {
            if (device.webView && (window.innerWidth * window.innerHeight === window.screen.width * window.screen.height)) {
              if (device.iphoneX && (window.orientation === 90 || window.orientation === -90)) {
                return false;
              }
              return true;
            }
            return false;
        };
        device.statusbar = device.needsStatusbarOverlay();

        //样式
        var classNames = [];
        //像素比
        device.pixelRatio = window.devicePixelRatio || 1;
        classNames.push('PixelRatio' + Math.floor(device.pixelRatio));
        if(device.pixelRatio >= 2){
            classNames.push('Retina');
        };
        //IOS 样式
        if(device.os){
            classNames.push(device.os, device.os + '-' + device.osVersion.split('.')[0], device.os + '-' + device.osVersion.replace(/\./g, '-'));
            if(device.os === 'ios'){
                var major = parseInt(device.osVersion.split('.')[0], 10);
                for(var i = major - 1; i >= 6; i--){
                    classNames.push('iosGt' + i);
                };
            };
        };
        //状态栏类
        if(device.statusBar) {
            classNames.push('WithStatusbarOverlay');
        }else{
            html.classList.remove('WithStatusbarOverlay');
        };
        //HTML添加样式
        classNames.forEach(function (className) {
            html.classList.add(className);
        })
        //浏览器检测
        device.browse = ua.indexOf("MSIE") >= 0 ? "ie" : 
        ua.indexOf("Firefox") >= 0 ? "Firefox" : 
        ua.indexOf("Chrome")  >= 0 ? "Chrome" : 
        ua.indexOf("Edge")  >= 0 ? "Edge" : 
        ua.indexOf("Opera")   >= 0 ? "Opera" : 
        ua.indexOf("Safari")  >= 0 ? "Safari" :
        ua.indexOf("Netscape")>= 0 && ("Netscape");
        //返回对象
        return device;
    }()),
    //触摸事件
    touchEvents : {
        start: Local.support.touch ? 'touchstart' : Local.support.desktopEvents[0],
        move: Local.support.touch ? 'touchmove' : Local.support.desktopEvents[1],
        end: Local.support.touch ? 'touchend' : Local.support.desktopEvents[2]
    },
};

var _KLT_ = window['kelat']['fn'];

//扩展 --- 功能参考 jQuery
window['kelat']['extend'] = $$.extend = $$.fn.extend = _KLT_.extend = KUIAPP.Extend ;

window['kelat']['extend']({
    //自定义特性
    expando : "kelat" + ( version + Math.random() ).replace( /\D/g, "" ),
    //空操作
    noop : function() {},
    //Ajax
    ajax : $$.ajax,
    ajaxSetup : $$.ajaxSetup,
    get : $$.get,
    post : $$.post,
    getJSON  : $$.getJSON,
    //是否为数组
    isArray : KUIAPP.isArray,
    //是否在Window容器
    isWindow : KUIAPP.isWindow,
    //是否普通对象
    isPlainObject : KUIAPP.isPlainObject,
    //类型
    type : KUIAPP.type,
    //循环
    each : $$.each
});
//设置默认参数
window['kelat']['defaults'] = {
    shift: 0
};
//处理显示动画
function animatedShift(shift){
    var _Shift = '';
    if(shift!==0){
        switch(shift){
            case 1: _Shift = 'zoomInDown';break;
            case 2: _Shift = 'fadeInUpBig';break;
            case 3: _Shift = 'zoomInLeft';break;
            case 4: _Shift = 'rollIn';break;
            case 5: _Shift = 'shake';break;
        };
    };
    return _Shift;
}

//判断是否为数组 && 是否为空数组
function isArrayLike(obj){
    var length = !!obj && "length" in obj && obj.length,
        type = kelat.type( obj );
    if(type === "function" || kelat.isWindow(obj)){
        return false;
    }
    return type === "array" || length === 0 ||
        typeof length === "number" && length > 0 && ( length - 1 ) in obj;
};
//类型
kelat.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),function(i,name){
    classType["[object " + name + "]"] = name.toLowerCase();
});


/************* 页面UI部分 *************/

/*======================================================
************   Toast 显示信息   ************
======================================================*/
/** Toast 显示信息 
 * @alias toast
 * @param {Object} options: Toast配置
 */
KUIAPP.Toast = function(options){
    options = options || {};
    var ToastTitle = options.title ? options.title :'';
    var ToastContent = options.content ? '<div>'+options.content+'</div>' :'';
    var ToastClassName = options.className ? options.className :'';
    var $Toast = $$('<div class="ToastBox '+ToastClassName+' '+animatedShift(kelat.defaults.shift)+'" style="z-index:' + Local.LayerIndex + '">'+ ToastContent + ToastTitle +'</div>');
    $$(document.getElementById(Local.WrapperArea)).append($Toast);
    //设置位置 上 右 下 左
    var CSS={'margin-left':-($Toast.outerWidth() / 2) + 'px'};
    (function(position){
        if(!position){return};
        for(var i=0;i<position.length;i++){
            if(!position[i]){
                continue;
            }else{
                var _Site;
                if(typeof position[i] === 'string' && position[i].indexOf('%') >= 0){
                    _Site = position[i];
                }else{
                    _Site = position[i] + 'px';
                };
                switch(i){
                    case 0: CSS.top = _Site; CSS.bottom = 'auto'; break;
                    case 1: CSS.right = _Site; CSS.left = 'auto'; CSS['margin-left'] = 'auto'; break;
                    case 2: CSS.bottom = _Site; break;
                    case 3: CSS.left = _Site; CSS['margin-left'] = 'auto'; break;
                };
            };
        };
    })(options.site);
    $Toast.css(CSS);
    //设置时间
    var Timeout = function(callback, time){
        setTimeout(function(){
            callback();
        },time)
    };
    //显示
    Timeout(function(){
        $Toast.removeClass('ToastOut').css({"z-index": ++Local.LayerIndex}).addClass('ToastIn');
    },10);
    //隐藏
    Timeout(function(){
        $Toast.removeClass('ToastIn').addClass('ToastOut').transitionEnd(function(){
            $Toast.remove();
        });
    },(options.time ? options.time :2e3));
};
window['kelat']['toast'] = KUIAPP.Toast;

/*======================================================
************   模态框   ************
======================================================*/
/** 导航栏标题位置
 * @param {Object} modal:模态对象
 */
KUIAPP.SizeNavbars = function(modal){
    var navbarInner = modal ? $$(modal).find('.NavBar .NavBarInner') : $$('.NavBar .NavBarInner');
    navbarInner.each(function(){
        var $Navbar = $$(this);
        var left = _KLT_.rtl ? $Navbar.find('.Right') : $Navbar.find('.Left'),
            right = _KLT_.rtl ? $Navbar.find('.Left') : $Navbar.find('.Right'),
            center = $Navbar.find('.Center'),
            noLeft = left.length === 0,
            noRight = right.length === 0,
            leftWidth = noLeft ? 0 : left.outerWidth(true),
            rightWidth = noRight ? 0 : right.outerWidth(true),
            centerWidth = center.outerWidth(true),
            navbarStyles = $Navbar.styles(),
            navbarWidth = $Navbar[0].offsetWidth - parseInt(navbarStyles.paddingLeft, 10) - parseInt(navbarStyles.paddingRight, 10),
            currLeft, diff;

        if(noRight){
            currLeft = navbarWidth - centerWidth;
        };
        if(noLeft){
            currLeft = 0;
        };
        if(!noLeft && !noRight){
            currLeft = (navbarWidth - rightWidth - centerWidth + leftWidth) / 2;
        };
        var requiredLeft = (navbarWidth - centerWidth) / 2;
        if(navbarWidth - leftWidth - rightWidth > centerWidth){
            if(requiredLeft < leftWidth){
                requiredLeft = leftWidth;
            };
            if(requiredLeft + centerWidth > navbarWidth - rightWidth){
                requiredLeft = navbarWidth - rightWidth - centerWidth;
            };
            diff = requiredLeft - currLeft;
        }else{
            diff = 0;
        };
    
        // Center left
        var centerLeft = diff;
        if(_KLT_.rtl && noLeft && noRight && center.length > 0){
            centerLeft = -centerLeft;
        };
        center.css({left: centerLeft + 'px'});
    });
};

/** 显示 Modal
 * @param {Object} modal:模态框对象
 * @param {function} callback:显示对象后回调
 */
KUIAPP.ShowModal = function(modal, callback){
     Local.LayerIndex++
    modal.prev('.ModalBlank').css('z-index',Local.LayerIndex).removeClass("ModalBlankVisibleOut").addClass('ModalBlankVisibleIn');
     Local.LayerIndex++
    modal.removeClass('ModalOut').css({"z-index": ++Local.LayerIndex}).addClass('ModalIn').transitionEnd(function(){
        callback && callback();
    });
    return modal;
};
/** 隐藏 Modal
 * @param {Object} modal:模态框对象
 */
KUIAPP.HideModal = function(modal){
    $$('body').removeClass('OVBody');
    modal.removeClass('ModalIn').addClass('ModalOut').transitionEnd(function(e){
        modal.removeClass('ModalOut');
    });
    modal.prev('.ModalBlank').removeClass('ModalBlankVisibleIn').addClass('ModalBlankVisibleOut').transitionEnd(function(){
        $$(this).removeClass('ModalBlankVisibleOut').removeAttr('style');
    });
};
/** 打开 
 * @param {Object} modal:模态框对象
 * @param {String} className:模态框样式名
 */
KUIAPP.OpenModal = function(modal, className, Shift, displayTime, callback){
    var timesTamp = +(new Date());
    var isPopover = modal.hasClass('ModalPopover');
    var isPickerModal = modal.hasClass('PickerModal');
    var isPopup = modal.hasClass('PopupBox');
    //var removeOnClose = modal.hasClass('RemoveOnClose');
    
    $$(document.getElementById(Local.WrapperArea)).append('<div class="ModalBlank ModalBlank'+timesTamp+'" style="z-index:' + Local.LayerIndex + '"/>');
    $$(document.getElementById(Local.WrapperArea)).append(modal[0]);
    KUIAPP.SizeNavbars(modal);
    var $ModalBlank = $$('.ModalBlank'+timesTamp)
    if((!!className?className:'').indexOf('ModalWarnBox')!==-1){
        modal.addClass(className);
        window.setTimeout(function(){
            KUIAPP.CloseModal(modal, callback);
        },displayTime);
    }else{
        if(Local.isModalPopover){
            modal.addClass(className);
        }else if(!isPopover && !isPickerModal && !isPopup){
            modal.css({
                marginTop: -Math.round(modal.outerHeight() / 2) + 'px'
            });
        };
        Local.isModalPopover = false;
    };
    window.setTimeout(function(){
        if(modal){
            KUIAPP.ShowModal(modal,function(){
                if(isPopover || isPickerModal || isPopup){
                    $ModalBlank.on(Local.support.onClick,function(){
                        KUIAPP.CloseModal(modal,Shift);
                    });
                };
            });
        };
    },5);
};
/** 关闭 
 * @param {Object} modal:模态框对象
 */
KUIAPP.CloseModal = function(modal, Shift, callback){
     if(typeof Shift === 'function'){
          callback = arguments[1];
          Shift = undefined;
     }
    $$('body').removeClass('OVBody');
    modal = $$(modal || ".ModalBox.ModalBoxIn");
    if(typeof modal !== 'undefined' && modal.length === 0){
        return;
    };
    //var isModal = modal.hasClass('Modal');
    var isPopover = modal.hasClass('ModalPopover');
    var isPopup = modal.hasClass('PopupBox');
    var isPickerModal = modal.hasClass('PickerModal');
    var removeOnClose = modal.hasClass('RemoveOnClose');
    var hideOnClose = modal.hasClass('HideOnClose');
    modal.trigger('close');
    //选择器 body class
    modal.removeClass('ModalIn').addClass('ModalOut').transitionEnd(function(e){
        !!Shift && Shift[0].append(Shift[1]);
        if(isPickerModal || isPopover || isPopup){
            if(hideOnClose){
                modal.removeClass('ModalOut');
            }else{
                modal.removeClass('ModalOut').hide();
            }
            if(removeOnClose && modal.length > 0) {
                modal.remove();
            };
        }else{//删除
            modal.remove();
        };
    }).prev().removeClass("ModalBlankVisibleIn").addClass('ModalBlankVisibleOut').transitionEnd(function(){
        if(hideOnClose && modal.length > 0) {
            $$(this).removeClass('ModalBlankVisibleOut').removeAttr('style');//.hide();
        }else{
            $$(this).remove();
        };
          callback && callback();
    });
    
    return true;
};
/** 元素创建 
 * @param {Array} options:模态框选项数组
 */
KUIAPP.Modal = function(options){
    options = options || {};
    var ButtonsHTML = '',
        ButtonsNAME = '',
        ModalHTML = '',
        Shift;
    var ContentType = typeof options.content;
    //创建按钮
    if(options.buttons && options.buttons.length > 0){
        for(var i = 0; i < options.buttons.length; i++){
            if(i === 0){
                ButtonsNAME = "First";
            }else if(i === (options.buttons.length - 1)){
                ButtonsNAME = "Last";
            };
            ButtonsHTML += '<a href="javascript:;" class="ModalButton ' + ButtonsNAME + ' ' + ( options.buttons[i].className || '') + '">' + options.buttons[i].text + '</a>';
        };
    };
    //创建标题
    var TitleHTML    = options.title    ? '<div class="ModalHeader">' + options.title + '</div>' : '';
    //创建内容
    var ContentHTML  = options.content  ? ContentType ==='object' ? '<div class="ModalContent"></div>' : '<div class="ModalContent">' + options.content + '</div>' : '';
    var AfterTextHTML= ( options.afterText || '');
    var NoButtons    = !options.buttons || options.buttons.length === 0 ? 'ModalNoButtons' : '';
    var ModalButtonsHTML = options.buttons && options.buttons.length > 0 ? '<div class="ModalFooter ModalFooter' + options.buttons.length + '">' + ButtonsHTML + '</div>' : '';
    ModalHTML = '<div class="ModalBox ' + NoButtons +' '+ (!!options.className ? options.className : '')+'"><div class="ModalInner">' + (TitleHTML + ContentHTML + AfterTextHTML) + '</div>' + ModalButtonsHTML + '</div>';
    //创建父元素
    var $Modal = $$(ModalHTML);
    //添加对象
    if(ContentType ==='object'){
        Shift = [options.content.parent(),options.content];
        $Modal.find('.ModalContent').append(Shift[1]);
    };
    //添加按钮事件
    $Modal.find('.ModalButton').each(function(index, els){
        $$(els).on(Local.support.onClick, function(event){
            if(options.buttons[index].close !== false){ KUIAPP.CloseModal($Modal) };
            if(options.buttons[index].onClick){ options.buttons[index].onClick($Modal,event) };
            if(options.onClick){ options.onClick($Modal,index) };
        });
    });
    //打开模态框
    KUIAPP.OpenModal($Modal, options.className ? options.className : '', Shift, options.displayTime, options.callback);
    return $Modal[0];
};
/** alert 框 
 * @alias alert
 * @param {String} content:内容
 * @param {String} title:标题
 * @param {function} callbackOk:确认事件
 */
KUIAPP.Alert = function(content, title, callbackOk, buttonText){
    if(typeof title === 'function'){
        buttonText = arguments[2];
        callbackOk = arguments[1];
        title = undefined;
    }
    return KUIAPP.Modal({
        content: ( content || '' ),
        title: typeof title === 'undefined' ? Local.ModalTitle : title,
        buttons: [{
            text: buttonText && buttonText[0] ? buttonText[0] : Local.ModalButtonOk,
            onClick: callbackOk
        }]
    });
};
/** 确认框 
 * @alias confirm
 * @param {String} content:内容
 * @param {String} title:标题
 * @param {function} callbackOk:确认事件
 * @param {function} callbackCancel:取消事件
 */
KUIAPP.Confirm = function(content, title, callbackOk, callbackCancel, buttonText, className){
    if(typeof title === 'function'){
        if(typeof callbackOk === 'object'){
            buttonText = arguments[2];
        }else{
            buttonText = arguments[3];
            callbackCancel = arguments[2];
        }
        callbackOk = arguments[1];
        title = undefined;
    }
    return KUIAPP.Modal({
        content: ( content || '' ),
        title: typeof title === 'undefined' ? Local.ModalTitle : title,
        className: ( className || '' ),
        buttons: [{
            text: buttonText && buttonText[1] ? buttonText[1] : Local.ModalButtonCancel,
            onClick: callbackCancel
        }, {
            text: buttonText && buttonText[0] ? buttonText[0] : Local.ModalButtonOk,
            onClick: callbackOk
        }]
    });
};
/** 自动消失提示框 
 * @alias warn
 * @param {String} content:内容
 */
KUIAPP.Warn = function(content, callback, showTime, className){
    if(!content){return}
    if(typeof callback === 'number') {
      showTime = arguments[1];
      className = arguments[2];
      callback = undefined;
    }
    if(typeof callback === 'string') {
      className = arguments[1];
      showTime = undefined;
      callback = undefined;
    }
    return KUIAPP.Modal({
        content: content || '',
        displayTime: showTime ? showTime : 2E3,
        className: "ModalWarnBox " + className,
        callback: callback
    });
};
/** 提示框 
 * @alias prompt
 * @param {String} content:内容
 */
KUIAPP.Prompt = function(content, title, callbackOk, callbackCancel, buttonText){
    if (typeof title === 'function') {
        callbackOk = arguments[1];
        callbackCancel = arguments[2];
        buttonText = arguments[3];
        title = undefined;
    }
    return KUIAPP.Modal({
        content: content || '',
        title: typeof title === 'undefined' ? Local.ModalTitle : title,
        afterText: '<div class="InputField"><input type="text" class="ModalTextInput"></div>',
        buttons: [
            {
                text: buttonText && buttonText[1] ? buttonText[1] : Local.ModalButtonCancel
            },
            {
                text: buttonText && buttonText[0] ? buttonText[0] : Local.ModalButtonOk,
                bold: true
            }
        ],
        onClick: function (modal, index) {
            if (index === 0 && callbackCancel) callbackCancel($$(modal).find('.ModalTextInput').val());
            if (index === 1 && callbackOk) callbackOk($$(modal).find('.ModalTextInput').val());
        }
    });
};
/** 弹出框 
 * @alias popup
 * @param {Object} modal:模态框对象
 * @param {boolean} removeOnClose:是否删除
 */
KUIAPP.Popup = function(modal, removeOnClose, callback){
    if(typeof removeOnClose === 'function'){
        callback = arguments[1];
        removeOnClose = undefined;
    }
    if(typeof removeOnClose === 'undefined'){
        removeOnClose = true;
    };
    if(typeof modal === 'string' && modal.indexOf('<') >= 0){
        KUIAPP.ModalString(modal, removeOnClose, function(modals){
            modal = modals;
        });
    };
    modal = $$(modal);
    if(modal.length === 0){
        return false;
    };
    modal.show();
    //绑定确认事件
    modal.find(".ClosePopup").once('click',function(){
       KUIAPP.CloseModal(modal,function(){
          callback && callback(); 
        });
    });
    KUIAPP.OpenModal(modal);
    return modal[0];
};
/** 关闭所有弹出框 
 */
KUIAPP.unDialog = function(){
    $$('body').removeClass('OVBody');
    $$('.ModalBlank.ModalBlankVisibleIn').remove();
    $$('.PopupBox,.ModalBox').removeClass("ModalIn").removeAttr('style');
    return this;
};
/** 底部确认框 
 * @alias confirmModal
 * @param {String} content:内容
 * @param {String} title:标题
 * @param {function} callbackOk:确认事件
 * @param {function} callbackCancel:取消事件
 */
KUIAPP.ConfirmModal = function(content, title, callbackOk, callbackCancel, buttonText){
    return new KUIAPP.Confirm(content, title, callbackOk, callbackCancel, buttonText, "ModalPickerBox");    
};
/** 选择器框 
 * @alias pickerModal
 * @param {Object} modal:模态框对象
 * @param {boolean} removeOnClose:是否删除
 */
KUIAPP.PickerModal = function(modal, removeOnClose){
    if(typeof removeOnClose === 'undefined'){
        removeOnClose = true;
    };
    if(typeof modal === 'string' && modal.indexOf('<') >= 0){
        modal = $$(modal);
        modal.dd='1'
        if (modal.length > 0) {
            if(removeOnClose){
                modal.addClass('RemoveOnClose');
            }else{
                modal.addClass('HideOnClose');
            };
            $$(document.getElementById(Local.WrapperArea)).append(modal[0]);
        }else{
            return false;
        };
    }
    modal = $$(modal);
    if(modal.length === 0){
        return false;
    };
    if($$('.PickerModal.ModalIn:not(.ModalOut)').length > 0 && !modal.hasClass('ModalIn')){
        KUIAPP.CloseModal('.PickerModal.ModalIn:not(.ModalOut)');
    }
    KUIAPP.OpenModal(modal);
    return modal[0];
};
/** 模态框字符串处理
 * @param {String} modal:模态框字符串
 * @param {boolean} removeOnClose:是否删除
 * @param {function} callback:回调事件
 */
KUIAPP.ModalString = function(modal, removeOnClose, callback){
    var _modal = document.createElement('div');
    _modal.innerHTML = modal.trim();
    if(_modal.childNodes.length > 0){
        modal = _modal.childNodes[0];
        if(removeOnClose){
            modal.classList.add('RemoveOnClose');
        };
        $$(document.getElementById(Local.WrapperArea)).append(modal);
    }else{
        return false;
    };
    return callback(modal);
};
/** 弹出菜单 
 * @alias popover
 * @param {Object & String} modal:模态框对象
 * @param {String} target:模态框目标
 * @param {Object} param:参数集
 */
KUIAPP.Popover = function(modal, target, param){
    if(typeof param !== 'object'){
        param = {};
    };
    if(typeof param.removeOnClose === 'undefined'){
        param.removeOnClose = true;
    };
    if(typeof modal === 'string' && modal.indexOf('<') >= 0){
        KUIAPP.ModalString(modal, param.removeOnClose,function(modals){
            modal = modals;
        });
    };
    Local.isModalPopover = true;
    modal = $$(modal);
    target = $$(target);
    if(modal.length === 0 || target.length === 0){
        return false;
    };
    if(modal.find('.ModalPopoverAngle').length === 0){
        modal.append('<div class="ModalPopoverAngle"></div>');
    };
    modal.show();

    function sizePopover(){
        modal.css({left: '', top: ''});
        var modalWidth =  modal.width();
        var modalHeight =  modal.height(); // 13 - height of angle
        var modalAngle, modalAngleSize = 0, modalAngleLeft, modalAngleTop;
            modalAngle = modal.find('.ModalPopoverAngle');
            modalAngleSize = modalAngle.width() / 2;
            modalAngle.removeClass('onLeft onRight onTop onBottom').css({left: '', top: ''});

        var targetWidth = target.outerWidth();
        var targetHeight = target.outerHeight();
        var targetOffset = target.offset();
        var targetParentPage = target.parents('body');
        if(targetParentPage.length > 0){
            targetOffset.top = targetOffset.top - targetParentPage[0].scrollTop;
        };
        //滚动条位置
        var scrollTop=Local.support.GetPageScroll();
        //window height
        var windowSize=Local.support.GetPageSize();
        var windowHeight = windowSize.WinH;
        var windowWidth = windowSize.WinW;

        var modalTop = 0;
        var modalLeft = 0;
        var diff = 0;
        //位置
        var modalPosition = 'top';
        if((modalHeight + modalAngleSize) < targetOffset.top){
            // On top
            modalTop = targetOffset.top - modalHeight - modalAngleSize  + scrollTop.Y;
        }else if((modalHeight + modalAngleSize) < windowHeight - targetOffset.top - targetHeight){
            // On bottom
            modalPosition = 'bottom';
            modalTop = targetOffset.top + targetHeight + modalAngleSize + scrollTop.Y;
        }else{
            // On middle
            modalPosition = 'middle';
            modalTop = targetHeight / 2 + targetOffset.top - modalHeight / 2;
            diff = modalTop;
            if(modalTop <= 0){
                modalTop = 5;
            }else if(modalTop + modalHeight >= windowHeight){
                modalTop = windowHeight - modalHeight - 5;
            }
            diff = diff - modalTop;
        };
        //特殊处理角
        if(param.angle){
            modalPosition = param.angle;
            modalTop = targetOffset.top - modalHeight - modalAngleSize  + scrollTop.Y;
        };
        //水平位置
        if(modalPosition === 'top' || modalPosition === 'bottom'){
            modalLeft = targetWidth / 2 + targetOffset.left - modalWidth / 2;
            diff = modalLeft;
            if(modalLeft < 5){
                modalLeft = 5;
            };
            if(modalLeft + modalWidth > windowWidth){
                modalLeft = windowWidth - modalWidth - 5;
            };
            if(modalPosition === 'top') {
                modalAngle.addClass('onBottom');
            };
            if(modalPosition === 'bottom') {
                modalAngle.addClass('onTop');
            };
            diff = diff - modalLeft;
            modalAngleLeft = (modalWidth / 2 - modalAngleSize + diff);
            modalAngleLeft = Math.max(Math.min(modalAngleLeft, modalWidth - modalAngleSize * 2 - 13), 13);
            modalAngle.css({left: modalAngleLeft + 'px'});

        }else if (modalPosition === 'middle') {
            modalLeft = targetOffset.left - modalWidth - modalAngleSize;
            modalAngle.addClass('onRight');
            if(modalLeft < 5 || (modalLeft + modalWidth > windowWidth)){
                if(modalLeft < 5){
                    modalLeft = targetOffset.left + targetWidth + modalAngleSize;
                };
                if(modalLeft + modalWidth > windowWidth){
                    modalLeft = windowWidth - modalWidth - 5;
                };
                modalAngle.removeClass('onRight').addClass('onLeft');
            }
            modalAngleTop = (modalHeight / 2 - modalAngleSize + diff);
            modalAngleTop = Math.max(Math.min(modalAngleTop, modalHeight - modalAngleSize * 2 - 13), 13);
            modalAngle.css({top: modalAngleTop + 'px'});
        };
        if(param.angle == 'top'){
            modalAngle.removeClass('onLeft onRight onTop onBottom').addClass('onTop');
            modalTop = targetOffset.top + modalAngleSize + targetHeight + targetParentPage[0].scrollTop;
        };
        if(param.center){
            modalLeft = (windowWidth - modalWidth) / 2;
        };
        //应用样式
        modal.css({top: modalTop + 'px', left: parseInt(modalLeft) + 'px'});
    };
    
    sizePopover();

    $$(window).on('resize', sizePopover);

    modal.on('close', function(){
        $$(window).off('resize', sizePopover);
    });

    KUIAPP.OpenModal(modal);
    return modal[0];
};
window['kelat']['alert'] = KUIAPP.Alert;
window['kelat']['confirm'] = KUIAPP.Confirm;
window['kelat']['warn'] = KUIAPP.Warn;
window['kelat']['prompt'] = KUIAPP.Prompt;
window['kelat']['pickerModal'] = KUIAPP.PickerModal;
window['kelat']['popup'] = KUIAPP.Popup;
window['kelat']['unDialog'] = KUIAPP.unDialog;
window['kelat']['popover'] = KUIAPP.Popover;
window['kelat']['confirmModal'] = KUIAPP.ConfirmModal;

/*======================================================
************   Tabbar   ************
======================================================*/
KUIAPP.materialTabbarSetHighlight = function (tabbar, activeLink) {
    tabbar = $$(tabbar);
    activeLink = activeLink || tabbar.find('.TabLink.active');

    var tabLinkWidth, highlightTranslate;
    if(tabbar.hasClass('TabBarScrollable')) {
        tabLinkWidth = activeLink[0].offsetWidth + 'px';
        highlightTranslate = (_KLT_.rtl ? - activeLink[0].offsetLeft: activeLink[0].offsetLeft) + 'px';
    }else{
        tabLinkWidth = 1 / tabbar.find('.TabLink').length * 100 + '%';
        highlightTranslate = (_KLT_.rtl ? - activeLink.index(): activeLink.index()) * 100 + '%';
    };

    tabbar.find('.TabLinkHighlight')
        .css({width: tabLinkWidth})
        .transform('translate3d(' + highlightTranslate + ',0,0)');
};
KUIAPP.initPageMaterialTabbar = function (pageContainer) {
    pageContainer = $$(pageContainer);
    var tabbar = $$(pageContainer).find('.TabBar');

    function tabbarSetHighlight() {
        KUIAPP.materialTabbarSetHighlight(tabbar);
    }
    if(tabbar.length > 0){
        if(tabbar.find('.TabLinkHighlight').length === 0){
            tabbar.find('.ToolBarInner').append('<span class="TabLinkHighlight"></span>');
        }

        tabbarSetHighlight();
        $$(window).on('resize', tabbarSetHighlight);
        pageContainer.once('pageBeforeRemove', function () {
            $(window).off('resize', tabbarSetHighlight);
        });
    }
};

/* ====================================================
************   Tabs   ************
=====================================================*/
KUIAPP.showTab = function(tab, tabLink, force){
    var newTab = $$(tab);
    if(arguments.length === 2){
        if(typeof tabLink === 'boolean'){
            force = tabLink;
        }
    };
    if(newTab.length === 0){
        return false;
    };
    if(newTab.hasClass('active')) {
        if(force){
            newTab.trigger('show');
        };
        return false;
    }
    var tabs = newTab.parent('.Tabs');
    if(tabs.length === 0){
        return false;
    };

    //在隐藏的选项卡中隐藏滑动操作
    KUIAPP.allowSwipeout = true;

    //动画 tabs
    var isAnimatedTabs = tabs.parent().hasClass('TabsAnimatedWrap');
    if(isAnimatedTabs){
        var tabTranslate = (_KLT_.rtl ? newTab.index() : -newTab.index()) * 100;
        tabs.transform('translate3d(' + tabTranslate + '%,0,0)');
    }

    //取下其他选项卡active类
    var oldTab = tabs.children('.Tab.active').removeClass('active');
    //添加active类到当前 tab
    newTab.addClass('active');
    // 触发 'show' 事件到当前 tab
    newTab.trigger('show');

    //更新 navbars 内 tab
    if(!isAnimatedTabs && newTab.find('.NavBar').length > 0){
        // Find tab's view
        var viewContainer;
        if(newTab.hasClass(app.params.viewClass)){
            viewContainer = newTab[0];
        }else{
            viewContainer = newTab.parents('.' + app.params.viewClass)[0];
        };
        KUIAPP.SizeNavbars(viewContainer);
    };

    // Find related link for new tab
    if(tabLink){
        tabLink = $$(tabLink);
    }else{
        // Search by id
        if(typeof tab === 'string'){
            tabLink = $$('.tab-link[href="' + tab + '"]');
        }else{
            tabLink = $$('.tab-link[href="#' + newTab.attr('id') + '"]');
        };
        // Search by data-tab
        if (!tabLink || tabLink && tabLink.length === 0) {
            $$('[data-tab]').each(function () {
                if(newTab.is($$(this).attr('data-tab'))){
                    tabLink = $$(this);
                };
            });
        }
    }
    if(tabLink.length === 0){
        return;
    };

    // Find related link for old tab
    var oldTabLink;
    if(oldTab && oldTab.length > 0){
        // Search by id
        var oldTabId = oldTab.attr('id');
        if(oldTabId){
            oldTabLink = $$('.TabLink[href="#' + oldTabId + '"]');
        };
        // Search by data-tab
        if(!oldTabLink || oldTabLink && oldTabLink.length === 0){
            $$('[data-tab]').each(function () {
                if(oldTab.is($$(this).attr('data-tab'))){
                    oldTabLink = $$(this);
                }
            });
        }
    }

    //更新链接 classes
    if(tabLink && tabLink.length > 0){
        tabLink.addClass('active');
        var tabbar = tabLink.parents('.TabBar');
        if(tabbar.length > 0){
            if(tabbar.find('.TabLinkHighlight').length === 0) {
                tabbar.find('.ToolBarInner').append('<span class="TabLinkHighlight"></span>');
            }
            KUIAPP.materialTabbarSetHighlight(tabbar, tabLink);
        }
    }
    if (oldTabLink && oldTabLink.length > 0) oldTabLink.removeClass('active');

    return true;
};
KUIAPP.initTab = function(tab, tabLink, force){
    //$$(".TabLink").on('click', function(){
    $$(document).on('click','.TabLink',function(){
        var clicked = $$(this);
        var clickedData = clicked.dataset();
        KUIAPP.showTab(clickedData.tab || clicked.attr('href'), clicked)
    });
    KUIAPP.initPageMaterialTabbar($$(tab))
};
window['kelat']['tabs'] = KUIAPP.initTab;
window['kelat']['showTab'] = KUIAPP.showTab;

//返回对象
return window['kelat'];
}));