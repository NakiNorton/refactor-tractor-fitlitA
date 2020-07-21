import { expect } from "chai";
import SleepRepository from "../src/SleepRepository";
import Sleep from "../src/Sleep";

describe("SleepRepository", function () {
  let sleep1, sleep2, sleep3, mockRawData, mockSleepRepo;
  beforeEach(() => {
    sleep1 =  {
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
    mockRawData = [sleep1, sleep2, sleep3];
    mockSleepRepo = new SleepRepository(mockRawData);
  });

  it("should be a function", function () {
    expect(SleepRepository).to.be.a("function");
  });

  it("should be an instance of user repository", function () {
    expect(mockSleepRepo).to.be.an.instanceof(SleepRepository);
  });

  it("should hold an array of instantiated users", function () {
    expect(mockSleepRepo.sleepData[0]).to.deep.equal({
      userID: 1,
      date: "2019/06/15",
      hoursSlept: 6.1,
      sleepQuality: 2.2,
    });
    expect(mockSleepRepo.sleepData.length).to.deep.equal(3);
  });
});
