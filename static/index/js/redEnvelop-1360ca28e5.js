require(["KUYU.Service","KUYU.plugins.slide","placeholder","KUYU.Store","KUYU.plugins.alert"],function(){function e(e,t){return parseInt(Math.random()*(t+1-e)+e)}function t(e,t,o){this.actions=function(){var a;a=setTimeout(function(){r(o)},e),i=setTimeout(function(){clearTimeout(a),clearTimeout(n),$(".pack_box").css("display","none"),Msg.Alert("",o,function(){})},t)}}var n,i,o=KUYU.Service,a=(KUYU.Init,KUYU.Store,KUYU.Init.getEnv(),KUYU.Init.getService(),0),r=function(t){var o=parseInt($(".redpack_box").width())-60,c=e(1,2),s=e(20,60),l=e(0,o),u=e(-45,45);a++;var p="<li class='li"+a+"'><a><img src='/app/components/redEnvelop/img/hb_"+c+".png'></a></li>";$(".pack_box").css("display","block"),$(".redpack_box").append(p),$(".li"+a).css("left",l),$(".li"+a+" img").css({width:s+"px",transform:"rotate("+u+"deg)","-ms-transform":"rotate("+u+"deg)","-moz-transform":"rotate("+u+"deg)","-webkit-transform":"rotate("+u+"deg)","-o-transform":"rotate("+u+"deg)"}),$(".li"+a).animate({top:$(window).height()+10},6500,function(){$(this).remove()}),$(".li"+a).click(function(){clearTimeout(n),clearTimeout(i),$(".pack_box").css("display","none"),Msg.Alert("",t,function(){})}),n=setTimeout(r,300,t)};!function(){$("body").append('<div class="pack_box">    <ul class="redpack_box"></ul></div>'),$(".redpack_box").css("height",$(window).height()),$(".pack_box").css("display","none")}(),function(){o.get({url:"/sysback/redenvelope/getAll",data:{},success:function(e){if("0"===e.code&&0!==e.retData.length)for(var n=0;n<e.retData.length;n++){var i=e.retData[n],o=Number(i.beginTime),a=Number(i.continueTime),r=Number(i.currentTime),c=o-r,s=i.copywriter;r<=o+1e3*a&&(o<r?new t(0,c+1e3*a,s).actions():new t(c,c+1e3*a,s).actions())}}})}()});