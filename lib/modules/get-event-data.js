const https = require('https')

function getData (meetupName, eventId) {
  return new Promise((resolve, reject) => {
    let body = ''
    const url = `https://api.meetup.com/${meetupName}/events/${eventId}/rsvps`

    https
      .get(url, response => {
        if (response.statusCode !== 200) {
          return reject(response)
        }

        response.on('data', chunk => {
          body += chunk
        })

        response.on('end', () => {
          const parsedJSON = JSON.parse(body)
          resolve(parsedJSON)
        })
      })
      .on('error', error => {
        reject(error)
      })
  })
}

module.exports = getData
