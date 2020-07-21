class SleepRepository {
  constructor(rawSleepData) {
    this.sleepData = this.instantiateRawData(rawSleepData);
  }

  instantiateRawData(rawSleepData) {
    return rawSleepData.map(data => new Sleep(data));
  }
}

export default SleepRepository;