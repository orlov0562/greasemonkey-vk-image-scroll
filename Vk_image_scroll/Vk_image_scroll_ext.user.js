// ==UserScript==
// @name        Vk image scroll
// @namespace   vk.com
// @include     https://vk.com/*
// @version     1
// @grant       none
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @require     https://raw.githubusercontent.com/brandonaaron/jquery-mousewheel/master/jquery.mousewheel.min.js
// ==/UserScript==
var $ = unsafeWindow.jQuery;
$(document).ready(function () {
  setInterval(function () {
    
    // Photo scroller --------------------------------------------------------------------
    if ($('#pv_photo:not(.wheeler)').is(':visible')) {
      $('#pv_photo').mousedown(function (e) {
        if (e.which == 2) window.open($('#pv_photo img').attr('src'));
      }).on('mousewheel', function (event) {
        $((event.deltaY < 0) ? '#pv_photo' : '#pv_left_nav').click().mousedown();
      }).addClass('wheeler')
      ;
    }
    // ^^Photo scroller -------------------------------------------------------------------
    
    // Documents preview -------------------------------------------------------------------
    
    if ($('#docs_list').length > 0 || $('#docs_choose_rows').length > 0) {
      if ($('#custom_docs_preview').length < 1) {
        $('body').append('<iframe src="https://vk.com/doc82289161_437174228"'+
                         ' id="custom_docs_preview" '+
                         'style="width:400px; height:100%; border:none; border-left:1px solid #D9E0E7; position:fixed; top:0; right:0; z-index:10000;"'+
                         '></iframe>'
        );
      }      
      
      var docs_preview = $('a.docs_item_name:not(.custom_preview)');
      if (docs_preview.length > 0) {
        for (var i = 0; i < docs_preview.length; i++) {
          $(docs_preview[i]).on('mouseover', function () {
            if ($(this).parent().parent().find('a.docs_item_thumb').length<1) {
              $('#custom_docs_preview:visible').attr('src', 'https://vk.com/doc82289161_437174228').hide();
              return false;
            }
            if ($('#custom_docs_preview').attr('src') != this.href) {
             $('#custom_docs_preview').attr('src',this.href);
             $('#custom_docs_preview:hidden').show();              
            }
          }).addClass('custom_preview');
          
          $(docs_preview[i]).parent().parent().find('a.docs_item_thumb').prop('onmouseover',null).off('mouseover');
          
          $(docs_preview[i]).parent().parent().find('img.docs_item_thumb_img').on('mouseover', function () {
            var src = $(this).parent().parent().find('a.docs_item_name')[0].href;
            if ($('#custom_docs_preview').attr('src') != src) {
             $('#custom_docs_preview').attr('src', src);
             $('#custom_docs_preview:hidden').show();
            }
          });
          $(docs_preview[i]).parent().parent().find('a.docs_item_icon').on('mouseover', function () {
            $('#custom_docs_preview:visible').attr('src', 'https://vk.com/doc82289161_437174228').hide();
          });          
        }
      }

      var docs_preview = $('a.docs_choose_link:not(.custom_preview)');
      if (docs_preview.length > 0) {
        for (var i = 0; i < docs_preview.length; i++) {
          $(docs_preview[i]).on('mouseover', function () {
            if ($(this).parent().parent().find('img.docs_choose_photo').length<1) {
              $('#custom_docs_preview:visible').attr('src', 'https://vk.com/doc82289161_437174228').hide();
              return false;
            }            
            if ($('#custom_docs_preview').attr('src') != this.href) {
             $('#custom_docs_preview').attr('src',this.href);
             $('#custom_docs_preview:hidden').show();
            }
          }).addClass('custom_preview');
          
          $(docs_preview[i]).parent().parent().find('div.docs_choose_icon a').prop('onmouseover',null).off('mouseover');
         
          $(docs_preview[i]).parent().parent().find('img.docs_choose_photo').on('mouseover', function () {
            var src = $(this).parent().parent().parent().find('a.docs_choose_link')[0].href;
            if ($('#custom_docs_preview').attr('src') != src) {
             $('#custom_docs_preview').attr('src', src);
             $('#custom_docs_preview:hidden').show();
            }
          });
          
          $(docs_preview[i]).parent().parent().find('a.docs_choose_def_icon').on('mouseover', function () {
            $('#custom_docs_preview:visible').attr('src', 'https://vk.com/doc82289161_437174228').hide();
          });
        }
      }
    } else {
      $('#custom_docs_preview').remove();
    }
    // ^^Documents preview -------------------------------------------------------------------    
    
  }, 1500);
});
