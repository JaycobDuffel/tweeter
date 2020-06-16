$(document).ready(function() {
  // --- our code goes here ---
  console.log('DOM is ready')
});

$("#tweet-text").keyup(function() {
  let count = this.value.length + 1;
  $(".counter").text(141 - count)
  if (this.value.length > 140) {
    $(".counter").addClass("red");
  } else {
    $(".counter").removeClass("red");
  }
})