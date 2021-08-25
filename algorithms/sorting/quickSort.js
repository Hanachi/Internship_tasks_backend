const { AbstractAlgorithms } = require('../abstractAlgorithms');

class QuickSort extends AbstractAlgorithms {
  quickSort(arr) {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];
      
    for (let i = 1; i < arr.length; i++) {
      if (pivot.title.length > arr[i].title.length) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }
    return this.quickSort(left).concat(pivot, this.quickSort(right));
    
  }

  execute() {
    return this.quickSort(this.getMovies())
  }
  
} 

module.exports = { QuickSort };