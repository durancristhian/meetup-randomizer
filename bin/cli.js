#! /usr/bin/env node

'use strict'

const commander = require('commander')
const program = require('../lib/program')
const pkg = require('../package.json')

commander
  .version(pkg.version)
  .usage('--meetup-name [MEETUP_NAME] --event-id [EVENT_ID]')
  .option('-m, --meetup-name <MEETUP_NAME>', `meetup's name. For example: banodejs`) // eslint-disable-line quotes
  .option('-e, --event-id <EVENT_ID>', `event's id. For example: 231888421`) // eslint-disable-line quotes
  .parse(process.argv)

if (!commander.meetupName || !commander.eventId) commander.help()

program(commander.meetupName, commander.eventId)
  .then(() => {
    process.exit(0)
  })
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
