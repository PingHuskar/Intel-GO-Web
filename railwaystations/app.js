const searchParams = new URLSearchParams(location.search)

var map = L.map('map').setView([13.697683, 100.491943], 12)
L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map)
var LeafIcon = L.Icon.extend({
    options: {
        // shadowUrl: 'leaf-shadow.png',
        iconSize: [50, 50],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
})
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({
    position: 'bottomleft'
}).addTo(map)
ctlAttribute.addAttribution(`Cyclosm`) //Open Street Map
ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)
ctlScale = L.control.scale({
    position: 'bottomleft',
    metric: false,
    maxWidth: 200
    // https://leafletjs.com/reference.html#control-scale
}).addTo(map)

const RAILWAYSTATIONSDATASETURL = `https://data.go.th/dataset/9bccd66e-8b14-414d-93d5-da044569350c/resource/70e1ac97-edfe-4751-8965-6bbe16fb21b4/download/data_station.json`
// https://data.go.th/th/dataset/station

const DICTLANG = {
    'en':'en_name',
    'ch':'chname',
}
const LANG = DICTLANG[searchParams.get(`lang`)] || DICTLANG[`en`]

const AddDonut = (lat, lng) => {
    L.donut([lat, lng], {
        radius: 500,
        innerRadius: 0,
        innerRadiusAsPercent: false,
    }).addTo(map)
}


const AddStationToMap = (station) => {
    try {
        let lat = parseFloat(station.lat.toString().replace(",",""))
        let lng = parseFloat(station.long.toString().replace(",",""))
        if (
            lat !== 0 
            && lng !== 0 
            && station.name !== `NULL` 
            && station.name !== `NULL`
            && station.active != `0`
        ) {
            L.marker([lat, lng])
            .bindPopup(
                `
                <h2>${station.name} (${station[LANG]})</h2>
                <p>station_code: ${station.station_code}</p>
                <p>Control Division: ${station.controldivision}</p>
                <p>Exact km: ${station.exact_km}</p>
                <p>Exact Distance: ${station.exact_distance}</p>
                <p>Class: ${station.class}</p>
                `)
                .bindTooltip(`${station.name}`).openTooltip()
                .addTo(map)
            // AddDonut(lat,lng)
        }
    } catch (err) {
        console.log(station)
    }
}

fetch(RAILWAYSTATIONSDATASETURL)
.then(res => res.json())
.then(stations => {
    for (let station of stations) {
        AddStationToMap(station)
    }
})
.catch(err => { throw err })