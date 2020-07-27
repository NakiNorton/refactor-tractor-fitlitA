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

  // calculateAverageHoursThisWeek(todaysDate) {
  //   return (this.sleepHoursRecord.reduce((sum, sleepAct) => {
  //     let index = this.sleepHoursRecord.indexOf(this.sleepHoursRecord.find(sleep => sleep.date === todaysDate));
  //     if (index <= this.sleepHoursRecord.indexOf(sleepAct) && this.sleepHoursRecord.indexOf(sleepAct) <= (index + 6)) {
  //       sum += sleepAct.hours;
  //     }
  //     return sum;
  //   }, 0) / this.sleepHoursRecord.length).toFixed(1);
  // }

  // calculateAverageQualityThisWeek(todaysDate) {
  //   return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
  //     let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todaysDate));
  //     if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
  //       sum += sleepAct.quality;
  //     }
  //     return sum;
  //   }, 0) / this.sleepQualityRecord.length).toFixed(1);
  // }

  // updateSleep(date, hours, quality) {
  //   this.sleepHoursRecord.unshift({date, hours});
  //   this.sleepQualityRecord.unshift({date, quality});
  //   if (this.sleepHoursRecord.length) {
  //     this.hoursSleptAverage = ((hours + (this.hoursSleptAverage * (this.sleepHoursRecord.length - 1))) / this.sleepHoursRecord.length).toFixed(1);
  //   } else {
  //     this.hoursSleptAverage = hours;
  //   }
  //   if (this.sleepQualityRecord.length) {
  //     this.sleepQualityAverage = ((quality + (this.sleepQualityAverage * (this.sleepQualityRecord.length - 1))) / this.sleepQualityRecord.length).toFixed(1);
  //   } else {
  //     this.sleepQualityAverage = quality;
  //   }

  findClimbingRecord() {
    return this.activityRecord.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })[0].flightsOfStairs;
  }

  calculateAverageFlightsThisWeek(todaysDate) {
    return (
      this.activityRecord.reduce((sum, activity) => {
        let index = this.activityRecord.indexOf(
          this.activityRecord.find((activity) => activity.date === todaysDate)
        );
        if (
          index <= this.activityRecord.indexOf(activity) &&
     this.activityRecord.indexOf(activity) <= index + 6
        ) {
          sum += activity.flightsOfStairs;
        }
        return sum;
      }, 0) / 7
    ).toFixed(1);
  }

  ////// NOT USING THIS:
  calculateDailyCalories(date) {
    let totalMinutes = this.activityRecord
      .filter((activity) => {
        return activity.date === date;
      })
      .reduce((sumMinutes, activity) => {
        return (sumMinutes += activity.minutesActive);
      }, 0);
    return Math.round(totalMinutes * 7.6);
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
