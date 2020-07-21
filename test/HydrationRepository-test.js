import {expect} from 'chai';
import HydrationRepository from '../src/HydrationRepository';
import Hydration from "../src/Hydration";

describe('HydrationRepository', function() {
  let hydrate1, hydrate2, hydrate3, mockRawData, HydrationRepository, mockHydroRepo;
  beforeEach(() => {
    hydrate1 = {userId: 1, date: "07/20/2020", ounces: 40}
    hydrate2 = { userId: 2, date: "07/19/2020", ounces: 30 }
    hydrate3 = { userId: 3, date: "07/18/2020", ounces: 20 }
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
    expect(mockHydroRepo.hydrationData).to.deep.equal([hydrate1, hydrate2, hydrate3]);
    expect(mockHydroRepo.hydrationData).to.equal(3);
  });


});