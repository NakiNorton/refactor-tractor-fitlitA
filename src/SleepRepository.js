import Sleep from "../src/Sleep";

class SleepRepository {
  constructor(todaysDate) {
    this.individualEntryRecord;
    this.hoursSlept = this.findTodaysTotalSleep(todaysDate);
    this.weeklyHoursSlept = this.getWeekAvgHours()
    this.weeklyQualHoursSlept = this.calculateAverageHoursThisWeek(todaysDate)
  }
  
  
  findTodaysTotalSleep() {
    return this.individualEntryRecord[0]
  }
  // ^^^^^ ounces TODAY


  // ^^^^^SEARCH ounces DAILY ???
  getWeeksDailyHours() {
    let week = this.individualEntryRecord.slice(-7, -1)
    return week.map(day => {
      return day.hoursSlept
    })
  }

  // ^^^^^LAST 7 DAYS ounces RECORD
  // ^^^^^average ounces OVERALL
  // ^^^^^ average ounces BY WEEK

  //not sure we need this given what the card has show us
  // findHoursSleptByDay(date) { 
  //   return this.individualEntryRecords.find(entry => entry.date === date);
  // }
  getAveQualitySlept() {
    let week = this.individualEntryRecords.slice(-7);
    let qualityHrsSleptTotal = week.reduce((sum, entry) => {
      sum += entry.sleepQuality;
      return sum;
    }, 0);
    return Number((qualityHrsSleptTotal / 7).toFixed(0));
  }


  findUsersSleepData(rawSleepData) {
    rawSleepData.filter(record => {
      
    })
  }
  instantiateRawData(rawSleepData) {
    return rawSleepData.map(data => new Sleep(data));
  }

  calculateAverageQualityThisWeek(todaysDate) {
    return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
      let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todaysDate));
      if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct.quality;
      }
      return sum;
    }, 0) / this.sleepQualityRecord.length).toFixed(1);
  }
}

export default SleepRepository;