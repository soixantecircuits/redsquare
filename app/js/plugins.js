$(window).resize(function(){

  $('.center-vertical').css({
   position:'absolute',
   top: ($(window).height() 
     - $('.center-vertical').outerHeight())/2
  });
    
 });
 
 // To initially run the function:
 $(window).resize();