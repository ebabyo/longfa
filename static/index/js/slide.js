define("KUYU.plugins.slide!CSS",[],function(){$.fn.Slide=function(i){var t=$.extend({box:this},i);i.slideshow?n.init(t):e.init(t)};var n={init:function(n){function e(n){var e=l.filter(".slide-active");l.stop(!0,!0),e.removeClass("slide-active").fadeOut(600),l.eq(n).addClass("slide-active").fadeIn(800),a&&a.removeClass("active").eq(n).addClass("active")}function i(){d--,d=d<0?f-1:d,e(d)}function t(){d++,d=d>f-1?0:d,e(d)}function s(){u&&clearInterval(u),u=setInterval(function(){t()},r)}var a,c=n.box,l=n.eles,o=n.dots,f=l.length,d=-1,r=5e3,u=null;if(1==f)return t(),$(".prev").hide(),void $(".next").hide();$.each(l,function(n,e){o.append("<span></span>")}),a=o.find("span"),c.on("click",".prev",function(n){i()}).on("click",".next",function(n){t()}).on("click",".banner-dots span",function(n){if(!$(this).hasClass("active")){var i=$(this).index();d=i,e(i)}}),c.on("mouseenter",function(n){u&&clearInterval(u)}).on("mouseleave",function(e){n.stop||s()}),t(),n.stop||s()}},e={init:function(n){function e(n){t.is(":animated")||t.animate({left:n},500,function(){0==n?t.css({left:-f*d/2}):n==(1-f)*d&&t.css({left:(1-f/2)*d})})}var i=n.box,t=n.eles;t.append(t.html());var s=t.find("li"),a=n.eles.find("dd"),c=a.width(),l=0,o=a.length,f=s.length;s.width(o/f*c);var d=s.width();t.css({width:o*c,left:-f*d/2}),i.on("click",".flex-next",function(n){l=parseInt(t.css("left"))-d,e(l)}),i.on("click",".flex-prev",function(n){l=parseInt(t.css("left"))+d,e(l)})}}});