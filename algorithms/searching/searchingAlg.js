const { AbstractAlgorithms } = require('../abstractAlgorithms');
const { BinarySearch } = require('./binarySearch');
const { LinearSearch } = require('./linearSearch');
const { JumpSearch } = require('./jumpSearch');

class SearchingAlgorithms extends AbstractAlgorithms {
  constructor() {
    super();
    this.binarySearch = new BinarySearch();
    // this.linearSearch = new LinearSearch();
    // this.jumpSearch = new JumpSearch();
  }

  execute(algorithm, key) {
    switch(algorithm) {
      case 'binarySearch': {
        return this.binarySearch.execute(key);
      }
      case 'linearSearch': {
        return this.linearSearch.execute();
      }
      case 'jumpSearch': {
        return this.jumpSearch.execute();
      }
      default: {
        throw console.error();
      }
    }
  }
}

module.exports = { SearchingAlgorithms };