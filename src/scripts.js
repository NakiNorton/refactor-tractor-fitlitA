import './css/base.scss';
import './css/styles.scss';

import fetchData from './fetchData';
import UserRepository from './UserRepository';
import HydrationRepository from './HydrationRepository';
import ActivityRepository from './Activity-Repository'
import SleepRepository from "./SleepRepository";
import userData from './data/users';
import sleepData from "./data/sleep";
import hydrationData from "./data/hydration";
import activityData from './data/activity';
import domUpdates from './DomUpdates';

import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';
import moment from 'moment';

let userRepository;
let currentUser;
let todayDate;
let hydrationRepository;
let sleepRepository;
let activityRepository;

const hydrationSection = document.querySelector("#hydration-card-container");
const sleepSection = document.querySelector("#sleep-card-container");
const stepSection = document.querySelector("#steps-card-container");
const stairsSection = document.querySelector("#stairs-card-container");


const createDataSets = () => {
  userRepository = new UserRepository(userData);
  hydrationRepository = new HydrationRepository(hydrationData).hydrationData;
  activityRepository = new ActivityRepository(activityData).activityData;
  sleepRepository = new SleepRepository(sleepData).sleepData;
  currentUser = new User(userRepository.users[0]); 
  todayDate = moment().format("L");
  domUpdates.defineData(todayDate)
  domUpdates.defineCurrentUser(currentUser);
}

/************** MOVED TO DOM ***********************/
// const flipCard = (cardToHide, cardToShow) => {
//   cardToHide.classList.add('hide');
//   cardToShow.classList.remove('hide');
// }

// HEADER //
// const showDropdown = () => {
//   document.querySelector('#user-info-dropdown').classList.toggle("hide");
//   document.querySelector("#dropdown-name").innerText = currentUser.name.toUpperCase();
//   document.querySelector("#dropdown-goal").innerText = `DAILY STEP GOAL | ${currentUser.dailyStepGoal}`;
//   document.querySelector("#dropdown-email").innerText = `EMAIL | ${currentUser.email}`;
//   // showLeaderBoard(); // currently broken
// }
// ******************* 
  
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

const stepCardDisplay = () => {
  let todaySteps = document.querySelector('#steps-user-steps-today');
  let foundStepsTodayObj = currentUser.activityRecord.find(activity => activity.date === todayDate && activity.steps);
  foundStepsTodayObj ? todaySteps.innerText = `${foundStepsTodayObj.steps}` : todaySteps.innerText = "0";
  let foundTodayMinutesActiveObj = currentUser.activityRecord.find(activity =>  activity.date === todayDate && activity.minutesActive);
  let todayMinutesActive = document.querySelector("#steps-info-active-minutes-today");
  foundTodayMinutesActiveObj ? todayMinutesActive.innerText = `${foundTodayMinutesActiveObj.minutesActive}` : todayMinutesActive.innerText = "0";
  document.querySelector('#steps-info-miles-walked-today').innerText = currentUser.activityRecord.find(activity => activity.date === todayDate).calculateMiles(userRepository);
  document.querySelector('#steps-calendar-total-active-minutes-weekly').innerText = currentUser.calculateAverageMinutesActiveThisWeek(todayDate);
  document.querySelector('#steps-calendar-total-steps-weekly').innerText = currentUser.calculateAverageStepsThisWeek(todayDate);
  document.querySelector('#steps-friend-steps-average-today').innerText = userRepository.calculateAverageMinutesActive(todayDate);
  document.querySelector('#steps-friend-average-step-goal').innerText = userRepository.calculateCommunityAvgStepGoal();
  document.querySelector('#steps-friend-active-minutes-average-today').innerText = userRepository.calculateAverageSteps(todayDate);
}
  
