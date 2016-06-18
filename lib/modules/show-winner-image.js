'use strict'

const ansi = require('ansi')
const Jimp = require('jimp')

function imageToConsole (photoPath, cols, callback) {
  Jimp.read(photoPath, (error, image) => {
    if (error) {
      return callback(error)
    }

    const cursor = ansi(process.stdout)
    const resizedImage = image.resize(cols, Jimp.AUTO)
    const height = resizedImage.bitmap.height
    const width = resizedImage.bitmap.width

    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        let hexColor = `${resizedImage.getPixelColor(x, y).toString(16).substr(0, 6)}`

        if (hexColor.length !== 6) {
          hexColor = '000000'
        }

        cursor
          .hex(`#${hexColor}`)
          .write('██')
          .reset()
      }

      cursor.write('\n')
    }

    callback(null, true)
  })
}

module.exports = function showWinnerImage (winner) {
  return new Promise((resolve, reject) => {
    if (winner.photoURL) {
      const cols = 40

      imageToConsole(winner.photoURL, cols, (error, ok) => {
        if (error) {
          return reject(error)
        }

        resolve(winner)
      })
    } else {
      resolve(winner)
    }
  })
}
