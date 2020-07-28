import {expect} from "chai";
import SleepRepository from "../src/SleepRepository";
import UserRepository from '../src/UserRepository';

describe("SleepRepository", function () {
  let sleep1, sleep2, sleep3, mockRawData, mockSleepRepo, todaysDate;
  beforeEach(() => {
    sleep1 =  {
      "userID": 1,
      "date": "2019/06/17",
      "hoursSlept": 6.1,
      "sleepQuality": 2.2
    }
    sleep2 = {
      "userID": 2,
      "date": "2019/06/16",
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

  it("should be an instance of sleep repository", function () {
    expect(mockSleepRepo).to.be.an.instanceof(SleepRepository);
  });

  it("should be an instance of user repository", function () {
    expect(mockSleepRepo).to.be.an.instanceof(SleepRepository);
  });

  it('should hold all individual entries in an array', function () {
    expect(mockSleepRepo.individualEntryRecords.length).to.deep.equal(3);
  });

  it('should return most recent sleep quality', function () {
    expect(mockSleepRepo.findLastNightsSleepQual()).to.equal(2.2);
  });
 
  it('should return most recent hours slept', function () {
    expect(mockSleepRepo.findLastNightsHours()).to.equal(6.1);
  });

  it('should return overall average hours of sleep', function () {
    expect(mockSleepRepo.getAvgHoursSleptOverall()).to.equal(8);
  });

  it('should return overall average quality of sleep', function () {
    expect(mockSleepRepo.getAvgQualitySleptOverall()).to.equal(3.9);
  });

  it('should return an array of sleep quality over a week', function () {
    expect(mockSleepRepo.getWeeksDailyQual()).to.deep.equal([2.2, 4.7, 4.7]);
  });

  it("should return an array of hours slept over a week", function () {
    expect(mockSleepRepo.getWeeksDailyHours()).to.deep.equal([6.1, 7, 10.8]);
  });

  it("should get the week's average of hours slept", function () {
    expect(mockSleepRepo.getWeekAvgHoursSlept(todaysDate)).to.equal(8);
  });

  it("should get the week's average of quality sleep", function () {
    expect(mockSleepRepo.getWeekAvgQualitySlept(todaysDate)).to.equal(3.9);
  });

  it('should add user input to records array, or update an existing record', function () {
    const userInput = { userId: 1, date: "2019/06/19", hoursSlept: 8 };
    mockSleepRepo.addSleepInput(userInput);
    expect(mockSleepRepo.individualEntryRecords[3].hoursSlept).to.equal(8);
  });

});
