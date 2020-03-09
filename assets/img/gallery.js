const zoomModal = document.querySelector(".zoom-modal");
const carousel = document.querySelector(".carousel");
const zoomedPicture = document.querySelector(".carousel img");
const galleryPics = document.querySelectorAll(".gallery-pictures .picture img");
const controllers = document.querySelectorAll(".zoom-modal .controller");
const closeButton = document.querySelector(".close-button");
const backdrop = document.querySelector(".backdrop");
let currentPicId;
let transitionInProgress = false;

function closeModal() {
  if (!transitionInProgress) {
    deletePicture();
    zoomModal.style.opacity = 0;
    setTimeout(() => {
      zoomModal.style.display = "none";
    }, 1200);
  }
}

function createNewPicture(e, buttonPressed) {
  const newImg = document.createElement("img");
  currentPicId = typeof e === "object" ? e.currentTarget.id : e;
  currentPicId;
  newImg.src = typeof e === "object" ? e.currentTarget.src : galleryPics[e].src;
  carousel.appendChild(newImg);
  if (buttonPressed === "next") {
    newImg.classList.add("from-right");
  } else {
    newImg.classList.add("from-left");
  }
  setTimeout(() => {
    newImg.classList.add("slide-in");
  }, 200);
}

function deletePicture(buttonPressed = false) {
  const currentPicture = document.querySelectorAll(".carousel img")[0];
  if (buttonPressed) {
    if (buttonPressed === "next") {
      currentPicture.classList.add("slide-out-from-right");
    } else {
      currentPicture.classList.add("slide-out-from-left");
    }
  }
  if (currentPicture != undefined) {
    currentPicture.classList.add("slide-out-from-right");
    setTimeout(() => {
      carousel.removeChild(currentPicture);
      transitionInProgress = false;
    }, 1500);
  }
}

function updateDisplayedPicture(buttonPressed) {
  // if next is pressed, id increases
  if (buttonPressed === "next") {
    deletePicture(buttonPressed);
    //if it's the last picture it starts back from the beginning
    currentPicId == galleryPics.length - 1
      ? (currentPicId = 0)
      : currentPicId++;
    createNewPicture(currentPicId, buttonPressed);
  } else {
    deletePicture(buttonPressed);
    // if it's the first picture it starts back from the end
    currentPicId == 0
      ? (currentPicId = galleryPics.length - 1)
      : currentPicId--;
    createNewPicture(currentPicId, buttonPressed);
  }
}

galleryPics.forEach((pic, id) => {
  pic.id = id;
  pic.addEventListener("click", e => {
    if (!isMobile()) {
      deletePicture();
      createNewPicture(e);
      zoomModal.style.display = "flex";
      setTimeout(() => (zoomModal.style.opacity = 1), 100);
    }
  });
});

controllers.forEach(controller => {
  controller.addEventListener("click", function() {
    if (!transitionInProgress) {
      transitionInProgress = true;
      const buttonClasses = this.classList.value.split(" ");
      const buttonClass = buttonClasses
        .filter(x => x != "controller")
        .toString();
      updateDisplayedPicture(buttonClass);
    }
  });
});

closeButton.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
