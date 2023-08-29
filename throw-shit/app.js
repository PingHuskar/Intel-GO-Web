const searchParam = new URLSearchParams(location.search)
const zeroPad = (num, places) => String(num).padStart(places, '0')
const decodeLatLng = (encodeHex) => parseInt(encodeHex, 16) / 10 ** 6
const encodeLatLng = (num) => zeroPad((num * 10 ** 6).toString(16), 8)
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}

const MEETUP = {
    location: {
        name: `Mirror Art`,
        coor: [13.877632738820147, 100.58396636546341],
        html: `Address: 143/19 แจ้งวัตนะ ซอย1(แยก6, ถนนแจ้งวัตนะ, Talat Bang Khen, Lak Si, Bangkok 10210
            <br>Twitter: <a href="https://twitter.com/DuangritBunnag/status/1696389928542941294" target="_blank">2 กันยายน | 13:14</a> 
            <br>News: <a href="https://www.thaich8.com/news_detail/128922/" target="_blank">ทำตามสัญญา! 2 ก.ย.นี้ "ดวงฤทธิ์" พร้อมโดนปาขี้ หลัง "เพื่อไทย" ทิ้ง "ก้าวไกล" ตั้งรัฐบาลสลายขั้ว</a> 
            `
    }
}

var map, lyrOSM, mrkCurrentLocation, popBaanPaWaeng, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMouseposition, ctlMeasure
map= L.map(`mapdiv`, {
center: MEETUP.location.coor,
    zoom: 15,
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
// https://github.com/ardhi/Leaflet.MousePosition
ctlMouseposition = L.control.mousePosition().addTo(map)

L.marker(MEETUP.location.coor)
    .bindPopup(`${MEETUP.location.html}`)
    .bindTooltip(`${MEETUP.location.name}`)
    .openTooltip()
    .addTo(map)
map.on('keypress', function(e) {
    if (e.originalEvent.key === "l") {
        map.locate()
    }
})
map.on('locationfound', function(e) {
    console.log(e)
    if (mrkCurrentLocation) {
        mrkCurrentLocation.remove()
    }
    // mrkCurrentLocation = L.circleMarker(e.latlng).addTo(map)
    mrkCurrentLocation = L.circle(e.latlng, {
        radius: e.accuracy / 2
    }).addTo(map)
    map.setView(e.latlng, 14)
})
map.on('locationerror', function(e) {
    // console.log(e)
    alert(`Location was not found`)
})
map.on('zoomend', function() {
    $(`#zoom-level`).html(map.getZoom())
})
map.on('moveend', function() {
    $(`#map-center`).html(LatLngToArrayString(map.getCenter()))
})
map.on('mousemove', function(e) {
    // console.log(e.latlng.toString())
    $(`#mouse-location`).html(LatLngToArrayString(e.latlng))
})
