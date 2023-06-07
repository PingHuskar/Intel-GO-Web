"use strict";
const rad2deg = (arg) => {
  return (360 * arg) / (2 * Math.PI);
}
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}
const iconProps = {
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
}

var map, lyrOSM, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure

var OpenStreetMap_Mapnik = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
	maxZoom: 19,
	attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
map = L.map(`mapdiv`,{
    center:[ 13.765981, 100.570261 ],
    zoom: 5,
    zoomControl:false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl:false,
    layers: [OpenStreetMap_Mapnik]
})

ctlZoomslider = L.control.zoomslider({position:"topright"}).addTo(map)
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(map)
ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)
ctlScale = L.control.scale({
    position:'bottomleft',
    metric:false,
    maxWidth:200
}).addTo(map)

const AddDonut = (lat, lng, dr) => {
    // console.log(dr)
    L.circle([lat,lng], {radius: dr}).addTo(map);
    // L.donut([lat, lng], {
    //     radius: dr,
    //     innerRadius: 0,
    //     innerRadiusAsPercent: false,
    // }).addTo(map)
}

// var markers = L.markerClusterGroup()

function getRandomLatitude() {
  // Generate a random latitude between -90 and 90
  return (Math.random() * 180) - 90;
}

function getRandomLongitude() {
  // Generate a random longitude between -180 and 180
  return (Math.random() * 360) - 180;
}

function getRandomCoordinates() {
  // Generate random latitude and longitude coordinates
  const lat = getRandomLatitude();
  const lng = getRandomLongitude();
  return { lat, lng };
}

// Example usage
const coordinates = getRandomCoordinates();
// console.log(coordinates)
let tries = -1
let gameEnd = false
map.on('contextmenu', function(e) {
    if (!gameEnd) {
        tries++
        // console.log(e.latlng)
        L.marker(e.latlng).addTo(map)
        const distToXinMeter = dist(e.latlng.lat,e.latlng.lng,coordinates.lat,coordinates.lng,`m`).replace('m','')
        // alert(distToXinMeter/1000)
        AddDonut(e.latlng.lat,e.latlng.lng,distToXinMeter)
        if (distToXinMeter/1000 < 500) {
            L.marker(coordinates)
            .bindPopup(`
            <h6>You Win with ${tries} tries</h6>
            <p>X is ${coordinates.lat.toFixed(6)},${coordinates.lng.toFixed(6)}</p>
            `)
            .addTo(map)
            map.panTo(coordinates)
            alert(`You Win with ${tries} tries: X is ${coordinates.lat.toFixed(6)},${coordinates.lng.toFixed(6)}`)
        }
    }
})
// map.addLayer(markers)
