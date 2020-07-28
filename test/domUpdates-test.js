/* eslint-disable max-len */
const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
import User from '../src/User';
import domUpdates from '../src/domUpdates';
chai.use(spies);

describe.only('UpdatesToDOM', function () {
  beforeEach(() => {
    global.domUpdates = {};
    chai.spy.on(domUpdates, "stepCardDisplay", () => {});
    chai.spy.on(domUpdates, "flipCard", () => {});
    chai.spy.on(domUpdates, "hydrationCardDisplay", () => {});
    chai.spy.on(domUpdates, "displayPage", () => {})
    chai.spy.on(domUpdates, "displayName", () => {})
  });
  afterEach(() {
    chai.spy.restore(domUpdates);
  })
  it('should change whats being displayed on card', function () {
    expect(domUpdates.flipCard).to.have.been.called(1);
  })

  it('should be able to view users step activity card on DOM', () => {
    domUpdates.stepCardDisplay()
    expect(domUpdates.stepCardDisplay).to.have.been.called(1)
  })


  it('should be able to view users step activity card on DOM', () => {
    const input = 20;
  
    domUpdates.hydrationCardDisplay(input)
    expect(domUpdates.hydrationCardDisplay).to.have.been.called(1)
    expect(domUpdates.hydrationCardDisplay).to.have.been.called.with(input)
  });

  it('Should display the currentUser name', () => {
    domUpdates.displayName()
    expect(domUpdates.displayName).to.have.been.called(1)
    expect(domUpdates.displayName).to.have.been.called.with()
  })

  // beforeEach(() => {
  //   global.document = {};
  //   chai.spy.on(document, ['querySelector'],
  //     () => {
  //       return { innerText: '' }
  //     });
  // });
 
})