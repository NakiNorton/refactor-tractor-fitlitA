import './css/base.scss';
import './css/styles.scss';

import userData from './data/users';
import activityData from './data/activity';
import sleepData from './data/sleep';
import hydrationData from './data/hydration';

import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';


const userRepository = new UserRepository(userData);
const currentUser = new User(userRepository.users[0]); 

let todayDate = "2019/09/22";
// currentUser.findFriendsNames(userRepository.users); idk what this is or where it came from


activityData.forEach(activity => {
  activity = new Activity(activity, userRepository);
});

hydrationData.forEach(hydration => {
  hydration = new Hydration(hydration, userRepository);
});

sleepData.forEach(sleep => {
  sleep = new Sleep(sleep, userRepository);
});

const flipCard = (cardToHide, cardToShow) => {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

// HEADER //
const displayHeader = (e) => {
  document.querySelector("#header-name").innerText = `${currentUser.getFirstName()}'S `;
}

const showDropdown = () => {
  document.querySelector('#user-info-dropdown').classList.toggle("hide");
  document.querySelector("#dropdown-name").innerText = currentUser.name.toUpperCase();
  document.querySelector("#dropdown-goal").innerText = `DAILY STEP GOAL | ${currentUser.dailyStepGoal}`;
  document.querySelector("#dropdown-email").innerText = `EMAIL | ${currentUser.email}`;
  // showLeaderBoard(); // currently broken
}
  
// leaderboard in dropdown menu, not sure what's happening here, will need to follow HTML, method is broken in User file
// const showLeaderBoard = () => {
//   let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
//   let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
//   // currentUser.findFriendsNames(userRepository.users); // went thru original JS, couldn't find this, don't know where it came from
//   currentUser.findFriendsTotalStepsForWeek(userRepository.users, todayDate);
//   currentUser.friendsActivityRecords.forEach(friend => {
//     dropdownFriendsStepsContainer.innerHTML += `
//         <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.totalWeeklySteps}</p>`;
//   });
//   friendsStepsParagraphs.forEach(paragraph => {
//     if (friendsStepsParagraphs[0] === paragraph) {
//       paragraph.classList.add('green-text');
//     }
//     if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
//       paragraph.classList.add('red-text');
//     }
//     if (paragraph.innerText.includes('YOU')) {
//       paragraph.classList.add('yellow-text');
//     }
//   });
// }

//  END OF HEADER //

// STEP SECTION ///

const stepCardDisplay = () => {
  // main step info quick glance
  document.querySelector('#steps-user-steps-today').innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).numSteps;
  // today's step info
  document.querySelector('#steps-info-active-minutes-today').innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).minutesActive;
  document.querySelector('#steps-info-miles-walked-today').innerText = currentUser.activityRecord.find(activity => activity.date === todayDate && activity.userId === currentUser.id).calculateMiles(userRepository);
  //friend card
  document.querySelector('#steps-friend-steps-average-today').innerText = userRepository.calculateAverageMinutesActive(todayDate);
  document.querySelector('#steps-friend-average-step-goal').innerText = `${userRepository.calculateCommunityAvgStepGoal()}`;
  document.querySelector('#steps-friend-active-minutes-average-today').innerText = userRepository.calculateAverageSteps(todayDate);
  // weekly/trend card
  document.querySelector('#steps-calendar-total-active-minutes-weekly').innerText = currentUser.calculateAverageMinutesActiveThisWeek(todayDate);
  document.querySelector('#steps-calendar-total-steps-weekly').innerText = currentUser.calculateAverageStepsThisWeek(todayDate);
}
  
//trending card
const updateTrendingStepsDays = () => {
  let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
  currentUser.findTrendingStepDays();
  trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStepDays[0]}</p>`;
};
  
const stepCardHandler = () => {
  let stepsMainCard = document.querySelector('#steps-main-card');
  let stepsInfoCard = document.querySelector('#steps-info-card');
  let stepsFriendsCard = document.querySelector('#steps-friends-card');
  let stepsTrendingCard = document.querySelector('#steps-trending-card');
  let stepsCalendarCard = document.querySelector('#steps-calendar-card');
  if (event.target.classList.contains('steps-info-button')) {
    flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    flipCard(stepsMainCard, stepsTrendingCard);
    updateTrendingStepsDays();
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains("steps-go-back-button")) {
    flipCard(event.target.parentNode, stepsMainCard);
  }
}

///END of STEPS //


// CLIMB SECTION //
const climbCardDisplay = () => {
  // main card
  document.querySelector("#stairs-user-stairs-today").innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).flightsOfStairs * 12;
  // today's insight
  document.querySelector("#stairs-info-flights-today").innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).flightsOfStairs;
  // friends
  document.querySelector("#stairs-friend-flights-average-today").innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
  // week
  document.querySelector("#stairs-calendar-flights-average-weekly").innerText = currentUser.calculateAverageFlightsThisWeek(todayDate);
  document.querySelector("#stairs-calendar-stairs-average-weekly").innerText = (currentUser.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
}

const updateTrendingStairsDays = () => {
  currentUser.findTrendingStairsDays();
  let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
  trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStairsDays[0]}</p>`;
}

