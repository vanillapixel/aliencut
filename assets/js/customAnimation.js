function modalContent({
  title,
  titleExtraInfo,
  description,
  price,
  content,
  paypalCode,
  conditions,
}) {
  let contentHTML = "";
  let conditionsHTML = "";

  content[lang].map((item) => {
    contentHTML += `<div class="track-container">
	<span class="small-text track">${item}</span>
	</div>`;
  });

  if (conditions[lang]) {
    conditionsHTML += `
	<div class="card-column">
		<p class="xs-text secondary-text-color">${
      lang === "it" ? "Condizioni" : "Conditions"
    }:</p>`;
    conditions[lang].map((condition, i) => {
      conditionsHTML += `<div class="track">
		<input type="checkbox" required="" id="conditions-${i + 1}">  
		<label class="xs-text" for="conditions-${i + 1}">${condition}</label>
	</div>`;
    });
    conditionsHTML += `</div>`;
  }

  return `<div class="card-column">
			<div class="conditions">
				<p class="medium-text accent-text">
				${description[lang]}
				</p>
				<span style="text-transform: capitalize" class="big-text">
					${title[lang]}
					<span class="big-text secondary-text-color">${titleExtraInfo[lang]}</span>
					</span>
					<p class="big-text">
					€${price}
				</p>
			</div>
		</div>
		<div class="card-column">
			<p class="xs-text secondary-text-color">
			${lang === "it" ? "Contiene" : "Contains"}:
			</p>
			${contentHTML}
			</div>
		</div>
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" rel="noreferrer" target="_blank">
			<input type="hidden" name="cmd" value="_s-xclick">
			<input type="hidden" id="keyholder" name="hosted_button_id" value="${paypalCode}">
			<div style="margin: 2rem auto; max-width: clamp(230px, 60%, 550px); align-items: center" class="cta-button pulse">
			<span style="width: 20%; max-width: 50px">
				<img src="./assets/img/icons/paypal.png" alt="Paypal icon">
			</span>
			<span class="medium-text">${lang === "it" ? "Acquista ora" : "Buy now"}
			</span>
				<button style="width: 100%; height: 100%; opacity:0; top: 0; left: 0; right: 0; position: absolute;z-index: 999; cursor:pointer; margin: 0" type="submit" name="submit">
				</button>
			</div>
			${conditionsHTML}
		</form>
	</div>`;
}

//   {
//     id: "xtdvrs",
//     title: "Alien Lab Exp.1",
//     titleExtraInfo: "Extended",
//     price: 5,
//     paypalCode: "KFFEGLZKHWXJ4",
//     content: [
//       `20 tracce extended dell'album Alien Lab Exp.1`,
//       `1 traccia bonus esclusiva in versione extended`,
//     ],
//   },
const extraContentOffers = [
  {
    id: "xtdvrs",
    title: { it: "Alien Lab Exp.1", en: "Alien Lab Exp.1" },
    titleExtraInfo: { it: "Extended", en: "Extended" },
    description: { it: "Pacchetto tracce", en: "Tracks pack" },
    price: 5,
    paypalCode: "KFFEGLZKHWXJ4",
    content: {
      it: [
        `20 tracce extended dell'album Alien Lab Exp.1`,
        `1 traccia bonus esclusiva in versione extended`,
      ],
      en: [
        `20 extended tracks of the album Alien Lab Exp.1`,
        `1 exclusive bonus track in extended version`,
      ],
    },
    conditions: {
      it: [
        `Una volta completato l'acquisto clicca su "TORNA AL SITO DEL COMMERCIANTE" e partirà il download automatico.`,
      ],
      en: [
        `Upon purchase completion, click on the "RETURN TO MERCHANT WEBSITE". The download of the tracks will start automatically.`,
      ],
    },
  },
  {
    id: "xtdvrsal2",
    title: { it: "Alien Lab Vol.2", en: "Alien Lab Vol.2" },
    titleExtraInfo: { it: "Extended", en: "Extended" },
    description: { it: "Pacchetto tracce", en: "Tracks pack" },
    price: 10,
    paypalCode: "ZCKMXD88DU9Y4",
    content: {
      it: [
        `17 tracce extended dell'album Alien Lab Vol.2`,
        `1 traccia bonus esclusiva in versione extended`,
      ],
      en: [
        `17 extended tracks of the Alien Lab Vol.2 album`,
        `1 exclusive extended track`,
      ],
    },
    conditions: {
      it: [
        `Una volta completato l'acquisto, clicca su "TORNA AL SITO DEL COMMERCIANTE" e partirà il download automatico delle tracce.`,
      ],
      en: [
        `Upon purchase completion, click on the "RETURN TO MERCHANT WEBSITE". The download of the tracks will start automatically.`,
      ],
    },
  },
];

let lang = navigator.language;
lang = lang.toLowerCase().includes("it") ? "it" : "en";

extraContentOffers.forEach((item) => {
  if (window.location.search.split("?")[1] === item.id) {
    openModal(modalContent(item));
  }
});
