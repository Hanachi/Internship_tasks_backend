class SortingAlgorithms extends AbstractAlgorithms {
  constructor() {
    super();
  }
  quickSort() {
    return this.getMovies((moviesData) => {
      //alg realization
      return sortedData;
    })
  }
  mergeSort() {

  }
  heapdSOrt() {

  }
  bubbleSort() {

  }
  execute(algorithm) {
    switch(algorithm) {
      case 'quickSort': {
        return this.quickSort();
      }
      case 'bubbleSort': {
        return this.bubbleSort();
      }
      case 'mergeSort': {
        return this.mergeSort();
      }
      case 'heapSort': {
        return this.heapSort();
      }
      default: {
        throw console.error();
      }
    }
  }
}

export default SortingAlgorithms;