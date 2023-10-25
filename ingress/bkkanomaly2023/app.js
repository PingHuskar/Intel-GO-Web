const map = L.map(`mapdiv`, {
    center: [13.749181,100.500956],
    zoom: 16,
    zoomControl: false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl: false,
  });
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


axios.get(`data.json`)
.then(res => res.data.result.map)
.then(map => {
    // console.log(map)
    for (const [key, value] of Object.entries(map)) {
        gameEntitiesToMap(map[key].gameEntities)
    }
    
})
.then(() => {
    // map.addLayer(markers)
})