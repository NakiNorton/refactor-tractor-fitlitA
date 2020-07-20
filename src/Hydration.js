class Hydration {
  constructor(data, userRepository) {
    this.userId = data.userID;
    this.date = data.date;
    this.ounces = data.numOunces;
    this.drink(userRepository);
  }

  drink(userRepo) {
    var hydrate = this;
    userRepo.users.find(user => user.id === hydrate.userId)
      .updateHydration(this.date, this.ounces);

  }
}

export default Hydration;



