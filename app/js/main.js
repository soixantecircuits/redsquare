'use strict';

var imageToBeSent = {};
var restartDelay = 2000;
var app = {
  shouldShoot: true,
  menuHidden: true,
  timer: 0,
  timerAction: '',
  autoLoadPartial: 0,
  count:0
};


var displayImage = function(src) {
  $("#main-view").backstretch(src);
}

var hideDynamic = function(el) {
  $(el).fadeOut(100, function() {
    $(el).addClass('visuallyhidden');
  });
}

var showDynamic = function(el) {
  $(el).fadeOut(0).removeClass('visuallyhidden').fadeIn(1000);
}

var reshoot = function() {
  togglesShoot();
  $("#main").load("picture.html", function(data) {
    customload(data);
  });
}

var shoot = function() {
  startCountdown();
}

var startCountdown = function() {
  $(".logo-place").hide();
  var seconds = Number($("#countdown").data('timer'));
  app.timer = seconds;
  app.timerAction = setInterval(function() {
    app.timer = app.timer - 1;
    $("#countdown").html(app.timer);
    if (app.timer <= 0)
      clearInterval(app.timerAction);
  }, 1000);
  $("#countdown").html(seconds);
  setTimeout(function() {
    sendShoot();
  }, seconds * 1000);
}

var showInfo = function(title, message) {
  $(".md-modal").find("h3").html(title);
  $(".md-text > p").html(message);
  $('.md-trigger').modalEffects('show');
};

var handleClick = function(el) {
  if ($(el.target).hasClass("disable") || $(el.target).parent().hasClass("disable")) {
    var message = $(el.target).data("message") || $(el.target).parent().data("message");
    var title = $(el.target).data("title") || $(el.target).parent().data("title");
    showInfo(title, message);
  } else {
    var functionName = $(el.target).data('click') || $(el.target).parent().data('click');
    if (window[functionName] !== undefined)
      window[functionName]('test');
    else {
      var pageLoad = $(el.target).data('click') || $(el.target).parent().data('click');
      var target = $(el.target).data('target') || $(el.target).parent().data('target');

      $(target).load(pageLoad, function(data) {
        customload(data);
      });
    }
  }

};

var customload = function(data) {
  $.each($(data).filter('*[data-click]'), function(index, el) {
    if ($(el).data("reload")) {
      $('body').one('click', '#' + $(el).attr('id'), function(el) {
        handleClick(el);
      });
    } else {
      $('body').on('click', '#' + $(el).attr('id'), function(el) {
        handleClick(el);
      });
    }
  });

  var $form = $(data).find('form');
  if ($form.length > 0) {
    $.validate();
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
    if (app.menuHidden) {
      showDynamic("#navigation");
      app.menuHidden = false;
    }
  }
  app.count++;
  if (app.count == app.autoLoadPartial) {
      $('.md-trigger').modalEffects('init');
      $(window).resize();
  }
}

var hideUserPicture = function() {
  $(".backstretch").fadeOut(1000, function() {
    $(".backstretch").remove();
  });
};

var showForm = function() {
  showDynamic("form");
  initKeyboard();
};

var togglesShoot = function() {
  if (app.shouldShoot) {
    $("#reshoot").hide();
    $("#send").addClass("disable");
    $("#shoot").show();
  } else {
    $("#shoot").hide();
    $("#send").removeClass("disable");
    $("#reshoot").show();
  }
  $(".logo-place").show();
  app.shouldShoot = !app.shouldShoot;
}


var restart = function() {
  togglesShoot();
  hideDynamic("#thanks");
  $(".keyboard").remove();
  $("#main").load("start.html", function(data) {
    customload(data);
  });
};


$(function() {
  var $listOfAutoload = $('*[data-autoload]');
  app.autoLoadPartial = $listOfAutoload.length;
  $.each($listOfAutoload, function(index, el) {
    var $el = $(el);
    $($el.data('target')).load($el.data('autoload'), function(data) {
      customload(data);
      togglesShoot();
    });
  });
});