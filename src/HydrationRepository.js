import Hydration from "./Hydration";

class HydrationRepository {
  constructor(today) {
    this.individualEntryRecords = [];
    this.allDailyEntryRecords = this.recordEntriesByDay();
    this.ouncesAverageWeek = 0;
  }
  
  // this.allDailyEntryRecord.push({date: today, numOunces: sumOuncesToday });
  
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
    return this.individualEntryRecords.reduce((dailyEntryRecords, entry) => {
      let dailyEntry = {}
      if (!dailyEntry[entry.date]) {
        dailyEntry[entry.date] = 0;
      }
      dailyEntry[entry.date] = entry.numOunces;
      console.log(dailyEntry);
      dailyEntryRecords.push(dailyEntry);
      return dailyEntryRecords;
    }, []); 

    // we want to make objects of each day of entries 
    // sum up their numOunces on that day
    // push that obj to the dailyEntryRecord
  }

    
  // getWeekAvgOunces() {
  //   let week = this.ouncesRecord.splice(0, 7);
  //   let weekTotal = week.reduce((sum, entry) => {
  //     sum += entry.ounces;
  //     return sum;
  //   }, 0);
  //   return weekTotal / 7;
  // }

}


export default HydrationRepository;