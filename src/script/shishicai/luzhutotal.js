// 每个页面值调用一次的请求根据页面的location来判断请求的接口
var pathname = location.pathname.replace('index.html','');
var lotMenu = 'cqssc_memu';
var lotteryLuzhu = "";
var vAjax = '';
/*设置牌路*/
function setPaiLu() {
    var isshow = getCookie("showPailu");
    if ("1" == isshow || ""==isshow) {
        $("#ckb_pailu").addClass("checked");
    } else {
        $("#ckb_pailu").removeClass("checked");
    }
}
/*冠亚和 路珠(选择时间) 异步加载*/
function LuzhuDate(selDate, unload) {
    $('#LuzhuSelectDate').css({ "width": "100%" });
    $('#LuzhuSelectDate').css("position", "relative").append("<div style='margin:0 auto; width:100%;height:100%; color:#FFF; position:absolute; top:220px; z-index:11;left:0px;'>数据正在加载中...</div><div class='loaddingBg'></div>");
    $.get("/pk10/GuanyaheSelectDate", { t: Math.random(), date: selDate }, function (text) {
        $('#LuzhuSelectDate').html(text);
        $("#pageName").attr("unload", unload);
        $('#LuzhuSelectDate').css("position", "");
    });
}
/*异步load路珠*/
function reloadLuzhu(url, date, unload) {
    url = url.replace(location.protocol+'//'+location.host, '');
    var _container = $("#pageName").attr("container");
    _container = _container ? _container : "lot-wrap";
    $('#' + _container).css({ "width": "100%" });
    $('#' + _container).css("position", "relative").append("<div style='margin:0 auto; width:100%;height:100%; color:#FFF; position:absolute; top:240px; z-index:11;left:0px;'>数据正在加载中...</div><div class='loaddingBg'></div>");
    $.get(url, { t: Math.random(), date: date }, function (text) {
        $('#' + _container).html(text);
        $("#pageName").attr("unload", unload);
        $('#' + _container).css("position", "");
    });
}
function updatePickdate(dp) {
    var selDate = $("#dateData").val();
    setPaiLu();
    if (true == vAjax) {
        var unload = "0";
        if (dp.cal.date.d == (new Date()).getDate()) {
            unload = "0";
        } else {
            unload = "1";
        }
        //冠亚和 路珠选择时间 单独处理(加载局部视图)
        LuzhuDate(selDate, unload);

    } else {
        if (dp.cal.date.d == (new Date()).getDate()) {
            reloadLuzhu(location.href, selDate, 0);
        } else {
            reloadLuzhu(location.href, selDate, 1);
        }
    }
}
function clearedDate() {
    reloadLuzhu(location.href, '', 0);
}
function getPRData_1(){
    return ["大","小","1,2,2,2,1,1,2,2,1,1,2,1,1,2,1,2,1,2,2,1,1,1,2,1,2,2,2,1,2,2,1,2,1,1,1,1,2,2,2,2,1,1,2,2,1,1,1,1,1,2,2,2,2,2,2,1,2,1,1,2,2,1,2,2,2,1,2,2,2,2,1,1,2,2,2,1,1,1,2,2,1,1,1,1,2,1,1,2,1,1,1,1,1,2,1"];
}
function getPRData_2(){
    return ["单","双","1,1,2,2,2,2,1,2,1,1,1,1,1,1,2,1,1,2,1,1,2,2,1,2,1,1,2,1,2,2,2,1,2,1,1,1,2,2,2,2,1,2,1,1,1,2,2,1,2,1,1,2,2,2,2,1,2,1,2,1,2,2,1,2,2,1,2,1,1,1,1,1,2,1,1,1,1,2,2,1,1,2,1,1"];
}
$.ajax({
    url: host+pathname,
    data:{},
    datatype:'html',
    type:'get',
    success: function(res){
        $('.lot-wrap').replaceWith(res);
        $("<scri"+"pt>"+"</scr"+"ipt>").attr({src:'../../script/navdrag.js',type:'text/javascript'}).appendTo($('body'));
        $("<scri"+"pt>"+"</scr"+"ipt>").attr({src:'../../script/lot/lotcommon.js',type:'text/javascript'}).appendTo($('body'));
        $("<scri"+"pt>"+"</scr"+"ipt>").attr({src:'../../script/lot/cqssc/award.js',type:'text/javascript'}).appendTo($('body'));
        $(function () {
            $(".show-bjl label").bind("click", function () {
                $("#" + $(this).prev().attr("id")).click();
            });

            $("#ckb_pailu").bind("click", function () {
                var check = $(this).hasClass("checked") ? false : true;
                var selDate = $("#dateData").val();
                var url = location.href;
                $.post("/home/pailusetting", { enable: check }, function (result) {
                    //location.reload();
                    setCookie('showPailu',check?'1':'0',5);
                    //由之前的post整个页面 变成局部更新
                    setPaiLu();

                    var unload = "0";
                    if (selDate != "" && new Date(selDate).getDate() == (new Date()).getDate()) {
                        unload = "0";
                    } else {
                        unload = "1";
                    }
                    var vselectdate = $("#pageName").attr("selectdate");
                    //冠亚和 路珠选择时间 单独处理(加载局部视图)
                    if (vselectdate == "LuzhuSelectDate") {
                        LuzhuDate(selDate, unload);
                    } else {
                        reloadLuzhu(url, selDate, unload);
                    }
                }, 'json');
            });
        });
        vAjax = Boolean("");
        $(function () {
            $("#dateData").val("");
        });
        $(function () {
            setLuzhuScroll();
        });
    }
});