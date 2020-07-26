class HydrationRepository {
  constructor(today) {
    this.individualEntryRecords = [];
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

  getWeekAvgOunces() {
    let week = this.getWeeksDailyOunces();
    let numOuncesTotal = week.reduce((sum, entry) => {
      sum += entry;
      return sum;
    }, 0);
    let weekAverageOunces = (numOuncesTotal / 7).toFixed(0);
    return Number(weekAverageOunces);
  }

  addHydroInfo(input) {
    let foundInRecord = this.individualEntryRecords.find(record => record.date === input.date);
    if (foundInRecord) {
      foundInRecord.numOunces = foundInRecord.numOunces + input.numOunces;
    } else {
      this.individualEntryRecords.push(input);
    }
  }

  
}

    



export default HydrationRepository;