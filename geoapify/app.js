"use strict";

const searchParam = new URLSearchParams(location.search)
const mode = searchParam.get(`mode`) ?? `drive`
const APIkey = searchParam.get(`key`) ?? geoapify.key
const geo = searchParam.get(`geo`) ?? `13.768323,100.539837|13.768323,101.539837`
const nShowWaypoint = Number(searchParam.get(`point`) ?? `10`) - 1
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

let delay = 1000

let c = 0
let path = []
const url = `https://api.geoapify.com/v1/routing?waypoints=${geo}&mode=${mode}&apiKey=${APIkey}`
// console.log(url)
axios.get(url)
.then(res => res.data)
.then(data => {
    // console.log(data)
    return data.features.at(0).geometry.coordinates.at(0)
})
.then(waypoints => {
    console.log(waypoints)
    let nWaypoint = waypoints.length
    
    let nShowWaypointEvery = Math.floor(nWaypoint / nShowWaypoint)
    for (let waypoint of waypoints) {
        // console.log(waypoint)
        // let {a,b,...c} = )
        if (c % nShowWaypointEvery === 0) {
            L.marker(new L.LatLng(waypoint.at(1),waypoint.at(0),{}))
            // .bindPopup(`<h2>${waypoint.at(-1)},${waypoint.at(0)}</h2>`)
            // .bindTooltip(`${waypoint.lat},${waypoint.lon}`)
            // .openTooltip()
            .addTo(map)
        }
        path.push([waypoint.at(-1),waypoint.at(0)])
        // console.log(`...`)
        // console.log(path)
        c++
    }
    
    // console.log(path)
        L.polyline(path, {
            color: "red",
            opacity: 1,
        }).addTo(map)
})


map.on('keypress', function(e) {
    console.log(e.originalEvent.key)
    if (e.originalEvent.key === "l") {
        map.locate()
    }
})
