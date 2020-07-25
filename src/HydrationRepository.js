
class HydrationRepository {
  constructor(today) {
    this.individualEntryRecords = [];
    this.todaysWaterData = this.findTodaysTotalWater(today);
  }
    
  findTodaysTotalWater(today) {
    let allTodayWaterEntries = this.individualEntryRecords.filter(record => {
      return record.date === today;
    })
    return allTodayWaterEntries.reduce((sum, entry) => {
      sum += Number(entry.numOunces);
      return sum;
    }, 0);
  }

  getWeekAvgOunces() {
    let week = this.individualEntryRecords.slice(-6);
    let numOuncesTotal = week.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
    return (numOuncesTotal / 7).toFixed(0);
  }

  getWeeksDailyOunces() {
    let week = this.individualEntryRecords.slice(-6);
    return week.map(day => `${day.numOunces}`);
  }

}
    



export default HydrationRepository;