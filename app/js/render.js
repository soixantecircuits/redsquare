var renderPhoto = function(){
  html2canvas($("#main-view"), {
    onrendered: function(canvas) {
       var base64JPEG = canvas.toDataURL("image/jpeg");
       base64JPEG = base64JPEG.substr("data:image/jpeg;base64,".length, base64JPEG.length);
       imageToBeSent = {
            "type": "image/jpeg",
            "name": "SHOOT",
            "content": base64JPEG
       };
       hideUserPicture();
       showForm();
    }
  });  
}
