//TODO: split scripts into different files

document.addEventListener("DOMContentLoaded", () => {
  const intro = $(".intro"),
    main = $(".main-container"),
    video = $("#bgvid"),
    enterWebsiteButton = $(".enter-website"),
    titles = document.querySelectorAll(".title"),
    firstSection = document.querySelector("section");

  // 'enter the website' animation
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
          // main.offset.top
          $(firstSection).offset().top -
          firstSection.style.marginTop -
          Number(
            window.getComputedStyle(firstSection).marginTop.replace(/px/, "")
          ) -
          60
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
    nrColumns = Math.ceil(itemsArr.length / itemsPerColumn),
    onMoveTransitionOptions = {
      transitionDelay: "0s",
      transitionTimingFunction: "cubic-bezier(0,.29,.41,.98)",
      transitionDuration: "1s"
    };
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
      : multiplier > 0 // if controller button is previous
      ? (multiplier--,
        multiplier < n - 1 ? Object.assign(nextBtn.style, enabledBtn) : null,
        multiplier === 0 ? Object.assign(previousBtn.style, disabledBtn) : null)
      : null;
    // the slider pod moves according to the column shown
    sliderPod.style.transform = `translate(${multiplier * 100 +
      2 * multiplier}%)`;
    itemsArr.forEach(
      item =>
        (item.style.transform = `translate(-${baseMovement * multiplier}%)`)
    );
    //FIXME: reactivate it once the dragging system is complete
    // opacityHandler(multiplier);
  };

  controllerUpdateHandler = () => {};

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
      sliderPod.style.transform = `translate(${multiplier * 100 +
        2 * multiplier}%)`;
      itemsArr.forEach(
        item =>
          (item.style.transform = `translate(-${baseMovement * multiplier}%)`)
      );
      //FIXME: reactivate it once the dragging system is complete
      // opacityHandler(multiplier);
    });
  };

  updatePodPositionHandler = eventTranslation => {
    const sliderPod = document.querySelector(".slider-pod");
    let { style } = sliderPod;
    const eventWidth = Number(
      window
        .getComputedStyle(document.querySelector(".event"))
        .width.replace(/px/, "")
    );
    style.transform = `translate(${(-eventTranslation / eventWidth) * 100}px)`;
    Object.assign(style, onMoveTransitionOptions);
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

  opacityHandler = x => {
    for (let i = 0; i < itemsArr.length; i++) {
      itemsArr[i].style.opacity = 0.3;
      let opacity = i >= x * 3 && i < (x + 1) * 3 ? 1 : 0.2;
      itemsArr[i].style.opacity = opacity;
    }
  };

  // function calls

  $(".controller").click(function() {
    eventsSlider(this, nrColumns);
  });

  createSliderSlots(nrColumns);
  centerTitles();
  //FIXME: reactivate it once the dragging system is complete
  // opacityHandler(multiplier);

  // -------------------------------------------------------
  // tilt script
  // -------------------------------------------------------

  const options = {
    scale: 1.4,
    glare: false,
    maxGlare: 2,
    speed: 2200,
    perspective: 800,
    maxTilt: 30
  };
  const getTranslateX = () => {
    let style = window.getComputedStyle(itemsArr[0]);
    let matrix = new WebKitCSSMatrix(style.webkitTransform);
    return matrix.m41;
  };

  $(".eshop-item-container").tilt(options),
    $(".business-card").tilt(options, (options.scale = 1.2));

  // -------------------------------------------------------
  // drag handler
  // -------------------------------------------------------

  const events = document.querySelector(".events");
  let dragging = false;
  let initialCoords = 0;
  let currCoords = 0;
  let currTranslation = getTranslateX();
  let itemWidth = Number(
    window.getComputedStyle(itemsArr[0]).width.replace(/px/, "")
  );

  events.onmousedown = e => {
    dragging = true;
    initialCoords = e.clientX;
    events.style.cursor = "grabbing";
    itemsArr.forEach(item => {
      const { style } = item;
      Object.assign(style, onMoveTransitionOptions);
    });
    currTranslation = getTranslateX();
  };
  events.onmouseup = e => {
    dragging = false;
    let transitionDelay = 0;
    events.style.cursor = "grab";
    itemsArr.forEach((item, id) => {
      const { style } = item;
      switch ((id + 1) % 3) {
        case 0:
          transitionDelay = "0.6s";
          break;
        case 1:
          transitionDelay = "0s";
          break;
        case 2:
          transitionDelay = "0.3s";
          break;
      }
      Object.assign(style, onMoveTransitionOptions);
      style.transitionDelay = transitionDelay;
    });
  };
  events.onmouseleave = () => {
    dragging = false;
    return;
  };
  events.onmousemove = e => {
    let toTranslate = 0;
    if (dragging) {
      currCoords = e.clientX;
      //
      toTranslate = currTranslation - [(initialCoords - currCoords) * 2];
      if (
        toTranslate < 0 &&
        toTranslate > -(10 * (nrColumns * 2 - 1) + itemWidth * (nrColumns - 1))
      ) {
        itemsArr.forEach(item => {
          item.style.transform = `translate(${toTranslate}px)`;
        });
        updatePodPositionHandler(toTranslate);
      }
    }
  };
});
