# Bussi 🚌

*Bussi* is a node wrapper for parts of the API of a public transport service.

## What it can do

- Querying bus stops, train stations, etc. 📍
- Querying station monitors with respective lines and departure times 🖥

## What it cannot do (yet)

- Querying journeys from A to B 🚀
- Querying stations by coordinates 🗺
- Being documented very well

## Installation

You can clone this repository and use *Bussi* locally but for most use cases it's probably best to install it via *npm*:

``` shell
npm install @dnlggr/bussi 
```

## Usage

As mentioned, detailed documentation is still todo. For now, see the examples below.

### API Credentials

Before using *Bussi*, you must set the API credentials of the API that you want to use. You can do so by calling `use(credentials)`. The `credentials` object you set must include the following properties:

- `API_URL` (`String`)
- `CLIENT` (`Object`)
- `USER` (`String`)
- `PASSWORD` (`String`)

You also have to create a `credentials.js` file in the `test` directory that exports an object with the above properties in order to run the tests.

#### Examples

``` javascript
const bussi = require('@dnlggr/bussi')

bussi.use({
    API_URL: 'api.example.com',
    CLIENT: {'id':'EXAMPLE','os':'exOS'},
    USER: 'heinerbernadino',
    PASSWORD: 'superSecretOMG',
})
```

### Location

A location object represents a bus stop, train station, etc.

#### Examples

A location object might look like this:

``` javascript
{
    "name": "Innsbruck Westbahnhof",
    "id": "A=1@O=Innsbruck Westbahnhof@X=11391895@Y=47255843@U=81@L=470118900@B=1@p=1486421941@",
    "coords": {
        "lng": 11.391895,
        "lat": 47.255843
    }
}
```

Querying locations:

``` javascript
const bussi = require('@dnlggr/bussi')

bussi.location.get('Westbahnhof, Innsbruck', (error, locations) => {
    // enjoy a fresh array of locations
})
```

### Monitor

A monitor object contains all current departures for a specific location.

#### Examples

A monitor object might look like this:

``` javascript
{
    "location": {
        "name": "Innsbruck Westbahnhof",
        "id": "A=1@O=Innsbruck Westbahnhof@X=11391895@Y=47255843@U=81@L=470118900@B=1@p=1486421941@",
        "coords": {
            "lng": 11.391895,
            "lat": 47.255843
        }
    },
    "departures": [
        {
            "line": {
                "name": "T",
                "type": "Stadtbus",
                "direction": "Völs EKZ Cyta Süd"
            },
            "date": "2017-02-07T16:48:00.000Z"
        },
        (...)
    ]
}
```

Querying a monitor:

``` javascript
const bussi = require('@dnlggr/bussi')

// assuming `wbhf` is a valid location object
bussi.monitor.get(wbhf, (error, monitor) => {
    // enjoy your fresh monitor
})
```

## Contributions

Suggestions and improvements via issues and pull requests are always welcome. 🤓

You can also find me on Twitter as [@dnlggr](https://twitter.com/dnlggr) or write an email to <hi@dnlggr.com>.
