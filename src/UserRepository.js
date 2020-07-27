// import sleepRepository from './SleepRepository';
import User from './User';

class UserRepository {
  constructor(rawData, todaysDate) {
    this.users = this.matchDataWithUsers(rawData, todaysDate);
  }

  matchDataWithUsers(rawData, todaysDate) {
    let instantiatedUsers = rawData.userData.map(
      (rawUser) => new User(rawUser, todaysDate)
    );
    this.matchHydrationWithUser(instantiatedUsers, rawData.hydrationData);
    this.matchSleepWithUser(instantiatedUsers, rawData.sleepData);
    this.matchActivityWithUser(instantiatedUsers, rawData.activityData);
    return instantiatedUsers;
  }

  matchHydrationWithUser(users, rawHydrationData) {
    users.forEach((user) => {
      user.hydrationInfo.individualEntryRecords = rawHydrationData.filter(
        (hydrationDataPoint) => {
          return hydrationDataPoint.userID === user.id;
        }
      );
    });
  }

  matchSleepWithUser(users, rawSleepData) {
    users.forEach((user) => {
      user.sleepInfo.individualEntryRecords = rawSleepData.filter((sleepDataPoint) => sleepDataPoint.userID === user.id);
    });
  }

  matchActivityWithUser(users, rawActivityData) {
    users.forEach((user) => {
      user.activityInfo.individualEntryRecords = rawActivityData.filter(
        (activityDataPoint) => {
          return activityDataPoint.userID === user.id;
        }
      );
    });
  }

  getCommunityAvgStepGoal() {
    let communityStepGoals = this.users.map((user) => user.dailyStepGoal);
    let communityTotal = communityStepGoals.reduce((sum, goal) => {
      if (typeof goal === "number") {
        sum += goal;
      }
      return sum;
    }, 0);
    return communityTotal / this.users.length;
  }

  getCommunityAvgWaterOnDate(date) {
    let allUsersOuncesOnDate = this.users.map((user) =>
      user.hydrationInfo.getOuncesByDay(date)
    );
    let sumDrankOnDate = allUsersOuncesOnDate.reduce((sum, ounces) => {
      return (sum += ounces);
    }, 0);
    return Math.floor(sumDrankOnDate / allUsersOuncesOnDate.length);
  }

  getCommunityAvgOuncesOverall() {
    let allUsersOunceAverages = this.users.map((user) =>
      user.hydrationInfo.getAverageOuncesOverall()
    );
    let allUsersOuncesSum = allUsersOunceAverages.reduce((sum, entry) => {
      sum += entry;
      return sum;
    }, 0);
    let averageOunces = (allUsersOuncesSum / this.users.length).toFixed(0);
    return Number(averageOunces);
  }

  getCommunityAvgStairsOnDate(date) {
    let allUsersStairsOnDate = this.users.map((user) =>
      user.activityInfo.getStairsByDay(date)
    );
    let sumStairsOnDate = allUsersStairsOnDate.reduce((totalStairs, stairs) => {
      totalStairs += stairs;
      return totalStairs;
    }, 0);
    return Math.floor(sumStairsOnDate / allUsersStairsOnDate.length);
  }

  getCommunityAvgFlightsOverall() {
    let allUsersStairsAverages = this.users.map((user) =>
      user.activityInfo.getAverageFlightsClimbedOverall()
    );
    let allUsersStairsSum = allUsersStairsAverages.reduce((sum, entry) => {
      sum += entry;
      return sum;
    }, 0);
    let averageStairs = (allUsersStairsSum / this.users.length).toFixed(0);
    return Number(averageStairs);
  }

  getAllUsersAverageSteps(date) {
    let allUsersStepsCount = this.users.map((user) => {
      return user.activityInfo.individualEntryRecords.filter((activity) => {
        return activity.date === date;
      });
    });
    let sumOfSteps = allUsersStepsCount.reduce((stepsSum, activityCollection) => {
      activityCollection.forEach((activity) => {
        stepsSum += activity.numSteps;
      });
      return stepsSum;
    }, 0);
    return Math.round(sumOfSteps / allUsersStepsCount.length);
  }

  getAllUsersAverageMinutesActive(date) {
    let allUsersMinutesActiveCount = this.users.map((user) => {
      return user.activityInfo.individualEntryRecords.filter((activity) => {
        return activity.date === date;
      });
    });
    let sumOfMinutesActive = allUsersMinutesActiveCount.reduce(
      (minutesActiveSum, activityCollection) => {
        activityCollection.forEach((activity) => {
          minutesActiveSum += activity.minutesActive;
        });
        return minutesActiveSum;
      },
      0
    );
    return Math.round(sumOfMinutesActive / allUsersMinutesActiveCount.length);
  }

  findBestSleeper() {
    let bestSleepers = this.users.filter(user => user.sleepInfo.findLastNightsSleepQual() > 3);
    let sortedBest =  bestSleepers.sort((a, b) => a.sleepQuality - b.sleepQuality);
    return sortedBest.pop().name;
  }

  findWorstSleeper() {
    let worstSleepers = this.users.filter(user => user.sleepInfo.findLastNightsSleepQual() < 3);
    let sortedWorst =  worstSleepers.sort((a, b) => a.sleepQuality - b.sleepQuality);
    return sortedWorst.shift().name;
  }

}


export default UserRepository;
