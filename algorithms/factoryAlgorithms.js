const { SortingAlgorithms } = require('./sorting/sortingAlg');
const { SearchingAlgorithms } = require('./searching/searchingAlg');

class FactoryAlgorithms {
  constructor() {
    this.sorting = new SortingAlgorithms();
    this.searching = new SearchingAlgorithms();
  }

  getAlgorithmInstance(type, algorithm, key) {
    switch(type) {
      case 'sort': {
        return this.sorting.execute(algorithm);
      }
      case 'search': {
        return this.searching.execute(algorithm, key);
      }
    }

  }

  //return alg that i need

}

module.exports = { FactoryAlgorithms };