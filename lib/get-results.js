'use strict'

const https = require('https')
const uniqueRandomArray = require('unique-random-array')

function chooseAWinner (confirmedMembersList) {
  return new Promise((resolve, reject) => {
    const winner = uniqueRandomArray(confirmedMembersList)()

    resolve(winner)
  })
}

function excludeNonConfirmedMembers (membersList) {
  return new Promise((resolve, reject) => {
    const confirmedMembersList = membersList.reduce(
      (previous, current) => {
        if (current.response === 'yes') {
          let photoURL

          if (current.member.photo && current.member.photo.highres_link) {
            photoURL = current.member.photo.highres_link
          }

          previous.push({
            name: current.member.name,
            photoURL,
            profileURL: `http://www.meetup.com/${current.group.urlname}/members/${current.member.id}`
          })
        }

        return previous
      },
      []
    )

    resolve(confirmedMembersList)
  })
}

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

module.exports = function program (meetupName, eventId) {
  return getData(meetupName, eventId)
    .then(excludeNonConfirmedMembers)
    .then(chooseAWinner)
}
