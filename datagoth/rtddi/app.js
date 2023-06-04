"use strict";
// https://stackoverflow.com/a/46410816/13237580
moment.suppressDeprecationWarnings = true;

// console.log(prov_arr)
const searchParam = new URLSearchParams(location.search)
const lang = searchParam.get(`lang`) ?? `en`
const pan = searchParam.get(`pan`) ?? ``
const year = searchParam.get(`year`) ?? `2565`
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
const limit = 9999
let climit = 0
for (let ac of data.filter(a => a.DY.toString() === year)) {
    climit++
    if (climit > limit) {
        break
    }
        setTimeout(() => {
            // let record = PROVINCE.find(p => p.name === ac)
            let cause = ICD10.find(e => e.ID === ac.Ncause).INFO
            L.marker(new L.LatLng(parseFloat(ac.geo.at(0))+0.001,parseFloat(ac.geo.at(1))))
                .bindPopup(`<h2>(${ac.Age})</h2>
                <p>${cause}</p>
                <p>
                    <a href="https://www.google.co.th/maps/@${parseFloat(ac.geo.at(0))},${parseFloat(ac.geo.at(1))},16.79z/data=!5m1!1e4?hl=th&entry=ttu" target="_blank">
                        Google Map
                    </a>
                </p>
                <p>
                    <a href="https://warm-sawine-6a72ec.netlify.app/?lat${parseFloat(ac.geo.at(0))}&lng=${parseFloat(ac.geo.at(1))}&dt=ปี${ac.DY}&text=(${ac.Age})${cause}" target="_blank">
                        X Marks
                    </a>
                </p>
                `).bindTooltip(`${cause}`)
                .openTooltip()
                .addTo(map)
            // console.log(ICD10[ac.Ncause],ac.Ncause)
            // L.marker({
            //     lat: parseFloat(ac.geo.at(0)),
            //     lng: parseFloat(ac.geo.at(1))
            // }, {
            //     icon: L.divIcon({
            //         className: 'parallax-marker label big',
            //         html: ac.DY,
            //         iconSize: [200, 36],
            //         iconAnchor: [100, 18]
            //     })
            // }).addTo(map)
            // path.push([parseFloat(ac.geo.at(0))+0.001,parseFloat(ac.geo.at(1))])
            if (pan) {
                map.panTo(new L.LatLng(parseFloat(ac.geo.at(0)),parseFloat(ac.geo.at(1))))
            }
        }, delay);
        delay += 30
    }
// setTimeout(() => {
//   L.polyline(path, {
//     color: "red",
//     opacity: 1,
//   }).addTo(map);
//   map.panTo([13.744256, 100.5334])
// }, delay);

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
