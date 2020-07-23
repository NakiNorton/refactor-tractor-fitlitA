import './css/base.scss';
import './css/styles.scss';

import fetchData from './fetchData';
import domUpdates from './domUpdates';
import UserRepository from './UserRepository';
import HydrationRepository from './HydrationRepository';
import ActivityRepository from './Activity-Repository'
import SleepRepository from "./SleepRepository";

import User from './User';
import Hydration from './Hydration';
import Sleep from './Sleep';
import Activity from './Activity';
import moment from 'moment';

const hydrationSection = document.querySelector("#hydration-card-container");
const sleepSection = document.querySelector("#sleep-card-container");
const stepSection = document.querySelector("#steps-card-container");
const stairsSection = document.querySelector("#stairs-card-container");

function getData() {
  return fetchData()
    .then((data) => {
      let userRepository = new dataConfig(data);
      // need to get the User at random eventually
      let currentUser = new User(userRepository[0]);
      let todayDate = moment().format("L");
      domUpdates.defineData(currentUser, todayDate, userRepository);
    }).then(() => {
      domUpdates.displayPage()})
    .catch((err) => console.log(err.message));
}

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
    let activityObj = new Activity({
      userID: currentUser.id,
      date: todayDate,
      flightsOfStairs: inputStairs.value
    });
    currentUser.updateActivities(activityObj);
    domUpdates.stepCardDisplay();
    inputStairs.value = "";
    domUpdates.flipCard(stairsInfoCard, stairsMainCard);
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
    let hydrationObj = new Hydration({userID: currentUser.id, date: todayDate, numOunces: input.value});
    currentUser.updateHydration(todayDate, Number(hydrationObj.ounces));
    domUpdates.hydrationCardDisplay(input); 
    console.log(currentUser);
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
    let sleepObj = new Sleep({
      userID: currentUser.id,
      date: todayDate,
      hoursSlept: inputHours.value,
      sleepQuality: inputQuality.value
    });

    currentUser.updateSleep(todayDate, Number(sleepObj.hoursSlept), Number(sleepObj.sleepQuality));
    domUpdates.sleepCardDisplay(inputHours, inputQuality);
    domUpdates.flipCard(sleepInfoCard, sleepMainCard);
  }
}

//////// ONLOAD /////////////////

// const loadHandler = () => {
//   getData()
//     .then(() => {
//       domUpdates.displayPage();
//     })
// }

/////// EVENT LISTENERS ////////

window.addEventListener("load", getData);
let profileButton = document.querySelector('#profile-button');
profileButton.addEventListener("click", populateUserProfile);
sleepSection.addEventListener('click', sleepCardHandler);
hydrationSection.addEventListener('click', hydrationCardHandler);
stairsSection.addEventListener('click', stairsCardHandler);
stepSection.addEventListener('click', stepCardHandler);
