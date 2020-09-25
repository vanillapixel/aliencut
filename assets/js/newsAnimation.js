document.addEventListener("DOMContentLoaded", () => {
  const sidebarLogo = document.querySelector(".sidebar-logo");
  const firstMask = document.querySelector(".first-mask");
  const secondMask = document.querySelector(".second-mask");
  const thirdMask = document.querySelector(".third-mask");
  const teleporting = document.querySelector(".second-mask h1");
  const main = document.querySelector(".main-container");
  const enterWebsiteButton = document.querySelector(".enter-website");
  const firstSection = document.querySelector(".content-container");
  const logo = document.querySelector(".logo-container");
  let headerHeight = Math.floor(document.querySelector("header").offsetHeight);
  const isMobile = () => (window.innerWidth <= 1280 ? true : false);
  const menu = document.querySelector(".menu");
  const sidebar = document.querySelector(".sidebar-container");
  let newsWrapperHeight;
  setTimeout(() => {
    // gives time to the picture in the news section to load in order to calculate its exact height
    newsWrapperHeight = Math.floor(
      document.querySelector(".news-wrapper").getBoundingClientRect().height
    );
    !isMobile() ? newsWrapperHeight : (newsWrapperHeight += headerHeight);
    return newsWrapperHeight;
  }, 300);
  let scrolling = false;
  let websiteActive = false;

  function toggleMenu() {
    if (isMobile()) {
      sidebar.classList.toggle("sidebar-active");
      menu.classList.toggle("menu-open");
    }
  }

  menu.addEventListener("click", toggleMenu);
  sidebar.addEventListener("click", toggleMenu);

  document.addEventListener("scroll", adjustLogoOpacity);
  document.addEventListener("resize", isMobile);

  function adjustLogoOpacity() {
    if (!isMobile()) {
      if (window.pageYOffset < newsWrapperHeight - 100) {
        logo.style.opacity =
          1 -
          Math.round((window.pageYOffset / newsWrapperHeight) * 1.5 * 10) / 10;
        sidebarLogo.style.opacity = 0;
        logo.style.display = "block";
      } else {
        sidebarLogo.style.opacity = 1;
        logo.style.display = "none";
      }
    }
  }

  function getFirstSectionHeight() {
    let firstSectionTop = firstSection.getBoundingClientRect().top;
    const firstSectionMargin = Number(
      window.getComputedStyle(firstSection).marginTop.replace(/px/, "")
    );
    const scrolledValue = window.pageYOffset;
    let value = 0;

    if (window.innerWidth > 800) {
      value = firstSectionTop - firstSectionMargin + scrolledValue;
    } else {
      value = newsWrapperHeight + firstSectionMargin - 40;
    }
    return value;
  }

  enterWebsiteButton.addEventListener("click", scrollOutNewsSection);

  function scrollOutNewsSection() {
    websiteActive = true;
    menu.style.opacity = 1;
    logo.classList.add("logo-animation-off");
    main.classList.add("website-active");

    let scrollTop = getFirstSectionHeight();

    // scrolls down to the first section
    window.scroll({ top: scrollTop, behavior: "smooth" });
  }

  let scrollableDown = true;
  let scrollableUp = false;
  let previousScroll = window.scrollY || 0;
  let newScroll = previousScroll;
  let delta;

  // document.addEventListener("scroll", newsSectionScrollAnimation);

  function newsSectionScrollAnimation(e) {
    newScroll = window.scrollY;
    if (!scrolling && websiteActive && !triggeredByMenu) {
      let scrollTop;
      scrollableDown =
        window.scrollY <
        (isMobile() ? newsWrapperHeight - window.innerHeight + 20 : 50)
          ? true
          : false;
      scrollableUp =
        window.scrollY < newsWrapperHeight &&
        window.scrollY > newsWrapperHeight - 100
          ? true
          : false;

      // detects the direction of the scroll
      delta = newScroll - previousScroll > 0 ? "positive" : "negative";

      if (scrollableDown && delta === "positive") {
        scrolling = true;
        scrollTop = getFirstSectionHeight();
        scrollableDown = false;
        window.scroll({ top: scrollTop, behavior: "smooth" });
        firstMask.style.transform = `translateY(${
          -window.innerHeight * 1.2
        }px)`;
        secondMask.style.transform = `translateY(${
          -window.innerHeight * 1.5
        }px)`;
        thirdMask.style.transform = `translateY(${
          -window.innerHeight * 1.2
        }px)`;
        teleporting.style.letterSpacing = isMobile() ? "6rem" : "8rem";
      }
      if (scrollableUp && delta === "negative") {
        scrolling = true;
        scrollTop = 0;
        scrollableUp = false;
        window.scroll({ top: scrollTop, behavior: "smooth" });
        firstMask.style.transform = `translateY(${window.innerHeight * 1.2}px)`;
        secondMask.style.transform = `translateY(${
          window.innerHeight * 1.5
        }px)`;
        thirdMask.style.transform = `translateY(${window.innerHeight * 1.2}px)`;
        teleporting.style.letterSpacing = isMobile() ? "6rem" : "12rem";
      }

      setTimeout(() => {
        scrolling = false;
        teleporting.style.letterSpacing = "0rem";
      }, 700);
    }
    previousScroll = newScroll;
  }

  logo.addEventListener("click", function () {
    triggeredByMenu = true;
    window.scroll({ top: 0, behavior: "smooth" });
    setTimeout(() => (triggeredByMenu = false), 1500);
  });
  sidebarLogo.addEventListener("click", function () {
    window.scroll({ top: 0, behavior: "smooth" });
  });
});
