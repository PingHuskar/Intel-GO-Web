// "use strict";
let responseFromIntel = ``
// const responsePattern = /^{"result"\:\[\[".+\]\]}$/
// while (!responsePattern.test(responseFromIntel)) {
    responseFromIntel = prompt(`Copy object From getEntities -> result`)
// }
const getEntitiesMap = JSON.parse(responseFromIntel)

var map, lyrOSM, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure

var map = L.map('map').setView(
    [13.720405,
        100.427619]
    , 15)

L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map)


var LeafIcon = L.Icon.extend({
    options: {
        // shadowUrl: 'leaf-shadow.png',
        iconSize: [50, 50],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
})
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({
    position: 'bottomleft'
}).addTo(map)
ctlAttribute.addAttribution(`Cyclosm`) //Open Street Map
ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)
ctlScale = L.control.scale({
    position: 'bottomleft',
    metric: false,
    maxWidth: 200
    // https://leafletjs.com/reference.html#control-scale
}).addTo(map)


const AddImageToMap = (key, lat, lng) => {
    try {
        if (key.hasOwnProperty(`portalImageUrl`) && key.portalImageUrl !== ``) {
            L.marker([lat, lng], {
                icon: new LeafIcon({
                    iconUrl: `${key.portalImageUrl}`
                })
            })
            .bindPopup(
                `
                <h2>${key.portalTitle}</h2>
                <a href="https://intel.ingress.com/intel?ll=${lat},${lng}&z=18&pll=${lat},${lng}" target="_blank">
                <p>${key.portalAddress}</p>
                </a>`)
                .bindTooltip(`${key.portalTitle}`).openTooltip()
                .addTo(map)
            }
    } catch (err) {
        console.log(key)
        console.error(`Portal Image Not Found\nhttps://lh3.googleusercontent.com/${key.portalImageUrl}`)
    }
}

const AddDonut = (lat, lng) => {
    L.donut([lat, lng], {
        radius: 40,
        innerRadius: 0,
        innerRadiusAsPercent: false,
    }).addTo(map)
}

const decodeLatLngAndAddtoMap = (coor) => {
    const lat = coor.at(0) / 10**6
    const lng = coor.at(1) / 10**6
    // console.log(lat,lng)
    L.marker([lat, lng]).addTo(map)

    // AddDonut(lat, lng)

    // return `${key.portalTitle} @${lat},${lng} Added to Map`
}

// console.log(getEntities[`gameEntities`])
// console.log(typeof getEntities[`gameEntities`])
// console.log(getEntities[`gameEntities`].length)
let count = 0
// console.log(getEntitiesMap[`map`])
for (const key in getEntitiesMap[`map`]) {

    // console.log(key);
// }
// for (let maps of ) {
    // console.log(getEntitiesMap[`map`][key].gameEntities)
    for (let gameEntity of getEntitiesMap[`map`][key].gameEntities) {
        if (gameEntity.at(-1).at(1) === `M`) {
            // console.log(gameEntity.at(-1))
            // console.log(gameEntity.at(-1).at(3),gameEntity.at(-1).at(4))
            decodeLatLngAndAddtoMap([gameEntity.at(-1).at(3),gameEntity.at(-1).at(4)])
            // break
            count++
        }
    }
}
alert(count)