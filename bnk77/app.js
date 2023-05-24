"use strict";
// https://stackoverflow.com/a/46410816/13237580
moment.suppressDeprecationWarnings = true;

const lyrics = `เชียงราย เชียงใหม่ แม่ฮ่องสอน
น่าน พะเยา ลำปาง
ลำพูน แพร่ อุตรดิตถ์
บึงกาฬ หนองคาย เลย
อุดรธานี สกลนคร นครพนม
หนองบัวลำภู ขอนแก่น กาฬสินธุ์
มุกดาหาร ชัยภูมิ มหาสารคาม
ร้อยเอ็ด ยโสธร อำนาจเจริญ
อุบลราชธานี นครราชสีมา บุรีรัมย์
สุรินทร์ ศรีสะเกษ สุโขทัย
พิษณุโลก เพชรบูรณ์ กำแพงเพชร
พิจิตร นครสวรรค์ อุทัยธานี
ชัยนาท ลพบุรี สิงห์บุรี
สระบุรี สุพรรณบุรี อ่างทอง
พระนครศรีอยุธยา นครนายก ปทุมธานี
นนทบุรี นครปฐม กรุงเทพมหานคร
สมุทรปราการ สมุทรสาคร สมุทรสงคราม
ปราจีนบุรี สระแก้ว ฉะเชิงเทรา
ชลบุรี ระยอง จันทบุรี
ตราด ตาก กาญจนบุรี
ราชบุรี เพชรบุรี ประจวบคีรีขันธ์
ชุมพร ระนอง สุราษฎร์ธานี
นครศรีธรรมราช พังงา กระบี่
ภูเก็ต ตรัง พัทลุง
สตูล สงขลา ปัตตานี
ยะลา นราธิวาส
`
let prov_arr = lyrics.split(/[\s\n]/g)
prov_arr.pop()
// console.log(prov_arr)
const searchParam = new URLSearchParams(location.search)
const lang = searchParam.get(`lang`) ?? `en`
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}

var map, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure
map = L.map(`mapdiv`, {
    center: [13.744256, 100.5334],
    zoom: 6,
    zoomControl: false,
    // dragging:false,
    // minZoom:10,
    // maxZoom:14
    attributionControl: false
})
map.addLayer(L.tileLayer(`http://{s}.tile.osm.org/{z}/{x}/{y}.png`))
// map.addLayer(L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',{
//     maxZoom: 20,
//     subdomains:['mt0','mt1','mt2','mt3']
// }))
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

const createDonut = (station) => {
    if (station.radius) {
        L.donut(station.latlng, {
            radius: station.radius,
            innerRadius: 0,
            innerRadiusAsPercent: false,
        }).addTo(map)
    } else {
        console.log(station.name)
    }
}
const placeText = (places) => {
    let tempText = ``
    try {
        for (let place of places) {
            tempText += `<li>${place}</li>`
        }
        return tempText
    } catch {
        return `ยังไม่ได้ใส่ข้อมูล`
    }    
}
const printStationAge = (type, name, since) => {
    console.log(`${type} ${name}\n${moment.preciseDiff(moment(since), moment())}`)
}
var path = []
let delay = 1000
for (let prov of prov_arr) {
    if (prov !== "") {
        setTimeout(() => {
            let record = PROVINCE.find(p => p.name === prov)
            L.marker(new L.LatLng(parseFloat(record.geo.at(0))+0.001,parseFloat(record.geo.at(1))))
                .bindPopup(`<h2>${prov}</h2>
                `).bindTooltip(`${prov}`)
                .openTooltip()
                .addTo(map)
            L.marker({
                lat: parseFloat(record.geo.at(0)),
                lng: parseFloat(record.geo.at(1))
            }, {
                icon: L.divIcon({
                    className: 'parallax-marker label big',
                    html: prov,
                    iconSize: [200, 36],
                    iconAnchor: [100, 18]
                })
            }).addTo(map)
            path.push([parseFloat(record.geo.at(0))+0.001,parseFloat(record.geo.at(1))])
            map.panTo(new L.LatLng(parseFloat(record.geo.at(0)),parseFloat(record.geo.at(1))))
        }, delay);
        delay += 20
    }
}
setTimeout(() => {
  L.polyline(path, {
    color: "red",
    opacity: 1,
  }).addTo(map);
  map.panTo([13.744256, 100.5334])
}, delay);

var pathGroup = L.featureGroup()


const createCoordCode = (coords) => {
    let ar = [];
    for (let i = 98; i < 123; i++) ar.push(String.fromCharCode(i));
    for (let i = 65; i < 91; i++) ar.push(String.fromCharCode(i));
    for (let i = 0; i < 9; i++) ar.push(i);
    let lat = Math.round(100 * (coords.lat + 90));
    let lon = Math.round(100 * (coords.lon + 180));
    return "m:" +
        ar[Math.floor(lat / 3600)] +
        ar[Math.floor((lat % 3600) / 60)] +
        ar[lat % 60] + "a" +
        ar[Math.floor(lon / 3600)] +
        ar[Math.floor((lon % 3600) / 60)] +
        ar[lon % 60];
}
// pathGroup.addLayer(BRTpath, MRTPURPLELINEpath)
// map.fitBounds(pathGroup.getBounds())

map.on('keypress', function(e) {
    console.log(e.originalEvent.key)
    if (e.originalEvent.key === "l") {
        map.locate()
    }
})
