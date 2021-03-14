let isMobile = () => (window.innerWidth <= 800 ? true : false);
let triggeredByMenu = false;
setTimeout(() => {
  const $ = (s, o = document) => o.querySelector(s);
  const $$ = (s, o = document) => o.querySelectorAll(s);

  const eventsSliderOpts = {
    itemsPerColumn: 3,
    baseMovement: 103,
  };

  new Slider(".slider", eventsSliderOpts, ".event");

  function Slider(container, options, target) {
    const eventsArray = $$(target);
    const controllers = $$(`${container} .controller`);
    const sliderPod = $(".slider-pod");
    const year = $(".year");

    let defaultOptions = {
      itemsPerColumn: 1,
      baseMovement: 103,
    };
    const sliderSlotsGap = 6;
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
      if (years.hasOwnProperty(getDataYear)) {
        years[getDataYear]++;
      } else {
        years[getDataYear] = 1;
      }
    }

    function updateYear(years) {
      let updatedYear;
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

    function updateDisplayedColumnItems() {
      const monthsContainer = $(".months");
      const years = {};
      let months = [];
      monthsContainer.classList.add("opacity-flash");
      eventsArray.forEach((item, id) => {
        item.style.opacity = 0.3;
        if (
          displayedColumn * itemsPerColumn <= id &&
          id < displayedColumn * itemsPerColumn + itemsPerColumn
        ) {
          updateSliderItemsOpacity(item);
          checkYear(item, years);
          getMonths(item, months);
        }
      });
      setTimeout(function () {
        updateYear(years);
        updateMonths(months, monthsContainer);
      }, 1200);
    }

    function updateSliderPodPosition() {
      sliderPod.style.transform = `translate(calc(${displayedColumn} * 100% +
        ${ssg * displayedColumn}px)`;
    }

    function updateSliderPodWidth(n) {
      // sets the slider pod width equally wide to the slider slots width
      sliderPod.style.width = `calc(((100% + ${ssg}px) - ${ssg} * ${n}px) / ${n})`;
    }

    function updateSliderItemsPosition() {
      eventsArray.forEach(
        (item) =>
          (item.style.transform = `translate(-${
            baseMovement * displayedColumn
          }%)`)
      );
    }

    function updateDisplayedColumnNumber(arg) {
      if (typeof arg === "string") {
        if (arg == "next") {
          displayedColumn++;
        }
        if (arg == "previous") {
          displayedColumn--;
        }
      } else {
        displayedColumn = arg;
      }
    }

    function updateControllerStyle() {
      let [previousBtn, nextBtn] = controllers;
      const { disabled, enabled } = buttonStyle;
      const n = nrColumns;
      // TODO: Use spread operator instead of Object assign
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
      updateSliderItemsPosition();
      updateControllerStyle();
      updateSliderPodPosition();
      updateDisplayedColumnItems();
    }

    // events listeners
    controllers.forEach((controller) => {
      controller.addEventListener("click", function () {
        const buttonClasses = this.classList.value.split(" ");
        const buttonClass = buttonClasses
          .filter((x) => x != "controller")
          .toString();
        updateDisplayedColumnNumber(buttonClass);
        updateSlider();
      });
    });
    sliderSlots.forEach((sliderSlot, id) =>
      sliderSlot.addEventListener("click", function () {
        updateDisplayedColumnNumber(id);
        updateSlider();
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
        updateSliderItemsPosition();
        updateSliderPodPosition();
      }, 250);
      dragging = false;
      let transitionDelay = 0;
      eventsSection.style.cursor = "grab";
      eventsArray.forEach((item, id) => {
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
      displayedColumn = Math.floor(
        Math.abs(amountToTranslate) /
          parseInt(getComputedStyle(eventsArray[0]).width)
      );
      updateControllerStyle();
      updateDisplayedColumnItems();
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
