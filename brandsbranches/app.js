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
    },
    "Fuji Restaurant": {
        "INFO": {

        },
        "branches": [
            {name: "Silom Complex (สีลม คอมเพล็กซ์)", name_th: "สีลม คอมเพล็กซ์", tel: "0832505507", geo: [13.728190, 100.535065]},
            {name: "centralwOrld (เซ็นทรัลเวิลด์)", name_th: "เซ็นทรัลเวิลด์", tel: "0840344515", geo: [13.746539, 100.539362]},
            {name: "Siam Center (สยามเซ็นเตอร์)", name_th: "สยามเซ็นเตอร์", tel: "026581160", geo: [13.746238, 100.532824]},
            {name: "MBK Center (เอ็มบีเค เซ็นเตอร์)", name_th: "เอ็มบีเค เซ็นเตอร์", tel: "0918347842", geo: [13.744468, 100.529909]},
            {name: "Terminal 21 Asok (เทอร์มินอล 21 อโศก)", name_th: "เทอร์มินอล 21 อโศก", tel: "0849822125", geo: [13.737983, 100.560486]},
            {name: "Tesco Lotus Rama 1 (เทสโก้ โลตัส พระราม1)", name_th: "เทสโก้ โลตัส พระราม1", tel: "0902437515", geo: [13.748165, 100.524559]},
            {name: "Siam Paragon (สยามพารากอน)", name_th: "สยามพารากอน", tel: "0803796515", geo: [13.747093, 100.535091]},
            {name: "Central Rama 9 (เซ็นทรัล พระราม 9)", name_th: "เซ็นทรัล พระราม 9", tel: "0803675979", geo: [13.758501, 100.566109]},
            {name: "CentralPlaza Pinklao (เซ็นทรัลพลาซา ปิ่นเกล้า)", name_th: "เซ็นทรัลพลาซา ปิ่นเกล้า", tel: "0858560316", geo: [13.778058, 100.476509]},  
            {name: "Esplanade Ratchada (เอสพลานาด รัชดาภิเษก)", name_th: "เอสพลานาด รัชดาภิเษก", tel: "0956145275", geo: [13.766557, 100.569557]},
            {name: "Supreme Complex (สุพรีม คอมเพล็กซ์)", name_th: "สุพรีม คอมเพล็กซ์", tel: "0803822842", geo: [13.789790, 100.515175]},
            {name: "Central Ladprao (เซ็นทรัล ลาดพร้าว)", name_th: "เซ็นทรัล ลาดพร้าว", tel: "0837912349", geo: [13.816290, 100.560997]},
            {name: "Tesco Lotus Ladprao (เทสโก้ โลตัส ลาดพร้าว)", name_th: "เทสโก้ โลตัส ลาดพร้าว", tel: "0637509369", geo: [13.817879, 100.563835]},       
            {name: "The Walk Ratchaphruek (เดอะวอล์ค ราชพฤกษ์)", name_th: "เดอะวอล์ค ราชพฤกษ์", tel: "0902560363", geo: [13.821344, 100.449768]},
            {name: "Tesco Lotus Bangyai (เทสโก้ โลตัส บางใหญ่)", name_th: "เทสโก้ โลตัส บางใหญ่", tel: "0644611397", geo: [13.823826, 100.410118]},
            {name: "Tesco Lotus Srinakarin (เทสโก้ โลตัส ศรีนครินทร์)", name_th: "เทสโก้ โลตัส ศรีนครินทร์", tel: "0902711842", geo: [13.620938, 100.620369]},
            {name: "Mega Bangna (เมกาบางนา)", name_th: "เมกาบางนา", tel: "0812044842", geo: [13.646594, 100.680199]},
            {name: "Paradise Park (พาราไดซ์ พาร์ค)", name_th: "พาราไดซ์ พาร์ค", tel: "0837946839", geo: [13.687696, 100.647614]},
            {name: "Seacon Square Srinakarin (ซีคอนสแควร์ ศรีนครินทร์)", name_th: "ซีคอนสแควร์ ศรีนครินทร์", tel: "0803626842", geo: [13.694823, 100.648279]},
            // {name: "Seacon Square Srinakarin (ซีคอนสแควร์ ศรีนครินทร์)", name_th: "ซีคอนสแควร์ ศรีนครินทร์", tel: "0803626842", geo: [13.694198, 100.647850]},
            {name: "Suvarnabhumi Airport (ท่าอากาศยานสุวรรณภูมิ ชั้น 3)", name_th: "ท่าอากาศยานสุวรรณภูมิ ชั้น 3", tel: "021346157", geo: [13.689999, 100.750112]},
            {name: "The Mall Ngamwongwan (เดอะมอลล์ งามวงศ์วาน)", name_th: "เดอะมอลล์ งามวงศ์วาน", tel: "0837916297", geo: [13.855129, 100.542099]},        
            {name: "CentralPlaza Rattanathibet (เซ็นทรัลพลาซา รัตนาธิเบศร์)", name_th: "เซ็นทรัลพลาซา รัตนาธิเบศร์", tel: "0803627615", geo: [13.866294, 100.497520]},
            {name: "CentralPlaza Westgate (เซ็นทรัลพลาซา เวสต์เกต)", name_th: "เซ็นทรัลพลาซา เวสต์เกต", tel: "0644527363", geo: [13.876104, 100.412125]},   
            {name: "CentralPlaza Ramintra (เซ็นทรัลพลาซา รามอินทรา)", name_th: "เซ็นทรัลพลาซา รามอินทรา", tel: "0973360646", geo: [13.872092, 100.601891]}, 
            {name: "CentralPlaza Chaengwattana (เซ็นทรัลพลาซา แจ้งวัฒนะ)", name_th: "เซ็นทรัลพลาซา แจ้งวัฒนะ", tel: "0910168363", geo: [13.903493, 100.528252]},
            {name: "Nawamin City Avenue (นวมินทร์ ซิตี้ อเวนิว)", name_th: "นวมินทร์ ซิตี้ อเวนิว", tel: "0902505568", geo: [13.834197, 100.610863]},
            {name: "Don Mueang Terminal 2 (ท่าอากาศยานดอนเมือง อาคาร 2)", name_th: "ท่าอากาศยานดอนเมือง อาคาร 2", tel: "025043853", geo: [13.918776, 100.601177]},
            {name: "Don Muang Airport (สนามบินดอนเมือง)", name_th: "สนามบินดอนเมือง", tel: "025043288", geo: [13.916496, 100.600397]},
            {name: "Future Park Rangsit Floor B1 (ฟิวเจอร์พาร์ค รังสิต ชั้น B1)", name_th: "ฟิวเจอร์พาร์ค รังสิต ชั้น B1", tel: "0803752568", geo: [13.989712, 100.616837]},
            {name: "Central Village Suvarnabhumi (เซ็นทรัล วิลเลจ สุวรรณภูมิ)", name_th: "เซ็นทรัล วิลเลจ สุวรรณภูมิ", tel: "0842870589", geo: [13.638518, 100.743439]},
            {name: "Bangkok Hospital (โรงพยาบาลกรุงเทพ)", name_th: "โรงพยาบาลกรุงเทพ", tel: "0845816125", geo: [13.749245, 100.583496]},
            {name: "The Avenue Ratchayothin (ดิ อเวนิว รัชโยธิน)", name_th: "ดิ อเวนิว รัชโยธิน", tel: "0803485646", geo: [13.827728, 100.567993]},
            {name: "People Park Onnuch (พีเพิล พาร์ค อ่อนนุช)", name_th: "พีเพิล พาร์ค อ่อนนุช", tel: "0644378869", geo: [13.711687, 100.608185]},
            {name: "Gateway at Bangsue (เกตเวย์ แอท บางซื่อ)", name_th: "เกตเวย์ แอท บางซื่อ", tel: "0644521823", geo: [13.805928, 100.523949]},
            {name: "PTT Sai Mai 56 (ปั๊มน้ำมันปตท. สายไหม 56)", name_th: "ปั๊มน้ำมันปตท. สายไหม 56", tel: "0845894019", geo: [13.920459, 100.660057]},      
            {name: "Active Park Muang Thong Thani (แอคทีฟ พาร์ค เมืองทองธานี)", name_th: "แอคทีฟ พาร์ค เมืองทองธานี", tel: "0637699259", geo: [13.889260, 100.519658]},
            {name: "Robinson Srisamarn (โรบินสัน ศรีสมาน)", name_th: "โรบินสัน ศรีสมาน", tel: "0969866087", geo: [13.939921, 100.553162]},
            {name: "Tesco Lotus Tiwanon (เทสโก้ โลตัส ติวานนท์)", name_th: "เทสโก้ โลตัส ติวานนท์", tel: "0973256621", geo: [13.919312, 100.515816]},       
            {name: "Tesco Lotus Liap Khong Song (เทสโก้ โลตัส เลียบคลองสอง)", name_th: "เทสโก้ โลตัส เลียบคลองสอง", tel: "0834429240", geo: [13.860312, 100.700188]},
            {name: "U Chu Ling Building (อาคารอื้อจือเหลียง)", name_th: "อาคารอื้อจือเหลียง", tel: "0834691363", geo: [13.727187, 100.540939]},
            {name: "Robinson Suphanburi (โรบินสัน สุพรรณบุรี)", name_th: "โรบินสัน สุพรรณบุรี", tel: "0956046092", geo: [14.458195, 100.129471]},
            {name: "Tesco Lotus The Walk Nakhonsawan (เทสโก้ โลตัส เดอะวอล์ค นครสวรรค์)", name_th: "เทสโก้ โลตัส เดอะวอล์ค นครสวรรค์", tel: "0918278501", geo: [15.701676, 100.122496]},
            {name: "Central Ayutthaya (เซ็นทรัล อยุธยา)", name_th: "เซ็นทรัล อยุธยา", tel: "0969866021", geo: [14.369232, 100.587662]},
            {name: "PTT Rangsit Klong 2 (ปตท.รังสิต คลอง 2)", name_th: "ปตท.รังสิต คลอง 2", tel: "0969866062", geo: [13.991938, 100.648170]},
            {name: "Tesco Lotus Nakhonsawan (เทสโก้ โลตัส นครสวรรค์)", name_th: "เทสโก้ โลตัส นครสวรรค์", tel: "0918278501", geo: [15.707900, 100.094719]}, 
            {name: "The Mall Korat (เดอะมอลล์ โคราช)", name_th: "เดอะมอลล์ โคราช", tel: "0910120064", geo: [14.980730, 102.076408]},
            {name: "CentralPlaza Khonkaen (เซ็นทรัลพลาซา ขอนแก่น)", name_th: "เซ็นทรัลพลาซา ขอนแก่น", tel: "0956052686", geo: [16.432901, 102.825584]},     
            {name: "CentralPlaza Udonthani (เซ็นทรัลพลาซา อุดรธานี)", name_th: "เซ็นทรัลพลาซา อุดรธานี", tel: "0964035587", geo: [17.406216, 102.800385]},  
            {name: "CentralPlaza Nakhon Ratchasima (เซ็นทรัลพลาซา นครราชสีมา)", name_th: "เซ็นทรัลพลาซา นครราชสีมา", tel: "0956052213", geo: [14.996966, 102.116341]},
            {name: "CentralPlaza Ubon Ratchathani (เซ็นทรัลพลาซา อุบลราชธานี)", name_th: "เซ็นทรัลพลาซา อุบลราชธานี", tel: "0973392132", geo: [15.240301, 104.823318]},
            {name: "Terminal 21 Pattaya (เทอร์มินอล 21 พัทยา)", name_th: "เทอร์มินอล 21 พัทยา", tel: "0813796316", geo: [12.950206, 100.888680]},
            {name: "CentralPlaza Rayong (เซ็นทรัลพลาซา ระยอง)", name_th: "เซ็นทรัลพลาซา ระยอง", tel: "0912901273", geo: [12.696020, 101.268478]},
            {name: "Samitivej Chonburi Hospital (โรงพยาบาลสมิติเวช ชลบุรี)", name_th: "โรงพยาบาลสมิติเวช ชลบุรี", tel: "0973372769", geo: [13.344851, 100.976135]},
            {name: "Passione Shopping Destination (แพชชั่น ช้อปปิ้ง เดสติเนชั่น)", name_th: "แพชชั่น ช้อปปิ้ง เดสติเนชั่น", tel: "0912410059", geo: [12.683608, 101.249069]},
            {name: "Central Si Racha (เซ็นทรัล ศรีราชา)", name_th: "เซ็นทรัล ศรีราชา", tel: "0809955041", geo: [13.179882, 100.931320]},
            {name: "Robinson Chachoengsao (โรบินสัน ฉะเชิงเทรา)", name_th: "โรบินสัน ฉะเชิงเทรา", tel: "0969866064", geo: [13.667864, 101.048470]},
            {name: "Robinson Chonburi (โรบินสัน ชลบุรี)", name_th: "โรบินสัน ชลบุรี", tel: "0902973923", geo: [13.405724, 101.041519]},
            {name: "Central Chanthaburi (เซ็นทรัล จันทบุรี)", name_th: "เซ็นทรัล จันทบุรี", tel: "", geo: [12.599011, 102.124329]},
            {name: "Bluport Huahin (บลูพอร์ต หัวหิน)", name_th: "บลูพอร์ต หัวหิน", tel: "0902343724", geo: [12.547675, 99.962334]},
            {name: "Robinson Lifestyle Kanchanaburi (โรบินสันไลฟ์สไตล์ กาญจนบุรี)", name_th: "โรบินสันไลฟ์สไตล์ กาญจนบุรี", tel: "0956051320", geo: [14.023052, 99.552956]},
            {name: "Market Village HuaHin (มาร์เก็ต วิลเลจ หัวหิน)", name_th: "มาร์เก็ต วิลเลจ หัวหิน", tel: "0956019618", geo: [12.557621, 99.959557]},
            {name: "CentralFestival Hatyai (เซ็นทรัลเฟสติวัล หาดใหญ่)", name_th: "เซ็นทรัลเฟสติวัล หาดใหญ่", tel: "0902605306", geo: [6.991595, 100.482941]},
            {name: "Robinson Trang (โรบินสัน ตรัง)", name_th: "โรบินสัน ตรัง", tel: "0910181038", geo: [7.563668, 99.626427]},
            {name: "Tesco Lotus Phuket (เทสโก้ โลตัส ภูเก็ต)", name_th: "เทสโก้ โลตัส ภูเก็ต", tel: "0832491291", geo: [7.904533, 98.369251]},
            {name: "CentralFestival Phuket (เซ็นทรัลเฟสติวัล ภูเก็ต)", name_th: "เซ็นทรัลเฟสติวัล ภูเก็ต", tel: "0973405832", geo: [7.891669, 98.368107]},  
            {name: "Big C Extra Hatyai (บิ๊กซีเอ็กซ์ตร้า หาดใหญ่)", name_th: "บิ๊กซีเอ็กซ์ตร้า หาดใหญ่", tel: "0637708043", geo: [7.038221, 100.467857]},   
            {name: "CentralFestival Samui (เซ็นทรัลเฟสติวัล สมุย)", name_th: "เซ็นทรัลเฟสติวัล สมุย", tel: "0956101460", geo: [9.532388, 100.061888]},      
            {name: "CentralPlaza Nakhon Si Thammarat (เซ็นทรัลพลาซา นครศรีธรรมราช)", name_th: "เซ็นทรัลพลาซา นครศรีธรรมราช", tel: "0902396091", geo: [8.381051, 99.969696]},
            {name: "Tesco Lotus Samgong Phuket (เทสโก้ โลตัส สามกอง ภูเก็ต)", name_th: "เทสโก้ โลตัส สามกอง ภูเก็ต", tel: "0832491291", geo: [7.904562, 98.369316]},
        ]
    },
    "HuaplaChongnonsea": {
        "INFO": {

        },
        "branches": [
            {name: "พระราม 3", tel: "02-294-4960, 088-874-4782", geo: [13.690309, 100.547057]},
            {name: "ศรีนครินทร์", tel: "", geo: [13.655676, 100.6427]},
            {name: "บางนา-ตราด กม.5", tel: "", geo: [13.664516,100.653645]},
            {name: "รามอินทรา กม. 13", tel: "", geo: [13.812243,100.70104]},
            {name: "นครอินทร์", tel: "", geo: [13.822137,100.439314]},
            {name: "สามแยกปักธงชัย โคราช", tel: "", geo: [14.94530833,102.0534393]},
            {name: "เมกาบางนา", tel: "", geo: [13.645284,100.680109]},
            {name: "เทอร์มินอล21 โคราช", tel: "", geo: [14.982,102.09]},
            // {name: "สำนักงานใหญ่", tel: "02-385-7022-24, 085-906-0611", geo: []},
        ]
    },
    "AMOR": {
        "INFO": {

        },
        "branches": [
            {name: "Central Ladprao", name_th: "", tel: "02-116-7400", geo: [13.8163264,100.5607534],type: "dine in"},
            {name: "Central Rama 3", name_th: "", tel: "02-212-5257", geo: [13.697567,100.5375824],type: "dine in"},
            {name: "Central Chaengwattana", name_th: "", tel: "02-407-9039", geo: [13.9034928,100.5282496],type: "dine in"},
            {name: "Central Rama 9", name_th: "", tel: "02-103-4877", geo: [13.7584066,100.5660782],type: "dine in"},
            {name: "Future Park Rangsit", name_th: "", tel: "02-567-6153", geo: [13.9897121,100.6168391],type: "dine in"},
            {name: "Fashion Island", name_th: "", tel: "02-947-5811", geo: [13.8247283,100.6782607],type: "dine in"},
            {name: "Terminal 21 (Asok)", name_th: "", tel: "02-115-8255", geo: [],type: "dine in"},
            {name: "Market Place Nanglinchee", name_th: "", tel: "02-287-2536", geo: [13.7099594,100.5431394],type: "dine in"},
            {name: "Thonglor", name_th: "", tel: "02-102-6457", geo: [13.7242156,100.5793398],type: "dine in"},
            {name: "Sun Towers", name_th: "", tel: "02-617-6449", geo: [13.808208,100.5587078],type: "dine in"},
            {name: "All Seasons Place", name_th: "", tel: "02-074-8780", geo: [13.7394596,100.5473702],type: "dine in"},
            {name: "Muang Thai Pattara Complex", name_th: "", tel: "02-054-4844", geo: [13.7869915,100.5748125],type: "dine in"},
            {name: "Siam Center", name_th: "", tel: "095-714-3255", geo: [],type: "dine in"},
            {name: "Central Rama 2", name_th: "", tel: "095-118-0909, 02-872-4144", geo: [],type: "take away"},
            {name: "Central WestGate", name_th: "", tel: "091-871-4704", geo: [13.876104,100.412125],type: "take away"},
            {name: "Central EastVille", name_th: "", tel: "095-165-7701", geo: [13.8033456,100.6143248],type: "take away"},
            {name: "Central Pinklao", name_th: "", tel: "02-115-9355", geo: [13.7782739,100.4761901],type: "take away"},
            {name: "Central Bangna", name_th: "", tel: "02-745-7133", geo: [13.6695566,100.6346283],type: "take away"},
            {name: "Mega Bangna", name_th: "", tel: "02-105-1562", geo: [13.646594,100.6801987],type: "take away"},
            {name: "The Mall Bangkae", name_th: "", tel: "097-201-0083", geo: [13.7136869,100.4079409],type: "take away"},
            {name: "Silom Complex", name_th: "", tel: "02-231-3185", geo: [13.7281905,100.5350653],type: "take away"},
            {name: "Robinson Bangrak", name_th: "", tel: "02-234-4029", geo: [13.7197206,100.5152759],type: "take away"},
            {name: "Big C Suksawat", name_th: "", tel: "02-463-9337", geo: [13.6531707,100.5213722],type: "take away"},
            {name: "Lotus's Prachachuen", name_th: "", tel: "02-910-4288", geo: [13.8063052,100.5340641],type: "take away"},
            {name: "Chan Road", name_th: "", tel: "02-286-3887", geo: [13.706657,100.5236411],type: "take away"},
            {name: "Samyan Mitrtown", name_th: "", tel: "095-905-2720", geo: [],type: "take away"},
        ]
    },
    "IKEA": {
        "INFO": {

        },
        "branches": [
            {name: "Bangna", name_th: "บางนา", tel: "", geo: [13.6444384,100.6796627]},
            {name: "Bang Yai", name_th: "บางใหญ่", tel: "", geo: [13.878507,100.412798]},
            {name: "Phuket", name_th: "ภูเก็ต", tel: "", geo: [7.936796, 98.378680]},
            {name: "Emsphere", name_th: "", tel: "", geo: []},
        ]
    },
    "indexlivingmall": {
        "INFO": {

        },
        "branches": [
            {name: "Ekkamai", name_th: "เอกมัย", tel: "027148300", geo: [13.726628, 100.585486]},
            {name: "Bangna (บางนา) ", name_th: "บางนา", tel: "023480707", geo: [13.665728, 100.650668]},
            {name: "The Walk Kaset Nawamin", name_th: "เดอะวอล์ค เกษตร-นวมินทร์", tel: "021082940", geo: [13.828686, 100.625733]},
            {name: "The Walk Ratchaphruek", name_th: "เดอะวอล์ค ราชพฤกษ์", tel: "024896900", geo: [13.821353, 100.449911]},
            // {name: "Central Bangna", name_th: "เซ็นทรัล บางนา", tel: "023480707", geo: [13.669557, 100.634628]},
            {name: "The Mall Bangkae", name_th: "เดอะมอลล์ บางแค", tel: "024549634", geo: [13.713687, 100.407941]},
            {name: "Fashion Island Ramindra", name_th: "แฟชั่นไอส์แลนด์-รามอินทรา", tel: "029476216", geo: [13.824728, 100.678261]},
            {name: "Bang Yai", name_th: "บางใหญ่", tel: "025950900", geo: [13.877153, 100.408776]},
            {name: "Rangsit", name_th: "รังสิต", tel: "029585099", geo: [13.992088, 100.618385]},
            {name: "Rattanathibet", name_th: "รัตนาธิเบศร์", tel: "029699264", geo: [13.866667, 100.495556]},
            {name: "Seacon Square Srinakarin", name_th: "ซีคอน ศรีนครินทร์", tel: "027219303", geo: [13.694879, 100.648273]},
            {name: "Rama 2", name_th: "พระราม 2", tel: "020331888", geo: [13.665991, 100.443619]},
            {name: "Lat Krabang", name_th: "ลาดกระบัง", tel: "", geo: [13.722563, 100.725937]},
            // {name: "Rangsit", name_th: "รังสิต", tel: "029585099", geo: [13.992088, 100.618385]},
            {name: "Ekachai", name_th: "เอกชัย", tel: "", geo: [13.627402, 100.379478]},
            {name: "Mahachai", name_th: "มหาชัย", tel: "034836450", geo: [13.563438, 100.279845]},
            {name: "Nakhon Pathom", name_th: "นครปฐม", tel: "034213670", geo: [13.813920, 100.082428]},
            {name: "The Walk Nakhonsawan", name_th: "เดอะวอล์ค นครสวรรค์", tel: "056313099", geo: [15.701597, 100.121890]},
            {name: "Phitsanulok", name_th: "พิษณุโลก", tel: "055224515", geo: [16.816084, 100.315389]},
            {name: "Nakhon Ratchasima", name_th: "นครราชสีมา", tel: "044276880", geo: [15.018233, 102.130333]},
            {name: "Surin", name_th: "สุรินทร์", tel: "044091260", geo: [14.878905, 103.523565]},
            {name: "KHON KAEN", name_th: "ขอนแก่น", tel: "043472600", geo: [16.397724, 102.814927]},
            {name: "Udonthani", name_th: "อุดรธานี", tel: "042309044", geo: [17.416182, 102.814772]},
            {name: "Ubon Ratchathani", name_th: "อุบลราชธานี", tel: "045283500", geo: [15.261785, 104.845985]},
            {name: "Chiang Mai", name_th: "เชียงใหม่", tel: "053851700", geo: [18.795563, 99.022792]},
            {name: "Chachoengsao", name_th: "ฉะเชิงเทรา", tel: "033056280", geo: [13.680565, 101.052433]},
            {name: "Chonburi", name_th: "ชลบุรี", tel: "038383333", geo: [13.312922, 100.955679]},
            {name: "Winner Furniture Ratchaburi", name_th: "วินเนอร์ เฟอร์นิเจอร์ สาขา ราชบุรี", tel: " 032920180", geo: [13.547030, 99.806624]}, 
            {name: "Pattaya", name_th: "พัทยา", tel: "038716859", geo: [12.934758, 100.901157]},
            {name: "Rayong", name_th: "ระยอง", tel: "038873760", geo: [12.698500, 101.255729]},
            {name: "Chanthaburi", name_th: "จันทบุรี", tel: "039608990", geo: [12.605761, 102.133319]},
            {name: "Hua Hin", name_th: "หัวหิน", tel: "032547565", geo: [12.599449, 99.950558]},
            {name: "Surat Thani", name_th: "สุราษฎร์ธานี", tel: "077968300", geo: [9.108475, 99.294701]},
            {name: "Nakhonsrithammarat", name_th: "นครศรีธรรมราช", tel: "075312600", geo: [8.461270, 99.964254]},
            {name: "Phuket", name_th: "ภูเก็ต", tel: "076249541", geo: [7.899238, 98.367880]},
            {name: "Hat Yai", name_th: "หาดใหญ่", tel: "074892400", geo: [6.999453, 100.447683]},
        ]
    },
    "Somboon Seafood": {
        "INFO": {

        },
        "branches": [
            {name: "Bantadthong", name_th: "บรรทัดทอง", tel: "02-216-4203-5", geo: [13.745208, 100.5237093], addr: "895/6-21 ซ.จุฬาฯ 8 ถ.บรรทัดทอง แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330"},
            {name: "Surawong", name_th: "สุรวงศ์", tel: "02-233-3104, 02-234-4499", geo: [13.7282182, 100.5266623], addr: "169,169/7-12 ถ.สุรวงศ์ แขวงสุริยวงศ์ เขตบางรัก กรุงเทพฯ 10500"},
            {name: "Ratchada", name_th: "รัชดา", tel: "02-692-6850-2", geo: [13.7778757, 100.5732234], addr: "167/9-12 สี่แยกห้วยขวาง ถ.รัชดาภิเษก แขวงดินแดง เขตดินแดง กรุงเทพฯ 10400"},
            {name: "Udom Suk (Bangna)", name_th: "อุดมสุข (บางนา)", tel: "02-746-6850-2", geo: [13.6777191, 100.6419156], addr: "26 ซ.อุดมสุข 60 ถ.สุขุมวิท 103 แขวงหนองบอน เขตประเวศ กรุงเทพฯ 10250"},
            {name: "Samyan", name_th: "สามย่าน", tel: "02-160-5100", geo: [13.7329793, 100.5303844], addr: "315 อาคารจามจุรีสแควร์ ชั้น G ถ.พญาไท เขตปทุมวัน กรุงเทพฯ 10330"},
            {name: "Central Embassy", name_th: "เซ็นทรัลเอ็มบาสซี", tel: "02-160-5965-6", geo: [13.7438568, 100.5461597], addr: "ช้ัน 5 เซ็นทรัลเอ็มบาสซี่ 1031 ถ.เพลินจิต แขวงลุมพินี เขตปทุมวัน กรุงเทพฯ 10330"},
            {name: "Siam Square One (SQ1)", name_th: "สยามสแควร์วัน (SQ1)", tel: "02-115-1401-2", geo: [13.744800, 100.533891], addr: "ชั้น 4 อาคารสยามสแควร์วัน 388 ถ.พระราม 1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330"},
            {name: "CentralWorld", name_th: "เซ็นทรัลเวิลด์", tel: "02-090-6602", geo: [13.7470625, 100.5392044], addr: "C602 ชั้น 6 ศูนย์การค้าเซ็นทรัลเวิลด์ เลขที่ 4, 4/1-4/2, 4/4 ถ.ราชดําริห์ แขวงปทุมวัน เขตปทุมวัน กรุงเทพฯ 10330"},
        ]
    },
    "Mont Nomsod": {
        "INFO": {
            "FB" : `https://www.facebook.com/montnomsod.official`,
            "Wongnai" : `https://www.wongnai.com/chains/montnomsod`,
        },
        "branches": [
            {name: "The Giant Swing", name_th: "เสาชิงช้า", tel: "", geo: [13.754191,100.50117], addr: "",r: 1300},
            // {name: "MBK", name_th: "มาบุญครอง ชั้น 2", tel: "02-048-4898", geo: [], addr: "อยู่ฝั่งโรงแรมปทุมวันปริ๊นเซส อาคารมาบุญครองเซ็นเตอร์ ถนนพญาไท แขวงวังใหม่ เขตปทุมวัน กรุงเทพฯ 10330"},
            {name: "Rama 1", name_th: "", tel: "", geo: [13.747213,100.524278], addr: "",r: 1300},
            {name: "Mae Rim", name_th: "เชียงใหม่ แม่ริม", tel: "", geo: [18.92233, 98.94019], addr: ""},
            {name: "Mae Hia", name_th: "เชียงใหม่ แม่เหียะ", tel: "", geo: [18.74891, 98.94244], addr: ""},
            {name: "Nimmanahaeminda", name_th: "เชียงใหม่ นิมมานเหมินท์", tel: "", geo: [18.79796, 98.96671], addr: ""},
            {name: "Itsaraphap", name_th: "อิสรภาพ นันทอุทยาน", tel: "", geo: [13.751223,100.478472], addr: "",r: 1300},
        ]
    },
    "True Space": {
        "INFO": {
            
        },
        "branches": [
            {name: "True Digital Park", name_th: "True Digital Park", tel: "", geo: [], addr: "",r: 1000},
            {name: "Siam Square Soi 2", name_th: "สยามสแควร์ ซอย 2 ชั้น 3-4", tel: "090-970-4587", geo: [13.745723,100.532062], addr: "เลขที่ 232/5 สยามสแควร์ ซอย2 ถนน พระราม 1 เขตปทุมวัน กทม 10330",r: 1000},
            {name: "Centerpoint of Siam Square", name_th: "เซ็นเตอร์พอยต์ ออฟ สยามสแควร์ ชั้น 4", tel: "090-971-0219", geo: [13.745279,100.533438], addr: "เลขที่ 411 อาคาร Centerpoint of Siam Square ชั้น 4 ซอยสยามสแควร์ ถนนพระราม1 แขวงปทุมวัน เขตปทุมวัน กรุงเทพมหานคร 10330",r: 1000},
            {name: "Asoke", name_th: "อโศก", tel: "", geo: [], addr: "",r: 1000},
            {name: "iconsiam", name_th: "ไอคอนสยาม ชั้น 4", tel: "090-971-4415", geo: [13.72628,100.510166], addr: "เลขที่ 299 ถนน เจริญนคร แขวง คลองต้นไทร เขต คลองสาน กรุงเทพมหานคร 10600",r: 1000},
            // {name: "", name_th: "มหาวิทยาลัยหอการค้าไทย", tel: "", geo: [], addr: "",r: 1000},
            {name: "Rangsit University", name_th: "มหาวิทยาลัยรังสิต", tel: "090-971-5764", geo: [13.964251,100.586694], addr: "เลขที่ 52/347 หมู่ที่ 7 อาคารพิฆเณศ Student Center ชั้น 1 มหาวิทยาลัยรังสิต ตำบลหลักหก อำเภอเมือง จังหวัดปทุมธานี 12000",r: 1000},
            {name: "Mahidol University TH", name_th: "มหาวิทยาลัยมหิดล ศาลายา", tel: "090-971-5283", geo: [13.800951,100.320456], addr: "999 อาคารสิริวัฒนภักดี ถนน พุทธมณฑลสาย 4 Salaya, Phutthamonthon District, Nakhon Pathom 73170",r: 1000},
            {name: "Maha Sarakham", name_th: "เสริมไทยคอมเพล็กซ์ มหาสารคาม", tel: "064 703 4278", geo: [16.201232,103.276606], addr: "เสริมไทยคอมเพลกซ์ เลขที่ 76/1-7 ถนนนครสวรรค์ (ห้อง EX-RES201 ชั้น 2) ตำบล ตลาด อำเภอเมือง มหาสารคาม 44000",r: 1000},
            {name: "Ubonratchathani", name_th: "Y-Square อุบลราชธานี", tel: "090-971-6325", geo: [15.247868,104.843255], addr: "เลขที่ 50 ถนนแจ้งสนิท ตำบลในเมือง อำเภอเมือง อุบลราชธานี 34000",r: 1000},
            // {name: "", name_th: "", tel: "", geo: [], addr: "",r: 1000},
        ]
    },
}
var markers = L.markerClusterGroup()

