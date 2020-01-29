document.addEventListener("DOMContentLoaded", () => {
  let events;
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

  if (location.hostname === "localhost" || location.hostname === "127.0.0.1") {
    events = [
      {
        date: "2019-01-05",
        location: "tenax",
        city: "samugheo",
        province: "or"
      },
      {
        date: "2019-01-26",
        location: "touch club",
        city: "casale monferrato",
        province: "al"
      },
      {
        date: "2019-02-23",
        location: "barabba",
        city: "bricherasio",
        province: "to"
      },
      {
        date: "2019-03-04",
        location: "piazza 1° maggio",
        city: "ravanusa",
        province: "ag"
      },
      {
        date: "2019-03-08",
        location: "mirror",
        city: "marsaglia",
        province: "cn"
      },
      {
        date: "2019-03-23",
        location: "club modà",
        city: "erba",
        province: "co"
      },
      {
        date: "2019-03-30",
        location: "rupe",
        city: "mezzolombardo",
        province: "tn"
      },
      {
        date: "2019-04-27",
        location: "cis land",
        city: "cis",
        province: "tn"
      },
      {
        date: "2019-05-24",
        location: "number one",
        city: "piasco",
        province: "cn"
      },
      {
        date: "2019-06-15",
        location: "sand music festival",
        city: "carmagna piemonte",
        province: "cn"
      },
      {
        date: "2019-06-29",
        location: "international summer dj festival",
        city: "badesi",
        province: "ot"
      },
      {
        date: "2019-07-05",
        location: "number one",
        city: "cantogno di villafranca",
        province: "to"
      },
      {
        date: "2019-07-13",
        location: "extreme disco",
        city: "mombercelli",
        province: "to"
      },
      {
        date: "2019-07-20",
        location: "movida",
        city: "veduggio",
        province: "mb"
      },
      {
        date: "2019-08-01",
        location: "summer party",
        city: "spello",
        province: "pg"
      },
      {
        date: "2019-08-03",
        location: "international summer dj festival",
        city: "villagrande strisaili",
        province: "og"
      },
      {
        date: "2019-08-03",
        location: "piazza san giovanni",
        city: "alà dei sardi",
        province: "tn"
      },
      {
        date: "2019-08-10",
        location: "kapannone disco",
        city: "casanova di rovegno",
        province: "ge"
      },
      {
        date: "2019-08-15",
        location: "number one",
        city: "gerbo di fossano",
        province: "cn"
      },
      {
        date: "2019-08-17",
        location: "paoli fest",
        city: "semogo",
        province: "so"
      },
      {
        date: "2019-08-21",
        location: "pro loco",
        city: "limana",
        province: "or"
      },
      {
        date: "2019-01-26",
        location: "international summer dj festival",
        city: "tempio pausania",
        province: "ot"
      },
      {
        date: "2019-09-07",
        location: "mato",
        city: "borgo valsugana",
        province: "tn"
      },
      {
        date: "2019-10-12",
        location: "international summer dj festival",
        city: "s. teresa di gallura",
        province: "ot"
      },
      {
        date: "2019-10-31",
        location: "mirror",
        city: "marsaglia",
        province: "cn"
      },
      {
        date: "2019-11-08",
        location: "barabba",
        city: "bricherasio",
        province: "to"
      },
      {
        date: "2019-11-27",
        location: "hollywood",
        city: "milano",
        province: "mi"
      },
      {
        date: "2019-12-21",
        location: "time",
        city: "milano",
        province: "mi"
      },
      {
        date: "2019-12-31",
        location: "international summer dj festival",
        city: "carmagna piemonte",
        province: "cn"
      },
      {
        date: "2019-04-07",
        location: "mirror",
        city: "marsaglia",
        province: "cn"
      },
      {
        date: "2019-07-10",
        location: "movida",
        city: "veduggio",
        province: "mb"
      },
      {
        date: "2019-08-15",
        location: "summer party",
        city: "cavaglià",
        province: "to"
      },
      {
        date: "2020-01-10",
        location: "taverna top sound",
        city: "mantova",
        province: "mn"
      }
    ];
  } else {
    events = getEvents();
  }

  async function getEvents() {
    const eventsArray = await fetch("https://aliencut-fdfd5.firebaseio.com/");
    return await eventsArray.json();
  }

  console.log(events);

  //making sure that the dates are sorted
  events.sort((a, b) => (a.date > b.date ? 1 : b.date > a.date ? -1 : 0));

  const today = new Date();

  function getClosestDate() {
    let closestDate = Infinity;
    events.forEach(event => {
      let date = new Date(event.date);
      if (
        date >= today &&
        (date < new Date(closestDate) || date < closestDate)
      ) {
        closestDate = date;
      }
    });
    if (closestDate == Infinity) {
      events[events.length - 1].isClosest = true;
    } else {
      const formattedClosestDate = `${closestDate.getFullYear()}-${
        closestDate.getMonth() >= 9
          ? closestDate.getMonth() + 1
          : "0" + (closestDate.getMonth() + 1)
      }-${closestDate.getDate()}`;

      events.forEach(event => {
        if (event.date == formattedClosestDate) {
          event.isClosest = true;
        }
      });
    }
  }

  getClosestDate();

  const eventsContainer = document.querySelector(".events");

  events.slice(-15).map(event => {
    const { date, city, province, location } = event;
    eventsContainer.innerHTML += `<li ${
      event.hasOwnProperty("isClosest")
        ? 'class="event next-event"'
        : 'class="event"'
    }>
  <div class="event-details" data-year="${new Date(date).getFullYear()}">
    <h4 class="date">
    <p class="day">${
      new Date(date).getDate() > 9
        ? new Date(date).getDate()
        : "0" + new Date(date).getDate()
    }</p>
    <p class="month">${monthNames[new Date(date).getMonth()]}</p>
    </h4>
    <h5 class="city">
      <p class="comune">${city}</p>
      <p class="provincia">(${province})</p>
    </h5>
  </div>
  <div class="location">
  <h3><span>@</span> ${location}</h3>
  </div>
</li>`;
  });
});
