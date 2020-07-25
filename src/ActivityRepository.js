// import Activity from './Activity';

class ActivityRepository {
  constructor(date) {
    this.individualEntryRecords = [];
    this.todaysDate = date;
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

  getStepsForToday(date) {
    let currentStepTotal = this.individualEntryRecords.filter(record => {
      return record.date === date;
    })
    return currentStepTotal.reduce((sum, entry) => {
      sum += entry.numSteps;
      console.log('step sum:', sum)
      return sum;
    }, 0);
  }

  calculateMiles(user, date) {
    this.individualEntryRecords.filter(record => {
      return record.date === date; // get record for today
    })
    return Math.round(this.getStepsForToday(date) * user.strideLength / 5280).toFixed(1);
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