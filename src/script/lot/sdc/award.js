function updateHistoryRecord(){$.get("/sdc/ajax",{ajaxhandler:"GetNewestRecord",t:Math.random()},function(a){var e,f,g,b=a.numbers.split(","),c=$("#history tr").eq(1),d="odd";for(c&&(d="odd"==c.attr("class")?"even":"odd"),e='<tr class="'+d+'"><td><p class="p">'+a.period+'</p><p class="t">'+a.drawingTime,e+='</p></td><td class="nums">',f=0;f<b.length;f++)e+="<span>"+b[f]+"</span>  ";for(e+="</td>",e+="<td>"+a.total+"</td>",e+="<td><p "+("单"==a.totalOddorEven?'class="r"':"")+">"+a.totalOddorEven+"</p></td>",e+="<td><p "+("大"==a.totalBigOrSmall?'class="r"':"")+">"+a.totalBigOrSmall+"</p></td>",e+="<td><p "+("龍"==a.longhu?'class="r"':"和"==a.longhu?'class="g"':"")+">"+a.longhu+"</p></td>",e+="<td>"+a.qianSan+"</td>",e+="<td>"+a.zhongSan+"</td>",e+="<td>"+a.houSan+"</td>",e+="</tr>",$("#history .head").after(e),drawColor(),"undefined"!=typeof showNum&&showNum instanceof Function&&showNum(),g=$(".history_gg"),g.each(function(){$(this).prev().before($(this))}),e="<tr ><td>"+a.period+"</td>",e+="<td>"+a.drawingTime+"</td>",f=0;f<b.length;f++)e+="<td>"+b[f]+"</i>";e+="<td>"+a.total+"</td>",e+="<td>"+a.totalOddorEven+"</td>",e+="<td>"+a.totalBigOrSmall+"</td>",e+="<td>"+a.longhu+"</td>",e+="<td>"+a.qianSan+"</td>",e+="<td>"+a.zhongSan+"</td>",e+="<td>"+a.houSan+"</td>",e+="</tr>",$("#smallHistory tr:last").remove(),$("#smallHistory .head").after(e)},"json"),$("b",$("#twoball-switch")).hasClass("checked")&&"undefined"!=typeof reloadTwoBallRemind&&reloadTwoBallRemind instanceof Function&&reloadTwoBallRemind()}function drawColor(){var c,d,e,f,g,a=$("#history tr .nums").first().find("span"),b=[];for(c=0;c<a.length;c++)b.push($(a[c]).text());for(d=$("#history tr .nums span"),e=d.length,f=0;e>f;f++)g=$(d[f]),g.text()==b[0]?g.attr("class","no1"):g.text()==b[1]?g.attr("class","no2"):g.text()==b[2]?g.attr("class","no3"):g.text()==b[3]?g.attr("class","no4"):g.text()==b[4]?g.attr("class","no5"):g.attr("class","no6")}function LoadSdcTipSet(){var a=parseInt(null==$.cookie("sdc_tip_twoball")?1:$.cookie("sdc_tip_twoball")),b=parseInt(null==$.cookie("sdc_tip_num")?1:$.cookie("sdc_tip_num"));1==a?"checkbox"==$("#twoball-switch > b").attr("class")&&$("#twoball-switch > b").addClass("checked"):($("#twoball-switch > b").removeClass("checked"),$("#twoball_remind").hide()),1==b?"checkbox"==$("#num-switch > b").attr("class")&&$("#num-switch > b").addClass("checked"):($("#num-switch > b").removeClass("checked"),$("#bsoe-choose,#ball-choose").hide())}!function(){function f(){var b,c,d,e,f,a=$("#pageName").val();if(a){if(b=$("#pageName").attr("container"),c=$("#pageName").attr("time"),d=$("#pageName").attr("unload"),d&&"1"==d)return;c=~~c,b=b?b:"lot-wrap",setTimeout(function(){$.get("/sdc/"+a,{t:Math.random()},function(a){$("#"+b).html(a),Glitter()})},c)}else e=$("#callFun").val(),c=$("#callFun").attr("time"),e&&(f=e.split("|"),setTimeout(function(){for(var a=0;a<f.length;a++)window[f[a]]()},c))}function l(){$.get("/sdc/ajax",{ajaxhandler:"GetsdcAwardTimes",t:Math.random()},function(b){var c,d,e;j=b,b.current.periodNumber!=cpNumber&&(k=b.next.awardTimeInterval,countDownTimer&&window.clearInterval(countDownTimer),countDownTimer=window.setInterval(function(){k=Math.max(0,k-1e3),showCountDown(k,b.next.periodNumber)},1e3)),cpNumber=b.current.periodNumber,-1==i&&(i=b.current.periodNumber,luzhuFirstShow(a,i)),$(".warnTime #period").html("第"+b.next.periodNumber+"期"),c=90-cpNumber,0==c&&(d=new Date,e=new Date(b.next.awardTime.split(" ")[0].replace("-","/","gi")),d.getDate()==e.getDate()&&(c=90)),$(" .lot-award .currentAward .period-info .period-leave").html(c),h=window.setTimeout(l,b.next.awardTimeInterval<10?1e4:b.next.awardTimeInterval+1e3)},"json").error(function(){20>d&&(window.setTimeout(l,5e3+1e4*Math.random()),d++)}),d>=5&&showLotPeriodNumWarn(c)}var h,a=-1,b=3e4,c=-1,d=0,e=0,g=function(){$.get("/sdc/ajax",{ajaxhandler:"GetsdcAwardData",t:Math.random()},function(h){var j,k,l,m;if(e+=1,h.current.periodNumber!=a&&-1!=a&&(b=3e4,window.setTimeout(f,5e3),$(".currentAward .period").css("color","green"),e=d=0,hideLotPeriodNumWarn()),0!=b){for($(".currentAward .period").html(h.current.periodNumber+" 期"),j=h.current.awardNumbers.split(","),k="",l=0;l<j.length;l++)k=k+"<span class='no"+j[l]+"'>"+j[l]+"</span>";$(".lot-nums").html(k),-1==a&&$(".currentAward .period").css("color","green"),-1==a&&(a=h.current.periodNumber,luzhuFirstShow(a,i)),a=h.current.periodNumber,c=h.next.periodNumber}m=parseInt(parseInt(h.next.awardTimeInterval)+b+parseInt(15e3*Math.random())),window.setTimeout(g,h.next.awardTimeInterval<10?5e3:m),b=0},"json").error(function(){20>d&&(window.setTimeout(g,5e3+1e4*Math.random()),d++)}),(d>=5||e>6)&&showLotPeriodNumWarn(c)},i=-1,j=null,k=-1;window.setTimeout(g,1e3),h=window.setTimeout(l,1e3)}();