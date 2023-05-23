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
    let delay = 1000
    for (let shape of shapes) {
        setTimeout(() => {
            let randomColor = Math.floor(Math.random()*16777215).toString(16);
            console.log(shape.id, randomColor)
            addPath(shape.shape, `#${randomColor}`, 1)
        }, delay)
        delay += 40
    }
    for (let stop of stops) {
        setTimeout(() => {
        L.marker(stop.geo)
            .addTo(map)
            .bindPopup(`<h3>${lang === `en` ? stop.en : stop.local}</h3>`)
            .bindTooltip(`${lang === `en` ? stop.en : stop.local}`)
        map.panTo(new L.LatLng(...stop.geo));
        }, delay)
        delay += 1000/4
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

map.on('keypress', function(e) {
    console.log(e.originalEvent.key)
    if (e.originalEvent.key === "l") {
        map.locate()
    }
})
