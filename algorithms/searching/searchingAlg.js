const { AbstractAlgorithms } = require('../abstractAlgorithms');

class SearchingAlgorithms extends AbstractAlgorithms {
  constructor() {
    super();
  }
  binarySearch() {
    return this.getMovies((moviesData) => {
      //alg realization
      return sortedData;
    })
  }
  linearSearch() {

  }
  jumpSearch() {

  }
  execute(algorithm) {
    switch(algorithm) {
      case 'binarySearch': {
        return this.binarySearch();
      }
      case 'linearSearch': {
        return this.linearSearch();
      }
      case 'jumpSearch': {
        return this.jumpSearch();
      }
      default: {
        throw console.error();
      }
    }
  }
}

module.exports = { SearchingAlgorithms };