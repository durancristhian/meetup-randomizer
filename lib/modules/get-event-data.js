const https = require('https')

function getData (meetupName, eventId) {
  return new Promise((resolve, reject) => {
    let body = ''
    const url = `https://api.meetup.com/${meetupName}/events/${eventId}/rsvps?only=group.urlname,member,response`

    https
      .get(url, response => {
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
