const searchParam = new URLSearchParams(location.search);
const radius = 4;
const unit = `km`;
const donut = searchParam.get(`donut`);
const plot = searchParam.get(`plot`);
const colorhunt = searchParam.get(`colorhunt`) || -1;
const LAYER = searchParam.get(`layer`) || localStorage.getItem(`layer`);
const LOGDOMAPAPIKEY =
  searchParam.get(`longdokey`) || localStorage.getItem(`longdokey`);
const zeroPad = (num, places) => String(num).padStart(places, "0");
const decodeLatLng = (encodeHex) => parseInt(encodeHex, 16) / 10 ** 6;
const encodeLatLng = (num) => zeroPad((num * 10 ** 6).toString(16), 8);
const LatLngToArrayString = (ll) => {
  return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`;
};
let mapGotLayer = false;
var map,
  lyrOSM,
  mrkCurrentLocation,
  popExample,
  ctlZoom,
  ctlAttribute,
  ctlScale,
  ctlPan,
  ctlZoomslider,
  ctlMouseposition,
  ctlMeasure;

map = L.map(`mapdiv`, {
  center: [13.744, 100.533142],
  zoom: 15,
  zoomControl: false,
  // dragging:false,
  // minZoom:10,
  // maxZoom:14
  attributionControl: false,
});

const addLayerToMap = (layer) => {
  // console.log(layer)
  // console.log(typeof layer)
  console.log(`${layer._url} added to map`)
  map.addLayer(layer);
  mapGotLayer = true
}

if (plot) {
    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ',
        maxZoom: 16
    });
    addLayerToMap(Esri_WorldGrayCanvas);
} 
// else {
    if (!LAYER) {
        lyrOSM = L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`)
        addLayerToMap(lyrOSM)
    } else if (LAYER === `traffic` && LOGDOMAPAPIKEY) {
      lyrOSM = L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`)
      addLayerToMap(lyrOSM)
      // const trafficlayer = `https://mstraffic1.simplethai.net/mmmap/tile.php?proj=epsg3857&mode=trafficoverlay&zoom={z}&x={x}&y={y}&HD=1&key=${LOGDOMAPAPIKEY}`;
      // L.tileLayer(trafficlayer, {
      //   attribution: "© Longdo Traffic Map"
      // }).addTo(map)
      const lyrLongdoTrafficlayer = L.tileLayer(`https://mstraffic1.simplethai.net/mmmap/tile.php?proj=epsg3857&mode=trafficoverlay&zoom={z}&x={x}&y={y}&HD=1&key=${LOGDOMAPAPIKEY}`,{
        attribution: "© Longdo Traffic Map"
      })
      addLayerToMap(lyrLongdoTrafficlayer)
    } else if (LAYER === `topo`) {
        var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
            maxZoom: 17,
            attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
        });
        addLayerToMap(OpenTopoMap)
    }
// }



// https://github.com/kartena/Leaflet.Pancontrol
// ctlPan = L.control.pan().addTo(map)

// https://github.com/kartena/Leaflet.zoomslider
ctlZoomslider = L.control
  .zoomslider({
    position: "topright",
  })
  .addTo(map);

ctlMeasure = L.control.polylineMeasure().addTo(map);

ctlAttribute = L.control
  .attribution({
    position: "bottomleft",
  })
  .addTo(map);
ctlAttribute.addAttribution(`OSM`); //Open Street Map
ctlAttribute.addAttribution(
  `<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`
);

ctlScale = L.control
  .scale({
    position: "bottomleft",
    metric: false,
    maxWidth: 200,
    // https://leafletjs.com/reference.html#control-scale
  })
  .addTo(map);

// https://github.com/ardhi/Leaflet.MousePosition
ctlMouseposition = L.control.mousePosition().addTo(map);

const addMarker = (coor, data, addTooltip) => {
  switch (data.country) {
    case `Singapore`:
      let planningArea = `Bedok`
      axios
    .get(
      `https://www.onemap.gov.sg/api/public/popapi/getIndustry?planningArea=${planningArea}&year=2020`,{
          headers: {"Authorization": `eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI3ZWZjNDI0NTVkODU3Nzg1ZmNjY2E4YWViMmNiZDVhNSIsImlzcyI6Imh0dHA6Ly9pbnRlcm5hbC1hbGItb20tcHJkZXppdC1pdC0xMjIzNjk4OTkyLmFwLXNvdXRoZWFzdC0xLmVsYi5hbWF6b25hd3MuY29tL2FwaS92Mi91c2VyL3Bhc3N3b3JkIiwiaWF0IjoxNjk1MzgwMzE0LCJleHAiOjE2OTU2Mzk1MTQsIm5iZiI6MTY5NTM4MDMxNCwianRpIjoiSGJqQ3VnenZVTTBYZEk5RyIsInVzZXJfaWQiOjkwNiwiZm9yZXZlciI6ZmFsc2V9.LghiYVul6xOUfPykokXTnzTdyUGAlNLQjt_JIRpalS4`
      }}
    ).then((res) => { 
      console.log(res.data.at(0))
    })
      break
    default:
      const m = L.marker(coor)
      .addTo(map)
      .bindPopup(`
      <h2>${data.country}<h2>
      <h3>${data.province}<h2>
      <h4>${data.district}<h2>
      <h5>${data.subdistrict}<h2>
      `)
      if (addTooltip) {
        m.bindTooltip(`${data.subdistrict}`)
      }
      
    }
}

