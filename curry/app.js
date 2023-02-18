"use strict";
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}
const iconProps = {
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
}

var map, lyrOSM, mrkCurrentLocation, ctlZoom, ctlScale, ctlZoomslider, ctlMeasure

lyrOSM = L.tileLayer('https://{s}.tile-cyclosm.openstreetmap.fr/cyclosm/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '<a href="https://github.com/cyclosm/cyclosm-cartocss-style/releases" title="CyclOSM - Open Bicycle render">CyclOSM</a> | Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
map = L.map(`mapdiv`,{
    center:[ 13.769028, 100.540186],
    zoom: 13,
    zoomControl:false,
    attributionControl:false,
    layers: [lyrOSM]
})
ctlZoomslider = L.control.zoomslider({position:"topright"}).addTo(map)
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlScale = L.control.scale({
    position:'bottomleft',
    metric:false,
    maxWidth:200
}).addTo(map)
const BRANDS = {
    "Gold Curry Bangkok": {
        "INFO" : {
            "FB": "GoldCurryBangkok",
        },
        "branches" : [
            {name: "Rama9", tel: "098 898 6222",geo: [13.742658, 100.632240]},
            {name: "CentralPlaza Westgate", tel: "098 898 6222",geo: [13.877627, 100.410561]},
            {name: "town in town", tel: "094 695 5259",geo: [13.76904, 100.60597]},
            {name: "sukumvit39", tel: "02 662 5003",geo: [13.73226, 100.57111]},
            {name: "Rangsit", tel: "02 086 2516",geo: [13.96327, 100.58849]},
            {name: "Siam Squea 4F", tel: "",geo: [13.74516, 100.53356]},
            {name: "MRT Phetchaburi", tel: "097 067 0147",geo: [13.74943, 100.56386]},
            {name: "Asoke", tel: "02 082 5455",geo: [13.74072, 100.56179]},
            {name: "Rest Area", tel: "02 101 8854",geo: [13.84185, 100.53321]},
            {name: "Seacon Square", tel: "02 170 7498",geo: [13.69478, 100.64883]},
            {name: "Silom Thaniya", tel: "02 238 1134",geo: [13.72936, 100.53432]},
            {name: "Chong Nonsi", tel: "06-5001-0606",geo: [13.72352, 100.52980]},
            {name: "Bang Pakong", tel: "033 020 302",geo: [13.53970, 101.00780]},
            {name: "Chidlom", tel: "02 118 2429",geo: [13.74317, 100.54423]},
            // {name: "", tel: "",geo: []},
        ]
    },
    "CoCoICHIBANYA Thailand": {
        "INFO" : {
            "FB": "cocoichibanyathailand",
        },
        "branches" : [
            {name: "Central Rama 2",name_th: "เซ็นทรัล พระราม 2", tel: "090-275-7126",geo: [13.662733, 100.437794]},
            {name: "Central Rama 3",name_th: "เซ็นทรัล พระราม 3", tel: "080-382-3932",geo: [13.698714, 100.537970]},
            {name: "Central Rama 9",name_th: "เซ็นทรัล พระราม 9", tel: "090-239-4529",geo: [13.759009, 100.565962]},
            {name: "Central World",name_th: "เซ็นทรัล เวิลด์", tel: "080-364-7982",geo: [13.746951, 100.539563]},
            {name: "Central Ladprao",name_th: "เซ็นทรัล ลาดพร้าว", tel: "083-683-6546",geo: [13.816516, 100.560068]},
            {name: "Central Pinklao",name_th: "เซ็นทรัล ปิ่นเกล้า", tel: "097-325-1695",geo: [13.777443, 100.475431]},
            {name: "Central Bangna",name_th: "เซ็นทรัล บางนา", tel: "084-589-6362",geo: [13.670512, 100.634486]},
            {name: "Central Chaengwattana",name_th: "เซ็นทรัล แจ้งวัฒนะ", tel: "083-409-2380",geo: [13.904129, 100.527965]},
            {name: "Central Westgate",name_th: "เซ็นทรัล เวสต์เกต", tel: "080-365-0645",geo: [13.877403, 100.411683]},
            {name: "Central Chonburi",name_th: "เซ็นทรัล ชลบุรี", tel: "091-829-2054",geo: [13.335963, 100.970300]},
            {name: "Central Sriracha",name_th: "เซ็นทรัล ศรีราชา", tel: "080-995-5404",geo: [13.179927, 100.931310]},
            {name: "Central Salaya",name_th: "เซ็นทรัล ศาลายา", tel: "090-247-4106",geo: [13.786835, 100.276146]},
            {name: "Central Ayutthaya",name_th: "เซ็นทรัล อยุธยา", tel: "096-986-7403",geo: [14.331664, 100.611816]},
            {name: "Robinson Srisamarn",name_th: "โรบินสัน ศรีสมาน", tel: "096-986-7436",geo: [13.941199, 100.553185]},
            {name: "Robinson Chachoengsao",name_th: "โรบินสัน ฉะเชิงเทรา", tel: "096-986-7487",geo: [13.668948, 101.048472]},
            {name: "The Mall Bangkapi",name_th: "เดอะมอลล์ บางกะปิ", tel: "083-681-9893",geo: [13.767234, 100.641859]},
            {name: "The Mall Bangkae",name_th: "เดอะมอลล์ บางแค", tel: "085-856-3594",geo: [13.714362, 100.408074]},
            {name: "The Mall Tha Phra",name_th: "เดอะมอลล์ ท่าพระ", tel: "096-986-7574",geo: [13.713832, 100.480091]},
            {name: "The Mall Ngamwongwan",name_th: "เดอะมอลล์ งามวงศ์วาน", tel: "090-235-1459",geo: [13.855442, 100.542152]},
            {name: "The Mall Korat",name_th: "เดอะมอลล์ โคราช", tel: "064-453-5187",geo: [14.981463, 102.076297]},
            {name: "Lotus’s Sukhumvit 50",name_th: "โลตัส สุขุมวิท 50", tel: "083-445-0490",geo: [13.706079, 100.600617]},
            {name: "Fashion Island",name_th: "แฟชั่น ไอส์แลนด์", tel: "090-265-0702",geo: [13.826341, 100.679911]},
            {name: "Future Park Rangsit",name_th: "ฟิวเจอร์ รังสิต", tel: "084-970-4761",geo: [13.989724, 100.616602]},
            {name: "Mega Bangna",name_th: "เมกา บางนา", tel: "091-832-4563",geo: [13.646927, 100.680098]},
            {name: "Siam Paragon",name_th: "สยามพารากอน", tel: "084-027-4595",geo: [13.745958, 100.535085]},
            {name: "ICONSIAM",name_th: "ไอคอนสยาม", tel: "090-248-1838",geo: [13.726914, 100.510080]},
            {name: "Emquartier",name_th: "เอ็มควอเทียร์", tel: "097-332-5078",geo: [13.731207, 100.569671]},
            {name: "Terminal 21",name_th: "เทอร์มินอล 21", tel: "084-584-4924",geo: [13.737985, 100.560496]},
            {name: "Silom Complex",name_th: "สีลมคอมเพล็กซ์", tel: "080-365-0468",geo: [13.728365, 100.535481]},
            {name: "Samyan Mitrtown",name_th: "สามย่านมิตรทาวน์", tel: "091-867-9472",geo: [13.734374, 100.528378]},
            {name: "K Village",name_th: "เค-วิลเลจ", tel: "080-348-9565",geo: [13.720878, 100.569209]},
            {name: "Lavilla Soi Aree",name_th: "ลา วิลล่า อารีย์", tel: "080-349-9515",geo: [13.780307, 100.545037]},
            {name: "Avenue Nawamin",name_th: "นวมินทร์ ซิตี้ อเวนิว", tel: "091-791-9756",geo: [13.834325, 100.610873]},
            {name: "Major Ratchayothin",name_th: "เมเจอร์ รัชโยธิน", tel: "090-282-7692",geo: [13.828669, 100.568808]},
            {name: "Esplanade Ratchada",name_th: "เอสพลานาด รัชดา", tel: "096-381-4894",geo: [13.766144, 100.569522]},
            {name: "Market Place Krungthep Kreetha",name_th: "มาร์เก็ตเพลส กรุงเทพกรีฑา", tel: "080-995-5406",geo: [13.750194, 100.667895]},
            {name: "PTT Saimai",name_th: "ปตท. สายไหม 56", tel: "091-827-0670",geo: [13.920322, 100.660298]},
            {name: "PTT Active Park",name_th: "ปตท. แอคทีฟ พาร์ค เมืองทอง", tel: "090-269-2807",geo: [13.912149, 100.542631]},
            {name: "PTT Khlong 2 Pathum Thani",name_th: "ปตท. คลอง 2 ปทุมธานี", tel: "096-986-7484",geo: [14.055710, 100.619539]},
            {name: "MedPark Hospital",name_th: "รพ. เมดพาร์ค", tel: "084-978-7243",geo: [13.722032, 100.556251]},
            {name: "Maya Chiangmai",name_th: "เมญ่า เชียงใหม่", tel: "090-295-7813",geo: [18.802629, 98.966918]},
            {name: "Passion Shopping Destination",name_th: "แพชชั่นช้อปปิ้ง เดสติเนชั่น", tel: "090-240-5141",geo: [12.683712, 101.249098]},
            {name: "Central Chanthaburi",name_th: "เซ็นทรัล จันทบุรี", tel: "082-949-1683",geo: [12.599112, 102.124327]},
            {name: "Lotus's Sukhapiban 1 ",name_th: "โลตัส สุขาภิบาล 1", tel: "null",geo: [13.825742, 100.659776]},
            {name: "Central Eastville",name_th: "เซ็นทรัล อีสต์วิลล์", tel: "082-949-2193",geo: [13.803234, 100.614596]},
            {name: "Terminal 21 Rama 3",name_th: "เทอร์มินอล 21 พระราม 3", tel: "080-281-4988",geo: [13.689400, 100.505761]},
            {name: "MBK Center",name_th: "MBK เซ็นเตอร์", tel: "085-884-5496",geo: [13.744815, 100.530031]},
            {name: "Lotus's North Ratchapruek",name_th: "โลตัส นอร์ธราชพฤกษ์", tel: "082-949-2209",geo: [13.912508, 100.451506]},
            {name: "Central Khonkaen",name_th: "เซ็นทรัล ขอนแก่น", tel: "063-737-9083",geo: [16.433134, 102.825746]},
        ]
    },
}
var markers = L.markerClusterGroup()

const DISPLAYBRANDS = [
    {name: 'Gold Curry Bangkok',dspname: 'Gold Curry'},
    {name: 'CoCoICHIBANYA Thailand',dspname: 'CoCo ICHIBANYA'},
]

const ADDMARKER = (brand) => {
    for (let branch of BRANDS[brand.name]['branches']) {
        markers.addLayer(L.marker(new L.LatLng(...branch.geo))
        .bindPopup(`<h2>${brand.dspname} ${branch.name}</h2>
        <h6>TEL: ${branch.tel.replace(/\s/g,"-")}</h6>
        `)
        .bindTooltip(`${brand.dspname} ${branch.name}`)
        .openTooltip()
        .addEventListener("click", () => {
            console.clear()
            for (let [k,v] of Object.entries(BRANDS[brand.name]["INFO"])){
                console.log(`${k}\n${v}`)
            }
        })
        )
    }
}

DISPLAYBRANDS.map(ADDMARKER)


map.addLayer(markers)
