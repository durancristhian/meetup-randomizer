'use strict'

const beautylog = require('beautylog')
const htmlToJson = require('html-to-json')
const imageToAscii = require('image-to-ascii')
const uniqueRandomArray = require('unique-random-array')

function fetchAudiencesData (url) {
  return new Promise((resolve, reject) => {
    beautylog.log('Looking for the list of participants')

    htmlToJson.request(
      url,
      {
        'rsvp-list': [
          '#rsvp-list li',
          $li => $li.find('a.unlink').attr('href')
        ]
      },
      (error, result) => {
        if (error) return reject(error.message)

        resolve(result['rsvp-list'])
      }
    )
  })
}

function getWinnersData (winnerURL) {
  return new Promise((resolve, reject) => {
    beautylog.log(`Getting winner's data`) // eslint-disable-line quotes

    htmlToJson.request(
      winnerURL,
      function ($doc) {
        return {
          'avatar': $doc.find('#member-profile-photo a').attr('href'),
          'name': $doc.find('.docBox h1 .memName').text(),
          'profileURL': winnerURL
        }
      },
      (error, result) => {
        if (error) return reject(error.message)

        resolve(result)
      }
    )
  })
}

function obtainWinnersURL (audience) {
  return new Promise((resolve, reject) => {
    beautylog.log('Choosing a winner')

    const mixer = uniqueRandomArray(audience)
    const winnerURL = mixer()

    resolve(winnerURL)
  })
}

function processWinnersAvatar (winner) {
  return new Promise((resolve, reject) => {
    if (winner.avatar) {
      beautylog.log(`Processing winner's avatar`) // eslint-disable-line quotes

      imageToAscii(
        winner.avatar,
        {
          bg: true,
          size: { height: '75%' }
        },
        (error, converted) => {
          if (error) {
            console.log('')
            beautylog.warn(error.message)
          } else {
            winner.avatar = converted
          }

          resolve(winner)
        }
      )
    } else {
      console.log('')
      beautylog.warn('The winner has no avatar ¬¬')
      resolve(winner)
    }
  })
}

function showLogo (url) {
  return new Promise((resolve, reject) => {
    const logoPath = `${__dirname}/images/BANodeJS.jpeg`

    imageToAscii(
      logoPath,
      {
        bg: true,
        size: { height: '25%' }
      },
      (error, converted) => {
        if (error) return reject(error.message)

        console.log('')
        console.log(converted)
        console.log('')
        resolve(url)
      }
    )
  })
}

function showWinner (winner) {
  return new Promise((resolve, reject) => {
    console.log('')
    beautylog.info('And the winner is...')
    console.log('')

    setTimeout(() => {
      if (winner.avatar) {
        console.log(winner.avatar)
        console.log('')
      }

      beautylog.ok(winner.name.toUpperCase())
      beautylog.ok(winner.profileURL)

      resolve()
    }, 1000)
  })
}

module.exports = function execute (url) {
  return showLogo(url)
    .then(fetchAudiencesData)
    .then(obtainWinnersURL)
    .then(getWinnersData)
    .then(processWinnersAvatar)
    .then(showWinner)
}
