import sleepRepository from './SleepRepository';
import User from './User';

class dataDump {
  constructor(rawData) {
    this.users = this.instantiateRawData(rawData.userData);
    this.hydrationData = l
  }





  // get rawData.userData and instantiate each User  ---> instead of allllll those properties w broken out info about each class, have one property that is an instantition of the class with those props/methods on it

  // match all hydro, sleep, and activ w approp users in this file, run the rest of this file's methods about getting the averages
  // i don't know if we need the repos for each class now

  instantiateRawData(rawData) {
    return rawUserData.map((data) => new User(userData ));
  }

  getUser(id) {
    return this.users.find((user) => user.id === id);
  }

  matchHydrationWithUser(rawData.hydrationData) {
    rawData.hydrationData.forEach(hydroData => {
      this.users.forEach(user => {
        if (hydroData.userId === user.id) {
          user.hydrationInfo.ouncesRecord.push(hydroData)
        }

      })
    })
    // loop over each hydration data point
    // loop over each user
    // if hydration's user id ==== user.id, 
    // push the hydration info into the user's hydration info and instantiate there 
  }

  matchSleepWithUser(rawData.sleepData) {
    // loop over each sleep data point
    // loop over each user
    // if sleep's user id ==== user.id, 
    // push the sleep info into the user's sleep info and instantiate there 
  }

  matchActivityWithUser(rawData.activityData) {
     // loop over each activity data point
    // loop over each user
    // if activity's user id ==== user.id, 
    // push the activity info into the user's activity info and instantiate there 
  }

  // now we don't have to have all those ugly, repetitive methods in DOM updates 


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

  // findBestSleepers(date) {
  //   return this.users.filter(user => user.calculateAverageQualityThisWeek(date) > 3);
  // }

  // getLongestSleepers(date, sleepRepository) {
  //   let allSleepsOnDate = sleepRepository.filter((sleep) => sleep.date === date);
  //   return allSleepsOnDate ? allSleepsOnDate.sort((a, b) => b.hoursSlept - a.hoursSlept).shift().userID : "Data not found";
  // }

  // getWorstSleepers(date, sleepRepository) {
  //   let allSleepsOnDate = sleepRepository.filter((sleep) => sleep.date === date);
  //   return allSleepsOnDate ? allSleepsOnDate.sort((a, b) =>  a.hoursSlept - b.hoursSlept).shift().userID : "Data not found";
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
}

export default UserRepository;
