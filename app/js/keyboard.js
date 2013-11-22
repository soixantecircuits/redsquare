var initKeyboard = function(){
  $('body').keyboard({
    keyboard: 'qwerty',
    plugin: 'form'
  });
  $('#keyboard').bind('change', function() {
    $('body').keyboard('keyboard', $(this).val());
  });
}
