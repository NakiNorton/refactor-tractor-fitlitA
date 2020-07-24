import Hydration from "./Hydration";

class HydrationRepository {
  constructor(today) {
    this.individualEntryRecords = [];
    this.allDailyEntryRecords = this.recordEntriesByDay();
    this.ouncesAverageWeek = 0;
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

  recordEntriesByDay() {
    let dailyEntry = {}
    return this.individualEntryRecords.reduce((dailyEntryRecords, entry) => {
      if (!dailyEntry[entry.date]) {
        dailyEntry[entry.date];
      }
      dailyEntry[entry.date] = entry.numOunces;
      dailyEntryRecords.push(dailyEntry);
      return dailyEntryRecords;
    }, []); 

    // we want to make objects of each day of entries 
    // sum up their numOunces on that day
    // push that obj to the dailyEntryRecord
    // broken
  }
    
  getWeekAvgOunces() {
    let week = this.allDailyEntryRecords.splice(0, 7);
    let weekTotal = week.reduce((sum, entry) => {
      sum += entry.ounces;
      return sum;
    }, 0);
    return weekTotal / week.length;
  }

}


export default HydrationRepository;