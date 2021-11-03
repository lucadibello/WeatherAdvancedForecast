import LocationPermission from "../models/LocationPermission";
import * as LocationSettings from "../constants/Location";

function isLocationAvailable (): boolean {
  return Boolean(navigator.geolocation);
}

function askPermission (): LocationPermission {
  if (isLocationAvailable()) {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        console.log("Location permission result",result);
        if (result.state === "granted") {
          console.log(result.state);
          //If granted then you can directly call your function here
          return LocationPermission.GRANTED;
        } else if (result.state === "prompt") {
          console.log(result.state);
          return LocationPermission.PROMPT;
        } else if (result.state === "denied") {
          //If denied then you have to show instructions to enable location
          return LocationPermission.DENIED;
        }
        result.onchange = function () {
          console.log(result.state);
        };
      });
      return LocationPermission.UNKNOWN_RESPONSE;
  } else {
    return LocationPermission.NOT_AVAILABLE;
  }
}

function getUserLocation (successCallback: PositionCallback, errorCallback = () => { 
  console.log("Error while fetching user position..")
}) {
  // Configure settings
  let settings = {
    enableHighAccuracy: LocationSettings.IS_HIGH_ACCURACY_ENABLED,
    timeout: LocationSettings.TIMEOUT,
    maximumAge: LocationSettings.MAXIMUM_AGE,
  }
  
  navigator.geolocation.getCurrentPosition(successCallback, errorCallback, settings);
}

export {
  isLocationAvailable,
  askPermission,
  getUserLocation
}