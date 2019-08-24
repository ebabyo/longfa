define("KUYU.navHeader", ["KUYU.Service", "KUYU.userInfo", "KUYU.Binder", "KUYU.navFooterLink"], function () {
    var e = KUYU.userInfo, o = KUYU.RootScope, n = KUYU.Init, t = KUYU.navFooterLink, i = KUYU.Service, c = KUYU.Binder;
    n.cookie(), t();
    var U = function (t) {
        e(function (e) {
            $.isFunction(t) && t(e);
            e.data;
            $("#exit").on("click", function () {
                i.get({
                    url: "/tclcustomer/logout", success: function (e) {
                        e.code != CODEMAP.status.success && e.code != CODEMAP.status.TimeOut && 103 != e.code || (window.location.href = "../index/index.html", localStorage.removeItem("CartNum"), localStorage.removeItem("_ihome_token_"), $.removeCookie("ihome-token", {path: "/"}), $.removeCookie("fanliCookie", {path: "/"}))
                    }
                })
            }), c.init(), o.navLogin = function () {
                n.nextPage("login", "")
            }
        })
    };
    _APP.inject("KUYU.navHeader", U)
});