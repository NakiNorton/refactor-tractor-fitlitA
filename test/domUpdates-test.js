/* eslint-disable max-len */
const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

import domUpdates from '../src/domUpdates';

describe('UpdatesToDOM', function () {
  beforeEach(() => {
    global.domUpdates = {};
    chai.spy.on(domUpdates, "defineData", () => { })
    chai.spy.on(domUpdates, "stepCardDisplay", () => {})
    chai.spy.on(domUpdates, "sleepCardDisplay", () => {})
    chai.spy.on(domUpdates, "hydrationCardDisplay", () => {})
    chai.spy.on(domUpdates, "displayName", () => {})
    chai.spy.on(domUpdates, "stairsCardDisplay", () => {})
    chai.spy.on(domUpdates, "flipCard", () => {})
  });

  afterEach(() => {
    chai.spy.restore(domUpdates);
  })
  
  it('should display users step card on the on DOM on page load', () => {
    domUpdates.displayPage()
    expect(domUpdates.stepCardDisplay).to.have.been.called(1)
  });

  it('should display users sleep card on the on DOM on page load', () => {
    domUpdates.displayPage()
    expect(domUpdates.sleepCardDisplay).to.have.been.called(1)
  });

  it('should display users hydration card on the on DOM on page load', () => {
    domUpdates.displayPage()
    expect(domUpdates.hydrationCardDisplay).to.have.been.called(1)
  });

  it('should display users stairs card on the on DOM on page load', () => {
    domUpdates.displayPage()
    expect(domUpdates.stairsCardDisplay).to.have.been.called(1)
  });

  it('should display the users name when page is loaded', () => {
    domUpdates.displayPage()
    expect(domUpdates.displayName).to.have.been.called(1)
  })

  it('should change whats being displayed', () => {
    let infoDisplay = 'infoDisplay'
    let mainDisplay = 'mainDisplay'

    domUpdates.flipCard(infoDisplay, mainDisplay)
    expect(domUpdates.flipCard).to.have.been.called(1)
    expect(domUpdates.flipCard).to.have.been.called.with(infoDisplay, mainDisplay)
  })
})