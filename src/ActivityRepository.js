class ActivityRepository {
  constructor() {
    this.individualEntryRecords = [];
  }

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

  calculateMiles(user, date) {
    this.individualEntryRecords.filter(record => {
      return record.date === date; // get record for today
    })
    return Math.round(this.getStepsForToday(date) * user.strideLength / 5280).toFixed(1); 
  }

  updateActivities(activity) {
    console.log('WORKING')
    this.individualEntryRecords.unshift(activity);
    // if (activity.numSteps >= this.dailyStepGoal) {
    //   this.accomplishedDays.unshift(activity.date);
    // }
      console.log(this.individualEntryRecords)
  //reminder for Leigh to ask Steph about names
  }

  calculateTotalStepsThisWeek(todaysDate) {
    this.totalStepsThisWeek = (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todaysDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0));
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
  // ^^ wrote notes for this in test


  calculateAverageStepsThisWeek(todaysDate) {
    return (this.individualEntryRecords.reduce((sum, activity) => {
      let dayFound = this.individualEntryRecords.find(activity => activity.date === todaysDate);
      let index = this.individualEntryRecords.indexOf(dayFound);
      if (index <= this.individualEntryRecords.indexOf(activity) && this.individualEntryRecords.indexOf(activity) <= (index + 6)) {
        sum += activity.numSteps;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  calculateDailyCalories(date) {
    let totalMinutes = this.activityRecord.filter(activity => {
      return activity.date === date
    }).reduce((sumMinutes, activity) => {
      return sumMinutes += activity.minutesActive
    }, 0);
    return Math.round(totalMinutes * 7.6);
  }

// Stairs Methods

  compareUserGoalWithCommunityGoal(userGoal, userRepo) {
    let communityStepGoal = userRepo.calculateCommunityAvgStepGoal()
    let goalDifference = userGoal - communityStepGoal;
    if (goalDifference) { 
      return `Your goal is ${goalDifference} steps above average!`
    } else {
      return `Your goal is ${goalDifference} steps below average`
  
    }
  }
  // compareStepGoal(userRepository) {
  //   let userStepGoal = userRepository.users
  //     .find(user => user.id === this.userId).dailyStepGoal;
  //   this.reachedStepGoal = this.steps >= userStepGoal;
  // }

  addActivityInput(input) {
    let dayFound = this.individualEntryRecords.find(record => record.date === input.date);
    if (dayFound) {
      dayFound.numSteps += input.numSteps;
      dayFound.minutesActive += input.minutesActive;
    } else {
      this.individualEntryRecords.push(input);
    }
  }


  addStairsInput(input) {
    let dayFound = this.individualEntryRecords.find(record => record.date === input.date);
    dayFound ? dayFound.flightsOfStairs += input.flightsOfStairs : this.individualEntryRecords.push(input);
  }

  getStairsByDay(date) {
    let dayFound = this.individualEntryRecords.find(entry => entry.date === date);
    return dayFound ? (dayFound.flightsOfStairs * 12) : 0;
  }

  getAverageFlightsClimbedOverall() {
    let allFlights = this.individualEntryRecords.map(entry => entry.flightsOfStairs);
    let allFlightsSum = allFlights.reduce((sum, entry) => {
      sum += entry;
      return sum;
    }, 0);
    let averageFlights = (allFlightsSum / this.individualEntryRecords.length).toFixed(0);
    return Number(averageFlights);
  }

  getHighestStairsRecord() {
    let sortedEntriesByStairs = this.individualEntryRecords.sort((a, b) => a.flightsOfStairs - b.flightsOfStairs);
    return sortedEntriesByStairs.pop();
  }

  getWeeklyFlightsClimbed(date) {
    return this.individualEntryRecords.reduce((sum, entry) => {
      let dayFound = this.individualEntryRecords.find(entry => entry.date === date);
      let index = this.individualEntryRecords.indexOf(dayFound);
      if (index <= this.individualEntryRecords.indexOf(entry) && this.individualEntryRecords.indexOf(entry) <= (index + 6)) {
        sum += entry.flightsOfStairs;
      }
      return sum;
    }, 0); 
  }

  getWeeklyStairsClimbed() {
    return this.getWeeklyFlightsClimbed() * 12;
  }
}


export default ActivityRepository;