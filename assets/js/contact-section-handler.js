const revealFormBtn = document.querySelector(".reveal-form");
const form = document.querySelector(".contact-form");
const revealFormText = document.querySelector(".reveal-form-text");
const revealNummberBtn = document.querySelector(".reveal-number");
const contactNumberText = document.querySelector(".contact-number-text");
const revealNumberText = document.querySelector(".reveal-number-text");
let numberRevealed = false;

function fadeOutElement(el) {
  const { style } = el;
  style.opacity = 0;
  style.height = "0px";
  setTimeout(
    () => {
      style.display = "none";
    },
    500,
    el
  );
}
function revealNumber() {
  if (!numberRevealed) {
    numberRevealed = true;
    fadeOutElement(contactNumberText);
    revealNumberText.textContent = "clicca qui per chiamare";
    const newAnchor = document.createElement("a");
    newAnchor.setAttribute("href", "tel:3381785771");
    newAnchor.textContent = "3381785771";
    revealNummberBtn.appendChild(newAnchor);
  }
}
function toggleForm() {
  form.classList.toggle("form-extended");
  fadeOutElement(revealFormText);
}

revealFormBtn.addEventListener("click", toggleForm);
revealNummberBtn.addEventListener("click", revealNumber);
