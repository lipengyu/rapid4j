if(!window.Sigma){
  window.Sigma={};
}
Sigma.Const=Sigma.Const||{};
SigmaConst=Sigma.Const;
Sigma.Const.Grid={COL_CLASS_PREFIX:"td.",DEFAULT_ECG_ID:"gt",SHADOW_ROW:"_shadowRow",HIDE_HEADER_ROW:"_hideListRow",COL_T_CLASSNAME:"gt-col-",SKIN_CLASSNAME_PREFIX:"gt-skin-",SCROLLBAR_WIDTH:18,MIN_COLWIDTH:40,AJAX_HEADER:["isAjaxRequest","true"]};
Sigma.Const.Key={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,PAUSE:19,CAPSLOCK:20,ESC:27,SPACE:33,PAGEUP:33,PAGEDOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,INSERT:45,DELETE:46,WIN:91,WIN_R:92,MENU:93,F1:112,F2:113,F3:114,F4:115,F5:116,F6:117,F7:118,F8:119,F9:120,F10:121,F11:122,F12:123,NUMLOCK:144,SCROLLLOCK:145};
if(!window.Sigma){
  window.Sigma={};
}
Sigma.loaded=false;
Sigma.init=function(win){
  win=win||window;
  Sigma.doc=document;
  win.undefined=win.undefined;
  var ua=win.navigator.userAgent.toLowerCase();
  Sigma.isIE=ua.indexOf("msie")>-1;
  Sigma.isIE7=ua.indexOf("msie 7")>-1;
  Sigma.isIE8=ua.indexOf("msie 8")>-1;
  Sigma.isIE9=ua.indexOf("msie 9")>-1;
  Sigma.isFF=ua.indexOf("firefox")>-1;
  Sigma.isFF1=ua.indexOf("firefox/1")>-1;
  Sigma.isFF2=ua.indexOf("firefox/2")>-1;
  Sigma.isFF3=ua.indexOf("firefox/3")>-1;
  Sigma.isOpera=ua.indexOf("opera")>-1;
  Sigma.isWebkit=(/webkit|khtml/).test(ua);
  Sigma.isSafari=ua.indexOf("safari")>-1||Sigma.isWebkit;
  Sigma.isChrome=ua.indexOf("chrome")>-1||Sigma.isWebkit;
  Sigma.isGecko=Sigma.isMoz=!Sigma.isSafari&&ua.indexOf("gecko")>-1;
  Sigma.isStrict=Sigma.doc.compatMode=="CSS1Compat"||Sigma.isSafari;
  Sigma.isBoxModel=Sigma.isIE&&!Sigma.isIE8&&!Sigma.isIE9&&!Sigma.isStrict;
  Sigma.isNotStrictIE=Sigma.isBoxModel;
  Sigma.isSecure=win.location.href.toLowerCase().indexOf("https")===0;
  Sigma.isWindows=(ua.indexOf("windows")!=-1||ua.indexOf("win32")!=-1);
  Sigma.isMac=(ua.indexOf("macintosh")!=-1||ua.indexOf("mac os x")!=-1);
  Sigma.isLinux=(ua.indexOf("linux")!=-1);
};
Sigma.init();
Sigma.$extend=function(original,extended,isDeep){
  if(arguments.length<2){
    extended=original;
    original=this;
  }
  for(var property in extended){
    var v=extended[property];
    if(isDeep&&v&&Sigma.$type(v,"object","array")){
      v=Sigma.$clone(v,isDeep);
    }
    if(v!==undefined){
      original[property]=v;
    }
  }
  return original;
};
Sigma.$extend(Sigma,{$empty:jQuery.noop,$chk:function(obj){
    return !!(obj||obj===0||obj==="");
  },$type:function(obj){
    var argNum=arguments.length;
    if(argNum>1){
      for(var i=1;i<argNum;i++){
        if(Sigma.$type(obj)==arguments[i]){
          return true;
        }
      }
      return false;
    }
    var type=typeof obj;
    if(obj===null){
      return "object";
    }
    if(type=="undefined"){
      return "undefined";
    }
    if(obj.htmlElement){
      return "element";
    }
    if(type=="object"&&obj.nodeType&&obj.nodeName){
      switch(obj.nodeType){
      case 1:
        return "element";
      case 3:
        return (/\S/).test(obj.nodeValue)?"textnode":"whitespace";
      }
    }
    if(Sigma.U.isArray(obj)){
      return "array";
    }
    if(type=="object"&&typeof obj.length=="number"){
      return (obj.callee)?"arguments":"collection";
    }else {
      if(type=="function"&&typeof obj.length=="number"&&obj[0]!==undefined){
        return "collection";
      }
    }
    return type;
  },$merge:function(){
    var mix={};
    for(var i=0;i<arguments.length;i++){
      for(var property in arguments[i]){
        var ap=arguments[i][property];
        var mp=mix[property];
        if(mp&&Sigma.$type(ap,"object")&&Sigma.$type(mp,"object")){
          mix[property]=Sigma.$merge(mp,ap);
        }else {
          mix[property]=ap;
        }
      }
    }
    return mix;
  },$indexOf:function(arr,item,start){
    if(arr){
      start=start||0;
      for(var i=start,j=arr.length;i<j;i++){
        if(arr[i]===item){
          return i;
        }
      }
    }
    return -1;
  },$array:function(iterable,start,end,isDeep){
    var results=[];
    if(iterable){
      if(!Sigma.$chk(start)){
        start=0;
      }
      if(!Sigma.$chk(end)){
        end=iterable.length;
      }
      if(Sigma.$type(iterable,"arguments","collection")||Sigma.$type(iterable,"array")&&(start>0||end<iterable.length)){
        for(var i=start;i<end;i++){
          results.push(iterable[i]);
        }
      }else {
        if(Sigma.$type(iterable,"array")){
          results=results.concat(iterable);
        }else {
          for(var k in iterable){
            if(iterable.hasOwnProperty(k)){
              results.push(iterable[k]);
            }
          }
        }
      }
    }
    return results;
  },$clone:function(obj,isDeep){
    var newObj;
    if(!obj){
      newObj=obj;
    }else {
      if(Sigma.$type(obj,"array","arguments","collection")){
        newObj=Sigma.$array(obj,0,obj.length,isDeep);
      }else {
        newObj=Sigma.$extend({},obj,isDeep);
      }
    }
    return newObj;
  },$msg:function(msgTemplate,msgs){
    for(var i=1;i<arguments.length;i++){
      msgTemplate=Sigma.U.replaceAll(msgTemplate,"#{"+i+"}",arguments[i]);
    }
    return msgTemplate;
  },$clear:function(timer){
    window.clearTimeout(timer);
    window.clearInterval(timer);
    if(CollectGarbage){
      CollectGarbage();
    }
    return null;
  },$thread:function(fn,timeout){
    var nfn=fn;
    window.setTimeout(nfn,timeout||20);
  },$each:function(iterable,fn,bind,arg){
    var resultList=[];
    if(Sigma.$type(iterable,"array","arguments","collection")||iterable&&!Sigma.$type(iterable,"string")&&Sigma.$type(iterable.length,"number")){
      for(var i=0,j=iterable.length;i<j;i++){
        resultList.push(fn.call(bind||iterable,iterable[i],i,iterable,arg));
      }
    }else {
      for(var name in iterable){
        resultList.push(fn.call(bind||iterable,iterable[name],name,iterable,arg));
      }
    }
    return resultList;
  },$getText:function(el){
    return jQuery(el).text();
  },$element:function(el,props){
    if(Sigma.$type(el,"string")){
      if(Sigma.isIE&&props&&(props.name||props.type)){
        var name=(props.name)?' name="'+props.name+'"':"";
        var type=(props.type)?' type="'+props.type+'"':"";
        delete props.name;
        delete props.type;
        el="<"+el+name+type+">";
      }
      el=Sigma.doc.createElement(el);
    }
    if(props){
      if(props.style){
        Sigma.$extend(el.style,props.style);
        delete props.style;
      }
      Sigma.$extend(el,props);
    }
    return el;
  }});
Sigma.Class=function(properties){
  properties=properties||{};
  var klass=function(){
    var prop=this.properties;
    if(Sigma.$type(prop,"function")){
      prop=prop.apply(this,arguments);
    }
    if(Sigma.$type(prop,"object")){
      Sigma.$extend(this,prop);
    }
    var methds=this.abstractMethods;
    Sigma.$each(this.abstractMethods,function(_item){
      this[_item]=Sigma.$empty;
    },this);
    return (arguments[0]!==Sigma.$empty&&Sigma.$type(this.initialize,"function"))?this.initialize.apply(this,arguments):this;
  };
  Sigma.$extend(klass,this);
  klass.constructor=Sigma.Class;
  klass.prototype=properties;
  return klass;
};
Sigma.Class.prototype={extend:function(){
    var proto=new this(Sigma.$empty);
    for(var i=0,l=arguments.length;i<l;i++){
      var properties=arguments[i];
      for(var property in properties){
        var pp=proto[property];
        proto[property]=Sigma.Class.merge(pp,properties[property]);
      }
    }
    return new Sigma.Class(proto);
  }};
