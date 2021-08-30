const { AbstractAlgorithms } = require('../abstractAlgorithms');

class MergeSort extends AbstractAlgorithms {
	mergeSort(arr, key) {
		let sortKey = key;
		if (arr.length <= 1) return arr;
		let mid = Math.floor(arr.length / 2),
			left = this.mergeSort(arr.slice(0, mid), key),
			right = this.mergeSort(arr.slice(mid), key);

		return this.merge(left, right, sortKey);

	}
	merge(arr1, arr2, sortKey) {
		let sorted = [];

		while (arr1.length && arr2.length) {
			if (arr1[0][sortKey] < arr2[0][sortKey]) {
				sorted.push(arr1.shift());
			} else {
				sorted.push(arr2.shift());
			}
		};

		return sorted.concat(arr1.slice().concat(arr2.slice()));
	};
	execute(key) {
		return this.mergeSort(this.getMovies(), key);
	}
}
module.exports = { MergeSort };