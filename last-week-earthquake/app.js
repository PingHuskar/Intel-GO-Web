const searchParam = new URLSearchParams(location.search)
const EveryEarthquakeKey = searchParam.get(`everyearthquakekey`) || localStorage.getItem(`everyearthquakekey`)
const zeroPad = (num, places) => String(num).padStart(places, '0')
const decodeLatLng = (encodeHex) => parseInt(encodeHex, 16) / 10 ** 6
const encodeLatLng = (num) => zeroPad((num * 10 ** 6).toString(16), 8)
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}
var mymap, lyrOSM, mrkCurrentLocation, popBaanPaWaeng, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMouseposition, ctlMeasure
$(document).ready(function() {
    mymap = L.map(`mapdiv`, {
        center: [13.744,100.533142],
        zoom: 5,
        zoomControl: false,
        // dragging:false,
        // minZoom:10,
        // maxZoom:14
        attributionControl: false
    })
    lyrOSM = L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`)
    mymap.addLayer(lyrOSM)

    // https://github.com/kartena/Leaflet.Pancontrol
    // ctlPan = L.control.pan().addTo(mymap)

    // https://github.com/kartena/Leaflet.zoomslider
    ctlZoomslider = L.control.zoomslider({
        position: "topright"
    }).addTo(mymap)

    ctlMeasure = L.control.polylineMeasure().addTo(mymap);

    ctlAttribute = L.control.attribution({
        position: 'bottomleft'
    }).addTo(mymap)
    ctlAttribute.addAttribution(`OSM`) //Open Street Map
    ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)

    ctlScale = L.control.scale({
        position: 'bottomleft',
        metric: false,
        maxWidth: 200
        // https://leafletjs.com/reference.html#control-scale
    }).addTo(mymap)

    // https://github.com/ardhi/Leaflet.MousePosition
    ctlMouseposition = L.control.mousePosition().addTo(mymap)

    popBaanPaWaeng = L.popup({
        maxWidth: 200,
        keepInView: true
    })
    popBaanPaWaeng.setLatLng([18.846694, 98.948937])
    popBaanPaWaeng.setContent(`<h2>บ้านป่าแหว่ง (Moo Baan Pa Wang)</h2><img src="src/images/BaanPaWaeng.jpg" width="200px">`)
    // console.log(popBaanPaWaeng)

    mymap.on('keypress', function(e) {
        if (e.originalEvent.key === "l") {
            mymap.locate()
        }
    })
    mymap.on('locationfound', function(e) {
        console.log(e)
        if (mrkCurrentLocation) {
            mrkCurrentLocation.remove()
        }
        // mrkCurrentLocation = L.circleMarker(e.latlng).addTo(mymap)
        mrkCurrentLocation = L.circle(e.latlng, {
            radius: e.accuracy / 2
        }).addTo(mymap)
        mymap.setView(e.latlng, 14)
    })
    mymap.on('locationerror', function(e) {
        // console.log(e)
        alert(`Location was not found`)
    })
    mymap.on('zoomend', function() {
        $(`#zoom-level`).html(mymap.getZoom())
    })
    mymap.on('moveend', function() {
        $(`#map-center`).html(LatLngToArrayString(mymap.getCenter()))
    })
    mymap.on('mousemove', function(e) {
        // console.log(e.latlng.toString())
        $(`#mouse-location`).html(LatLngToArrayString(e.latlng))
    })

    // $(`#btnLocate`).click(function() {
    //     mymap.locate()
    // })
    // $(`#btnBaanPaWaeng`).click(function() {
    //     mymap.setView([popBaanPaWaeng._latlng.lat, popBaanPaWaeng._latlng.lng], 17)
    //     mymap.openPopup(popBaanPaWaeng)
    // })
})

function createCoordCode(coords) {
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

const options = {
    method: 'GET',
    url: 'https://everyearthquake.p.rapidapi.com/all_week.json',
    headers: {
      'X-RapidAPI-Key': EveryEarthquakeKey,
      'X-RapidAPI-Host': 'everyearthquake.p.rapidapi.com'
    }
  };

axios.request(options)
.then(res => res.data)
.then(res => {
    for (let quake of res.data) {
        console.log(quake)
        L.marker([quake.latitude,quake.longitude]).addTo(mymap).bindPopup(`
        <h3>
            ${quake.city || quake.place}
        </h3>
        <p>time: ${new Date(Number(quake.time)).toLocaleDateString()} ${new Date(Number(quake.time)).toLocaleTimeString()}</p>
        <p>magnitude: ${quake.magnitude}</p>
        <p>rms: ${quake.rms}</p>
        <p>sig: ${quake.sig}</p>
        <p>url: ${quake.url}</p>
        <p>detailUrl: ${quake.detailUrl}</p>
        `)
    }
})