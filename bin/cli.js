#! /usr/bin/env node

'use strict'

const commander = require('commander')
const program = require('../lib/program')
const pkg = require('../package.json')

commander
  .version(pkg.version)
  .usage('--meetup-name [MEETUP_NAME] --event-id [EVENT_ID] --api-key [API_KEY]')
  .option('--meetup-name [MEETUP_NAME]', `Meetup's name`) // eslint-disable-line quotes
  .option('--event-id [EVENT_ID]', `Event's id`) // eslint-disable-line quotes
  .option('--api-key [API_KEY]', 'Your api key')
  .parse(process.argv)

if (!commander.meetupName || !commander.eventId || !commander.apiKey) {
  console.log('')
  console.error('There is a missing parameter')

  commander.help()
}

program(commander.meetupName, commander.eventId, commander.apiKey)
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    console.log('')
    console.error(error)
    console.log('')

    process.exit(1)
  })
