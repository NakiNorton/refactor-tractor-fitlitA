import './css/base.scss';
import './css/styles.scss';

import fetchData from './fetchData';
import HydrationRepository from './HydrationRepository';
import SleepRepository from "./SleepRepository";
import UserRepository from './UserRepository';
import User from './User';
import Activity from './Activity';
import Hydration from './Hydration';
import Sleep from './Sleep';
import moment from 'moment';

let userRepository;
let currentUser;
let todayDate;
let hydrationRepository;
let sleepRepository;

const hydrationSection = document.querySelector("#hydration-card-container");
const sleepSection = document.querySelector("#sleep-card-container");

const createDataSets = () => {
  userRepository = new UserRepository(userData);
  hydrationRepository = new HydrationRepository(hydrationData).hydrationData;
  // activityRepo = new ActivityRepository(activityData);
  sleepRepository = new SleepRepository(sleepData).sleepData;
  currentUser = new User(userRepository.users[0]); 
  todayDate = moment().format("L");
}

const flipCard = (cardToHide, cardToShow) => {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}

// HEADER //
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
//   currentUser.findFriendsNames(userRepository.users); // went thru original JS, couldn't find this, don't know where it came from
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

// const stepCardDisplay = () => {
//   // main step info quick glance
//   document.querySelector('#steps-user-steps-today').innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).numSteps;
//   // today's step info
//   document.querySelector('#steps-info-active-minutes-today').innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).minutesActive;
//   document.querySelector('#steps-info-miles-walked-today').innerText = currentUser.activityRecord.find(activity => activity.date === todayDate && activity.userId === currentUser.id).calculateMiles(userRepository);
//   //friend card
//   document.querySelector('#steps-friend-steps-average-today').innerText = userRepository.calculateAverageMinutesActive(todayDate);
//   document.querySelector('#steps-friend-average-step-goal').innerText = `${userRepository.calculateCommunityAvgStepGoal()}`;
//   document.querySelector('#steps-friend-active-minutes-average-today').innerText = userRepository.calculateAverageSteps(todayDate);
//   // weekly/trend card
//   document.querySelector('#steps-calendar-total-active-minutes-weekly').innerText = currentUser.calculateAverageMinutesActiveThisWeek(todayDate);
//   document.querySelector('#steps-calendar-total-steps-weekly').innerText = currentUser.calculateAverageStepsThisWeek(todayDate);
// }
  
// //trending card
// const updateTrendingStepsDays = () => {
//   let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
//   currentUser.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStepDays[0]}</p>`;
// };
// ^^ iteration 5
  
// const stepCardHandler = () => {
//   let stepsMainCard = document.querySelector('#steps-main-card');
//   let stepsInfoCard = document.querySelector('#steps-info-card');
//   let stepsFriendsCard = document.querySelector('#steps-friends-card');
//   let stepsTrendingCard = document.querySelector('#steps-trending-card');
//   let stepsCalendarCard = document.querySelector('#steps-calendar-card');
//   if (event.target.classList.contains('steps-info-button')) {
//     flipCard(stepsMainCard, stepsInfoCard);
//   }
//   if (event.target.classList.contains('steps-friends-button')) {
//     flipCard(stepsMainCard, stepsFriendsCard);
//   }
//   if (event.target.classList.contains('steps-trending-button')) {
//     flipCard(stepsMainCard, stepsTrendingCard);
//     updateTrendingStepsDays();
//   }
//   if (event.target.classList.contains('steps-calendar-button')) {
//     flipCard(stepsMainCard, stepsCalendarCard);
//   }
//   if (event.target.classList.contains("steps-go-back-button")) {
//     flipCard(event.target.parentNode, stepsMainCard);
//   }
// }

///END of STEPS //


// // CLIMB SECTION //
// const climbCardDisplay = () => {
//   // main card
//   document.querySelector("#stairs-user-stairs-today").innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).flightsOfStairs * 12;
//   // today's insight
//   document.querySelector("#stairs-info-flights-today").innerText = activityData.find(activity => activity.userID === currentUser.id && activity.date === todayDate).flightsOfStairs;
//   // friends
//   document.querySelector("#stairs-friend-flights-average-today").innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
//   // week
//   document.querySelector("#stairs-calendar-flights-average-weekly").innerText = currentUser.calculateAverageFlightsThisWeek(todayDate);
//   document.querySelector("#stairs-calendar-stairs-average-weekly").innerText = (currentUser.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
// }

// const updateTrendingStairsDays = () => {
//   currentUser.findTrendingStairsDays();
//   let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStairsDays[0]}</p>`;
// }

