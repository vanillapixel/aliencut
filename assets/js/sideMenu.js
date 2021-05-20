document.addEventListener("DOMContentLoaded", () => {
  // vars
  const sections = document.querySelectorAll("section");
  const sectionsNames = document.querySelectorAll("section .section-name");
  const selectors = document.querySelectorAll(".sidebar-item");
  const mainContainer = document.querySelector(".main-container");
  // const enterWebsiteButton = document.querySelector(".enter-website");
  const headerHeight = document.querySelector("header").offsetHeight;
  const isMobile = () => (window.innerWidth <= 1280 ? true : false);
  const sidebar = document.querySelector(".sidebar-container");
  const menuIcon = document.querySelector(".burger-menu-icon");
  let sectionsPositions = [];
  let sectionsNamesPositions = [];
  let currentActiveSelector = document.querySelector(".sidebar-item");
  let currentActiveSectionName = document.querySelector(
    "section .section-name"
  );
  let lastScroll = window.pageYOffset;
  let currentScroll = window.pageYOffset;
  let scrolling = false;

  // activates the first selector when page loads
  selectors[0].classList.add("selector-active");

  // Item selector click function
  selectors.forEach((selector, id) => {
    selector.addEventListener("click", function () {
      // removes the active class from the first element
      currentActiveSelector.classList.remove("selector-active");
      this.classList.add("selector-active");
      // scrolls the page to the selected item
      const mainContainerTop = mainContainer.offsetTop;
      const currentSectionTop = sections[id].offsetTop;
      const marginDisplayTop = isMobile() ? 20 : 50;

      const netAmountToScroll =
        mainContainerTop + currentSectionTop - marginDisplayTop;

      const amountToScroll = isMobile()
        ? netAmountToScroll - headerHeight
        : netAmountToScroll;

      window.scroll({ top: amountToScroll, behavior: "smooth" });
      // current selected item becomes previous
      currentActiveSelector = this;
      return currentActiveSelector;
    });
  });

  function toggleMenu() {
    if (isMobile()) {
      menuIcon.classList.toggle("burger-menu-icon-open");
      sidebar.classList.toggle("sidebar-active");
    }
  }

  menuIcon.addEventListener("click", toggleMenu);
  sidebar.addEventListener("click", toggleMenu);

  function checkIfSectionNameIsInWindow() {
    // top of the screen
    let windowTop = lastScroll;
    // bottom of the screen
    let windowBottom = windowTop + window.innerHeight;
    // mobile
    if (isMobile()) {
      for (let i = 0; i < sectionsNamesPositions.length; i++) {
        if (
          sectionsNamesPositions[i].top > window.pageYOffset &&
          sectionsNamesPositions[i].bottom <
            window.pageYOffset + window.innerHeight
        ) {
          updateSelectorsSectionsNames(i);
        }
      }
      return;
    }
    // scrolling down - desktop
    if (currentScroll > lastScroll) {
      for (let i = 0; i < sectionsPositions.length; i++) {
        if (
          sectionsPositions[i].top < windowBottom &&
          sectionsPositions[i].bottom > windowTop
        ) {
          updateSelectorsSectionsNames(i);
        }
      }
      return;
    }
    //scrolling up - desktop
    if (currentScroll < lastScroll) {
      for (let i = sectionsPositions.length - 1; i >= 0; i--) {
        if (
          sectionsPositions[i].bottom > windowTop &&
          sectionsPositions[i].bottom < windowBottom
        ) {
          updateSelectorsSectionsNames(i);
        }
      }
    }
  }

  function updateSelectorsSectionsNames(id) {
    currentActiveSelector.classList.remove("selector-active");
    selectors[id].classList.add("selector-active");
    currentActiveSelector = selectors[id];

    currentActiveSectionName.classList.remove("section-name-active");
    sectionsNames[id].classList.add("section-name-active");
    currentActiveSectionName = sectionsNames[id];
  }

  function getSectionsPosition() {
    if (isMobile()) {
      sectionsNamesPositions = [];
      sectionsNames.forEach((sectionName) => {
        // distance from top of the document
        let sectionNameTop =
          sectionName.getBoundingClientRect().top +
          sectionName.ownerDocument.defaultView.pageYOffset;

        // distance from top of the document + height of element
        let sectionNameBottom =
          sectionNameTop + sectionName.getBoundingClientRect().height;

        sectionsNamesPositions.push({
          top: sectionNameTop,
          bottom: sectionNameBottom,
        });
      });
      return;
    }
    sectionsPositions = [];
    sections.forEach((section) => {
      // distance from top of the document
      let sectionTop =
        section.getBoundingClientRect().top +
        section.ownerDocument.defaultView.pageYOffset;

      // distance from top of the document + height of element
      let sectionBottom = sectionTop + section.getBoundingClientRect().height;

      sectionsPositions.push({
        top: sectionTop,
        bottom: sectionBottom,
      });
    });
  }

  if (sectionsPositions == false) {
    getSectionsPosition();
  }

  window.addEventListener("resize", function () {
    sectionsPositions.length = 0;
    getSectionsPosition();
  });
  window.addEventListener("scroll", function () {
    currentScroll = window.pageYOffset;
    let throttleValue = isMobile() ? 50 : 150;
    // throttling the scrolling eventlistener - event is triggered every 150 pixel difference (both directions)
    if (
      currentScroll > lastScroll + throttleValue ||
      currentScroll < lastScroll - throttleValue
    ) {
      if (scrolling == false) {
        scrolling = true;
        getSectionsPosition();
        checkIfSectionNameIsInWindow();
        lastScroll = currentScroll;
      }
      scrolling = false;
    }
  });
  checkIfSectionNameIsInWindow();
});
