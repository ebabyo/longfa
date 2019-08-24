define("KUYU.Store",[],function(){var e={},t=window.localStorage;e.forEach=function(n){for(var r=0;r<t.length;r++){var o=t.key(r);n(o,e.get(o))}},t?(e.set=function(n,r){if(void 0===r)return e.remove(n);if(navigator.userAgent.indexOf("Trident")<0){var o=new Event("setItemEvent");o.val=r,o.key=n,window.dispatchEvent(o)}return t.setItem(n,r),r},e.get=function(e){return t.getItem(e)},e.remove=function(e){t.removeItem(e)},e.clearAll=function(){t.clear()},e.getAll=function(){var t={};return e.forEach(function(e,n){t[e]=n}),t}):(e.get=function(e){var t,n,r=document.cookie;if(!e)return!1;r=r?r.split(";"):[];for(var o=0;o<r.length;o++)if(n=r[o].split("="),t=n[0].replace(/^\s+/,""),decodeURIComponent(t)===e)return decodeURIComponent(n[1]);return!1},e.set=function(t,n,r){var o=new Date,i="",r=r||{};if(!t||void 0===n)return!1;if("object"==typeof t){r=n;for(var c in t)t.hasOwnProperty(c)&&e.set(c,t[c],r)}else o.setTime(o.getTime()+864e5),i+=encodeURIComponent(t)+"="+encodeURIComponent(n),r.domain&&(i+="; domain="+r.domain),r.path&&(i+="; path="+r.path),r.expires&&(o.setTime(o.getTime()+r.expires),i+="; expires="+o.toUTCString()),r.secure&&(i+="; secure"),document.cookie=i;return!0},e.remove=function(t){return!!t&&e.set(t,"",{expires:-1})}),_APP.inject("KUYU.Store",e)});