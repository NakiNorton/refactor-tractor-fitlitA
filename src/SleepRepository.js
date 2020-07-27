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
    let week = this.individualEntryRecords.slice(-7)
    return week.map(day => {
      return day.hoursSlept
    })
  }

  getWeeksDailyQual() {
    let week = this.individualEntryRecords.slice(-7)
    return week.map(day => {
      return day.sleepQuality
    })
  }

  getAvgQualitySleptOverall() {
    let qualityHours = this.individualEntryRecords.reduce((sum, entry) => {
      sum += entry.sleepQuality;
      return sum;
    }, 0);
    let overallAverageQuality = (qualityHours / this.individualEntryRecords.length).toFixed(1)
    return Number(overallAverageQuality);
  }
 
  getAvgHoursSleptOverall() {
    let hoursSlept = this.individualEntryRecords.reduce((sum, entry) => {
      sum += entry.hoursSlept;
      return sum;
    }, 0);
    let overallAverageHoursSlept = (hoursSlept / this.individualEntryRecords.length).toFixed(0)
    return Number(overallAverageHoursSlept)
  }

  getWeekAvgQualitySlept(todaysDate) {
    let week = this.getWeeksDailyQual();
    let sleepQualityTotal = week.reduce((sum, entry) => {
      sum += entry;
      return sum;
    }, 0);
    let weeklyQuality = (sleepQualityTotal / week.length).toFixed(1);
    return Number(weeklyQuality); 
  }

  getWeekAvgHoursSlept(todaysDate) {
    let week = this.getWeeksDailyHours();
    let hoursSleptTotal = week.reduce((sum, entry) => {
      sum += entry;
      return sum;
    }, 0);
    let weeklyHoursSlept = (hoursSleptTotal / week.length).toFixed(0);
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