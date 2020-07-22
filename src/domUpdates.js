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

  // GENERAL DISPLAY //////////////////////////////////////////
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

  // HYDRATION DISPLAY SECTION /////////////////////////////////
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

  // ACTIVITY DISPLAY SECTION /////////////////////////////////

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

  // STAIR CARD DISPLAY














  // SLEEP DISPLAY SECTION /////////////////////////////////




}
export default domUpdates;