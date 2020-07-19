import './css/base.scss';
import './css/styles.scss';

import userData from './data/users';
// import activityData from './data/activity';
// import sleepData from './data/sleep';
// import hydrationData from './data/hydration';

import UserRepository from './UserRepository';
import User from './User';
// import Activity from './Activity';
// import Hydration from './Hydration';
// import Sleep from './Sleep';


const userRepository = new UserRepository(userData);
const currentUser = new User(userRepository.users[0]); 

// HEADER 
const displayHeader = (e) => {
  document.querySelector("#header-name").innerText = `${currentUser.getFirstName()}'S `;
  document.querySelector('#user-info-dropdown').classList.toggle("hide");
  document.querySelector("#dropdown-name").innerText = currentUser.name.toUpperCase();
  document.querySelector("#dropdown-goal").innerText = `DAILY STEP GOAL | ${currentUser.dailyStepGoal}`;
  document.querySelector("#dropdown-email").innerText = `EMAIL | ${currentUser.email}`;
 
}

window.addEventListener('load', displayHeader);

  
  // friend stuff 
const displayFriendsSteps = () => {
  let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
  let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
  currentUser.friendsActivityRecords.forEach(friend => {
    dropdownFriendsStepsContainer.innerHTML += `
    <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>`;
  });
friendsStepsParagraphs.forEach(paragraph => {
  if (friendsStepsParagraphs[0] === paragraph) {
    paragraph.classList.add('green-text');
  }
  if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
    paragraph.classList.add('red-text');
  }
  if (paragraph.innerText.includes('YOU')) {
    paragraph.classList.add('yellow-text');
  }
},
  // currentUser.findFriendsNames(userRepository.users);
// currentUser.findFriendsTotalStepsForWeek(userRepository.users, todayDate);



// STEP SECTION 
// const stepHandler = () => {
  // let stepsMainCard = document.querySelector('#steps-main-card');
  // let stepsInfoCard = document.querySelector('#steps-info-card');
  // let stepsFriendsCard = document.querySelector('#steps-friends-card');
  // let stepsTrendingCard = document.querySelector('#steps-trending-card');
  // let stepsCalendarCard = document.querySelector('#steps-calendar-card');
  // let stepsCalendarTotalStepsWeekly = document.querySelector('#steps-calendar-total-steps-weekly');
  // let stepsFriendAverageStepGoal = document.querySelector('#steps-friend-average-step-goal');
  // let stepsGoalComparison = document.querySelector('#steps-goal-comparison');
  // let stepsInfoActiveMinutesToday = document.querySelector('#steps-info-active-minutes-today');
  // let stepsInfoMilesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
  // let stepsFriendActiveMinutesAverageToday = document.querySelector('#steps-friend-active-minutes-average-today');
  // let stepsFriendStepsAverageToday = document.querySelector('#steps-friend-steps-average-today');
  // let stepsTrendingButton = document.querySelector('.steps-trending-button');
  // let stepsUserStepsToday = document.querySelector('#steps-user-steps-today');
  // let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
  // let stepsCalendarTotalActiveMinutesWeekly = document.querySelector('#steps-calendar-total-active-minutes-weekly');
  // stepsCalendarTotalActiveMinutesWeekly.innerText = currentUser.calculateAverageMinutesActiveThisWeek(todayDate);
  // stepsCalendarTotalStepsWeekly.innerText = currentUser.calculateAverageStepsThisWeek(todayDate);
  // stepsFriendActiveMinutesAverageToday.innerText = userRepository.calculateAverageMinutesActive(todayDate);
  // stepsFriendAverageStepGoal.innerText = `${userRepository.calculateCommunityAvgStepGoal()}`;
  // stepsGoalComparison.innerText = `${currentUser.compareUserGoalWithCommunityGoal()}`; // Add more test to explain comparison
  // stepsFriendStepsAverageToday.innerText = userRepository.calculateAverageSteps(todayDate);
  // stepsInfoActiveMinutesToday.innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).minutesActive;
  // stepsUserStepsToday.innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).numSteps;
// },

// stepsTrendingButton.addEventListener('click', function() {
//   currentUser.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStepDays[0]}</p>`;
// });

// CLIMB/STAIRS SECTION
// const climbHandler = () => {

// document.querySelector("#stairs-friend-flights-average-today").innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
  // let stairsFriendsCard = document.querySelector("#stairs-friends-card");
  // let stairsMainCard = document.querySelector("#stairs-main-card");
  // let stairsInfoCard = document.querySelector("#stairs-info-card");
  // let stairsTrendingCard = document.querySelector("#stairs-trending-card");
  // let stairsCalendarCard = document.querySelector("#stairs-calendar-card");
//  document.querySelector("#stairs-info-flights-today").innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).flightsOfStairs;
  // document.querySelector("#stairs-user-stairs-today").innerText = activityData.find(activity => {
    //   return activity.userID === currentUser.id && activity.date === todayDate;
    // }).flightsOfStairs * 12;
    // document.querySelector("#stairs-calendar-flights-average-weekly").innerText = currentUser.calculateAverageFlightsThisWeek(todayDate);
    // document.querySelector("#stairs-calendar-stairs-average-weekly").innerText = (currentUser.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
    // }


// let trendingStairsPhraseContainer = document.querySelector(".trending-stairs-phrase-container");
// let stairsTrendingButton = document.querySelector(".stairs-trending-button");

// why are 2 event listeners on stairsTrendingButton?
// stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
// stairsTrendingButton.addEventListener('click', function() {
//   currentUser.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStairsDays[0]}</p>`;
// });

// function updateTrendingStairsDays() {
//   currentUser.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStairsDays[0]}</p>`;
// }







// activityData.forEach(activity => {
//   activity = new Activity(activity, userRepository);
// });

// hydrationData.forEach(hydration => {
//   hydration = new Hydration(hydration, userRepository);
// });

// sleepData.forEach(sleep => {
//   sleep = new Sleep(sleep, userRepository);
// });

// let todayDate = "2019/09/22";

// let dailyOz = document.querySelectorAll('.daily-oz');
// let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
// let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
// let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
// let hydrationInfoCard = document.querySelector('#hydration-info-card');
// let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
// let hydrationMainCard = document.querySelector('#hydration-main-card');
// let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
// let mainPage = document.querySelector('main');
// let profileButton = document.querySelector('#profile-button');
// let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
// let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
// let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
// let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
// let sleepFriendsCard = document.querySelector('#sleep-friends-card');
// let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
// let sleepInfoCard = document.querySelector('#sleep-info-card');
// let sleepInfoHoursAverageAlltime = document.querySelector('#sleep-info-hours-average-alltime');
// let sleepInfoQualityAverageAlltime = document.querySelector('#sleep-info-quality-average-alltime');
// let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
// let sleepMainCard = document.querySelector('#sleep-main-card');
// let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
// let sortedHydrationDataByDate = currentUser.ouncesRecord.sort((a, b) => {
//   if (Object.keys(a)[0] > Object.keys(b)[0]) {
//     return -1;
//   }
//   if (Object.keys(a)[0] < Object.keys(b)[0]) {
//     return 1;
//   }
//   return 0;
// });


// mainPage.addEventListener('click', showInfo);
// profileButton.addEventListener('click', showDropdown);


// function flipCard(cardToHide, cardToShow) {
//   cardToHide.classList.add('hide');
//   cardToShow.classList.remove('hide');
// }


// function showInfo() {//We should consider renaming this handler to something more semantic
//   if (event.target.classList.contains('steps-info-button')) {
//     flipCard(stepsMainCard, stepsInfoCard);
//   }
//   if (event.target.classList.contains('steps-friends-button')) {
//     flipCard(stepsMainCard, stepsFriendsCard);
//   }
//   if (event.target.classList.contains('steps-trending-button')) {
//     flipCard(stepsMainCard, stepsTrendingCard);
//   }
//   if (event.target.classList.contains('steps-calendar-button')) {
//     flipCard(stepsMainCard, stepsCalendarCard);
//   }
//   if (event.target.classList.contains('hydration-info-button')) {
//     flipCard(hydrationMainCard, hydrationInfoCard);
//   }
//   if (event.target.classList.contains('hydration-friends-button')) {
//     flipCard(hydrationMainCard, hydrationFriendsCard);
//   }
//   if (event.target.classList.contains('hydration-calendar-button')) {
//     flipCard(hydrationMainCard, hydrationCalendarCard);
//   }
//   if (event.target.classList.contains('stairs-info-button')) {
//     flipCard(stairsMainCard, stairsInfoCard);
//   }
//   if (event.target.classList.contains('stairs-friends-button')) {
//     flipCard(stairsMainCard, stairsFriendsCard);
//   }
//   if (event.target.classList.contains('stairs-trending-button')) {
//     flipCard(stairsMainCard, stairsTrendingCard);
//   }
//   if (event.target.classList.contains('stairs-calendar-button')) {
//     flipCard(stairsMainCard, stairsCalendarCard);
//   }
//   if (event.target.classList.contains('sleep-info-button')) {
//     flipCard(sleepMainCard, sleepInfoCard);
//   }
//   if (event.target.classList.contains('sleep-friends-button')) {
//     flipCard(sleepMainCard, sleepFriendsCard);
//   }
//   if (event.target.classList.contains('sleep-calendar-button')) {
//     flipCard(sleepMainCard, sleepCalendarCard);
//   }
//   if (event.target.classList.contains('steps-go-back-button')) {
//     flipCard(event.target.parentNode, stepsMainCard);
//   }
//   if (event.target.classList.contains('hydration-go-back-button')) {
//     flipCard(event.target.parentNode, hydrationMainCard);
//   }
//   if (event.target.classList.contains('stairs-go-back-button')) {
//     flipCard(event.target.parentNode, stairsMainCard);
//   }
//   if (event.target.classList.contains('sleep-go-back-button')) {
//     flipCard(event.target.parentNode, sleepMainCard);
//   }
// }

// function updateTrendingStairsDays() {
//   currentUser.findTrendingStairsDays();
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStairsDays[0]}</p>`;
// }

// function updateTrendingStepDays() {
//   currentUser.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStepDays[0]}</p>`;
// }

