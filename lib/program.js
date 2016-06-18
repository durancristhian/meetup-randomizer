'use strict'

const getEventData = require('./modules/get-event-data')
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

module.exports = function program (meetupName, eventId) {
  return getEventData(meetupName, eventId)
    .then(excludeNonConfirmedMembers)
    .then(chooseAWinner)
}
