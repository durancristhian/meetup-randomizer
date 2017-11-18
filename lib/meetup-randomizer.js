'use strict'

const getEventData = require('./modules/get-event-data')
const shuffle = require('knuth-shuffle').knuthShuffle;

let CUSTOM_API_URL
let CUSTOM_PROFILE_URL

function chooseAWinner (winnersAmount, confirmedMembersList) {
  return new Promise((resolve, reject) => {
    if (!confirmedMembersList.length) {
      return reject(new Error('No qualified attendees available.'))
    }

    if (winnersAmount > confirmedMembersList.length) {
      return reject(new Error(`The amount of winners (${winnersAmount}) is greater than the amount of confirmed members (${confirmedMembersList.length}).`))
    }

    const winners = shuffle(confirmedMembersList.slice(0))

    return resolve(winners.slice(0, winnersAmount))
  })
}

function excludeHosts (membersList) {
  return new Promise((resolve, reject) => {
    if (Array.isArray(membersList)) {
      const membersListWithoutHosts = membersList.filter(m => !m.member.event_context.host)

      return resolve(membersListWithoutHosts)
    }

    if (membersList.errors && membersList.errors.length) {
      const firstError = membersList.errors.shift()

      if (firstError.message) {
        return reject(new Error(firstError.message))
      }
    }

    return reject(new Error('Unknown error encountered with the Meetup API.'))
  })
}

function excludeNonConfirmedMembers (membersListWithoutHosts) {
  return new Promise((resolve, reject) => {
    const confirmedMembersList = membersListWithoutHosts.reduce(
      (membersList, user) => {
        if (user.response === 'yes') {
          let photoURL

          if (user.member.photo) {
            photoURL = user.member.photo.highres_link || user.member.photo.photo_link
          }

          membersList.push({
            name: user.member.name,
            photoURL,
            profileURL: CUSTOM_PROFILE_URL ||
              `http://www.meetup.com/${user.group.urlname}/members/${user.member.id}`
          })
        }

        return membersList
      },
      []
    )

    resolve(confirmedMembersList)
  })
}

function run (meetupName, eventId, winnersAmount) {
  const API_URL = CUSTOM_API_URL ||
    `https://api.meetup.com/${meetupName}/events/${eventId}/rsvps?only=group.urlname,member,response`

  return getEventData(API_URL, meetupName, eventId)
    .then(excludeHosts)
    .then(excludeNonConfirmedMembers)
    .then(chooseAWinner.bind(null, winnersAmount))
}

function setCustomApiUrl (customApiUrl) {
  CUSTOM_API_URL = customApiUrl
}

function setCustomProfileUrl (customProfileUrl) {
  CUSTOM_PROFILE_URL = customProfileUrl
}

module.exports = {
  run,
  setCustomApiUrl,
  setCustomProfileUrl
}
