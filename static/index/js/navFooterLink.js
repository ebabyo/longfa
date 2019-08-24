define("KUYU.navFooterLink", ["KUYU.Service", "KUYU.Header", "KUYU.Binder", "KUYU.Store"], function () {
    var e = (KUYU.Service, KUYU.Init, KUYU.Store, KUYU.Init.getParam(), KUYU.Init.getEnv(), KUYU.Init.getService(), function () {
        $(".help").html('<div class="min-wid"><dl><dt>帮助中心</dt><dd><a target="_blank" rel="nofollow" href="/pages/service/toHelp.html?hid=1">购物指南</a></dd><dd><a target="_blank" rel="nofollow" href="/pages/service/toHelp_pay.html">支付方式</a></dd><dd><a target="_blank" rel="nofollow" href="/pages/service/toHelp_send.html">配送方式</a></dd><dd><a target="_blank" rel="nofollow" href="/pages/service/toHelp_terms.html">交易条款</a></dd><dd><a target="_blank" rel="nofollow" href="/pages/service/toHelp_invoice.html">电子发票</a></dd></dl><dl><dt>服务支持</dt><dd><a target="_blank" rel="nofollow" href="/page/serviceRevision/policy?id=56d4f28d21ca473f871a3b845f61aee9" class="__md_shfw">售后服务</a></dd><dd><a target="_blank" rel="nofollow" href="/pages/serviceRevision/repair.html">自助服务</a></dd><dd><a target="_blank" rel="nofollow" href="/pages/service-home/index.html#query-wrapper">进度查询</a></dd><dd><a target="_blank" rel="nofollow" href="http://fans.tcl.com/uec/operation">用户体验中心</a></dd><dd><a target="_blank" rel="nofollow" style="color:red" href="http://www.tcl.com/pages/serviceRevision/autoCheck.html">视频教程</a></dd></dl><dl><dt>客户服务</dt><dd><a style="color:red" target="_blank" rel="nofollow" href="http://staff.tcl.com/">内购平台</a></dd><dd><a target="_blank" rel="nofollow" href="/pages/bulkpurchase/newBulkpurchase.html">企业采购</a></dd><dd><a target="_blank" rel="nofollow" href="http://www.tcl.com/dealer/toLogin">经销商之家</a></dd><dd><a target="_blank" rel="nofollow" href="http://www.shifendaojia.com/index.html">十分到家</a></dd></dl><dl><dt>关注我们</dt><dd><a target="_blank" rel="nofollow"href="/pages/connectWithUs/connectWithUs.html">联系我们</a></dd><dd><a target="_blank" rel="nofollow" class="botSina" href="http://weibo.com/tcljituan?topnav=1&wvr=6&topsug=1&is_hot=1">官方微博</a></dd><dd><a target="_blank" rel="nofollow" href="http://fans.tcl.com/">铁粉社区</a></dd></dl><dl><dt>应用服务</dt><dd><a target="_blank" rel="nofollow" href="http://www.leiniao.com/">雷鸟</a></dd><dd><a target="_blank" rel="nofollow" href="http://www.huan.tv/">欢网</a></dd><dd><a target="_blank" rel="nofollow" href="https://jr.tcl.com/home.html">金融</a></dd><dd><a target="_blank" rel="nofollow" href="http://www.imooc.com/">教育</a></dd><dd><a target="_blank" rel="nofollow" href="http://www.golive-tv.com/">全球播</a></dd></dl> <dl>    <dt>TCL官网商城</dt>    <dd><img style="height:120px;width:120px;" src="../../app/images/wechat.jpg"></dd></dl><dl class="last-r"><p class="red phone">4008-123456</p><p class="grey">（24小时在线，仅收市话费）</p><a href="/pages/service/customerServiceKuyu.html" target="_self"><i>&#xe64a;</i>24小时在线客服</a></dl></div>'), $(".footer").html('<div><div class="foot-logo">&#xe674;</div><p class="blod"><a target="_blank" rel="nofollow" href="/group/companyInfo/index">关于TCL</a>|<a target="_blank" rel="nofollow" href="/group/investors/index">投资者关系</a>|<a target="_blank" rel="nofollow" href="/group/societyDuty/index">社会责任</a>|<a rel="nofollow" target="_blank" href="/group/news/index">新闻中心</a>|<a rel="nofollow" target="_blank" href="http://zhaopin.tcl.com/">人才招聘</a>|<a target="_blank" rel="nofollow" href="/group/companyInfo/slipPath?type=6">成员网站</a></p><p>©2010-2018 TCL CORPORATION All Rights Reserved. TCL集团股份有限公司版权所有 粤ICP备05040863号<a target="_blank" rel="nofollow" class="marginL" href="/pages/low/content.html">使用条款</a>|<a target="_blank" rel="nofollow" href="http://www.tcl.com/group/companyInfo/slipPath?type=5">法律声明</a>|<a rel="nofollow" target="_blank" href="/group/companyInfo/slipPath?type=4">隐私保护</a></p><p><a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=44133002100088" rel="nofollow"><img style="margin: -3px 3px 0 0; width:16px;" src="/app/images/beian.png">粤网公安备案44133002100088号</a></p><div class="foot-r"><div class="language"><a href="/pages/index/index.html" class="lang-item active" rel="nofollow">中文简体</a>|<a href="http://news.tcl.com/English.php/index/index.html" rel="nofollow" class="lang-item ">English</a></div></div></div><div class="AC">    <div><img src="/app/images/credibility.png"/></div></div>');
        location.host.indexOf(".tcl.com") > -1 && function () {
            var e = document.createElement("script");
            e.src = "https://hm.baidu.com/hm.js?34c66f7b3d3ed0d0791c81ebe5ee7340";
            var t = document.getElementsByTagName("script")[0];
            t.parentNode.insertBefore(e, t)
        }(), function (e, t, a, l, o, r) {
            var d = "", n = e.sessionStorage, i = "__admaster_ta_param__";
            if (e.admaster_tm = {}, e[l] = e[l] || [], e[l].push({startTime: +new Date, event: "tm.js"}), n) {
                var s = e.location.search, c = new RegExp("[?&]" + i + "=(.*?)(&|#|$)").exec(s) || [];
                c[1] && n.setItem(i, c[1]), (c = n.getItem(i)) && (d = "&p=" + c + "&t=" + +new Date)
            }
            var p = t.createElement(a), h = t.getElementsByTagName(a)[0];
            p.src = "//tag.cdnmaster.cn/tmjs/tm.js?id=TM-I92QS0" + d, p.async = !0, h.parentNode.insertBefore(p, h)
        }(window, document, "script", "tmDataLayer"), function (e, t, a, l, o) {
            e[o] = e[o] || function () {
                (e[o].q = e[o].q || []).push(arguments)
            }, a = t.createElement("script"), tag = t.getElementsByTagName("script")[0], a.async = 1, a.src = ("https:" == document.location.protocol ? "https://" : "http://") + "assets.growingio.com/2.1/gio.js", tag.parentNode.insertBefore(a, tag)
        }(window, document, "script", 0, "gio"), gio("init", "9f54f1ba402ad7b8", {}), gio("send")
    });
    _APP.inject("KUYU.navFooterLink", e)
});