import './css/base.scss';
import './css/styles.scss';

import fetchData from './fetchData';
import domUpdates from './domUpdates';
import moment from 'moment';
import UserRepository from './UserRepository';

let currentUser;
let todaysDate;

const hydrationSection = document.querySelector("#hydration-card-container");
const sleepSection = document.querySelector("#sleep-card-container");
const stepSection = document.querySelector("#steps-card-container");
const stairsSection = document.querySelector("#stairs-card-container");

function getData() {
  return fetchData().then((data) => {
    todaysDate = moment().format("L");
    let userRepository = new UserRepository(data, todaysDate);
    currentUser = userRepository.users[0]
    console.log(currentUser)
    domUpdates.defineData(currentUser, todaysDate, userRepository);
  }).then(() => {
    domUpdates.displayPage()
  })
    .catch((err) => console.log(err.message));
}

// categories would be sleep, hydration, and activity
// function postData(dataObj, category) {
//    fetch(`https://fe-apps.herokuapp.com/api/v1/fitlit/1908/${category}/${category}Data`, {
//   method: 'POST',
//   headers: {
//   	'Content-Type': 'application/json'
//   },
//   body: JSON.stringify(dataObj),
// })
//   .then(response => response.json())
//   .then(json => /*do something with json*/) // i actually don't think we need this line, postman is a good tool for this
//   .catch(err => console.log(err.message));
// }


const populateUserProfile = () => {
  domUpdates.showDropdown(currentUser);
}

/////// STEP SECTION /////////

const stepCardHandler = () => {
  let stepsMainCard = document.querySelector('#steps-main-card');
  let stepsInfoCard = document.querySelector('#steps-info-card');
  let stepsFriendsCard = document.querySelector('#steps-friends-card');
  let stepsTrendingCard = document.querySelector('#steps-trending-card');
  let stepsCalendarCard = document.querySelector('#steps-calendar-card');
  if (event.target.classList.contains('steps-info-button')) {
    domUpdates.flipCard(stepsMainCard, stepsInfoCard);
  }
  if (event.target.classList.contains('steps-friends-button')) {
    domUpdates.flipCard(stepsMainCard, stepsFriendsCard);
  }
  if (event.target.classList.contains('steps-trending-button')) {
    domUpdates.flipCard(stepsMainCard, stepsTrendingCard);
  }
  if (event.target.classList.contains('steps-calendar-button')) {
    domUpdates.flipCard(stepsMainCard, stepsCalendarCard);
  }
  if (event.target.classList.contains("steps-go-back-button")) {
    domUpdates.flipCard(event.target.parentNode, stepsMainCard);
  } 
  if (event.target.classList.contains('date-input-submit')) {
    event.preventDefault();
    let input = document.querySelector('#input-date');
    domUpdates.stepsInfoCard(input.value);
    input.value = ""; 
  }
  if (event.target.classList.contains('user-steps-submit')) {
    event.preventDefault();
    let inputSteps = document.querySelector('#input-steps');
    let inputMinutes = document.querySelector("#input-steps-minutes");
    let newActivityEntry = {
      userID: currentUser.id,
      date: todaysDate,
      numSteps: Number(inputSteps.value),
      minutesActive: Number(inputMinutes.value)
    };
    currentUser.activityInfo.updateActivities(newActivityEntry);
    domUpdates.stepCardDisplay();
    inputSteps.value = ""; 
    inputMinutes.value = "";
    domUpdates.flipCard(stepsInfoCard, stepsMainCard);
  }
}

////// STAIRS SECTION ///////

const stairsCardHandler = () => {
  let stairsMainCard = document.querySelector("#stairs-main-card");
  let stairsInfoCard = document.querySelector("#stairs-info-card");
  let stairsFriendsCard = document.querySelector("#stairs-friends-card");
  let stairsCalendarCard = document.querySelector("#stairs-calendar-card");
  let stairsTrendingCard = document.querySelector("#stairs-trending-card");
  if (event.target.classList.contains('stairs-info-button')) {
    domUpdates.flipCard(stairsMainCard, stairsInfoCard);
  }
  if (event.target.classList.contains('stairs-friends-button')) {
    domUpdates.flipCard(stairsMainCard, stairsFriendsCard);
  }
  if (event.target.classList.contains('stairs-trending-button')) {
    domUpdates.flipCard(stairsMainCard, stairsTrendingCard);
    // updateTrendingStairsDays();
  }
  if (event.target.classList.contains('stairs-calendar-button')) {
    domUpdates.flipCard(stairsMainCard, stairsCalendarCard);
  }
  if (event.target.classList.contains("stairs-go-back-button")) {
    domUpdates.flipCard(event.target.parentNode, stairsMainCard);
  }
  if (event.target.classList.contains("user-stairs-submit")) {
    event.preventDefault();
    let inputStairs = document.querySelector("#input-stairs");
    let activityObj = {
      userID: currentUser.id,
      date: todaysDate,
      flightsOfStairs: inputStairs.value * 12
    };
    currentUser.activityInfo.addStairsInput(activityObj);
    domUpdates.stairsCardDisplay();
    domUpdates.flipCard(stairsInfoCard, stairsMainCard);
    inputStairs.value = "";
  }
}

///// HYDRATION SECTION ///////////

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
    let hydrationObj = {userID: currentUser.id, date: todaysDate, numOunces: Number(input.value)};
    currentUser.hydrationInfo.addHydroInput(hydrationObj);
    // postData(hydrationObj, hydration);
    domUpdates.hydrationCardDisplay(input); 
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
  if (event.target.classList.contains("sleep-go-back-button")) {
    domUpdates.flipCard(event.target.parentNode, sleepMainCard);
  }
  if (event.target.classList.contains("user-sleep-submit")) {
    event.preventDefault();
    let inputHours = document.querySelector("#input-sleep");
    let inputQuality = document.querySelector("#input-sleep-quality");
    let sleepObj = {
      userID: currentUser.id,
      date: todaysDate,
      hoursSlept: inputHours.value,
      sleepQuality: inputQuality.value
    };
    currentUser.updateSleep(todaysDate, Number(sleepObj.hoursSlept), Number(sleepObj.sleepQuality));
    domUpdates.sleepCardDisplay(inputHours, inputQuality);
    domUpdates.flipCard(sleepInfoCard, sleepMainCard);
  }
}

/////// EVENT LISTENERS ////////

window.addEventListener("load", getData);
document.querySelector('#profile-button').addEventListener("click", populateUserProfile);
sleepSection.addEventListener('click', sleepCardHandler);
hydrationSection.addEventListener('click', hydrationCardHandler);
stairsSection.addEventListener('click', stairsCardHandler);
stepSection.addEventListener('click', stepCardHandler);