// //trending card
// const updateTrendingStepsDays = () => {
//   let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
//   currentUser.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStepDays[0]}</p>`;
// };
// ^^ iteration 5
  
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
    // updateTrendingStepsDays();
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains("steps-go-back-button")) {
    flipCard(event.target.parentNode, stepsMainCard);
  } 
  if (event.target.classList.contains('user-steps-submit')) {
    event.preventDefault();
    let inputSteps = document.querySelector('#input-steps');
    let inputMinutes = document.querySelector("#input-steps-minutes");
    let activityObj = new Activity({
      userID: currentUser.id,
      date: todayDate,
      numSteps: inputSteps.value,
      minutesActive: inputMinutes.value
    });
    currentUser.updateActivities(activityObj);
    stepCardDisplay();
    inputSteps.value = "";
    inputMinutes.value = "";
    flipCard(stepsInfoCard, stepsMainCard);
  }
}

stepSection.addEventListener('click', stepCardHandler);

///END of STEPS //


// // CLIMB SECTION //
const climbCardDisplay = () => {
  let stairsToday = document.querySelector("#stairs-user-stairs-today");
  let foundStairsTodayObj = currentUser.activityRecord.find(activity => activity.date === todayDate && activity.flightsOfStairs);
  let flightsToday = document.querySelector("#stairs-info-flights-today");
  let foundFlightsTodayObj = currentUser.activityRecord.find(activity => activity.date === todayDate && activity.flightsOfStairs);
  foundStairsTodayObj ? stairsToday.innerText = `${foundStairsTodayObj.flightsOfStairs * 12}` : stairsToday.innerText = "0";
  console.log(foundStairsTodayObj)
  foundFlightsTodayObj ? flightsToday.innerText = `${foundFlightsTodayObj.flightsOfStairs}` : flightsToday = "0";
  // ^^ broken, won't display stairs
  document.querySelector("#stairs-friend-flights-average-today").innerText = (userRepository.calculateAverageStairs(todayDate) / 12).toFixed(1);
  document.querySelector("#stairs-calendar-flights-average-weekly").innerText = currentUser.calculateAverageFlightsThisWeek(todayDate);
  document.querySelector("#stairs-calendar-stairs-average-weekly").innerText = (currentUser.calculateAverageFlightsThisWeek(todayDate) * 12).toFixed(0);
}

// const updateTrendingStairsDays = () => {
//   currentUser.findTrendingStairsDays();
//   let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStairsDays[0]}</p>`;
// }

const stairsCardHandler = () => {
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
    // updateTrendingStairsDays();
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains("stairs-go-back-button")) {
    flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains("user-stairs-submit")) {
    event.preventDefault();
    let inputStairs = document.querySelector("#input-stairs");
    let activityObj = new Activity({
      userID: currentUser.id,
      date: todayDate,
      flightsOfStairs: inputStairs.value
    });
    currentUser.updateActivities(activityObj);
    stepCardDisplay();
    inputStairs.value = "";
    flipCard(stairsInfoCard, stairsMainCard);
  }
}

stairsSection.addEventListener('click', stairsCardHandler);

// /// END of CLIMB ///

// // ~~~~~~~~~~~~~~~~~~~~WATER STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// document.querySelector("#hydration-friend-ounces-today").innerText = userRepository.calculateAverageDailyWater(todayDate);
// ^^iteration 5, broken anyhow.

// ************ MOVED TO DOM UPDATES ***********
// const hydrationCardDisplay = () => {
//   hydrationAddInputDisplay();
//   hydrationCalendarDisplay();
// }

// const hydrationAddInputDisplay = () => {
//   let hydrationUserOuncesToday = document.getElementById('hydration-user-ounces-today');
//   let foundTodayAmount = currentUser.ouncesRecord.find(ounce => ounce.date === todayDate);
//   foundTodayAmount ? hydrationUserOuncesToday.innerText = `${foundTodayAmount.ounces}` : hydrationUserOuncesToday.innerText = "0";
// }

// const hydrationCalendarDisplay = () => {
//   let weeklyAvg = document.querySelector(".hydration-weekly-avg");
//   let weekList = document.querySelector(".hydration-week-data-list");
//   let cardHtml = `<article class="hydration-amount-daily">${currentUser.getWeekOuncesByDay()}</br></article>`;
//   weeklyAvg.innerText = `You averaged ${currentUser.getWeekAvgOunces()} ounces this week!`;
//   weekList.innerText = "";
//   weekList.insertAdjacentHTML("beforeend", cardHtml);
// }



