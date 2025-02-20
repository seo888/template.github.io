(function($){$.fn.hoverIntent=function(handlerIn,handlerOut,selector){var cfg={interval:150,sensitivity:6,timeout:0};if(typeof handlerIn==="object"){cfg=$.extend(cfg,handlerIn);}else if($.isFunction(handlerOut)){cfg=$.extend(cfg,{over:handlerIn,out:handlerOut,selector:selector});}else{cfg=$.extend(cfg,{over:handlerIn,out:handlerIn,selector:handlerOut});}
var cX,cY,pX,pY;var track=function(ev){cX=ev.pageX;cY=ev.pageY;};var compare=function(ev,ob){var isSingle=$("#tts-single").hasClass("active");var isScreenread=$("#tts-screenread").hasClass("active");var isToolscreen=$("#tool-screen").hasClass("active");if(isSingle||isScreenread||isToolscreen)
{ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);if(Math.sqrt((pX-cX)*(pX-cX)+(pY-cY)*(pY-cY))<cfg.sensitivity){$(ob).off("mousemove.hoverIntent",track);ob.hoverIntent_s=true;return cfg.over.apply(ob,[ev]);}else{pX=cX;pY=cY;ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}};var delay=function(ev,ob){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);ob.hoverIntent_s=false;return cfg.out.apply(ob,[ev]);};var handleHover=function(e){var ev=$.extend({},e);var ob=this;if(ob.hoverIntent_t){ob.hoverIntent_t=clearTimeout(ob.hoverIntent_t);}
if(e.type==="mouseenter"){pX=ev.pageX;pY=ev.pageY;$(ob).on("mousemove.hoverIntent",track);if(!ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){compare(ev,ob);},cfg.interval);}}else{$(ob).off("mousemove.hoverIntent",track);if(ob.hoverIntent_s){ob.hoverIntent_t=setTimeout(function(){delay(ev,ob);},cfg.timeout);}}};return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover},cfg.selector);};})(jQuery);var matched,browser;jQuery.uaMatch=function(ua){ua=ua.toLowerCase();var match=/(chrome)[ \/]([\w.]+)/.exec(ua)||/(webkit)[ \/]([\w.]+)/.exec(ua)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua)||/(msie)[\s?]([\w.]+)/.exec(ua)||/(trident)(?:.*? rv:([\w.]+)|)/.exec(ua)||ua.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)||[];return{browser:match[1]||"",version:match[2]||"0"};};matched=jQuery.uaMatch(navigator.userAgent);matched.browser=matched.browser=='trident'?'msie':matched.browser;browser={};if(matched.browser){browser[matched.browser]=true;browser.version=matched.version;}
if(browser.chrome){browser.webkit=true;}else if(browser.webkit){browser.safari=true;}
jQuery.browser=browser;(function($){$.extend($.fn,{WXA11y:function(setting){var ps=$.extend({mainDocument:$("body"),PageScale:1.0,size:{barWidth:200,sliderWidth:5},onChanging:function(){}},setting);ps.mainDocument=(typeof ps.mainDocument=='string'?$(ps.mainDocument):ps.mainDocument);ps.currentSelectorNode=ps.mainDocument.children(":first");var NodeManager={docNodeArray:[],currentSelectorNode:null,currentNodeIndex:0,setCurrentNode:function(node){this.currentSelectorNode=node[0];for(var e in this.docNodeArray){if(this.docNodeArray[e].id==this.currentSelectorNode.id){this.currentNodeIndex=e;break;}}},getcurrentNodeIndex:function(){return this.currentNodeIndex;},pushNode:function(n){if(n){if(n instanceof jQuery)this.docNodeArray.push(n[0]);else this.docNodeArray.push(n);}},nextNode:function(){if($(this.docNodeArray[this.currentNodeIndex]))
{$(this.docNodeArray[this.currentNodeIndex]).removeClass("WXA11y-hover");}
if(this.currentNodeIndex<this.docNodeArray.length){this.currentNodeIndex++;return this.docNodeArray[this.currentNodeIndex];}
return null;}};var ScreenRead={delaytime:null,dealyprocess:null,dot:[",","!","?",";","|","\uff0c","\u3002","\uff1f","\uff01","\uff1b",":","\uff1a","\n","\u3001","'",'"'],stopAll:false,isRead2EndOn:false,isReset:false,soundMute:false,getTextNodesIn:function(node,includeWhitespaceNodes){var textNodes=[],nonWhitespaceMatcher=/\S/,Nodeindex=0;function getTextNodes(node){if(node.nodeType==3&&node.nodeType.display!=='none'){if(includeWhitespaceNodes||nonWhitespaceMatcher.test(node.nodeValue)){textNodes.push(node);}}else if(node.tagName!='STYLE')
{if(node.tagName=='IFRAME')
{if(node.style.display!="none"&&node.src.indexOf(window.location.host)>=0)
{node.setAttribute("voiceFrame",true)
var fileref=document.createElement("link");fileref.setAttribute("rel","stylesheet");fileref.setAttribute("type","text/css");fileref.setAttribute("href",path+"WXA11y.css");if(typeof fileref!="undefined");node.contentWindow.document.body.appendChild(fileref);node=node.contentWindow.document.body;for(var i=0,len=node.childNodes.length;i<len;++i){if(node.childNodes[i].nodeName!="SCRIPT"&&node.childNodes[i].nodeType.display!=='none')
getTextNodes(node.childNodes[i]);}}}
else
{for(var i=0,len=node.childNodes.length;i<len;++i){if(node.className!="a11ytoolbar"&&node.childNodes[i].nodeName!="SCRIPT"&&node.nodeType.display!=='none')
getTextNodes(node.childNodes[i]);}}}}
getTextNodes(node);return textNodes;},StopAllRead:function(){this.isRead2EndOn=false;},positionNode:function(){var WST=$(window).scrollTop();var docNum=0;if(WST>5)
{for(var i=0;i<NodeManager.docNodeArray.length;i++)
{var docTop=NodeManager.docNodeArray[i].offsetTop;if(docTop&&docTop>=WST)
{docNum=i;break;}}}else
{docNum=0;}
NodeManager.setCurrentNode($(NodeManager.docNodeArray[docNum]));ScreenRead.Read2End(NodeManager.docNodeArray[docNum]);},Read2End:function(n){var isSingle=$("#tts-single").hasClass("active");var isScreenread=$("#tts-screenread").hasClass("active");if(isSingle||isScreenread)
{try{var node=n;var text;if(node!==true)
if(!node||$.trim($(node).text()).length<=2){node=NodeManager.nextNode();if(node){text=$(node).text();}}else{text=$(node).text();}
$(node).addClass("WXA11y-hover");var self=this;text=$.trim(text);var patt=new RegExp("{[^>]*}");if(text&&text.length>1&&!patt.test(text)){if($("#tool-screen").hasClass("active"))
{tipScreenObj.Display(text);}
SoundPlayer.playWithTxt(text,function(){if(node!=null)
$(node).removeClass("WXA11y-hover");if(!isSingle){var n=NodeManager.nextNode();if(n!=null)ScreenRead.Read2End(n);}else{ScreenRead.StopAllRead();}});}else{if(node!=null)
$(node).removeClass("WXA11y-hover");if(!isSingle){var n=NodeManager.nextNode();if(n!=null)ScreenRead.Read2End(n);}else{ScreenRead.StopAllRead();}}}
catch(e)
{}}},init:function(callback){if(!this.isReset)
{this.reDocumentTagNodes();var self=this;ps.mainDocument.find("img, button,input,label,select, textarea,.a11ydom").filter(function(){return $(this).parents(".a11y-top").length<=0;}).hoverIntent(this._state_over,this._state_out).click(function(){var $this=$(this);if($this.parents("a").size()>0)
{ScreenRead.StopAllRead();$("#tts-screenread").removeClass("active");}});var $objIframe=ps.mainDocument.find("iframe[voiceFrame=true]");if($objIframe.size()>0)
for(var i=0;i<$objIframe.size();i++)
{$objIframe.eq(i).contents().find("img, button,input,label,select, textarea,.a11ydom").filter(function(){return $(this).parents(".a11y-top").length<=0;}).hoverIntent(this._state_over,this._state_out).click(function(){var $this=$(this);if($this.parents("a").size()>0)
{ScreenRead.StopAllRead();$("#tts-screenread").removeClass("active");}});}
SoundPlayer.initPlayer();this.isReset=true;}
if(callback)
{callback();}},splitbydot:function(txt){var sliceIndex=0;var startindex=0;var indexArray=[];var rtnArray=[];for(i=0;i<this.dot.length;i++){var searchIndex=-1;startindex=0;while((searchIndex=txt.indexOf(this.dot[i],startindex))!=-1){if($.inArray(searchIndex,indexArray)==-1){indexArray.push(searchIndex);}
startindex=searchIndex+1;}}
indexArray.sort(function(a,b){return a-b;});$.each(indexArray,function(k,v){var t=txt.substring(sliceIndex,v+1);rtnArray.push(t);sliceIndex=v+1;});if(sliceIndex<txt.length)rtnArray.push(txt.substr(sliceIndex));return rtnArray;},searchOneChat:function(txt){if(txt.length>1)
{return true;}
else if(txt.charCodeAt(0)>255)
{var dotstr="，。、《》？；‘：“【】｛｝·~！@#￥%……&*（）";if(dotstr.indexOf(txt)>=0)
{return false;}
else
{return true;}}else{return false;}},reDocumentTagNodes:function(){var self=this;var docNodeArray=ScreenRead.getTextNodesIn(ps.mainDocument[0],true);for(var i in docNodeArray){var t=docNodeArray[i].nodeValue;if(t&&t.length>0){var docarray=self.splitbydot(t);var docarrayLen=docarray.length;for(j=0;j<docarray.length;j++)
{var txt=docarray[j];if(txt.replace(/[\r\n\s\f\t\v\o ]+/gm,"")!="")
{if(self.searchOneChat(txt))
{var n=$('<font class="a11ydom" id="_label_'+i+"_"+j+'">'+txt+'</font>').insertBefore($(docNodeArray[i]));NodeManager.pushNode(n);docNodeArray[i].nodeValue=docNodeArray[i].nodeValue.replace(txt,"");}else{var t=document.createTextNode(txt);var n=$(t).insertBefore($(docNodeArray[i]));NodeManager.pushNode(n);docNodeArray[i].nodeValue=docNodeArray[i].nodeValue.replace(txt,"");}}}}}},handleElement:function(nodeele){var k="";switch(nodeele[0].tagName){case"A":var m=$(nodeele).attr("title");var l=$(nodeele).text();if(typeof m!="undefined"&&m.length>l.length){k+="链接 "+m}else{k+="链接 "+l;}
break;case"LABEL":k+=$(nodeele).text();break;case"AREA":k+="链接区域 "+nodeele.getAttribute("alt")?nodeele.getAttribute("alt"):nodeele.getAttribute("href");break;case"BUTTON":k+="按钮 "+$(nodeele).text();break;case"OBJECT":k=$(nodeele).attr("title")?$(nodeele).attr("title"):"";k="按钮"+k;break;case"EMBED":k=$(nodeele).attr("title")?$(nodeele).attr("title"):"";k="媒体 "+k;break;case"H1":case"H2":case"H3":case"H4":case"H5":case"H6":k+="标题-"+$(nodeele).text();break;case"IMG":var r=$(nodeele).attr("alt");if(r&&r.length>0){k+="图片 "+r}else{k+="图片"}
break;case"INPUT":k+="文本输入框 "+$(nodeele).val();break;case"LI":k+=$(nodeele).val();break;case"SELECT":k+=$(nodeele).val();break;case"TABLE":break;case"TEXTAREA":k+="多文本输入框内容为: "+$(nodeele).val();break;case"UL":case"OL":break;case"IFRAME":break;}
if($(nodeele).attr("title")&&!k){k=k+" "+$(nodeele).attr("title")}
return k},handleNode:function(node){var result="";switch(node[0].nodeType){case 1:if(this.isVisible(node)){result="";}else{result=ScreenRead.handleElement(node);}
break;case 2:result="";break;case 3:var l=node.data;if(l.length>0&&l.match(/[^\s,\.\?!:\-]/)){l=l.replace(/&#\d+;/,"");result=l;}else{result="";}
break;case 8:case 9:case 10:default:result=""}
return result;},_state_over:function(){var selfobj=$(this);var node=selfobj;var txt=ScreenRead.handleNode(node);if(!txt){txt=node.text();}
if(this.delaytime){window.clearTimeout(this.delaytime);this.delaytime=null;}
var isSingle=$("#tts-single").hasClass("active");var isScreenread=$("#tts-screenread").hasClass("active");if(isSingle||isScreenread)
{this.delaytime=window.setTimeout(function(){NodeManager.setCurrentNode(node);SoundPlayer.play("http://cloud.microxiang.com:9999/VoiceService.svc/speak?txt="+encodeURIComponent(txt),function()
{$(node).removeClass("WXA11y-hover");if($("#tts-screenread").hasClass("active"))
{fontObj.changeColor(false);ScreenRead.Read2End();}});},100);}
var isToolscreen=$("#tool-screen").hasClass("active");if(isToolscreen)
{tipScreenObj.Display(txt);}
switch(this.tagName){case"SELECT":break;default:node.addClass("WXA11y-hover")}},_state_over_object:function(){},_state_out_object:function(){},_state_out:function(){var node=$(this);switch(this.tagName){case"SELECT":break;default:node.removeClass("WXA11y-hover");}},isVisible:function(node){if(node==null||typeof node=="undefined"||node.nodeType!=1||node.nodeName=="BODY"){return false}
if(node.offsetWidth<=0||!node.parentNode)return true;if($(node).is(":hidden")){return true;}
return false}};var fontsizeEnum={'L':1,'M':-1};var fontObj={tagNames:["BODY","a","LABEL","BUTTON","INPUT","TD","LI","P","H1","H2","H3","UL","TABLE","DIV","NAV","IMG","SPAN","SELECT","TEXTAREA"],maxSize:20,minSize:12,size:(typeof ps.mainDocument.css("font-size"))==undefined?12:ps.mainDocument.css("font-size").replace('px',''),changeColor:function(state)
{if(state)
ps.mainDocument.addClass("WXA11y-hover");else
ps.mainDocument.removeClass("WXA11y-hover");var htmldom=ps.mainDocument.add($("iframe[voiceFrame=true]").contents()).find("body,.a11ydom,div,th,td").not($(".a11ytoolbar,#a11ydisplay,.tip-page-x,.tip-page-y")).each(function(){if(state)
$(this).addClass("WXA11y-hover");else
$(this).removeClass("WXA11y-hover");});},chanageFontsize:function(type){var dom=this.tagNames.join(","),maxSize=this.maxSize,minSize=this.minSize,$children=ps.mainDocument.add($("iframe[voiceFrame=true]").contents().find("body")).children(dom).not("div.a11ytoolbar"),depth=0;while($children.length>0){$children=$children.children();$children.each(function(){var $this=$(this),thisize=parseInt($this.css("fontSize"));if(isNaN(thisize))
{thisize=16;}
if(thisize<maxSize||thisize>minSize)
{$this.css({"fontSize":+thisize+type+"px"});}})}}};var SoundPlayer={isPlayInited:false,initPlayer:function(){if(this.isPlayInited)
return;soundManager.setup({debugMode:false,debugFlash:false,url:path+"sm2/",onready:function(){this.isPlayInited=true;}});},playWithTxt:function(t,f){this.play("http://cloud.microxiang.com:9999/VoiceService.svc/speak?txt="+encodeURIComponent(t),f);},play:function(u,f){try
{if(!this.isPlayInited)
{this.initPlayer();}
if(ScreenRead.soundMute){(f&&typeof(f)==="function")&&f();}else{if(soundManager){soundManager.stopAll();}
var mySoundObject=soundManager.createSound({url:u,onfinish:function(){soundManager.destroySound(this.id);(f&&typeof(f)==="function")&&f();},ondataerror:function(){(f&&typeof(f)==="function")&&f();}});lastUrl=u;mySoundObject.play();}}
catch(e)
{(f&&typeof(f)==="function")&&f();}}};var tipScreenObj={isEnable:false,hidedisplay:function(){var self=this;$("#a11ydisplay").slideUp("slow",function(){self.isEnable=true;});},ToggleDisplay:function(){var self=this;$("#a11ydisplay").slideToggle(0,function(){if($(this).is(":hidden"))self.isEnable=false;else self.isEnable=true;});},Display:function(txt,callback){$("#a11ydisplay>center").html(txt);if(callback)callback();}};var tipLineObj={tip_page_x:'<div class="tip-page-x" style="width:3px;height:0px;background-color:transparent;position:absolute;left:50%;top:0;z-index:9999;overflow:hidden;background-color:red;"></div>',tip_page_y:'<div class="tip-page-y" style="width:0px;height:3px;background-color:transparent;position:absolute;left:0;top:50%;z-index:9999;overflow:hidden;background-color:red;"></div>',tip_page_ele:null,mouseX:function(evt){if(evt.pageX)return evt.pageX;else if(evt.clientX)return evt.clientX+(document.documentElement.scrollLeft?document.documentElement.scrollLeft:document.body.scrollLeft);else return null;},mouseY:function(evt){if(evt.pageY)return evt.pageY;else if(evt.clientY)return evt.clientY+(document.documentElement.scrollTop?document.documentElement.scrollTop:document.body.scrollTop);else return null;},_moveEvent:function(e){if(e.data.caller.tip_page_x.is(":hidden"))return;var self=e.data.caller;self.setPosition(self.mouseX(e),self.mouseY(e));},setPosition:function(x,y){this.tip_page_x.css({top:0,left:x+5});this.tip_page_y.css({top:y+5,left:0});},hideTipLine:function(){if($(".tip-page-x").is(":visible"))
{this.tip_page_x.hide();this.tip_page_y.hide();}},ToggleTipLine:function(){if(typeof this.tip_page_x=="string"){this.tip_page_x=$(this.tip_page_x).appendTo(ps.mainDocument).css({height:ps.mainDocument.prop('scrollHeight')});this.tip_page_y=$(this.tip_page_y).appendTo(ps.mainDocument).css({width:ps.mainDocument.prop('scrollWidth')});ps.mainDocument.bind('mousemove',{caller:this},this._moveEvent)}else{if(this.tip_page_x.is(":hidden")){this.tip_page_x.show();this.tip_page_y.show();}else{this.tip_page_x.hide();this.tip_page_y.hide();}}}};var zoomObj={docWidth:ps.mainDocument.outerWidth(),docHeight:ps.mainDocument.outerHeight(),zoomin:function(e){if(ps.PageScale<1.5)ps.PageScale+=0.1;this._zoom(ps.PageScale);this._style();},zoomout:function(e){if(ps.PageScale>=1.1){ps.PageScale-=0.1;this._zoom(ps.PageScale);}else{ps.mainDocument.removeAttr("style");}
this._style();},_zoom:function(scale){ps.mainDocument.css({"-moz-transform":"scale("+scale+")","-o-transform":"scale("+scale+")","-webkit-transform":"scale("+scale+")","-moz-transform-origin":"top left","-webkit-transform-origin":"top left","transform":"scale("+scale+")","zoom":scale});},_style:function(){}};$(document).on("click","div.a11ytoolbar .fun",function(){var $this=$(this);switch(this.id){case"font-lagre":fontObj.chanageFontsize(fontsizeEnum.L);SoundPlayer.playWithTxt("字体增大",function(){ScreenRead.Read2End();});break;case"font-small":fontObj.chanageFontsize(fontsizeEnum.M);SoundPlayer.playWithTxt("字体缩小",function(){ScreenRead.Read2End();});break;case"page-zoomin":zoomObj.zoomin();SoundPlayer.playWithTxt("页面放大",function(){ScreenRead.Read2End();});break;case"page-zoomout":zoomObj.zoomout();SoundPlayer.playWithTxt("页面缩小",function(){ScreenRead.Read2End();});break;case"tool-line":tipLineObj.ToggleTipLine();$this.toggleClass("active");var isactive=$this.hasClass("active");if(isactive)
{SoundPlayer.playWithTxt("辅助线开启",function(){ScreenRead.Read2End();});}else
{SoundPlayer.playWithTxt("辅助线已关闭",function(){ScreenRead.Read2End();});}
require.setCookie("WXA11YLINE",isactive,"8h");break;case"tool-contrast":fontObj.changeColor(!$this.hasClass("active"));$this.toggleClass("active");var isactive=$this.hasClass("active");if(isactive)
{SoundPlayer.playWithTxt("高对比度开启",function(){ScreenRead.Read2End();});}else{SoundPlayer.playWithTxt("高对比度已关闭",function(){ScreenRead.Read2End();});}
require.setCookie("WXA11YCONTRAST",isactive,"8h");break;case"tool-screen":$this.toggleClass("active");tipScreenObj.ToggleDisplay();ScreenRead.init();tipScreenObj.Display("提示：在页面中移动鼠标，此处将突出显示相应文字。");var isactive=$this.hasClass("active");if(isactive){SoundPlayer.playWithTxt("显示屏开启，在页面中移动鼠标，此处将突出显示相应文字。");}else{SoundPlayer.playWithTxt("显示屏已关闭");}
require.setCookie("WXA11YDISPLAY",isactive,"8h");break;case"tts-single":$this.toggleClass("active");$("#tts-screenread").removeClass("active");fontObj.changeColor(false);var isactive=$this.hasClass("active");if(isactive)
{ScreenRead.init();ScreenRead.Read2End(true);if(require.getCookie("WXA11YSINGLE")=="false")
{SoundPlayer.playWithTxt("开启指读模式，移动鼠标至文本即可朗读");}else{SoundPlayer.playWithTxt("指读模式持续为您开启");}}else{ScreenRead.StopAllRead();SoundPlayer.playWithTxt("指读模式已关闭");}
require.setCookie("WXA11YSINGLE",isactive,"8h");require.setCookie("WXA11YAUTOREAD","false","8h");break;case"tts-screenread":$this.toggleClass("active");$("#tts-single").removeClass("active");var isactive=$this.hasClass("active");if(isactive){ScreenRead.init();if(require.getCookie("WXA11YAUTOREAD")=="false")
{SoundPlayer.playWithTxt("开启全文朗读模式",function(){ScreenRead.positionNode();});}else{SoundPlayer.playWithTxt("全文朗读模式持续为您开启",function(){ScreenRead.positionNode();});}}else{SoundPlayer.playWithTxt("全文朗读模式已关闭");ScreenRead.StopAllRead();var contrast=$("#tool-contrast");if(contrast.hasClass("active"))
{contrast.trigger("click");}
$(".WXA11y-hover").removeClass("WXA11y-hover");}
require.setCookie("WXA11YAUTOREAD",isactive,"8h");require.setCookie("WXA11YSINGLE","false","8h");break;case"WXA11y-fold":var _a=$(".WXA11Y");_a.toggleClass("WXA11Y-MIN");var _aismin=_a.hasClass("WXA11Y-MIN");if(_aismin)
require.bodyPT(62);else
require.bodyPT(84);require.setCookie("WXA11YFOLD",_aismin,"8h");break;case"WX-easyRead-Smooth":ScreenRead.StopAllRead();fontObj.changeColor(false);$(".a11ytoolbar .active").each(function(){$(this).trigger("click");});if(ps.PageScale!=1)
{ps.PageScale=1;ps.mainDocument.removeAttr("style");}
$WXA11yOpen.trigger("click");break;}});$(document).on("click","#a11ydisplay span",function(){$("#tool-screen").trigger("click");})
$(document).focus();$(document).bind('keydown',function(e){if(e.keyCode==49&&e.altKey){$("#tool-line").trigger("click");}
if(e.keyCode==50&&e.altKey){$("#tool-screen").trigger("click");}
if(e.keyCode==51&&e.altKey){$("#tool-contrast").trigger("click");}
if(e.keyCode==52&&e.altKey){$("#font-lagre").trigger("click");}
if(e.keyCode==53&&e.altKey){$("#font-small").trigger("click");}
if(e.keyCode==54&&e.altKey){$("#page-zoomin").trigger("click");}
if(e.keyCode==55&&e.altKey){$("#page-zoomout").trigger("click");}
if(e.keyCode==56&&e.altKey){$("#tts-single").trigger("click");}
if(e.keyCode==57&&e.altKey){$("#tts-screenread").trigger("click");}
if(e.keyCode==48&&e.altKey){$("#WX-easyRead-Smooth").trigger("click");}});return this;},setValue:function(v,callback){}});})(jQuery);jQuery(document).ready(function(){var _a11y=$.fn.WXA11y();})