import HydrationRepository from "./HydrationRepository";

class User {
  constructor(userDetails) {
    this.id = this.checkUserId(userDetails.id);
    this.name = this.checkName(userDetails.name);
    this.address = userDetails.address || 'No address added.';
    this.email = userDetails.email || 'No email address added.';
    this.strideLength = userDetails.strideLength || 'Stride length not added.';
    this.dailyStepGoal = userDetails.dailyStepGoal || 'Daily step goal not added.';
    this.friends = userDetails.friends || 'Add friends for friendly competition!';
    this.ouncesAverage = 0;
    this.ouncesRecord = [];
    this.sleepQualityAverage = 0;
    this.sleepHoursRecord = [];
    this.sleepQualityRecord = [];
    this.hoursSleptAverage = 0;
    this.totalStepsThisWeek = 0;
    this.activityRecord = [];
    this.accomplishedDays = [];
    this.hydration = new HydrationRepository(userDetails.hydrationData)
    // this.trendingStepDays = [];
    // this.trendingStairsDays = [];
    // this.friendsNames = [];
    // this.friendsActivityRecords = []
  }

  checkUserId(user) {
    return typeof user === 'number' ? user : Date.now();
  }

  checkName(user) {
    return typeof user === 'string' ? user : "guest";
  }

  getFirstName() {
    let names = this.name.split(' ');
    return names[0].toUpperCase();
  }

  updateHydration(today, amount) {
    this.ouncesRecord.unshift({date: today, ounces: amount});
    if (this.ouncesRecord.length) {
      this.ouncesAverage = Math.round((amount + (this.ouncesAverage * (this.ouncesRecord.length - 1))) / this.ouncesRecord.length);
    } else {
      this.ouncesAverage = amount;
    }
  }

  getWeekAvgOunces() {
    let week = this.ouncesRecord.splice(0, 7);
    let weekTotal = week.reduce((sum, entry) => {
      sum += entry.ounces;
      return sum;
    }, 0);
    return weekTotal / 7;
  }

  getWeekOuncesByDay() {
    let week = this.ouncesRecord.splice(0, 7);
    if (week.length !== 0) {
      return week.reduce((weekList, day) => {
        weekList.push({[day.date]: day.ounces});
        return weekList;
      }, []);
    } else {
      return 'Drink more water!';
    }
  }

  calculateAverageHoursThisWeek(todayDate) {
    return (this.sleepHoursRecord.reduce((sum, sleepAct) => {
      let index = this.sleepHoursRecord.indexOf(this.sleepHoursRecord.find(sleep => sleep.date === todayDate));
      if (index <= this.sleepHoursRecord.indexOf(sleepAct) && this.sleepHoursRecord.indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct.hours;
      }
      return sum;
    }, 0) / this.sleepHoursRecord.length).toFixed(1);
  }

  calculateAverageQualityThisWeek(todayDate) {
    return (this.sleepQualityRecord.reduce((sum, sleepAct) => {
      let index = this.sleepQualityRecord.indexOf(this.sleepQualityRecord.find(sleep => sleep.date === todayDate));
      if (index <= this.sleepQualityRecord.indexOf(sleepAct) && this.sleepQualityRecord.indexOf(sleepAct) <= (index + 6)) {
        sum += sleepAct.quality;
      }
      return sum;
    }, 0) / this.sleepQualityRecord.length).toFixed(1);
  }

  updateSleep(date, hours, quality) {
    this.sleepHoursRecord.unshift({date, hours});
    this.sleepQualityRecord.unshift({date, quality});
    if (this.sleepHoursRecord.length) {
      this.hoursSleptAverage = ((hours + (this.hoursSleptAverage * (this.sleepHoursRecord.length - 1))) / this.sleepHoursRecord.length).toFixed(1);
    } else {
      this.hoursSleptAverage = hours;
    }
    if (this.sleepQualityRecord.length) {
      this.sleepQualityAverage = ((quality + (this.sleepQualityAverage * (this.sleepQualityRecord.length - 1))) / this.sleepQualityRecord.length).toFixed(1);
    } else {
      this.sleepQualityAverage = quality;
    }
  }

  updateActivities(activity) {
    this.activityRecord.unshift(activity);
    if (activity.numSteps >= this.dailyStepGoal) {
      this.accomplishedDays.unshift(activity.date);
    }
  }

  findClimbingRecord() {
    return this.activityRecord.sort((a, b) => {
      return b.flightsOfStairs - a.flightsOfStairs;
    })[0].flightsOfStairs;
  }

  calculateDailyCalories(date) {
    let totalMinutes = this.activityRecord.filter(activity => {
      return activity.date === date
    }).reduce((sumMinutes, activity) => {
      return sumMinutes += activity.minutesActive
    }, 0);
    return Math.round(totalMinutes * 7.6);
  }

  calculateAverageMinutesActiveThisWeek(todayDate) {
    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.minutesActive;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  calculateAverageStepsThisWeek(todayDate) {
    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0) / 7).toFixed(0);
  }

  calculateAverageFlightsThisWeek(todayDate) {
    return (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.flightsOfStairs;
      }
      return sum;
    }, 0) / 7).toFixed(1);
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

  calculateTotalStepsThisWeek(todayDate) {
    this.totalStepsThisWeek = (this.activityRecord.reduce((sum, activity) => {
      let index = this.activityRecord.indexOf(this.activityRecord.find(activity => activity.date === todayDate));
      if (index <= this.activityRecord.indexOf(activity) && this.activityRecord.indexOf(activity) <= (index + 6)) {
        sum += activity.steps;
      }
      return sum;
    }, 0));
  }

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

  compareUserGoalWithCommunityGoal(userRepository) {
    let communityStepGoal = userRepository.calculateCommunityAvgStepGoal()
    let goalDifference = communityStepGoal - this.dailyStepGoal;
    return goalDifference; 
  }
}

export default User;
