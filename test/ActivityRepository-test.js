import { expect } from 'chai'
import User from '../src/User';
import ActivityRepository from '../src/ActivityRepository';
import UserRepository from '../src/UserRepository';


describe('ActivityRepository', function() {
  let activity1, activity2, activity3, activity4, mockRawData, mockActivityRepo, todaysDate, user;
  beforeEach(() => {
    activity1 = {
      userID: 1,
      date: "07/20/2020",
      numSteps: 3577,
      minutesActive: 140,
      flightsOfStairs: 16,
    },
    activity2 = {
      userID: 1,
      date: "07/22/2020",
      numSteps: 14294,
      minutesActive: 138,
      flightsOfStairs: 10
    },
    activity3 =  {
      userID: 1,
      date: "07/24/2020",
      numSteps: 11022,
      minutesActive: 116,
      flightsOfStairs: 33
    },
    activity4 = {
      userID: 1,
      date: "07/27/2020",
      numSteps: 3486,
      minutesActive: 114,
      flightsOfStairs: 32
    },
    mockRawData = {userData: [ {id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [
        16,
        4,
        8
      ]}], 
    activityData: [activity1, activity2, activity3, activity4],
    sleepData: [{userID: "blah"}],
    hydrationData: [{userID: "blah"}], sleepData: [{userID: "blah"}], activityData: [activity1, activity2, activity3, activity4]},
    todaysDate = '07/27/2020',
    // mockUserRepo = new UserRepository(mockRawData, todaysDate);
    mockActivityRepo = new ActivityRepository(todaysDate),
    user = new User({
      id: 1,
      name: "Luisa Hane",
      address: "15195 Nakia Tunnel, Erdmanport VA 19901-1697",
      email: "Diana.Hayes1@hotmail.com",
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
      strideLength: 4.3,
      hydrationInfo: {
        individualEntryRecords: [
          {
            date: "2019/06/15",
            numOunces: 37,
            userID: 1,
          },
          {
            date: "2019/06/14",
            numOunces: 52,
            userID: 1,
          },
        ],
        averageOuncesAllTime: NaN,
      },
      sleepInfo: {
        individualEntryRecord: [
          {
            date: "2019/06/15",
            hoursSlept: 6.1,
            sleepQuality: 2.2,
            userID: 1,
          },
          {
            date: "2019/06/14",
            hoursSlept: 7,
            sleepQuality: 3.2,
            userID: 1,
          },
        ],
      },
      activityInfo: {
        individualEntryRecords: [
          {
            date: "2019/06/15",
            flightsOfStairs: 16,
            minutesActive: 140,
            numSteps: 3577,
            userID: 1,
          },
          {
            date: "2019/06/14",
            flightsOfStairs: 35,
            minutesActive: 120,
            numSteps: 10123,
            userID: 1,
          },
        ],
      },
    })
  });

  it('should be a function', function() {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should be an instance of Activity Repository', function() {
    expect(mockActivityRepo).to.be.an.instanceof(ActivityRepository);
  });

  it('should return an array of all individual activity entries', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.individualEntryRecords.length).to.deep.equal(4);
  });

  it('should return a date for each entry', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.individualEntryRecords[0].date).to.equal("07/20/2020");
  });

  it('should return a number of steps for each entry', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.individualEntryRecords[0].numSteps).to.equal(3577);
  });

  it('should return amount of minutes active for each entry', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.individualEntryRecords[0].minutesActive).to.equal(140);
  });

  it('should return number of flights of stairs for each entry', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.individualEntryRecords[0].flightsOfStairs).to.equal(16);
  });
  
  it('should have a method that calculate miles walked', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.getUsersMilesForDay(user, todaysDate)).to.equal(2.8)
  });
  
  it('should return false if goal isn\'t met', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.checkIfStepGoalAchieved(todaysDate, user)).to.equal(false);
  });

  it('should return true if goal is met', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.checkIfStepGoalAchieved('07/22/2020', user)).to.equal(true);
  });
 
  it('should add user input to records array, or update existing entry', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    let userInput = {userID: 1, date: "07/22/2020", flightsOfStairs: 10};
    mockActivityRepo.addStairsInput(userInput);
    expect(mockActivityRepo.individualEntryRecords[1].flightsOfStairs).to.equal(20);
  });

  it('should return number of stairs on a specific date', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.getStairsByDay(todaysDate)).to.equal(384);
  });

  it('should return entry for highest number of stairs climbed', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.getHighestStairsRecord()).to.equal(activity3);
  });

  it('should return number of flights climbed in a week', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.getWeeklyFlightsClimbed(todaysDate)).to.equal(32);
  });

  it('should return total number of stairs climbed in a week', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData.activityData);
    expect(mockActivityRepo.getWeeklyStairsClimbed(todaysDate)).to.equal(384);
  });

})