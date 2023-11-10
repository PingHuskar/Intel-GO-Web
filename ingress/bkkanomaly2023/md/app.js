const map = L.map(`mapdiv`, {
  center: [13.749181, 100.500956],
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

const ACTIONRADIUS = 40;
let c = 0;
let delay = 500;

const portallist = document.querySelector(`#portallist`);

axios
  .get(`portals.json`)
  .then((res) => res.data)
  .then((portals) => {
    axios
      .get(`missions.json`)
      .then((res) => res.data)
      .then((missions) => {
        for (let iMission = 0; iMission < missions.length; iMission++) {
            let ulStr = ``
            ulStr += `<ul>${iMission+1}. ${missions.at(iMission).name}`
            for (let portal of portals.slice(iMission*6,(iMission+1)*6)) {
                // console.log(`${iMission}`)
                // console.log(portal)
                let marker = L.marker(portal.geo)
                  .bindPopup(
                    `<h3>${portal.name}</h3>
                    <h4>
                        >>${portal.objective}<<
                    </h4>
                    <p>${portal.geo}</p>`
                  )
                  .bindTooltip(`${portal.name}`)
                  .openTooltip()
                  marker.addTo(map);
                L.DomUtil.addClass(marker._icon, `m${iMission+1}`);
                L.donut(portal.geo, {
                  radius: ACTIONRADIUS,
                  innerRadius: 0,
                  innerRadiusAsPercent: false,
                }).addTo(map);
                map.flyTo(portal.geo);
                ulStr += `<li class="portalname" id="p${portal.name}" geo="${portal.geo}" onclick="updateInput('${portal.name}');scorllTop();map.flyTo([${portal.geo}],18);">
            ${portal.name}
            </li>`;
            }
            ulStr += `</ul>`
            portallist.innerHTML += ulStr
        }
      });
  });

const updateInput = (value) => {
  document.querySelector("input").value = value;
  document.querySelector("input").blur();
};
const scorllTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};
