"use strict";
// https://stackoverflow.com/a/46410816/13237580
moment.suppressDeprecationWarnings = true;

// console.log(prov_arr)
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

for (let item of data) {
    let record = PROVINCE.find((p) => p.name == item.prov)
    L.marker([parseFloat(record.geo.at(0))+0.02,parseFloat(record.geo.at(1))])
        .bindPopup(`
        <!-- <h2>${item.foodname}</h2> -->
        <img src="" alt="${item.foodname}">
        `).bindTooltip(`${item.foodname}`)
        .openTooltip()
        .addTo(map)
    L.marker({
        lat: parseFloat(record.geo.at(0)),
        lng: parseFloat(record.geo.at(1))
    }, {
        icon: L.divIcon({
            className: 'parallax-marker label big',
            html: `${item.foodname}`,
            iconSize: [200, 36],
            iconAnchor: [100, 18]
        })
    }).addTo(map)
    L.marker({
        lat: parseFloat(record.geo.at(0))+0.01,
        lng: parseFloat(record.geo.at(1))
    }, {
        icon: L.divIcon({
            className: 'parallax-marker label medium',
            html: `${item.prov}`,
            iconSize: [200, 36],
            iconAnchor: [100, 18]
        })
    }).addTo(map)
}
