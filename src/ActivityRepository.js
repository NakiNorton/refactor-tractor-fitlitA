// import Activity from './Activity';

class ActivityRepository {
  constructor() {
    this.individualEntryRecords = [];
   
    // this.doActivity(userRepository);
    // this.steps = data.numSteps;
    //     // this.minutesActive = data.minutesActive;
    //     // this.flightsOfStairs = data.flightsOfStairs;
    //     // this.milesWalked = 0;
    //     // this.reachedStepGoal = null;
  }

  // doActivity(userRepo) {
  //   var activity = this;
  //   userRepo.users.find(function (user) {
  //     return user.id === activity.userId;
  //   }).updateActivities(this);
  // }

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


  calculateAverageStepsThisWeek(todaysDate) {
    return (this.individualEntryRecords.reduce((sum, activity) => {
      let index = this.individualEntryRecords.indexOf(this.individualEntryRecords.find(activity => activity.date === todaysDate));
      if (index <= this.individualEntryRecords.indexOf(activity) && this.individualEntryRecords.indexOf(activity) <= (index + 6)) {
        sum += activity.numSteps;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  calculateFlightOfStairs(input) {
    return this.flightsOfStairs += (12 * input);
  }


  compareStepGoal(userRepository) {
    let userStepGoal = userRepository.users
      .find(user => user.id === this.userId).dailyStepGoal;
    this.reachedStepGoal = this.steps >= userStepGoal;
  }
}


export default ActivityRepository;