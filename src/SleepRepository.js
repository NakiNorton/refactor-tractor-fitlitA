class SleepRepository {
  constructor() {
    this.individualEntryRecords = [];
  }
  
  findLastNightsSleepQual() {
    return this.individualEntryRecords[0].sleepQuality
  }

  findLastNightsHours() {
    return this.individualEntryRecords[0].hoursSlept
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
    let qualityHours = this.individualEntryRecords.reduce((sum, entry) => {
      sum += entry.sleepQuality;
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

  addSleepInput(input) {
    let foundInRecord = this.individualEntryRecords.find(record => record.date === input.date);
    if (foundInRecord) {
      foundInRecord.hoursSlept = foundInRecord.numOunces + input.numOunces;
    } else {
      this.individualEntryRecords.push(input);
    }
  }
}

export default SleepRepository;