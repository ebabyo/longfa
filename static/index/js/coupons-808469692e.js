/*
 * Created by weidongjian   on 2016/11/24.
 */
require(['KUYU.Service', 'KUYU.Binder', 'juicer', 'KUYU.plugins.alert'], function() {

	var $http = KUYU.Service;
	var $param = KUYU.Init.getParam();
	var $init = KUYU.Init;
	var limitPromotionUuid = $param.promotionUuid; //秒杀活动， 暂时用不到~废弃
	var huodong = "";//促销信息的展示
	var products = [];//优惠券的传参
	var youhuiquan = {};//优惠券传参
	var total= {};//总价格
	$(function() {
		setTimeout(function(){
			goodsList();
		},300)

		//设置最大优惠券值
		var checkcoupon = $("#checkcoupon").val();
		$(".checkbox.m_odd").each(function() {
			var id = $(this).attr("id");
			if(id == checkcoupon) {
				chickCoupon($(this));
			}
		});

	});

	//更新优惠券列表
	function couplist(res,codeUuid,data){

		var url = '/order/toBalanceKuyu';
		$http.post({
			url: url+'?t='+Math.random(),
			success: function(res) {
				couponTotal(res,2,codeUuid,data)
			}
		})
	}

	//商品列表
	function goodsList() {
		var url = '/order/toBalanceKuyu';

		$http.post({
			url: url+'?t='+Math.random(),
			data: {},
			success: function(res) {
				if(res.code == 10) {
						Msg.Alert("","订单已提交，请勿重复提交",function(){
							window.location.href = "../cart/cart.html"
					})
				}
				else if(res.cartManagerList){
					total.money=res.orderTotalMoney;
					toGoodsListHtml(res);

					_integral(res);
					totalMoney(res);
					isCoupon(res);
		            var kefuList = [];
		            var _res = res.cartManagerList;
		            if(_res[0].detailModelList.length>0) {
		                $.each(_res[0].detailModelList, function (i, o) {
		                    kefuList.push({id:o.productUuid, count: o.buyNum})
		                });
		            }

					setTimeout(function () {
						var nickName = $("#onlyName").text();
						var id = $("#onlyName").data("id");
						NTKF_PARAM && NTKF && NTKF.im_updatePageInfo({
							uid:id,                         //用户ID，未登录可以为空，但不能给null，uid赋予的值在显示到小能客户端上
							uname:nickName,             //用户名，未登录可以为空，但不能给null，uname赋予的值显示到小能客户端上
							isvip:"0",                           //是否为vip用户，0代表非会员，1代表会员，取值显示到小能客户端上
							userlevel:"1",                       //网站自定义会员级别，0-N，可根据选择判断，取值显示到小能客户端上
							erpparam:"abc",                      //erpparam为erp功能的扩展字段，可选，购买erp功能后用于erp功能集成
							ntalkerparam:{                       //购物车专属参数，
								 cartprice :total.money,	              	//购物车总价
	　　		                   items:kefuList		                    //注意：这里是items
							}
						});
					},1e3)
				}
				else{
					Msg.Alert("","登录已过期，请重新登录",function(){
						$init.nextPage("login",'')
					})
				}

			}
		})

	}
	var promotionTypeDic = {
			1:"满减",
			4:"满赠",
			5:"打折",
			6:"满折",
			7:"买减",
		};
	//商品详情
	function toGoodsListHtml(res) {
		if(res.splitError) {
			$(".font10").show();
			$("#submitForm").addClass("disabled");
			var infoTxt = "无货";
			$("#submitForm").html(infoTxt);
		} else {
			$(".font10").hide();
		}

		var tpl = "$${cartManagerList|cut}" + "$${cartManagerList,stockMap,addressList|list}";
		var list = function(cartManagerList, stockMap, addressList) {
            var addressList =addressList ||[];
            //var stockMap = stockMap || {};
			var html = '';
			var promotion_reduce_money = 0,
				real_total_money = 0,
				real_total_num = 0,
				totalmoney = 0;
            var addressDefault = null
            for (var i = 0; i < addressList.length; i++) {
                var val = addressList[i]
                if(val.isDefault === '1') {
                    addressDefault = val
                }
            }
			$.each(cartManagerList, function(key, cartManager) {
				var storePromotionsList = cartManager.storePromotionsList;
				var cartManagerDetail = cartManager.detailModelList;
				promotion_reduce_money = promotion_reduce_money + parseFloat(cartManager.reduceMoney);
				html +=
					'<input type="hidden" name="affix_' + cartManager.storeUuid + '" id="affix_' + cartManager.storeUuid + '" value="' + cartManager.affix + '" />' +
					'<input type="hidden" name="shipType_' + cartManager.storeUuid + '" id="shipType_' + cartManager.storeUuid + '" value="1" />' +
					'<input type="hidden" name="cartTotal_' + cartManager.storeUuid + '" id="cartTotal_' + cartManager.storeUuid + '" value="' + cartManager.totalMoney + '" />' +
					'<input type="hidden" name="storeReduce_' + cartManager.storeUuid + '" id="storeReduce_' + cartManager.storeUuid + '" value="' + cartManager.reduceMoney + '"/>' +
					'<input type="hidden" name="storeUuid"  id= "storeUuid" value="' + cartManager.storeUuid + '"/>';


				for(var i = 0; i < cartManagerDetail.length; i++) {

					totalmoney = totalmoney + parseFloat(cartManagerDetail[i].basePrice * cartManagerDetail[i].buyNum);
					real_total_money = real_total_money + parseFloat(cartManagerDetail[i].totalPrice);
					real_total_num = real_total_num + parseFloat(cartManagerDetail[i].buyNum);

					if(cartManagerDetail[i].productGiftIds && cartManagerDetail[i].productGiftIds.length > 0) {
						var gift = "";
						for(var m = 0; m < cartManagerDetail[i].productGiftIds.length; m++) {
							// for(var z=0;z<cartManagerDetail[i].buyNum;z++){
							// html += '<input type="hidden" name="giftIds_" value="' + cartManagerDetail[i].productGiftIds[m] + '" />';
							gift += cartManagerDetail[i].productGiftIds[m]+ ","
							// }
						}
							html +='<input type="hidden" name="productGiftIds_' +cartManagerDetail[i].attrAndValue+ '" value="'+gift+'" />';
					}
					html +='<input type="hidden" name="productUuid' + '" value="' + cartManagerDetail[i].productUuid + '" />' +
							'<input type="hidden" name="productCost' + '" value="' + cartManagerDetail[i].totalretailPrice + '" />';
					if(cartManagerDetail[i].nowPromotion){
						html +='<input type="hidden" name="productDetail_' +cartManagerDetail[i].attrAndValue +'" value="' + cartManagerDetail[i].nowPromotion + '" />'
					}



					if(cartManagerDetail[i].suitUuid) {
						html +=
							'<input type="hidden" name="productPrice_' + cartManagerDetail[i].attrAndValue + '_' + cartManagerDetail[i].suitUuid + '" value="' + cartManagerDetail[i].totalPrice + '" />' +
							'<input type="hidden" name="productBasePrice_' + cartManagerDetail[i].attrAndValue + '_' + cartManagerDetail[i].suitUuid + '" value="' + cartManagerDetail[i].basePrice + '" />' +
							'<input type="hidden" name="productNowPrice_' + cartManagerDetail[i].attrAndValue + '" value="' + cartManagerDetail[i].nowPrice + '" />'+
							'<input type="hidden" name="productNowPrice_' + cartManagerDetail[i].attrAndValue + '" value="' + cartManagerDetail[i].nowPrice + '" />'+
							'<input type="hidden" name="suitNum_' + cartManagerDetail[i].suitUuid + '" value="' + cartManagerDetail[i].buyNum + '" />'
					} else {
						html += '<input type="hidden" name="productPrice_' + cartManagerDetail[i].attrAndValue + '" value="' + cartManagerDetail[i].totalPrice + '" />' +
							'<input type="hidden" name="productBasePrice_' + cartManagerDetail[i].attrAndValue + '" value="' + cartManagerDetail[i].basePrice + '" />' +
                            '<input type="hidden" name="productNowPrice_' + cartManagerDetail[i].attrAndValue + '" value="' + cartManagerDetail[i].nowPrice + '" />'+
							'<input type="hidden" name="productNum_' + cartManagerDetail[i].attrAndValue +'" value="' + cartManagerDetail[i].buyNum + '" />'
					}
					if(cartManager.storePromotionsList && cartManager.storePromotionsList.length > 0) {
						for(var h = 0; h < storePromotionsList.length; h++) {
							if(storePromotionsList[h].promotionSkus[0] == cartManagerDetail[i].attrAndValue){
							html += '<div class="discount_fullcut">' +
								'<div class="fl"><span>' + (promotionTypeDic[storePromotionsList[h].promotionTypes[0]] ? promotionTypeDic[storePromotionsList[h].promotionTypes[0]] : '') +': '+ storePromotionsList[h].promotionName + '</span></div></div>';
							}
						}
					}
					html += '<div class="count-item"><dl class="clearfloat">' +
						'<dt class="pro-text">';
					if(limitPromotionUuid) {
						html += '<span class="limit">秒杀</span>'
					}
					html += '<img src=' + cartManagerDetail[i].productImgUrl + ' style="width:50px;height:50px"/>' + cartManagerDetail[i].productName;
					if(!limitPromotionUuid) {
						if(cartManagerDetail[i].suitUuid) {
							html += '<font style="color:red">(套装：' + res.suitMap[cartManagerDetail[i].suitUuid].name + ')</font>'
						}

						html += '<br/>';
						if(cartManagerDetail[i].productGiftLists && cartManagerDetail[i].productGiftLists.length > 0) {
							for(var j = 0; j < cartManagerDetail[i].productGiftLists.length; j++) {
								var gif = cartManagerDetail[i].productGiftLists;
								html += '<label class="y_iptlabel m_checkbox">' +
									'<span style="color: red;">赠品:</span>' +
									'<a>' +
									'<span style="padding-left: 0px;">' + gif[j].productName + 'x' + cartManagerDetail[i].buyNum + '</span>' +
									'</a>' +
									'</label><br/>'
							}

						} else {
							//<!-- 活动名称 -->
							if(cartManagerDetail[i].promotionName) {
								html += '<label class="y_iptlabel m_checkbox">' +
									'<span style="color: red;">活动:</span>' +
									'<span style="padding-left: 0px;">' + cartManagerDetail[i].promotionTag + '&nbsp;&nbsp;&nbsp;' + cartManagerDetail[i].promotionName + '</span>' +
									'</label>'
							}
						}

					}
					youhuiquan.productUuid = cartManagerDetail[i].productUuid;
					youhuiquan.productCost = cartManagerDetail[i].totalretailPrice;
					youhuiquan.storeUuid = cartManager.storeUuid;
					products.push(youhuiquan);
					youhuiquan = {};
                    var hasGoods = '无货';
                    if(stockMap){
                       hasGoods = stockMap[cartManagerDetail[i].productUuid]
                    }

					html += '</dt>' +
						'<dd class="num-text">' +
						cartManagerDetail[i].basePrice + '元 x' + cartManagerDetail[i].buyNum +
						'</dd>' +
						'<dd class="goo-text" productuuid="' + cartManagerDetail[i].productUuid + '">';
                    if(stockMap) {
                        html += hasGoods
                    }
					if(addressDefault&&(addressDefault.street === "00" || addressDefault.street === "")) {
                        $('#showStores>.warning').html('请补全街道信息后下单')
                        setTimeout(function() {
                            $('.count-item .goo-text').html('')
                        }, 200)
					}
					if(hasGoods === '无货' && addressDefault &&addressDefault.street != "00" || (hasGoods === '无货' &&addressDefault&& addressDefault.street == "")) {
                        $('#showStores>.warning').html('抱歉，您购物车中的部分商品或者赠品暂时缺货，请选择其他送货地区或者购买其他商品')
                    }
					html += '</dd>' +
						'<dd class="pri-text">' + cartManagerDetail[i].totalPrice + '元';
					if(cartManagerDetail[i].totalretailPrice > cartManagerDetail[i].totalPrice) {
						html += '<s style="color:gray;font-size:12px;"> ' + (cartManagerDetail[i].totalretailPrice).toFixed(2) + '元</s>'
					}
					//				if(limitPromotionUuid != '') {
					//					html += '<span class="num-tip">秒杀价</span>'
					//				}
					html += '</dd>' +
						'</dl>';
					if(cartManagerDetail[i].nowPromotion && !cartManagerDetail[i].productGiftLists) {
						html += '<p><span style="color: red">活动:</span> ' + cartManagerDetail[i].promotionName + '&nbsp;' + cartManagerDetail[i].promotionTag + '</p>'
					}
					html += '</div>';
				}

				html += '<input type="hidden" id="hdn_promotion_reduce_money" value="' + promotion_reduce_money + '"/>' +
					'<input type="hidden" id="hdn_real_total_money" value="' + real_total_money + '"/>' +
					'<input type="hidden" id="hdn_real_total_num' + key + '" value="' + real_total_num + '"/>' +
					'<input type="hidden" name="totalmoney" id="totalmoney' + key + '" value="' + totalmoney + '"/>' +
					'<input type="hidden" id="couponemmoney" value="0"/>';

			});

			return html

		};
		juicer.register('list', list);

		//满减标志
		var cut = function(cartManagerList) {
			var html = "";
			$.each(cartManagerList, function(key, cartManager) {
				var storePromotionsList = cartManager.storePromotionsList;
				if(storePromotionsList) {
					for(var i = 0; i < storePromotionsList.length; i++) {
						html += '<div class="discount_fullcut">'
							// '<div class="fl"><span>' + (promotionTypeDic[storePromotionsList[i].promotionTypes[0]] ? promotionTypeDic[storePromotionsList[i].promotionTypes[0]] : '') +': '+ storePromotionsList[i].promotionName + '</span></div>';
                      	if (storePromotionsList[i].promotionTypes[0] == "6") {
                         	 html += '<div class="fr"><span>活动优惠价：' + storePromotionsList[i].reduceMoney + '元</span></div>'
                   		   }
						if(storePromotionsList[i].productGiftList.length > 0) {
							for(var m = 0; m < storePromotionsList[i].productGiftList.length; m++) {
								huodong += '<p><span style="color: red">订单赠品:</span><a target="_blank" href = "../productDetail/productDetail.html?uuid='+storePromotionsList[i].productGiftList[m].productUuid+'">' + storePromotionsList[i].productGiftList[m].productName + '</a> </p>';
							}

						}

						html +=
							'<input type="hidden" name="storeReduce_' + cartManager.storeUuid + '" value="' + cartManager.reduceMoney + '" />' +
							'<input type="hidden" id="storePromotion_' + cartManager.storeUuid + '"  name="storePromotion_' + cartManager.storeUuid + '" value="' + storePromotionsList[i].promotionUuid + '" />';
						html += '</div>'
						//订单赠品传的参数（可能用不到）
						if(storePromotionsList[i].productGiftIds && storePromotionsList[i].productGiftIds.length > 0){
							for(var m = 0; m < storePromotionsList[i].productGiftIds.length; m++) {
								html += '<input type="hidden" name="productGiftIds_" value="' + storePromotionsList[i].productGiftIds[m] + '" />';
							}
						}
					}
				}
			});

			return html

		};
		juicer.register('cut', cut);

		var result = juicer(tpl, res);
		$(result).insertBefore(".new_discount");
		if(huodong != "" && huodong != undefined) {
			$(".count-item:last").append(huodong);
		}

	}

	//是否有优惠券
	function isCoupon(res) {
		couponTotal(res,1)

	}
	function couponTotal(res,cf,codeUuid,data){//优惠券代码整合

		if(!res.cartManager) {
			return false;
		}

		var cou_html = '';

		var cartManager = res.cartManager;

		var couponList = []; //   优惠券列表

		$.each(res.cartManagerList, function(key, cartManager) {
			couponList = cartManager.couponList;
		});

		cou_html += '<h3 id="showCouponTable_' + cartManager.storeUuid + '"><s></s>使用优惠券</h3>' +
			'<div id="couponTable_' + cartManager.storeUuid + '" class="new_pop" style="display:none">' +
			'<div class="tit">';
		if(couponList && couponList.length > 0) {
			cou_html += '<h4 class="active" id="coupon_">优惠券</h4><i></i>'
		}
		cou_html += '<h4 id="couponCode">优惠券码</h4>' +
			'</div>';

		var real_total_money = $("#hdn_real_total_money").val();
        var arr = [];
		//有优惠券的时候 就显示优惠券列表
		var f = -1;
		if(!limitPromotionUuid) {

			if(couponList && couponList.length > 0) {
				cou_html += '<div class="new_discount_tab" id="coupTab1"><div style="max-height: 215px;overflow-y: scroll;"><table class="m_table">';
				for(var i = 0; i < couponList.length; i++) {
					var isUseCoupon = couponList[i].minConsumeMoney - real_total_money;
					cou_html += '<tr>' +
						'<td class="new_box_wid" style="width:40px;">' +
						'<span class="checkbox m_odd" name="storeCoupon_' + cartManager.storeUuid + '" ' +
						'id="' + couponList[i].uuid + '"storeUuid="' + cartManager.storeUuid + '"' +
						' denomination="' + couponList[i].denomination + '" isUseCoupon="' + isUseCoupon + '">' +
						'</span>' +
						'</td>' +
						'<td style="width:165px;">满' + couponList[i].minConsumeMoney + '减'+couponList[i].denomination+'</td>' +
						'<td style="width:225px;">有效期至' + couponList[i].endTime + '</td>' +
						'<td>';
					if(real_total_money >= couponList[i].minConsumeMoney) {
						cou_html += '可以使用该劵</td>';
					} else {
						cou_html += '差' + parseFloat(couponList[i].minConsumeMoney - real_total_money) + '元可用该券</td>';
					}

					cou_html += '</tr>';
					if(cf==1){
						if(couponList[i].state === '1') {  //可用
							var money = parseFloat(couponList[i].money)
	                        arr.push(money)
	                        sort(arr)  //优惠券排序
	                        if(money === arr[arr.length - 1]) {  //取最大面值的优惠券
	                        	f = i;
	                        }
	                  	}
					}

				}

				cou_html += '<input type="hidden" name="storeCouponReduce_' + cartManager.storeUuid + '" value="0"/>' +
					'<input type="hidden" name="storeCoupon_' + cartManager.storeUuid + '"/>';
				cou_html += '</table></div><div style="color:#ff0000;cursor: pointer;" class="get-hide">收起</div></div>';

				cou_html += '<div class="new_discount_tab" style="display:none;">' +
					'<div class="new_ipt">' +
					'<input type="text" class="m_ipt" id="couponKeyPress_' + cartManager.storeUuid + '" value="">' +
					'<span id="entityCouponId_' + cartManager.storeUuid + '" storeUuid="' + cartManager.storeUuid + '" class="btn">确认</span>' +
					'<span class="red new-prompt conpon" id="couponKeyPressFirst_msg_' + cartManager.storeUuid + '">23132</span>' +
					'</div></div></div>'





			} else {
				cou_html += '<div class="new_discount_tab">' +
					'<div class="new_ipt">' +
					'<input type="text" class="m_ipt" id="couponKeyPress_' + cartManager.storeUuid + '" value="">' +
					'<span id="entityCouponId_' + cartManager.storeUuid + '" storeUuid="' + cartManager.storeUuid + '" class="btn">确认</span>' +
					'<span class="red new-prompt conpon" id="couponKeyPressFirst_msg_' + cartManager.storeUuid + '">23132</span>' +
					'</div></div></div>'
			}

			cou_html += '';


			$(".new_discount").empty();
			$(".new_discount").append(cou_html);
			if(cf==2){
				$(".checkbox.m_odd").each(function() {
					var id = $(this).attr("id");
					if(id == codeUuid) {
						useCouponNum(data,$(this));
						f=$(this).parents("tr").index();
					}
				});
			}
			html_show = '<div class="new_pop" style="display: block;">'+
						'<div class="new_discount_tab">'+
						'<table class="m_table"><tbody><tr>'+
						'<td style="width:165px;padding-bottom:5px;" class="cou-name">暂无可用优惠券</td><td style="color:#FF0000;padding-bottom:5px;cursor: pointer;" class="get-more">使用其他优惠券</td></tr>'+
						'</tbody></table></div></div></div>'
			$(".new_discount").append(html_show)
			if(f!=-1){
				if(cf==1){chickCoupon($(".m_odd").eq(f), $(".m_odd").eq(f).attr("isUseCoupon"))};
				$("[id^='showCouponTable_']").click();
				var html_show = '';
				getCouMes(f);
			}else{
				$(".cou-name").html("暂无可用优惠券");
			}

		}



	}
	function getCouMes(f){ //获取选择的优惠券信息
		var a = $(".m_odd").eq(f).parents("tr").find("td").eq(1).html();
		$(".cou-name").html(a);
	}
	function sort(array) { //数组排序
        for(var unfix = array.length - 1; unfix > 0; unfix--) {
            /*给进度做个记录，比到未确定位置*/
            for(var i = 0; i < unfix; i++) {
                if(array[i] > array[i + 1]) {
                    var temp = array[i];
                    array.splice(i, 1, array[i + 1]);
                    array.splice(i + 1, 1, temp);
                }
            }
        }
    }
	//选择优惠券改变价格
	$(document).on('click', ".m_odd", function() {
		chickCoupon($(this), $(this).attr("isUseCoupon"));

	});

	//积分抵现
	function _integral(res) {

		var integralToNowModel = res.integralToNowModel;
		var integral = res.integral;
		var useMaxIntegral = res.useMaxIntegral;
		var integral_html = '';
		if(res.integralToNowModel) {
			integral_html +=
				'<input type="checkbox" class="checkinput js-scoreCheck">' +
				/* +'<--抵现比例  积分数量-->'+*/
				'<input type="hidden" value="' + integralToNowModel.proportion + '" id="proportion"/>' +
				/*'<--抵现比例  人民币数量-->'+*/
				'<input type="hidden" value="' + integralToNowModel.proportion2 + '" id="proportion2"/>' +
				/*'<--抵现百分比-->'+*/
				'<input type="hidden" value="' + integralToNowModel.percentage + '" id="percentage"/>' +

				'<input type="hidden" value="' + useMaxIntegral + '" id="useMaxIntegral"/>' +
				//备用积分
				'<input type="hidden"  id="Integral" value="'+useMaxIntegral+'" />'+

				'<input type="hidden" value="' + integral + '" id="integral"/>' +

				'<input type="hidden" value="' + integralToNowModel.uuid + '" id="jifenPromotionUUID" name="jifenPromotionUUID"/>' +

				'<div class="useScore fl  mgb70"></div>' +
				'<div class="useScoreDiv clearfix">' +
				'   <span class="txt fl mgt70 mgl10">使用积分' +
				'       <input type="text" pattern="^[0-9]*$"  class="scoreNum js-scoreNum" name="integralReduceNum" id="integralReduceNum" autocomplete="off" >' +
				'       <span>你有' + integral + '积分可用,本次最多可使用<span class="totalScore js-totalScore">' + useMaxIntegral + '</span>积分</span>' +
				'       <div class="clear"></div>' +
				'       <span class="tip redfont mgl70 fl hide js-tip">您最多使用' + useMaxIntegral + '积分</span>' +
				'   </span>' +
                '   <span class="txt fr mgt70  js-discount">-0.00元</span>' +
                '</div>'+
				'<div class="noScoreDiv hide">' +
				'   <span class="txt fl mgt70 mgl10 ">' +
				'   使用<span class="totalScore">0</span>积分抵扣<span>0</span>元</span>' +
				'</div>' +
				'<input type="hidden" name="js-discount" id="js-discount">'
		}

		$(".myscore").append(integral_html);
	}
	//价格计算
	function totalMoney(res) {

		if(!res) {
			return;
		}

		var real_total_num = 0;
		var all_totalmoney = 0;

		//取最后一个遍历的TotalMoney;
		$.each(res.cartManagerList, function(key, value) {
			all_totalmoney = parseFloat($("#totalmoney" + key).val()).toFixed(2);
			real_total_num = $("#hdn_real_total_num" + key).val();
		});

		var orderTotalMoney1 = parseFloat(res.cartManager.totalMoney);
		var promotion_reduce_money;

		if(res.suitCanReductMoney && res.suitCanReductMoney != 0) {
			promotion_reduce_money = parseFloat(all_totalmoney - orderTotalMoney1).toFixed(2);
		} else {
			promotion_reduce_money = parseFloat(all_totalmoney - res.cartManager.totalMoney).toFixed(2);
		}

		$("#orderTotalMoney1").val(orderTotalMoney1);

		var totalMoney_html = '<div class="item-wid">' +
			'<p class="text">商品件数：  <span class="red fr" id="real_total_num">' + real_total_num + '件</span></p>' +
			'<p class="text">金额合计：';
		if(res.suitCanReductMoney && res.uitCanReductMoney != 0) {
			totalMoney_html += '<span class="red fr" id="real_total_money">' + all_totalmoney + '元 </span>'
		} else {
			totalMoney_html += '<span class="red fr" id="real_total_money">' + all_totalmoney + '元 </span>'

		}
		totalMoney_html += '</p><p class="text" >活动优惠：';
		if(res.suitCanReductMoney && res.suitCanReductMoney != 0) {
			totalMoney_html += '<span class="red fr" id="promotion_reduce_money">-' + promotion_reduce_money + '元</span>'
		} else {
			totalMoney_html += '<span class="red fr" id="promotion_reduce_money">-' + promotion_reduce_money + '元</span>'
		}

		totalMoney_html += '</p><p class="text">优惠券抵扣：<span class="red fr" id="coupon_reduce_money">-0.00元</span></p>';
		if(res.integralToNowModel && res.useMaxIntegral > 0) {
			totalMoney_html += '<p class="text">积分抵扣：<span class="red fr" id="integral_reduce_money">-0.00元</span></p>';
		}

		totalMoney_html += '<p class="text">运费:';

		if(res.allAffix) {
			totalMoney_html += '<span class="red fr">' + res.allAffix + '元</span>'
		} else {
			totalMoney_html += '<span class="red fr">0.00元</span>'
		}
		totalMoney_html += '</p><p class="text red pay">应付总额：<span class="font24 fr">';
		if(res.suitCanReductMoney && res.suitCanReductMoney != 0) {
			totalMoney_html += '<input type="hidden" value="' + orderTotalMoney1 + '" name="totalMoneyShow" id="totalMoney" />' +
				'<strong id="totalMoneyShow" orginValue="' + orderTotalMoney1 + '">' + parseFloat(res.cartManager.totalMoney).toFixed(2) + '元</strong>'
		} else {
			totalMoney_html += '<input type="hidden" value="' + res.cartManager.totalMoney + '" name="totalMoneyShow" id="totalMoney" />' +
				'<strong id="totalMoneyShow" orginValue="' + res.cartManager.totalMoney + '" choose-coupon="">' + parseFloat(res.cartManager.totalMoney).toFixed(2)+ '元</strong>'
		}
		totalMoney_html += '</span></p></div>';

		$("#showTotalMoney").append(totalMoney_html);

	}

	//选择优惠券

	function chickCoupon(coupon, isUseCoupon) {
		if(isUseCoupon > 0) {
			return false;
		}

		coupon.toggleClass('active').parents('tr').siblings().find('.m_odd').removeClass('active');

		if(coupon.hasClass("active")) {
			var findex = coupon.parents("tr").index()
			getCouMes(findex);
			$("#couponNum_").val("");
			var denomination = coupon.attr("denomination");
			var storeUuid = coupon.attr("storeUuid");
			var couponuuid = coupon.attr("id");
			$("input[name='storeCouponReduce_" + storeUuid + "']").attr("value", denomination);

			var recheckMoney = (total.money-denomination).toFixed(2)

			if(recheckMoney > 0) {
				$("#coupon_reduce_money").text("-" + denomination + "元");
				$("#couponemmoney").val(denomination);
				$("#couponNum").val(0); //券码为0
				$("#totalMoneyShow").text(recheckMoney + "元").attr("orginValue", recheckMoney);
				$("input[name='storeCoupon_" + storeUuid + "']").attr("value", couponuuid);
				Integral(recheckMoney)
			} else {
				$("#coupon_reduce_money").text("-0.00元");
				$("#couponemmoney").val(0); // 不适用优惠券时，隐藏域值为零;
				$("#storeCouponReduce_" + storeUuid).val("0");
				var recheckMoney = recheckTotalmoney();
				$("#totalMoneyShow").text(parseFloat(total.money).toFixed(2) + "元").attr("orginValue", total.money);
				Integral(total.money)
				Msg.Alert("","抵扣后的订单金额少于0不能使用!",function(){
					coupon.removeClass("active");
				});
			}
		}
		else {
			$(".cou-name").html("有可用优惠券");
			$("#checkcoupon").val("");
			$("#coupon_reduce_money").text("-0.00元");
			$("#couponemmoney").val(0);
			var storeUuid = coupon.attr("storeUuid");
			var denomination = coupon.attr("denomination");
			$("input[name='storeCouponReduce_" + storeUuid + "']").attr("value", "0");
			$("#totalMoneyShow").text( parseFloat(total.money).toFixed(2) + "元").attr("orginValue", total.money);
			Integral(total.money)
		}

	}

	//重新计算总价
	function recheckTotalmoney(couponemmoney) {

		var totalMoneyShow = $("#orderTotalMoney1").val(); //活动后的总价（后台得出）
		var js_discount = $("#js-discount").val();

		if(!js_discount) {
			js_discount = 0;
		}
		if(!couponemmoney) {
			couponemmoney = 0;
		}

		totalMoneyShow = (totalMoneyShow - couponemmoney - js_discount).toFixed(2);

		if(totalMoneyShow < 0) {
			return -1;
		} else {
			return totalMoneyShow
		}
	}

	//使用优惠卷弹出框
	$(".new_discount").on("click", "[id^='showCouponTable_']", function() {
		var uuid = $(this).attr('id');
		var attr = uuid.split("_");
		var couponUuid = attr[1];
//		$(".new_discount h3").toggleClass("active");

//		if($("#couponTable_" + couponUuid).css('display') == 'none') {
//			$("#couponTable_" + couponUuid).show();
//		} else {
//			$("#couponTable_" + couponUuid).hide();
//		}
	});
	$(document).on("click",".get-more",function(){
    	$(this).parents(".new_pop").hide().siblings(".new_pop").show()
    })
	$(document).on("click",".get-hide",function(){
    	$(this).parents(".new_pop").hide().siblings(".new_pop").show()
    })
	//领取优惠券码

	$(document).on('click', "[id^='entityCouponId_']", function() {
		var storeUuid = $(this).attr("storeUuid");
		var couponNo = $("#couponKeyPress_" + storeUuid).val();
		if(!couponNo) {
			Msg.Alert("","请输入优惠券号!",function(){});
			return;
		}
		exchangeCoupons(couponNo, storeUuid);
	});
	//使用优惠券码兑换优惠券
	function exchangeCoupons(couponNo, storeUuid) {
		//参数push
		var params = {};
		params.couponNo = couponNo;
		params.orderMoney = total.money;
		params.products = products;
		var param = JSON.stringify(params);
		var url = "/cart/exchangeCoupons";
		$init.getHeaders()['Content-Type'] = 'application/json; charset=utf-8';
		$http.post({
			url: url,
			data: param,
			dataType: 'json',
			contentType: 'application/json; charset=utf-8',
			success: function(res) {
				//1领取成功 2.领取失败 3.已经领取多次
				var code = res.code;
					//alert(code);
				if("0" == code) {
					//:优惠券可以使用,并且获取优惠券uuid
					var codeUuid = res.data.uuid;
					$("#couponNum_").val(codeUuid);
					$("#couponNum_").attr("storeUuid", res.data.storeUuid);
					$("#couponNum_").attr("money", res.data.money);
					$("#couponNum_").attr("uuid", res.data.uuid);
					var flag = false;
					$(".new_discount h3").removeClass("active");
					if($(".checkbox.m_odd")){
						$(".checkbox.m_odd").each(function() {
								var id = $(this).attr("id");
								if(id == codeUuid) {
									//$(".new_pop").hide();
									$('.new_discount_tab').eq(0).show();
									$('.new_discount_tab').eq(1).hide();
									flag = true;
									useCouponNum(res.data,$(this));
									return
								}
						});
					}else{
						Msg.Alert("","优惠券码兑换成功",function(){
							couplist(res.data,codeUuid,res.data);
						});
					}
					if(flag == false){
						Msg.Alert("","优惠券码兑换成功",function(){
							couplist(res.data,codeUuid,res.data);
						});
					}

				} else {
					if(res.code == 1){
						$(".conpon").html(res.message);
						$(".conpon").show();
						setTimeout(function() {
							$('.conpon').hide()
						}, 2000);
					}
					else{
						$(".conpon").html("兑换失败");
						$(".conpon").show();
						setTimeout(function() {
							$('.conpon').hide()
						}, 2000);
					}

				}
			}
		});

	}
	//使用优惠券码
	function useCouponNum(data,CouponNum) {
		var findex = CouponNum.parents("tr").index()
		getCouMes(findex)
		var totalMoneyShow = $("#orderTotalMoney1").val(); //活动后的总价（后台得出）
		if(data.minConsumeMoney - totalMoneyShow > 0) {
			return false;
		} else {
			// var coupon_preference;  //优惠券 优惠券金额;
			// var js_discount = $("#js-discount").val(); //积分每次切换，所低现的金额;
			// $(".new_box_wid span").each(function(key, value) {
			// 	if($(this).hasClass("active")) {
			// 		$(this).removeClass('active');
			// 	}
			// });(total.money-denomination).toFixed(2)
			var recheckMoney = (total.money-data.money).toFixed(2);
			if(recheckMoney > 0) {
				CouponNum.addClass("active");
				CouponNum.parent().parent().siblings().find(".checkbox").removeClass("active");
				$("#couponemmoney").val(data.money);
				$("#coupon_reduce_money").text("-" + data.money.toFixed(2) + "元");
				$("#totalMoneyShow").attr("orginvalue", recheckMoney).html(recheckMoney + "元");
				Integral(recheckMoney)
			} else {
				$("#coupon_reduce_money").text("-0.00元");
				$("#couponNum_").val(0);
				$("#totalMoneyShow").attr("orginvalue", total.money).html(parseFloat(total.money).toFixed(2) + "元");
				Msg.Alert("","抵扣后的订单金额少于0元不能使用!",function(){});
			}
		}
	}

	$("	.new_discount_popbox .close,.new_discount_tit").click(function() {
		$(".new_discount_pop").hide();
	});
	//使用优惠卷tab
	$(".new_discount_tab tr:nth-child(1) td").addClass("active");
	$(document).on('click', 'h4', function() {
		var x = $(this).index(".new_pop .tit h4");
		$(".new_discount_tab").eq(x).show().siblings(".new_discount_tab").hide();
		return false;
	});

	//使用积分抵扣 检测使用优惠券 和积分的时候

	$('div').on('keyup', '#integralReduceNum', function(event) {
		var integral_num = event.target.value; //
		$(this).val(parseInt(event.target.value))
		// $(".js-discount").val(event.target.value);
		isUseIntegral(integral_num);
	});

	//检查是否使用积分;

	function isUseIntegral(num) {

		var couponemmoney = $("#couponemmoney").val(); //选择优惠时候价格 都必须保存的隐藏域

		var useMaxIntegral = parseFloat($("#Integral").val()); //最大使用积分;
		if(parseFloat(num) > useMaxIntegral) {
			$("#integralReduceNum").val(useMaxIntegral);
		} else {
			var proportion = $("#proportion").val();
			var proportion2 = $("#proportion2").val();
			var percentage = $("#percentage").val();
			var hasIntegral = $("#integralReduceNum").val();

			hasIntegral = hasIntegral > useMaxIntegral ? useMaxIntegral : hasIntegral;
			var integral_preference = (hasIntegral / proportion).toFixed(2);
			$("#js-discount").val(integral_preference);
			var recheckMoney = recheckTotalmoney(couponemmoney);
			if(recheckMoney > 1) {
				$("#integral_reduce_money").html('-' + integral_preference + '元');
				$(".js-discount").text("-" + integral_preference + "元");
				$("#totalMoneyShow").attr("orginvalue", recheckMoney).html(recheckMoney + "元");

			}
			else if(recheckMoney < 1) {
				$("#integral_reduce_money").html("-0.00元");
				$("#integralReduceNum").val(0);
				$(".js-discount").text("-0.00元");
				$("#totalMoneyShow").attr("orginvalue", total.money-couponemmoney).html(parseFloat(total.money-couponemmoney).toFixed(2) + "元");
				Msg.Alert("","抵扣后的订单金额少于1元不能使用",function(){});
			}
			else{
				$("#integralReduceNum").val("");
				$(".js-discount").text("-0.00元");
				$("#integral_reduce_money").html('-0.00元');
				$("#totalMoneyShow").attr("orginvalue", total.money-couponemmoney).html(parseFloat(total.money-couponemmoney).toFixed(2) + "元");
			}

		}

	}
	//使用优惠券，才能使用积分，如果先使用积分再使用优惠券则积分会被清0，价格与积分有关的，全部重置。
	function Integral(money){
		var proportion = $("#proportion").val();
		var proportion2 = $("#proportion2").val();
		var percentage = $("#percentage").val();
		var useMaxIntegral = $("#useMaxIntegral").val();
		var Integral = parseInt(money * percentage / 100 / proportion2 * proportion)
		$("#integralReduceNum").val("");
		$(".js-totalScore").html("")
		$(".js-discount").text("-0.00元");
		$("#integralReduceNum").val("");
		$("#integral_reduce_money").html('-0.00元');
		$("#js-discount").val("");
		if(Integral > useMaxIntegral){
			$(".js-totalScore").html(useMaxIntegral)
			$("#Integral").val(useMaxIntegral)
		}
		else{
			$(".js-totalScore").html(Integral)
			$("#Integral").val(Integral)
		}

	}
})
