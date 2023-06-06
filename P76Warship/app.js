"use strict";
// https://stackoverflow.com/a/46410816/13237580
moment.suppressDeprecationWarnings = true;

const lyrics = `จะกรุงเทพมหานคร\nปทุมธานี\nจะนนทบุรี ศรีสะเกษ\nหรือพิษณุโลก\nจะสมุทรปราการ\nหรือสมุทรสงคราม\nอยุธยาหรือลพบุรี\nชุมพรและก็สิงห์บุรี\nอุบลราชธานีหรือยโสธร\nออกไปตะลอนตะลอน\nให้กระเด้งกระดอน\nกันดูสักครั้ง\nออกไปตะลุยตามลม\nไปดูโลกกลมกลมสักวัน\nไปชมเมืองชมภู\nชมเขาชมไพร\nไปชมทะเล\nชมหญิงชมชาย\nจะไปไหม จะไปไหม\nออกไปด้วยกัน\nหนีเที่ยวสักวัน... วู้ วู้ วู้\nจะจันทบุรี\nหรือนครศรีธรรมราช\nจะนราธิวาส อำนาจเจริญ\nและหนองบัวลำภู\nจะนครนายก\nหรือนครสวรรค์\nจะประจวบหรือสุพรรณบุรี\nอุตรดิตถ์ สระบุรี\nจะสระแก้วราชบุรี\nหรือว่าเชียงใหม่... เจ้า\nออกไปตะลอนตะลอน\nให้กระเด้งกระดอน\nกันดูสักครั้ง\nออกไปตะลุยตามลม\nไปดูโลกกลมกลมสักวัน\nไปชมเมืองชมภู\nชมเขาชมไพร\nไปชมทะเล\nชมหญิงชมชาย\nจะไปไหม จะไปไหม\nออกไปด้วยกัน\nหนีเที่ยวสักวัน... วู้ วู้ วู้\nPeter,\nWhere you go today ?\nI love ทะเล\nแต่จะไปเที่ยวภูเขา\nI want to go arond\nYou shold pround\nTo be Thai\nเลย ระนอง ระยอง\nแพร่ ยะลา\nนครราชสีมา ชลบุรี\nกระบี่ สตูล พังงา ชัยภูมิ\nสงขลา สมุทรสาคร\nตรัง ตาก ตราด ภูเก็ต\nกำแพงเพชร ร้อยเอ็ด\nเพชรบุรี กาฬสินธ์\nสุรินทร์ ปราจีนบุรี\nปัตตานี สุราษฎร์ธานี\nขอนแก่น\nน่าน พิจิตร เชียงราย\nสุโขทัย หนองคาย\nอุทัย อุดร กาญจนบุรี\nสกลนคร แม่ฮ่องสอน\nนครพนม พะเยา\nมหาสารคาม บุรีรัมย์\nอ่างทอง ลำปาง ลำพูน\nมุกดาหาร พัทลุง\nเพชรบูรณ์ ฉะเชิงเทรา\nชัยนาท นครปฐม...\nออกไปตะลอนตะลอน\nให้กระเด้งกระดอน\nกันดูสักครั้ง\nออกไปตะลุยตามลม\nไปดูโลกกลมกลมสักวัน\nไปชมเมืองชมภู\nชมเขาชมไพร\nไปชมทะเล\nชมหญิงชมชาย\nจะไปไหม จะไปไหม\nออกไปด้วยกัน\nหนีเที่ยวสักวัน... วู้ วู้ วู้
`
let prov_arr = lyrics.split(/[\s\n]/g)
// console.log(prov_arr)
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
let c = 0
for (let line of prov_arr) {
    let new_line = line
                    .replace(/จะ/g,' ')
                    .replace(/และ/g,' ')
                    .replace(/เจ้า/g,' ')
                    .replace(/ว่า/g,' ')
                    .replace(/หรือ/g,' ')
                    .replace(/ก็/g,' ')
                    .replace(/\./g,'')
                    .replace(/สระแก้วราชบุรี/g,'สระแก้ว ราชบุรี')
                    .replace(/\s+/g,' ')
    // console.log(line,new_line)
    if (new_line !== "") {
        for (let word of new_line.split(` `)) {
            setTimeout(() => {
                let record = PROVINCE.find(p => p.name === word)
                try {
                    console.log(record.name)
                    let lat = parseFloat(record.geo.at(0))
                    let lng = parseFloat(record.geo.at(1))
                L.marker(new L.LatLng(lat+0.0001,lng))
                .bindPopup(`<h2>${word}</h2>\
                `).bindTooltip(`${word}`)
                .openTooltip()
                .addTo(map)
                L.marker({
                    lat: lat,
                    lng: lng
                }, {
                    icon: L.divIcon({
                    className: 'parallax-marker label big',
                    html: word,
                    iconSize: [200, 36],
                    iconAnchor: [100, 18]
                })
                }).addTo(map)
                c++
                path.push([lat+0.0001,lng])
            }
            catch (e) {
                // console.log(e)
            }
            // map.panTo(new L.LatLng(parseFloat(record.geo.at(0)),parseFloat(record.geo.at(1))))
        }, delay);
        delay += 10
    }
    }
}
setTimeout(() => {
  L.polyline(path, {
    color: "red",
    opacity: 1,
  }).addTo(map);
  map.panTo([13.744256, 100.5334])
  console.log(c)
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
