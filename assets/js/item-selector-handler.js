// vars
const el = $("section");
const selector = $(".sidebar-item");
let previousSelector = "";

// Item selector click function
selector.on("click", function() {
  // clicked selector gets class
  $(this).addClass("selector-active");
  // previous selected item exists?
  if (previousSelector != "") {
    previousSelector.removeClass("selector-active");
  }

  // scrolls the page to the selected item
  let elID = $(selector).index(this);
  el[elID].scrollIntoView({ behavior: "smooth", block: "center" });

  // current selected item becomes previous
  previousSelector = $(this);
  return previousSelector;
});

$(selector[0]).addClass("selector-active");
selectorOnWindowScrollHandler = () => {
  $(window).scroll(function() {
    for (i = 0; i < el.length; i++) {
      let top_of_element = $(el[i]).offset().top;
      let bottom_of_element = $(el[i]).offset().top + $(el[i]).outerHeight();
      let bottom_of_screen = $(window).scrollTop() + $(window).innerHeight();
      let top_of_screen = $(window).scrollTop();
      // if the product is in the browser window
      if (
        top_of_element > top_of_screen &&
        bottom_of_element < bottom_of_screen
      ) {
        // removes all classes to the selectors and add the active class only to the displayed item
        $(selector).removeClass("selector-active");
        $(selector[i]).addClass("selector-active");
      }
    }
  });
};

selectorOnWindowScrollHandler();