const hydrationCardHandler = () => {
  let hydrationMainCard = document.querySelector('#hydration-main-card');
  let hydrationInfoCard = document.querySelector('#hydration-info-card');
  let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
  let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
  if (event.target.classList.contains('hydration-info-button')) {
    domUpdates.flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    domUpdates.flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    domUpdates.flipCard(hydrationMainCard, hydrationCalendarCard);
  }
  if (event.target.classList.contains("hydration-go-back-button")) {
    domUpdates.flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('user-ounces-submit')) {
    event.preventDefault();
    let input = document.querySelector('#input-ounces');
    let hydrationObj = new Hydration({userID: currentUser.id, date: todayDate, numOunces: input.value});
    currentUser.updateHydration(todayDate, Number(hydrationObj.ounces));
    domUpdates.hydrationCardDisplay(); 
    input.value = "";
    domUpdates.flipCard(hydrationInfoCard, hydrationMainCard);
  }
}

hydrationSection.addEventListener('click', hydrationCardHandler);

// // END OF HYDRATION //

// // ~~~~~~~~~~~~~~~~~SLEEP STUFF~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

const sleepCardDisplay = () => {
  let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
  let foundTodaySleepAmount = currentUser.sleepHoursRecord.find(sleep => sleep.date === todayDate);
  foundTodaySleepAmount ? sleepUserHoursToday.innerText = `${foundTodaySleepAmount.hours}` : sleepUserHoursToday.innerText = "0";
  document.querySelector('#sleep-calendar-hours-average-weekly').innerText = currentUser.calculateAverageHoursThisWeek(todayDate);
  document.querySelector('#sleep-calendar-quality-average-weekly').innerText = currentUser.calculateAverageQualityThisWeek(todayDate);
  sleepInfoCardDisplay();
}

const sleepInfoCardDisplay = () => {
  let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
  let foundTodaySleepQuality = currentUser.sleepQualityRecord.find(sleep => sleep.date === todayDate);
  foundTodaySleepQuality ? sleepInfoQualityToday.innerText = `${foundTodaySleepQuality.quality}` : sleepInfoQualityToday.innerText = "0";
  document.querySelector('#sleep-info-hours-average-alltime').innerText = currentUser.hoursSleptAverage;
  document.querySelector('#sleep-info-quality-average-alltime').innerText = currentUser.sleepQualityAverage;
  // document.querySelector('#sleep-friend-longest-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getLongestSleepers(todayDate, sleepRepository)).getFirstName();
  // document.querySelector('#sleep-friend-worst-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getWorstSleepers(todayDate, sleepRepository)).getFirstName();
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
  if (event.target.classList.contains("user-sleep-submit")) {
    event.preventDefault();
    let inputHours = document.querySelector("#input-sleep");
    let inputQuality = document.querySelector("#input-sleep-quality");
    let sleepObj = new Sleep({
      userID: currentUser.id,
      date: todayDate,
      hoursSlept: inputHours.value,
      sleepQuality: inputQuality.value
    });
    currentUser.updateSleep(todayDate, Number(sleepObj.hoursSlept), Number(sleepObj.sleepQuality));
    sleepCardDisplay();
    inputHours.value = "";
    inputQuality.value = "";
    flipCard(sleepInfoCard, sleepMainCard);
  }
}

sleepSection.addEventListener('click', sleepCardHandler);


// //// END OF SLEEP //

// Had to make a new function needed to handle the user profile.
const populateUserProfile = () => { 
  domUpdates.showDropdown(currentUser)
}

// EVENT LISTENERS //

let profileButton = document.querySelector('#profile-button');
profileButton.addEventListener("click", populateUserProfile);

const loadHandler = () => {
  createDataSets();
  document.querySelector("#header-name").innerText = domUpdates.displayUsersName()
  domUpdates.hydrationCardDisplay();
  domUpdates.sleepCardDisplay();
  domUpdates.climbCardDisplay();
  domUpdates.stepCardDisplay();
}

window.addEventListener("load", loadHandler);