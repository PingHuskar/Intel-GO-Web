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

var LeafIcon = L.Icon.extend({
    options: {
      // shadowUrl: 'leaf-shadow.png',
      iconSize: [50, 50],
      shadowSize: [50, 64],
      iconAnchor: [22, 94],
      popupAnchor: [-3, -76],
    },
  });

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

var greenIcon = new L.Icon({
    iconUrl: 'https://lustrous-muffin-830396.netlify.app/ingress/marker-icon-2x-green.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });
  

const updateInput = (value) => {
    document.querySelector("input").value= value
    document.querySelector("input").blur()
}

const portallist = document.querySelector(`#portallist`)

const portalsToMap = (portals) => {
  for (let portal of portals) {
    let detail = portal.at(2)
    let lat = detail.at(2)/10**6
    let lng = detail.at(3) / 10 ** 6;
    let picurl = detail.at(7);
    let name = detail.at(8)
    console.log(detail.at(9))
    if (detail.at(9) !== undefined && detail.at(9).at(0) === `ap1`) {
        console.log(`if`)
      L.marker([lat,lng], {
        // icon: new LeafIcon({ iconUrl: `${picurl}` }),
        icon: greenIcon,
      })
        .bindPopup(
          `
                    <h2>${name}</h2>
                    <a href="https://intel.ingress.com/intel?ll=${lat},${lng}&z=18&pll=${lat},${lng}" target="_blank">
                        intel
                    </a>`
        )
        .bindTooltip(`${name}`)
        .openTooltip()
        .addTo(map);
        L.donut([lat,lng], {
            radius: ACTIONRADIUS,
            innerRadius: 0,
            innerRadiusAsPercent: false,
        }).addTo(map);
        portallist.innerHTML += `<li class="portalname" id="p${detail.c}" geo="${lat},${lng}" onclick="updateInput('${name}');scorllTop();map.flyTo([${lat},${lng}],18);">
        ${name}
        </li>`;
    } else {
        console.log(`else`)
        // console.log(portal)
        try {
            L.marker([lat,lng])
            .bindPopup(
                `<h2>${name}</h2>
                <img src="${picurl}" />
                <img src="../../src/images/googlemaps.png" onclick="window.open('https://www.google.com/maps?daddr=${lat},${lng}', '_blank')">
                `
                )
                .bindTooltip(`${name}`)
                .openTooltip()
                .addTo(map);
                
            } catch (e) {
                console.log(e)
            }
        }
  }
};

axios.get(`data.json`)
// .then(res => res.data)
.then(res => res.data.result.map)
.then(map => {
    // console.log(map)
    for (const [key, value] of Object.entries(map)) {
        portalsToMap(map[key].gameEntities)
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