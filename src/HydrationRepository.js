
class HydrationRepository {
  constructor(today) {
    this.individualEntryRecords = [];
    this.todaysWaterData = this.findTodaysTotalWater(today);
    this.weeklyAvgOunces = this.getWeekAvgOunces();
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
    let week = this.individualEntryRecords.splice(0, 7);
    let weekTotal = week.reduce((sum, entry) => {
      sum += Number(entry.numOunces);
      return sum;
    }, 0);
    return weekTotal / week.length;
  }
}
    



export default HydrationRepository;