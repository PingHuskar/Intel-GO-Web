"use strict";
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

var mymap, lyrOSM, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure
$(document).ready(function(){
    mymap = L.map(`mapdiv`,{
        center:[ 13.769028, 100.540186],
        zoom:13,
        zoomControl:false,
        // dragging:false,
        // minZoom:10,
        // maxZoom:14
        attributionControl:false
    })
    lyrOSM = L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`)
    mymap.addLayer(lyrOSM)

    // https://github.com/kartena/Leaflet.Pancontrol
    // ctlPan = L.control.pan().addTo(mymap)

    // https://github.com/kartena/Leaflet.zoomslider
    ctlZoomslider = L.control.zoomslider({position:"topright"}).addTo(mymap)

    ctlMeasure = L.control.polylineMeasure().addTo(mymap);

    ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(mymap)
    ctlAttribute.addAttribution(`OSM`) //Open Street Map
    ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)

    ctlScale = L.control.scale({
        position:'bottomleft',
        metric:false,
        maxWidth:200
        // https://leafletjs.com/reference.html#control-scale
    }).addTo(mymap)
    
    mymap.on('keypress',function(e) {
        if (e.originalEvent.key === "l") {
            mymap.locate()
        }
    })
})