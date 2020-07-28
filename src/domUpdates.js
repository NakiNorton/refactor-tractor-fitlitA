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
    console.log(this.currentUser)
    this.displayName()
    this.stepCardDisplay();
    this.sleepCardDisplay();
    this.hydrationCardDisplay();
    this.stairsCardDisplay();
  },
  
  displayName() {
    document.querySelector('#header-name').innerText = `${this.currentUser.getFirstName()}'S `;
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
    let friendsStepsParagraphs = document.querySelectorAll('.friends-steps');
    let friendsWeeklySteps = this.currentUser.findFriends(this.userRepository);
    dropdownFriendsStepsContainer.innerText = '';
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
    });
  },


  ///////////// STEPS DISPLAY SECTION /////////////////////////////////

  stepCardDisplay() {
    this.stepMainCardDisplay();
    this.stepsInfoCard(this.todaysDate);
    this.stepCalendarCardMinutesDisplay();
    this.stepCalendarCardStepsDisplay();
    this.stepFriendstepsCardDisplay();
    this.stepFriendCardActiveMinsDisplay();
    this.stepFriendCardAveStepGoalDisplay();
    this.displayUsersStepGoalComparison()
  },

  resetInputField(field1, field2) {
    document.querySelector(`${field1}`).value = "";
    document.querySelector(`${field2}`).value = "";
  },

  stepMainCardDisplay() {
    document.getElementById("steps-user-steps-today").innerText = `${this.currentUser.activityInfo.getStepsForToday(this.todaysDate)}`;
  },

  stepsInfoCard(date) {
    this.stepInfoCardMilesDisplay(date) 
    this.stepInfoCardMinutesDisplay(date)
  },

  stepInfoCardMilesDisplay(date) {
    document.getElementById('steps-info-miles-walked-today').innerText = 
    `${this.currentUser.activityInfo.getUsersMilesForDay(this.currentUser, date)}`;
  },

  stepInfoCardMinutesDisplay(date) {
    document.getElementById('steps-info-active-minutes-today').innerText = `${this.currentUser.activityInfo.getActiveMinutesForToday(date)}`;
  },
  
  stepCalendarCardMinutesDisplay() {
    document.querySelector('#steps-calendar-total-active-minutes-weekly').innerText = this.currentUser.activityInfo.getAverageMinutesActiveThisWeek(this.todaysDate);
  },

  stepCalendarCardStepsDisplay() {
    document.querySelector('#steps-calendar-total-steps-weekly').innerText = this.currentUser.activityInfo.getAverageStepsThisWeek(this.todaysDate)
  },
  // change from friends to users?
  stepFriendstepsCardDisplay() {
    document.getElementById('steps-friend-steps-average-today').innerText = this.userRepository.getAllUsersAverageSteps(this.todaysDate);
  },

  stepFriendCardActiveMinsDisplay() {
    document.getElementById('steps-friend-active-minutes-average-today').innerText = this.userRepository.getAllUsersAverageMinutesActive(this.todaysDate);
  },

  stepFriendCardAveStepGoalDisplay() {
    document.getElementById('steps-friend-average-step-goal').innerText = this.userRepository.getCommunityAvgStepGoal();
  },

  displayUsersStepGoalComparison() {
    document.getElementById('steps-goal-comparison').innerText = this.currentUser.activityInfo.compareUserGoalWithCommunityGoal(this.currentUser.dailyStepGoal, this.userRepository)

  },

  ///////////// STEPS DISPLAY SECTION /////////////////////////////////

  stairsCardDisplay() {
    document.querySelector("#stairs-user-stairs-today").innerText = this.currentUser.activityInfo.getStairsByDay(this.todaysDate);
    document.querySelector("#stairs-calendar-flights-average-weekly").innerText = this.currentUser.activityInfo.getWeeklyFlightsClimbed();
    document.querySelector("#stairs-calendar-stairs-average-weekly").innerText = this.currentUser.activityInfo.getWeeklyStairsClimbed();
    document.querySelector("#stairs-friend-flights-average-today").innerText = this.userRepository.getCommunityAvgFlightsOverall(this.todaysDate);
    document.querySelector("#input-stairs").value = "";
  },

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
    document.querySelector('#sleep-user-hours-today').innerText = `${this.currentUser.sleepInfo.findLastNightsHours()}`;
    this.displaySleepCalendar()
    this.displaySleepStats();
  
  },

  displaySleepCalendar() {
    document.querySelector('#sleep-calendar-hours-average-weekly').innerText = `${this.currentUser.sleepInfo.getWeekAvgHoursSlept(this.todaysDate)}`;
    document.querySelector('#sleep-calendar-quality-average-weekly').innerText = `${this.currentUser.sleepInfo.getWeekAvgQualitySlept()}`
  },
  
  displaySleepStats() {
    document.querySelector('#sleep-info-quality-today').innerText = `${this.currentUser.sleepInfo.findLastNightsSleepQual(this.todaysDate)}`
    document.getElementById('sleep-info-hours-average-alltime').innerText =  `${this.currentUser.sleepInfo.getAvgHoursSleptOverall()}`
    document.getElementById('sleep-info-quality-average-alltime').innerText = `${this.currentUser.sleepInfo.getAvgQualitySleptOverall()}`
    document.querySelector('#sleep-friend-longest-sleeper').innerText = this.userRepository.findBestSleeper();
    document.querySelector('#sleep-friend-worst-sleeper').innerText = this.userRepository.findWorstSleeper();    
  },

  sleepAddInputDisplay() {
    document.getElementById("sleep-info-quality-today").innerText = '';
    document.getElementById("sleep-info-quality-today").innerText = `${this.currentUser.sleepInfo.findLastNightsSleepQual(this.todaysDate)}`;
    document.getElementById("sleep-info-quality-today").innerText = '';
    document.getElementById("sleep-info-quality-today").innerText = `${this.currentUser.sleepInfo.findLastNightsSleepQual(this.todaysDate)}`;
  },

}
export default domUpdates;
