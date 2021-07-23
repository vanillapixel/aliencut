const codeSubmit = document.querySelector(".icon-container svg");
const specialTracksInput = document.querySelector("#special-tracks-code");
const codeForm = document.querySelector("#code-form");
const body = document.querySelector("body");
const codeModal = document.querySelector(".code-modal");
const closeButton = document.querySelector(".code-modal .close-button");
const backdrop = document.querySelector(".code-modal .backdrop");

const codeModalMessage = document.querySelector(".code-modal .vertical-card");
const trackDownloadBtn = document.createElement("div");

let isCodeModalOpen = false;

trackDownloadBtn.classList.add("cta-wrapper");

const trackDownloadBtnHtml = `
	<a
		class="cta-button pulse"
		href="./assets/uploads/extended_tracks_mcsv2.rar"
		rel="noreferrer"
		target="_blank"
	>
		Scarica le tracce
	</a>`;

trackDownloadBtn.innerHTML = trackDownloadBtnHtml;

function openModal() {
	codeModal.style.display = "flex";
	setTimeout(() => (codeModal.style.opacity = 1), 100);
	isCodeModalOpen = true;
}
function closeModal() {
	codeModal.style.opacity = 0;
	setTimeout(() => {
		codeModal.style.display = "none";
		codeModalMessage.childNodes[length - 1] === "div"
			? codeModalMessage.removeChild(trackDownloadBtn)
			: null;
		isCodeModalOpen = false;
	}, 1200);
	trackDownloadBtn.removeEventListener("click", closeModal);
}

function codeChecker(e) {
	e.preventDefault();
	if (!isCodeModalOpen) {
		const code = specialTracksInput.value.toUpperCase();

		if (code === "MCS2ACEXT5") {
			// open modal
			openModal();
			// tracks button link added
			codeModalMessage.appendChild(trackDownloadBtn);
			trackDownloadBtn.addEventListener("click", closeModal);
		} else {
			// error management
			// code is wrong,
			// code is empty
			alert("Il codice inserito non è valido");
		}
	} else return;
}
codeSubmit.addEventListener("click", codeChecker);
codeForm.addEventListener("submit", codeChecker);
closeButton.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);

// function initPayPalButton() {
//   paypal
//     .Buttons({
//       style: {
//         shape: "pill",
//         color: "gold",
//         layout: "horizontal",
//         label: "buynow",
//         tagline: true,
//       },

//       createOrder: function (data, actions) {
//         return actions.order.create({
//           purchase_units: [
//             {
//               description: "Bracciale Alien nero/oro",
//               amount: { currency_code: "EUR", value: 1 },
//             },
//           ],
//         });
//       },

//       onApprove: function (data, actions) {
//         return actions.order.capture().then(function (details) {
//           alert(
//             "Transaction completed by " + details.payer.name.given_name + "!"
//           );
//           console.log(data);
//         });
//       },

//       onError: function (err) {
//         console.log(err);
//       },
//     })
//     .render("#paypal-button-container");
// }
// // setTimeout(initPayPalButton, 2500);
