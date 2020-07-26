import { expect, should } from 'chai';
import User from '../src/User';
import UserRepository from '../src/UserRepository'; 
import HydrationRepository from '../src/HydrationRepository';
import SleepRepository from '../src/SleepRepository';
import ActivityRepository from '../src/ActivityRepository';

describe('User', function() {
  let user, user2, mockUserRepository, user3, friend1, friend2, friend3, todayDate;
  beforeEach(() => {
    user = new User({
      id: 1,
      name: 'Luisa Hane',
      address: '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      email: 'Diana.Hayes1@hotmail.com',
      strideLength: 4.3,
      dailyStepGoal: 10000,
      friends: [
        16,
        4,
        8
      ],
      hydrationInfo: new HydrationRepository(todayDate),
      sleepInfo: new SleepRepository(todayDate),
      activityInfo: new ActivityRepository(todayDate)
    });
    user2 = new User({});
    user3 = new User({
      id: 3,
      name: "Herminia Witting",
      address: "85823 Bosco Fork, East Oscarstad MI 85126-5660",
      email: "Elwin.Tromp@yahoo.com",
      strideLength: 4.4,
      dailyStepGoal: 5000,
      friends: [19, 11, 42, 33],
      hydrationInfo: new HydrationRepository(todayDate),
      sleepInfo: new SleepRepository(todayDate),
      activityInfo: new ActivityRepository(todayDate),
    }),
    friend1 = new User({
      id: 4,
      name: "Leigh",
      address: "1234 ABC",
      email: "leigh@gmail.com",
      strideLength: 4.7,
      dailyStepGoal: 10000,
      friends: [1, 2, 3],
      // hydrationInfo: new HydrationRepository(todayDate),
      // sleepInfo: new SleepRepository(todayDate),
      // activityInfo: {individualEntryRecords: {userID: 1, numSteps: } }
    }),
    friend2 = new User({
      id: 16,
      name: "Linus",
      address: "1234 ABC",
      email: "leigh@gmail.com",
      strideLength: 4.7,
      dailyStepGoal: 10000,
      friends: [1, 2, 3],
    }),
    friend3 = new User({
      id: 8,
      name: "Steph",
      address: "1234 ABC",
      email: "leigh@gmail.com",
      strideLength: 4.7,
      dailyStepGoal: 10000,
      friends: [1, 2, 3],
    }),
    mockUserRepository = new UserRepository({
      userData: [user, user2, user3, friend1, friend2, friend3],
      hydrationData: [{ userID: 1, date: "06/12/2020", numOunces: 15 }],
      sleepData: [{ userID: 1, date: "06/12/2020", hoursSlept: 15 }],
      activityData: [{ userID: 1, date: "06/12/2020", minutesActive: 15 }],
    });    
  });

  it('should be a function', function() {
    expect(User).to.be.a('function');
  });

  it('should be an instance of user', function() {
    expect(user).to.be.an.instanceof(User);
  });

  it('should have an id', function() {
    expect(user.id).to.equal(1);
  });

  it('if user id is not a number or undefined, set to Date.now()', function() {
    user2 = new User({id: 'five'});
    const user3 = new User({name: 'Jane Doe'});
    expect(user2.id).to.be.a('number');
    expect(user2.id).to.equal(Date.now());
    expect(user3.id).to.equal(Date.now());
    // Note: may fail by one millisecond if internet is lagging or Webpack is being used.
  });

  it('should have a name', function() {
    expect(user.name).to.equal('Luisa Hane');
  });

  it('if name is not a string or undefined, set name to guest', function() {
    const user3 = new User({id: 1, name: 123});
    expect(user2.name).to.equal('guest');
    expect(user3.name).to.equal('guest');
  }); 

  it('should have an address', function() {
    expect(user.address).to.equal('15195 Nakia Tunnel, Erdmanport VA 19901-1697');
  });

  it('if address is not given, have default message', function() {
    expect(user2.address).to.equal('No address added.');
  })

  it('should have an email address', function() {
    expect(user.email).to.equal('Diana.Hayes1@hotmail.com');
  });

  it('if email is not given, have default message', function() {
    expect(user2.email).to.equal('No email address added.');
  })

  it("should return the first name of the user", function () {
    expect(user.getFirstName()).to.equal("LUISA");
  });

  it('should return default first name if only given first name', function() {
    expect(user2.getFirstName()).to.equal("GUEST");
  });

  it('should have a stride length', function() {
    expect(user.strideLength).to.equal(4.3);
  });

  it('should have default message if stride length is not found', function() {
    expect(user2.strideLength).to.equal('Stride length not added.');
  });

  it('should have a daily step goal', function() {
    expect(user.dailyStepGoal).to.equal(10000);
  });

  it('should have default message if daily step goal not found', function() {
    expect(user2.dailyStepGoal).to.equal('Daily step goal not added.')
  });

  it('should have friends', function() {
    expect(user.friends).to.deep.equal([16, 4, 8]);
  });

  it('should have default message if no friends are added', function() {
    expect(user2.friends).to.deep.equal('Add friends for friendly competition!');
  });

  it('should compare users step goal with community step goal and return the difference', function() {
    mockUserRepository.calculateCommunityAvgStepGoal(); 
    expect(user.compareUserGoalWithCommunityGoal(mockUserRepository)).to.equal(-2500);
  })

});

