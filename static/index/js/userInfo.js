define("KUYU.userInfo",["KUYU.Service","KUYU.Store"],function(){var e=KUYU.Service,o=(KUYU.Store,function(o){e.get({url:"/tclcustomer/userInfo",data:{ranNum:Math.floor(1e4*Math.random())},success:function(e){if(e.code==CODEMAP.status.success){var a=JSON.stringify(e.data),r=e.data.fanliInfo;if("FANLI"==e.data.userType){var t=JSON.parse(r);t.platform=t.platform||1,t.s_id=t.s_id||1846,$.cookie("fanliCookie",JSON.stringify(t),{expires:30,path:"/"})}else $.removeCookie("fanliCookie",{path:"/"});sessionStorage.setItem("userinfo",a)}else localStorage.removeItem("_ihome_token_"),$.removeCookie("ihome_token",{path:"/"}),$.removeCookie("fanliCookie",{path:"/"}),Array.of&&console.warn(e);o(e)}})});_APP.inject("KUYU.userInfo",o)});