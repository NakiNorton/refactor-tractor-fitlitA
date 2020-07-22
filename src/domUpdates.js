class DomUpdates {
  constructor() {
    // this.currentUser = currentUser;
    // this.todayDate = todayDate;
  }

  // GENERAL DISPLAY

  showDropdown(currentUser) {
    console.log('current user', currentUser)
    document.querySelector('#user-info-dropdown').classList.toggle('hide');
    document.querySelector('#dropdown-name').innerText = currentUser.name.toUpperCase();
    document.querySelector('#dropdown-goal').innerText = `DAILY STEP GOAL | ${currentUser.dailyStepGoal}`;
    document.querySelector('#dropdown-email').innerText = `EMAIL | ${currentUser.email}`;
    // showLeaderBoard(); // currently broken
  }

  flipCard(cardToHide, cardToShow) {
    console.log('FLIP!')
    cardToHide.classList.add('hide');
    cardToShow.classList.remove('hide');
  }

  // HYDRATION DISPLAY SECTION

  hydrationCardDisplay(currentUser, todayDate) {
    this.hydrationAddInputDisplay(currentUser, todayDate);
    this.hydrationCalendarDisplay(currentUser);
  }

  hydrationAddInputDisplay(currentUser, todayDate) {
    let hydrationUserOuncesToday = document.getElementById('hydration-user-ounces-today');
    let foundTodayAmount = currentUser.ouncesRecord.find(ounce => ounce.date === todayDate);
    foundTodayAmount ? hydrationUserOuncesToday.innerText = `${foundTodayAmount.ounces}` : hydrationUserOuncesToday.innerText = "0";
  }

  hydrationCalendarDisplay(currentUser) {
    let weeklyAvg = document.querySelector(".hydration-weekly-avg");
    let weekList = document.querySelector(".hydration-week-data-list");
    let cardHtml = `<article class="hydration-amount-daily">${currentUser.getWeekOuncesByDay()}</br></article>`;
    weeklyAvg.innerText = `You averaged ${currentUser.getWeekAvgOunces()} ounces this week!`;
    weekList.innerText = "";
    weekList.insertAdjacentHTML("beforeend", cardHtml);
  }

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
export default DomUpdates;