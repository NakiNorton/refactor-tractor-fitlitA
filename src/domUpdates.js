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
    this.stairsCardDisplay();
    // this.stepCardDisplay();
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
    this.showLeaderBoard(); // CSS is finnicky on it
  },

  showLeaderBoard() {
    let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
    let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
    let friendsWeeklySteps = this.currentUser.findFriends(this.userRepository);
    friendsWeeklySteps.forEach(friend => {
      dropdownFriendsStepsContainer.innerHTML += `
          <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.weeklySteps}</p>`;
    });
    friendsStepsParagraphs.forEach(paragraph => {
      if (friendsStepsParagraphs[0] === paragraph) {
        paragraph.classList.add('green-text');
      }
      if (friendsStepsParagraphs[friendsStepsParagraphs.length - 1] === paragraph) {
        paragraph.classList.add('red-text');
      }
      if (paragraph.innerText.includes('YOU')) {
        paragraph.classList.add('yellow-text');
      }
    });
  },


  ///////////// STEPS DISPLAY SECTION /////////////////////////////////

  stepCardDisplay() {
    this.stepMainCardDisplay();
    this.stepsInfoCard();
    this.stepCalendarCardMinutesDisplay();
    this.stepCalendarCardStepsDisplay();
    this.stepFriendCardDisplay();
    // this.stepTrendingCardDisplay();
  },

  stepMainCardDisplay() {
    document.getElementById("steps-user-steps-today").innerText = `${this.currentUser.activityInfo.getStepsForToday("2019/10/16")}`;
  },

  stepsInfoCard(date = "2019/10/16") { // default date if nothing is entered  
    this.stepInfoCardMilesDisplay(date) 
    this.stepInfoCardMinutesDisplay(date)
  },

  stepInfoCardMilesDisplay(date) {
    document.getElementById('steps-info-miles-walked-today').innerText = `${this.currentUser.activityInfo.calculateMiles(this.currentUser, date)}`;
  },

  stepInfoCardMinutesDisplay(date) {
    document.getElementById('steps-info-active-minutes-today').innerText = `${this.currentUser.activityInfo.getActiveMinutesForToday(date)}`;
  },
  
  stepCalendarCardMinutesDisplay() {
    document.querySelector('#steps-calendar-total-active-minutes-weekly').innerText = this.currentUser.activityInfo.calculateAverageMinutesActiveThisWeek(this.todaysDate);
  },

  stepCalendarCardStepsDisplay() {
    document.querySelector('#steps-calendar-total-steps-weekly').innerText = this.currentUser.activityInfo.calculateAverageStepsThisWeek(this.todaysDate)
  },
  
  stepFriendCardDisplay() {
    document.getElementById('steps-friend-steps-average-today').innerText = this.userRepository.calculateAllUsersAverageSteps("2019/10/16");

    document.getElementById('steps-friend-active-minutes-average-today').innerText = this.userRepository.calculateAllUsersAverageMinutesActive("2019/10/16");

    // document.querySelector('#steps-friend-average-step-goal').innerText = this.userRepository.calculateCommunityAvgStepGoal();
    // document.querySelector('#steps-friend-active-minutes-average-today').innerText = this.userRepository.calculateAverageSteps(this.todaysDate);
  },

  // stepTrendingCardDisplay() {
  //   let trendingStepsPhraseContainer = document.querySelector('.trending-steps-phrase-container');
  // currentUser.findTrendingStepDays();
  // trendingStepsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStepDays[0]}</p>`;
  // }


  ///////////// STEPS DISPLAY SECTION /////////////////////////////////

  stairsCardDisplay() {
    document.querySelector("#stairs-user-stairs-today").innerText = this.currentUser.activityInfo.getStairsByDay(this.todaysDate);
    document.querySelector("#stairs-calendar-flights-average-weekly").innerText = this.currentUser.activityInfo.getWeeklyStairsClimbed();
    document.querySelector("#stairs-calendar-stairs-average-weekly").innerText = this.currentUser.activityInfo.getWeeklyFlightsClimbed();
    document.querySelector("#stairs-friend-flights-average-today").innerText = this.userRepository.getCommunityAvgFlightsOverall(this.todaysDate);
    document.querySelector("#input-stairs").value = "";
  },
 
  // stairsTrendingCardDisplay() {
  // // currentUser.findTrendingStairsDays();
  // // let trendingStairsPhraseContainer = document.querySelector('.trending-stairs-phrase-container');
  // // trendingStairsPhraseContainer.innerHTML = `<p class='trend-line'>${currentUser.trendingStairsDays[0]}</p>`;
  // },


  //////////// HYDRATION DISPLAY SECTION /////////////////////////////////


  hydrationCardDisplay() {
    document.getElementById("hydration-user-ounces-today").innerText = `${this.currentUser.hydrationInfo.getOuncesByDay(this.todaysDate)}`;
    document.querySelector(".hydration-weekly-avg").innerText = `You averaged ${this.currentUser.hydrationInfo.getWeeklyAvgOunces(this.todaysDate)} ounces this week!`;
    let dailyOz = document.querySelectorAll('.daily-oz');
    let allDaysOuncesOverWeek = this.currentUser.hydrationInfo.getWeeksDailyOunces().sort((a, b) => a - b);
    dailyOz.forEach((dailyOunces, i) => dailyOunces.innerText = allDaysOuncesOverWeek[i]);
    document.querySelector("#hydration-friend-ounces-today").innerText = `${this.userRepository.getCommunityAvgOuncesOverall()}`;
    document.querySelector("#input-ounces").value = ''; 
  },
  

  //////// SLEEP DISPLAY SECTION //////////////////////////////////////

  sleepCardDisplay() {
    let sleepUserHoursToday = document.querySelector('#sleep-user-hours-today');
    let foundTodaySleepAmount = this.currentUser.sleepHoursRecord.find(sleep => sleep.date === this.todaysDate);
    foundTodaySleepAmount ? sleepUserHoursToday.innerText = `${foundTodaySleepAmount.hours}` : sleepUserHoursToday.innerText = "0";
    document.querySelector('#sleep-calendar-hours-average-weekly').innerText = this.currentUser.calculateAverageHoursThisWeek(this.todaysDate);
    document.querySelector('#sleep-calendar-quality-average-weekly').innerText = this.currentUser.calculateAverageQualityThisWeek(this.todaysDate);
    this.sleepInfoCardDisplay();

    // input1.innerText = "";
    // input2.innerText - "";
  },

  sleepStatsCardDisplay() {// this displays all of the information for sleep stats
    let sleepInfoQualityToday = document.querySelector('#sleep-info-quality-today');
    let foundTodaySleepQuality = 
    
    this.currentUser.sleepQualityRecord.find(sleep => sleep.date === this.todaysDate);
    foundTodaySleepQuality ? sleepInfoQualityToday.innerText = `${foundTodaySleepQuality.quality}` : sleepInfoQualityToday.innerText = "0";
    console.log('this is current User', this.currentUser)
    // document.querySelector('#sleep-info-hours-average-alltime').innerText = this.currentUser.hoursSleptAverage;
    // document.querySelector('#sleep-info-quality-average-alltime').innerText = this.currentUser.sleepQualityAverage;
    // document.querySelector('#sleep-friend-longest-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getLongestSleepers(todaysDate, sleepRepository)).getFirstName();
    // document.querySelector('#sleep-friend-worst-sleeper').innerText = userRepository.users.find(user => currentUser.id === userRepository.getWorstSleepers(todaysDate, sleepRepository)).getFirstName();
  },

  sleepAddInputDisplay() {
    document.getElementById("sleep-user-ounces-today").innerText = '';
    document.getElementById("sleep-user-ounces-today").innerText = `${this.currentUser.sleepInfo.findTodaysTotalSleep(this.todaysDate)}`;
  },

}
export default domUpdates;
