const R = 6371

const deg_to_rad = (degrees) => degrees*(Math.PI/180)

const dist = (lat1, lon1, lat2, lon2, unit=`km`) => {
    d_lat = deg_to_rad(lat2-lat1)
    d_lon = deg_to_rad(lon2-lon1)
    a = Math.sin(d_lat/2)**2 + Math.cos(deg_to_rad(lat1)) * Math.cos(deg_to_rad(lat2)) * Math.sin(d_lon/2)**2
    c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    switch (unit) {
        case `km`:
            c *= 1
            break
        case `m`:
            c *= 1000
            break
        case `mile`:
            c /= 1.6
            break
    } 
    return `${(R * c).toFixed(3)}${unit}`
}