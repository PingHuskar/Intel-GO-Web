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
let delay = 500

const portallist = document.querySelector(`#portallist`)

axios.get(`data.json`)
.then(res => res.data)
.then(portals => {
    for (let portal of portals) {
        setTimeout(()=>{
            console.log(portal)
        L.marker(portal.geo)
        .bindPopup(`<h3>${portal.name}</h3>
        <p>${portal.geo}</p>`)
        .bindTooltip(`${portal.name}`)
            .openTooltip()
        .addTo(map)
        L.donut(portal.geo, {
            radius: ACTIONRADIUS,
            innerRadius: 0,
            innerRadiusAsPercent: false,
          }).addTo(map);
        map.flyTo(portal.geo)
        portallist.innerHTML += `<li class="portalname" id="p${portal.name}" geo="${portal.geo}" onclick="updateInput('${portal.name}');scorllTop();map.flyTo([${portal.geo}],18);">
        ${portal.name}
        </li>`
        },delay)
        delay += 10
    }
})

const updateInput = (value) => {
    document.querySelector("input").value= value
    document.querySelector("input").blur()
}
const scorllTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}