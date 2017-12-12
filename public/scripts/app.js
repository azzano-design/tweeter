/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from tweets.json
var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
];



function renderTweets(tweets) {
  // loops through tweets
  for (var tweet of tweets) {
    // calls createTweetElement for each tweet and takes return value and appends it to the tweets container
    $('.container').append(createTweetElement(tweet));
  }
}

function createTweetElement(tweet) {
  console.log(tweet);
  // add all content for header
  var $tweetHeader = $('<header>').addClass('tweet-header');
  var $tweetAuthorThumb = $('<div>').addClass('tweet-author-thumb-container');
  var $tweetAuthorThumbFrame = $('<div>').addClass('tweet-author-thumb-frame');
  var $tweetAuthorThumbImg = $('<img>').addClass('tweet-author-thumb').attr("src", tweet.user.avatars.large);
  var $tweetAuthorName = $('<h4>').addClass('tweet-author-name').text(tweet.user.name);
  var $tweetAuthorUsername = $('<span>').addClass('tweet-author-username').text(tweet.user.handle);
  // append it all to their parents, then append to header
  $tweetAuthorThumb.append($tweetAuthorThumbFrame);
  $tweetAuthorThumbFrame.append($tweetAuthorThumbImg);
  $tweetHeader.append($tweetAuthorThumb, $tweetAuthorName, $tweetAuthorUsername);
  // add all content for tweet content
  var $tweetContent = $('<div>').addClass('tweet-content').text(tweet.content.text);
  // add all content for tweet footer
  var $tweetDate = $('<span>').addClass('tweet-date').text(tweet.created_at);
  var $tweetFooter = $('<footer>').addClass('tweet-footer');
  $tweetFooter.append($tweetDate);
  // call the tweet element
  var $tweet = $('<article>').addClass('tweet');
  // append everything to the article for the tweet
  $tweet.append($tweetHeader, $tweetContent, $tweetFooter);
  return $tweet;
}

$(document).ready(function () {
  renderTweets(data);
})