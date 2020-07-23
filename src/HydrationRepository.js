import Hydration from "./Hydration";

class HydrationRepository {
  constructor(userRawHydrationData) {
    // this.hydrationData = this.instantiateHydroData(rawHydrationData);
    this.ouncesAverage = 0;
    this.ouncesRecord = [this.hydrationData];
  }

  // instantiateHydroData(rawHydrationData) {
  //   return rawHydrationData.map((data) => new Hydration(data));
  // }

  // findToday's amount of water
  // filter ouncesRecord if data matches todaysDate
  // reduce over the new record and return sum

  // findWeek's amount of water
  // 

}


export default HydrationRepository;