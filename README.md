# meetup-randomizer

[![npm version](https://img.shields.io/npm/v/meetup-randomizer.svg)](https://www.npmjs.com/package/meetup-randomizer)
[![Travis branch](https://img.shields.io/travis/durancristhian/meetup-randomizer/master.svg?maxAge=2592000)](https://travis-ci.org/durancristhian/meetup-randomizer)
[![Dependency Status](https://dependencyci.com/github/durancristhian/meetup-randomizer/badge)](https://dependencyci.com/github/durancristhian/meetup-randomizer)
[![node](https://img.shields.io/node/v/meetup-randomizer.svg?maxAge=2592000)](https://www.npmjs.com/package/meetup-randomizer)

[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?maxAge=2592000)](http://standardjs.com/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?maxAge=2592000)](http://makeapullrequest.com)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors)
[![license](https://img.shields.io/github/license/durancristhian/meetup-randomizer.svg)](https://github.com/durancristhian/meetup-randomizer/blob/master/LICENSE)

Library that chooses a random person from a Meetup's event. It can be executed as a CLI or as any other npm module (including client-side implementations).

## Demo

![meetup-randomizer](https://raw.githubusercontent.com/durancristhian/meetup-randomizer/master/images/meetup-randomizer-demo.gif)

## Instalation

```bash
npm i meetup-randomizer
```

## Use

* As a **CLI**:

```bash
meetup-randomizer --meetup-name 'banodejs' --event-id '231888421'
```

* As any other **npm module** (including *client-side* implementations):

```javascript
const program = require('meetup-randomizer')

program('banodejs', '231888421')
  .then(winner => { console.log(winner) })
  .catch(error => { console.error(error) })
```

## How it works

1. It uses the [Meetup API](http://www.meetup.com/meetup_api/) to get the list of RSVPs.
2. It excludes the hosts members.
3. It excludes the non-confirmed attendees.
4. It returns a random one.

In the case of the **CLI**, it shows the winner's picture into the console.

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/4248944?v=3" width="100px;"/><br /><sub>Cristhian Duran</sub>](https://github.com/durancristhian)<br />[💻](https://github.com/durancristhian/meetup-randomizer/commits?author=durancristhian) [📖](https://github.com/durancristhian/meetup-randomizer/commits?author=durancristhian) | [<img src="https://avatars.githubusercontent.com/u/2440935?v=3" width="100px;"/><br /><sub>Alejandro Oviedo</sub>](https://twitter.com/a0viedo)<br />[💻](https://github.com/durancristhian/meetup-randomizer/commits?author=a0viedo) [📖](https://github.com/durancristhian/meetup-randomizer/commits?author=a0viedo) |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.

## License

MIT
