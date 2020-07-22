import Activity from './Activity';

class ActivityRepository {
  constructor(rawActivityData) {
    this.activities = this.instantiateRawData(rawActivityData);
  }

  instantiateRawData(rawActivityData) {
    return rawActivityData.map((data) => new Activity(data));
  }
}

export default ActivityRepository;