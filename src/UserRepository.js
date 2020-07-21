import sleepData from './data/sleep';
import User from './User';

class UserRepository {
  constructor(rawUserData) {
    this.users = this.instantiateRawData(rawUserData);
  }

  instantiateRawData(rawUserData) {
    return rawUserData.map(data => new User(data));
  }

  getUser(id) {
    return this.users.find(user => user.id === id);
  }

  calculateCommunityAvgStepGoal() {
    let communityStepGoals = this.users.map(user => user.dailyStepGoal);
    let communityTotal = communityStepGoals.reduce((sum, goal) => {
      sum += goal;
      return sum;
    }, 0);
    return communityTotal / this.users.length;
  }

  // calculateAverageSleepQuality() {
  //   let totalSleepQuality = this.users.reduce((sum, user) => {
  //     sum += user.sleepQualityAverage;
  //     return sum;
  //   }, 0);
  //   return totalSleepQuality / this.users.length;
  // }

  // calculateAverageSteps(date) {
  //   let allUsersStepsCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })
  //   let sumOfSteps = allUsersStepsCount
  //     .reduce((stepsSum, activityCollection) => {
  //       activityCollection.forEach(activity => {
  //         stepsSum += activity.steps
  //       })
  //       return stepsSum;
  //     }, 0);
  //   return Math.round(sumOfSteps / allUsersStepsCount.length);
  // }

  // calculateAverageStairs(date) {
  //   let allUsersStairsCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })

  //   let sumOfStairs = allUsersStairsCount.reduce((stairsSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       stairsSum += activity.flightsOfStairs
  //     })
  //     return stairsSum;
  //   }, 0);
  //   return Math.round(sumOfStairs / allUsersStairsCount.length);
  // }

  // calculateAverageMinutesActive(date) {
  //   let allUsersMinutesActiveCount = this.users.map(user => {
  //     return user.activityRecord.filter(activity => {
  //       return activity.date === date;
  //     });
  //   })

  //   let sumOfMinutesActive = allUsersMinutesActiveCount.reduce((minutesActiveSum, activityCollection) => {
  //     activityCollection.forEach(activity => {
  //       minutesActiveSum += activity.minutesActive
  //     })
  //     return minutesActiveSum;
  //   }, 0);
  //   return Math.round(sumOfMinutesActive / allUsersMinutesActiveCount.length);
  // }

  // calculateAverageDailyWater(date) {
  //   let todaysDrinkers = this.users.filter(user => {
  //     return user.addDailyOunces(date) > 0;
  //   });
  //   let sumDrankOnDate = todaysDrinkers.reduce((sum, drinker) => {
  //     return sum += drinker.addDailyOunces(date);
  //   }, 0)
  //   return Math.floor(sumDrankOnDate / todaysDrinkers.length);
  // }
  // ^^ do they mean this for community? if so, this may be iteration 5. 


  // findBestSleepers(date) {
  //   return this.users.filter(user =>
  //     user.calculateAverageQualityThisWeek(date) > 3);
  // }

  // getLongestSleepers(date) {
  //   return sleepData.filter(sleep => {
  //     return sleep.date === date;
  //   }).sort((a, b) => {
  //     return b.hoursSlept - a.hoursSlept;
  //   })[0].userID;
  // }

  // getWorstSleepers(date) {
  //   return sleepData.filter(sleep => sleep.date === date)
  //     .sort((a, b) => {
  //       return a.hoursSlept - b.hoursSlept;
  //     })[0].userID;
  // }
}

export default UserRepository;
