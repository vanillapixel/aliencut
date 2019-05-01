document.addEventListener("DOMContentLoaded", () => {
  let events =
    // TODO: data fetch from database
    // dummy dates
    [
      {
        date: "2019-03-17",
        location: "la baya",
        city: "perugia",
        province: "pg"
      },
      {
        date: "2019-03-28",
        location: "tenax",
        city: "bergamo",
        province: "bg"
      },
      {
        date: "2019-04-15",
        location: "Greenhouse",
        city: "segrate",
        province: "mi"
      },
      {
        date: "2019-04-22",
        location: "lercio",
        city: "ascoli piceno",
        province: "bg"
      },
      {
        date: "2019-04-29",
        location: "aftereffects",
        city: "sondrio",
        province: "bg"
      },
      {
        date: "2019-05-05",
        location: "silvermoon",
        city: "perugia",
        province: "pg"
      },
      {
        date: "2019-05-12",
        location: "tenax",
        city: "bergamo",
        province: "bg"
      },
      {
        date: "2019-05-21",
        location: "palazzetto dello sport",
        city: "ascoli piceno",
        province: "bg"
      },
      {
        date: "2019-06-12",
        location: "nightcrawl",
        city: "napoli",
        province: "na"
      },
      {
        date: "2019-06-12",
        location: "cocoricò",
        city: "savona",
        province: "sv"
      }
    ];

  const monthNames = [
    "gennaio",
    "febbraio",
    "marzo",
    "aprile",
    "maggio",
    "giugno",
    "luglio",
    "agosto",
    "settembre",
    "ottobre",
    "novembre",
    "dicembre"
  ];

  const eventsDiv = document.querySelector(".events");
  for (let i = 0; i < events.length; i++) {
    eventsDiv.innerHTML += `<li class="event" >
  <div class="event-details">
    <h4 class="date">
    <p class="day">${
      new Date(events[i].date).getDate() > 9
        ? new Date(events[i].date).getDate()
        : "0" + new Date(events[i].date).getDate()
    }</p>
    <p class="month">${monthNames[new Date(events[i].date).getMonth()]}</p>
    </h4>
    <h5 class="city">
      <p class="comune">${events[i].city}</p>
      <p class="provincia">(${events[i].province})</p>
    </h5>
  </div>
<h3 class="location">@ ${events[i].location}</h3>
</li>`;
  }
});

{
  /* <li class="event" >
  <div class="event-details">
    <h4 class="date">
    <span class="day">${new Date(events[i].date).getDate()}</span>
    <span class="month">${monthNames[new Date(events[i].date).getMonth()]}</span></h4>
    <h5 class="city">
      <span class="comune">${events[i].city}</span>
      <span class="provincia">${events[i].province}</span>
    </h5>
  </div>
<h3 class="location">@${events[i].location}</h3>
</li> */
}
