// event slider animation

const defaultOptions = {
  baseMovement: 103,
  itemsPerColumn: 3
};
const slider = new Slider();

// Variables
function Slider(target, defaultOptions) {}

function SliderController(direction) {}

function SliderPod() {}
// Controller buttons
const nextBtn = document.querySelector(".next");
const previousBtn = document.querySelector(".previous");

const itemsArr = document.querySelectorAll(".event");

const nrColumns = Math.ceil(itemsArr.length / itemsPerColumn);
const dragTransitionOptions = {
  transitionDelay: "0s",
  transitionTimingFunction: "cubic-bezier(0,.29,.41,.98)",
  transitionDuration: "1s"
};

// Buttons style
// hides button

const buttonStyle = {
  disable: {
    opacity: "0",
    cursor: "default"
  },
  enable: {
    opacity: "1",
    cursor: "pointer"
  }
};

let multiplier = 0;

const sliderPod = document.querySelector(".slider-pod");

// Functions

function buttonsStyleHandler(button, action) {
  Object.assign(button.style, action);
}

function buttonsStyleHandler(n) {
  const { disable, enable } = buttonStyle;
  if (multiplier < n - 1) {
    multiplier++;
  }
  if (multiplier === n - 1) {
    buttonsStyleHandler(nextBtn, disable);
  }
  if (multiplier > 0) {
    buttonsStyleHandler(previousBtn, enable);
  }
  // if controller button is previous
  else {
    if (multiplier > 0) {
      multiplier--;
      if (multiplier < n - 1) {
        buttonsStyleHandler(nextBtn, enable);
      }
      if (multiplier === 0) {
        buttonsStyleHandler(previousBtn, disable);
      }
    }
  }
}

function controllersHandler(buttonPressed, n) {
  // if controller button is next
  if (buttonPressed.classList.contains("next")) {
    multiplier++;
  } else {
    multiplier--;
  }
  buttonsStyleHandler(n);
}

function controllersHandler(buttonPressed) {
  // the slider pod moves according to the column shown
  sliderPod.style.transform = `translate(${multiplier * 100 +
    2 * multiplier}%)`;
  itemsArr.forEach(
    item => (item.style.transform = `translate(-${baseMovement * multiplier}%)`)
  );
  //FIXME: reactivate it once the dragging system is complete
  // opacityHandler(multiplier);
}

// Events listners

// Function calls

createSliderSlots(nrColumns);

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

function podPositionUpdater(toTranslate) {
  let { style } = sliderPod;
  const eventWidth = Number(
    window
      .getComputedStyle(document.querySelector(".event"))
      .width.replace(/px/, "")
  );
  style.transform = `translate(${(-toTranslate / eventWidth) * 100}px)`;
  Object.assign(style, dragTransitionOptions);
}

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

function opacityHandler(x) {
  for (let i = 0; i < itemsArr.length; i++) {
    itemsArr[i].style.opacity = 0.3;
    let opacity = i >= x * 3 && i < (x + 1) * 3 ? 1 : 0.2;
    itemsArr[i].style.opacity = opacity;
  }
}

// function calls

$(".controller").click(function() {
  eventsSlider(this, nrColumns);
});

//FIXME: reactivate it once the dragging system is complete
// opacityHandler(multiplier);

// -------------------------------------------------------
// drag handler
// -------------------------------------------------------

const getTranslateX = () => {
  let style = window.getComputedStyle(itemsArr[0]);
  let matrix = new WebKitCSSMatrix(style.webkitTransform);
  return matrix.m41;
};

const events = document.querySelector(".events");
let dragging = false;
let initialCoords = 0;
let currCoords = 0;
let currItemTranslation = getTranslateX();
let itemWidth = Number(
  window.getComputedStyle(itemsArr[0]).width.replace(/px/, "")
);

events.onmousedown = e => {
  dragging = true;
  initialCoords = e.clientX;
  events.style.cursor = "grabbing";
  itemsArr.forEach(item => {
    const { style } = item;
    Object.assign(style, dragTransitionOptions);
  });
  currItemTranslation = getTranslateX();
};
events.onmouseup = () => {
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
    style.transitionDuration = "1s";
    style.transitionTimingFunction = "cubic-bezier(0.78, -0.35, 0.51, 0.95)";
    style.transitionDelay = transitionDelay;
  });
};
events.onmouseleave = () => {
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
    style.transitionDuration = "1s";
    style.transitionTimingFunction = "cubic-bezier(0.78, -0.35, 0.51, 0.95)";
    style.transitionDelay = transitionDelay;
  });
};
events.onmousemove = e => {
  let toTranslate = 0;
  if (dragging) {
    currCoords = e.clientX;
    toTranslate = currItemTranslation - [(initialCoords - currCoords) * 2];
    if (
      toTranslate < 0 &&
      toTranslate > -(10 * (nrColumns * 2 - 1) + itemWidth * (nrColumns - 1))
    ) {
      itemsArr.forEach(item => {
        item.style.transform = `translate(${toTranslate}%)`;
      });
      podPositionUpdater(toTranslate);
    }
  }
};
