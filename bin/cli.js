#! /usr/bin/env node

const commander = require('commander')
const program = require('../lib/program')
const showWinnerImage = require('../lib/modules/show-winner-image')
const API_URL = process.env.API_URL
const PROFILE_URL = process.env.PROFILE_URL

commander
  .usage('--meetup-name [MEETUP_NAME] --event-id [EVENT_ID]')
  .option('-m, --meetup-name <MEETUP_NAME>', `meetup's name. For example: banodejs`) // eslint-disable-line quotes
  .option('-e, --event-id <EVENT_ID>', `event's id. For example: 231888421`) // eslint-disable-line quotes
  .parse(process.argv)

if (!commander.meetupName || !commander.eventId) {
  commander.help()
}

program(API_URL, PROFILE_URL, commander.meetupName, commander.eventId)
  .then(winner => {
    showWinnerImage(winner)
      .catch(error => {
        console.log(`There was an error when we tried to show the winner's image`) // eslint-disable-line quotes
        console.log(`Error description: ${error.message}`) // eslint-disable-line quotes
      })
      .then(winner => console.log(JSON.stringify(winner, null, 2)))
  })
  .catch(error => {
    console.error(error)

    process.exit(1)
  })
