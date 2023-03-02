"use strict";

const searchParam = new URLSearchParams(location.search)

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
    "OHKAJHU": {
        "INFO" : {
            "FB": "ohkajhu",
        },
        "branches": [
            {name: "OHKAJHU ORGANIC",name_th: "", tel: "061-274-9977",geo: [18.8405983,99.0224429],open: "9:00am",closed: "9:30pm",place: "Nongjom chiangmai,TH"},
            {name: "OHKAJHU AIRPORT",name_th: "", tel: "098-545-2492",geo: [18.7723983,98.9781963],open: "9:30am",closed: "9:30pm",place: "Nimcity chiangmai,TH"},
            {name: "SIAM SQUARE ONE",name_th: "", tel: "082-444-2251",geo: [13.7449978,100.531685],open: "10:00am",closed: "9:30pm",place: "Siam Square One Bangkok,TH"},
            {name: "RATCHAPRUK",name_th: "", tel: "096-698-1666",geo: [13.7676442,100.4406511],open: "10:00am",closed: "9:30pm",place: "The Circle Ratchapruk Bangkok,TH"},
            {name: "DADFA LASALLE",name_th: "", tel: "097-126-4947",geo: [13.6628877,100.6178832],open: "10:00am",closed: "9:30pm",place: "Dadfa Lasalle Bangkok,TH"},
            {name: "SIAM SQUARE SOI 2",name_th: "", tel: "062-309-4545",geo: [13.7448256,100.5318486],open: "9:00am",closed: "9:30pm",place: "Siam Square Soi 2 Bangkok,TH"},
            {name: "THE PASEO PARK KANJANAPISEK",name_th: "097-921-9555", tel: "",geo: [13.766379,100.4063514],open: "10:00am",closed: "9:30pm",place: "The Paseo Park Kanjanapisek Bangkok,TH"},
            {name: "SB RAMA 2",name_th: "", tel: "065-415-7999",geo: [13.667709,100.447148],open: "10:00am",closed: "9:30pm",place: "SB Rama 2 Bangkok,TH"},
            {name: "BTS SENANIKHOM",name_th: "", tel: "062-310-6989",geo: [13.83617, 100.57398],open: "10:00am",closed: "9:00pm",place: "BTS Senanikom Bangkok,TH"},
            {name: "LADPRAO",name_th: "", tel: "082-339-4666",geo: [13.77750, 100.62514],open: "10:00am",closed: "9:30pm",place: "Phetchaburi - Ekkamai Bangkok,TH"},
            {name: "PHETCHABURI - EKKAMAI",name_th: "", tel: "052-080-744",geo: [13.74263, 100.59354],open: "9:00am",closed: "9:30pm",place: "Ladprao Bangkok,TH"},
            {name: "MARKET VILLAGE RANG-SIT",name_th: "", tel: "062-083-3666",geo: [14.00028, 100.68499],open: "10:00am",closed: "9:00pm",place: "Market Village Rangsit Bangkok,TH"},
            {name: "EKKAMAI - RAM INTHRA",name_th: "", tel: "082-329-7666",geo: [13.81127, 100.61876],open: "9:00am",closed: "9:30pm",place: "Ekkamai Ram inthra Bangkok,TH"},
            {name: "SEACON SQUARE SRINAGARINDRA",name_th: "", tel: "082-440-4666",geo: [13.69630, 100.64812],open: "9:00am",closed: "9:30pm",place: "Seacon Square Srinagarindra Bangkok,TH"},
            {name: "INDEXLIVINGMALL BANGNA",name_th: "", tel: "094-447-0914",geo: [13.66530, 100.65069],open: "9:00am",closed: "9:30pm",place: "Indexlivingmall bangna Bangkok,TH"},
            {name: "ACTIVE PARK PTT STATION MUANGTHONG",name_th: "", tel: "066-121-0515",geo: [13.9120372,100.5404632],open: "10:00am",closed: "9:00pm",place: ""},
            {name: "SAI MAI MALL",name_th: "", tel: "062-064-4916",geo: [13.921051, 100.680389],open: "10:00am",closed: "9:00pm",place: "Sai Mai Mall Bangkok,TH"},
        ]
    },
    "Jones Salad": {
        "INFO" : {
            "FB": "JonesSaladThailand",
        },
        "branches": [
            {name: "Silom",name_th: "สีลม",geo: [13.7287523,100.5352922]},
            {name: "CentralPlaza WestGate",name_th: "เซ็นทรัลพลาซา เวสต์เกต",geo: [13.876104,100.412125]},
            {name: "Esplanade Ratchada",name_th: "เอสพละนาด รัชดา",geo: [13.766522,100.5695168]},
            {name: "King Chulalongkorn Memorial Hospital",name_th: "โรงพยาบาลจุฬาลงกรณ์",geo: [13.7324333,100.5365971]},
            {name: "Sala Daeng",name_th: "ศาลาแดง",geo: [13.7284877,100.5341327]},
            {name: "Chamchuri Square",name_th: "จามจุรีสแควร์​",geo: [13.73299,100.530403]},
            {name: "The Market Bangkok",name_th: "เดอะมาร์เก็ต แบงคอก",geo: [13.7477942,100.5412348]},
            {name: "Siriraj Hospital",name_th: "โรงพยาบาลศิริราช",geo: [13.7572396,100.4848858]},
            {name: "Central Ladprao",name_th: "เซ็นทรัล ลาดพร้าว",geo: [13.816445,100.561149]},
            {name: "CentralPlaza Cheangwattana",name_th: "เซ็นทรัลพลาซา แจ้งวัฒนะ",geo: [13.903492,100.528249]},
            {name: "CentralPlaza Pinklao",name_th: "เซ็นทรัลพลาซา ปิ่นเกล้า",geo: [13.7782739,100.4761901]},
            {name: "Union Mall",name_th: "ยูเนี่ยน มอลล์",geo: [13.8133627,100.5618615]},
            {name: "La Villa Ari",name_th: "ลา วิลล่า อารีย์",geo: [13.78002, 100.54523]},
            {name: "CentralPlaza Rama 2",name_th: "เซ็นทรัลพลาซา พระราม 2",geo: [13.663727,100.437367]},
            {name: "CentralPlaza Rama 3",name_th: "เซ็นทรัลพลาซา พระราม 3",geo: [13.697567,100.537583]},
            {name: "Future Park Rangsit",name_th: "ฟิวเจอร์พาร์ค รังสิต",geo: [13.9897121,100.6168391]},
            {name: "Seacon Square",name_th: "ซีคอนสแควร์",geo: [13.6941977,100.64785]},
            {name: "Central Rama 9",name_th: "เซ็นทรัล พระราม 9",geo: [13.758406,100.566078]},
            {name: "Terminal 21 Rama 3",name_th: "เทอร์มินอล 21 พระราม 3",geo: [13.6893538,100.5057552]},
        ]
    },
    "After You": {
        "INFO" : {
            "FB": "afteryoucafe",
            "REF": "https://www.afteryoudessertcafe.com/en/branches"
        },
        "branches": [
            {name: "CENTRAL @centralwOrld", name_th: "", tel: "",geo: [13.744973, 100.539625]},
            {name: "CentralFestival Hatyai", name_th: "", tel: "",geo: [6.9915948, 100.4829401]},
            {name: "The Market Bangkok", name_th: "", tel: "",geo: [13.74763, 100.541319]},
            {name: "101 The Third Place", name_th: "", tel: "",geo: [13.68614, 100.611678]},
            {name: "ICONSIAM", name_th: "", tel: "",geo: [13.726917, 100.511189]},
            {name: "Terminal 21 Pattaya", name_th: "", tel: "",geo: [12.950206, 100.888678]},
            {name: "CentralPlaza Rama ll", name_th: "", tel: "",geo: [13.663684, 100.439341]},
            {name: "CentralPlaza Udonthani", name_th: "", tel: "",geo: [17.406483, 102.800075]},
            {name: "CentralFestival Chiangmai", name_th: "", tel: "",geo: [18.807268, 99.018122]},
            {name: "Hillside Town, 1st Floor", name_th: "", tel: "",geo: [13.876644, 100.411027]},
            {name: "The Mall Korat", name_th: "", tel: "",geo: [14.974594, 102.077241]},
            {name: "The Promenade", name_th: "", tel: "",geo: [13.826958, 100.676697]},
            {name: "MBK Center", name_th: "", tel: "",geo: [13.745042, 100.529946]},
            {name: "CentralPlaza Bangna", name_th: "", tel: "",geo: [13.669344, 100.634311]},
            {name: "Esplanade Ratchadapisek", name_th: "", tel: "",geo: [13.766406, 100.569521]},
            {name: "BANGKOK PLAZA - Bangkok Hospital", name_th: "", tel: "",geo: [13.74879, 100.582551]},
            {name: "The Portal", name_th: "", tel: "",geo: [13.911431, 100.550129]},
            {name: "CentralPlaza Pinklao", name_th: "", tel: "",geo: [13.777812, 100.475898]},
            {name: "Seacon Square", name_th: "", tel: "",geo: [13.694498, 100.648361]},
            {name: "Terminal 21", name_th: "", tel: "",geo: [13.737894, 100.560384]},
            {name: "ZPELL - Futrue Park Rangsit", name_th: "", tel: "",geo: [13.989542, 100.617846]},
            {name: "The Mall Bangkae", name_th: "", tel: "",geo: [13.714309, 100.407695]},
            {name: "Tha Maharaj", name_th: "", tel: "",geo: [13.755026, 100.4887]},
            {name: "Megabangna", name_th: "", tel: "",geo: [13.647195443986, 100.68056459005]},
            {name: "The Crystal SB Ratchapruek", name_th: "", tel: "",geo: [13.809624501965, 100.44853678847]},
            {name: "INT Intersect Rama lll", name_th: "", tel: "",geo: [13.67455683634, 100.54500885308]},
            {name: "J Avenue Thonglor 13", name_th: "", tel: "",geo: [13.733679, 100.58136]},
            {name: "The Crystal Park", name_th: "", tel: "",geo: [13.811267222969, 100.61893198037]},
            {name: "Siam Paragon", name_th: "", tel: "",geo: [13.747092238823, 100.53514458836]},
            {name: "CentralPlaza Ladprao", name_th: "", tel: "",geo: [13.817211910538, 100.56148756085]},
            {name: "La Villa Aree", name_th: "", tel: "",geo: [13.779965111953, 100.54499564851]},
            {name: "The Mall Bangkapi", name_th: "", tel: "",geo: [13.765148, 100.643113]},
            {name: "Central wOrld", name_th: "", tel: "",geo: [13.747398937284, 100.54025077354]},
            {name: "Silom Complex", name_th: "", tel: "",geo: [13.72852, 100.535186]},
        ]
    },
    "Daddy Dough": {
        "INFO" : {

        },
        "branches": [
            {name: "PTT Daeng-Vibhavadi (ปตท. ดินแดง-วิภาวดี)", name_th: "ปตท. ดินแดง-วิภาวดี", tel: "0827896863", geo: [13.7793352, 100.5557102]},
                {name: "Bon Marche (บองมาเช่)", name_th: "บองมาเช่", tel: "0827896852", geo: [13.8393928, 100.5510049]},
                {name: "Silom (สีลม)", name_th: "สีลม", tel: "0827896851", geo: [13.7233636, 100.5202987]},
                {name: "PTT Phaholyothin 53 (ปตท. พหลโยธิน 53)", name_th: "ปตท. พหลโยธิน 53", tel: "0632722517", geo: [13.8669221, 100.59103]},   
                {name: "PTT Bangna Inbound (ปตท.บางนา ขาเข้า)", name_th: "ปตท.บางนา ขาเข้า", tel: "0614200012", geo: [13.6868153, 100.6014841]},  
                {name: "Delivery (เดลิเวอรี่)", name_th: "เดลิเวอรี่", tel: "", geo: [13.8682011, 100.4520435]},
                {name: "Ratchaphruek (ราชพฤกษ์)", name_th: "ราชพฤกษ์", tel: "", geo: [13.8682011, 100.4520435]},
                {name: "PTT Suksawat 30 (ปตท. สุขสวัสดิ์ 30)", name_th: "ปตท. สุขสวัสดิ์ 30", tel: "0613868525", geo: [13.6790101, 100.4962711]}, 
                {name: "PTT. Borommarajonani (ปตท.บรมราชชนนี)", name_th: "ปตท.บรมราชชนนี", tel: "", geo: [13.7827886, 100.4155408]},
                {name: "PTT Chaiyapruek (ปตท. ชัยพฤกษ์)", name_th: "ปตท. ชัยพฤกษ์", tel: "0888096968", geo: [13.9233792, 100.476029]},
                {name: "PTT Rama 2 Outbound (ปตท. พระราม2 ขาออก)", name_th: "ปตท. พระราม2 ขาออก", tel: "0613868525", geo: [13.6252112, 100.393579]},
                {name: "PTT Km.35 (ปตท. กม.35)", name_th: "ปตท. กม.35", tel: "0827896874", geo: [13.5322065, 100.2093555]},
                {name: "PTT BangPa-In (ปตท. บางปะอิน)", name_th: "ปตท. บางปะอิน", tel: "0614200103", geo: [14.2290385, 100.6101142]},
                {name: "PTT Wang Noi Outbound (ปตท.วังน้อย ขาออก)", name_th: "ปตท.วังน้อย ขาออก", tel: "0632709629", geo: [14.2890969, 100.8177191]},
                {name: "CentralPlaza Khonkaen (เซ็นทรัลพลาซา ขอนแก่น)", name_th: "เซ็นทรัลพลาซา ขอนแก่น", tel: "", geo: [16.432901, 102.825582]}, 
                {name: "PTT. Western Outer Ring (ปตท. วงแหวนตะวันตก)", name_th: "ปตท. วงแหวนตะวันตก", tel: "0922598329", geo: [14.1093821, 100.5332956]},
                {name: "Motorway Inbound (มอเตอร์เวย์ ขาเข้า)", name_th: "มอเตอร์เวย์ ขาเข้า", tel: "0614234184", geo: [13.5407232, 101.0069717]},
                {name: "PTT Laemchabang (ปตท. แหลมฉบัง ขาเข้า)", name_th: "ปตท. แหลมฉบัง ขาเข้า", tel: "0901988967", geo: [13.1369062, 100.9848851]},
                {name: "PTT. Laemchabang (ปตท. แหลมฉบัง ขาออก)", name_th: "ปตท. แหลมฉบัง ขาออก", tel: "0854882675", geo: [13.135165, 100.985981]},
                {name: "PTT Rayong Gas Separation Plant (ปตท. โรงแยกก๊าซระยอง)", name_th: "ปตท. โรงแยกก๊าซระยอง", tel: "0613868523", geo: [12.7225035, 101.1511636]},
        ]
    }
}
var markers = L.markerClusterGroup()

