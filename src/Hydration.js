class Hydration {
  constructor(data) {
    this.userId = data.userID;
    this.date = data.date;
    this.ounces = data.numOunces;
    // this.drink(userRepository);
  }

  // drink(userRepo, todayDate) {
  //   var hydrate = this;
  //   userRepo.users.find(user => user.id === hydrate.userId)
  //     .updateHydration(this.date, this.ounces);

  }
// }

export default Hydration;