map.on("contextmenu", function (e) {
  let dtCurrentTime = new Date();
  let lat = e.latlng.lat.toFixed(6);
  let lng = e.latlng.lng.toFixed(6);
  let wlat = e.latlng.lat.toFixed(3);
  let wlng = e.latlng.lng.toFixed(3);
  const z = 17;
  const windy_zoom = 5;
  axios
    .get(
      `https://api.longdo.com/map/services/addresses?lon[]=${lng}&lat[]=${lat}&key=${LOGDOMAPAPIKEY}`
    )
    .then((res) => res.data.at(0))
    .then((data) => {
      console.log(data);
      if (data.country !== `ประเทศไทย`) return addMarker([lat,lng], data, true)
      const aoi = data.aoi || ``;

      L.marker(e.latlng)
        .addTo(map)
        .bindPopup(
          `
                        <p>${lat},${lng}</p>
                        <p>${dtCurrentTime.toLocaleDateString()} ${dtCurrentTime.toLocaleTimeString()}</p>
                        
                        <p>${aoi}</p>
                        <p>
                            ${data.road} 
                            <!--                          
                            <a href="https://api.longdo.com/map/services/object?mode=geojson&id=${
                              data.geocode
                            }&dataset=IG&key=${LOGDOMAPAPIKEY}" target="_blank">${
            data.subdistrict
          }</a>
                            <a href="https://api.longdo.com/map/services/object?mode=geojson&id=${data.geocode.replace(
                              /\d{2}$/,
                              ""
                            )}&dataset=IG&key=${LOGDOMAPAPIKEY}" target="_blank">${
            data.district
          }</a>
                            <a href="https://api.longdo.com/map/services/object?mode=geojson&id=${data.geocode.replace(
                              /\d{4}$/,
                              ""
                            )}&dataset=IG&key=${LOGDOMAPAPIKEY}" target="_blank">${
            data.province
          }</a>
                            -->
                            <a onclick="plotarea(${data.geocode})">${
            data.subdistrict
          }</a>
                            <a onclick="plotarea(${data.geocode.replace(
                              /\d{2}$/,
                              ""
                            )})">${data.district}</a>
                            <a onclick="plotarea(${data.geocode.replace(
                              /\d{4}$/,
                              ""
                            )})">${data.province}</a>
                            ${data.postcode}
                            ${data.country}
                            ${data.geocode}
                        </p>
                        <p>
                            elevation: ${data.elevation}
                        </p>
                        <p>
                            Open in
                        </p>
                        
                        <ul> 
                            <li>
                                <a href="https://glistening-froyo-abf34c.netlify.app/?lat=${lat}&lng=${lng}" target="_blank">
                                    Ohn Ma 10 thousand
                                </a> 
                                </li><li>
                                <a href="https://pinghuskar.github.io/X-Marks-Leaflet/?lat=${encodeLatLng(
                                  lat
                                )}&lng=${encodeLatLng(lng)}" target="_blank">
                                    X Marks Leaflet
                                </a> 
                                </li><li>
                                <a href="https://pinghuskar.github.io/Weather-App/?geo=${lat},${lng}" target="_blank">
                                Weather App
                                </a>
                                </li><li>
                                <a href="https://fabulous-starburst-a62d78.netlify.app/?lat=${lat}&lon=${lng}" target="_blank">
                                    Thailand Weather App
                                </a>
                                </li><li>
                                <a href="https://pinghuskar.github.io/UV-Forecast-OpenUV.io/forecast/?lat=${lat}&lng=${lng}" target="_blank">
                                    UV Forecast
                                </a>
                            </li>
                        </ul>
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
                        <a href='https://www.windy.com/-PM2-5-pm2p5?cams,pm2p5,${wlat},${wlng},${windy_zoom},${createCoordCode(
            { lat: lat, lon: lng }
          )}' target='_blank'>
                            <img src="src/images/pm.jpg">
                        </a>
                        <a href='https://www.openstreetmap.org/#map=${z}/${lat}/${lng}' target='_blank'>
                            <img src="src/images/osm.svg">
                        </a>
                        `
        );

      if (donut) {
        L.donut(e.latlng, {
          radius: radius * (unit === `km` ? 1000 : 1),
          innerRadius: 0,
          innerRadiusAsPercent: false,
        }).addTo(map);
      }
      if (plot) {
        const arrPlot = plot.split(``);
        if (arrPlot.includes(`s`)) {
          plotShape(data.geocode, `#${palette.at(colorhunt).color.at(0)}`);
        }
        if (arrPlot.includes(`d`)) {
          plotShape(data.geocode.replace(/\d{2}$/, ""), `#${palette.at(colorhunt).color.at(1)}`);
        }
        if (arrPlot.includes(`p`)) {
          plotShape(data.geocode.replace(/\d{4}$/, ""), `#${palette.at(colorhunt).color.at(2)}`);
        }
      }
    })
    .catch((err) => {
      console.error(err)
      console.info(`https://api.longdo.com/map/services/addresses?lon[]=${lng}&lat[]=${lat}&key=${LOGDOMAPAPIKEY}`)
    })

  // https://pinghuskar.github.io/Mark-Center-by-Province/js/configData.js
});
map.on("keypress", function (e) {
  if (e.originalEvent.key === "l") {
    map.locate();
  }
});
map.on("locationfound", function (e) {
  console.log(e);
  if (mrkCurrentLocation) {
    mrkCurrentLocation.remove();
  }
  // mrkCurrentLocation = L.circleMarker(e.latlng).addTo(map)
  mrkCurrentLocation = L.circle(e.latlng, {
    radius: e.accuracy / 2,
  }).addTo(map);
  map.setView(e.latlng, 14);
});
map.on("locationerror", function (e) {
  // console.log(e)
  alert(`Location was not found`);
});
map.on("zoomend", function () {
  $(`#zoom-level`).html(map.getZoom());
});
map.on("moveend", function () {
  $(`#map-center`).html(LatLngToArrayString(map.getCenter()));
});
map.on("mousemove", function (e) {
  // console.log(e.latlng.toString())
  $(`#mouse-location`).html(LatLngToArrayString(e.latlng));
});

