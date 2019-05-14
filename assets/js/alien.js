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
  const sliderPod = document.querySelector(".slider-pod");

  if ($(_this).hasClass("next")) {
    if (multiplier < n - 1) {
      multiplier = multiplier + 1;
      sliderPod.style.transform = `translate(calc(100%*${multiplier} + 2*${multiplier}%))`;
      $(".event").css("transform", `translate(-${baseMovement * multiplier}%)`);
      if (multiplier + 1 === n) {
        $(".next").css({ opacity: "0", cursor: "default" });
      }
    }
    if (multiplier > 0) {
      $(".previous").css({ opacity: "1", cursor: "pointer" });
    }
  }
  // if the controller button is 'previous'
  else if (multiplier > 0) {
    multiplier = multiplier - 1;
    sliderPod.style.transform = `translate(calc(100%*${multiplier} + 2*${multiplier}%))`;
    $(".event").css("transform", `translate(-${baseMovement * multiplier}%)`);
    if (multiplier < n - 1) {
      $(".next").css({ opacity: "1", cursor: "pointer" });
    }
    if (multiplier === 0) {
      $(".previous").css({ opacity: "0", cursor: "default" });
    }
  }
};
sliderPodHandler = n => {
  const sliderPod = document.querySelector(".slider-pod");
  // sets the slider pod width equally wide to the slider slots width
  sliderPod.style.width = `calc(${100 / n}% - 1.5px)`;
  $(".slider-slot").click(function() {
    multiplier = $(".slider-slot").index(this);
    if (multiplier > 0) {
      $(".previous").css({ opacity: "1", cursor: "pointer" });
      sliderPod.style.transform = `translate(calc(100%*${multiplier} + 2*${multiplier}%)`;
      $(".event").css("transform", `translate(-${baseMovement * multiplier}%)`);
    }
    if (multiplier === 0) {
      $(".previous").css({ opacity: "0", cursor: "default" });
      sliderPod.style.transform = `translate(calc(100%*${multiplier} + 3*${multiplier}%)`;
      $(".event").css("transform", `translate(-${baseMovement * multiplier}%)`);
    }
    multiplier + 1 === n
      ? $(".next").css({ opacity: "0", cursor: "default" })
      : $(".next").css({ opacity: "1", cursor: "pointer" });
  });
};
createSliderSlots = n => {
  const sliderBar = document.querySelector(".slider-bar");
  for (let i = 0; i < n; i++) {
    // creates a slider slot in the slider bar for each slider coloumn
    sliderBar.innerHTML += `<div class='slider-slot'></div>`;
    sliderPodHandler(n);
  }
};

// function calls

$(".controller").click(function() {
  const eventsColoumns = Math.ceil($(".event").length / 3);
  eventsSlider(this, eventsColoumns);
});

document.addEventListener("DOMContentLoaded", () => {
  const eventsColoumns = Math.ceil($(".event").length / 3);
  createSliderSlots(eventsColoumns);
});
