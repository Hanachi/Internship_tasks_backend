const { AbstractAlgorithms } = require('../abstractAlgorithms');
const { QuickSort } = require('./quickSort');
// const { BubbleSort } = require('./bubbleSort');
class SortingAlgorithms extends AbstractAlgorithms {
  constructor() {
    super();
    this.quickSort = new QuickSort();
    // this.bubbleSort = new BubbleSort();
    // this.mergeSort = new MergeSort();
    // this.heapSort = new HeapSort();
  }

  execute(algorithm) {
    switch(algorithm) {
      case 'quickSort': {
        return this.quickSort.execute();
      }
      case 'bubbleSort': {
        return this.bubbleSort.execute();
      }
      case 'mergeSort': {
        return this.mergeSort.execute();
      }
      case 'heapSort': {
        return this.heapSort.execute();
      }
      default: {
        throw console.error();
      }
    }
  }
}

module.exports = { SortingAlgorithms };