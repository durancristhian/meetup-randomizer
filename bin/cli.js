#! /usr/bin/env node

'use strict'

const beautylog = require('beautylog')
const commander = require('commander')
const execute = require('../program')
const pkg = require('../package.json')

commander
  .version(pkg.version)
  .usage('--url URL')
  .option('-u, --url [URL]', `specifies the URL of the meetup's event`) // eslint-disable-line quotes
  .parse(process.argv)

if (!commander.url) {
  console.log('')
  beautylog.error('No URL has been given')

  commander.help()
}

execute(commander.url)
  .then(() => {
    console.log('')
    beautylog.ok('Congratulations!')
    beautylog.ok(';)')
    console.log('')

    process.exit(0)
  })
  .catch(error => {
    console.log('')
    beautylog.error(error)
    console.log('')

    process.exit(1)
  })