// const climbCardHandler = () => {
//   let stairsMainCard = document.querySelector("#stairs-main-card");
//   let stairsInfoCard = document.querySelector("#stairs-info-card");
//   let stairsFriendsCard = document.querySelector("#stairs-friends-card");
//   let stairsCalendarCard = document.querySelector("#stairs-calendar-card");
//   let stairsTrendingCard = document.querySelector("#stairs-trending-card");
//   if (event.target.classList.contains('stairs-info-button')) {
//     flipCard(stairsMainCard, stairsInfoCard);
//   }
//   if (event.target.classList.contains('stairs-friends-button')) {
//     flipCard(stairsMainCard, stairsFriendsCard);
//   }
//   if (event.target.classList.contains('stairs-trending-button')) {
//     flipCard(stairsMainCard, stairsTrendingCard);
//     updateTrendingStairsDays();
//   }
//   if (event.target.classList.contains('stairs-calendar-button')) {
//     flipCard(stairsMainCard, stairsCalendarCard);
//   }
//   if (event.target.classList.contains("stairs-go-back-button")) {
//     flipCard(event.target.parentNode, stairsMainCard);
//   }
// }

// /// END of CLIMB ///

// // ~~~~~~~~~~~~~~~~~~~~WATER STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// document.querySelector("#hydration-friend-ounces-today").innerText = userRepository.calculateAverageDailyWater(todayDate);
// ^^iteration 5, broken anyhow.

const hydrationCardDisplay = () => {
  hydrationAddInputDisplay();
  hydrationCalendarDisplay();
}

const hydrationAddInputDisplay = () => {
  let hydrationUserOuncesToday = document.getElementById('hydration-user-ounces-today');
  let foundTodayAmount = currentUser.ouncesRecord.find(ounce => ounce.date === todayDate);
  foundTodayAmount ? hydrationUserOuncesToday.innerText = `${foundTodayAmount.ounces}` : hydrationUserOuncesToday.innerText = "0";
}

const hydrationCalendarDisplay = () => {
  let weeklyAvg = document.querySelector(".hydration-weekly-avg");
  let weekList = document.querySelector(".hydration-week-data-list");
  let cardHtml = `<article class="hydration-amount-daily">${currentUser.getWeekOuncesByDay()}</br></article>`;
  weeklyAvg.innerText = `You averaged ${currentUser.getWeekAvgOunces()} ounces this week!`;
  weekList.innerText = "";
  weekList.insertAdjacentHTML("beforeend", cardHtml);
}

const hydrationCardHandler = () => {
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
  if (event.target.classList.contains('user-ounces-submit')) {
    event.preventDefault();
    let input = document.querySelector('#input-ounces');
    let hydrationObj = new Hydration({userID: currentUser.id, date: todayDate, numOunces: input.value});
    currentUser.updateHydration(todayDate, Number(hydrationObj.ounces));
    hydrationCardDisplay();
    input.value = "";
    flipCard(hydrationInfoCard, hydrationMainCard);
  }
}

hydrationSection.addEventListener('click', hydrationCardHandler);

// // END OF HYDRATION //

// // ~~~~~~~~~~~~~~~~~SLEEP STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const sleepCardDisplay = () => {
  let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
  let foundTodaySleepAmount = sleepRepository.find(sleep => sleep.userID === currentUser.id && sleep.date === todayDate);
  foundTodaySleepAmount ? sleepUserHoursToday.innerText = `${foundTodaySleepAmount.hoursSlept}` : sleepUserHoursToday.innerText = "0";
  document.querySelector('#sleep-calendar-hours-average-weekly').innerText = currentUser.calculateAverageHoursThisWeek(todayDate);
  document.querySelector('#sleep-calendar-quality-average-weekly').innerText = currentUser.calculateAverageQualityThisWeek(todayDate);
  sleepInfoCardDisplay();
}

const sleepInfoCardDisplay = () => {
  let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
  let foundTodaySleepQuality = sleepRepository.find(sleep => sleep.userID === currentUser.id && sleep.date === todayDate);
  foundTodaySleepQuality ? sleepInfoQualityToday.innerText = `${foundTodaySleepQuality.sleepQuality}` : sleepInfoQualityToday.innerText = "0";
  document.querySelector('#sleep-info-hours-average-alltime').innerText = currentUser.hoursSleptAverage;
  document.querySelector('#sleep-info-quality-average-alltime').innerText = currentUser.sleepQualityAverage;
  document.querySelector('#sleep-friend-longest-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getLongestSleepers(todayDate, sleepRepository)).getFirstName();
  document.querySelector('#sleep-friend-worst-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getWorstSleepers(todayDate, sleepRepository)).getFirstName();
}

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

sleepSection.addEventListener('click', sleepCardHandler);


// //// END OF SLEEP //

// EVENT LISTENERS //

let profileButton = document.querySelector('#profile-button');
profileButton.addEventListener("click", showDropdown);

const loadHandler = () => {
  createDataSets();
  document.querySelector("#header-name").innerText = `${currentUser.getFirstName()}'S `;
  hydrationCardDisplay();
  sleepCardDisplay();
}

window.addEventListener("load", loadHandler);