import Hydration from "./Hydration";

class HydrationRepository {
  constructor(today) {
    this.individualEntryRecord = [];
    this.allDailyEntryRecord = [];
    this.ouncesAverage = 0;
  }
  
  
  findTodaysTotalWater(today) {
    let allTodayWaterEntries = this.individualEntryRecord.filter(record => {
      return record.date === today;
    })
    let sumOuncesToday = allTodayWaterEntries.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
    this.allDailyEntryRecord.push(sumOuncesToday);
    return sumOuncesToday;
  }

    
  // getWeekAvgOunces() {
  //   let week = this.ouncesRecord.splice(0, 7);
  //   let weekTotal = week.reduce((sum, entry) => {
  //     sum += entry.ounces;
  //     return sum;
  //   }, 0);
  //   return weekTotal / 7;
  // }

  // getWeekOuncesByDay() {
  //   let week = this.ouncesRecord.splice(0, 7);
  //   if (week.length !== 0) {
  //     return week.reduce((weekList, day) => {
  //       weekList.push({ [day.date]: day.ounces });
  //       return weekList;
  //     }, []);
  //   } else {
  //     return "Drink more water!";
  //   }
  // }

  //  findWeeks;

  // findToday's amount of water
  // filter ouncesRecord if data matches todaysDate
  // reduce over the new record and return sum
  // how would we get todaysDate?

  // findWeek's amount of water
  //
}


export default HydrationRepository;