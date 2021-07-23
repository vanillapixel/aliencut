const codeSubmit = document.querySelector(".icon-container svg");
const specialTracksInput = document.querySelector("#special-tracks-code");
const codeForm = document.querySelector("#code-form");
const body = document.querySelector("body");
const codeModal = document.querySelector(".code-modal");
const closeButton = document.querySelector(".code-modal .close-button");
const backdrop = document.querySelector(".code-modal .backdrop");

const codeModalMessage = document.querySelector(".code-modal .vertical-card");
const codeModalWrapper = document.createElement("div");

const trackDownloadBtn = `
	<a
		class="cta-button pulse"
		href="./assets/uploads/extended_tracks_mcsv2.rar"
		rel="noreferrer"
		target="_blank"
	>
		Scarica le tracce
	</a>`;

// const codeSubmit = document.querySelector("#download-btn");

function openModal() {
	codeModal.style.display = "flex";
	setTimeout(() => (codeModal.style.opacity = 1), 100);
}
function closeModal() {
	codeModal.style.opacity = 0;
	setTimeout(() => {
		body.reoveChild(codeModal);
	}, 1200);
}

function codeChecker(e) {
	e.preventDefault();
	// error management
	// code is wrong,
	// code is empty

	if (specialTracksInput.value === "MCS2ACEXT5") {
		// open modal
		openModal();
		codeModalMessage.innerHTML += trackDownloadBtn;
		// link tracce
	} else {
		alert("Il codice inserito non è valido");
	}
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
