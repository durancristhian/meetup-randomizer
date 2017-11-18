# meetup-randomizer

[![npm version](https://img.shields.io/npm/v/meetup-randomizer.svg)](https://www.npmjs.com/package/meetup-randomizer)
[![Travis branch](https://img.shields.io/travis/durancristhian/meetup-randomizer/master.svg?maxAge=2592000)](https://travis-ci.org/durancristhian/meetup-randomizer)
[![Dependency Status](https://dependencyci.com/github/durancristhian/meetup-randomizer/badge)](https://dependencyci.com/github/durancristhian/meetup-randomizer)
[![node](https://img.shields.io/node/v/meetup-randomizer.svg?maxAge=2592000)](https://www.npmjs.com/package/meetup-randomizer)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?maxAge=2592000)](http://standardjs.com/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![Greenkeeper badge](https://badges.greenkeeper.io/durancristhian/meetup-randomizer.svg)](https://greenkeeper.io/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?maxAge=2592000)](http://makeapullrequest.com)
[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors)
[![license](https://img.shields.io/github/license/durancristhian/meetup-randomizer.svg)](https://github.com/durancristhian/meetup-randomizer/blob/master/LICENSE)

:twisted_rightwards_arrows: Library that chooses random persons from a Meetup's event. It can be executed as a CLI or as any other npm module (including client-side implementations).

## Demo

![meetup-randomizer](https://raw.githubusercontent.com/durancristhian/meetup-randomizer/master/images/meetup-randomizer-demo.gif)

## Instalation

```bash
npm i meetup-randomizer
```

## Use

* As a **CLI**:

```bash
# 1
meetup-randomizer --meetup-name 'banodejs' --event-id '231888421' --winners-amount 2
# 2
meetup-randomizer --url 'www.meetup.com/banodejs/events/231097952/' --winners-amount 2
```

* As any other **npm module** (including *client-side* implementations):

```javascript
const meetupRandomizer = require('meetup-randomizer')

meetupRandomizer('banodejs', '231888421', 2)
  .then(winners => console.log)
  .catch(error => console.error)
```

## How it works

1. It uses the [Meetup API](http://www.meetup.com/meetup_api/) to get the list of RSVPs.
1. It excludes the hosts members.
1. It excludes the non-confirmed attendees.
1. It returns an array of random winners.

In the case of the **CLI**, it shows the winner's picture into the console.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/4248944?v=3" width="100px;"/><br /><sub><b>Cristhian Duran</b></sub>](https://github.com/durancristhian)<br />[💻](https://github.com/durancristhian/meetup-randomizer/commits?author=durancristhian "Code") [📖](https://github.com/durancristhian/meetup-randomizer/commits?author=durancristhian "Documentation") | [<img src="https://avatars.githubusercontent.com/u/2440935?v=3" width="100px;"/><br /><sub><b>Alejandro Oviedo</b></sub>](https://github.com/a0viedo)<br />[💻](https://github.com/durancristhian/meetup-randomizer/commits?author=a0viedo "Code") [📖](https://github.com/durancristhian/meetup-randomizer/commits?author=a0viedo "Documentation") | [<img src="https://avatars.githubusercontent.com/u/1288694?v=3" width="100px;"/><br /><sub><b>Justin Hall</b></sub>](https://github.com/wKovacs64)<br />[💻](https://github.com/durancristhian/meetup-randomizer/commits?author=wKovacs64 "Code") |
| :---: | :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.

## License

MIT
