# Bussi 🚌

*Bussi* is a [node](https://nodejs.org) wrapper for a specific public transport API in Austria.

## What it can do
- Querying bus stations 📌
- Station monitors with departure times 🖥

## Todo
- Querying journeys from A to B 🚀
- Documentation
- ...

## Doc

Detailed documentation is still todo. For now, see the examples below.

### API Credentials

Before using bussi, you must set the API credentials of the API that you want to use. You can do so by calling `use(credentials)`. the `credentials` object you set must include the following properties that must be of the stated types:

- `API_URL` (String)
- `CLIENT` (Object)
- `USER` (String)
- `PASSWORD` (String)

You also have to create a `credentials.js` file in the `test` directory that exports an object with the above properties in order to run the tests.

#### Example

``` javascript
const bussi = require('bussi')

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

**A location object might look like this:**
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

**Querying locations:**

``` javascript
const bussi = require('bussi')

bussi.location.get('Westbahnhof, Innsbruck', (error, locations) => {
    // enjoy an array of fresh locations
})
```

### Monitor

A monitor object contains all current departures for a specific location.

#### Examples

**A monitor object might look like this:**
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

**Querying a monitor:**

``` javascript
const bussi = require('bussi')

// assuming `wbhf` is a valid location object
bussi.monitor.get(wbhf, (error, monitor) => {
    // enjoy your fresh monitor
})
```

## Contributions

Suggestions and improvements are always welcome. 🤓
