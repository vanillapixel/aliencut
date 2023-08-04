function modalContent({ title, titleExtraInfo, price, content, paypalCode }) {
  let contentHTML = "";

  content.map((item) => {
    contentHTML += `<div class="track-container">
	<span class="small-text track">${item}</span>
	</div>`;
  });

  return `<div class="card-column">
			<div class="conditions">
				<p class="medium-text accent-text">
					Pacchetto tracce
				</p>
				<span style="text-transform: capitalize" class="big-text">
					${title}
					<span class="big-text secondary-text-color">${titleExtraInfo}</span>
					</span>
					<p class="big-text">
					€${price}
				</p>
			</div>
		</div>
		<div class="card-column">
			<p class="xs-text secondary-text-color">
				Contiene:
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
			<span class="medium-text">
				Paga con PayPal
			</span>
				<button style="width: 100%; height: 100%; opacity:0; top: 0; left: 0; right: 0; position: absolute;z-index: 999; cursor:pointer; margin: 0" type="submit" name="submit">
				</button>
			</div>
			<div class="conditions xs-text"> Condizioni:
				<div class="condition">
					<input type="checkbox" required="" id="conditions-ticket-reception">  
					<label class=" xs-text secondary-text-color" for="conditions-ticket-reception"> Riceverai il contenuto sull'email del tuo account Paypal <span class="xs-text accent-text">entro TRE giorni</span> dal completamento del pagamento.</label>
				</div>
			</div>
		</form>
	</div>`;
}

const extraContentOffers = [
  {
    id: "xtdvrs",
    title: "Alien Lab Exp.1",
    titleExtraInfo: "Extended",
    price: 5,
    paypalCode: "KFFEGLZKHWXJ4",
    content: [
      `20 tracce extended dell'album Alien Lab Exp.1`,
      `1 traccia bonus esclusiva in versione extended`,
    ],
  },
  {
    id: "xtdvrsal2",
    title: "Alien Lab Vol.2",
    titleExtraInfo: "Extended",
    price: 10,
    paypalCode: "ZCKMXD88DU9Y4",
    content: [
      `17 tracce extended dell'album Alien Lab Vol.2`,
      `1 traccia bonus esclusiva in versione extended`,
    ],
  },
];

extraContentOffers.forEach((item) => {
  if (window.location.search.split("?")[1] === item.id) {
    openModal(modalContent(item));
  }
});
