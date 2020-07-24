import Sleep from "../src/Sleep";

class SleepRepository {
  constructor(rawSleepData) {
    this.individualEntryRecord = [];
    // this.hoursSlept = [];
  }

  instantiateRawData(rawSleepData) {
    return rawSleepData.map(data => new Sleep(data));
  }


    calculateAverageHoursThisWeek(todayDate) {
    return (this.sleepHoursRecord.reduce((sum, sleepAct) => {
      let index = this.sleepHoursRecord.indexOf(this.sleepHoursRecord.find(sleep => sleep.date === todayDate));
      if (index <= this.sleepHoursRecord.indexOf(sleepAct) && this.sleepHoursRecord.indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct.hours;
      }
      return sum;
    }, 0) / this.sleepHoursRecord.length).toFixed(1);
  }

  calculateAverageQualityThisWeek(todayDate) {
    return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
      let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todayDate));
      if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct.quality;
      }
      return sum;
    }, 0) / this.sleepQualityRecord.length).toFixed(1);
  }
}

export default SleepRepository;