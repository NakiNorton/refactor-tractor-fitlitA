import Hydration from "./Hydration";

class HydrationRepository {
  constructor(rawHydrationData) {
    this.hydrationData = this.instantiateHydroData(rawHydrationData);
  }

  // instantiateHydroData(rawHydrationData) {
  //   return rawHydrationData.map((data) => new Hydration(data));
  // }
}


// export default HydrationRepository;