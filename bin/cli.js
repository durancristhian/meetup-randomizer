#! /usr/bin/env node

const commander = require('commander')
const meetupRandomizer = require('../lib/meetup-randomizer')
const showWinnerImage = require('../lib/modules/show-winner-image')
const url = require('url')

commander
  .usage('--url [EVENT_URL] --meetup-name [MEETUP_NAME] --event-id [EVENT_ID]')
  .option('-m, --meetup-name <MEETUP_NAME>', `meetup's name. For example: banodejs`)
  .option('-e, --event-id <EVENT_ID>', `event's id. For example: 231888421`)
  .option('-u, --url <EVENT_URL>', `event's url. For example: www.meetup.com/es-ES/banodejs/events/231097952/`)
  .option('-w, --winners-amount <AMOUNT>', `[OPTIONAL] number of times the command run in order to get multiple winners. For example: 5`)
  .parse(process.argv)

if (!commander.url && (!commander.meetupName || !commander.eventId)) {
  commander.help()
}

if (commander.url) {
  const path = url.parse(commander.url).path
  const pathSlices = path.split('/')

  commander.eventId = pathSlices[pathSlices.length - 2]
  commander.meetupName = pathSlices[pathSlices.length - 4]
}

if (!commander.winnersAmount) {
  commander.winnersAmount = 1
}

commander.winnersAmount = parseInt(commander.winnersAmount)

if (process.env.API_URL) {
  meetupRandomizer.setCustomApiUrl(process.env.API_URL)
}

if (process.env.PROFILE_URL) {
  meetupRandomizer.setCustomProfileUrl(process.env.PROFILE_URL)
}

console.log(`Eligiendo ${commander.winnersAmount === 1 ? 'ganador' : 'ganadores'}...`)

meetupRandomizer.run(commander.meetupName, commander.eventId, commander.winnersAmount)
  .then(winners => {
    winners.forEach(winner => {
      showWinnerImage(winner)
        .catch(error => {
          console.log(`There was an error when we tried to show the winner's image`)
          console.log(error.message)
        })
        .then(() => console.log(JSON.stringify(winner, null, 2)))
    })
  })
  .catch(error => {
    console.error(error)

    process.exit(1)
  })
