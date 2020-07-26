import { expect } from 'chai'
// import UserRepository from '../src/UserRepository';
import User from '../src/User';
import ActivityRepository from '../src/ActivityRepository';
import SleepRepository from "../src/UserRepository";
import HydrationRepository from "../src/UserRepository";


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
      date: "07/21/2020",
      numSteps: 4294,
      minutesActive: 138,
      flightsOfStairs: 10
    },
    activity3 =  {
      userID: 1,
      date: "07/22/2020",
      numSteps: 7402,
      minutesActive: 116,
      flightsOfStairs: 33
    },
    activity4 = {
      userID: 1,
      date: "07/23/2020",
      numSteps: 3486,
      minutesActive: 114,
      flightsOfStairs: 32
    };
    mockRawData = [activity1, activity2, activity3, activity4]
    todaysDate = '07/24/2020'
    mockActivityRepo = new ActivityRepository(todaysDate)
    user = new User({
      'id': 1,
      'name': 'Luisa Hane',
      'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      'email': 'Diana.Hayes1@hotmail.com',
      'strideLength': 4.3,
      'dailyStepGoal': 10000,
      'friends': [
        16,
        4,
        8
      ],
      "hydrationInfo": new HydrationRepository(todaysDate),
      "sleepInfo": new SleepRepository(todaysDate),
      "activityInfo": new ActivityRepository(todaysDate)
    });
  });

  it('should be a function', function() {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(mockActivityRepo).to.be.an.instanceof(ActivityRepository);
  });

  it('should hold all individual entries in an array', function() {
    mockActivityRepo.individualEntryRecords.push(...mockRawData);
    expect(mockActivityRepo.individualEntryRecords.length).to.deep.equal(4);
  });

  it('should hold a date', function() {
    expect(mockActivityRepo[0].date).to.equal("07/20/2020");
  });

  it('should hold number of steps', function() {
    expect(mockActivityRepo[0].numSteps).to.equal(3577);
  });

  it('should hold minutes active', function() {
    expect(mockActivityRepo[0].minutesActive).to.equal(140);
  });

  it('should hold flights of stairs', function() {
    expect(mockActivityRepo[1].flightsOfStairs).to.equal(10);
  });

  it('should have a default value of 0 for miles walked', function() {
    expect(mockActivityRepo[1].milesWalked).to.equal(0);
  });

  it('should have a default value of null for reached step goal', function() {
    expect(mockActivityRepo[1].reachedStepGoal).to.equal(null);
  });

  it('should have a method that calculate miles walked', function() {
    expect(activity1.calculateMiles(mockActivityRepo)).to.equal('3.0');
  });

  describe('compareStepGoal', function() {
    it('should return false if goal isn\'t met', function() {
      activity1.compareStepGoal(mockActivityRepo);
      expect(activity1.reachedStepGoal).to.equal(false);
    });

    it('should return true if goal is met', function() {
      activity2.compareStepGoal(mockActivityRepo);
      expect(activity2.reachedStepGoal).to.equal(true);
    });
  });
})