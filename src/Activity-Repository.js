import Activity from './Activity';

class ActivityRepository {
  constructor(rawActivityData, todayDate) {
    this.individualEntryRecord = [];
    // this.activities = this.instantiateRawData(rawActivityData);
  }

  // instantiateRawData(rawActivityData) {
  //   return rawActivityData.map((data) => new Activity(data));
  // }
}

export default ActivityRepository;