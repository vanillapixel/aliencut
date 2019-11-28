document.addEventListener("DOMContentLoaded", () => {
  function Slider(target, options, target) {
    const itemsArr = document.querySelectorAll(`.${target}`);
    const controllers = document.querySelectorAll(`.controller`);
    const sliderPod = document.querySelector(".slider-pod");

    let defaultOptions = {
      itemsPerColumn: 1,
      baseMovement: 103
    };

    if (options) {
      for (let option in options) {
        defaultOptions[option] = options[option];
      }
    }

    const { itemsPerColumn, baseMovement } = defaultOptions;

    const nrColumns = Math.ceil(itemsArr.length / itemsPerColumn);
    updateSliderPodWidth(nrColumns);

    // first column is nr.0
    let displayedColumn = 0;
    updateSliderItemsOpacity();

    createSliderSlots(nrColumns);
    const sliderSlots = document.querySelectorAll(".slider-slot");

    const buttonStyle = {
      disabled: {
        opacity: 0.3,
        cursor: "default",
        pointerEvents: "none"
      },
      enabled: {
        opacity: 1,
        cursor: "pointer",
        pointerEvents: "all"
      }
    };

    // event slider animation
    const onMoveTransitionOptions = {
      transitionDelay: "0s",
      transitionTimingFunction: "cubic-bezier(0,.29,.41,.98)",
      transitionDuration: "1s"
    };

    function updateSliderItemsOpacity() {
      for (let i = 0; i < itemsArr.length; i++) {
        itemsArr[i].style.opacity = 0.3;
        if (
          displayedColumn * itemsPerColumn <= i &&
          i <= displayedColumn * itemsPerColumn + 2
        ) {
          itemsArr[i].style.opacity = 1;
        }
      }
    }

    function updateSliderPodPosition() {
      sliderPod.style.transform = `translate(${displayedColumn * 100 +
        2 * displayedColumn}%)`;
    }

    function updateSliderItemsPosition() {
      itemsArr.forEach(
        item =>
          (item.style.transform = `translate(-${baseMovement *
            displayedColumn}%)`)
      );
    }

    function updateDisplayedColumn(buttonPressed) {
      if (buttonPressed) {
        if (buttonPressed == "next") {
          displayedColumn++;
        }
        if (buttonPressed == "previous") {
          displayedColumn--;
        }
      } else {
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

    function updateSliderPodWidth(n) {
      // sets the slider pod width equally wide to the slider slots width
      sliderPod.style.width = `calc(${100 / n}% - 1.5px)`;
    }

    function createSliderSlots(n) {
      const sliderBar = document.querySelector(`.slider-bar`);
      for (let i = 0; i < n; i++) {
        let el = document.createElement("div");
        el.className = "slider-slot";

        // creates a slider slot in the slider bar for each slider coloumn
        sliderBar.appendChild(el);
      }
    }

    // events listeners
    controllers.forEach(controller => {
      controller.addEventListener("click", function() {
        if (this.classList.contains("next")) {
          updateDisplayedColumn("next");
        } else {
          updateDisplayedColumn("previous");
        }
        updateSliderItemsPosition();
        updateControllerStyle();
        updateSliderPodPosition();
        updateSliderItemsOpacity();
      });
    });
    sliderSlots.forEach((sliderSlot, id) =>
      sliderSlot.addEventListener("click", function() {
        displayedColumn = id;
        updateSliderItemsPosition();
        updateControllerStyle();
        updateSliderPodPosition();
        updateSliderItemsOpacity();

        //FIXME: reactivate it once the dragging system is complete
        // opacityHandler(multiplier);
      })
    );
  }

  //function calls
  const eventsSliderOpts = {
    itemsPerColumn: 3,
    baseMovement: 103
  };
  new Slider("slider", eventsSliderOpts, "event");
});
