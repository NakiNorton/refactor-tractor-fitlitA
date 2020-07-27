class HydrationRepository {
  constructor(today) {
    this.individualEntryRecords = [];
    // this.averageOuncesAllTime = this.getAverageOuncesOverall();
  }
  
  getOuncesByDay(date) {
    let dayFound = this.individualEntryRecords.find(entry => entry.date === date);
    return dayFound ? dayFound.numOunces : 0;
  }

  getAverageOuncesOverall() {
    let sumOunces = this.individualEntryRecords.reduce((sum, entry) => {
      sum += entry.numOunces;
      return sum;
    }, 0);
    let overallAverageOunces = (sumOunces / this.individualEntryRecords.length).toFixed(0)
    return Number(overallAverageOunces);
  }
  
  getWeeksDailyOunces() {
    let week = this.individualEntryRecords.slice(-7, -1);
    return week.map(day => {
      return day.numOunces;
    });
  }

  getWeeklyAvgOunces(today) {
    let totalWeeklyOunces = this.individualEntryRecords.reduce((sum, entry) => {
      let todaysEntry = this.individualEntryRecords.find(entry => entry.date === today);
      let index = this.individualEntryRecords.indexOf(todaysEntry);
      if (index <= this.individualEntryRecords.indexOf(entry) && this.individualEntryRecords.indexOf(entry) <= (index + 6)) {
        sum += entry.numOunces;
      }
      return sum;
    }, 0);
    let averageWeeklyOunces = (totalWeeklyOunces / 7).toFixed(0);
    return Number(averageWeeklyOunces);
  }
  // ^^^^^ average ounces BY WEEK


  addHydroInput(input) {
    let foundInRecord = this.individualEntryRecords.find(record => record.date === input.date);
    if (foundInRecord) {
      foundInRecord.numOunces = foundInRecord.numOunces + input.numOunces;
    } else {
      this.individualEntryRecords.push(input);
    }
  }

  
}

    



export default HydrationRepository;