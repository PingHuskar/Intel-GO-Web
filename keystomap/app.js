// "use strict";
let responseFromIntel = ``
let inventorySpace = 2500
const responsePattern = /^{"result"\:\[\[".+\]\]}$/
while (!responsePattern.test(responseFromIntel)) {
    responseFromIntel = prompt(`Copy Response From getInventory (PRIME)`)
}
const getInventory = JSON.parse(responseFromIntel)
var map, lyrOSM, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure

var map = L.map('map').setView([13.697683, 100.491943], 5)

L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
    maxZoom: 20,
    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map)


var LeafIcon = L.Icon.extend({
    options: {
        // shadowUrl: 'leaf-shadow.png',
        iconSize: [50, 50],
        shadowSize: [50, 64],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    }
})
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({
    position: 'bottomleft'
}).addTo(map)
ctlAttribute.addAttribution(`Cyclosm`) //Open Street Map
ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)
ctlScale = L.control.scale({
    position: 'bottomleft',
    metric: false,
    maxWidth: 200
    // https://leafletjs.com/reference.html#control-scale
}).addTo(map)

const NonKeys = {
    "EMP_BURSTER": {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    },
    "EMITTER_A": {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    },
    "POWER_CUBE": {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    },
    "BOOSTED_POWER_CUBE": 0,
    "ULTRA_STRIKE": {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 0,
        8: 0,
    },
    "MEDIA": 0,
    "CAPSULE": {
        "CAPSULE": 0,
        "INTEREST_CAPSULE": 0,
        "KINETIC_CAPSULE": 0,
        "KEY_CAPSULE": 0,
    },
    "HEATSINK": {
        "COMMON": 0,
        "RARE": 0,
        "VERY_RARE": 0,
    },
    "MULTIHACK": {
        "COMMON": 0,
        "RARE": 0,
        "VERY_RARE": 0,
    },
    "RES_SHIELD": {
        "COMMON": 0,
        "RARE": 0,
        "VERY_RARE": 0,
    },
    "EXTRA_SHIELD": {
        "VERY_RARE": 0,
    },
    "LINK_AMPLIFIER": {
        "RARE": 0,
    },
    "ULTRA_LINK_AMP": {
        "VERY_RARE": 0,
    },
    "TURRET": {
        "RARE": 0,
    },
    "FORCE_AMP": {
        "RARE": 0,
    },
    "TRANSMUTER_ATTACK": {
        "VERY_RARE": 0,
    },
    "TRANSMUTER_DEFENSE": {
        "VERY_RARE": 0,
    },
    "FLIP_CARD": {
        "ADA": 0,
        "JARVIS": 0,
    },
    "PORTAL_POWERUP": {
        "MAGNUSRE": 0,
        "LOOK": 0,
        "TOASTY": 0,
        "FW_RES": 0,
        "FW_ENL": 0,
        "BN_BLM": 0,
        "RES": 0,
        "ENL": 0,
        "VIALUX": 0,
        "NIA": 0,
        "BB_BATTLE": 0,
        "BB_BATTLE_RARE": 0,
        "FRACK": 0,
    },
    "PLAYER_POWERUP": {
        "APEX": 0,
    }
}

const AddImageToMap = (key, lat, lng) => {
    try {
        if (key.hasOwnProperty(`portalImageUrl`) && key.portalImageUrl !== ``) {
            L.marker([lat, lng], {
                icon: new LeafIcon({
                    iconUrl: `${key.portalImageUrl}`
                })
            })
            .bindPopup(
                `
                <h2>${key.portalTitle}</h2>
                <a href="https://intel.ingress.com/intel?ll=${lat},${lng}&z=18&pll=${lat},${lng}" target="_blank">
                <p>${key.portalAddress}</p>
                </a>`)
                .bindTooltip(`${key.portalTitle}`).openTooltip()
                .addTo(map)
            }
    } catch (err) {
        console.log(key)
        console.error(`Portal Image Not Found\nhttps://lh3.googleusercontent.com/${key.portalImageUrl}`)
    }
}

const AddDonut = (lat, lng) => {
    L.donut([lat, lng], {
        radius: 40,
        innerRadius: 0,
        innerRadiusAsPercent: false,
    }).addTo(map)
}

const decodeLatLngAndAddtoMap = (key) => {
    const [encode_lat, encode_lng] = key.portalLocation.split(",")
    const [lat, lng] = [parseInt(encode_lat, 16) / 10 ** 6, parseInt(encode_lng, 16) / 10 ** 6]

    AddImageToMap(key, lat, lng)

    AddDonut(lat, lng)

    return `${key.portalTitle} @${lat},${lng} Added to Map`
}

var key = 0
var resourceWithLevels = 0
const getItemDetail = (item) => {
    if (item.hasOwnProperty("resourceWithLevels")) {
        if (item.resourceWithLevels.resourceType === `MEDIA`) {
            NonKeys["MEDIA"]++
            return `MEDIA`
        } else {
            NonKeys[item.resourceWithLevels.resourceType][`${item.resourceWithLevels.level}`] += 1
            return `${item.resourceWithLevels.resourceType}${item.resourceWithLevels.level}`
        }
    } else if (item.hasOwnProperty("modResource")) {
        NonKeys[item.modResource.resourceType][item.modResource.rarity]++
        return item.modResource.displayName
    } else if (item.hasOwnProperty("resource")) {
        if (item["resource"]["resourceType"] === `PORTAL_LINK_KEY`) {
            return `${item.portalCoupler.portalTitle}`
        } else if (item["resource"]["resourceType"] === `PLAYER_POWERUP`) {
            NonKeys[`PLAYER_POWERUP`][item.playerPowerupResource.playerPowerupEnum]++
            return `${item.playerPowerupResource.playerPowerupEnum}`
        } else if (item["resource"]["resourceType"] === `BOOSTED_POWER_CUBE`) {
            NonKeys[`BOOSTED_POWER_CUBE`]++
            return `${item.BOOSTED_POWER_CUBE}`
        } else if (item["resource"]["resourceType"] === `FLIP_CARD`) {
            NonKeys[`FLIP_CARD`][item.flipCard.flipCardType]++
            return `${item.flipCard.flipCardType}`
        } else if (item["resource"]["resourceType"] === `PORTAL_POWERUP`) {
            NonKeys[`PORTAL_POWERUP`][item.timedPowerupResource.designation]++
            return `${item.timedPowerupResource.designation}`
        } else if (/CAPSULE$/.test(item["resource"]["resourceType"])) {
            if (item["resource"]["resourceType"] === `KEY_CAPSULE`) {
                // console.log(`FREE SPACE ${item["resource"]["resourceType"]["currentCount"]}`)
                console.log(`FREE ${item["container"]["currentCapacity"]-item["container"]["currentCount"]} SPACE IN KEY LOCKER!`)
            }
            else if (item.container.currentCount !== 0) {
                //*
                console.log(item)
                inventorySpace -= item.container.currentCount
                /*/
                console.log(item)
                //*/
            }
            NonKeys["CAPSULE"][item["resource"]["resourceType"]]++
            return `${item.resource.resourceType}`
        } else {
            return `${item.resource.resourceType}`
        }
    } else {
        return "ERROR"
    }
}


for (let item of getInventory["result"]) {
    // console.log(item[0],item[1])
    var current_item = item[item.length - 1]
    if (current_item.hasOwnProperty("resource")) {
        if (current_item.resource.resourceType === `PORTAL_LINK_KEY`) {
            key++
            decodeLatLngAndAddtoMap(current_item.portalCoupler)
            // console.log(key++, decodeLatLngAndAddtoMap(current_item.portalCoupler))
            // break
        } else {
            resourceWithLevels++
            getItemDetail(current_item)
            // console.log(resourceWithLevels++, getItemDetail(current_item))
        }
    } else {
        resourceWithLevels++
        getItemDetail(current_item)
        // console.log(resourceWithLevels++, getItemDetail(current_item))
    }

}

const ap = NonKeys.PLAYER_POWERUP.APEX
const jv = NonKeys.FLIP_CARD.JARVIS
const ad = NonKeys.FLIP_CARD.ADA
const qc = NonKeys.CAPSULE.INTEREST_CAPSULE
const c = NonKeys.CAPSULE.CAPSULE
const kc = NonKeys.CAPSULE.KINETIC_CAPSULE
const hs = NonKeys.HEATSINK.COMMON + NonKeys.HEATSINK.RARE + NonKeys.HEATSINK.VERY_RARE
const mh = NonKeys.MULTIHACK.COMMON + NonKeys.MULTIHACK.RARE + NonKeys.MULTIHACK.VERY_RARE
const ps = NonKeys.RES_SHIELD.COMMON + NonKeys.RES_SHIELD.RARE + NonKeys.RES_SHIELD.VERY_RARE + NonKeys.EXTRA_SHIELD.VERY_RARE
const re = NonKeys.EMITTER_A["1"] + NonKeys.EMITTER_A["2"] + NonKeys.EMITTER_A["3"] + NonKeys.EMITTER_A["4"] +
    NonKeys.EMITTER_A["5"] + NonKeys.EMITTER_A["6"] + NonKeys.EMITTER_A["7"] + NonKeys.EMITTER_A["8"]
const xmp = NonKeys.EMP_BURSTER["1"] + NonKeys.EMP_BURSTER["2"] + NonKeys.EMP_BURSTER["3"] + NonKeys.EMP_BURSTER["4"] +
    NonKeys.EMP_BURSTER["5"] + NonKeys.EMP_BURSTER["6"] + NonKeys.EMP_BURSTER["7"] + NonKeys.EMP_BURSTER["8"]
const us = NonKeys.ULTRA_STRIKE["1"] + NonKeys.ULTRA_STRIKE["2"] + NonKeys.ULTRA_STRIKE["3"] + NonKeys.ULTRA_STRIKE["4"] +
    NonKeys.ULTRA_STRIKE["5"] + NonKeys.ULTRA_STRIKE["6"] + NonKeys.ULTRA_STRIKE["7"] + NonKeys.ULTRA_STRIKE["8"]
const la = NonKeys.LINK_AMPLIFIER.RARE
const sb = NonKeys.ULTRA_LINK_AMP.VERY_RARE
const pc = NonKeys.POWER_CUBE["1"] + NonKeys.POWER_CUBE["2"] + NonKeys.POWER_CUBE["3"] + NonKeys.POWER_CUBE["4"] +
    NonKeys.POWER_CUBE["5"] + NonKeys.POWER_CUBE["6"] + NonKeys.POWER_CUBE["7"] + NonKeys.POWER_CUBE["8"]
const hc = NonKeys.BOOSTED_POWER_CUBE
const fa = NonKeys.FORCE_AMP.RARE
const tu = NonKeys.TURRET.RARE
const tp = NonKeys.TRANSMUTER_DEFENSE.VERY_RARE
const tm = NonKeys.TRANSMUTER_ATTACK.VERY_RARE

let str_IngressventoryParams = ``

const IngressventoryParams = [
    `ap`,
    `ad`,
    `jv`,
    `key`,
    `c`,
    `kc`,
    `hs`,
    `mh`,
    `ps`,
    `re`,
    `xmp`,
    `us`,
    `la`,
    `sb`,
    `pc`,
    `hc`,
    `fa`,
    `tu`,
    `tp`,
    `tm`,
]

for (let IngressventoryParam of IngressventoryParams) {
    str_IngressventoryParams += `${IngressventoryParam}=${eval(IngressventoryParam)}&`
}

let Ingressventory = Math.round(Math.random()) ? `https://pinghuskar.github.io/Ingressventory` : `https://lively-sfogliatella-516092.netlify.app`
// const viewItems = confirm(`Open Ingressventory`)
// if (viewItems) {
//     open(`${Ingressventory}?${str_IngressventoryParams.replace(/&$/,'')}`, "_blank")
// }

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

const SunburstParams = [
    {"key": key},
    {"nkey-def-res-l1": NonKeys.EMITTER_A["1"]},
    {"nkey-def-res-l2": NonKeys.EMITTER_A["2"]},
    {"nkey-def-res-l3": NonKeys.EMITTER_A["3"]},
    {"nkey-def-res-l4": NonKeys.EMITTER_A["4"]},
    {"nkey-def-res-l5": NonKeys.EMITTER_A["5"]},
    {"nkey-def-res-l6": NonKeys.EMITTER_A["6"]},
    {"nkey-def-res-l7": NonKeys.EMITTER_A["7"]},
    {"nkey-def-res-l8": NonKeys.EMITTER_A["8"]},
    {"nkey-atk-xmp-l1": NonKeys.EMP_BURSTER["1"]},
    {"nkey-atk-xmp-l2": NonKeys.EMP_BURSTER["2"]},
    {"nkey-atk-xmp-l3": NonKeys.EMP_BURSTER["3"]},
    {"nkey-atk-xmp-l4": NonKeys.EMP_BURSTER["4"]},
    {"nkey-atk-xmp-l5": NonKeys.EMP_BURSTER["5"]},
    {"nkey-atk-xmp-l6": NonKeys.EMP_BURSTER["6"]},
    {"nkey-atk-xmp-l7": NonKeys.EMP_BURSTER["7"]},
    {"nkey-atk-xmp-l8": NonKeys.EMP_BURSTER["8"]},
    {"nkey-atk-us-l1": NonKeys.ULTRA_STRIKE["1"]},
    {"nkey-atk-us-l2": NonKeys.ULTRA_STRIKE["2"]},
    {"nkey-atk-us-l3": NonKeys.ULTRA_STRIKE["3"]},
    {"nkey-atk-us-l4": NonKeys.ULTRA_STRIKE["4"]},
    {"nkey-atk-us-l5": NonKeys.ULTRA_STRIKE["5"]},
    {"nkey-atk-us-l6": NonKeys.ULTRA_STRIKE["6"]},
    {"nkey-atk-us-l7": NonKeys.ULTRA_STRIKE["7"]},
    {"nkey-atk-us-l8": NonKeys.ULTRA_STRIKE["8"]},
    {"nkey-def-cube-l1": NonKeys.POWER_CUBE["1"]},
    {"nkey-def-cube-l2": NonKeys.POWER_CUBE["2"]},
    {"nkey-def-cube-l3": NonKeys.POWER_CUBE["3"]},
    {"nkey-def-cube-l4": NonKeys.POWER_CUBE["4"]},
    {"nkey-def-cube-l5": NonKeys.POWER_CUBE["5"]},
    {"nkey-def-cube-l6": NonKeys.POWER_CUBE["6"]},
    {"nkey-def-cube-l7": NonKeys.POWER_CUBE["7"]},
    {"nkey-def-cube-l8": NonKeys.POWER_CUBE["8"]},
    {"nkey-def-cube-vr": hc},
    {"nkey-mod-la-rare": la},
    {"nkey-mod-sb-vr": sb},
    {"nkey-mod-hs-cmn": NonKeys.HEATSINK.COMMON},
    {"nkey-mod-hs-rare": NonKeys.HEATSINK.RARE},
    {"nkey-mod-hs-vr": NonKeys.HEATSINK.VERY_RARE},
    {"nkey-mod-mh-cmn": NonKeys.MULTIHACK.COMMON},
    {"nkey-mod-mh-rare": NonKeys.MULTIHACK.RARE},
    {"nkey-mod-mh-vr": NonKeys.MULTIHACK.VERY_RARE},
    {"nkey-mod-ps-cmn": NonKeys.RES_SHIELD.COMMON},
    {"nkey-mod-ps-rare": NonKeys.RES_SHIELD.RARE},
    {"nkey-mod-ps-vr": NonKeys.RES_SHIELD.VERY_RARE},
    {"nkey-mod-ps-xr": NonKeys.EXTRA_SHIELD.VERY_RARE},
    {"nkey-mod-fa-rare": fa},
    {"nkey-mod-tu-rare": tu},
    {"nkey-mod-tp-vr": tp},
    {"nkey-mod-tm-vr": tm},
    {"nkey-atk-flip-jv": jv},
    {"nkey-atk-flip-ada": ad},
    {"cap-cap": c},
    {"cap-qc": qc},
    {"cap-kc": kc},
    {"cap-kl": NonKeys.CAPSULE.KEY_CAPSULE},
    {"nkey-power-apex-vr": ap},
    {"nkey-power-bc-cmn": NonKeys.PORTAL_POWERUP.BB_BATTLE},
    {"nkey-power-bc-rare": NonKeys.PORTAL_POWERUP.BB_BATTLE_RARE},
    {"nkey-power-FRACK-vr": NonKeys.PORTAL_POWERUP.FRACK},
    {"nkey-power-MAGNUSRE": NonKeys.PORTAL_POWERUP.MAGNUSRE},
    {"nkey-power-LOOK": NonKeys.PORTAL_POWERUP.LOOK},
    {"nkey-power-TOASTY": NonKeys.PORTAL_POWERUP.TOASTY},
    {"nkey-power-FW_RES": NonKeys.PORTAL_POWERUP.FW_RES},
    {"nkey-power-FW_ENL": NonKeys.PORTAL_POWERUP.FW_ENL},
    {"nkey-power-BN_BLM": NonKeys.PORTAL_POWERUP.BN_BLM},
    {"nkey-power-RES": NonKeys.PORTAL_POWERUP.RES},
    {"nkey-power-ENL": NonKeys.PORTAL_POWERUP.ENL},
    {"nkey-power-VIALUX": NonKeys.PORTAL_POWERUP.VIALUX},
    {"nkey-power-NIA": NonKeys.PORTAL_POWERUP.NIA},
    {"nkey-media": NonKeys.MEDIA},
]

let str_SunburstParams = ``

for (let [i, d] of SunburstParams.entries()) {
    let k = Object.keys(d)[0]
    let v = Object.values(d)[0]
    inventorySpace -= v
    str_SunburstParams += `${k}=${v}&`
}

str_SunburstParams += `space=${inventorySpace}&`

let Sunburst = `${Ingressventory}/sunburst`
// if (viewItems) {
    open(`${Sunburst}?${str_SunburstParams.replace(/&$/,'')}`, "_blank")
// }
open(`https://chart.googleapis.com/chart?chs=500x500&cht=qr&chl=${Sunburst}?${str_SunburstParams.replace(/&$/,'').replace(/&/g,'%26')}&choe=UTF-8`,"_blank")