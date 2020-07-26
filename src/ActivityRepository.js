// import Activity from './Activity';

class ActivityRepository {
  constructor(today) {
    this.individualEntryRecords = [];
  }


  getActiveMinutesForToday(date) {
    let todaysActivityRecord = this.individualEntryRecords.filter(record => {
      return record.date === date;
    })
      .reduce((sum, entry) => {
        sum += entry.minutesActive;
        return sum;
      }, 0);
    return todaysActivityRecord;
  }

  // i think these two methods could be modified if change how the input comes in scripts.

  getStepsForToday(date) {
    let todaysStepRecord = this.individualEntryRecords.filter(record => {
      return record.date === date;
    })
      .reduce((sum, entry) => {
        sum += entry.numSteps;
        return sum;
      }, 0);
    return todaysStepRecord;
  }

  calculateMiles(user, date) {
    this.individualEntryRecords.filter(record => {
      return record.date === date; // get record for today
    })
    return Math.round(this.getStepsForToday(date) * user.strideLength / 5280).toFixed(1); // doesn't need a reduce because if getStepsForToday should update this record?
  }

    updateActivities(activity) {
    console.log('WORKING')
    this.individualEntryRecords.unshift(activity);
    // if (activity.numSteps >= this.dailyStepGoal) {
    //   this.accomplishedDays.unshift(activity.date);
    // }
      console.log(this.individualEntryRecords)
  }

  calculateAverageMinutesActiveThisWeek(todaysDate) {
    return (this.individualEntryRecords.reduce((sum, activity) => {
      let index = this.individualEntryRecords.indexOf(this.individualEntryRecords.find(activity => activity.date === todaysDate));
      if (index <= this.individualEntryRecords.indexOf(activity) && this.individualEntryRecords.indexOf(activity) <= (index + 6)) {
        sum += activity.minutesActive;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  compareStepGoal(userRepository) {
    let userStepGoal = userRepository.users
      .find(user => user.id === this.userId).dailyStepGoal;
    this.reachedStepGoal = this.steps >= userStepGoal;
  }

  calculateAverageStepsThisWeek(todaysDate) {
    return (this.individualEntryRecords.reduce((sum, activity) => {
      let index = this.individualEntryRecords.indexOf(this.individualEntryRecords.find(activity => activity.date === todaysDate));
      if (index <= this.individualEntryRecords.indexOf(activity) && this.individualEntryRecords.indexOf(activity) <= (index + 6)) {
        sum += activity.numSteps;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  getStairsByDay(date) {
    let dayFound = this.individualEntryRecords.find(entry => entry.date === date);
    return dayFound ? (dayFound.flightsOfStairs * 12) : 0;
  }

  addStairsInfo(input) {
    let foundInRecord = this.individualEntryRecords.find(record => record.date === input.date);
    if (foundInRecord) {
      foundInRecord.flightsOfStairs = foundInRecord.flightsOfStairs + input.flightsOfStairs;
    } else {
      this.individualEntryRecords.push(input);
    }
  }

  getHighestStairsRecord() {
    let totalFlights = this.individualEntryRecords.reduce((totalFlights, entry) => {
      totalFlights += entry.flightsOfStairs;
      return totalFlights;
    }, 0);
    return (totalFlights / 12).toFixed(0); 
  }

  getWeeklyFlightsClimbed() {
    let week = this.individualEntryRecords.slice(-7);
    return week.reduce((totalFlights, day) => {
      totalFlights += day.flightsOfStairs;
      return totalFlights;
    }, 0);
  }

  getWeeklyStairsClimbed() {
    return this.getWeeklyFlightsClimbed() * 12;
  }

}


export default ActivityRepository;