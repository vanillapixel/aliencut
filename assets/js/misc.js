function initPayPalButton() {
  paypal
    .Buttons({
      style: {
        shape: "pill",
        color: "gold",
        layout: "horizontal",
        label: "buynow",
        tagline: true,
      },

      createOrder: function (data, actions) {
        return actions.order.create({
          purchase_units: [
            {
              description: "Bracciale Alien nero/oro",
              amount: { currency_code: "EUR", value: 1 },
            },
          ],
        });
      },

      onApprove: function (data, actions) {
        return actions.order.capture().then(function (details) {
          alert(
            "Transaction completed by " + details.payer.name.given_name + "!"
          );
          console.log(data);
        });
      },

      onError: function (err) {
        console.log(err);
      },
    })
    .render("#paypal-button-container");
}
// setTimeout(initPayPalButton, 2500);
