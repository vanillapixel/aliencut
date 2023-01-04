let isMobile = () => (window.innerWidth <= 800 ? true : false);
let triggeredByMenu = false;

const EVENTS_DATA_LIMIT = 24;
let trimmeredData = [];

function getClosestDate() {
	const today = new Date();
	let closestDate = Infinity;
	data.forEach((event) => {
		let date = new Date(formatDate(event.date));
		if (
			date >= today &&
			(date < new Date(closestDate) || date < closestDate) &&
			event.status != "cancelled"
		) {
			closestDate = date;
			event.isNextEvent = true;
		}
	});
}

function processData() {
	sortData();
	getClosestDate();
	createElementsFromData();
	staggerCancelledEventsAnimations();
}

const eventsContainer = document.querySelector(".events");

function formatDate(date) {
	return date.split("-").reverse().join("-");
}

function sortData() {
	data.sort((a, b) =>
		formatDate(a.date) > formatDate(b.date)
			? 1
			: formatDate(b.date) > formatDate(a.date)
			? -1
			: 0
	);
	trimmeredData = data.slice(-EVENTS_DATA_LIMIT);
	// filter per current year
	// const currentYear = new Date();
	// data = data.filter((x) => x.date.includes(currentYear.getFullYear()));
}
function monthNumberToName(monthNumber) {
	const date = new Date();
	date.setMonth(monthNumber - 1);

	return date.toLocaleString("it-IT", {
		month: "long",
	});
}

function createElementsFromData() {
	trimmeredData.forEach((event) => {
		const { date, city, province, location } = event;
		const newDate = document.createElement("li");
		newDate.classList.add("event");
		const day = date.split("-")[0];
		const month = monthNumberToName(date.split("-")[1]);
		const year = date.split("-")[2];

		if (event.status === "cancelled") {
			newDate.classList.add("cancelled");
		} else if (event.hasOwnProperty("isNextEvent")) {
			newDate.classList.add("next-event");
		}
		newDate.innerHTML = `
  <div class="event-details" data-year="${year}">
    <h4 class="date">
    <p class="day">${day}</p>
    <p class="month">${month}</p>
    </h4>
    </div>
    <div class="location-wrapper">
      <div class="location-container">
        <h3><span class="medium-text">@</span> ${
					location
						? location.toLowerCase() === "tba"
							? "To be announced"
							: location
						: ""
				}</h3>
        <h5 class="city">
          <p class="comune">${city ? city : ""}</p>
          <p class="provincia">${province ? `(${province})` : ""}</p>
        </h5>
      </div>
    </div>  
  </div>`;
		eventsContainer.appendChild(newDate);
	});
}

// getClosestDate();

function staggerCancelledEventsAnimations() {
	const cancelledEvents = document.querySelectorAll(".cancelled");
	cancelledEvents.forEach((x, id) => {
		x.style.animationDelay = `${id * 1}s`;
	});
}
processData();
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
		const monthsContainer = $(".months");
		const firstMonthEl = $(".first-month");
		const secondMonthEl = $(".second-month");
		let months = [];
		let years = [];
		const draggingEnabled = false;

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
		let displayedColumn = Math.floor((eventsArray.length - 1) / itemsPerColumn);
		let displayedYears;
		// the upcoming event is displayed
		eventsArray.forEach((x, id) => {
			if (x.classList.contains("next-event")) {
				displayedColumn = Math.floor(id / itemsPerColumn);
			}
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

		function checkYear(item) {
			years = [];
			const getDataYear = item.children[0].getAttribute("data-year");
			if (years.hasOwnProperty(getDataYear)) {
				years[getDataYear]++;
			} else {
				years[getDataYear] = 1;
			}
		}

		function updateYear() {
			year.textContent = Math.max(...Object.keys(years));
			// let updatedYear;
			// //TODO: set max to retrieve year with highest value
			// updatedYear = Object.values(years).reduce((a, b) => (a > b ? a : b));
			// Object.keys(years).forEach((entry) => {
			//   if (years[entry] == updatedYear) {
			//     year.textContent = entry;
			//   }
			// });
		}

		function getMonths(item) {
			const month = item.querySelector(".month");
			months.push(month.textContent);
		}
		function updateMonths() {
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
				checkYear(item);
				getMonths(item);
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
			monthsContainer.classList.add("opacity-flash");
			months = [];
			years = [];
			eventsArray.forEach((item, id) => {
				item.style.opacity = 0.3;
				updateSliderItemsPosition(item);
				updateDisplayedColumnItems(item, id);
			});
			updateControllerStyle();
			updateSliderPodPosition();
			setTimeout(function () {
				updateYear();
				updateMonths();
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
					highlightDisplayedColumnItems(amountToTranslate);
					podPositionUpdater(amountToTranslate);
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
			updateDisplayedColumnItems(item, id);
		}

		//function calls
		eventsTranslationHandler();

		// event listeners
		window.addEventListener("resize", () => {
			eventsTranslationHandler();
			// !isMobile() && draggingEnabled
			// 	? eventsSection.addEventListener("mousedown", startDragItems)
			// 	: eventsSection.removeEventListener("mousedown", startDragItems);
		});
		// !isMobile() &&
		// 	draggingEnabled &&
		// 	eventsSection.addEventListener("mousedown", startDragItems);
	}
}, 1000);
