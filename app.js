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
        zoom: 15,
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

    mymap.on('contextmenu', function(e) {
        var dtCurrentTime = new Date()
        var lat = e.latlng.lat.toFixed(6)
        var lng = e.latlng.lng.toFixed(6)
        var wlat = e.latlng.lat.toFixed(3)
        var wlng = e.latlng.lng.toFixed(3)
        const z = 17
        const windy_zoom = 5
        L.marker(e.latlng).addTo(mymap).bindPopup(
            `
                    <p>${lat},${lng}</p>
                    <p>${dtCurrentTime.toLocaleDateString()} ${dtCurrentTime.toLocaleTimeString()}</p>
                    <p>Open in <a href="https://pinghuskar.github.io/X-Marks-Leaflet/?lat=${encodeLatLng(lat)}&lng=${encodeLatLng(lng)}" target="_blank">X Marks Leaflet</a> 
                            ,<a href="https://pinghuskar.github.io/Weather-App/?geo=${lat},${lng}" target="_blank">Weather App</a>
                            ,<a href="https://pinghuskar.github.io/UV-Forecast-OpenUV.io/forecast/?lat=${lat}&lng=${lng}" target="_blank">Forecast UV</a>
                    </p>
                    <br>
                    <a href='https://intel.ingress.com/intel?ll=${lat},${lng}&z=${z}' target='_blank'>
                        <img src="src/images/intel.webp">
                    </a>
                    <a href='https://bannergress.com/map?lat=${lat}&lng=${lng}&zoom=${z}' target='_blank'>
                        <img src="src/images/bannergress.png">
                    </a>
                    <a href='https://www.google.com/maps?daddr=${lat},${lng}' target='_blank'>
                        <img src="src/images/googlemaps.png">
                    </a>
                    <!-- <a href='https://www.windy.com/-NO2-no2?cams,no2,${lat},${lng},${windy_zoom}' target='_blank'>
                        <img src="src/images/NO2.jpg">
                    </a> -->
                    <a href='https://www.windy.com/-PM2-5-pm2p5?cams,pm2p5,${wlat},${wlng},${windy_zoom},${createCoordCode({lat:lat,lon:lng})}' target='_blank'>
                        <img src="src/images/pm.jpg">
                    </a>
                    <a href='https://www.openstreetmap.org/#map=${z}/${lat}/${lng}' target='_blank'>
                        <img src="src/images/osm.svg">
                    </a>
                    `
        )
        // https://pinghuskar.github.io/Mark-Center-by-Province/js/configData.js
    })
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