const map = L.map(`mapdiv`, {
    center: [13.749181,100.500956],
    zoom: 16,
    zoomControl: false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl: false,
});
L.control.polylineMeasure().addTo(map);
let lyrOSM = L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`);
map.addLayer(lyrOSM);

const ACTIONRADIUS = 40
let c = 0
// let markers = L.markerClusterGroup()

const gameEntitiesToMap = (gameEntities) => {
    for (let item of gameEntities) {
        try {

            let detail = item.at(2)
            // console.log(detail)
            if (detail.at(9).at(0) !== `ap1`) continue
            c++
            // https://github.com/lc4t/ingress-api/blob/master/README.md
            // let type = detail.at(0)
            let faction = detail.at(1)
            let lat = detail.at(2)/10**6
            let lng = detail.at(3)/10**6
            let level = detail.at(4)
            let energy = detail.at(5)
            let resonator_nums = detail.at(6)
            let picurl = detail.at(7)
            let name = detail.at(8)
            console.log(`{
                c: ${c},
                name: \`${name}\`,
                geo: [${lat},${lng}],
                picurl: \`${picurl}\`,
            },`)
            // markers.addLayer(
            L.marker([lat,lng])
            .bindPopup(`<h2>${name}</h2>
            <h3>Faction: ${faction}</h3>
            <h3>Level: ${level}</h3>
            <h3>Resonator_nums: ${resonator_nums}</h3>
            <h3>Energy: ${energy}</h3>
            <img src="${picurl}" />
            <img src="../../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=${lat},${lng}', '_blank')">
            `).bindTooltip(`${name}`).openTooltip()
            .addTo(map)
            // )
            L.donut([lat,lng], {
                radius: ACTIONRADIUS,
                innerRadius: 0,
                innerRadiusAsPercent: false,
              }).addTo(map);
        } catch (e) {
            continue;
        }
    }
}


// axios.get(`data.json`)
// .then(res => res.data.result.map)
// .then(map => {
//     // console.log(map)
//     for (const [key, value] of Object.entries(map)) {
//         gameEntitiesToMap(map[key].gameEntities)
//     }
    
// })
// .then(() => {
//     // map.addLayer(markers)
// })

const portallist = document.querySelector(`#portallist`)

axios.get(`clean.json`)
.then(res => res.data)
.then(portals => {
    for (let portal of portals) {
        L.marker(portal.geo)
            .bindPopup(`<h2>${portal.name}</h2>
            <img src="${portal.picurl}" />
            <img src="../../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=${portal.geo.at(0)},${portal.geo.at(1)}', '_blank')">
            `).bindTooltip(`${portal.name}`).openTooltip()
            .addTo(map)
        L.donut(portal.geo, {
            radius: ACTIONRADIUS,
            innerRadius: 0,
            innerRadiusAsPercent: false,
        }).addTo(map);
        portallist.innerHTML += `<li class="portalname" id="p${portal.c}" geo="${portal.geo}" onclick="scorllTop();map.flyTo([${portal.geo}],18);">
        ${portal.name}
        </li>`
    }
})

const scorllTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const filterportalname = (filtervalue) => {
    const re = new RegExp(filtervalue, "gi")
    const portalnames = document.querySelectorAll(`.portalname`)
    let f = 0
    for (let portalname of portalnames) {
        if (filtervalue != portalname.innerText) {
            portalname.classList.remove(`hide`)
        }
    }
    if (filtervalue){
        for (let portalname of portalnames) {
            if (!portalname.innerText.match(re)) {
                // console.log(portalname.innerText)
                portalname.classList.add(`hide`)
            } else {
                if (!f) {
                    f++
                    console.log(portalname.attributes.geo.value)
                    let [lat,lng] = portalname.attributes.geo.value.split(',')
                    map.flyTo([lat,lng],18)
                }
            }
        }
    }
}