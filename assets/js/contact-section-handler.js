document.addEventListener("DOMContentLoaded", () => {
  const revealFormBtn = document.querySelector(".reveal-form");
  const revealNumberBtn = document.querySelector(".reveal-number");
  const form = document.querySelector(".contact-form");
  const revealFormText = document.querySelector(".reveal-form-text");
  const revealNummberWrapper = document.querySelector(
    ".reveal-number-text-wrapper"
  );
  const contactNumberText = document.querySelector(".contact-number-text");
  const revealNumberText = document.querySelector(".reveal-number-text");
  let numberRevealed = false;

  function fadeOutElement(el) {
    const { style } = el;
    style.opacity = 0;
    style.maxHeight = "0rem";
    style.maxWidth = "0rem";
    style.visibility = "hidden";
  }
  function revealNumber() {
    if (!numberRevealed) {
      numberRevealed = true;
      const contactNumberHeight = contactNumberText.getBoundingClientRect()
        .height;
      fadeOutElement(contactNumberText);
      revealNumberText.style.animation = "blinker 1s linear ";
      revealNumberText.textContent = "clicca qui per chiamare";
      const newAnchor = document.createElement("a");
      newAnchor.setAttribute("href", "tel:+393489690023");
      newAnchor.textContent = "+393489690023";
      newAnchor.style.animation = "box-shadow-flash 6s infinite";
      newAnchor.style.overflow = "hidden";
      newAnchor.style.height = "0px";
      revealNummberWrapper.appendChild(newAnchor);
      newAnchor.style.transition = "0.5s";
      setTimeout(() => {
        newAnchor.style.height = contactNumberHeight + "px";
      }, 500);
    }
  }
  function toggleForm() {
    form.classList.toggle("form-extended");
    fadeOutElement(revealFormText);
  }

  revealNumberBtn.addEventListener("click", revealNumber);
  revealFormBtn.addEventListener("click", toggleForm);
});
