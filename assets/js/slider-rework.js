let isMobile = () => (window.innerWidth <= 800 ? true : false);
let triggeredByMenu = false;
setTimeout(() => {
  const $ = (s, o = document) => o.querySelector(s);
  const $$ = (s, o = document) => o.querySelectorAll(s);

  const eventsSliderOpts = {
    itemsPerColumn: 3,
    baseMovement: 103,
    sliderSlotsGap: 6
  };

  new Slider(".slider", eventsSliderOpts, data);

  class Slider {
    constructor(container, options, data){
      const {...options} = options
      this.container = container
      this.data = data
      this.options = options
    }


  }

  function Slider(container, options, target) {
    const eventsArray = $$(target);
    const controllers = $$(`${container} .controller`);
    const sliderPod = $(".slider-pod");
    const year = $(".year");

    let defaultOptions = {
      itemsPerColumn: 1,
      baseMovement: 103,
    };
    const 
    const ssg = sliderSlotsGap;

    if (options) {
      for (let option in options) {
        defaultOptions[option] = options[option];
      }
    }

    const { itemsPerColumn, baseMovement } = defaultOptions;

    const nrColumns = Math.ceil(eventsArray.length / itemsPerColumn);
    updateSliderPodWidth(nrColumns);

    createSliderSlots(nrColumns);

    const sliderSlots = $$(".slider-slot");

    const buttonStyle = {
      disabled: {
        opacity: 0.3,
        cursor: "default",
        pointerEvents: "none",
      },
      enabled: {
        opacity: 1,
        cursor: "pointer",
        pointerEvents: "all",
      },
    };

    // event slider animation
    const onMoveTransitionOptions = {
      transitionDelay: "0s",
      transitionTimingFunction: "cubic-bezier(0,.29,.41,.98)",
      transitionDuration: ".3s",
    };

    // first column is nr.0
    let displayedColumn = 0;
    let displayedYears;
    // the upcoming event is displayed
    eventsArray.forEach((x, id) => {
      if (x.classList.contains("next-event")) {
        displayedColumn = Math.floor(id / itemsPerColumn);
        return;
      }
      displayedColumn = Math.floor((eventsArray.length - 1) / itemsPerColumn);
    });

    function setEventsTranslateToZero() {
      eventsArray.forEach((event) => {
        event.style.transform = "translate(0px)";
      });
    }

    function eventsTranslationHandler() {
      if (isMobile() === true) {
        setEventsTranslateToZero();
      } else {
        updateSlider();
      }
    }

    function checkYear(item, years) {
      const getDataYear = item.children[0].getAttribute("data-year");
      console.log(years);
      if (years.hasOwnProperty(getDataYear)) {
        years[getDataYear]++;
      } else {
        years[getDataYear] = 1;
      }
    }

    function updateYear(years) {
      let updatedYear;
      //TODO: set max to retrieve year with highest value
      updatedYear = Object.values(years).reduce((a, b) => (a > b ? a : b));
      Object.keys(years).forEach((entry) => {
        if (years[entry] == updatedYear) {
          year.textContent = entry;
        }
      });
    }

    function getMonths(item, months) {
      const month = item.querySelector(".month");
      months.push(month.textContent);
    }
    function updateMonths(months, monthsContainer) {
      const firstMonthEl = $(".first-month");
      const secondMonthEl = $(".second-month");
      const firstMonthText = months[0];
      const secondMonthText = months[months.length - 1];
      monthsContainer.classList.remove("opacity-flash");
      if (months.length === 1 || firstMonthText === secondMonthText) {
        firstMonthEl.textContent = months[0];
        secondMonthEl.textContent = "";
      } else {
        firstMonthEl.textContent = `${firstMonthText.substring(0, 3)} - `;
        secondMonthEl.textContent = secondMonthText.substring(0, 3);
      }
    }

    function updateSliderItemsOpacity(item) {
      item.style.opacity = 1;
    }

    function updateDisplayedColumnItems(item, id) {
      if (
        displayedColumn * itemsPerColumn <= id &&
        id < displayedColumn * itemsPerColumn + itemsPerColumn
      ) {
        updateSliderItemsOpacity(item);
        // checkYear(item);
        // getMonths(item);
      }
    }

    function updateSliderPodPosition() {
      sliderPod.style.transform = `translate(calc(${displayedColumn} * 100% +
        ${ssg * displayedColumn}px)`;
    }

    function updateSliderPodWidth(n) {
      // sets the slider pod width equally wide to the slider slots width
      sliderPod.style.width = `calc(((100% + ${ssg}px) - ${ssg} * ${n}px) / ${n})`;
    }

    function updateSliderItemsPosition(item) {
      item.style.transform = `translate(-${baseMovement * displayedColumn}%)`;
    }

    function updateControllerStyle() {
      let [previousBtn, nextBtn] = controllers;
      const { disabled, enabled } = buttonStyle;
      const n = nrColumns;
      if (displayedColumn === n - 1) {
        Object.assign(nextBtn.style, disabled);
      }
      if (displayedColumn < n - 1) {
        Object.assign(nextBtn.style, enabled);
      }
      if (displayedColumn > 0) {
        Object.assign(previousBtn.style, enabled);
      }
      if (displayedColumn === 0) {
        Object.assign(previousBtn.style, disabled);
      }
    }

    function createSliderSlots(n) {
      const sliderBar = $(`.slider-bar`);
      for (let i = 0; i < n; i++) {
        let el = document.createElement("div");
        el.className = "slider-slot";

        // creates a slider slot in the slider bar for each slider coloumn
        sliderBar.appendChild(el);
      }
    }

    function updateSlider() {
      const monthsContainer = $(".months");
      monthsContainer.classList.add("opacity-flash");
      eventsArray.forEach((item, id) => {
        item.style.opacity = 0.3;
        updateSliderItemsPosition(item);
        updateDisplayedColumnItems(item, id);
      });
      updateControllerStyle();
      updateSliderPodPosition();
      setTimeout(function () {
        // updateYear();
        // updateMonths(monthsContainer);
      }, 1200);
    }

    // events listeners
    controllers.forEach((controller) => {
      controller.addEventListener("click", function () {
        if (this.classList.contains("previous")) {
          displayedColumn--;
        }
        if (this.classList.contains("next")) {
          displayedColumn++;
        }
        updateSlider();
      });
    });
    sliderSlots.forEach((sliderSlot, id) =>
      sliderSlot.addEventListener("click", function () {
        if (displayedColumn !== id) {
          displayedColumn = id;
          updateSlider();
        }
      })
    );

    const dragTransitionOptions = {
      transitionDelay: "0s",
      transitionTimingFunction: "cubic-bezier(0,.29,.41,.98)",
      transitionDuration: "0s",
    };

    function getTranslateX() {
      const eventsArray = $$(target);
      let style = window.getComputedStyle(eventsArray[0]);
      let matrix = new WebKitCSSMatrix(style.webkitTransform);
      return matrix.m41;
    }

    function podPositionUpdater(itemsAmountToTranslate) {
      const eventWidth = parseInt(getComputedStyle($(target)).width);
      const podAmountToTranslate = Math.abs(
        (itemsAmountToTranslate / eventWidth) * 100
      );
      sliderPod.style.transform = `translate(calc(${podAmountToTranslate}% + ${
        ssg * displayedColumn
      }px))`;
    }

    const eventsSection = $(".events");
    let dragging = false;
    let initialCoords = 0;
    let currCoords = 0;
    let currItemTranslation = getTranslateX();
    let itemWidth = parseInt(getComputedStyle(eventsArray[0]).width);

    function startDragItems(e) {
      dragging = true;
      initialCoords = e.clientX;
      eventsSection.style.cursor = "grabbing";
      eventsArray.forEach((item) => {
        const { style } = item;
        Object.assign(style, dragTransitionOptions);
      });
      currItemTranslation = getTranslateX();
      Object.assign(sliderPod.style, dragTransitionOptions);
      eventsSection.addEventListener("mouseup", stopDragItems);
      eventsSection.addEventListener("mouseleave", stopDragItems);
      eventsSection.addEventListener("mousemove", dragItems);
    }

    function dragItems(e) {
      let amountToTranslate = 0;
      if (dragging) {
        currCoords = e.clientX;
        amountToTranslate =
          currItemTranslation - [(initialCoords - currCoords) * 2];
        // prevents from oversliding from either right or left
        displayedColumn = Math.floor(
          Math.abs(amountToTranslate) /
            parseInt(getComputedStyle(eventsArray[0]).width)
        );
        if (
          amountToTranslate < 0 &&
          amountToTranslate >
            -(10 * (nrColumns * 2 - 1) + itemWidth * (nrColumns - 1))
        ) {
          eventsArray.forEach((item) => {
            item.style.transform = `translate(${amountToTranslate}px)`;
          });
          podPositionUpdater(amountToTranslate);
          highlightDisplayedColumnItems(amountToTranslate);
        }
      }
    }

    function stopDragItems() {
      setTimeout(() => {
        updateSliderPodPosition();
      }, 250);
      dragging = false;
      let transitionDelay = 0;
      eventsSection.style.cursor = "grab";
      eventsArray.forEach((item, id) => {
        updateSliderItemsPosition(item);
        const { style } = item;
        switch (id % 3) {
          case 0:
            transitionDelay = "0s";
            break;
          case 1:
            transitionDelay = "0.3s";
            break;
          case 2:
            transitionDelay = "0.6s";
            break;
        }
        style.transitionDuration = "1s";
        style.transitionTimingFunction =
          "cubic-bezier(0.78, -0.35, 0.51, 0.95)";
        style.transitionDelay = transitionDelay;
      });
      sliderPod.style.transitionDuration = "1.6s";
      sliderPod.style.transitionTimingFunction = "ease-in-out";
      sliderPod.style.transitionDelay = 0;
      eventsSection.removeEventListener("mouseup", stopDragItems);
      eventsSection.removeEventListener("mouseleave", stopDragItems);
      eventsSection.removeEventListener("mousemove", dragItems);
    }

    function highlightDisplayedColumnItems(amountToTranslate) {
      updateControllerStyle();
      updateSliderItemsPosition();
      updateDisplayedColumnItems(item, id, years, months);
    }

    //function calls
    eventsTranslationHandler();

    // event listeners
    window.addEventListener("resize", () => {
      eventsTranslationHandler();
      isMobile();
      isMobile()
        ? eventsSection.removeEventListener("mousedown", startDragItems)
        : eventsSection.addEventListener("mousedown", startDragItems);
    });
    !isMobile() && eventsSection.addEventListener("mousedown", startDragItems);
  }
}, 1000);
