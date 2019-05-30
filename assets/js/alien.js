document.addEventListener("DOMContentLoaded", () => {
  const intro = $(".intro"),
    main = $(".main-container"),
    video = $("#bgvid"),
    enterWebsiteButton = $(".enter-website"),
    titles = document.querySelectorAll(".title"),
    firstSection = document.querySelector("section");

  // enter the website animation
  $(enterWebsiteButton).click(function() {
    $(enterWebsiteButton).fadeOut("slow");
    $(intro).css("opacity", "0.2");
    $(main).addClass("website-active");
    // just making sure
    $(video).prop("muted", true);
    // scrolls down to the first section
    $("html, body").animate(
      {
        scrollTop:
          $(firstSection).offset().top -
          firstSection.style.marginTop -
          Number(
            window.getComputedStyle(firstSection).marginTop.replace(/px/, "")
          )
      },
      900
    );
  });

  // event slider animation

  const nextBtn = document.querySelector(".next"),
    previousBtn = document.querySelector(".previous"),
    itemsArr = document.querySelectorAll(".event"),
    // hides button
    disabledBtn = { opacity: "0", cursor: "default" },
    // shows button
    enabledBtn = { opacity: "1", cursor: "pointer" },
    baseMovement = 103,
    itemsPerColumn = 3,
    nrColoumns = Math.ceil(itemsArr.length / itemsPerColumn);
  let multiplier = 0;

  eventsSlider = (_this, n) => {
    const sliderPod = document.querySelector(".slider-pod");
    // if controller button is next
    _this.classList.contains("next")
      ? multiplier < n - 1
        ? (multiplier++,
          multiplier + 1 === n
            ? Object.assign(nextBtn.style, disabledBtn)
            : null,
          multiplier > 0 ? Object.assign(previousBtn.style, enabledBtn) : null)
        : null
      : multiplier > 0
      ? // if controller button is previous
        (multiplier--,
        multiplier < n - 1 ? Object.assign(nextBtn.style, enabledBtn) : null,
        multiplier === 0 ? Object.assign(previousBtn.style, disabledBtn) : null)
      : null;
    // the slider pod moves according to the column shown
    sliderPod.style.transform = `translate(calc(100%*${multiplier} + 2*${multiplier}%))`;
    itemsArr.forEach(
      item =>
        (item.style.transform = `translate(-${baseMovement * multiplier}%)`)
    );
    eventOpacity(multiplier);
  };

  sliderPodHandler = n => {
    const sliderPod = document.querySelector(".slider-pod");
    // sets the slider pod width equally wide to the slider slots width
    sliderPod.style.width = `calc(${100 / n}% - 1.5px)`;
    $(".slider-slot").click(function() {
      multiplier = $(".slider-slot").index(this);
      multiplier > 0
        ? Object.assign(previousBtn.style, enabledBtn)
        : Object.assign(previousBtn.style, disabledBtn);
      multiplier === n - 1
        ? Object.assign(nextBtn.style, disabledBtn)
        : Object.assign(nextBtn.style, enabledBtn);
      sliderPod.style.transform = `translate(calc(100%*${multiplier} + 2*${multiplier}%)`;
      itemsArr.forEach(
        item =>
          (item.style.transform = `translate(-${baseMovement * multiplier}%)`)
      );
      eventOpacity(multiplier);
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
  centerTitles = () => {
    let transValue;
    // centers (or tries to) the .titles
    titles.forEach(title => {
      let lettersArr = [...title.innerText];
      lettersArr.length > 6
        ? ((transValue = 17 * (lettersArr.length - 6)),
          (title.style.transform = `translateY(${transValue}px) rotate(-90deg)`))
        : null;
    });
  };

  eventOpacity = x => {
    for (let i = 0; i < itemsArr.length; i++) {
      itemsArr[i].style.opacity = 0.3;
      let opacity = i >= x * 3 && i < (x + 1) * 3 ? 1 : 0.2;
      itemsArr[i].style.opacity = opacity;
    }
  };

  // function calls

  $(".controller").click(function() {
    eventsSlider(this, nrColoumns);
  });

  createSliderSlots(nrColoumns);
  centerTitles();
  eventOpacity(multiplier);
  const options = {
    scale: 1.4,
    glare: true,
    maxGlare: 2,
    speed: 2200,
    perspective: 800,
    maxTilt: 30
  };
  const tilt = [
    $(".eshop-item-container").tilt(options),
    $(".business-card").tilt(options, (options.scale = 1.2))
  ];
  tilt.on("change", callback); // parameters: event, transforms
  tilt.on("tilt.mouseLeave", callback); // parameters: event
  tilt.on("tilt.mouseEnter", callback); // parameters: event
});
