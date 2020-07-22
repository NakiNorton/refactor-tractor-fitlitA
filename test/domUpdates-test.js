/* eslint-disable max-len */
const chai = require('chai');
const expect = chai.expect;
const spies = require("chai-spies");
import User from '../src/User';
import DomUpdates from '../src/domUpdates';
chai.use(spies);

describe('Updates to DOM', function () {
  let user, date, domUpdates;

  beforeEach(() => {
    user = new User({
      'id': 1,
      'name': 'Luisa Hane',
      'address': '15195 Nakia Tunnel, Erdmanport VA 19901-1697',
      'email': 'Diana.Hayes1@hotmail.com',
      'strideLength': 4.3,
      'dailyStepGoal': 10000,
      'friends': [
        16,
        4,
        8
      ]
    });
    domUpdates = new DomUpdates(user, date);

    chai.spy.on(domUpdates, 'showDropDown', () => { });
    chai.spy.on(domUpdates, 'flipCard', () => { });
  })

  it('should be a function', function () {
    expect(DomUpdates).to.be.a('function');
  });

  it('should be an instance of DomUpdates', function () {
    expect(domUpdates).to.be.an.instanceof(DomUpdates);
  });

  it('should change whats being displayed on card', function () {
    domUpdates.flipCard()
    expect(domUpdates.flipCard).to.have.been.called(1);
  })

  it('should display user information in dropdown textbox', function () {
    domUpdates.showDropDown()
    expect(domUpdates.showDropDown).to.have.been.called(1);
    domUpdates.showDropDown(user)
    expect(domUpdates.showDropDown).to.have.been.called.with(user);
  })
})