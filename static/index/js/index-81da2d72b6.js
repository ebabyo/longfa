require(["KUYU.Service", "KUYU.plugins.slide", "placeholder", "KUYU.Store", "KUYU.plugins.alert"], function () {
    function e() {
        var e = $(".float_nav");
        float_nav_h = e.outerHeight(!0);
        var o = $(window).height(), n = $(document).scrollTop();
        e.css({top: o / 2 - float_nav_h / 2}), n > l.offset().top - 250 ? e.show() : e.hide()
    }

    function o() {
        var e = {};
        if (a.get("shoppingcart")) {
            var o = a.get("shoppingcart"), n = JSON.parse(o),
                s = n ? n.storeMap["03d03b6b05604c5cb065aef65b72972e"] : [], r = {}, l = {};
            $.each(s, function (e, o) {
                l[o.storeUuid] = []
            }), $.each(s, function (e, o) {
                l[o.storeUuid] && l[o.storeUuid].push(o)
            }), r.storeMap = l, e.storeMap = l
        } else window.location.href = "/";
        i.getHeaders()["Content-Type"] = "application/json; charset=utf-8", t.post({
            url: "/login/mergeCart",
            data: JSON.stringify(e),
            success: function (e) {
                e.code == CODEMAP.status.success && (a.remove("shoppingcart"), window.location.href = "/")
            }
        })
    }

    function n() {
        var e = s.couponTypeUuid;
        e && t.post({
            url: "/usercenter/coupondetails/getCouponDetail",
            data: {couponTypeUuid: e},
            success: function (o) {
                if (o.code == CODEMAP.status.success) {
                    var n = o.retData, t = new Date(n.endTime.replace(/-/g, "/")), i = new Date, a = i > t,
                        s = a ? "知道了" : "点击领取", r = a ? "background-position:0 -51px" : "",
                        l = '<div style="text-align:left;margin-left:50px;"><p style="float:left;width: 100px;background-image: url(/app/images/zqyh.png);background-size: 100px;height: 54px;color: #fff;text-align: center;line-height: 54px;font-size: 20px;margin-right: 10px;' + r + '">&yen;' + n.money + '</p><div style="overflow: hidden;line-height: 27px;"><p>消费满' + n.minConsumeMoney + "可使用</p><p>" + n.beginTime.substring(0, 10) + "~" + n.endTime.substring(0, 10) + "</p></div></div>";
                    a && (l += '<div style="margin-top:20px;font-size:13px;color:#999;">此优惠券已过期，下次早点来哦~</div>'), Msg.Confirm('<span style="display:block;text-align:center;font-size: 18px;">优惠券</span>', l, function () {
                        a || (window.location.href = "cart/downLoadCouponUrl?couponTypeUuid=" + e)
                    }, function () {
                    }, s), a && $("#mb_btn_no").hide()
                }
            }
        })
    }

    var t = KUYU.Service, i = KUYU.Init, a = KUYU.Store, s = (KUYU.Init.getEnv(), KUYU.Init.getParam()),
        r = (KUYU.Init.getService(), {
            imgHover: function () {
                $(".tv_sec_right li").each(function (e, o) {
                    $(this).on("mouseover", function () {
                        $(this).removeClass("hoverimg"), $(this).addClass("hoverimg")
                    }), $(this).on("mouseout", function () {
                        $(this).removeClass("hoverimg")
                    })
                })
            }, bannerHover: function () {
                var e = null;
                $("#ban-nav .ul li").hover(function () {
                    e && (clearTimeout(e), e = null);
                    var o = $(this).attr("uuid"), n = $(".ban-nav-cont[uuid=" + o + "]").attr("width");
                    $(".ul li").removeClass("active"), $(this).addClass("active"), $(".ban-nav-cont").hide(), $(".ban-nav-box").show(), $(".ban-nav-cont[uuid=" + o + "]").show(), $(".ban-nav-box").css("width", n)
                }, function () {
                    $(".ban-nav-cont").hide(), $(".ban-nav-box").hide(), e = setTimeout(function () {
                        $(".ul li").removeClass("active"), $(".ban-nav-box").hide(), $(".ban-nav-cont").hide(), $(".ban-nav-box").hide()
                    }, 100)
                }), $(".ban-nav-cont").hover(function () {
                    e && (clearTimeout(e), e = null);
                    var o = $(this).attr("uuid");
                    $("#ban-nav .ul li").removeClass("active"), $("#ban-nav .ul li[uuid=" + o + "]").addClass("active"), $(".ban-nav-box").show(), $(".ban-nav-cont[uuid=" + o + "]").show()
                }, function () {
                    e = setTimeout(function () {
                        $("#ban-nav .ul li").removeClass("active"), $(".ban-nav-box").hide(), $(".ban-nav-cont").hide()
                    }, 100)
                })
            }, leftnav: function () {
                var e = 0;
                $(document).on("click", ".float_nav li", function () {
                    e = $(this).index();
                    var o = $(".tv_series" + e).offset().top - 10;
                    $("body,html").stop().animate({scrollTop: o + "px"}, 500)
                }), $(window).scroll(function () {
                    for (var e = document.documentElement.scrollTop || document.body.scrollTop, o = $(".float_nav li").length, n = 0; n < o; n++) e > 730 + 650 * n && e < 730 + 650 * (n + 1) && ($(".float_nav").show(), $(".float_nav li a").removeClass("nav-color").eq(n).addClass("nav-color")), e > 730 + 650 * (n + 1) && ($(".float_nav li a").removeClass("nav-color"), $(".float_nav").hide()), e < 730 && $(".float_nav").hide()
                })
            }, thirdLogin: function () {
                var e = KUYU.Init.getParam("detail");
                if (e && e.detail) {
                    var n = JSON.parse(e.detail);
                    n.loginCallBack && n.loginCallBack.url && t.post({
                        url: "/login/loginBind",
                        data: {detail: JSON.stringify(n)},
                        success: function (e) {
                            if ("0" == e.code) {
                                localStorage ? localStorage.setItem("_ihome_token_", e.data.token) : $.cookie ? $.cookie("_ihome_token_", e.data.token, {expires: 1}) : Array.of && console.warn("can't store");
                                var t = n.user;
                                sessionStorage.userinfo = t, o()
                            } else if ("-1" == e.code) alert("登录失败"), window.location.href = "/"; else if ("-6" == e.code) {
                                var i = window.location.search.substring(1);
                                window.location.href = "/pages/register/thirdLogin.html?" + i
                            }
                        }
                    })
                }
            }
        }), l = ($(".help").outerHeight(!0), $(".series"));
    $(".footer").outerHeight(!0);
    $(window).scroll(function () {
        e()
    }), window.onresize = function () {
        e()
    }, i.Ready(function () {
        $(".banner").Slide({
            eles: $(".banner-slide"),
            dots: $(".banner-dots"),
            slideshow: !0
        }), $("img.hot-img").lazyload({
            effect: "fadeIn",
            skip_invisible: !1
        }), r.imgHover(), r.bannerHover(), r.leftnav(), r.thirdLogin(), n()
    }), $(function () {
        $(".anchors").show()
    });
    try {
        rtgsettings = {
            pdt_url: location.href,
            pagetype: "home",
            key: "DIR",
            token: "TCL_CN",
            layer: "iframe"
        }, function (e) {
            var o = e.createElement("script");
            o.async = !0, o.id = "madv2014rtg", o.type = "text/javascript", o.src = ("https:" == e.location.protocol ? "https:" : "http:") + "//tc.solocpm.com/Visibility/Rtgdir2-min.js";
            var n = e.getElementsByTagName("script")[0];
            n.parentNode.insertBefore(o, n)
        }(document)
    } catch (e) {
        throw e
    }
});