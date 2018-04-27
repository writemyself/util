  /**
 * 工具方法
 * @author simba
 * @date   2016-09-09
 *
 * 项目一些基础工具方法
 * 包括 JQ 的一些拓展工具方法 和 对象原型的拓展 还有全局委托的一些事件
 */
$.extend($, {
    //设置cookie
    setCookie: function (name, value, time) {
        var cookie = name + "=" + encodeURIComponent(value);
        if (typeof time === "number") {
            cookie += "; max-age=" + time;
        }
        document.cookie = cookie;
    },
    //获取cookie
    getCookie: function (key) {
        var cookie = {};
        var all = document.cookie;
        if (all === "") {
            return null;
        }
        var list = all.split("; ");


        for (var i = 0; i < list.length; i++) {
            var singleCookie = list[i];
            var p = singleCookie.indexOf("=");
            var name = singleCookie.substring(0, p);
            var value = singleCookie.substring(p + 1);
            value = decodeURIComponent(value);
            if (key && key == name) {
                return value;
            }
        }
        return null;
    },
    // 清除指定cookie，将过期时间设定为过去的一个时间
    delCookie: function (name) {
        var date = new Date();
        date.setTime(date.getTime() - 10000);
        document.cookie = name + "=a; expires=" + date.toGMTString();
    },
    /*通过key/value值获取objec在数组中的索引*/
    getObjIndexByKey: function (arr, key, value) {
        for (var k in arr) {
            if (arr[k][key] == value) {
                return k;
            }
        }
        return -1;
    },
    /**
     * 判断是否是IE  by cygnet 2016.11.08
     * @returns {boolean}
     */
    isIE: function() {
        return (!!window.ActiveXObject || "ActiveXObject" in window);
    },
    /**
     * 判断是否是Edge 浏览器 by cgynet 2016.11.14
     */
    isEdge:function(){
        var userAgent = navigator.userAgent.toLowerCase();
        return /edge/.test(userAgent);
    },
    /**
     * 判断当前浏览器是否chrome30及以下版本，如果是，则返回true by cygnet 2016.11.08
     * @returns {boolean}
     * @constructor
     */
    judgeChromeVersion : function() {
        var version = 0;
        var userAgent = navigator.userAgent.toLowerCase();
        userAgent.replace(/chrome\/(\d+)\.(.*?)/gi, function ($0, $1) {
            version = $1 - 0;
        });
        return (version < 40);
    },
    //正则判断邮箱
    checkMail: function (mail) {
        var regstr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        return regstr.test(mail);
    },
    //正则判断电话
    checkTel: function (tel) {
        var regstr = /^(13[0-9]|14[0-9]|15[0-9]|18[0-9]|17[0-9])\d{8}$/i;
        //  /^(1[34578])[0-9]{8}$/i
        return regstr.test(tel);
    },
    //检测非法字符
    checkIllegalChar: function (str) {
        var reg = /[\?\~\!@#\$%\^&\*-\/\+\\\$\.\;\<\>\"\=\{\}\']/;
        if (reg.test(str)) {
            return false;
        }
        return true;
    },
    //将秒为单位的时间格式化为xx:xx:xx
    timeFormat: function (timestamp) {
        var timeStr = "";
        var hour, minute, second;
        hour = Math.floor(timestamp / (60 * 60));
        // hour = hour>9?hour:"0"+hour;
        minute = Math.floor(timestamp % (60 * 60) / 60);
        // minute = minute>9?minute:"0"+minute;
        second = Math.floor(timestamp % (60 * 60) % 60);
        // second = second>9?second:"0"+second;
        // return hour+":"+minute+":"+second;
        if (hour > 0) {
            //  timeStr += "<span>"+hour+"</span>"+"小时";
            timeStr += "<span class='timeColor_red'>" + hour + "</span>" + "小时" + "";
        }
        if (minute > 0) {
            timeStr += "<span class='timeColor_red'>" + minute + "</span>" + "分钟"
        }
        timeStr += "<span class='timeColor_red'>" + second + "</span>" + "秒";
        return timeStr;
    },
    //注册windows事件
    addEventListener: function (event, fun) {
        if (window.addEventListener) {
            window.addEventListener(event, fun);
        } else {
            //attachEvent兼容IE8以下
            window.attachEvent(event, fun);
        }
    },

    // add EventListenner by cygnet in 2017.06.05
    add: function(obj, t, fn){
        var o = (typeof obj === 'string') ? document.getElementById(obj) : obj;
        if(!o){
            return;
        }
        if(o.addEventListener){
            o.addEventListener(t,fn,false);
        }else if(o.attachEvent){
            o.attachEvent('on' + t,fn);
        }else{
            o['on' + t] = fn;
        }
    },

    //返回IE版本，非IE返回999
    ieVersion: function () {
        var version = navigator.appVersion.split(";")[1].replace(/[ ]/g, "").split("MSIE")[1];
        if (version) {
            return version;
        } else {
            return 999;
        }
    },
    //IE8不支持array.indexOf
    indexOf: function (arr, value) {
        for (var key in arr) {
            if (arr[key] == value) {
                return key;
            }
        }
        return -1;
    },
    //打开不会被拦截的新页面
    openUrl: function (url) {
        var f = document.createElement("form");
        f.setAttribute("action", url);
        f.setAttribute("method", 'post');
        f.setAttribute("target", '_blank');
        document.body.appendChild(f)
        f.submit();
    },
    //阻止冒泡事件
    cancelBubble: function (event) {
        event = event ? event : window.event;
        if (event.stopPropagation) {
            event.stopPropagation();
        } else {
            event.cancelBubble = true;
        }
    },
    //动态更新title
    setTitle: function (title) {
        try {
            $("title").html(title);
        } catch (e) {
            return true;
        }
    },
    getBt: function (str) {
        var char = str.match(/[^\x00-\xff]/ig);
        return str.length + (char == null ? 0 : char.length);
    },
    //限定字符串长度
    cutString: function (content, size) {
        var str = "";
        if (content) {
            var len = content.gblen(), len_count = 0;
            for (var i = 0, n = content.length; i < n; i++) {
                len_count = len_count + $.getBt(content[i]);
                str = str + content[i];
                if (len_count > size) {
                    str = str + "...";
                    break;
                }
            }
        }
        return str;
    },
    //判断是否为pc端
    isPC: function () {
        var userAgentInfo = navigator.userAgent;
        var Agents = new Array("Android", "iPhone", "SymbianOS", "Windows Phone", "iPad", "iPod");
        var flag = true;
        for (var v = 0; v < Agents.length; v++) {
            if (userAgentInfo.indexOf(Agents[v]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    //加载css文件
    asynCss: function (css_arr, callback) {
        var count = 0;
        if (!css_arr) {
            return;
        }
        if (css_arr.length == 0) {
            callback && callback();
        }
        for (var i = 0, n = css_arr.length; i < n; i++) {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            //link.href = css_arr[i] + "?v=" + (_version ? _version : $.getVersion());
            link.href = css_arr[i];

            var linkSize = $("#atmsHead").find("link[href='" + css_arr[i] + "']").size();
            console.log(linkSize);
            if (linkSize == 0) {
                $("#atmsHead")[0].appendChild(link);
            }
            // document.getElementsByTagName("head")[0].appendChild( link );
            link.onload = function () {
                ++count;
                if (count == css_arr.length) {
                    callback && callback();
                }
            };
        }
    },
    loadImgError: function (_me) {
        _me.src = $(_me).data("errorsrc");
    },
    //判断是否是IE9以下的浏览器
    ltIE9: function () {
        var browser = navigator.appName;
        var b_version = navigator.appVersion;
        var version = b_version.split(";");
        if (version.length > 1) {
            var trim_Version = parseInt(version[1].replace(/[ ]/g, "").replace(/MSIE/g, ""));
            if (trim_Version <= 9) {
                return true;
            }
        }
        return false;
    },
    thumbImg: function (url, size) {
        var arr = url.split(".");
        var flag = "." + arr[arr.length - 1];
        var newArr = url.split(flag);
        return newArr[0] + "_" + size + flag + newArr[1];
    },
    //简单封装ajax
    _ajax: function (url, data, method, callback) {
        // if(data){  //统一传递参数格式
        //     data = "param=" + JSON.stringify(data);
        // }

        $.ajax({
            url: url,
            type: method,
            dataType: 'json',
            data: data,
            async: true,
            success: function (data) {
                if (data.code == 511000) {
                    alert(data.message);
                    return;
                }
                //未登录或者登录已过期
                if (data.code == 400002) {
                    $.setCookie("username", "");
                    location.reload();
                }
                callback && callback(data);
            },
            error: function (a, b, c) {
                console.error(a.status + "--" + c);
            }
        });
    },
    //H5存储缓存 localStorage
    setCache: function (key, value) {
        localStorage.setItem(key, JSON.stringify(value));
    },
    //获取缓存
    getCache: function (key) {
        var newkey = localStorage.getItem(key) ? localStorage.getItem(key) : "null";
        return JSON.parse(newkey);
    },
    //删除缓存
    removeCache: function (key) {
        localStorage.removeItem(key);
    },
    //H5存储缓存 sessionStorage
    setSession: function (key, value) {
        sessionStorage.setItem(key, JSON.stringify(value));
    },
    //获取缓存
    getSession: function (key) {
        var newkey = !!sessionStorage.getItem(key) && sessionStorage.getItem(key) !== 'undefined' ? sessionStorage.getItem(key) : "null";
        return JSON.parse(newkey);
    },
    //删除缓存
    removeSession: function (key) {
        sessionStorage.removeItem(key);
    },
    //判断是否是空对象
    isEmptyObject: function(e){
        var t;
        for (t in e)
            return !1;
        return !0
    },
    //生成随机字符串
    randomString: function(len){
        len = len || 32;
        var _chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
        var maxPos = _chars.length;
        var pwd = '', i;
        for (i = 0; i < len; i++) {
            pwd += _chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    },
    //获取元素离窗口的坐标
    getOffset: function(ele){
        //定义初始值
        var top = 0, left = 0;

        //循环判断叠加
        while(ele){
            top += ele.offsetTop;
            left += ele.offsetLeft;
            ele = ele.offsetParent;
        }

        //返回XY偏移
        return {
            X: left,
            Y: top
        }
    },
    //判断是否是数组
    isArray: function(o) {
        return Object.prototype.toString.call(o) === '[object Array]';
    },
    //获取当前时间
    getDate: function(date){
        date = date || new Date();
        //小于10 左侧补0
        var month = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1),
            day = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

        //返回时间
        return date.getFullYear() + '-' + month + '-' + day;
    },

    /**
     * 延迟加载实现方法
     * @author cygnet
     * @date   2017-07-14
     * @param  {[type]}   treeNode       [description]  当前树节点信息
     * @param  {[type]}   totalData      [description]  需要进行延迟加载的总数据数组 标准格式
     * @param  {[type]}   ztreeObj       [description]  机构树对象
     * @param  {[type]}   perCount       [description]  每次加载个数
     * @param  {[type]}   perTime        [description]  每次间隔时间
     * @return {[type]}                  [description]
     */
    treeLazyLoad: function(treeNode, totalData, ztreeObj, perCount, perTime){
        // 树节点pid集合
        var ztreeNodePIds = [];

        ztreeNodePIds.unshift(treeNode.id);

        getZtreeNodeIds(treeNode.id);

        var currChildren = totalData;

        var i = 0,j = 0;

        for(var i = 0;i < ztreeNodePIds.length ;i++ ){
            for(var j = 0; j < currChildren.length ; j++){
                if(currChildren[j].id == ztreeNodePIds[i]){
                    currChildren = currChildren[j].children;
                    break;
                }
            }
        }

        // 当前节点子节点的长度
        var currNodeIndex = treeNode.children.length;
        // 调用延迟加载
        cycleTimeout();

        // 延迟加载
        function cycleTimeout(){
             setTimeout(function(){
                var appendNode = [];
                if(currNodeIndex < currChildren.length){
                    var maxLength = Math.min(currNodeIndex + perCount, currChildren.length);
                    for(var i = currNodeIndex; i <  maxLength ; i++){
                        var temChild = proCopy(currChildren[i], {});
                        if(!!currChildren[i].children){
                            cycleChildren(temChild, currChildren[i], perCount );
                        }
                        appendNode.push(temChild);
                    }
                    currNodeIndex += perCount;
                    ztreeObj.addNodes(treeNode, appendNode , true);
                    cycleTimeout();
                }
               }, perTime);
        }

        // 递归处理子节点里面的属性
        function cycleChildren(temChild, node, size){
            if(!!node.children){
                temChild.children = [];
                for(var i =0; i < node.children.length && i < size ; i++){
                    temChild.children.push(proCopy(node.children[i], {}));
                }

                for(var i =0; i < node.children.length && i < size; i++){
                    if(!!node.children[i].children){
                        cycleChildren(temChild.children[i], node.children[i], size);
                    }
                }
            }
        }

        // 属性复制
        function proCopy(a, b){
            for(var key in a){
                if(key != 'children'){
                    b[key] = a[key];
                }
            }
            return b;
        }

        //
        function getZtreeNodeIds(nodeId){
            var pNode = ztreeObj.getNodeByParam("id", nodeId, null);
            if(!!pNode && !!pNode.pId){
                ztreeNodePIds.unshift(pNode.pId);
                getZtreeNodeIds(pNode.pId);
            }
        }
    },

    /**
     * 递归筛选数据 ps 默认取子节点下面的条数据
     * @author cygnet
     * @date   2017-07-14
     * @param  {[type]}   node [description]  渲染到数据
     * @param  {[type]}   num  [description]  控制默认展示多少条数据
     * @return {[type]}        [description]
     */
    renderToTreeData: function(node, num){
        if(!$.isArray(node)){ // 当前传递进来的参数是对象
              if(!!node.children){
                // 记录子节点的长度
                var tmpLength = node.children.length > num ? num : node.children.length;
                // 截取子节点下面的前200条数据
                node.children = node.children.slice(0,tmpLength);
                for(var m = 0 ; m < node.children.length ;m++){
                    this.renderToTreeData(node.children[m], num);
                }
            }
        }else{  // 当前传递进来的参数是数组
             for(var n = 0; n < node.length; n++){
                    this.renderToTreeData(node[n], num);
            }
        }
    },

    /**
     * 机构树的数据格式转换。把简单的格式转化成标准格式
     * @author cygnet
     * @date   2017-07-14
     * @param  {[type]}   setting [description]
     * @param  {[type]}   sNodes  [description]
     * @return {[type]}           [description]
     */
    treeStandardFormat: function(setting, sNodes){
        var i,l,
        key = setting.data.simpleData.idKey,
        parentKey = setting.data.simpleData.pIdKey,
        childKey = setting.data.key.children;
        if (!key || key=="" || !sNodes) return [];
        if ($.isArray(sNodes)) {
            var r = [];
            var tmpMap = {};
            for (i=0, l=sNodes.length; i<l; i++) {
                tmpMap[sNodes[i][key]] = sNodes[i];
                // tmpMap[sNodes[i][key]][childKey] = [];
            }
            for (i=0, l=sNodes.length; i<l; i++) {
                if (tmpMap[sNodes[i][parentKey]] && sNodes[i][key] != sNodes[i][parentKey]) {
                    tmpMap[sNodes[i][parentKey]][childKey] = tmpMap[sNodes[i][parentKey]][childKey] ? tmpMap[sNodes[i][parentKey]][childKey] : [];
                    tmpMap[sNodes[i][parentKey]][childKey].push(sNodes[i]);
                } else {
                    r.push(sNodes[i]);
                }
            }
            return r;
        }else {
            return [sNodes];
        }
    },

    // 深度拷贝数组和对象
    arrDeepCopy: function(o){
        if (o instanceof Array) {
            var n = [];
            for (var i = 0; i < o.length; ++i) {
                n[i] = this.arrDeepCopy(o[i]);
            }
            return n;
        }else if(o instanceof Object) {
            var n = {}
            for (var i in o) {
                n[i] = this.arrDeepCopy(o[i]);
            }
            return n;
        }else{
            return o;
        }
    },
    randomNum : function(Min,Max){
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    },
    //- 去除字符串的空格
    trimString: function(str){
        return str.replace(/\s+/g, '');
    },
     //传图片ID转化成base64
    convertImgToBase64: function(imgId) {
        var img = document.getElementById(imgId);
        var canvas = document.createElement("canvas");
        canvas.width = img.width;
        canvas.height = img.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, img.width, img.height);
        return canvas.toDataURL("image/png").substring('data:image/png;base64,'.length);
    },
    //将图片压缩转成base64 
    getBase64Img: function(img){
        var canvas = document.createElement("canvas");  
        var width = img.width;  
        var height = img.height;  
        canvas.width = width; /*设置新的图片的宽度*/  
        canvas.height = height; /*设置新的图片的长度*/  
        var ctx = canvas.getContext("2d");  
        ctx.drawImage(img, 0, 0, width, height); /*绘图*/  
        var dataURL = canvas.toDataURL("image/png", 0.8);  
        return dataURL.replace("data:image/png;base64,", "");  
    }
});


/**********************************************
 * 原型拓展 2016.09.09
 * by simba
 *********************************************/

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符，
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字)
// 例子：
// (new Date()).format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423
// (new Date()).format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18
Date.prototype.format = function(fmt){
  var o = {
    "M+" : this.getMonth()+1,                 //月份
    "d+" : this.getDate(),                    //日
    "h+" : this.getHours(),                   //小时
    "m+" : this.getMinutes(),                 //分
    "s+" : this.getSeconds(),                 //秒
    "q+" : Math.floor((this.getMonth()+3)/3), //季度
    "S"  : this.getMilliseconds()             //毫秒
  };
  if(/(y+)/.test(fmt))
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
  for(var k in o)
    if(new RegExp("("+ k +")").test(fmt))
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
  return fmt;
};

/**
 * 计算字符串的字节长度
 * @return {[type]} [description]
 */
String.prototype.gblen = function(){
    if(!this.charCodeAt){ return };

    var _len = 0;
    for (var i = 0; i < this.length; i++) {
        if (this.charCodeAt(i) > 127 || this.charCodeAt(i) == 94){
            _len += 2;
        } else {
            _len ++;
        }
    }
    return _len;
}

/**
 * 数组去重  ps：包括对象数组去重
 * @author simba
 * @date   2016-12-27
 */
Array.prototype.ToRepeat = function(){
    var _res = [];
    var _json = {};
    //判断是否是object对象（ps：仅仅只是简单的判断，混合型数组无法判断）
    if(typeof this[0] == 'object'){//是
        var _unique = {};
        if(!(this instanceof Array)){ return };
        this.forEach(function(gpa){
            _unique[JSON.stringify(gpa)] = gpa;
        });
        _res = Object.keys(_unique).map(function(u){
            return JSON.parse(u);
        });
    }else{//不是
        for(var i = 0; i < this.length; i++){
            if(!_json[this[i]]){
                _res.push(this[i]);
                _json[this[i]] = 1;
            }
        }
    }
    return _res;
};


/**
 * 数组去重合并
 * @param {[type]} arr1 [数组1]
 * @param {[type]} arr2 [数组2]
 */
Array.prototype.ToRepeatMerge = function(arr1, arr2){
    if(!(arr1 instanceof Array) || !(arr2 instanceof Array)){
        console.error("数组合并需要两个数组参数哦！");
        return;
    }
    var _arr = [];
    _arr = arr1.concat(arr2);
    return _arr.ToRepeat();
};

/**
 * 判断数组是否含有空值
 */
Array.prototype.HasNull = function(){
    if(!(this instanceof Array)){
        console.error("需要数组对象！");
        return;
    }

    var len = this.length;
    var hasNull = true;
    for(var i = 0; i < len; i ++){
        if(!this[i] && this[i] !== 0){
            hasNull = false && hasNull;
        }else{
            hasNull = true && hasNull;
        }
    }
    return hasNull;
};

/**
 * forEach 在ie8上的兼容性封装
 * @author  volcano
 * @date    2017--30
*/
if ( !Array.prototype.forEach ) {
  Array.prototype.forEach = function forEach( callback, thisArg ) {
      var T, k;
      if ( this == null ) {
          throw new TypeError( "this is null or not defined" );
      }
      var O = Object(this);
      var len = O.length >>> 0;
      if ( typeof callback !== "function" ) {
          throw new TypeError( callback + " is not a function" );
      }
      if ( arguments.length > 1 ) {
          T = thisArg;
      }
      k = 0;
      while( k < len ) {
          var kValue;
          if ( k in O ) {
              kValue = O[ k ];
              callback.call( T, kValue, k, O );
          }
          k++;
      }
  };
}


  /**********************************************
 * 注册全局事件 2016.09.09
 * by simba
 *********************************************/

/**
 * 侧边栏收起时 鼠标悬浮 提示文字
 * @param
 * @return
 */
$('body').on('mouseenter', '.slider-list li', function () {
    var $this = $(this);
    var thisIndex = $this.parent().find('li').index($this);
    var $slider = $this.parents('.slider');
    var thisTxt = $this.find('.slider-txt').text();
    var $sliderPop = $slider.find('.slider-pop');

    var tmp = '<div class="slider-pop">' + thisTxt + '</div>';

    if (!$slider.hasClass('slider-min')) {
        return false;
    }

    if ($slider.find(".slider-pop").length == 0) {
        $slider.append(tmp);
        $slider.find('.slider-pop').css({'top': thisIndex * 40 + 30 + 'px'});
    } else {
        $sliderPop.text(thisTxt).fadeIn(200).css({'top': thisIndex * 40 + 30 + 'px'});
    }
});

/**
 * 鼠标离开侧边栏  提示文案消失
 * @param
 * @return
 */
$('body').on('mouseleave', '.slider-list', function () {
    var $sliderPop = $(this).parents('.slider').find('.slider-pop');

    $sliderPop.fadeOut();
});