Sigma.Class.merge=function(previous,current){
  if(previous&&previous!=current){
    var type=Sigma.$type(current);
    if(!Sigma.$type(previous,type)){
      return current;
    }
    switch(type){
    case "function":
      var merged=function(){
        this._parent=arguments.callee._parent;
        return current.apply(this,arguments);
      };
      merged._parent=previous;
      return merged;
    case "object":
      return Sigma.$merge(previous,current);
    }
  }
  return current;
};
Sigma.$class=function(properties){
  return new Sigma.Class(properties);
};
Sigma.$e=Sigma.$element;
Sigma.$A=Sigma.$array;
Sigma.$byId=function(el,pros){
  if(!Sigma.$chk(el)){
    return null;
  }
  var type=Sigma.$type(el);
  if(type=="element"){
    return Sigma.$e(el,pros);
  }
  if(type=="string"||type=="number"){
    el=Sigma.doc.getElementById(""+el);
  }
  if(!el){
    return null;
  }
  if(Sigma.U.contains(["object","embed"],!el.tagName?el.tagName.toLowerCase():"")){
    return el;
  }
  return Sigma.$e(el);
};
Sigma.getDom=function(el){
  if(!el||!document){
    return null;
  }
  return el.dom?el.dom:(typeof el=="string"?document.getElementById(el):el);
};
Sigma.$byName=function(el){
  var elList=[];
  if(!Sigma.$chk(el)){
    return elList;
  }
  var elColl=Sigma.doc.getElementsByName(""+el);
  if(!elColl||elColl.length<1){
    return elList;
  }
  for(var i=0;i<elColl.length;i++){
    el=elColl[i];
    elList.push(Sigma.U.contains(["object","embed"],el.tagName.toLowerCase())?el:Sigma.$e(el));
  }
  return elList;
};
Sigma.$=function(el){
  var tEl=Sigma.$byName(el);
  if(tEl&&tEl.length>0){
    return tEl[0];
  }
  return (!tEl||tEl.length<1)?Sigma.$byId(el):tEl;
};
Sigma.Utils={P_START:"@{",P_END:"}",P_VAR_NAME:"obj_in",parseExpression:function(ex,pName,argNames,pStart,pEnd){
    pStart=pStart||Sigma.U.P_START;
    pEnd=pEnd||Sigma.U.P_END;
    pName=pName||Sigma.U.P_VAR_NAME;
    argNames=argNames||pName;
    var startLength=pStart.length;
    var endLength=pEnd.length;
    var templateC=[];
    var current=0;
    while(true){
      var start=ex.indexOf(pStart,current);
      var sBegin=start+startLength;
      var sEnd=ex.indexOf(pEnd,sBegin);
      var str=null;
      var val=null;
      if(sBegin>=startLength&&sEnd>sBegin){
        str=ex.substring(current,start);
        val=ex.substring(sBegin,sEnd);
      }else {
        str=ex.substring(current);
      }
      str=Sigma.U.escapeString(str);
      templateC.push(str);
      if(val===null){
        break ;
      }
      if(!Sigma.U.isNumber(val)){
        val=(pName?(pName+"."):"")+val;
      }else {
        val=(pName?(pName+"["):"")+val+(pName?"]":"");
      }
      templateC.push(val);
      current=sEnd+endLength;
    }
    var t="function("+argNames+"){ return "+templateC.join("+")+" }";
    eval("t="+t);
    return t;
  },isArray:function(a){
    return jQuery.type(a)=="array";
  },isNumber:function(n,strict){
    return !strict&&isNaN(n)?NaN:jQuery.type(n)=="number";
  },parseInt:function(num,defaultNum){
    var t=parseInt(num);
    return isNaN(parseInt(num))?defaultNum||0:t;
  },add2Map:function(key,value,map){
    map=map||{};
    if(map[key]===undefined){
      map[key]=value;
    }else {
      map[key]=[].concat(map[key]);
      map[key].push(value);
    }
    return map;
  },moveItem:function(arr,fromIdx,toIdx){
    if(fromIdx==toIdx){
      return arr;
    }
    var moveObj=arr[fromIdx];
    var dObj=arr[toIdx];
    arr.splice(toIdx,1,moveObj,dObj);
    if(fromIdx<toIdx){
      arr.splice(fromIdx,1);
    }else {
      arr.splice(fromIdx+1,1);
    }
    return arr;
  },convert:function(sValue,sDataType){
    switch(sDataType){
    case "int":
      return parseInt(sValue);
    case "float":
      return parseFloat(sValue);
    case "date":
      return sValue;
    default:
      return sValue;
    }
    return sValue;
  },getTagName:function(node){
    return node&&node.tagName?String(node.tagName).toUpperCase():null;
  },getParentByTagName:function(tagName,node,event,deep){
    if(!node){
      event=Sigma.$event(event);
      node=Sigma.U.getEventTarget(event);
    }
    deep=deep||6;
    if(!node){
      return null;
    }
    tagName=tagName.toLowerCase();
    while(node&&(deep--)>0){
      if(node.tagName&&node.tagName.toLowerCase()==tagName){
        return node;
      }
      if(Sigma.U.hasClass(node.className,"gt-grid")&&tagName!="div"){
        break ;
      }
      node=node.parentNode;
    }
    return null;
  },focus:function(el){
    jQuery(el).focus();
  },hasClass:function(el,className){
    return jQuery(el).hasClass(className);
  },addClass:function(el,className){
    return jQuery(el).addClass(className).get(0);
  },removeClass:function(el,className){
    return jQuery(el).removeClass(className).get(0);
  },toggleClass:function(el,className){
    return jQuery(el).toggleClass(className).get(0);
  },hasSubString:function(str,string,s){
    return (s)?(s+str+s).indexOf(s+string+s)>-1:str.indexOf(string)>-1;
  },childElement:function(p,index){
    var i=0;
    var n=p?p.firstChild:null;
    while(n){
      if(n.nodeType==1){
        if(++i==index){
          return n;
        }
      }
      n=n.nextSibling;
    }
    return null;
  },firstChildElement:function(el){
    return Sigma.U.childElement(el,1);
  },lastChildElement:function(el){
    var tEl=el.childNodes[el.childNodes.length-1];
    return tEl.nodeType==1?tEl:Sigma.U.prevElement(tEl);
  },nextElement:function(n){
    return jQuery(n).next().get(0);
  },prevElement:function(n){
    return jQuery(n).prev().get(0);
  },getCellIndex:function(td){
    if(Sigma.isIE){
      var cells=td.parentNode.cells;
      for(var i=0,j=cells.length;i<j;i++){
        if(cells[i]===td){
          return i;
        }
      }
    }
    return td.cellIndex;
  },insertNodeBefore:function(elA,elB){
    return jQuery(elA).insertBefore(elB).get(0);
  },insertNodeAfter:function(elA,elB){
    return jQuery(elA).insertAfter(elB).get(0);
  },listToMap:function(list){
    var map={};
    for(var i=0;i<list.length;i++){
      map[list[i]]=list[i];
    }
    return map;
  },createSelect:function(map,defaultValue,opt,selectEl){
    selectEl=selectEl||Sigma.$e("select",opt||{});
    var sTemp=Sigma.doc.createDocumentFragment();
    Sigma.$each(map,function(text,value){
      var op=Sigma.$e("option",{"value":value,"text":""+text,innerHTML:text});
      if(Sigma.$chk(defaultValue)&&value==defaultValue){
        op.selected=true;
      }
      sTemp.appendChild(op);
    });
    selectEl.appendChild(sTemp);
    return selectEl;
  },createSelectHTML:function(map,defaultValue,opt){
    opt=opt||{};
    var id=opt.id?(' id="'+opt.id+'" '):" ",cls=opt.className||"",st=opt.style?(' style="'+opt.style+'" '):" ";
    var selectH=["<select"+id+st+'class="gt-input-select '+cls+'">'];
    for(var k in map){
      var s="";
      if((defaultValue||defaultValue===0)&&k==defaultValue){
        s=' selected="selected" ';
      }
      selectH.push('<option value="'+k+'" '+s+">"+map[k]+"</option>");
    }
    selectH.push("</select>");
    return selectH.join("");
  },getEventTarget:function(evt){
    return jQuery.event.fix(evt).target;
  },stopEvent:function(event){
    event=jQuery.event.fix(event||window.event);
    event.stopPropagation();
    event.preventDefault();
  },addEvent:function(el,type,fn,bind,args){
    if(!fn||!el||!type){
      return false;
    }
    if(arguments.length>3){
      fn=Sigma.U.bindAsEventListener(fn,bind,args);
    }
    Sigma.EventCache.add(el,type,fn,false);
    return jQuery(el).bind(type,fn);
  },removeEvent:function(el,type,fn,bind,args){
    if(!fn||!el||!type){
      return false;
    }
    if(arguments.length>3){
      fn=Sigma.U.bindAsEventListener(fn,bind,args);
    }
    Sigma.EventCache.remove(el,type,fn,false);
    return jQuery(el).unbind(type,fn);
  },onLoadFuncList:[],onLoadFuncCaller:function(){
    for(var i=0;i<Sigma.U.onLoadFuncList.length;i++){
      var func=Sigma.U.onLoadFuncList[i];
      func.apply(this,arguments);
    }
    Sigma.loaded=true;
  },onLoad:function(fn,win){
    win=win||window;
    Sigma.U.onLoadFuncList.push(fn);
    if(!Sigma.U.onLoadFuncCaller.hasAdd){
      Sigma.U.addEvent(win,"load",Sigma.U.onLoadFuncCaller);
      Sigma.U.onLoadFuncCaller.hasAdd=true;
    }
  },orphanDiv:jQuery('<div class="gt-orphan-div"></div>').get(0),createElementFromHTML:function(html,parentEl){
    return jQuery(html).appendTo(parentEl).get(0);
  },createTrFromHTML:function(html,parentEl){
    return jQuery(html).appendTo(parentEl).get(0);
  },removeNode:function(els){
    for(var i=0;i<arguments.length;i++){
      Sigma.EventCache.remove(jQuery(arguments[i]).remove().get(0));
    }
  },removeNodeTree:function(el){
    if(el){
      var els=el.getElementsByTagName("*");
      for(var i=0;i<els.length;i++){
        Sigma.U.removeNodeTree(els[i]);
      }
      Sigma.U.removeNode(el);
    }
  },getLastChild:function(el){
    return el.childNodes[el.childNodes.length-1];
  },getPosLeftTop:function(elm,pEl){
    pEl=pEl||window;
    var top=elm.offsetTop;
    var left=elm.offsetLeft;
    elm=elm.offsetParent;
    while(elm&&elm!=pEl){
      top+=(elm.offsetTop-elm.scrollTop);
      left+=(elm.offsetLeft-elm.scrollLeft);
      elm=elm.offsetParent;
    }
    return [left,top];
  },getPosRight:function(elm){
    return Sigma.U.getPosLeftTop(elm)[0]+elm.offsetWidth;
  },getPosBottom:function(elm){
    return Sigma.U.getPosLeftTop(elm)[1]+elm.offsetHeight;
  },getHeight:function(el,content){
    return content?jQuery(el).outerHeight():jQuery(el).height();
  },getWidth:function(el,content){
    return content?jQuery(el).outerWidth():jQuery(el).width();
  },getBorderWidths:function(el){
    return [Sigma.U.parseInt(el.style.borderTopWidth),Sigma.U.parseInt(el.style.borderRightWidth),Sigma.U.parseInt(el.style.borderBottomWidth),Sigma.U.parseInt(el.style.borderLeftWidth)];
  },getPaddings:function(el){
    return [Sigma.U.parseInt(el.style.paddingTop),Sigma.U.parseInt(el.style.paddingRight),Sigma.U.parseInt(el.style.paddingBottom),Sigma.U.parseInt(el.style.paddingLeft)];
  },getPageX:function(ev){
    return jQuery.event.fix(ev||window.event).pageX;
  },getPageY:function(ev){
    return jQuery.event.fix(ev||window.event).pageY;
  },getPageScroll:function(){
    var dd=Sigma.doc.documentElement,db=Sigma.doc.body;
    if(dd&&(dd.scrollLeft||dd.scrollTop)){
      return [dd.scrollLeft,dd.scrollTop];
    }else {
      if(db){
        return [db.scrollLeft,dd.scrollTop];
      }else {
        return [0,0];
      }
    }
  },getScroll:function(el){
    var d=el,doc=Sigma.doc;
    if(d==doc||d==doc.body){
      var l=window.pageXOffset||doc.documentElement.scrollLeft||doc.body.scrollLeft||0;
      var t=window.pageYOffset||doc.documentElement.scrollTop||doc.body.scrollTop||0;
      return [l,t];
    }else {
      return [d.scrollLeft,d.scrollTop];
    }
  },getXY:function(el,pEl){
    var p,pe,b,scroll,bd=Sigma.doc.body;
    if(el.getBoundingClientRect){
      b=el.getBoundingClientRect();
      scroll=Sigma.U.getScroll(Sigma.doc);
      return [b.left+scroll[0],b.top+scroll[1]];
    }
    var x=0,y=0;
    p=el;
    pEl=pEl||bd;
    var hasAbsolute=el.style.position=="absolute";
    while(p){
      x+=p.offsetLeft;
      y+=p.offsetTop;
      if(!hasAbsolute&&p.style.position=="absolute"){
        hasAbsolute=true;
      }
      if(Sigma.isGecko){
        pe=p;
        var bt=parseInt(pe.style.borderTopWidth,10)||0;
        var bl=parseInt(pe.style.borderLeftWidth,10)||0;
        x+=bl;
        y+=bt;
        if(p!=el&&pe.style.overflow!="visible"){
          x+=bl;
          y+=bt;
        }
      }
      p=p.offsetParent;
    }
    if(Sigma.isSafari&&hasAbsolute){
      x-=bd.offsetLeft;
      y-=bd.offsetTop;
    }
    if(Sigma.isGecko&&!hasAbsolute){
      var dbd=bd;
      x+=parseInt(dbd.style.borderTopWidth,10)||0;
      y+=parseInt(dbd.style.borderTopWidth,10)||0;
    }
    p=el.parentNode;
    while(p&&p!=bd){
      if(!Sigma.isOpera||(p.tagName.toUpperCase()!="TR"&&p.style.display!="inline")){
        x-=p.scrollLeft;
        y-=p.scrollTop;
      }
      p=p.parentNode;
    }
    return [x,y];
  },setXY:function(el,xy){
    if(el.style.position=="static"){
      el.style.position="relative";
    }
    var pts=Sigma.U.translatePoints(el,xy);
    if(xy[0]!==false){
      el.style.left=pts.left+"px";
    }
    if(xy[1]!==false){
      el.style.top=pts.top+"px";
    }
  },translatePoints:function(el,x,y){
    if(typeof x=="object"||x instanceof Array){
      y=x[1];
      x=x[0];
    }
    var p=el.style.position;
    var o=Sigma.U.getXY(el);
    var l=parseInt(el.style.left,10);
    var t=parseInt(el.style.top,10);
    if(isNaN(l)){
      l=(p=="relative")?0:el.offsetLeft;
    }
    if(isNaN(t)){
      t=(p=="relative")?0:el.offsetTop;
    }
    return {left:(x-o[0]+l),top:(y-o[1]+t)};
  },getContentWidthHeight:function(node){
    var mL=Sigma.U.parseInt(node.style.marginLeft);
    var mR=Sigma.U.parseInt(node.style.marginRight);
    var pL=Sigma.U.parseInt(node.style.paddingLeft);
    var pR=Sigma.U.parseInt(node.style.paddingRight);
    var w=node.clientWidth-pL-pR;
    var h=node.clientHeight;
    return [w,h];
  },getPixelValue:function(inval,parentVal){
    if(Sigma.$type(inval,"number")){
      return inval;
    }
    inval=""+inval;
    var nVal=Sigma.U.parseInt(inval);
    if(inval.indexOf("%")>1){
      return parentVal*nVal/100;
    }
    return nVal;
  },setValue:function(el,value){
    jQuery(el).val(value);
  },getValue:function(el){
    return jQuery(el).val();
  },setOpacity:function(el,opacity){
    return jQuery(el).css("opacity",opacity).get(0);
  },replaceAll:function(exstr,ov,value){
    var gc=Sigma.U.escapeRegExp(ov);
    if(!Sigma.$chk(gc)||gc===""){
      return exstr;
    }
    var rep="/"+gc+"/gm";
    var r=null;
    var cmd="r=exstr.replace("+rep+","+Sigma.U.escapeString(value)+")";
    eval(cmd);
    return r;
  },trim:function(str,wh){
    if(!str||!str.replace||!str.length){
      return str;
    }
    var re=(wh>0)?(/^\s+/):(wh<0)?(/\s+$/):(/^\s+|\s+$/g);
    return str.replace(re,"");
  },escapeRegExp:function(str){
    return !str?""+str:(""+str).replace(/\\/gm,"\\\\").replace(/([\f\b\n\t\r[\^$|?*+(){}])/gm,"\\$1");
  },escapeString:function(str){
    return str===""?'""':(!str?""+str:('"'+(""+str).replace(/(["\\])/g,"\\$1")+'"').replace(/[\f]/g,"\\f").replace(/[\b]/g,"\\b").replace(/[\n]/g,"\\n").replace(/[\t]/g,"\\t").replace(/[\r]/g,"\\r"));
  },bind:function(fn,bindObj,args){
    args=[].concat(args);
    return function(){
      return fn.apply(bindObj||fn,Sigma.U.merge(Sigma.$A(arguments),args));
    };
  },bindAsEventListener:function(fn,bindObj,args){
    return function(event){
      event=event||window.event;
      return fn.apply(bindObj||fn,[Sigma.$event(event)].concat(args));
    };
  },clean:function(str){
    return Sigma.U.trim(str.replace(/\s{2,}/g," "));
  },contains:function(arr,item,from){
    return Sigma.U.indexOf(arr,item,from)!=-1;
  },merge:function(arr,coll,isOverride){
    var minEnd=arr.length<coll.length?arr.length:coll.length;
    var i,j;
    if(isOverride){
      for(i=0,j=minEnd;i<j;i++){
        arr[i]=coll[i];
      }
    }
    for(i=minEnd,j=coll.length;i<j;i++){
      arr[i]=coll[i];
    }
    return arr;
  },each:function(arr,fn,bind){
    return Sigma.$each(arr,fn,bind);
  },indexOf:function(arr,item,from){
    var len=arr.length;
    for(var i=(from<0)?Math.max(0,len+from):from||0;i<len;i++){
      if(arr[i]===item){
        return i;
      }
    }
    return -1;
  },remove:function(arr,item,all){
    var i=0;
    var len=arr.length;
    while(i<len){
      if(arr[i]===item){
        arr.splice(i,1);
        if(!all){
          return arr;
        }
        len--;
      }else {
        i++;
      }
    }
    return arr;
  },next:function(arr,item){
    var t=Sigma.U.indexOf(arr,item);
    if(t<0){
      return null;
    }
    return arr[t+1];
  },previous:function(arr,item){
    var t=Sigma.U.indexOf(arr,item);
    if(t<1){
      return null;
    }
    return arr[t-1];
  },createStyleSheet:function(id,doc){
    return jQuery('<style id="'+id+'"></style>',doc).appendTo(jQuery("head").get(0));
  },getCheckboxState:function(inputs,name){
    var rs={};
    for(var i=0;i<inputs.length;i++){
      if(inputs[i].name==name&&inputs[i].checked){
        rs[inputs[i].value]=inputs[i].checked;
      }
    }
    return rs;
  }};
Sigma.Util=Sigma.Utils;
Sigma.U=Sigma.Utils;
Sigma.Utils.CSS=function(){
  var rules=null;
  return {createStyleSheet:function(cssText,id,docT){
      var ss;
      docT=docT||Sigma.doc;
      var heads=docT.getElementsByTagName("head");
      if(!heads||heads.length<1){
        heads=docT.createElement("head");
        if(docT.documentElement){
          docT.documentElement.insertBefore(heads,docT.body);
        }else {
          docT.appendChild(heads);
        }
        heads=docT.getElementsByTagName("head");
      }
      var head=heads[0];
      var rules=docT.createElement("style");
      rules.setAttribute("type","text/css");
      if(id){
        rules.setAttribute("id",id);
      }
      if(Sigma.isIE){
        head.appendChild(rules);
        ss=rules.styleSheet;
        ss.cssText=cssText;
      }else {
        try{
          rules.appendChild(docT.createTextNode(cssText));
        }
        catch(e){
          rules.cssText=cssText;
        }
        head.appendChild(rules);
        ss=rules.styleSheet?rules.styleSheet:(rules.sheet||docT.styleSheets[docT.styleSheets.length-1]);
      }
      this.cacheStyleSheet(ss);
      return ss;
    },getRules:function(refreshCache,docT){
      docT=docT||Sigma.doc;
      if(!rules||refreshCache){
        rules={};
        var ds=docT.styleSheets;
        for(var i=0,len=ds.length;i<len;i++){
          this.cacheStyleSheet(ds[i]);
        }
      }
      return rules;
    },getRule:function(selector,refreshCache){
      var rs=this.getRules(refreshCache);
      return rs[selector.toLowerCase()];
    },updateRule:function(selector,property,value){
      var rule=this.getRule(selector);
      if(rule){
        rule.style[property]=value;
      }
    },cacheStyleSheet:function(ss){
      rules=rules||{};
      try{
        var ssRules=ss.cssRules||ss.rules;
        for(var j=ssRules.length-1;j>=0;--j){
          rules[ssRules[j].selectorText.toLowerCase()]=ssRules[j];
        }
      }
      catch(e){
      }
    }};
}();
Sigma.$event=function(event){
  event=event||window.event;
  return event;
};
Sigma.EventCache=(function(){
  var listEvents=[];
  var nodeList=[];
  var eventList={};
  function getKey(n){
    return ""+n+"_"+n.id;
  }
  return {add:function(node,type,fn){
      if(!node){
        return ;
      }
      if(!Sigma.U.contains(listEvents,arguments)){
        listEvents.push(arguments);
      }
      var idx=Sigma.U.indexOf(nodeList,node);
      var key=idx+"_"+node+"_"+node.id;
      if(idx<0){
        key=nodeList.length+"_"+node+"_"+node.id;
        nodeList.push(node);
        eventList[key]={};
      }
      eventList[key][type]=eventList[key][type]||[];
      if(!Sigma.U.contains(eventList[key][type],fn)){
        eventList[key][type].push(fn);
      }
    },remove:function(node,type,fn){
      if(!node){
        return ;
      }
      var idx=Sigma.U.indexOf(nodeList,node);
      var key=idx+"_"+node+"_"+node.id;
      if(idx<0||!eventList[key]){
        return ;
      }
      if(!type){
        eventList[key]=null;
        nodeList[idx]=null;
        return ;
      }
      if(!fn&&eventList[key][type]){
        eventList[key][type]=null;
        delete eventList[key][type];
      }
      if(eventList[key][type]){
        eventList[key][type].remove(fn);
      }
    },clearUp:function(){
      var i,item;
      for(i=listEvents.length-1;i>=0;i=i-1){
        item=listEvents[i];
        Sigma.EventCache.remove(item[0]);
        if(item[0].removeEventListener){
          item[0].removeEventListener(item[1],item[2],item[3]);
        }
        if(item[1].substring(0,2)!="on"){
          item[1]="on"+item[1];
        }
        if(item[0].detachEvent){
          item[0].detachEvent(item[1],item[2]);
        }
        item[0][item[1]]=null;
        delete listEvents[i];
      }
      Sigma.destroyGrids&&Sigma.destroyGrids();
      Sigma.destroyWidgets&&Sigma.destroyWidgets();
      window.CollectGarbage&&CollectGarbage();
    }};
})();
Sigma.toQueryString=function(source){
  if(!source||Sigma.$type(source,"string","number")){
    return source;
  }
  var queryString=[];
  for(var property in source){
    var value=source[property];
    if(value!==undefined){
      value=[].concat(value);
    }
    for(var i=0;i<value.length;i++){
      var val=value[i];
      if(Sigma.$type(val,"object")){
        val=Sigma.$json(val);
      }
      queryString.push(encodeURIComponent(property)+"="+encodeURIComponent(val));
    }
  }
  return queryString.join("&");
};
Sigma.toJSONString=function(source,format){
  return Sigma.JSON.encode(source,"__gt_",format);
};
Sigma.$json=Sigma.toJSONString;
Sigma.FunctionCache={};
Sigma.$invoke=function(obj,funcName,argsList){
  obj=obj||window;
  var func=obj[funcName]||Sigma.$getFunction(funcName);
  if(typeof (func)=="function"){
    return func.apply(obj,argsList||[]);
  }
};
Sigma.$getFunction=function(funName){
  return Sigma.FunctionCache[funName];
};
Sigma.$callFunction=function(funName,argsList){
  Sigma.$invoke(null,funName,argsList);
};
Sigma.$putFunction=function(funName,func){
  Sigma.FunctionCache[funName]=func;
};
Sigma.$removeFunction=function(funName){
  Sigma.FunctionCache[funName]=null;
  delete Sigma.FunctionCache[funName];
};
Sigma.U.onLoad(function(){
  Sigma.U.addEvent(window,"unload",Sigma.EventCache.clearUp);
});
Sigma.AjaxDefault={paramName:"_gt_json"};
Sigma.Ajax=Sigma.$class({properties:function(){
    return {method:"post",jsonParamName:Sigma.AjaxDefault.paramName,async:true,urlEncoded:true,encoding:null,mimeType:null,beforeSend:Sigma.$empty,onComplete:Sigma.$empty,onSuccess:Sigma.$empty,onFailure:Sigma.$empty,onCancel:Sigma.$empty,xhr:"",url:"",data:"",paramType:"jsonString",headers:{"X-Requested-With":"XMLHttpRequest","Accept":"text/javascript, text/html, application/xml,application/json, text/xml, */*"},autoCancel:false,evalScripts:false,evalResponse:false,responseContentType:"",dataUrl:false,queryParameters:null};
  },setQueryParameters:function(queryParameters){
    this.queryParameters=queryParameters;
  },initialize:function(options){
    options=options||{};
    if(Sigma.$type(options,"string")){
      options={url:options};
    }
    if(!(this.xhr=this.getXHR())){
      return ;
    }
    var _header=Sigma.$extend(this.headers,options.headers);
    Sigma.$extend(this,options);
    if(this.mimeType){
      _header["X-Response-MimeType"]=this.mimeType;
    }
    this.headers=_header;
  },send:function(options){
    this.running=true;
    if(Sigma.$type(options,"string")){
      options={data:options};
    }
    options=Sigma.$extend({data:this.data,url:this.url,method:this.method},options);
    var data=options.data,url=options.url,method=String(options.method).toLowerCase();
    if(Sigma.$invoke(this,"beforeSend",[this.xhr,data])===false){
      return this;
    }
    if(this.urlEncoded&&method=="post"){
      var encoding=(this.encoding)?"; charset="+this.encoding:"";
      this.setHeader("Content-type","application/x-www-form-urlencoded"+encoding);
    }
    switch(Sigma.$type(data)){
    case "object":
      if(this.paramType=="jsonString"){
        var _data=Sigma.$json(data);
        data={};
        data[this.jsonParamName]=_data;
      }
      data=Sigma.toQueryString(data);
      break ;
    default:
    }
    var _queryParameters;
    if(this.queryParameters&&Sigma.$type(this.queryParameters,"object")){
      _queryParameters=Sigma.toQueryString(this.queryParameters);
    }else {
      if(Sigma.$type(this.queryParameters,"string")){
        _queryParameters=this.queryParameters;
      }
    }
    if(_queryParameters&&Sigma.$type(data,"string")){
      data=data+"&"+_queryParameters;
    }
    if(method=="post"){
      var idx=url.indexOf("?");
      if(idx>=0){
        data=url.substring(idx+1)+"&"+data;
        url=url.substring(0,idx);
      }
    }else {
      if(data&&(method=="get"||this.dataUrl)){
        url=url+(url.indexOf("?")>=0?"&":"?")+data;
        data=null;
      }
    }
    var _ajax=this;
    this.xhr.open(method.toUpperCase(),url,this.async);
    this.xhr.onreadystatechange=function(){
      return _ajax.onStateChange.apply(_ajax,arguments);
    };
    for(var key in this.headers){
      try{
        this.xhr.setRequestHeader(key,this.headers[key]);
      }
      catch(e){
      }
    }
    this.xhr.send(data);
    if(!this.async){
      this.onStateChange();
    }
    return this;
  },onStateChange:function(){
    if(this.xhr.readyState!=4||!this.running){
      return ;
    }
    this.running=false;
    this.status=0;
    try{
      this.status=this.xhr.status;
    }
    catch(e){
    }
    this.onComplete();
    if(this.isSuccess()){
      this._onSuccess();
    }else {
      this._onFailure();
    }
    this.xhr.onreadystatechange=Sigma.$empty;
  },isScript:function(){
    return (/(ecma|java)script/).test(this.getHeader("Content-type"));
  },isSuccess:function(){
    var status=this.xhr.status;
    return ((status>=200)&&(status<300));
  },_onSuccess:function(){
    this.response={"text":this.xhr.responseText,"xml":this.xhr.responseXML};
    this.onSuccess(this.response);
  },_onFailure:function(e){
    this.onFailure(this.xhr,e);
  },setHeader:function(name,value){
    this.headers[name]=value;
    return this;
  },getHeader:function(name){
    try{
      return this.xhr.getResponseHeader(name);
    }
    catch(e){
      return null;
    }
  },getXHR:function(){
    return (window.XMLHttpRequest)?new XMLHttpRequest():((window.ActiveXObject)?new ActiveXObject("Microsoft.XMLHTTP"):false);
  },cancel:function(){
    if(!this.running){
      return this;
    }
    this.running=false;
    this.xhr.abort();
    this.xhr.onreadystatechange=Sigma.$empty;
    this.xhr=this.getXHR();
    this.onCancel();
    return this;
  }});
Sigma.JSON={encode:function(obj,cP,format){
    var string;
    var br=format?"\n":"";
    switch(Sigma.$type(obj)){
    case "string":
      return '"'+obj.replace(/[\x00-\x1f\\"]/g,Sigma.JSON.$replaceChars)+'"';
    case "array":
      string=[];
      Sigma.$each(obj,function(item,idx){
        var json=Sigma.JSON.encode(item,cP,format);
        if(json||json===0){
          string.push(json);
        }
      });
      return "["+br+(format?string.join(","+br):string)+"]"+br;
    case "object":
      if(obj===null){
        return "null";
      }
      string=[];
      Sigma.$each(obj,function(value,key){
        if(!cP||key.indexOf(cP)!==0){
          var json=Sigma.JSON.encode(value,cP,format);
          if(json){
            string.push(Sigma.JSON.encode(key,cP,format)+":"+json);
          }
        }
      },null,cP);
      return "{"+br+(format?string.join(","+br):string)+br+"}"+br;
    case "number":
    case "boolean":
      return String(obj);
    }
    return null;
  },decode:function(string,secure){
    if(!Sigma.$type(string,"string")||!string.length){
      return null;
    }
    if(secure&&!(/^[,:{}\[\]0-9.\-+Eaeflnr-u \n\r\t]*$/).test(string.replace(/\\./g,"@").replace(/"[^"\\\n\r]*"/g,""))){
      return null;
    }
    return eval("("+string+")");
  },$specialChars:{"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},$replaceChars:function(chr){
    return Sigma.JSON.$specialChars[chr]||"\\u00"+Math.floor(chr.charCodeAt()/16).toString(16)+(chr.charCodeAt()%16).toString(16);
  }};
Sigma.Const.DataSet={KEY:"__gt_ds_key__",INDEX:"__gt_ds_index__",ROW_KEY:"__gt_row_key__",NOT_VAILD:"__gt_no_valid__",SN_FIELD:"__gt_sn__",SORT_VALUE:"__gt_sort_value__",SORT_S:"__gt_"};
Sigma.DataSetDefault={SEQUENCE:0,uniqueField:Sigma.Const.DataSet.SN_FIELD,recordType:"object",recordXpath:null,dataXML:null,currentBegin:0,cursor:0,startRecordNo:0,cacheData:false,cacheModifiedData:true,modified:false,properties:function(){
    return {fields:[],fieldsName:[],fieldsMap:{},fieldsInfo:{},data:null,dataProxy:[],dataProxyBak:null,additional:[],sortInfo:[],queryInfo:[],reocrdIndex:{},updatedRecords:{},updatedRecordsBak:{},updatedFields:{},insertedRecords:{},deletedRecords:{},onRecordInsert:Sigma.$empty,onRecordUpdate:Sigma.$empty};
  },initialize:function(options){
    Sigma.$extend(this,options);
    this.recordType=this.recordType||"object";
    this.fields&&this.setFields(this.fields);
    this.data&&this.setData(this.data);
    this.unfieldIdx=this.uniqueField;
  },initValues:Sigma.$empty,isEqualRecord:function(record1,record2){
    for(var index in this.fieldsInfo){
      if(record1[index]!==record2[index]){
        return false;
      }
    }
    return true;
  },clean:function(force){
    if(!this.cacheData||force===true){
      this.data=null;
      this.currentBegin=0;
      this.dataProxy=[];
    }
    this.cleanModifiedData();
  },cleanModifiedData:function(force){
    if(!this.cacheModifiedData||force){
      this.updatedRecords={};
      this.updatedRecordsBak={};
      this.updatedFields={};
      this.insertedRecords={};
      this.deletedRecords={};
    }
  },setData:function(data){
    if(!data){
      return false;
    }
    this.clean();
    return this.appendData(data);
  },setFields:function(fields){
    this.fields=fields;
    this.fieldsName=[];
    var initValueFuncs=null;
    for(var i=0,len=this.fields.length;i<len;i++){
      var f=this.fields[i]||{};
      if(Sigma.$type(f,"string")){
        f={name:f};
      }
      f.name=f.name||String(i);
      f.type=f.type||"string";
      f.index=f.index||(this.getRecordType()=="array"?i:f.name);
      if(f.initValue){
        initValueFuncs=initValueFuncs||{};
        initValueFuncs[f.index]=f.initValue;
      }
      this.fieldsMap[f.name]=f;
      this.fieldsInfo[f.index]=f;
      this.fieldsName[i]=f.name;
    }
    if(initValueFuncs){
      this.initValues=(function(vfs){
        return function(_record,rn,dataset){
          for(var idx in vfs){
            _record[idx]=vfs[idx](_record,rn,dataset);
          }
        };
      })(initValueFuncs);
    }else {
      this.initValues=Sigma.$empty;
    }
  },appendData:function(data){
    if(!data){
      return false;
    }
    this.data=this.data||[];
    var Me=this;
    var auk=Sigma.Const.DataSet.SN_FIELD;
    for(var i=0,len=data.length;i<len;i++){
      var record=data[i];
      record[auk]=record[auk]||this.SEQUENCE++;
      this.data.push(record);
      this.dataProxy.push(this.currentBegin++);
      this.initValues(record,i,this);
    }
    return true;
  },getDataProxySize:function(){
    return this.dataProxy.length;
  },resetDataProxy:function(size){
    this.dataProxy=[];
    size=size||this.getSize();
    for(var i=0;i<size;i++){
      this.dataProxy[i]=i;
    }
  },loadData:function(loader){
    if(loader){
      return this.setData(loader.load());
    }else {
    }
  },setRecordType:function(recordType){
    if(recordType&&this.recordType!=recordType){
      this.recordType=recordType;
      this.setFields(this.fields);
    }
  },getRecord:function(rn){
    return this.data?this.data[this.dataProxy[rn]]:null;
  },getDataRecord:function(i){
    return this.dataset.data[i];
  },setValueByName:function(record,fieldName,value){
    var index=this.fieldsMap[fieldName].index;
    if(Sigma.$type(record,"number")){
      record=this.getRecord(record);
    }
    record[index]=value;
  },getValueByName:function(record,fieldName){
    var index=this.fieldsMap[fieldName].index;
    if(Sigma.$type(record,"number")){
      record=this.getRecord(record);
    }
    return record[index];
  },getFields:function(){
  },getRecordType:function(recordType,_record){
    this.recordType=recordType||this.recordType;
    if(!Sigma.$type(this.recordType,"string")&&(this.data&&this.getSize()>0)){
      _record=this.data[0];
      if(Sigma.$type(_record,"array")){
        this.recordType="array";
      }else {
        this.recordType="object";
      }
    }
    return this.recordType;
  },filterCheck:{equal:function(v,cv){
      return v==cv;
    },notEqual:function(v,cv){
      return v!=cv;
    },less:function(v,cv){
      return v<cv;
    },great:function(v,cv){
      return v>cv;
    },lessEqual:function(v,cv){
      return v<=cv;
    },greatEqual:function(v,cv){
      return v>=cv;
    },like:function(v,cv){
      return (""+v).indexOf(cv+"")>=0;
    },startWith:function(v,cv){
      return (""+v).indexOf(cv+"")===0;
    },endWith:function(v,cv){
      v=v+"";
      cv=cv+"";
      return v.indexOf(cv)==v.length-cv.length;
    }},filterData:function(filterInfo){
    var Me=this;
    var dataProxy=[];
    filterInfo=[].concat(filterInfo);
    Sigma.$each(this.data,function(record,idx){
      var rs=true;
      for(var i=0,j=filterInfo.length;i<j;i++){
        var index=Me.fieldsMap[filterInfo[i].fieldName].index;
        var cv=filterInfo[i].value;
        var logic=filterInfo[i].logic;
        var v=record[index];
        rs=Me.filterCheck[logic](v,cv);
        if(!rs){
          break ;
        }
      }
      if(rs){
        dataProxy.push(idx);
      }else {
      }
    });
    return dataProxy;
  },insertRecord:function(record){
    var k=(this.SEQUENCE++);
    record[Sigma.Const.DataSet.SN_FIELD]=k;
    this.insertedRecords[k]=record;
    Sigma.$invoke(this,"onRecordInsert",[record]);
    this.modified=true;
  },updateRecord:function(record,fieldName,newValue){
    if(Sigma.$type(record,"number")){
      record=this.data[record];
    }
    var sn=record[Sigma.Const.DataSet.SN_FIELD];
    var uk=record[this.unfieldIdx];
    var type=this.fieldsMap[fieldName].type;
    var index=this.fieldsMap[fieldName].index;
    var upRecord;
    if(!this.insertedRecords[sn]){
      this.updatedRecordsBak[uk]=this.updatedRecordsBak[uk]||{};
      this.updatedRecordsBak[uk][index]=record[index];
      this.updatedRecordsBak[uk][this.unfieldIdx]=uk;
      this.updatedRecords[uk]=record;
    }
    if(this.insertedRecords[sn]||Sigma.$invoke(this,"onRecordUpdate",[record,fieldName,newValue])!==false){
      if(type=="int"){
        newValue=parseInt(newValue);
        newValue=isNaN(newValue)?"":newValue;
      }else {
        if(type=="float"){
          newValue=parseFloat(newValue);
          newValue=isNaN(newValue)?"":newValue;
        }else {
          newValue=Sigma.$chk(newValue)?String(newValue):"";
        }
      }
      this.updatedFields[uk]=this.updatedFields[uk]||{};
      this.updatedFields[uk][index]=newValue;
      this.updatedFields[uk][this.unfieldIdx]=uk;
      record[index]=newValue;
      this.modified=true;
    }
  },undeleteRecord:function(recordNoOrRecord){
    var recordNo=-1,record,recordIndex;
    if(Sigma.$type(recordNoOrRecord,"number")){
      recordNo=recordNoOrRecord;
      if(recordNo>=0){
        recordIndex=this.dataProxy[recordNo];
        record=this.data[recordIndex];
      }
    }else {
      if(recordNoOrRecord&&(Sigma.$type(recordNoOrRecord,"object")||Sigma.$type(recordNoOrRecord,"array"))){
        record=recordNoOrRecord;
      }
    }
    if(record){
      var sn=record[Sigma.Const.DataSet.SN_FIELD];
      var uk=record[this.unfieldIdx];
      this.deletedRecords[uk]=null;
      delete this.deletedRecords[uk];
    }
  },deleteRecord:function(recordNoOrRecord){
    var recordNo=-1,record,recordIndex;
    if(Sigma.$type(recordNoOrRecord,"number")){
      recordNo=recordNoOrRecord;
      if(recordNo>=0){
        recordIndex=this.dataProxy[recordNo];
        record=this.data[recordIndex];
      }
    }else {
      if(recordNoOrRecord&&(Sigma.$type(recordNoOrRecord,"object")||Sigma.$type(recordNoOrRecord,"array"))){
        record=recordNoOrRecord;
      }
    }
    if(record){
      var sn=record[Sigma.Const.DataSet.SN_FIELD];
      var uk=record[this.unfieldIdx];
      if(this.insertedRecords[sn]){
        delete this.insertedRecords[sn];
      }else {
        if(this.updatedRecords[uk]){
          delete this.updatedRecords[uk];
          delete this.updatedRecordsBak[uk];
        }
        this.deletedRecords[uk]=record;
        this.modified=true;
      }
    }
  },addUniqueKey:function(record){
  },isInsertedRecord:function(record){
    return record&&this.insertedRecords[record[Sigma.Const.DataSet.SN_FIELD]]==record;
  },isDeletedRecord:function(record){
    return record&&this.deletedRecords[record[this.unfieldIdx]]==record;
  },isUpdatedRecord:function(record){
    return record&&this.updatedRecords[record[this.unfieldIdx]]==record;
  },sortFunction:null,negative:function(func){
    return function(a,b){
      return 0-func(a,b);
    };
  },sort:function(sortInfo){
    var sortInfos=[].concat(sortInfo);
    var sortFuncs=[];
    for(var i=0;i<sortInfos.length;i++){
      var s=sortInfos[i];
      if(s){
        var field,type,fieldIndex;
        var isDefault=s.sortOrder.indexOf("def")===0;
        if(!s.sortOrder||isDefault){
          fieldIndex=Sigma.Const.DataSet.SN_FIELD;
          type="int";
        }else {
          field=this.fieldsMap[s.fieldName];
          if(field){
            fieldIndex=field.index;
            type=field.type;
          }
        }
        sortFuncs.push(!isDefault&&s.sortFn?s.sortFn:this.getSortFuns(fieldIndex,s.sortOrder,type,s.getSortValue));
      }
    }
    var Me=this;
    var len=sortFuncs.length;
    var multiSort=function(a,b){
      var r1=Me.data[a],r2=Me.data[b];
      for(var i=0;i<len;i++){
        var result=sortFuncs[i](r1,r2,sortInfos[i].sortOrder);
        if(result!==0){
          return result;
        }
      }
      return 0;
    };
    this.dataProxy.sort(multiSort);
  },getSortFuns:function(fieldIndex,sortOrder,type,getSortValue){
    var Me=this;
    var svKey=Sigma.Const.DataSet.SORT_VALUE;
    var svCac={};
    var compSort=this.sortFunction;
    if(!compSort){
      var getSortValueFn=getSortValue&&sortOrder.indexOf("def")!==0?function(r){
        var value=r[fieldIndex];
        var s=getSortValue(value,r);
        svCac[r[Sigma.Const.DataSet.SN_FIELD]]=s;
        return s;
      }:function(r){
        var value=r[fieldIndex];
        var s=Sigma.U.convert(value,type);
        svCac[r[Sigma.Const.DataSet.SN_FIELD]]=s;
        return s;
      };
      compSort=sortOrder=="desc"?function(r1,r2){
        var v1=svCac[r1]||getSortValueFn(r1);
        var v2=svCac[r2]||getSortValueFn(r2);
        return v1<v2?1:(v1>v2?-1:0);
      }:function(r1,r2){
        var v1=svCac[r1]||getSortValueFn(r1);
        var v2=svCac[r2]||getSortValueFn(r2);
        return v1<v2?-1:(v1>v2?1:0);
      };
    }
    return compSort;
  },query:function(field,filterFunc,outFilterRS,inFilterRS){
  },getSize:function(){
    return !this.data?-1:this.data.length;
  },getFieldsNum:function(){
    return this.fields.length;
  },sum:function(field){
  },avg:function(field){
  }};
Sigma.DataSet=Sigma.$class(Sigma.DataSetDefault);
if(!Sigma.Template){
  Sigma.Template={};
}
Sigma.$extend(Sigma.Template,{Grid:{main:function(grid){
      var gid=grid.id;
      var ghtml=[grid.toolbarPosition=="top"||grid.toolbarPosition=="t"?'<div id="'+gid+'_toolBarBox" class="gt-toolbar-box gt-toolbar-box-top" ></div>':"",'<div id="'+gid+'_viewport" class="gt-viewport'+(grid.simpleScrollbar?" gt-simple-scrollbar":"")+'" >','<div id="'+gid+'_headDiv" class="gt-head-div"><div class="gt-head-wrap" ></div>','<div id="'+gid+'_columnMoveS" class="gt-column-moveflag"></div>','<div id="'+gid+'_headerGhost" class="gt-head-ghost"></div>',"</div>",'<div id="'+gid+'_bodyDiv" class="gt-body-div"></div>','<div id="'+gid+'_freeze_headDiv" class="gt-freeze-div" ></div>','<div id="'+gid+'_freeze_bodyDiv" class="gt-freeze-div" ></div>',"</div>",grid.toolbarPosition=="bottom"||grid.toolbarPosition=="b"?'<div id="'+gid+'_toolBarBox" class="gt-toolbar-box" ></div>':"",'<div id="'+gid+'_separateLine" class="gt-split-line"></div>','<div id="'+gid+'_mask" class="gt-grid-mask" >','<div  id="'+gid+'_waiting" class="gt-grid-waiting">','<div class="gt-grid-waiting-icon"></div><div class="gt-grid-waiting-text">'+grid.getMsg("WAITING_MSG")+"</div>","</div>",'<div class="gt-grid-mask-bg">',"</div>","</div>"];
      return ghtml.join("\n");
    },formIFrame:function(grid){
      var gid=grid.id;
      var ghtml=['<div class="gt-hidden" >','<form id="'+gid+'_export_form" target="'+gid+'_export_iframe" style="width:0px;height:0px;margin:0px;padding:0xp" method="post" width="0" height="0" >','<input type="hidden" id="'+gid+'_export_filename" name="exportFileName"  value="" />','<input type="hidden" id="'+gid+'_export_exporttype" name="exportType" value="" />','<textarea id="'+gid+'_export_form_textarea" name="" style="width:0px;height:0px;display:none;" ></textarea>',"</form>",'<iframe id="'+gid+'_export_iframe"  name="'+gid+'_export_iframe" scrolling="no" style="width:0px;height:0px;" width="0" height="0" border="0" frameborder="0" >',"</iframe>","</div>"];
      return ghtml.join("\n");
    },createHeaderCell:function(grid,col,hidden){
      var cell=Sigma.$e("td",{className:col.styleClass,columnId:col.id});
      var header=col.hdRenderer(col.header,col,grid);
      col.title=col.title||col.header||"";
      header=(!header||Sigma.U.trim(header)==="")?"&#160;":header;
      if(hidden){
        cell.style.height="0px";
      }
      cell.innerHTML=['<div class="gt-inner'+(col.headAlign?" gt-inner-"+col.headAlign:"")+'" ',hidden?'style="padding-top:0px;padding-bottom:0px;height:1px;" ':"",'unselectable="on" title="'+col.title+'" >',"<span>",header,"</span>",hidden?"":Sigma.T_G.hdToolHTML,"</div>"].join("");
      return cell;
    },hdToolHTML:'<div class="gt-hd-tool" ><span class="gt-hd-icon"></span><span class="gt-hd-button"></span><span class="gt-hd-split"></span></div>',bodyTableStart:function(id,withTbody){
      return ["<table ",id?'id="'+id+'" ':"",'class="gt-table" cellspacing="0"  cellpadding="0" border="0" >',withTbody===false?"":"<tbody>"].join("");
    },tableStartHTML:'<table class="gt-table" style="margin-left:0px" cellspacing="0"  cellpadding="0" border="0" ><tbody>',tableEndHTML:"</tbody></table>",rowStart:function(grid,rowNo,rowId){
      return Sigma.T_G.rowStartS(grid,rowNo)+">\n";
    },rowStartS:function(grid,rowNo,rowAttribute){
      return ['<tr class="gt-row',(rowNo%2===0?grid.evenRowCss:""),'" ',Sigma.Const.DataSet.INDEX,'="',rowNo,'" ',rowAttribute].join("");
    },rowEndHTML:"</tr>\n",innerStart:function(col){
      return ['<div class="gt-inner '+(col.align?" gt-inner-"+col.align+" ":"")+"",'" >'].join("");
    },cellStartHTML:'<td ><div class="gt-inner" >',cellEndHTML:"</div></td>",cell:function(col,cellHTML,cellAttributes){
      return ["<td ",cellAttributes||col.cellAttributes,' class="'+col.styleClass+'" >',col.innerStartHTML,cellHTML,"</div></td>"].join("");
    },getColStyleClass:function(grid,colId){
      return (Sigma.Const.Grid.COL_T_CLASSNAME+grid.id+"-"+colId).toLowerCase();
    },freezeBodyCell:function(grid,columnWidth,text,isHead){
      var indexCellWidth=columnWidth+grid.cellWidthFix;
      var indexInnerWidth=columnWidth+grid.innerWidthFix;
      var divWidthStyle='style="width:'+indexInnerWidth+'px;"';
      text=text||"&#160;";
      var tdObj=Sigma.$e("td",{style:{width:indexCellWidth+"px"},innerHTML:'<div class="'+(isHead?"gt-hd-inner":"gt-inner")+'" '+divWidthStyle+">"+text+"</div>"});
      return tdObj;
    },freezeHeadCell:function(grid,columnWidth,text){
      return this.freezeBodyCell(grid,columnWidth,text,true);
    }},Dialog:{create:function(options){
      var id=options.domId;
      var gid=options.gridId;
      var hasCloseButton=Sigma.$chk(options.hasCloseButton)?options.hasCloseButton:true;
      var title=options.title||"Dialog";
      return ['<div class="gt-dialog-head" >','<div class="gt-dialog-head-icon">&#160;</div>','<div id="'+id+'_dialog_title"  class="gt-dialog-head-text" >'+title+"</div>",'<div class="gt-dialog-head-button"  >',hasCloseButton?'<a href="#" onclick="Sigma.$grid(\''+gid+"').closeDialog();return false;\">&#160;</a>":"","</div>",'</div><div id="'+id+'_dialog_body" class="gt-dialog-body"></div>'].join("");
    },filterCondSelect:['<select class="gt-input-select">','<option value="equal">=</option>','<option value="notEqual">!=</option>','<option value="less">&lt;</option>','<option value="great">></option>','<option value="lessEqual">&lt;=</option>','<option value="greatEqual" >>=</option>','<option value="like" >like</option>','<option value="startWith">startWith</option>','<option value="endWith">endWith</option>',"</select>"].join("")}});
Sigma.T_G=Sigma.Template.Grid;
Sigma.T_C=Sigma.Template.Column;
Sigma.T_D=Sigma.Template.Dialog;
if(!window.Sigma){
  window.Sigma={};
}
SIGMA_GRID_VER="Sigma-Grid 2.4";
Sigma.WidgetCache={};
Sigma.GridCache={};
Sigma.GridNum=0;
Sigma.activeGrid=null;
Sigma.$widget=function(wid){
  return Sigma.$type(wid,"string")?Sigma.WidgetCache[wid]:wid;
};
Sigma.$grid=function(grid){
  grid=grid||Sigma.Const.Grid.DEFAULT_ECG_ID;
  return Sigma.$type(grid,"string")?Sigma.GridCache[grid]:grid;
};
Sigma.destroyGrids=function(){
  Sigma.eachGrid(function(grid){
    try{
      grid.destroy();
    }
    catch(e){
    }
  });
};
Sigma.destroyWidgets=function(){
  for(var key in Sigma.WidgetCache){
    var widget=Sigma.WidgetCache[key];
    if(widget&&widget.destroy){
      try{
        widget.destroy();
      }
      catch(e){
      }
    }
  }
};
Sigma.eachGrid=function(fn){
  for(var key in Sigma.GridCache){
    var grid=Sigma.GridCache[key];
    fn(grid);
  }
};
Sigma.GridDefault={id:Sigma.Const.Grid.DEFAULT_ECG_ID,defaultColumnWidth:70,domList:["gridWaiting","separateLine","gridMask","gridGhost","gridFormTextarea","gridFormFileName","gridFormExportType","gridForm","gridIFrame","activeDialog","gridDialog","gridDialogTitle","gridDialogBody","gridFilterRSCache","titleBar","toolTipDiv","freezeHeadTable","freezeHeadDiv","freezeBodyDiv","freezeView","resizeButton","pageSizeSelect","pageStateBar","toolBar","toolBarBox","columnMoveS","headerGhost","headFirstRow","bodyFirstRow","headTable","headDiv","bodyDiv","gridDiv","viewport","container"],defaultConst:["action","recordType","exportType","exportFileName","exception","parameters","queryParameters","data","pageInfo","filterInfo","sortInfo","columnInfo","fieldsName","insertedRecords","updatedRecords","updatedFields","deletedRecords","success","succeedData","failedData","remotePaging","remoteSort","remoteFilter","remoteGroup"],language:"default",skin:"default",dataPageInfo:null,dataException:null,formid:null,isNative:false,loadURL:null,saveURL:null,exportURL:null,exportType:null,exportFileName:null,sortInfo:null,editable:true,resizable:false,allowCustomSkin:false,allowFreeze:false,allowHide:false,allowGroup:false,allowResizeColumn:true,simpleScrollbar:true,scrollbarClass:null,monitorResize:false,readOnly:false,stripeRows:true,lightOverRow:true,evenRowCss:"gt-row-even",clickStartEdit:true,remotePaging:true,remoteSort:false,remoteFilter:false,remoteGroup:false,autoLoad:true,submitColumnInfo:true,autoUpdateSortState:true,autoUpdateEditState:true,autoUpdateGroupState:true,autoUpdateFreezeState:true,autoSelectFirstRow:true,autoEditNext:false,submitUpdatedFields:false,autoSaveOnNav:false,reloadAfterSave:true,recountAfterSave:true,recount:false,showGridMenu:false,showEditTool:true,showAddTool:true,showDelTool:true,showSaveTool:true,showReloadTool:true,showPrintTool:true,showFilterTool:true,showChartTool:true,showPageState:true,showIndexColumn:false,renderHiddenColumn:true,transparentMask:false,justShowFiltered:true,toolbarPosition:"bottom",toolbarContent:"nav | goto | pagesize | reload | add del save | print | filter chart | state",width:"100%",height:"100%",minWidth:50,minHeight:50,dataRoot:"data",custom2Cookie:true,multiSort:false,multiGroup:false,multiSelect:true,selectRowByCheck:false,html2pdf:true,SigmaGridPath:"../../gt-grid",properties:function(){
    return {skinList:[{text:this.getMsg("STYLE_NAME_DEFAULT"),value:"default"},{text:this.getMsg("STYLE_NAME_PINK"),value:"pink"},{text:this.getMsg("STYLE_NAME_VISTA"),value:"vista"},{text:this.getMsg("STYLE_NAME_MAC"),value:"mac"},{text:this.getMsg("STYLE_NAME_JQUERYUI"),value:"jqueryui"}],encoding:null,mimeType:null,jsonParamName:null,title:null,lastAction:null,ajax:null,autoExpandColumn:null,autoColumnWidth:false,cellWidthPadding:Sigma.isBoxModel?0:4,cellHeightPadding:Sigma.isBoxModel?0:2,cellWidthFix:Sigma.isBoxModel?0:0,innerWidthFix:Sigma.isBoxModel?0:(Sigma.isIE8?-1:-4),freezeFixH:Sigma.isBoxModel?0:0,freezeFixW:Sigma.isIE?-1:-2,toolbarHeight:24,toolBarTopHeight:0,tableMarginLeft:0,freezeColumns:0,separateLineMinX:0,defaultRecord:null,isWaiting:false,isColumnResizing:false,requesting:false,hasGridDivTemp:false,resizeColumnId:-1,moveColumnDelay:800,mouseDown:false,footDiv:null,footTable:null,footFirstRow:null,freezeBodyTable:null,titleBar:null,nearPageBar:null,lastOverHdCell:null,toolTipDiv:null,gridTable:null,overRow:null,overRowF:null,activeCell:null,activeColumn:null,activeRow:null,activeRecord:null,activeEditor:null,activeDialog:null,scrollLeft:0,scrollTop:0,complatedTimes:0,onComplete:Sigma.$empty,onResize:Sigma.$empty,beforeRowSelect:Sigma.$empty,afterRowSelect:Sigma.$empty,onHeadClick:Sigma.$empty,onCellClick:Sigma.$empty,onCellDblClick:Sigma.$empty,onRowClick:Sigma.$empty,onRowDblClick:Sigma.$empty,beforeEdit:Sigma.$empty,afterEdit:Sigma.$empty,beforeRefresh:Sigma.$empty,beforeExport:Sigma.$empty,beforeSave:Sigma.$empty,beforeLoad:Sigma.$empty,loadResponseHandler:Sigma.$empty,saveResponseHandler:Sigma.$empty,beforeDestroy:Sigma.$empty,beforeDatasetUpdate:Sigma.$empty,onRecordUpdate:Sigma.$empty,beforeInsert:Sigma.$empty,afterInsert:Sigma.$empty,beforeUpdate:Sigma.$empty,afterUpdate:Sigma.$empty,beforeDelete:Sigma.$empty,afterDelete:Sigma.$empty,customRowAttribute:Sigma.$empty,onContextMenu:Sigma.$empty,afterColumnResize:Sigma.$empty,beforeColumnMove:Sigma.$empty,onKeyDown:Sigma.$empty,onMouseMove:Sigma.$empty,onMouseOut:Sigma.$empty,onMouseOver:Sigma.$empty,onRowCheck:Sigma.$empty,editing:false,rendered:false,isFirstLoad:true,customPrintCss:null,gridTbodyList:[],gridRowList:[],gridFreezeRowList:[],checkedRows:{},rowBegin:0,rowNum:0,rowEnd:0,currentRowNum:0,filterDataProxy:null,dataProxyBak:null,cacheData:[],dataset:null,selectedRows:[],cacheBodyList:[],frozenColumnList:[],sortedColumnList:[],countTotal:true,pageSizeList:[],tools:{},toolCreator:{},columns:[],columnList:[],columnMap:{},CONST:null,queryParameters:{},parameters:{}};
  },activeMe:function(){
    Sigma.activeGrid=this;
  },clearCheckedRows:function(refresh){
    this.checkedRows={};
    if(refresh){
      this.refresh();
    }
  },initialize:function(id,options){
    Sigma.GridNum++;
    var _const={};
    var grid=this;
    Sigma.$each(this.domList,function(k,i){
      grid[k]=null;
    });
    Sigma.$each(this.defaultConst,function(k,i){
      _const[k]=k;
    });
    this.id=""+id;
    options=options||{};
    if(Sigma.$type(id,"object")){
      options=id;
      this.id="gtgrid_"+Sigma.GridNum;
    }
    Sigma.$extend(_const,options.CONST);
    this.CONST=_const;
    Sigma.$extend(this,options);
    this.gridId=this.id;
    this.rowKey="__gt_"+this.id+"_r_";
    Sigma.GridCache[this.id]=this;
    this.legacy();
    if(!this.dataset&&this.columns){
      var _dataset={fields:[]};
      for(var ci=0;ci<this.columns.length;ci++){
        var col=this.columns[ci];
        var field={name:col.name||col.fieldName||col.id,type:col.type,index:(col.fieldIndex||col.fieldIndex===0)?col.fieldIndex:null};
        _dataset.fields.push(field);
      }
      this.dataset=_dataset;
    }
    if(this.dataset&&!(this.dataset instanceof Sigma.DataSet)){
      this.dataset.recordType=this.dataset.recordType||this.recordType;
      this.dataset=new Sigma.DataSet(this.dataset);
    }
    this.loadURL=this.loadURL||this.dataset.loadURL;
    this.saveURL=this.saveURL||this.dataset.saveURL;
    this.evenRowCss=" "+this.evenRowCss;
    this.toolbarContent=this.toolbarContent===false?false:this.toolbarContent;
    if(this.toolCreator){
      for(var key in this.toolCreator){
        Sigma.ToolFactroy.register(key,this.toolCreator[key]);
      }
    }
    var pageInfo=options.pageInfo||(this.dataset?this.dataset.pageInfo:null)||{};
    pageInfo.pageSize=pageInfo.pageSize||options.pageSize||0;
    if(pageInfo.pageSize===0){
      delete pageInfo.pageSize;
    }
    delete options.pageInfo;
    delete options.pageSize;
    delete this.pageInfo;
    delete this.pageSize;
    this.navigator=new Sigma.Navigator({gridId:this.id,pageInfo:pageInfo});
  },legacy:function(){
    var grid=this;
    grid.beforeRowSelect=grid.beforeRowSelect||grid.beforeSelectRow;
    grid.afterRowSelect=grid.afterRowSelect||grid.afterSelectRow;
    grid.onCellClick=grid.onCellClick||grid.onClickCell;
    grid.onRowClick=grid.onRowClick||grid.onClickRow;
    grid.onCellDblClick=grid.onCellDblClick||grid.onDblClickCell;
    grid.onRowDblClick=grid.onRowDblClick||grid.onDblClickRow;
  },initColumns:function(colsOptions){
    this.columns=colsOptions||this.columns;
    if(!this.columns){
      return ;
    }
    this.gridEditorCache=this.gridEditorCache||Sigma.$e("div",{className:"gt-editor-cache"});
    var colNum=this.columns.length;
    var tableColumnIndex=0;
    var hasNewRecord=true;
    var _defaultRecord={};
    function _render(value,record,columnObj,grid,colNo,rowNo){
      return this.editor.getDisplayValue(value);
    }
    for(var i=0;i<colNum;i++){
      var col=this.columns[i];
      col.grid=this;
      col.gridId=this.id;
      if(col.isCheckColumn){
        col=Sigma.Grid.createCheckColumn(this,col);
      }
      var colObj=new Sigma.Column(col);
      this.columnMap[colObj.id]=colObj;
      this.columnList.push(colObj);
      colObj.colIndex=i;
      this.checkColumn=colObj.isCheckColumn?colObj:this.checkColumn;
      if(colObj.frozen){
        this.frozenColumnList.push(colObj.id);
      }
      var field=this.dataset.fieldsMap[colObj.fieldName];
      if(field){
        colObj.fieldIndex=field.index;
      }
      if(colObj.editable!==true&&colObj.editable!==false){
        colObj.editable=this.editable;
      }
      colObj.editor=Sigma.Editor?Sigma.Editor.factroy(colObj.editor,this):null;
      if(colObj.editor&&colObj.editor.getDom()){
        this.gridEditorCache.appendChild(colObj.editor.getDom());
      }
      if(colObj.renderer=="by editor"&&colObj.editor){
        colObj.renderer=_render;
      }else {
        if(Sigma.$type(colObj.renderer,"string")){
          colObj.renderer=Sigma.U.parseExpression(colObj.renderer,"record","value,record,col,grid,colNo,rowNo");
        }
      }
      _defaultRecord[colObj.fieldIndex]=colObj.newValue||"";
      colObj.styleClass=Sigma.T_G.getColStyleClass(this,colObj.id);
      colObj.innerStyleClass=colObj.styleClass+" .gt-inner";
      colObj.minWidth=colObj.minWidth+this.cellWidthFix;
      colObj.innerStartHTML=Sigma.T_G.innerStart(colObj);
      if(colObj.sortOrder){
        this.addSortInfo(this.createSortInfo(colObj));
      }
      if(colObj.separator){
        colObj.separator.gridId=colObj.gridId;
      }
      if(colObj.hidden){
      }
    }
    this.defaultRecord=this.defaultRecord||_defaultRecord;
    return this;
  },getMsg:function(v){
    var msg=Sigma.Msg.Grid[this.language][v];
    return msg;
  },_onComplete:function(){
    if(this.autoSelectFirstRow&&!this.selectRowByCheck){
      this.selectFirstRow();
    }
    this.toggleEmptyRow();
    Sigma.$invoke(this,"onComplete",[this]);
    this.hideWaiting();
    this.complatedTimes++;
  },getEl:function(){
    return this.gridDiv;
  },initHead:function(){
    var grid=this;
    this.headDivHeight=this.headDiv.clientHeight;
    if(this.customHead){
      this.headDiv.style.height=this.headDivHeight-2+"px";
      Sigma.$thread(function(){
        grid.headDiv.scrollTop=2;
      });
      this.headDivHeight-=2;
    }
    this.freezeHeadDiv.style.height=this.headDivHeight+"px";
    this.freezeHeadDiv.style.top=0+this.freezeFixH+"px";
    this.freezeBodyDiv.style.top=this.headDivHeight+this.freezeFixH+0+"px";
  },initCSS:function(){
    var _hidden="display:none;";
    Sigma.Const.Grid.SCROLLBAR_WIDTH=20;
    var grid=this;
    grid.evenRowCss=grid.stripeRows?grid.evenRowCss:"";
    var cssText=[];
    Sigma.$each(this.columnList,function(col,i){
      col.width=col.width||grid.defaultColumnWidth;
      var cWidth=""+col.width;
      if(cWidth.indexOf("px")<1&&cWidth.indexOf("%")<1){
        cWidth=parseInt(cWidth);
      }else {
        if(cWidth.indexOf("%")>0){
        }else {
        }
      }
      cssText[i]=[col.CLASS_PREFIX+col.styleClass+" { width:"+(cWidth+grid.cellWidthFix)+"px;"+(col.hidden?_hidden:"")+" } ",col.CLASS_PREFIX+col.innerStyleClass+" { width:"+(cWidth+grid.innerWidthFix)+"px; } "].join("\n");
    });
    Sigma.U.CSS.createStyleSheet(cssText.join("\n"));
  },createMain:function(){
    var grid=this;
    this.pageStateBar=Sigma.$(this.pageStateBar);
    if(this.isNative){
      this.gridDiv=Sigma.$(this.id+"_div");
    }else {
      var classNames=[(Sigma.isBoxModel?"gt-b-ie ":(Sigma.isSafari?"gt-b-safari ":(Sigma.isOpera?"gt-b-opera ":(Sigma.isStrict?"gt-b-strict":"")))),"gt-grid","gt-skin-"+this.skin,"ui-widget ui-widget-content ui-corner-all"];
      this.gridDiv=Sigma.$e("div",{id:this.id+"_div",className:classNames.join(" ")});
      this.container=Sigma.$(this.container);
      if(!this.container||!this.container.appendChild||!this.container.tagName||Sigma.U.getTagName(this.container)=="BODY"){
        Sigma.doc.body.appendChild(this.gridDiv);
      }else {
        if(this.replaceContainer===true){
          this.container.parentNode.insertBefore(this.gridDiv,this.container);
          Sigma.U.removeNode(this.container);
          this.container=null;
        }else {
          this.container.appendChild(this.gridDiv);
        }
      }
      this.gridDiv.innerHTML=Sigma.T_G.main(this);
    }
    this.gridDiv.hideFocus=true;
    this.gridMask=Sigma.$byId(this.id+"_mask");
    this.gridWaiting=Sigma.$(this.id+"_waiting");
    this.gridDialog=Sigma.$(this.id+"_dialog");
    this.gridDialogTitle=Sigma.$(this.id+"_dialog_title");
    this.gridDialogBody=Sigma.$(this.id+"_dialog_body");
    this.gridDiv.appendChild(this.gridEditorCache);
    this.gridFilterRSCache=this.gridFilterRSCache||Sigma.$e("table",{className:"gt-filter-rs-cache"});
    this.gridDiv.appendChild(this.gridFilterRSCache);
    this.showMask();
    this.viewport=Sigma.$(this.id+"_viewport");
    this.toolBarBox=Sigma.$(this.id+"_toolBarBox");
    this.headDiv=Sigma.$(this.id+"_headDiv");
    this.bodyDiv=Sigma.$(this.id+"_bodyDiv");
    this.freezeView=Sigma.$(this.id+"_freezeView");
    this.freezeHeadDiv=Sigma.$(this.id+"_freeze_headDiv");
    this.freezeBodyDiv=Sigma.$(this.id+"_freeze_bodyDiv");
    this.createHeader();
    this.separateLine=Sigma.$(this.id+"_separateLine");
    this.toolBarTopHeight=this.toolbarPosition=="top"||this.toolbarPosition=="t"?this.toolbarHeight+(Sigma.isBoxModel?0:1):0;
    if(this.separateLine){
      this.separateLine.style.top=this.toolBarTopHeight+"px";
    }
    this.columnMoveS=Sigma.$(this.id+"_columnMoveS");
    this.headerGhost=Sigma.$(this.id+"_headerGhost");
    if(this.toolBarBox){
      this.toolBar=Sigma.$e("div",{id:this.id+"_toolBar",className:"gt-toolbar"});
      this.toolBarBox.appendChild(this.toolBar);
    }
    var newWidth=""+this.width;
    var newHeight=""+this.height;
    this.setDimension(newWidth,newHeight,true);
    this.showWaiting();
    this.syncLeftTop();
  },syncLeftTop:function(){
    this.left=Sigma.U.getPosLeftTop(this.gridDiv);
    this.top=this.left[1];
    this.left=this.left[0];
    this.viewportXY=Sigma.U.getXY(this.viewport);
  },_onResize:function(isInit){
    this.gridMask.style.width=this.width;
    this.gridMask.style.height=this.height;
    this.gridDiv.style.width=this.width;
    this.gridDiv.style.height=this.height;
    var gHeight=(""+this.height).indexOf("%")>0?this.gridDiv.clientHeight:parseInt(this.height);
    var _fix=0-(Sigma.isBoxModel?2:3);
    this.bodyDiv.style.height=gHeight-(this.headDivHeight+this.toolbarHeight)+_fix+"px";
    if(Sigma.isOpera){
      var _w=this.gridDiv.clientWidth+_fix+"px";
      this.viewport.style.width=_w;
      if(this.toolBarBox){
        this.toolBarBox.style.width=_w;
      }
    }
    if(this.freezeBodyDiv){
      this.freezeBodyDiv.style.height=this.bodyDiv.clientHeight+"px";
    }
    if(isInit!==true){
      this.onResize();
    }
  },createFormIFrame:function(){
    Sigma.U.createElementFromHTML(Sigma.T_G.formIFrame(this),Sigma.doc.body);
    this.gridForm=Sigma.$(this.id+"_export_form");
    this.gridFormTextarea=Sigma.$(this.id+"_export_form_textarea");
    this.gridFormFileName=Sigma.$(this.id+"_export_filename");
    this.gridFormExportType=Sigma.$(this.id+"_export_exporttype");
    this.gridIFrame=Sigma.$(this.id+"_export_iframe");
  },createGridGhost:function(){
    this.gridGhost=Sigma.$e("div",{id:this.id+"_gridGhost",className:"gt-grid-ghost-rect"});
    this.gridGhost.style.top=this.top+"px";
    this.gridGhost.style.left=this.left+"px";
    this.gridGhost.style.width=this.gridMask.style.width;
    this.gridGhost.style.height=this.gridMask.style.height;
    Sigma.doc.body.appendChild(this.gridGhost);
  },orphanTr:function(){
    if(!this.renderHiddenColumn){
      var tr=Sigma.doc.createElement("tr");
      tr.className="gt-orphan-tr";
      return tr;
    }
  }(),kickHeader:function(){
    var grid=this;
    var headRow=grid.headTbody.rows[0];
    if(!this.renderHiddenColumn&&headRow){
      Sigma.$each(this.columnList,function(col,idx){
        var orp=col.headCell&&col.headCell.parentNode==grid.orphanTr;
        if(col.hidden&&orp){
          grid.orphanTr.appendChild(col.headCell);
        }else {
          if(orp){
            var cell=headRow.cell[idx];
            if(cell){
              headRow.insertBefore(col.headCell,cell);
            }
          }
        }
      },this);
    }
  },createHeader:function(){
    var grid=this,headRow;
    if(this.customHead){
      this.renderHiddenColumn=true;
      Sigma.U.removeNode(this.orphanTr);
      this.orphanTr=null;
      this.createCustomHeader();
    }else {
      this.headTable=Sigma.$e("table",{id:this.id+"_headTable",className:"gt-head-table",cellSpacing:"0",cellPadding:"0",border:"0"});
      this.headTbody=Sigma.$e("tbody");
      this.headTable.appendChild(this.headTbody);
      headRow=Sigma.$e("tr",{className:"gt-hd-row"});
      this.headTbody.appendChild(headRow);
      Sigma.$each(this.columnList,function(col,idx){
        var cell=Sigma.T_G.createHeaderCell(grid,col);
        headRow.appendChild(cell);
        col.headCell=cell;
        Sigma.Grid.initColumnEvent(grid,col);
      },this);
      this.kickHeader();
    }
    this.headTable.style.marginRight=100+"px";
    var tagName=this.headDiv.firstChild?String(Sigma.U.getTagName(this.headDiv.firstChild)):null;
    if(tagName=="DIV"||tagName=="SPAN"){
      this.headDiv.firstChild.appendChild(this.headTable);
    }else {
      this.headDiv.appendChild(this.headTable);
    }
    this.headFirstRow=this.headTbody.rows[0];
    this.freezeHeadTable=Sigma.$e("table",{id:this.headTable.id+"_freeze",className:"gt-head-table",cellSpacing:"0",cellPadding:"0",border:"0"});
    this.freezeHeadTable.appendChild(Sigma.$e("tbody"));
    this.freezeHeadTable.style.height="100%";
    this.freezeHeadDiv.appendChild(this.freezeHeadTable);
    this.initHead();
  },createBody:function(){
    var htmlTable=Sigma.$(this.id+"_bodyTable");
    if(htmlTable){
      this.gridTable=htmlTable;
      this.gridTbodyList.push(htmlTable.tBodies[0]);
      this.bodyFirstRow=this.getFirstRow();
    }else {
      this.gotoPage();
    }
  },createCustomHeader:function(){
    var grid=this,headRow;
    if(Sigma.$type(this.customHead,"string")){
      if(this.customHead.indexOf("<table")===0){
        Sigma.U.orphanDiv.innerHTML=this.customHead;
        this.customHead=Sigma.U.orphanDiv.firstChild;
      }else {
        this.customHead=Sigma.$(this.customHead);
      }
    }
    this.customHead.style.display="";
    this.headTable=Sigma.$e(this.customHead,{id:this.id+"_headTable",className:"gt-head-table",cellSpacing:"0",cellPadding:"0",border:"0"});
    this.headTbody=this.headTable.tBodies[0];
    for(var i=0;i<this.headTbody.rows.length;i++){
      var row=this.headTbody.rows[i];
      row.className="gt-hd-row";
      for(var j=0;j<row.cells.length;j++){
        var cell=row.cells[j];
        var header=cell.innerHTML;
        var columnId=cell.getAttribute("columnId");
        if(columnId){
          cell.columnId=columnId;
          var col=this.columnMap[columnId];
          if(String(cell.getAttribute("resizable")).toLowerCase()=="false"){
            col.resizable=false;
          }
          if(String(cell.getAttribute("sortable")).toLowerCase()=="false"){
            col.sortable=false;
          }
          if(cell.colSpan<2){
            cell.className=col.styleClass;
          }
          col.headCell=cell;
        }
        cell.innerHTML=['<div class="gt-inner',cell.rowSpan<2?"":" gt-inner-tall2",'" unselectable="on" >',"<span>",header,"</span>",columnId?Sigma.T_G.hdToolHTML:"","</div>"].join("");
      }
    }
    headRow=Sigma.$e("tr",{className:"gt-hd-row"+(this.customHead?" gt-hd-hidden":"")});
    Sigma.$each(this.columnList,function(col,idx){
      var cell=Sigma.T_G.createHeaderCell(grid,col,true);
      headRow.appendChild(cell);
      Sigma.Grid.initColumnEvent(grid,col);
    });
    this.headTbody.insertBefore(headRow,this.headTbody.rows[0]);
  },scrollGrid:function(x,y){
    var mL=this.tableMarginLeft;
    var fW=this.freezeBodyDiv.clientWidth;
    var acLeft=this.activeCell.offsetLeft+((Sigma.isFF2||Sigma.isFF1)?0:mL);
    var acRight=acLeft+this.activeCell.offsetWidth;
    var acTop=this.activeCell.offsetTop;
    var acBottom=acTop+this.activeCell.offsetHeight;
    var bdLeft=this.bodyDiv.scrollLeft;
    var bdTop=this.bodyDiv.scrollTop;
    var bdRight=bdLeft+this.bodyDiv.clientWidth+mL;
    var bdBottom=bdTop+this.bodyDiv.clientHeight;
    if(Sigma.$chk(x)){
      this.bodyDiv.scrollLeft=x;
    }else {
      if(acLeft<=bdLeft+fW){
        this.bodyDiv.scrollLeft=acLeft-fW-(fW>0?1:0);
      }else {
        if(acRight>=bdRight){
          this.bodyDiv.scrollLeft=bdLeft+acRight-bdRight+mL;
        }
      }
    }
    if(Sigma.$chk(y)){
      this.bodyDiv.scrollTop=y;
    }else {
      if(acTop<=bdTop){
        this.bodyDiv.scrollTop=acTop;
      }else {
        if(acBottom>=bdBottom){
          this.bodyDiv.scrollTop=bdTop+acBottom-bdBottom;
        }
      }
    }
  },syncActiveObj:function(cell){
    this.activeCell=cell=(cell||this.activeCell);
    this.activeRow=cell?cell.parentNode:null;
    this.activeColumn=this.getColumn(cell);
    this.activeEditor=this.activeColumn?this.activeColumn.editor:null;
    this.activeRecord=this.getRecordByRow(this.activeRow);
  },_prveEditableCell:function(currentCell){
    var newCell=Sigma.U.prevElement(currentCell);
    while(newCell&&newCell.offsetWidth<1){
      newCell=Sigma.U.prevElement(newCell);
    }
    if(!newCell){
      newCell=Sigma.U.prevElement(currentCell.parentNode);
      if(newCell){
        newCell=newCell.cells[newCell.cells.length-1];
      }
    }
    while(newCell&&newCell.offsetWidth<1){
      newCell=Sigma.U.prevElement(newCell);
    }
    return newCell;
  },_nextEditableCell:function(currentCell){
    var newCell=Sigma.U.nextElement(currentCell);
    while(newCell&&newCell.offsetWidth<1){
      newCell=Sigma.U.nextElement(newCell);
    }
    if(!newCell){
      newCell=Sigma.U.nextElement(currentCell.parentNode);
      if(newCell){
        newCell=newCell.cells[0];
      }
    }
    while(newCell&&newCell.offsetWidth<1){
      newCell=Sigma.U.nextElement(newCell);
    }
    return newCell;
  },_onKeydown:function(event){
    var oldCell=this.activeCell;
    var newCell=null;
    var kcode=event.keyCode;
    var grid=this;
    function editCell(_cell){
      if(_cell){
        grid.endEdit();
        Sigma.U.stopEvent(event);
        Sigma.Grid.handleOverRowCore(event,grid,_cell.parentNode);
        grid.initActiveObj_startEdit(event,_cell);
      }
    }
    if(kcode==Sigma.Const.Key.ESC){
      if(this.endEdit()===false){
        return ;
      }else {
        Sigma.U.stopEvent(event);
      }
    }else {
      if(kcode==Sigma.Const.Key.ENTER){
        var et=Sigma.U.getEventTarget(event);
        if(this.editing&&Sigma.U.getTagName(et)=="TEXTAREA"){
          return ;
        }
        Sigma.U.stopEvent(event);
        if(this.editing){
          if(!this.autoEditNext){
            this.endEdit();
            return ;
          }
          newCell=this._nextEditableCell(oldCell);
          editCell(newCell);
        }else {
          this.syncActiveObj(newCell);
          this.startEdit();
        }
      }else {
        if(this.editing&&kcode==Sigma.Const.Key.TAB&&event.shiftKey){
          newCell=this._prveEditableCell(oldCell);
          editCell(newCell);
        }else {
          if(this.editing&&kcode==Sigma.Const.Key.TAB){
            newCell=this._nextEditableCell(oldCell);
            editCell(newCell);
          }else {
            if(oldCell&&!this.editing){
              switch(kcode){
              case Sigma.Const.Key.LEFT:
              case Sigma.Const.Key.TAB:
                if(kcode==Sigma.Const.Key.LEFT||event.shiftKey){
                  newCell=this._prveEditableCell(oldCell);
                  while(this.isGroupRow(newCell)){
                    newCell=this._prveEditableCell(newCell);
                  }
                  break ;
                }
              case Sigma.Const.Key.RIGHT:
                newCell=this._nextEditableCell(oldCell);
                while(this.isGroupRow(newCell)){
                  newCell=this._nextEditableCell(newCell);
                }
                break ;
              case Sigma.Const.Key.DOWN:
                newCell=Sigma.U.nextElement(oldCell.parentNode);
                while(this.isGroupRow(null,newCell)){
                  newCell=Sigma.U.nextElement(newCell);
                }
                if(newCell){
                  newCell=newCell.cells[Sigma.U.getCellIndex(oldCell)];
                }
                break ;
              case Sigma.Const.Key.UP:
                newCell=Sigma.U.prevElement(oldCell.parentNode);
                while(this.isGroupRow(null,newCell)){
                  newCell=Sigma.U.prevElement(newCell);
                }
                if(newCell){
                  newCell=newCell.cells[Sigma.U.getCellIndex(oldCell)];
                }
                break ;
              }
              if(newCell){
                Sigma.U.stopEvent(event);
                var or=oldCell.parentNode,nr=newCell.parentNode;
                this._onRowSelect(nr,event);
                Sigma.Grid.handleOverRowCore(event,this,nr);
                this.initActiveObj(event,newCell);
              }
            }
          }
        }
      }
    }
  },startEdit:function(){
    if(!this.readOnly&&this.activeCell&&this.activeEditor&&(this.activeColumn.editable||this.isInsertRow(this.activeRow))&&Sigma.$invoke(this.activeColumn,"beforeEdit",[this.activeValue,this.activeRecord,this.activeColumn,this])!==false&&Sigma.$invoke(this,"beforeEdit",[this.activeValue,this.activeRecord,this.activeColumn,this])!==false&&!this.isDelRow(this.activeRow)){
      this.editing=true;
      this.showEditor(this.activeValue,this.activeRecord);
    }
  },showEditor:function(value,record){
    var cell=this.activeCell,bodydiv=this.bodyDiv;
    var leftFix=this.tableMarginLeft;
    if(this.activeColumn.frozen){
      cell=this.getTwinCells(this.activeCell)[1];
      bodydiv=this.freezeBodyDiv;
      leftFix=0;
    }
    if(this.activeEditor&&this.activeEditor instanceof Sigma.Dialog){
    }else {
      bodydiv.appendChild(this.activeEditor.getDom());
    }
    this.activeEditor.show();
    this.activeEditor.setValue(value,record);
    if(this.activeEditor!==this.activeDialog){
      this.activeEditor.setPosition(((Sigma.isFF2||Sigma.isFF1)?0:leftFix)+cell.offsetLeft,cell.offsetTop);
      this.activeEditor.setSize(cell.offsetWidth,cell.offsetHeight);
    }
    this.activeEditor.active();
  },validValue:function(colObj,value,record,cell){
    if(colObj.editor){
      var validResult=colObj.editor.doValid(value,record,colObj,this);
      if(validResult!==true){
        this.showValidResult(value,validResult,cell,colObj);
      }
      return validResult;
    }
    return true;
  },hideEditor:function(){
    if(this.editing){
      var row=this.activeRow;
      var oldValue=this.activeValue;
      var value=this.activeEditor.parseValue(this.activeEditor.getValue());
      var validResult=this.validValue(this.activeColumn,value,this.activeRecord,this.activeCell);
      if(validResult===true&&String(this.activeValue)!==String(value)){
        this.updateRecordField(this.activeCell,value);
        this.refreshRow(row,this.activeRecord);
        this.dirty(this.activeCell);
        this.activeValue=value;
      }
      Sigma.$invoke(this.activeColumn,"afterEdit",[value,oldValue,this.activeRecord,this.activeColumn,this]);
      Sigma.$invoke(this,"afterEdit",[value,oldValue,this.activeRecord,this.activeColumn,this]);
    }
    if(this.activeEditor&&this.activeEditor instanceof Sigma.Dialog){
    }else {
      this.gridEditorCache.appendChild(this.activeEditor.getDom());
    }
    this.activeEditor.hide();
  },showValidResult:function(value,validResult,cell,colObj){
    var cells=this.getTwinCells(cell);
    Sigma.U.addClass(cells[0],"gt-cell-vaildfailed");
    Sigma.U.addClass(cells[1],"gt-cell-vaildfailed");
    validResult=[].concat(validResult);
    alert(validResult.join("\n")+"\n\n"+value);
    Sigma.$thread(function(){
      Sigma.U.removeClass(cells[0],"gt-cell-vaildfailed");
      Sigma.U.removeClass(cells[1],"gt-cell-vaildfailed");
    },1500);
  },getTwinRows:function(row){
    var row1=row,rowNo=row.rowIndex;
    var tbody=!row1.id?this.gridTbodyList[0]:this.freezeBodyTable.tBodies[0];
    var row2=tbody?tbody.rows[rowNo]:null;
    if(!row2&&tbody&&tbody.parentNode.tFoot){
      row2=tbody.parentNode.tFoot.rows[rowNo-tbody.rows.length];
    }
    return row1.id?[row1,row2,rowNo]:[row2,row1,rowNo];
  },getTwinCells:function(cell,rows){
    var cell1=cell,colNo=Sigma.U.getCellIndex(cell),cell2=null,colNo2=0;
    var row=cell.parentNode;
    rows=rows||this.getTwinRows(row);
    if(rows[1]==row){
      colNo2=colNo-(this.showIndexColumn?1:1);
      return [rows[0]?rows[0].cells[colNo2]:null,cell,colNo];
    }
    colNo2=colNo+(this.showIndexColumn?1:1);
    return [cell,rows[1]?rows[1].cells[colNo2]:null,colNo];
  },syncTwinRowCell:function(row,cell){
    if(!row&&!cell){
      return ;
    }
    row=row||cell.parentNode;
    var rows=this.getTwinRows(row);
    var rowF=rows[1];
    row=rows[0];
    if(rowF&&row){
      rowF.className=row.className;
      Sigma.U.removeClass(rowF,"gt-row-over");
    }
    if(cell){
      var cells=this.getTwinCells(cell,rows);
      var cellF=cells[1];
      cell=cells[0];
      if(cellF&&cell){
        cellF.className=cell.className;
        if(cellF.getElementsByTagName("input")[0]){
          cell.innerHTML=cellF.innerHTML;
        }else {
          cellF.innerHTML=cell.innerHTML;
        }
      }
    }
  },initActiveObj:function(event,newActiveCell){
    newActiveCell=newActiveCell||Sigma.U.getParentByTagName("td",null,event);
    return this.focusCell(newActiveCell);
  },initActiveObj_startEdit:function(event,newCell,dbl){
    if(this.rowNum<1){
      return ;
    }
    var p_activeCell=this.activeCell;
    this.initActiveObj(event,newCell);
    if(this.activeEditor&&(this.clickStartEdit||p_activeCell&&p_activeCell==this.activeCell)){
      Sigma.U.stopEvent(event);
      this.syncActiveObj(newCell);
      this.startEdit();
    }
  },getLastSelectRow:function(){
    return this.selectedRows[this.selectedRows.length-1];
  },_onCellSelect:function(ets){
    Sigma.$invoke(this,"onCellSelect",[this.activeValue,this.activeRecord,ets.cell,ets.row,ets.colNo,ets.rowNo,ets.column,this]);
  },_onRowSelect:function(row,event){
    if(!row||Sigma.U.hasClass(row.cells[0],"gt-nodata-cell")){
      return ;
    }
    if(this.multiSelect&&event.shiftKey){
      var lastRow=this.getLastSelectRow();
      if(lastRow&&lastRow.parentNode==row.parentNode){
        this.unselectAllRow();
        var sibling=lastRow.rowIndex>row.rowIndex?"prevElement":"nextElement";
        while(lastRow&&lastRow!=row){
          this.selectRow(lastRow,true);
          lastRow=Sigma.U[sibling](lastRow);
        }
        this.selectRow(row,true);
        return row;
      }
    }
    var multi=event.ctrlKey;
    if(Sigma.Grid.isSelectedRow(row)){
      if(this.multiSelect&&multi!==true&&this.selectedRows.length>1){
        this.unselectAllRow();
        this.selectRow(row,true);
      }else {
        if(multi){
          this.selectRow(row,false);
        }
      }
    }else {
      if(!this.multiSelect||multi!==true){
        this.unselectAllRow();
      }
      this.selectRow(row,true);
    }
    return row;
  },_onCellClick:function(event,cell,ets){
    Sigma.$invoke(this,"onCellClick",[ets.value,ets.record,ets.cell,ets.row,ets.colNo,ets.rowNo,ets.column,this,event]);
  },_onCellDblClick:function(event,cell,ets){
    Sigma.$invoke(this,"onCellDblClick",[ets.value,ets.record,ets.cell,ets.row,ets.colNo,ets.rowNo,ets.column,this,event]);
  },_onRowClick:function(event,row,ets){
    Sigma.$invoke(this,"onRowClick",[ets.value,ets.record,ets.cell,ets.row,ets.colNo,ets.rowNo,ets.column,this,event]);
  },_onRowDblClick:function(event,row,ets){
    Sigma.$invoke(this,"onRowDblClick",[ets.value,ets.record,ets.cell,ets.row,ets.colNo,ets.rowNo,ets.column,this,event]);
  },_onBodyClick:function(event,dbl,bodyEl,ets){
    this.endEdit();
    this.activeMe();
    var cell=ets.cell,row;
    if(!cell||cell==bodyEl){
      return ;
    }
    cell=this.getTwinCells(cell)[0];
    if(cell){
      row=cell.parentNode;
    }else {
      row=this.getTwinRows(ets.row)[0];
    }
    var et=ets.eventTarget;
    var clickCheckColum=(Sigma.U.getTagName(et)=="INPUT"&&et.className=="gt-f-check");
    if(clickCheckColum){
      Sigma.checkOneBox(et,this);
    }
    this._onCellSelect(ets);
    if(!this.selectRowByCheck){
      this._onRowSelect(row,event);
    }
    if(dbl){
      this._onCellDblClick(event,cell,ets);
      this._onRowDblClick(event,row,ets);
    }else {
      this._onCellClick(event,cell,ets);
      this._onRowClick(event,row,ets);
    }
    if(!Sigma.U.hasClass(cell,"gt-index-col")){
      this.initActiveObj_startEdit(event,cell,dbl);
    }else {
    }
    this.syncTwinRowCell(null,cell);
  },clickCount:0,clickInterval:500,_eventHandler:function(event,name,el){
    var grid=this;
    if(el==grid.bodyDiv){
      if(name=="scroll"){
        grid.activeMe();
        grid.closeGridMenu();
        grid.syncScroll();
        return ;
      }
    }else {
      if(el==grid.freezeBodyDiv){
      }
    }
    var ets=this.getEventTargets(event);
    if(grid.lightOverRow&&name=="mousemove"){
      Sigma.Grid.handleOverRow(event,grid,el);
    }
    switch(name){
    case "contextmenu":
      Sigma.$invoke(grid,"onContextMenu",[ets.value,ets.record,ets.cell,ets.row,ets.colNo,ets.rowNo,ets.column,grid]);
      break ;
    case "dblclick":
      this.clickCount=0;
      return grid._onBodyClick(event,true,el,ets);
    case "click":
      Sigma.$thread(function(){
        grid.clickCount=0;
      },grid.clickInterval);
      this.clickCount++;
      return grid._onBodyClick(event,false,el,ets);
    case "mouseover":
      Sigma.$invoke(grid,"onMouseOver",[ets.value,ets.record,ets.cell,ets.row,ets.colNo,ets.rowNo,ets.column,grid]);
      break ;
    case "mousemove":
      Sigma.$invoke(grid,"onMouseMove",[ets.value,ets.record,ets.cell,ets.row,ets.colNo,ets.rowNo,ets.column,grid]);
      break ;
    case "mouseout":
      Sigma.$invoke(grid,"onMouseOut",[ets.value,ets.record,ets.cell,ets.row,ets.colNo,ets.rowNo,ets.column,grid]);
      break ;
    default:
      name=(name.indexOf("on")!==0?"on"+name:name).toLowerCase();
      return Sigma.$invoke(grid,name,[event,grid,ets,name,el]);
    }
  },bindEvent:function(el,name){
    var grid=this;
    Sigma.U.addEvent(el,name,function(event){
      grid._eventHandler(event,name,el);
    });
  },initMainEvent:function(){
    var grid=this;
    Sigma.initGlobalEvent();
    if(grid.monitorResize){
      Sigma.U.addEvent(window,"resize",function(event){
        grid._onResize();
      });
      grid.hasResizeListener=true;
    }
    Sigma.U.addEvent(grid.gridDiv,"mousedown",function(event){
      grid.activeMe();
    });
    grid.bindEvent(grid.bodyDiv,"scroll");
    grid.bindEvent(grid.bodyDiv,"click");
    grid.bindEvent(grid.bodyDiv,"dblclick");
    grid.bindEvent(grid.bodyDiv,"contextmenu");
    grid.bindEvent(grid.freezeBodyDiv,"click");
    grid.bindEvent(grid.freezeBodyDiv,"dblclick");
    Sigma.U.addEvent(grid.headDiv,"selectstart",function(event){
      Sigma.U.stopEvent(event);
      return false;
    });
    grid.bindEvent(grid.bodyDiv,"mouseover");
    grid.bindEvent(grid.bodyDiv,"mouseout");
    grid.bindEvent(grid.bodyDiv,"mousemove");
    grid.bindEvent(grid.freezeBodyDiv,"mousemove");
    function overHdCell(event){
      event=event||window.event;
      var cell=Sigma.U.getParentByTagName("td",null,event);
      if(cell){
        Sigma.U.addClass(cell,"gt-hd-row-over");
      }
      if(grid.lastOverHdCell!=cell){
        Sigma.U.removeClass(grid.lastOverHdCell,"gt-hd-row-over");
      }
      grid.lastOverHdCell=cell;
    }
    Sigma.U.addEvent(grid.headTable,"mousemove",overHdCell);
    Sigma.U.addEvent(grid.freezeHeadTable,"mousemove",overHdCell);
  },showCellToolTip:function(cell,width){
    if(!this.toolTipDiv){
      this.toolTipDiv=Sigma.$e("div",{className:"gt-cell-tooltip gt-breakline"});
      this.toolTipDiv.style.display="none";
    }
    this.toolTipDiv.innerHTML=Sigma.$getText(cell);
    this.gridDiv.appendChild(this.toolTipDiv);
    this.toolTipDiv.style.left=cell.offsetLeft+this.bodyDiv.offsetLeft-this.bodyDiv.scrollLeft+((Sigma.isFF2||Sigma.isFF1)?0:this.tableMarginLeft)+"px";
    this.toolTipDiv.style.top=cell.offsetTop+cell.offsetHeight+this.bodyDiv.offsetTop-this.bodyDiv.scrollTop+this.toolBarTopHeight+(Sigma.isFF?1:0)+"px";
    width&&(this.toolTipDiv.style.width=width+"px");
    this.toolTipDiv.style.display="block";
  },setParameters:function(parameters){
    this.parameters=parameters;
  },setQueryParameters:function(queryParameters){
    this.queryParameters=queryParameters;
  },cleanQueryParameters:function(){
    this.queryParameters={};
  },addQueryParameter:function(key,value){
    this.queryParameters=Sigma.U.add2Map(key,value,this.queryParameters);
  },removeQueryParameter:function(key){
    var v=this.queryParameters[key];
    this.queryParameters[key]=undefined;
    delete this.queryParameters[key];
    return v;
  },exceptionHandler:function(exception,optype){
    alert(optype+"\n\n"+exception);
  },getUpdatedFields:function(){
    return Sigma.$array(this.dataset.updatedFields);
  },getColumnInfo:function(){
    var colList=[];
    for(var cn=0;cn<this.columnList.length;cn++){
      var c=this.columnList[cn];
      var col={id:c.id,header:c.header||c.title,fieldName:c.fieldName,fieldIndex:c.fieldIndex,sortOrder:c.sortOrder,hidden:c.hidden,exportable:c.exportable,printable:c.printable};
      colList.push(col);
    }
    return colList;
  },getSaveParam:function(reqParam){
    reqParam=reqParam||{};
    reqParam[this.CONST.fieldsName]=this.dataset.fieldsName;
    reqParam[this.CONST.recordType]=this.dataset.getRecordType();
    reqParam[this.CONST.parameters]=this.parameters;
    this.submitUpdatedFields&&(reqParam[this.CONST.updatedFields]=this.getUpdatedFields());
    return reqParam;
  },getLoadParam:function(reqParam){
    reqParam=reqParam||{};
    reqParam[this.CONST.recordType]=this.dataset.getRecordType();
    reqParam[this.CONST.pageInfo]=this.getPageInfo(true);
    this.submitColumnInfo&&(reqParam[this.CONST.columnInfo]=this.getColumnInfo());
    reqParam[this.CONST.sortInfo]=this.getSortInfo();
    reqParam[this.CONST.filterInfo]=this.getFilterInfo();
    reqParam[this.CONST.remotePaging]=this.remotePaging;
    reqParam[this.CONST.parameters]=this.parameters;
    if(this.recount){
      reqParam[this.CONST.pageInfo].totalRowNum=-1;
    }
    return reqParam;
  },request:function(url,reqParam,parameterType,onSuccess,onFailure){
    var grid=this;
    grid.requesting=true;
    var action=reqParam[grid.CONST.action];
    if(url){
      try{
        grid.ajax=new Sigma.Ajax(url);
        grid.ajax.encoding=grid.encoding||grid.ajax.encoding;
        grid.ajax.method=grid.ajaxMethod||grid.ajax.method;
        grid.ajax.mimeType=grid.mimeType||grid.ajax.mimeType;
        grid.ajax.jsonParamName=grid.jsonParamName||grid.ajax.jsonParamName;
        grid.ajax.onSuccess=onSuccess||Sigma.$empty;
        grid.ajax.onFailure=onFailure||Sigma.$empty;
        grid.ajax.setQueryParameters(grid.queryParameters);
        grid.ajax.send({data:reqParam});
      }
      catch(e){
        onFailure({status:"Exception "+e.message},e);
      }
    }else {
      onFailure({status:"url is null"});
    }
  },load:function(recount,force){
    var grid=this;
    var url=this.loadURL;
    var lazyLoad=(!this.autoLoad&&!this.rendered);
    if(lazyLoad){
      grid.hideWaiting();
      grid.hideFreezeZone();
      return ;
    }
    this.remotePaging=this.remotePaging===false?false:!!url;
    var reqParam=this.getLoadParam();
    if(recount===true){
      reqParam[this.CONST.pageInfo].totalRowNum=-1;
    }
    reqParam[this.CONST.action]="load";
    if(Sigma.$invoke(this,"beforeLoad",[reqParam,this])!==false){
      if(!url||(force!==true&&this.remotePaging===false&&!this.isFirstLoad)){
        grid.requesting=true;
        grid.loadCallBack(function(){
          var respT={};
          respT[grid.dataRoot]=grid.dataset.data||[];
          var pInfo=grid.getPageInfo();
          var tn=grid.dataset.getSize();
          pInfo.totalRowNum=tn>0?tn:0;
          respT[grid.CONST.pageInfo]=pInfo;
          return respT;
        }(grid),reqParam);
        return ;
      }
      this.showWaiting();
      var r=this.request(url,reqParam,"json",function(response){
        grid.loadCallBack(response,reqParam);
      },function(xhr,e){
        var er={};
        er[grid.CONST.exception]=" XMLHttpRequest Status : "+xhr.status;
        grid.loadFailure(er,e);
        grid.hideWaiting();
      });
      this.isFirstLoad=false;
      return r;
    }else {
      grid.hideWaiting();
    }
    return false;
  },query:function(param){
    this.setQueryParameters(param);
    this.lastAction="query";
    this.reload(true,true);
  },saveCallBack:function(response,reqParam,onNav){
    var respT=this.responseCallBack(response,reqParam);
    if(this.requesting){
      var respD=Sigma.$extend({},respT);
      this.requesting=false;
      var success=!(respD[this.CONST.success]===false||respD[this.CONST.success]==="false");
      if(success){
        this.saveSuccess(respD,onNav);
      }else {
        this.saveFailure(respD);
      }
      this.hideWaiting();
      Sigma.$invoke(this,"afterSave",[respD,success,this]);
    }
  },saveSuccess:function(respD,onNav){
    this.dataset.cleanModifiedData(true);
    if(this.reloadAfterSave||this.autoSaveOnNav&&onNav){
      if(this.recountAfterSave){
        this.getPageInfo().totalRowNum=-1;
      }else {
        if(respD[this.CONST.pageInfo]){
          this.getPageInfo().totalRowNum=respD[respD.CONST.pageInfo].totalRowNum||this.getPageInfo().totalRowNum;
        }
      }
      this.reload();
    }
  },loadSuccess:function(respD){
    this.setContent(respD);
  },loadCallBack:function(response,reqParam){
    var respT=this.responseCallBack(response,reqParam);
    if(this.requesting){
      var respD=Sigma.$extend({},respT);
      if(respD[this.CONST.success]===false||respD[this.CONST.success]==="false"){
        this.loadFailure(respD);
        this.hideWaiting();
      }else {
        this.loadSuccess(respD);
      }
      this.requesting=false;
    }
  },responseCallBack:function(response,reqParam,action){
    action=action||reqParam[this.CONST.action];
    response=Sigma.$invoke(this,action+"ResponseHandler",[response,reqParam])||response;
    if(!response||Sigma.$type(response,"string","number")){
      response={text:response};
    }
    var respT=null;
    try{
      respT=response.text?eval("("+response.text+")"):response;
    }
    catch(e){
      respT={text:response.text};
      respT[this.CONST.exception]=respT.text;
    }
    if(respT[this.CONST.exception]){
      respT[this.CONST.success]=false;
    }
    return respT;
  },loadFailure:function(respD,e){
    var msg=respD[this.CONST.exception]||(e?e.message:undefined);
    alert(" LOAD Failed! "+"\n Exception : \n"+msg);
  },saveFailure:function(respD,e){
    var msg=respD[this.CONST.exception]||(e?e.message:undefined);
    alert(" SAVE Failed! "+"\n Exception : \n"+msg);
  },exportFailure:function(respD,e){
    var msg=respD[this.CONST.exception]||(e?(e.message||""):"");
    alert(" Export "+respD.type+" ( "+respD.fileName+" ) Failed! "+"\n Exception : \n"+msg);
  },updateRecordField:function(td,newValue){
    var colObj=this.getColumn(td);
    if(colObj){
      var record=this.getRecordByRow(td.parentNode);
      return this.update(record,colObj.fieldName,newValue);
    }
    return false;
  },update:function(record,fieldName,newValue){
    if(Sigma.$invoke(this,"beforeUpdate",[record,fieldName,newValue])!==false){
      this.dataset.updateRecord(record,fieldName,newValue);
      return true;
    }
  },cloneDefaultRecord:function(){
    var defR=this.defaultRecord;
    if(Sigma.$type(defR,"function")){
      defR=defR(this,this.dataset,this.dataset.getSize());
    }
    return Sigma.$clone(defR);
  },renderInsertedRow:function(record){
    var newTR,newFTR;
    var colNum=this.colNum;
    var trStart=Sigma.T_G.rowStart(this,this.rowNum);
    if(!this.gridTable.tFoot){
      this.gridTable.appendChild(Sigma.$e("tfoot"));
    }
    if(!this.freezeBodyTable.tFoot){
      this.freezeBodyTable.appendChild(Sigma.$e("tfoot"));
    }
    newTR=Sigma.U.createTrFromHTML(this.buildGridRow(trStart,record,this.rowNum,colNum),this.gridTable.tFoot);
    if(this.showIndexColumn){
      newFTR=Sigma.U.createTrFromHTML(this.buildGridIndexRow(trStart,record,this.rowNum,colNum),this.freezeBodyTable.tFoot);
    }else {
      newFTR=Sigma.U.createTrFromHTML(trStart+"</tr>",this.freezeBodyTable.tFoot);
      newFTR.appendChild(Sigma.T_G.freezeBodyCell(this,10,null));
    }
    Sigma.U.addClass(newTR,"gt-row-new");
    Sigma.U.addClass(newFTR,"gt-row-new");
    var rowId=record[Sigma.Const.DataSet.ROW_KEY];
    newTR.id=rowId;
    newTR.setAttribute(Sigma.Const.DataSet.INDEX,record[Sigma.Const.DataSet.SN_FIELD]);
    return [newTR,newFTR];
  },hasDataRow:function(){
    var hasRow=this.getRows().length>0;
    var hasNew=!!(this.gridTable.tFoot&&this.gridTable.tFoot.rows.length>0);
    return hasRow||hasNew;
  },toggleEmptyRow:function(){
    if(!this.hasDataRow()){
      var rowHTML=['<tr class="gt-row gt-row-empty" >'];
      for(var cn=0;cn<this.colNum;cn++){
        rowHTML.push(Sigma.T_G.cell(this.columnList[cn],"&#160;"));
      }
      rowHTML.push(Sigma.T_G.rowEndHTML);
      Sigma.U.createTrFromHTML(rowHTML.join(""),this.gridTbodyList[0]);
    }else {
      var row=this.getFirstRow();
      if(this.isEmptyRow(row)){
        Sigma.U.removeNode(row);
      }
    }
  },refreshGrid:function(grid){
    grid=grid||this;
    var rowNo=grid.dataset.getSize();
    var pInfo=grid.getPageInfo();
    if(!grid.remotePaging&&!pInfo.pageSize){
      pInfo.pageSize=rowNo;
    }
    rowNo=rowNo>pInfo.pageSize?pInfo.pageSize:rowNo;
    var rowBegin=grid.dataset.startRecordNo;
    grid.rowNum=rowNo;
    grid.rowBegin=rowBegin;
    grid.rowEnd=rowBegin+rowNo;
    grid.colNum=grid.columnList.length;
    grid.tableMarginLeft=0;
    var tableHTML=[];
    var freezeTableHTML=[];
    grid.buildGridTable(grid,tableHTML,freezeTableHTML);
    grid.bodyDiv.innerHTML=tableHTML.join("");
    grid.freezeBodyDiv.innerHTML=freezeTableHTML.join("");
    var gTable=Sigma.U.firstChildElement(grid.bodyDiv);
    if(gTable){
      if(Sigma.U.getTagName(gTable)!="TABLE"){
        gTable=Sigma.U.nextElement(gTable);
      }
      if(Sigma.U.getTagName(gTable)=="TABLE"){
        grid.gridTable=gTable;
        grid.gridTbodyList.push(gTable.tBodies[0]);
      }
    }
    gTable=Sigma.U.firstChildElement(grid.freezeBodyDiv);
    if(gTable){
      if(Sigma.U.getTagName(gTable)!="TABLE"){
        gTable=Sigma.U.nextElement(gTable);
      }
      grid.freezeBodyTable=gTable;
    }
    grid.bodyFirstRow=grid.getFirstRow();
    if(grid.rowNum<1){
      for(var cn=0;cn<grid.colNum;cn++){
        var colObj=grid.columnList[cn];
        if(grid.bodyFirstRow){
          colObj.firstCell=grid.bodyFirstRow.cells[cn];
          colObj.firstCell.style.height="0px";
          colObj.firstCell.style.borderBottomWidth="0px";
        }
      }
    }
    grid.hasIndexColumn=grid.showIndexColumn;
    grid.isEmptyfreezeZone=true;
    Sigma.$thread(function(){
      grid.freezeBodyDiv.style.height=grid.bodyDiv.clientHeight+"px";
      grid.syncScroll();
    });
  },hideFreezeZone:function(){
    this.freezeHeadDiv&&(this.freezeHeadDiv.style.display="none");
    this.freezeBodyDiv&&(this.freezeBodyDiv.style.display="none");
  },cleanFreezeHead:function(){
    var fhBody=this.freezeHeadTable.tBodies[0];
    for(var rn=fhBody.rows.length-1;rn>=0;rn--){
      Sigma.U.removeNodeTree(fhBody.rows[rn]);
    }
  },buildGridTable:function(grid,tableHTML,freezeTableHTML){
    var indexColumnWidth=(""+grid.rowEnd).length;
    indexColumnWidth=(indexColumnWidth<2?1.5:indexColumnWidth)*7+2+1;
    var indexCellWidth=indexColumnWidth+this.cellWidthFix;
    var indexInnerWidth=indexColumnWidth+this.innerWidthFix;
    var tdWidthStyle='style="width:'+indexCellWidth+'px;"';
    var divWidthStyle='style="width:'+indexInnerWidth+'px;"';
    this.indexColumnCell=['<td class="gt-index-col" '+tdWidthStyle+' ><div class="gt-inner" '+divWidthStyle+" >","</div></td>"];
    if(grid.showIndexColumn){
      grid.tableMarginLeft=indexColumnWidth;
      grid.cleanFreezeHead();
      var headRow=Sigma.$e("tr",{className:"gt-hd-row"});
      var colN=Sigma.T_G.freezeHeadCell(grid,indexColumnWidth,null);
      headRow.appendChild(colN);
      grid.freezeHeadTable.tBodies[0].appendChild(headRow);
      grid.freezeHeadDiv.style.left=grid.freezeBodyDiv.style.left=this.freezeFixW+"px";
      grid.headTable.style.marginLeft=grid.tableMarginLeft+"px";
      grid.freezeHeadDiv.style.display=grid.freezeBodyDiv.style.display="block";
      grid.freezeBodyDiv.style.height=parseInt(grid.bodyDiv.style.height)+"px";
    }else {
      grid.freezeHeadDiv.style.display=grid.freezeBodyDiv.style.display="none";
    }
    freezeTableHTML.push(Sigma.T_G.tableStartHTML);
    tableHTML.push(Sigma.U.replaceAll(Sigma.T_G.tableStartHTML,"margin-left:0px","margin-left:"+grid.tableMarginLeft+"px"));
    var startR=grid.rowBegin;
    var endR=grid.rowEnd;
    grid.currentRowNum=startR;
    grid.getGridBodyHTML(startR,endR,-1,tableHTML,freezeTableHTML);
    freezeTableHTML.push(Sigma.T_G.tableEndHTML);
  },isNextGroup:function(record,lastRecord,rn){
  },isGroupRow:function(cell,row){
    cell=cell||(row?row.cells[0]:null);
    return Sigma.U.hasClass(cell,"gt-group-row");
  },isEmptyRow:function(row){
    return !row||Sigma.U.hasClass(row,"gt-row-empty");
  },isInsertRow:function(row){
    return Sigma.U.hasClass(row,"gt-row-new");
  },isDelRow:function(row){
    return Sigma.U.hasClass(row,"gt-row-del");
  },buildGridIndexRow:function(trStart,record,rn,colNum){
    var rowHTML=[trStart];
    rowHTML.push(this.indexColumnCell[0]);
    rowHTML.push(rn+1+this.indexColumnCell[1]);
    rowHTML.push(Sigma.T_G.rowEndHTML);
    return rowHTML.join("");
  },buildGridRow:function(trStart,record,rowNo,colNum,groupInfo){
    var rowHTML=[trStart];
    var _cn=0;
    for(var cn=0;cn<colNum;cn++){
      var col=this.columnList[cn];
      if(col.hidden&&!this.renderHiddenColumn){
        continue ;
      }
      var attr=groupInfo&&groupInfo[col.id]?groupInfo[col.id].attr:null;
      rowHTML.push(Sigma.T_G.cell(col,col.renderer(record[col.fieldIndex],record,col,this,_cn,rowNo),attr));
      _cn++;
    }
    rowHTML.push(Sigma.T_G.rowEndHTML);
    return rowHTML.join("");
  },buildGroupGridRow:function(trStart,record,rowNo,colNum){
    var rowHTML=[trStart];
    var cell='<td colspan="'+colNum+'" class="gt-group-row" > + '+rowNo+" -------------</td>";
    rowHTML.push(cell);
    rowHTML.push(Sigma.T_G.rowEndHTML);
    return rowHTML.join("");
  },resetFreeze:function(grid){
  },updateFreezeState:function(){
    if(this.frozenColumnList){
      var i,colObj;
      for(i=0;i<this.frozenColumnList.length;i++){
        colObj=this.columnMap[this.frozenColumnList[i]];
        if(colObj){
          this.moveColumn(colObj.colIndex,i,true);
        }
      }
      for(i=0;i<this.frozenColumnList.length;i++){
        colObj=this.columnMap[this.frozenColumnList[i]];
        if(colObj){
          colObj.freeze(true);
        }
      }
    }
  },getGroupInfo:function(startR,endR){
    return this.getMergeGroupInfo(startR,endR);
  },getSeparateGroupInfo:function(startR,endR){
    var colNum=this.colNum;
    var groupCol=null;
    for(var cn=0;cn<colNum;cn++){
      var col=this.columnList[cn];
      if(col.grouped){
        groupCol=col;
        break ;
      }
    }
    var rows={};
    if(groupCol){
      var rowNum=endR-startR;
      var rn=startR;
      for(var i=0;i<rowNum;i++){
        var record=this.dataset.getRecord(rn++);
        if(!record){
          continue ;
        }
        var key=this.getUniqueField(record);
      }
    }
  },getMergeGroupInfo:function(startR,endR){
    var colNum=this.colNum;
    var rowNum=endR-startR;
    var row,cell,rspan=1;
    var groupH={},groupValue=null;
    var rows=[];
    for(var cn=0;cn<colNum;cn++){
      var colObj=this.columnList[cn];
      var rn=startR;
      for(var i=0;i<rowNum;i++){
        var record=this.dataset.getRecord(rn++);
        if(!record){
          continue ;
        }
        row=rows[i]=rows[i]||{};
        var ss=row["__gt_group_s_"];
        if(colObj.grouped){
          cell=row[colObj.id]=row[colObj.id]||{};
          if(groupValue==record[colObj.fieldIndex]&&(!ss&&ss!==0||ss>cn)){
            cell.attr=' style="display:none;" ';
            rspan++;
          }else {
            groupH.attr=' rowspan="'+rspan+'" style="background-color: #eef6ff;"  ';
            rspan=1;
            groupH=cell;
            groupValue=record[colObj.fieldIndex];
            row["__gt_group_s_"]=cn;
          }
        }
      }
      groupH.attr=' rowspan="'+rspan+'" style="background-color: #eef6ff;"  ';
    }
    return rows;
  },createSortInfo:function(colObj){
    return {columnId:colObj.id,fieldName:colObj.fieldName,sortOrder:colObj.sortOrder,getSortValue:colObj.getSortValue,sortFn:colObj.sortFn};
  },_doSort:function(){
    if(!this.sortInfo||this.sortInfo.length<1){
      return ;
    }
    this.dataset.sort(this.sortInfo);
  },addSortInfo:function(sortI,multi){
    multi=multi||multi===false?multi:this.multiSort;
    var groupSort=[],hasAdd=false;
    for(var cn=0;cn<this.columnList.length;cn++){
      var colObj=this.columnList[cn];
      if(colObj.grouped){
        if(!hasAdd&&colObj.id==sortI.columnId){
          colObj.sortOrder=sortI.sortOrder;
          hasAdd=true;
        }else {
          var s=colObj.sortOrder;
          s=s=="asc"||s=="desc"?s:"asc";
          colObj.sortOrder=s;
        }
        groupSort.push(this.createSortInfo(colObj));
      }
    }
    if(!hasAdd&&multi!==true){
      this.sortInfo=groupSort.concat(sortI);
      return ;
    }
    this.sortInfo=this.sortInfo||[];
    var id=sortI.columnId;
    var has=false,sI,i;
    for(i=0;i<this.sortInfo.length;i++){
      sI=this.sortInfo[i];
      if(sI&&sI.columnId===id){
        sI.sortOrder=sortI.sortOrder;
        has=true;
        break ;
      }
    }
    !has&&(this.sortInfo.push(sortI));
    for(i=0;i<this.sortInfo.length;i++){
      sI=this.sortInfo[i];
      if(!sI||(!sI.sortOrder||sI.sortOrder=="defaultsort")){
        this.sortInfo.splice(i,1);
        i--;
      }
    }
  },updateSortState:function(){
    var colObj,cn;
    for(cn=0;cn<this.colNum;cn++){
      colObj=this.columnList[cn];
      colObj.sortIcon&&(colObj.sortIcon.className="gt-hd-icon");
      colObj.frozenSortIcon&&(colObj.frozenSortIcon.className="gt-hd-icon");
      colObj.sortOrder=null;
    }
    if(!this.sortInfo||this.sortInfo.length<1){
      return ;
    }
    for(var i=0;i<this.sortInfo.length;i++){
      var sI=this.sortInfo[i];
      if(sI){
        colObj=this.columnMap[sI.columnId];
        var sortOrder=sI.sortOrder||"defaultsort";
        colObj.sortOrder=sortOrder;
        Sigma.U.addClass(colObj.sortIcon,"gt-hd-"+sortOrder);
        Sigma.U.addClass(colObj.frozenSortIcon,"gt-hd-"+sortOrder);
      }
    }
    var newFirstRow=this.getFirstRow();
    if(newFirstRow&&!this.isEmptyRow(newFirstRow)){
      this.bodyFirstRow=newFirstRow;
      var _cn=0;
      for(cn=0;cn<this.colNum;cn++){
        var _colObj=this.columnList[cn];
        if(!_colObj.hidden||this.renderHiddenColumn){
          _colObj.firstCell=this.bodyFirstRow.cells[_cn];
          _colObj.firstCell.className=_colObj.styleClass;
          _cn++;
        }
      }
    }
  },getRecordByRow:function(row){
    if(!row){
      return null;
    }
    if(this.isInsertRow(row)){
      var key=row.getAttribute(Sigma.Const.DataSet.INDEX);
      return this.dataset.insertedRecords[key];
    }
    var rowNo=row.getAttribute(Sigma.Const.DataSet.INDEX)/1;
    return rowNo||rowNo===0?this.dataset.getRecord(rowNo):null;
  },getRowByRecord:function(record){
    var rowId=record[Sigma.Const.DataSet.ROW_KEY];
    return Sigma.doc.getElementById(rowId);
  },getUniqueField:function(record){
    return record[this.dataset.uniqueField];
  },updateCheckState:function(){
    var cCol=this.checkColumn;
    if(cCol){
      var idx=cCol.colIndex;
      var rows=this.getRows();
      for(var i=0,len=rows.length;i<len;i++){
        var row=rows[i];
        var cell=row.cells[idx];
        var chk=cell?cell.getElementsByTagName("input"):null;
        chk=chk?chk[0]:chk;
        if(chk&&chk.checked){
          this.selectRow(row,true);
        }
      }
    }
  },updateEditState:function(){
    var newRecords=this.getInsertedRecords(),row,record,i,j,k;
    for(i=0;i<newRecords.length;i++){
      this.renderInsertedRow(newRecords[i]);
    }
    for(k in this.dataset.updatedRecords){
      record=this.dataset.updatedRecords[k];
      var fields=this.dataset.updatedRecordsBak[k];
      row=this.getRowByRecord(record);
      if(row){
        var recordN=this.getRecordByRow(row);
        if(recordN){
          for(var f in fields){
            recordN[f]=record[f];
            for(i=0,j=this.columnList.length;i<j;i++){
              var colObj=this.columnList[i];
              if(f==colObj.fieldIndex&&row.cells){
                this.dirty(row.cells[i]);
                row.cells[i].firstChild.innerHTML=colObj.renderer(recordN[colObj.fieldIndex],recordN,colObj,this,i,row.rowIndex);
              }
            }
          }
        }
        this.dataset.updatedRecords[k]=recordN;
      }
    }
    for(k in this.dataset.deletedRecords){
      record=this.dataset.deletedRecords[k];
      row=this.getRowByRecord(record);
      this.del(row);
    }
  },syncScroll:function(left,top){
    if(Sigma.$chk(left)){
      this.bodyDiv.scrollLeft=left;
    }
    if(Sigma.$chk(top)){
      this.bodyDiv.scrollTop=top;
    }
    this.headDiv.scrollLeft=this.bodyDiv.scrollLeft;
    this.freezeBodyDiv.scrollTop=this.bodyDiv.scrollTop;
    this.scrollLeft=this.bodyDiv.scrollLeft;
    this.scrollTop=this.bodyDiv.scrollTop;
  },initToolbar:function(){
    if(this.resizable&&(this.toolbarPosition=="bottom"||this.toolbarPosition=="b")&&this.toolBarBox){
      this.resizeButton=Sigma.$e("div",{id:this.id+"_resizeButton",className:"gt-tool-resize",innerHTML:"&#160;"});
      this.resizeButton.setAttribute("unselectable","on");
      this.toolBarBox.appendChild(this.resizeButton);
      var grid=this;
      Sigma.U.addEvent(this.resizeButton,"mousedown",function(event){
        Sigma.Grid.startGridResize(event,grid);
      });
    }
    this.createGridMenu();
    if(this.toolbarContent&&this.toolbarPosition&&this.toolbarPosition!="none"){
      this.toolbarContent=this.toolbarContent.toLowerCase();
      var barbutton=this.toolbarContent.split(" ");
      var lastt=null;
      for(var j=0;j<barbutton.length;j++){
        var b=barbutton[j];
        if(b=="|"){
          var sp=Sigma.ToolFactroy.create(this,"separator",true);
          if(lastt){
            lastt.separator=sp;
          }
        }else {
          if(b=="state"||b=="info"||b=="pagestate"){
            if(!this.pageStateBar){
              this.pageStateBar=Sigma.ToolFactroy.create(this,"pagestate",this.showPageState);
            }
            if(j!=barbutton.length-1){
              this.pageStateBar.className+=" gt-page-state-left";
            }
            lastt=this.pageStateBar;
          }else {
            if(b=="nav"){
              this.navigator.buildNavTools(this);
              lastt=this.navigator;
            }else {
              var ub=b.charAt(0).toUpperCase()+b.substring(1);
              lastt=this.tools[b+"Tool"]=Sigma.ToolFactroy.create(this,b,this["show"+ub+"Tool"]);
            }
          }
        }
      }
    }
    this.expendMenu={};
    this.over_initToolbar=true;
  },refreshToolBar:function(pageInfo,doCount){
    pageInfo&&(this.setPageInfo(pageInfo));
    if(this.over_initToolbar){
      this.navigator.refreshState(pageInfo,doCount);
      this.navigator.refreshNavBar();
      var pageInput=this.navigator.pageInput;
      if(this.pageStateBar){
        pageInfo=this.getPageInfo();
        Sigma.U.removeNode(this.pageStateBar.firstChild);
        if(pageInfo.endRowNum-pageInfo.startRowNum<1){
          this.pageStateBar.innerHTML="<div>"+this.getMsg("NO_DATA")+"</div>";
        }else {
          this.pageStateBar.innerHTML="<div>"+Sigma.$msg(this.getMsg(pageInput?"PAGE_STATE":"PAGE_STATE_FULL"),pageInfo.startRowNum,pageInfo.endRowNum,pageInfo.totalPageNum,pageInfo.totalRowNum,pageInfo.pageNum)+"</div>";
        }
      }
    }
  },createGridMenu:function(){
    if(!this.showGridMenu||!this.toolBarBox||!this.toolBar){
      return ;
    }
    var grid=this;
    var gridId=grid.id;
    this.gridMenuButton=new Sigma.Button({gridId:this.id,parentItem:this,container:this.toolBar,cls:"gt-tool-gridmenu",withSeparator:true});
    var groupColDialog=!this.allowGroup?null:Sigma.createColumnDialog("group",{gridId:gridId,checkValid:function(r){
        return r.grouped;
      },checkFn:"group",uncheckFn:"ungroup",checkType:grid.multiGroup?"checkbox":"radio",canCheck:function(col){
        return col.filterable!==false&&!col.hidden;
      }});
    var freezeColDialog=!this.allowFreeze?null:Sigma.createColumnDialog("freeze",{gridId:gridId,checkValid:function(r){
        return r.frozen;
      },checkFn:"freeze",uncheckFn:"unfreeze",canCheck:function(col){
        return col.freezeable!==false&&!col.hidden;
      }});
    var hideColDialog=!this.allowHide?null:Sigma.createColumnDialog("show",{gridId:gridId,checkValid:function(r){
        return !r.hidden;
      },checkFn:"show",uncheckFn:"hide",canCheck:function(col){
        return col.hideable!==false&&!col.frozen;
      }});
    function showColDialog(columnDialog,title){
      if(!columnDialog){
        return ;
      }
      columnDialog.show();
      columnDialog.setTitle(title);
      grid.gridMenuButton.closeMenu();
    }
    var p=this.toolbarPosition!="bottom"?"B":"T";
    function _changeSkin(skin){
      return function(){
        Sigma.Grid.changeSkin(grid,skin);
      };
    }
    var skinItem=null;
    if(this.allowCustomSkin){
      skinItem=new Sigma.MenuItem({gridId:this.id,type:"",text:this.getMsg("CHANGE_SKIN"),cls:"gt-icon-skin"});
      var skinItemList=[];
      for(var i=0;i<this.skinList.length;i++){
        skinItemList.push(new Sigma.MenuItem({gridId:this.id,type:"radiobox",text:this.skinList[i].text,checked:i===0,onclick:_changeSkin(this.skinList[i].value)}));
      }
      skinItem.addMenuItems(skinItemList,"R");
    }
    this.gridMenuButton.addMenuItems([skinItem,groupColDialog?new Sigma.MenuItem({gridId:grid.id,type:"",text:grid.getMsg("MENU_GROUP_COL"),cls:"gt-icon-groupcol",onclick:function(){
        showColDialog(groupColDialog,grid.getMsg("MENU_GROUP_COL"));
      }}):null,freezeColDialog?new Sigma.MenuItem({gridId:grid.id,type:"",text:grid.getMsg("MENU_FREEZE_COL"),cls:"gt-icon-freeze",onclick:function(){
        showColDialog(freezeColDialog,grid.getMsg("MENU_FREEZE_COL"));
      }}):null,hideColDialog?new Sigma.MenuItem({gridId:grid.id,type:"",text:grid.getMsg("MENU_SHOW_COL"),cls:"gt-icon-hidecol",onclick:function(){
        showColDialog(hideColDialog,grid.getMsg("MENU_SHOW_COL"));
      }}):null,new Sigma.MenuItem({gridId:this.id,type:"",text:SIGMA_GRID_VER})],p);
  },closeDialog:function(){
    this.activeDialog&&this.activeDialog.close();
    this.activeDialog=null;
  },getSortInfo:function(){
    return this.sortInfo||[];
  },setTotalRowNum:function(tn){
    this.getPageInfo().totalRowNum=tn;
  },getTotalRowNum:function(refresh){
    return this.getPageInfo(refresh).totalRowNum;
  },addSkin:function(skin){
    if(Sigma.$type(skin,"string")){
      skin={text:this.getMsg("STYLE_NAME_"+skin.toUpperCase()),value:skin.toLowerCase()};
    }
    this.skinList.push(skin);
  },addRows:function(rows){
    for(var i=0;i<rows.length;i++){
      this.gridRowList.push(rows[i]);
    }
  },getFirstRow:function(){
    return this.gridTbodyList[0]?this.gridTbodyList[0].rows[0]:null;
  },getRows:function(){
    return this.gridTbodyList[0].rows;
  },getRow:function(rowNo){
    if(Sigma.U.isNumber(rowNo)){
      return this.getRows()[rowNo];
    }
    return rowNo;
  },getRowNumber:function(){
    return this.rowNum;
  },hasData:function(){
    return this.rowNum>0;
  },dirty:function(cell){
    Sigma.U.addClass(cell,"gt-cell-updated");
  },selectFirstRow:function(){
    var row=this.getRow(0);
    if(row){
      this.selectRow(row,true);
    }
  },unselectAllRow:function(){
    var grid=this;
    Sigma.$each(this.selectedRows,function(row){
      Sigma.U.removeClass(row,"gt-row-selected");
      grid.syncTwinRowCell(row);
    });
    this.selectedRows=[];
    this.activeRow=null;
  },getSelectedRecord:function(){
    return this.getRecordByRow(this.selectedRows[this.selectedRows.length-1])||this.activeRecord;
  },getGridHTML:function(multiPage,gridHTML){
    var hdHTML=this.getGridHeadHTML();
    gridHTML=gridHTML||[Sigma.T_G.bodyTableStart(this.id,false),hdHTML,"<tbody>"];
    var startR=0;
    var endR=this.dataset.getSize();
    var pageSize=multiPage?this.getPageInfo().pageSize:-1;
    gridHTML.push(this.getGridBodyHTML(startR,endR,pageSize,gridHTML,null,true));
    return gridHTML.join("");
  },getGridHeadHTML:function(){
    var hdHTML=this.headTable.innerHTML;
    var f_TR=hdHTML.toLowerCase().indexOf("<tr");
    var f_cTR=hdHTML.toLowerCase().lastIndexOf("</tr>");
    if(this.customHead){
      f_TR=hdHTML.toLowerCase().indexOf("<tr",f_TR+3);
    }
    hdHTML=hdHTML.substring(f_TR,f_cTR+"</tr>".length);
    return "<!-- gt : head start  -->"+hdHTML+"<!-- gt : head end  -->";
  },getGridBodyHTML:function(startR,endR,pageSize,tableHTML,freezeTableHTML,isExport){
    var grid=this;
    var colNum=grid.colNum;
    var groupInfo=grid.getGroupInfo(startR,endR);
    var TRE=" >",record=null,lastRecord=null,gRn=0,rowId="";
    for(var rn=startR;rn<endR;rn++){
      record=grid.dataset.getRecord(rn);
      if(!record){
        break ;
      }
      var rowAttribute=grid.customRowAttribute(record,rn,grid)||"";
      var trStartS=Sigma.T_G.rowStartS(grid,rn,rowAttribute);
      if(!isExport){
        rowId=grid.rowKey+grid.getUniqueField(record);
        record[Sigma.Const.DataSet.ROW_KEY]=rowId;
        grid.currentRowNum++;
        if(grid.showIndexColumn){
          freezeTableHTML.push(grid.buildGridIndexRow(trStartS+TRE,record,rn,colNum));
        }
      }else {
        if(rn>0&&pageSize>0&&(rn%pageSize)===0){
          tableHTML.push("\n<!-- gt : page separator  -->\n");
        }
      }
      if(grid.isNextGroup(record,lastRecord,rn)){
        tableHTML.push(grid.buildGroupGridRow(trStartS+TRE,record,rn,colNum));
      }
      var gI=groupInfo[gRn++];
      tableHTML.push(grid.buildGridRow(trStartS+' id="'+rowId+'"'+TRE,record,rn,colNum,gI));
      lastRecord=record;
    }
    tableHTML.push(Sigma.T_G.tableEndHTML);
  },getHiddenColumnStyle:function(attr){
    var grid=this;
    var hiddenCssText=[];
    Sigma.$each(grid.columnList,function(colObj,i){
      if(colObj.hidden===true||(attr&&colObj[attr]===false)){
        hiddenCssText.push(colObj.CLASS_PREFIX+colObj.styleClass+" { display:none;width:0px; }");
        hiddenCssText.push(colObj.CLASS_PREFIX+colObj.innerStyleClass+" { display:none;width:0px; }");
      }
    });
    var css=hiddenCssText.join("\n");
    return Sigma.U.replaceAll(css,".gt-grid ","");
  },getAllRows:function(){
    var grid=this;
    if(grid.gridRowList.length===0){
      Sigma.$each(grid.gridTbodyList,function(gTbody){
        grid.addRows(gTbody.rows);
      });
    }
    return grid.gridRowList;
  },getAllFreezeRows:function(){
    var grid=this;
    if(grid.gridFreezeRowList.length===0){
      var rows=grid.freezeBodyTable.tBodies[0].rows;
      for(var i=0;i<rows.length;i++){
        grid.gridFreezeRowList.push(rows[i]);
      }
    }
    return grid.gridFreezeRowList;
  },filterHandler:{hide:function(filterInfo){
      filterInfo=filterInfo||this.filterInfo;
      var rs=Sigma.Grid.filterCheck[filterInfo.checkType](filterInfo.value,filterInfo.checkValue);
      if(rs){
      }else {
      }
    }},cleanActiveObj:function(){
    this.activeCell=null;
    this.activeRow=null;
    this.activeColumn=null;
    this.activeEditor=null;
    this.activeRecord=null;
    this.activeValue=null;
  },cleanTable:function(all){
    this.closeGridMenu();
    if(this.endEdit()===false){
      return ;
    }
    this.lastOverHdCell=null;
    if(all!==false){
      this.cleanActiveObj();
      for(var i=0;i<this.selectedRows.length;i++){
        this.selectedRows[i]=null;
      }
      this.selectedRows=[];
      this.overRow=null;
      this.overRowF=null;
    }
    this.gridRowList=[];
    this.bodyFirstRow=null;
    for(var cn=0;cn<this.colNum;cn++){
      var colObj=this.columnList[cn];
      colObj.firstCell=null;
      colObj.frozenSortIcon=null;
      colObj.frozenHdTool=null;
      colObj.frozenHeadCell=null;
    }
    var grid=this;
    Sigma.$each(this.gridTbodyList,function(gTbody,idx){
      Sigma.U.removeNode(gTbody);
      grid.gridTbodyList[idx]=null;
    });
    Sigma.U.removeNode(this.gridTable);
    this.gridTable=null;
    this.gridTbodyList=[];
    this.cleanFreezeHead();
    if(this.freezeBodyTable){
      Sigma.U.removeNode(this.freezeBodyTable.tBodies[0],this.freezeBodyTable);
      this.freezeBodyTable=null;
    }
  },destroy:function(){
    var grid=this;
    Sigma.$invoke(this,"beforeDestroy");
    this.cleanTable();
    var dList=["gridMenuButton","filterDialog","charDialog","navigator"];
    Sigma.$each(dList,function(k,i){
      if(grid[k]&&grid[k].destroy){
        grid[k].destroy();
      }
      grid[k]=null;
    });
    for(var k in this.tools){
      var t=this.tools[k];
      if(t&&t.destroy){
        t.destroy();
      }
      this.tools[k]=null;
    }
    Sigma.U.removeNodeTree(this.gridDialogTitle);
    Sigma.U.removeNodeTree(this.gridDialogBody);
    Sigma.U.removeNodeTree(this.gridDialog);
    this.gridDialog=this.gridDialogBody=this.gridDialogTitle=null;
    for(var cn=0;cn<this.colNum;cn++){
      var colObj=this.columnList[cn];
      colObj.destroy();
    }
    Sigma.$each(this.domList,function(k,i){
      Sigma.U.removeNode(grid[k]);
      grid[k]=null;
    });
    this.freezeBodyTable=this.gridTable=this.bodyFirstRow=this.lastOverHdCell=this.overRowF=this.overRow=null;
    this.gridFreezeRowList=[];
    this.selectedRows=[];
    this.cacheBodyList=[];
    this.frozenColumnList=[];
    this.sortedColumnList=[];
    this.checkedRows={};
    this.gridTbodyList=[];
    this.gridRowList=[];
    if(Sigma.activeGrid==this){
      Sigma.activeGrid=null;
    }
    Sigma.GridCache[this.id]=null;
    delete Sigma.GridCache[this.id];
  },addRow:function(record,startEdit){
    if(this.readOnly){
      return ;
    }
    this.insert(record,startEdit);
  },deleteRow:function(row){
    var rows=[].concat(row||this.selectedRows);
    for(var i=0;i<rows.length;i++){
      row=rows[i];
      var record=this.getRecordByRow(row);
      if(row!=this.activeRow){
        this.selectRow(row,false);
      }
      if(!record){
        continue ;
      }
      if(this.isInsertRow(row)){
        if(this.activeCell&&this.activeRow==row){
          this.cleanActiveObj();
        }
        var ntrs=this.getTwinRows(row);
        Sigma.U.removeNode(ntrs[0],ntrs[1]);
        this.dataset.deleteRecord(record);
        this.toggleEmptyRow();
        continue ;
      }
      if(Sigma.$invoke(this,"beforeDelete",[record,row,this])!==false){
        var isDel=this.dataset.isDeletedRecord(record);
        if(!isDel){
          this.dataset.deleteRecord(record);
          Sigma.U.addClass(row,"gt-row-del");
        }else {
          this.dataset.undeleteRecord(record);
          Sigma.U.removeClass(row,"gt-row-del");
        }
        this.syncTwinRowCell(row);
      }
    }
  },selectRow:function(row,selected){
    if(selected){
      var rows=[].concat(row);
      for(var i=0,len=rows.length;i<len;i++){
        row=this.getRow(rows[i]);
        if(!this.isEmptyRow(row)){
          var rowNo=row.rowIndex;
          var record=this.getRecordByRow(row);
          if(Sigma.$invoke(this,"beforeRowSelect",[record,row,rowNo,this])!==false){
            Sigma.U.addClass(row,"gt-row-selected");
            this.syncTwinRowCell(row);
            this.selectedRows.push(row);
            this.activeRow=row;
            Sigma.$invoke(this,"afterRowSelect",[record,row,rowNo,this]);
          }
        }
      }
    }else {
      if(row){
        Sigma.U.removeClass(row,"gt-row-selected");
        this.syncTwinRowCell(row);
        Sigma.U.remove(this.selectedRows,row);
      }
    }
  },addParameters:function(key,value){
    this.parameters=Sigma.U.add2Map(key,value,this.parameters);
  },cleanContent:function(){
    this.setContent({data:[],pageInfo:{pageNum:1,totalPageNum:1,totalRowNum:0,startRowNum:0}});
  },cleanParameters:function(){
    this.parameters={};
  },closeGridMenu:function(){
    if(this.gridMenuButton){
      this.gridMenuButton.closeMenu();
    }
  },endEdit:function(){
    if(this.activeEditor&&this.activeEditor.locked===true||(this.activeDialog!=this.activeEditor)&&this.activeDialog&&!this.activeDialog.hidden){
      return false;
    }
    if(this.activeCell&&this.activeEditor&&(this.activeColumn.editable||this.isInsertRow(this.activeRow))){
      this.hideEditor();
      this.editing=false;
      this.syncTwinRowCell(null,this.activeCell);
    }
  },exportGrid:function(type,fileName,url,name,action){
    var grid=this;
    if(Sigma.$invoke(grid,"beforeExport",[type,fileName,url,name,action,grid])!==false){
      try{
        type=type||this.exportType;
        fileName=fileName||this.exportFileName;
        url=url||this.exportURL;
        name=name||this.jsonParamName||(this.ajax?this.ajax.jsonParamName:Sigma.AjaxDefault.paramName);
        action="export";
        if(this.html2pdf&&type=="pdf"){
          this.gridFormTextarea.name="__gt_html";
          var exportCssText=['<style type="text/css">',this.getHiddenColumnStyle("exportable"),"</style>"];
          this.gridFormTextarea.value=exportCssText.join("\n")+"\n"+this.getGridHTML(true);
        }else {
          var reqParam=this.getLoadParam();
          reqParam[this.CONST.action]=action;
          reqParam[this.CONST.exportType]=type;
          reqParam[this.CONST.exportFileName]=fileName;
          this.gridFormTextarea.name=name;
          this.gridFormTextarea.value=Sigma.$json(reqParam);
        }
        this.gridFormFileName.value=fileName;
        this.gridFormExportType.value=type;
        this.gridForm.action=url;
        url&&(this.gridForm.submit());
        this.gridFormTextarea.value="";
      }
      catch(e){
        this.exportFailure({type:type,fileName:fileName},e);
      }
    }
  },getColumn:function(colNoIdTd){
    if(Sigma.U.isNumber(colNoIdTd)&&colNoIdTd>=0){
      return this.columnList[colNoIdTd];
    }else {
      if(Sigma.U.getTagName(colNoIdTd)=="TD"){
        return this.columnList[Sigma.U.getCellIndex(colNoIdTd)];
      }else {
        if(Sigma.$type(colNoIdTd)=="object"){
          return colNoIdTd;
        }else {
          return this.columnMap[colNoIdTd];
        }
      }
    }
  },getCellValue:function(colNoIdTd,recordOrRowNo){
    var colObj=this.getColumn(colNoIdTd);
    var record=this.getRecord(recordOrRowNo);
    var vl=record?record[colObj.fieldIndex]:null;
    return vl;
  },getColumnValue:function(colNoIdTd,recordOrRowNo){
    return this.getCellValue(colNoIdTd,recordOrRowNo);
  },getDeletedRecords:function(){
    return Sigma.$array(this.dataset.deletedRecords);
  },getDisplayColumns:function(display){
    var cs=[];
    for(var cn=0;cn<this.columnList.length;cn++){
      var col=this.columnList[cn];
      if(col.hidden!==(display!==false)){
        cs.push(col);
      }
    }
    return cs;
  },getEventTargets:function(event,el){
    el=el||Sigma.U.getEventTarget(event);
    var row=null,colNo=-1,rowNo=-1,column=null,record=null,value=null;
    var cell=Sigma.U.getParentByTagName("td",el,event);
    if(cell){
      row=cell.parentNode;
      colNo=Sigma.U.getCellIndex(cell);
      rowNo=row.rowIndex;
      column=this.columnList[colNo];
      record=this.getRecordByRow(row)||{};
      value=record[column.fieldIndex];
    }
    return {cell:cell,row:row,colNo:colNo,rowNo:rowNo,column:column,record:record,value:value,eventTarget:el};
  },getInsertedRecords:function(){
    return Sigma.$array(this.dataset.insertedRecords);
  },getRecord:function(rowNoTdTr){
    var rowNo;
    if(Sigma.U.isNumber(rowNoTdTr)){
      rowNo=rowNoTdTr;
    }else {
      if(Sigma.U.getTagName(rowNoTdTr)=="TD"){
        return this.getRecordByRow(rowNoTdTr.parentNode);
      }else {
        if(Sigma.U.getTagName(rowNoTdTr)=="TR"){
          return this.getRecordByRow(rowNoTdTr);
        }else {
          if(Sigma.$type(rowNoTdTr,"object")&&!rowNoTdTr.tagName){
            return rowNoTdTr;
          }else {
            if(this.selectedRows.length>0){
              rowNo=this.selectedRows[this.selectedRows.length-1].getAttribute(Sigma.Const.DataSet.INDEX)/1;
            }else {
              rowNo=0;
            }
          }
        }
      }
    }
    return this.dataset.getRecord(rowNo);
  },getSelectedRecords:function(){
    var rs=[];
    for(var i=0;i<this.selectedRows.length;i++){
      rs.push(this.getRecordByRow(this.selectedRows[i]));
    }
    return rs;
  },getUpdatedRecords:function(){
    return Sigma.$array(this.dataset.updatedRecords);
  },hideCellToolTip:function(){
    if(this.toolTipDiv){
      this.toolTipDiv.style.display="none";
      this.gridEditorCache.appendChild(this.toolTipDiv);
      this.toolTipDiv.innerHTML="";
    }
  },hideDialog:function(){
    this.activeDialog&&this.activeDialog.hide();
    this.activeDialog=null;
  },hideMask:function(){
    if(this.gridMask){
      this.gridMask.style.cursor="auto";
      this.gridMask.style.display="none";
    }
    this.pageSizeSelect&&(this.pageSizeSelect.style.visibility="inherit");
  },insert:function(record,startEdit){
    record=record||this.cloneDefaultRecord()||(this.dataset.getRecordType()=="array"?[]:{});
    if(Sigma.$invoke(this,"beforeInsert",[record])!==false){
      this.dataset.insertRecord(record);
      record[Sigma.Const.DataSet.NOT_VAILD]=true;
      var rowId=this.rowKey+this.getUniqueField(record);
      record[Sigma.Const.DataSet.ROW_KEY]=rowId;
      var newTRS=this.renderInsertedRow(record);
      this.bodyDiv.scrollTop=this.bodyDiv.scrollHeight;
      this.rowNum++;
      if(startEdit!==false){
        var cn=0;
        var e1=-1;
        for(cn=0;cn<this.columnList.length;cn++){
          var colObj=this.columnList[cn];
          if(e1<0&&!colObj.hidden&&colObj.editor){
            e1=cn;
          }
          if(colObj.frozen&&newTRS[1]){
            var colL=newTRS[0].cells[cn].cloneNode(true);
            newTRS[1].appendChild(colL);
          }
        }
      }else {
      }
      this.syncScroll();
    }
    this.toggleEmptyRow();
  },printGrid:function(){
    var grid=this,docT;
    grid.closeGridMenu();
    grid.showWaiting();
    var printCssText=[" body { margin :5px;padding:0px;}",".gt-table { width:100%;border-left:1px solid #000000 ; border-top:1px solid #000000; }",".gt-table TD { font-size:12px;padding:2px; border-right:1px solid #000000 ; border-bottom:1px solid #000000; }",".gt-hd-row TD { padding:3px; border-bottom:2px solid #000000 ;background-color:#e3e3e3; white-space:nowrap;word-break:keep-all;word-wrap:normal; }",".gt-hd-hidden { }",".gt-row-even {\tbackground-color:#f6f6f6; }"];
    printCssText.push(this.getHiddenColumnStyle("printable"));
    grid.customPrintCss&&printCssText.push(grid.customPrintCss);
    printCssText=printCssText.join("\n");
    var gridHTML=grid.getGridHTML();
    var focused=Sigma.doc.activeElement;
    function printBody(_doc){
      _doc.writeln("<style>");
      _doc.writeln(printCssText);
      _doc.writeln("</style>");
      _doc.writeln(gridHTML);
      _doc.close();
    }
    if(Sigma.isIE||Sigma.isGecko||Sigma.isSafari){
      docT=grid.gridIFrame.contentWindow.document;
      printBody(docT);
      grid.gridIFrame.contentWindow.focus();
      grid.gridIFrame.contentWindow.print();
    }else {
      if(Sigma.isOpera){
        var pwin=window.open("");
        docT=pwin.document;
        printBody(docT);
        pwin.focus();
        Sigma.$thread(function(){
          pwin.print();
          Sigma.$thread(function(){
            pwin.close();
          },2000);
        });
      }
    }
    Sigma.$thread(function(){
      grid.hideWaiting();
    },1000);
  },refresh:function(data){
    if(this.dataset&&data){
      this.dataset.setData(data);
    }
    var grid=this;
    var l=grid.scrollLeft,t=grid.scrollTop;
    if(grid.remotePaging===false){
      grid.dataset.startRecordNo=(grid.getPageInfo().startRowNum||1)-1;
    }
    function _refresh(){
      if(Sigma.$invoke(grid,"beforeRefresh",[grid])!==false){
        grid.cleanTable();
        !grid.remoteSort&&grid._doSort();
        grid.refreshGrid();
        grid.autoUpdateSortState&&grid.updateSortState();
        grid.sorting=false;
        grid.autoUpdateEditState&&grid.updateEditState();
        grid.updateCheckState();
        grid.autoUpdateFreezeState&&grid.updateFreezeState();
        grid.refreshToolBar();
        grid.syncScroll(l,t);
        Sigma.$invoke(grid,"afterRefresh",[grid]);
        grid._onComplete();
      }
    }
    Sigma.$thread(_refresh);
  },reload:function(recount,force){
    if(force!==false||!this.dataset||this.dataset.getSize()<0){
      this.load(recount,true);
    }else {
      this.refresh();
    }
  },render:function(container){
    if(!this.rendered){
      container=Sigma.getDom(container);
      this.container=container||this.container;
      this.initColumns();
      this.initCSS();
      this.createMain();
      this.createFormIFrame();
      this.createGridGhost();
      this.initToolbar();
      this.initMainEvent();
      this.createBody();
      this.rendered=true;
    }
    return this;
  },save:function(onNav){
    if(this.endEdit()===false){
      return ;
    }
    var url=this.saveURL;
    var _insert=this.getInsertedRecords();
    var _update=this.getUpdatedRecords();
    var _delete=this.getDeletedRecords();
    var hasModified=(_insert&&_insert.length>0||_update&&_update.length>0||_delete&&_delete.length>0);
    if(!onNav&&!hasModified){
      alert(this.getMsg("NO_MODIFIED"));
    }else {
      var rows=this.gridTable.tFoot?this.gridTable.tFoot.rows:[];
      for(var i=0,len=_insert.length;i<len;i++){
        var _ir=_insert[i];
        for(var cn=0;cn<this.columnList.length;cn++){
          var colObj=this.columnList[cn];
          if(colObj.editor){
            var value=_ir[colObj.fieldIndex];
            var cell=rows[i]?rows[i].cells[colObj.colIndex]:null;
            if(this.validValue(colObj,value,_ir,cell)!==true){
              return false;
            }
          }
        }
      }
      var reqParam=this.getSaveParam();
      reqParam[this.CONST.action]="save";
      reqParam[this.CONST.insertedRecords]=_insert;
      reqParam[this.CONST.updatedRecords]=_update;
      reqParam[this.CONST.deletedRecords]=_delete;
      if(Sigma.$invoke(this,"beforeSave",[reqParam,this])!==false){
        this.showWaiting();
        var grid=this;
        return this.request(url,reqParam,"json",function(_onNav){
          return function(response){
            grid.saveCallBack(response,reqParam,_onNav);
          };
        }(onNav),function(xhr,e){
          var er={};
          er[grid.CONST.exception]=" XMLHttpRequest Status : "+xhr.status;
          grid.saveFailure(er,e);
          grid.hideWaiting();
        });
      }
    }
    if(onNav===true){
      this.load();
    }
    return false;
  },setCellValue:function(colID,recordOrRowNo,newValue){
    var record=recordOrRowNo;
    if(Sigma.U.isNumber(record)){
      record=this.dataset.getRecord(record);
    }
    this.update(record,this.columnMap[colID].fieldName,newValue);
  },setColumnValue:function(colID,recordOrRowNo,newValue){
    return this.setCellValue(colID,recordOrRowNo,newValue);
  },setContent:function(respD){
    var pageInfo=this.getPageInfo();
    if(Sigma.$type(respD,"array")){
      respD[this.dataRoot]=respD;
    }else {
      respD[this.CONST.pageInfo]=respD[this.dataPageInfo||this.CONST.pageInfo];
      if(respD[this.CONST.recordType]){
        this.dataset.setRecordType(respD[this.CONST.recordType]);
      }
      if(respD[this.CONST.pageInfo]){
        Sigma.$extend(pageInfo,respD[this.CONST.pageInfo]);
      }
      pageInfo.totalRowNum=respD.totalRowNum||pageInfo.totalRowNum;
    }
    if(respD[this.dataRoot]&&Sigma.$invoke(this,"beforeDatasetUpdate",[respD[this.dataRoot]])!==false){
      pageInfo.totalRowNum=pageInfo.totalRowNum||respD[this.dataRoot].length;
      this.refresh(respD[this.dataRoot]);
    }else {
      this.refresh();
    }
  },showDialog:function(type){
    var grid=this;
    switch(type){
    case "filter":
      grid.filterDialog=grid.filterDialog||Sigma.createFilterDialog({title:grid.getMsg("DIAG_TITLE_FILTER"),gridId:grid.id});
      grid.filterDialog.show();
      break ;
    case "chart":
      var record=grid.activeCell?grid.getRecordByRow(grid.activeRow):grid.getRecord();
      if(!record){
        break ;
      }
      var date=[];
      var caption="";
      var w=300,h=300;
      if(record){
        grid.charDialog=grid.charDialog||new Sigma.Dialog({gridId:grid.id,container:grid.gridMask,id:"charDialog",width:w,height:h,autoRerender:true,title:grid.getMsg("DIAG_TITLE_CHART")});
        grid.charDialog.show();
        grid.chart=new Sigma.Chart({swfPath:grid.SigmaGridPath+"/flashchart/fusioncharts/charts/",width:w-3,height:h-23,container:grid.charDialog.bodyDiv});
        Sigma.$each(grid.columnList,function(colObj,i){
          if(colObj.chartCaption){
            caption=colObj.chartCaption.replace("{@}",record[colObj.fieldIndex]);
          }
          if(colObj.inChart){
            date.push([colObj.header||colObj.title,record[colObj.fieldIndex],colObj.chartColor||"66bbff"]);
          }
        });
        grid.chart.caption=grid.chartCaption;
        grid.chart.subCaption=caption;
        grid.chart.data=date;
        grid.chart.generateChart();
      }
      break ;
    }
  },showMask:function(trp){
    if(trp||this.transparentMask){
      Sigma.U.addClass(this.gridMask,"gt-transparent");
    }else {
      Sigma.U.removeClass(this.gridMask,"gt-transparent");
    }
    this.gridMask&&(this.gridMask.style.display="block");
    this.pageSizeSelect&&(this.pageSizeSelect.style.visibility="hidden");
  },showWaiting:function(){
    this.showMask();
    if(this.gridWaiting&&!this.transparentMask){
      this.gridWaiting.style.display="block";
    }
    this.isWaiting=true;
  },hideWaiting:function(){
    if(this.gridWaiting){
      this.gridWaiting.style.display="none";
    }
    this.hideMask();
    this.isWaiting=false;
  },getFilterInfo:function(){
    return this.filterInfo||[];
  },setFilterInfo:function(fi){
    this.filterInfo=fi||[];
  },applyFilter:function(filterInfo){
    this.filterInfo=filterInfo||this.filterInfo||[];
    if(this.remoteFilter){
      this.reload();
      return ;
    }
    this.dataProxyBak=this.dataset.dataProxy;
    this.filterDataProxy=this.dataset.filterData(this.filterInfo);
    if(!this.remoteFilter&&this.justShowFiltered){
      this.dataset.dataProxy=this.filterDataProxy;
      this.refresh();
    }
    if(this.afterFilter){
      this.afterFilter(this.filterDataProxy);
    }
    if(this.tools.filterTool){
      if(this.filterInfo.length>0){
        Sigma.U.addClass(this.tools.filterTool.itemIcon,"gt-tool-filtered");
      }else {
        Sigma.U.removeClass(this.tools.filterTool.itemIcon,"gt-tool-filtered");
      }
    }
    return this.filterDataProxy;
  },setDimension:function(newWidth,newHeight,isInit){
    var grid=this;
    var cWH=[this.gridDiv.offsetWidth,this.gridDiv.offsetHeight];
    newWidth=""+newWidth;
    newHeight=""+newHeight;
    this.width=newWidth;
    this.height=newHeight;
    if(newWidth.toLowerCase()=="auto"){
      this.width=cWH[0]+"px";
    }else {
      if(newWidth.indexOf("%")<1&&newWidth.indexOf("px")<1){
        this.width=Sigma.U.parseInt(newWidth)+"px";
      }
    }
    if(newHeight.toLowerCase()=="auto"){
      this.height=cWH[1]+"px";
    }else {
      if(newHeight.indexOf("%")<1&&newHeight.indexOf("px")<1){
        this.height=Sigma.U.parseInt(newHeight)+"px";
      }
    }
    var _hideOverflow=false;
    if((newHeight.indexOf("%")>1||newWidth.indexOf("%")>1)&&this.monitorResize){
      _hideOverflow=true;
    }
    if(_hideOverflow){
      if(Sigma.isIE){
        this.gridDiv.style.overflowY="hidden";
      }else {
        if(Sigma.isOpera){
          this.gridDiv.style.overflow="hidden";
        }
      }
    }
    grid._onResize(isInit);
  },getDimension:function(){
    return {width:this.width,height:this.height};
  },getSkin:function(){
    return this.skin;
  },setSkin:function(skin){
    if(this.skin==skin){
      return ;
    }
    this.skin=skin;
    Sigma.Grid.changeSkin(this,skin);
  },getPageInfo:function(refresh){
    return refresh?this.navigator.refreshState():this.navigator.pageInfo;
  },setPageInfo:function(pageInfo){
    Sigma.$extend(this.getPageInfo(),pageInfo);
  },gotoPage:function(pageIdx){
    Sigma.$chk(pageIdx)&&(this.getPageInfo().pageNum=pageIdx);
    if(this.autoSaveOnNav){
      this.save(true);
    }else {
      this.load();
    }
  },forEachRow:function(fn){
    var rows=this.getRows();
    for(var i=0,len=rows.length;i<len;i++){
      var row=rows[i];
      var record=this.getRecordByRow(row);
      fn(row,record,i,this);
    }
  },moveColumn:function(oldIndex,newIndex,ifreeze){
    if(oldIndex==newIndex){
      return ;
    }
    var grid=this;
    var colNum=this.columnList.length;
    var minCol=ifreeze!==true&&this.freezeHeadDiv.style.display=="block"?this.frozenColumnList.length:0;
    newIndex=newIndex<minCol?minCol:newIndex;
    var after=false,i;
    if(newIndex>=colNum){
      newIndex=colNum-1;
      newIndex^=oldIndex;
      oldIndex^=newIndex;
      newIndex^=oldIndex;
      after=true;
    }
    var rows=this.getAllRows();
    Sigma.U.insertNodeBefore(this.columnList[oldIndex].headCell,this.columnList[newIndex].headCell);
    for(i=0;i<rows.length;i++){
      Sigma.U.insertNodeBefore(rows[i].cells[oldIndex],rows[i].cells[newIndex]);
    }
    Sigma.U.moveItem(this.columnList,oldIndex,newIndex);
    for(i=0;i<colNum;i++){
      this.columnList[i].colIndex=i;
    }
  },sortGrid:function(sortInfo){
    this.sortInfo=sortInfo||this.sortInfo;
    if(this.remoteSort){
      this.reload();
    }else {
      this.refresh();
    }
  },getCell:function(rowNo,colIdxOrId){
    var col=this.getColumn(colIdxOrId);
    var row=this.getRow(rowNo);
    return row.cells[col.getColumnIndex()];
  },focusCell:function(cell){
    if(cell&&!this.isGroupRow(cell)){
      this.closeGridMenu();
      var _change=cell!=this.activeCell;
      if(_change){
        Sigma.U.removeClass(this.activeCell,"gt-cell-actived"+(this.activeEditor?"-editable":""));
        this.syncTwinRowCell(null,this.activeCell);
      }
      this.syncActiveObj(cell);
      _change&&Sigma.U.addClass(this.activeCell,"gt-cell-actived"+(this.activeEditor?"-editable":""));
      if(this.activeColumn&&this.activeRecord){
        this.activeValue=this.activeRecord[this.activeColumn.fieldIndex];
      }
      this.scrollGrid();
      this.syncTwinRowCell(null,this.activeCell);
    }else {
      this.cleanActiveObj();
    }
    return cell;
  },editCell:function(cell){
    this.focusCell(cell);
    this.syncActiveObj(cell);
    this.startEdit();
  },refreshRow:function(row,record){
    row=this.getRow(row);
    record=record||this.getRecordByRow(row);
    var rowNo=row.getAttribute(Sigma.Const.DataSet.INDEX)/1;
    this.dataset.initValues(record,rowNo,this.dataset);
    for(var i=0;i<row.cells.length;i++){
      var colObj=this.getColumn(i);
      if(colObj!=this.activeColumn&&colObj.syncRefresh===false){
        continue ;
      }
      var cell=row.cells[i];
      var changed=false;
      cell.firstChild.innerHTML=colObj.renderer(record[colObj.fieldIndex],record,colObj,this,i,rowNo);
    }
  },checkRow:function(row,checked){
    row=this.getTwinRows(row)[0];
    for(var i=0;i<row.cells.length;i++){
      var colObj=this.getColumn(i);
      if(colObj.isCheckColumn){
        var el=row.cells[i].firstChild.firstChild;
        if(Sigma.U.getTagName(el)=="INPUT"&&el.type=="checkbox"&&Sigma.U.hasClass(el,"gt-f-check")){
          if(el.checked!==checked){
            el.checked=checked;
            if(this.selectRowByCheck){
              this.selectRow(row,checked);
            }
            checked?this.checkedRows[el.value]=true:delete this.checkedRows[el.value];
          }
          return ;
        }
      }
    }
  }};
Sigma.Grid=Sigma.$class(Sigma.GridDefault);
Sigma.$extend(Sigma.Grid,{isSelectedRow:function(row){
    return Sigma.U.hasClass(row,"gt-row-selected");
  },handleOverRowCore:function(evt,grid,row){
    if(!row||grid.overRow==row){
      grid.changingStyle=false;
      return ;
    }
    grid.changingStyle=true;
    if(grid.overRow){
      grid.overRow.className=grid.overRow.className.replace(" gt-row-over","");
    }
    row.className+=" gt-row-over";
    grid.overRow=row;
    grid.changingStyle=false;
    return row;
  },handleOverRow:function(evt,grid,el){
    evt=evt||window.event;
    var row=Sigma.U.getParentByTagName("tr",null,evt);
    if(grid.isEmptyRow(row)){
      return ;
    }
    if(el==grid.freezeBodyDiv&&row){
      var rowC=grid.getRow(row.rowIndex);
      Sigma.Grid.handleOverRowCore(evt,grid,rowC);
      grid.overRowF=row;
    }else {
      Sigma.Grid.handleOverRowCore(evt,grid,row);
    }
  },startGridResize:function(evt,grid){
    evt=evt||window.event;
    grid=Sigma.$grid(grid);
    grid.closeGridMenu();
    grid.isGridResizing=true;
    grid.resizeButton.style.cursor=grid.gridGhost.style.cursor="se-resize";
    grid.syncLeftTop();
    grid.gridGhost.style.top=grid.top+Sigma.doc.body.scrollTop+"px";
    grid.gridGhost.style.left=grid.left+Sigma.doc.body.scrollLeft+"px";
    var ow=grid.gridDiv.offsetWidth,oh=grid.gridDiv.offsetHeight;
    grid.gridGhost.cx=evt.clientX-ow;
    grid.gridGhost.cy=evt.clientY-oh;
    grid.gridGhost.style.width=ow+"px";
    grid.gridGhost.style.height=oh+"px";
    grid.gridGhost.style.display="block";
  },endGridResize:function(evt,grid){
    var newWidth=Sigma.U.parseInt(grid.gridGhost.style.width)+"px";
    var newHeight=Sigma.U.parseInt(grid.gridGhost.style.height)+"px";
    grid.gridGhost.style.cursor="auto";
    grid.gridMask.style.display=grid.gridGhost.style.display="none";
    grid.isGridResizing=false;
    grid.setDimension(newWidth,newHeight);
  },startColumnResize:function(evt,colObj){
    evt=evt||window.event;
    if(colObj.resizable===false){
      return ;
    }
    var grid=colObj.grid;
    grid.mouseDown=true;
    if(evt.ctrlKey){
      return ;
    }
    grid.isColumnResizing=true;
    grid.closeGridMenu();
    grid.showMask(true);
    grid.headDiv.style.cursor=grid.gridMask.style.cursor="col-resize";
    grid.resizeColumnId=colObj.id;
    var mX=Sigma.U.getPageX(evt);
    colObj.oldRightX=mX-grid.viewportXY[0];
    grid.separateLineMinX=colObj.oldRightX+colObj.minWidth-colObj.headCell.offsetWidth;
    if(grid.separateLine){
      grid.separateLine.style.left=colObj.oldRightX+"px";
      grid.separateLine.style.height=grid.viewport.offsetHeight-2+"px";
      grid.separateLine.style.display="block";
    }
    if(grid.columnMoveS){
      grid.columnMoveS.style.left=colObj.headCell.offsetLeft+((Sigma.isFF2||Sigma.isFF1)?0:grid.tableMarginLeft)+"px";
      grid.columnMoveS.style.display="block";
    }
  },startColumnMove:function(evt,colObj){
    evt=evt||window.event;
    var grid=colObj.grid;
    grid.mouseDown=true;
    if(!evt.ctrlKey||grid.frozenColumnList[colObj.getColumnIndex()]){
      return ;
    }
    grid.closeGridMenu();
    var mX=Sigma.U.getPageX(evt);
    var left=colObj.headCell.offsetLeft;
    grid.columnMoveS.setAttribute("newColIndex",null);
    var _hg=grid.headerGhost;
    _hg.setAttribute("colIndex",colObj.getColumnIndex());
    _hg.setAttribute("offsetX2",left-mX);
    _hg.style.left=left+((Sigma.isFF2||Sigma.isFF1)?0:grid.tableMarginLeft)+"px";
    _hg.style.width=colObj.headCell.offsetWidth-1+"px";
    _hg.style.display="block";
    _hg.innerHTML='<span style="padding-left:2px;" >'+Sigma.$getText(colObj.headCell)+"</span>";
  },doDocGridHandler:function(evt,grid){
    evt=evt||window.event;
    var mX=Sigma.U.getPageX(evt);
    if(grid.separateLine&&grid.separateLine.style.display=="block"){
      var cX=mX-grid.viewportXY[0];
      cX=cX>grid.separateLineMinX?cX:grid.separateLineMinX;
      grid.separateLine.style.left=cX+"px";
    }else {
      if(!grid.customHead&&grid.headerGhost&&grid.headerGhost.style.display=="block"){
        var dX=mX-grid.viewportXY[0]+grid.headDiv.scrollLeft;
        grid.headerGhost.style.left=mX+((Sigma.isFF2||Sigma.isFF1)?0:grid.tableMarginLeft)+grid.headerGhost.getAttribute("offsetX2")/1+"px";
        var sLeft=-1;
        var idx=-1;
        for(var i=0;i<grid.headFirstRow.cells.length;i++){
          var cell=grid.headFirstRow.cells[i];
          if(dX>cell.offsetLeft&&dX<cell.offsetLeft+cell.offsetWidth){
            sLeft=cell.offsetLeft;
            idx=i;
            break ;
          }
        }
        if(dX<=cell.offsetLeft){
          i=0;
        }
        if(sLeft>=0){
          grid.columnMoveS.style.left=sLeft+((Sigma.isFF2||Sigma.isFF1)?0:grid.tableMarginLeft)+"px";
          grid.columnMoveS.style.display="block";
        }else {
          grid.columnMoveS.style.display="none";
        }
        grid.columnMoveS.setAttribute("newColIndex",idx);
      }else {
        if(grid.isGridResizing){
          var newWidth=evt.clientX-grid.gridGhost.cx;
          var newHeight=evt.clientY-grid.gridGhost.cy;
          newWidth=newWidth<grid.minWidth?grid.minWidth:newWidth;
          newHeight=newHeight<grid.minHeight?grid.minHeight:newHeight;
          grid.gridGhost.style.width=newWidth+"px";
          grid.gridGhost.style.height=newHeight+"px";
        }
      }
    }
  },endDocGridHandler:function(evt,grid){
    evt=evt||window.event;
    grid=Sigma.$grid(grid);
    var mX=Sigma.U.getPageX(evt);
    grid.mouseDown=false;
    if(grid.separateLine&&grid.separateLine.style.display=="block"){
      var colObj=grid.columnMap[grid.resizeColumnId];
      colObj.newRightX=mX-grid.viewportXY[0];
      var dwidth=colObj.newRightX-colObj.oldRightX;
      var newWidth=dwidth+parseInt(colObj.width);
      colObj.setWidth(newWidth);
      grid.resizeColumnId=-1;
      grid.separateLine.style.display=grid.columnMoveS.style.display="none";
      grid.headDiv.style.cursor="auto";
      grid.hideMask();
      grid.syncScroll();
      if(!Sigma.isOpera){
        grid.isColumnResizing=false;
      }
      Sigma.$invoke(grid,"afterColumnResize",[colObj,newWidth,grid]);
    }else {
      if(!grid.customHead&&grid.headerGhost&&grid.headerGhost.style.display=="block"){
        var dX=Sigma.isIE?evt.x:evt.pageX;
        var newIndex=grid.columnMoveS.getAttribute("newColIndex");
        var oldIndex=grid.headerGhost.getAttribute("colIndex");
        if(newIndex!==null&&(newIndex+"").length>0&&oldIndex!==null&&(oldIndex+"").length>0){
          newIndex=newIndex/1;
          if(newIndex<0){
            newIndex=grid.columnList.length;
          }
          if(Sigma.$invoke(grid,"beforeColumnMove",[oldIndex/1,newIndex/1,grid])!==false){
            grid.moveColumn(oldIndex/1,newIndex/1);
            grid.syncScroll();
          }
        }
        grid.columnMoveS.style.display="none";
        grid.columnMoveS.setAttribute("newColIndex",null);
        grid.headerGhost.style.display="none";
        grid.headerGhost.setAttribute("colIndex",null);
        grid.headerGhost.style.cursor="auto";
      }else {
        if(grid.isGridResizing){
          Sigma.Grid.endGridResize(evt,grid);
        }
      }
    }
  },changeSkin:function(grid,skinName){
    grid=Sigma.$grid(grid);
    var classNames=grid.gridDiv.className.split(" ");
    for(var i=0;i<classNames.length;i++){
      if(classNames[i].indexOf(Sigma.Const.Grid.SKIN_CLASSNAME_PREFIX)===0){
        classNames[i]="";
      }
    }
    classNames.push(Sigma.Const.Grid.SKIN_CLASSNAME_PREFIX+skinName);
    grid.gridDiv.className=classNames.join(" ");
  },createCheckColumn:function(grid,cfg){
    var id=cfg.id;
    grid=Sigma.$grid(grid);
    var gridId=grid.id;
    var checkValid=cfg.checkValid;
    var checkValue=cfg.checkValue;
    var checkType=cfg.checkType||"checkbox";
    if(!checkValue){
      checkValue=Sigma.$chk(cfg.fieldIndex)?'record["'+cfg.fieldIndex+'"];':"grid.getUniqueField(record);";
    }
    if(typeof checkValue=="string"){
      checkValue=new Function("value","record","col","grid","colNo","rowNo",["return ",checkValue].join(""));
    }
    if(!checkValid){
      checkValid=function(cvalue,value,record,colObj,_g,colNo,rowNo){
        return _g.checkedRows[cvalue];
      };
    }
    cfg.header="";
    cfg.title=cfg.title||grid.getMsg("CHECK_ALL");
    cfg.width=30;
    cfg.resizable=false;
    cfg.printable=false;
    cfg.sortable=false;
    var checkBoxName="gt_"+gridId+"_chk_"+id;
    cfg.hdRenderer=function(h,c,_g){
      return '<input type="'+checkType+'" class="gt-f-totalcheck" name="'+checkBoxName+'" />';
    };
    cfg.renderer=function(value,record,colObj,_g,colNo,rowNo){
      var cvalue=checkValue(value,record,colObj,_g,colNo,rowNo);
      var checkFlag=checkValid(cvalue,value,record,colObj,_g,colNo,rowNo)?'checked="checked"':"";
      return '<input type="'+checkType+'" class="gt-f-check" value="'+cvalue+'" '+checkFlag+' name="'+checkBoxName+'" />';
    };
    return cfg;
  }});
Sigma.Grid.prototype.initGrid=Sigma.Grid.prototype.render;
Sigma.$extend(Sigma.Grid,{render:function(grid){
    grid=Sigma.$grid(grid);
    return function(){
      grid.render();
    };
  },initColumnEvent:function(grid,colObj,headCell,sortIcon){
    headCell=headCell||colObj.headCell;
    if(!headCell){
      return ;
    }
    sortIcon=sortIcon||Sigma.Grid.getSortIcon(colObj,headCell);
    var menuButton=Sigma.U.nextElement(sortIcon);
    var separator=Sigma.U.nextElement(menuButton);
    colObj.hdTool=colObj.hdTool||Sigma.Grid.getHdTool(colObj,headCell);
    colObj.sortIcon=colObj.sortIcon||sortIcon;
    colObj.menuButton=colObj.menuButton||menuButton;
    colObj.separator=colObj.separator||separator;
    if(colObj.separator&&colObj.resizable===false){
      colObj.separator.style.display="none";
    }
    Sigma.U.addEvent(headCell,"mousedown",function(event){
      grid.activeMe();
      if(grid.endEdit()===false){
        return ;
      }
      grid.closeGridMenu();
      if(!grid.customHead){
        Sigma.U.stopEvent(event);
        Sigma.Grid.startColumnMove(event,colObj);
      }
    });
    Sigma.U.addEvent(headCell,"click",function(event){
      var et=Sigma.U.getEventTarget(event);
      if(!grid.isColumnResizing){
        Sigma.$invoke(grid,"onHeadClick",[event,headCell,colObj,grid]);
        if(Sigma.U.getTagName(et)=="INPUT"&&et.type=="checkbox"&&Sigma.U.hasClass(et,"gt-f-totalcheck")){
          Sigma.checkTotalBox(et,grid,colObj);
        }else {
          if(colObj.sortable&&et.className!="gt-hd-button"){
            grid.lastAction="sort";
            grid.sorting=true;
            var sortOrder=colObj.sortOrder=="asc"?"desc":(colObj.sortOrder=="desc"&&colObj.enableDefaultSort?"defaultsort":"asc");
            var si=grid.createSortInfo(colObj);
            si.sortOrder=sortOrder;
            grid.addSortInfo(si);
            grid.sortGrid();
          }
        }
      }
      if(Sigma.isOpera){
        grid.isColumnResizing=false;
      }
    });
    if(colObj.resizable){
      separator.colID=colObj.id;
      separator.style.cursor="col-resize";
      Sigma.U.addEvent(separator,"mousedown",function(event){
        grid.activeMe();
        Sigma.U.stopEvent(event);
        Sigma.Grid.startColumnResize(event,colObj);
      });
    }
    if(!colObj.sortable&&!colObj.resizable&&colObj.hdTool){
      colObj.hdTool.style.display="none";
    }
  },getHdTool:function(colObj,headCell){
    var tempEl=Sigma.U.firstChildElement(headCell||colObj.headCell);
    return Sigma.U.lastChildElement(tempEl);
  },getSortIcon:function(colObj,headCell){
    var tempEl=Sigma.Grid.getHdTool(colObj,headCell);
    return Sigma.U.firstChildElement(tempEl);
  },mappingRenderer:function(mapping,defaultText){
    return function(cellValue){
      return mapping[cellValue]||(defaultText===undefined||defaultText===null?cellValue:defaultText);
    };
  },findGridByElement:function(obj){
    var tagName="DIV";
    var className="gt-grid";
    var gridId="";
    while((obj=obj.parentNode)){
      if(Sigma.U.getTagName(obj)==tagName&&Sigma.U.hasClass(obj,className)){
        gridId=obj.id;
        break ;
      }
    }
    if(gridId.indexOf("_div")===gridId.length-4){
      gridId=gridId.substring(0,gridId.length-4);
    }
    return Sigma.$grid(gridId);
  }});
var Ext=Ext||null;
(Ext&&Ext.reg)&&(Ext.reg("gtgrid",Sigma.Grid));
Sigma.checkOneBox=function(chkbox,grid,chk){
  grid=Sigma.$grid(grid);
  chkbox=Sigma.$(chkbox);
  if(chkbox.checked==chk){
    return chk;
  }
  var cell=Sigma.U.getParentByTagName("td",chkbox);
  var row=cell.parentNode;
  var mrow=grid.getTwinRows(row)[0];
  if(chk===true||chk===false){
    if(Sigma.$invoke(this,"onRowCheck",[mrow,chk,grid])===false){
      return !!chkbox.checked;
    }
    chkbox.checked=chk;
  }
  if(chkbox.checked){
    grid.checkedRows[chkbox.value]=true;
    if(grid.selectRowByCheck){
      grid.selectRow(mrow,true);
    }
  }else {
    delete grid.checkedRows[chkbox.value];
    if(grid.selectRowByCheck){
      grid.selectRow(mrow,false);
    }
  }
  return !!chkbox.checked;
};
Sigma.checkTotalBox=function(chkbox,grid,colObj,chk){
  grid=Sigma.$grid(grid);
  chkbox=Sigma.$(chkbox);
  if(chk!==null&&chk!==undefined){
    chkbox.checked=chk;
  }
  var htd=Sigma.U.getParentByTagName("td",chkbox);
  var cellIdx=Sigma.U.getCellIndex(htd);
  var checked=chkbox.checked;
  var rows=colObj.frozen?grid.getAllFreezeRows():grid.getAllRows();
  for(var i=0,j=rows.length;i<j;i++){
    var row=rows[i];
    var cell=row.cells[cellIdx];
    if(cell){
      var _chk=cell.getElementsByTagName("input")[0];
      Sigma.checkOneBox(_chk,grid,checked);
    }
  }
};
Sigma.initGlobalEvent=function(){
  if(Sigma.initGlobalEvent.inited){
    return ;
  }
  var d=Sigma.isIE?Sigma.doc.body:Sigma.doc;
  Sigma.U.addEvent(d,"mousemove",function(event){
    Sigma.activeGrid&&Sigma.Grid.doDocGridHandler(event,Sigma.activeGrid);
  });
  Sigma.U.addEvent(d,"mouseup",function(event){
    Sigma.activeGrid&&Sigma.Grid.endDocGridHandler(event,Sigma.activeGrid);
  });
  Sigma.U.addEvent(d,"click",function(event){
    Sigma.activeGrid&&(Sigma.activeGrid.endEdit()||Sigma.activeGrid.closeGridMenu());
  });
  Sigma.U.addEvent(d,"keydown",function(event){
    if(Sigma.activeGrid){
      if(Sigma.$invoke(Sigma.activeGrid,"onKeyDown",[event])!==false){
        Sigma.activeGrid._onKeydown(event);
      }
    }
  });
  Sigma.initGlobalEvent.inited=true;
};
jQuery.fn.sigmaGrid=function(options){
  var sel=this.selector,id=this.attr("id");
  if(!this.length&&sel){
    id=sel.indexOf("#")>-1?(sel.substr(1)||options.id):"";
  }
  var grid=new Sigma.Grid(jQuery.extend(options,{id:id}));
  Sigma.Grid.render(grid)();
  return grid;
};
Sigma.ColumnDefault={CLASS_PREFIX:".",destroyList:["sortIcon","hdTool","menuButton","separator","frozenSortIcon","frozenHdTool","frozenHeadCell","headCell","firstCell"],id:0,fieldName:null,width:120,minWidth:45,header:null,styleClass:null,align:"left",headAlign:"left",emptyText:"",sortable:true,resizable:true,moveable:true,editable:true,hideable:true,freezeable:true,groupable:true,filterable:true,printable:true,exportable:true,sortOrder:null,enableDefaultSort:false,hidden:false,frozen:false,toolTip:false,beforEdit:null,afterEdit:null,renderer:function(value,record,col,grid,colNo,rowNo){
    return value!==null&&value!==undefined?value:col.emptyText;
  },hdRenderer:function(header,cobj){
    return header;
  },editor:null,fieldIndex:0,gridId:null,filterField:null,newValue:null,cellAttributes:"",getSortValue:null,sortFn:null,format:null,syncRefresh:true,expression:null,isExpend:false,initialize:function(options,idx){
    var Me=this;
    if(Sigma.$type(options,"string")){
      this.id=options;
    }else {
      Sigma.$extend(this,options);
    }
    this.id=this.id||encodeURIComponent(this.header);
    this.header=this.header||this.id;
    this.fieldName=this.fieldName||this.fieldIndex||this.id;
    this.fieldIndex=this.fieldIndex||this.fieldName||this.id;
    this.CLASS_PREFIX=".gt-grid "+this.CLASS_PREFIX;
  },destroy:function(){
    if(this.editor&&this.editor.destroy){
      this.editor.destroy();
    }
    this.editor=null;
    Sigma.$each(this.destroyList,function(k,i){
      Sigma.U.removeNode(this[k]);
      this[k]=null;
    });
  },getColumnIndex:function(){
    return this.colIndex;
  },setWidth:function(newWidth){
    var grid=this.grid;
    newWidth=newWidth<this.minWidth?this.minWidth:newWidth;
    this.width=newWidth+"px";
    Sigma.U.CSS.updateRule(this.CLASS_PREFIX+this.styleClass,"width",(newWidth+grid.cellWidthFix)+"px");
    Sigma.U.CSS.updateRule(this.CLASS_PREFIX+this.innerStyleClass,"width",(newWidth+grid.innerWidthFix)+"px");
  },setHeader:function(header){
    this.header=header;
    var div=this.headCell.getElementsByTagName("div")[0];
    if(div){
      var span=div.getElementsByTagName("span")[0]||div;
      span.innerHTML=header;
    }
  },rerender:function(){
    if(!this.grid.renderHiddenColumn){
      this.grid.kickHeader();
      this.grid.refresh();
    }
  },hide:function(){
    if(this.frozen){
      return false;
    }
    Sigma.U.CSS.updateRule(this.CLASS_PREFIX+this.styleClass,"display","none");
    this.hidden=true;
    this.rerender();
  },show:function(){
    if(this.frozen){
      return false;
    }
    Sigma.U.CSS.updateRule(this.CLASS_PREFIX+this.styleClass,"display","");
    this.hidden=false;
    this.rerender();
  },toggle:function(){
    return this.hidden?this.show():this.hide();
  },group:function(grouped){
    if(grouped!==false){
      grouped=true;
    }
    this.grouped=grouped;
    this.grid.refresh();
  },ungroup:function(){
    this.group(false);
  },freezeCell:function(row,freezeTable,freezeRow,rowNo,colNo,cellTemplate,grid,isHead){
    if(!grid.hasIndexColumn){
      freezeRow=row.cloneNode(false);
      freezeRow.id="";
      freezeRow.appendChild(cellTemplate.cloneNode(true));
      freezeTable.appendChild(freezeRow);
    }
    var colL=row.cells[colNo].cloneNode(true);
    freezeRow.appendChild(colL);
    if(isHead&&rowNo===0){
      this.frozenHeadCell=colL;
      this.frozenSortIcon=Sigma.Grid.getSortIcon(this,this.frozenHeadCell);
      this.frozenHdTool=Sigma.Grid.getHdTool(this,this.frozenHeadCell);
      if(!Sigma.isIE){
        Sigma.Grid.initColumnEvent(grid,this,this.frozenHeadCell,this.frozenSortIcon);
      }
    }
  },freeze:function(always){
    var grid=this.grid;
    var colNo=this.getColumnIndex();
    if(!always&&colNo<grid.frozenColumnList.length){
      return false;
    }
    var rows=grid.headTable.tBodies[0].rows;
    var freezeRows=grid.freezeHeadTable.tBodies[0].rows;
    var headCellTemplate,cellTemplate,i;
    var indexColumnWidth=10;
    if(!grid.hasIndexColumn){
      headCellTemplate=Sigma.T_G.freezeHeadCell(grid,indexColumnWidth,null);
      cellTemplate=Sigma.T_G.freezeBodyCell(grid,indexColumnWidth,null);
    }
    for(i=0;i<rows.length;i++){
      this.freezeCell(rows[i],grid.freezeHeadTable.tBodies[0],freezeRows[i],i,colNo,headCellTemplate,grid,true);
    }
    if(grid.rowNum<1){
    }
    grid.isEmptyfreezeZone=false;
    if(grid.overRow){
      grid.overRow.className=grid.overRow.className.replace(" gt-row-over","");
    }
    rows=grid.getAllRows();
    freezeRows=grid.freezeBodyTable.tBodies[0].rows;
    for(i=0;i<rows.length;i++){
      this.freezeCell(rows[i],grid.freezeBodyTable.tBodies[0],freezeRows[i],i,colNo,cellTemplate,grid);
    }
    if(!always){
      grid.moveColumn(colNo,grid.frozenColumnList.length);
      grid.frozenColumnList.push(this.id);
    }
    this.frozen=true;
    grid.freezeHeadDiv.style.display=grid.freezeBodyDiv.style.display="block";
    grid.freezeHeadDiv.style.height=grid.headDiv.offsetHeight+"px";
    grid.freezeBodyDiv.style.height=grid.bodyDiv.clientHeight+"px";
    if(!grid.hasIndexColumn){
      grid.freezeHeadDiv.style.left=grid.freezeBodyDiv.style.left=0-(indexColumnWidth+grid.cellWidthFix)+grid.freezeFixW+"px";
    }
    grid.hasIndexColumn=true;
    grid.syncScroll();
    Sigma.U.removeNode(headCellTemplate,cellTemplate);
  },unfreezeCell:function(freezeRows,colNoF){
    for(var i=0;i<freezeRows.length;i++){
      Sigma.U.removeNodeTree(freezeRows[i].cells[colNoF]);
    }
  },unfreeze:function(){
    var grid=this.grid;
    var colNo=this.getColumnIndex();
    if(!grid.frozenColumnList||colNo>=grid.frozenColumnList.length){
      return false;
    }
    this.frozenHeadCell=this.frozenHdTool=this.frozenSortIcon=null;
    grid.moveColumn(colNo,grid.frozenColumnList.length-1);
    grid.frozenColumnList.splice(colNo,1);
    var freezeRows=grid.freezeHeadTable.tBodies[0].rows;
    this.unfreezeCell(freezeRows,colNo+1);
    if(grid.rowNum<1){
    }
    freezeRows=grid.freezeBodyTable.tBodies[0].rows;
    this.unfreezeCell(freezeRows,colNo+1);
    this.frozen=false;
    if(grid.frozenColumnList.length<1){
      if(!grid.showIndexColumn){
        grid.freezeHeadDiv.style.display=grid.freezeBodyDiv.style.display="none";
      }
    }
    grid.syncScroll();
  }};
Sigma.Column=Sigma.$class(Sigma.ColumnDefault);
Sigma.Navigator=Sigma.$class({properties:function(){
    return {pageInfo:{pageSize:20,pageNum:1,totalRowNum:0,totalPageNum:1,startRowNum:0,endRowNum:0}};
  },inited:false,initialize:function(options){
    var pageInfo=options.pageInfo||{};
    delete options.pageInfo;
    Sigma.$extend(this,options);
    Sigma.$extend(this.pageInfo,pageInfo);
  },destroy:function(){
    var nav=this;
    var dList=["firstPageButton","prevPageButton","nextPageButton","lastPageButton","gotoPageButton"];
    Sigma.$each(dList,function(k,i){
      if(nav[k]&&nav[k].destroy){
        nav[k].destroy();
      }
      nav[k]=null;
    });
    Sigma.U.removeNode(this.pageInput);
    this.pageInput=null;
  },buildNavTools:function(){
    var grid=Sigma.$grid(this.gridId);
    this.firstPageButton=new Sigma.Button({container:grid.toolBar,cls:"gt-first-page",onclick:this.gotoFirstPage,onclickArgs:[this]});
    this.prevPageButton=new Sigma.Button({container:grid.toolBar,cls:"gt-prev-page",onclick:this.gotoPrevPage,onclickArgs:[this]});
    this.nextPageButton=new Sigma.Button({container:grid.toolBar,cls:"gt-next-page",onclick:this.gotoNextPage,onclickArgs:[this]});
    this.lastPageButton=new Sigma.Button({container:grid.toolBar,cls:"gt-last-page",onclick:this.gotoLastPage,onclickArgs:[this]});
    this.inited=true;
    if(!grid.loading){
      this.refreshState();
    }
  },createGotoPage:function(){
    var grid=Sigma.$grid(this.gridId);
    this.gotoPageButton=new Sigma.Button({container:grid.toolBar,cls:"gt-goto-page",onclick:this.gotoInputPage,onclickArgs:[this],text:grid.getMsg("GOTOPAGE_BUTTON_TEXT")});
    if(grid.toolBar){
      var text1,text2;
      this.pageInput=Sigma.$e("input",{type:"text",className:"gt-page-input"});
      var Me=this;
      Sigma.U.addEvent(this.pageInput,"keydown",function(event){
        var kcode=event.keyCode;
        if(kcode==Sigma.Const.Key.ENTER){
          Sigma.U.stopEvent(event);
          Me.gotoInputPage(event,Me);
        }
      });
      text1=Sigma.$e("div",{innerHTML:grid.getMsg("PAGE_BEFORE"),className:"gt-toolbar-text"});
      text2=Sigma.$e("div",{innerHTML:grid.getMsg("PAGE_AFTER"),className:"gt-toolbar-text"});
      grid.toolBar.appendChild(text1);
      grid.toolBar.appendChild(Sigma.Button.createToolComp(this.pageInput));
      grid.toolBar.appendChild(text2);
    }
  },refreshState:function(pageInfo,doCount){
    this.pageInfo=(pageInfo||this.pageInfo);
    var pInfo=this.pageInfo;
    if(doCount!==false){
      if(pInfo.totalRowNum<1){
        var grid=Sigma.$grid(this.gridId);
        pInfo.totalRowNum=grid.dataset.getSize();
      }
      pInfo.totalPageNum=Math.ceil(pInfo.totalRowNum/pInfo.pageSize);
      pInfo.pageNum=pInfo.pageNum>pInfo.totalPageNum?pInfo.totalPageNum:pInfo.pageNum;
      pInfo.pageNum=pInfo.pageNum<1?1:pInfo.pageNum;
      pInfo.startRowNum=(pInfo.pageNum-1)*pInfo.pageSize+1;
      pInfo.startRowNum=isNaN(pInfo.startRowNum)?1:pInfo.startRowNum;
      pInfo.endRowNum=pInfo.startRowNum/1+pInfo.pageSize/1-1;
      pInfo.endRowNum=pInfo.endRowNum>pInfo.totalRowNum?pInfo.totalRowNum:pInfo.endRowNum;
    }
    return pInfo;
  },refreshNavBar:function(pageInfo){
    this.pageInfo=(pageInfo||this.pageInfo);
    var pInfo=this.pageInfo;
    var grid=Sigma.$grid(this.gridId);
    if(this.inited){
      if(this.pageInput){
        this.pageInput.value=pInfo.pageNum;
        this.pageInput.maxLength=(""+pInfo.totalPageNum).length;
      }
      if(pInfo.pageNum==1){
        this.firstPageButton.disable();
        this.prevPageButton.disable();
      }else {
        this.firstPageButton.enable();
        this.prevPageButton.enable();
      }
      if(pInfo.pageNum==pInfo.totalPageNum){
        this.nextPageButton.disable();
        this.lastPageButton.disable();
      }else {
        this.nextPageButton.enable();
        this.lastPageButton.enable();
      }
    }
    if(grid&&grid.pageSizeSelect){
      grid.pageSizeList=!grid.pageSizeList||grid.pageSizeList.length<1?[grid.pageSize]:grid.pageSizeList;
      grid.pageSizeSelect.innerHTML="";
      Sigma.U.createSelect(Sigma.U.listToMap(grid.pageSizeList),this.pageInfo.pageSize,{},grid.pageSizeSelect);
    }
  },gotoPage:function(navObj,pageNum,lastAction){
    navObj=navObj||this;
    var oldPageNum=navObj.pageInfo.pageNum;
    var grid=Sigma.$grid(navObj.gridId);
    pageNum=(!pageNum||pageNum<1)?1:(pageNum>navObj.pageInfo.totalPageNum?navObj.pageInfo.totalPageNum:pageNum);
    if(Sigma.$invoke(grid,"beforeGotoPage",[pageNum,oldPageNum,navObj,grid])!==false){
      grid.lastAction=lastAction;
      grid.gotoPage(pageNum,oldPageNum);
    }
  },gotoInputPage:function(event,navObj){
    navObj.gotoPage(navObj,Sigma.U.parseInt(navObj.pageInput.value,navObj.pageInfo.pageNum),"gotoPage");
  },gotoFirstPage:function(event,navObj){
    navObj.gotoPage(navObj,1,"firstPage");
  },gotoPrevPage:function(event,navObj){
    navObj.gotoPage(navObj,navObj.pageInfo.pageNum-1,"prevPage");
  },gotoNextPage:function(event,navObj){
    navObj.gotoPage(navObj,navObj.pageInfo.pageNum+1,"nextPage");
  },gotoLastPage:function(event,navObj){
    navObj.gotoPage(navObj,navObj.pageInfo.totalPageNum,"lastPage");
  },refreshPage:function(event,navObj){
    navObj.gotoPage(navObj,navObj.pageInfo.pageNum,"refreshPage");
  }});
Sigma.BaseMenuItem=Sigma.$class({id:null,gridId:null,cls:null,type:null,onclickArgs:null,parentItem:null,reference:null,container:null,text:null,toolTip:null,itemBox:null,itemIcon:null,itemText:null,itemAfterIcon:null,subMenu:null,initialize:function(options){
    this.disabled=false;
    this.withSeparator=false;
    this.overShowSubMenu=true;
    this.onclick=Sigma.$empty;
    Sigma.$extend(this,options);
    this.toolTip=this.toolTip||this.text||"";
  },destroy:function(){
    if(this.subMenu){
      this.subMenu.destroy();
    }
    this.container=null;
    this.parentItem=null;
    if(this.separator){
      Sigma.U.removeNode(this.separator);
      this.separator=null;
    }
    Sigma.U.removeNode(this.itemIcon);
    this.itemIcon=null;
    Sigma.U.removeNode(this.itemText);
    this.itemText=null;
    Sigma.U.removeNode(this.itemAfterIcon);
    this.itemAfterIcon=null;
    Sigma.U.removeNode(this.itemBox);
    this.itemBox=null;
  },onclickAction:function(event,itemT){
    Sigma.activeGrid&&Sigma.activeGrid.endEdit();
    var hidden=itemT.subMenu?itemT.subMenu.hidden:false;
    if(itemT.parentItem){
      (itemT.parentItem.closeSubMenu)&&itemT.parentItem.closeSubMenu(event);
      if(itemT.parentItem.currenItem){
        Sigma.U.removeClass(itemT.parentItem.currenItem.itemBox,"gt-menu-activemenu");
      }
      itemT.parentItem.currenItem=itemT;
      Sigma.U.addClass(itemT.itemBox,"gt-menu-activemenu");
    }
    if(itemT.disabled||itemT.onclick.apply(itemT,[event].concat(itemT.onclickArgs||itemT))===false){
      Sigma.U.stopEvent(event);
      return ;
    }
    Sigma.U.stopEvent(event);
    if(itemT.type=="checkbox"){
      itemT.toggleCheck();
    }else {
      if(itemT.type=="radiobox"){
        var others=itemT.parentItem.itemList;
        for(var i=0;i<others.length;i++){
          if(others[i].type=="radiobox"&&others[i]!=itemT){
            others[i].uncheckMe();
          }
        }
        itemT.checkMe();
      }
    }
    if(itemT.subMenu){
      if(hidden){
        itemT.showMenu(event);
      }else {
        itemT.closeMenu(event);
      }
    }
  },closeSubMenu:Sigma.$empty,checkMe:function(){
    Sigma.U.removeClass(this.itemIcon,"gt-icon-unchecked");
    Sigma.U.addClass(this.itemIcon,"gt-icon-"+this.type);
    this.checked=true;
  },uncheckMe:function(){
    Sigma.U.removeClass(this.itemIcon,"gt-icon-"+this.type);
    Sigma.U.addClass(this.itemIcon,"gt-icon-unchecked");
    this.checked=false;
  },toggleCheck:function(){
    if(this.checked===true){
      this.uncheckMe();
    }else {
      this.checkMe();
    }
  },disable:function(){
    Sigma.U.addClass(this.itemBox,"gt-button-disable");
    this.disabled=true;
  },enable:function(){
    Sigma.U.removeClass(this.itemBox,"gt-button-disable");
    this.disabled=false;
  },getMenuPosition:function(){
    if(this.subMenu){
      return this.subMenu.position;
    }
    return null;
  },setMenuPosition:function(position){
    if(this.subMenu&&position){
      this.subMenu.position=position;
    }
  },showMenu:function(event){
    if(this.subMenu){
      if(!this.getMenuPosition()){
        this.setMenuPosition("R");
      }
      this.subMenu.show(event);
    }
  },toggleMenu:function(event){
    if(this.subMenu){
      if(!this.getMenuPosition()){
        this.setMenuPosition("R");
      }
      this.subMenu.toggle(event);
    }
  },closeMenu:function(event){
    var menu=this;
    while((menu=menu.subMenu)){
      menu.close(event);
    }
  },addMenuItems:function(menuItem,position){
    if(menuItem){
      if(!this.subMenu){
        this.subMenu=new Sigma.GridMenu({gridId:this.gridId,parentItem:this,reference:this.itemBox});
        this.itemAfterIcon&&Sigma.U.addClass(this.itemAfterIcon,"gt-menu-parent");
      }
      menuItem.gridId=this.gridId;
      this.setMenuPosition(position);
      this.subMenu.addMenuItems(menuItem);
    }
    return this;
  }});
Sigma.Button=Sigma.BaseMenuItem.extend({initialize:function(options){
    this.className="gt-image-button";
    this.clickClassName="gt-image-button-down";
    this._parent(options);
    if(!this.container){
      return ;
    }
    this.itemBox=Sigma.$e("a",{href:"javascript:void(0);return false;",className:this.className,title:this.toolTip});
    this.itemIcon=Sigma.$e("div",{className:this.cls});
    this.itemBox.appendChild(this.itemIcon);
    this.container.appendChild(this.itemBox);
    if(this.withSeparator){
      Sigma.Button.createSeparator(this.container);
    }
    var Me=this;
    Sigma.U.addEvent(Me.itemBox,"mousedown",function(event){
      if(!Me.disabled){
        Sigma.U.addClass(Me.itemBox,Me.clickClassName);
      }
    });
    Sigma.U.addEvent(Me.itemBox,"mouseup",function(event){
      if(!Me.disabled){
        Sigma.U.removeClass(Me.itemBox,Me.clickClassName);
      }
    });
    Sigma.U.addEvent(Me.itemBox,"click",function(event){
      Me.onclickAction(event,Me);
    });
    Sigma.U.addEvent(Me.itemBox,"dblclick",function(event){
      Me.onclickAction(event,Me);
    });
  }});
Sigma.$extend(Sigma.Button,{createSeparator:function(bContainer){
    var buttonObj=Sigma.$e("div",{className:"gt-image-button gt-button-split"});
    if(bContainer){
      bContainer.appendChild(buttonObj);
    }
    return buttonObj;
  },createCommonButton:function(buttonId,cls,clickFn,clickFnArgs,container,withSeparator){
    return new Sigma.Button({id:buttonId,container:container,cls:cls,onclick:clickFn,onclickArgs:clickFnArgs,withSeparator:withSeparator});
  },createToolComp:function(obj){
    var div=Sigma.$e("div",{className:"gt-toolbar-comp"});
    if(obj){
      if(Sigma.$type(obj,"string","number")){
        div.innerHTML=obj;
      }else {
        div.appendChild(obj);
      }
    }
    return div;
  }});
Sigma.MenuItem=Sigma.BaseMenuItem.extend({initialize:function(options){
    this._parent(options);
    if(this.type=="checkbox"||this.type=="radiobox"){
      this.cls=this.checked?("gt-icon-"+this.type):"gt-icon-unchecked";
    }
    this.itemBox=Sigma.$e("a",{href:"javascript:void(0);return false;",className:"gt-menuitem"});
    this.itemIcon=Sigma.$e("div",{className:"gt-menu-icon "+this.cls});
    this.itemText=Sigma.$e("div",{className:"gt-checkboxtext",innerHTML:this.text,title:this.toolTip});
    this.itemAfterIcon=Sigma.$e("div",{className:"gt-aftericon "+this.afterIconClassName});
    this.itemBox.appendChild(this.itemIcon);
    this.itemBox.appendChild(this.itemText);
    this.itemBox.appendChild(this.itemAfterIcon);
    var Me=this;
    Sigma.U.addEvent(Me.itemBox,"click",function(event){
      Me.onclickAction(event,Me);
    });
  }});
Sigma.$extend(Sigma.MenuItem,{createSeparator:function(bContainer){
    var buttonObj=Sigma.$e("div",{className:"gt-image-button gt-button-split"});
    if(bContainer){
      bContainer.appendChild(buttonObj);
    }
    return buttonObj;
  }});
Sigma.GridMenu=Sigma.$class({gridId:null,parentItem:null,container:null,fixX:null,fixY:null,destroy:function(){
    this.container=null;
    this.parentItem=null;
    Sigma.$each(this.itemList,function(k,i,list){
      Sigma.U.removeNode(k);
      list[i]=null;
    });
    this.itemList=null;
  },initialize:function(options){
    this.itemList=[];
    this.refreshOnShow=false;
    this.currenItem=null;
    this.hidden=true;
    this.className="gt-popmenu";
    this.position="";
    Sigma.$extend(this,options);
    this.menuBox=Sigma.$e("div",{className:this.className,style:{display:"none",left:"10px",top:"10px"}});
    var grid=Sigma.$grid(this.gridId)||{};
    this.container=this.container||grid.gridDiv||Sigma.doc.body;
    this.container.appendChild(this.menuBox);
  },refresh:function(){
  },onshow:function(){
  },clearUp:function(){
  },addMenuItems:function(menuItems){
    menuItems=[].concat(menuItems);
    for(var i=0;i<menuItems.length;i++){
      if(menuItems[i]){
        menuItems[i].gridId=this.gridId;
        menuItems[i].parentItem=this;
        menuItems[i].container=this.menuBox;
        this.itemList.push(menuItems[i]);
        this.menuBox.appendChild(menuItems[i].itemBox);
      }
    }
    return this;
  },show:function(event){
    if(this.container&&this.container.parentNode&&this.container.parentNode.className.indexOf("menu")>1){
    }
    this.menuBox.style.display="block";
    var x,y;
    var xy=Sigma.U.getXY(this.reference,this.container);
    x=xy[0];
    y=xy[1];
    this.fixX=this.fixX||0;
    this.fixY=this.fixY||0;
    switch(this.position.toUpperCase()){
    case "L":
      x-=this.menuBox.offsetWidth;
      break ;
    case "T":
      y-=this.menuBox.offsetHeight;
      break ;
    case "R":
      x+=this.reference.offsetWidth;
      break ;
    case "B":
      y+=this.reference.offsetHeight;
      break ;
    case "LT":
      x-=this.menuBox.offsetWidth;
      y-=this.menuBox.offsetHeight-this.reference.offsetHeight;
      break ;
    case "RT":
      x+=this.reference.offsetWidth;
      y-=this.menuBox.offsetHeight-this.reference.offsetHeight;
      break ;
    case "RB":
      x+=this.reference.offsetWidth;
      y+=this.reference.offsetHeight;
      break ;
    case "LB":
      x-=this.reference.offsetWidth;
      y+=this.menuBox.offsetHeight;
      break ;
    case "M":
      x=event.pageX||(event.clientX-event.x);
      y=event.pageY||(event.clientY-event.y);
      break ;
    default:
      y+=this.reference.offsetHeight;
    }
    Sigma.U.setXY(this.menuBox,[x+this.fixX,y+this.fixY]);
    this.hidden=false;
  },close:function(event){
    this.closeSubMenu(event);
    this.menuBox.style.display="none";
    this.hidden=true;
  },closeSubMenu:function(event){
    for(var i=0;i<this.itemList.length;i++){
      this.itemList[i].closeMenu(event);
    }
  },toggle:function(event){
    Sigma.U.stopEvent(event);
    var grid=Sigma.$grid(this.gridId);
    if(this.hidden===true){
      this.show(event);
    }else {
      this.close(event);
    }
  }});
Sigma.ToolFactroy={register:function(key,fn){
    Sigma.ToolFactroy.tools[key]=fn;
  },create:function(grid,type,doIt){
    if(doIt===false){
      return false;
    }
    grid=Sigma.$grid(grid);
    var Me=grid;
    if(type=="info"||type=="pagestate"){
      type="state";
    }
    var tf=Sigma.ToolFactroy.tools[type];
    if(tf&&Sigma.$type(tf,"function")){
      tf=tf(grid,type,doIt);
    }else {
      if(tf){
        var name=tf.name||type;
        var action=tf.onclick||tf.action;
        tf=new Sigma.Button({container:tf.container||grid.toolBar,cls:tf.cls||"gt-tool-"+name,toolTip:tf.toolTip||grid.getMsg("TOOL_"+name.toUpperCase()),onclick:function(event){
            action(event,grid);
          }});
      }
    }
    return tf;
  },tools:{"goto":function(grid){
      return grid.navigator.createGotoPage();
    },"pagesize":function(grid){
      var pageSizeSelect=Sigma.U.createSelect({});
      pageSizeSelect.className="gt-pagesize-select";
      grid.pageSizeSelect=pageSizeSelect;
      function changePageSize(event){
        grid.setPageInfo({pageSize:pageSizeSelect.value/1});
        grid.navigator.gotoFirstPage(event,grid.navigator);
        grid.pageSizeSelect.blur();
        try{
          grid.bodyDiv.focus();
        }
        catch(e){
        }
      }
      Sigma.U.addEvent(grid.pageSizeSelect,"change",changePageSize);
      var text1=Sigma.$e("div",{innerHTML:grid.getMsg("PAGESIZE_BEFORE"),className:"gt-toolbar-text"});
      var text2=Sigma.$e("div",{innerHTML:grid.getMsg("PAGESIZE_AFTER"),className:"gt-toolbar-text"});
      grid.toolBar.appendChild(text1);
      grid.toolBar.appendChild(Sigma.Button.createToolComp(grid.pageSizeSelect));
      grid.toolBar.appendChild(text2);
      return pageSizeSelect;
    },"add":{onclick:function(event,grid){
        grid.addRow();
      }},"del":{onclick:function(event,grid){
        if(grid.readOnly||grid.endEdit()===false){
          return ;
        }
        grid.deleteRow();
      }},"save":{onclick:function(event,grid){
        grid.lastAction="save";
        grid.save();
      }},"reload":{onclick:function(event,grid){
        grid.lastAction="reload";
        grid.reload();
      }},"print":{onclick:function(event,grid){
        grid.lastAction="print";
        grid.printGrid();
      }},"xls":{onclick:function(event,grid){
        grid.lastAction="export";
        grid.exportGrid("xls");
      }},"pdf":{onclick:function(event,grid){
        grid.lastAction="export";
        grid.exportGrid("pdf");
      }},"csv":{onclick:function(event,grid){
        grid.lastAction="export";
        grid.exportGrid("csv");
      }},"xml":{onclick:function(event,grid){
        grid.lastAction="export";
        grid.exportGrid("xml");
      }},"filter":{onclick:function(event,grid){
        grid.lastAction="filter";
        grid.showDialog("filter");
      }},"chart":{onclick:function(event,grid){
        grid.showDialog("chart");
      }},"state":function(grid){
      var button=Sigma.$e("div",{innerHTML:"&#160;",className:"gt-page-state"});
      grid.toolBar.appendChild(button);
      return button;
    },"separator":function(grid){
      var button=Sigma.Button.createSeparator(grid.toolBar);
      return button;
    },"fill":function(grid){
      var button="";
      return button;
    }}};
Sigma.Widget=Sigma.$class({id:null,dom:null,setDom:function(dom){
    this.dom=dom;
  },getDom:function(){
    return this.dom;
  },show:function(){
    this.dom&&(this.dom.style.display="block");
  },hide:function(){
    this.dom&&(this.dom.style.display="none");
  },close:function(){
    this.hide();
  },setPosition:function(x,y){
    if(x||x===0){
      this.left=x;
      this.dom&&(this.dom.style.left=this.left+"px");
    }
    if(y||y===0){
      this.top=y;
      this.dom&&(this.dom.style.top=this.top+"px");
    }
  },setSize:function(w,h){
    this.width=w||this.width;
    this.height=h||this.height;
    if(!this.dom){
      return ;
    }
    if(this.width/1&&this.width>0){
      this.dom.style.width=(this.width-1)+"px";
    }
    if(this.height/1&&this.height>0){
      this.dom.style.height=(this.height-1)+"px";
    }
  },destroy:function(){
    Sigma.$invoke(this,"beforeDestroy");
    Sigma.U.removeNode(this.dom);
    this.dom=null;
  }});
Sigma.DialogDefault={hasCloseButton:true,autoRerender:true,title:null,body:null,buttonZone:null,headHeight:20,hidden:false,initialize:function(options){
    if(options){
      Sigma.$extend(this,options);
    }
    this.domId=(this.gridId?this.gridId+"_":"")+this.id;
    this.buttonLayout=this.buttonLayout||"h";
    this.dialogId=this.id;
    Sigma.WidgetCache[this.id]=this;
  },destroy:function(){
    this.container=null;
    Sigma.U.removeNode(this.bodyDiv);
    this.bodyDiv=null;
    Sigma.U.removeNode(this.dom);
    this.dom=null;
    Sigma.WidgetCache[this.id]=null;
    delete Sigma.WidgetCache[this.id];
  },titleRender:function(title){
    this.title=title||this.title;
    return this.title;
  },show:function(){
    var grid=Sigma.$grid(this.gridId);
    grid.closeGridMenu();
    if(Sigma.$invoke(this,"beforeShow",[grid])!==false){
      this.locked=true;
      grid.showMask();
      this.autoRerender&&this.render(grid.gridMask);
      grid.gridMask.appendChild(this.dom);
      if(this.width/1&&this.width>0){
        this.dom.style.marginLeft=(0-this.width/2)+"px";
      }
      this.dom.style.marginTop="0px";
      this.dom.style.top="25px";
      this.dom.style.display="block";
      grid.activeDialog=this;
      this.hidden=false;
      Sigma.$invoke(this,"afterShow",[grid]);
    }
  },hide:function(){
    var grid=Sigma.$grid(this.gridId);
    if(Sigma.$invoke(this,"beforeHide",[grid])!==false){
      this.locked=false;
      grid.hideMask();
      if(this.dom){
        this.dom.style.display="none";
        grid.gridEditorCache.appendChild(this.dom);
      }
      grid.activeDialog=null;
      this.hidden=true;
      Sigma.$invoke(this,"afterHide",[grid]);
    }
  },close:function(){
    var grid=Sigma.$grid(this.gridId);
    this.hide();
  },confirm:function(){
    var grid=Sigma.$grid(this.gridId);
    if(grid.activeEditor==this){
      this.locked=false;
      grid.endEdit();
      grid.activeEditor=this;
    }
  },render:function(container){
    this.container=container||this.container;
    if(!this.rendered){
      this.dom=this.dom||Sigma.$e("div",{className:"gt-grid-dialog"});
      this.dom.id=this.domId+"_dialog";
      this.container=this.container||Sigma.doc.body;
      this.container.appendChild(this.dom);
      this.dom.innerHTML=Sigma.T_D.create(this);
      this.titleDiv=Sigma.$(this.domId+"_dialog_title");
      this.bodyDiv=Sigma.$(this.domId+"_dialog_body");
      if(this.height){
        this.bodyDiv.style.height=this.height-(this.headHeight||0)+"px";
      }
      this.setBody();
      this.setButtons();
      this.setTitle();
      Sigma.$invoke(this,"afterRender",[this]);
    }
    this.setSize();
    this.setPosition();
    if(Sigma.$type(this.valueDom,"function")){
      this.valueDom=this.valueDom();
    }
    this.valueDom=Sigma.$(this.valueDom);
    this.rendered=true;
  },setBody:function(body){
    var grid=Sigma.$grid(this.gridId);
    this.body=body||this.body;
    this.bodyDiv.innerHTML="";
    if(Sigma.$type(this.body,"function")){
      this.body=this.body(grid);
    }
    if(!this.body){
    }else {
      if(Sigma.$type(this.body,"string")){
        this.bodyDiv.innerHTML=this.body;
      }else {
        this.bodyDiv.appendChild(this.body);
      }
    }
  },setButtons:function(buttons){
    this.buttons=buttons||this.buttons;
    if(!this.buttons){
      return ;
    }
    buttons=[].concat(this.buttons);
    if(buttons.length>0){
      this.buttonZone=this.buttonZone||Sigma.$e("div",{className:"gt-dialog-buttonzone-"+this.buttonLayout,id:this.domId+"_div"});
      if(this.buttonLayout=="h"){
        this.buttonZone.style.width=this.width-12+"px";
      }
      for(var i=0;i<buttons.length;i++){
        var btn=null;
        if(buttons[i].breakline){
          btn=Sigma.$e("br");
        }else {
          if(buttons[i].html){
            btn=Sigma.$e("span",{innerHTML:buttons[i].html});
          }else {
            btn=Sigma.$e("button",{id:this.domId+"_"+buttons[i].id,className:"gt-input-button",innerHTML:buttons[i].text});
            Sigma.U.addEvent(btn,"click",buttons[i].onclick);
          }
        }
        this.buttonZone.appendChild(btn);
      }
    }
    this.bodyDiv.appendChild(this.buttonZone);
  },setTitle:function(title){
    this.titleDiv.innerHTML=this.titleRender(title);
  }};
Sigma.Dialog=Sigma.Widget.extend(Sigma.DialogDefault);
Sigma.createColumnTable=function(grid,chkCfg){
  grid=Sigma.$grid(grid);
  chkCfg=chkCfg||{};
  chkCfg.checkType=chkCfg.checkType||"checkbox";
  chkCfg.canCheck=chkCfg.canCheck||function(col){
    return !col.hidden;
  };
  function createCheck(_cfg,r){
    var canCheck=_cfg.canCheck===true||_cfg.canCheck(r)!==false;
    return '<input type="'+_cfg.checkType+'" name="'+_cfg.name+'" value="'+_cfg.value(r)+'" class="gt-f-check" '+(_cfg.checked(r)?' checked="checked" ':"")+(!canCheck?' disabled="disabled" ':"")+" />";
  }
  function createCheckHD(_cfg){
    return _cfg.checkType=="checkbox"?'<input type="checkbox" name="'+_cfg.name+'" class="gt-f-totalcheck" />':'<input type="radio" name="'+_cfg.name+'" />';
  }
  var cl=grid.columnList;
  var h=['<table class="gt-table" style="margin-left:0px" cellSpacing="0"  cellPadding="0" border="0" >','<col style="width:25px" /><col style="width:105px" />',"<thead>",Sigma.T_G.rowStart(grid,0),Sigma.T_G.cellStartHTML,createCheckHD(chkCfg),Sigma.T_G.cellEndHTML,Sigma.T_G.cellStartHTML,grid.getMsg("COLUMNS_HEADER"),Sigma.T_G.cellEndHTML,Sigma.T_G.rowEndHTML,"</thead>","<tbody>"];
  for(var i=0;i<cl.length;i++){
    h.push([Sigma.T_G.rowStart(grid,i),Sigma.T_G.cellStartHTML,createCheck(chkCfg,cl[i]),Sigma.T_G.cellEndHTML,Sigma.T_G.cellStartHTML,cl[i].header||cl[i].title,Sigma.T_G.cellEndHTML,Sigma.T_G.rowEndHTML].join(""));
  }
  h.push("</tbody></table>");
  return h.join("\n");
};
Sigma.checkChecked=function(grid){
  grid=Sigma.$grid(grid);
  var chkAll=grid.chkAll;
  var htd=Sigma.U.getParentByTagName("td",chkAll);
  var cellIdx=Sigma.U.getCellIndex(htd);
  var rows=grid.getAllRows();
  var cno=0;
  for(var i=0,j=rows.length;i<j;i++){
    var cell=rows[i].cells[cellIdx];
    if(cell){
      var _chk=cell.getElementsByTagName("input")[0];
      if(_chk&&grid.checkedRows[_chk.value]){
        _chk.checked=true;
        cno++;
      }
    }
  }
  chkAll.checked=cno==rows.length;
};
Sigma.createColumnDialog=function(dType,cfg){
  var checkName=dType+"ColCheck";
  var gridId=cfg.gridId;
  var dialogId=gridId+"_"+dType+"ColDialog";
  var grid=Sigma.$grid(gridId);
  var okFn=function(){
    var colDiv=Sigma.$(dialogId+"_div");
    var tableObj=(Sigma.U.getTagName(colDiv)=="TABLE")?colDiv:colDiv.getElementsByTagName("table")[0];
    var tbodyObj=tableObj.tBodies[0];
    var inputs=tbodyObj.getElementsByTagName("input");
    var rs=Sigma.U.getCheckboxState(inputs,checkName);
    var gids=[],i;
    for(i=0;i<grid.columnList.length;i++){
      gids.push(grid.columnList[i].id);
    }
    for(i=0;i<gids.length;i++){
      var col=grid.columnMap[gids[i]];
      if(rs[col.id]){
        col[cfg.checkFn]();
      }else {
        col[cfg.uncheckFn]();
      }
    }
    if(cfg.autoClose!==false){
      grid._onResize();
      Sigma.WidgetCache[dialogId].close();
    }
  };
  var cancelFn=function(){
    Sigma.WidgetCache[dialogId].close();
  };
  var dialog=new Sigma.Dialog({id:dialogId,gridId:gridId,title:cfg.title,width:260,height:220,buttonLayout:"v",body:['<div id="'+dialogId+"_div"+'" onclick="Sigma.clickHandler.onTotalCheck(event)" class="gt-column-dialog" >',"</div>"].join(""),buttons:[{text:grid.getMsg("TEXT_OK"),onclick:okFn},{text:grid.getMsg("TEXT_CLOSE"),onclick:cancelFn}],afterShow:function(){
      var grid=Sigma.$grid(this.gridId);
      var tt=Sigma.createColumnTable(this.gridId,{type:"checkbox",name:checkName,value:function(r){
          return r.id;
        },checked:cfg.checkValid,checkType:cfg.checkType,canCheck:cfg.canCheck});
      Sigma.$(this.id+"_div").innerHTML=tt;
    }});
  return dialog;
};
Sigma.createFilterDialog=function(cfg){
  var gridId=cfg.gridId;
  var grid=Sigma.$grid(gridId);
  var dialogId=gridId+"_filterDialog";
  grid.justShowFiltered=cfg.justShowFiltered===true?true:(cfg.justShowFiltered===false?false:grid.justShowFiltered);
  grid.afterFilter=cfg.afterFilter||grid.afterFilter;
  var addFn=function(){
    if(grid._noFilter){
      clearFn();
      grid._noFilter=false;
    }
    var colSelect=Sigma.$(dialogId+"_column_select");
    if(colSelect&&colSelect.options.length>0){
      var cid=colSelect.value;
      var cname=colSelect.options[colSelect.selectedIndex].text;
      Sigma.$(dialogId+"_div").appendChild(Sigma.createFilterItem(grid,cid,cname));
    }
  };
  var clearFn=function(){
    Sigma.$(dialogId+"_div").innerHTML="";
  };
  var okFn=function(){
    var colDiv=Sigma.$(dialogId+"_div");
    var filterInfo=[];
    var items=colDiv.childNodes;
    for(var i=0;i<items.length;i++){
      if(Sigma.U.getTagName(items[i])=="DIV"&&items[i].className=="gt-filter-item"){
        var colS=items[i].childNodes[1];
        var condS=items[i].childNodes[2];
        var f=items[i].childNodes[3].firstChild;
        var cid=Sigma.U.getValue(colS);
        var colObj=grid.columnMap[cid];
        if(colObj&&colObj.fieldName){
          filterInfo.push({columnId:cid,fieldName:colObj.fieldName,logic:Sigma.U.getValue(condS),value:Sigma.U.getValue(f)});
        }
      }
    }
    if(filterInfo.length>0){
      var rowNos=grid.applyFilter(filterInfo);
    }else {
      grid.applyFilter([]);
    }
    if(cfg.autoClose!==false){
      grid._onResize();
      Sigma.WidgetCache[dialogId].close();
    }
  };
  var cancelFn=function(){
    Sigma.WidgetCache[dialogId].close();
  };
  var outW=430,outH=220;
  var inW=outW-(Sigma.isBoxModel?16:18),inH=outH-(Sigma.isBoxModel?93:95);
  var dialog=new Sigma.Dialog({id:dialogId,gridId:gridId,title:cfg.title,width:outW,height:outH,buttonLayout:"h",body:['<div id="'+dialogId+'_div" class="gt-filter-dialog" style="width:'+inW+"px;height:"+inH+'px;" onclick="Sigma.clickHandler.onFilterItem(event)" >',"</div>"].join(""),buttons:[{html:Sigma.createColumnSelect(grid,dialogId+"_column_select")},{text:grid.getMsg("TEXT_ADD_FILTER"),onclick:addFn},{text:grid.getMsg("TEXT_CLEAR_FILTER"),onclick:clearFn},{breakline:true},{text:grid.getMsg("TEXT_OK"),onclick:okFn},{text:grid.getMsg("TEXT_CLOSE"),onclick:cancelFn}],afterShow:function(){
      var grid=Sigma.$grid(this.gridId);
      var filterInfo=grid.filterInfo||[];
      clearFn();
      for(var i=0;i<filterInfo.length;i++){
        var cid=filterInfo[i].columnId;
        var col=grid.getColumn(cid);
        var cname=(col.header||col.title);
        var tt=Sigma.createFilterItem(grid,cid,cname);
        var colS=tt.childNodes[1];
        var condS=tt.childNodes[2];
        var f=tt.childNodes[3].firstChild;
        Sigma.U.setValue(colS,cid);
        Sigma.U.setValue(condS,filterInfo[i].logic);
        Sigma.U.setValue(f,filterInfo[i].value);
        Sigma.$(this.id+"_div").appendChild(tt);
      }
      if(filterInfo.length<1){
        Sigma.$(this.id+"_div").innerHTML='<div style="color:#999999;margin:10px;">'+grid.getMsg("DIAG_NO_FILTER")+"</div>";
        grid._noFilter=true;
      }
    }});
  return dialog;
};
Sigma.createColumnSelect=function(grid,id){
  grid=Sigma.$grid(grid);
  var colSelect=["<select"+(id?(' id="'+id+'" '):" ")+' class="gt-input-select">'];
  for(var i=0;i<grid.columnList.length;i++){
    var col=grid.columnList[i];
    if(col&&col.filterable!==false){
      colSelect.push('<option value="'+col.id+'" >'+(col.header||col.title)+"</option>");
    }
  }
  colSelect.push("</select>");
  return colSelect.join("");
};
Sigma.createFilterField=function(grid,cid){
  grid=Sigma.$grid(grid);
  var colObj=grid.getColumn(cid),field;
  if(typeof colObj.filterField=="function"){
    field=colObj.filterField(colObj);
  }else {
    if(colObj.filterField){
      field=colObj.filterField;
    }
  }
  field=field||'<input type="text" class="gt-input-text gt-filter-field-text" value="" />';
  return '<div class="gt-filter-field-box">'+field+"</div>";
};
Sigma.createFilterItem=function(grid,cid,cname){
  grid=Sigma.$grid(grid);
  var div=Sigma.$e("div",{className:"gt-filter-item"});
  var colInfo='<input type="text" readonly="readonly" class="gt-input-text gt-filter-col-text" value="'+cname+'" />';
  colInfo+='<input type="hidden"  value="'+cid+'" />';
  var condInput=Sigma.createFilterField(grid,cid);
  var fButton='<button class="gt-input-button gt-filter-del" >'+grid.getMsg("TEXT_DEL")+"</button>"+'<button class="gt-input-button gt-filter-up" >'+grid.getMsg("TEXT_UP")+"</button>"+'<button class="gt-input-button gt-filter-down" >'+grid.getMsg("TEXT_DOWN")+"</button>";
  div.innerHTML=colInfo+Sigma.T_D.filterCondSelect+condInput+fButton;
  return div;
};
Sigma.clickHandler={currentElement:null,onFilterItem:function(evt){
    evt=evt||window.event;
    var et=Sigma.U.getEventTarget(evt);
    var tableObj=Sigma.U.getParentByTagName("table",null,evt,10);
    if(Sigma.U.getTagName(et)=="BUTTON"){
      var className=" "+et.className;
      var item=et.parentNode;
      if(className.indexOf(" gt-filter-del")>=0){
        Sigma.U.removeNode(item);
      }else {
        if(className.indexOf(" gt-filter-up")>=0){
          var p_item=item.previousSibling;
          if(p_item){
            item.parentNode.insertBefore(item,p_item);
          }
        }else {
          if(className.indexOf(" gt-filter-down")>=0){
            var n_item=item.nextSibling;
            if(n_item){
              item.parentNode.insertBefore(n_item,item);
            }
          }
        }
      }
    }
  },onTotalCheck:function(evt){
    evt=evt||window.event;
    var et=Sigma.U.getEventTarget(evt);
    var tableObj=Sigma.U.getParentByTagName("table",null,evt,10);
    if(!et||(et.type!="checkbox"&&et.type!="radio")){
      return ;
    }
    if(Sigma.U.hasClass(et,"gt-f-totalcheck")){
      var tbodyObj=tableObj.tBodies[0];
      var inputs=tbodyObj.getElementsByTagName("input");
      for(var i=0;i<inputs.length;i++){
        if(inputs[i].name==et.name&&inputs[i].type==et.type){
          inputs[i].checked=et.checked;
        }
      }
    }else {
      if(Sigma.U.hasClass(et,"gt-f-check")){
        var theadObj=tableObj.tHead;
        var tinput=theadObj.getElementsByTagName("input")[0];
        if(tinput){
          tinput.checked=false;
        }
      }
    }
  }};
Sigma.EditorDefault={gridId:null,left:0,top:0,render:Sigma.$empty,validator:null,isFocus:Sigma.$empty,onKeyPress:Sigma.$empty,errMsg:null,isActive:null,valueDom:null,locked:false,initialize:function(options){
    if(options){
      Sigma.$extend(this,options);
    }
    this.validator=this.validator||this.defaultValidator;
    if(Sigma.$type(this.validRule,"string")){
      this.validRule=this.validRule.split(",");
    }
    if(this.required){
      this.validRule=["required"].concat(this.validRule);
    }
    this.dom=this.dom||Sigma.$e("div",{className:"gt-editor-container"});
    Sigma.U.addEvent(this.dom,"click",function(event){
      Sigma.U.stopEvent(event);
    });
    Sigma.U.addEvent(this.dom,"dblclick",function(event){
      Sigma.U.stopEvent(event);
    });
  },destroy:function(){
    this.container=null;
    Sigma.U.removeNode(this.valueDom);
    this.valueDom=null;
    Sigma.U.removeNode(this.dom);
    this.dom=null;
    Sigma.WidgetCache[this.id]=null;
    delete Sigma.WidgetCache[this.id];
  },setValue:function(value,record,colObj,grid,colNo,rowNo,tdObj){
    Sigma.U.setValue(this.valueDom,value);
  },getValue:function(value,record,colObj,grid,colNo,rowNo,tdObj){
    return Sigma.U.getValue(this.valueDom);
  },parseValue:function(value,record,colObj,grid,colNo,rowNo,tdObj){
    return value;
  },getDisplayValue:function(value){
    return value===undefined?this.getValue():value;
  },defaultValidator:function(value,record,colObj,grid,editor){
    var errMsg=[];
    var validRule=[].concat(editor.validRule);
    for(var i=0;i<validRule.length;i++){
      var rule=validRule[i];
      var validParameter=[value];
      if(Sigma.$type(rule,"array")&&rule.length>0){
        rule=rule[0];
        validParameter=validParameter.concat(rule.slice(1));
      }
      var vat=Sigma.Validator.getValidator(rule);
      var validResult=true;
      if(Sigma.$type(vat,"function")){
        validResult=vat.apply(vat,validParameter);
      }
      if(validResult!==true){
        var v_msg=Sigma.Validator.getMessage(this.validRule[i])||String(validResult);
        errMsg.push(v_msg);
      }
    }
    if(!errMsg||errMsg.length<1){
      errMsg="";
    }
    return errMsg;
  },doValid:function(value,record,colObj,grid){
    if(!this.validRule&&!this.validator){
      return true;
    }
    value=(value===undefined||value===null)?this.getValue():value;
    var validResult=this.validator(value,record,colObj,grid,this);
    if(validResult===true||validResult===undefined||validResult===null||validResult===""){
      return true;
    }
    return validResult;
  },active:function(){
    Sigma.U.focus(this.valueDom);
  }};
Sigma.Editor=Sigma.Widget.extend(Sigma.EditorDefault);
Sigma.DialogEditor=Sigma.Editor.extend(Sigma.$extend({getDom:function(){
    if(!this.dom&&this.render){
      var grid=Sigma.$grid(this.gridId);
      this.render(grid.gridMask);
    }
    return this.dom;
  }},Sigma.DialogDefault));
Sigma.EditDialog=Sigma.DialogEditor;
Sigma.Calendar=window.Calendar||{setup:Sigma.$empty};
Sigma.$extend(Sigma.Editor,{factroy:function(editorInfo,grid){
    if(Sigma.$type(editorInfo,"function")){
      editorInfo=editorInfo(grid);
    }
    if((editorInfo instanceof Sigma.DialogEditor)||(editorInfo instanceof Sigma.Dialog)){
      editorInfo.gridId=grid.id;
      editorInfo.container=grid.gridMask;
      return editorInfo;
    }
    if(editorInfo instanceof Sigma.Editor){
      return editorInfo;
    }
    editorInfo=Sigma.$type(editorInfo,"string")?{type:editorInfo}:editorInfo;
    return editorInfo&&Sigma.Editor.EDITORS[editorInfo.type]?Sigma.Editor.EDITORS[editorInfo.type](editorInfo):null;
  },register:function(type,editor){
    if(editor instanceof Sigma.Editor){
      editor=function(){
        return editor;
      };
    }
    Sigma.Editor.EDITORS[type]=editor;
  },EDITORS:{text:function(editor){
      editor=new Sigma.Editor(editor);
      editor.valueDom=Sigma.$e("input",{type:"text",value:editor.defaultValue||"",className:"gt-editor-text"});
      editor.dom.appendChild(editor.valueDom);
      return editor;
    },textarea:function(editor){
      editor=new Sigma.Editor(editor);
      editor.valueDom=Sigma.$e("textarea",{style:{width:editor.width||"100px",height:editor.height||"50px"},value:editor.defaultValue||"",className:"gt-editor-text"});
      editor.dom.appendChild(editor.valueDom);
      editor.dom.style.width=editor.valueDom.style.width;
      editor.dom.style.height=editor.valueDom.style.height;
      editor.setSize=Sigma.$empty;
      return editor;
    },select:function(editor){
      editor=new Sigma.Editor(editor);
      editor.valueDom=Sigma.U.createSelect(editor.options,null,{className:"gt-editor-text"});
      editor.dom.appendChild(editor.valueDom);
      editor.getDisplayValue=function(value){
        value=value===undefined?this.getValue():value;
        for(var i=0;i<this.valueDom.options.length;i++){
          if(String(this.valueDom.options[i].value)===String(value)){
            return this.valueDom.options[i].text||this.valueDom.options[i].innerHTML;
          }
        }
        return (this.defaultText||this.defaultText==="")?this.defaultText:null;
      };
      return editor;
    },checkbox:function(editor){
      editor=new Sigma.Editor(editor);
      editor.valueDom=Sigma.U.createSelect(editor.options,null,{});
      editor.dom.appendChild(editor.valueDom);
      return editor;
    },date:function(editor){
      var cal;
      editor=new Sigma.Editor(editor);
      var input=Sigma.$e("input",{type:"text",value:editor.defaultValue||"",className:"gt-editor-text",style:{width:"78px",styleFloat:"left"}});
      var button=Sigma.$e("input",{type:"button",value:editor.defaultValue||"",className:"gt-editor-date",styleFloat:"left"});
      editor.dom.style.overflow="hidden";
      editor.dom.appendChild(input);
      editor.dom.appendChild(button);
      editor.setSize=function(w,h){
        this.width=w||this.width;
        this.height=h||this.height;
        if(this.width/1&&this.width>0){
          this.dom.style.width=(this.width-1)+"px";
        }
        if(this.height/1&&this.height>0){
          this.dom.style.height=(this.height-1)+"px";
        }
        this.dom.firstChild.style.width=(this.width-20)+"px";
      };
      var fillDate=function(){
        editor.onClose&&editor.onClose();
        this.hide();
      };
      var showCalendar=function(){
        var format=editor.format||"%Y-%m-%d";
        format=Sigma.U.replaceAll(format,"yyyy","%Y");
        format=Sigma.U.replaceAll(format,"MM","%m");
        format=Sigma.U.replaceAll(format,"dd","%d");
        format=Sigma.U.replaceAll(format,"HH","%H");
        format=Sigma.U.replaceAll(format,"mm","%M");
        format=Sigma.U.replaceAll(format,"ss","%S");
        if(!cal){
          cal=Sigma.Calendar.setup({inputField:input,trigger:button,onSelect:fillDate,minuteStep:editor.minuteStep||1,weekNumbers:editor.weekNumbers||false,showTime:editor.showTime||false,dateFormat:format});
        }
      };
      Sigma.U.addEvent(button,"click",showCalendar);
      showCalendar();
      editor.valueDom=input;
      return editor;
    }}});
Sigma.Validator={hasDepend:/^datetime|^date|^time|^minlength|^maxlength|^DT|^D|^T|^MINL|^MAXL/,hasArgument:/^equals|^lessthen|^EQ|^LT/,DATE_FORMAT:"yyyy-MM-dd",TIME_FORMAT:"HH:mm:ss",DATETIME_FORMAT:"yyyy-MM-dd HH:mm:ss",KeyMapping:{"R":"required","DT":"datetime","D":"date","T":"time","E":"email","ID":"idcard","N":"number","int":"integer","I":"integer","F":"float","M":"money","RG":"range","EQ":"equals","LT":"lessthen","GT":"greatethen","U":"url","ENC":"enchar","CNC":"cnchar","MINL":"minlength","MAXL":"maxlength"},RegExpLib:{"email":/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/,"number":/^\d+$/,"integer":/^[1-9]\d*|0$/,"float":/^([1-9]\d*\.\d+|0\.\d+|[1-9]\d*|0)$/,"money":/^([1-9]\d*\.\d{1,2}|0\.\d{1,2}|[1-9]\d*|0)$/,"telephone":/^[+]{0,1}(\d){1,3}[ ]?([-]?((\d)|[ ]){1,16})+$/,"enchar":/^[ \w]*$/,"cnchar":/^[һ-\u9FA5\uF900-\uFA2D]*$/,"idcard":/^(\d{15}|\d{18}|\d{17}X?)$/i},getValidator:function(rule){
    return Sigma.Validator[rule];
  },getMessage:function(msgKey){
    var msg=Sigma.Msg.Validator["default"][msgKey];
    if(!msg){
      msg=Sigma.Msg.Validator["default"][Sigma.Validator.KeyMapping[msgKey]];
    }
    var _format=((Sigma.Validator.KeyMapping[msgKey]||msgKey)+"_FORMAT").toUpperCase();
    _format=Sigma.Validator[_format];
    var wordNum=(" "+msg).split(/\{[0-9]/).length-1;
    for(var i=1;i<=wordNum;i++){
      var ns=arguments[i];
      if(i==2){
        ns=ns||_format;
      }
      var rex;
      eval("rex = /{("+(i-1)+"[^#}]*)#?([^}]*)}/;");
      var ostring=rex.exec(msg);
      if(ostring&&ostring.length>2){
        if(!ns){
          msg=Sigma.U.replaceAll(msg,ostring[0]," "+ostring[2]+" ");
        }else {
          msg=Sigma.U.replaceAll(msg,ostring[0]," "+ns+" ");
        }
      }
    }
    return msg;
  },"required":function(values){
    if(values===null||values===undefined){
      return false;
    }
    if(typeof (values)!="string"&&values.length){
      if(values.length<1){
        return false;
      }
      for(var i=0;i<values.length;i++){
        var r=Sigma.Validator.required(values[i]);
        if(r){
          return true;
        }
      }
      return false;
    }
    return Sigma.U.trim(values+"").length>0;
  },"telephone":function(value){
    if(!Sigma.Validator.RegExpLib.telephone.exec(value)){
      return false;
    }
    return true;
  },"email":function(value){
    return value&&Sigma.Validator.RegExpLib["email"].test(value);
  },"enchar":function(value){
    return value&&Sigma.Validator.RegExpLib["enchar"].test(value);
  },"cnchar":function(value){
    return value&&Sigma.Validator.RegExpLib["cnchar"].test(value);
  },"number":function(value){
    return !isNaN(value/1);
  },"integer":function(value){
    return (String(value).indexOf(".")<0)&&!isNaN(value/1)&&Sigma.Validator.RegExpLib["integer"].test(Math.abs(value));
  },"float":function(value){
    return !isNaN(value/1)&&Sigma.Validator.RegExpLib["float"].test(Math.abs(value));
  },"money":function(value){
    return !isNaN(value/1)&&Sigma.Validator.RegExpLib["money"].test(value);
  },"idcard":function(value){
    if(!value||value.length<15||!Sigma.Validator.RegExpLib["idcard"].test(value)){
      return false;
    }
    var birthday;
    if(value.length==18){
      birthday=value.substr(6,8);
    }else {
      birthday="19"+value.substr(6,6);
    }
    return Sigma.Validator.date(birthday,"YYYYMMDD");
  },"date":function(dateValue,format){
    dateValue=[].concat(dateValue);
    if(!format||format.length<1){
      format=Sigma.Validator.DATE_FORMAT;
    }
    format=format.toUpperCase();
    var formatRex=format.replace(/([$^.*+?=!:|\/\\\(\)\[\]\{\}])/g,"\\$1");
    formatRex=formatRex.replace("YYYY","([0-9]{4})");
    formatRex=formatRex.replace("YY","([0-9]{2})");
    formatRex=formatRex.replace("MM","(0[1-9]|10|11|12)");
    formatRex=formatRex.replace("M","([1-9]|10|11|12)");
    formatRex=formatRex.replace("DD","(0[1-9]|[12][0-9]|30|31)");
    formatRex=formatRex.replace("D","([1-9]|[12][0-9]|30|31)");
    formatRex="^"+formatRex+"$";
    var re=new RegExp(formatRex);
    var year=0,month=1,date=1;
    var tokens=format.match(/(YYYY|YY|MM|M|DD|D)/g);
    for(var ii=0;ii<dateValue.length;ii++){
      if(!re.test(dateValue[ii])){
        return false;
      }
      var values=re.exec(dateValue[ii]);
      for(var i=0;i<tokens.length;i++){
        switch(tokens[i]){
        case "YY":
        case "yy":
          var v=Number(values[i+1]);
          year=1900+(v<=30?v+100:v);
          break ;
        case "YYYY":
        case "yyyy":
          year=Number(values[i+1]);
          break ;
        case "M":
        case "MM":
          month=Number(values[i+1]);
          break ;
        case "D":
        case "d":
        case "DD":
        case "dd":
          date=Number(values[i+1]);
          break ;
        }
      }
      var leapyear=(year%4===0&&(year%100!==0||year%400===0));
      if(date>30&&(month==2||month==4||month==6||month==9||month==11)){
        return false;
      }
      if(month==2&&(date==30||date==29&&!leapyear)){
        return false;
      }
    }
    return true;
  },"time":function(timeValue,format){
    timeValue=[].concat(timeValue);
    if(!format||format.length<1){
      format=Sigma.Validator.TIME_FORMAT;
    }
    var formatRex=format.replace(/([.$?*!=:|{}\(\)\[\]\\\/^])/g,"\\$1");
    formatRex=formatRex.replace("HH","([01][0-9]|2[0-3])");
    formatRex=formatRex.replace("H","([0-9]|1[0-9]|2[0-3])");
    formatRex=formatRex.replace("mm","([0-5][0-9])");
    formatRex=formatRex.replace("m","([1-5][0-9]|[0-9])");
    formatRex=formatRex.replace("ss","([0-5][0-9])");
    formatRex=formatRex.replace("s","([1-5][0-9]|[0-9])");
    formatRex="^"+formatRex+"$";
    var re=new RegExp(formatRex);
    for(var ii=0;ii<timeValue.length;ii++){
      if(!re.test(timeValue[ii])){
        return false;
      }
    }
    return true;
  },"datetime":function(timeValue,format){
    timeValue=[].concat(timeValue);
    var trex=/^\S+ \S+$/;
    if(!format||format.length<1){
      format=Sigma.Validator.DATETIME_FORMAT;
    }else {
      if(!trex.test(format)){
        return false;
      }
    }
    for(var ii=0;ii<timeValue.length;ii++){
      if(!trex.test(timeValue[ii])){
        return false;
      }
      var values=timeValue[ii].split(" ");
      var fatms=format.split(" ");
      var rs=Sigma.Validator.date(values[0],fatms[0])&&Sigma.Validator.time(values[1],fatms[1]);
      if(!rs){
        return false;
      }
    }
    return true;
  },"range":function(value,min,max){
    if(!Sigma.$chk(min)){
      return value<=max;
    }else {
      if(!Sigma.$chk(max)){
        return value>=min;
      }
    }
    return value>=min&&value<=max;
  },"equals":function(value,values2){
    values2=[].concat(values2);
    for(var i=0;i<values2.length;i++){
      if(value==values2){
        return true;
      }
    }
    return false;
  },"lessthen":function(value,values2){
    values2=[].concat(values2);
    for(var i=0;i<values2.length;i++){
      if(value<=values2){
        return true;
      }
    }
    return false;
  },"greatethen":function(value,values2){
    values2=[].concat(values2);
    for(var i=0;i<values2.length;i++){
      if(value>=values2){
        return true;
      }
    }
    return false;
  },"minlength":function(value,lt){
    return Sigma.$chk(value)&&(value+"").length>=lt;
  },"maxlength":function(value,lt){
    return Sigma.$chk(value)&&(value+"").length<=lt;
  }};
(function(){
  for(var k in Sigma.Validator.KeyMapping){
    Sigma.Validator[k]=Sigma.Validator[Sigma.Validator.KeyMapping[k]];
  }
})();
Sigma.Chart=Sigma.$class({initialize:function(options){
    this.defaultColor="66BBFF";
    this.type="column2D";
    this.swfPath="./charts/";
    this.swf=Sigma.Chart.SWFMapping[this.type];
    this.width="100%";
    this.height="100%";
    this.data=null;
    this.container=null;
    this.chart=null;
    Sigma.$extend(this,options);
    this.swf=Sigma.Chart.SWFMapping[this.type]||this.swf;
    if(this.swfPath.lastIndexOf("/")==this.swfPath.length-1){
      this.swfPath=this.swfPath.substring(0,this.swfPath.length-1);
    }
    this.container=Sigma.$(this.container);
    this.chart=this.chart||new FusionCharts(this.swfPath+"/"+this.swf,this.container.id+"_chart",this.width,this.height);
  },json2Params:function(json){
    if(json.isNull){
      if(json.name){
        json={name:json.name};
      }else {
        return "";
      }
    }else {
      if(json.color){
        json.color=json.color||this.defaultColor;
      }
    }
    var str=[];
    for(var k in json){
      str.push(k+"='"+json[k]+"'");
    }
    return ;
  },createSetsXML:function(dataset){
    dataset=dataset||this.data;
    var setsXML=[],str=[];
    for(var i=0;i<dataset.length;i++){
      var record=dataset[i],setXML,name,value,color;
      if(record instanceof Array){
        name=record[0];
        value=record[1];
        color=record[2];
        color=(value===null||value===undefined)?null:(color||this.defaultColor);
        name=(name===null||name===undefined)?value:name;
        str=[name!==null&&name!==undefined?"name='"+name+"'":"",value!==null&&value!==undefined?"value='"+value+"'":"",color!==null&&color!==undefined?"color='"+color+"'":""].join(" ");
      }else {
        if(record){
          str=this.json2Params(record);
        }
      }
      setXML=["<set",str,"/>"];
      setXML=setXML.join(" ");
      if(setXML=="<set />"||(value===null||value===undefined)){
      }
      setsXML.push(setXML);
    }
    this.setsXML=setsXML.join("");
    return this.setsXML;
  },createChartXML:function(options,setsXML){
    setsXML=setsXML||this.setsXML;
    var chartXML=["<graph","caption='"+(this.caption||"")+"'","subCaption='"+(this.subCaption||"")+"'","outCnvBaseFontSize='12'","animation='0'"];
    chartXML.push(">"+setsXML+"</graph>");
    this.chartXML=chartXML.join(" ");
    return this.chartXML;
  },updateChart:function(container,chartXML){
    container=container||this.container;
    chartXML=chartXML||this.chartXML;
    window.updateChartXML&&(window.updateChartXML(container,chartXML));
  },generateChart:function(container,data){
    this.data=data||this.data;
    this.createSetsXML();
    this.createChartXML();
    container=container||this.container;
    this.chart.setDataXML(this.chartXML);
    this.chart.render(container);
  }});
Sigma.Chart.SWFMapping={"column2D":"FCF_Column2D.swf","pie3D":"FCF_Pie3D.swf"};