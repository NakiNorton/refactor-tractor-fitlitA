import Sleep from "../src/Sleep";

class SleepRepository {
  constructor(rawSleepData) {
    this.individualEntryRecord = ;
    this.hoursSlept = this.findTodaysTotalSleep(todaysDate);
    this.weeklyHoursSlept = this.getWeekAvgHours()
    this.weeklyQualHoursSlept = this.calculateAverageHoursThisWeek(todaysDate)
  }

  findUsersSleepData(rawSleepData) {
    rawSleepData.filter(record => {
      
    })
  }
  instantiateRawData(rawSleepData) {
    return rawSleepData.map(data => new Sleep(data));
  }

  findTodaysTotalSleep(today) {
    let todaysSleepEntries = this.individualEntryRecord.filter(record => {
      return record.date === today
    })
    return todaysSleepEntries.reduce((sum, entry) => {
      sum += Number(entry.hoursSlept)
      console.log('this is somehow working i hope', sum)
      return sum
    })
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