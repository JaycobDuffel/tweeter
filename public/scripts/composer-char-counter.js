$(() => {
  $("#tweet-text").keyup(function() {
    let count = this.value.length;
    $(".counter").text(140 - count)
    if (this.value.length > 140) {
      $(".counter").addClass("red");
    } else {
      $(".counter").removeClass("red");
    }
  })
})
