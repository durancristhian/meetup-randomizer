# meetup-randomizer

[![npm version](https://img.shields.io/npm/v/meetup-randomizer.svg)](https://www.npmjs.com/package/meetup-randomizer)
[![Travis branch](https://img.shields.io/travis/durancristhian/meetup-randomizer/master.svg?maxAge=2592000)](https://travis-ci.org/durancristhian/meetup-randomizer)
[![node](https://img.shields.io/node/v/meetup-randomizer.svg?maxAge=2592000)](https://www.npmjs.com/package/meetup-randomizer)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?maxAge=2592000)](http://makeapullrequest.com)
[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?maxAge=2592000)](http://standardjs.com/)
[![Commitizen friendly](https://img.shields.io/badge/commitizen-friendly-brightgreen.svg)](http://commitizen.github.io/cz-cli/)
[![semantic-release](https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg)](https://github.com/semantic-release/semantic-release)
[![license](https://img.shields.io/github/license/durancristhian/meetup-randomizer.svg)](https://github.com/durancristhian/meetup-randomizer/blob/master/LICENSE)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg)](#contributors)

Console application that chooses a random person from a Meetup's event

## Demo

![meetup-randomizer](https://raw.githubusercontent.com/durancristhian/meetup-randomizer/master/images/meetup-randomizer-demo.gif)

## Instalation

```bash
npm i -g meetup-randomizer
```

## Use

```bash
meetup-randomizer --meetup-name MEETUP_NAME --event-id EVENT_ID
```

## How it works

1. Uses the Meetup API to get the list of RSVPs
2. Excludes the non-confirmed attendees
3. Chooses a random one
4. Shows its profile in the console

## Contributing

No restriction at all. Feel free to contribute with whatever you want

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/4248944?v=3" width="100px;"/><br /><sub>Cristhian Duran</sub>](https://github.com/durancristhian)<br />[💻](https://github.com/durancristhian/meetup-randomizer/commits?author=durancristhian) [📖](https://github.com/durancristhian/meetup-randomizer/commits?author=durancristhian) | [<img src="https://avatars.githubusercontent.com/u/2440935?v=3" width="100px;"/><br /><sub>Alejandro Oviedo</sub>](https://twitter.com/a0viedo)<br />[💻](https://github.com/durancristhian/meetup-randomizer/commits?author=a0viedo) [📖](https://github.com/durancristhian/meetup-randomizer/commits?author=a0viedo) |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!

## License

MIT
