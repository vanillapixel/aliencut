//TODO: split scripts into different files

document.addEventListener("DOMContentLoaded", () => {
  const intro = $(".intro");
  const main = $(".main-container");
  const video = $("#bgvid");
  const enterWebsiteButton = $(".enter-website");
  const titles = document.querySelectorAll(".title");
  const firstSection = document.querySelector("section");
  const logo = document.querySelector(".logo-container");

  // 'enter the website' animation
  $(enterWebsiteButton).click(function() {
    logo.classList.add("logo-animation-off");
    $(enterWebsiteButton).fadeOut("slow");
    $(main).addClass("website-active");
    // just making sure it's going to be muted
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

  function centerTitles() {
    let transValue;
    // centers (or tries to) the .titles
    titles.forEach(title => {
      let lettersArr = [...title.innerText];
      lettersArr.length > 6
        ? ((transValue = 17 * (lettersArr.length - 6)),
          (title.style.top = `${transValue}px`))
        : null;
    });
  }

  // event slider animation
  const nextBtn = document.querySelector(".next"),
    previousBtn = document.querySelector(".previous"),
    itemsArr = document.querySelectorAll(".event"),
    // hides button
    disabledBtn = { opacity: "0.3", cursor: "default", pointerEvents: "none" },
    // shows button
    enabledBtn = { opacity: "1", cursor: "pointer", pointerEvents: "auto" },
    baseMovement = 103,
    itemsPerColumn = 3,
    nrColumns = Math.ceil(itemsArr.length / itemsPerColumn),
    onMoveTransitionOptions = {
      transitionDelay: "0s",
      transitionTimingFunction: "cubic-bezier(0,.29,.41,.98)",
      transitionDuration: "1s"
    };
  let multiplier = 0;
  const sliderPod = document.querySelector(".slider-pod");

  function eventsSlider(buttonPressed, n) {
    // if controller button is next
    if (buttonPressed.classList.contains("next")) {
      if (multiplier < n - 1) {
        multiplier++;
      }
      if (multiplier === n - 1) {
        Object.assign(nextBtn.style, disabledBtn);
      }
      if (multiplier > 0) {
        Object.assign(previousBtn.style, enabledBtn);
      }
    }
    // if controller button is previous
    else {
      if (multiplier > 0) {
        multiplier--;
        if (multiplier < n - 1) {
          Object.assign(nextBtn.style, enabledBtn);
        }
        if (multiplier === 0) {
          Object.assign(previousBtn.style, disabledBtn);
        }
      }
    }
    // the slider pod moves according to the column shown
    sliderPod.style.transform = `translate(${multiplier * 100 +
      2 * multiplier}%)`;
    itemsArr.forEach(
      item =>
        (item.style.transform = `translate(-${baseMovement * multiplier}%)`)
    );
    //FIXME: reactivate it once the dragging system is complete
    // opacityHandler(multiplier);
  }

  function sliderPodHandler(n) {
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
  }
  Draggable.create("#scroller", {
    type: "scrollLeft",
    edgeResistance: 0,
    throwProps: true,
    cursor: "grab",
    activeCursor: "grabbing"
  });

  const zoomedPicture = "";

  $(".picture img").click(function() {
    let picSrc = this.attributes.src.value;
    console.log(this.parentElement.parentElement.children);
    const index = [...this.parentElement.parentElement.children].indexOf(
      this.parentElement
    );
    console.log(index);

    console.log(this.attributes.src.value);
  });

  function createSliderSlots(n) {
    const sliderBar = document.querySelector(".slider-bar");
    for (let i = 0; i < n; i++) {
      const el = document.createElement("div");
      el.className = "slider-slot";

      // creates a slider slot in the slider bar for each slider coloumn
      sliderBar.appendChild(el);
      sliderPodHandler(n);
    }
  }

  opacityHandler = x => {
    for (let i = 0; i < itemsArr.length; i++) {
      itemsArr[i].style.opacity = 0.3;
      let opacity = i >= x * 3 && i < (x + 1) * 3 ? 1 : 0.2;
      itemsArr[i].style.opacity = opacity;
    }
  };
  centerTitles = () => {
    let transValue;
    // centers (or tries to) the .titles
    titles.forEach(title => {
      let lettersArr = [...title.innerText];
      lettersArr.length > 6
        ? ((transValue = 17 * (lettersArr.length - 6)),
          (title.style.top = `${transValue}px`))
        : null;
    });
  };

  //events listeners
  const controllers = document.querySelectorAll(".controller");
  for (let i = 0; i < controllers.length; i++) {
    controllers[i].addEventListener("click", function() {
      eventsSlider(this, nrColumns);
    });
  }

  //function calls
  centerTitles();
  createSliderSlots(nrColumns);
});
