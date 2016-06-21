const https = require('https')

function getData (apiUrl, meetupName, eventId) {
  return new Promise((resolve, reject) => {
    let body = ''
    const url = apiUrl.replace('{{meetupName}}', meetupName).replace('{{eventId}}', eventId)

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
