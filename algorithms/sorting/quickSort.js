const { AbstractAlgorithms } = require('../abstractAlgorithms');

class QuickSort extends AbstractAlgorithms {
  quickSort(arr, key) {
    if (arr.length < 2) return arr;
    let pivot = arr[0];
    const left = [];
    const right = [];

    const titleRegExp = /^\s*[A-Za-z0-9]+(?:\s+[A-Za-z0-9]+)*\s*$/;
    for (let i = 1; i < arr.length; i++) {
      if (pivot[key] > arr[i][key]) {
        left.push(arr[i]);
      } else {
        right.push(arr[i]);
      }
    }

    return this.quickSort(left, key).concat(pivot, this.quickSort(right, key));
  }

  execute(key) {
    return this.quickSort(this.getMovies(), key);
  }
  
} 

module.exports = { QuickSort };