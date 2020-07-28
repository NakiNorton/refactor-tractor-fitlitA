const domUpdates = {
  currentUser: null,
  todaysDate: null,
  userRepository: null,
  
  defineData(user, todaysDate, userRepository) {
    this.currentUser = user;
    this.todaysDate = todaysDate;
    this.userRepository = userRepository;
  },

  displayPage() {
    this.displayName();
    this.stepCardDisplay();
    this.sleepCardDisplay();
    this.hydrationCardDisplay();
    this.stairsCardDisplay();
  },
  
  displayName() {
    document.querySelector('#header-name').innerText = `${this.currentUser.getFirstName()}'S FITLIT`;
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
    this.showLeaderBoard();
  },

  showLeaderBoard() {
    let dropdownFriendsStepsContainer = document.querySelector('#dropdown-friends-steps-container');
    document.querySelectorAll('.friends-steps');
    let friendsWeeklySteps = this.currentUser.findFriends(this.userRepository);
    dropdownFriendsStepsContainer.innerText = '';
    friendsWeeklySteps.forEach(friend => {
      dropdownFriendsStepsContainer.innerHTML += `
          <p class='dropdown-p friends-steps'>${friend.firstName} |  ${friend.weeklySteps}</p>`;
    });
  },

  ///////////// STEPS DISPLAY SECTION /////////////////////////////////

  stepCardDisplay() {
    this.stepMainCardDisplay();
    this.stepsInfoCard();
    this.stepCalendarCardDisplay();
    this.stepFriendCardDisplay(); 
    this.displayUsersStepGoalComparison();
  },

  stepMainCardDisplay() {
    document.getElementById('steps-user-steps-today').innerText = `${this.currentUser.activityInfo.getStepsForToday(this.todaysDate)}`;
  },

  stepsInfoCard() {
    document.querySelector('#input-steps-minutes').value = '';
    document.querySelector('#input-steps').value = '';
    document.getElementById('steps-info-miles-walked-today').innerText = 
    `${this.currentUser.activityInfo.getUsersMilesForDay(this.currentUser, this.todaysDate)}`;
    document.getElementById('steps-info-active-minutes-today').innerText = `${this.currentUser.activityInfo.getActiveMinutesForToday(this.todaysDate)}`;
  },
  
  stepCalendarCardDisplay() {
    document.querySelector('#steps-calendar-total-active-minutes-weekly').innerText = this.currentUser.activityInfo.getAverageMinutesActiveThisWeek(this.todaysDate);
    document.querySelector('#steps-calendar-total-steps-weekly').innerText = this.currentUser.activityInfo.getAverageStepsThisWeek(this.todaysDate);
  },

  stepFriendCardDisplay() {
    document.getElementById('steps-friend-steps-average-today').innerText = this.userRepository.getAllUsersAverageSteps(this.todaysDate);
    document.getElementById('steps-friend-active-minutes-average-today').innerText = this.userRepository.getAllUsersAverageMinutesActive(this.todaysDate);
    document.getElementById('steps-friend-average-step-goal').innerText = this.userRepository.getCommunityAvgStepGoal();
  },

  displayUsersStepGoalComparison() {
    document.getElementById('steps-goal-comparison').innerText = this.currentUser.activityInfo.compareUserGoalWithCommunityGoal(this.currentUser.dailyStepGoal, this.userRepository);
  },

  ///////////// STEPS DISPLAY SECTION /////////////////////////////////

  stairsCardDisplay() {
    document.querySelector('#stairs-user-stairs-today').innerText = this.currentUser.activityInfo.getStairsByDay(this.todaysDate);
    document.querySelector('#stairs-calendar-flights-average-weekly').innerText = this.currentUser.activityInfo.getWeeklyFlightsClimbed();
    document.querySelector('#stairs-calendar-stairs-average-weekly').innerText = this.currentUser.activityInfo.getWeeklyStairsClimbed();
    document.querySelector('#stairs-friend-flights-average-today').innerText = this.userRepository.getCommunityAvgFlightsOverall(this.todaysDate);
    document.querySelector('#input-stairs').value = '';
  },

  //////////// HYDRATION DISPLAY SECTION /////////////////////////////////

  hydrationCardDisplay() {
    document.getElementById('hydration-user-ounces-today').innerText = `${this.currentUser.hydrationInfo.getOuncesByDay(this.todaysDate)}`;
    document.querySelector('.hydration-weekly-avg').innerText = `You averaged ${this.currentUser.hydrationInfo.getWeeklyAvgOunces(this.todaysDate)} ounces this week!`;
    let dailyOz = document.querySelectorAll('.daily-oz');
    let allDaysOuncesOverWeek = this.currentUser.hydrationInfo.getWeeksDailyOunces().sort((a, b) => a - b);
    dailyOz.forEach((dailyOunces, i) => dailyOunces.innerText = allDaysOuncesOverWeek[i]);
    document.querySelector('#hydration-friend-ounces-today').innerText = `${this.userRepository.getCommunityAvgOuncesOverall()}`;
    document.querySelector('#input-ounces').value = ''; 
  },

  //////// SLEEP DISPLAY SECTION //////////////////////////////////////

  sleepCardDisplay() {
    document.querySelector('#sleep-user-hours-today').innerText = `${this.currentUser.sleepInfo.findLastNightsHours(this.todaysDate)}`;
    this.displaySleepCalendar();
    this.displaySleepStats();
  },

  displaySleepCalendar() {
    document.querySelector('#sleep-calendar-hours-average-weekly').innerText = `${this.currentUser.sleepInfo.getWeekAvgHoursSlept(this.todaysDate)}`;
    document.querySelector('#sleep-calendar-quality-average-weekly').innerText = `${this.currentUser.sleepInfo.getWeekAvgQualitySlept()}`;
  },
  
  displaySleepStats() {
    document.getElementById('sleep-info-quality-today').innerText = '';
    document.querySelector('#sleep-info-quality-today').innerText = `${this.currentUser.sleepInfo.findLastNightsSleepQual(this.todaysDate)}`;
    document.getElementById('sleep-info-hours-average-alltime').innerText =  `${this.currentUser.sleepInfo.getAvgHoursSleptOverall()}`;
    document.getElementById('sleep-info-quality-average-alltime').innerText = `${this.currentUser.sleepInfo.getAvgQualitySleptOverall()}`;
  }
}

export default domUpdates;
