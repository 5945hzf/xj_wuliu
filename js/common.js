//var pubIP = 'http://api.xjv56.com/service/';
var pubIP = 'http://192.168.1.80:7777/service/';
var pubIP = 'http://192.168.1.199:7777/service/';
//var token = 'ceshi123456';
var token=localStorage.getItem("token");
var pageSize=10;//分页的每页个数
var companyId = null, userId = null ;
companyId=9041805231046330013;
//时间戳转时间格式
function timestampToTime(timestamp) {
    if(timestamp/100000000000>0){
        var date = new Date(timestamp * 1000);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }else{
        var date = new Date(timestamp );//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    }

    Y = date.getFullYear() + '-';
    M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
    D = date.getDate() + ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();
    return Y+M+D;
}
// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
Date.prototype.Format = function (fmt) { 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
//调用： var time1 = new Date().Format("yyyy-MM-dd");var time2 = new Date().Format("yyyy-MM-dd hh:mm:ss");


var adct = document.getElementsByTagName('title')[0].getAttribute('adct');
//登录状态失效的弹框
document.writeln("<div class=\"pop\" id=\"effect\">\n" +
    "\t<div class=\"cont\" >\n" +
    "\t\t<div class=\"cance2\" >\n" +
    "\t\t\t<span class=\"popTitle Lf\" >提示</span>\n" +
    "\t\t\t<div class=\"close Rt\" onclick=\"cf_popEffectClose1(this)\"></div>\n" +
    "\t\t</div>\n" +
    "\t\t<div class=\"deanger\"></div>\n" +
    "\t\t<div class=\"contTitle\">您好，<span>您的登陆已经过期</span>,请先<i onclick=\"popEffectLogin()\" style=\"color: #00a0e9;\">登陆</i>，以便使用更多功能。</div>\n" +
    "\t\t<div class=\"popLogin\" id=\"popLogin\" onclick=\"popEffectLogin()\">登录</div>\n" +
    "\t</div>\n" +
    "</div>");
//当返回code为401时需要调用此方法
function missedLogin() {
    $("#effect").css("display","block");
}
//跳回登录页
function popEffectLogin() {
	var isOld = localStorage.getItem('isOld');
	if(isOld == '0' || isOld == '1'){
		if(adct=="首页"){
	        window.location.href='./login/login.html';
		}else{
			if(location.href.indexOf('account') != -1){
				parent.location.href = '../login/login.html';
			}else{	
				window.location.href='../login/login.html';
			}
		}
	}else if(isOld == '-1'){
		if(adct=="首页"){
	        window.location.href='account/account.html';
		}else{
			window.location.href='../account/account.html';
		}
	}
}

function cf_popEffectClose1(that) {
	$(that).parent().parent().parent().css("display","none");
}

// if(token){
// 	//底部信息ajax
// 	$.ajax({
// 		  type:"post",
// 		  url:pubIP+"platform/getPlatformInfo",//v1.0
// 		  cache:false,
// 		  dataType: "json",
// 		  headers: {
// 		  	token: token
// 		  },
// 		  success: function(json){
// 		    //console.log(json.code);
// 		  	$('.kfPhone').text(json.data.customerMobile);
// 		  	$('.kfEm').text(json.data.customerEmail);
// 		  },
// 		  error:function(xhr,statues,error){
//
// 		  }
// 	});
//
// 	//isOld token
// 	//2 ok 已认证
// 	//0 超时
// 	//1 未登录
// 	//-1 未认证
// 	//-2 审核中
// 	$.ajax({
// 		  type:"post",
// 		  url:pubIP+"user/getUserInfoByToken",//v1.0
// 		  cache:false,
// 		  dataType: "json",
// 		  async:false,
// 		  headers: {
// 		  	token: token
// 		  },
// 		  success: function(json){
// 		    //console.log(json.data);
// 			//是否超时
//
// 		    if(json.code == 401){
// 		    		localStorage.setItem('isOld','0');
// 		  		if(location.href.indexOf('login') == -1){
// 		  			if(location.href.indexOf('index') == -1){
// 		  				if(location.href.indexOf('account') != -1 || location.href.indexOf('shopManage') != -1){
// 		  					$("#effect" , parent.document).show();
// 		  				}else{
// 		  					missedLogin() ;
// 		  				}
// 		  			}
// 		  		}
// 		  	}else{
// 		  		//是否认证
// 		  		$.ajax({
// 					  type:"post",
// 					  url:pubIP+"companyCertification/getCompanyWriteStateByUserToken",//v1.0
// 					  cache:false,
// 					  dataType: "json",
// 					  headers: {
// 					  	token: token
// 					  },
// 					  success: function(json){
// 						//console.log(json.code);
// 					    var rzType = null;
// 					  	switch(json.data.type){
// 							case 1:
// 							  //未认证
// 							  rzType = '-1';
// 							  break;
// 							case 2:
// 							  //审核
// 							  rzType = '-2';
// 							  break;
// 							case 3:
// 							  //已认证
// 							  rzType = '2';
// 							  break;
// 							case 4:
// 							  rzType = '-1';
// 							  break;
// 							case 5:
// 							  rzType = '-2';
// 							  break;
// 							case 6:
// 							  rzType = '-2';
// 							  break;
// 							default:
// 							  rzType = '-1';
// 						}
// 					  	localStorage.setItem('isOld',rzType);
// 					  },
// 					  error:function(xhr,statues,error){
//
// 					  }
// 				});
// 		  		//localStorage.setItem('isOld','2');
// 		  	}
// 			companyId = json.data.companyId;
// 			userId = json.data.ids;
// 		  },
// 		  error:function(xhr,statues,error){
//
// 		  }
// 	});
// }else{
// 	localStorage.setItem('isOld','1');
// }

//else{
//	localStorage.setItem('isOld','1');
//	if(location.href.indexOf('login') == -1){
//		if(location.href.indexOf('index') == -1){
//			$('#effect .contTitle span').text('您尚未登录');
//			missedLogin() ;
//		}
//	}
//}
// 模拟下拉框
$('.select').click(function(event){
    if($(this).children('img').attr('src') == '../img/prl-selected.jpg'){
        $(this).children('img').attr('src', '../img/prl-select.jpg')
    } else {
        $(this).children('img').attr('src', '../img/prl-selected.jpg')
    }

    event.stopPropagation();

    $(this).children('ul').toggle();
    var that = $(this);
    that.find('li').each(function(){
        $(this).mouseover(function(){
            $(this).addClass('hovered')
        });
        $(this).mouseleave(function(){
            $(this).removeClass('hovered')
        });
        if($(this).attr('data-index') == that.attr('data-selectedindex')){
            $(this).css({'background': '#6ea3ff','color': '#fff'});
            $(this).siblings('li').css({'background': '#fff','color': '#999'});
        }
    });

}).mouseleave(function (event) {
    $(this).children('img').attr('src', '../img/prl-select.jpg');
    $(this).children('ul').hide();
});
$('.select ul li').click(function(){
    event.stopPropagation();
    $(this).parent().parent().attr('data-selectedindex', $(this).attr('data-index'));
    $(this).parent().parent().find('span').text($(this).text());
    $(this).parent().parent().children('img').attr('src', '../img/prl-select.jpg')
    $(this).parent().css('display','none');
});

$(function () {
    $("header  .logo").click(function () {
        window.location.href="./index.html";
    })
    $(".goUser").click(function () {
        sessionStorage.setItem("cfsrc","./systemIndex/mine.html");
        window.location.href="./account.html";
    })
})
//刷新按钮
$(".cfRefresh").click(function () {
    location.reload();
})
//模拟点击 框
$(".cf_select").click(function () {
    $(this).toggleClass("on");
})

$(function () {
    //分页的  下面框的宽度
    $(".pagination li").each(function (idx,item) {

        if($(item).find("a").text()=="上一页"||$(item).find("a").text()=="下一页"){
            $(item).find('a').css("width","70px");
        }else if($(item).find("a").text()=="首页"||$(item).find("a").text()=="尾页"){
            $(item).find('a').css("width","70px");
        }
    })
    // 所有的显示条数 先隐藏
    $(".select span").each(function (idx,item) {
        if($(item).text()=="显示条数"){
            $(item).parent().css("display","none");
        }
    })
})

//     $(this).parent().css('display','none');
// });
