// import sleepRepository from './SleepRepository';
import User from './User';

class UserRepository {
  constructor(rawData, todayDate) {
    this.users = this.matchDataWithUsers(rawData, todayDate); // all users should have appropriate data that matches their id
    console.log('all users:', this.users)
  }
 
  matchDataWithUsers(rawData, todayDate) {
    let instantiatedUsers = rawData.userData.map(rawUser => new User(rawUser, todayDate));
    this.matchHydrationWithUser(instantiatedUsers, rawData.hydrationData);
    this.matchSleepWithUser(instantiatedUsers, rawData.sleepData);
    this.matchActivityWithUser(instantiatedUsers, rawData.activityData);
    return instantiatedUsers;
  }

  matchHydrationWithUser(users, rawHydrationData) {
    users.forEach(user => {
      user.hydrationInfo.individualEntryRecords = rawHydrationData.filter(hydrationDataPoint => {
        return hydrationDataPoint.userID === user.id;
      })
    })
  }

  matchSleepWithUser(users, rawSleepData) {
    users.forEach(user => {
      user.sleepInfo.individualEntryRecord = rawSleepData.filter(sleepDataPoint => {
        return sleepDataPoint.userID === user.id;
      })
    })
  }

  matchActivityWithUser(users, rawActivityData) {
    users.forEach(user => {
      user.activityInfo.individualEntryRecords = rawActivityData.filter(activityDataPoint => {
        return activityDataPoint.userID === user.id;
      })
    })
  }

  // calculateCommunityAvgStepGoal() {
  //   let communityStepGoals = this.users.map((user) => user.dailyStepGoal);
  //   let communityTotal = communityStepGoals.reduce((sum, goal) => {
  //     sum += goal;
  //     return sum;
  //   }, 0);
  //   return communityTotal / this.users.length;
  // }
  
  // calculateAverageSleepQuality() {
  //   let totalSleepQuality = this.users.reduce((sum, user) => {
  //     sum += user.sleepQualityAverage;
  //     return sum;
  //   }, 0);
  //   return totalSleepQuality / this.users.length;
  // }

  
  // findBestSleepers(today) {
  //   return this.users.filter(user => user.calculateAverageQualityThisWeek(date) > 3);
  // }
  
  // getLongestSleepers(today, sleepRepository) {
  //   let allSleepsOnDate = UserRepository.users.filter((sleep) => sleep.date === today);
  //   return allSleepsOnDate ? allSleepsOnDate.sort((a, b) => b.hoursSlept - a.hoursSlept).shift().userID;
  // }
  
  // getWorstSleepers(date, sleepRepository) {
  //   let allSleepsOnDate = sleepRepository.filter((sleep) => sleep.date === date);
  //   return allSleepsOnDate ? allSleepsOnDate.sort((a, b) =>  a.hoursSlept - b.hoursSlept).shift().userID : "Data not found";
  // }


  calculateAllUsersAverageSteps(date) {
    console.log('all users:', this.users)
    let allUsersStepsCount = this.users.map(user => {
      return user.activityInfo.individualEntryRecords.filter(activity => {
        return activity.date === date;
      });
    })
    let sumOfSteps = allUsersStepsCount
      .reduce((stepsSum, activityCollection) => {
        activityCollection.forEach(activity => {
          stepsSum += activity.numSteps
        })
        return stepsSum;
      }, 0);
    return Math.round(sumOfSteps / allUsersStepsCount.length);
  }
}

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
// }

export default UserRepository;
