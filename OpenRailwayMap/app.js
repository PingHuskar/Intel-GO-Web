"use strict";

const searchParam = new URLSearchParams(location.search)

const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}

var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Map style: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
});

const map = L.map(`mapdiv`, {
    // center:[13.6592, 100.3991],
    center: [13.769028, 100.540186],
    zoom: 10,
    zoomControl: false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl: false
})
L.control.polylineMeasure().addTo(map)
var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
map.addLayer(OpenStreetMap_Mapnik)
map.addLayer(OpenRailwayMap)

const createCoordCode = (coords) => {
    let ar = [];
    for (let i = 98; i < 123; i++) ar.push(String.fromCharCode(i));
    for (let i = 65; i < 91; i++) ar.push(String.fromCharCode(i));
    for (let i = 0; i < 9; i++) ar.push(i);

    let lat = Math.round(100 * (coords.lat + 90));
    let lon = Math.round(100 * (coords.lon + 180));

    return "m:" +
        ar[Math.floor(lat / 3600)] +
        ar[Math.floor((lat % 3600) / 60)] +
        ar[lat % 60] + "a" +
        ar[Math.floor(lon / 3600)] +
        ar[Math.floor((lon % 3600) / 60)] +
        ar[lon % 60];
}

map.on('contextmenu', function(e) {
    var dtCurrentTime = new Date()
    const lat = e.latlng.lat.toFixed(6)
    const lng = e.latlng.lng.toFixed(6)
    const wlat = e.latlng.lat.toFixed(3)
    const wlng = e.latlng.lng.toFixed(3)
    const z = 17
    const windy_zoom = 8
    L.marker(e.latlng).bindPopup(
        `
            ${e.latlng.toString()}
            <br>${dtCurrentTime.toString()}
            <br><h6>Open in <a href="https://pinghuskar.github.io/X-Marks-Leaflet/?lat=${lat}&lng=${lng}" target="_blank">X Marks Leaflet</a></h6>
            <br>
            <a href='https://intel.ingress.com/intel?ll=${lat},${lng}&z=${z}' target='_blank'>
                <img src="src/images/intel.webp">
            </a>
            <a href='https://bannergress.com/map?lat=${lat}&lng=${lng}&zoom=${z}' target='_blank'>
                <img src="src/images/bannergress.png">
            </a>
            <a href='https://www.google.com/maps?daddr=${lat},${lng}' target='_blank'>
                <img src="src/images/googlemaps.png">
            </a>
            <a href='https://www.windy.com/-NO2-no2?cams,no2,${lat},${lng},${windy_zoom}' target='_blank'>
                <img src="src/images/NO2.jpg">
            </a>
            <a href='https://www.windy.com/-PM2-5-pm2p5?cams,pm2p5,${wlat},${wlng},${windy_zoom},${createCoordCode({lat:lat,lon:lng})}' target='_blank'>
                <img src="src/images/pm.jpg">
            </a>
            `
    ).addTo(map)
    // https://pinghuskar.github.io/Mark-Center-by-Province/js/configData.js
})
map.on('keypress', function(e) {
    if (e.originalEvent.key === "l") {
        map.locate()
    }
})