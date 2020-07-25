import {expect} from 'chai';
import HydrationRepository from '../src/HydrationRepository';
import Hydration from "../src/Hydration";

describe('HydrationRepository', function() {
  let hydrate1, hydrate2, hydrate3, hydrate4, hydrate5, hydrate6, hydrate7, mockRawData, todayDate, mockHydroRepo;
  beforeEach(() => {
    hydrate1 = {userID: 1, date: "07/20/2020", numOunces: 40}
    hydrate2 = { userID: 1, date: "07/20/2020", numOunces: 30 }
    hydrate3 = { userID: 1, date: "07/18/2020", numOunces: 20 }
    hydrate4 = { userID: 1, date: "07/18/2020", numOunces: 20 }
    hydrate5 = { userID: 1, date: "07/20/2020", numOunces: 30 };
    hydrate6 = { userID: 1, date: "07/18/2020", numOunces: 20 };
    hydrate7 = { userID: 1, date: "07/18/2020", numOunces: 20 };
    mockRawData = [hydrate1, hydrate2, hydrate3, hydrate4, hydrate5, hydrate5, hydrate7]
    todayDate = "07/20/2020"
    mockHydroRepo = new HydrationRepository(todayDate)
  })
  
  it("should be a function", function () {
    expect(HydrationRepository).to.be.a("function");
  });

  it("should be an instance of user repository", function () {
    expect(mockHydroRepo).to.be.an.instanceof(HydrationRepository);
  });

  it('should hold all individual entries in an array', function() {
    mockHydroRepo.individualEntryRecords.push(...mockRawData);
    expect(mockHydroRepo.individualEntryRecords.length).to.deep.equal(4);
  });

  it('should return a sum of all ounces of water drank today', function() {
    mockHydroRepo.individualEntryRecords.push(...mockRawData);
    expect(mockHydroRepo.findTodaysTotalWater(todayDate)).to.equal(70);
  });

  it.only("should get the week's average of ounces", function() {
    mockHydroRepo.individualEntryRecords.push(...mockRawData);
    expect(mockHydroRepo.getWeekAvgOunces()).to.equal(21);
  })


});