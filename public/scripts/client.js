/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(() => {
  // template for displaying our tweets
  const createTweetElement = (tweetData) => {
    const $tweet = $(`
    <article class="tweetArticle">
      <header>
        <div id="avatar">
          <img src="${tweetData.user.avatars}">
          <span id="name">${tweetData.user.name}</span>
        </div>
        <span class="handle username">${tweetData.user.handle}</span>
      </header>
      <span id="tweetSpan">${escape(tweetData.content.text)}</span>
      <footer>
        <span>${new Date(tweetData.created_at).toDateString()}</span>
        <div class="tweetButtons">
          <a href="#"><img src="/images/002-flag.png" alt="flag-tweet"></a>
          <a href="#"><img src="/images/001-retweet.png" alt="retweet"></a>
          <a href="#"><img src="/images/003-love.png" alt="heart-tweet"></a>
        </div>
      </footer>
    </article>`)

    return $tweet;
  }

  //break function
  const escape = function (str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  }


  // gets data from server and renders tweets
  const renderTweets = (tweets) => {
    for (const tweet of tweets) {
      const $tweet = createTweetElement(tweet)
      $('#tweet-container').prepend($tweet)
    }
  }
  //sticky nav bar
  $(document).ready(function () {
    $(document).scroll(function () {
      var scroll = $(this).scrollTop();
      var topDist = $("#header").position();
      if (scroll > topDist.top) {
        $('nav').addClass('sticky');
      } else {
        $('nav').removeClass('sticky');
      }
    })
  });

  // submiting the post to server
  $(function () {
    const $button = $('#submitTweetBtn')
    $button.on("click", (event) => {
      event.preventDefault(event);

      // display error message if character count is exceeded
      if ($("#tweet-text").val().length > 140) {
        $("#exceededCharLimit").removeClass("error").addClass("errorRed")
        // remove error message after delay

        setTimeout(() => {
          $("#exceededCharLimit").removeClass("errorRed").addClass("error")
        }, 3000);

        // display error message if input is empty
      } else if ($("#tweet-text").val() === "" || $("#tweet-text").val() === null) {
        $("#emptyText").removeClass("error").addClass("errorRed")
        // remove error message after delay
        setTimeout(() => {
          $("#emptyText").removeClass("errorRed").addClass("error")
        }, 3000);
      } else {
        // if no error, post the tweet
        const data = $("#txtArea").serialize();
        $.post("/tweets", data)
          .then(function () {
            // function GETs tweets from server and prepends them to DOM
            loadTweets();
            // clearing input & setting input as focus
            $("#tweet-text").val("");
            $("#tweet-text").focus();
            $(".counter").val(140);
          })
      }
    })
  })

  // getting tweet objects from server
  const loadTweets = () => {
    $.getJSON('/tweets')
      .then(function (data) {
        $('#tweet-container').empty();
        renderTweets(data);
      })
  }

  loadTweets();
})
