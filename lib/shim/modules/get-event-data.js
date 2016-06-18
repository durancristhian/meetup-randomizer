const $ = require('jquery')

function getData (meetupName, eventId) {
  return new Promise((resolve, reject) => {
    const url = `https://api.meetup.com/${meetupName}/events/${eventId}/rsvps?callback=?`

    $.getJSON(url)
      .done(results => resolve(results.data))
      .fail(error => reject(error))
  })
}

module.exports = getData
