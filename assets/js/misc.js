const codeSubmit = document.querySelector(".icon-container svg");
const specialTracksInput = document.querySelector("#special-tracks-code");
const codeForm = document.querySelector("#code-form");
const body = document.querySelector("body");
const infoModal = document.querySelector(".info-modal");
const closeButton = document.querySelector(".info-modal .close-button");
const backdrop = document.querySelector(".info-modal .backdrop");

const infoModalContainer = document.querySelector(".info-modal .vertical-card");
const trackDownloadBtn = document.createElement("div");

let isInfoModalOpen = false;

const infoModalMessage = `<span>
		Grazie per aver acquistato il CD, il tuo supporto è importante
	</span>
<a
class="cta-wrapper cta-button pulse"
href="./assets/uploads/extended_tracks_mcsv2.rar"
rel="noreferrer"
target="_blank"
>
Scarica le tracce
</a>`;

function openModal(content) {
	infoModalContainer.innerHTML = content;
	infoModal.style.display = "flex";
	setTimeout(() => (infoModal.style.opacity = 1), 100);
	isInfoModalOpen = true;
}
function closeModal() {
	infoModal.style.opacity = 0;
	setTimeout(() => {
		infoModal.style.display = "none";
		isInfoModalOpen = false;
	}, 800);
	trackDownloadBtn.removeEventListener("click", closeModal);
}

function codeChecker(e) {
	e.preventDefault();
	if (!isInfoModalOpen) {
		const code = specialTracksInput.value.toUpperCase();

		if (code === "MCS2ACEXT5") {
			// open modal
			openModal(infoModalMessage);
			// tracks button link added
			infoModalMessage.appendChild(trackDownloadBtn);
			trackDownloadBtn.addEventListener("click", closeModal);
		} else {
			openModal("Il codice inserito non è valido");
		}
	} else return;
}
// codeSubmit.addEventListener("click", codeChecker);
// codeForm.addEventListener("submit", codeChecker);
closeButton.addEventListener("click", closeModal);
backdrop.addEventListener("click", closeModal);
