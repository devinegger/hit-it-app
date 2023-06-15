export function getUserPosition() {
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
    });
}



// export function getDistanceFromUserToHit(userLocation, hitLocation) {
//     console.log(userLocation, hitLocation);
//     var R = 3958.8; // Radius of the earth in miles
//     var dLat = getRadians(hitLocation.latitude-userLocation.lat);  

//     console.log(dLat);

//     var dLng = getRadians(hitLocation-userLocation.lng); 
//     var a = 
//       Math.sin(dLat/2) * Math.sin(dLat/2) +
//       Math.cos(getRadians(userLocation.lat)) * Math.cos(getRadians(hitLocation.latitude)) * 
//       Math.sin(dLng/2) * Math.sin(dLng/2)
//       ; 
//     var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    
    
//     console.log(c); // NAN
//     var distance = R * c; // Distance in mi
    
//     console.log(distance); // NAN
//     return distance;
// }

// haversine formula to calculate distance between two points
export function getDistanceFromUserToHit(user, hit) {
  var R = 3958.8; // Radius of the Earth in miles
  var rlat1 = user.lat * (Math.PI/180); // Convert degrees to radians
  var rlat2 = hit.latitude * (Math.PI/180); // Convert degrees to radians
  var difflat = rlat2-rlat1; // Radian difference (latitudes)
  var difflon = (hit.longitude-user.lng) * (Math.PI/180); // Radian difference (longitudes)

  var d = 2 * R * Math.asin(Math.sqrt(Math.sin(difflat/2)*Math.sin(difflat/2)+Math.cos(rlat1)*Math.cos(rlat2)*Math.sin(difflon/2)*Math.sin(difflon/2)));
  return d;
}


// convert degrees to radians
function getRadians(degrees) {
    return degrees * (Math.PI/180);
}