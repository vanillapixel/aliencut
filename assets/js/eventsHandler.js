document.addEventListener("DOMContentLoaded", () => {

  let events =

    // TODO: data fetch from database
    // dummy dates
    [
      {
        date: '2019-03-17',
        location: 'la baya',
        city: 'perugia',
        province: 'pg'
      },
      {
        date: '2019-03-28',
        location: 'tenax',
        city: 'bergamo',
        province: 'bg',
      },
      {
        date: '2019-05-08',
        location: 'lercio',
        city: 'ascoli piceno',
        province: 'bg',
      },
      {
        date: '2019-03-28',
        location: 'aftereffects',
        city: 'sondrio',
        province: 'bg',
      },
      {
        date: '2019-03-17',
        location: 'la baya',
        city: 'perugia',
        province: 'pg'
      },
      {
        date: '2019-03-28',
        location: 'tenax',
        city: 'bergamo',
        province: 'bg',
      },
      {
        date: '2019-05-08',
        location: 'lercio',
        city: 'ascoli piceno',
        province: 'bg',
      },
      {
        date: '2019-03-28',
        location: 'aftereffects',
        city: 'sondrio',
        province: 'bg',
      }
    ]



  const eventsDiv = document.querySelector('.events');
  for (let i = 0; i < events.length; i++) {

    eventsDiv.innerHTML += `<li class="event">
<div class="event-details">
  <h4 class="date">${events[i].date}</h4>
  <h5 class="city">${events[i].city} (${events[i].province})</h5>
</div>
<h3 class="location">@ ${events[i].location}</h3>
</li>`;
  }
})