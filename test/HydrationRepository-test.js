import {expect} from 'chai';
import HydrationRepository from '../src/HydrationRepository';
import Hydration from "../src/Hydration";

describe('HydrationRepository', function() {
  let hydrate1, hydrate2, hydrate3, mockRawData, mockHydroRepo;
  beforeEach(() => {
    hydrate1 = {userID: 1, date: "07/20/2020", numOunces: 40}
    hydrate2 = { userID: 2, date: "07/19/2020", numOunces: 30 }
    hydrate3 = { userID: 3, date: "07/18/2020", numOunces: 20 }
    mockRawData = [hydrate1, hydrate2, hydrate3]
    mockHydroRepo = new HydrationRepository(mockRawData)
  })
  
  it("should be a function", function () {
    expect(HydrationRepository).to.be.a("function");
  });

  it("should be an instance of user repository", function () {
    expect(mockHydroRepo).to.be.an.instanceof(HydrationRepository);
  });

  it("should hold an array of instantiated users", function () {
    expect(mockHydroRepo.hydrationData[0]).to.deep.equal({
      userId: 1,
      date: "07/20/2020",
      ounces: 40,
    });
    expect(mockHydroRepo.hydrationData.length).to.deep.equal(3);
  });


});