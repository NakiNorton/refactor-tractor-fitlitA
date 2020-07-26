import HydrationRepository from "./HydrationRepository";
import ActivityRepository from "./ActivityRepository";
import SleepRepository from "./SleepRepository";

class User {
  constructor(userDetails, todayDate) {
    this.id = this.checkUserId(userDetails.id);
    this.name = this.checkName(userDetails.name);
    this.address = userDetails.address || "No address added.";
    this.email = userDetails.email || "No email address added.";
    this.strideLength = userDetails.strideLength || "Stride length not added.";
    this.dailyStepGoal = userDetails.dailyStepGoal || 0;
    this.friends = userDetails.friends || [];
    this.hydrationInfo = new HydrationRepository(todayDate);
    this.sleepInfo = new SleepRepository(todayDate);
    this.activityInfo = new ActivityRepository(todayDate);
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

  // findFriendsNames(users) {
  //   this.friends.forEach(friend => {
  //     this.friendsNames.push(users.find(user => user.id === friend).getFirstName());
  //   })
  // }
  // ^^ friend stuff is iteration 5

  

 
}

export default User;
