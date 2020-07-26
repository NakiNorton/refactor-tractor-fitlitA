import Sleep from "../src/Sleep";

class SleepRepository {
  constructor(todaysDate) {
    this.individualEntryRecord;
    this.hoursSlept = this.findTodaysTotalSleep(todaysDate);
    this.weeklyHoursSlept = this.getWeekAvgHours()
    this.weeklyQualHoursSlept = this.calculateAverageHoursThisWeek(todaysDate)
  }

  findHoursSleptByDay(date) {
    return this.individualEntryRecords.find(entry => entry.date === date);
  }

  getWeeksAveHoursSlept() {
    let week = this.individualEntryRecords.slice(-7);
    let hoursSlepTotal = week.reduce((sum, entry) => {
      sum += entry.hoursSlept;
      return sum;
    }, 0);
    return Number((hoursSlepTotal / 7).toFixed(0));
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