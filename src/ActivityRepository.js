class ActivityRepository {
  constructor() {
    this.individualEntryRecords = [];
  }

  addActivityInput(input) {
    let dayFound = this.individualEntryRecords.find(record => record.date === input.date);
    if (dayFound) {
      dayFound.numSteps += input.numSteps;
      dayFound.minutesActive += input.minutesActive;
      dayFound.flightsOfStairs += input.flightsOfStairs;
    } else {
      this.individualEntryRecords.push(input);
    }
  }

  getStepsForToday(date) {
    let todaysStepRecord = this.individualEntryRecords.find(record => record.date === date);
    return todaysStepRecord ? (todaysStepRecord.numSteps) : 0;
  }

  getActiveMinutesForToday(date) {
    let todaysActivityRecord = this.individualEntryRecords.find(record => record.date === date)
    return todaysActivityRecord ? (todaysActivityRecord.minutesActive) : 0;
  }

  getUsersMilesForDay(user, date) {
    if (this.getStepsForToday(date) > 0) {
      return Number((this.getStepsForToday(date) * user.strideLength / 5280).toFixed(1)); 
    } else {
      return 0;
    }
  }

  getTotalStepsThisWeek(todaysDate) {
    this.totalStepsThisWeek = (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todaysDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0));
  }

  getAverageMinutesActiveThisWeek(todaysDate) {
    return (this.individualEntryRecords.reduce((sum, activity) => {
      let index = this.individualEntryRecords.indexOf(this.individualEntryRecords.find(activity => activity.date === todaysDate));
      if (index <= this.individualEntryRecords.indexOf(activity) && this.individualEntryRecords.indexOf(activity) <= (index + 6)) {
        sum += activity.minutesActive;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  checkIfStepGoalAchieved(date, user) {
    let todaysRecord = this.individualEntryRecords.find(record => record.date === date);
    let goalReached = (todaysRecord.numSteps >= user.dailyStepGoal);
    return goalReached;
  }

  findAllDaysStepsExceededGoal(user) {
    let goalAchievedDates = [];
    this.individualEntryRecords.filter(record => { 
      if (record.numSteps >= user.dailyStepGoal) {
        goalAchievedDates.push(record.date);
      }
      return goalAchievedDates;
    })
  }
  
  getAverageStepsThisWeek(todaysDate) {
    return (this.individualEntryRecords.reduce((sum, activity) => {
      let dayFound = this.individualEntryRecords.find(activity => activity.date === todaysDate);
      let index = this.individualEntryRecords.indexOf(dayFound);
      if (index <= this.individualEntryRecords.indexOf(activity) && this.individualEntryRecords.indexOf(activity) <= (index + 6)) {
        sum += activity.numSteps;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  compareUserGoalWithCommunityGoal(userGoal, userRepo) {
    let communityStepGoal = userRepo.getCommunityAvgStepGoal();
    let goalDifference = userGoal - communityStepGoal;
    if (goalDifference > 0) { 
      return `Your goal is ${goalDifference} steps above average!`;
    } else {
      return `Your goal is ${goalDifference} steps below average!`;
    }
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
    let dayFound = this.individualEntryRecords.find(entry => entry.date === date);
    let index = this.individualEntryRecords.indexOf(dayFound);
    return this.individualEntryRecords.reduce((sum, entry) => {
      if (index <= this.individualEntryRecords.indexOf(entry) && this.individualEntryRecords.indexOf(entry) <= (index + 6)) {
        sum += entry.flightsOfStairs;
      }
      return sum;
    }, 0); 
  }

  getWeeklyStairsClimbed(date) {
    return this.getWeeklyFlightsClimbed(date) * 12;
  }
}

export default ActivityRepository;