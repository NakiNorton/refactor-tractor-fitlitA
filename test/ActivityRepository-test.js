import { expect } from 'chai'
// import Activity from '../src/Activity';
// import UserRepository from '../src/UserRepository';
// import User from '../src/User';
import ActivityRepository from '../src/ActivityRepository';

describe('ActivityRepository', function() {
  let activity1, activity2, activity3, activity4, mockRawData, mockActivityRepo, todaysDate;
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
    activity2 =  {
      userID: 1,
      date: "07/22/2020",
      numSteps: 7402,
      minutesActive: 116,
      flightsOfStairs: 33
    },
    activity3 = {
      userID: 1,
      date: "07/23/2020",
      numSteps: 3486,
      minutesActive: 114,
      flightsOfStairs: 32
    };
    mockRawData = [activity1, activity2, activity3, activity4]
    todaysDate = '07/24/2020'
    mockActivityRepo = new ActivityRepository(todaysDate)
  });

  it.only('should be a function', function() {
    expect(ActivityRepository).to.be.a('function');
  });

  it('should be an instance of activity', function() {
    expect(activity1).to.be.an.instanceof(Activity);
  });

  it('should hold a userId', function() {
    expect(activity2.userId).to.equal(2);
  });

  it('should hold a date', function() {
    expect(activity1.date).to.equal("2019/06/15");
  });

  it('should hold number of steps', function() {
    expect(activity1.steps).to.equal(3684);
  });

  it('should hold minutes active', function() {
    expect(activity2.minutesActive).to.equal(280);
  });

  it('should hold flights of stairs', function() {
    expect(activity2.flightsOfStairs).to.equal(22);
  });

  it('should have a default value of 0 for miles walked', function() {
    expect(activity2.milesWalked).to.equal(0);
  });

  it('should have a default value of null for reached step goal', function() {
    expect(activity2.reachedStepGoal).to.equal(null);
  });

  it('doActivity should add activities to user record', function() {
    expect(user1.activityRecord.length).to.equal(1);
  });

  it('should have a method that calculate miles walked', function() {
    expect(activity1.calculateMiles(mockRepository)).to.equal('3.0');
  });

  describe('compareStepGoal', function() {
    it('should return false if goal isn\'t met', function() {
      activity1.compareStepGoal(mockRepository);
      expect(activity1.reachedStepGoal).to.equal(false);
    });

    it('should return true if goal is met', function() {
      activity2.compareStepGoal(mockRepository);
      expect(activity2.reachedStepGoal).to.equal(true);
    });
  });
})