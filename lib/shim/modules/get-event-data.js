const $ = require('jquery')

function getData (apiUrl,meetupName, eventId) {
  return new Promise((resolve, reject) => {
    const url = apiUrl.replace('{{meetupName}}', meetupName).replace('{{eventId}}', eventId)

    $.getJSON(url)
      .done(results => resolve(results.data))
      .fail(error => reject(error))
  })
}

module.exports = getData
