"use strict";
// https://www.youtube.com/watch?v=i3sFfqq3N4Q
// https://stackoverflow.com/a/46410816/13237580
moment.suppressDeprecationWarnings = true;
const DICT = {
    "BAHT" : {
        "th" : `บาท`,
        "en" : `Baht`,
    },
    "STOPS" : {
        "th" : `สถานี`,
        "en" : `STOPS`,
    },
}
const searchParam = new URLSearchParams(location.search)
const lang = searchParam.get(`lang`) ?? `en`
const LatLngToArrayString = (ll) => {
    return `[${ll.lat.toFixed(5)}, ${ll.lng.toFixed(5)}]`
}
const CORP = {
    "BTS": {
        "TH": {
            "Full": "บริษัท ระบบขนส่งมวลชนกรุงเทพ จำกัด (มหาชน)",
            "Service Hours" : {
                "Open": "6:00",
                "Closed": "0:00"
            },
        },
        "EN": {
            "Full": "Bangkok Mass Transit System. Public Company Limited",
            "Service Hours" : {
                "Open": "6am",
                "Closed": "12am"
            }
        },
        "OTHERINFO": {
            "Tourist Information Centers" : "02 617 7341",
            "CALL CENTER" : "02 617 6000",
            "Website": "www.bts.co.th",
            "App": {
                "iOS": "https://apps.apple.com/th/app/bts-skytrain/id1405046331",
                "Android": "https://play.google.com/store/apps/details?id=com.bts.skytrain",
            },
            "Facebook": "facebook.com/BTSSkyTrain/",
            "Line Official": "@btsskytrain",
            "Twitter": "@BTS_SkyTrain",
        }
    },
    "MRT": {
        "BLUE": {
            "Service Hours" : {
                "Open": "6:00",
                "Closed": "0:00"
            },
            "FareLog" : 
            {
                "7/3/2022": {
                    "normal": {
                        1: 17,
                        2: 19,
                        3: 21,
                        4: 24,
                        5: 26,
                        6: 28,
                        7: 31,
                        8: 33,
                        9: 35,
                        10: 38,
                        11: 40,
                        12: 42,
                    },
                    "student": {
                        1: 15,
                        2: 17,
                        3: 19,
                        4: 22,
                        5: 23,
                        6: 25,
                        7: 28,
                        8: 30,
                        9: 32,
                        10: 34,
                        11: 36,
                        12: 38,
                    }
                },
                "1/1/2023": {
                    "Normal": {
                        1: 17,
                        2: 19,
                        3: 21,
                        4: 24,
                        5: 26,
                        6: 29,
                        7: 31,
                        8: 33,
                        9: 36,
                        10: 38,
                        11: 41,
                        12: 43,
                    },
                },
            }, 
            "MaxTrain": 54
        },
        "PURPLE": {
            "Service Hours" : {
                "WEEKDAY" : {
                    "Open": "5:30",
                    "Closed": "0:00"
                },
                "WEEKEND" : {
                    "Open": "6:00",
                    "Closed": "0:00"
                },
            },
            "MaxTrain": 21
        },
        "TH": {
            "Full": "บริษัท ทางด่วนและรถไฟฟ้ากรุงเทพ จำกัด (มหาชน)",
        },
        "EN": {
            "Full": "Bangkok Expressway and Metro Public Company Limited (BEM)",
        },
        "OTHERINFO": {
            "CALL CENTER" : "0 2624 5200",
            "Website": "https://metro.bemplc.co.th/",
            "App": {
                "iOS": "https://itunes.apple.com/us/app/bangkok-mrt/id662068031?mt=8",
                "Android": "https://play.google.com/store/apps/details?id=com.devsenses.mrt_app&hl=th",
            },
            "Facebook": "https://www.facebook.com/BEM.MRT",
            "IG": "https://www.instagram.com/mrt_bangkok/",
            "Twitter": "https://twitter.com/bem_mrt",
            "MaxSpeed": "50 mph"
        }
    },
    "ARL": {
        "TH": {
            "Full": "รถไฟฟ้าแอร์พอร์ต เรล ลิงก์",
            "Service Hours" : {
                "Open": "5:30",
                "Closed": "0:00"
            },
        },
        "EN": {
            "Full": "Airport Rail Link",
            "Service Hours" : {
                "Open": "5.30am",
                "Closed": "12am"
            }
        },
        "FareLog": {
            "11/1/2018": {
                "Normal": {
                    1: 15,
                    2: 20,
                    3: 25,
                    4: 30,
                    5: 35,
                    6: 40,
                    7: 45
                },
            },
        },
        "OTHERINFO": {
            "Tourist Information Centers" : "02 617 7341",
            "CALL CENTER" : "02 617 6000",
            "Website": "www.bts.co.th",
            "App": {
                "iOS": "https://apps.apple.com/th/app/bts-skytrain/id1405046331",
                "Android": "https://play.google.com/store/apps/details?id=com.bts.skytrain",
            },
            "Facebook": "facebook.com/BTSSkyTrain/",
            "Line Official": "@btsskytrain",
            "Twitter": "@BTS_SkyTrain",
            "MaxSpeed": "75 mph"
        }
    },
    "SRTR": {
        "TH": {
            "Full": "บริษัท รถไฟฟ้า ร.ฟ.ท. จำกัด"
        },
        "FareLog" : {
            
        },
        "FareNote" : "อัตราค่าโดยสารคิดตามระยะทาง กิโลเมตรละ 1.50 บาท",
        "OTHERINFO": {
            "Website": "https://www.srtet.co.th/",
        }
    },
    "BRT": {
        "TH": {
            "Full": "บริษัท กรุงเทพธนาคม จำกัด",
        },
        "FareLog" : {
            "5/29/2017": {
                "normal": 15,
                "student": 11,
                "60+": 0,
                "disabled person": 0,
                "student wearing school uniform": 0,
                "salmon": 0,
            }
        },
        "OTHERINFO": {
            "Address": `เลขที่ 2 ซอยรามคำแหง 40 แยก 2 ถนนรามคำแหง แขวงหัวหมาก เขตบางกะปิ กรุงเทพมหานคร 10240`,
            "CALL CENTER": "02-168-3368",
            "FAX": "02-168-3369",
            "Website": "https://www.thanakom.co.th/",
        }
    }
}
const ICONPROPS = {
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    shadowSize: [68, 95],
    shadowAnchor: [22, 94]
}
const BRTPROPS = {
    iconSize: [30, 30]
}
const BTSLIGHTGREENLINEICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-lightgreen.png',
    ...ICONPROPS
})
const BTSDARKGREENLINEICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-green.png',
    ...ICONPROPS
})
const BTSGOLDLINEICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-gold.png',
    ...ICONPROPS
})
const MRTBLUELINEICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-blue.png',
    ...ICONPROPS
    // สายเฉลิมรัชมงคล
})
const MRTPURPLELINEICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-purple.png',
    ...ICONPROPS
    // สายฉลองรัชธรรม
})
const MRTPINKLINEICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-pink.png',
    ...ICONPROPS
})
const MRTORANGELINEICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-orange.png',
    ...ICONPROPS
})
const MRTYELLOWLINEICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-yellow.png',
    ...ICONPROPS
})
const ARLICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-red.png',
    ...ICONPROPS
})
const SRTREDLINEICON = L.icon({
    iconUrl: '../src/images/marker-icon-2x-softred.png',
    ...ICONPROPS
})
const BRTICON = L.icon({
    iconUrl: '../src/images/1200px-Bangkok_BRT_logo.png',
    ...BRTPROPS
})
var map, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure
map = L.map(`mapdiv`, {
    center: [13.744256, 100.5334],
    zoom: 15,
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
const BRT = [
    {
        name: "สาทร",
        en: "Sathon",
        id: "B1",
        latlng: [13.7214, 100.53054],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "อาคารสงเคราะห์",
        en: "Akhan Songkhro",
        id: "B2",
        latlng: [13.71704, 100.532638],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "เทคนิคกรุงเทพ",
        en: "Technic Krungthep",
        id: "B3",
        latlng: [13.712441, 100.534998],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ถนนจันทน์",
        en: "Thanon Chan",
        id: "B4",
        latlng: [13.704787, 100.538925],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "นราราม 3",
        en: "Nararam III",
        id: "B5",
        latlng: [13.696464, 100.545279],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "วัดด่าน",
        en: "Wat Dan",
        id: "B6",
        latlng: [13.674225, 100.543152],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "วัดปริวาส",
        en: "Wat Pariwat",
        id: "B7",
        latlng: [13.674679, 100.534258],
        bannergress: [{
            path: "the-great-king-bhumibol-bridge-cc32",
            bg: "2ec8a21ccb9d390be4fd9ff0d3bd6605",
            w: 480,
            h: 240,
        }],
    },
    {
        name: "วัดดอกไม้",
        en: "Wat Dokmai",
        id: "B8",
        latlng: [13.682389, 100.525374],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "สะพานพระรามเก้า",
        en: "Rama IX Bridge",
        id: "B9",
        latlng: [13.688207, 100.515456],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "เจริญราษฎร์",
        en: "Charoenrat",
        id: "B10",
        latlng: [13.690282, 100.504201],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "สะพานพระรามสาม",
        en: "Rama III Bridge",
        id: "B11",
        latlng: [13.693937, 100.500054],
        bannergress: [{
            path: "สะพานภูมิพล-bhumibol-bridge-35d2",
            bg: "d0425562ae65d75625a827ce41ecfed3",
            w: 480,
            h: 320,
        }],
    },
    {
        name: "ราชพฤกษ์",
        en: "Ratchapruek",
        id: "B12",
        latlng: [13.715899, 100.478951],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
]
BRT.forEach(station => {
    station.icon = BRTICON
    station.fare = CORP["BRT"]["FareLog"]["5/29/2017"]
    station.type = `BRT`
    station.radius = 500
})
const ARL = [
    {
        name: "สุวรรณภูมิ",
        en: "Suvarnabhumi Airport",
        id: "",
        latlng: [13.694218, 100.751324],
        bannergress: [{
            path: "suvarnabhumi-international-airport-0e44",
            bg: "e4d1fec47e50a6f1f69a6d8a5d813461",
            w: 480,
            h: 240
        }],
        since: "8/23/2010",
    },
    {
        name: "ลาดกระบัง",
        en: "Lad Krabang",
        id: "",
        latlng: [13.727719, 100.748599],
        bannergress: [{
            path: "タイの桜-b601",
            bg: "1cb4935c390b542d58371673f1619626",
            w: 480,
            h: 480,
        }],
        since: "8/23/2010",
    },
    {
        name: "บ้านทับช้าง",
        en: "Ban Thap Chang",
        id: "",
        latlng: [13.73285, 100.690808],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/23/2010",
    },
    {
        name: "หัวหมาก",
        en: "Hua Mark",
        id: "",
        latlng: [13.737996, 100.645269],
        bannergress: [{
            path: "shoping-plaza-banner-1433",
            bg: "bc9ee7ee45fd79da571448bd952af088",
            w: 480,
            h: 80
        }],
        since: "8/23/2010",
    },
    {
        name: "รามคำแหง",
        en: "Ramkhamhaeng",
        id: "",
        radius: 800,
        latlng: [13.743009, 100.600165],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/23/2010",
    },
    {
        name: "มักกะสัน",
        en: "Makkasan",
        id: "",
        latlng: [13.750945, 100.561155],
        bannergress: [{
            path: "srinakharinwirot-university-prasarnmit-4629",
            bg: "7db2dbdbcd7f9eda11146e997795726b",
            w: 480,
            h: 160
        }],
        since: "8/23/2010",
    },
    {
        name: "ราชปรารภ",
        en: "Ratchaprarop",
        id: "",
        latlng: [13.755103, 100.542149],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/23/2010",
    },
    {
        name: "พญาไท",
        en: "Phayathai",
        id: "",
        latlng: [13.756725, 100.534923],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/23/2010",
    },
]
ARL.forEach(station => {
    station.icon = ARLICON
    station.fare = CORP["ARL"]["FareLog"]["11/1/2018"]
    station.type = `ARL`
    station.radius = 500
})
const MRTBLUELINE = [
    {
        name: "หลักสอง",
        en: "Lak Song",
        id: "BL38",
        latlng: [13.710857, 100.409439],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "9/21/2019",
    },
    {
        name: "บางแค",
        en: "Bang Khae",
        id: "BL37",
        latlng: [13.711895, 100.422276],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "9/21/2019",
    },
    {
        name: "ภาษีเจริญ",
        en: "Phasi Charoen",
        id: "BL36",
        latlng: [13.712848, 100.434287],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "9/21/2019",
    },
    {
        name: "เพชรเกษม 48",
        en: "Phetkasem 48",
        id: "BL35",
        latlng: [13.715535, 100.44538],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "9/21/2019",
    },
    {
        name: "บางหว้า",
        en: "Bang Wa",
        id: "BL34",
        latlng: [13.720248, 100.457026],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/24/2019",
    },
    {
        name: "บางไผ่",
        en: "Bang Phai",
        id: "BL33",
        latlng: [13.72465, 100.465207],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/24/2019",
    },
    {
        name: "ท่าพระ",
        en: "Tha Phra",
        id: "BL01-L",
        latlng: [13.729659, 100.474074],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/29/2019",
    },
    {
        name: "อิสรภาพ",
        en: "Itsaraphap",
        id: "BL32",
        latlng: [13.738306, 100.485721],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/29/2019",
    },
    {
        name: "สนามไชย",
        en: "Sanam Chai",
        id: "BL31",
        latlng: [13.744324, 100.49469],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/29/2019",
    },
    {
        name: "สามยอด",
        original_name: "วังบูรพา",
        en: "Sam Yot",
        id: "BL30",
        latlng: [13.747052, 100.502157],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/29/2019",
    },
    {
        name: "วัดมังกร",
        original_name: "วัดมังกรกมลาวาส",
        en: "Wat Mangkon",
        id: "BL29",
        latlng: [13.742198, 100.509882],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/29/2019",
    },
    {
        name: "หัวลำโพง",
        en: "Hua Lamphong",
        id: "BL28",
        latlng: [13.737538, 100.517156],
        bannergress: [{
            path: "hua-lamphong-railway-station-b746",
            bg: "236afe1255edb02b6afaa659fd451813",
            w: 480,
            h: 160
        }],
        since: "7/3/2004",
    },
    {
        name: "สามย่าน",
        en: "Sam Yan",
        id: "BL27",
        latlng: [13.732229, 100.530331],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "สีลม",
        en: "Si Lom",
        id: "BL26",
        latlng: [13.72931, 100.537348],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "ลุมพินี",
        en: "Lumphini",
        id: "BL25",
        latlng: [13.725576, 100.545738],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "คลองเตย",
        en: "Khlong Toei",
        id: "BL24",
        latlng: [13.722343, 100.553977],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "ศูนย์การประชุมแห่งชาติสิริกิติ์",
        en: "QSNCC",
        id: "BL23",
        latlng: [13.722573, 100.559943],
        bannergress: [{
            path: "benchakitti-park-93ad",
            bg: "6d2b2e7cbdfcef5fcf5d455a1da1b5bc",
            w: 480,
            h: 400,
        }],
        since: "7/3/2004",
    },
    {
        name: "สุขุมวิท",
        en: "Sukhumvit",
        id: "BL22",
        latlng: [13.737383, 100.561348],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "เพชรบุรี",
        en: "Phetchaburi",
        id: "BL21",
        latlng: [13.749201, 100.563344],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "พระราม 9",
        en: "Phra Ram 9",
        id: "BL20",
        latlng: [13.757839, 100.565237],
        bannergress: [{
            path: "g-tower-7e1f",
            bg: "838f6f6188ff69657989e679b80d4a01",
            w: 96,
            h: 112,
        }],
        since: "7/3/2004",
    },
    {
        name: "ศูนย์วัฒนธรรมแห่งประเทศไทย",
        en: "Thailand Cultural Centre",
        id: "BL19",
        latlng: [13.766293, 100.570087],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "ห้วยขวาง",
        en: "Huai Khwang",
        id: "BL18",
        latlng: [13.778693, 100.573493],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "สุทธิสาร",
        en: "Sutthisan",
        id: "BL17",
        latlng: [13.789433, 100.574019],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "รัชดาภิเษก",
        en: "Ratchadaphisek",
        id: "BL16",
        latlng: [13.798964, 100.574475],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "ลาดพร้าว",
        en: "Lat Phrao",
        id: "BL15",
        latlng: [13.806504, 100.572887],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "พหลโยธิน",
        en: "Phahon Yothin",
        id: "BL14",
        latlng: [13.812956, 100.561579],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "สวนจตุจักร",
        en: "Chatuchak Park",
        id: "BL13",
        latlng: [13.80294, 100.553371],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "กำแพงเพชร",
        en: "Kamphaeng Phet",
        id: "BL12",
        latlng: [13.797925, 100.547926],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "บางซื่อ",
        en: "Bang Sue",
        id: "BL11",
        latlng: [13.802366, 100.540996],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "7/3/2004",
    },
    {
        name: "เตาปูน",
        en: "Tao Poon",
        id: "BL10",
        latlng: [13.806118, 100.530782],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/11/2017",
    },
    {
        name: "บางโพ",
        en: "Bang Pho",
        id: "BL09",
        latlng: [13.806387, 100.521083],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/4/2019",
    },
    {
        name: "บางอ้อ",
        en: "Bang O",
        id: "BL08",
        latlng: [13.798976, 100.509818],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/4/2019",
    },
    {
        name: "บางพลัด",
        en: "Bang Phlat",
        id: "BL07",
        latlng: [13.792393, 100.504877],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/4/2019",
    },
    {
        name: "สิรินธร",
        en: "Sirindhorn",
        id: "BL06",
        latlng: [13.783817, 100.493242],
        bannergress: [{
            path: "rama-viii-bridge-eb7c",
            bg: "40e48b43c0aa050d2d17b2240c646305",
            w: 480,
            h: 240
        }],
        since: "12/4/2019",
    },
    {
        name: "บางยี่ขัน",
        en: "Bang Yi Khan",
        id: "BL05",
        latlng: [13.777456, 100.485334],
        bannergress: [{
            path: "changchui-9324",
            bg: "0207e1a3cf8d9c685946ab7d58191655",
            w: 480,
            h: 240,
        }],
        since: "12/23/2019",
    },
    {
        name: "บางขุนนนท์",
        en: "Bang Khun Non",
        id: "BL04",
        latlng: [13.763331, 100.473372],
        bannergress: [{
            path: "siriraj-hospital-e852",
            bg: "0b6961c513651c02d4fa6a5a96473f26",
            w: 480,
            h: 80
        }],
        since: "12/23/2019",
    },
    {
        name: "ไฟฉาย",
        original_name: "แยกไฟฉาย",
        en: "Fai Chai",
        id: "BL03",
        latlng: [13.755794, 100.469327],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/23/2019",
    },
    {
        name: "จรัญฯ 13",
        original_name: "จรัญสนิทวงศ์ 13",
        en: "Charan 13",
        id: "BL02",
        latlng: [13.740113, 100.470722],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/23/2019",
        drawto: "ท่าพระ",
    },
]
MRTBLUELINE.forEach(station => {
    station.icon = MRTBLUELINEICON
    station.fare = CORP["MRT"]["BLUE"]["FareLog"]["1/1/2023"]
    station.type = `MRT`
    station.radius = 500
});
const BTSLIGHTGREENLINE = [
    {
        name: "คูคต",
        en: "Khu Khot",
        id: "N24",
        latlng: [13.932369, 100.64653],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/16/2020",
    },
    {
        name: "แยก คปอ.",
        en: "Yaek Kor Por Aor",
        id: "N23",
        latlng: [13.924996, 100.625855],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/16/2020",
    },
    {
        name: "พิพิธภัณฑ์กองทัพอากาศ",
        en: "Royal Thai Air Force Museum",
        id: "N22",
        latlng: [13.917874, 100.621655],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/16/2020",
    },
    {
        name: "โรงพยาบาลภูมิพลอดุลยเดช",
        en: "Bhumibol Adulyadej Hospital",
        id: "N21",
        latlng: [13.910707, 100.617385],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/16/2020",
    },
    {
        name: "สะพานใหม่",
        en: "Saphan Mai",
        id: "N20",
        latlng: [13.896523, 100.609016],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/16/2020",
    },
    {
        name: "สายหยุด",
        en: "Sai Yud",
        id: "N19",
        latlng: [13.888483, 100.604296],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/16/2020",
    },
    {
        name: "พหลโยธิน 59",
        en: "Phahon Yothin 59",
        id: "N18",
        latlng: [13.882526, 100.600841],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/16/2020",
    },
    {
        name: "วัดพระศรีมหาธาตุ",
        en: "Wat Phra Sri Mahathat",
        id: "N17",
        latlng: [13.875278, 100.596748],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "6/5/2020",
    },
    {
        name: "กรมทหารราบที่ 11",
        en: "11th Infantry Regiment",
        id: "N16",
        latlng: [13.867673, 100.592081],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "6/5/2020",
    },
    {
        name: "บางบัว",
        en: "Bang Bua",
        id: "N15",
        latlng: [13.856002, 100.585193],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "6/5/2020",
    },
    {
        name: "กรมป่าไม้",
        en: "Royal Forest Department",
        id: "N14",
        latlng: [13.850304, 100.581851],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "6/5/2020",
    },
    {
        name: "มหาวิทยาลัยเกษตรศาสตร์",
        en: "Kasetsart University",
        id: "N13",
        latlng: [13.842268, 100.57713],
        bannergress: [{
            path: "ku-mosaics-dcff",
            bg: "d70bc5fd521e19b1fad67c2b647fb910",
            w: 240,
            h: 200
        }],
        since: "12/4/2019",
    },
    {
        name: "เสนานิคม",
        en: "Sena Nikhom",
        id: "N12",
        latlng: [13.836399, 100.573633],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/4/2019",
    },
    {
        name: "รัชโยธิน",
        en: "Ratchayothin",
        id: "N11",
        latlng: [13.829738, 100.569697],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/4/2019",
    },
    {
        name: "พหลโยธิน 24",
        en: "Phahon Yothin 24",
        id: "N10",
        latlng: [13.82416, 100.566477],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/4/2019",
    },
    {
        name: "ห้าแยกลาดพร้าว",
        en: "Ha Yaek Lat Phrao",
        id: "N9",
        latlng: [13.81668, 100.562078],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "8/9/2019",
    },
    {
        name: "หมอชิต",
        en: "Mo Chit",
        id: "N8",
        latlng: [13.802573, 100.553741],
        bannergress: [{
            path: "ชมพูพันธุ-ทิพย-จตุจักร-a015",
            bg: "b6a7b882b41aafbc995675af93a99315",
            w: 480,
            h: 160
        }],
        since: "12/5/1999",
    },
    {
        name: "สะพานควาย",
        en: "Saphan Khwai",
        id: "N7",
        latlng: [13.793858, 100.549724],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/5/1999",
    },
    {
        name: "ล่องหน",
        AKA: "เสนาร่วม",
        en: "Invisible",
        AKAen: "Sena Ruam",
        id: "N6",
        latlng: [13.786067, 100.546918],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
    },
    {
        name: "อารีย์",
        en: "Ari",
        id: "N5",
        latlng: [13.779578, 100.544622],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/5/1999",
    },
    {
        name: "สนามเป้า",
        en: "Sanam Pao",
        id: "N4",
        latlng: [13.772544, 100.542036],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/5/1999",
    },
    {
        name: "อนุสาวรีย์ชัยสมรภูมิ",
        en: "Victory Monument",
        id: "N3",
        latlng: [13.762723, 100.537074],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/5/1999",
    },
    {
        name: "พญาไท",
        en: "Phaya Thai",
        id: "N2",
        latlng: [13.756982, 100.533834],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
    },
    {
        name: "ราชเทวี",
        en: "Ratchathewi",
        id: "N1",
        latlng: [13.751848, 100.531517],
        bannergress: [{
            path: "",
            bg: "",
            w: 480,
            h: 80
        }],
        since: "12/5/1999",
    },
    {
        name: "สยาม",
        en: "Siam",
        id: "CEN",
        latlng: [13.745615, 100.53421],
        exits: [
            {
                latlng: {
                    lat: 13.745853,
                    lng: 100.533609
                },
                places: [
                    "สยามเซ็นเตอร์",
                    "สยาม ดิส",
                    "วังสระปทุม",
                ]
            },
            {
                latlng: {
                    lat: 13.745613,
                    lng: 100.533561
                }
            },
            {
                latlng: {
                    lat: 13.745738,
                    lng: 100.534264
                }
            },
            {
                latlng: {
                    lat: 13.745498,
                    lng: 100.534232
                }
            },
            {
                latlng: {
                    lat: 13.745603,
                    lng: 100.53479
                }
            },
            {
                latlng: {
                    lat: 13.745379,
                    lng: 100.534742
                }
            },
        ],
        bannergress: [{
            path: "we-love-thailand-banner-5280",
            bg: "bd429af0c315c2031aa587ef35e6bc89",
            w: 480,
            h: 80
        }],
        since: "12/5/1999",
    },
    {
        name: "ชิดลม",
        en: "Chit Lom",
        id: "E1",
        latlng: [13.744114, 100.542991],
        bannergress: [{
            path: "welcome-to-bangkok-dbaa",
            bg: "f0e6745754c4ccf6ccfdf15c773e20ff",
            w: 480,
            h: 160
        }],
        since: "12/5/1999",
    },
    {
        name: "เพลินจิต",
        en: "Phloen Chit",
        id: "E2",
        latlng: [13.743072, 100.54916],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/5/1999",
    },
    {
        name: "นานา",
        en: "Nana",
        id: "E3",
        latlng: [13.740655, 100.555345],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/5/1999",
    },
    {
        name: "อโศก",
        en: "Asok",
        id: "E4",
        latlng: [13.737003, 100.560409],
        bannergress: [{
            path: "asoke-is-the-best-place-in-bangkok-961c",
            bg: "7168c6b9620a07b66e22b777b82b2484",
            w: 480,
            h: 480,
        }],
        since: "12/5/1999",
    },
    {
        name: "พร้อมพงษ์",
        en: "Phrom Phong",
        id: "E5",
        latlng: [13.730499, 100.569577],
        bannergress: [{
            path: "the-way-of-destroyer-2cc5",
            bg: "6510f81211c7064fd4e45afd54194074",
            w: 400,
            h: 80
        }],
        since: "12/5/1999",
    },
    {
        name: "ทองหล่อ",
        en: "Thong Lo",
        id: "E6",
        latlng: [13.724256, 100.578445],
        bannergress: [{
            path: "thonglor-fe9a",
            bg: "ad3ef5385bbfe200714a75fba3565045",
            w: 480,
            h: 240
        }],
        since: "12/5/1999",
    },
    {
        name: "เอกมัย",
        en: "Ekkamai",
        id: "E7",
        latlng: [13.719534, 100.585123],
        bannergress: [{
            path: "ekkamai-02d6",
            bg: "63595349b70289854da4c8e053646434",
            w: 480,
            h: 240
        }],
        since: "12/5/1999",
    },
    {
        name: "พระโขนง",
        en: "Phra Khanong",
        id: "E8",
        latlng: [13.715243, 100.591158],
        bannergress: [{
            path: "w-market-visitation-229e",
            bg: "ce566e48030845ade868f1682a669e21",
            w: 400,
            h: 80
        }],
        since: "12/5/1999",
    },
    {
        name: "อ่อนนุช",
        en: "On Nut",
        id: "E9",
        latlng: [13.705656, 100.601088],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/5/1999",
    },
    {
        name: "บางจาก",
        en: "Bang Chak",
        id: "E10",
        latlng: [13.696725, 100.605283],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/12/2011",
    },
    {
        name: "ปุณณวิถี",
        en: "Punnawithi",
        id: "E11",
        latlng: [13.689291, 100.608979],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/12/2011",
    },
    {
        name: "อุดมสุข",
        en: "Udom Suk",
        id: "E12",
        latlng: [13.679857, 100.609413],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/12/2011",
    },
    {
        name: "บางนา",
        en: "Bang Na",
        id: "E13",
        latlng: [13.668106, 100.604612],
        bannergress: [{
            path: "วัดบางนาใน-5902",
            bg: "5ad94a93d38be315a381b04865ca6e01",
            w: 480,
            h: 160
        }],
        since: "8/12/2011",
    },
    {
        name: "แบริ่ง",
        en: "Bearing",
        id: "E14",
        latlng: [13.661123, 100.601796],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/12/2011",
    },
    {
        name: "สำโรง",
        en: "Samrong",
        id: "E15",
        latlng: [13.6465, 100.595734],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "4/3/2017",
    },
    {
        name: "ปู่เจ้า",
        en: "Pu Chao",
        id: "E16",
        latlng: [13.637352, 100.592043],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2018",
    },
    {
        name: "ช้างเอราวัณ",
        en: "Chang Erawan",
        id: "E17",
        latlng: [13.621582, 100.590134],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2018",
    },
    {
        name: "โรงเรียนนายเรือ",
        en: "Royal Thai Naval Academy",
        id: "E18",
        latlng: [13.608383, 100.594897],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2018",
    },
    {
        name: "ปากน้ำ",
        en: "Pak Nam",
        id: "E19",
        latlng: [13.602146, 100.597107],
        bannergress: [{
            path: "samut-prakan-province-39ad",
            bg: "95fccd83ac34d92fe095d7f15088ac56",
            w: 480,
            h: 240
        }],
        since: "8/6/2018",
    },
    {
        name: "ศรีนครินทร์",
        en: "Srinagarindra",
        id: "E20",
        latlng: [13.591999, 100.609043],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2018",
    },
    {
        name: "แพรกษา",
        en: "Phraek Sa",
        id: "E21",
        latlng: [13.584187, 100.607911],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2018",
    },
    {
        name: "สายลวด",
        en: "Sai Luat",
        id: "E22",
        latlng: [13.577783, 100.605449],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2018",
    },
    {
        name: "เคหะฯ",
        en: "Kheha",
        id: "E23",
        latlng: [13.567689, 100.607697],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2018",
    },
]
BTSLIGHTGREENLINE.forEach(station => {
    station.icon = BTSLIGHTGREENLINEICON
    station.type = `BTS`
    station.radius = 500
})
const BTSDARKGREENLINE = [{
        name: "สนามกีฬาแห่งชาติ",
        en: "National Stadium",
        id: "W1",
        latlng: [13.746531, 100.529087],
        bannergress: [{
            path: "exploring-pathum-wan-district-6bfe",
            bg: "b37540b143584c88dc2ed2db8d4d73ce",
            w: 480,
            h: 320
        }],
        since: "12/5/1999",
    },
    {
        name: "สยาม",
        en: "Siam",
        id: "CEN",
        latlng: [13.745615, 100.53421],
        bannergress: [{
            path: "we-love-thailand-banner-5280",
            bg: "bd429af0c315c2031aa587ef35e6bc89",
            w: 480,
            h: 80
        }],
        since: "12/5/1999",
    },
    {
        name: "ราชดำริ",
        en: "Ratchadamri",
        id: "S1",
        latlng: [13.73945, 100.539467],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/5/1999",
    },
    {
        name: "ศาลาแดง",
        en: "Sala Daeng",
        id: "S2",
        latlng: [13.728554, 100.534338],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/5/1999",
    },
    {
        name: "ช่องนนทรี",
        en: "Chong Nonsi",
        id: "S3",
        latlng: [13.723802, 100.529339],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/5/1999",
    },
    {
        name: "เซนต์หลุยส์",
        en: "Saint Louis",
        id: "S4",
        latlng: [13.720811, 100.526689],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "2/8/2021",
    },
    {
        name: "สุรศักดิ์",
        en: "Surasak",
        id: "S5",
        latlng: [13.719326, 100.52156],
        bannergress: [{
            path: "chaozhou-cemetery-tour-e11e",
            bg: "1b774ceb5c236066432c1c2cd69afd30",
            w: 480,
            h: 160,
        }],
        since: "12/5/1999",
    },
    {
        name: "สะพานตากสิน",
        en: "Saphan Taksin",
        id: "S6",
        latlng: [13.718794, 100.514211],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/5/1999",
    },
    {
        name: "กรุงธนบุรี",
        en: "Krung Thon Buri",
        id: "S7",
        latlng: [13.720926, 100.50272],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "3/15/2009",
    },
    {
        name: "วงเวียนใหญ่",
        en: "Wongwian Yai",
        id: "S8",
        latlng: [13.72106, 100.495226],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "3/15/2009",
    },
    {
        name: "โพธิ์นิมิตร",
        en: "Pho Nimit",
        id: "S9",
        latlng: [13.719236, 100.485924],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "1/12/2013",
    },
    {
        name: "ตลาดพลู",
        en: "Talat Phlu",
        id: "S10",
        latlng: [13.714074, 100.476354],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "2/14/2013",
    },
    {
        name: "วุฒากาศ",
        en: "Wutthakat",
        id: "S11",
        latlng: [13.71301, 100.468962],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/5/2013",
    },
    {
        name: "บางหว้า",
        en: "Bang Wa",
        id: "S12",
        latlng: [13.720788, 100.457804],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/5/2013",
    },
]
BTSDARKGREENLINE.forEach(station => {
    station.icon = BTSDARKGREENLINEICON
    station.type = `BTS`
    station.radius = 500
})
const BTSGOLDLINE = [
    {
        name: "กรุงธนบุรี",
        en: "Krung Thon Buri",
        id: "G1",
        latlng: [13.721093, 100.503713],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/16/2020",
    },
    {
        name: "เจริญนคร",
        en: "Charoen Nakhon",
        id: "G2",
        latlng: [13.726463, 100.50905],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/16/2020",
    },
    {
        name: "คลองสาน",
        en: "Khlong San",
        id: "G3",
        latlng: [13.730368, 100.507618],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "12/16/2020",
    },
]
BTSGOLDLINE.forEach(station => {
    station.icon = BTSGOLDLINEICON
    station.type = `BTS`
    station.radius = 500
})
const SRTREDLINE = [
    {
        name: "ตลิ่งชัน",
        en: "Taling Chan",
        id: "",
        latlng: [13.789666, 100.439619],
        address: `ซอยฉิมพลี 12 ถนนฉิมพลี แขวงฉิมพลี เขตตลิ่งชัน กรุงเทพ`,
        platform: 2,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "บางบำหรุ",
        en: "Bang Bamru",
        id: "",
        latlng: [13.792204, 100.477481],
        address: `ถนนสิรินธร บริเวณซอยเลียบทางรถไฟ ในพื้นที่แขวงบางพลัด เขตบางพลัด กรุงเทพมหานคร และตำบลวัดชลอ อำเภอบางกรวย จังหวัดนนทบุรี`,
        platform: 4,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "บางซ่อน",
        en: "Bang Son",
        id: "",
        latlng: [13.822126, 100.534215],
        address: `ถนนกรุงเทพ-นนทบุรี ตรงบริเวณที่หยุดรถไฟบางซ่อนเดิม ในพื้นที่แขวงบางซื่อ เขตบางซื่อ กรุงเทพมหานคร`,
        platform: 2,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "ค่าโง่ 33 ล้าน",
        original_name: "บางซื่อ",
        en: "1 Million Dollar Label Station",
        AKA: "Bang Sue",
        id: "",
        latlng: [13.804138, 100.539944],
        address: `เลขที่ 10 ถนนกำแพงเพชร แขวงจตุจักร เขตจตุจักร กรุงเทพฯ 10900 (ตั้งอยู่บริเวณชุมทางบางซื่อ ถนนเทอดดำริในปัจจุบัน)`,
        platform: null,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "จตุจักร",
        en: "Chatuchak",
        id: "",
        latlng: [13.826619, 100.549477],
        address: `ตั้งอยู่บริเวณถนนกำแพงเพชร 2 และถนนกำแพงเพชร 6 ใกล้กับบ้านพักนิคมรถไฟ กม.11`,
        platform: 2,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "วัดเสมียนนารี",
        en: "Wat Samian Nari",
        id: "",
        latlng: [13.841593, 100.557486],
        address: `ถนนกำแพงเพชร 6 บริเวณด้านหน้าวัดเสมียนนารี ในพื้นที่แขวงลาดยาว เขตจตุจักร กรุงเทพมหานคร`,
        platform: 2,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "บางเขน",
        en: "Bang Khen",
        id: "",
        latlng: [13.847022, 100.560629],
        address: `ตั้งอยู่บริเวณแยกบางเขน ช่วงถนนกำแพงเพชร 6 ตัดกับถนนงามวงศ์วาน ตรงข้ามมหาวิทยาลัยเกษตรศาสตร์ ถนนวิภาวดีรังสิต`,
        platform: 2,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "ทุ่งสองห้อง",
        en: "Thung Song Hong",
        id: "",
        latlng: [13.86019, 100.567528],
        address: `ถนนกำแพงเพชร 6 บริเวณด้านหน้าสำนักงานคณะกรรมการป้องกันและปราบปรามยาเสพติด ทุ่งสองห้อง ในพื้นที่แขวงตลาดบางเขน เขตหลักสี่ กรุงเทพมหานคร`,
        platform: 2,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "หลักสี่",
        en: "Lak Si",
        id: "",
        latlng: [13.886317, 100.581937],
        address: `ถนนกำแพงเพชร 6 บริเวณด้านหน้าศูนย์การค้าไอทีสแควร์ หลักสี่ ในพื้นที่แขวงตลาดบางเขน เขตหลักสี่ กรุงเทพมหานคร`,
        platform: 2,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "การเคหะ",
        en: "Khan Keha",
        id: "",
        latlng: [13.898502, 100.588889],
        address: `ถนนกำแพงเพชร 6 บริเวณด้านหน้าแฟลตเคหะชุมชนดอนเมือง (การเคหะแห่งชาติ ทุ่งสองห้อง) ในพื้นที่แขวงดอนเมือง เขตดอนเมือง กรุงเทพมหานคร`,
        platform: 2,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "ดอนเมือง",
        en: "Don Mueang",
        id: "",
        latlng: [13.914686, 100.59788],
        address: `ถนนกำแพงเพชร 6 บริเวณด้านหน้าท่าอากาศยานดอนเมือง ในพื้นที่แขวงดอนเมือง เขตดอนเมือง กรุงเทพมหานคร`,
        platform: 8,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "หลักหก (มหาวิทยาลัยรังสิต)",
        en: "Lak Hok (Rangsit University)",
        id: "",
        latlng: [13.965722, 100.605326],
        address: `ถนนกำแพงเพชร 6 ติดกับสะพานข้ามทางรถไฟแนวถนนเอกทักษิณ (ทางเข้าหมู่บ้านเมืองเอก และ มหาวิทยาลัยรังสิต) ในพื้นที่ตำบลหลักหก อำเภอเมืองปทุมธานี จังหวัดปทุมธานี`,
        platform: 2,
        parkinglot: 0,
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "11/29/2021",
    },
    {
        name: "รังสิต",
        en: "Rangsit",
        id: "",
        latlng: [13.990563, 100.602166],
        address: `ถนนช้างเอราวัณ 1 ใกล้กับถนนรังสิต-ปทุมธานี ในพื้นที่ตำบลประชาธิปัตย์ เทศบาลนครรังสิต (อำเภอธัญบุรี) จังหวัดปทุมธานี`,
        platform: 2,
        parkinglot: 1624,
        bannergress: [{
            path: "rangsit-university-33ce",
            bg: "fb299eebec658ec9d06958a403858b8f",
            w: 480,
            h: 180,
        }],
        since: "11/29/2021",
    },
]
SRTREDLINE.forEach(station => {
    station.icon = SRTREDLINEICON
    station.type = `SRTR`
    station["Service Hours"] = {
        "Open": "5.30am",
        "Closed": "12am"
    }
    station.radius = 500
})
const MRTPURPLELINE = [
    {
        name: "เตาปูน",
        en: "Tao Poon",
        id: "PP16",
        latlng: [13.806118, 100.530882],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "บางซ่อน",
        en: "Bang Son",
        id: "PP15",
        latlng: [13.820057, 100.532477],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "วงศ์สว่าง",
        en: "Wong Sawang",
        id: "PP14",
        latlng: [13.829862, 100.526517],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "แยกติวานนท์",
        en: "Yaek Tiwanon",
        id: "PP13",
        latlng: [13.83954, 100.514967],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "กระทรวงสาธารณสุข",
        en: "Ministry of Public Health",
        id: "PP12",
        latlng: [13.848479, 100.51471],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "ศูนย์ราชการนนทบุรี",
        en: "Nonthaburi Civic Center",
        id: "PP11",
        latlng: [13.860152, 100.513068],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "บางกระสอ",
        en: "Bang Krasor",
        id: "PP10",
        latlng: [13.861653, 100.504657],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "แยกนนทบุรี 1",
        en: "Yaek Nonthaburi 1",
        id: "PP09",
        latlng: [13.865967, 100.494078],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "สะพานพระนั่งเกล้า",
        en: "Phra Nang Klao Bridge",
        id: "PP08",
        latlng: [13.870271, 100.48012],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "ไทรม้า",
        en: "Sai Ma",
        id: "PP07",
        latlng: [13.87048, 100.466677],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "บางรักน้อย-ท่าอิฐ",
        en: "Bang Rak Noi Tha It",
        id: "PP06",
        latlng: [13.874805, 100.45597],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "บางรักใหญ่",
        en: "Bang Rak Yai",
        id: "PP05",
        latlng: [13.876608, 100.44494],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "บางพลู",
        en: "Bang Phlu",
        id: "PP04",
        latlng: [13.875774, 100.433782],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "สามแยกบางใหญ่",
        en: "Sam Yaek Bang Yai",
        id: "PP03",
        latlng: [13.87468, 100.419309],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "ตลาดบางใหญ่",
        en: "Talad Bang Yai",
        id: "PP02",
        latlng: [13.881016, 100.409278],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
    {
        name: "คลองบางไผ่",
        en: "Khlong Bang Phai",
        id: "PP01",
        latlng: [13.892434, 100.408237],
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        since: "8/6/2016",
    },
]
MRTPURPLELINE.forEach(station => {
    station.icon = MRTPURPLELINEICON
    station.type = `MRT`
    station.radius = 500
})
const MRTPINKLINE = [
    {
        name: "ศูนย์ราชการนนทบุรี",
        en: "",
        id: "PK01",
        latlng: [13.85947, 100.518326],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "แคราย",
        en: "",
        id: "PK02",
        latlng: [13.862434, 100.520745],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "สนามบินน้ำ",
        en: "",
        id: "PK03",
        latlng: [13.873871, 100.516427],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "สามัคคี",
        en: "",
        id: "PK04",
        latlng: [13.889167, 100.510595],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "กรมชลประทาน",
        en: "",
        id: "PK05",
        latlng: [13.89845, 100.507082],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ปากเกร็ด",
        en: "",
        id: "PK06",
        radius: 750,
        latlng: [13.906144, 100.50537],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "เลี่ยงเมืองปากเกร็ด",
        en: "",
        id: "PK07",
        radius: 750,
        latlng: [13.906404, 100.515606],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "แจ้งวัฒนะ ปากเกร็ด 28",
        en: "",
        id: "PK08",
        latlng: [13.904061, 100.529317],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ศรีรัช",
        en: "",
        id: "PK09",
        latlng: [13.900492, 100.540196],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "เมืองทองธานี",
        en: "",
        id: "PK10",
        latlng: [13.897347, 100.548517],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "แจ้งวัฒนะ 14",
        en: "",
        id: "PK11",
        latlng: [13.893269, 100.560082],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ศูนย์ราชการเฉลิมพระเกียรติ",
        en: "",
        id: "PK12",
        latlng: [13.890737, 100.567271],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "โทรคมนาคมแห่งชาติ",
        en: "",
        id: "PK13",
        latlng: [13.887437, 100.575891],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "หลักสี่",
        en: "",
        id: "PK14",
        latlng: [13.884171, 100.582479],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ราชภัฎพระนคร",
        en: "",
        id: "PK15",
        latlng: [13.879897, 100.589222],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "วัดพระศรีมหาธาตุ",
        en: "",
        id: "PK16",
        latlng: [13.874463, 100.597161],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "รามอินทรา 3",
        en: "",
        id: "PK17",
        latlng: [13.870886, 100.602622],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ลาดปลาเค้า",
        en: "",
        id: "PK18",
        radius: 650,
        latlng: [13.862772, 100.617696],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "รามอินทรา 31",
        en: "",
        id: "PK19",
        latlng: [13.857954, 100.626703],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "มัยลาภ",
        en: "",
        id: "PK20",
        latlng: [13.854883, 100.632373],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "วัชรพล",
        en: "",
        id: "PK21",
        latlng: [13.849059, 100.643134],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "รามอินทรา 40",
        en: "",
        id: "PK22",
        latlng: [13.845185, 100.650312],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "คู้บอน",
        en: "",
        id: "PK23",
        latlng: [13.840563, 100.658777],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "รามอินทรา 83",
        en: "",
        id: "PK24",
        radius: 750,
        latlng: [13.833714, 100.667574],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "วงแหวนตะวันออก",
        en: "",
        id: "PK25",
        radius: 700,
        latlng: [13.824458, 100.677134],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "นพรัตนราชธานี",
        en: "",
        id: "PK26",
        radius: 600,
        latlng: [13.816465, 100.685642],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "บางชัน",
        en: "",
        id: "PK27",
        latlng: [13.812722, 100.703124],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "เศรษฐบุตรบำเพ็ญ",
        en: "",
        id: "PK28",
        latlng: [13.812705, 100.712453],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ตลาดมีนบุรี",
        en: "",
        id: "PK29",
        latlng: [13.812514, 100.725253],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "มีนบุรี",
        en: "",
        id: "PK30",
        latlng: [13.809095, 100.732301],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
]
const MRTPINKLINEEXT = [
    {
        name: "เมืองทองธานี",
        en: "",
        id: "PK10",
        latlng: [13.897347, 100.548517],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "อิมแพคเมืองทองธานี",
        en: "",
        id: "MT01",
        latlng: [13.910895, 100.544343],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ทะเลสาบเมืองทอง",
        en: "",
        id: "MT02",
        latlng: [13.91771, 100.545282],
        type: "PK",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
]
MRTPINKLINE.forEach(station => {
    station.icon = MRTPINKLINEICON
    station.type = `MRT`
    station.radius = 500
})
MRTPINKLINEEXT.forEach(station => {
    station.icon = MRTPINKLINEICON
    station.type = `MRT`
    station.radius = 500
})
const MRTYELLOWLINE = [
    {
        name: "พหลโยธิน 24",
        en: "",
        id: "YLEX02",
        latlng: [13.826589, 100.568579],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
        {
        name: "จันทรเกษม",
        en: "",
        id: "YLEX01",
        latlng: [13.815056, 100.575382],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
        {
        name: "ลาดพร้าว",
        original_name: "รัชดา",
        en: "",
        id: "YL01",
        latlng: [13.807111, 100.574836],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.33,
    },
    {
        name: "ภาวนา",
        en: "",
        id: "YL02",
        latlng: [13.800192, 100.584174],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.26,
    },
    {
        name: "โชคชัย 4",
        en: "",
        id: "YL03",
        latlng: [13.794425, 100.594409],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.6,
    },
    {
        name: "ลาดพร้าว 71",
        en: "",
        id: "YL04",
        latlng: [13.787044, 100.607632],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 0.9,
    },
    {
        name: "ลาดพร้าว 83",
        en: "",
        id: "YL05",
        latlng: [13.783662, 100.613796],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.18,
    },
    {
        name: "มหาดไทย",
        en: "",
        id: "YL06",
        latlng: [13.778327, 100.623259],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 0.84,
    },
    {
        name: "ลาดพร้าว 101",
        en: "",
        id: "YL07",
        latlng: [13.774623, 100.629916],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.23,
    },
    {
        name: "บางกะปิ",
        en: "",
        id: "YL08",
        latlng: [13.768974, 100.63998],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.16,
    },
    {
        name: "แยกลำสาลี",
        en: "",
        id: "YL09",
        latlng: [13.762013, 100.645564],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.29,
    },
    {
        name: "ศรีกรีฑา",
        en: "",
        id: "YL10",
        latlng: [13.750482, 100.644824],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.63,
    },
    {
        name: "หัวหมาก",
        en: "",
        id: "YL11",
        latlng: [13.736042, 100.641101],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.2,
    },
    {
        name: "กลันตัน",
        en: "",
        id: "YL12",
        latlng: [13.725324, 100.641782],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.6,
    },
    {
        name: "ศรีนุช",
        en: "",
        id: "YL13",
        latlng: [13.710776, 100.64425],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.14,
    },
    {
        name: "ศรีนครินทร์ 38",
        en: "",
        id: "YL14",
        latlng: [13.701038, 100.646471],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.15,
    },
    {
        name: "สวนหลวง ร.9",
        en: "",
        id: "YL15",
        latlng: [13.690799, 100.647088],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.57,
    },
    {
        name: "ศรีอุดม",
        en: "",
        id: "YL16",
        latlng: [13.676574, 100.646165],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1,
    },
    {
        name: "ศรีเอี่ยม",
        en: "",
        id: "YL17",
        latlng: [13.667891, 100.645108],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.43,
    },
    {
        name: "ศรีลาซาล",
        en: "",
        id: "YL18",
        latlng: [13.654832, 100.642099],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.44,
    },
    {
        name: "ศรีแบริ่ง",
        en: "",
        id: "YL19",
        latlng: [13.643369, 100.636209],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.35,
    },
    {
        name: "ศรีด่าน",
        en: "",
        id: "YL20",
        latlng: [13.63312, 100.630109],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.11,
    },
    {
        name: "ศรีเทพา",
        en: "",
        id: "YL21",
        latlng: [13.629721, 100.623012],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.61,
    },
    {
        name: "ทิพวัล",
        en: "",
        id: "YL22",
        latlng: [13.636737, 100.609939],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
        distance_between_the_center_of_the_station_and_the_center_of_the_next_station: 1.64,
    },
    {
        name: "สำโรง",
        en: "",
        id: "YL23",
        latlng: [13.645141, 100.596464],
        type: "YL",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
]
MRTYELLOWLINE.forEach(station => {
    station.icon = MRTYELLOWLINEICON
    station.type = `MRT`
    station.radius = 500
})
const MRTORANGELINE = [
    {
        name: "ศูนย์วัฒนธรรมฯ",
        en: "",
        id: "OR13",
        latlng: [13.765672, 100.570693],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "รฟม.",
        en: "",
        id: "OR14",
        latlng: [13.75537, 100.57934],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "วัดพระราม 9",
        en: "",
        id: "OR15",
        latlng: [13.752171, 100.592816],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "รามคำแหง 12",
        en: "",
        id: "OR16",
        latlng: [13.751563, 100.609703],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "รามคำแหง",
        en: "",
        id: "OR17",
        radius: 600,
        latlng: [13.75905, 100.617975],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "กกท.",
        en: "",
        id: "OR18",
        latlng: [13.760336, 100.624648],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "รามคำแหง 34",
        en: "",
        id: "OR19",
        latlng: [13.76179, 100.637839],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "แยกลำสาลี",
        en: "",
        id: "OR20",
        latlng: [13.762769, 100.646283],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ศรีบูรพา",
        en: "",
        id: "OR21",
        latlng: [13.768101, 100.658616],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "คลองบ้านม้า",
        en: "",
        id: "OR22",
        latlng: [13.773623, 100.667848],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "สัมมากร",
        en: "",
        id: "OR23",
        latlng: [13.778223, 100.675793],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "น้อมเกล้า",
        en: "",
        id: "OR24",
        latlng: [13.786985, 100.691741],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "ราษฎร์พัฒนา",
        en: "",
        id: "OR25",
        latlng: [13.792333, 100.701467],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "มีนพัฒนา",
        en: "",
        id: "OR26",
        latlng: [13.797453, 100.711311],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "เคหะรามคำแหง",
        en: "",
        id: "OR27",
        latlng: [13.803382, 100.723241],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "มีนบุรี",
        en: "",
        id: "OR28",
        latlng: [13.809801, 100.732682],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
    {
        name: "แยกร่มเกล้า",
        en: "",
        id: "OR29",
        latlng: [13.813114, 100.738782],
        type: "OR",
        bannergress: [{
            path: "",
            bg: "",
            w: 240,
            h: 0,
        }],
    },
]
MRTORANGELINE.forEach(station => {
    station.icon = MRTORANGELINEICON
    station.type = `MRT`
    station.radius = 500
})
const getFutureStation = () => {
    if (searchParam.get("mode") === `F`) {
        return [...MRTPINKLINE,...MRTPINKLINEEXT,...MRTORANGELINE]
    }
    return []
}
const STATIONS = [
    ...ARL,
    ...BTSGOLDLINE,
    ...BTSDARKGREENLINE,
    ...BTSLIGHTGREENLINE,
    ...MRTBLUELINE,
    ...MRTPURPLELINE,
    ...SRTREDLINE,
    ...BRT,
    ...MRTYELLOWLINE,
].concat(getFutureStation())
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
const printCorpInfo = (stationType) => {
    const data = CORP[stationType]
    console.log(
`${stationType}
OPEN: ${data["EN"]["Service Hours"]["Open"]}
CLOSE: ${data["EN"]["Service Hours"]["Closed"]}
CALL CENTER: ${data["OTHERINFO"]["CALL CENTER"]}
`)
}
const printFare = (faredata, stationType) => {
    if (stationType === `BRT`) {
        for (let [custType, fare] of Object.entries(faredata)) {
            console.log(`${custType.padEnd(33)}: ${fare.toString().padStart(3)} ${DICT.BAHT[lang]}`)
        }
    } else if (stationType === `ARL`) {
        for (let [custType, numberOfStationAndFare] of Object.entries(faredata)) {
            console.log(custType)
            for (let [numberofstation, fare] of Object.entries(numberOfStationAndFare)) {
                console.log(`${numberofstation.toString().padStart(2)} ${DICT.STOPS[lang]} : ${fare.toString().padStart(3)} ${DICT.BAHT[lang]}`)
            }
        }
    }
}
const printStationDetail = (station) => {
    console.clear()
    try {
        printCorpInfo(`${station.type}`)
    } catch {}
    try {
        printStationAge(station.type, station.en ?? station.name ?? station.AKA, station.since)
    } catch {}
    try {
        printFare(station.fare, station.type)
    } catch {}
}
const getStationImage = (station) => {
    if (["BTS", "MRT"].includes(station.type)) {
        return `<a href="../src/images/${station.type}/${station.id.replace(/\-.*/,"")}.${stationImageExtension[station.type]}" target="_blank">
        <img alt="${station.id}" src="../src/images/${station.type}/${station.id.replace(/\-.*/,"")}.${stationImageExtension[station.type]}" style="width:200px;height:150px;">
        </a>`
    }
    return ``
}
const getBannergressBanner = (station) => {
    if (!station.bannergress[0].path) return ''
    return `<a href="https://bannergress.com/banner/${station.bannergress[0].path}" target="_blank">
    <img 
    alt="${station.bannergress[0].path.slice(0,station.bannergress[0].path.length-5).replace(/\-/g," ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}" 
    title="${station.bannergress[0].path.slice(0,station.bannergress[0].path.length-5).replace(/\-/g," ").replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase())}" 
    src="https://api.bannergress.com/bnrs/pictures/${station.bannergress[0].bg}" style="width:${station.bannergress[0].w}px;height:${station.bannergress[0].h}px;">
</a>`
}
const stationImageExtension = {
    "BTS": "png",
    "MRT": "jpg",
}
for (let station of STATIONS) {
    if (station.hasOwnProperty("name") && station.hasOwnProperty("latlng")) {
        // console.log(station.name)
        // console.log(station.type)
        if (station.name !== "" && station.latlng.length > 1) {
            L.marker(station.latlng, {
                    icon: station.icon
                })
                .addTo(map).bindPopup(`
                <h3>${station.name} (${station.en||""})</h3>
                <p>Radius: ${station.radius} meters</p>
                ${getStationImage(station)}
                ${getBannergressBanner(station)}
                `)
                .addEventListener("click", () => printStationDetail(station))
            // createDonut(station)
        }
    }
    if (station.hasOwnProperty("exits")) {
        for (let [i, exit] of station.exits.entries()) {
            L.marker({lat:exit.latlng.lat,lng:exit.latlng.lng},{
                icon: L.divIcon({
                    className: 'parallax-marker label medium', 
                    html: i+1, 
                    iconSize: [200, 36], 
                    iconAnchor: [100, 18]}
                    ),
                parallaxZoffset: 1
            })
            .bindPopup(`
                <h6><b>${station.name}</b> ทางออก <b>${i+1}</b> สถานที่ใกล้เคียง</h6>
                <ul>
                ${placeText(exit.places)}
                </ul>
            `)
            .addTo(map)
        }
    }
}
// console.log(STATIONS.length)
var pathGroup = L.featureGroup()
const addPath = (route, color, opacity) => {
    var path = []
    for (let stop of route) {
        path.push(stop.latlng)
        if (stop.drawto) {
            path.push(route.find(r => r.name === stop.drawto).latlng)
        }
    }
    L.polyline(path, {
        color: color,
        opacity: opacity
    }).addTo(map)
}
addPath(BRT, "yellow", 0.5);
addPath(MRTBLUELINE, "blue", 0.5);
addPath(MRTPURPLELINE, "purple", 0.5);
addPath(SRTREDLINE, "red", 0.5);
addPath(ARL, "red", 0.75);
addPath(BTSDARKGREENLINE, "darkgreen", 0.75);
addPath(BTSLIGHTGREENLINE, "green", 0.75);
addPath(BTSGOLDLINE, "gold", 0.75);
addPath(MRTYELLOWLINE, "yellow", 0.75);
if (searchParam.get("mode") === `future`) {
    addPath(MRTPINKLINE, "hotpink", 0.75);
    addPath(MRTPINKLINEEXT, "hotpink", 0.75);
    addPath(MRTORANGELINE, "orange", 0.75);
}
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
map.on('contextmenu', function(e) {
    var dtCurrentTime = new Date()
    const lat = e.latlng.lat.toFixed(6)
    const lng = e.latlng.lng.toFixed(6)
    const wlat = e.latlng.lat.toFixed(3)
    const wlng = e.latlng.lng.toFixed(3)
    const z = 17
    const windy_zoom = 8
    L.marker(e.latlng).bindPopup(
        `
            ${e.latlng.toString()}
            <br>${dtCurrentTime.toString()}
            <br><h6>Open in <a href="https://pinghuskar.github.io/X-Marks-Leaflet/?lat=${lat}&lng=${lng}" target="_blank">X Marks Leaflet</a></h6>
            <br>
            <a href='https://intel.ingress.com/intel?ll=${lat},${lng}&z=${z}' target='_blank'>
                <img src="../src/images/intel.webp">
            </a>
            <a href='https://bannergress.com/map?lat=${lat}&lng=${lng}&zoom=${z}' target='_blank'>
                <img src="../src/images/bannergress.png">
            </a>
            <a href='https://www.google.com/maps?daddr=${lat},${lng}' target='_blank'>
                <img src="../src/images/googlemaps.png">
            </a>
            <a href='https://www.windy.com/-NO2-no2?cams,no2,${lat},${lng},${windy_zoom}' target='_blank'>
                <img src="../src/images/NO2.jpg">
            </a>
            <a href='https://www.windy.com/-PM2-5-pm2p5?cams,pm2p5,${wlat},${wlng},${windy_zoom},${createCoordCode({lat:lat,lon:lng})}' target='_blank'>
                <img src="../src/images/pm.jpg">
            </a>
            `
    ).addTo(map)
    // https://pinghuskar.github.io/Mark-Center-by-Province/js/configData.js
})
map.on('keypress', function(e) {
    console.log(e.originalEvent.key)
    if (e.originalEvent.key === "l") {
        map.locate()
    }
})
