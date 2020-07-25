class HydrationRepository {
  constructor(today) {
    this.individualEntryRecords = [];
    // this.todaysWaterData = this.findTodaysTotalWater(today);
    this.averageOuncesAllTime = this.getAverageOuncesOverall();
  }
  
  getAverageOuncesOverall() {
    let sumOunces = this.individualEntryRecords.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
    return sumOunces / this.individualEntryRecords.length;
  }

// DOM stuff 
  findTodaysTotalWater(today) {
    return this.individualEntryRecords.find(record => record.date === today).numOunces;
  }


  getOuncesByDay(date) {
    return this.individualEntryRecords.find(entry => entry.date === date);
  }

  getWeekAvgOunces() {
    let week = this.individualEntryRecords.slice(-7);
    let numOuncesTotal = week.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
    return Number((numOuncesTotal / 7).toFixed(0));
  }

  getWeeksDailyOunces() {
    let week = this.individualEntryRecords.slice(-7)
    return week.map(day => {
      return day.numOunces;
    });
  }
  
}

    



export default HydrationRepository;