const ADDEDBRANDS = [
    {name: 'Gold Curry Bangkok',dspname: 'Gold Curry',type: 'curry'},
    {name: 'CoCoICHIBANYA Thailand',dspname: 'CoCo ICHIBANYA',type: 'curry'},
    {name: 'OHKAJHU',dspname: 'OHKAJHU',type: 'salad'},
    {name: 'Jones Salad',dspname: 'JonesSalad',type: 'salad'},
    {name: 'After You',dspname: 'After You',type: 'dessert'},
    {name: 'Daddy Dough',dspname: 'Daddy Dough',type: 'donut'},
    {name: 'Fuji Restaurant',dspname: 'Fuji Restaurant',type: 'food'},
    {name: 'HuaplaChongnonsea',dspname: 'หัวปลาช่องนนทรี',type: 'sea'},
    {name: 'AMOR',dspname: 'AMOR',type: 'dessert'},
    {name: 'IKEA',dspname: 'อิเกีย',type: 'furniture'},
    {name: 'indexlivingmall',dspname: 'อินเด็กซ์ ลิฟวิ่งมอลล์',type: 'furniture'},
    {name: 'Somboon Seafood',dspname: 'สมบูรณ์โภชนา',type: 'sea'},
    {name: 'Mont Nomsod',dspname: 'มนต์ นมสด',type: 'milk'},
    {name: 'True Space',dspname: 'ทรูสเปซ',type: 'cowork'},
]

