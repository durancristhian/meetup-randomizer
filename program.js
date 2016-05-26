'use strict'

const ansi = require('ansi')
const Jimp = require('jimp')
const request = require('request')
const uniqueRandomArray = require('unique-random-array')

function chooseAWinner (confirmedMembersList) {
  return new Promise((resolve, reject) => {
    const mixer = uniqueRandomArray(confirmedMembersList)
    let winner = mixer()

    resolve(winner)
  })
}

function excludeNonConfirmedMembers (membersList) {
  return new Promise((resolve, reject) => {
    const confirmedMembersList = membersList.reduce((previous, current) => {
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
    }, [])

    resolve(confirmedMembersList)
  })
}

function getData (meetupName, eventId, apiKey) {
  return new Promise((resolve, reject) => {
    request(
      `https://api.meetup.com/${meetupName}/events/${eventId}/rsvps?key=${apiKey}&sign=true`,
      (error, response, body) => {
        if (error) return reject(error.message)

        const parsedJSON = JSON.parse(body)
        resolve(parsedJSON)
      }
    )
  })
}

function showWinnerImage (winner) {
  return new Promise((resolve, reject) => {
    if (winner.photoURL) {
      Jimp.read(winner.photoURL, (error, image) => {
        if (error) { return resolve(winner) }

        const cursor = ansi(process.stdout)
        const resizedImage = image.resize(30, Jimp.AUTO)
        const height = resizedImage.bitmap.height
        const width = resizedImage.bitmap.width

        console.log('')
        console.log('')

        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const color = `#${resizedImage.getPixelColor(x, y).toString(16).substr(0, 6)}`
            cursor.hex(color).write('██')
          }

          console.log('')
        }

        cursor.fg.reset()

        resolve(winner)
      })
    } else {
      resolve(winner)
    }
  })
}

function showWinnerInformation (winner) {
  return new Promise((resolve, reject) => {
    console.log('')
    console.log('')
    console.log(winner.name.toUpperCase())
    console.log(winner.profileURL)
    console.log('')
    console.log('')

    resolve(winner)
  })
}

module.exports = function execute (meetupName, eventId, apiKey) {
  return getData(meetupName, eventId, apiKey)
    .then(excludeNonConfirmedMembers)
    .then(chooseAWinner)
    .then(showWinnerImage)
    .then(showWinnerInformation)
}