const climbCardHandler = () => {
  let stairsMainCard = document.querySelector("#stairs-main-card");
  let stairsInfoCard = document.querySelector("#stairs-info-card");
  let stairsFriendsCard = document.querySelector("#stairs-friends-card");
  let stairsCalendarCard = document.querySelector("#stairs-calendar-card");
  let stairsTrendingCard = document.querySelector("#stairs-trending-card");
  if (event.target.classList.contains('stairs-info-button')) {
    flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    flipCard(stairsMainCard, stairsTrendingCard);
    updateTrendingStairsDays();
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains("stairs-go-back-button")) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
}

/// END of CLIMB ///

// ~~~~~~~~~~~~~~~~~~~~WATER STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
// let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
// let hydrationInfoCard = document.querySelector('#hydration-info-card');
// let hydrationMainCard = document.querySelector('#hydration-main-card'); 
// ^^^ added to handler
let hydrationFriendOuncesToday = document.querySelector('#hydration-friend-ounces-today');
let hydrationInfoGlassesToday = document.querySelector('#hydration-info-glasses-today');
let hydrationUserOuncesToday = document.querySelector('#hydration-user-ounces-today');
let dailyOz = document.querySelectorAll('.daily-oz');

// WATER FUNCTIONS // 
let sortedHydrationDataByDate = currentUser.ouncesRecord.sort((a, b) => {
  if (Object.keys(a)[0] > Object.keys(b)[0]) {
    return -1;
  }
  if (Object.keys(a)[0] < Object.keys(b)[0]) {
    return 1;
  }
  return 0;
});

for (var i = 0; i < dailyOz.length; i++) {
  dailyOz[i].innerText = currentUser.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
}

hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
  return hydration.userID === currentUser.id && hydration.date === todayDate;
}).numOunces;

hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
  return hydration.userID === currentUser.id && hydration.date === todayDate;
}).numOunces / 8;


function waterCardHandler() {
  let hydrationMainCard = document.querySelector('#hydration-main-card');
  let hydrationInfoCard = document.querySelector('#hydration-info-card');
  let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
  let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains("hydration-go-back-button")) {
    flipCard(event.target.parentNode, hydrationMainCard);
  }
}

// END OF HYDRATION //

// ~~~~~~~~~~~~~~~~~SLEEP STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
// let sleepFriendsCard = document.querySelector('#sleep-friends-card');
// let sleepInfoCard = document.querySelector('#sleep-info-card');
// let sleepMainCard = document.querySelector('#sleep-main-card');
// ^^ added to handler
let sleepCalendarHoursAverageWeekly = document.querySelector('#sleep-calendar-hours-average-weekly');
let sleepCalendarQualityAverageWeekly = document.querySelector('#sleep-calendar-quality-average-weekly');
let sleepFriendLongestSleeper = document.querySelector('#sleep-friend-longest-sleeper');
let sleepFriendWorstSleeper = document.querySelector('#sleep-friend-worst-sleeper');
let sleepInfoHoursAverageAllTime = document.querySelector('#sleep-info-hours-average-alltime');
let sleepInfoQualityAverageAllTime = document.querySelector('#sleep-info-quality-average-alltime');
let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');

// SLEEPER FUNCTIONS
sleepCalendarHoursAverageWeekly.innerText = currentUser.calculateAverageHoursThisWeek(todayDate);

sleepCalendarQualityAverageWeekly.innerText = currentUser.calculateAverageQualityThisWeek(todayDate);

sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
  return currentUser.id === userRepository.getLongestSleepers(todayDate)
}).getFirstName();

sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
  return currentUser.id === userRepository.getWorstSleepers(todayDate)
}).getFirstName();

sleepInfoHoursAverageAllTime.innerText = currentUser.hoursSleptAverage;

sleepInfoQualityAverageAllTime.innerText = currentUser.sleepQualityAverage;

sleepInfoQualityToday.innerText = sleepData.find(sleep => {
  return sleep.userID === currentUser.id && sleep.date === todayDate;
}).sleepQuality;

sleepUserHoursToday.innerText = sleepData.find(sleep => {
  return sleep.userID === currentUser.id && sleep.date === todayDate;
}).hoursSlept;

function sleepCardHandler() {
  let sleepMainCard = document.querySelector('#sleep-main-card');
  let sleepInfoCard = document.querySelector('#sleep-info-card');
  let sleepFriendsCard = document.querySelector('#sleep-friends-card');
  let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains("sleep-go-back-button")) {
    flipCard(event.target.parentNode, sleepMainCard);
  }
}

//// END OF SLEEP //

const mainClickHandler = (e) => {
  // if click happened on step card section:
  stepCardHandler();
  // if click happened on climb card section:
  climbCardHandler();
  // if click happened on water card section:
  waterCardHandler();
  // if click happened on sleep card section:
  sleepCardHandler();
}
// ^^ discuss if we want this. may need to check out / modify html. wonder if html modification is part of refactoring.

// EVENT LISTENERS //

let mainPage = document.querySelector('main'); // do we need a main handler?
mainPage.addEventListener('click', mainClickHandler);
document.querySelector("#profile-button").addEventListener("click", showDropdown);
// ^^ if so, let's add this
window.addEventListener("load", displayHeader);