// for (var i = 0; i < dailyOz.length; i++) {
//   dailyOz[i].innerText = currentUser.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
// }





// hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === currentUser.id && hydration.date === todayDate;
// }).numOunces;

// hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

// hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
//   return hydration.userID === currentUser.id && hydration.date === todayDate;
// }).numOunces / 8;

// sleepCalendarHoursAverageWeekly.innerText = currentUser.calculateAverageHoursThisWeek(todayDate);

// sleepCalendarQualityAverageWeekly.innerText = currentUser.calculateAverageQualityThisWeek(todayDate);

// sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
//   return currentUser.id === userRepository.getLongestSleepers(todayDate)
// }).getFirstName();

// sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
//   return currentUser.id === userRepository.getWorstSleepers(todayDate)
// }).getFirstName();

// sleepInfoHoursAverageAlltime.innerText = currentUser.hoursSleptAverage;

// stepsInfoMilesWalkedToday.innerText = currentUser.activityRecord.find(activity => {
//   return (activity.date === todayDate && activity.userId === currentUser.id)
// }).calculateMiles(userRepository);

// sleepInfoQualityAverageAlltime.innerText = currentUser.sleepQualityAverage;

// sleepInfoQualityToday.innerText = sleepData.find(sleep => {
//   return sleep.userID === currentUser.id && sleep.date === todayDate;
// }).sleepQuality;

// sleepUserHoursToday.innerText = sleepData.find(sleep => {
//   return sleep.userID === currentUser.id && sleep.date === todayDate;
// }).hoursSlept;



