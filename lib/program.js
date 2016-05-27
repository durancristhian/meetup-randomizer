'use strict'

const imageToConsole = require('./image-to-console')
const path = require('path')
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

function getData (parameters) {
  return new Promise((resolve, reject) => {
    const { meetupName, eventId, apiKey } = parameters
    const url = `https://api.meetup.com/${meetupName}/events/${eventId}/rsvps?key=${apiKey}&sign=true`

    request(url, (error, response, body) => {
      if (error || response.statusCode !== 200) return reject(error || body)

      const parsedJSON = JSON.parse(body)
      resolve(parsedJSON)
    })
  })
}

function showLogo (parameters) {
  return new Promise((resolve, reject) => {
    const cols = 40
    const logoPath = path.join(__dirname, '..', 'images', 'BANodeJS.jpeg')

    imageToConsole(logoPath, cols, (error, ok) => {
      if (error) return reject(error)

      resolve(parameters)
    })
  })
}

function showWinnerImage (winner) {
  return new Promise((resolve, reject) => {
    if (winner.photoURL) {
      const cols = 30

      imageToConsole(winner.photoURL, cols, (error, ok) => {
        if (error) return reject(error)

        resolve(winner)
      })
    } else {
      resolve(winner)
    }
  })
}

function showWinnerInformation (winner) {
  return new Promise((resolve, reject) => {
    console.log(winner.name.toUpperCase())
    console.log(winner.profileURL)

    resolve(winner)
  })
}

module.exports = function execute (meetupName, eventId, apiKey) {
  return showLogo({ meetupName, eventId, apiKey })
    .then(getData)
    .then(excludeNonConfirmedMembers)
    .then(chooseAWinner)
    .then(showWinnerImage)
    .then(showWinnerInformation)
}
