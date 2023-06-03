"use strict";
// https://stackoverflow.com/a/46410816/13237580
moment.suppressDeprecationWarnings = true;


const searchParam = new URLSearchParams(location.search)
const lang = searchParam.get(`lang`) ?? `en`
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}

var map, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure
map = L.map(`mapdiv`, {
    center: [13.744256, 100.5334],
    zoom: 6,
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

const createDonut = (station) => {
    if (station.radius) {
        L.donut(station.latlng, {
            radius: station.radius,
            innerRadius: 0,
            innerRadiusAsPercent: false,
        }).addTo(map)
    } else {
        console.log(station.name)
    }
}
const placeText = (places) => {
    let tempText = ``
    try {
        for (let place of places) {
            tempText += `<li>${place}</li>`
        }
        return tempText
    } catch {
        return `ยังไม่ได้ใส่ข้อมูล`
    }    
}
const printStationAge = (type, name, since) => {
    console.log(`${type} ${name}\n${moment.preciseDiff(moment(since), moment())}`)
}
var path = []
let delay = 1000

const input_coor = `
12.927824,100.890048
12.925851,100.871797

12.919065,100.884378
12.914261,100.870679
12.904561,100.86958`.split(`\n`)
for (let coor of input_coor) {
    if (coor !== "") {
        setTimeout(() => {
            L.marker(new L.LatLng(parseFloat(coor.split(`,`).at(0)),parseFloat(coor.split(`,`).at(1))))
                .bindPopup(`<h2>${coor}</h2>
                `).bindTooltip(`${coor}`)
                .openTooltip()
                .addTo(map)
            L.marker({
                lat: parseFloat(coor.split(`,`).at(0)),
                lng: parseFloat(coor.split(`,`).at(1))
            }, {
                icon: L.divIcon({
                    className: 'parallax-marker label big',
                    html: ``,
                    iconSize: [200, 36],
                    iconAnchor: [100, 18]
                })
            }).addTo(map)
            path.push([parseFloat(coor.split(`,`).at(0)),parseFloat(coor.split(`,`).at(1))])
            // map.panTo(new L.LatLng(parseFloat(coor.split(`,`).at(0)),parseFloat(coor.split(`,`).at(1))), zoom)
            map.setView(new L.LatLng(parseFloat(coor.split(`,`).at(0)),parseFloat(coor.split(`,`).at(1))), 15)
        }, delay);
        delay += 20
    }
}
setTimeout(() => {
    L.polyline(path, {
        color: "red",
        opacity: 1,
    }).addTo(map);
    // map.panTo([13.744256, 100.5334])
}, delay)
var pathGroup = L.featureGroup()


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
