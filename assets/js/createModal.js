function createContentList(itemContent) {
  const itemContentHtml = itemContent.map((item) => {
    `<div class="track-container">
    <span class="small-text track"> ${item}
    </span>
    </div>`;
  });

  return itemContentHtml;
}

function createConditions(conditions) {}

function createModalTemplate(item) {
  const {
    itemSubtitle,
    itemTitle,
    itemTitleDetail,
    itemContent,
    itemPrice,
    paypalCode,
    conditions,
  } = item;

  const checkoutConfirmModal = `
		<div class="card-column">
			<div class="conditions">
				<p class="medium-text accent-text">
					${itemSubtitle}
				</p>
				<span style="text-transform: capitalize" class="big-text">
					${itemTitle} 
					<span class="big-text secondary-text-color">${itemTitleDetail}</span>
				</span>
				<p class="big-text">
					€30
				</p>
			</div>
		</div>
		<div class="card-column">
			<p class="xs-text secondary-text-color">
				Contiene:
			</p>
			${createContentList(itemContent)}
		</div>
		<form action="https://www.paypal.com/cgi-bin/webscr" method="post" rel="noreferrer" target="_blank">
			<input type="hidden" name="cmd" value="_s-xclick">
			<input type="hidden" id="keyholder" name="hosted_button_id" value=${paypalCode}>
			<div style="margin: 2rem auto; max-width: clamp(230px, 60%, 550px); align-items: center" class="cta-button pulse">
			<span style="width: 20%; max-width: 50px">
				<img src="./assets/img/icons/paypal.png" alt="Paypal icon" />
			</span>
			<span class="medium-text">
				Paga con PayPal
			</span>
				<button style="width: 100%; height: 100%; opacity:0; top: 0; left: 0; right: 0; position: absolute;z-index: 999; cursor:pointer; margin: 0" type="submit" name="submit">
				</button>
			</div>
			<div class="conditions xs-text"> Condizioni:
				<div class="condition">
					<input type="checkbox" required id="conditions-ticket-reception">  
					<label class=" xs-text secondary-text-color" for="conditions-ticket-reception"> Riceverai le tracce del pacchetto selezionato sull'email del tuo account Paypal <span class="xs-text accent-text">entro DUE giorni</span> dal completamento del pagamento.</label>
				</div>
		</form>
`;
}
