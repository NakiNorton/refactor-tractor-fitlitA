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

  getWeeksDailyQualHours() {
    let week = this.individualEntryRecord.slice(-7, -1)
    return week.map(day => {
      return day.sleepQuality
    })

  }


  // ^^^^^LAST 7 DAYS ounces RECORD


  getAveQualitySleptOverall() {
    let qualityHours = this.individualEntryRecords.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
    let overallAverageQuality = (qualityHours / this.individualEntryRecords.length).toFixed(0)
    return Number(overallAverageQuality);
    }
  

  getAveHoursSleptOverall() {
    let hoursSlept = this.individualEntryRecords.reduce((sum, entry) => {
      sum += entry.hoursSlept;
      return sum;
    }, 0);
    let overallAverageHoursSlept = (hoursSlept / this.individualEntryRecords.length).toFixed(0)
    return Number(overallAverageHoursSlept)
  }



  getWeekAvgQualityHrsSlept() {
    let week = this.getWeeksDailyQualHours();
    let qualHrsSleptTotal = week.reduce((sum, entry) => {
      sum += entry;
      return sum;
    }, 0);
    let weeklyQualHrsSlept = (qualHrsSleptTotal / 7).toFixed(0);
    return Number(weeklyQualHrsSlept);
  }
  // ^^^^^ average ounces BY WEEK


  getWeekAveHoursSlept(todaysDate) {
    let week = this.getWeeksDailyHours();
    let hoursSleptTotal = week.reduce((sum, entry) => {
      sum += entry;
      return sum;
    }, 0);
    let weeklyHoursSlept = (hoursSleptTotal / 7).toFixed(0);
    return Number(weeklyHoursSlept);
  }

  // addSleepInput(input) {
  //   let foundInRecord = this.individualEntryRecords.find(record => record.date === input.date);
  //   if (foundInRecord) {
  //     foundInRecord.hoursSlept = foundInRecord.numOunces + input.numOunces;
  //   } else {
  //     this.individualEntryRecords.push(input);
  //   }
  // }
}

export default SleepRepository;