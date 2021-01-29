// different theme color every day

// const root = document.documentElement;

// const defaultColors = [
//   "#ff6137",
//   "#E91E63",
//   "#009688",
//   "#a037ff",
//   "#0f7ea3",
//   "#38ff59",
//   "#dbe912",
// ];
// const day = new Date().getDay();
// root.style.setProperty("--main-color", defaultColors[day + 1]);

// USER COLOR PICKER CONTEST
/* color picker to let the user change the theme color

const colorsOptions = document.querySelectorAll(".color-option");

const defaultColors = ["#ff6138", "#a30f0f", "#ff2ed2", "#a037ff", "#0f7ea3"];

colors.forEach((colorOption, id) => {
  colorOption.style.background = defaultColors[id];
  colorOption.addEventListener("click", (e) =>
    document.documentElement.style.setProperty(
      "--main-color",
      e.target.style.background
    )
  );
});

const colorInput = document.querySelectorAll(".color-picker");

const pickedColorCounter = 0;

colorInput.addEventListener("input", function (e) {
  let pickedColor = e.target.value;

  colorsOptions[pickedColorCounter].style.backgroundColor = pickedColor;
  document.documentElement.style.setProperty("--main-color", pickedColor);
  pickedColorCounter === defaultColors.length - 1
    ? (pickedColorCounter = 0)
    : pickedColorCounter++;
});
*/
