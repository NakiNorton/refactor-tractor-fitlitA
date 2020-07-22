const domUpdates = {
  currentUser: null,
  todayDate: null,
  
  defineData(todayDate, userRepository) {
    this.todayDate = todayDate;
    this.userRepository = userRepository;
  },

  defineCurrentUser(user) {
    this.currentUser = user;
  },

  ////////// GENERAL DISPLAY //////////////////////////////////////////
  displayUsersName() {
    return `${this.currentUser.getFirstName()}'S `;
  },

  showDropdown() {
    console.log('current user', this.currentUser)
    document.querySelector('#user-info-dropdown').classList.toggle('hide');
    document.querySelector('#dropdown-name').innerText = this.currentUser.name.toUpperCase();
    document.querySelector('#dropdown-goal').innerText = `DAILY STEP GOAL | ${this.currentUser.dailyStepGoal}`;
    document.querySelector('#dropdown-email').innerText = `EMAIL | ${this.currentUser.email}`;
    // showLeaderBoard(); // currently broken
  },

  flipCard(cardToHide, cardToShow) {
    console.log('FLIP!')
    cardToHide.classList.add('hide');
    cardToShow.classList.remove('hide');
  },

  //////////// HYDRATION DISPLAY SECTION /////////////////////////////////
  hydrationCardDisplay(input) {
    this.hydrationAddInputDisplay();
    this.hydrationCalendarDisplay();
    input.value = "";
  },

  hydrationAddInputDisplay() {
    let hydrationUserOuncesToday = document.getElementById('hydration-user-ounces-today');
    let foundTodayAmount = this.currentUser.ouncesRecord.find(ounce => ounce.date === this.todayDate);
    foundTodayAmount ? hydrationUserOuncesToday.innerText = `${foundTodayAmount.ounces}` : hydrationUserOuncesToday.innerText = "0";
  },

  hydrationCalendarDisplay() {
    let weeklyAvg = document.querySelector(".hydration-weekly-avg");
    let weekList = document.querySelector(".hydration-week-data-list");
    let cardHtml = `<article class="hydration-amount-daily">${this.currentUser.getWeekOuncesByDay()}</br></article>`; 
    weeklyAvg.innerText = `You averaged ${this.currentUser.getWeekAvgOunces()} ounces this week!`; 
    weekList.innerText = "";
    weekList.insertAdjacentHTML("beforeend", cardHtml);
  },

  // const saveInput = (input, category) => {
  //   if (category) {
  //     let hydrationObj = new Hydration({userID: currentUser.id, date: todayDate, ounces: input});
  //     currentUser.updateHydration(todayDate, hydrationObj.ounces);
  //     hydrationCardDisplay();
  //   }
  // if (category === 'sleepCategory');
  // if (category === 'stepsCategory');
  // }
  // ^^ trying to get one saveInput method where we pass in the input and category its called on, so it can be dynamic
  // and we can use for all handlers

  ///////////// ACTIVITY DISPLAY SECTION /////////////////////////////////

/* STEPS */
  stepCardDisplay() {
    let todaySteps = document.querySelector('#steps-user-steps-today');
    let foundStepsTodayObj = this.currentUser.activityRecord.find(activity => activity.date === this.todayDate && activity.steps);
    foundStepsTodayObj ? todaySteps.innerText = `${foundStepsTodayObj.steps}` : todaySteps.innerText = "0";
    let foundTodayMinutesActiveObj = this.currentUser.activityRecord.find(activity => activity.date === this.todayDate && activity.minutesActive);
    let todayMinutesActive = document.querySelector("#steps-info-active-minutes-today");
    foundTodayMinutesActiveObj ? todayMinutesActive.innerText = `${foundTodayMinutesActiveObj.minutesActive}` : todayMinutesActive.innerText = "0";
    document.querySelector('#steps-info-miles-walked-today').innerText = this.currentUser.activityRecord.find(activity => activity.date === this.todayDate).calculateMiles(this.userRepository);
    document.querySelector('#steps-calendar-total-active-minutes-weekly').innerText = this.currentUser.calculateAverageMinutesActiveThisWeek(this.todayDate);
    document.querySelector('#steps-calendar-total-steps-weekly').innerText = this.currentUser.calculateAverageStepsThisWeek(this.todayDate);
    document.querySelector('#steps-friend-steps-average-today').innerText = this.userRepository.calculateAverageMinutesActive(this.todayDate);
    document.querySelector('#steps-friend-average-step-goal').innerText = this.userRepository.calculateCommunityAvgStepGoal();
    document.querySelector('#steps-friend-active-minutes-average-today').innerText = this.userRepository.calculateAverageSteps(this.todayDate);
  },


// //trending card
// const updateTrendingStepsDays = () => {
//   let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
//   currentUser.findTrendingStepDays();
//   trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStepDays[0]}</p>`;
// };

  /****** STAIR CARD DISPLAY ***************/

  climbCardDisplay() {
    let stairsToday = document.querySelector("#stairs-user-stairs-today");
    let foundStairsTodayObj = this.currentUser.activityRecord.find(activity => activity.date === this.todayDate && activity.flightsOfStairs);
    let flightsToday = document.querySelector("#stairs-info-flights-today");
    let foundFlightsTodayObj = this.currentUser.activityRecord.find(activity => activity.date === this.todayDate && activity.flightsOfStairs);
    foundStairsTodayObj ? stairsToday.innerText = `${foundStairsTodayObj.flightsOfStairs * 12}` : stairsToday.innerText = "0";
    console.log(foundStairsTodayObj)
    foundFlightsTodayObj ? flightsToday.innerText = `${foundFlightsTodayObj.flightsOfStairs}` : flightsToday = "0";
    // ^^ broken, won't display stairs
    document.querySelector("#stairs-friend-flights-average-today").innerText = (this.userRepository.calculateAverageStairs(this.todayDate) / 12).toFixed(1);
    document.querySelector("#stairs-calendar-flights-average-weekly").innerText = this.currentUser.calculateAverageFlightsThisWeek(this.todayDate);
    document.querySelector("#stairs-calendar-stairs-average-weekly").innerText = (this.currentUser.calculateAverageFlightsThisWeek(this.todayDate) * 12).toFixed(0);
  },

// const updateTrendingStairsDays = () => {
//   currentUser.findTrendingStairsDays();
//   let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
//   trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStairsDays[0]}</p>`;
// }


  //////// SLEEP DISPLAY SECTION //////////////////////////////////////
  sleepCardDisplay() {
    let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
    let foundTodaySleepAmount = this.currentUser.sleepHoursRecord.find(sleep => sleep.date === this.todayDate);
    foundTodaySleepAmount ? sleepUserHoursToday.innerText = `${foundTodaySleepAmount.hours}` : sleepUserHoursToday.innerText = "0";
    document.querySelector('#sleep-calendar-hours-average-weekly').innerText = this.currentUser.calculateAverageHoursThisWeek(this.todayDate);
    document.querySelector('#sleep-calendar-quality-average-weekly').innerText = this.currentUser.calculateAverageQualityThisWeek(this.todayDate);
    this.sleepInfoCardDisplay();
  },

  sleepInfoCardDisplay() {
    let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
    let foundTodaySleepQuality = this.currentUser.sleepQualityRecord.find(sleep => sleep.date === this.todayDate);
    foundTodaySleepQuality ? sleepInfoQualityToday.innerText = `${foundTodaySleepQuality.quality}` : sleepInfoQualityToday.innerText = "0";
    document.querySelector('#sleep-info-hours-average-alltime').innerText = this.currentUser.hoursSleptAverage;
    document.querySelector('#sleep-info-quality-average-alltime').innerText = this.currentUser.sleepQualityAverage;
    // document.querySelector('#sleep-friend-longest-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getLongestSleepers(todayDate, sleepRepository)).getFirstName();
    // document.querySelector('#sleep-friend-worst-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getWorstSleepers(todayDate, sleepRepository)).getFirstName();
  },



}
export default domUpdates;