import HydrationRepository from "./HydrationRepository";
import ActivityRepository from "./ActivityRepository";
import SleepRepository from "./SleepRepository";

class User {
  constructor(userDetails, todaysDate) {
    this.id = this.checkUserId(userDetails.id);
    this.name = this.checkName(userDetails.name);
    this.address = userDetails.address || "No address added.";
    this.email = userDetails.email || "No email address added.";
    this.strideLength = userDetails.strideLength || "Stride length not added.";
    this.dailyStepGoal = userDetails.dailyStepGoal || 0;
    this.friends = userDetails.friends || [];
    this.hydrationInfo = new HydrationRepository(todaysDate);
    this.sleepInfo = new SleepRepository(todaysDate);
    this.activityInfo = new ActivityRepository(todaysDate);
  }

  checkUserId(user) {
    return typeof user === "number" ? user : Date.now();
  }

  checkName(user) {
    return typeof user === "string" ? user : "guest";
  }

  getFirstName() {
    let names = this.name.split(" ");
    return names[0].toUpperCase();
  }

  findClimbingRecord() {
    return this.activityRecord.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })[0].flightsOfStairs;
  }

  calculateAverageFlightsThisWeek(todaysDate) {
    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find((activity) => activity.date === todaysDate));
      if (
        index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= index + 6) {
        sum += activity.flightsOfStairs;
      }
      return sum;
    }, 0) / 7).toFixed(1);
  }

  findFriends(userRepository) {
    return this.friends.reduce((friendsInfo, friend) => {
      friend = userRepository.users.find((user) => user.id === friend);
      let friendInfo = {
        firstName: friend.name,
        weeklySteps: friend.activityInfo.getAverageStepsThisWeek(),
      };
      friendsInfo.push(friendInfo);
      return friendsInfo;
    }, []);
  }
}

export default User;
