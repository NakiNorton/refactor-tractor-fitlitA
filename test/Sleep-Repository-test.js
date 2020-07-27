import {expect} from "chai";
import SleepRepository from "../src/SleepRepository";
import Sleep from "../src/Sleep";
import UserRepository from '../src/UserRepository';

describe('SleepRepository', function() {
  let sleep1, sleep2, sleep3, mockRawData, mockSleepRepo, todaysDate;
  beforeEach(() => {
    sleep1 = {
      "userID": 1,
      "date": "2019/06/15",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    }
    sleep2 = {
      "userID": 2,
      "date": "2019/06/15",
      "hoursSlept": 7,
      "sleepQuality": 4.7
    }
    sleep3 = {
      "userID": 3,
      "date": "2019/06/15",
      "hoursSlept": 10.8,
      "sleepQuality": 4.7
    }
    todaysDate = "07/21/2020"
    mockRawData = [sleep1, sleep2, sleep3];
    mockSleepRepo = new SleepRepository(todaysDate);
    mockSleepRepo.individualEntryRecords = mockRawData

  });

  it('should be a function', function() {
    expect(SleepRepository).to.be.a("function")
  })
  
})


// describe.only("SleepRepository", function () {
//   let sleep1, sleep2, sleep3, mockRawData, mockSleepRepo, todaysDate;
//   beforeEach(() => {
//     sleep1 =  {
//       "userID": 1,
//       "date": "2019/06/15",
//       "hoursSlept": 6.1,
//       "sleepQuality": 2.2
//     }
//     sleep2 = {
//       "userID": 2,
//       "date": "2019/06/15",
//       "hoursSlept": 7,
//       "sleepQuality": 4.7
//     }
//     sleep3 = {
//       "userID": 3,
//       "date": "2019/06/15",
//       "hoursSlept": 10.8,
//       "sleepQuality": 4.7
//     }
//     todaysDate = "07/21/2020"
//     mockRawData = [sleep1, sleep2, sleep3];
//     mockSleepRepo = new SleepRepository(todaysDate);
//     mockSleepRepo.individualEntryRecords = mockRawData
//     console.log(mockSleepRepo)
//   });

//   it("should be a function", function () {
//     expect(SleepRepository).to.be.a("function");
//   });

//   it("should be an instance of sleep repository", function () {
//     expect(mockSleepRepo).to.be.an.instanceof(SleepRepository);
//   });

//   it("should be an instance of user repository", function () {
//     expect(mockHydroRepo).to.be.an.instanceof(HydrationRepository);
//   });

//   it('should hold all individual entries in an array', function () {
//     mockHydroRepo.individualEntryRecords.push(...mockRawData);
//     expect(mockHydroRepo.individualEntryRecords.length).to.deep.equal(7);
//   });

//   it('should return overall average ounces', function () {
//     mockHydroRepo.individualEntryRecords.push(...mockRawData);
//     expect(mockHydroRepo.getAverageOuncesOverall()).to.equal(26);
//   })

//   it('should return a sum of all ounces of water drank today', function () {
//     mockHydroRepo.individualEntryRecords.push(...mockRawData);
//     expect(mockHydroRepo.getOuncesByDay(todaysDate)).to.equal(40);
//   });

//   it('should return an array of ounces drank on each day', function () {
//     mockHydroRepo.individualEntryRecords.push(...mockRawData);
//     expect(mockHydroRepo.getWeeksDailyOunces()).to.deep.equal([40, 30, 20, 20, 30, 20]);
//   });

//   it("should get the week's average of ounces", function () {
//     mockHydroRepo.individualEntryRecords.push(...mockRawData);
//     expect(mockHydroRepo.getWeeklyAvgOunces()).to.equal(23);
//   });

//   it('should add user input to records array, or update an existing record', function () {
//     mockHydroRepo.individualEntryRecords.push(...mockRawData);
//     const userInput = { userId: 1, date: todaysDate, numOunces: 22 };
//     mockHydroRepo.addHydroInput(userInput);
//     expect(mockHydroRepo.individualEntryRecords[0].numOunces).to.equal(62);
//   });


//   // it('should')

//   // it("should hold an array of instantiated users", function () {
//   //   expect(mockSleepRepo.sleepData[0]).to.deep.equal({
//   //     userID: 1,
//   //     date: "2019/06/15",
//   //     hoursSlept: 6.1,
//   //     sleepQuality: 2.2,
//   //   });
//   //   expect(mockSleepRepo.sleepData.length).to.deep.equal(3);
//   // });
// });
