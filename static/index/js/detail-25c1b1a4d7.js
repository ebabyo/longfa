require(["KUYU.Service", "KUYU.plugins.alert", "KUYU.Binder", "KUYU.Store", "juicer", "lightbox"], function () {
    function t() {
        this.events = {}
    }

    function e(t) {
        if (!t) return !1;
        var e = document.createElement("div");
        return t = t.replace(/\s+/gi, ""), e.innerHTML = t, e.innerText
    }

    function a() {
        h.get({
            url: "/front/product/getProductDetailExtraInfo/getCouponList",
            data: {storeUuid: B.storeUuid, productUuid: x, regionId: 1385, terminalType: "01"},
            success: function (t) {
                if (0 == t.code && t.data.length > 0 && !B.promotionUuid) {
                    $(".coupon-main").show();
                    for (var e = t.data, a = "", i = "", o = 0; o < e.length; o++) o <= 2 && (a += "<li><span>满" + e[o].couCondition + "减" + e[o].denomination + "</span></li>"), 3 == o && ($(".more-coupon").show(), q = 1), i += "<li " + (e[o].convertIntegral ? "style='width:260px' coup=" + e[o].convertIntegral : "") + " data-uuid=" + e[o].uuid + " ><span>满" + e[o].couCondition + "减" + e[o].denomination + '</span><a href="javascript:;" ' + (e[o].convertIntegral ? "style='width:130px'" : "") + ">" + (e[o].convertIntegral ? "领取(抵扣" + e[o].convertIntegral + "积分)" : "领取") + "</a></li>";
                    $(".coupon-show").html(a), $(".m_discount_pop").html(i)
                }
            }
        })
    }

    function i(t) {
        h.get({
            url: "/front/product/getProductFavourState",
            data: {productUuid: t, ranNum: Math.ceil(1e5 * Math.random())},
            success: function (e) {
                var a = e.retData;
                a && (a = a.favoriteState), e.code == CODEMAP.status.success && ("1" == a ? $(".purc-start").html('<em class="active">&#xe636;</em>取消收藏') : $(".purc-start").html('<em class="">&#xe636;</em>收藏')), $(".purc-start").attr({
                    "data-uuid": t,
                    onclick: "KUYU.setCollect('" + t + "','" + a + "','" + e.code + "')"
                })
            }
        })
    }

    function o(t) {
        h.post({
            url: "/front/product/createQrCode",
            data: {productUuid: t, ranNum: Math.random()},
            success: function (t) {
                $(".pQrCode").each(function (e, a) {
                    a.src = t.retData
                })
            }
        })
    }

    function r(t) {
        var e = $(".y_servicetab li"), a = e.length;
        a > 0 && e.width(1 / a * 100 + "%"), $(".y_servicetab li").click(function () {
            $(this).addClass("active").siblings().removeClass("active"), $(".y_sercecontent .y_sercepane").eq($(this).index()).addClass("active").siblings().removeClass("active")
        })
    }

    function s(t) {
        $(window).scroll(function (e) {
            var a, i, o, r, s, n = $(this).scrollTop(), u = 0;
            a = $("#details-l").offset().top - 50, r = $("#comment").offset().top - 150, i = $(".details-fixed").html().indexOf('<a href="#policy">') > -1 ? $("#policy").offset().top - 150 : 0, s = t.indexOf('<a name="productAttribute"></a>') > -1 ? $("a[name='productAttribute']").parent().offset().top - 150 : 0, o = $(".details-fixed").html().indexOf('<a href="#question">') > -1 ? $("#question").offset().top - 150 : 0, n > a && (u = 0), s && n > s && (u = 1), i && n > i && (u = $(".details-fixed").find("[href='#policy']").parent("li.item").index()), o && n > o && (u = $(".details-fixed").find("[href='#question']").parent("li.item").index()), n > r && (u = $(".details-fixed").find("[href='#comment']").parent("li.item").index()), $(".details-fixed ul li").eq(u).addClass("active").siblings().removeClass("active")
        })
    }

    function n(t, e) {
        h.post({
            url: "/front/product/showProductComments",
            data: {productUuid: x, nowPage: t, pageShow: e, ranNum: Math.random()},
            success: function (t) {
                if (t && (u(t), t.wm)) {
                    var e = t.wm, a = e.totalNum, i = e.pageShow;
                    c(e.nowPage, i, a)
                }
            }
        })
    }

    function u(t) {
        var a = "";
        if (t.commentList && t.commentList.length > 0) for (var i = 0; i < t.commentList.length; i++) {
            var o = t.commentList[i], r = o.firstShopComment, s = o.firstShopCommentScores, n = o.firstReplyComment,
                u = o.firstShowImgs, c = o.afterShopComment, d = o.afterReplyComment, m = o.afterShowImgs,
                p = o.specList;
            if (a += '<table cellspacing="0" cellpadding="0" class="comm-table">   <tr>       <td class="user-img">', o.customerImageUrl ? a += '<img src="' + o.customerImageUrl + '" />' : a += '<img src="../../app/images/default.png"/>', a += "</td><td>" + r.customerName + '   <span class="fr">' + l(r.appTime) + '</span></td><td class="user-star">   <ul class="comm-star star-r j-star">', s) for (var h = 0; h < s.length; h++) {
                var f = s[h];
                if ("1" == f.appType) for (var v = 1; v <= f.appScore; v++) a += '<li class="item active"></li>'
            }
            if (a += '   </ul></td></tr><tr>   <td></td>   <td>        <p class="tab-mar">' + e(r.comments) + "</p>", u && u.length > 0) {
                a += '<p class="reply-img">';
                for (var h = 0; h < u.length; h++) {
                    var g = u[h];
                    a += '<a class="" href="' + g.imgUrl + '" data-lightbox="img">   <img class="maxheight" src="' + g.imgUrl + '"></a>'
                }
                a += "</p>"
            }
            if (a += "</td>", p) {
                a += '<td class="text-c">   <div class="attr-text">';
                for (var h = 0; h < p.length; h++) {
                    var y = p[h];
                    a += "<span>" + y.value + "</span>"
                }
                a += "</div></td>"
            }
            if (a += "</tr>", n && (a += '<tr>   <td>   </td>    <td class="comm-child">       <p class="child-img">           <img src="../../app/images/y_recomd5.jpg"/>           <span class="red">官方回复</span>           <span class="fr">' + l(n.operTime) + '</span>       </p>       <p class="child-img">' + n.replyContent + "</p></td><td></td></tr>"), c) {
                if (a += '<tr>   <td></td>   <td class="comm-child">       <p class="child-img">', o.customerImageUrl ? a += '<img src="' + o.customerImageUrl + '" />' : a += '<img src="../../app/images/default.png"/>', a += '<span>买家追评</span><span class="fr">' + l(c.appTime) + "</span></p><p>" + e(c.comments) + '</p><p class="reply-img">', m) {
                    a += '<p class="reply-img">';
                    for (var h = 0; h < m.length; h++) {
                        var g = m[h];
                        a += '<a href = "' + g.imgUrl + '" data-lightbox="img">   <img src="' + g.imgUrl + '"></a>'
                    }
                    a += "</p>"
                }
                a += "</p></td><td></tr>"
            }
            d && (a += '<tr>   <td></td>   <td class="comm-child">       <p class="child-img">           <img src="../../app/images/y_recomd5.jpg"/>           <span class="red">官方回复</span>       <span class="fr">' + l(d.operTime) + '       </span></p>       <p class="child-img">' + d.replyContent + "</p>   </td>   <td></td></tr>"), a += "</table>"
        }
        $(".commentList").html(a)
    }

    function c(t, e, a) {
        if (totalPage = Math.ceil(a / e), _.nowPage = t, _.pageShow = e, _.totalNum = a, _.totalPage = totalPage, html = "", totalPage < 8) {
            if (html += '<button class="prev" ', 1 == t && (html += "disabled"), html += ' style="background:#fff"><</button>', 0 != totalPage) for (var i = 1; i <= totalPage; i++) html += '<span class="item ', t == i && (html += "active"), html += '" title="第' + i + '页">' + i + "</span>"; else html += '<span class="item active" title="第1页">1</span>';
            html += '<button class="next" ', t == totalPage && (html += "disabled"), html += ' style="background:#fff">></button>', $(".padding-box .clearmar").html(html)
        } else if (totalPage >= 8 && t < 7) {
            html += '<button class="prev" ', 1 == t && (html += "disabled"), html += ' style="background:#fff"><</button>';
            for (var i = 1; i <= 7; i++) html += '<span class="item ', t == i && (html += "active"), html += '" title="第' + i + '页">' + i + "</span>";
            html += '<button class="next" ', t == totalPage && (html += "disabled"), html += ' style="background:#fff">></button>', $(".padding-box .clearmar").html(html)
        } else {
            html += '<button class="prev" ', 1 == t && (html += "disabled"), html += ' style="background:#fff"><</button>', html += '<span class="item" title="第1页">1</span>', html += '<span class="item" title="第2页">2</span>', html += '<span class="item" title="第3页">3</span>', html += '<span class="item" title="第...页">...</span>';
            var o = t - 1, r = t + 1, s = o - 1;
            t == totalPage && (html += '<span class="item" title="第' + s + '页">' + s + "</span>"), html += '<span class="item" title="第' + o + '页">' + o + "</span>", t <= totalPage && (html += '<span class="item active" title="第' + t + '页">' + t + "</span>"), t + 1 <= totalPage && (html += '<span class="item" title="第' + r + '页">' + r + "</span>"), html += '<button class="next" ', t == totalPage && (html += "disabled"), html += ' style="background:#fff">></button>', $(".padding-box .clearmar").html(html)
        }
    }

    function d(t, e) {
        function a() {
            var e = "/cart/downLoadCoupon?random=" + Math.random();
            h.get({
                url: e, data: {couponTypeUuid: t, ranNum: Math.random()}, success: function (t) {
                    "0" == t.code ? Msg.Alert("", "领取成功", function () {
                    }) : "3" == t.code ? Msg.Alert("", "您已经领取过了", function () {
                    }) : t.code == CODEMAP.status.notLogin || t.code == CODEMAP.status.TimeOut ? Msg.Alert("", "请先登录", function () {
                        f.nextPage("login", "")
                    }) : Msg.Alert("", t.msg, function () {
                    })
                }, error: function (t) {
                    throw t
                }
            })
        }

        e ? Msg.Confirm("", "领取该优惠券，需抵扣积分值" + e, function () {
            a()
        }) : a()
    }

    function l(t) {
        t = new Date(t);
        var e = t.getFullYear(), a = t.getMonth() + 1;
        a < 10 && (a = "0" + a);
        var i = t.getDate();
        return i < 10 && (i = "0" + i), e + "-" + a + "-" + i
    }

    function m(t) {
        var e = $("#productad");
        t && h.get({
            url: "/front/product/getAdByProductCategoryUuid?terminalType=01&platform=platform_tcl_shop&categoryUuid=" + t,
            success: function (t) {
                if (1 == t.headState) {
                    var a = "<div class='divs'><a href=" + (t.headUrl ? t.headUrl : "javascript:void(0)") + " ><img src=" + t.headImg + " ></a></div>";
                    e.html(a)
                }
                if (1 == t.tailState) {
                    var i = "<div class='divs'><a href=" + (t.tailUrl ? t.tailUrl : "javascript:void(0)") + " ><img src=" + t.tailImg + " ></a></div>";
                    $("#productadTail").html(i)
                }
            }
        })
    }

    function p() {
        $("#colorItem").html(), $("#sizeItem").html();
        $("#provinceId").val() && $("#provinceId").val();
        var t = ($("#areaUuid").val(), 0), e = ($("#skuNo").val(), $("#buyNum").val()), a = g.get("shoppingcart");
        if (a) {
            var i = JSON.parse(a), o = i.storeMap[B.localStoreId];
            _.storeMap[B.localStoreId] = o
        } else _.storeMap[B.localStoreId] = [];
        $.each(_.storeMap[B.localStoreId], function (a, i) {
            null == i.isSuitMain && i.productUuid == x && (t = parseInt(i.buyNum) + parseInt(e), i.buyNum = t)
        }), t <= 0 && _.storeMap[B.localStoreId].push({
            productUuid: x,
            recommender: I,
            buyNum: e,
            attrId: B.skuNo,
            storeUuid: B.storeUuid,
            type: "01",
            nowPromotion: B.nowPromotion,
            opeTime: (new Date).getTime()
        }), g.set("shoppingcart", JSON.stringify(_)), f.nextPage("cart", {})
    }

    var h = KUYU.Service, f = KUYU.Init, v = KUYU.Binder, g = KUYU.Store, y = f.Map(), b = f.Map(),
        k = KUYU.Init.getParam(), U = KUYU.Init.getEnv(), w = KUYU.Init.getService(), P = (w[U.sever], KUYU.RootScope);
    k = KUYU.Init.getParam(), f.cookie(), t.prototype.addEventListener = function (t, e) {
        "function" == typeof e && (this.events[t] = e)
    }, t.prototype.dispatchEvent = function (t, e) {
        var a = {};
        a.body = e, this.events[t](a)
    };
    var N = new t, I = k.tkcid || "", S = encodeURIComponent(location.href), x = $("#GLOBAL_UUID").val(),
        C = $("#GLOBAL_TYPE").val(), M = $("#GLOBAL_categoryUuid").val(), A = $("#secondParentCategoryName").val(),
        B = {localStoreId: "03d03b6b05604c5cb065aef65b72972e"}, _ = {storeMap: {}}, D = "";
    B.promotionUuid = $("#promotionUuid").val(), B.nowPromotion = "", B.skuNo = $("#skuNo").val(), B.reserveOrderId = $("#reserveOrderId").val(), B.reservePromotionUuid = $("#reservePromotionUuid").val(), B.activeStatus = $("#activeStatus").val(), B.preSaleType = $("#preSaleType").val(), B.parentSkuNo = $("#parentSkuNo").val(), B.showTypedisp = $("#showTypedisp").val(), B.storeUuid = $("#storeUuid").val();
    var T = {
        seckill: function () {
            function t() {
                if (r > 0) {
                    r -= 1;
                    var t = Math.floor(r % 60), e = Math.floor(r / 60 % 60), a = Math.floor(r / 3600 % 24),
                        i = Math.floor(r / 3600 / 24);
                    $("#limit_endTime").html(i + "天" + a + "时" + e + "分" + t + "秒")
                } else o && window.clearInterval(o), "status2" == activeStatus ? $("#limit_endTime").html("活动还没开始") : ($("#limit_endTime").html("活动已结束"), $("#promotionSub a").removeClass().addClass("bespoke disabled"))
            }

            var e = $('<a class="buy" id="buyAId" href="javascript:;" >立即购买</a>');
            $("#promotionSub").html(e);
            var a = $('<a href="javascript:;" class="buy" id="fixedFastBuy">立即购买</a>');
            $("#fixedBuy").html(a), K.getProvince(), T.skipGroupProduct(), n(1, 5);
            var i = function () {
                var t = ($("#productUuid").val(), $("#provinceId").val()), e = $("#cityId").val(),
                    a = $("#region").val(), i = $("#areaUuid").val();
                $("#skuNo").val(), $("#limitpromotionUuid").val();
                h.get({
                    url: "/cart/checkLimitBuy",
                    data: {
                        promotionUuid: B.promotionUuid,
                        skuNo: B.skuNo,
                        areaUuid: i,
                        region: a,
                        provinceId: t,
                        cityId: e,
                        _t: Math.random()
                    },
                    success: function (t) {
                        "true" == t.code ? window.location.href = "/pages/limitProduct/limitProduct.html?skuNo=" + B.skuNo + "&promotionUuid=" + B.promotionUuid + "&areaId=" + i : 1 == t.code ? window.location.href = "http://user.tcl.com/proxy/login?from=" + S : t.code == CODEMAP.status.TimeOut || t.code == CODEMAP.status.notLogin ? Msg.Alert("", "未登录", function () {
                            window.location.href = "http://user.tcl.com/proxy/login?from=" + S
                        }) : Msg.Alert("", t.message, function () {
                        })
                    }
                })
            };
            e.on("click", function (t) {
                $(this).hasClass("disabled") || i()
            }), a.on("click", function (t) {
                $(this).hasClass("disabled") || i()
            });
            var o, r = parseInt($("#seckillTime").val(), 10);
            t(), function () {
                "" == $("#handEndTime").val() ? o = window.setInterval(t, 1e3) : ($("#limit_endTime").html("活动已结束"), $("#promotionSub a").removeClass().addClass("bespoke disabled"))
            }()
        }, skipGroupProduct: function () {
            $("#groupedProduct").on("click", ".options .groupedproduct", function () {
                var t = $(this).attr("data-uuid");
                if (t) {
                    var e = window.location.origin + "/" + t;
                    I && (e += "?tkcid=" + I), window.location.href = e
                }
            })
        }, ImgShow: function () {
            var t = $(".purc-img .item"), e = $(".purc-list .radius "), a = ($(".video-3d-main span"), 0), i = 0;
            $.each(e, function (a, i) {
                $(this).on("click", function (i) {
                    e.removeClass("active"), t.removeClass("active"), $(this).addClass("active"), t.eq(a).addClass("active")
                })
            }), $(".video-3d-main span").on("click", function () {
                $(this).addClass("cur").siblings("span").removeClass("cur"), $(this).parents(".video-3d-main").find("li").eq($(this).index()).show().siblings("li").hide(), $(".pop-main").find("ul li video").trigger("pause")
            }), $(".purchase .video-3d-main ul li img").on("click", function () {
                var t = $(this).attr("data-play");
                "/app/images/playicon.png" == $(this).attr("src") ? (0 == a && ($(".pop-main").find("ul li video").attr("src", t), a = 1), $(".pop-main").find("ul li video").trigger("play")) : 0 == i && ($(".pop-main").find("ul li iframe").attr("src", t), i = 1);
                var e = $(this).parents("li").index();
                $(".pop-mask").show(), $(".pop-main").show(), $(".pop-main").find("span").eq(e).addClass("cur").siblings("span").removeClass("cur"), $(".pop-main").find("ul li").eq(e).show().siblings("li").hide()
            }), $(".pop-main .video-3d-main span").on("click", function () {
                var t = $(this).attr("data-play");
                0 == a && ($(".pop-main").find("ul li video").attr("src", t), a = 1), 0 == i && ($(".pop-main").find("ul li iframe").attr("src", t), i = 1)
            }), $(".pop-main .btn-close").on("click", function () {
                $(".pop-mask").hide(), $(".pop-main").hide(), $(".pop-main").find("ul li video").trigger("pause")
            })
        }, upDateTime: function () {
            function t() {
                if (a > 0) {
                    a -= 1;
                    var t = Math.floor(a % 60), i = Math.floor(a / 60 % 60), o = Math.floor(a / 3600 % 24),
                        r = Math.floor(a / 3600 / 24);
                    $("#daysId").html(r), $("#hoursId").html(o), $("#minutesId").html(i), $("#secondeId").html(t)
                } else window.clearInterval(e), window.location.reload()
            }

            var e, a = parseInt($("#SysSecond").val(), 10);
            "status1" != B.activeStatus && "status2" != B.activeStatus && "status3" != B.activeStatus && "status4" != B.activeStatus || (e = window.setInterval(t, 1e3))
        }
    };
    if (localStorage.getItem("add") && "" != localStorage.getItem("add")) var O = JSON.parse(localStorage.getItem("add")),
        E = O.province, R = O.city, L = O.region, j = O.street; else E = "01", R = "100", L = "1000", j = "10000";
    var K = {
        param: {checkedProvince: E, checkedCity: R, checkedRegion: L, checkStreets: j}, changeButton: function (t, e) {
            $("#promotionSub"), $("#fixedBuy");
            "status2" == t ? D = "/front/product/addProductToOrder" : "1" == e ? D = "/front/product/presaleProductToOrder" : "2" == e && (D = "/front/product/presaleProductToOrder")
        }, getProvince: function () {
            h.get({
                url: "/usercenter/region/getAllProvince", data: {time: Math.random()}, success: function (t) {
                    t || Msg.Alert("", "获取区域地址失败", function () {
                    });
                    var e = t;
                    if (e.length > 0) {
                        for (var a = "", i = 0; i < e.length; i++) {
                            var o = e[i], r = "";
                            o.uuid == K.param.checkedProvince && (r = K.param.checkedProvince, $("#provincetitle").html(o.provinceName)), a = a + "<li provinceliid='" + o.uuid + "' onclick='getAddress.showCity(\"" + o.uuid + '" ,"");\' >' + o.provinceName + "</li>"
                        }
                        a = a + "<input type='hidden'   name='province' id='provinceId'  value='" + r + "' />", $("#provinces").html(a), K.param.checkedProvince && ($("[provinceliid='" + K.param.checkedProvince + "']").parents(".m_areabox .mc").hide(), $("[provinceliid='" + K.param.checkedProvince + "']").parents(".m_areabox .mc").next(".m_areabox .mc").show(), $("#provinceId").val(K.param.checkedProvince))
                    }
                    "" != K.param.checkedProvince && ("" != K.param.checkedCity && (K.param.checkedCity, K.showCity(K.param.checkedProvince, K.param.checkedCity, K.param.checkedRegion, K.param.checkStreets)), K.param.checkedProvince), "" != K.param.checkedRegion && K.param.checkedRegion, K.param.checkStreets, "" == K.param.checkStreets && ($("#buyAId").addClass("disabled bespoke"), $("#fixedFastBuy").addClass("disabled bespoke"), $("#buyAId").attr("href", "javascript:;"), $("#fixedFastBuy").attr("href", "javascript:;"))
                }, error: function (t) {
                }
            })
        }, showCity: function (t, e, a, i) {
            $("#citytitle").html("请选择城市"), $("#regiontitle").html("请选择地区"), $("#streettitle").html("请选择街道"), $("#regions").html(""), $("#streets").html(""), h.get({
                url: "/usercenter/region/getCitysByProvinceUuid",
                data: {provinceUuid: t, time: Math.random()},
                success: function (i) {
                    for (var o = i, r = "", s = 0; s < o.length; s++) {
                        var n = o[s], u = "";
                        n.uuid == e && (u = e, $("#citytitle").html(n.cityName)), 0 == s && ($("#cityId").val(n.uuid), $("#citytitle").html(n.name)), r = r + "<li cityliid='" + n.uuid + "'  onclick='getAddress.showRegion(\"" + n.uuid + '" ,"");\' >' + n.cityName + "</li>"
                    }
                    r = r + "<input  type='hidden'   name='city' id='cityId'  value='" + u + "' />", $("#citys").html(r), $("#provincetitle").html($("[provinceliid='" + t + "']").html()), $("#provinceId").val(t), $("[provinceliid='" + t + "']").parents(".m_areabox .mc").hide(), $("[provinceliid='" + t + "']").parents(".m_areabox .mc").next(".m_areabox .mc").show(), $("#provincetitle").parent("li").removeClass("hover"), $("#citytitle").parent("li").addClass("hover"), e && ($("[cityliid='" + e + "']").parents(".m_areabox .mc").hide(), $("[cityliid='" + e + "']").parents(".m_areabox .mc").next(".m_areabox .mc").show(), $("#cityId").val(e), $("#citytitle").parent("li").removeClass("hover"), $("#regiontitle").parent("li").addClass("hover")), "" != e && "" != a && K.showRegion(e, K.param.checkedRegion, K.param.checkStreets)
                }
            })
        }, showRegion: function (t, e, a) {
            h.get({
                url: "/usercenter/region/getRegionsByCityUuid",
                data: {cityUuid: t, time: Math.random()},
                success: function (i) {
                    for (var o = i, r = "", s = 0; s < o.length; s++) {
                        var n = o[s], u = "";
                        n.uuid == e && (u = e, $("#regintitle").html(n.regionName)), r = r + "<li  regionliid='" + n.uuid + "'  onclick='getAddress.showStreet(\"" + n.uuid + '","");\'>' + n.regionName + "</li>"
                    }
                    r = r + "<input type='hidden'   name='region' id='region''  value='" + u + "' />", $("#regions").html(r), $("#citytitle").html($("li[cityliid='" + t + "']").html()), $("#cityId").val(t), $("[cityliid='" + t + "']").parents(".m_areabox .mc").hide(), $("[cityliid='" + t + "']").parents(".m_areabox .mc").next(".m_areabox .mc").show(), $("#citytitle").parent("li").removeClass("hover"), $("#regiontitle").parent("li").addClass("hover"), e && ($("[regionliid='" + e + "']").parents(".m_areabox .mc").hide(), $("[regionliid='" + e + "']").parents(".m_areabox .mc").next(".m_areabox .mc").show(), $("#region").val(L), $("#regiontitle").parent("li").removeClass("hover"), $("#streettitle").parent("li").addClass("hover")), "" != e && "" != a && K.showStreet(L, a)
                }
            })
        }, showStreet: function (t, e) {
            h.get({
                url: "/usercenter/region/getStreetsByRegionUuid",
                data: {regionUuid: t, time: Math.random()},
                success: function (a) {
                    for (var i = a, o = "", r = 0; r < i.length; r++) {
                        var s = i[r], n = "";
                        s.uuid == e && (n = e, $("#streettitle").html(s.streetName)), o = o + "<li streetliid='" + s.uuid + "' onclick='getAddress.checkstock(\"" + s.uuid + "\")' >" + s.streetName + "</li>"
                    }
                    o = o + "<input type='hidden' name='street' id='street'   value='" + n + "' />", $("#streets").html(o), $("#regiontitle").html($("li[regionliid='" + t + "']").html()), $("#region").val(t), $("[regionliid='" + t + "']").parents(".m_areabox .mc").hide(), $("[regionliid='" + t + "']").parents(".m_areabox .mc").next(".m_areabox .mc").show(), $("#regiontitle").parent("li").removeClass("hover"), $("#streettitle").parent("li").addClass("hover"), "" != e && K.checkstock(e)
                }
            })
        }, checkstock: function (t) {
            $(".y_sendarea").removeClass("y_aretive"), $("#street").val(t), $("#streettitle").html($("li[streetliid='" + t + "']").html()), $("#areaUuid").val(t), K.updateAddressMsg(), K.hasProduct(), "" != K.param.checkedRegion && (B.promotionUuid || K.getProductRelSuit(x, K.param.checkedRegion))
        }, hasProduct: function (t) {
            var e = $("#region").val(), a = $("#areaUuid").val(), i = B.skuNo, o = B.parentSkuNo, r = B.showTypedisp,
                s = $("#provinceId").val(), n = $("#buyNum"), u = $("#cityId").val(), c = $("#buyNum").val(),
                d = function (t) {
                    t.retData.totalNum && t.retData.totalNum > 0 ? (n.val(t.retData.totalNum).data("max", t.retData.totalNum), Msg.Alert("", "库存不足，请减少库存尝试", function () {
                    })) : ($("#isProduct").html("无货"), $("#fastBuy").attr("href", "javascript:;"), $("#buyAId").attr("href", "javascript:;"), $("#fixedFastBuy").attr("href", "javascript:;"), $("#buyAId").addClass("bespoke disabled"), $("#fastBuy, #fixedFastBuy").addClass("fastBuyDisabled"), $("#fastBuy, #fixedFastBuy").attr("disabled", !0), $("#fastBuy, #fixedFastBuy").addClass("bespoke"), "subscribe" != r && ($("#buyAId").removeClass("buy"), $("#buyAId").addClass("bespoke disabled")), "subscribe" != r && "reserve" != r && ($("#fastBuy").attr("href", "javascript:;"), $("#buyAId").attr("href", "javascript:;")), n.val(1), Msg.Alert("", "库存不足，请减少库存尝试", function () {
                    }))
                };
            /^\d{1,7}$/.test(c) ? c <= 1 && (c = 1) : c > n.data("max") ? (Msg.Alert("", "库存不足，请减少库存尝试", function () {
            }), c = n.data("max"), n.val(c)) : c = 1;
            var l = "/front/product/hasProduct", m = {
                region: e,
                areaUuid: a,
                skuNo: i,
                buyNum: c,
                bcustomerUuid: "",
                bType: "",
                parentSkuNo: o,
                time: Math.random(),
                reservePromotionUuid: B.reservePromotionUuid
            };
            B.skuNo && B.promotionUuid && (l = "/front/product/hasLimitProduct", m = {
                region: e,
                areaUuid: a,
                skuNo: i,
                buyNum: c,
                bType: "",
                provinceId: s,
                promotionUuid: B.promotionUuid,
                cityId: u,
                parentSkuNo: o,
                time: Math.random()
            }), h.post({
                url: l, data: m, success: function (e) {
                    var a = e.retData;
                    if (0 == e.code) {
                        var i = B.activeStatus, o = B.preSaleType;
                        a.hasProduct ? (m.reservePromotionUuid && (a.canBuy && a.hasProduct && a.totalNum > 0 ? a.canBuy = !0 : a.canBuy = !1), a.canBuy ? (n.data("max", e.retData.totalNum), e.retData.totalNum && c > e.retData.totalNum && Msg.Alert("", "库存不足，请减少库存尝试", function () {
                        }), $("#isProduct").html("有货"), $("#buyAId").removeClass("bespoke disabled"), "true" != C ? K.changeButton(i, o) : $("#buyNum").val(1), $("#buyAId").addClass("buy"), "subscribe" != r && "reserve" != r && ($("#fastBuy, #fixedFastBuy").removeClass("fastBuyDisabled"), $("#fastBuy, #fixedFastBuy").attr("disabled", !1)), "reserve" == r && ($("#fastBuy, #fixedFastBuy").removeClass("fastBuyDisabled"), $("#fastBuy, #fixedFastBuy").attr("disabled", !1))) : ($("#isProduct").html("商品不在该销售区域内"), $("#buyAId").attr("href", "javascript:;"), $("#buyAId").addClass("bespoke disabled"), $("#fastBuy, #fixedFastBuy").addClass("fastBuyDisabled"), $("#fastBuy, #fixedFastBuy").attr("disabled", !0), $("#fastBuy, #fixedFastBuy").addClass("bespoke"), "subscribe" != r && ($("#buyAId").removeClass("buy"), $("#buyAId").addClass("bespoke")))) : d(e), $.isFunction(t) && t()
                    }
                }
            })
        }, getProductRelSuit: function (t, e) {
            h.post({
                url: "/front/product/getSuitMainByRegion", data: {productUuid: x, regionId: e}, success: function (t) {
                    var e = $("#suitList");
                    if (B.Suit = t.retData, "" != B.Suit && e.show(), "1" == t.code && t.retData.length > 0) {
                        var a = function (e) {
                            var a = "";
                            return $.each(e, function (e, i) {
                                var o = 0, r = "", s = "";
                                a += ' <div class="suit-item">', $.each(i.suitProductRellist, function (e, n) {
                                    a += '<input type="hidden" suitUuid="' + i.uuid + '" class="suitproductskuno" value="' + n.skuNo + '" parentSkuNo="' + n.parentSkuNo + '" />', 0 != o || x != n.productUuid && t.productUuid != n.productUuid || (a += '<div class="sale-item">   <img style="width: 140px ; height: 140px" src="' + n.productSkuListModel.smallImg + '" />   <p class="name">' + n.productSkuListModel.productName + '</p>      <strong class="price">¥' + n.productSkuListModel.price + '          <font class="suitSplitError" skuNo="' + n.skuNo + '"></font>      </strong></div>', o = 1, r = n.uuid), s = n.storeUuid
                                }), $.each(i.suitProductRellist, function (t, e) {
                                    e.buyNum || (e.buyNum = 1), r != e.uuid && (a += '<div class="sale-item sale-add">  <span class="sale-plus"></span></div>', a += ' <div class="sale-item">     <a href="/' + e.productUuid + '"><img style="width: 140px ; height: 140px" src="' + e.productSkuListModel.smallImg + '" /></a>     <p class="name">' + e.productSkuListModel.productName + '</p>      <strong class="price">¥' + e.productSkuListModel.price + '          <font class="suitSplitError" skuNo="' + e.skuNo + '"></font>      </strong></div>')
                                }), a += '   <div class="sale-item sale-add fr">', i.description && (a += '<p class="sale-text sd">Hot：' + i.description + "</p>"), a += '      <p class="sale-text st">套装价:</p>      <p class="sale-text sp">¥' + i.totalAmount + "<s>¥" + i.costAmount + '</s></p>      <p></p>      <button class="buy fastBuyDisabled buySuitBtn" index="' + e + '" storeUuid="' + s + '" suitUuid="' + i.uuid + '">立即购买</button>    </div> </div>'
                            }), a
                        };
                        juicer.register("setDom", a);
                        var i = juicer('<div class="sale">      <ul class="sale-tit">          {@each retData as suit , index}                   <li suitUuid="${suit.uuid}" class="item ${index ==0?"active":"" }">${suit.name}</li>          {@/each}      </ul>      <div class="sale-pro">             $${retData| setDom}      </div>  </div>', t);
                        e.html(i);
                        var o = $(".sale-tit li"), r = $(".sale-pro .suit-item");
                        r.hide(), $.each(o, function (t, e) {
                            r.eq(0).show(), $(this).on("mouseover", function () {
                                o.removeClass("active"), r.hide(), $(this).addClass("active"), r.eq(t).show()
                            })
                        }), K.hasSuitProduct(t.retData), $(".buySuitBtn").click(function () {
                            var t = $(this).attr("suitUuid"), e = $(this).attr("index"), a = B.Suit,
                                i = $("#areaUuid").val(), o = a[e], r = [], s = g.get("shoppingcart");
                            if (s) {
                                var n = JSON.parse(s);
                                B.storeUuid;
                                var u = n.storeMap[B.localStoreId];
                                _.storeMap[B.localStoreId] = u
                            } else _.storeMap[B.localStoreId] = [];
                            Array.prototype.map || (Array.prototype.map = function (t, e) {
                                var a, i, o;
                                if (null == this) throw new TypeError(" this is null or not defined");
                                var r = Object(this), s = r.length >>> 0;
                                if ("[object Function]" != Object.prototype.toString.call(t)) throw new TypeError(t + " is not a function");
                                for (e && (a = e), i = new Array(s), o = 0; o < s;) {
                                    var n, u;
                                    o in r && (n = r[o], u = t.call(a, n, o, r), i[o] = u), o++
                                }
                                return i
                            });
                            var c = {}, d = {};
                            _.storeMap[B.localStoreId].map(function (t, e, a) {
                                d[t.productUuid] = a[e], r.push(t.suitUuid)
                            }), o.suitProductRellist.map(function (t, e, a) {
                                c[t.productUuid] = a[e]
                            }), _.storeMap[B.localStoreId].length < 2 ? $.each(o.suitProductRellist, function (t, e) {
                                _.storeMap[B.localStoreId].push({
                                    suitUuid: e.suitUuid,
                                    buyNum: e.buyNum,
                                    attrId: e.skuNo,
                                    isSuitMain: e.isSuitMain,
                                    distributorUuid: "",
                                    productUuid: e.productUuid,
                                    storeUuid: e.storeUuid,
                                    type: "01",
                                    opeTime: (new Date).getTime()
                                })
                            }) : _.storeMap[B.localStoreId].map(function (t, e, a) {
                                c[t.productUuid] && c[t.productUuid].suitUuid == t.suitUuid ? t.buyNum = parseInt(t.buyNum) + 1 : o.suitProductRellist[e] && -1 == $.inArray(o.suitProductRellist[e].suitUuid, r) && _.storeMap[B.localStoreId].push({
                                    suitUuid: o.suitProductRellist[e].suitUuid,
                                    buyNum: o.suitProductRellist[e].buyNum,
                                    attrId: o.suitProductRellist[e].skuNo,
                                    isSuitMain: o.suitProductRellist[e].isSuitMain,
                                    distributorUuid: "",
                                    storeUuid: o.suitProductRellist[e].storeUuid,
                                    type: "01",
                                    productUuid: o.suitProductRellist[e].productUuid,
                                    opeTime: (new Date).getTime()
                                })
                            }), h.post({
                                url: "/front/product/addSuitProductToCartKuyu",
                                data: {
                                    suitUuid: t,
                                    buyNum: 1,
                                    distributorUuid: "",
                                    mainProductUuid: x,
                                    mainSkuNo: B.skuNo,
                                    areaUuid: i,
                                    recommender: I
                                },
                                success: function (t) {
                                    t.code == CODEMAP.status.success ? f.nextPage("cart", {}) : (g.set("shoppingcart", JSON.stringify(_)), f.nextPage("cart", {}))
                                }
                            })
                        })
                    }
                }
            })
        }, hasSuitProduct: function (t) {
            var e = $("#region").val(), a = $("#areaUuid").val(),
                i = (B.skuNo, B.parentSkuNo, B.showTypedisp, $("#buyNum").val()), o = y, r = b, s = {};
            $.each(t, function (t, e) {
                var a = e.suitProductRellist, i = e.uuid, n = {};
                n[i] = i, r.put(e.uuid, n), $.each(a, function (t, e) {
                    var a = {sku: e.skuNo, parentUUid: i, parentSkuNo: e.parentSkuNo};
                    o.put(e.skuNo + "_" + e.uuid, a), s[e.skuNo] = e.skuNo
                })
            });
            var n = o.values(), u = [];
            $.each(n, function (t, o) {
                h.post({
                    url: "/front/product/hasProduct",
                    data: {
                        region: e,
                        areaUuid: a,
                        skuNo: o.sku,
                        buyNum: i || 1,
                        bcustomerUuid: "",
                        bType: "",
                        parentSkuNo: o.parentSkuNo,
                        time: Math.random(),
                        reservePromotionUuid: B.reservePromotionUuid
                    },
                    success: function (t) {
                        if (0 != t.code) return $(".suitSplitError[skuNo='" + o.sku + "']").text("(该区域无货)"), e.addClass("fastBuyDisabled"), $(".buySuitBtn").off("click"), !1;
                        var e = $(".buySuitBtn[suituuid='" + r.get(o.parentUUid)[o.parentUUid] + "']");
                        if (!(t.retData && t.retData.canBuy && t.retData.hasProduct && t.retData.totalNum > 0)) return $(".suitSplitError[skuNo='" + o.sku + "']").text("(该区域无货)"), e.addClass("fastBuyDisabled"), $(".buySuitBtn").off("click"), !1;
                        N.dispatchEvent("suit", {
                            suit: o.sku,
                            uuid: o.parentUUid,
                            dom: e
                        }), e.removeClass("fastBuyDisabled")
                    }
                })
            }), N.addEventListener("suit", function (t) {
                u.push(s[t.body.suit]), u.length == n.length && t.body.dom.removeClass("fastBuyDisabled")
            })
        }, goTOBuySuit: function () {
            var t = $(".productDetailSuitList .sale-tit li.active");
            t.attr("suitUuid"), $("#colorItem").html(), $("#sizeItem").html();
            $("#provinceId").val() && $("#provinceId").val();
            $("#areaUuid").val(), $("#skuNo").val(), $("#buyNum").val()
        }, updateAddressMsg: function () {
            var t = $("#provincetitle").html(), e = $("#citytitle").html(), a = $("#regiontitle").html(),
                i = $("#streettitle").html();
            $("#selectAreaNameId").html(t + " " + e + " " + a + " " + i).attr("title", t + " " + e + " " + a + " " + i), $(".y_sendarea .y_areasure").hover(function () {
                $(this).parents(".y_sendarea").addClass("y_aretive")
            }), $(".y_arelose").click(function () {
                $(this).parents(".y_sendarea").removeClass("y_aretive")
            }), $(".m_areabox .mt .tab li").click(function () {
                var t = $(this).index(".m_areabox .mt .tab li");
                $(this).addClass("hover").siblings().removeClass("hover"), $(".m_areabox .mc").eq(t).show().siblings(".m_areabox .mc").hide()
            }), $(document).on("click", function () {
                $(".y_sendarea").removeClass("y_aretive")
            }), $(".m_areabox").click(function (t) {
                t.stopPropagation()
            })
        }
    }, F = {
        addBuyNum: function () {
            if (!(B.skuNo && B.promotionUuid || B.reservePromotionUuid)) {
                var t = parseInt($("#buyNum").val());
                if (t >= 999) return void Msg.Alert("", "超过购买上限", function () {
                });
                $("#buyNum").val(t + 1), K.hasProduct()
            }
        }, reduceBuyNum: function () {
            if (!(B.skuNo && B.promotionUuid || B.reservePromotionUuid)) {
                var t = parseInt($("#buyNum").val());
                if (t <= 1) return void $("#buyNum").val(1);
                t -= 1, $("#buyNum").val(t), K.hasProduct()
            }
        }, changeBlur: function (t) {
            if (B.reservePromotionUuid) {
                return void $(t).val(1)
            }
            K.hasProduct(function () {
                if ("status2" != B.activeStatus) {
                    var e = $(t), a = e.val();
                    /^[0-9]{1,3}$/.test(a) ? /\d+/.test(a) && e.val() < 1 && e.val(1) : /^\d+$/.test(a) ? e.val(e.data("max") ? e.data("max") > 999 ? 999 : e.data("max") > 999 : 1) : e.val(1)
                }
            })
        }
    };
    !function (t) {
        "true" == C ? T.seckill() : (T.skipGroupProduct(), T.upDateTime(), K.getProvince(), n(1, 5))
    }(), function () {
        var t = {};
        if (localStorage.getItem("add")) var t = JSON.parse(localStorage.getItem("add"));
        $("#provinces").on("click", "li", function () {
            t.province = $(this).attr("provinceliid")
        }), $("#citys").on("click", "li", function () {
            t.province && (t.city = $(this).attr("cityliid"))
        }), $("#regions").on("click", "li", function () {
            t.city && (t.region = $(this).attr("regionliid"))
        }), $("#streets").on("click", "li", function () {
            t.region && (t.street = $(this).attr("streetliid")), localStorage.setItem("add", JSON.stringify(t)), window.location.reload()
        })
    }(), $(window).on("scroll", function () {
        var t = document.documentElement.scrollTop || document.body.scrollTop;
        $(".light-gray").offset().top, $(".fixed-buy").height();
        if (t >= $("#topDetails").offset().top + 76) {
            $(".fixed-buy").css({"margin-top": "0px"}), $(".details-r").css("visibility", "hidden"), $(".details-fixed").css("visibility", "visible")
        } else $(".fixed-buy").css({"margin-top": "-100px"}), $(".details-r").css("visibility", "visible"), $(".details-fixed").css("visibility", "hidden")
    });
    var q = 0;
    KUYU.selectColor = function (t, e, a, i) {
        if (!$(t).hasClass("active")) {
            for (var o = $(t).parent().find("li"), r = 0; r < o.length; r++) o.eq(r).hasClass("active") && o.eq(r).removeClass("active");
            $(t).addClass("active");
            for (var s = "", r = 0; r < $(".colorItem").find(".active").length; r++) r < $(".colorItem").find(".active").length - 1 ? s += $(".colorItem").find(".active").eq(r).attr("attr-uuid") + "-" : s += $(".colorItem").find(".active").eq(r).attr("attr-uuid");
            B.skuNo = $("#" + s).attr("skuno"), B.parentSkuNo = $("#" + s).attr("parentskuno");
            var n = window.location.href.split("?")[0];
            n = n + "?skuNo=" + $("#" + s).attr("skuno"), I && (n += "&tkcid=" + I), window.location.href = n
        }
    }, KUYU.setCollect = function (t, e, a) {
        function i(t) {
            1 == t ? o("/front/product/cancelFavorite", function (t) {
                "1" == t && (s.data("cid", "2"), s.find("em").removeClass("active"), s.html('<em class="">&#xe636;</em>收藏'))
            }) : o("/front/product/collectProduct", function (t) {
                "1" == t || "3" == t ? (s.html('<em class="active">&#xe636;</em>取消收藏'), s.data("cid", "1")) : "403" == t.code && Msg.Alert("", "请登录", function () {
                    window.location.href = "http://user.tcl.com/proxy/login?from=" + S
                })
            })
        }

        function o(e, a) {
            h.get({
                url: e, data: {productUuid: t, ranNum: Math.random()}, success: function (t) {
                    a(t)
                }, error: function (t) {
                    throw t
                }
            })
        }

        var r = g.get("_ihome_token_"), s = $(".purc-start"), n = s.data("cid");
        r ? i(void 0 == n ? e : n) : Msg.Alert("", "请登录", function () {
            window.location.href = "http://user.tcl.com/proxy/login?from=" + S
        })
    }, $(document).on("click", ".m_discount_pop li a", function () {
        d($(this).parent("li").attr("data-uuid"), $(this).parent("li").attr("coup"))
    }), $(document).on("click", ".more-coupon", function (t) {
        $(".m_discount_pop").show(), $(".more-coupon").hide(), t.stopPropagation()
    }), $(document).on("click", ".coupon-show li", function (t) {
        $(".m_discount_pop").show(), $(".more-coupon").hide(), t.stopPropagation()
    }), $(".coupon-show"), $(document).on("click", function () {
        $(".m_discount_pop").hide(), 1 == q && $(".more-coupon").show()
    }),
        $(document).on("click", ".clearmar span:gt(0),.clearmar span:lt(8)", function () {
            nowPage = $(this).html(), nowPage.indexOf("...") > -1 || ($(this).addClass("active").siblings().removeClass("active"), n(nowPage, _.pageShow))
        }), $(document).on("click", ".clearmar .prev", function () {
        _.nowPage > 1 && (nowPage = _.nowPage - 1), n(nowPage, _.pageShow)
    }), $(document).on("click", ".clearmar .next", function () {
        _.nowPage < _.totalPage && (nowPage = _.nowPage + 1), n(nowPage, _.pageShow)
    }), window.getAddress = K, P.addBuyNum = F.addBuyNum, P.reduceBuyNum = F.reduceBuyNum, P.changeBlur = F.changeBlur, P.submitTOBuy = function (t) {
        if ($(t).hasClass("bespoke")) return !1;
        var e = {productUuid: x, buyNum: 1, skuNo: B.skuNo};
        if ("status2" == B.activeStatus && h.post({
            url: D,
            data: e,
            headers: {"Content-Type": "application/x-www-form-urlencoded"},
            success: function (t) {
                403 == t.code || "-6" == t.code ? Msg.Alert("", "会话失效或未登录", function () {
                    window.location.href = "http://user.tcl.com/proxy/login?from=" + S
                }) : f.nextPage("addProductToOrderKuyu", {
                    title: $(".purc-name span").text(),
                    secondParentCategoryName: A,
                    skuNo: t.retData.skuNo,
                    productId: t.retData.submodel.productUuid,
                    buyNum: t.retData.productBuyNum,
                    storeNote: t.retData.submodel.uuid,
                    submodelUuid: t.retData.submodel.uuid,
                    rushBuyBeginTime: t.retData.submodel.rushBuyBeginTime,
                    recommender: I
                })
            }
        }), "status4" == B.activeStatus) {
            var a = B.reserveOrderId;
            !function (t, e, a) {
                h.post({
                    url: e, data: t, success: function (t) {
                        t.code == CODEMAP.status.success ? a(t) : t.code == CODEMAP.status.notLogin || t.code == CODEMAP.status.TimeOut ? Msg.Alert("", t.msg, function () {
                            window.location.href = "http://user.tcl.com/proxy/login?from=" + S
                        }) : Msg.Alert("", t.msg, function () {
                        })
                    }
                })
            }({}, "/tclcustomer/userInfo", function (t) {
                "" == a || null == a ? Msg.Alert("", "对不起!您没有预约不能参与抢购活动！", function () {
                }) : f.nextPage("perserveBuyKuyu", {productUuid: x, reserveOrderId: B.reserveOrderId, skuNo: B.skuNo})
            })
        }
    }, P.submitPreSaleTOBuy = function () {
        var t = $("#buyNum").val();
        "2" != B.preSaleType && "1" != B.preSaleType || h.post({
            url: D,
            data: {dealerBcustomerUuid: "", pIds: x, buyNum: t, attrIds: B.skuNo, chooseCod: "", willType: 2},
            success: function (e) {
                e.code == CODEMAP.status.success ? window.location.href = "/pages/addProductToOrder/addProductToOrder.html?pIds=" + x + "&attrIds=" + B.skuNo + "&buyNum=" + t + "&willType=2&preSale=" + B.reservePromotionUuid : e.code != CODEMAP.status.TimeOut && e.code != CODEMAP.status.notLogin || (window.location.href = "http://user.tcl.com/proxy/login?from=" + S)
            }
        })
    }, P.toFastBuy = function (t) {
        if ($(t).hasClass("bespoke")) return !1;
        h.post({
            url: "/cart/removeKuyu",
            data: {productIdAndAttrId: "remove_" + x + "_" + B.skuNo},
            success: function (t) {
                t.code == CODEMAP.status.success ? h.post({
                    url: "/cart/changeChooseKuyu",
                    data: {productIdAndAttrId: "allRecords", chooseState: !1},
                    success: function (t) {
                        if (t.code == CODEMAP.status.success) {
                            var e = $("#buyNum").val();
                            h.post({
                                url: "/front/product/addProductToCart",
                                data: {productUuid: x, buyNum: e, attrId: B.skuNo, recommender: I},
                                success: function (t) {
                                    _smq.push(["custom", "PC", "goumai"]), 3 == t.code || 4 == t.code ? Msg.Alert("", t.msg, function () {
                                        window.location.href = window.location.href
                                    }) : t.code == CODEMAP.status.success ? window.location.href = "/pages/productInfo/productInfo.html" : t.code == CODEMAP.status.notLogin || "403" == t.code ? p() : Msg.Alert("", t.retData, function () {
                                    })
                                }
                            })
                        }
                    }
                }) : Msg.Alert("", "请先登录", function () {
                    window.location.href = "http://user.tcl.com/proxy/login?from=" + S
                })
            }
        })
    }, P.toAddtoCartBuy = function (t) {
        if ($(t).hasClass("bespoke")) return !1;
        var e = $("#buyNum").val();
        h.post({
            url: "/front/product/addProductToCart",
            data: {productUuid: x, buyNum: e, attrId: B.skuNo, recommender: I},
            success: function (t) {
                3 == t.code || 4 == t.code ? Msg.Alert("", t.msg, function () {
                    window.location.href = window.location.href
                }) : t.code == CODEMAP.status.success ? Msg.Alert("温馨提示", "已加入购物车", function () {
                }) : t.code == CODEMAP.status.notLogin || "403" == t.code ? p() : Msg.Alert("", t.retData, function () {
                })
            }
        })
    }, f.Ready(function () {
        $.cookie("tkcid", I, {expires: 1, path: "/"}), a(), i(x), o(x), T.ImgShow(), m(M), r();
        var t = $("#details-l").html();
        $("#details-l").html().indexOf('<a name="productAttribute"></a>') > -1 ? $(".checkIfProductAttribute").show() : $(".checkIfProductAttribute").hide(), $("#policy").height() > 65 ? $(".policyCla").show() : $(".policyCla").hide(), s(t), $("#details-l img").lazyload({
            placeholder: "../../app/images/lazy.png",
            threshold: 180,
            effect: "fadeIn"
        }), $(".reply-img img").lazyload({
            placeholder: "../../app/images/loadbg.gif",
            threshold: 180,
            effect: "fadeIn"
        }), v.init()
    });
    try {
        rtgsettings = {
            pdt_id: $("#productUuid").val(),
            pdt_price: $("#productPrice").val(),
            pdt_amount: $("#productBasePrice").val(),
            pdt_currency: "¥",
            pdt_url: location.href,
            pagetype: "product",
            key: "DIR",
            token: "TCL_CN",
            layer: "iframe"
        }, function (t) {
            var e = t.createElement("script");
            e.async = !0, e.id = "madv2014rtg", e.type = "text/javascript", e.src = ("https:" == t.location.protocol ? "https:" : "http:") + "//tc.solocpm.com/Visibility/Rtgdir2-min.js";
            var a = t.getElementsByTagName("script")[0];
            a.parentNode.insertBefore(e, a)
        }(document)
    } catch (t) {
        throw t
    }
});