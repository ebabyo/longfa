(function ($, undefined) {
    /* @file custom view
	 * @release date 2019.05.21 10:01:43
	 */
    $.themesURI = 'http://mcenter6.ntalker.com/themes/kf_9428/images/';
})(nTalk);
!function (t, e) {
    var s = function () {
    }, o = "javascript:void();", a = t.Class.create();
    a.prototype = {
        name: "myScroll",
        mainBox: null,
        contentBox: null,
        scrollBar: null,
        _wheelFlag: 0,
        _wheelData: -1,
        timeID: null,
        options: null,
        initialize: function (i, e, s, o) {
            this.mainBox = i.talkVersion ? i : t(i), this.contentBox = e.talkVersion ? e : t(e), this.options = t.extend({width: 0}, o), this.mainBox.length && this.contentBox.length && (this._createScroll(s), this.resizeScroll(), this._tragScroll(), this._wheelChange(), this._clickScroll())
        },
        scrollBottom: function () {
            var t = this;
            this.mainBox.length && this.contentBox.length && (clearTimeout(this.timeID), this.timeID = setTimeout(function () {
                t.resizeScroll(), t.mainBox.scrollTop(t.mainBox.scrollHeight()), t.scrollBox.css("top", Math.floor(t.mainBox.offset().top - t.scrollBox.offset().top) + "px"), t.scrollBar.css("top", t.scrollBox.height() - t.scrollBar.height() + "px"), t._wheelFlag = 12 * (t.mainBox.height() - t.scrollBar.height())
            }, 50))
        },
        _createScroll: function (i) {
            return this.mainBox.css("overflow-y", "hidden"), this.scrollBox = t({
                className: "view-scrollBox",
                style: t.STYLE_NBODY + "display:block;border-radius:9px;"
            }).appendTo(this.mainBox), this.scrollBar = t({
                className: i,
                style: t.STYLE_NBODY + "background:#ff6640;border-radius:10px;position:absolute;width:6px;top:0;border-radius:9px;box-shadow:0 2px 3px #ff6640 inset;"
            }).appendTo(this.scrollBox), t({tag: "span", style: t.STYLE_NBODY}).appendTo(this.scrollBar), this.scrollBar
        },
        resizeScroll: function () {
            var t = this.mainBox.width(),
                i = (parseInt(this.mainBox.css("border-left-width")) || 0) + (parseInt(this.mainBox.css("border-right-width")) || 0),
                e = parseInt(this.contentBox.css("margin-left")) + parseInt(this.contentBox.css("margin-right")),
                s = this.mainBox.height() - 10 - i, o = this.scrollBar.width() || 6;
            this.scrollBox.css({
                position: "absolute",
                background: "#fafafa",
                width: this.scrollBar.width() + "px",
                height: this.mainBox.height() + "px",
                right: "12px",
                top: "0px",
                "box-shadow": "0 1px 2px #e3e3e3 inset"
            }), this.contentBox.css({width: Math.max(this.options.width, t - o - e) + "px"});
            var a = Math.max(this.contentBox.height(), this.mainBox.height()), n = parseInt(s * (s / a)) || 300;
            n >= this.mainBox.height() ? this.scrollBox.display() : this.scrollBox.display(1), this.scrollBar.css("height", n + "px")
        },
        _tragScroll: function () {
            var i = this;
            this.scrollBar.bind("mousedown", function (e) {
                function s(e) {
                    var s = t.Event.fixEvent(e).clientY - n + a;
                    s > o - i.scrollBar.height() && (s = o - i.scrollBar.height()), s <= 0 && (s = 0);
                    var l = s * (i.contentBox.height() / i.mainBox.height());
                    i.mainBox.scrollTop(l), i.scrollBox.css("top", Math.floor(l) + "px"), i.scrollBar.css("top", s + "px"), i._wheelData = s
                }

                e = t.Event.fixEvent(e);
                var o = i.mainBox.height(), a = i.scrollBar.offset().top - i.scrollBox.offset().top, n = e.clientY;
                t(document).bind("mousemove", s), t(document).bind("mouseup", function (i) {
                    t(document).removeEvent("mousemove", s)
                })
            }).hover(function (i) {
                t(this).css("background", "#ff6640")
            }, function (i) {
                t(this).css("background", "#ff6640")
            })
        },
        _wheelChange: function () {
            var t = this, i = 0;
            this._mouseWheel(this.mainBox, function (e) {
                t._wheelFlag += e, t._wheelData >= 0 ? (i = t._wheelData, t.scrollBar.css("top", i + "px"), t._wheelFlag = 12 * t._wheelData, t._wheelData = -1) : i = t._wheelFlag / 12, i <= 0 && (i = 0, t._wheelFlag = 0), i >= t.mainBox.height() - t.scrollBar.height() && (i = t.mainBox.height() - t.scrollBar.height(), t._wheelFlag = 12 * (t.mainBox.height() - t.scrollBar.height()));
                var s = i * (t.contentBox.height() / t.mainBox.height());
                t.mainBox.scrollTop(s), t.scrollBox.css("top", Math.floor(s) + "px"), t.scrollBar.css("top", i + "px")
            })
        },
        _clickScroll: function () {
            var i = this;
            this.scrollBox.click(function (e) {
                e = t.Event.fixEvent(e);
                var s = e.clientY + t(window).scrollTop() - i.mainBox.offset().top - i.scrollBar.height() / 2;
                if (s <= 0 && (s = 0), s >= i.mainBox.height() - i.scrollBar.height() && (s = i.mainBox.height() - i.scrollBar.height()), e.target != i.scrollBar) {
                    var o = s * (i.contentBox.height() / i.mainBox.height());
                    i.mainBox.scrollTop(o), i.scrollBox.css("top", Math.floor(o) + "px"), i.scrollBar.css("top", s + "px"), i._wheelData = s
                }
            })
        },
        _mouseWheel: function (i, e) {
            function s(i) {
                return i = t.Event.fixEvent(i), i.wheelDelta ? i.wheelDelta : 40 * i.detail
            }

            i.bind("mousewheel", function (t) {
                var i = -s(t);
                e(i), document.all ? window.event.returnValue = !1 : t.preventDefault()
            }).bind("DOMMouseScroll", function (t) {
                var i = s(t);
                e(i), t.preventDefault()
            })
        }
    };
    var n = t.Class.create();
    n.prototype = {
        name: "chatView",
        contains: null,
        loadElement: null,
        chatElement: null,
        messageElement: null,
        displayiFrame: null,
        chatHistory: null,
        objFile: null,
        objImage: null,
        _tempHeader: null,
        _chatsHeader: null,
        _chatsElement: null,
        _maxNumber: 50,
        _sendKey: "Enter",
        _editorStart: 0,
        _initFace: !1,
        _eventFunction: s,
        scroll: null,
        _listenNumber: 0,
        _listenTimeID: null,
        _inputTimerID: null,
        buttonSelectors: null,
        imageHash: {},
        evalRepeatClick: !0,
        mode: null,
        options: null,
        siteid: "",
        settingid: "",
        isRobotSuggest: !0,
        initialize: function (i, e) {
            return this.options = i, this.siteid = this.options.siteid, this.settingid = this.options.settingid, this.mode = e, this.buttonSelectors = {
                face: "chat-view-face",
                image: "chat-view-image",
                file: "chat-view-file",
                history: "chat-view-history",
                loadhistory: "chat-view-load-history",
                evaluate: "chat-view-evaluate",
                capture: "chat-view-capture",
                capoptions: "chat-view-capture-options",
                csr: "chat-view-change-csr",
                manual: "chat-view-switch-manual",
                submit: "chat-view-submit",
                exp: "chat-view-exp",
                xiaonengver: "chat-view-xiaoneng-version"
            }, this.mode ? (this.scroll = null, void this._create()) : void t.Log("mode is null", 3)
        },
        _create: function () {
            this.contains = t({
                className: "chat-view-contains",
                key: this.settingid,
                style: t.STYLE_NBODY + "overflow:hidden;width:100%;height:auto;position:relative;left:0;top:0;padding-top:1px solid #fff\\0;background:#fff;"
            }).appendTo(this.options.chatContainter), this.loadElement = t({
                className: "chat-view-load",
                style: t.STYLE_BODY + "height:" + this.options.height + "px;_height:" + (this.options.height - 240) + "px;box-sizing:border-box;display:block;"
            }).appendTo(this.contains).html(this._getViewHtml("load")), this.chatElement = t({
                className: "chat-view-window",
                style: t.STYLE_BODY + "width:100%;height:auto;display:none;padding-top:1px solid #fff\\0;"
            }).appendTo(this.contains).html(this._getViewHtml("window")), this.messageElement = t({
                className: "chat-view-message",
                style: t.STYLE_BODY + "height:539px;display:none;float:left;width:374px;border:1px solid #e4e4e4;border-top:none;border-radius: 0 0 5px 5px;"
            }).appendTo(this.contains).html(this._getViewHtml("message")), this.displayiFrame = t({
                tag: "iframe",
                id: "chat-view-submit-iframe",
                name: "chat-view-submit-iframe",
                className: "chat-view-submit-iframe",
                style: t.STYLE_NBODY + "display:none;"
            }).appendTo(this.contains), this.contains.append(this._getViewHtml("alert")), this.chatHistory = this.chatElement.find(".chat-view-window-history2"), this._tempHeader = this.options.chatHeader.find(".chat-header-icon,.chat-header-name,.chat-header-sign,.ntalk-button-maxresize,.ntalk-button-min,.ntalk-button-close"), this.options.chatHeader.find(".ntalk-button-maxresize").css({
                display: "none",
                width: "0px",
                height: "0px",
                overflow: "hidden",
                opacity: "0",
                margin: "0",
                padding: "0"
            }), this.options.chatHeader.find(".ntalk-button-close,.ntalk-button-min").css({
                margin: "25px 11px 0 0",
                width: "15px",
                height: "15px"
            }), this.options.chatHeader.find(".ntalk-button-min").css({
                margin: "25px 11px 0 0",
                width: "15px",
                height: "15px",
                "background-position": "-1px -2px"
            }), this.options.chatHeader.find(".header-chatrecord-title").length || t({
                className: "header-chatrecord-title",
                style: t.STYLE_BODY + "font-weight:bold;float:left;margin:15px 10px 5px 20px;height:20px;visibility:visible;overflow:hidden;display:none;color:#ffffff;"
            }).appendTo(this.options.chatHeader.find(".chat-header-body")).html(t.lang.button_view), this.options.chatHeader.find(".header-chatrecord-close").length || t({
                className: "header-chatrecord-close",
                style: t.STYLE_NBODY + "float:right;cursor:pointer;margin:20px 5px 0 0;width:20px;height:20px;position:relative;display:none;"
            }).appendTo(this.options.chatHeader), this._chatsHeader = this.options.chatHeader.find(".header-chatrecord-title,.header-chatrecord-close"), this._chatsElement = this.chatElement.find(".chat-view-float-history"), this._bind(), this.callChatResize(this.options.width, this.options.height)
        },
        close: function () {
            this.contains.remove(), this.contains = null, t.isFunction(this._eventFunction) && t(document.body).removeEvent("click", this._eventFunction)
        },
        minimize: function () {
            this.contains.css({
                width: (t.browser.msie && t.browser.ieversion <= 7 ? 1 : 0) + "px",
                height: (t.browser.msie && t.browser.ieversion <= 7 ? 1 : 0) + "px"
            })
        },
        maximize: function () {
            this.contains.css({width: "100%", height: "auto"})
        },
        switchUI: function (t) {
            if (this.contains) switch (t) {
                case this.mode.CON_VIEW_WINDOW:
                    this.contains.find(".chat-view-load,.chat-view-message").display(), this.contains.find(".chat-view-window").display(1), this.scroll || (this.scroll = new a(this.chatHistory, this.chatHistory.find("ul"), "chat-view-scrollBar", {width: 376}));
                    break;
                case this.mode.CON_VIEW_MESSAGE:
                    this.contains.find(".chat-view-load,.chat-view-window").display(), this.contains.find(".chat-view-message").display(1), this._viewHistory(!1), this._stopListen();
                    break;
                case this.mode.CON_VIEW_ERROR:
                    this.contains.find(".chat-view-window,.chat-view-message").display(), this.contains.find(".chat-view-load").display(1), this.contains.find(".chat-view-load-icon, .chat-view-load-info").display(), this.contains.find(".chat-view-load-error").display(1).find("span");
                    break;
                default:
                    this.contains.find(".chat-view-window,.chat-view-message").display(), this.contains.find(".chat-view-load").display(1), this.contains.find(".chat-view-load-error").display(), this.contains.find(".chat-view-load-icon, .chat-view-load-info").display(1)
            }
        },
        showMessage: function (i, e) {
            var s, o, a, n, l, r, h = this, d = 1;
            for (o = [t.STYLE_NBODY + "background:transparent;list-style:none outside none;display:block;padding:23px 30px 0 0;", t.STYLE_NBODY + "background:transparent;list-style:none outside none;display:block;padding:23px 0 0 30px;text-align:right;", t.STYLE_NBODY + "background:transparent;list-style:none outside none;display:block;padding:23px 10px 0 10px;text-align:center;"]; this.chatHistory.find("li[class]").length >= this._maxNumber;) this.chatHistory.find("li[class]").first().remove();
            switch (i) {
                case"left":
                    a = o[0], n = e.msgid;
                    break;
                case"bottom":
                    a = o[0], n = "systembottom";
                    break;
                case"right":
                    a = o[1], n = e.msgid;
                    break;
                case"goods":
                    a = o[2], n = "first";
                    break;
                case"system":
                    a = o[2], n = "system";
                    break;
                case"system0":
                    a = o[2], n = "system0";
                    break;
                case"info":
                    a = o[2], n = e.msgid;
                    break;
                case"otherinfo":
                    a = o[0], n = e.msgid;
                    break;
                default:
                    a = o[2], n = "first"
            }
            if (this.chatHistory.find("li." + n).length && "system" != n) "systembottom" == n && this.chatHistory.find("li." + n).css("visibility", "visible"), s = this.chatHistory.find("li." + n).html(this._getMessageHtml(i, this._contentFilter(e))); else if (e) {
                if ("system" !== n && "system0" !== n || e.enter && 1 == e.enter || this.chatHistory.find("li." + n).remove(), "first" === n && this.chatHistory.find("ul li").length > 1) l = this.chatHistory.find("li").eq(0); else if (r = this.chatHistory.find("li").eq(0 - d), r.indexOfClass("first")) l = null; else {
                    if (r.indexOfClass("systembottom") && (d++, l = r, r = this.chatHistory.find("li").eq(0 - d)), "system" === n && this.mode.enterUserId) {
                        for (; r && r.attr("userid") == this.mode.enterUserId && !(d >= 5);) d++, l = r, r = this.chatHistory.find("li").eq(0 - d);
                        this.mode.enterUserId = ""
                    }
                    for (; r && !r.indexOfClass("first") && !r.indexOfClass("system") && r.attr("localtime") && d <= this.chatHistory.find("li").length && parseFloat(r.attr("localtime")) >= e.localtime && !(d >= 5);) d++, l = r, r = this.chatHistory.find("li").eq(0 - d)
                }
                try {
                    s = t({
                        tag: "li",
                        className: n,
                        localtime: e.localtime,
                        userid: e.userid || "",
                        style: a,
                        history: e.history || "0"
                    }).appendTo(this.chatHistory.find("ul"), l), s.insert(this._getMessageHtml(i, this._contentFilter(e))), s.find(".view-history-content").css("border", "none"), "systembottom" == n && s.find("table td.view-history-content").css("width", "60px")
                } catch (c) {
                    t.Log(c, 3)
                }
                e.xnlink && setTimeout(function () {
                    var i = s.find(".robotQuestion");
                    i.click(function (i) {
                        var i = t.Event.fixEvent(i);
                        return i.preventDefault(), i.stopPropagation(), nTalk.chatManage.get(this.settingid).send(t(this).html().replace(/[[0-9]*]\s/, "")), !1
                    })
                }, 200), "system" != n && s.find("a").click(function () {
                    if (!this.onclick) {
                        var i = t(this).attr("_href") || t(this).attr("href");
                        return t(this).attr("_href", i).attr("target", "_self").attr("href", "###"), "function" == typeof window.openURLToBrowser ? (window.openURLToBrowser(i), !1) : (window.open(i), !1)
                    }
                }), 1 == e.type && "left" == i && this.chatHistory.find("li.systembottom").css("visibility", "hidden")
            } else this.chatHistory.find("li." + n).remove();
            return "systembottom" == n && (clearTimeout(this._inputTimerID), this._inputTimerID = null, this._inputTimerID = setTimeout(function () {
                h.chatHistory.find("li.systembottom").css("visibility", "hidden")
            }, 3e3)), this.scroll && this.scroll.scrollBottom(), e && 1 == e.type && this.loadLinkContainer(e.msgid), "string" == typeof e.msg && e.msg.indexOf('rightTag="true"') > -1 && this.linkInPageFilter(e.msgid), e && /^(1|2|4|6|9|13|8)$/i.test(e.type) && this.updateMessage(e.msgid, e.type, e, "left" === i), 1 == t(".welcome").length && t(".welcome").css("visibility", "hidden").css("visibility", "visible"), n
        },
        linkInPageFilter: function (i) {
            var e = this, s = this.chatHistory.find("." + i).last().find(".view-history-body").find("span");
            s.each(function (i, s) {
                var o = t(s).attr("src"), a = t(s).attr("title") || "自定义标签", n = t(s).attr("closebtn") || !0;
                o.indexOf(e.mode.config.linkinpage) && (t(s).attr("href", "javascript:;").attr("linkinpagesrc", o), s.onclick = null, t(s).bind("click", function () {
                    e.mode.manageMode.view._addRightTag(o, a, n, e)
                }))
            })
        },
        removeMessage: function (t) {
            this.chatHistory.find("." + t).remove()
        },
        updateMessage: function (i, e, s, a) {
            var n, l = this, r = this.chatHistory.find("." + i).last(), h = r.find(".view-history-body").last();
            switch (r.find(".view-history-more").bind("click", function () {
                h.css({
                    height: "auto",
                    "overflow-y": "visible",
                    "max-height": "none"
                }), l.scroll && l.scroll.resizeScroll(), t(this).display()
            }), e + "") {
                case"1":
                    "string" == typeof s ? this._showResend(i, s).click(function (e) {
                        t.Event.fixEvent(e).stopPropagation(), t(this).parent().parent().display(), l.mode.resend(i)
                    }) : h.find(".ntalk-preview").length && h.find(".ntalk-preview").each(function (e) {
                        var s = this, o = t(s).attr("sourceurl"), a = "#image";
                        t(s).attr("robotImg") && (a = "#robotImg#image"), t.require(o + a, function (e) {
                            if (e.error) t(s).display(); else {
                                var o = t.zoom(e, 332, 500);
                                t(s).attr({width: o.width, height: o.height, src: e.src}).click(function (t) {
                                    l._fullScreenImage(this, i)
                                }).css({width: o.width + "px", height: o.height + "px", cursor: "pointer"})
                            }
                            l.scroll && l.scroll.scrollBottom && l.scroll.scrollBottom()
                        })
                    });
                    break;
                case"13":
                    var d, c = [], p = s.msg.item || s.msg.items || {};
                    if (!p || t.isEmptyObject(p)) return;
                    p.url = p.url || o, p.name && c.push('<a href="', p.url, '" target="_blank" style="' + t.STYLE_BODY + 'color:#0479D9;font-weight:bold;">' + p.name + "</a>"), t.each(p, function (i, e) {
                        t.isArray(e) ? (e[1] = (i.indexOf("price") > -1 && p.currency && (e[1] + "").indexOf(p.currency) <= -1 ? p.currency : "") + "" + e[1], c.push('<div style="' + t.STYLE_BODY + '"><span style="' + t.STYLE_BODY + '">' + e[0] + (/zh_cn|zh_tw/i.test(t.lang.language) ? "&#65306;" : ":") + "</span>" + e[1] + "</div>"), t.Log(e[0] + ": " + e[1])) : t.isObject(e) ? (e.v = (i.indexOf("price") > -1 && p.currency && (e.v + "").indexOf(p.currency) <= -1 ? p.currency : "") + "" + e.v, c.push('<div style="' + t.STYLE_BODY + '"><span style="' + t.STYLE_BODY + '">' + e.k + (/zh_cn|zh_tw/i.test(t.lang.language) ? "&#65306;" : ":") + "</span>" + e.v + "</div>"), t.Log(e.k + ": " + e.v)) : t.lang.goodsinfo[i] && (e = (i.indexOf("price") > -1 && p.currency && (e + "").indexOf(p.currency) <= -1 ? p.currency : "") + e, c.push('<div style="' + t.STYLE_BODY + '"><span style="' + t.STYLE_BODY + '">' + t.lang.goodsinfo[i] + (/zh_cn|zh_tw/i.test(t.lang.language) ? "&#65306;" : ":") + " </span>" + e + "</div>"), t.Log(t.lang.goodsinfo[i] + "" + e))
                    }), p.imageurl && t.require(p.imageurl + "#image", function (i) {
                        i.error ? l.chatHistory.find(".view-history-goods-image").html("") : (d = t.zoom(i, 75, 75), l.chatHistory.find(".view-history-goods-image").html('<a href="' + p.url + '" target="_blank" style="' + t.STYLE_BODY + '"><img src="' + p.imageurl + '" width="' + d.width + '" height="' + d.height + '" style="' + t.STYLE_NBODY + "display:inline;width:" + d.width + "px;height:" + d.height + 'px;" /></a>')), l.scroll && l.scroll.scrollBottom()
                    }), l.scroll && l.scroll.scrollBottom(), this.chatHistory.find(".view-history-goods-info").html(c.join(""));
                    break;
                case"8":
                    var c = [], g = s.url, f = navigator.userAgent.toLowerCase();
                    s.from && 1 == s.from && (t.browser.msie && 9 === t.browser.ieversion || f.indexOf("firefox") > -1) ? (c.push(['<video class="ntalker-for-miya-video" style="width:240px;transform:rotate(90deg);-ms-transform:rotate(90deg);margin-left:-30px;margin-top:30px;height:180px"  loop>', '<source src="' + g + '" type="video/mp4">', "</video>", '<span class="ntkf-video-button" style="display:block;width:52px;height:52px;background:url(' + t.button + ') center no-repeat;background-size:100%;position:absolute;top:50%;left:0;right:0;margin:-26px auto 0;"></span>'].join("")), h.css({
                        width: "180px",
                        height: "240px"
                    })) : t.browser.msie && t.browser.ieversion < 9 ? c.push(["<span>", t.lang.cant_play_video, "</span>"].join("")) : (c.push(['<video class="ntalker-for-miya-video" style="width:100%;height:100%;"  loop>', '<source src="' + g + '" type="video/mp4">', "</video>", '<span class="ntkf-video-button" style="display:block;width:52px;height:52px;background:url(' + t.button + ') center no-repeat;background-size:100%;position:absolute;top:50%;left:0;right:0;margin:-26px auto 0;"></span>'].join("")), h.css({width: "137px"})), h.parent().css({padding: "3px"}), h.css({
                        "line-height": "0",
                        padding: "0",
                        position: "relative"
                    }).html(c), t(".ntkf-video-button").click(function (i) {
                        i.stopPropagation(), t(this).css("display", "none"), t(this).parent().find("video").get(0).play()
                    }), t(".view-history-body").click(function (i) {
                        i.stopPropagation(), t(this).find("video").get(0).pause(), t(this).find(".ntkf-video-button").css("display", "block")
                    });
                    break;
                case"2":
                case"4":
                    2 == s.type && 1 == s.emotion ? (t.require(s.sourceurl + "#image", function (i) {
                        if (i.error) t.Log("emotion file failure.", 3), s.msgid && l.removeMessage(s.msgid); else {
                            var e = t.zoom(i, 100, 85);
                            h.css({
                                background: "none",
                                cursor: "auto",
                                height: e.height + "px"
                            }).html('<img src="' + s.sourceurl + '" sourceurl="' + s.sourceurl + '" width="' + e.width + '" height="' + e.height + '" style="' + t.STYLE_NBODY + "width:" + e.width + "px;height:" + e.height + 'px;vertical-align:middle;" />')
                        }
                        l.scroll && l.scroll.scrollBottom()
                    }), l.scroll && l.scroll.scrollBottom()) : "UPLOADING" == s.status ? (r.find("table").css("width", "138px"), n = 2 == e ? "-98px -145px" : "0 -245px", h.css({
                        width: "100px",
                        height: "85px",
                        background: "url(" + t.imageicon + ") no-repeat " + n
                    })) : t.isNumeric(s) && s > 0 && s <= 100 ? r.find(".view-history-progress").display(1).find(".view-history-upload-progress").css("width", s + "%") : s < 0 || s.error ? (2 == e ? (r.find("table").css("width", "138px"), n = 2 == e ? "0 -145px" : "-98px -245px", h.css({
                        width: "100px",
                        height: "85px",
                        background: "url(" + t.imageicon + ") no-repeat " + n
                    }), s == -1 ? this._transCancel(i) : this._showFailure(i)) : this._showFileUpload(r, h, {
                        name: "",
                        size: "",
                        error: a
                    }, -1), r.find(".view-history-progress").display()) : t.isObject(s) && s.url && (2 == e ? t.require(s.url + "#rnd#image", function (e) {
                        var o;
                        if (e.error) t.Log("upload file failure.", 3), r.find("table").css("width", "120px"), h.css({
                            width: "100px",
                            background: "url(" + t.imageicon + ") no-repeat 0 -145px"
                        }); else {
                            var a = '<img src="' + s.url + '" sourceurl="' + s.sourceurl + '" width="' + e.width + '" height="' + e.height + '" style="vertical-align:middle;' + t.STYLE_NBODY + "width:" + e.width + "px;height:" + e.height + 'px;max-width:220px;max-height:160px;" />',
                                n = e.width, d = e.height;
                            e.width < 138 ? (n = 138, e.height < 100 ? (d = 100, o = t.browser.Quirks || 6 != t.browser.ieversion && 7 != t.browser.ieversion ? d : e.height, a = '<div style="width:138px;height:' + o + "px;padding:" + (100 - e.height) / 2 + 'px 0;box-sizing:border-box;text-align:center;background:white;border-radius:5px;max-width:220px;max-height:160px">' + a + "</div>") : a = '<div style="width:138px;height:' + e.height + 'px;text-align:center;background:white;border-radius:5px;max-width:220px;max-height:160px">' + a + "</div>") : e.height < 100 && (d = 100, o = t.browser.Quirks || 6 != t.browser.ieversion && 7 != t.browser.ieversion ? d : e.height, a = '<div style="height:' + o + "px;width:" + e.width + "px;padding:" + (100 - e.height) / 2 + 'px 0;box-sizing:border-box;text-align:center;background:white;border-radius:5px;max-width:220px;max-height:160px">' + a + "</div>"), r.find("table").css("width", (n < 220 ? n : 220) + 26 + "px"), t.Log("upload file(width:" + e.width + ", height:" + e.height + ") success:" + s.url), h.css({
                                background: "none",
                                cursor: "pointer",
                                width: n < 220 ? n + "px" : "220px",
                                height: d < 160 ? d + "px" : "160px",
                                "max-width": "220px",
                                "max-height": "160px"
                            }).html(a).find("img").click(function (t) {
                                l._fullScreenImage(this, i)
                            });
                            var c = r.attr("userid"), p = t.base.checkID(c) <= 1;
                            p && c ? (h.parent().css({
                                padding: "2px",
                                border: "0px solid #e2e2e2"
                            }), h.css("max-width", "170px").css("overflow", "hidden")) : h.parent().css({
                                padding: "2px",
                                border: "1px solid #eff3f6"
                            });
                            var g = r.find(".view-history-angle");
                            g.parent().css("vertical-align", "top"), l.imageHash[i] = 1, "function" != typeof webInfoChanged && h.bind("mouseenter", function (i) {
                                var e = ['<div class="mouse-enter-download" style="', t.STYLE_BODY, 'position:absolute;bottom:0px;width:100%;height:30px;line-height:30px;text-align:right;background:#000;color:white;left:0px">', t.lang.news_download, "&nbsp;&nbsp;</div>"].join("");
                                t(this).css("position", "relative"), t(this).append(e), t(this).find(".mouse-enter-download").css("opacity", .5), t(this).find(".mouse-enter-download").click(function (i) {
                                    t.Event.fixEvent(i).stopPropagation(), l.displayiFrame.attr("src", s.sourceurl || s.url)
                                })
                            }).bind("mouseleave", function (i) {
                                t(this).css("position", "static"), t(this).find(".mouse-enter-download").remove()
                            })
                        }
                        l.scroll && l.scroll.scrollBottom()
                    }) : this._showFileUpload(r, h, s, 1), r.find(".view-history-progress").display());
                    break;
                case"6":
                    new t.Music(i, s.url, "audio/mpeg", s.duration || s.length, this.audioView, this.audioBindEvent, this.contains);
                    break;
                case"9":
                    break;
                default:
                    h.html(s)
            }
        },
        loadLinkContainer: function (i) {
            var e = this,
                s = this.chatHistory.find("." + i).last().find(".view-history-body").find(".ntalk-link-contains");
            s.length && s.each(function (i, s) {
                var o = t(s).attr("data-source"), a = t(s).attr("class");
                o && e.mode.loadLink(o, "." + a.replace(/ntalk\-link\-contains\s+/gi, ""))
            })
        },
        viewLinkContainer: function (i, e) {
            console.log(i);
            var s, o = this, a = t(e);
            if ("kf_9739" == o.siteid) {
                for (var n = !0, l = 0; l < a[0].parentElement.childNodes.length; l++) 3 == a[0].parentElement.childNodes[l].nodeType && (n = !1);
                if (n) for (var r = 0; r < t(a[0].parentElement).find("div").length; r++) "" == nTalk(a[0].parentElement).find("div").eq(r)[0].className && nTalk(a[0].parentElement).find("div").eq(r).find("a").css("display", "none")
            }
            if ("string" == typeof i) try {
                i = t.JSON.parseJSON(i)
            } catch (h) {
            }
            a.css({
                margin: "5px",
                "border-radius": "5px",
                border: "1px solid #CCC",
                "background-color": "#FAFAFA",
                width: "200px"
            }), s = t({
                className: "link-image",
                style: t.STYLE_BODY + "margin:10px;background-color:#fff;width:77px;height:77px;overflow:hidden;float:left;display:inline-block;"
            }).appendTo(a), container = t({
                className: "link-container",
                style: t.STYLE_BODY + "overflow:hidden;zoom:1;"
            }).appendTo(a), t({
                className: "link-title",
                style: t.STYLE_BODY + "margin:10px 0 0 0;width:100%;height:24px;white-space:nowrap;text-overflow:ellipsis;-o-text-overflow:ellipsis;overflow:hidden;"
            }).appendTo(container).html(['<a href="', i.url, '" target="_blank">', i.title, "</a>"].join("")), t({
                className: "link-desc",
                style: t.STYLE_BODY + "margin:5px 0 10px 0;width:100%;max-height:60px;overflow:hidden;"
            }).appendTo(container).html(t.enCut(i.description, 96, 1) + "&nbsp;"), t({
                className: "link-customer",
                style: t.STYLE_BODY + "margin:5px 0 10px 0;width:100%;max-height:60px;overflow:hidden;" + ("kf_9739" == nTalk.global.siteid || "kf_3004" == nTalk.global.siteid ? "color:#f00;" : "")
            }).appendTo(container).html(i.customer), t({
                className: "link-clear",
                style: t.STYLE_BODY + "clear:both;"
            }).appendTo(a), s.css("margin", (a.height() - s.height()) / 2 + "px 10px"), t.require(i.imageurl + "#image", function (e) {
                var a = t.zoom(e, 75, 75), n = (75 - a.height) / 2 + "px " + (75 - a.width) / 2 + "px";
                s.html(['<img src="', i.imageurl, '" style="', t.STYLE_NBODY, "margin:" + n + ";width:" + a.width + "px;height:" + a.height + 'px;"/>'].join("")), o.scroll && o.scroll.scrollBottom()
            })
        },
        scrollBottom: function () {
        },
        suggest: function (i, e) {
            var s = this, o = this.chatElement.find(".chat-view-hidden-area .chat-view-suggest-list");
            return o.find("ul li").remove(), 0 === i.length ? void o.css("display", "none") : (t.each(i, function (i, a) {
                var n = a.replace(s.textEditor.val(), "<span style='color:#ff6f40'>" + s.textEditor.val() + "</span>"),
                    l = t({
                        tag: "LI",
                        talk_index: i,
                        className: "",
                        style: t.STYLE_BODY + "padding:0 0 0 20px;list-style:none;line-height:28px;height:28px;overflow:hidden;cursor:pointer;"
                    }).appendTo(o.find("ul")).html(n).hover(function (i) {
                        t(this).css({color: "#fff", "background-color": "#4297e0"})
                    }, function (i) {
                        t(this).css({color: "#000", "background-color": "#fafafa"})
                    }).click(function (i) {
                        t.Event.fixEvent(i).stopPropagation();
                        var n = parseFloat(t(this).attr("talk_index")) + 1;
                        s.mode.send({msg: e ? a : n, botindex: "index"}), s.textEditor.val(""), setTimeout(function () {
                            o.css("display", "none")
                        }, 200)
                    });
                e && t(l).attr("robotmsg", a)
            }), void o.css({display: "block", top: "auto", bottom: "0px"}))
        },
        _selectSuggest: function (i) {
            var e = this.chatElement.find(".chat-view-suggest-list li"), s = 0;
            e.each(function () {
                t(this).attr("talk_selected") && (s = t(this).attr("talk_index")), t(this).attr("talk_selected", "").css({
                    color: "#000",
                    "background-color": "#fafafa"
                })
            }), s = parseFloat(s) + i, s = s < 0 ? e.length - 1 : s, s = s >= e.length ? s - e.length : s, t.Log("set selected index:" + s), e.eq(s).attr("talk_selected", "1").css({
                color: "#fff",
                "background-color": "#4297e0"
            }), this.isRobotSuggest = !1, this.textEditor.val(e.eq(s).attr("robotmsg") ? e.eq(s).attr("robotmsg") : parseFloat(s) + 1)
        },
        displayStatusInfo: function (i, e) {
            var s = this.chatElement.find(".chat-view-window-status-info");
            e && s.html(e), i ? s.display(1) : s.hide(function () {
                t(this).css({display: "none", opacity: 1})
            })
        },
        showInputState: function (i) {
            if (!this._inputStateTimeID || i !== e) {
                i = i ? i : -22;
                var s = this, o = this.chatHistory.find(".view-history-body-wait");
                o.html(t.lang.system_printing || "").css({
                    position: "relative",
                    width: 7 * t.enLength(t.clearHtml(t.lang.system_printing || "")) + "px",
                    left: "10px",
                    "font-size": "12px",
                    "line-height": "20px"
                }), t({
                    tag: "span",
                    style: "display:block; left: -24px; top:-20px; position:relative; width:20px; height:20px; background: url(" + t.sourceURI + "images/mobileicon.png) -110px -70px no-repeat"
                }).appendTo(o), t({
                    id: "show-input-status-loading",
                    tag: "span",
                    style: "display:block; left: -14px; top:-38px; position:relative; width:20px; height:20px"
                }).html(this.loadingPoint ? this.loadingPoint : "...").appendTo(o);
                var a = 3;
                this._inputStatusLoadingInter || (this._inputStatusLoadingInter = setInterval(function () {
                    s.loadingPoint = "", a--;
                    for (var i = 0; i < a; i++) s.loadingPoint += ".";
                    t("#show-input-status-loading").html(s.loadingPoint), a == -1 && (a = 4)
                }, 1e3)), this._inputStateTimeID = setTimeout(function () {
                    return o.length ? (i = i <= -52 ? -22 : i - 10, o.css("background-position", i + "px -250px"), void s.showInputState(i)) : (clearTimeout(s._inputStateTimeID), clearInterval(s._inputStatusLoadingInter), void (s._inputStateTimeID = null))
                }, 500)
            }
        },
        _showResend: function (i, e) {
            return this.chatHistory.find("." + i).last().find(".view-history-status").display(1), this.chatHistory.find("." + i).last().find(".view-history-status-icon").display(1), this.chatHistory.find("." + i).last().find(".view-history-status-link").html(t.utils.handleLinks(e || t.lang.news_send_failure)).find("a")
        },
        _showCancel: function (i, e) {
            return this.chatHistory.find("." + i).last().find(".view-history-status").display(1), this.chatHistory.find("." + i).last().find(".view-history-status-icon").display(), this.chatHistory.find("." + i).last().find(".view-history-status-link").html('<span style="' + t.STYLE_BODY + 'cursor:pointer;color:#005ffb;text-decoration:none;">' + (t.lang.news_cancel_trans || "") + "</span>").find("span")
        },
        _showDownload: function (i, e, s) {
            var o, a = 4 == s.type && s.oldfile ? s.oldfile : "";
            return o = e ? ['<span class="chat-view-download-link" style="' + t.STYLE_BODY + 'float:left;line-height:26px;margin:0 5px;cursor:pointer;color:#005ffb;text-decoration:none;">' + t.lang.news_download + "</span>", a ? '<span style="' + t.STYLE_BODY + 'float:left;line-height:26px;text-decoration:none;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;max-width:100px;" title="' + a + '">' + this._toFileName(a) + "</span>" : ""].join("") : [a ? '<span style="' + t.STYLE_BODY + 'float:left;line-height:26px;text-decoration:none;display:block;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;max-width:100px;" title="' + a + '">' + this._toFileName(a) + "</span>" : "", '<span class="chat-view-download-link" style="' + t.STYLE_BODY + 'float:left;line-height:26px;margin:0 5px;cursor:pointer;color:#005ffb;text-decoration:none;">' + t.lang.news_download + "</span>"].join(""), this.chatHistory.find("." + i).last().find(".view-history-status").display(1), this.chatHistory.find("." + i).last().find(".view-history-status-icon").display(), this.chatHistory.find("." + i).last().find(".view-history-status-link").html(o).find(".chat-view-download-link")
        },
        _toFileName: function (i) {
            return i = i || "", t.enLength(i) < 16 ? i : t.enCut(i, 10) + ".." + i.substr(i.length - 4, 4)
        },
        _showFailure: function (i) {
            return this.chatHistory.find("." + i).last().find(".view-history-status").display(1), this.chatHistory.find("." + i).last().find(".view-history-status-icon").display(1), this.chatHistory.find("." + i).last().find(".view-history-status-link").html(t.lang.news_trans_failure)
        },
        _transCancel: function (i) {
            return this.chatHistory.find("." + i).last().find(".view-history-status").display(1), this.chatHistory.find("." + i).last().find(".view-history-status-icon").display(1), this.chatHistory.find("." + i).last().find(".view-history-status-link").html(t.lang.news_trans_cancel)
        },
        _showFileUpload: function (i, e, s, o) {
            var a = this;
            i.find("table").css("width", "293px"), i.find("table").css("height", "104px"), e.css("height", "104px");
            var n, l, r, h, d, c = 265, p = [104, 76, 28], g = "none", f = [11, 78], u = [8, -44], x = 270,
                m = [110, 80, 30], v = "1px solid #e2e2e2", w = [13, 80], b = [10, -42], y = i.attr("userid"),
                _ = t.base.checkID(y) <= 1;
            _ && y ? (n = x, l = m, r = v, h = w, d = b) : (n = c, l = p, r = g, h = f, d = u);
            var E = "", k = "", Y = s.oldfile || this.uploadFileName, T = s.oldfile || this.uploadFileName,
                S = this.uploadFileSize ? (this.uploadFileSize / 1024).toFixed(2) : s.size ? parseInt(s.size.replace("KB", "")) : "",
                B = /\.[^\.]+$/, D = T.toLowerCase().match(B), O = [".jpg", ".jpeg", ".png", ".gif", ".bmp", ".pjpeg"],
                L = [".doc", ".docx"], N = [".mp3"], C = [".txt"];
            t.inArray(D[0], O) > -1 ? (E = s.url || "''", k = ' width=50 height=50 style="border: 1px solid #d4d4d4;border-radius:5px;margin:2px"') : E = t.inArray(D[0], N) > -1 ? t.sourceURI + "images/filetype/mp3.png" : t.inArray(D[0], L) > -1 ? t.sourceURI + "images/filetype/doc.png" : t.inArray(D[0], C) > -1 ? t.sourceURI + "images/filetype/txt.png" : t.sourceURI + "images/filetype/zip.png", T.length > 12 && (T = T.substr(0, 4) + "..." + T.substr(T.length - 6, T.length)), S ? S > 1024 ? S = "(" + (S / 1024).toFixed(2) + " MB)" : S < 1024 && (S = "(" + S + " KB)") : S = "";
            var F = 1 == o, z = _ && y ? " display:none " : "", I = F ? " -287px -96px " : " -159px -37px ",
                A = F ? t.lang.news_trans_success : t.lang.news_trans_failure, H = F ? t.lang.news_download : "",
                M = ['<div class="view-fileupload-body" style="', t.STYLE_BODY, "position:relative;width:", "210", "px;height:", l[0], "px;border-radius:5px;background:#eff3f6;border:", "1px solid #eff3f6;", '">', '<div class="view-fileupload-body-top" style="', t.STYLE_BODY, "width:", "210", "px;height:", l[1], 'px;border-bottom:0px solid #e2e2e2">', '<div class="view-fileupload-type-icon" style="', t.STYLE_BODY, "position:relative;width:54px;height:54px;top:", d[0], "px;left:", h[0], 'px"><img src=', E + k, " /></div>", '<div class="view-fileupload-content" style="', t.STYLE_BODY, "position:relative;width:129px;height:54px;top:", d[1], "px;left:", h[1], 'px;text-align:left">', '<span class="view-fileupload-title" title=', Y, ' style="', t.STYLE_BODY, 'cursor:pointer;color:#333333;font-size:12px;font-weight:bold;">', T, "</span>", '<span class="view-fileupload-size" style="', t.STYLE_BODY, 'color:#666666;font-size:12px">', S, "</span>", '<div class="view-fileupload-status" style="', t.STYLE_BODY + z, 'position:relative;top:5px;left:-2px;color:#333333;font-size:12px">', A, "</div>", "</div>", "</div>", '<div class="view-fileupload-body-bottom" style="', t.STYLE_BODY, "position:relative;width:", "210", "px;height:", l[2], 'px">', '<div class="view-fileupload-download" style="', t.STYLE_BODY, "width:auto;height:", l[2], "px;line-height:", l[2], 'px;font-size:12px;color:#0681D7;text-align:right;margin-right:35px;cursor:pointer">', H, "</div>", "</div>", "</div>"].join("");
            e.append(M), _ && y ? e.parent().css({
                padding: "0px",
                border: "1px solid #ff8a5e",
                "max-width": "214px"
            }) : e.parent().css({
                padding: "2px", border: "1px solid #eff3f6"
            });
            var R = i.find(".view-history-angle");
            R.parent().css("vertical-align", "top"), i.find(".view-history-status-link").last().display(0), i.find(".view-history-status").last().display(0), F || (s.error.maxSize ? s.error.error = t.utils.handleLinks(t.lang.news_trans_failure_size, {maxsize: s.error.maxSize / 1048576}) : s.error.ext && (s.error.error = t.utils.handleLinks(t.lang.news_trans_failure_type, {type: s.error.ext})), a.showMessage("system", {
                type: 9,
                msg: '<span style="display:inline-block;width:20px;height:20px;position:relative;top:5px;background: url(' + t.imageicon + ") no-repeat " + I + '"></span>' + s.error.error
            })), e.find(".view-fileupload-download").click(function (i) {
                t.Event.fixEvent(i).stopPropagation(), F && ("function" == typeof openURLToBrowser ? openURLToBrowser(s.sourceurl || s.url) : a.displayiFrame.attr("src", s.sourceurl || s.url))
            })
        },
        _getPositionForTextArea: function (t) {
            var i = 0;
            if (document.selection) {
                t.focus();
                var e = document.selection.createRange(), s = e.duplicate();
                try {
                    s.moveToElementText(t)
                } catch (o) {
                }
                for (i = -1; s.inRange(e);) s.moveStart("character"), i++
            } else (t.selectionStart || "0" == t.selectionStart) && (i = t.selectionStart);
            return i
        },
        _setCursorPosition: function (t, i) {
            if (this._editorStart = i, t.setSelectionRange) t.focus(), t.setSelectionRange(i, i); else if (t.createTextRange) {
                var e = t.createTextRange();
                e.collapse(!0), e.moveEnd("character", i), e.moveStart("character", i), e.select()
            }
        },
        _insertText: function (i) {
            var e = this.textEditor.get(0), s = e.value == t.lang.default_textarea_text ? "" : e.value,
                o = Math.min(s.length, this._editorStart);
            o = o < 0 ? s.length : o, e.value = s.substr(0, o) + i + s.substr(o, s.length), t.browser.mobile || (this._setCursorPosition(e, o + i.length), e.focus())
        },
        createEvaluation: function (i, e, s, o, a) {
            var n, l = this,
                r = ['<div class="ntkf-alert-close" style="' + t.STYLE_NBODY + "cursor:pointer;height:20px;position:absolute;right:5px;top:9px;width:20px;background:url(" + t.imageicon + ') no-repeat scroll -60px -61px;-moz-border-radius:0px;-webkit-border-radius:0px;border-radius:0px;"></div>', '<table border="0" cellpadding="0" cellspacing="0" style="' + t.STYLE_NBODY + 'margin:0px 0 10px 0;width:100%;table-layout:auto;border-collapse:separate;">', '<tbody style="', t.STYLE_NBODY, '">', '<tr style="', t.STYLE_NBODY, '">', '<td class="chat-view-evaluation-title" colspan="2" style="', t.STYLE_BODY, 'text-align:center;height:39px;color:#fff;">', '<span style="', t.STYLE_BODY, 'color:#000;font-weight:bold;font-size:14px;vertical-align:middle;">' + e + "</span>", "</td></tr>", t.FORM.createInput(i), '<tr style="', t.STYLE_NBODY, '">', '<td colspan="2" style="', t.STYLE_BODY, 'padding:5px 0;text-align:center;color:#333;">', '<input type="button" class="view-alert-submit" value="' + t.lang.evaluation_button_submit + '" style="' + t.STYLE_BODY + 'padding:0 15px;border:1px solid #878787;background:#ebe9e9;height:28px;color:#333;line-height:24px;display:inline-block" />', "</td></tr>", "</tbody>", "</table>"].join("");
            this.evalDialog || (this.evalDialog = new t.DialogChat(r, {
                margin: 2,
                border: 3,
                style: {border: "3px solid #00ACFF", height: "auto"},
                parent: this.chatElement.get(0)
            })), n = this.evalDialog.container;
            for (var h, d = 0; d < i.length; d++) "textarea" == i[d].type && (h = n.find("table textarea[name=" + i[d].name + "]").parent(), h.css("position", "relative"), t({
                className: "textarea-" + i[d].name,
                maxsize: i[d].max,
                style: t.STYLE_BODY + "font-size:16px;font-weight:bold;color:#ccc;float:right;position:absolute;right:15px;top:70px;"
            }).appendTo(h).html("0/" + i[d].max / 2));
            return n.find("table textarea").bind("keyup", function (i) {
                var e = "table .textarea-" + t(this).attr("name"),
                    s = t.enLength(t(this).val()) > n.find(e).attr("maxsize") ? "#f00" : "#ccc",
                    o = Math.ceil(t.enLength(t(this).val()) / 2) + "/" + n.find(e).attr("maxsize") / 2;
                n.find(e).html(o).css("color", s)
            }), t.FORM.bindFormEvent(i, n), n.find("input[type!=hidden],textarea").get(0).focus(), n.find(".ntkf-alert-close").click(function (t) {
                l.evalDialog.close(), l.evalDialog = null
            }), n.find(".view-alert-submit").click(function (i) {
                t.Event.fixEvent(i).stopPropagation(), l.evalRepeatClick && l.evalDialog && (l.evalRepeatClick = !1, l.mode.submitEvaluationForm(function () {
                    t.isFunction(a) && a(), l.evalDialog.close(), l.evalDialog = null, l.evalRepeatClick = !0
                }, function () {
                    l.evalRepeatClick = !0
                }))
            }).gradient("top", "#f5f5f5", "#ffffff"), n.find(".chat-view-evaluation-title").gradient("top", "#ffffff", "#f5f5f5"), n.get(0)
        },
        createEvaluationVersion2: function (i, e) {
            var s = this;
            if (!this.evalDialog) {
                var o = new t.EvaluateView(i).evaluateHtml;
                this.evalDialog = new t.DialogChat(o, t.extend(t.defaultStyle.evaluateWrap, {parent: this.chatElement.get(0)})), t.EvaluateEvent.bindEvaluateEvent(), t("[nodeid=submit]").click(function (i) {
                    t.Event.fixEvent(i).stopPropagation(), s.evalRepeatClick && s.evalDialog && (s.evalRepeatClick = !1, s.mode.submitEvaluationForm(function () {
                        t.isFunction(e) && e(), s.evalDialog.close(), s.evalDialog = null, s.evalRepeatClick = !0
                    }, function (i) {
                        s.evalRepeatClick = !0;
                        for (id in i) t(".nt-evaluation-error").html(i[id]).display(1)
                    }))
                }), t("[nodeid=close]").click(function (t) {
                    s.evalDialog.close(), s.evalDialog = null
                })
            }
        },
        createFileButton: function (t) {
            this.objFile = this._createUpload(t, "uploadfile", this.contains.find(".chat-view-file"))
        },
        _createUpload: function (i, e, s, o, a) {
            var n = this,
                l = {action: e, roomid: "T2D", siteid: this.siteid, settingid: this.settingid, charset: t.charset};
            return i.filetranserver ? new t.Transfer({
                server: i.filetranserver + "/imageupload.php",
                name: "userfile",
                maxSize: o,
                accept: a,
                params: l,
                onError: function (i) {
                    var e = t.chatManage.get(l.settingid);
                    e && e.uploadFailure(l.action, i)
                },
                onChange: function (t) {
                    n.uploadFileName = t.name, n.uploadFileSize = t.size
                },
                callback: function (i) {
                    t.Log(l.settingid + "::jsonp: " + t.JSON.toJSONString(i));
                    var e = t.chatManage.get(l.settingid);
                    i.result == -2 || 9 == i.type ? e && e.uploadFailure(l.action, i) : (e && e.startUpload(l.action, i.oldfile), setTimeout(function () {
                        e && e.uploadSuccess(l.action, i)
                    }))
                }
            }, s) : null
        },
        createMessageForm: function (i, e, s, o) {
            var a, n, l = this, r = 0, h = this.mode.getNewMessageConfig(), d = h.message_plan || 1,
                c = h.link_mode || "", p = h.specify_link || "";
            if (this.evalDialog && (this.evalDialog.close(), this.evalDialog = null), !this.messageElement.find(".chat-view-message-table table").length) {
                s && (r = this.messageElement.find(".chat-view-message-announcement").html(s).display(1).height() + 20);
                for (var g = 0; g < i.length; g++) i[g] = t.extend(i[g], {
                    titlewidth: /zh_cn|zh_tw/gi.test(t.lang.language) ? "80px" : "140px",
                    inputwidth: "auto",
                    input: {width: "90%", height: "textarea" == i[g].type ? "140px" : "auto"},
                    messageid: "chat-view-message-" + i[g].name
                });
                switch (e) {
                    case 0:
                        switch (d) {
                            case 1:
                                this.messageElement.find(".chat-view-submit-submit").gradient("top", "#f5f5f5", "#ffffff"), this.messageElement.find(".chat-view-message-body").css("height", this.messageElement.height() - r - 107 + "px"), this.messageElement.find(".chat-view-message-table").html(['<table cellspacing="0" cellpadding="0" border="0" style="', t.STYLE_BODY, 'margin:20px 0 0 0;width:100%;table-layout:auto;border-collapse:separate;">', '<tbody style="', t.STYLE_NBODY, '">', [t.FORM.createInput(i, null, t.lang.message_no_null), '<tr style="', t.STYLE_NBODY, '">', '<td colspan="2" style="', t.STYLE_BODY, 'text-align:center;padding:10px 0px 10px;color:#090;">', '<input style="' + t.STYLE_BODY + 'text-align:center;padding:0 20px;margin:0 auto;border:1px solid #878787;height:28px;color:#000;line-height:26px;" type="button" class="chat-view-button chat-view-submit-submit" value="' + t.lang.message_button_submit + '">', '<span class="submit_message_complete" style="', t.STYLE_BODY, 'text-align:center;color:#090;display:none;">', t.lang.message_success, "</span>", "</td></tr>"].join(""), "</tbody></table>"].join(""));
                                break;
                            case 2:
                                switch (c) {
                                    case 1:
                                        this.messageElement.find(".chat-view-message-announcement").display(), this.messageElement.html(['<iframe src="' + p + '" class="chat-view-message-table-iframe" name="announce_iframe" scrolling="auto" frameborder="0" style="', t.STYLE_BODY, "display:block;width:100%;height:" + this.messageElement.height() + 'px;background-color:#ffffff;overflow-x:hidden;overflow-y:auto;" >', "</iframe>"].join(""));
                                        break;
                                    case 2:
                                        this.messageElement.find(".chat-view-message-announcement").display(), t.messageRest = t.sourceURI + "/images/message-rest." + (t.browser.msie6 ? "gif" : "png"), t.messageFish = t.sourceURI + "/images/message-fish." + (t.browser.msie6 ? "gif" : "png"), this.messageElement.find(".chat-view-message-message-prompt").display(1), this.messageElement.find(".chat-view-message-message-prompt").html(['<div class="chat-view-message-prompt-string"  style="width:340px;height:380px;padding:38px 0 0 40px;">', '<img src="' + t.messageRest + '" style="width:290px;height:210px;"/>', '<div style="width:290px;height:90px;background:url(' + t.messageFish + ') 140px 14px no-repeat;padding:38px 0 0 34px;">', '<span style="font-size:13px;">', t.utils.handleLinks(t.lang.message_prompt), "</span>", "</div>", "</div>"].join("")), this.messageElement.find(".chat-view-message-prompt-string").find("a").attr("target", "_blank").attr("href", p).css({
                                            "text-decoration": "none",
                                            "margin-left": "28px",
                                            "font-size": "13px",
                                            "font-weight": "bold",
                                            color: "white"
                                        });
                                        break;
                                    default:
                                        t.Log("link_mode error", 3)
                                }
                        }
                        break;
                    case 1:
                        t.Log("message is close", 1);
                        break;
                    default:
                        t.Log("disableMessage error", 3)
                }
                this.messageElement.find("input[name=myuid]").val(o.myuid), this.messageElement.find("input[name=destuid]").val(o.destid), this.messageElement.find("input[name=ntkf_t2d_sid]").val(o.sessionid), this.messageElement.find("input[name=source]").val(o.source), this.messageElement.find("input[type=text],textarea,select").css("color", "#ccc").attr("disabled", ""), o.fileError && (n = t({
                    tag: "tr",
                    style: t.STYLE_NBODY
                }).appendTo(this.messageElement.find(".chat-view-message-table tbody"), this.messageElement.find(".chat-view-message-table tbody tr").eq(-1)), a = t({
                    tag: "td",
                    style: t.STYLE_NBODY
                }).appendTo(n), a = t({
                    tag: "td",
                    style: t.STYLE_NBODY
                }).appendTo(n).html(['<div style="', t.STYLE_BODY, 'display:block;color:#ef7208;">', '<div style="', t.STYLE_BODY, "margin:2px;width:15px;height:15px;float:left;background:url(", t.imageicon, ') no-repeat -160px -39px;"></div>', '<div style="', t.STYLE_BODY, 'float:left;" class="chat-view-info">', t.lang.message_upload_failure, "</div>", '<div style="', t.STYLE_NBODY, 'clear:both;height:0;width:0;"></div>', "</div>"].join(""))), this.messageElement.find(".chat-view-submit-submit").show(function () {
                    t(this).css("display", t.browser.oldmsie ? "inline-block" : "block")
                }), this.messageElement.find(".submit_message_complete").display(), t.FORM.bindFormEvent(i, this.messageElement), this.messageElement.find(".chat-view-submit-submit").click(function (t) {
                    l.mode.submitMessageForm()
                }), this.messageElement.find("textarea").val(o.content)
            }
        },
        submitMessageForm: function (i, e) {
            var s = this;
            t.FORM.verificationForm(i, function () {
                s.messageElement.find(".chat-view-message-form").attr("action", e), s.messageElement.find(".chat-view-message-form").get(0).submit(), t.Log("chatView.submitMessageForm complete", 1), s.messageElement.find("input[type=text],textarea,select").attr("disabled", !0), s.messageElement.find(".chat-view-submit-submit").display(), s.messageElement.find(".submit_message_complete").css("display", "block")
            }, this.messageElement)
        },
        _fullScreenImage: function (i, e) {
            var s, o = this, a = this._createfullScreen(i), n = t(i).attr("sourceurl") || i.src, l = function () {
                t.Log("download image " + n), "function" == typeof openURLToBrowser ? openURLToBrowser(n) : o.displayiFrame.attr("src", n)
            };
            t.Log(this.settingid + ":chatView._fullScreenImage(), src:" + n, 1), t(".view-fullScreen-background").css("opacity", .6), a.click(function (i) {
                t.Event.fixEvent(i).stopPropagation(), o._hideScreenImage()
            }).find(".view-fullScreen-close").click(function (i) {
                t.Event.fixEvent(i).stopPropagation(), o._hideScreenImage()
            }), this.nextClick && this.prevClick && (a.find(".view-next-picture").removeEvent("click", this.nextClick), a.find(".view-prev-picture").removeEvent("click", this.prevClick)), this.nextClick = function (i) {
                t.Event.fixEvent(i).stopPropagation();
                var a = 0, n = 1e7;
                for (s in o.imageHash) {
                    var l = parseInt(s.substr(0, e.length - 1)), r = parseInt(e.substr(0, e.length - 1));
                    l - r > 0 && l - r < n && (a = s, n = l - r)
                }
                0 === a ? o._hideScreenImage() : o._fullScreenImage(t("." + a).find(".view-history-body").find("img"), a)
            }, this.prevClick = function (i) {
                t.Event.fixEvent(i).stopPropagation();
                var a = 0, n = -1e7;
                for (s in o.imageHash) {
                    var l = parseInt(s.substr(0, e.length - 1)), r = parseInt(e.substr(0, e.length - 1));
                    l - r < 0 && l - r > n && (a = s, n = l - r)
                }
                0 === a ? o._hideScreenImage() : o._fullScreenImage(t("." + a).find(".view-history-body").find("img"), a)
            }, a.find(".view-next-picture").addEvent("click", this.nextClick), a.find(".view-prev-picture").addEvent("click", this.prevClick), a.find(".view-fullScreen-download").removeEvent("click", l).bind("click", l), t(i).attr("sourceurl") == t(i).attr("src") ? (a.find(".view-fullScreen-download").display(0), a.find(".view-next-picture").display(0), a.find(".view-prev-picture").display(0)) : (a.find(".view-fullScreen-download").display(1), a.find(".view-next-picture").display(1), a.find(".view-prev-picture").display(1)), t(document).bind("keypress", function (i) {
                27 == t.Event.fixEvent(i).keyCode && o._hideScreenImage()
            }), t(window).bind("resize", function (i) {
                t(".view-fullScreen-background,.view-fullScreen-iframe,.view-fullScreen-container").css({
                    width: t(window).width() + "px",
                    height: t(window).height() + "px"
                }), t(".view-prev-picture div,.view-next-picture div").css({top: (t(window).height() - 40) / 2 + "px"})
            }), a.find("img").attr("src") != n && (a.find("td").css({background: "url(" + t.imageloading + ") no-repeat center center"}), t.require(n + "#image", function (i) {
                t.Log("nTalk._fullScreenImage() width:" + i.width + ", height:" + i.height);
                var e = t(window).width(), s = t(window).height(), o = t.zoom(i, e - 100, s);
                a.find("td img").length > 0 && a.find("td img").remove(), a.find("td").append('<img src="' + n + '" width="' + Math.floor(o.width) + '" height="' + Math.floor(o.height) + '" style="' + t.STYLE_NBODY + "margin:0 auto;max-width:" + (e - 100) + "px;max-height:" + s + 'px"/>'), a.find("td img") && a.find("td").css({"background-image": ""})
            }))
        },
        _hideScreenImage: function () {
            t(".view-fullScreen-container,.view-fullScreen-background,.view-fullScreen-iframe").display()
        },
        _createfullScreen: function () {
            var i = t(window).width(), e = t(window).height();
            return t(".view-fullScreen-iframe").length || t({
                tag: "iframe",
                className: "view-fullScreen-iframe",
                style: t.STYLE_NBODY + "display:none;width:" + i + "px;height:" + e + "px;"
            }).appendTo(!0).fixed(), t(".view-fullScreen-background").length ? t(".view-fullScreen-background").display(1) : t({
                className: "view-fullScreen-background",
                style: t.STYLE_NBODY + "background:#000;opacity:0.6;filter:alpha(opacity=60);width:" + i + "px;height:" + e + "px;position:absolute;top:0;left:0;z-index:2000000000;"
            }).appendTo(!0).fixed(), t(".view-fullScreen-container").length ? (t(".view-fullScreen-container img").remove(), t(".view-fullScreen-container").width() != i && t(".view-fullScreen-container").css("width", i + "px"), t(".view-fullScreen-container").height() != e && t(".view-fullScreen-container").css("height", e + "px"), t(".view-fullScreen-container").display(1)) : t({
                className: "view-fullScreen-container",
                style: t.STYLE_NBODY + "width:" + i + "px;height:" + e + "px;text-align:center;position:absolute;top:0px;left:0;z-index:2000000001;"
            }).appendTo(!0).html(['<table style="', t.STYLE_NBODY, 'width:100%;height:100%;table-layout:auto;border-collapse:separate;">', '<tbody style="', t.STYLE_NBODY, '">', '<tr style="', t.STYLE_NBODY, '">', '<td valign="middle" align="center" style="', t.STYLE_NBODY, "text-align:center;vertical-align:middle;background:url(", t.imageloading, ') no-repeat center center;">', '<div class="view-prev-picture" style="', t.STYLE_NBODY, '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;position:absolute;width:50px;height:100%;bottom:0px;top:0px;left:0px">', '<div style="position:relative;width:50px; height:40px;top:' + (t(window).height() - 40) / 2 + "px;background:url(", t.imageicon, ') no-repeat -225px -92px"></div>', "</div>", '<div class="view-next-picture" style="', t.STYLE_NBODY, '-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;position:absolute;width:50px;height:100%;bottom:0px;top:0px;right:0px">', '<div style="position:relative;width:50px; height:40px;top:' + (t(window).height() - 40) / 2 + "px;background:url(", t.imageicon, ') no-repeat -178px -92px"></div>', "</div>", "</td></tr></table>", '<span class="view-fullScreen-close" style="', t.STYLE_NBODY, "position:absolute;width:28px;height:28px;margin:20px 20px 0 0;top:0;right:0;cursor:pointer;background:url(", t.imageicon, ') no-repeat scroll -259px 0;z-index:2000000001;"></span>', '<span class="view-fullScreen-download"  style="', t.STYLE_NBODY, "position:absolute;width:28px;height:28px;margin:20px 20px 0 0;top:0;right:50px;cursor:pointer;background:url(", t.imageicon, ') no-repeat scroll -219px 0;z-index:2000000001;"></span>'].join("")).fixed(), t(".view-fullScreen-container")
        },
        _getMessageHtml: function (i, e) {
            var s = "auto";
            return "system" === i && t.browser.oldmsie && (s = Math.min(6 * t.enLength(t.clearHtml(e.msg)), 340)), "otherinfo" === i && (i = "left", e.userid = "", e.name = "", e.msg = ['<h1 style="', t.STYLE_BODY, '">', '<span style="', t.STYLE_NBODY, "float:left;margin-right:5px;width:15px;height:15px;background:transparent url(", t.imageicon, ') no-repeat -199px -38px;"></span>', '<span style="', t.STYLE_BODY, 'font-weight:bold;">', e.title, "</span>", '<br style="', t.STYLE_NBODY, 'clear:both;" />', "</h1>", '<p style="', t.STYLE_BODY, '">', e.msg, "</p>"].join("")), e.logo || (e.logo = t.themesURI + "xiaot.png"), 7 == e.type && (e.type = 1), "right" === i ? ['<table style="', t.STYLE_NBODY, 'float:right;_float:none;border-collapse:separate;" class="view-history-right" cellpadding="0" cellspacing="0" border="0" class="table">', '<tbody style="', t.STYLE_NBODY, 'text-align:right;">', '<tr style="', t.STYLE_NBODY, '">', "<td>", '<span class="view-history-time" style="', t.STYLE_BODY, 'float:right;color:#202020;line-height:26px;padding-right:12px;">', t.formatDate(e.timerkeyid).substr(0, 5), "</span>", "</td>", '<td class="view-history-content" style="', t.STYLE_BODY, 'padding:8px 14px 7px 14px;max-width:213px;background:#eff3f6;border:none;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;border-top-right-radius:0px;border:none;">', '<div class="view-history-body" style="min-height:20px;', t.STYLE_BODY, /^(2|4)$/i.test(e.type) && !e.emotion ? "text-align:center;display:table-cell;*display:inline-block;vertical-align:middle;/*width:100px;*/min-height:50px;height:85px;*font-size:0px;*line-height:0px;*font-family:Arial;" : "display:block;/*width:100%;*/", "word-break:break-all;word-wrap:break-word;line-height:17px;", 1 == e.type ? "color:#202020;font:" + ("true" == e.italic ? "italic" : "normal") + " " + ("true" == e.bold ? "bold" : "normal") + " 12px/160% " + t.body_family + ";text-decoration:" + ("true" == e.underline ? "underline" : "none") + ";" : "", '">', 1 == e.type ? e.msg : "", "</div>", '<div class="view-history-progress" style="', t.STYLE_NBODY, 'display:none;border-top:1px solid #30c2fd;background:#fff;height:5px">', '<div class="view-history-upload-progress" style="', t.STYLE_NBODY, 'height:5px;width:20%;background:#30c2fd;"></div>', "</div>", "</td>", '<td style="', t.STYLE_NBODY, 'width:36px;vertical-align:top;overflow:visible;">', '<div style="width:36px;height:34px;position:relative;">', '<div class="view-history-angle" style="', t.STYLE_NBODY, "position:absolute;left:-1px;top:0px;z-index:1;width:5px;height:6px;background:url(", t.themesURI, 'chaticon1.png) no-repeat -29px -0px;margin:0;padding:0;"></div>', "</div>", "</td>", "</tr>", '<tr style="', t.STYLE_NBODY, '">', '<td style="', t.STYLE_BODY, 'overflow:visible;text-align:right;position:relative;">', '<span class="view-chat-hidden-area" style="', t.STYLE_NBODY, 'float:right;width:1px;min-height:0px;overflow:visible;position:relative;top:0px;">', '<div class="view-history-status" style="', t.STYLE_BODY, 'display:none;color:#010002;line-height:26px;width:280px;position:absolute;left:-280px;top:0px;">', '<div class="view-history-status-link" style="', t.STYLE_BODY, 'float:right;line-height:26px;height:26px;"></div>', '<div class="view-history-status-icon" style="', t.STYLE_NBODY, "margin:7px 3px;float:right;display:block;line-height:26px;width:10px;height:10px;background:#fff url(", t.imageicon, ') no-repeat -140px -39px;"></div>', "</div>", "</span>", "</td>", '<td style="', t.STYLE_NBODY, '"></td>', "</tr>", "</tbody>", "</table>", '<br style="', t.STYLE_NBODY, 'clear:both;" />'].join("") : /left|bottom/gi.test(i) ? ['<table style="', t.STYLE_NBODY, 'float:left;float:none;table-layout:auto;border-collapse:separate;" class="view-history-left" cellpadding="0" cellspacing="0" border="0" class="table">', '<tbody style="', t.STYLE_NBODY, '">', '<tr style="', t.STYLE_NBODY, '">', '<td style="', t.STYLE_NBODY, 'width:20px;vertical-align:top;overflow:visible;">', '<div style="', t.STYLE_NBODY, 'width:58px;height:34px;position:relative;">', '<img width="34" height="34" style="width:34px;height:34px;position:absolute;left:12px;top:-10px;border:none;border-radius:64px;overflow:hidden;" src="' + e.logo + '" />', '<div class="view-history-angle" style="' + t.STYLE_NBODY + "position:absolute;right:-1px;top:0px;z-index:1;width:5px;height:10px;background:url(" + t.themesURI + 'chaticon1.png) no-repeat -1px 0px;margin:0;padding:0;"></div>', "</div>", "</td>", '<td class="view-history-content" style="', t.STYLE_BODY, 'padding:8px 14px 8px 14px;max-width:213px;background:#ff8a5e;border:none;border-radius:5px;-moz-border-radius:5px;-webkit-border-radius:5px;overflow:hidden;border-top-left-radius:0px;border:none;">', '<div class="view-history-body" style="min-height:20px;', t.STYLE_BODY, /^(2|4)$/i.test(e.type) && !e.emotion ? "text-align:center;display:table-cell;*display:inline-block;vertical-align:middle;/*width:100px;*/min-height:50px;height:85px;*font-size:0px;*line-height:0px;*font-family:Arial;" : "display:block;/*width:100%;*/", "word-break:break-all;word-wrap:break-word;line-height:17px;", "bottom" == i ? "width:auto;" : "", 1 == e.type ? "color:#fff;font:" + ("true" == e.italic ? "italic" : "normal") + " " + ("true" == e.bold ? "bold" : "normal") + " 12px/160% " + t.body_family + ";text-decoration:" + ("true" == e.underline ? "underline" : "none") + ";" : "", '">', /^(1|9)$/i.test(e.type) ? e.msg : "", "</div>", "</td>", "<td>", '<span class="view-history-time" style="', t.STYLE_BODY, 'float:left;color:#202020;line-height:26px;padding-left:12px;">', "bottom" == i ? "" : t.formatDate(e.timestamp || e.timerkeyid).substr(0, 5), "</span>", "</td>", "</tr>", '<tr style="', t.STYLE_NBODY, '">', '<td style="', t.STYLE_NBODY, '"></td>', '<td style="', t.STYLE_BODY, 'overflow:visible;position:relative;">', '<span class="view-history-more" style="', t.STYLE_BODY, 'margin-right:5px;float:left;color:blue;cursor:pointer;line-height:26px;display:none;">', t.lang.button_more, "</span>", e.userid && !this.mode.isVisitor(e.userid) && this.mode.dest.id != e.userid && 4 != e.systype ? ['<span class="view-history-destname" style="', t.STYLE_BODY, 'padding-right:5px;float:left;color:#b9b9c1;line-height:26px;">', e.name, "</span>"].join("") : "", '<span class="view-chat-hidden-area" style="', t.STYLE_NBODY, 'float:left;width:1px;height:26px;overflow:visible;position:absolute;">', '<div class="view-history-status" style="', t.STYLE_BODY, 'display:none;color:#010002;line-height:26px;height:26px;width:280px;position:absolute;left:0px;top:0px;">', '<div class="view-history-status-icon" style="', t.STYLE_NBODY, "margin:7px 3px;float:left;line-height:26px;display:block;width:10px;height:10px;background:url(", t.imageicon, ') no-repeat -140px -39px;"></div>', '<div class="view-history-status-link" style="', t.STYLE_BODY, 'float:left;line-height:26px;height:26px;">', /^(2|4)$/i.test(e.type) && !e.emotion ? ['<a href="javascript:void(0);" style="', t.STYLE_BODY, '">', t.lang.news_download, "</a>"].join("") : [""].join(""), "</div>", "</div>", "</span>", "</td>", "</tr>", "</tbody>", "</table>", '<br style="', t.STYLE_NBODY, 'clear:both;" />'].join("") : "first" === i ? ['<div class="view-history-system" style="', t.STYLE_BODY, 'background:transparent;line-height:180%;marign:0 auto;padding:20px 0;text-align:center;word-break:break-all;word-wrap:break-word;">', e.msg, "</div>", '<br style="', t.STYLE_NBODY, 'clear:both;" />'].join("") : "goods" === i ? ['<table style="', t.STYLE_NBODY, 'float:left;width:376px;table-layout:auto;border-collapse:separate;" class="view-history-goods" cellpadding="0" cellspacing="0" border="0" class="table">', '<tbody style="', t.STYLE_NBODY, 'text-align:center;">', '<tr style="', t.STYLE_NBODY, '">', '<td class="view-history-goods-image" style="', t.STYLE_BODY, 'width:160px;text-align:center;"></td>', '<td class="view-history-goods-info" style="', t.STYLE_BODY, 'width:120px;text-align:left;padding-right:70px;"></td>', "</tr>", '<tr style="', t.STYLE_NBODY, '"><td colspan="2" style="', t.STYLE_NBODY, 'height:10px;width:100%;"><div style="', t.STYLE_BODY, "margin:0 auto;background:#FFF url(", t.imageicon, ') no-repeat 55px -80px;height:10px;width:391px;"></div></td></tr>', "</tbody>", "</table>", '<br style="', t.STYLE_NBODY, 'clear:both;" />'].join("") : ['<div class="view-history-system" style="', t.STYLE_BODY, 'marign:20px 0;text-align:center;color:#706E6F;">', '<fieldset style="', t.STYLE_BODY, 'margin:0 0 10px 0;text-align:center;border-top:1px solid #ccc;">', '<legend style="', t.STYLE_BODY, "margin:0 auto;text-align:center;word-break: normal;word-wrap:break-word;font:normal normal normal 12px/160% Arial,SimSun;color:#706e6f;width:", s, ';overflow-x:hidden;display:block;" align="center">', '<div style="', t.STYLE_BODY, "text-align:center;word-break: normal;word-wrap:break-word;color:#706e6f;width:", s, ';overflow-x:hidden;">', e.msg, "</div>", "</legend>", "</fieldset>", "</div>", '<br style="', t.STYLE_NBODY, 'clear:both;" />'].join("")
        },
        _getViewHtml: function (i) {
            var e = (t.browser.msie && t.browser.ieversion <= 8, ""),
                s = 1 == t.server.robot ? t.lang.button_switch_manual : "";
            return "load" == i ? ['<div class="chat-view-load-icon" style="', t.STYLE_NBODY, "margin:0 auto;width:100px;height:33px;background:transparent url(", t.imageloading, ') no-repeat 0px 0px;"></div>', '<div class="chat-view-load-info" style="', t.STYLE_BODY, 'text-align:center;">', t.lang.chat_info_loading, "</div>", '<div class="chat-view-load-error" style="', t.STYLE_BODY, 'text-align:center;margin:120px auto 0;display:none;">', t.lang.chat_info_failure, '<!--<span style="', t.STYLE_BODY, 'cursor:pointer;color:#005ffb;text-decoration:none;">', t.lang.chat_info_reload, "</span>--></div>"].join("") : "window" == i ? ['<div class="chat-view-float-history" style="', t.STYLE_BODY, 'width:100%;height:270px;height:267px\\0;_height:269px;background:#fff;padding-top:1px solid #fff\\0;position:absolute;overflow:hidden;z-index:99;display:none;box-shadow:0 5px 3px #888888;">', '<iframe class="chat-view-float-iframe" scrolling="no" frameborder="0" style="', t.STYLE_BODY, 'display:block;width:100%;height:100%;">', "</iframe>", "</div>", '<div class="chat-view-window-history" style="', t.STYLE_BODY, 'width:374px;border-left:1px solid #fff;border-right:1px solid #fff;height:267px;height:267px\\0;_height:267px;background-repeat:no-repeat;background-position:center bottom;position:relative;overflow-x:hidden;overflow:hidden;padding: 8px 0;">', '<div class="chat-view-window-history-top" style="width:100%;height:4px;position:absolute;top:0;left:0;"></div>', '<div class="chat-view-window-history2" style="', t.STYLE_NBODY, 'width:374px;height:267px;background-repeat:no-repeat;background-position:center bottom;position:relative;padding: 0px 0;overflow-x:hidden;">', '<ul style="', t.STYLE_NBODY, 'list-style:none;margin:10px 0px 10px 0px;">', "</ul>", "</div>", "</div>", '<div class="chat-view-window-toolbar" style="', t.STYLE_BODY, 'height:31px;width:374px;background:#f0f3f5;border-left:1px solid #f0f3f5;border-right:1px solid #f0f3f5;">', '<div class="chat-view-hidden-area" style="', t.STYLE_NBODY, 'width:0px;height:0px;position:relative;overflow:visible;">', '<div class="chat-view-window-status-info" style="', t.STYLE_BODY, 'background:#66ccff;overflow:hidden;margin-left:10px;width:380px;line-height:30px;height:30px;position:absolute;top:-30px;z-index:99;text-align:center;display:none;"></div>', "</div>", '<div class="chat-view-hidden-area" style="', t.STYLE_NBODY, 'width:0px;height:0px;position:relative;overflow:visible;">', '<div class="chat-view-suggest-list chat-view-span" style="', t.STYLE_NBODY, 'border:1px solid #999;background:#fafafa;width:400px;line-height:30px;height:auto;position:absolute;top:-2px;left:2px;z-index:999;display:none;">', '<ul style="', t.STYLE_BODY, 'list-style:none;"></ul>', "</div>", "</div>", '<div class="chat-view-button chat-view-capture" title=', t.lang.button_captureImage, ' style="', t.STYLE_BODY, "color:#525252;float:left;margin:7px 0 4px 7px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", t.imageicon, ') no-repeat -200px 0;"></div>', '<div class="chat-view-capture-options" style="', t.STYLE_BODY, 'color:#8f979c;float:left;margin:7px 0 4px 0px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;">', "▼", '<div class="chat-view-capture-hidden-area" style="', t.STYLE_NBODY, 'width:1px;height:1px;position:relative;overflow:visible;">', '<div class="chat-view-span chat-view-options-capture-menu" style="', t.STYLE_BODY, 'display:none;padding:1px;background:#fff;position:absolute;left:-25px;top:-79px;border:1px solid #ccc;width:100px;*width:102px;_width:102px;height:auto;z-index:1000002;cursor:cursor;">', '<div class="view-option-hidden talk_selected" style="', t.STYLE_BODY, 'padding:3px 0 3px 7px;background:#efefef;">', t.lang.button_capture_hidden_chatWin, "</div>", '<div class="view-option-show" style="', t.STYLE_BODY, 'padding:3px 0 3px 10px;">', t.lang.button_capture_show_chatWin, "</div>", "</div>", "</div>", "</div>", '<div class="chat-view-button chat-view-face" title=', t.lang.button_face, ' style="', t.STYLE_BODY, "color:#525252;float:left;margin:6px 0 3px 5px;_margin-left:5px;border:0px solid #ccc;height:22px;display:inline-block;cursor:pointer;width:20px;background:url(", t.imageicon, ') no-repeat -100px 1px;">', '<div class="chat-view-hidden-area" style="', t.STYLE_NBODY, 'width:0px;height:0px;position:relative;overflow:visible;">', '<div class="chat-view-span chat-view-window-face" style="', t.STYLE_NBODY, 'display:none;position:absolute;left:-11px;top:-229px;border:1px solid #979A9E;width:273px;height:224px;background:#fff;z-index:1000002;cursor:auto;border-radius:3px;overflow:hidden;">', "</div>", "</div>", "</div>", '<div class="chat-view-button chat-view-file" title=', t.lang.button_file, ' style="', t.STYLE_BODY, "color:#525252;float:left;margin:7px 0 4px 7px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", t.imageicon, ') no-repeat -140px 0;"></div>', '<div class="chat-view-button chat-view-history" title=', t.lang.button_save, ' style="', t.STYLE_BODY, "color:#525252;float:left;margin:7px 0 4px 7px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", t.imageicon, ') no-repeat -180px 0;"></div>', '<div class="chat-view-button chat-view-load-history" title=', t.lang.button_view, ' style="', t.STYLE_BODY, "color:#525252;float:left;margin:7px 0 4px 7px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", t.imageicon, ') no-repeat -220px -40px;"></div>', '<div class="chat-view-button chat-view-evaluate" title=', t.lang.button_evaluation, ' style="', t.STYLE_BODY, "color:#525252;float:left;margin:7px 0 4px 7px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", t.imageicon, ') no-repeat -160px 0;"></div>', '<div class="chat-view-switch-manual chat-view-robot-button" title="', t.lang.button_switch_manual, '" style="', t.STYLE_BODY, "color:#525252;float:left;padding:0 0 0 20px;margin:7px 0 4px 7px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:auto;background:url(", t.imageicon, ') no-repeat -265px -40px;display:none;">', s, "</div>", '<div class="chat-view-button chat-view-change-csr" title=', t.lang.button_change_csr, ' style="', t.STYLE_BODY, "color:#525252;float:left;margin:7px 0 4px 7px;border:0px solid #ccc;height:20px;display:inline-block;cursor:pointer;width:20px;background:url(", t.imageicon, ') no-repeat -243px -40px;"></div>', '<div class="chat-view-button chat-view-exp" style="', t.STYLE_BODY, 'color:#525252;float:right;margin:4px 3px;padding:0 3px;border:0px solid #ccc;height:1px;display:inline-block;cursor:pointer;display:none;overflow:hidden;">', "</div>", "</div>", '<div class="chat-view-window-editor" style="', t.STYLE_BODY, 'height:82px;width:374px;border-left:1px solid #fff;border-right:1px solid #fff;;overflow:hidden;">', '<textarea placeholder="', "请输入内容...", '" style="', t.STYLE_BODY, e, 'padding:10px;width:356px;width:376\\8;height:62px;height:82px\\4;color:#202020;resize:none;overflow:hidden;overflow-y:auto;line-height:22px;color:#202020;font-size:12px;"></textarea>', "</div>", '<div class="chat-view-window-bottom" style="', t.STYLE_BODY, 'height:43px;width:374px;border-left:1px solid #f0f3f5;border-right:1px solid #f0f3f5;;background:#f0f3f5;border-radius:0px 0px 5px 5px;-moz-border-radius:0px 0px 5px 5px;-webkit-border-radius:0px 0px 5px 5px">', '<div class="chat-view-options" style="', t.STYLE_BODY, 'margin:9px 8px 7px 0;float:right;width:26px;height:27px;line-height:27px;text-align:center;cursor:pointer;border-top-right-radius:5px;border-bottom-right-radius:5px;background:#dfe4e8;position:relative;">', '<div class="chat-view-options-angle" style="width:18px;height:15px;transition:0.3s;transform:rotateZ(0deg);background:url(' + t.themesURI + 'jiao.png) no-repeat;position:absolute;top:5px;left:3px;"></div>', '<div style="width:1px;height:20px;background:#f7f7f7;position:absolute;left:0;top:3px;"></div>', '<div class="chat-view-hidden-area" style="', t.STYLE_NBODY, 'width:1px;height:1px;position:relative;overflow:visible;">', '<div class="chat-view-span chat-view-options-menu" style="', t.STYLE_BODY, 'display:none;padding:0px;background:#fff;position:absolute;left:-55px;top:-64px;border:none;width:74px;*width:76px;_width:76px;height:64px;z-index:1000002;cursor:cursor;border-radius:5px;box-shadow:0 2px 4px #f0f3f5;background:#fcfdff;">', '<div class="view-option-ctrl+enter" style="', t.STYLE_BODY, 'width:74px;height:32px;color:#9ca4a8;text-align:center;font-size:12px;line-height:32px;">', t.lang.button_ctrl_enter, "</div>", '<div class="view-option-enter talk_selected" style="', t.STYLE_BODY, 'width:74px;height:32px;background:#f0f3f5;color:#9ca4a8;text-align:center;font-size:12px;line-height:32px;">', t.lang.button_enter, "</div>", "</div>", "</div>", "</div>", '<div class="chat-view-submit" style="', t.STYLE_BODY, 'margin:9px 0 7px 0;margin-bottom:10px;float:right;width:61px;height:27px;line-height:27px;text-align:center;cursor:pointer;background:#dfe4e8;border-top-left-radius:5px;border-bottom-left-radius:5px;color:#9ca4a8;font-size:14px;">', t.lang.chat_button_send, "</div>", '<span class="chat-view-end-session" style="', t.STYLE_BODY, 'text-decoration:none;margin:9px 8px 7px 0;width:61px;float:right;height:27px;line-height:27px;cursor:pointer;text-align:center;background:#dfe4e8;border-radius:5px;font-size:14px;color:#9ca4a8;">', "关闭", "</span>", '<div style="', t.STYLE_NBODY, 'clear:both;"></div>', "</div>"].join("") : "message" == i ? ['<div class="chat-view-message-announcement" style="', t.STYLE_BODY, 'margin:10px 20px 10px 20px;height:auto;max-height:200px;overflow:hidden;display:none;"></div>', '<div class="chat-view-message-message-prompt" style="', t.STYLE_BODY, 'margin:10px 20px 10px 20px;height:auto;max-height:500px;overflow:hidden;display:none;"></div>', '<div class="chat-view-message-body" style="', t.STYLE_BODY, 'overflow-x:hidden;overflow-y:auto;width:100%;">', '<form name="chat-view-message-form" action="" enctype="multipart/form-data" target="chat-view-submit-iframe" method="post" class="chat-view-message-form" style="', t.STYLE_NBODY, 'display:block;">', '<input type="hidden" value="' + t.charset + '" name="charset" />', '<input type="hidden" value="' + t.source + '" name="parentpageurl" />', '<input type="hidden" value="" name="myuid" />', '<input type="hidden" value="" name="destuid" />', '<input type="hidden" value="" name="ntkf_t2d_sid" />', '<input type="hidden" value="" name="source" />', '<input type="hidden" value="' + this.settingid + '" name="settingid" />', '<div class="chat-view-message-table" style="', t.STYLE_BODY, 'width:100%;"></div>', "</form>", "</div>"].join("") : ['<iframe class="ntkf-alert-iframe" style="', t.STYLE_BODY, 'display:none;position:absolute;left:0;top:0;width:100%;height:464px;-moz-opacity:0;opacity:0;filter:alpha(opacity=0);z-index:88888;">', "</iframe>", '<div class="ntkf-alert-background" style="', t.STYLE_BODY, 'display:none;position:absolute;left:0;top:0;width:100%;height:464px;background:#000;-moz-opacity:0.35;opacity:0.35;filter:alpha(opacity=35);z-index:99999;">', "</div>", '<div class="ntkf-alert-container" style="', t.STYLE_BODY, 'display:none;position:absolute;left:2px;top:0;width:100%;min-height:260px;height:auto;-moz-opacity:1;opacity:1;filter:alpha(opacity=100);border:3px solid #00acff;z-index:2000000000;background:#fff;">', "</div>"].join("");
        },
        _bind: function () {
            var i = this;
            t(".chat-view-window-history-top").gradient("top", "#cacaca", "#fff"), t(".ntalk-window-containter").css("box-shadow", "0 0 14px #cacaca").css("border-radius", "9px"), this.textEditor = this.chatElement.find(".chat-view-window-editor textarea").css({
                width: t.browser.Quirks ? "411px" : "391px",
                height: t.browser.Quirks ? "82px" : "62px"
            }).bind("keypress", function (e) {
                e = t.Event.fixEvent(e), e.stopPropagation(), 13 == e.keyCode && e.shitfKey || ("Enter" == i._sendKey ? 13 == e.keyCode && e.ctrlKey || 10 == e.keyCode ? i.textEditor.val(i.textEditor.val() + "\r\n") : 13 == e.keyCode && (e.preventDefault(), i._send()) : "Ctrl+Enter" == i._sendKey && /^(10|13)$/.test(e.keyCode) && e.ctrlKey && (e.preventDefault(), i._send()))
            }).bind("keyup", function (e) {
                e = t.Event.fixEvent(e), i._editorStart = i._getPositionForTextArea(this) + 1;
                var s = e.keyCode, o = t.enLength(t(this).val());
                o > i.mode.inputMaxByte && t(this).val(t.enCut(t(this).val(), i.mode.inputMaxByte));
                var a = (i.mode.robotKf || i.mode.requestRobot) && "none" != t(".chat-view-hidden-area .chat-view-suggest-list").css("display");
                38 == s && a ? (e.preventDefault(), i._selectSuggest(-1)) : 40 == s && a && (e.preventDefault(), i._selectSuggest(1))
            }).bind("click", function () {
                i._editorStart = i._getPositionForTextArea(this)
            }).bind("focus", function () {
                t.promptwindow.stopPrompt(), i.chatElement.find(".chat-view-hidden-area .chat-view-span").display();
                var e = {color: "#202020"};
                t.browser.msie && t.browser.ieversion <= 7 ? t(this).css(t.merge(e, {
                    width: t(this).parent().width() - 26 + "px",
                    height: t(this).parent().height() - 26 + "px",
                    "border-width": "0px"
                })) : t(this).css(t.merge(e, {"outline-width": "0px"})), t.browser.html5 || t(this).val() == t.lang.default_textarea_text && t(this).val(""), i._listenTextEditor()
            }).bind("blur", function () {
                t.browser.html5 || ("" === t(this).val() && t(this).val(t.lang.default_textarea_text), t(this).val() == t.lang.default_textarea_text && t(this).css({color: "#202020"})), t.browser.msie && t.browser.ieversion <= 7 ? t(this).css({
                    "border-width": "0px",
                    width: t(this).parent().width() - 24 + "px",
                    height: t(this).parent().height() - 24 + "px"
                }) : t(this).css({"outline-width": "0"}), i._stopListen()
            }).bind("paste", function (e) {
                var s = function (e) {
                    if (e) {
                        t.pasteBase64 = e;
                        var s = (t(window).height() - 510) / 2, o = s + 480, a = (t(window).width() - 640) / 2,
                            n = ['<div class="pastepic-background" style="width:100%;height:100%;position:absolute;top:0px;left:0px;background-color:#000;opacity:0.6;z-index:5000000;display:none;color:#FFF;"></div>', '<div class="pastepic-container" style="top:', s, "px;left:", a, 'px;width:640px;height:480px;background-color:#fff;text-align:center;z-index:5000000;margin:auto;position:absolute;display:none;">', '<img class="pastepic-show" style="max-width:640px;max-height:480px;" src=""/>', "</div>", '<div class="pastepic-toolbar" style="top:', o, "px;left:", a, 'px;width:640px;height:30px;position:absolute;z-index:5000000;margin:auto;text-align:right;background-color:transparent;display:none;">', '<div class="pastepic-toolbar-main" style="width:320px;height:30px;line-height:30px;position:relative;float:right;background-color:#F9F9F9;">', '<span class="pastepic-describe" style="font-size:12px;font-weight:bold;color:#333333;float:left;margin-left:10px;">是否粘贴此图片</span>', '<span class="pastepic-choose-no" style="font-size:12px;color:#333333;cursor:pointer;width:45px;display:inline-block;margin-right:25px;background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsIAAA7CARUoSoAAAANeSURBVDhPXVW/axVBEJ7du7zCMqW1hXX0L0gjRIMWplALRbAIMYnxByiibXgIYhA0gqJgp4JirIMaGxUVbcXOTpuYvNzt3e2O3zf33otxHsfe7c58+83Mt/tcCEEF5iWTqJWNSdTGxifJk5eE0cFLnWDku7d3enksKD8Q1eL0LUk0EDMPB6+SpSiOSIkB3kAbcZiDX1JxPkoCjnexjYMNAW0TD5aIQigCMlF8KzZyFpCA4STHDEfJMB8zW6sHRGBDQEspJgOLf35jA3BBegQdpJhlDTwRorX4ouqninn4DWwIyFfFrs3chNQHdku8eQ4p5+AXAYZaMQaMUtiS+vyEbI2PSrp/zTYimYH9A4hib22KfnoNjl6aZ3el6k4jM3qDKcmUW9IsHJb4YRU+KtWbFyw1SrwNsyPluGtU9Pi8fROmXnkgaXEOqeErbEh5cVLc5zU0A/4oReckGALC/5PyUDaORacnOlovXRJ5ugQgznvJJ09J/PlDGoBlZApanSvLIgdP2WYuY5zBbAMyLS8j5qAuSXProjRPbpuC6Gvlx4ZUUOfysuSHToBdbpFt0/7TIV8bqUzE7HQ235VsakbUNMiKoQxIrXPljvjJkwZGEOp0AOYc8xkaUsPPaonHl0Hc96/cHt3GMnBH2PVv763bFsFThAUTOozZDQG5SwXt8Si5cl3ChcOiX94Zs4SaOTBtPHT46qHU3TMWAzwzhS7JjjYEpM46mkvT25Tq0lEweYtF/PyIZFeXxR2bRVB79NLKQ4mLMxbDhzpNPIM0NoVPGWqtQ6Wb0+O6vs/pxn7RP/u9Fs/vaSgaLctSe91Z3RwTrGNtzGlxc0GrUGhVthhVVaE9fUNCOHK/RD+u4rih0DjL+dV74iZOg0abUs5GHT9r3qxtubaCEYyBYuqgzgYMAxiWVaG9Gwu6fmSPliuPbT6CdVkFLUJpGfQwFnev68bUXg0vH9laKMo+RtBtYVNLihuEZwm78uCTFWvWQX0iSHEOXubTgJY1EO48EDwYtGHKwtsF3Y+KK8sObntdEd+6jNF0h3dcSrzpWhJ0BRHaTtnAwzSFAO4s0CSlzofzrFPW7yaZMzhBRnQd4ZGF7RQ2dEanPCKoz9D2AwtKw+5GziMNB3lt/xVwy5ahc07+ArnLFQPLE82pAAAAAElFTkSuQmCC\') no-repeat 5px 5px">否</span>', '<span class="pastepic-choose-yes" style="font-size:12px;color:#333333;cursor:pointer;width:50px;display:inline-block;margin-right:25px;border:1px solid #cfcfcf;height:20px;line-height:20px;padding:0 8px 0 1px;border-radius:3px;background:url(\'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAIAAAAC64paAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAKPSURBVDhP1VLNS1VREJ85531oGomaCMFDREmIIgg3FW0qamGLFyUFtXFlRBgIkS500cciigjSvyCiTRS2blHQ8oGtkvSpkGj4kSX4vF9npt+5T7G1u+bCveeemfnNzG9+HIYh7dXM9ndP9v8mi7I/qaqh9LSL6F1KmerPWrJ0/9v5YqlpfOEeYpQMR0Eo5NPUqjpi9vlWRXyaIXW4wWElnB+ZubIYzAu85F4dna7PNRthA6+QoyTtIoV0bMSDMcCc2oXw+9DUxZ/BDyaXVenc112Xb0Zxj02UCXXrw/LYp/X3pDFK+17gMqqUKweTQ1M9q26NNQZWR/2J0cNvEYYGOYyDROhJ+Xpp/WPC7kxj8U7bWC3VOJS10dRG6cHctc1oA80L8fH9p4Y7X+e5DmUTcoYdZ5VXojVHzrL5/Ovd05m+QLdQ9uvvL6Plq5vxHz+22u6GC8Mdb/JcS5rBZHlljuIKsqYrpZHZYiWspBX02IGT5xpvvpwdSDh2xlnh0w3Fu+3jlms0ZR7DGlZoO8Y/WCpvTY7M9FaiZQEPaUjKPGLkbPONW4Vn1mZZHNhIebTgGD5EJeC8vfbI466JpuyhNMsC3HNPdOlg/+2255ZzhEzcbovC+QUKHr8f0GELua6HXRMt+YJJ41C1t3Wwr/CIU/qhFtTw9zvmRUIsaizqQFCWdNUtvZjrXwzmLrcO9LT0QThgiCnx3UJNANoxrkShrU7o+/eNgli/ZIBVW8QXesGLwbF1ZjfZIBN6AiR48kU4D1EJxSKJVxp2xPCwVZw0AU3/GGSIPSMATugNRMesOdaMABbXkrA11SaYs2nbu4b4OFYnFgyzOgyG+cFejI4yIsZkIO6UJxGJ4N3OgxH9Ben/Y4RnXjBoAAAAAElFTkSuQmCC\') no-repeat 5px 0px">是</span>', "</div>", "</div>"].join("");
                        0 === t(".pastepic-background").length && (t(document.body).append(n), t(".pastepic-choose-no").bind("click", function () {
                            l.display(0), r.display(0), h.display(0)
                        }), t(".pastepic-choose-yes").bind("click", function () {
                            l.display(0), r.display(0), h.display(0), i.objImage.base64Transf(t.pasteBase64)
                        }));
                        var l = t(".pastepic-background"), r = t(".pastepic-container"), h = t(".pastepic-toolbar"),
                            d = t(".pastepic-show");
                        d.attr("src", e), l.display(1), r.display(1), h.display(1)
                    }
                }, o = new t.paste(e, s);
                o.getImgBase64Str()
            }), "" !== this.textEditor.val() || t.browser.html5 || this.textEditor.val(t.lang.default_textarea_text), this.chatElement.find(".chat-view-end-session").hover(function (i) {
                t(this).css("color", "#9ca4a8")
            }, function (i) {
                t(this).css("color", "#9ca4a8")
            }).click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), t(".ntalk-window-containter").css({
                    width: "0",
                    height: "0"
                }), i.mode.manageMode.view._objView.onMinimize()
            });
            var e, s;
            this.chatElement.find(".chat-view-button,.chat-view-switch-manual").hover(function (i) {
                t.Event.fixEvent(i).stopPropagation(), t(this).attr("talk_disable") || t(this).attr("selected") || (e = t(this).css("background-position").split(" ").shift(), s = t(this).indexOfClass("chat-view-load-history") || t(this).indexOfClass("chat-view-switch-manual") || t(this).indexOfClass("chat-view-change-csr") ? " -60px" : " -19px", t(this).css("background-position", e + s))
            }, function (i) {
                t.Event.fixEvent(i).stopPropagation(), t(this).attr("talk_disable") || t(this).attr("selected") || (e = t(this).css("background-position").split(" ").shift(), s = t(this).indexOfClass("chat-view-face") ? " 1px" : t(this).indexOfClass("chat-view-load-history") || t(this).indexOfClass("chat-view-switch-manual") || t(this).indexOfClass("chat-view-change-csr") ? " -40px" : " 0px", t(this).css("background-position", e + s))
            }), this.chatElement.find(".chat-view-face").click(function (e) {
                i.mode.callTrack("10-02-02"), t.Event.fixEvent(e).stopPropagation(), i.chatElement.find(".chat-view-window-face").display(1), i._initFaceGroup()
            }), this.chatElement.find(".chat-view-image").click(function (e) {
                i.mode.callTrack("10-02-03"), t.Event.fixEvent(e).stopPropagation(), i._image(e)
            }), this.chatElement.find(".chat-view-file").click(function (e) {
                i.mode.callTrack("10-02-05"), t.Event.fixEvent(e).stopPropagation(), i._file(e)
            }), this.chatElement.find(".chat-view-history").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), t(this).attr("talk_disable") || i._download(e)
            }), this.chatElement.find(".chat-view-load-history").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), t(this).attr("talk_disable") || i._viewHistory(!t(this).attr("selected"))
            }), this.chatElement.find(".chat-view-evaluate").click(function (e) {
                i.mode.callTrack("10-02-09"), t.Event.fixEvent(e).stopPropagation(), t(this).attr("talk_disable") || i._evaluate(e)
            }), this.chatElement.find(".chat-view-capture").click(function (e) {
                i.mode.callTrack("10-02-04"), t.Event.fixEvent(e).stopPropagation(), t(this).attr("talk_disable") || i._capture(e)
            }), this.chatElement.find(".chat-view-switch-manual").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), t(this).attr("talk_disable") || i._switchManual(e)
            }), this.chatElement.find(".chat-view-change-csr").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), t(this).attr("talk_disable") || i._changeCsr(e)
            }), this.chatElement.find(".chat-view-exp").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), i._expansion(e)
            }), this._eventFunction = function (t) {
                i._hiddenFloatMenu()
            }, t(document.body).click(this._eventFunction), this.chatElement.find(".chat-view-submit").hover(function (i) {
                t.Event.fixEvent(i).stopPropagation(), t(this).css({"background-color": "#dfe4e8"})
            }, function (i) {
                t.Event.fixEvent(i).stopPropagation(), t(this).css({"background-color": "#dfe4e8"})
            }), this.chatElement.find(".chat-view-submit").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), t(this).attr("talk_disable") || i._send(!0)
            }), this.chatElement.find(".chat-view-options").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), i.chatElement.find(".chat-view-hidden-area .chat-view-options-menu").display(1), t(".chat-view-options-angle").css("transform", "rotateZ(180deg)")
            }), this.chatElement.find(".chat-view-capture-options").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), i.chatElement.find(".chat-view-capture-hidden-area .chat-view-options-capture-menu").display(1)
            }), this.chatElement.find(".chat-view-options-menu div").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), i.chatElement.find(".chat-view-options-menu div").each(function (i, e) {
                    t(e).removeClass("talk_selected").css("background", "none")
                }), t(this).indexOfClass("view-option-enter") ? i._sendKey = "Enter" : i._sendKey = "Ctrl+Enter", t(this).addClass("talk_selected").css("background", "#f0f3f5"), t(this).parent().display(), t(".chat-view-options-angle").css("transform", "rotateZ(0deg)")
            }), this.chatElement.find(".chat-view-options-capture-menu div").click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), i.chatElement.find(".chat-view-options-capture-menu div").each(function (i, e) {
                    t(e).removeClass("talk_selected").css("background", "none")
                }), t(this).indexOfClass("view-option-hidden") ? t.Capture.captureWithMin = !0 : t.Capture.captureWithMin = !1, t(this).addClass("talk_selected").css("background", "#f1f1f1"), t(this).parent().display()
            }), this.options.chatHeader.find(".header-chatrecord-close").css({
                margin: "20px 5px 0 0",
                background: "url(" + t.imageicon + ") no-repeat -60px 0"
            }).attr("title", t.lang.chat_button_close).hover(function (i) {
                t(this).css("background-position", "-60px -20px")
            }, function (i) {
                t(this).css("background-position", "-60px 0")
            }).click(function (e) {
                t.Event.fixEvent(e).stopPropagation(), i._viewHistory(!1)
            })
        },
        audioProgress: function (t, i) {
        },
        _hiddenFloatMenu: function () {
            this.chatElement.find(".chat-view-hidden-area .chat-view-span").display(), this.chatElement.find(".chat-view-capture-hidden-area .chat-view-span").display(), t(".chat-view-options-angle").css("transform", "rotateZ(0deg)")
        },
        disableButton: function (i, e) {
            var s = this, o = [];
            return i = t.isArray(i) ? i : [i], t.each(i, function (t, i) {
                o.push("." + s.buttonSelectors[i])
            }), o = o.join(","), e ? (o.indexOf("chat-view-image") > -1 && this.chatElement.find(".chat-view-image").find("object,embed,form").css("visibility", "hidden"), o.indexOf("chat-view-file") > -1 && this.chatElement.find(".chat-view-file").find("object,embed,form").css("visibility", "hidden"), o.indexOf("chat-view-change-csr") > -1 && t(".chat-view-change-csr").css("background-position-y", " -40px"), o.indexOf("chat-view-switch-manual") > -1 && t(".chat-view-switch-manual").css("background-position-y", " -40px"), this.chatElement.find(o).attr("talk_disable", "disable").css("opacity", "0.4"), !1) : (o.indexOf("chat-view-image") > -1 && this.chatElement.find(".chat-view-image").find("object,embed,form").css("visibility", "visible"), o.indexOf("chat-view-file") > -1 && this.chatElement.find(".chat-view-file").find("object,embed,form").css("visibility", "visible"), this.chatElement.find(o).attr("talk_disable", "").css("opacity", 1), !0)
        },
        displayButton: function (i, e) {
            var s = this, o = [];
            i = t.isArray(i) ? i : [i], t.each(i, function (t, i) {
                o.push("." + s.buttonSelectors[i])
            }), o = o.join(","), this.chatElement.find(o).display(!e)
        },
        disabledAudioButton: function () {
        },
        _listenTextEditor: function () {
            var i = this;
            this._listenTimeID = setInterval(function () {
                var e = i.textEditor.val(), s = i._cacheListen;
                t.browser.html5 || e != t.lang.default_textarea_text || (e = ""), t.enLength(e) > 500 && (e = t.enCut(e, 500), i.textEditor.val(e), i.textEditor.scrollTop(i.textEditor.scrollHeight())), i._listenNumber++, (e && s !== e || !e && s) && i.mode.predictMessage(e), i._cacheListen = e
            }, 1e3)
        },
        _stopListen: function () {
            this._listenNumber = 0, clearInterval(this._listenTimeID), this._listenTimeID = null
        },
        _initFaceGroup: function () {
            var i, s = this,
                o = t.STYLE_NBODY + "outline:0;float:left;padding:8px;width:23px;height:23px;display:inline;zoom:1;";
            this._initFace || (this._initFace = !0, this.chatElement.find(".chat-view-face-tags").length || this.chatElement.find(".chat-view-window-face").append(['<div class="chat-view-face-tags" style="', t.STYLE_NBODY, 'background:#F1F1F1;clear:both;padding:0 10px;height:38px;border-top:1px solid #D4D4D4;"></div>'].join("")), t.each(this.mode.config.faces, function (a, n) {
                var l = "chat-view-face-group-" + a, r = "chat-view-face-tag-" + a;
                s.chatElement.find("." + l).length || s.chatElement.find(".chat-view-window-face").insert('<div class="' + l + ' chat-view-face-group" style="' + t.STYLE_NBODY + (0 === a ? "" : "display:none;") + 'overflow-x:hidden;overflow-y:auto;margin:10px 0px 10px 10px;clear:left;height:165px;"></div>', "afterbegin"), n.pics === e && (n.pics = []), t.each(n.pics, function (t, e) {
                    var n = t + 1,
                        r = 0 === a ? ' title="' + e.sourceurl + '"' : ' title="" sourceurl="' + e.sourceurl + '"';
                    i = o + "border:0px solid #F6FBFE;border-left:1px solid #DFEFF8;border-bottom:1px solid #DFEFF8;background:#F6FBFE;" + (n <= 6 ? "border-top:1px solid #DFEFF8;" : "") + (n % 6 === 0 ? "border-right:1px solid #DFEFF8;" : ""), s.chatElement.find("." + l).append('<img src="' + e.url + '" ' + r + ' border="0" style="' + i + '" />')
                }), 0 === a ? t({
                    className: "chat-view-face-tag " + r + " tag-selected",
                    title: n.name,
                    index: "0",
                    style: t.STYLE_NBODY + "zoom:1;margin:0 5px 0 0;float:left;background:#fff;position:relative;top:-1px;border-left:1px solid #D4D4D4;border-right:1px solid #D4D4D4;"
                }).appendTo(s.chatElement.find(".chat-view-face-tags")).append('<img src="' + n.icon + '" border="0" style="' + o + 'border:none;" />') : t({
                    className: "chat-view-face-tag " + r,
                    title: n.name,
                    index: a,
                    style: t.STYLE_NBODY + "zoom:1;margin:0 5px 0 0;float:left;position:relative;top:0px;border-left:1px solid #f1f1f1;border-right:1px solid #f1f1f1;"
                }).appendTo(s.chatElement.find(".chat-view-face-tags")).append('<img src="' + n.icon + '" border="0" style="' + o + 'border:none;" />')
            }), this.chatElement.find(".chat-view-face-group").hover(function (i) {
                t.Event.fixEvent(i).stopPropagation();
                var e = t.Event.fixEvent(i).target;
                "img" === e.tagName.toLowerCase() && t(e).css({cursor: "pointer", "background-color": "#FFF"})
            }, function (i) {
                t.Event.fixEvent(i).stopPropagation();
                var e = t.Event.fixEvent(i).target;
                "img" === e.tagName.toLowerCase() && t(e).css({"background-color": "#F6FBFE"})
            }).click(function (i) {
                t.Event.fixEvent(i).stopPropagation();
                var e = t.Event.fixEvent(i).target;
                "img" === e.tagName.toLowerCase() && (s.chatElement.find(".chat-view-window-face").display(), t(this).indexOfClass("chat-view-face-group-0") ? s._insertText("[" + t(e).attr("title") + "]") : (t.Log("selected current face:" + t(e).attr("sourceurl")), s.mode.send({
                    type: 2,
                    emotion: 1,
                    msg: "current face",
                    url: t(e).attr("src"),
                    sourceurl: t(e).attr("sourceurl"),
                    oldfile: "",
                    size: "",
                    extension: ""
                })))
            }), this.chatElement.find(".chat-view-face-tags").hover(function (i) {
                t.Event.fixEvent(i).stopPropagation();
                var e = t.Event.fixEvent(i).target;
                e = "img" == e.tagName.toLowerCase() ? e.parentNode : e, t(e).indexOfClass("chat-view-face-tag") && !t(e).indexOfClass("tag-selected") && t(e).css({
                    "background-color": "#fafafa",
                    top: "-1px",
                    "border-left": "1px solid #D4D4D4",
                    "border-right": "1px solid #D4D4D4",
                    "margin-right": "5px",
                    zoom: "1"
                })
            }, function (i) {
                t.Event.fixEvent(i).stopPropagation();
                var e = t.Event.fixEvent(i).target;
                e = "img" == e.tagName.toLowerCase() ? e.parentNode : e, t(e).indexOfClass("chat-view-face-tag") && !t(e).indexOfClass("tag-selected") && t(e).css({
                    "background-color": "transparent",
                    top: "0px",
                    "border-left": "1px solid #f1f1f1",
                    "border-right": "1px solid #f1f1f1",
                    "margin-right": "5px",
                    zoom: "1"
                })
            }).click(function (i) {
                t.Event.fixEvent(i).stopPropagation();
                var e = t.Event.fixEvent(i).target;
                e = "img" == e.tagName.toLowerCase() ? e.parentNode : e, t(e).indexOfClass("chat-view-face-tag") && (s.chatElement.find(".chat-view-face-tag").css({
                    "background-color": "transparent",
                    top: "0px",
                    "border-left": "1px solid #f1f1f1",
                    "border-right": "1px solid #f1f1f1",
                    "margin-right": "5px",
                    zoom: "1"
                }).removeClass("tag-selected"), s.chatElement.find(".chat-view-face-group").display(), t(e).css({
                    "background-color": "#fff",
                    top: "-1px",
                    "border-left": "1px solid #D4D4D4",
                    "border-right": "1px solid #D4D4D4",
                    "margin-right": "5px",
                    zoom: "1"
                }).addClass("tag-selected"), s.chatElement.find(".chat-view-face-group-" + t(e).attr("index")).display(1))
            }))
        },
        _contentFilter: function (i) {
            return "string" != typeof i.msg || /<.*?\>/gi.test(i.msg) ? (1 !== i.type && 7 != i.type || !/<img(.*?)src=([^\s]+)(.*?)>/gi.test(i.msg) || (i.msg = i.msg.replace(/<img(.*?)src=([^\s]+)(.*?)>/gi, '<img class="ntalk-preview" ' + (7 == i.type ? " robotImg='true' " : "") + 'src="' + t.imageloading + '" sourceurl=$2 style="' + t.STYLE_NBODY + '" />')), i) : (i.msg = i.msg.replace(/[\r\n]/gi, " <br>"), i.msg && i.msg.indexOf("xnlink") === -1 && (i.msg = i.msg.replace(/(\s{2})/gi, " {$null}")), i.msg = t.myString(i.msg).linkFilter1(t.STYLE_BODY + "color:#0a8cd2;"), i.msg = i.msg.replace(/\{\$null\}/gi, "&nbsp;&nbsp;"), i.msg = i.msg.replace(/\t/gi, "&nbsp;&nbsp;&nbsp;&nbsp;"), i.msg = t.utils.handleLinks(i.msg, {settingid: this.settingid}), i.msg = this._faceFilter(i.msg), i = t.extend({
                color: "000000",
                fontsize: "12",
                bold: "false",
                italic: "false",
                underline: "false"
            }, i))
        },
        _faceFilter: function (i) {
            var e = i.match(/\[([a-z]+)\]/gi), s = function (i) {
                var e = null;
                return t.each(t.lang.editorFaceAlt, function (t, s) {
                    s && new RegExp(i.replace(/\[/, "\\[").replace(/\]/, "\\]"), "gi").test("[" + s + "]") && (e = t)
                }), e
            };
            if (!e || !i) return i;
            for (var o, a = 0; a < e.length; a++) (o = s(e[a])) && (i = i.replace(e[a], '<img src="' + t.sourceURI + "images/faces/" + o + (t.browser.msie6 ? ".gif" : ".png") + '" style="' + t.STYLE_NBODY + 'width:23px;height:23px;margin:0 2px;display:inline;vertical-align:text-bottom;" />'));
            return i
        },
        _image: function () {
        },
        _file: function () {
        },
        _download: function () {
            this.mode.download && this.mode.download(this.settingid)
        },
        _viewHistory: function (t) {
            this.mode.viewHistory && (t ? this.chatElement.find(".chat-view-load-history").attr("selected", "selected").css("background-position", "-220px -60px") : this.chatElement.find(".chat-view-load-history").attr("selected", "").css("background-position", "-220px -40px"), this._tempHeader.display(!t), this._chatsHeader.display(t), this._chatsElement.css({height: this.chatHistory.height() + "px"}).display(t), t && this.mode.viewHistory(this.settingid, this._chatsElement.find("IFRAME.chat-view-float-iframe").get(0)))
        },
        _evaluate: function () {
            this.mode.showEvaluation && this.mode.showEvaluation()
        },
        _capture: function () {
            this.mode.startCapture && this.mode.startCapture(this.settingid)
        },
        _switchManual: function () {
            this.mode.switchServerType && this.mode.switchServerType(!0, this.settingid)
        },
        _changeCsr: function () {
            this.mode.changeCustomerServiceInfo && this.mode.changeCustomerServiceInfo()
        },
        _expansion: function (t) {
            this.options.toggleExpansion(this.settingid)
        },
        updateMore: function (i) {
            this.chatElement.find(".chat-view-exp").html(t.lang.button_more + (i ? " &lt;" : " &gt;"))
        },
        switchToolbar: function (i, e) {
            var s = this;
            t.Log("nTalk.chat.view.switchToolbar(" + i + ")"), i ? (this.chatElement.find(".chat-view-button,.chat-view-capture-options").each(function () {
                var i = t(this).indexOfClass("chat-view-capture-options");
                (!i && "disable" != t(this).attr("talk_disable") || i && "block" == s.chatElement.find(".chat-view-capture").css("display")) && t(this).display(1)
            }), this.displayButton("csr", 1 != this.mode.config.changecsr), this.displayButton("history", 1 != this.mode.config.chatingrecord), this.displayButton("loadhistory", 1 != this.mode.config.viewchatrecord), this.displayButton(["capture", "capoptions"], 0 === this.mode.config.captureimage), this.displayButton("evaluate", 0 === this.mode.config.evaluation), this.chatElement.find(".chat-view-exp").display(this.mode._moreData && this.mode._moreData.length), this.chatElement.find(".chat-view-switch-manual").display()) : (2 == t.server.robot ? (this.chatElement.find(".chat-view-button,.chat-view-capture-options").each(function () {
                var i = t(this).indexOfClass("chat-view-capture-options");
                ("disable" == t(this).attr("talk_disable") || i && "none" == s.chatElement.find(".chat-view-capture").css("display")) && t(this).display()
            }), this.displayButton("loadhistory", 1 != this.mode.config.viewchatrecord), this.displayButton("history", 1 != this.mode.config.chatingrecord), this.displayButton(["capture", "capoptions"], 0 === this.mode.config.captureimage), this.displayButton("evaluate", 0 === this.mode.config.evaluation)) : this.chatElement.find(".chat-view-button,.chat-view-capture-options").each(function () {
                t(this).display()
            }), this.chatElement.find(".chat-view-exp").display(this.mode._moreData && this.mode._moreData.length), this.chatElement.find(".chat-view-switch-manual").display(1), this.chatElement.find(".chat-view-change-csr").display(0))
        },
        _send: function (i) {
            if (this.chatElement.find(".chat-view-hidden-area .chat-view-suggest-list").display(), this.isRobotSuggest = !0, "disable" == t(".chat-view-submit").attr("talk_disable") || /QUERY|QUEUE/i.test(this.mode.statusConnectT2D)) return !1;
            var e = this._clearEditor();
            e.length && e != t.lang.default_textarea_text && this.mode.send(e), t.browser.html5 || i !== !0 || this.textEditor.css({color: "#ccc"}).val(t.lang.default_textarea_text).get(0).focus()
        },
        _endSession: function () {
            this.mode.endSession()
        },
        _clearEditor: function () {
            var t = this.textEditor.val().replace(/(^\s*)|(\s*$)/g, "");
            return this.textEditor.val(""), t
        },
        callChatResize: function (t, i) {
            this.chatHistory.css({height: i - 156 - 16 + "px"}), this.chatElement.find(".chat-view-float-history, .chat-view-float-history iframe").css({height: i - 156 + "px"}), this.chatElement.find(".chat-view-window-status-info").css("width", t - 40 + "px"), this.evalDialog && this.evalDialog.resize(), this.textEditor.css({width: t - 22 + "px"}), this.scroll && this.scroll.resizeScroll()
        },
        changeQueueStyle: function () {
            return !1
        },
        audioView: function (i) {
            if (!this.msgid && t.musicEl) return t.musicEl.emit(), void (t.musicEl = null);
            var e, s, o, a, n, l = this, r = l.msgid, h = l.duration, d = t("." + r).find(".view-history-body"),
                c = !(r.toLowerCase().indexOf("j") > -1);
            switch (c ? (s = t.sourceURI + "images/kfSound.png", o = t.sourceURI + "images/kfSound.gif", a = "#FFFFFF", n = "right", durationAlign = "left") : (s = t.sourceURI + "images/mySound.png", o = t.sourceURI + "images/mySound.gif", a = "#CEF2FF", n = "left", durationAlign = "right"), i) {
                case"init":
                    t.Log("[nTalk music]: mp3 view init, msgid is " + r);
                    var p = ['<div id="duration_', r, '" style="', t.STYLE_BODY, "height:24px;line-height:24px;padding:4px 4px 0px;float:", durationAlign, '" >', h, "''</div>", '<div id="player_', r, '" style="', t.STYLE_BODY, " width:80px;height:24px;padding:4px 0;background:", a, ";border-radius:5px;border: none;text-align:", n, '">', '<img width="24px" height="24px" src="', s, '"/>', "</div>"].join("");
                    d.parent().css("padding", "0px"), d.append(p), t.browser.msie && t.browser.ieversion <= 7 && (t("#player_" + r).css("width", "50px"), t("." + r).find("table").css("width", "100px"));
                    break;
                case"play":
                    t.Log("[nTalk music]: mp3 view play, msgid is " + r), t.musicEl && (t.Log("[nTalk music]: stop playing mp3 view, msgid is " + t.playMsgid, 2), t.musicEl.emit()), t.musicEl = l, e = t("#player_" + r + " img")[0], e.src = e.src.replace("png", "gif");
                    break;
                case"stop":
                    t.Log("[nTalk music]: mp3 view stop, msgid is " + r), t.musicEl = null, e = t("#player_" + r + " img")[0], e.src = e.src.replace("gif", "png")
            }
        },
        audioBindEvent: function (i) {
            var e = this.msgid;
            switch (i) {
                case"init":
                    t.Log("[nTalk music]: mp3 event init, msgid is " + e);
                    var s = this, o = t("#player_" + e);
                    o.click(function () {
                        t.Log("[nTalk music]: mp3 trigger click, msgid is " + e), s.emit()
                    })
            }
        },
        starLevel: function (e) {
            if (!(t(".nt-evaluation-starlevel").length > 0)) {
                var s = "", o = "nt-evaluation-starlevel", a = {
                        "nt-evaluation-starlevel-span": "padding: 0px; margin:11px 0px 14px 10px; border: none; width: 90px; max-width: 90px; height:16px; line-height:16px; max-height: none; clear: none; position: static; display: inline-block; float: left;visibility: visible; white-space: nowrap; text-overflow: ellipsis; overflow: hidden; cursor: auto; background-color: transparent;",
                        "nt-evaluation-starlevel": ""
                    }, n = !1, l = t.sourceURI + "images/evaluate/fullstar.png",
                    r = t.sourceURI + "images/evaluate/emptystar.png", h = t.sourceURI + "images/evaluate/halfstar.png";
                for (e != Math.ceil(e) && (n = !0), i = 0; i < Math.floor(e); i++) s += '<img class="' + o + '" style="' + t.STYLE_BODY + " " + a[o] + '" src="' + l + '" nodeid="fullstar"/>';
                for (n && (s += '<img class="' + o + '" style="' + t.STYLE_BODY + " " + a[o] + '" src="' + h + '" nodeid="fullstar"/>'), i = 0; i < 5 - Math.ceil(e); i++) s += '<img class="' + o + '" style="' + t.STYLE_BODY + " " + a[o] + '" src="' + r + '" nodeid="fullstar"/>';
                s = '<span class="nt-evaluation-starlevel-span" style="' + t.STYLE_BODY + " " + a["nt-evaluation-starlevel-span"] + '">' + s + "</span>", t(".chat-header-body").append(s)
            }
        }
    };
    var l = t.Class.create();
    l.prototype = {
        _width: 0,
        _height: 0,
        _isMessageView: !1,
        element: null,
        title: "",
        status: 0,
        count: 0,
        initialize: function (i, e, o) {
            var a = this;
            t.Log("new nTalk.minimizeView()", 1), this.status = i.status || 0, this._isMessageView = e, this.callback = o || s, this.element = t(".ntalk-minimize-window"), this._width = 221, this._height = 40, this.element.length || (this.element = t({
                className: "ntalk-minimize-window",
                style: t.STYLE_BODY + "width:" + (this._width - 2) + "px;height:" + (this._height - 2) + "px;border:none;background:#ff6640;cursor:pointer;z-Index:2000000000;border-radius:3px;color:#fff;"
            }).appendTo(!0).css({
                position: "fixed",
                bottom: "5px",
                right: "0"
            }).html(['<div class="ntalk-minimize-icon" style="', "float:left;margin:5px 11px 5px 14px;_margin:5px 0px;width:30px;height:30px;background:url(", t.themesURI, 'xiaot2.png) no-repeat -0 -0;font-size:14px;color:inherit;"></div>', '<div class="ntalk-minimize-title" style="', 'float:left;margin:0px 0px 0px 0px;line-height:40px;overflow:hidden;width:160px;height:40px;max-width:150px;font-size:14px;color:inherit;"></div>', '<div style="', t.STYLE_NBODY, 'clear:both;"></div>'].join(""))), this.update(i.name || "", i.logo || ""), this.status ? this.online() : this.offline(), this.element.click(function (i) {
                t.Event.fixEvent(i).stopPropagation(), a.remove()
            })
        },
        online: function () {
            this.element.find(".ntalk-minimize-icon").css("opacity", 1)
        },
        offline: function () {
            this.element.find(".ntalk-minimize-icon").css("opacity", .5)
        },
        update: function (i, e) {
            if (this.title = i ? t.utils.handleLinks(t.lang.toolbar_min_title, {destname: i}) : t.lang.toolbar_default_text, this.element.find(".ntalk-minimize-title").html(this.title), e && e != t.CON_SINGLE_SESSION) {
                t.require(e + "#image", function (i) {
                    if (i.error) return void t.Log("load logo:" + e, 2)
                })
            }
        },
        remove: function () {
            t(window).removeEvent("resize", this._fiexd), this.stopFlicker(), this.element.remove(), this.callback()
        },
        startFlicker: function (i, s) {
            var o = this, a = this.count > 99 ? "99+" : this.count, n = i ? 1e3 : 500;
            s = s || 0, i === e && this.stopFlicker(!0), t.Log("$.minView.startFlicker(" + t.JSON.toJSONString(arguments) + ") timeid:" + this.timeID, 1), i ? this.element.css({
                "border-color": "#d55f01",
                color: "#fff",
                background: "#ff6640"
            }) : this.element.css({
                "border-color": "#c8c7c6",
                color: "#ff6640"
            }).gradient("top", "#e5e5e4", "#f2f3f3").find(".ntalk-minimize-title").html(t.utils.handleLinks(t.lang.toolbar_min_news + "...", {count: '<span style="font-weight:bold;font-size:18px;color:inherit;">' + a + "</span>"})), s >= 7 || (this.timeID = setTimeout(function () {
                s++, o.startFlicker(!i, s)
            }, n))
        },
        stopFlicker: function (i) {
            t.Log("$.minView.stopFlicker()", 1), clearTimeout(this.timeID), this.timeID = null, i || (this.count = 0), this.element.css({"border-color": "#d55f01"}).gradient("top", "#ff6640", "#ff6640").find(".ntalk-minimize-title").html(this.title)
        },
        _fiexd: function (i) {
            this.element = t(".ntalk-minimize-window"), this.element && this.element.length && this.element.fixed({
                width: this.width - 2,
                height: this.height - 2,
                left: t(window).width() - this.width - 2,
                top: t(window).height() - this.height - 2
            })
        }
    };
    var r = t.Class.create();
    r.prototype = {
        name: "chatManageView",
        defaultOptions: {
            dropHeight: 69,
            width: 376,
            height: 439,
            minWidth: 415,
            minHeight: 520,
            leftElementWidth: 140,
            rightElementWidth: 200,
            resizeHeight: 595,
            drag: !0,
            resize: !1,
            fixed: !0,
            zIndex: 1e6
        },
        _flickerTimeID: [],
        _objView: null,
        _manageMode: null,
        tagKey: "",
        tagTitle: "",
        extended: null,
        options: null,
        header: null,
        body: null,
        leftContent: null,
        leftElement: null,
        chatBody: null,
        chatContainter: null,
        rightElement: null,
        chatWidth: 0,
        chatHeight: 0,
        CON_ICON_WIDTH: 44,
        CON_ICON_HEIGHT: 45,
        initialize: function (i, e) {
            this.options = t.extend({}, this.defaultOptions, i), this.extended = {
                leftElement: !1,
                rightElement: !1
            }, this._manageMode = e, this._getChatPosition(i.position || {}), this._create(), this._bind()
        },
        close: function () {
            t.Log("nTalk.chatManageView.close()", 1);
            try {
                t.browser.oldmsie ? this._objView.containter.display() : this._objView.containter.remove()
            } catch (i) {
                t.Log(i, 3)
            }
        },
        addChatTag: function (i) {
            var e, s = this;
            this.leftContent && (this.tagKey = i, this.tagTitle = t.lang.toolbar_default_text, e = t({
                tag: "li",
                style: t.STYLE_NBODY + "margin:5px 0 0 5px;list-style:none;border:1px solid #fafafa;border-right:none;position:relative;cursor:pointer;",
                className: this.tagKey,
                key: this.tagKey
            }).appendTo(this.leftContent).html(['<div class="tag-head-icon" style="', t.STYLE_NBODY, 'width:12px;height:12px;overflow:hidden;position:absolute;left:0;margin:11px 0px 11px 11px;background:#666;"></div>', '<div class="tag-content-text" style="', t.STYLE_BODY, 'margin-left:30px;height:35px;line-height:35px;overflow:hidden;">', this.tagTitle, "</div>", '<div class="tag-button-close" style="', t.STYLE_NBODY, 'width:15px;height:15px;position:absolute;left:110px;top:10px;"></div>'].join("")).click(function (t) {
                s._onSwitchChat(this, t)
            }).hover(this._onOverChatTag, this._onOutChatTag), this._onSelectedChatTag(e), e.find("div.tag-button-close").click(function (t) {
                s._onCloseChatTag(this, t)
            }), this.leftContent.find("li").length > 1 && !this.extended.leftElement && this.toggleExpansion("leftElement", !0), this.leftBody.scrollTop(this.leftBody.scrollHeight()))
        },
        removeChatTag: function (t) {
            this.leftContent.find("li." + t).remove(), this.leftContent.find("li").length <= 1 && this.extended.leftElement && this.toggleExpansion("leftElement", !1)
        },
        updateChatTag: function (i, e, s) {
            var o, a = this.header.find(".chat-header-icon"), n = this.header.find(".chat-header-name"),
                l = this.header.find(".chat-header-sign");
            if (this.leftContent.find("li." + i + " .tag-head-icon").css("background-color", 1 !== e.status ? "#666" : "#060"), s !== !0) {
                if (this.leftContent.find("li." + i + " .tag-content-text").html(e.id == t.CON_SINGLE_SESSION ? t.lang.toolbar_default_text : e.name), !e.id) return void this.header.find(".chat-header-icon,.chat-header-name,.chat-header-sign").css("visibility", "hidden");
                t.CON_MULTIPLAYER_SESSION === e.logo ? e.logo = t.imagemultiplayer : t.CON_SINGLE_SESSION === e.logo && (e.logo = t.imagesingle), a.css("visibility", "visible").css("background-image", "none"), a.find("img").length && a.find("img").attr("src") == e.logo ? a.find("img").attr({
                    "data-single": t.CON_MULTIPLAYER_SESSION != e.logo ? "1" : "0",
                    width: e.attr.width,
                    height: e.attr.height
                }).css({
                    margin: (this.CON_ICON_HEIGHT - e.attr.height) / 2 + "px " + (this.CON_ICON_WIDTH - e.attr.width) / 2 + "px",
                    width: e.attr.width + "px", height: e.attr.height + "px"
                }) : a.html('<img data-single="1" onerror="nTalk.loadImageAbnormal(this, event)" src="' + e.logo + '" border="0" width="48" height="48" style="' + t.STYLE_NBODY + 'margin:0px  0px;width:48px;height:48px;background:#fff;" />'), 0 === e.status && t.CON_SINGLE_SESSION !== e.id ? a.find("img").css("opacity", "0.5") : a.find("img").css("opacity", "1"), n.css("visibility", "visible").html(e.title || e.name), t.evaluateStarLevel ? l.css("display", "none") : (o = Math.max(0, this.header.width() - n.width() - 165), l.css("visibility", "visible").attr("title", e.sign).css("width", o + "px").html(e.sign))
            }
        },
        switchChatTag: function (i) {
            var e = t("li." + i, this.leftContent);
            e.length && this._onSelectedChatTag(e), this._manageMode.callSwitchChat(i)
        },
        toggleExpansion: function (i, e) {
            t.inArray(["leftElement", "rightElement"], i) === !1 && (i = "leftElement"), e = t.isBoolean(e) ? e : !this.extended[i], "rightElement" === i ? (e ? (this[i].css({
                width: this.options.rightElementWidth + "px",
                display: "block"
            }), this.chatWidth = this.options.width + this.options.rightElementWidth) : e || (this[i].css({
                width: this.options.rightElementWidth + "px",
                display: "none"
            }), this.chatWidth = this.options.width), this.extended[i] = e, this.chatHeight = this.options.height + this.options.dropHeight, this.chatWidth += this.extended.leftElement ? this.options.leftElementWidth : 0) : (e ? (this.chatWidth = this.options.width + this.options.leftElementWidth, this[i].css("display", "block"), this.chatContainter.css("border-bottom-left-radius", "0px")) : e || (this.chatWidth = this.options.width, this[i].css("display", "none"), this.chatContainter.css("border-bottom-left-radius", "5px")), this.extended[i] = e, this.chatWidth += this.extended.rightElement ? this.options.rightElementWidth : 0), this._objView.minWidth = this.defaultOptions.width + (this.extended.leftElement ? this.options.leftElementWidth : 0) + (this.extended.rightElement ? this.options.rightElementWidth : 0), this.headBody.css("width", this.chatWidth + "px"), this.body.css("width", this.chatWidth - (this.extended.rightElement ? this.options.rightElementWidth : 0) + "px"), this._objView.changeAttr(this.chatWidth, this.chatHeight);
            var s = this.header.find(".chat-header-name"), o = this.header.find(".chat-header-sign");
            if (t.evaluateStarLevel) o.css("display", "none"); else {
                var a = Math.max(0, this.header.width() - s.width() - 165);
                o.css("visibility", "visible").css("width", a + "px")
            }
            return this.extended[i]
        },
        updateRightData: function (i, e) {
            var s = this, o = !1;
            return this.settingid = i, e && e.length ? (this._clearTag(), t.each(e, function (t, i) {
                if (i.autoopen) for (var t = 0; t < i.autoopen.length; t++) {
                    var a = i.autoopen[t].src, n = i.autoopen[t].title, l = i.autoopen[t].closebutton;
                    s._addRightTag(a, n, l)
                }
                i.data && i.data.length && (i.selected === !0 && (o = !0), o || t != e.length - 1 || (i.selected = !0), s._addRightLabel(i.title, i.data, e.length, i.selected))
            }), void this._bindTag()) : void this.toggleExpansion("rightElement", !1)
        },
        updateViewStatus: function (t) {
        },
        updataSkin: function (i, e, s) {
            var o, a = /^#[0-9a-f]{6}$/i;
            if (e = "#ff6640", s = "#ff6640", e == s) if (a.test(e)) {
                var n = t.toHSL(e).l;
                this.headBody.css({
                    background: e,
                    color: n < .75 ? "#fff" : "#525252"
                }), this.rightElement.find(".window-right-head").css({
                    background: e,
                    color: n < .75 ? "#fff" : "#525252"
                })
            } else this.headBody.css({background: "url(" + e + ") repeat"}), this.rightElement.find(".window-right-head").css({background: "url(" + e + ") repeat"}); else this.headBody.gradient("top", e, s), this.rightElement.find(".window-right-head").gradient("top", e, s);
            o = this._manageMode.get(), o && a.test(i) ? o.view.chatElement.find(".chat-view-window-history").css("background-color", i) : o && i && o.view.chatElement.find(".chat-view-window-history").css("background-image", "url(" + i + ")")
        },
        minimize: function (t) {
            this._objView.minimize(t)
        },
        maximize: function (t) {
            this._objView.maximize(t)
        },
        hidden: function () {
            this._objView.minimize(null, !0), t.Log("chatManageView.hidden:" + this._objView.containter.css("visibility"), 2)
        },
        visible: function () {
            this._objView.maximize(null, !0), t.Log("chatManageView.visible:" + this._objView.containter.css("visibility"), 2)
        },
        labelFlicker: function (t, i, s) {
            var o = this, a = i ? 1e3 : 500;
            s = s || 0, i === e && this.stopFlicker(t), i ? this.leftContent.find("." + t).css({"background-color": "#FE800F"}).addClass("talk_flicker") : this.leftContent.find("." + t).css({"background-color": "#fafafa"}).addClass("talk_flicker"), s >= 7 || (this._flickerTimeID[t] = setTimeout(function () {
                s++, o.labelFlicker(t, !i, s)
            }, a))
        },
        stopFlicker: function (t) {
            clearTimeout(this._flickerTimeID[t]), this._flickerTimeID[t] = null, this.leftBody.find("." + t).css({"background-color": "#fafafa"}).removeClass("talk_flicker")
        },
        _create: function () {
            t.body_family = nTalk("body").css("font-family").replace(/"/g, ""), t.STYLE_NBODY = t.STYLE_NBODY + "font-family:" + t.body_family + ";", t.STYLE_BODY = t.STYLE_BODY + "font-family:" + t.body_family + ";";
            var i = this, e = t.extend({}, this.options, {
                width: this.options.width,
                height: this.options.height + this.options.dropHeight,
                minWidth: this.defaultOptions.minWidth,
                minHeight: this.defaultOptions.minHeight
            });
            t.themesURI && (t.imageicon = t.themesURI + "chaticon." + (t.browser.msie6 ? "gif" : "png"), t.require([t.imageicon], function (i) {
                i.error && t.Log("cache chat icon failure", 3)
            })), this._objView = new t.Window(t.extend({
                onChanage: function (t) {
                    i._callResize.call(i, t)
                }, onClose: function () {
                    i._callClose.call(i)
                }, onMinimize: function () {
                    i._callMinimize.call(i)
                }, onMaximize: function () {
                    i._callMaximize.call(i)
                }, onMaxResize: function () {
                    i._callMaxResize.call(i)
                }
            }, e)), this.header = this._objView.header, this.body = this._objView.body, this.chatWidth = this.options.width, this.chatHeight = this.options.height + this.options.dropHeight, this._objView.buttonClose.hover(function () {
                t(this).css("background-position", "-60px -20px")
            }, function () {
                t(this).css("background-position", "-60px 0")
            }).attr("title", t.lang.chat_button_close).css({
                margin: "20px 5px 0 0",
                background: "url(" + t.imageicon + ") no-repeat -60px 0"
            }), this._objView.buttonResize && this._objView.buttonResize.css({
                width: "12px",
                height: "15px",
                background: "url(" + t.imageicon + ") no-repeat -298px -5px"
            }), this._objView.buttonMax.hover(function (i) {
                var e = t(this).css("background-position").split(" ").shift();
                t(this).css("background-position", e + " -20px")
            }, function (i) {
                var e = t(this).css("background-position").split(" ").shift();
                t(this).css("background-position", e + " 0")
            }).css({
                margin: "20px 5px 0 0",
                background: "url(" + t.imageicon + ") no-repeat -40px 0"
            }).attr("title", t.lang.chat_button_resize_max), this._objView.buttonMin.hover(function () {
                t(this).css("background-position", "-1px -20px")
            }, function () {
                t(this).css("background-position", "-1px 0")
            }).css({
                margin: "20px 5px 0 0",
                background: "url(" + t.imageicon + ") no-repeat -1px 0"
            }).attr("title", t.lang.chat_button_min), this.headBody = t({
                className: "chat-header-body",
                style: t.STYLE_BODY + "background:#ff6640;z-index:0;color:#525252;"
            }).appendTo(this.header, !0).css({
                position: "absolute",
                "border-top": "1px solid #ff6640",
                "border-left": "1px solid #ff6640",
                "border-right": "1px solid #ff6640",
                "border-bottom": "0",
                top: "0",
                "border-radius": "9px 9px 0px 0px",
                "-moz-border-radius": "9px 9px 0px 0px",
                "-webkit-border-radius": "9px 9px 0px 0px",
                width: this.options.width - 2 + "px",
                height: this.options.dropHeight + "px"
            }), this.headName = t({
                tag: "span",
                className: "chat-header-name",
                style: t.STYLE_BODY + "color:#ffffff;position:absolute;left:69px;top:17px;display:inline-block;float:left;height:20px;width:220px;visibility:hidden;overflow:hidden;font-weight:normal;cursor:auto;font-size:18px;color:#fff;line-height:18px;font-family:" + t.body_family + ";word-break:keep-all;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"
            }).appendTo(this.headBody).html(""), this.headSign = t({
                tag: "span",
                className: "chat-header-sign2",
                style: t.STYLE_BODY + "color:#c3c3c3;position:absolute;left:69px;top:37px;;display:inline-block;float:left;height:20px;line-height:20px;white-space:nowrap;text-overflow:ellipsis;overflow:hidden;cursor:auto;font-size:10px;color:#fff;font-family:" + t.body_family + ";"
            }).appendTo(this.headBody).html("在线客服"), this.headIcon = t({
                tag: "div",
                className: "chat-header-icon",
                style: t.STYLE_NBODY + "visibility:hidden;border-radius:0px;overflow:hidden;background:url(" + t.imageicon + ");background-repeat:no-repeat;background-position:-374px 0; background-color:#ffffff;position:absolute;left:14px;top:12px;width:" + this.CON_ICON_WIDTH + "px;height:" + this.CON_ICON_HEIGHT + "px;z-index:1;border-radius:48px;"
            }).appendTo(this.header, !0), this.chatBody = this._objView.chatBody, this.leftElement = t({
                className: "body-chat-tags",
                style: t.STYLE_NBODY + "display:none;float:left;background:#fafafa;overflow:hidden;"
            }).css({
                "border-left": "1px solid #5f6467",
                "border-bottom": "1px solid #5f6467",
                "border-radius": "0px 0px 0px 5px",
                width: this.options.leftElementWidth - 1 + "px",
                height: this.options.height - 1 + "px"
            }).appendTo(this.chatBody), this.chatContainter = t({
                className: "body-chat-containter",
                style: t.STYLE_NBODY + "float:left;overflow:hidden;"
            }).css({
                "border-radius": "0px 0px 0px 5px",
                "-moz-border-radius": "0px 0px 0px 5px",
                "-webkit-border-radius": "0px 0px 0px 5px",
                width: +this.options.width + "px",
                height: +this.options.height + "px"
            }).appendTo(this.chatBody), t({style: t.STYLE_NBODY + "clear:both;"}).appendTo(this.chatBody), this.rightElement = this._objView.rightElement.css({width: this.options.rightElementWidth + "px"}), this.rightBody = t({
                className: "window-right-body",
                style: t.STYLE_BODY + "width:199px;background:#fff;"
            }).css({
                "border-right": "1px solid #5f6467",
                "border-bottom": "1px solid #5f6467",
                height: +this.options.height - 1 + "px",
                "border-radius": "0px 0px 5px 0px",
                "-moz-border-radius": "0px 0px 5px 0px",
                "-webkit-border-radius": "0px 0px 5px 0px"
            }).appendTo(this.rightElement), this.buttonScrollTop = t({
                tag: "div",
                className: "nTalk-scroll-top",
                style: t.STYLE_NBODY + "height:20px;width:100%;z-index:99;background:url(" + t.imageicon + ") no-repeat 20px -92px;display:block;cursor:pointer;"
            }).appendTo(this.leftElement), this.leftBody = t({
                tag: "div",
                className: "nTalk-scroll-body",
                style: t.STYLE_NBODY + "overflow:hidden;height:424px;"
            }).appendTo(this.leftElement), this.leftContent = t({
                tag: "ul",
                className: "ntalke-scroll-content",
                style: t.STYLE_NBODY
            }).appendTo(this.leftBody), this.buttonScrollBottom = t({
                tag: "div",
                className: "nTalk-scroll-bottom",
                style: t.STYLE_NBODY + "height:20px;width:100%;z-index:99;background:url(" + t.imageicon + ") no-repeat 20px -108px;display:block;cursor:pointer;"
            }).appendTo(this.leftElement)
        },
        _bind: function () {
            var i = this;
            this.buttonScrollTop.click(function (t) {
                i._verificationScroll(!0) && i.leftBody.scrollTop(i.leftBody.scrollTop() - 40)
            }).hover(function (e) {
                i._verificationScroll(!0) && t(this).css("background-position", "-79px -92px")
            }, function (i) {
                t(this).css("background-position", "20px -92px")
            }), this.buttonScrollBottom.click(function (t) {
                i._verificationScroll(!1) && i.leftBody.scrollTop(i.leftBody.scrollTop() + 40)
            }).hover(function (e) {
                i._verificationScroll(!1) && t(this).css("background-position", "-79px -108px")
            }, function (i) {
                t(this).css("background-position", "20px -108px")
            })
        },
        _onOverChatTag: function (i) {
            for (var e = this; "LI" !== e.tagName.toUpperCase();) e = e.parentNode;
            t(e).find(".tag-button-close").css({background: "url(" + t.imageicon + ") no-repeat -159px -39px"}), t(e).indexOfClass("talk_flicker") || t(e).css({
                "border-top": "1px solid #ccc",
                "border-bottom": "1px solid #ccc",
                "border-left": "1px solid #ccc",
                left: "1px",
                background: "#fff"
            })
        },
        _onOutChatTag: function () {
            for (var i = this; "LI" !== i.tagName.toUpperCase();) i = i.parentNode;
            t(i).find(".tag-button-close").css({background: "none"}), t(i).indexOfClass("talk_flicker") || t(i).indexOfClass("talk_selected") || t(i).css({
                "border-top": "1px solid #fafafa",
                "border-bottom": "1px solid #fafafa",
                "border-left": "1px solid #fafafa",
                left: "0px",
                background: "#fafafa"
            })
        },
        _onSelectedChatTag: function (i) {
            var e = this;
            t("li", this.leftContent).each(function (i, s) {
                t(s).removeClass("talk_selected"), t(s).indexOfClass("talk_flicker") || e._onOutChatTag.apply(s)
            }), this.stopFlicker(t(i).attr("key")), t(i).addClass("talk_selected").css({
                "border-top": "1px solid #ccc",
                "border-bottom": "1px solid #ccc",
                "border-left": "1px solid #ccc",
                left: "1px",
                background: "#fff"
            })
        },
        _callResize: function (t) {
            var i = t.width, e = t.height;
            this.extended.leftElement && (i -= this.options.leftElementWidth), this.extended.rightElement && (i -= this.options.rightElementWidth), this.options.width = i, this.options.height = e - this.options.dropHeight, this.headBody.css("width", t.width - 2 + "px"), this.body.css("width", this.options.width + (this.extended.leftElement ? this.options.leftElementWidth : 0) + "px"), this.leftElement.css({
                width: this.options.leftElementWidth - 1 + "px",
                height: this.options.height - 1 + "px"
            }), this.leftBody.css("height", this.options.height - 40 + "px"), this.chatContainter.css({
                width: this.options.width + "px",
                height: this.options.height + "px"
            }), this.messageElement = this.chatContainter.find(".chat-view-message"), this.messageElement.css("height", this.options.height - 107 + "px"), this.chatContainter.find(".chat-view-message-table-iframe").css("height", this.options.height - 2 + "px"), this.rightBody.css({height: this.options.height - 1 + "px"});
            var s = this.options.height - 29;
            this.rightElement.find(".view-right-content").css({height: s + "px"}), this.rightElement.find(".window-right-content iframe").attr("height", s).css({height: s + "px"}), this._manageMode.callManageResize(this.options.width, this.options.height)
        },
        _callMaxResize: function () {
            var i = this.options.height < this.defaultOptions.resizeHeight;
            this.chatHeight = this.options.dropHeight + (i ? this.defaultOptions.resizeHeight : this.defaultOptions.height), this._objView.changeAttr(this.chatWidth, this.chatHeight), i ? this._objView.buttonMax.css("background-position", "-20px 0").attr("title", t.lang.chat_button_resize_min) : this._objView.buttonMax.css("background-position", "-40px 0").attr("title", t.lang.chat_button_resize_max), this._callResize({
                width: this.chatWidth,
                height: this.chatHeight
            })
        },
        _callMaximize: function () {
        },
        _callClose: function () {
            this._manageMode.close()
        },
        _callMinimize: function () {
            this._manageMode.callMinimize()
        },
        _onSwitchChat: function (i, e) {
            var s = t(i).attr("key");
            t.Event.fixEvent(e).stopPropagation(), this._onSelectedChatTag(i), this._manageMode.callSwitchChat(s)
        },
        _onCloseChatTag: function (i, e) {
            var s, o = i;
            for (t.Event.fixEvent(e).stopPropagation(); "LI" !== o.tagName.toUpperCase();) o = o.parentNode;
            t(o).removeClass("talk_selected"), s = o.className.replace(/^\s*|\s*$/g, "") || "", this._manageMode.closeChat(s)
        },
        _getChatPosition: function (i) {
            var e, s;
            if (!i || t.isEmptyObject(i)) this.options.left = Math.max(0, t(window).width() - this.options.width), this.options.top = Math.max(0, t(window).height() - this.options.height - this.options.dropHeight); else if (i.rightline && i.width) this.options.left = Math.max(0, (t(window).width() - i.width) / 2 + i.width - this.options.width), this.options.top = Math.max(0, t(window).height() - this.options.height - this.options.dropHeight); else if ((i.id || i.entryid) && t.isDefined(i.left) && t.isDefined(i.left)) s = i.id || i.entryid || "", s = /(^[#\.])|\s+/gi.exec(s) ? s : "#" + s, t(s).length ? (e = t(s).offset(), i.left = i.left || 0, i.top = i.top || 0, this.options.left = Math.min(e.left - this.options.width + i.left, t(window).width() - this.options.width), this.options.top = Math.min(e.top + i.top, t(window).height() - this.options.height - this.options.dropHeight)) : (this.options.left = Math.max(0, t(window).width() - this.options.width), this.options.top = Math.max(0, t(window).height() - this.options.height - this.options.dropHeight)); else {
                switch (i.position) {
                    case"left-top":
                        this.options.left = 0, this.options.top = 0;
                        break;
                    case"center-top":
                        this.options.left = Math.max(0, (t(window).width() - this.options.width) / 2), this.options.top = 0;
                        break;
                    case"right-top":
                        this.options.left = Math.max(0, t(window).width() - this.options.width), this.options.top = 0;
                        break;
                    case"left-center":
                        this.options.left = 0, this.options.top = Math.max(0, (t(window).height() - this.options.height - this.options.dropHeight) / 2);
                        break;
                    case"center-center":
                        this.options.left = Math.max(0, (t(window).width() - this.options.width) / 2), this.options.top = Math.max(0, (t(window).height() - this.options.height - this.options.dropHeight) / 2);
                        break;
                    case"right-center":
                        this.options.left = Math.max(0, t(window).width() - this.options.width), this.options.top = Math.max(0, (t(window).height() - this.options.height - this.options.dropHeight) / 2);
                        break;
                    case"left-bottom":
                        this.options.left = 0, this.options.top = Math.max(0, t(window).height() - this.options.height - this.options.dropHeight);
                        break;
                    case"center-bottom":
                        this.options.left = Math.max(0, (t(window).width() - this.options.width) / 2), this.options.top = Math.max(0, t(window).height() - this.options.height - this.options.dropHeight);
                        break;
                    default:
                        this.options.left = Math.max(0, t(window).width() - this.options.width), this.options.top = Math.max(0, t(window).height() - this.options.height - this.options.dropHeight)
                }
                this.options.left += i.xoff || 0, this.options.top += i.yoff || 0
            }
            this.options.left = Math.min(Math.max(this.options.left, 0), t(window).width() - this.options.width), this.options.top = Math.min(Math.max(this.options.top, 0), t(window).height() - this.options.height - this.options.dropHeight)
        },
        _verificationScroll: function (t) {
            var i = this.leftBody.scrollHeight() - this.leftBody.height();
            return !!(t && i > 0 && self.leftBody.scrollTop() > 0) || !t && i > 0 && i > this.leftBody.scrollTop()
        },
        _addRightLabel: function (i, e, s, o) {
            var a, n, l, r, h = this, d = /^https?:\/\/(.*?)/gi, c = t.randomChar(), p = this.options.height - 28;
            if (this.rightTags || (this.rightTags = t({
                className: "window-right-tags",
                style: t.STYLE_NBODY + "background:#FAF9F9;z-index:-1;overflow:hidden;height:26px;border-top:2px solid #FFF;"
            }).appendTo(this.rightBody), this.rightTags.insert('<div style="' + t.STYLE_NBODY + 'clear:both;"></div>')), this.rightContent || (this.rightContent = t({
                className: "window-right-content",
                style: t.STYLE_NBODY + "overflow:hidden;background:#FAF9F9;position:relative;top:-1px;z-index:1;border-radius:0px 0px 5px 0px;-moz-border-radius:0px 0px 5px 0px;-webkit-border-radius:0px 0px 5px 0px"
            }).appendTo(this.rightBody)), n = t.STYLE_BODY + "background-color:#FAF9F9;height:24px;line-height:24px;text-align:center;cursor:pointer;border-bottom:1px solid #d5d5d5;float:left;", n += 1 == s ? "width:199px;" : 1 == this.rightTags.find("div").length ? "width:" + (2 == s ? 98 : 65) + "px;border-right:1px solid #D5D5D5;" : this.rightTags.find("div").length < s ? "width:" + (2 == s ? 98 : 65) + "px;border-right:1px solid #D5D5D5;" : "width:" + (2 == s ? 99 : 65) + "px;", l = t({
                className: c,
                title: i,
                style: n
            }).appendTo(this.rightTags, this.rightTags.find("div").last()).html(i), r = this.rightContent.insert(['<div class="', c, ' view-right-content" style="', t.STYLE_BODY, "background-color:#FAF9F9;width:100%;height:" + p + 'px;overflow-x:hidden;overflow-y:auto;display:none;border-radius:0px 0px 5px 0px;-moz-border-radius:0px 0px 5px 0px;-webkit-border-radius:0px 0px 5px 0px"></div>'].join("")), t.isArray(e)) {
                a = t({
                    tag: "ul",
                    style: t.STYLE_BODY + "margin:10px 0 10px 25px;list-style:disc;background-color:#FAF9F9;"
                }).appendTo(r).click(function (i) {
                    var e = t.Event.fixEvent(i).target;
                    if ("li" === e.tagName.toLowerCase()) {
                        var s = t(e).attr("talk_title"), o = t(e).attr("talk_content"), a = t(e).attr("talk_id");
                        h._manageMode.showFAQ(h.settingid, s, o, a)
                    }
                });
                for (var g = 0; g < e.length; g++) t({
                    tag: "li",
                    talk_id: e[g].id || "thisisadefaultid",
                    talk_title: e[g].title,
                    talk_content: e[g].con,
                    title: t.clearHtml(e[g].con || ""),
                    style: t.STYLE_BODY + "list-style:disc outside none;margin-top:5px;cursor:pointer;background-color:#FAF9F9;"
                }).appendTo(a).html(t.clearHtml(e[g].title || ""))
            } else d.test(e) ? (e += (e.indexOf("?") == -1 ? "?" : "&") + t.toURI({
                lan: t.extParmas.lan,
                sellerid: this._manageMode.sellerid,
                userid: t.user.id,
                exparams: t.global.exparams || ""
            }), t({
                className: "window-right-iframe",
                tag: "iframe",
                width: "100%",
                frameborder: "0",
                height: p,
                scrolling: "auto",
                style: t.STYLE_NBODY + "width:100%;height:" + p + "px;"
            }).appendTo(r.css("overflow-y", "hidden")).attr("src", e)) : t({
                className: "window-right-text",
                style: t.STYLE_BODY + "margin:5px;word-wrap:break-word"
            }).appendTo(r).html(e);
            return o && this._selectedTag(l), l
        },
        _bindTag: function () {
            var t = this;
            this.rightTags && this.rightTags.find("div[class]").click(function () {
                t._selectedTag(this)
            })
        },
        _selectedTag: function (i) {
            var e = this;
            i.tagName && "span" == i.tagName.toLowerCase() || (i.className && 1 == t.browser.chrome && i.className.toString().indexOf("link_") >= 0 && i.className.toString().indexOf("talk_selected") < 0 && t(".window-right-content").find("." + i.className.trim() + " iframe").attr("src", t(".window-right-content").find("." + i.className.trim() + " iframe").attr("src")), this.rightTags.find("div[class]").each(function (s, o) {
                var a = t.myString(o.className.replace("talk_selected", "")).trim();
                t(i).indexOfClass(a) ? (t(o).addClass("talk_selected").css({
                    height: "25px",
                    "border-bottom": "none",
                    "background-color": "transparent"
                }), e.rightContent.find("." + a).display(1)) : (t(o).removeClass("talk_selected").css({
                    height: "24px",
                    "border-bottom": "1px solid #D5D5D5"
                }), e.rightContent.find("." + a).display())
            }))
        },
        _addRightTag: function (i, e, s, o) {
            o && 0 == this.extended.rightElement && o.mode.toggleExpansion(!0);
            var a = this.options.height - 28, n = this, l = t(".window-right-tags").find("div[class]").length,
                r = this.options.rightElementWidth - 1, h = Math.floor(r / (l + 1)), d = r - h * l,
                c = "link_" + t.randomChar();
            i.indexOf("http://") > -1 || i.indexOf("https://") > -1 || (i = "http://" + i);
            var p = this._repeatRightTag(i);
            if (p) return void n._selectedTag(p);
            if (!(t(".window-right-tags").find("div[class]").length >= 4)) {
                var g = "", f = "";
                1 == s ? (g = '<span class="closelinkpage" style="width:16px;height:25px;float:right;text-align:center;line-height:25px;display:inline-block;border:none;position:absolute;top:0;right:0;">X</span>', f = '<p style="height:25px;float:left;line-height:25px;text-align:center;white-space:nowrap; overflow:hidden; text-overflow:ellipsis;">' + e + "</p>") : f = e;
                var u = '<div class="' + c + ' talk_selected" style="' + t.STYLE_BODY + "position:relative;background-color:#FAF9F9;height:24px;line-height:24px;text-align:center;cursor:pointer;border-bottom:1px solid #d5d5d5;border-right:1px solid #d5d5d5;float:left;width:" + (d - 1) + 'px;">' + f + g + "</div>";
                t(".window-right-tags").find(".talk_selected").removeClass("talk_selected"), t(".window-right-tags").find("div[class]").css("width", h - 1 + "px"), t(".window-right-tags").find("div[class]").eq(l - 1).insert(u, "afterend"), t(".window-right-tags").find("div[class]").find("p").css("width", h - 18 + "px"), t(".window-right-content").insert(['<div class="' + c + ' view-right-content" style="', t.STYLE_BODY, "background-color:#FAF9F9;width:100%;height:" + a + 'px;overflow-x:hidden;overflow-y:hidden;display:none;border-radius:0px 0px 5px 0px;-moz-border-radius:0px 0px 5px 0px;-webkit-border-radius:0px 0px 5px 0px;"><iframe style="width:100%;height:100%;border:none;" src="' + i + '" ></iframe></div>'].join("")), t(".window-right-tags").find("." + c).bind("click", function () {
                    n._selectedTag(this)
                }), this._selectedTag(t("." + c)), t(".window-right-tags").find("." + c).find(".closelinkpage").bind("click", function (i) {
                    var i = t.Event.fixEvent(i);
                    i.preventDefault(), i.stopPropagation(), n._closelinkpage(this)
                })
            }
        },
        _repeatRightTag: function (i) {
            var e = null;
            return t(".window-right-content").find("iframe").each(function (s, o) {
                var a = o.src;
                if (a = a.replace(/^http:\/\//, ""), a = a.replace(/\/$/, ""), i = i.replace(/^http:\/\//, ""), i = i.replace(/\/$/, ""), i == a) for (var n = o.parentElement.className, l = n.split(" "), s = 0; s < l.length; s++) l[s].indexOf("link_") > -1 && (e = t(".window-right-tags ." + l[s])[0])
            }), e
        },
        _closelinkpage: function (i) {
            var e = i.parentElement.className.indexOf("talk_selected") > -1;
            t(i.parentElement).removeClass("talk_selected");
            var s = "." + i.parentElement.className.trim();
            t(i.parentElement).remove(), t(".window-right-content").find(s).remove();
            var o = t(".window-right-tags").find("div[class]").length, a = t(".window-right-tags").width(),
                n = Math.floor(a / o) - 1, l = a - (n + 1) * (o - 1) - 1;
            t(".window-right-tags").find("div[class]").css("width", n + "px"), t(".window-right-tags").find("div[class]").last().css("width", l + "px"), e && t(".window-right-tags").find("div[class]").length > 0 && (this._bindTag(), this._selectedTag(t(".window-right-tags").find("div[class]").last()[0]))
        },
        _clearTag: function () {
            this.rightBody.find("*").remove(), this.rightTags = null, this.rightContent = null
        }
    }, "undefined" == typeof t.ntView && (t.ntView = {chatView: n, minimizeView: l, chatManageView: r})
}(nTalk);
/* @file chat.js
 * @date 2018.03.30 16:51:01
 */
(function ($, undefined) {
    var CON_NULL = /[\r\n]/gi, CON_FLASH_DIV = "nTalk-flash-element", CON_TCHAT_ID = "ntkf-flash-tchat",
        CON_NO_FREE_USER = "no free users", CON_OVER_RECHATNUM = "over rechatnum", CON_NO_USER2 = "no user2";
    var emptyFunc = function () {
    };
    $.extend({default_connect_robot: true});
    $.Capture = {
        udCapCtl: null,
        setupFrame: null,
        version: "1.6.1",
        mimeType: "application/xiaonengcapture-plugin",
        license: "C35F3907AADCC3BB0FEB1DAC6866D806A0DAA7C07A001D97E14ECFBE1D27CC99891F79A7D86AA9CCAFF6B24C1CC1BA89143E5F61849BCC87E12ED104A23B4F980EDCEBE5471FEDE121826153381CC7A3E040D9D5374D13A587BE7B4011FCA44C6E849C8717E483905FB038986FC7F8376E849C8717E483905FB038986FC7F837310A71452C349CA1EB060B439E6535037D30D63B4FEE80AB2C8102DFC48E0C486E849C8717E483905FB038986FC7F8376E849C8717E483905FB038986FC7F8376E849C8717E483905FB038986FC7F837",
        setup: "setup/Xiaonengcapture.msi",
        inited: false,
        loaded: false,
        callback: null,
        supportActiveX: false,
        captureWithMin: true,
        init: function (filetranserver) {
            if (!this.inited || !filetranserver) {
                this.inited = true
            } else return;
            $.Log("filetranserver:" + filetranserver);
            this.id = "setFrame-" + $.randomChar();
            this.name = this.id;
            this.PostUrl = filetranserver + "/imageupload.php?" + $.toURI({
                action: "uploadimage",
                siteid: $.global.siteid,
                roomid: "t2d",
                type: "json",
                charset: $.charset
            });
            this.supportActiveX = window.ActiveXObject !== undefined;
            if (this.supportActiveX && window.navigator.platform == "Win64" || window.navigator.cpuClass == "x64") {
                this.setup = "setup/Xiaonengcapture64.msi"
            }
            this.loaded = false;
            this.udCapCtlSpan = $({
                tag: "div",
                className: "nTalk-hidden-element",
                id: "udCapSpan",
                style: $.STYLE_NBODY + "left:-1000px;top:-1000px;"
            }).appendTo(true);
            this.setupFrame = $({
                tag: "iframe",
                className: "nTalk-hidden-element",
                id: this.id,
                src: "",
                style: "display:none;"
            }).appendTo(true)
        },
        start: function (settingid, autoMinimize, callback) {
            $.Log("nTalk.Capture.start(" + settingid + ", " + autoMinimize + ", callback)");
            var self = this;
            this.settingid = settingid;
            this.callback = callback || emptyFunc;
            var isChrome = navigator.userAgent.match(/Chrome\/([0-9]+)/);
            if (isChrome && isChrome.length >= 2 && isChrome[1] >= 42) {
                alert($.lang.capture_forbidden);
                return
            }
            if ($.Capture.installCheck()) {
                if (this.captureWithMin) {
                    $.chatManage.view.hidden()
                }
                setTimeout(function () {
                    if (self.supportActiveX || self.loaded) {
                        self.doCapture(autoMinimize)
                    }
                }, 300)
            }
        },
        doCapture: function (autoMinimize) {
            if (autoMinimize && this.udCapCtl.StartCapture) {
                this.udCapCtl.StartCapture()
            } else {
                try {
                    this.udCapCtl.Capture()
                } catch (e) {
                    if (this.udCapCtl && this.udCapCtl.StartCapture) {
                        this.udCapCtl.StartCapture()
                    } else {
                        $.chatManage.view.visible();
                        alert($.lang.capture_reload)
                    }
                }
            }
        },
        hasVersion: function (instVer) {
            if (instVer.substring(0, 1) == "v") instVer = instVer.substring(1, instVer.length);
            var newVer = this.version.split(".");
            var curVer = instVer.split(".");
            if (parseInt(newVer[0]) > parseInt(curVer[0])) return true;
            if (parseInt(newVer[0]) == parseInt(curVer[0]) && parseInt(newVer[1]) > parseInt(curVer[1])) return true;
            if (parseInt(newVer[0]) == parseInt(curVer[0]) && parseInt(newVer[1]) == parseInt(curVer[1]) && parseInt(newVer[2]) > parseInt(curVer[2])) return true;
            return false
        },
        addEvent: function (type, handler, funcName) {
            if (this.udCapCtl.attachEvent) {
                this.udCapCtl.attachEvent(type, handler)
            } else {
                var nameFromToStringRegex = /^function\s?([^\s(]*)/;
                var paramsFromToStringRegex = /\(\)|\(.+\)/;
                var functionName = handler.name || handler.toString().match(nameFromToStringRegex)[1] || funcName;
                var params = handler.toString().substring(handler.toString().indexOf("("), handler.toString().indexOf(")") + 1);
                var _handler = document.createElement("script");
                _handler.setAttribute("for", this.udCapCtl.id);
                _handler.event = type + params;
                _handler.appendChild(document.createTextNode(functionName + params + ";"));
                document.body.appendChild(_handler)
            }
        },
        _onBeforeCapture: function () {
            $.Log("Capture._onBeforeCapture", 2);
            return
        },
        _onCaptureCanceled: function () {
            $.Log("Capture._onCaptureCanceled");
            $.chatManage.view.visible();
            return
        },
        _onCaptureCompleted: function (file) {
            $.Log("Capture._onCaptureCompleted(" + file + ")");
            $.chatManage.view.visible();
            return
        },
        _onBeforeUpload: function (file, size) {
            $.Log("Capture._onBeforeUpload(" + file + ", " + size + ")");
            return
        },
        _onUploadCompleted: function (responseText) {
            $.Log('Capture._onUploadCompleted("' + responseText + '")');
            var self = $.Capture, data, timeout = 500;
            try {
                data = $.JSON.parseJSON(responseText)
            } catch (e) {
                responseText = responseText.substring(responseText.indexOf("{"), responseText.indexOf("}") + 1);
                try {
                    data = $.JSON.parseJSON(responseText)
                } catch (e) {
                    return
                }
            }
            if (self.callback.call() === false) {
                timeout = 0
            }
            self._callback("fIM_startSendFile", ["", "uploadimage", data.oldfile]);
            setTimeout(function () {
                self._callback("fIM_receiveUploadSuccess", ["", "uploadimage", data])
            }, timeout);
            return
        },
        _onUploadFailed: function (errorCode) {
            $.Log("Capture._onUploadFailed(" + errorCode + ")", 2);
            return
        },
        _callback: function (methodName, methodParams) {
            methodParams.push(this.settingid);
            if ($.hasOwnProperty(methodName)) {
                $[methodName].apply(this, methodParams)
            } else {
                $.Log("nTalk." + methodName + "(...)", 2);
                return
            }
        },
        installCheck: function () {
            this.loaded = false;
            if (this.udCapCtl) {
                this.loaded = true
            }
            if (this.supportActiveX) {
                $("#udCapSpan").html('<object id="udCaptureCtl" width="0" height="0" classid="CLSID:0FAE7655-7C34-4DEE-9620-CD7ED969B3F2"></object>');
                this.udCapCtl = $("#udCaptureCtl").get(0);
                if (this.udCapCtl.PostUrl !== undefined) {
                    if (this.hasVersion(this.udCapCtl.GetVersion())) {
                        if (confirm($.lang.capture_activex_update)) {
                            this.startSetup()
                        }
                        return false
                    } else {
                        this.udCapCtl.PostUrl = this.PostUrl;
                        this.udCapCtl.License = this.license;
                        this.addEvent("OnBeforeCapture", nTalk.Capture._onBeforeCapture, "nTalk.Capture._onBeforeCapture");
                        this.addEvent("OnCaptureCanceled", nTalk.Capture._onCaptureCanceled, "nTalk.Capture._onCaptureCanceled");
                        this.addEvent("OnCaptureCompleted", nTalk.Capture._onCaptureCompleted, "nTalk.Capture._onCaptureCompleted");
                        this.addEvent("OnBeforeUpload", nTalk.Capture._onBeforeUpload, "nTalk.Capture._onBeforeUpload");
                        this.addEvent("OnUploadCompleted", nTalk.Capture._onUploadCompleted, "nTalk.Capture._onUploadCompleted");
                        this.addEvent("OnUploadFailed", nTalk.Capture._onUploadFailed, "nTalk.Capture._onUploadFailed");
                        this.loaded = true
                    }
                } else {
                    if (confirm($.lang.capture_install)) {
                        $("#udCapSpan").html("");
                        this.udCapCtl = null;
                        this.startSetup()
                    } else {
                        $("#udCapSpan").html("");
                        this.udCapCtl = null
                    }
                    return false
                }
            } else if (navigator.plugins) {
                var plugin = navigator.mimeTypes && navigator.mimeTypes[this.mimeType] ? navigator.mimeTypes[this.mimeType].enabledPlugin : 0;
                if (plugin) {
                    var version = "v1.0.0";
                    var words = plugin.description.split(" ");
                    if (words[words.length - 1].substring(0, 1) == "v") version = words[words.length - 1];
                    if (this.hasVersion(version)) {
                        if (confirm($.lang.capture_other_update)) {
                            this.startSetup()
                        }
                        return false
                    } else {
                        $("#udCapSpan").html('<embed id="udCaptureCtl" width="0" height="0" type="' + this.mimeType + '"></embed>');
                        this.udCapCtl = $("#udCaptureCtl").get(0);
                        this.udCapCtl.PostUrl = this.PostUrl;
                        this.udCapCtl.License = this.license;
                        this.udCapCtl.OnBeforeCapture = "nTalk.Capture._onBeforeCapture";
                        this.udCapCtl.OnCaptureCanceled = "nTalk.Capture._onCaptureCanceled";
                        this.udCapCtl.OnCaptureCompleted = "nTalk.Capture._onCaptureCompleted";
                        this.udCapCtl.OnBeforeUpload = "nTalk.Capture._onBeforeUpload";
                        this.udCapCtl.OnUploadCompleted = "nTalk.Capture._onUploadCompleted";
                        this.udCapCtl.OnUploadFailed = "nTalk.Capture._onUploadFailed";
                        this.loaded = true
                    }
                }
                if (!this.loaded && confirm($.lang.capture_install)) {
                    this.startSetup()
                }
            }
            return this.loaded
        },
        startSetup: function () {
            this.setupFrame.attr("src", $.baseURI + this.setup)
        }
    };
    $.extend({
        CON_SINGLE_SESSION: "SINGLE",
        CON_MULTIPLAYER_SESSION: "MULTIPLAYER",
        imageicon: "",
        imagebg: "",
        imagesingle: "",
        imagemultiplayer: "",
        loadImageAbnormal: function (self, event) {
            if ($(self).attr("data-type") == "ntalk-enterprise-logo") {
                self.src = $.sourceURI + "images/blank.gif"
            } else {
                try {
                    var width = $(self).parent().width();
                    var height = $(self).parent().height();
                    $(self).css({margin: "0px"}).attr({
                        width: width,
                        height: height,
                        src: $(self).attr("data-single") == "1" ? $.imagesingle : $.imagemultiplayer
                    })
                } catch (e) {
                    $.Log("img parent is null", 2)
                }
            }
        },
        imgScrollBottom: function () {
            var imgSettingid = nTalk.global.settingid;
            if (nTalk.chatManage.get(imgSettingid)) {
                nTalk.chatManage.get(imgSettingid).view.scroll.scrollBottom()
            } else {
                setTimeout(function () {
                    nTalk.chatManage.get(imgSettingid) && nTalk.chatManage.get(imgSettingid).view.scroll.scrollBottom()
                }, 500)
            }
        },
        zoom: function (image, maxWidth, maxHeight) {
            var width, height, ret = {width: maxWidth, height: maxHeight};
            if (!image || !image.width) {
                return ret
            }
            width = image.width > maxWidth ? maxWidth : image.width;
            height = width / image.width * image.height;
            if (height > maxHeight) {
                height = maxHeight;
                width = height / image.height * image.width
            }
            return $.extend(ret, {width: width, height: height})
        },
        entityList: {
            "&": "&amp;",
            "<": "&lt;",
            "＜": "&lt;",
            ">": "&gt;",
            "＞": "&gt;",
            "＆": "&amp;",
            "©": "&copy;",
            "®": "&reg;",
            '"': "&quot;",
            "'": "&apos;",
            "＂": "&quot;"
        },
        charFilter: function (param) {
            var self = this, rp, k, replace = function (str) {
                for (var k in $.entityList) {
                    if (typeof $.entityList[k] == "function") continue;
                    str = str.replace(new RegExp("" + k + "", "g"), $.entityList[k])
                }
                return str
            };
            if ($.isArray(param)) {
                rp = [];
                for (k = 0; k < param.length; k++) {
                    if (typeof param[k] == "object") {
                        rp[k] = $.charFilter(param[k])
                    } else if (typeof param[k] == "string") {
                        rp[k] = replace(param[k])
                    } else {
                        rp[k] = param[k]
                    }
                }
            } else if (typeof param == "object") {
                rp = {};
                for (k in param) {
                    if (typeof param[k] == "function") {
                        continue
                    } else if (typeof param[k] == "object") {
                        rp[k] = $.charFilter(param[k])
                    } else if (typeof param[k] == "string") {
                        rp[k] = replace(param[k])
                    } else {
                        rp[k] = param[k]
                    }
                }
            } else {
                rp = replace(param)
            }
            return rp
        }
    });
    $.chatConnect = $.Class.create();
    $.chatConnect.prototype = {
        name: "chatConnect",
        debug: false,
        options: null,
        switchTimeId: null,
        error: false,
        initialize: function (options, close_tchat_flash) {
            if (this.debug) $.Log("create chatConnect()", 1);
            this.options = $.extend({
                devicetype: $.browser.mobile ? 3 : 0,
                chattype: "0",
                chatvalue: "0"
            }, $.whereGet(options, ["requestRobot", "siteid", "settingid", "tchatmqttserver", "tchatgoserver", "surl", "cid", "u", "n", "sid", "groupid", "rurl", "statictis", "htmlsid", "connectid", "userlevel", "disconnecttime", "mini", "chattype", "chatvalue", "edu_invisitid", "edu_visitid", "usertag", "userrank"], ["requestRobot", "siteid", "settingid", "tchatmqttserver", "tchatgoserver", "serverurl", "machineID", "userid", "username", "sessionid", "destid", "resourceurl", "statictis", "htmlsid", "connectid", "userlevel", "disconnecttime", "mini", "chattype", "chatvalue", "edu_invisitid", "edu_visitid", "usertag", "userrank"]));
            if (this.options.requestRobot && $.Robot) {
                $.global.connect = "robot";
                this._createRobotConnect()
            } else if (($.browser.supportMqtt || $.flash.support) && this.options.tchatmqttserver && $.server.tchatConnectType == 1) {
                $.Log("mqtt connect.");
                $.global.connect = "mqtt";
                this._createMqttConnect()
            } else {
                $.Log("commet connect.");
                $.global.connect = "comet";
                this.startCometConnect()
            }
        },
        startCometConnect: function () {
            var self = this;
            $.require({TChat: "comet.chat.js" + $.baseExt}, function (tchat) {
                if (!tchat) {
                    $.Log("Loaded $comet.chat mode failed", 3);
                    return
                }
                $.Log("Loaded $comet.chat mode complete", 3);
                self._createCometConnect()
            })
        },
        sendMessage: function (data) {
            var content = $.JSON.toJSONString(data);
            if (this.debug) {
                $.Log("chatConnect.sendMessage(" + content + ")")
            }
            if (this.connect && $.isFunction(this.connect.sendMessage)) {
                this.connect.sendMessage(content)
            } else {
                $.Log("connect.sendMessage is undefined", 3)
            }
        },
        predictMessage: function (message) {
            if (this.debug) {
                $.Log("chatConnect.predictMessage(" + message + ")")
            }
            if (this.connect && $.isFunction(this.connect.predictMessage)) {
                this.connect.predictMessage(message)
            }
        },
        setTextStyle: function (data) {
            if (this.debug) {
                $.Log("chatConnect.setTextStyle(" + $.JSON.toJSONString(data) + ")")
            }
            if (this.connect && $.isFunction(this.connect.setTextStyle)) {
                this.connect.setTextStyle(data)
            }
        },
        disconnect: function () {
            if (this.debug) {
                $.Log("chatConnect.disconnect()")
            }
            if (this.connect && $.isFunction(this.connect.closeTChat)) {
                try {
                    this.connect.closeTChat()
                } catch (e) {
                }
                if ($.global.connect == $.CON_CONNECT_FLASH) {
                    $.flash.remove(this.connect)
                }
                this.connect = null
            }
        },
        closeTChat: function () {
            if (this.debug) {
                $.Log("chatConnect.closeTChat()")
            }
            this.disconnect()
        },
        switchConnect: function () {
            this.stopSwitchConnect();
            $.Log("connect tchat abnormalities[" + $.global.connect + "], switch the connection type.", 2);
            if (!this.options.requestRobot && $.global.connect != "comet") {
                if (this.connect && $.isFunction(this.connect.remove)) {
                    this.connect.remove()
                }
                if (this.connect && $.isFunction(this.connect.disconnect)) {
                    this.connect.disconnect()
                }
                $.global.connect = $.CON_CONNECT_COMET;
                this.startCometConnect()
            } else {
                this.error = true;
                $.Log("switch connect tchat type failure", 3)
            }
        },
        stopSwitchConnect: function () {
            if (this.debug) {
                $.Log("chatConnect.stopSwitchConnect")
            }
            clearTimeout(this.switchTimeId);
            this.switchTimeId = null
        },
        _createCometConnect: function () {
            $.Log("chatConnect._createCometConnect()", 1);
            this.connect = new $.TChat(this.options, $.server)
        },
        _createRobotConnect: function () {
            $.Log("chatConnect._createRobotConnect()", 1);
            if (!$.Robot) {
                return false
            }
            this.connect = new $.Robot(this.options)
        },
        _createMqttConnect: function () {
            if (!$.Connection) {
                $.Log("load tchat connect object fail.", 3);
                return false
            }
            this.connect = new $.Connection.TChat(this.options)
        }
    };
    $.chatMode = $.Class.create();
    $.chatMode.prototype = {
        name: "chatMode",
        debug: false,
        view: null,
        options: null,
        manageMode: null,
        hash: new $.HASH,
        hashCache: new $.HASH,
        htmlsid: 0,
        connectId: "",
        siteid: "",
        settingid: "",
        config: null,
        connected: false,
        defData: null,
        _sendNum: 0,
        _changeCsrNum: 0,
        _changeCsrMaxNum: 5,
        _reconnectCount: 0,
        _startQueue: false,
        _queueNum: 1,
        statusConnectT2D: "WAIT",
        statusConnectTChat: "WAIT",
        _submitRating: false,
        _Evaluable: false,
        _Enableevaluation: false,
        _currentView: "",
        inputMaxByte: 0,
        selected: false,
        floatTimeID: null,
        dest: null,
        hashDest: new $.HASH,
        sessionid: "",
        user: null,
        _moreData: null,
        unread: 0,
        userNumber: 0,
        userList: [],
        sessionType: null,
        enterData: null,
        captureing: false,
        waitTimeID: null,
        cacheTimeID: null,
        server: [],
        receiveMsgCount: 0,
        requestRobot: false,
        enterUserId: null,
        startCSSwitch: "",
        CON_GENERAL: 1,
        CON_ADPTER: 1e4,
        CON_INVITE: 10001,
        CON_VIEW_LOADING: "loading",
        CON_VIEW_ERROR: "error",
        CON_VIEW_WINDOW: "window",
        CON_VIEW_MESSAGE: "message",
        CON_OFFLINE: 0,
        CON_ONLINE: 1,
        CON_INVISIBLE: 2,
        CON_BUSY: 3,
        CON_AWAY: 4,
        CON_LOGIN_FAILURE: 0,
        CON_LOGIN_SUCCESS: 1,
        CON_CONNECT_FAILURE: 2,
        CON_CONNECT_SUCCESS: 3,
        CON_DISCONNECT: 4,
        CON_CLOSE_CONNECT: 5,
        CON_MOBILE_SHOW_GOODSINFO: 0,
        CON_ROBOT_ID: "_ISME9754_T2D_webbot",
        CON_ROBOT_ERROR_MESSAGE: "ROBOT_ERROR_MESSAGE",
        CON_ROBOT_NO_ANSWER: "非常对不起哦，这个问题在我知识范围外，我会努力去学习的！",
        robotID: "",
        robotSessionID: "",
        lastSessionID: "",
        t2dMode: null,
        uploadingid: {},
        evalRequestType: "POST",
        evalFailCount: 0,
        robotSystemMessage: {message: "留言", fq: "FQ,放弃排队", ch: "CH,查看排队情况"},
        initialize: function (options, manageMode) {
            this.defData = {type: 1, userid: "", name: "", logo: "", msg: ""};
            this.sessionid = "";
            this.dest = {id: "", name: ""};
            this._moreData = [];
            this.user = {id: $.user.id};
            this.hash.clear();
            this.options = $.extend({}, options);
            this.manageMode = manageMode;
            this.siteid = this.options.siteid;
            this.sellerid = this.options.sellerid;
            this.settingid = this.options.settingid;
            this.edu_invisitid = this.options.edu_invisitid;
            this.edu_visitid = this.options.edu_visitid;
            this.itemid = this.options.itemid;
            this.htmlsid = this.options.htmlsid;
            this.connectId = this.options.connectid;
            this.selected = true;
            this.unread = 0;
            this._submitRating = false;
            this._Evaluable = false;
            this._currentView = this.CON_VIEW_LOADING;
            this.robotID = this.siteid + this.CON_ROBOT_ID;
            this._callbackGoodsinfo = "scriptCallReceiveGoodsinfo_" + this.settingid;
            window[this._callbackGoodsinfo] = null;
            this.waitTimeID = [];
            this.cacheTimeID = [];
            var self = this;
            var chatView = $.ntView ? $.ntView.chatView : $.chatView;
            this.view = new chatView({
                siteid: this.siteid,
                settingid: this.settingid,
                width: this.manageMode.view.options.width,
                height: this.manageMode.view.options.height,
                chatHeader: this.manageMode.view.header,
                chatContainter: this.manageMode.view.chatContainter,
                toggleExpansion: function (settingid) {
                    self.toggleExpansion(settingid)
                }
            }, this);
            var eduWapAutoView = $.ntView ? $.ntView.eduWapAutoView : $.eduWapAutoView;
            if ($.isAutoEdu && $.browser.mobile) {
                this.eduWapAutoView = new eduWapAutoView(this.settingid)
            }
            this.setDest();
            this.inputMaxByte = 600;
            this.initConfig();
            if (!$.browser.mobile) {
                $.Capture.init(this.server.filetranserver)
            }
            this.view.disableButton(["history", "evaluate", "capture"], true);
            this.view.createFileButton(this.server);
            this.callStat("24")
        },
        toggleExpansion: function (settingid) {
            return this.manageMode.callToggleExpansion(settingid)
        },
        getExpansionStatus: function () {
            return this.manageMode.view.extended.rightElement
        },
        loadLink: function (url, selector) {
            var self = this, callbackname, queryString,
                serverurl = $.isDefined(this.server.queryurl) && this.server.queryurl ? this.server.queryurl : "";
            if (!serverurl || !url || !/^\d+\.\d+\.\d+\.\d+$/gi.test($.domain) && url.indexOf($.domain) <= -1 && $.global.pageinchat) {
                return
            }
            $.Log("nTalk.chatMode.loadLink(" + url + ")");
            callbackname = "callback_" + $.randomChar();
            queryString = $.toURI({
                query: "getwebinfo",
                weburl: url,
                ctype: 1,
                siteid: this.siteid,
                batch: 0,
                callbackname: callbackname
            });
            window[callbackname] = function (data) {
                $.Log("nTalk.chatMode.loadLink() callback: " + $.JSON.toJSONString(data), 1);
                data.customer = "";
                if (self.view.viewLinkContainer && data.title) {
                    if (data.customs && data.customs.length > 0) {
                        for (var i = 0; i < data.customs.length; i++) {
                            if (data.customs[i] && data.customs[i].name && data.customs[i].content) {
                                data.customer += data.customs[i].name + data.customs[i].content + "<br/>"
                            }
                        }
                    }
                    self.view.viewLinkContainer(data, selector)
                }
            };
            $.require(serverurl + "?" + queryString + "#rnd")
        },
        callTrack: function (nodeid, nodeparam) {
            var query = {
                siteid: this.siteid,
                userid: $.user.id,
                sid: this.getHtmlSid(),
                nodeid: nodeid,
                nodeparam: nodeparam
            };
            if (!this.server.trackserver) {
                $.Log("nTalk.chatMode.callTrack(" + nodeid + "): trackserver error", 1);
                return
            }
            $.require(this.server.trackserver + "/track.php?" + $.toURI(query) + "#rnd#image", function (script) {
                if (script.error === true) {
                    $.Log("call trackServer error: " + nodeid, 3)
                }
                $(script.error ? script.target : script).remove()
            });
            return true
        },
        callStat: function (action) {
            var disableAll = new RegExp("^(1|2|4|5|6|7|8|18|19|20|21)", "gi");
            var disableSection = new RegExp("^(0|5|14|15|16|17|10|11|12|13|22|23|24)$", "gi");
            var query = {
                type: "chatjs",
                siteid: this.siteid,
                kfid: this.dest.id || "",
                guestid: $.user.id,
                action: action,
                htmlsid: this.getHtmlSid(),
                chatsession: this.sessionid || "",
                settingid: this.settingid,
                userrank: this.options.userrank,
                usertag: this.options.usertag
            };
            if (!$.global.statictis && disableAll.test(action)) {
                return false
            } else if ($.global.statictis === 2 && !disableSection.test(action)) {
                return false
            }
            if (this.debug) $.Log(this.settingid + ":chat.callStat(" + action + ")");
            var serverurl;
            if (this.siteid === "kf_9740") {
                query = $.extend(query, {c: "addmessage", m: "collection"});
                serverurl = "http://bkpi-sunlands.ntalker.com/index.php?"
            } else {
                query = $.extend(query, {m: "Count", a: "collection"});
                serverurl = this.server.mcenter + "statistic.php?"
            }
            $.require(serverurl + $.toURI(query) + "#rnd", function (script) {
                if (script.error === true) {
                    $.Log("call statictis error: " + action, 3)
                }
                $(script.error ? script.target : script).remove()
            });
            return true
        },
        close: function () {
            this.statusConnectTChat = "CLOSECHAT";
            this.disconnect();
            if ($.xpush && ($.browser.oldmsie || !$.browser.supportMqtt)) {
                $.xpush.startXpush()
            }
            this.userList = [];
            this.sessionid = "";
            this.view.close();
            this.callStat("23");
            if (this.server.isnoim == 2 && $.cache.get("opd") == "1" && $.base) {
                $.base.startIM()
            }
        },
        start: function (data) {
            var chat, idType;
            if (!this.config || $.isEmptyObject(this.config)) {
                $.Log("chatMode.start():config is null", 3);
                return
            }
            $.Log(this.settingid + ":chatMode.start()");
            if ($.isFunction(this.manageMode.callVerification)) {
                if (chat = this.manageMode.callVerification(this.settingid, this.config)) {
                    chat.showMessage("system0", {
                        type: 9,
                        msg: $.utils.handleLinks($.lang.system_merge_session, {destname: chat.dest.name})
                    });
                    chat.send(data);
                    $.chatManage.switchChatTag(chat.settingid);
                    $.Log("Only one customer to open a chat window", 2);
                    return
                }
            }
            this.dest.kfid = this.getDest(true);
            idType = $.base.checkID(this.options.destid);
            if (idType === false || idType != $.CON_CUSTOMER_ID && idType != $.CON_GROUP_ID) {
                this.options.destid = this.getDest(true)
            }
            if (!this.options.single) {
                if ($.base.checkID(this.options.destid) == $.CON_GROUP_ID) {
                    this.options.single = 0
                } else {
                    this.options.single = 1
                }
            }
            this.callStat("8");
            this.getCustomerServiceInfo(this.options.destid, this.options.single)
        },
        reconnect: function (element, destid, single, edu_invisitid, edu_visitid) {
            if (element) {
                while (element && element.tagName.toUpperCase() != "LI" && element.parentNode) {
                    element = element.parentNode
                }
                $(element).remove()
            }
            if (/QUERY|QUEUE/i.test(this.statusConnectT2D)) {
                $.Log("reconnect:" + this.statusConnectT2D);
                return
            }
            if (/QUEUE|READY|COMPLETE/i.test(this.statusConnectTChat)) {
                $.Log("reconnect:" + this.statusConnectTChat);
                return
            }
            if (destid) {
                this.options.destid = destid || "";
                this.options.single = single || "0";
                this.options.edu_invisitid = edu_invisitid || "";
                this.options.edu_visitid = edu_visitid || ""
            }
            if (this._currentView !== this.CON_VIEW_WINDOW) {
                this.switchUI(this.CON_VIEW_WINDOW)
            }
            this.start()
        },
        createConnect: function () {
            var self = this, flashvars;
            var sid = this.t2dMode === 1 ? this.lastSessionID : this.sessionid;
            $.Log("connect tchat sessioId>>" + this.sessionid, 1);
            flashvars = {
                tchatgoserver: this.server.tchatgoserver,
                tchatmqttserver: this.server.tchatmqttserver,
                siteid: this.siteid,
                settingid: this.settingid,
                surl: this.server.flashserver,
                rurl: $.baseURI,
                u: $.user.id,
                n: $.user.name,
                groupid: this.dest.id,
                destname: this.dest.name,
                sid: sid,
                cid: $.global.pcid,
                htmlsid: this.getHtmlSid(),
                connectid: this.connectId,
                statictis: $.global.statictis,
                userlevel: $.global.isvip || "0",
                disconnecttime: this.config.contime || 180,
                mini: 0,
                chattype: $.global.chattype || "1",
                chatvalue: $.global.chattype == 3 ? $.global.inviteid : $.global.chatvalue || "0",
                loadnid: $.CON_LOAD_MODE_NID,
                requestRobot: this.requestRobot,
                edu_invisitid: $.chatManage.get(this.settingid).options.edu_invisitid,
                edu_visitid: $.chatManage.get(this.settingid).options.edu_visitid,
                userrank: this.options.userrank,
                usertag: this.options.usertag
            };
            this.callTrack("10-01-01", "start connect");
            if (this.connect) {
                this.statusConnectTChat = "WAIT";
                this.statusConnectT2D = "WAIT";
                this.disconnect()
            }
            this.connect = new $.chatConnect(flashvars, this.server.close_tchat_flash || "0");
            if (this.requestRobot) setTimeout(function () {
                if (self.connect.error) {
                    clearTimeout(this._connectTimeout);
                    self.switchUI(self.CON_VIEW_MESSAGE, "TIMEOUT")
                }
            }, 6e3);
            this._connectTimeout = setTimeout(function () {
                self.callTrack("10-01-03", "connect time out");
                if (self.debug) $.Log("connect timeout 60s");
                self.switchUI(self.CON_VIEW_MESSAGE, "TIMEOUT")
            }, 6e4)
        },
        getHtmlSid: function () {
            if (this.htmlsid) {
                this.htmlsid = $.getTime() - this.htmlsid.substring(0, this.htmlsid.length - 3) > 4 * 60 * 60 * 1e3 ? $.getTime(2) : this.htmlsid;
                return this.htmlsid
            } else {
                return ""
            }
        },
        disconnect: function () {
            var self = this;
            if (this.statusConnectTChat == "CLOSECHAT") {
                this.showMessage("system", {
                    type: 9,
                    msg: $.utils.handleLinks($.lang.system_end_session, {settingid: this.settingid})
                });
                $.base.fire("SessionEnd", [{type: 1, settingid: this.settingid || "", sessionid: this.sessionid || ""}])
            } else if (this.statusConnectTChat == "COMPLETE") {
                if (this.config.enable_auto_disconnect !== 0) {
                    this.showMessage("system", {
                        type: 9,
                        msg: $.utils.handleLinks($.lang.system_auto_disconnect, {settingid: this.settingid})
                    })
                }
                $.base.fire("SessionEnd", [{type: 2, settingid: this.settingid || "", sessionid: this.sessionid || ""}])
            } else if (this.statusConnectTchat == "WAIT") {
                this._clearChangeCsrNum()
            }
            this._stopConnectTimeout();
            this.view.disableButton(["evaluate", "capture"], true);
            this.manageMode.view.updateViewStatus(true);
            $.Log(self.settingid + ":chatMode.disconnect()", 1);
            this.connected = false;
            this.statusConnectTChat = "DISCONNECT";
            this.setDest({status: 0});
            if (this.chatFlashGoUrl) {
                $.require(this.chatFlashGoUrl + "#rnd", function (script) {
                    self.chatFlashGoUrl = "";
                    $(script.error ? script.target : script).remove()
                })
            }
            if (this._queueTimeID) {
                clearTimeout(this._queueTimeID);
                this._queueTimeID = null
            }
            $.each(this.waitTimeID, function (i, timeId) {
                clearTimeout(timeId)
            });
            this.waitTimeID = [];
            $.each(this.cacheTimeID, function (i, timeId) {
                clearTimeout(timeId)
            });
            this.cacheTimeID = [];
            if (this.connect) {
                this.connect.disconnect()
            }
        },
        endSession: function () {
            var self = this;
            if (this.manageMode.hash.count() > 1) {
                $.Log("...............close", 2);
                if (this.config && this.config.enableevaluation == 1 && !this._submitRating && this._Evaluable && this._currentView == this.CON_VIEW_WINDOW) {
                    if (this.showEvaluation(0, function () {
                        self.manageMode.closeChat(self.settingid)
                    }) === false) {
                        try {
                            self.manageMode.closeChat(self.settingid)
                        } catch (e) {
                            $.Log(e, 3)
                        }
                    }
                } else {
                    this.manageMode.closeChat(this.settingid)
                }
            } else {
                this.manageMode.close()
            }
        },
        switchUI: function (type, tempTYPE) {
            var self = this;
            this.view.switchUI(type);
            this._currentView = type;
            $.Log(this.settingid + ":chatMode.switchUI(" + type + ", " + tempTYPE + ")");
            if (type === this.CON_VIEW_MESSAGE) {
                this.callTrack("10-01-08");
                if (this.manageMode.view && $.isFunction(this.manageMode.view.updateViewStatus)) {
                    this.manageMode.view.updateViewStatus(true)
                }
                this.disconnect();
                this.callStat("22");
                this.createMessageForm()
            }
        },
        createMessageForm: function () {
            var self = this, announcement, data;
            if (!this.config.form_message || typeof this.config.form_message == "string" || !this.config.form_message.length) {
                this.config.form_message = this.config.message_form
            }
            if (!this.config.form_message || typeof this.config.form_message == "string" || !this.config.form_message.length || this.config.preferlan) {
                this.config.form_message = $.lang.default_message_form_fields || ""
            }
            this.dest = this.getDest(false);
            this.setDest({status: 0});
            data = {myuid: $.user.id, destid: this.dest.id, sid: this.sessionid || "", source: "", content: ""};
            this.hashCache.each(function (k, body) {
                if (body.type == 1) {
                    data.content += body.msg + "\n"
                } else if (/^(2|4)$/.test(body.type)) {
                    data.fileError = true
                }
            });
            this.hashCache.clear();
            this.view.createMessageForm(this.config.form_message, this.config.disable_message, this.config.form_announcement || this.config.announcement || "", data)
        },
        submitMessageForm: function () {
            var serverurl;
            var query = {t: "leaveMsg", siteid: this.siteid, sellerid: this.sellerid, settingid: this.settingid};
            if (this.siteid === "kf_9740") {
                query = $.extend(query, {c: "addmessage", m: "queryService"});
                serverurl = "http://bkpi-sunlands.ntalker.com/index.php?"
            } else {
                query = $.extend(query, {m: "Index", a: "queryService"});
                serverurl = this.server.mcenter + "queryservice.php?"
            }
            if ($.global.message == 1) {
                query = $.extend(query, {opId: $.global.opId})
            }
            var mailinput = $(".chat-view-message-form input[name=msg_email]");
            var mailValue = mailinput.val().replace(/(^\s*)|(\s*$)/g, "");
            mailinput.val(mailValue);
            this.view.submitMessageForm(this.config.form_message, serverurl + $.toURI(query) + "#rnd")
        },
        _stopConnectTimeout: function () {
            clearTimeout(this._connectTimeout);
            this._connectTimeout = null
        },
        cancelUpload: function (action) {
            var objName = action == "uploadfile" ? "objFile" : "objImage";
            $.Log(this.settingid + ":chatMode.cancelUpload()");
            if (this.view[objName].cancelUpload) {
                this.view[objName].cancelUpload()
            }
            this.view.updateMessage(this.uploadmsgid, "uploadfile" == action ? 4 : 2, -1)
        },
        _uploadReady: function (action) {
            var objName = action == "uploadfile" ? "objFile" : "objImage";
            $.Log(this.settingid + ":chatMode._uploadReady(" + objName + ")", 1);
            if ($.isFunction(this.view[objName].setUploadServer)) {
                this.view[objName].setUploadServer(this.server.filetranserver)
            }
        },
        startUpload: function (action, content) {
            var fileName = $.hexToDec(content || "").replace(/.*?(\u201c|\\u201c)/gi, "").replace(/(\u201d|\\u201d).*?$/gi, "");
            this.uploadmsgid = this.showMessage("right", {
                type: "uploadfile" == action ? 4 : 2,
                status: "UPLOADING",
                oldfile: $.browser.mobile ? "" : fileName
            })
        },
        startCompress: function (action) {
            this.uploadmsgid = this.showMessage("right", {type: "uploadfile" == action ? 4 : 2, status: "COMPRESS"})
        },
        uploadSuccess: function (action, data) {
            data = $.isObject(data) ? data : $.JSON.parseJSON(data);
            data = $.protocolFilter(data);
            this.view.updateMessage(this.uploadmsgid, "uploadfile" == action ? 4 : 2, data);
            $.Log(this.settingid + ": $.chatMode.uploadSuccess()", 1);
            this.send($.extend(data, {msg: data}));
            this.uploadmsgid = ""
        },
        uploadFailure: function (action, message) {
            if (!this.uploadmsgid) {
                var fileMessage = "";
                this.uploadmsgid = this.showMessage("right", {
                    type: "uploadfile" == action ? 4 : 2,
                    oldfile: $.browser.mobile ? "" : fileMessage,
                    name: message.name,
                    size: message.size
                })
            }
            this.view.updateMessage(this.uploadmsgid, "uploadfile" == action ? 4 : 2, -2, message);
            this.uploadmsgid = ""
        },
        uploadProgress: function (action, intProgress) {
            this.view.updateMessage(this.uploadmsgid, "uploadfile" == action ? 4 : 2, intProgress)
        },
        showEvaluation: function (passive, callback) {
            if (passive == 2 && this.view.evalDialog) {
                return false
            }
            if (this.statusConnectTChat == "WAIT" && passive != 2) {
                return false
            }
            if (this._submitRating === true && passive != 2) {
                return false
            }
            if (this.config.evaluateVersion == 2) {
                try {
                    var evaluateData = $.JSON.parseJSON(this.config.newevaluate);
                    this.showEvaluationVersion2(evaluateData, callback);
                    return true
                } catch (e) {
                    $.Log("This newevaluate JSON is wrong, change evaluate to version 1.0");
                    this.config.evaluateVersion = 1
                }
            }
            this.manageMode.callReceive(this.settingid);
            var self = this, formElement;
            if (!this.config.form_evaluation || typeof this.config.form_evaluation == "string" || !this.config.form_evaluation.length) {
                this.config.form_evaluation = this.config.evaluation_form
            }
            if (!this.config.form_evaluation || typeof this.config.form_evaluation == "string" || !this.config.form_evaluation.length || this.config.preferlan) {
                this.config.form_evaluation = $.lang.default_evaluation_form_fields || []
            }
            if (!this.config.evaluation_form_title) {
                this.config.evaluation_form_title = $.lang.default_evaluation_form_title || ""
            }
            for (var i = 0; i < this.config.form_evaluation.length; i++) {
                this.config.form_evaluation[i] = $.extend(this.config.form_evaluation[i], {
                    titlewidth: /zh_cn|en_us/gi.test($.lang.language) ? "5px" : "10px",
                    inputwidth: "auto",
                    optionLine: true,
                    messageid: "alert-form-" + this.config.form_evaluation[i].name
                });
                if (this.config.form_evaluation[i].type == "textarea") {
                    this.config.form_evaluation[i] = $.extend(this.config.form_evaluation[i], {
                        input: {
                            width: "95%",
                            height: "70px"
                        }
                    })
                }
            }
            this.evaluationElement = this.view.createEvaluation(this.config.form_evaluation, this.config.evaluation_form_title, this.config.startColor, this.config.endColor, callback);
            return true
        },
        showEvaluationVersion2: function (data, callback) {
            var self = this;
            $.require({evaluateTree: self.config.evaluateFile + $.baseExt}, function () {
                if (!$.evaluateTree) {
                    $.evaluateTree = new $.EvaluateTree(data)
                }
                if (self.config.enable_labelCounts) {
                    $.evaluateTree.clearAnswerCount();
                    var nodes = $.evaluateTree.levelNodes[3];
                    var labids = "";
                    for (nodeIndex in nodes) {
                        labids += nodes[nodeIndex].substring(1) + ","
                    }
                    labeids = labids.substring(0, labids.lastIndexOf(","));
                    var callbackName = "labelCounts";
                    window[callbackName] = function (result) {
                        try {
                            var labelCounts = typeof result == "string" ? $.JSON.parseJSON(result) : result;
                            for (eid in labelCounts) {
                                $.evaluateTree.getNode("a" + eid).count = labelCounts[eid]
                            }
                        } catch (e) {
                            $.Log("labelCounts.callback:" + e.message, 3)
                        }
                    };
                    data = {kfid: self.dest.id, labids: labeids, callback: callbackName};
                    $.require($.server.settingserver + "/index.php/api/setting/returnLabids?" + $.toURI(data) + "#rnd", function () {
                        self.evaluationElement = self.view.createEvaluationVersion2($.evaluateTree, callback)
                    })
                } else {
                    self.evaluationElement = self.view.createEvaluationVersion2($.evaluateTree, callback)
                }
            })
        },
        getNewMessageConfig: function () {
            if (!this.config.new_leave_message) {
                this.config.new_leave_message = {}
            }
            this.config.new_leave_message.disable_message = this.config.disable_message;
            return this.config.new_leave_message
        },
        submitEvaluationForm: function (callback, failCallback) {
            var self = this;
            if (this.config.evaluateVersion == 2) {
                var data = $.EvaluateVerificate.getEvaluateSubmitData();
                if ($.isArray(data)) {
                    self.postEvaluate(data);
                    if (callback) {
                        setTimeout(function () {
                            callback.call(self)
                        }, 500)
                    }
                } else {
                    failCallback.call(self, data)
                }
                return
            }
            $.FORM.verificationForm(this.config.form_evaluation, function (data) {
                self.postEvaluate(data);
                if (callback) {
                    setTimeout(function () {
                        callback.call(self)
                    }, 500)
                }
            }, this.evaluationElement, failCallback)
        },
        postEvaluate: function (evaluateData) {
            try {
                if (evaluateData[2]) {
                    evaluateData[2].value = nTalk.filterXSS(evaluateData[2].value)
                }
            } catch (e) {
            }
            var self = this;
            this.evaluationHidden = true;
            evaluateData = this._formatEvaluationData(evaluateData);
            if (!this.chatgourl) {
                $.Log("chatMode.postEvaluate():chatgourl:" + this.chatgourl, 3);
                this.chatgourl = this.mdyServerAddr(this.server.tchatgoserver)
            }
            this.manageMode.addHistoryPageCount();
            var sucFunc = function () {
                $.Log("evaluate submit complete.", 1);
                if ($.browser.mobile) {
                    evMsg = $.lang.system_mobile_evaluation
                } else {
                    evMsg = $.utils.handleLinks($.lang.system_evaluation, {evaluation: $.enCut(evaluateData.info, 120)})
                }
                self.showMessage("info", {type: 9, msg: evMsg})
            };
            var failFunc = function () {
                self.evalFailCount++;
                if (self.evalFailCount < 3) {
                    evalRequest();
                    return
                }
                self.evalFailCount = 0;
                $.Log("evaluate submit complete.", 1);
                self.showMessage("info", {type: 9, msg: "评价失败"})
            };
            var funArr = [function (data) {
                if (self.evalRequestType === "AJAX" && data && data.status || self.evalRequestType === "POST") {
                    sucFunc();
                    self.evalFailCount = 0
                } else {
                    $.Log(data.errormsg);
                    failFunc()
                }
            }, function () {
                $.Log("evaluate submit error.", 1);
                failFunc()
            }];
            var baseData = {
                action: "onremark",
                myuid: this.user.id,
                clientid: this.clientid,
                sessionid: this.sessionid,
                rnd: $.getTime(1)
            };
            var options = {
                url: $.server.tstatus,
                dataType: "json",
                crossDomain: true,
                data: $.extend({}, baseData, evaluateData.data, {type: 0}),
                success: function (data) {
                    funcArr[0](data)
                },
                error: function (msg) {
                    $.Log(msg);
                    self.evalRequestType = "POST";
                    evalRequest()
                }
            };
            var evalRequest = function () {
                if (self.evalRequestType === "AJAX") {
                    $.doAjaxRequest(options)
                } else {
                    new $.POST(self.chatgourl + "?" + $.toURI(baseData), evaluateData.data, funArr)
                }
            };
            evalRequest()
        },
        download: function () {
            $.Log("download recording file");
            if (this.statusConnectTChat == "WAIT") {
                return
            }
            var query = $.toURI({
                m: "Msg",
                a: "downloadMsg",
                uid: this.user.id,
                sid: this.sessionid,
                lang: $.language,
                tzo: (new Date).getTimezoneOffset() / 60,
                ts: $.getTime()
            });
            var url = this.server.mcenter + "historymessage.php?" + query;
            if (typeof window.openURLToBrowser == "function") {
                window.openURLToBrowser(url)
            } else {
                this.view.displayiFrame.attr("src", url)
            }
        },
        viewHistory: function (settingid, iFrame) {
            var address = $.global.siteid === "gy_1000" ? "http://bkpirb.ntalker.com/index.php/messageweb/webAppIndex?" : this.server.mcenter;
            var url = address + "index.php/messageweb/webAppIndex?" + $.toURI({
                userid: this.user.id,
                lang: $.language,
                tzo: (new Date).getTimezoneOffset() / 60,
                ts: $.getTime()
            });
            $.Log("view chats,iFrame:" + iFrame + ", url:" + url, 2);
            $(iFrame).attr("src", url)
        },
        startCapture: function () {
            var self = this;
            if (!this.connected || this.captureing === true) {
                return
            }
            this.captureing = true;
            $.Log(this.settingid + ":chatMode.startCapture()");
            $.Capture.start(this.settingid, false, function () {
                self.captureing = false;
                $.Log("Capture.onUploadCompleted()")
            });
            setTimeout(function () {
                self.captureing = false
            }, 500)
        },
        switchServerType: function (toArtificial, source) {
            if (toArtificial) {
                $.Log("switch connect t2dstatus");
                if ($.server.robot == 1) {
                    this.robotSessionID = this.sessionid;
                    this.requestRobot = false;
                    this.view.disableButton("manual", true);
                    this.statusConnectTChat = "CLOSECHAT";
                    this.disconnect();
                    this.view.switchToolbar(true);
                    this.sendFirstMessage();
                    this.reconnect()
                } else if ($.server.robot == 2) {
                    this.manualServiceInfo()
                }
            } else {
                $.Log("switch connect robot");
                if ($.server.robot == 1) {
                    this.robotSessionID = "";
                    this.requestRobot = true
                } else if ($.server.robot == 2) {
                    this.lastSessionID = "";
                    this.t2dMode = source === 2 ? source : 1
                }
                this.view.disableButton("manual", false);
                this._stopQueue();
                this.callMethod[this.callBack] = emptyFunc;
                this.statusConnectT2D = "COMPLETE";
                this.statusConnectTChat = "WAIT";
                this.disconnect();
                this.view.switchToolbar(false);
                this.sendFirstMessage();
                this.reconnect()
            }
        },
        minimize: function () {
            this.selected = false;
            this.view.minimize()
        },
        maximize: function () {
            $.Log(this.settingid + ":chatMode.maximize()");
            this.selected = true;
            this.unread = 0;
            this.view.maximize();
            this.setDest()
        },
        receive: function (data) {
            if (this._connectTimeout) {
                this._stopConnectTimeout()
            }
            var direction;
            if (!$.isObject(data)) {
                $.Log(this.settingid + ":chatMode.receive(" + data + ")");
                data = $.JSON.parseJSON(data)
            } else {
                $.Log(this.settingid + ":chatMode.receive(" + $.JSON.toJSONString(data) + ")")
            }
            data = this._filterReceive(data);
            if ($.clearHtml(data.msg) == this.CON_ROBOT_NO_ANSWER || data.msg == this.CON_ROBOT_ERROR_MESSAGE) {
                data.msg = this.config.robot_noanswer || data.msg
            }
            if (this.hash.contains(data.msgid) || data.history == 1 && data.systype) {
                return
            }
            this.noticeMessageCountNew();
            if (data !== false) {
                direction = $.base.checkID(data.userid) == $.CON_CUSTOMER_ID ? "left" : "right";
                this.showMessage(direction, data)
            }
            if ($.base.checkID(data.userid) == $.CON_CUSTOMER_ID) {
                this.addDestList({
                    id: data.userid || "",
                    name: data.name || data.nickname || data.username,
                    logo: data.logo || ""
                })
            }
        },
        suggest: function (data) {
            return this.view.suggest(data)
        },
        robot2GetSuggest: function (msg) {
            if (!msg || msg && ($.enLength(msg) > 25 || msg.length < 2)) {
                $(".chat-view-hidden-area .chat-view-suggest-list").display();
                return
            }
            var self = this, callbackName = "__robot2_callback";
            window[callbackName] = function (result) {
                try {
                    result = typeof result == "string" ? $.JSON.parseJSON(result) : result
                } catch (e) {
                    $.Log("Robot.callback:" + e.message, 3)
                }
                if (result.list && result.list.length > 10) {
                    result.list = result.list.slice(0, 10)
                }
                result.list = result.list.reverse();
                self.robot2Suggest(result)
            };
            data = {
                action: "ig",
                q: msg,
                sessionid: this.sessionid,
                clientid: $.global.pcid,
                type: "jsonp",
                callbackname: callbackName
            };
            $.require(this.server.robotserver + "/robot/app?" + $.toURI(data) + "#rnd")
        },
        robot2Suggest: function (data) {
            var dataArr = [];
            if (data && data.list && data.status === 0) {
                $.each(data.list, function (index, content) {
                    dataArr.push(content.question)
                });
                return this.view.suggest(dataArr, "robot2.0")
            }
        },
        sendFirstMessage: function () {
            if (this.requestRobot && this.config.enable_robotgreeting !== 0 && $.server.robot == 1) {
                if (!this.config.robot_greeting) {
                    return
                }
                this.showMessage("left", {
                    msgid: "welcome_robot",
                    type: 1,
                    history: 1,
                    msg: this.config.robot_greeting || ""
                })
            } else if (this.config.enable_artificialgreeting !== 0) {
                if ($.server.robot == 2 && this.robotKf) return;
                var greet_msg = this.config.greet_detail ? this.config.greet_detail : $.utils.handleLinks($.lang.system_first_news, {name: this.config.name});
                this.showMessage("left", {msgid: "welcome", type: 1, msg: greet_msg})
            }
        },
        send: function (data, showValue, hiddenValue) {
            var timerkeyid = $.getTime(),
                tdata = {localtime: timerkeyid, timerkeyid: timerkeyid, msgid: this.getMsgId(timerkeyid)};
            if (typeof data == "string") {
                data = $.extend({}, this.defData, tdata, {msg: data.replace(/</gi, "&lt;").replace(/>/gi, "&gt;")})
            } else {
                data = $.extend({}, this.defData, tdata, data)
            }
            if (!this.connected) {
                if (!/FAILURE|QUEUE/i.test(this.statusConnectTChat)) {
                    $.Log("connected:" + this.connected + ", statusConnectTChat:" + this.statusConnectTChat + ", start", 1);
                    this.statusConnectTChat = "QUEUE";
                    this.start(data)
                }
                this.hashCache.add(data.msgid, data);
                return false
            }
            if (typeof data.msg == "string" && data.msg.indexOf("faqvote:") === -1) {
                data.msg = $.enCut(data.msg, this.inputMaxByte)
            }
            $.Log(this.settingid + ":chatMode.send(" + ($.isObject(data) ? $.JSON.toJSONString(data) : data) + ")", 1);
            if (data.type == 1 || data.type == 2 && data.emotion == 1) {
                var showData = $.extend({}, data);
                if (showValue) {
                    showData.msg = showValue
                }
                if (showData.msg.indexOf("faqvote:") > -1 && hiddenValue) {
                    data.msg = hiddenValue;
                    data.hidden = showData.msg;
                    showData.msg = hiddenValue;
                    this.showMessage("right", showData)
                } else {
                    this.showMessage("right", showData)
                }
            } else if (/^(2|4|6)$/gi.test(data.type)) {
                this.hash.add(data.msgid, data)
            }
            if (/^(1|2|4|6)$/gi.test(data.type)) {
                this._sendNum++;
                this._changeCsrNum++;
                if (this._changeCsrNum == this._changeCsrMaxNum) {
                    this.view.disableButton("csr", false)
                }
            }
            if (this.connect) {
                this.connect.sendMessage(data)
            }
            this.clearMessageCount(data);
            return true
        },
        noticeMessageCountNew: function (data) {
            if (typeof webInfoChanged !== "function") {
                return
            }
            if (!data || !/(^1|2|4|6|7)$/i.test(data.type) || data.msgid === "welcome" || data.history == 1 || data.msgsystem == "true") {
                return
            }
            this.receiveMsgCount++;
            webInfoChanged(400, '{"num":' + this.receiveMsgCount + ', "showNum":1}', false)
        },
        clearMessageCount: function () {
            this.noticeMessageCount = 0;
            if (typeof webInfoChanged !== "function") {
                return
            }
            webInfoChanged(400, '{"num":0, "showNum":1}', false)
        },
        resend: function (msgid) {
            if (!this.hash.contains(msgid)) {
                return false
            }
            this.send(this.hash.items(msgid))
        },
        predictMessage: function (data) {
            if (!this.connected || !this.connect) {
                return
            }
            $.Log("$.chatMode.predictMessage(" + data + ")");
            this.connect.predictMessage(data);
            if ($.server.robot == 2 && this.robotKf && this.view.isRobotSuggest) {
                this.robot2GetSuggest(data)
            }
        },
        _filterReceive: function (data) {
            var self = this;
            if (this.user.id == data.userid || $.base.checkID(data.userid) === $.CON_VISITOR_ID) {
                data.msgid = !data.msgid ? this.getMsgId(data.timerkeyid) : data.msgid
            } else {
                if (+data.history != 1 && /^(1|2|4)$/.test(data.type)) {
                    $.promptwindow.startPrompt("", $.lang.news_new, true);
                    this.manageMode.callReceive(this.settingid);
                    if (!this.selected) {
                        this.unread++
                    }
                }
            }
            data.msgid = data.msgid || data.timerkeyid;
            if (this.jetLag) {
                data.timestamp = data.timestamp + parseInt(this.jetLag)
            } else {
                data.timestamp = data.timestamp
            }
            data.timerkeyid = data.timestamp;
            data.localtime = data.timestamp;
            if (data.msgType == 1) {
                this.view.updateMessage(data.msgid, 1, $.lang.system_send_failure);
                this.callTrack("10-01-04", "flash timeout, message send failure");
                return false
            } else if (data.msgType == 2) {
                if ($.isObject(data.msg)) {
                    return false
                } else {
                    this.callTrack("10-01-04", "common message send failure");
                    this.view.updateMessage(data.msgid, 1, $.lang.system_send_failure);
                    return false
                }
            } else if (data.type === 9) {
                this.callTrack("10-01-04", "message is too fast to send");
                data.msgid = data.msgid || this.getMsgId(data.timeData);
                this.view.updateMessage(data.msgid, 1, $.lang.system_send_failure);
                if (this.view.displayStatusInfo) {
                    this.view.displayStatusInfo(true, $.lang.system_fast_messaging);
                    this.floatTimeID = setTimeout(function () {
                        clearTimeout(self.floatTimeID);
                        self.floatTimeID = null;
                        self.view.displayStatusInfo(false)
                    }, 3e3)
                }
                return false
            }
            return data
        },
        showMessage: function (type, data) {
            if (data.type == 1 && data.tag != "inputting") {
                data.msg = nTalk.filterXSS(data.msg)
            }
            var timesample = $.getTime(), self = this;
            data = $.extend({
                localtime: timesample,
                timerkeyid: timesample,
                msgid: this.getMsgId(timesample),
                msg: ""
            }, type == "left" ? this.dest : this.defData, data);
            if (this.hash.contains(data.msgid)) {
                return
            }
            if (data.msgid.indexOf("welcome") > -1) {
                data.timerkeyid = -1;
                data.localtime = -1
            }
            if (data.logo) {
                data.logo = $.protocolFilter(data.logo)
            }
            if (data.url) {
                data.url = $.protocolFilter(data.url)
            }
            if (data.sourceurl) {
                data.sourceurl = $.protocolFilter(data.sourceurl)
            }
            if (data.mp3) {
                data.mp3 = $.protocolFilter(data.mp3)
            }
            if (data.msg && typeof data.msg == "string" && data.msg.indexOf("xnlink") > -1) {
                data.xnlink = true
            }
            if (data.systype) {
                if (data.systype === "2") {
                    if (this.connect.connect.robotQueue !== 2 && !data.history) {
                        this.callStat("11");
                        this.connect.connect.robotQueue = 2;
                        this.connect.connect.clearSessionIdle();
                        this.view.disableButton("manual", true)
                    }
                    while (data.msg.indexOf("\n") !== -1) {
                        data.msg = data.msg.replace("\n", "<br>")
                    }
                    var num = data.msg.match(new RegExp(/[0-9]+/gi));
                    if (num && num.length > 0 && num[0]) {
                        var queueNumber = '<font class="chat-view-queue-num" style="' + $.STYLE_BODY + 'color:red;font-weight:bold;">' + num[0] + "</font>";
                        data.msg = data.msg.replace(/[0-9]+/, queueNumber)
                    }
                } else {
                    if (data.systype === "1" && !data.history) {
                        this.connect.connect.robotQueue = 1
                    } else {
                        if (data.systype === "3" && !data.history) {
                            this.callStat("23");
                            this.htmlsid = $.getTime(2)
                        }
                        if (data.systype === "4" && !data.history) {
                            this.callStat("10")
                        }
                        this.connect.connect.robotQueue = 0;
                        this.view.disableButton("manual", false)
                    }
                }
                type = "left";
                if (data.systype === "2" || data.systype === "5") {
                    var robotSystemMessage = this.config.robotSystemMessage || this.robotSystemMessage;
                    $.each(robotSystemMessage, function (key, value) {
                        if (key == "message") {
                            data.msg = $.utils.handleLinks(data.msg.replace(value, "[link message={$settingid} source=2]" + value + "[/link]"))
                        } else {
                            value = value.split(",");
                            for (var i = 0; i < value.length; i++) {
                                var message = '<a style="' + $.STYLE_BODY + "display:inline-block;color:#005ffb;text-decoration:none;font-size:" + ($.browser.mobile ? 14 : 12) + 'px;" href="javascript:void(0);" onclick="nTalk.chatManage.get(\'' + self.settingid + "').send('" + key + "', '" + value[i] + "');return false;\" >" + value[i] + "</a>";
                                if (data.msg.indexOf(value[i]) > -1) {
                                    data.msg = data.msg.replace(value[i], message)
                                }
                            }
                        }
                    })
                }
                data.msgid = "robot_toast" + (/2|4|5/gi.test(data.systype) ? 2 : data.systype);
                data.type = 1;
                data.msg = data.msg;
                data.fontsize = $.browser.mobile ? 14 : 12;
                if ($("." + data.msgid).length > 0) {
                    $("." + data.msgid).remove()
                }
            }
            this.hash.add(data.msgid, data);
            return this.view.showMessage(type, data)
        },
        _sendGoodsinfo: function () {
            var self = this, url;
            if (!this.options.itemid) {
                return
            }
            this.callStat("20");
            url = this.server.mcenter + "/goodsinfo/api.php?" + $.toURI({
                siteid: this.siteid,
                itemid: this.options.itemid,
                itemparam: this.options.itemparam,
                sellerid: this.options.sellerid,
                user_id: $.global.shortid
            });
            this.hashCache.add($.getTime(1), {
                type: 5,
                msg: {msgtype: 5, productInfoURL: url + "&type=2&ts=" + $.getTime()}
            });
            if (window[this._callbackGoodsinfo] || $.browser.mobile && !this.CON_MOBILE_SHOW_GOODSINFO) {
                $.Log("CON_MOBILE_SHOW_GOODSINFO:" + this.CON_MOBILE_SHOW_GOODSINFO);
                return
            }
            window[this._callbackGoodsinfo] = function (data) {
                self._showGoodsinfo(data)
            };
            $.require(url + "&type=jsonp&lan=" + $.lang.language + "&callback=" + this._callbackGoodsinfo + "#rnd", function (script) {
                $(script.error ? script.target : script).remove()
            })
        },
        _showGoodsinfo: function (data) {
            if (!data) {
                this.showMessage("goods", {type: 3})
            } else {
                this.showMessage("goods", {type: 13, msg: data})
            }
        },
        isVisitor: function (userid) {
            var usertype = $.base.checkID(userid);
            return usertype === $.CON_VISITOR_ID
        },
        getDest: function (isGetGroupID) {
            var config = this.config;
            $.Log("chatMode.getDest(" + isGetGroupID + ")");
            if (isGetGroupID) {
                temp = config.icon || config.list || config.toolbar || config.featureset || null;
                return !temp || !temp.members.groupID || !temp.members.idList.length ? "" : temp.members.groupID
            } else {
                if (this.dest && this.dest.id && this.dest.id != this.robotID && this.dest.id != $.CON_SINGLE_SESSION && this.dest.id.indexOf("GT2D") == -1) {
                    return this.dest
                } else {
                    this.dest.id = "";
                    this.dest.name = "";
                    var members = (config.icon || config.list || config.toolbar || config.featureset).members;
                    return {id: members.idList[0], name: members.nameList[0], sign: members.sigList[0]}
                }
            }
        },
        setDest: function (data) {
            var self = this, attr;
            data = data || {};
            if (data.phone && $.browser.mobile) {
                this.manageMode.view.setPhoneNumber(data.phone)
            }
            if (data.logo) {
                data.logo.indexOf("rand") < 0 ? data.logo = data.logo + "?rand=" + nTalk.randomChar() : ""
            }
            $.Log(this.settingid + ":chatMode.setDest(" + (data ? $.JSON.toJSONString(data) : "") + ")");
            $.each(data, function (key, value) {
                self.dest[key] = value || self.dest[key]
            });
            if (data && !$.isEmptyObject(data)) {
                this.addDestList({id: data.id, name: data.name, logo: data.logo})
            }
            if (this.config && this.config.mode == "trial") {
                this.dest.title = $.lang.chat_title_ext + " " + this.dest.name
            } else {
                this.dest.title = this.dest.name
            }
            this.dest.attr = {width: $.browser.mobile ? 35 : 55, height: $.browser.mobile ? 35 : 55};
            if (!this.dest.logo) {
                if (self.selected) {
                    self.dest.logo = self.userNumber > 1 ? $.imagemultiplayer : $.imagesingle;
                    self.manageMode.callSetDest(this.settingid, $.extend({}, this.dest))
                }
            } else {
                if ($.CON_MULTIPLAYER_SESSION === this.dest.logo || this.userNumber > 1 && !$.browser.mobile) {
                    this.dest.logo = $.imagemultiplayer
                } else if ($.CON_SINGLE_SESSION === this.dest.logo) {
                    this.dest.logo = $.imagesingle
                }
                if (this.selected) {
                    this.manageMode.callSetDest(this.settingid, $.extend({}, this.dest))
                }
                $.require(this.dest.logo + "#image", function (image) {
                    if (this.src !== self.dest.logo) {
                        return
                    }
                    if (this.error !== true) {
                        self.dest = $.extend({}, self.dest, {
                            logo: self.dest.logo,
                            image: this,
                            attr: $.zoom(this, self.dest.attr.width, self.dest.attr.height)
                        });
                        self.hashDest.items(self.dest.id, $.extend({}, self.dest))
                    } else {
                        self.dest.logo = $.imagesingle
                    }
                    if (self.selected) {
                        self.manageMode.callSetDest(self.settingid, $.extend({}, self.dest))
                    } else {
                        self.manageMode.callSetDestStatus(self.settingid, $.extend({}, self.dest), true)
                    }
                })
            }
        },
        setUser: function (data) {
            this.user = $.extend(this.user, data);
            this.defData = $.extend(this.defData, {
                userid: this.user.id || "",
                name: this.user.name || "",
                logo: this.user.logo || ""
            })
        },
        showInputState: function (targetId) {
            var cssText = "background:transparent url(" + $.sourceURI + "images/mobileicon.png) no-repeat -22px -250px;";
            var newTargetInfo = this.hashDest.items(targetId);
            this.showMessage("bottom", {
                userid: newTargetInfo ? newTargetInfo.id : targetId,
                name: newTargetInfo ? newTargetInfo.name : "",
                logo: newTargetInfo ? newTargetInfo.logo : "",
                tag: "inputting",
                type: 1,
                msg: ['<span class="view-history-body-wait" style="', $.STYLE_NBODY, "margin:0 10px;display:block;width:32px;height:20px;", cssText, '"></span>'].join("")
            });
            this.view.showInputState()
        },
        initConfig: function () {
            var self = this, msgContent, effective;
            if (!this.options.config || $.isEmptyObject(this.options.config)) {
                this.switchUI(this.CON_VIEW_ERROR, "LOAD_FAIED");
                return
            } else {
                this.switchUI(this.CON_VIEW_WINDOW, "LOAD_COMPLETE")
            }
            this.config = $.extend({settingid: this.settingid}, this.options.config);
            if (!this.options.config.service) {
                $.Log("config file version error.", 3);
                this.server = $.extend({}, $.server, {tchatserver: "", tchatgoserver: "", filetranserver: ""})
            } else {
                this.server = $.extend({}, $.server, $.protocolFilter(this.options.config.service))
            }
            this.config.logo = $.protocolFilter(this.config.logo);
            effective = this.server.robot == "1" && this.config.robot == "1" && this.server.roboturl;
            if (effective) {
                if (this.options.manual == 1) {
                    this.requestRobot = false
                } else if (this.config.robot_mode === 0) {
                    if (!this.config.robot_inherits_state || this.config.robot_inherits_state == 1 && $.default_connect_robot) {
                        this.requestRobot = true
                    }
                }
                $.Log("nTalk.chatMode.initConfig(): requestRobot:" + this.requestRobot)
            }
            this._initChatConfig();
            msgContent = !$.browser.mobile && this.config.logo ? '<p style="' + $.STYLE_BODY + 'background-color:transparent;text-align:center;"><img data-type="ntalk-enterprise-logo" src="' + this.config.logo + '" style="' + $.STYLE_BODY + 'text-align:center;display:inline;" onerror="nTalk.loadImageAbnormal(this, event)" onload="nTalk.imgScrollBottom()"/></p>' : "";
            this.setDest({
                id: this.siteid,
                logo: this.config.logo || "",
                name: $.utils.handleLinks($.lang.system_title_news, {name: this.config.name || ""}),
                status: 0
            });
            this.showMessage("first", {type: 0, msg: msgContent});
            this.sendFirstMessage();
            if (this.config.enable_audio == 1) {
                this.audioInit()
            }
            $.base.fire("OpenChatWindow", [])
        },
        audioInit: function () {
            var self = this;
            if ($.Audio) {
                $.Audio.start(this.server.filetranserver, {
                    action: "uploadaudio",
                    roomid: "T2D",
                    siteid: this.siteid,
                    settingid: this.settingid
                }, function (disabled) {
                    $.Log("set Audio Button disabled:" + disabled, 2);
                    self.view.disabledAudioButton(disabled)
                })
            }
        },
        audioUpload: function (e, randomid) {
            var progress, target, json, self = this;
            if (e.status === "uploading") {
                if (!this.uploadingid[randomid]) {
                    this.uploadingid[randomid] = "temp";
                    this.uploadingid[randomid] = this.showMessage("right", {type: 6, msg: "uploading"})
                }
                progress = (e.event.loaded / e.event.total * 100).toFixed(2);
                if (this.uploadingid[randomid] && this.uploadingid[randomid] != "temp") {
                    this.view.audioProgress(this.uploadingid[randomid], progress)
                }
            } else if (e.status === "success") {
                var successInter = setInterval(function () {
                    if (self.uploadingid[randomid] && self.uploadingid[randomid] != "temp") {
                        clearInterval(successInter);
                        target = e.event.target || e.event.currentTarget || e.event.srcElement;
                        $.Log(target.responseText);
                        try {
                            json = $.JSON.parseJSON(target.responseText)
                        } catch (e) {
                        }
                        json.type = 6;
                        json.sourceurl = json.url;
                        json.url = json.mp3;
                        json.duration = json.length;
                        delete json.mp3;
                        self.view.updateMessage(self.uploadingid[randomid], 6, json);
                        $.Log("audioUpload:" + $.JSON.toJSONString(json), 2);
                        self.send($.extend(json, {msg: json}));
                        self.view.showAudioResult(self.uploadingid[randomid]);
                        self.uploadingid[randomid] = ""
                    }
                }, 200)
            } else if (e.status === "error") {
                self.view.showAudioResult(self.uploadingid[randomid])
            } else {
                $.Log(e, 3)
            }
        },
        _initChatConfig: function () {
            var self = this, data = [], buttonArea, startColor, endColor, defultFace, display;
            if ($.isDefined(this.config.message_skin) && (this.config.message_skin == "chat/2" || this.config.message_skin === "" || this.config.message_skin.indexOf("|") > -1)) {
                this.config.message_skin = !this.config.message_skin ? "#2c2c2e|#474749" : this.config.message_skin;
                this.config.startColor = this.config.message_skin.substr(0, this.config.message_skin.indexOf("|"));
                this.config.endColor = this.config.message_skin.substr(this.config.message_skin.indexOf("|") + 1)
            } else {
                var defaultSkin = {
                    "chat/1": "#4297e0",
                    "chat/3": "#575757",
                    "chat/4": "#f25488",
                    "chat/5": "#52ab52",
                    "chat/6": "#9bc942",
                    "chat/7": "#4297e0",
                    "chat/8": "#4297e0",
                    "chat/9": "#4297e0",
                    "chat/10": "#4297e0"
                };
                if (defaultSkin[this.config.message_skin]) {
                    this.config.startColor = this.config.endColor = defaultSkin[this.config.message_skin]
                } else {
                    this.config.startColor = this.config.endColor = this.config.message_skin
                }
            }
            this.config.chatBackground = $.isDefined(this.config.message_content_skin) ? this.config.message_content_skin : "#FFFFFF";
            this.view.disableButton("face", this.config.enable_face === 0);
            this.view.displayButton("face", this.config.enable_face === 0);
            this.view.disableButton(["image", "file"], this.config.transferfiles === 0);
            if (this.config.transferfiles === 0 || $.browser.android && this.config.androidtransf === 0 || $.browser.mobile && !$.browser.android && this.config.othertransf === 0) {
                this.view.displayButton(["image", "file"], true)
            } else {
                this.view.displayButton(["image", "file"], false)
            }
            if ($.browser.mobile && (this.config.enable_audio === 0 || this.config.enable_audio == 2 && $.browser.gecko)) {
                this.view.hideAudioButton()
            }
            this.view.disableButton("history", this.config.chatingrecord === 0);
            this.view.displayButton("history", this.config.chatingrecord === 0);
            this.view.disableButton("loadhistory", this.config.viewchatrecord != 1);
            this.view.displayButton("loadhistory", this.config.viewchatrecord != 1);
            this.view.disableButton("evaluate", this.config.evaluation === 0);
            this.view.displayButton("evaluate", this.config.evaluation === 0);
            this.view.disableButton(["capture", "capoptions"], this.config.captureimage === 0);
            this.view.displayButton(["capture", "capoptions"], this.config.captureimage === 0);
            this.view.disableButton("csr", this.config.changecsr != 1);
            this.view.displayButton("csr", this.config.changecsr != 1);
            this.view.displayButton("xiaonengver", this.config.xiaonengver === 0);
            if (this.requestRobot && this.config.robot_mode === 0) {
                this.view.switchToolbar(false)
            }
            var firstIcon = true;
            this.config.faces = this.config.faces || [];
            defultFace = {id: "-1", name: "", icon: "", pics: []};
            $.each($.lang.editorFaceAlt, function (k, face) {
                if (firstIcon) {
                    defultFace.icon = $.sourceURI + "images/faces/" + k + ($.browser.msie6 ? ".gif" : ".png");
                    firstIcon = false
                }
                defultFace.pics.push({
                    id: k,
                    url: $.sourceURI + "images/faces/" + k + ($.browser.msie6 ? ".gif" : ".png"),
                    sourceurl: $.lang.editorFaceAlt[k]
                })
            });
            if (!this.config.faces.length || this.config.faces[0].id != "-1") {
                this.config.faces.unshift(defultFace)
            }
            if (!this.config.rightlabel || $.isEmptyObject(this.config.rightlabel)) {
                this.config.rightlabel = $.lang.rightlabel
            } else {
                this.config.rightlabel = $.merge({}, this.config.rightlabel)
            }
            $.each(this.config.rightlabel, function (k, item) {
                switch (k) {
                    case"about":
                        var introHtml = self.config.introduction, expTab = /\[tab\s+(.*?)\](.*?)\[\/tab\]/gi;
                        if (expTab.test(introHtml)) {
                            introHtml = introHtml.replace(expTab, "$1");
                            introHtml = $.utils.handleLinks(introHtml, {
                                siteid: self.siteid,
                                user_id: $.global.shortid,
                                lang: $.language || "",
                                itemid: self.itemid || "1111",
                                erpparam: $.global.erpparam || "",
                                itemparam: self.options.itemparam,
                                sellerid: !self.options.itemparam ? self.options.sellerid : ""
                            });
                            data.push($.extend(item, {data: introHtml}))
                        } else if (introHtml) {
                            data.push($.extend(item, {data: introHtml}))
                        }
                        break;
                    case"faq":
                        if (self.config.faqlist && self.config.faqlist.length) {
                            data.push($.extend(item, {data: self.config.faqlist || []}))
                        }
                        break;
                    case"linkinpage":
                        data.push(item);
                    default:
                        var itemdata = $.extend({}, item);
                        itemdata.data = $.utils.handleLinks(item.data, {
                            siteid: self.siteid,
                            user_id: $.global.shortid,
                            itemid: self.itemid || "1111",
                            itemparam: self.options.itemparam
                        });
                        if (itemdata.data) {
                            data.push(itemdata)
                        }
                        break
                }
            });
            this._moreData = data;
            if (this.manageMode.callConfigLoaded) {
                this.manageMode.callConfigLoaded(this.settingid, this.config, data)
            }
            this.displayMoreData();
            return
        },
        displayMoreData: function () {
            if (!this.view.displayButton || $.browser.mobile) return;
            if (!this._moreData || !this._moreData.length || $.global.pageinchat === false) {
                this.view.displayButton("exp", true);
                return true
            } else {
                if (this.config.autoexpansion == "1" && !this.getExpansionStatus()) {
                    if (this.view.chatElement.find(".chat-view-exp")) {
                        this.view.chatElement.find(".chat-view-exp").html($.lang.button_more + " &lt;")
                    }
                    this.toggleExpansion(this.settingid)
                }
                return false
            }
        },
        getCustomerServiceInfo: function (destid, single, ruids) {
            this.callTrack("10-01-05", "start t2d connect");
            var self = this, customerInfo;
            this.callMethod = this.callMethod || window;
            this.callBack = "callBack_chat_" + $.randomChar();
            this.callMethod[this.callBack] = function () {
                if (typeof window.nTalk.fIM_getSessionCustomerServiceInfo == "function") {
                    window.nTalk.fIM_getSessionCustomerServiceInfo.apply(self, arguments)
                } else {
                    window.nTalk.Log("nTalk.fIM_getSessionCustomerServiceInfo is undefined", 3)
                }
            };
            if (this.requestRobot) {
                this.dest.destid = this.robotID;
                customerInfo = {
                    status: 1,
                    userid: this.dest.destid,
                    nickname: this.config.robot_name || $.lang.robot_name,
                    usericon: this.config.robot_logo || "",
                    signature: "",
                    sessionid: ""
                };
                this.callMethod[this.callBack](customerInfo, this.settingid)
            } else {
                this._getCustomerServiceForT2dStatus(destid, single, ruids)
            }
        },
        changeCustomerServiceInfo: function () {
            this.startCSSwitch = "START";
            if ($.server.robot == 2) {
                this.t2dMode = 0;
                this.lastSessionID = ""
            }
            this.getCustomerServiceInfo(this.getDest(true), 0, this.getDest().id)
        },
        manualServiceInfo: function () {
            this.send($.lang.button_switch_manual);
            this.view.disableButton("manual", true)
        },
        _getCustomerServiceForT2dStatus: function (destid, single, ruids) {
            $.Log("chatMode._getCustomerServiceForT2dStatus(" + destid + ", " + single + ")", 1);
            var self = this, queryString, idType = $.base.checkID(destid);
            if (this._connectTimeout) {
                $.Log("Connect tchat...", 2);
                return
            }
            if (!$.user.id || !$.global.pcid) {
                return
            }
            if (idType === false || idType != $.CON_CUSTOMER_ID && idType != $.CON_GROUP_ID) {
                this.showMessage("system", {type: 9, msg: $.lang.system_no_user});
                return
            }
            var robotVersion2 = {};
            if ($.server.robot == 2) {
                var sessionid = this.lastSessionID || this.sessionid ? this.lastSessionID || this.sessionid : null;
                var trf = this.t2dMode;
                var _ruids = ruids ? ruids : this.dest && this.dest.id && $.base.checkID(this.dest.id) === 0 ? this.dest.id : null;
                _ruids = this.t2dMode === null ? null : _ruids;
                robotVersion2 = {sid: sessionid, trf: trf, ruids: _ruids}
            }
            queryString = $.toURI($.extend({
                query: "requestchat",
                sitid: this.siteid,
                uid: $.user.id,
                uids: destid,
                ruids: ruids,
                issingle: single,
                cid: $.global.pcid,
                type: $.global.isvip,
                userlevel: $.global.userlevel,
                usertag: $.global.usertag,
                userrank: $.global.userrank,
                callbackname: this.callBack
            }, $.flashserver.reversechat == 1 ? {} : {settingid: this.settingid}, robotVersion2), true);
            if (this.view.displayStatusInfo && this.statusConnectT2D !== "QUEUE") {
                this.view.displayStatusInfo(true, $.lang.system_allocation_service)
            }
            $.Log("QueryString:" + queryString);
            $.Log(":::" + this.server.t2dstatus + "?" + queryString + "#rnd", 1);
            this.statusConnectT2D = "QUERY";
            $.require(this.server.t2dstatus + "?" + queryString + "#rnd", function (script) {
                $.Log("request t2dstatus complete: error:" + (script.error || "") + ", reconnect:" + self._reconnectCount + ", statusConnectT2D:" + self.statusConnectT2D);
                if (script.error || self.statusConnectT2D == "QUERY") {
                    self.callTrack("10-01-07", "t2d abnormal");
                    self._reconnectCount++;
                    self.statusConnectT2D = "WAIT";
                    if (self._reconnectCount < 3) {
                        setTimeout(function () {
                            self.reconnect()
                        }, 1e3)
                    } else {
                        self._reconnectCount = 0;
                        self._failure("3TH_REQUEST")
                    }
                }
                $(script.error ? script.target : script).remove()
            })
        },
        callBackCustomerServiceInfo: function (data) {
            var self = this;
            var msg = "";
            if (this.options.edu_invisitid && $.isEdu && data.status == 3) {
                data.status = 1
            }
            $.Log(this.settingid + ":chatMode.callBackCustomerServiceInfo(" + $.JSON.toJSONString(data) + ")", 1);
            if (!data || data.error || data.status != 3 && (!data.userid || !data.externalname && !data.nickname)) {
                this.callTrack("10-01-07", "result params abnormal");
                if (data.error == CON_NO_FREE_USER) {
                    msg = $.lang.system_no_free_user
                } else if (data.error == CON_OVER_RECHATNUM) {
                    msg = $.lang.system_over_rechatnum;
                    this.view.disableButton("csr", true)
                } else if (data.error == CON_NO_USER2) {
                    msg = $.lang.system_no_user
                }
                if (msg !== "") {
                    this.showMessage("system", {type: 9, msg: msg});
                    this.callStat("13");
                    this.statusConnectT2D = "COMPLETE";
                    if (this.view.displayStatusInfo) {
                        this.view.displayStatusInfo(false)
                    }
                    this._stopQueue();
                    if (this.robotKf) {
                        setTimeout(function () {
                            self.t2dMode = null;
                            self.reconnect();
                            $.Log("please set manual customer in robot setting group")
                        }, 2e3)
                    }
                    return
                }
                this._abnormal(data.error || "");
                this.startCSSwitch = "";
                if (this.view.displayStatusInfo) {
                    this.view.displayStatusInfo(false)
                }
                return
            }
            this.callTrack("10-01-06", "success");
            if (this.startCSSwitch == "START") {
                this.startCSSwitch = "SHOW"
            }
            this._clearChangeCsrNum();
            this.sessionid = data.sessionid || "";
            $.Log("get sessioId>>" + this.sessionid, 1);
            data.usericon = data.usericon == "null" ? "" : data.usericon;
            data.usericon = data.usericon == "null" ? "" : data.usericon;
            this.setDest({
                id: data.userid,
                name: data.externalname || data.nickname || "",
                sign: data.signature || "",
                logo: $.protocolFilter(data.usericon || ""),
                status: data.status || 0,
                phone: data.mobile || data.phone || ""
            });
            this.callMethod[this.callBack] = emptyFunc;
            if (data.status === this.CON_OFFLINE) {
                this.statusConnectT2D = "COMPLETE";
                this._offline()
            } else if (data.status === this.CON_BUSY) {
                this.statusConnectT2D = "QUEUE";
                this._queueNum = +data.num + 1;
                this._busy()
            } else {
                this.statusConnectT2D = "COMPLETE";
                this._online()
            }
            if ($.server.robot == 2 && data.usertype == 1) {
                this.setRobot2Param(true)
            }
            if (this.config.enable_starLevel && !self.getStarLevel) {
                self.getStarLevel = true;
                window["startLevel"] = function (result) {
                    try {
                        $.evaluateStarLevel = 5;
                        if (result >= 55 && result <= 59) {
                            $.evaluateStarLevel = 4
                        } else if (result < 55) {
                            $.evaluateStarLevel = 3
                        }
                    } catch (e) {
                        $.Log("startLevel.callback:" + e.message, 3)
                    }
                };
                startLevelData = {
                    siteid: self.dest.id.substr(0, self.dest.id.indexOf("_ISME")),
                    kfid: self.dest.id,
                    callback: "startLevel"
                };
                $.require($.server.settingserver + "/index.php/api/setting/returnCount?" + $.toURI(startLevelData) + "#rnd", function () {
                    if (self.view.starLevel) {
                        self.view.starLevel($.evaluateStarLevel)
                    }
                })
            }
        },
        setRobot2Param: function (robot) {
            if (robot) {
                this.robotKf = true;
                this.view.switchToolbar(false);
                this.t2dMode = 2
            } else {
                this.robotKf = false;
                this.view.switchToolbar(true);
                this.t2dMode = null
            }
        },
        _abnormal: function (error) {
            var failure = $.utils.handleLinks($.lang.system_abnormal, {settingid: this.settingid});
            this.callStat("13");
            this.connected = false;
            this._stopQueue();
            this.showMessage("system", {type: 9, msg: failure});
            $.Log("Customer information request an exception.(" + error + ")", 3)
        },
        _failure: function (error) {
            var failure = $.utils.handleLinks($.lang.system_failure, {settingid: this.settingid});
            if (this.view.displayStatusInfo) {
                this.view.displayStatusInfo(false)
            }
            this.connected = false;
            this._stopQueue();
            this.showMessage("system", {type: 9, msg: failure});
            $.Log("Customer information request fails.(" + error + ")", 3)
        },
        _offline: function () {
            var offline = $.utils.handleLinks($.lang.system_offline, {
                destname: this.dest.name,
                settingid: this.settingid
            });
            if (this.view.displayStatusInfo) {
                this.view.displayStatusInfo(false)
            }
            this.callStat("12");
            this.connected = false;
            this._stopQueue();
            this.showMessage("system", {msg: offline, type: 9});
            if (this.server.robot == 1 && this.server.roboturl && this.config.robot == 1 && (parseFloat(this.config.robot_mode) > 0 || this.options.manual == 1)) {
                this.switchServerType(false, "OFFLINE")
            } else {
                this.switchUI(this.CON_VIEW_MESSAGE, "OFFLINE")
            }
        },
        _online: function () {
            var self = this;
            if (this.view.displayStatusInfo) {
                this.view.displayStatusInfo(false);
                if ($.browser.safari && !navigator.cookieEnabled) {
                    setTimeout(function () {
                        self.view.displayStatusInfo(true, $.lang.system_cookie, {
                            "font-size": "12px",
                            "line-height": "27px",
                            padding: "0 45px"
                        }, true)
                    }, 1e3)
                }
            }
            this.callStat("10");
            this._stopQueue();
            $.Log("connect user " + this.dest.name + "...", 1);
            this.createConnect()
        },
        _busy: function () {
            var queue, queue2message, htmlQueueNumber, htmlQueueTime;
            this.connected = false;
            if (this.view.displayStatusInfo) {
                this.view.displayStatusInfo(false)
            }
            if (this._startQueue) {
                this.view.chatHistory.find(".chat-view-queue-num").html(this._queueNum.toString());
                return
            }
            if (this.server.robot == 1 && this.server.roboturl && this.config.robot == 1 && parseFloat(this.config.robot_mode) == 2) {
                this.statusConnectT2D = "COMPLETE";
                this.switchServerType(false, "BUSY");
                return
            }
            if (this._startQueue !== true) {
                this._startQueue = true;
                this.callStat("11");
                var self = this;
                this.view.disableButton(["image", "file", "submit"], true);
                this._queueTime = 0;
                this._queueTimeID = setInterval(function () {
                    if (self._queueTime % 3 === 0) {
                        self.getCustomerServiceInfo(self.options.destid, self.options.single, "")
                    }
                    self._queueTime++;
                    self.view.chatHistory.find(".chat-view-queue-time").html($.secondsToMinutes(self._queueTime))
                }, 1e3)
            }
            if (!this.view.chatHistory.find(".chat-view-queue-num").length) {
                htmlQueueNumber = '<font class="chat-view-queue-num" style="' + $.STYLE_BODY + 'color:red;font-weight:bold;">' + this._queueNum.toString() + "</font>";
                htmlQueueTime = "";
                toRobotMessage = "";
                var queueMsg1, queueMsg2;
                if ($.browser.mobile) {
                    queueMsg1 = $.lang.system_mobile_queue1 || $.lang.system_queue1;
                    queueMsg2 = $.lang.system_mobile_queue2 || $.lang.system_queue2
                } else {
                    queueMsg1 = $.lang.system_queue1;
                    queueMsg2 = $.lang.system_queue2
                }
                queue1message = $.utils.handleLinks(queueMsg2, {
                    settingid: this.settingid,
                    count: htmlQueueNumber,
                    time: htmlQueueTime
                });
                queue2message = $.utils.handleLinks(queueMsg1, {
                    settingid: this.settingid,
                    count: htmlQueueNumber,
                    time: htmlQueueTime,
                    br: "",
                    torobot: toRobotMessage
                });
                if (this.config.disable_message === 1) {
                    this.showMessage("system", {type: 0, msg: queue1message})
                } else {
                    this.showMessage("system", {type: 0, msg: queue2message})
                }
                this.view.changeQueueStyle()
            }
        },
        _stopQueue: function () {
            this._startQueue = false;
            clearInterval(this._queueTimeID);
            this.view.disableButton(["image", "file", "submit"], false)
        },
        _ready: function (userid, pcid) {
            $.Log(this.settingid + "::chatMode._ready()", 1);
            if (this.connect) {
                this.connect.stopSwitchConnect()
            }
            this.statusConnectTChat = "READY";
            if ("zh_cn" !== $.lang.language.toLowerCase()) {
                if (this.debug) {
                    $.Log(this.settingid + ":chat.connect.setTextStyle")
                }
                if (this.connect) {
                    this.connect.setTextStyle($.JSON.toJSONString({fontsize: 20}))
                }
            }
            this.callStat("4")
        },
        _connectSuccess: function (userinfo) {
            this.callTrack("10-01-02", "connect success");
            var self = this, data, content, timeout = 0;
            if (userinfo) {
                if (typeof userinfo == "string") {
                    data = $.JSON.parseJSON(userinfo)
                } else {
                    data = userinfo
                }
                this.setUser({
                    id: data.myuid || "",
                    name: data.myuname || "",
                    sign: data.signature || "",
                    logo: $.protocolFilter(data.mylogo || "")
                });
                this.sessionid = data.sessionid || "";
                if (this.sessionid) {
                    this.callStat("0")
                }
                this.jetLag = $.getTime() - data.timesample;
                if ($.server.robot == 1) {
                    this.mergeSession(this.dest.id, this.sessionid, function () {
                        $.Log("merge session")
                    })
                }
            }
            this._stopConnectTimeout();
            this.statusConnectTChat = "COMPLETE";
            $.Log("connect " + this.dest.name + " complete", 1);
            if (typeof im_destUserInfo == "function") {
                im_destUserInfo({id: this.dest.id, name: this.dest.name})
            } else if ($.browser.mobile) {
                $.postMessage(window.parent, ["destInfo", this.dest.id, this.dest.name].join(","), "*")
            }
            if ($.browser.mobile && this.manageMode && $.isFunction(this.manageMode.view.updateViewStatus)) {
                this.manageMode.view.updateViewStatus(false)
            }
            this.view.removeMessage("system");
            if (this.startCSSwitch == "SHOW" && !this.requestRobot) {
                this.userList = [];
                this.startCSSwitch = "";
                this.showMessage("system", {
                    type: 9,
                    msg: $.utils.handleLinks($.lang.system_switch_session, {destname: this.dest.name})
                })
            }
            $.waitMessage.each(function (k, body) {
                self.waitTimeID[self.waitTimeID.length] = setTimeout(function () {
                    self.send(body)
                }, timeout);
                timeout += 600
            });
            this._sendGoodsinfo();
            this.hashCache.each(function (k, body) {
                self.cacheTimeID[self.cacheTimeID.length] = setTimeout(function () {
                    self.send(body)
                }, timeout);
                timeout += 600
            });
            this.hashCache.clear();
            this.view.disableButton("history", false);
            if (!this.requestRobot && this.config.robot_inherits_state == 1) {
                $.default_connect_robot = false
            }
        },
        _connectException: function () {
            $.Log(this.settingid + ":chatMode._connectException()");
            this.connected = false;
            this.statusConnectTChat = "FAILURE";
            this.showMessage("system", {
                type: 9,
                msg: $.utils.handleLinks($.lang.system_connect_wait, {settingid: this.settingid})
            })
        },
        _connectResult: function (status, userinfo, message) {
            message = $.hexToDec(message);
            $.Log(this.settingid + ":chatMode.connectResult(" + $.JSON.toJSONString(arguments) + ")");
            if (this.connected && status === this.CON_CLOSE_CONNECT) {
                this.statusConnectTChat = "CLOSECHAT";
                return
            }
            if (this.connected && status === this.CON_DISCONNECT) {
                this.disconnect()
            }
            if (!this.connected && status === this.CON_LOGIN_SUCCESS) {
                this.connected = true
            }
            switch (status) {
                case this.CON_LOGIN_SUCCESS:
                    this.view.disableButton("capture", false);
                    this._connectSuccess(userinfo);
                    break;
                case this.CON_LOGIN_FAILURE:
                case this.CON_CONNECT_FAILURE:
                    this.view.disableButton("capture", true);
                    this._connectException();
                    break
            }
        },
        mdyServerAddr: function (url) {
            return url.replace(/\/flashgo/i, "/httpgo")
        },
        setFlashGoServer: function (tChatFlashGoUrl) {
            var match, pattern = /cid=(\-?\d+)/gi;
            $.Log(this.settingid + ':chatMode.setFlashGoServer("' + tChatFlashGoUrl + '")');
            if (tChatFlashGoUrl) {
                tChatFlashGoUrl = this.mdyServerAddr(tChatFlashGoUrl)
            } else {
                return
            }
            match = pattern.exec(tChatFlashGoUrl);
            this.chatFlashGoUrl = $.protocolFilter(tChatFlashGoUrl);
            this.chatgourl = $.protocolFilter(tChatFlashGoUrl.substr(0, tChatFlashGoUrl.indexOf("?")));
            this.clientid = match && match.length == 2 ? match[1] : ""
        },
        notifySessionSence: function (data) {
            $.Log("chatMode.notifySessionSence(" + data + ")", 1);
            try {
                data = $.JSON.parseJSON(data)
            } catch (e) {
            }
            if (data.evaluable === 1) {
                this._Evaluable = true
            } else {
                this._Evaluable = false
            }
            if (data.enableevaluation === 1) {
                this._Enableevaluation = true
            } else {
                this._Enableevaluation = false
            }
            if ($.server.robot == 2) {
                if (data.scenemode === 0) {
                    this.setRobot2Param(false)
                } else if (data.scenemode === 1) {
                    this.setRobot2Param(true)
                }
            }
            if ($.browser.mobile) {
                this.view.displayEvClose(this._Enableevaluation ? 1 : 0)
            }
            this.view.disableButton("evaluate", !this._Evaluable);
            if (data.score == -1) {
                this._submitRating = false;
                this.showMessage("info", {type: 9, msg: $.lang.system_evaluation_failure})
            } else if (data.score > 0) {
                this._submitRating = true
            }
        },
        notifyUserList: function (userList) {
            $.Log(this.settingid + ":chatMode.notifyUserList(" + userList + ")");
            try {
                userList = $.JSON.parseJSON(userList)
            } catch (e) {
                userList = []
            }
            var retList = [];
            for (var i = 0; i < userList.length; i++) {
                if ($.base.checkID(userList[i].userid) !== $.CON_CUSTOMER_ID) {
                    continue
                } else {
                    retList.push(userList[i]);
                    this.addDestList({
                        id: userList[i].userid || "",
                        name: userList[i].externalname || userList[i].nickname || userList[i].username || "",
                        logo: userList[i].usericon || ""
                    })
                }
            }
            this.userList = retList;
            this.userNumber = this.userList.length;
            $.Log(this.settingid + ":chatMode.notifyUserList:" + userList.length);
            if (this.userNumber > 1) {
                this.callStat("21")
            }
        },
        userEnter: function (strData) {
            var data, message = $.lang.system_add_session, newCustomer = true;
            try {
                data = $.JSON.parseJSON(strData)
            } catch (e) {
                data = null
            }
            if ($.base.checkID(data.userid) != $.CON_CUSTOMER_ID || this.userList.length === 0) {
                return
            }
            for (var i = 0; i < this.userList.length; i++) {
                if (this.userList[i].userid == data.userid) {
                    newCustomer = false
                }
            }
            if (newCustomer) {
                this.userList.push(data);
                this.userNumber = this.userList.length
            }
            if (this.userList.length > 1) {
                this._clearChangeCsrNum()
            }
            $.Log(this.settingid + ":[" + this.userList.length + "]chatMode.userEnter(" + strData + ")");
            this.addDestList({
                id: data.userid || data.id,
                name: data.externalname || data.nickname || data.username || data.name,
                logo: data.logo || ""
            });
            if (message && this.userNumber > 1) {
                this.enterUserId = data.userid;
                this.showMessage("system", {
                    type: 9,
                    msg: $.utils.handleLinks(message, {destname: data ? data.externalname || data.nickname || "" : this.dest.name}),
                    enter: 1
                })
            }
        },
        userLeave: function (destid) {
            this.enterData = null;
            $.Log(this.settingid + ":chatMode.userLeave(" + destid + ")");
            var destLeave = $.extend({}, this.hashDest.items(destid));
            if (destLeave && !$.isEmptyObject(destLeave)) {
                if (this.userList.length < 2) {
                    return
                } else {
                    var data = [];
                    for (var i = 0; i < this.userList.length; i++) {
                        if (this.userList[i].userid != destid) {
                            data.push(this.userList[i])
                        }
                    }
                    this.userList = data;
                    this.userNumber = this.userList.length;
                    data = this.userList[0];
                    if (!data) return;
                    this.setDest({
                        id: data.userid || "",
                        name: data.externalname || data.nickname || "",
                        sign: data.signature || "",
                        logo: $.protocolFilter(data.usericon || data.logo || ""),
                        status: data.status
                    });
                    if (destLeave.name && destLeave.id && destLeave.id.indexOf("robot") == -1) {
                        this.showMessage("system", {
                            type: 9,
                            msg: $.utils.handleLinks($.lang.system_go_away_session, {destname: destLeave.name}),
                            enter: 1
                        })
                    }
                }
            } else {
                $.Log("chatMode.userLeave(): dest info is null", 2)
            }
        },
        _userInfo: function (strData) {
            var data;
            if (typeof strData == "object") {
                data = strData
            } else try {
                data = $.JSON.parseJSON(strData)
            } catch (e) {
                return
            }
            if (data.status === this.CON_OFFLINE || data.status === this.CON_AWAY) {
                this.statusConnectTChat = "CLOSECHAT";
                this.disconnect();
                return
            }
            if (this.dest.id != data.userid && data.status != 1) {
                $.Log(">userid:" + this.dest.id + "!=" + data.userid + " ,>" + (this.dest.id != data.userid) + ", " + data.status + "!=1>" + (data.status != 1), 1);
                $.Log("Switch to is not online customer service does not update the customer information ", 2);
                return
            }
            this.setDest({
                id: data.userid || this.dest.id,
                name: data.externalname || data.nickname || this.dest.name,
                sign: data.signature || this.dest.sign,
                logo: $.protocolFilter(data.usericon || data.logo || this.dest.logo),
                phone: data.mobile || data.phone || "",
                status: data.status
            })
        },
        addDestList: function (data) {
            var dest, userid, userName, userLogo;
            if (!data || $.isEmptyObject(data) || !data.id && !data.userid) {
                return
            }
            userid = data.userid || data.id;
            userName = data.externalname || data.nickname || data.username || data.name;
            userLogo = data.usericon || data.logo || "";
            $.Log("add or update dest info:" + $.JSON.toJSONString(data), 2);
            if (!this.hashDest.contains(userid)) {
                dest = {id: userid, name: userName, logo: userLogo};
                this.hashDest.add(dest.id, dest)
            } else {
                dest = $.extend({}, this.hashDest.items(data.id), {id: userid, name: userName, logo: userLogo});
                this.hashDest.items(dest.id, dest)
            }
            return dest
        },
        getMsgId: function (timesample) {
            timesample = timesample || $.getTime();
            while (this.hash.contains(timesample + "J")) {
                timesample++
            }
            return parseFloat(timesample) + "J"
        },
        mergeSession: function (updateDestID, updateSessionID, callback) {
            if (!this.robotSessionID) return;
            var self = this, pdata = {
                siteid: this.siteid,
                robotsessionid: this.robotSessionID,
                sessionid: updateSessionID || this.sessionid,
                destid: updateDestID,
                myuid: $.user.id
            };
            new $.POST(this.server.mcenter + "/message.php?m=Message&a=updateRobotMsg", pdata, function (event) {
                $.Log("send hidtory message complete");
                setTimeout(function () {
                    callback.call(self)
                }, 50)
            })
        },
        _clearChangeCsrNum: function () {
            this._changeCsrNum = 0;
            this.view.disableButton("csr", true)
        },
        _filterNullChar: function (data) {
            var self = this;
            $.each(data, function (i, value) {
                if ($.isObject(value) || $.isArray(value)) {
                    data[i] = self._filterNullChar(value)
                } else if (typeof value == "number") {
                    data[i] = value
                } else {
                    data[i] = value.replace(CON_NULL, "")
                }
            });
            return data
        },
        _formatEvaluationData: function (data) {
            var self = this, evalContent = "", timerkeyid = $.getTime(),
                submitData = {type: 5, timerkeyid: timerkeyid, msgid: this.getMsgId(timerkeyid)};
            data = this._filterNullChar(data);
            if (this.config.evaluateVersion == 2) {
                submitData.msg = $.extend({msgtype: 3}, {newevaluate: data})
            } else {
                submitData.msg = $.extend({msgtype: 3}, {evaluate: data})
            }
            if (this.config.evaluateVersion == 2) {
                for (var k in data) {
                    if (!data[k] || !data[k].answer) {
                        continue
                    }
                    var answer = data[k].answer;
                    for (var m in answer) {
                        if (!answer[m] || !answer[m].lab) {
                            continue
                        }
                        evalContent += answer[m].lab + "; "
                    }
                }
            } else {
                for (var k in data) {
                    if (!data[k] || !data[k].value || $.isFunction(data[k]) || !data.hasOwnProperty(k)) {
                        continue
                    }
                    if (typeof data[k].value === "string") {
                        evalContent += data[k].value + "; "
                    } else {
                        evalContent += data[k].value.text + "; "
                    }
                }
            }
            $.Log("submitData::" + $.JSON.toJSONString(submitData));
            return {data: this._toEvaluateXML(submitData), info: $.enCut(evalContent, 50)}
        },
        _toEvaluateXML: function (json) {
            var attributes, body;
            json = $.charFilter(json);
            attributes = $.whereGet(json, ["type", "msgid"]);
            for (var k in attributes) if (attributes[k] === undefined) delete attributes[k + ""];
            body = {flashuid: json.timerkeyid, msg: {msg: $.extend(json.msg, {attributes: attributes})}};
            if (body.msg.msg.newevaluate) {
                body.msg.msg.newevaluate = $.JSON.toJSONString(body.msg.msg.newevaluate)
            }
            if (body.msg.msg.evaluate) {
                body.msg.msg.evaluate = $.JSON.toJSONString(body.msg.msg.evaluate)
            }
            body.msg = $.jsonToxml(body.msg);
            return body
        }
    };
    $.chatManage = {
        name: "chatManage",
        view: null,
        options: null,
        hash: new $.HASH,
        hashWait: new $.HASH,
        hashConfig: new $.HASH,
        hashStatus: new $.HASH,
        objMinView: null,
        cacheLeft: null,
        cacheTop: null,
        htmlSID: "",
        connectId: "",
        open: function (settingid, destid, itemid, itemparam, sellerid, noWaitConnect, single, manual, edu_invisitid, edu_visitid) {
            $.Log("$.chatManage.open(" + $.JSON.toJSONString(arguments) + ")");
            var self = this, preTime;
            if ($.xpush) {
                $.xpush.clearSettingUnReadMsgCount(settingid)
            }
            this.htmlSID = $.getTime(2);
            this.settingid = settingid || destid;
            this.destid = destid || "";
            this.itemid = itemid;
            this.itemparam = itemparam;
            this.sellerid = sellerid;
            this.single = single || (this.destid ? 1 : 0);
            this.manual = manual || "0";
            this.edu_visitid = edu_visitid || "";
            this.edu_invisitid = edu_invisitid || "";
            this.clearHistoryPageCount();
            if (this.view && this.objMinView) {
                this.objMinView.remove()
            }
            this.createClientID();
            if (!this.hash.contains(this.settingid)) {
                if (this.hashWait.contains(this.settingid)) {
                    $.Log("wait open chat", 2);
                    return
                } else {
                    this.hashWait.add(this.settingid, "wait")
                }
                $.base.showLoading();
                this.loadConfig(settingid ? settingid : $.global.settingid, function (config) {
                    if ($.browser.mobile) {
                        self.loadWapView(config, function () {
                            self.initChatManage(noWaitConnect, config)
                        })
                    } else {
                        self.initChatManage(noWaitConnect, config)
                    }
                }, this.settingid)
            } else if (this.hash.items(this.settingid)) {
                $.Log("$.chatManage.switchChat(" + this.settingid + ")", 1);
                this.chat = this.hash.items(this.settingid);
                if (!(this.get(this.settingid).connect && this.get(this.settingid).connect.connect)) {
                    this.get(this.settingid).reconnect("", this.destid, this.single, this.edu_invisitid, this.edu_visitid)
                }
                if (!this.chat.selected && !($.isEdu && $.browser.mobile)) {
                    this.switchChat(this.settingid)
                }
            }
            return true
        },
        loadWapView: function (config, callback) {
            var WapViewFileName = "chat.view.wap.js";
            if ($.flashserver.layout && ($.flashserver.layout == "2" || $.flashserver.layout == "3") && !$.isEdu) {
                WapViewFileName = "chat.view.wap.theme" + $.flashserver.layout + ".js" + $.baseExt
            }
            $.require({view: WapViewFileName + $.baseExt}, function () {
                callback.call()
            })
        },
        createClientID: function () {
            var _UUID = $.randomChar(20);
            this.connectId = this.connectId !== "" ? this.connectId : "JS_" + _UUID.toLowerCase();
            return this.connectId
        },
        initChatManage: function (noWaitConnect, config) {
            var self = this, preTime, options = {};
            var chatManageView;
            if (!this.view) {
                if ($.global.siteid == "kf_9740") {
                    options.position = {position: "center-center"}
                } else {
                    options.position = config ? config.position : {}
                }
                if (config && typeof config.resize_chat !== undefined && typeof config.drag_chat !== undefined) {
                    options.resize = !$.global.pageinchat || !config || config.resize_chat === 0 ? false : true;
                    options.drag = !$.global.pageinchat || !config || config.drag_chat === 0 ? false : true
                } else {
                    options.resize = false;
                    options.drag = true
                }
                chatManageView = $.ntView ? $.ntView.chatManageView : $.chatManageView;
                if ($.ntView && $.browser.mobile) {
                    this.view = new chatManageView(options, this, config.wapTheme)
                } else {
                    this.view = new chatManageView(options, this)
                }
                $(window).bind("beforeunload", function (event) {
                    self.beforeunload(event)
                })
            }
            if (!$.global.pageinchat) {
                $.Capture.captureWithMin = false
            }
            this.view.addChatTag(this.settingid);
            if (!$.browser.mobile) {
                this.hash.each(function (i, chat) {
                    if (chat) {
                        chat.minimize()
                    }
                })
            }
            if (config && config.autoconnect == 1 || $.server.reversechat == "1") {
                $.Log("autoconnect:1");
                noWaitConnect = true
            } else if (config && config.autoconnect == -1) {
                noWaitConnect = false
            } else {
                preTime = $.store.get($.base.CON_LOCAL_FIX + this.settingid);
                if (preTime) {
                    var diff = $.getTime() - preTime;
                    if (diff < 1800 * 1e3) noWaitConnect = true
                }
            }
            try {
                config = $.protocolFilter(config)
            } catch (e) {
                $.Log("error config file: " + e)
            }
            this.chat = this.createChatMode(noWaitConnect, config);
            if ($.browser.mobile && $(".chat-view-window-header").length == 0) {
                this.view._create()
            }
            this.hash.add(this.settingid, this.chat);
            if ($.global.message === "1") {
                this.chat.switchUI("message");
                return
            }
            if ((noWaitConnect || this.chat.requestRobot) && !this.chat.connected) {
                this.chat.start()
            }
            $.store.set($.base.CON_LOCAL_FIX + this.settingid, $.getTime())
        },
        beforeunload: function (event) {
            if (this.hash.count() === 0) {
                return
            }
            if (this.chat.connected && this.chat._sendNum > 0 && this.chat.config.sessioncarry !== 0) {
                $.cache.set("carry_sid", this.chat.settingid);
                $.cache.set("carry_did", this.chat.dest.id)
            } else {
                $.cache.set("carry_sid", "");
                $.cache.set("carry_did", "")
            }
            if (!$.global.pageinchat && !$.browser.mobile) {
                if (this.chat && this.chat.config && this.chat.config.enableevaluation == 1 && this.chat._Evaluable && !this.chat._submitRating) {
                    this.close();
                    if ($.browser.chrome) return $.lang.system_before_evaluation; else $.Event.fixEvent(event).returnValue = $.lang.system_before_evaluation
                } else {
                    setTimeout(function () {
                    }, 500)
                }
            }
        },
        loadConfig: function (settingid, callback, destid) {
            var self = this, chat, config = this.hashConfig.items(settingid);
            url = [$.server.configserver ? $.server.configserver : $.server.flashserver, "config/6/", settingid.split("_").slice(0, 2).join("_"), "_", settingid, ".js#rnd"].join("");
            $.Log("$.chatManage.loadConfig(" + settingid + "):" + url);
            if (!config && !$.isEmptyObject($.base.config) && $.base.config.settingid == settingid) {
                config = config || $.base.config
            }
            if (config && config.service && config.service.tchatgoserver) {
                $.base.hiddenLoading();
                if (destid && destid.indexOf("ISME9754") > -1) {
                    self.hashWait.remove(destid)
                } else {
                    self.hashWait.remove(settingid)
                }
                if (chat = self.verificationDestId(config)) {
                    $.Log("Only one customer to open a chat window", 2);
                    chat.showMessage("system0", {
                        type: 9,
                        msg: $.utils.handleLinks($.lang.system_merge_session, {destname: chat.dest.name})
                    })
                } else {
                    callback.call(this, config)
                }
            } else {
                $.require(url, function (script) {
                    $.base.hiddenLoading();
                    if (destid && destid.indexOf("ISME9754") > -1) {
                        self.hashWait.remove(destid)
                    } else {
                        self.hashWait.remove(settingid)
                    }
                    if (script.error || !nTalk.CONFIG && !NTKF.CONFIG) {
                        if (self.view) {
                            self.view.toggleExpansion("rightElement", false)
                        }
                        callback.call(self, null)
                    } else {
                        config = nTalk.CONFIG || NTKF.CONFIG;
                        self.hashConfig.add(settingid, config);
                        if (chat = self.verificationDestId(config)) {
                            $.Log("Only one customer to open a chat window", 2);
                            chat.showMessage("system0", {
                                type: 9,
                                msg: $.utils.handleLinks($.lang.system_merge_session, {destname: chat.dest.name})
                            })
                        } else {
                            callback.call(self, config)
                        }
                    }
                    setTimeout(function () {
                        delete NTKF.CONFIG;
                        delete nTalk.CONFIG
                    }, 1e3);
                    $(script.error ? script.target : script).remove()
                })
            }
        },
        verificationDestId: function (config) {
            var idList, result = false, tmp;
            if (!config) {
                return false
            } else {
                tmp = config.icon || config.list || config.toolbar || config.featureset || null;
                if (!tmp || !tmp.members.groupID || !tmp.members.idList.length) {
                    $.Log("No valid entry configuration", 3);
                    return false
                }
                idList = tmp.members ? tmp.members.idList : [];
                if (!$.isArray(idList)) {
                    return false
                }
                this.hash.each(function (key, chat) {
                    if ($.inArray(chat.dest.id, idList) > -1 && chat.settingid != config.settingid) {
                        $.Log("opened destid:" + chat.dest.id + ", idList:" + $.JSON.toJSONString(idList), 2);
                        result = chat
                    } else {
                        $.Log("opened destid:" + chat.dest.id + ", idList:" + $.JSON.toJSONString(idList), 1)
                    }
                });
                return result
            }
        },
        createChatMode: function (noWaitConnect, config) {
            var self = this;
            $.Log("nTalk.chatManage.createChatMode():noWaitConnect:" + noWaitConnect, 1);
            return new $.chatMode({
                config: config,
                siteid: $.global.siteid,
                settingid: this.settingid,
                destid: this.destid,
                itemid: this.itemid,
                itemparam: this.itemparam,
                sellerid: this.sellerid,
                single: this.single,
                manual: this.manual,
                htmlsid: this.htmlSID,
                connectid: this.connectId,
                edu_invisitid: this.edu_invisitid,
                edu_visitid: this.edu_visitid,
                usertag: $.global.usertag,
                userrank: $.global.userrank
            }, this)
        },
        get: function (key, destid) {
            if (!this.hash.count()) {
                return null
            }
            if (!key) {
                return this.chat || this.hash.first()
            }
            if (this.hash.contains(key)) {
                return this.hash.items(key)
            }
            if (destid && $.base.checkID(destid) == $.CON_CUSTOMER_ID) {
                for (var k in this.hash.hashTable) {
                    var chat = this.hash.items(k);
                    if (k && this.hash.hashTable.hasOwnProperty(k) && chat.dest.id == destid) {
                        key = chat.settingid
                    }
                }
            }
            if (this.hash.contains(key)) {
                return this.hash.items(key)
            }
            return null
        },
        close: function () {
            $.Log("nTalk.chatManage.close()");
            var settingidstr = this.settingid;
            var self = this, closeChatManage = function () {
                if (!$.global.callStatCount || $.global.callStatCount && $.global.callStatCount.success == 0 && $.global.callStatCount.failure == 1) {
                    $.chatManage.get().callStat("5")
                }
                self.hash.each(function (i, chat) {
                    chat.close()
                });
                self.hash.clear();
                if ($.global.pageinchat) {
                    self.view.close();
                    self.view = null
                } else if ($.browser.mobile) {
                    if ($.global.backURL) {
                        window.open($.global.backURL)
                    } else {
                        history.go(-1)
                    }
                } else {
                    window.opener = null;
                    if (!$.browser.chrome) window.open("", "_self");
                    if (!window.close()) {
                        window.location.href = "about:blank"
                    }
                }
            };
            if (this.chat && this.chat.config && !this.chat._submitRating && this.chat._currentView == this.chat.CON_VIEW_WINDOW && this.chat.config.enableevaluation == 1 && this.chat._Enableevaluation) {
                if (this.chat.showEvaluation(0, function () {
                    closeChatManage();
                    $.base.fire("CloseChatWindow", [{type: 2, settingid: settingidstr || ""}])
                }) === false) {
                    try {
                        closeChatManage();
                        $.base.fire("CloseChatWindow", [{type: 1, settingid: settingidstr || ""}])
                    } catch (e) {
                        $.Log(e, 3)
                    }
                }
            } else {
                try {
                    closeChatManage();
                    $.base.fire("CloseChatWindow", [{type: 1, settingid: settingidstr || ""}])
                } catch (e) {
                    $.Log(e, 3)
                }
            }
        },
        switchChat: function (settingid) {
            $.Log("chatManage.switchChat(" + settingid + ")");
            this.view.switchChatTag(settingid);
            this.callSwitchChat(settingid)
        },
        closeChat: function (settingid) {
            var nextkey = this.hash.next(settingid);
            $.Log("chatManage.closeChat()");
            this.view.removeChatTag(settingid);
            this.switchChat(nextkey);
            this.hash.items(settingid) && this.hash.items(settingid).close();
            this.hash.remove(settingid)
        },
        callVerification: function (settingid, config) {
            var chat;
            $.Log("chatManage._callStart(" + settingid + ", [config Object])");
            if (chat = this.verificationDestId(config)) {
                this.closeChat(settingid);
                return chat
            } else {
                return false
            }
        },
        callManageResize: function (width, height) {
            this.hash.each(function (i, chat) {
                chat.view.callChatResize(width, height)
            })
        },
        callMinimize: function () {
            $.Log("$.chatManage.callMinimize()");
            var self = this, minView;
            minView = $.ntView ? $.ntView.minimizeView : $.minimizeView;
            this.objMinView = new minView(this.chat.dest, this.chat._currentView == this.chat.CON_VIEW_MESSAGE, function () {
                if ($.isFunction(self.view.maximize)) {
                    self.view.maximize()
                }
                self.objMinView = null
            })
        },
        callSwitchChat: function (settingid) {
            var self = this;
            $.Log("chatManage.callSwitchChat(" + settingid + ")");
            this.hash.each(function (i, chat) {
                if (chat.settingid === settingid) {
                    chat.maximize();
                    if (chat.displayMoreData()) {
                        self.view.toggleExpansion("rightElement", false)
                    }
                    self.view.updateRightData(chat.settingid, chat._moreData);
                    self.chat = chat
                } else {
                    chat.minimize()
                }
            })
        },
        callToggleExpansion: function (settingid) {
            var result = this.view.toggleExpansion("rightElement");
            this.hash.each(function (settingid, chat) {
                chat.view.updateMore(result)
            });
            return result
        },
        callToggleExpansionTab: function () {
            return this.view.toggleExpansion("leftElement")
        },
        callConfigLoaded: function (settingid, config, data, startColor, endColor) {
            this.view.updataSkin(config.chatBackground, config.startColor, config.endColor);
            if (data && data.length) {
                this.view.updateRightData(settingid, data)
            }
        },
        showFAQ: function (settingid, title, content, id) {
            var chat = this.hash.items(settingid);
            $.Log("chatManage.showFAQ()");
            if (this.get().config.count_for_faq && this.get().config.count_for_faq == 1) {
                this.requestForCount(id)
            }
            chat.showMessage("otherinfo", {userid: chat.dest.id, type: 9, title: title, msg: content})
        },
        requestForCount: function (id) {
            var time = $.getTime(), url, callBackName, faqQuery;
            callBackName = "ntcount_for_faq_" + $.randomChar();
            $.server.kpiserver = $.protocolFilter($.server.kpiserver);
            if ($.server.kpiserver.charAt($.server.kpiserver.length - 1) === "/") {
                url = $.server.kpiserver + "index.php/api/comment/faq?"
            } else {
                url = $.server.kpiserver + "/index.php/api/comment/faq?"
            }
            faqQuery = $.toURI({
                siteid: this.chat.siteid,
                timesample: time,
                faqid: id,
                kfid: this.get().dest.id,
                settingid: this.chat.settingid,
                vid: $.global.uid || "notloggedin",
                time: time,
                sessionid: this.chat.sessionid,
                callback: callBackName
            });
            window[callBackName] = function (data) {
                $.Log("receive respones from kpiserver for count_for_faq");
                if (data.issuccess == "1000") {
                    $.Log("count_for_faq success . code :" + data.errormsg)
                } else {
                    $.Log("count_for_faq failure . errorCode :" + data.errormsg, 2)
                }
            };
            $.require(url + faqQuery + "#rnd")
        },
        callSetDest: function (settingid, data) {
            if (this.view) {
                this.view.updateChatTag(settingid, data)
            }
            if (this.eduWapAutoView) {
                this.eduWapAutoView.update(settingid, data)
            }
            if (this.objMinView) {
                this.objMinView[data.status === 0 ? "offline" : "online"]()
            }
        },
        callSetDestStatus: function (settingid, data, updateStatus) {
            if (this.view) {
                this.view.updateChatTag(settingid, data, updateStatus)
            }
        },
        callReceive: function (settingid) {
            $.Log("$.chatManage.callReceive()");
            var chat = this.hash.items(settingid);
            if (!chat.selected) {
                this.view.labelFlicker(settingid)
            }
            if (this.objMinView) {
                this.objMinView.count++;
                this.objMinView.startFlicker()
            }
        },
        getHistoryPageCount: function () {
            if (!$.browser.mobile) return -1;
            return $.store.get("history") || -1
        },
        clearHistoryPageCount: function () {
            return $.store.remove("history")
        },
        addHistoryPageCount: function () {
            if (!$.browser.mobile) return -1;
            var currentHistory = $.store.get("history") || "-1";
            currentHistory = parseFloat(currentHistory) - 1;
            $.store.set("history", currentHistory);
            return currentHistory
        }
    };
    $.extend({
        fIM_getSessionCustomerServiceInfo: function (json, settingid) {
            var data, rundestinfo, chat = $.chatManage.get(settingid);
            if (!chat) {
                return
            }
            if ($.isObject(json)) {
                data = json
            } else try {
                data = $.JSON.parseJSON(json.replace(/[\r|\n]/gi, ""))
            } catch (e) {
            }
            chat.callBackCustomerServiceInfo(data);
            rundestinfo = {
                id: data.userid,
                name: data.externalname || data.nickname || "",
                logo: data.usericon || "",
                status: data.status == undefined ? "" : data.status,
                type: data.usertype == undefined ? "" : data.usertype
            };
            $.base.fire("DistributionService", [rundestinfo]);
            return true
        }
    });
    $.extend({
        fIM_tchatFlashReady: function (userid, machineid, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) {
                    $.Log("fIM_tchatFlashReady:settingid:" + settingid, 3);
                    return
                }
                chat._ready(userid, machineid)
            }, 0);
            return true
        },
        fIM_ConnectResult: function (status, userinfo, message, settingid) {
            $.Log("nTalk.fIM_ConnectResult(" + status + ', userinfo, "' + message + '", "' + settingid + '")', 1);
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) {
                    return
                }
                chat._connectResult(status, userinfo, message)
            }, 0);
            return true
        },
        fIM_onGetUserStatus: function (strStatus, settingid) {
            $.Log("nTalk.fIM_onGetUserStatus(" + strStatus + ', "' + settingid + '")', 2);
            return true
        },
        fIM_requestEvaluate: function (userID, userName, settingid) {
            $.Log("nTalk.fIM_requestEvaluate(" + $.JSON.toJSONString(arguments) + ")");
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) {
                    $.Log("fIM_requestEvaluate:settingid:" + settingid, 3);
                    return
                }
                chat.showEvaluation(2)
            }, 0);
            return true
        },
        fIM_notifyUserInputing: function (userId, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) {
                    $.Log("fIM_notifyUserInputing:settingid:" + settingid, 3);
                    return
                }
                chat.showInputState(userId)
            }, 0);
            return true
        },
        fIM_receiveCustomerServiceInfo: function (json, settingid) {
            $.Log('nTalk.fIM_receiveCustomerServiceInfo("' + json + '", "' + settingid + '")');
            return
        },
        fIM_onNotifySessionSence: function (json, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) return;
                chat.notifySessionSence(json)
            }, 0);
            return true
        },
        fIM_notifyUserNumbers: function (currentSubscribers, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) return
            }, 0);
            return
        },
        fIM_notifyUserList: function (destList, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) return;
                chat.notifyUserList(destList)
            }, 0);
            return true
        },
        fIM_onGetUserInfo: function (dest, settingid) {
            $.Log("nTalk.fIM_onGetUserInfo(" + $.JSON.toJSONString(dest) + ", " + settingid + ")", 1);
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) return;
                chat._userInfo(dest)
            }, 0);
            return true
        },
        fIM_notifyUserEnter: function (destid, destinfo, mast, settingid) {
            $.Log("nTalk.fIM_notifyUserEnter(" + destid + ", " + destinfo + ")");
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) return;
                chat.userEnter(destinfo);
                chat._userInfo(destinfo)
            }, 0);
            return true
        },
        fIM_notifyUserLeave: function (destid, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) return;
                chat.userLeave(destid)
            }, 0);
            return true
        },
        fIM_receiveMessage: function (json, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (chat) {
                    chat.receive(json)
                }
            }, 0);
            return
        },
        fIM_eduWapReceiveMessage: function (json, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (chat && chat.eduWapAutoView) {
                    chat.eduWapAutoView.showMessage(json)
                }
            }, 0);
            return
        },
        fIM_suggestMessage: function (json, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (chat) {
                    chat.suggest(json)
                }
            }, 0);
            return
        },
        fIM_onGetFlashServer: function (userInfoUrl, trailUrl, historicalMsgUrl, checkURL, avServer, manageServer, fileServer) {
            return
        },
        fIM_setTChatGoServer: function (tChatFlashGoUrl, settingid) {
            $.Log("nTalk.fIM_setTChatGoServer(" + tChatFlashGoUrl + ")");
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) return;
                chat.setFlashGoServer(tChatFlashGoUrl)
            }, 0)
        },
        fIM_updateUserNumber: function () {
            return
        },
        fIM_callStat: function (method, settingid, result) {
            if ($.global && !$.global.callStatCount) {
                $.global.callStatCount = new Object;
                $.global.callStatCount.success = 0;
                $.global.callStatCount.failure = 0
            }
            if (method == "mqtt" && result == "success" && $.global.callStatCount.success == 0) {
                $.chatManage.get(settingid).callStat("16");
                $.global.callStatCount.success = 1
            } else if (method == "mqtt" && result == "failure" && $.global.callStatCount.failure == 0) {
                $.chatManage.get(settingid).callStat("17");
                $.global.callStatCount.failure = 1
            } else if (method == "flash" && result == "success" && $.global.callStatCount.success == 0) {
                $.chatManage.get(settingid).callStat("14");
                $.global.callStatCount.success = 1
            } else if (method == "flash" && result == "failure" && $.global.callStatCount.failure == 0) {
                $.chatManage.get(settingid).callStat("15");
                $.global.callStatCount.failure = 1
            } else {
                $.log("fIM_callStat: error;")
            }
        }
    });
    $.extend({
        fIM_uploadFlashReady: function (id, action, settingid) {
            setTimeout(function () {
                var chat = $.chatManage.get(settingid);
                if (!chat) {
                    $.Log("nTalk.uploadFlashReady()", 3);
                    return
                }
                chat._uploadReady(action)
            }, 0);
            return true
        }, fIM_startSendFile: function (id, action, strMsg, settingid) {
            var chat = $.chatManage.get(settingid);
            $.Log("nTalk.fIM_startSendFile(" + action + "," + strMsg + ", " + settingid + ")");
            setTimeout(function () {
                chat.startUpload(action, strMsg)
            }, 0);
            return true
        }, fIM_receiveUploadSuccess: function (id, action, data, settingid) {
            var chat = $.chatManage.get(settingid);
            $.Log("nTalk.fIM_receiveUploadSuccess(" + $.JSON.toJSONString(arguments) + ")");
            setTimeout(function () {
                chat.uploadSuccess(action, data)
            }, 0);
            return
        }, fIM_receiveUploadFailure: function (id, action, data, settingid) {
            var chat = $.chatManage.get(settingid);
            $.Log("nTalk.fIM_receiveUploadFailure(" + $.JSON.toJSONString(arguments) + ")");
            setTimeout(function () {
                chat.uploadFailure(action, data)
            }, 0);
            return
        }, fIM_receiveUploadProgress: function (id, action, data, settingid) {
            var chat = $.chatManage.get(settingid);
            setTimeout(function () {
                chat.uploadProgress(action, data)
            }, 0);
            return true
        }
    });
    $.extend({
        viewPortContent: null, clearSessionCache: function () {
            var self = this, ret;
            if (!$.base || !$.base.clearChatCache) {
                $.Log("no clear chat cache");
                return
            }
            try {
                ret = $.store.getAll()
            } catch (e) {
                $.Log("$.store:" + typeof $.store, 3)
            }
            if (!ret) return;
            $.each(ret, function (k) {
                if (k.toString().indexOf($.base.CON_LOCAL_FIX) > -1) {
                    self.store.remove(k)
                }
            });
            $.Log("clear chat cache")
        }, sendErpNews: function () {
            var ip = "", country = "", province = "", city = "";
            if ($.global.trailGetRegion) {
                if ($.global.trailGetRegion.ip) {
                    ip = $.global.trailGetRegion.ip
                }
                if ($.global.trailGetRegion.country) {
                    country = $.global.trailGetRegion.country
                }
                if ($.global.trailGetRegion.province) {
                    province = $.global.trailGetRegion.province
                }
                if ($.global.trailGetRegion.city) {
                    city = $.global.trailGetRegion.city
                }
            }
            $.waitMessage.verificationAdd($.getTime(1), {
                type: 5,
                msg: {
                    msgtype: 7,
                    param: $.global.erpparam + "|lang=" + ($.global.lang || $.language) + '|{"ip":"' + ip + '","country":"' + country + '","province":"' + province + '","city":"' + city + '"}'
                }
            })
        }, chatReady: function () {
            var self = this;
            this.trailGetRegionCount = 0;
            if (!$.waitMessage) {
                $.waitMessage = new $.HASH;
                $.waitMessage.verificationAdd = function (key, data) {
                    var exists = false;
                    this.each(function (k, body) {
                        if (body.type == data.type && body.msg.msgtype == data.msg.msgtype) exists = true
                    });
                    if (!exists) {
                        this.add(key, data)
                    }
                }
            }
            $.waitMessage.verificationAdd($.getTime(1), {
                type: 5,
                msg: {
                    msgtype: 2,
                    parentpagetitle: ($.global.title || $.title).toString().substr(0, 32),
                    parentpageurl: $.global.source || $.source,
                    userlevel: $.global.isvip,
                    sences: ""
                }
            });
            if ($.global.trailGetRegion && $.global.trailGetRegion.success && $.global.trailGetRegion.success == true) {
                this.sendErpNews()
            } else {
                this.trailGetRegionTimer = setInterval(function () {
                    self.trailGetRegionCount++;
                    if ($.global.trailGetRegion && $.global.trailGetRegion.success == true || self.trailGetRegionCount >= 4) {
                        self.sendErpNews();
                        clearInterval(self.trailGetRegionTimer);
                        self.trailGetRegionCount = 0
                    }
                }, 500)
            }
            $.Log("$.chatReady():: $.waitMessage.count():" + $.waitMessage.count(), 1);
            if (!$.themesURI && $.browser.mobile) {
                $.imageicon = $.sourceURI + "images/mobileicon.png";
                $.rengong = $.sourceURI + "images/rengong.png"
            } else if (!$.themesURI) {
                $.imageicon = $.sourceURI + "images/chaticon." + ($.browser.msie6 ? "gif" : "png");
                $.imagebg = $.sourceURI + "images/chatbg.gif"
            }
            $.imagesingle = $.sourceURI + "images/single.png";
            $.imagemultiplayer = $.sourceURI + "images/multiplayer.png";
            $.button = $.sourceURI + "images/button.png";
            $.button2 = $.sourceURI + "images/button2.png";
            $.require([$.imageicon], function (element) {
                if (element.error) {
                    $.Log("cache chat icon failure", 3)
                }
            });
            $.clearSessionCache()
        }
    });
    $.chatReady()
})(nTalk);