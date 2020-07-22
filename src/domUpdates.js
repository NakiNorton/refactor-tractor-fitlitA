const domUpdates = {
  currentUser: null,
  todayDate: null,
  

  defineData(todayDate) {
    this.todayDate = todayDate;
  },

  defineCurrentUser(user) {
    this.currentUser = user;
  },

  // GENERAL DISPLAY
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

  // HYDRATION DISPLAY SECTION

  hydrationCardDisplay() {
    this.hydrationAddInputDisplay();
    this.hydrationCalendarDisplay();
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

  // ACTIVITY DISPLAY SECTION






  // SLEEP DISPLAY SECTION 




}
export default domUpdates;