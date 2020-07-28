import './css/base.scss';
import './css/styles.scss';

import fetchData from './fetchData';
import domUpdates from './domUpdates';
import moment from 'moment';
import UserRepository from './UserRepository';

let currentUser;
let todaysDate;

const hydrationSection = document.querySelector('#hydration-card-container');
const sleepSection = document.querySelector('#sleep-card-container');
const stepSection = document.querySelector('#steps-card-container');
const stairsSection = document.querySelector('#stairs-card-container');

function getData() {
  return fetchData().then((data) => {
    todaysDate = moment().format('YYYY/MM/DD');
    let userRepository = new UserRepository(data, todaysDate);
    currentUser = userRepository.users[Math.floor(Math.random() * userRepository.users.length)]
    domUpdates.defineData(currentUser, todaysDate, userRepository);
  }).then(() => {
    domUpdates.displayPage();
  })
    .catch((err) => console.log(err.message));
}

const populateUserProfile = () => {
  domUpdates.showDropdown(currentUser);
}

const postNewActivityRecord = () => {
  let inputStairs = document.querySelector('#input-stairs');
  let inputSteps = document.querySelector('#input-steps');
  let inputMinutes = document.querySelector('#input-steps-minutes');
  let newActivityEntry = {
    userID: currentUser.id,
    date: todaysDate,
    numSteps: Number(inputSteps.value),
    minutesActive: Number(inputMinutes.value),
    flightsOfStairs: inputStairs.value * 12
  }
  postActivityData(newActivityEntry);
  currentUser.activityInfo.addActivityInput(newActivityEntry);
}

/////// STEP SECTION ////////////////////////

const stepCardHandler = () => {
  let stepsMainCard = document.querySelector('#steps-main-card');
  let stepsInfoCard = document.querySelector('#steps-info-card');
  let stepsFriendsCard = document.querySelector('#steps-friends-card');
  let stepsCalendarCard = document.querySelector('#steps-calendar-card');
  if (event.target.classList.contains('steps-info-button')) {
    domUpdates.flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    domUpdates.flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    domUpdates.flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains('steps-go-back-button')) {
    domUpdates.flipCard(event.target.parentNode, stepsMainCard);
  }
  if (event.target.classList.contains('user-steps-submit')) {
    event.preventDefault();
    postNewActivityRecord();
    domUpdates.displayStepCard();
    domUpdates.flipCard(stepsInfoCard, stepsMainCard);
  }
}

////// STAIRS SECTION ///////

const stairsCardHandler = () => {
  let stairsMainCard = document.querySelector('#stairs-main-card');
  let stairsInfoCard = document.querySelector('#stairs-info-card');
  let stairsFriendsCard = document.querySelector('#stairs-friends-card');
  let stairsCalendarCard = document.querySelector('#stairs-calendar-card');
  if (event.target.classList.contains('stairs-info-button')) {
    domUpdates.flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    domUpdates.flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    domUpdates.flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains('stairs-go-back-button')) {
    domUpdates.flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains('user-stairs-submit')) {
    event.preventDefault();
    postNewActivityRecord();
    domUpdates.displayStairsCard();
    domUpdates.flipCard(stairsInfoCard, stairsMainCard);
  }
}

///// HYDRATION SECTION ///////////////

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
  if (event.target.classList.contains('hydration-go-back-button')) {
    domUpdates.flipCard(event.target.parentNode, hydrationMainCard);
  }
  if (event.target.classList.contains('user-ounces-submit')) {
    event.preventDefault();
    let input = document.querySelector('#input-ounces');
    let newHydrationEntry = {userID: currentUser.id, 
      date: todaysDate, 
      numOunces: Number(input.value
      )};
    currentUser.hydrationInfo.addHydroInput(newHydrationEntry);
    postHydrationData(newHydrationEntry);
    domUpdates.displayHydrationCard(input); 
    domUpdates.flipCard(hydrationInfoCard, hydrationMainCard);
  }
}

////// SLEEP SECTION ///////

function sleepCardHandler() {
  let sleepMainCard = document.querySelector('#sleep-main-card');
  let sleepInfoCard = document.querySelector('#sleep-info-card');
  let sleepFriendsCard = document.querySelector('#sleep-friends-card');
  let sleepCalendarCard = document.querySelector('#sleep-calendar-card');
  if (event.target.classList.contains('sleep-info-button')) {
    domUpdates.flipCard(sleepMainCard, sleepInfoCard);
  }
  if (event.target.classList.contains('sleep-friends-button')) {
    domUpdates.flipCard(sleepMainCard, sleepFriendsCard);
  }
  if (event.target.classList.contains('sleep-calendar-button')) {
    domUpdates.flipCard(sleepMainCard, sleepCalendarCard);
  }
  if (event.target.classList.contains('sleep-go-back-button')) {
    domUpdates.flipCard(event.target.parentNode, sleepMainCard);
  }
  if (event.target.classList.contains('user-sleep-submit')) {
    event.preventDefault();
    let inputHours = document.querySelector('#input-sleep');
    let inputQuality = document.querySelector('#input-sleep-quality');
    let newSleepEntry = {
      userID: currentUser.id,
      date: todaysDate,
      hoursSlept: Number(inputHours.value),
      sleepQuality: Number(inputQuality.value)
    };
    postSleepData(newSleepEntry)
    currentUser.sleepInfo.addSleepInput(newSleepEntry);
    domUpdates.displaySleepCard();
    domUpdates.flipCard(sleepInfoCard, sleepMainCard);
  }
}

///////Post Section ///////////////////////////////

function postHydrationData(hydrationEntry) {
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/hydration/hydrationData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(hydrationEntry)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.log('Failed:', error)
    })
}

function postSleepData(sleepEntry) {
  fetch('https://fe-apps.herokuapp.com/api/v1/fitlit/1908/sleep/sleepData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(sleepEntry)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.log('Failed:', error)
    })
}

function postActivityData(activityEntry) {
  fetch('	https://fe-apps.herokuapp.com/api/v1/fitlit/1908/activity/activityData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(activityEntry)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log('Success:', data)
    })
    .catch((error) => {
      console.log('Failed', error)
    })
}

/////// EVENT LISTENERS ////////

window.addEventListener('load', getData);
document.querySelector('#profile-button').addEventListener('click', populateUserProfile);
sleepSection.addEventListener('click', sleepCardHandler);
hydrationSection.addEventListener('click', hydrationCardHandler);
stairsSection.addEventListener('click', stairsCardHandler);
stepSection.addEventListener('click', stepCardHandler);
