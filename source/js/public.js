// var currentCityId = window.localStorage.getItem("cityId");
// var currentCityName = window.localStorage.getItem("cityName");
// if(currentCityName&&currentCityId){
// 	// 已获取当前城市及id
// }
// else{
// 	window.location.href = "index.html";
// }
$(function(){
	$("body").on('tap','[data-href]',function(e){
		e.stopPropagation();
		e.preventDefault();
		var href = $(this).attr("data-href");
		href&&(window.location.href=href);
	});
    $.when(getWechatShareConfig(window.location.href)).done(function(data){
        if(data.resultCode == 200){
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: appId, // 必填，公众号的唯一标识
                timestamp: data.data.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.data.nonceStr, // 必填，生成签名的随机串
                signature: data.data.signature,// 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo", "onMenuShareQZone"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
            setWechatShareConfig("","","","");
        }
    });
});
function encodeObj(obj){
	return encodeURI(JSON.stringify(obj));
}
function getQueryData(){
    var searchUrl = window.location.search.split("?")[1];
    if(searchUrl&&searchUrl.search("=")>0){
        searchUrl = searchUrl.split("=")[0];
    }
    var URI = decodeURI(searchUrl);
    var parseURI = URI;
    if(URI){
        try{
            parseURI = JSON.parse(URI);
        }
        catch(e){
            parseURI = "";
        }
    }
    return parseURI;
}
/* 一些书本列表页面公用的方法
*/
var bookTableCellHtml = '<ul class="mui-table-view" style="margin-top: 10px;">'+
        '<li class="mui-table-view-cell">'+
            '<a data-href="">'+
                '<div class="mui-table">'+
                    '<div class="mui-table-cell mui-col-xs-3">'+
                        '<img class="bookCoverImage" style="width: 80%;" src="" />'+
                    '</div>'+
                    '<div class="mui-table-cell mui-col-xs-9">'+
                       '<h4 style="margin-bottom: 10px;font-size: 15px;" class="title mui-ellipsis"></h4>'+
                        '<h6>作者：<span class="author"></span></h6>'+
                        '<h6>出版社：<span class="publisher"></span></h6>'+
                        '<span class="mui-h4 linkColor">¥<span class="marketPrice"></span></span>'+
                    '</div>'+
                '</div>'+
            '</a>'+
            '<img class="smallCartIcon" src="../source/webslice/0_common/common_add_cart.png" />'+
        '</li>'+
    '</ul>';
function getSingleBookTableCell(id,path,title,author,publisher,marketPrice){
    var tableCell = $(bookTableCellHtml);
    tableCell.find('.bookCoverImage').attr("src",path).end()
        .find('.title').text(title).end()
        .find('.author').text(author).end()
        .find('.publisher').text(publisher).end()
        .find('.marketPrice').text(marketPrice).end()
        .find("a").attr("data-href","indexPage_textbook.html?"+encodeObj({"bookId":id})).end()
        .attr("data-bookId",id);
    return $("<div>").append(tableCell).html();
}























