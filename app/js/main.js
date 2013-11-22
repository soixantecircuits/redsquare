'use strict';

var imageToBeSent = {};
var restartDelay = 2000;

var displayImage = function(src){
  $("#main-view").backstretch(src);
}

var hideDynamic = function(el){
  $(el).fadeOut(100, function(){
        $(el).addClass('visuallyhidden');
  });
}

var showDynamic = function(el){
   $(el).fadeOut(0).removeClass('visuallyhidden').fadeIn(1000);
}


var customload = function(data) {
  $.each($(data).filter('*[data-click]'), function(index, el) {
      if($(el).data("reload")){
        $('body').one('click', '#' + $(el).attr('id'), function(el) {
          var functionName = $(el.target).data('click') || $(el.target).parent().data('click');
          if(window[functionName] !== undefined)
            window[functionName]('test');
          else {
            var pageLoad = $(el.target).data('click') || $(el.target).parent().data('click');
            var target = $(el.target).data('target') || $(el.target).parent().data('target');

            $(target).load(pageLoad, function(data) {
              customload(data);
            });
          }
        });
      } else {
        $('body').on('click', '#' + $(el).attr('id'), function(el) {
          var functionName = $(el.target).data('click') || $(el.target).parent().data('click');
          if(window[functionName] !== undefined)
            window[functionName]('test');
          else {
            var pageLoad = $(el.target).data('click') || $(el.target).parent().data('click');
            var target = $(el.target).data('target') || $(el.target).parent().data('target');

            $(target).load(pageLoad, function(data) {
              customload(data);
            });
          }
        });
      }
  });

  var $form = $(data).find('form');
  if($form.length > 0){
      $('body').one('submit', '#form', function(el) {
        var param = $("#form").serializeJSON();
        sendTheMail(param);
        
        $("#main").children().hide();
        showDynamic("#thanks");

        setTimeout(restart, restartDelay);
        return false;
      });
      renderPhoto();
      hideDynamic("#navigation");
  }

  var $image = $(data).find('.backstretch');
  if ($image.length > 0) {
      displayImage(settings.webcam.address);
      showDynamic("#navigation");
  }
}

var hideUserPicture = function(){
  $(".backstretch").fadeOut(1000,function(){
    $(".backstretch").remove();
  });
};

var showForm = function(){
  showDynamic("form");
};


var restart = function(){
  hideDynamic("#thanks");
  $("#main").load("start.html", function(data) {
      customload(data);
  });
}

$(function() {
    var $listOfAutoload = $('*[data-autoload]');
    $.each($listOfAutoload, function(index, el) {
        var $el = $(el);
        $($el.data('target')).load($el.data('autoload'), function(data) {
          customload(data);
        });
    });
});