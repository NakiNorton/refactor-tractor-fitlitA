class Activity {
  constructor(data, userRepository) {
    this.individualEntryRecord = [];
    // this.userId = data.userID;
    // this.date = data.date;
    // this.steps = data.numSteps;
    // this.minutesActive = data.minutesActive;
    // this.flightsOfStairs = data.flightsOfStairs;
    // this.milesWalked = 0;
    // this.reachedStepGoal = null;
  }

  calculateMiles(userRepository) {
    let walkingUser = userRepository.users.find(user => user.id === this.userId);
    return Math.round(this.steps * walkingUser.strideLength / 5280)
      .toFixed(1);
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

export default Activity;
