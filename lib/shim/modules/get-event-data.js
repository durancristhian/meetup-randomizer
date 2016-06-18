const $ = require('jquery')

function getData (meetupName, eventId) {
  return new Promise((resolve, reject) => {
    const url = `https://api.meetup.com/${meetupName}/events/${eventId}/rsvps?only=group.urlname,member,response&callback=?`

    $.getJSON(url)
      .done(results => resolve(results.data))
      .fail(error => reject(error))
  })
}

module.exports = getData
