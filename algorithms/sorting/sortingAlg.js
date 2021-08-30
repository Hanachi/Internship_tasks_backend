const { AbstractAlgorithms } = require('../abstractAlgorithms');
const { QuickSort } = require('./quickSort');
const { BubbleSort } = require('./bubbleSort');
const { MergeSort } = require('./mergeSort');
const { HeapSort } = require('./heapSort');
class SortingAlgorithms extends AbstractAlgorithms {
  constructor() {
    super();
    this.quickSort = new QuickSort();
    this.bubbleSort = new BubbleSort();
    this.mergeSort = new MergeSort();
    this.heapSort = new HeapSort();
  }

  execute(algorithm, key) {
    switch(algorithm) {
      case 'quickSort': {
        return this.quickSort.execute(key);
      }
      case 'bubbleSort': {
        return this.bubbleSort.execute(key);
      }
      case 'mergeSort': {
        return this.mergeSort.execute(key);
      }
      case 'heapSort': {
        return this.heapSort.execute(key);
      }
      default: {
        throw console.error();
      }
    }
  }
}

module.exports = { SortingAlgorithms };