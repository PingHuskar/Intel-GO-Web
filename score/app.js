"use strict";

const searchParam = new URLSearchParams(location.search)

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

try {
    const zone = searchParam.get(`zone`)
    if (zone) {
        for (let region of REGIONS) {
            if (region.regionName && region.regionVertices && zone == region.regionName) {
                L.polygon(region.regionVertices.map(a => regionVerticesToPloygon(a)), {color: `orange`}).addTo(map)
                L.marker(getCenter(region.regionVertices), {
                    icon: L.divIcon({
                        className: 'parallax-marker label big',
                        html: region.regionName,
                        iconSize: [200, 36],
                        iconAnchor: [100, 18]
                    })
                }).addTo(map)
                map.flyTo(getCenter(region.regionVertices), 9)
                break
            }
        }
    } else {
        for (let region of REGIONS) {
            if (region.regionName && region.regionVertices) {
                L.polygon(region.regionVertices.map(a => regionVerticesToPloygon(a)), {color: region.color}).addTo(map)
                L.marker(getCenter(region.regionVertices), {
                    icon: L.divIcon({
                        className: 'parallax-marker label big',
                        html: region.regionName,
                        iconSize: [200, 36],
                        iconAnchor: [100, 18]
                    })
                }).addTo(map)
            }
        }
    }
} catch (e) {
    console.log(e)
}

