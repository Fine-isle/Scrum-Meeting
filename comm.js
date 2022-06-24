function rad(d) {
    return d * Math.PI / 180;
}
function GetDistance(lon1, lat1, lon2, lat2) {
    var EARTH_RADIUS = 6378137;
    var radLat1 = rad(lat1);
    var radLat2 = rad(lat2);
    var a = radLat1 - radLat2;
    var b = rad(lon1) - rad(lon2);
    var s = 2 * Math.asin(Math.sqrt(
        Math.pow(Math.sin(a / 2),2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2),2)
    ));
    s = s * EARTH_RADIUS;
    return s;
}

module.exports = {
    GetDistance:GetDistance
}