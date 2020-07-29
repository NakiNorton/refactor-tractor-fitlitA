import { expect } from 'chai';

import UserRepository from '../src/UserRepository';
import HydrationRepository from '../src/HydrationRepository';
import SleepRepository from '../src/SleepRepository';
import ActivityRepository from '../src/ActivityRepository';


describe('UserRepository', function() {
  let userData;
  let hydrationData;
  let sleepData;
  let activityData;
  let rawData;
  let todayDate;
  let userRepository;
  beforeEach(() => {
    userData = [
      {
        id: 1,
        name: 'Luisa Hane',
        address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
        email: 'Diana.Hayes1@hotmail.com',
        strideLength: 4.3,
        dailyStepGoal: 10000,
        friends: [16, 4, 8],
        hydrationInfo: new HydrationRepository(todayDate),
        sleepInfo: new SleepRepository(todayDate),
        activityInfo: new ActivityRepository(todayDate),
      },
      {
        id: 2,
        name: 'Jarvis Considine',
        address: '30086 Kathryn Port, Ciceroland NE 07273',
        email: 'Dimitri.Bechtelar11@gmail.com',
        strideLength: 4.5,
        dailyStepGoal: 5000,
        friends: [9, 18, 24, 19],
        hydrationInfo: new HydrationRepository(todayDate),
        sleepInfo: new SleepRepository(todayDate),
        activityInfo: new ActivityRepository(todayDate),
      },
      {
        id: 3,
        name: 'Herminia Witting',
        address: '85823 Bosco Fork, East Oscarstad MI 85126-5660',
        email: 'Elwin.Tromp@yahoo.com',
        strideLength: 4.4,
        dailyStepGoal: 15000,
        friends: [19, 11, 42, 33],
        hydrationInfo: new HydrationRepository(todayDate),
        sleepInfo: new SleepRepository(todayDate),
        activityInfo: new ActivityRepository(todayDate),
      },
    ];
    hydrationData = [
      {
        userID: 1,
        date: '2019/06/15',
        numOunces: 37,
      },
      {
        userID: 2,
        date: '2019/06/15',
        numOunces: 75,
      },
      {
        userID: 3,
        date: '2019/06/15',
        numOunces: 47,
      },
      {
        userID: 1,
        date: '2019/06/14',
        numOunces: 52
      }
    ]
    sleepData = [ 
      {
        'userID': 1,
        'date': '2019/06/15',
        'hoursSlept': 6.1,
        'sleepQuality': 2.2
      },
      {
        'userID': 2,
        'date': '2019/06/15',
        'hoursSlept': 7,
        'sleepQuality': 4.7
      },
      {
        'userID': 3,
        'date': '2019/06/15',
        'hoursSlept': 10.8,
        'sleepQuality': 4.7
      },
      { 
        'userID': 1,
        'date': '2019/06/14',
        'hoursSlept': 7,
        'sleepQuality': 3.2
      }
    ]
    activityData = [
      {
        userID: 1,
        date: '2019/06/15',
        numSteps: 3577,
        minutesActive: 140,
        flightsOfStairs: 16,
      },
      {
        userID: 2,
        date: '2019/06/15',
        numSteps: 4294,
        minutesActive: 138,
        flightsOfStairs: 10,
      },
      {
        userID: 3,
        date: '2019/06/15',
        numSteps: 7402,
        minutesActive: 116,
        flightsOfStairs: 33,
      },
      {
        userID: 1,
        date: '2019/06/14',
        numSteps: 10123,
        minutesActive: 120,
        flightsOfStairs: 35,
      }
    ];
    rawData = {userData, hydrationData, sleepData, activityData}
    todayDate = '2019/24/07'
    userRepository = new UserRepository(rawData, todayDate)
  });

  it('should be a function', function() {
    expect(UserRepository).to.be.a('function');
  });

  it('should be an instance of user repository', function() {
    expect(userRepository).to.be.an.instanceof(UserRepository);
  });

  it('should hold an array of instantiated users', function() {
    expect(userRepository.users[0]).to.deep.equal({
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      email: 'Diana.Hayes1@hotmail.com',
      dailyStepGoal: 10000,
      friends: [16, 4, 8],
      strideLength: 4.3,
      hydrationInfo: { 
        'individualEntryRecords': [
          {
            'date': '2019/06/15',
            'numOunces': 37,
            'userID': 1
          },
          {
            'date': '2019/06/14',
            'numOunces': 52,
            'userID': 1
          } 
        ]},
      sleepInfo: {
        'individualEntryRecords': [
          {
            'date': '2019/06/15',
            'hoursSlept': 6.1,
            'sleepQuality': 2.2,
            'userID': 1
          },
          {
            'date': '2019/06/14',
            'hoursSlept': 7,
            'sleepQuality': 3.2,
            'userID': 1
          }
        ]
      },
      activityInfo: {
        'individualEntryRecords': [
          {
            'date': '2019/06/15',
            'flightsOfStairs': 16,
            'minutesActive': 140,
            'numSteps': 3577,
            'userID': 1
          },
          {
            'date': '2019/06/14',
            'flightsOfStairs': 35,
            'minutesActive': 120,
            'numSteps': 10123,
            'userID': 1
          }
        ]
      }}
    );
    expect(userRepository.users.length).to.equal(3);
  });

  it('should match each hydration data point with appropriate user', function() {
    userRepository.matchDataWithUsers(rawData, todayDate);

    expect(userRepository.users[0].hydrationInfo.individualEntryRecords.length).to.deep.equal(2);
    expect(userRepository.users[1].hydrationInfo.individualEntryRecords.length).to.deep.equal(1);
  }); 

  it('should match each sleep data point with appropriate user', function() {
    userRepository.matchDataWithUsers(rawData, todayDate);

    expect(userRepository.users[0].sleepInfo.individualEntryRecords.length).to.deep.equal(2);
    expect(userRepository.users[1].sleepInfo.individualEntryRecords.length).to.deep.equal(1);
  })

  it('should match each activity data point with appropriate user', function() {
    userRepository.matchDataWithUsers(rawData, todayDate);

    expect(userRepository.users[0].activityInfo.individualEntryRecords.length).to.deep.equal(2);
    expect(userRepository.users[1].activityInfo.individualEntryRecords.length).to.deep.equal(1);
  })

  it('should return average step goal for all users', function () {
    expect(userRepository.getCommunityAvgStepGoal()).to.equal(10000);
  });


  it('should have a method that calculates average number of steps for users', function () {
    expect(userRepository.getCommunityAverageSteps('2019/06/15')).to.equal(5091);
  })

  it('should have a method that calculates average number of flights for users', function () {
    expect(userRepository.getCommunityAvgFlightsOverall()).to.equal(23);
  })

  it('should have a method that calculates average number of active minutes for users', function () {
    expect(userRepository.getCommunityAverageMinutesActive('2019/06/15')).to.equal(131);
  })

  it('should have a method that finds the best sleeper', function() {
    expect(userRepository.findBestSleeper('2019/06/15')).to.equal('Herminia Witting');
  });

  it('should have a method that finds the worst sleeper', function() {
    expect(userRepository.findWorstSleeper('2019/06/15')).to.equal('Luisa Hane');
  });
});
