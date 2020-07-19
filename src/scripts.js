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
// should keep an eye out for when the variable `user` is being used when it should be currentUser

// let todayDate = "2019/09/22";
// user.findFriendsNames(userRepository.users);
// let mainPage = document.querySelector('main');

// HEADER 
const displayHeader = (e) => {
  document.querySelector("#header-name").innerText = `${currentUser.getFirstName()}'S `;
}

// STEP SECTION 


activityData.forEach(activity => {
  activity = new Activity(activity, userRepository);
});

hydrationData.forEach(hydration => {
  hydration = new Hydration(hydration, userRepository);
});

sleepData.forEach(sleep => {
  sleep = new Sleep(sleep, userRepository);
});


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

// WATER FUNCTIONS
let sortedHydrationDataByDate = user.ouncesRecord.sort((a, b) => {
  if (Object.keys(a)[0] > Object.keys(b)[0]) {
    return -1;
  }
  if (Object.keys(a)[0] < Object.keys(b)[0]) {
    return 1;
  }
  return 0;
});

for (var i = 0; i < dailyOz.length; i++) {
  dailyOz[i].innerText = user.addDailyOunces(Object.keys(sortedHydrationDataByDate[i])[0])
}

hydrationUserOuncesToday.innerText = hydrationData.find(hydration => {
  return hydration.userID === user.id && hydration.date === todayDate;
}).numOunces;

hydrationFriendOuncesToday.innerText = userRepository.calculateAverageDailyWater(todayDate);

hydrationInfoGlassesToday.innerText = hydrationData.find(hydration => {
  return hydration.userID === user.id && hydration.date === todayDate;
}).numOunces / 8;


function waterCardHandler() {
  let hydrationCalendarCard = document.querySelector('#hydration-calendar-card');
  let hydrationFriendsCard = document.querySelector('#hydration-friends-card');
  let hydrationInfoCard = document.querySelector('#hydration-info-card');
  let hydrationMainCard = document.querySelector('#hydration-main-card');
  if (event.target.classList.contains('hydration-info-button')) {
    flipCard(hydrationMainCard, hydrationInfoCard);
  }
  if (event.target.classList.contains('hydration-friends-button')) {
    flipCard(hydrationMainCard, hydrationFriendsCard);
  }
  if (event.target.classList.contains('hydration-calendar-button')) {
    flipCard(hydrationMainCard, hydrationCalendarCard);
  }
}


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
sleepCalendarHoursAverageWeekly.innerText = user.calculateAverageHoursThisWeek(todayDate);

sleepCalendarQualityAverageWeekly.innerText = user.calculateAverageQualityThisWeek(todayDate);

sleepFriendLongestSleeper.innerText = userRepository.users.find(user => {
  return user.id === userRepository.getLongestSleepers(todayDate)
}).getFirstName();

sleepFriendWorstSleeper.innerText = userRepository.users.find(user => {
  return user.id === userRepository.getWorstSleepers(todayDate)
}).getFirstName();

sleepInfoHoursAverageAllTime.innerText = user.hoursSleptAverage;

sleepInfoQualityAverageAllTime.innerText = user.sleepQualityAverage;

sleepInfoQualityToday.innerText = sleepData.find(sleep => {
  return sleep.userID === user.id && sleep.date === todayDate;
}).sleepQuality;

sleepUserHoursToday.innerText = sleepData.find(sleep => {
  return sleep.userID === user.id && sleep.date === todayDate;
}).hoursSlept;


mainPage.addEventListener('click', showInfo);
stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
stepsTrendingButton.addEventListener('click', updateTrendingStepDays());


function flipCard(cardToHide, cardToShow) {
  cardToHide.classList.add('hide');
  cardToShow.classList.remove('hide');
}


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
//   // if (event.target.classList.contains('hydration-info-button')) {
//   //   flipCard(hydrationMainCard, hydrationInfoCard);
//   // }
//   // if (event.target.classList.contains('hydration-friends-button')) {
//   //   flipCard(hydrationMainCard, hydrationFriendsCard);
//   // }
//   // if (event.target.classList.contains('hydration-calendar-button')) {
//   //   flipCard(hydrationMainCard, hydrationCalendarCard);
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
//   // if (event.target.classList.contains('sleep-info-button')) {
//   //   flipCard(sleepMainCard, sleepInfoCard);
//   // }
//   // if (event.target.classList.contains('sleep-friends-button')) {
//   //   flipCard(sleepMainCard, sleepFriendsCard);
//   // }
//   // if (event.target.classList.contains('sleep-calendar-button')) {
//   //   flipCard(sleepMainCard, sleepCalendarCard);
//   // }
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


function sleepCardHandler() {
  let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
  let sleepFriendsCard = document.querySelector('#sleep-friends-card');
  let sleepInfoCard = document.querySelector('#sleep-info-card');
  let sleepMainCard = document.querySelector('#sleep-main-card');
  if (event.target.classList.contains('sleep-info-button')) {
    flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    flipCard(sleepMainCard, sleepCalendarCard);
  }
}

// stepsTrendingButton.addEventListener('click', function() {
//   currentUser.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStepDays[0]}</p>`;
// });

// CLIMB/STAIRS SECTION


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
// currentUser.findFriendsNames(userRepository.users);

// let dailyOz = document.querySelectorAll('.daily-oz');
// let dropdownEmail = document.querySelector('#dropdown-email');
// let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
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


window.addEventListener('load', displayUserInfo);
// mainPage.addEventListener('click', showInfo);
// profileButton.addEventListener('click', showDropdown);
// stairsTrendingButton.addEventListener('click', updateTrendingStairsDays());
// stepsTrendingButton.addEventListener('click', updateTrendingStepDays());

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



