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
  getAveQualitySleptOverall() {
    let qualityHours = this.individualEntryRecords.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
    let overallAverageQuality = (qualityHours / this.individualEntryRecords.length).toFixed(0)
    return Number(overallAverageQuality);
    }
  }

  getAveHoursSleptOverall() {
    let hoursSlept = this.individualEntryRecords.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
    let overallHoursSlept = (hoursSlept / this.individualEntryRecords.length).toFixed(0)
    return Number(overallHoursSlept)
    }
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