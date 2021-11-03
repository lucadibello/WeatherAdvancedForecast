function isLocationAvailable (): boolean {
  return Boolean(navigator.geolocation);
}

export {
  isLocationAvailable
}