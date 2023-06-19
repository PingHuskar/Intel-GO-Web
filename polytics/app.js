"use strict";

const searchParam = new URLSearchParams(location.search)
const CITY = searchParam.get(`city`) || `Bangkok`
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}

var map, lyrOSM, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure

map = L.map(`mapdiv`, {
    // center:[13.6592, 100.3991],
    center: [13.769028, 100.540186],
    zoom: 7,
    zoomControl: false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl: false
})
lyrOSM = L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`)
map.addLayer(lyrOSM)

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
const regionVerticesToPloygon = (d) => {
	return [d[0], d[1]]
}
const getCenter = (regionVertices) => {
	const cenLat = (regionVertices.map(a => a.at(0)).reduce((a, b) => a + b, 0)/regionVertices.length)
	const cenLng = (regionVertices.map(a => a.at(1)).reduce((a, b) => a + b, 0)/regionVertices.length)
	return [cenLat, cenLng]
}
let maxlat = 0
let maxlng = 0
let minlat = 0
let minlng = 0
let ZOOM = 8
for (let province of data.features) {
    // console.log(province.properties.name)
    if (province.properties.name === CITY) {
        let newArr = []
        for (let mark of province.geometry.coordinates.at(0)) {
            newArr.push([mark.at(1),mark.at(0)])
            if (mark.at(1) > maxlat || maxlat === 0) maxlat = mark.at(1)
            if (mark.at(1) < minlat || minlat === 0) minlat = mark.at(1)
            if (mark.at(0) > maxlng || maxlng === 0) maxlng = mark.at(0)
            if (mark.at(0) < minlng || minlng === 0) minlng = mark.at(0)
        }
        // console.log(province.geometry.coordinates)
        L.polyline(newArr, {color: 'red'}).addTo(map)
        console.log(`${maxlat},${maxlng}`)
        console.log(`${minlat},${minlng}`)
        L.polygon([
            [minlat,minlng],
            [maxlat,minlng],
            [maxlat,maxlng],
            [minlat,maxlng],
        ], {color: `blue`})
        .addTo(map)
        map.setView(getCenter(newArr), ZOOM)
        break
    }
}