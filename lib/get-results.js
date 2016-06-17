'use strict'

const request = require('request')
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
    const url = `https://api.meetup.com/${meetupName}/events/${eventId}/rsvps`

    request(url, (error, response, body) => {
      if (error || response.statusCode !== 200) {
        return reject(error || body)
      }

      const parsedJSON = JSON.parse(body)
      resolve(parsedJSON)
    })
  })
}

module.exports = function program (meetupName, eventId) {
  return getData(meetupName, eventId)
    .then(excludeNonConfirmedMembers)
    .then(chooseAWinner)
}