const SELECTRANDOM = [
    `curry`
    ,`salad`
    ,`dessert`
    ,`donut`
    ,`food`
    ,`milk`
    // ,`furniture`
]

const get_random = (list) => {
    return list[Math.floor((Math.random()*list.length))]
}

const SELECT = searchParam.get(`s`) ?? get_random(SELECTRANDOM)

const DISPLAYBRANDS = []
const REGEXIGNORECASE = `i`

for (let brand of ADDEDBRANDS) {
    if (brand.type === SELECT 
        || new RegExp(SELECT, REGEXIGNORECASE).test(brand.dspname)
        || new RegExp(SELECT, REGEXIGNORECASE).test(brand.name)
        ) {
        DISPLAYBRANDS.push(brand)
    }
}

const genAddr = (branch) => {
    if (branch.addr) return `<h6>Address: ${branch.addr}</h6>`
    return ``
}
const genTel = (branch) => {
    if (branch.tel) return `<h6>TEL: ${branch.tel.replace(/\s/g,"-")}</h6>`
    return ``
}


const ADDMARKER = (brand) => {
    let c = 0
    for (let branch of BRANDS[brand.name]['branches']) {
        if (branch.geo.length === 2) {
            c++
            markers.addLayer(L.marker(new L.LatLng(...branch.geo))
            .bindPopup(`<h2>${brand.dspname} ${branch.name}</h2>
            ${genAddr(branch)}
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
            if (branch.r) {
                L.donut(branch.geo, {
                    radius: branch.r,
                    innerRadius: 0,
                    innerRadiusAsPercent: false,
                }).addTo(map)
            }
        }
    }
    console.log(c)
}

DISPLAYBRANDS.map(ADDMARKER)

map.addLayer(markers)
