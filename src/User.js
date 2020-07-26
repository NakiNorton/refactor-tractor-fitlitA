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

  calculateAverageHoursThisWeek(todaysDate) {
    return (
      this.sleepHoursRecord.reduce((sum, sleepAct) => {
        let index = this.sleepHoursRecord.indexOf(
          this.sleepHoursRecord.find((sleep) => sleep.date === todaysDate)
        );
        if (
          index <= this.sleepHoursRecord.indexOf(sleepAct) &&
     this.sleepHoursRecord.indexOf(sleepAct) <= index + 6
        ) {
          sum += sleepAct.hours;
        }
        return sum;
      }, 0) / this.sleepHoursRecord.length
    ).toFixed(1);
  }

  compareUserGoalWithCommunityGoal(userRepository) {
    let communityStepGoal = userRepository.calculateCommunityAvgStepGoal();
    let goalDifference = communityStepGoal - this.dailyStepGoal;
    return goalDifference;
  }

  findFriends(userRepository) {
    return this.friends.reduce((friendsInfo, friend) => {
      friend = userRepository.users.find(user => user.id === friend);
      let friendInfo = {
        firstName: friend.name,
        weeklySteps: friend.activityInfo.calculateAverageStepsThisWeek(),
      };
      friendsInfo.push(friendInfo);
      return friendsInfo;
    }, []);
  }

  // calculateAverageQualityThisWeek(todaysDate) {
  //   return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
  //     let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todaysDate));
  //     if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
  //       sum += sleepAct.quality;
  //     }
  //     return sum;
  //   }, 0) / this.sleepQualityRecord.length).toFixed(1);
  // } // should be in sleep class

  // findTrendingStepDays() {
  //   let positiveDays = [];
  //   for (var i = 0; i < this.activityRecord.length; i++) {
  //     if (this.activityRecord[i + 1] && this.activityRecord[i].steps > this.activityRecord[i + 1].steps) {
  //       positiveDays.unshift(this.activityRecord[i].date);
  //     } else if (positiveDays.length > 2) {
  //       this.trendingStepDays.push(`Your most recent positive step streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
  //       positiveDays = [];
  //     }
  //   }
  // }

  // findTrendingStairsDays() {
  //   let positiveDays = [];
  //   for (var i = 0; i < this.activityRecord.length; i++) {
  //     if (this.activityRecord[i + 1] && this.activityRecord[i].flightsOfStairs > this.activityRecord[i + 1].flightsOfStairs) {
  //       positiveDays.unshift(this.activityRecord[i].date);
  //     } else if (positiveDays.length > 2) {
  //       this.trendingStairsDays.push(`Your most recent positive climbing streak was ${positiveDays[0]} - ${positiveDays[positiveDays.length - 1]}!`);
  //       positiveDays = [];
  //     }
  //   }
  // }
  // ^^ trend stuff is iteration 5

  // findFriendsTotalStepsForWeek(users, date) {
  //   this.friends.map(friend => {
  //     let matchedFriend = users.find(user => user.id === friend);
  //     matchedFriend.calculateTotalStepsThisWeek(date);
  //     this.friendsActivityRecords.push(
  //       {
  //         'id': matchedFriend.id,
  //         'firstName': matchedFriend.name.toUpperCase().split(' ')[0],
  //         'totalWeeklySteps': matchedFriend.totalStepsThisWeek
  //       })
  //   })
  //   this.calculateTotalStepsThisWeek(date);
  //   this.friendsActivityRecords.push({
  //     'id': this.id,
  //     'firstName': 'YOU',
  //     'totalWeeklySteps': this.totalStepsThisWeek
  //   });
  //   this.friendsActivityRecords = this.friendsActivityRecords
  //     .sort((a, b) => b.totalWeeklySteps - a.totalWeeklySteps);
  // }

  // calculateAverageQualityThisWeek(todaysDate) {
  //   return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
  //     let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todaysDate));
  //     if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
  //       sum += sleepAct.quality;
  //     }
  //     return sum;
  //   }, 0) / this.sleepQualityRecord.length).toFixed(1);
  // } // should be in sleep repo
}

export default User;
