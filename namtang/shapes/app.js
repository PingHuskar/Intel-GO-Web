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
const id = searchParam.get(`id`) ?? ``
const lang = searchParam.get(`lang`) ?? `en`
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}

var map, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure
map = L.map(`mapdiv`, {
    center: [13.744256, 100.5334],
    zoom: 11,
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

const addPath = (route, color, opacity) => {

    L.polyline(route, {
        color: color,
        opacity: opacity
    }).addTo(map)
}

// console.log(shapes)
// console.log(shapes.length)
if (id === ``) {
    for (let shape of shapes) {
        let randomColor = Math.floor(Math.random()*16777215).toString(16);
        console.log(shape.id, randomColor)
        addPath(shape.shape, `#${randomColor}`, 1);
    }
} else {
    let shape = shapes.find(s => s.id === id)
    // console.log(shape)
    addPath(shape.shape, `red`, 1);
}

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
// pathGroup.addLayer(BRTpath, MRTPURPLELINEpath)
// map.fitBounds(pathGroup.getBounds())
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
                <img src="../src/images/intel.webp">
            </a>
            <a href='https://bannergress.com/map?lat=${lat}&lng=${lng}&zoom=${z}' target='_blank'>
                <img src="../src/images/bannergress.png">
            </a>
            <a href='https://www.google.com/maps?daddr=${lat},${lng}' target='_blank'>
                <img src="../src/images/googlemaps.png">
            </a>
            <a href='https://www.windy.com/-NO2-no2?cams,no2,${lat},${lng},${windy_zoom}' target='_blank'>
                <img src="../src/images/NO2.jpg">
            </a>
            <a href='https://www.windy.com/-PM2-5-pm2p5?cams,pm2p5,${wlat},${wlng},${windy_zoom},${createCoordCode({lat:lat,lon:lng})}' target='_blank'>
                <img src="../src/images/pm.jpg">
            </a>
            `
    ).addTo(map)
    // https://pinghuskar.github.io/Mark-Center-by-Province/js/configData.js
})
map.on('keypress', function(e) {
    console.log(e.originalEvent.key)
    if (e.originalEvent.key === "l") {
        map.locate()
    }
})
