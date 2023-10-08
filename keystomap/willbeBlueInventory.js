const willbeBlueItems = [
    {name: "inventory[X8]", count: NonKeys.EMP_BURSTER["8"]},
    {name: "inventory[U8]", count: NonKeys.ULTRA_STRIKE["8"]},
    {name: "inventory[ADA]", count: NonKeys.FLIP_CARD.ADA},
    {name: "inventory[JARVIS]", count: NonKeys.FLIP_CARD.JARVIS},
    {name: "inventory[R8]", count: NonKeys.EMITTER_A["8"]},
    {name: "inventory[R7]", count: NonKeys.EMITTER_A["7"]},
    {name: "inventory[R6]", count: NonKeys.EMITTER_A["6"]},
    {name: "inventory[R5]", count: NonKeys.EMITTER_A["5"]},
    {name: "inventory[R4]", count: NonKeys.EMITTER_A["4"]},
    {name: "inventory[Aegis]", count: NonKeys.EXTRA_SHIELD.VERY_RARE},
    {name: "inventory[VR Shields]", count: NonKeys.RES_SHIELD.VERY_RARE},
    {name: "inventory[Hypercubes]", count: NonKeys.BOOSTED_POWER_CUBE},
    {name: "inventory[VR Battle Beacons]", count: NonKeys.PORTAL_POWERUP.BB_BATTLE_RARE},
    {name: "inventory[VRHS]", count: NonKeys.HEATSINK.VERY_RARE},
    {name: "inventory[VRMH]", count: NonKeys.MULTIHACK.VERY_RARE},
    {name: "inventory[SBUL]", count: NonKeys.ULTRA_LINK_AMP.VERY_RARE},
]
for (let item of willbeBlueItems){
    console.log(`document.querySelector('[name="${item.name}"]').value = ${item.count}`)
}