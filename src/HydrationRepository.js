import Hydration from "./Hydration";

class HydrationRepository {
  constructor(rawHydrationData) {
    this.hydrationData = this.instantiateHydroData(rawHydrationData);
  }

  instantiateHydroData(rawHydrationData) {
    rawHydrationData.forEach((data) => new Hydration(data));
  }
}


export default HydrationRepository