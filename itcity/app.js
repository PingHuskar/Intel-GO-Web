const searchParams = new URLSearchParams(location.search)

var map = L.map('map').setView([13.697683, 100.491943], 12)
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

const APIURL = `stores.json`


const DICTLANG = {
    'en':'en_name',
    'ch':'chname',
}
const LANG = DICTLANG[searchParams.get(`lang`)] || DICTLANG[`en`]

const AddDonut = (lat, lng) => {
    L.donut([lat, lng], {
        radius: 500,
        innerRadius: 0,
        innerRadiusAsPercent: false,
    }).addTo(map)
}


const AddStoreToMap = (store) => {
    try {
        
        let lat = store.latitude
        let lng = store.longitude
        if (
            lat !== 0 
            && lng !== 0 
            && store.title !== `NULL` 
        ) {
            L.marker([lat, lng])
            .bindPopup(
                `
                <h2>${store.title}</h2>
                <p>${store.address}</p>
                `)
                .bindTooltip(`${store.title}`).openTooltip()
                .addTo(map)
            // AddDonut(lat,lng)
        }
    } catch (err) {
        console.log(store)
    }
}

fetch(APIURL)
.then(res => res.json())
.then(stores => {
    for (let store of stores.data.items) {
        AddStoreToMap(store)
    }
})
.catch(err => { throw err })