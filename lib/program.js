'use strict'

const getEventData = require('./modules/get-event-data')
const uniqueRandomArray = require('unique-random-array')

function chooseAWinner (confirmedMembersList) {
  return new Promise((resolve, reject) => {
    const winner = uniqueRandomArray(confirmedMembersList)()

    if (!winner) {
      return reject(new Error('No qualified attendees available.'))
    }

    return resolve(winner)
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

function excludeNonConfirmedMembers (profileUrl, membersListWithoutHosts) {
  return new Promise((resolve, reject) => {
    const confirmedMembersList = membersListWithoutHosts.reduce(
      (previous, current) => {
        if (current.response === 'yes') {
          let photoURL

          if (current.member.photo && current.member.photo.highres_link) {
            photoURL = current.member.photo.highres_link
          }

          previous.push({
            name: current.member.name,
            photoURL,
            profileURL: profileUrl.replace('{{current.group.urlname}}', current.group.urlname).replace('{{current.member.id}}', current.member.id)
          })
        }

        return previous
      },
      []
    )

    resolve(confirmedMembersList)
  })
}

module.exports = function program (apiUrl, profileUrl, meetupName, eventId) {
  apiUrl = apiUrl || 'https://api.meetup.com/{{meetupName}}/events/{{eventId}}/rsvps?only=group.urlname,member,response'
  profileUrl = profileUrl || 'http://www.meetup.com/{{current.group.urlname}}/members/{{current.member.id}}'

  return getEventData(apiUrl, meetupName, eventId)
    .then(excludeHosts)
    .then(excludeNonConfirmedMembers.bind(null, profileUrl))
    .then(chooseAWinner)
}
