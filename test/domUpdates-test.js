/* eslint-disable max-len */
const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
chai.use(spies);

import domUpdates from '../src/domUpdates';

describe('UpdatesToDOM', function () {
  beforeEach(() => {
    global.domUpdates = {};
    chai.spy.on(domUpdates, 'defineData', () => { })
    chai.spy.on(domUpdates, 'displayStepCard', () => {})
    chai.spy.on(domUpdates, 'displaySleepCard', () => {})
    chai.spy.on(domUpdates, 'displayHydrationCard', () => {})
    chai.spy.on(domUpdates, 'displayName', () => {})
    chai.spy.on(domUpdates, 'displayStairsCard', () => {})
    chai.spy.on(domUpdates, 'flipCard', () => {})
  });

  afterEach(() => {
    chai.spy.restore(domUpdates);
  })
  
  it('should display users step card on the on DOM on page load', () => {
    domUpdates.displayPage()
    expect(domUpdates.displayStepCard).to.have.been.called(1)
  });

  it('should display users sleep card on the on DOM on page load', () => {
    domUpdates.displayPage()
    expect(domUpdates.displaySleepCard).to.have.been.called(1)
  });

  it('should display users hydration card on the on DOM on page load', () => {
    domUpdates.displayPage()
    expect(domUpdates.displayHydrationCard).to.have.been.called(1)
  });

  it('should display users stairs card on the on DOM on page load', () => {
    domUpdates.displayPage()
    expect(domUpdates.displayStairsCard).to.have.been.called(1)
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