function createCoordCode(coords) {
  let ar = [];
  for (let i = 98; i < 123; i++) ar.push(String.fromCharCode(i));
  for (let i = 65; i < 91; i++) ar.push(String.fromCharCode(i));
  for (let i = 0; i < 9; i++) ar.push(i);

  let lat = Math.round(100 * (coords.lat + 90));
  let lon = Math.round(100 * (coords.lon + 180));

  return (
    "m:" +
    ar[Math.floor(lat / 3600)] +
    ar[Math.floor((lat % 3600) / 60)] +
    ar[lat % 60] +
    "a" +
    ar[Math.floor(lon / 3600)] +
    ar[Math.floor((lon % 3600) / 60)] +
    ar[lon % 60]
  );
}

const sPlotShape = (geocode, color = `black`) => {
  axios
    .get(
      `https://api.longdo.com/map/services/object?mode=geojson&id=${geocode}&dataset=IG&key=${LOGDOMAPAPIKEY}`
    )
    .then((res) => {
      console.log(res);
      return res.data.features;
    })
    .then((features) => {
      // console.log(features)
      for (let feature of features) {
        // console.log(feature)
        if (feature.geometry.coordinates.length > 1) {
          console.log(feature.geometry.coordinates)
          for (let shape of feature.geometry.coordinates) {
            let newArr = [];
            for (let mark of shape) {
              newArr.push([mark.at(1), mark.at(0)]);
            }
            L.polygon(newArr, {
              color: color,
              fillColor: color,
            }).addTo(map);
          }
          // console.log(province.geometry.coordinates)
        } else if (feature.geometry.coordinates.length === 1) {
          let newArr = [];
          for (let mark of feature.geometry.coordinates.at(0)) {
            newArr.push([mark.at(1), mark.at(0)]);
          }
          // console.log(province.geometry.coordinates)
          L.polygon(newArr, {
            color: color,
            fillColor: color,
          }).addTo(map);
        }
      }
    })
}
const plotShape = (geocode, color) => {
  axios
    .get(
      `https://api.longdo.com/map/services/object?mode=geojson&id=${geocode}&dataset=IG&key=${LOGDOMAPAPIKEY}`
    )
    .then((res) => {
      console.log(res);
      return res.data.features.at(0).geometry.coordinates;
    })
    .then((shapes) => {
      // console.log(shapes)
      for (let shape of shapes) {
        // console.log(shape)
        if (shape.length > 1) {
          let newArr = [];
          for (let mark of shape) {
            newArr.push([mark.at(1), mark.at(0)]);
          }
          // console.log(province.geometry.coordinates)
          L.polygon(newArr, {
            color: color,
            fillColor: color,
          }).addTo(map);
        } else if (shape.length === 1) {
          let newArr = [];
          for (let mark of shape.at(0)) {
            newArr.push([mark.at(1), mark.at(0)]);
          }
          // console.log(province.geometry.coordinates)
          L.polygon(newArr, {
            color: color,
            fillColor: color,
          }).addTo(map);
        }
      }
    });
};

const plotarea = (geocode) => {
  // console.log(geocode)
  const t = typeof geocode
  if (t === `string`) {
    sPlotShape(geocode)
  } else {
    switch (geocode.toString().length) {
      case 6: {
        plotShape(geocode, `red`);
        break;
      }
      case 4: {
        plotShape(geocode, `green`);
        break;
      }
      case 2: {
        plotShape(geocode, `blue`);
        break;
      }
      default: {
        alert(`error`);
      }
    }
}
  
};
