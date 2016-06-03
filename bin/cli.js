#! /usr/bin/env node

'use strict'

const commander = require('commander')
const program = require('../lib/program')
const pkg = require('../package.json')

commander
  .version(pkg.version)
  .usage('--meetup-name [MEETUP_NAME] --event-id [EVENT_ID]')
  .option('--meetup-name <MEETUP_NAME>', `Meetup's name`) // eslint-disable-line quotes
  .option('--event-id <EVENT_ID>', `Event's id`) // eslint-disable-line quotes
  .parse(process.argv)

if (!commander.meetupName || !commander.eventId) commander.help()

program(commander.meetupName, commander.eventId)
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(error)
  })
