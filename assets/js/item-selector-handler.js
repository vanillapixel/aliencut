// vars
const sections = document.querySelectorAll("section");
const titles = document.querySelectorAll("section .title");
const selectors = document.querySelectorAll(".sidebar-item");
const mainContainer = document.querySelector(".main-container");
let titlesPositions = [];
let currentActiveSelector = document.querySelector(".sidebar-item");
let currentActiveTitle = document.querySelector("section .title");
let lastScroll = window.pageYOffset;
let currentScroll = window.pageYOffset;
let scrolling = false;

// activates the first selector when page loads
selectors[0].classList.add("selector-active");

// Item selector click function
selectors.forEach((selector, id) => {
  selector.addEventListener("click", function() {
    // removes the active class from the first element - see line 11
    currentActiveSelector.classList.remove("selector-active");
    this.classList.add("selector-active");
    // scrolls the page to the selected item
    sections[id].scrollIntoView({ behavior: "smooth", block: "start" });
    // current selected item becomes previous
    currentActiveSelector = this;
    return currentActiveSelector;
  });
});

function checkIfTitleIsInWindow() {
  // top of the screen
  let windowTop = lastScroll;
  // bottom of the screen
  let windowBottom = windowTop + window.innerHeight;
  // scrolling down
  titlesPositions.forEach((titlePos, id) => {
    if (currentScroll > lastScroll) {
      if (titlePos.top < windowBottom && titlePos.bottom > windowTop) {
        updateSelectorsTitles(id);
      }
      //scrolling up
    } else {
      if (titlePos.bottom > windowTop && titlePos.bottom < windowBottom) {
        updateSelectorsTitles(id);
      }
    }
  });
}

function updateSelectorsTitles(id) {
  currentActiveSelector.classList.remove("selector-active");
  selectors[id].classList.add("selector-active");
  currentActiveSelector = selectors[id];

  currentActiveTitle.classList.remove("title-active");
  titles[id].classList.add("title-active");
  currentActiveTitle = titles[id];
}

function getTitlePositions() {
  titlesPositions = [];
  titles.forEach(title => {
    // distance from top of the document
    let titleTop =
      title.getBoundingClientRect().top +
      title.ownerDocument.defaultView.pageYOffset;

    // distance from top of the document + height of element
    let titleBottom = titleTop + title.getBoundingClientRect().height;

    titlesPositions.push({ top: titleTop, bottom: titleBottom });
  });
}

enterWebsiteButton.addEventListener("click", function() {
  if (titlesPositions == false) {
    getTitlePositions();
  }
});

window.addEventListener("resize", function() {
  titlesPositions.length = 0;
  getTitlePositions();
});
window.addEventListener("scroll", function() {
  currentScroll = window.pageYOffset;
  // throttling the scrolling eventlistener - event is triggered every 150 pixel difference (both directions)
  if (currentScroll > lastScroll + 150 || currentScroll < lastScroll - 150) {
    if (scrolling == false) {
      scrolling = true;
      getTitlePositions();
      checkIfTitleIsInWindow();
      lastScroll = currentScroll;
    }
    scrolling = false;
  }
});
