"use strict";
moment.suppressDeprecationWarnings = true;
const DICT = {
    "BAHT" : {
        "th" : `บาท`,
        "en" : `Baht`,
    },
    "STOPS" : {
        "th" : `สถานี`,
        "en" : `STOPS`,
    },
}
const searchParam = new URLSearchParams(location.search)
const lang = searchParam.get(`lang`) ?? `en`
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}

var map, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure
map = L.map(`mapdiv`, {
    center: [13.744256, 100.5334],
    zoom: 13,
    zoomControl: false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl: false
})
map.addLayer(L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`))
// map.addLayer(L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// }))
// https://github.com/kartena/Leaflet.Pancontrol
// ctlPan = L.control.pan().addTo(map)
// https://github.com/kartena/Leaflet.zoomslider
ctlZoomslider = L.control.zoomslider({
    position: "topright"
}).addTo(map)
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({
    position: 'bottomleft'
}).addTo(map)
ctlAttribute.addAttribution(`OSM`) //Open Street Map
ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)
ctlScale = L.control.scale({
    position: 'bottomleft',
    metric: false,
    maxWidth: 200
    // https://leafletjs.com/reference.html#control-scale
}).addTo(map)

const route1 = [
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.748800,100.544171],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.748176,100.552614],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.748297,100.560232],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.744796,100.578557],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.740776,100.598436],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.747534,100.600040],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.757275,100.611358],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.761312,100.615021],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.764197,100.639276],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.764986,100.647937],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.766826,100.651066],},
    {name: `เส้น 1.ท่าประตูน้ำ - ท่าวัดศรีบุญเรือง`, geo: [13.767833,100.652285],},
]
const route2 = [
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.754735,100.509377],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.754606,100.509891],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.754323,100.511605],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.754043,100.512804],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.752962,100.517678],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.752268,100.520443],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.749534,100.524753],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.749309,100.533753],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.749433,100.541025],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.748907,100.543964],},
    {name: `เส้น 2. ท่าประตูน้ำ - ท่าผ่านฟ้าลีลา`, geo: [13.748738,100.543963],},
]
const route3 = [
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.767893,100.652284],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.770207,100.655085],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.773969,100.662271],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.783954,100.680401],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.795936,100.701888],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.802692,100.714269],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.803689,100.716185],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.805533,100.719381],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.807683,100.723216],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.809987,100.727370],},
    {name: `เส้น3.ท่าวัดศรีบุญเรือง-ท่าเทียบเรือมีนบุรี`, geo: [13.811213,100.729846],},
]

const data = [
    route1,
    route2,
    route3,
]

const addPath = (route, color, opacity) => {
    let path = []
    for (let stop of route) {
        path.push(stop.geo)
        L.marker(stop.geo)
        .addTo(map)
        .bindPopup(`<h3>${stop.name}</h3>`)
        .bindTooltip(`${stop.name}`)
        // .openTooltip()
    }
    L.polyline(path, {
        color: color,
        opacity: opacity
    }).addTo(map)
}

addPath(route1, "red", 1);
addPath(route2, "green", 1);
addPath(route3, "blue", 1);

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
// map.fitBounds(pathGroup.getBounds())

map.on('keypress', function(e) {
    console.log(e.originalEvent.key)
    if (e.originalEvent.key === "l") {
        map.locate()
    }
})

axios.get(`./pier.json`)
.then(res => res.data.records)
.then(data => {
    let path = []
    for (let item of data) {
        let name = item.at(1)
        let addr = item.at(2)
        let geo = [parseFloat(item.at(3)),parseFloat(item.at(4))]
        path.push(geo)
        L.marker(geo)
        .addTo(map)
        .bindPopup(`<h2>${name}</h2>
        <p>${addr}</p>
        `)
        .bindTooltip(`${name}`)
    }
    L.polyline(path, {
        color: `#6796E5`,
        // opacity: opacity
    }).addTo(map)
})