# meetup-randomizer

Console application that chooses a person from a Meetup's event

## Demo

![meetup-randomizer](https://raw.githubusercontent.com/durancristhian/meetup-randomizer/master/images/demo.gif)

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