const ADDEDBRANDS = [
    {name: 'Gold Curry Bangkok',dspname: 'Gold Curry',type: 'curry'},
    {name: 'CoCoICHIBANYA Thailand',dspname: 'CoCo ICHIBANYA',type: 'curry'},
    {name: 'OHKAJHU',dspname: 'OHKAJHU',type: 'salad'},
    {name: 'Jones Salad',dspname: 'JonesSalad',type: 'salad'},
    {name: 'After You',dspname: 'After You',type: 'dessert'},
    {name: 'Daddy Dough',dspname: 'Daddy Dough',type: 'donut'},
]

const SELECTRANDOM = [
    `curry`
    ,`salad`
    ,`dessert`
    ,`donut`
]

const get_random = (list) => {
    return list[Math.floor((Math.random()*list.length))]
}

const SELECT = searchParam.get(`s`) ?? get_random(SELECTRANDOM)

const DISPLAYBRANDS = []
const REGEXIGNORECASE = `i`

for (let brand of ADDEDBRANDS) {
    if (brand.type === SELECT || new RegExp(SELECT, REGEXIGNORECASE).test(brand.dspname)) {
        DISPLAYBRANDS.push(brand)
    }
}

const genTel = (branch) => {
    if (branch.tel) return `<h6>TEL: ${branch.tel.replace(/\s/g,"-")}</h6>`
}


const ADDMARKER = (brand) => {
    for (let branch of BRANDS[brand.name]['branches']) {
        if (branch.geo.length === 2) {
            markers.addLayer(L.marker(new L.LatLng(...branch.geo))
            .bindPopup(`<h2>${brand.dspname} ${branch.name}</h2>
            ${genTel(branch)}
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
}

DISPLAYBRANDS.map(ADDMARKER)

map.addLayer(markers)
