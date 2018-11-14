$(function() {
  let channel = 1;
  let power = false;
  let powerUp = false;
  let id;
  if ($('main').hasClass("hero") == true){
     console.log('yolo');
  var catArr = [
      "To Be Hero chinse anime trailer",
      "To Be Hero chinse anime opening",
      "To Be Hero chinse anime ending",
      "To Be Hero chinse anime episode 1",
      "To Be Hero chinse anime review",
      "To Be Hero chinse anime ayumi"
      
    ];
  }else if ($('main').hasClass("king") == true){
    console.log('yolo');
    var catArr = [
      "The King's Avatar trailer",
      "The King's Avatar opening",
      "The King's Avatar ending",
      "The King's Avatar episode 1",
      "The King's Avatar fight scene",
      "The King's Avatar review",
    ];
  }
  
  let videos = [];
  let channelArr = [];
  let vidArr = [];
  let timeArr = [];
  const crtOn = new Audio("http://www.jarrodyellets.com/sounds/CRTOn.mp3");
  const crtOff = new Audio("http://www.jarrodyellets.com/sounds/CRTOff.mp3");
  const chSound = new Audio("http://www.jarrodyellets.com/sounds/chSound.mp3");
  const apiURL = "https://www.googleapis.com/youtube/v3/search";
  const apiKey = "AIzaSyDVvGqIz6QI4X_Z7O2VHPuxNw5oaEtBTWk";
  let Channel = function(channel, id, description) {
    this.channel = channel;
    this.id = id;
    this.description = description;
  };

  grabVideos();

  $(".power").on("click", function() {
    power = !power;
    $(".power").toggleClass("powerOn");
    if (power) {
      crtOn.play();
      powerUp = true;
      videoArr = [];
      insertVideos();
      $(".channelScreen").append("**");
      $(".screen").addClass("crt");
      startUp();
      console.log(videos);
    } else if (!power) {
      crtOn.pause();
      crtOn.currentTime = 0;
      crtOff.play();
      setTimeout(function() {
        turnOff();
      }, 300);
      $(".channelScreen").empty();
      channel = 1;
      timeArr.forEach(function(time) {
        clearTimeout(time);
      });
    }
  });
  $("#upButton").on("click", function() {
    chSound.play();
    if (channel < catArr.length + 1 && power && !powerUp) {
      channel++;
      clearDiv(".channelScreen", channel);
      playVideo();
      console.log();
    }
  });
  $("#downButton").on("click", function() {
    chSound.play();
    if (channel > 1 && power && !powerUp) {
      channel--;
      clearDiv(".channelScreen", channel);
      playVideo();
    }
  });

  function startUp() {
    let startImage = "<div class='startImage onScreen'></div>";
    $(".screen").append(startImage);
    timeArr.push(
      setTimeout(function() {
        playVideo();
      }, 3000)
    );
  }

  function playVideo() {
    powerUp = false;
    clearDiv(".channelScreen", channel);
    let now = new Date();
    var time = now.toLocaleTimeString();
    let divString = "";
    if (channel == 1) {
      $(".screen").empty();
      for (var j = 0; j < videos.length; j++) {
        let channelNum = j + 2;
        divString +=
          "<div class='channelLine'><div class='channelNumber'>" +
          channelNum +
          ". " +
          videos[j].channel +
          ":  </div><div class='description'>" +
          videos[j].description.substring(0, 30) +
          "...</div></div>";
      }
      $(".screen").append(
        "<div class='channelList onScreen'><h4>Channel Guide</h4><div class='channelNumber'>1. Channel Guide</div><div class='time'>" +
          now.toDateString() +
          " | " +
          time +
          "</div>" +
          divString
      );
      $(".screen").append(
        "<div class='channels'>" + channel + ". Channel Guide</div>"
      );
    } else if (channel > 1) {
      id = videos[channel - 2].id;
      let iFrame =
        "<iframe class='movie onScreen' src='https://www.youtube.com/embed/" +
        id +
        "?rel=0&amp;controls=0&amp;showinfo=0&autoplay=1&playsinline=1&lang=fr'></iframe>";
      $(".screen").empty();
      $(".screen").append(iFrame);
      $(".screen").append(
        "<div class='channels'>" +
          channel +
          ". " +
          videos[channel - 2].channel +
          "</div>"
      );
    }
  }

  function turnOff() {
    $(".onScreen").addClass("turnOff");
    setTimeout(function() {
      $(".screen").empty();
      $(".screen").removeClass("crt");
    }, 275);
  }

  function grabVideos() {
    vidArr = [];
    for (var i = 0; i < catArr.length; i++) {
      let q = catArr[i];
      $.get(
        apiURL,
        {
          part: "snippet, id",
          q: q,
          maxResults: 50,
          safeSearch: "moderate",
          videoLicense: "youtube",
          relevanceLanguage: "en",
          type: "video",
          key: apiKey
        },
        function(data) {
          vidArr.push(data);
          channelArr.push(q);
        }
      );
    }
  }

  function insertVideos() {
    videos = [];
    for (var i = 0; i < channelArr.length; i++) {
      let rand = Math.round(Math.random() * 49);
      videos.push(
        new Channel(
          channelArr[i],
          vidArr[i].items[rand].id.videoId,
          vidArr[i].items[rand].snippet.title
        )
      );
    }
  }

  function clearDiv(div, content) {
    $(div).empty();
    $(div).append(content);
  }
});
