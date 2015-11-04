// ==UserScript==
// @name        Vk image scroll
// @namespace   vk.com
// @include     http://vk.com/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://raw.githubusercontent.com/brandonaaron/jquery-mousewheel/master/jquery.mousewheel.min.js
// ==/UserScript==

var $ = unsafeWindow.jQuery;
var FR_STOP_WORDS = ['читать подробнее:', 'рублей', 'http://','посмотреть продолжение','вступай в группу','скидки'];

$(document).ready(function(){
   setInterval(function(){
      if ($('#pv_photo:not(.wheeler)').is(':visible')) {
            $('#pv_photo')
              .mousedown(function(e){
                if (e.which==2) window.open($('#pv_photo img').attr('src'));
              })
              .on('mousewheel', function(event) {
                $((event.deltaY<0) ? '#pv_photo' : '#pv_left_nav').click().mousedown();    
              })
              .addClass('wheeler')
            ;
      }
   }, 1500);
/*   
   setInterval(function(){
     if (document.URL.indexOf('/feed')>-1) {
       var jFr = $('.feed_row');
       if (jFr.length>0) {
           jFr.each(function(index, element) {
               var jEl = $(element);
               var text = jEl.text().toLowerCase();
                FR_STOP_WORDS.some(function(stopWord) {
                    if (text.indexOf(stopWord)>-1) {
                      jEl.hide();
                      return false;
                    }
                });           
           });
       }
     }
   }, 5000);  
*/   
});
