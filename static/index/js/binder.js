define("KUYU.Binder",["KUYU.Filter","KUYU.Control"],function(){var filter=KUYU.Filter,$scope=KUYU.RootScope,binders=[],attrOptions={data:"binder-data",cls:"binder-class",attr:"binder-attr",show:"binder-show",hide:"binder-hide",model:"binder-model"},cacheDoms={},init=function(){var t=$("[binder-data]"),o=$("[binder-class]"),r=$("[binder-attr]"),e=$("[binder-show]"),a=$("[binder-hide]"),s=$("[binder-model]");cacheDoms={data:t,cls:o,attr:r,show:e,hide:a,model:s},eventInit(),initModel()},initModel=function(){for(var t=cacheDoms.model,o=0;o<t.length;o++){var r=$(t[o])[0],e=$(r).attr("binder-model");void 0!=$scope[e]?"input"===r.nodeName.toLowerCase()||"textarea"==r.nodeName.toLowerCase()||"select"==r.nodeName.toLowerCase()?$(r).val($scope[e]):$(r).html($scope[e]):$scope[e]="";var a=null;a=new Control(r,e,function(t,o,r){void 0!=o&&($scope[o]=r)}),binders.push(a)}},formatEvent=function(t){var o=$(t).attr("binder-event"),r=o.split("|"),e=r[0],a=r[1],s=a.split(":");return{evtType:e,evtFn:s[0],pDom:t,cDom:s[1]?s[1]:""}},eventInit=function(){for(var t=$("[binder-event]"),o=0;o<t.length;o++){var r=t[o],e=formatEvent($(r));""==e.cDom?e.pDom.on(e.evtType,"",function(t){var o=this,r=formatEvent(o),e=r.evtFn;$.isFunction($scope[e])&&$scope[e](o,t)}):e.pDom.on(e.evtType,e.cDom,function(t){var o=this,r=$(t.delegateTarget),e=formatEvent(r),a=e.evtFn;$.isFunction($scope[a])&&$scope[a](o,t)})}},_syncShow=function(data){for(var sDoms=cacheDoms.show,vm=data,boolEval,i=0;i<sDoms.length;i++){var dom=$(sDoms[i]),showD=dom.attr("binder-show");try{boolEval=eval(showD),boolEval||1==boolEval?dom.show():dom.hide()}catch(t){Array.of&&console.log(t)}}},_syncHide=function(data){for(var sDoms=cacheDoms.hide,vm=data,boolEval,i=0;i<sDoms.length;i++){var dom=$(sDoms[i]),showD=dom.attr("binder-hide");try{boolEval=eval(showD),boolEval||1==boolEval?dom.hide():dom.show()}catch(t){Array.of&&console.log(t)}}},_syncData=function(data){for(var dDoms=cacheDoms.data,vm=data,i=0;i<dDoms.length;i++){var dom=$(dDoms[i]),att=dom.attr("binder-data"),arr=att.split("|"),file=arr[0],str="",addValueFn="text",regExp1=/([^\{'|"]+)(?=\'|"})/g,regExp2=/([^|\}]+)(?=\{|$)/g;try{for(var arr1=file.match(regExp1),arr2=file.match(regExp2),j=0;j<arr2.length&&"undefined"!=(str+=eval(arr2[j]));j++)null!=arr1&&void 0!=arr1[j]&&(str+=arr1[j]);if(arr.length>1&&"undefined"!=str&&"NaN"!=str){var filter=arr[1],_f=filter.split("{"),fun=_f[0].trim();if("html"==fun)addValueFn="html";else if(_f.length>1){var _format=_f[1].split("}")[0];str=fFun[fun](str,_format)}else str=fFun[fun](str)}}catch(t){Array.of&&console.log(t)}if("IMG"==dom[0].nodeName?void 0!=str&&"undefined"!=str&&dom.attr("src",str):"INPUT"==dom[0].nodeName||"TEXTAREA"==dom[0].nodeName||"SELECT"==dom[0].nodeName?void 0!=str&&"undefined"!=str&&"NaN"!=str&&dom.val(str):void 0!=str&&"undefined"!=str&&"NaN"!=str&&("text"==addValueFn?dom.text(str):dom.html(str)),""!=dom.attr("binder-model")&&void 0!=dom.attr("binder-model")){var key=dom.attr("binder-model");void 0!=str&&"undefined"!=str&&"NaN"!=str&&($scope[key]=str)}}},_syncAttr=function(data){for(var sDoms=cacheDoms.attr,vm=data,dom,showD,objList,arr,result,rs,i=0;i<sDoms.length;i++)if(dom=$(sDoms[i]),void 0!=(showD=dom.attr("binder-attr"))&&""!=showD){objList=showD.split("|"),rs=objList[0],arr=objList[1].split(":");try{if(eval(rs)){for(var k=0;k<arr.length;k++)result=arr[0].trim(),dom.attr(result,arr[1]);dom.removeAttr("binder-attr")}}catch(t){Array.of&&console.log(t)}}},_syncCls=function(data){for(var cDoms=cacheDoms.cls,vm=data,i=0;i<cDoms.length;i++){var dom=$(cDoms[i]),cls=dom.attr("binder-class");try{var str=eval(cls);dom.addClass(str)}catch(t){Array.of&&console.log(t)}}},sync=function(t){_syncData(t),_syncShow(t),_syncAttr(t),_syncCls(t),_syncHide(t)},setData=function(t){for(var o=0;o<binders.length;o++){var r=binders[o];for(var e in t)if(r.propoties.key==e){var a=t[e];r.setData(e,a)}}},Binder={init:init,sync:sync,setData:setData};_APP.inject("KUYU.Binder",Binder)});