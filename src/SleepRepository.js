// import Sleep from "../src/Sleep";

class SleepRepository {
  constructor(todaysDate) {
    this.individualEntryRecords = [];
    // this.hoursSlept = this.findTodaysTotalSleep(todaysDate);
    // this.weeklyHoursSlept = this.getWeekAveHoursSlept()
    // this.weeklyQualHoursSlept = this.calculateAverageHoursThisWeek(todaysDate)
  }
  
  findTodaysTotalSleep(date) {
    console.log('asdfa', this.individualEntryRecords)
    let hoursSleptToday = this.individualEntryRecords.filter(record => {
      return record.date === date;
    })
      .reduce((sum, entry) => {
        sum += entry.hoursSlept;
        return sum;
      }, 0);
    return hoursSleptToday;
  }

  getWeeksDailyHours() {
    let week = this.individualEntryRecords.slice(-7, -1)
    return week.map(day => {
      return day.hoursSlept
    })
  }

  getWeeksDailyQualHours() {
    let week = this.individualEntryRecords.slice(-7, -1)
    return week.map(day => {
      return day.sleepQuality
    })
  }

  getAveQualitySleptOverall() {
    console.log('Lives in getAveQualSleptOVerall', this.individualEntryRecords)
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

  getWeekAvgQualityHrsSlept(todaysDate) {
    return (this.individualEntryRecords.reduce((sum, sleep) => {
      let index = this.individualEntryRecords.indexOf(this.individualEntryRecords.find(sleep => sleep.date === todaysDate));
      if (index <= this.individualEntryRecords.indexOf(sleep) && this.individualEntryRecords.indexOf(sleep) <= (index + 6)) {
        sum += sleep.sleepQuality;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

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