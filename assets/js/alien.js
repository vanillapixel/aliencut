const intro = $(".intro"),
  main = $(".main-container"),
  video = $("#bgvid"),
  audioButton = $(".speaker-icon-audio-on"),
  enterWebsiteButton = $(".enter-website"),
  audioStatus = $(".speaker-icon-audio-on:after"),
  sidebar = $(".sidebar-container");

$(video).prop("volume", 0.3);

// audio on/off button
$(audioButton).click(function() {
  if ($(video).prop("muted")) {
    $(this).toggleClass("audio-on");
    $(video).prop("muted", false);
  } else {
    $(video).prop("muted", true);
    $(this).removeClass("audio-on");
  }
});

// $(video).click(function() {
//         this.paused ? this.play() : this.pause();
//     });

//enter the website animation
$(enterWebsiteButton).click(function() {
  // $(enterWebsiteButton).text('Loading...');
  $(enterWebsiteButton).fadeOut("slow");
  $(intro).css("opacity", "0.2");
  $(main).css("z-index", "9999");
  $(main).addClass("website-active");
  $(video).prop("muted", true);
  lateralMenu(500);
});

//menu animation

function lateralMenu() {
  // TODO: either reactivate or delete
  // $(sidebar).css(
  //   "transform",
  //   "translateX(0vw) scale(1) rotate(-10deg) skew(-10deg)"
  // );
}

const baseMovement = 103;
let multiplier = 0;

eventsSlider = (_this, n) => {
  if ($(_this).hasClass("next")) {
    if (multiplier < n - 1) {
      multiplier = multiplier + 1;
      $(".event").css("transform", `translate(-${baseMovement * multiplier}%)`);
      if (multiplier === n - 1) $(".next").css("opacity", "0");
    }
    if (multiplier > 0) {
      $(".previous").css("opacity", "1");
    }
  }
  // if the controller button is 'previous'
  else if (multiplier > 0) {
    multiplier = multiplier - 1;
    $(".event").css("transform", `translate(-${baseMovement * multiplier}%)`);
    if (multiplier < n - 1) $(".next").css("opacity", "1");
    if (multiplier === 0) {
      $(".previous").css("opacity", "0");
    }
  }
};

$(".controller").click(function() {
  const eventsColoumns = Math.ceil($(".event").length / 3);
  eventsSlider(this, eventsColoumns);
});
