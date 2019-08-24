/**
 * Created by 18776978844 on 2016/11/30.
 */
require(['KUYU.Service', 'KUYU.Binder','KUYU.Header', 'KUYU.navHeader','KUYU.navFooterLink','KUYU.plugins.alert','xss'], function () {

    var $http = KUYU.Service,
        $init = KUYU.Init,
        navHeader = KUYU.navHeader,
        navFooterLink = KUYU.navFooterLink;
        $init.cookie();

    //提交订单需要的参数，下面是返利网需要的参数
    var params = {
    };

    if($.cookie('fanliCookie')){
    	var all = JSON.parse($.cookie('fanliCookie'));
	    params.channel_id = all.channel_id;
	    params.tc = all.tc;
	    params.uid = all.uid;
	    params.s_id = all.s_id;
	    params.uname = all.uname;
	    params.platform = all.platform;
    }

    var stripscript = function(s) {
        var pattern = new RegExp("[^0-9A-Za-z，。？！、,.?!\u4e00-\u9fa5]");
            var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs;
    }
    $(document).on('keyup change','#buyerMsg',function(){
	    let _this = $(this),_len = _this.val().length;
	    if(_len > 500) return false;
	    _this.next('#zishu').children('i').text(_len);
        $('#buyerMsg').val(stripscript($('#buyerMsg').val()))
	})

	$(document).on('keyup change','#buyerMsg',function(){
	    let _this = $(this),_len = _this.val().length;
	    if(_len > 500) return false;
	    _this.next('#zishu').children('i').text(_len);
	})
    $(document).on('click', '.submitForm', function() {
    	if($("#electron_titleContent").val() == "" && $("#invoiceCate").val() =="2"){
    		Msg.Alert("","请填写电子发票！",function(){});
    		return
    	}
    	else{
        _smq.push(['custom', 'PC', 'tijiao']); //ad
    	$(".submit").removeClass("submitForm");
		$(".submit").addClass("disabled");
        var checkArea = $("#checkArea").val();
        var area = $("input[name='area']").val();
        var invoiceCate = $("#invoiceCate").val();
        var invoiceUuid = $("#electron_titleContent").attr("uuid")?$("#electron_titleContent").attr("uuid"):""
        var electron_titleContent = filterXSS($("#electron_titleContent").val());
        var electron_invoiceContent = $("#electron_invoiceContent").val();
        var electron_ratepayer = $("#electron_ratepayer").val(); //纳税人识别号
        var add_uuid = $("#add_uuid").val();
        var add_companyName = filterXSS($("#add_companyName").val());
        var add_code = filterXSS($("#add_code").val());
        var add_address = filterXSS($("#add_address").val());
        var add_registerMobile = filterXSS($("#add_registerMobile").val());
        var add_bankName = filterXSS($("#add_bankName").val());
        var add_bankNo = filterXSS($("#add_bankNo").val());
        var jifenPromotionUUID = $("#jifenPromotionUUID").val();
        var integralReduceNum = $("#integralReduceNum").val();
        var totalMoneyShow = parseFloat($("#totalMoneyShow").attr("orginvalue"));

        var productPrice_List = $("input[name ^='productPrice_']");
        var productBasePrice_List = $("input[name ^='productBasePrice_']");
        var productNowPrice_List = $("input[name ^='productNowPrice_']");
        var affix_List = $("input[name ^='affix_']");
        var shipType_List = $("input[name ^='shipType_']");
        var cartTotal_List = $("input[name ^='cartTotal_']");
        var storeReduce_List = $("input[name ^='storeReduce_']");
        var storePromotion_List = $("input[name ^='storePromotion_']");
        var productGiftIds_List = $("input[name ^='productGiftIds_']");
        var productNum_List = $("input[name ^='productNum_']");
        var productDetail_List = $("input[name ^='productDetail_']");
        var suitNum_List = $("input[name ^='suitNum_']");

        params.checkArea = checkArea;
        params.area = area;
        params.invoiceCate = invoiceCate;
        params.jifenPromotionUUID =jifenPromotionUUID;
        params.integralReduceNum =integralReduceNum;
        params.totalMoneyShow = totalMoneyShow;

        var storeUuid = $("#storeUuid").val();
        var affix_storeUuid = $("#affix_" + storeUuid).val();
        var shipType_storeUuid = $("#shipType_storeUuid_" + storeUuid).val();
        var cartTotal_ = $("#cartTotal_" + storeUuid).val();



        if (invoiceCate == "2") {  //电子发票
        	params.invoiceUuid = invoiceUuid
            params.electron_titleContent = electron_titleContent;
            params.electron_invoiceContent = electron_invoiceContent;
            params.electron_code = electron_ratepayer;
        }
        else if (invoiceCate == "3") {
            params.invoiceUuid = add_uuid;
            params.add_companyName = add_companyName;
            params.add_code = add_code;
            params.add_address = add_address;
            params.add_registerMobile = add_registerMobile;
            params.add_bankName = add_bankName;
            params.add_bankNo = add_bankNo;
        }
        if($.cookie('tkcid')){
            params.recommender=$.cookie('tkcid')
        }
        //获取商品价格信息;
        $.each(productPrice_List, function (key, productPrice) {
            params[productPrice.name] = productPrice.value;
        });

        $.each(productBasePrice_List, function (key, productBasePrice) {
            if (productBasePrice.value) {
                params[productBasePrice.name] = productBasePrice.value;
            }
        });

        $.each(productNowPrice_List, function (key, productNowPrice) {
            params[productNowPrice.name] = productNowPrice.value;
        });

        $.each(cartTotal_List, function (key, cartTotal) {
            params[cartTotal.name] = cartTotal.value;
        });

        $.each(affix_List, function (key, affix) {
            params[affix.name] = affix.value;
        });

        $.each(shipType_List, function (key, shipType) {
            params[shipType.name] = shipType.value;
        });

        $.each(storeReduce_List, function (key, storeReduce) {
            params[storeReduce.name] = storeReduce.value;
        });

        $.each(storePromotion_List, function (key, storePromotion) {
            params[storePromotion.name] = storePromotion.value;
        });

         $.each(productNum_List, function (key, productNum_) {
            params[productNum_.name] = productNum_.value;
        });

        $.each(productGiftIds_List, function (key, productGiftIds) {
       		params[productGiftIds.name] = productGiftIds.value;
        });

        $.each(productDetail_List, function (key, productDetail) {
       		params[productDetail.name] = productDetail.value;
        });

        $.each(suitNum_List, function (key, suitNum) {
       		params[suitNum.name] = suitNum.value;
        });

		params['storeNote_'+storeUuid] = $('#buyerMsg').val();
        //优惠券
        $(".m_odd").each(function (key, value) {
            if ($(this).hasClass("active")) {
                params['storeCoupon_'+$(this).attr("storeUuid")] = $(this).attr("id");
                params['storeCouponReduce_'+$(this).attr("storeUuid")] = $("#couponemmoney").val();
            }
        });

        var url = '/cart/saveOrderKuyu';
        $init.getHeaders()['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
        setTimeout(function(){
	        $http.post({
	            url: url,
	            data: params,
	            success: function (res) {
	            	if(res.code== "403"||res.code== "-6"){
						window.location.href = "http://user.tcl.com/proxy/login";
					}
	            	else if(res.code == 10){
	            		if(res.message=="库存不足"){
	            			Msg.Alert("","该区域库存不足!",function(){});
	            			$(".submit").removeClass("disabled");
	                		$(".submit").addClass("submitForm");
	            		}else{
	            			window.location.href = "backcart.html";
	            		}
	                }
	                else if (res.code == 0) {

	                    var payOrderId = res.payOrderId;
	                    var isGroup = res.isGroup;

                        _smq.push(['custom', 'PC', 'order', payOrderId]); //ad

                      //  _gsq.push(["T", "GWD-002914-F6ABA6", "addOrder",payOrderId , totalMoneyShow]);

                        url = "/orderpay/toOrderPayKuyu";
	                    $init.getHeaders()['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
	                    $http.post({
	                        url: url,
	                        data: {
	                            payOrderUuid: payOrderId,
	                            payOrderType: isGroup
	                        },
	                        success: function (res) {
	                        	if(res.code== "403"||res.code== "-6"){
									window.location.href = "http://user.tcl.com/proxy/login"
								}
	                        	if(res.code == "1"){
	                        		Msg.Alert("","下单成功!",function(){});
	                        		window.location.href = '../orderList/orderList.html?1'
	                        	}
	                        	if(res.code == "0"){
	                        		var a = new Date().getTime();
		                            var res = JSON.stringify(res);
		                            sessionStorage.setItem("cl" + a, res);
		                            window.location.href = "../toOrderPayKuyu/toOrderPayKuyu.html?cl" + a;
	                        	}
	                        }
	                    });

	                }
	                else {
	                	if(!res.message){
	                		Msg.Alert("",res.msg || '系统出错',function(){});
                            params = {}
	                	}
	                	else{
	                		Msg.Alert("",res.message || '系统出错' ,function(){});
                            params = {}
	                	}
	                    $(".submit").removeClass("disabled");
	                	$(".submit").addClass("submitForm");
	                }
	            },
	            error: function (res) {

	            }
	        })
	        },10)
		}
    })

   if(!Array.isArray) {
        $("input[type='text'], input[type='password'], textarea").placeholder();
   }
});
