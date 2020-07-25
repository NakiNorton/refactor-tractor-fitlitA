
class HydrationRepository {
  constructor(today) {
    this.individualEntryRecords = [];
  }
    
  findTodaysTotalWater(today) {
    let allTodayWaterEntries = this.individualEntryRecords.filter(record => {
      return record.date === today;
    })
    return allTodayWaterEntries.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
  }

  getWeekAvgOunces() {
    let week = this.individualEntryRecords.splice(0, 7);
    let weekTotal = week.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
    return weekTotal / week.length;
  }
}
    



export default HydrationRepository;