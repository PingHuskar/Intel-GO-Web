"use strict";
const OpenInventory = (responseFromIntel) => {
  const getInventory = JSON.parse(responseFromIntel)

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
              if (item.container.currentCount !== 0) {
                  console.log(item)
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
      var current_item = item[item.length - 1]
      if (current_item.hasOwnProperty("resource")) {
          if (current_item.resource.resourceType === `PORTAL_LINK_KEY`) {
              key++
          } else {
              resourceWithLevels++
              getItemDetail(current_item)
          }
      } else {
          resourceWithLevels++
          getItemDetail(current_item)
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

  str_IngressventoryParams += `ap=${ap}&`
  str_IngressventoryParams += `ad=${ad}&`
  str_IngressventoryParams += `jv=${jv}&`
  str_IngressventoryParams += `key=${key}&`
  str_IngressventoryParams += `c=${c}&`
  str_IngressventoryParams += `kc=${kc}&`
  str_IngressventoryParams += `hs=${hs}&`
  str_IngressventoryParams += `mh=${mh}&`
  str_IngressventoryParams += `ps=${ps}&`
  str_IngressventoryParams += `re=${re}&`
  str_IngressventoryParams += `xmp=${xmp}&`
  str_IngressventoryParams += `us=${us}&`
  str_IngressventoryParams += `la=${la}&`
  str_IngressventoryParams += `sb=${sb}&`
  str_IngressventoryParams += `pc=${pc}&`
  str_IngressventoryParams += `hc=${hc}&`
  str_IngressventoryParams += `fa=${fa}&`
  str_IngressventoryParams += `tu=${tu}&`
  str_IngressventoryParams += `tp=${tp}&`
  str_IngressventoryParams += `tm=${tm}&`

  let Ingressventory = `https://lively-sfogliatella-516092.netlify.app`
  open(`${Ingressventory}?${str_IngressventoryParams.replace(/&$/,'')}`)

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
  ]

  let str_SunburstParams = ``

  for (let [i, d] of SunburstParams.entries()) {
      let k = Object.keys(d)[0]
      let v = Object.values(d)[0]
      str_SunburstParams += `${k}=${v}&`
  }

  let Sunburst = `${Ingressventory}/sunburst`
  open(`${Sunburst}?${str_SunburstParams.replace(/&$/,'')}`)
}
const ValidatePattern = (responseFromIntel) => {
  const responsePattern = /^{"result"\:\[\[".+\]\]}$/
  if (responsePattern.test(responseFromIntel)) {
    OpenInventory(responseFromIntel);
  }
}

$('input').keyup(function() {
  ValidatePattern(this.value);
})