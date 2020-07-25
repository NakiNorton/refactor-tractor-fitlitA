const domUpdates = {
  currentUser: null,
  todaysDate: null,
  userRepository: null,
  
  defineData(user, todaysDate, userRepository) {
    this.currentUser = user;
    this.todaysDate = todaysDate;
    this.userRepository = userRepository;
  },

  ////////// GENERAL DISPLAY //////////////////////////////////////////
  displayPage() {
    document.querySelector('#header-name').innerText = `${this.currentUser.getFirstName()}'S `;
    this.hydrationCardDisplay();
    // this.stepCardDisplay();
    // this.stairsCardDisplay();
    // this.sleepCardDisplay();
  },
  
  flipCard(cardToHide, cardToShow) {
    cardToHide.classList.add('hide');
    cardToShow.classList.remove('hide');
  },
  
  showDropdown() {
    document.querySelector('#user-info-dropdown').classList.toggle('hide');
    document.querySelector('#dropdown-name').innerText = this.currentUser.name.toUpperCase();
    document.querySelector('#dropdown-goal').innerText = `DAILY STEP GOAL | ${this.currentUser.dailyStepGoal}`;
    document.querySelector('#dropdown-email').innerText = `EMAIL | ${this.currentUser.email}`;
    // showLeaderBoard(); // currently broken
  },

  // leaderboard in dropdown menu, not sure what's happening here, will need to follow HTML, method is broken in User file
  // const showLeaderBoard = () => {
  //   let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
  //   let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
  //   currentUser.findFriendsNames(userRepository.users); // went thru original JS, couldn't find this, don't know where it came from
  //   currentUser.findFriendsTotalStepsForWeek(userRepository.users, todaysDate);
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


  ///////////// STEPS DISPLAY SECTION /////////////////////////////////

  stepCardDisplay() {
    this.stepMainCardDisplay();
    this.stepInfoCardDisplay();
    this.stepCalendarCardDisplay();
    // this.stepFriendCardDisplay();
    // this.stepTrendingCardDisplay();
  },
  
  stepMainCardDisplay() {
    let todaySteps = document.querySelector('#steps-user-steps-today');
    let foundStepsTodayObj = this.currentUser.activityRecord.find(activity => activity.date === this.todaysDate && activity.steps);
    foundStepsTodayObj ? todaySteps.innerText = `${foundStepsTodayObj.steps}` : todaySteps.innerText = "0";
  },
  
  stepInfoCardDisplay() {
    let foundTodayMinutesActiveObj = this.currentUser.activityRecord.find(activity => activity.date === this.todaysDate && activity.minutesActive);
    let todayMinutesActive = document.querySelector("#steps-info-active-minutes-today");
    foundTodayMinutesActiveObj ? todayMinutesActive.innerText = `${foundTodayMinutesActiveObj.minutesActive}` : todayMinutesActive.innerText = "0";
    let milesWalkedToday = document.querySelector('#steps-info-miles-walked-today');
    let milesWalkedObj = this.currentUser.activityRecord.find(activity => activity.date === this.todaysDate);
    if (milesWalkedObj) {
      milesWalkedObj = milesWalkedObj.calculateMiles(this.userRepository);
    }
    milesWalkedObj ? milesWalkedToday.innerText = `${milesWalkedObj}` : milesWalkedToday.innerText = "0";
  },
  
  stepCalendarCardDisplay() {
    document.querySelector('#steps-calendar-total-active-minutes-weekly').innerText = this.currentUser.calculateAverageMinutesActiveThisWeek(this.todaysDate);
    document.querySelector('#steps-calendar-total-steps-weekly').innerText = this.currentUser.calculateAverageStepsThisWeek(this.todaysDate);
  },
  
  stepFriendCardDisplay() {
    document.querySelector('#steps-friend-steps-average-today').innerText = this.userRepository.calculateAverageMinutesActive(this.todaysDate);
    document.querySelector('#steps-friend-average-step-goal').innerText = this.userRepository.calculateCommunityAvgStepGoal();
    document.querySelector('#steps-friend-active-minutes-average-today').innerText = this.userRepository.calculateAverageSteps(this.todaysDate);
  },

  // stepTrendingCardDisplay() {
  //   let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
  // currentUser.findTrendingStepDays();
  // trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStepDays[0]}</p>`;
  // }


  ///////////// STEPS DISPLAY SECTION /////////////////////////////////

  stairsCardDisplay() {
    this.stairsMainCardDisplay();
    let flightsToday = document.querySelector("#stairs-info-flights-today");
    let foundFlightsTodayObj = this.currentUser.activityRecord.find(activity => activity.date === this.todaysDate && activity.flightsOfStairs);
    foundFlightsTodayObj ? flightsToday.innerText = `${foundFlightsTodayObj.flightsOfStairs}` : flightsToday = "0";
    // document.querySelector("#stairs-friend-flights-average-today").innerText = (this.userRepository.calculateAverageStairs(this.todaysDate) / 12).toFixed(1);
  },
  
  stairsMainCardDisplay() {
    let stairsToday = document.querySelector("#stairs-user-stairs-today");
    let foundStairsTodayObj = this.currentUser.activityRecord.find(activity => activity.date === this.todaysDate && activity.flightsOfStairs);
    foundStairsTodayObj ? stairsToday.innerText = `${foundStairsTodayObj.flightsOfStairs * 12}` : stairsToday.innerText = "0";
  },

  stairsCalendarCardDisplay() {
    document.querySelector("#stairs-calendar-flights-average-weekly").innerText = this.currentUser.calculateAverageFlightsThisWeek(this.todaysDate);
    document.querySelector("#stairs-calendar-stairs-average-weekly").innerText = (this.currentUser.calculateAverageFlightsThisWeek(this.todaysDate) * 12).toFixed(0);
  },

  stairsTrendingCardDisplay() {
  // currentUser.findTrendingStairsDays();
  // let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
  // trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStairsDays[0]}</p>`;
  },


  //////////// HYDRATION DISPLAY SECTION /////////////////////////////////

  hydrationCardDisplay() {
    document.getElementById("hydration-user-ounces-today").innerText = `${this.currentUser.hydrationInfo.findTodaysTotalWater(this.todaysDate)}`;
    this.hydrationCalendarDisplay();
    // input.value = "";
  },

  hydrationCalendarDisplay() {
    document.querySelector(".hydration-weekly-avg").innerText = `You averaged ${this.currentUser.hydrationInfo.getWeekAvgOunces()} ounces this week!`;
    let dailyOz = document.querySelectorAll('.daily-oz');
    this.currentUser.hydrationInfo.getWeeksDailyOunces().forEach(day => {
      dailyOz.forEach(htmlPiece => {
        htmlPiece.innerText = day;
      })
    })
  },

  // document.querySelector("#hydration-friend-ounces-today").innerText = userRepository.calculateAverageDailyWater(todaysDate);


  //////// SLEEP DISPLAY SECTION //////////////////////////////////////

  sleepCardDisplay(input1, input2) {
    let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
    let foundTodaySleepAmount = this.currentUser.sleepHoursRecord.find(sleep => sleep.date === this.todaysDate);
    foundTodaySleepAmount ? sleepUserHoursToday.innerText = `${foundTodaySleepAmount.hours}` : sleepUserHoursToday.innerText = "0";
    document.querySelector('#sleep-calendar-hours-average-weekly').innerText = this.currentUser.calculateAverageHoursThisWeek(this.todaysDate);
    document.querySelector('#sleep-calendar-quality-average-weekly').innerText = this.currentUser.calculateAverageQualityThisWeek(this.todaysDate);
    this.sleepInfoCardDisplay();
    // input1.innerText = "";
    // input2.innerText - "";
  },

  sleepInfoCardDisplay() {
    let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
    let foundTodaySleepQuality = this.currentUser.sleepQualityRecord.find(sleep => sleep.date === this.todaysDate);
    foundTodaySleepQuality ? sleepInfoQualityToday.innerText = `${foundTodaySleepQuality.quality}` : sleepInfoQualityToday.innerText = "0";
    document.querySelector('#sleep-info-hours-average-alltime').innerText = this.currentUser.hoursSleptAverage;
    document.querySelector('#sleep-info-quality-average-alltime').innerText = this.currentUser.sleepQualityAverage;
    // document.querySelector('#sleep-friend-longest-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getLongestSleepers(todaysDate, sleepRepository)).getFirstName();
    // document.querySelector('#sleep-friend-worst-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getWorstSleepers(todaysDate, sleepRepository)).getFirstName();
  },

}
export default domUpdates;