// Determine current address
var currentAddress = window.location.href;

if (currentAddress.indexOf("/posts/") > -1){
  // Randomly select a number between 1 and 24
  var imageNumber = Math.floor(Math.random() * 24) + 1;
  var imageAddress = '/images/cover_images/blue' + imageNumber + '.jpg';
  document.getElementById('coverImage').innerHTML = '<div class="hero" style="background-image: url(' + imageAddress + ');"><h1 class="display_title">Doug Duhaime</h1></div>';
}
else {
  var imageAddress = '/images/cover_images/blue6.jpg'
  document.getElementById('coverImage').innerHTML = '<div class="hero" style="background-image: url(' + imageAddress + ');"><h1 class="display_title">Doug Duhaime</h1></div>';
}

