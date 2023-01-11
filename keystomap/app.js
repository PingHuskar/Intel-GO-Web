// "use strict";
const getInventory = JSON.parse(prompt(`Copy Response From getInventory (PRIME)`))
var map, lyrOSM, mrkCurrentLocation, popExample, ctlZoom, ctlAttribute, ctlScale, ctlPan, ctlZoomslider, ctlMeasure

var map = L.map('map').setView([13.598247,100.598725], 16)

L.tileLayer('https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map)


var LeafIcon = L.Icon.extend({
    options: {
        // shadowUrl: 'leaf-shadow.png',
        iconSize:     [50, 50],
        shadowSize:   [50, 64],
        iconAnchor:   [22, 94],
        popupAnchor:  [-3, -76]
    }
})
ctlZoomslider = L.control.zoomslider({position:"topright"}).addTo(map)
ctlMeasure = L.control.polylineMeasure().addTo(map);
ctlAttribute = L.control.attribution({position:'bottomleft'}).addTo(map)
ctlAttribute.addAttribution(`Cyclosm`) //Open Street Map
ctlAttribute.addAttribution(`<a href="https://github.com/pinghuskar">Chadin Chaipornpisuth</a>`)
ctlScale = L.control.scale({
    position:'bottomleft',
    metric:false,
    maxWidth:200
    // https://leafletjs.com/reference.html#control-scale
}).addTo(map)

var NonKeys = {
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

const AddImageToMap = (key,lat,lng) => {
    L.marker([lat,lng], 
        {icon: new LeafIcon({iconUrl: `${key.portalImageUrl}`})})
        // {icon: new LeafIcon({iconUrl: `https://lh3.googleusercontent.com/${portal.img}`})})
    .bindPopup(
        `
        <h2>${key.portalTitle}</h2>
        <a href="https://intel.ingress.com/intel?ll=${lat},${lng}&z=18&pll=${lat},${lng}" target="_blank">
        <p>${key.portalAddress}</p>
        </a>`)
        .bindTooltip(`${key.portalTitle}`).openTooltip()
    .addTo(map)
}

const AddDonut = (lat, lng) => {
    L.donut([lat,lng], {
        radius: 40,
        innerRadius: 0,
        innerRadiusAsPercent: false,
    }).addTo(map)
}

const decodeLatLngAndAddtoMap = (key) => {
    const [encode_lat,encode_lng] = key.portalLocation.split(",")
    const [lat,lng] = [parseInt(encode_lat,16)/10**6, parseInt(encode_lng,16)/10**6]

    AddImageToMap(key,lat,lng)

    AddDonut(lat,lng)
    
    return `${key.portalTitle} @${lat},${lng} Added to Map`
}

var count = 0
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
        } else if (item["resource"]["resourceType"] === `FLIP_CARD`) {
            NonKeys[`FLIP_CARD`][item.flipCard.flipCardType]++
            return `${item.flipCard.flipCardType}`
        } else if (item["resource"]["resourceType"] === `PORTAL_POWERUP`) {
            NonKeys[`PORTAL_POWERUP`][item.timedPowerupResource.designation]++
            return `${item.timedPowerupResource.designation}`
        } else if (/CAPSULE$/.test(item["resource"]["resourceType"])) {
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
            count++
            decodeLatLngAndAddtoMap(current_item.portalCoupler)
            // console.log(count++, decodeLatLngAndAddtoMap(current_item.portalCoupler))
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

// console.log(getInventory["result"].length)
// console.log(count+resourceWithLevels)
// console.log(count, resourceWithLevels)
console.log(NonKeys)

