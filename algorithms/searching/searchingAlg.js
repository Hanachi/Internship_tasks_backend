const { AbstractAlgorithms } = require('../abstractAlgorithms');
const { BinarySearch } = require('./binarySearch');
const { LinearSearch } = require('./linearSearch');
const { JumpSearch } = require('./jumpSearch');

class SearchingAlgorithms extends AbstractAlgorithms {
  constructor() {
    super();
    this.binarySearch = new BinarySearch();
    this.linearSearch = new LinearSearch();
    this.jumpSearch = new JumpSearch();
  }

  execute(algorithm, key, keyValue) {
    switch(algorithm) {
      case 'binarySearch': {
        return this.binarySearch.execute(key, keyValue);
      }
      case 'linearSearch': {
        return this.linearSearch.execute(key, keyValue);
      }
      case 'jumpSearch': {
        return this.jumpSearch.execute(key, keyValue);
      }
      default: {
        throw console.error();
      }
    }
  }
}

module.exports = { SearchingAlgorithms };