$(function(){ 
    // do something 
  var script=document.createElement("script");  
  script.type="text/javascript";  
  script.src="http://www.microsoftTranslator.com/ajax/v3/WidgetV3.ashx?siteData=ueOIGRSKkd965FeEGM5JtQ**";  
  document.getElementsByTagName('head')[0].appendChild(script);  


  var value = sessionStorage.getItem("language");
  
  document.onreadystatechange = function () {
      if (document.readyState == 'complete') {
      	setTimeout(function(){
      		if(value==="1"){
      			
      		  $(".headTitle .right ul li").css({
		      'max-width':'none',
		      'font-size':'17px'
		    });
		
		    $('.main .item .hd strong').css({
		      'font-size':'17px'
		    })
		
		    $('.main .item .bd').css({
		      'font-size':'14px',
		      'line-height':'28px'
		    })
		
		    $('.main .ifoItem ul li').css({
		      'font-size':'14px',
		      'line-height':'14px'
		    })
		
		    $('.pubFooter .item h3').css({
		      'font-size':'17px'
		    })
		
		    $('.pubFooter .item ul li strong').css({
		      'font-size':'12px'
		    })
		
		    //修改公司信息
		    $('.section .secTitle h2').css({
		      'font-size':'20px'
		    })
		
		    $('.section .bd ul li strong,.section .bd ul li b').css({
		      'font-size':'14px'
		    })
		
		    //公司简介
		    $('.section .bd .right').css({
		      'padding':'0 40px 0 70px'
		    })
		
		    $('.section .bd .right p').css({
		      'font-size':'14px',
		      'line-height':'26px'
		    })
		
		    //核心业务
		    $('.section .bd .item').css({
		      'margin-bottom':'40px'
		    })
		
		    $('.section .bd .item h4').css({
		      'font-size':'17px',
		      'line-height':'17px'
		    })
		
		    $('.section .bd .item ul li').css({
		      'font-size':'14px'
		    })
		
		    //篇首语
		    $('.section .bd .toYours p').css({
		      'font-size':'14px',
		      'line-height':'22px'
		    })
		
		    $('.section .bd .worker .marginRight54').css({
		      'margin-right':'none'
		    })
		
		    $('.section .bd .worker p').css({
		      'float':'right',
		      'font-size':'16px',
		      'line-height':'20px',
		      'margin-right':'84px'
		    })
              Microsoft.Translator.Widget.Translate('zh-CHS', 'en', onProgress, onError, onComplete, onRestoreOriginal, 2000);
          	}
      	},200);
      }
  }
  function onProgress(value) {
  }
  function onError(error) {
  }
  function onComplete() {
      $("#WidgetFloaterPanels").hide();
  }
  function onRestoreOriginal() { 
  }
});

function translate(){
  var value = sessionStorage.getItem("language");
  if(value==="1"){
      sessionStorage.setItem("language", "0"); 
  }else{
      sessionStorage.setItem("language", "1");
  }
  window.location.reload();//刷新当前页面.
}
