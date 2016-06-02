# meetup-randomizer

Console application that chooses a random person from a Meetup's event

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?maxAge=2592000)](http://standardjs.com/)
[![Travis branch](https://img.shields.io/travis/durancristhian/meetup-randomizer/master.svg?maxAge=2592000)]()
[![node](https://img.shields.io/node/v/meetup-randomizer.svg?maxAge=2592000)](https://www.npmjs.com/package/meetup-randomizer)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?maxAge=2592000)](http://makeapullrequest.com)

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

## License

MIT
