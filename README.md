# od-flight-stats
API Flight that support search flight through flight stats
## Quick Start
The following example shows how to use od-flight-stats to check 
```
// Initial api with myAppId and myAppKey
const api = new FlightStats(myAppId, myAppKey);

const options = {
    airlineCode: 'AA',
    flightNumber: '110',
    date: new Date(),
    isArr: true, // Optional, default false
    isLocalTime: true // Optional, default false(UTC)
};
const result = await api.lookUp(options);
```

## Response
```
{
    request:
    {
        airline: { requestedCode: 'AA', fsCode: 'AA' },
        flight: { requested: '110', interpreted: '110' },
        date:
        { year: '2019', month: '6', day: '25', interpreted: '2019-06-25' },
        utc: { requested: 'true', interpreted: true },
        airport: { },
        codeType: { },
        extendedOptions: { },
        url:
        'https://api.flightstats.com/flex/flightstatus/rest/v2/json/flight/status/AA/110/dep/2019/06/25/'
    },
    appendix:
    {
        airlines: [[Object], [Object], [Object], [Object], [Object]],
        airports: [[Object], [Object]],
        equipments: [[Object]]
    },
    flightStatuses:
    [{
        flightId: 1004580175,
        carrierFsCode: 'AA',
        flightNumber: '110',
        departureAirportFsCode: 'ORD',
        arrivalAirportFsCode: 'FCO',
        departureDate: [Object],
        arrivalDate: [Object],
        status: 'S',
        schedule: [Object],
        operationalTimes: [Object],
        codeshares: [Array],
        delays: [Object],
        flightDurations: [Object],
        airportResources: [Object],
        flightEquipment: [Object]
    }]
}

```