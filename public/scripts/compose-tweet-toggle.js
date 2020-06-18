$(() => {
  $("#writeTweet").click(function () {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  })

  $("#hiddenWriteTweet").click(function () {
    $(".new-tweet").slideToggle();
    $("#tweet-text").focus();
  })
})