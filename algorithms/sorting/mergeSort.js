const { AbstractAlgorithms } = require('../abstractAlgorithms');

class MergeSort extends AbstractAlgorithms {
	mergeSort(arr) {
		if (arr.length <= 1) return arr;
		let mid = Math.floor(arr.length / 2),
			left = this.mergeSort(arr.slice(0, mid)),
			right = this.mergeSort(arr.slice(mid));

		return this.merge(left, right);

	}
	merge(arr1, arr2) {
		let sorted = [];

		while (arr1.length && arr2.length) {
			if (arr1[0].title.length < arr2[0].title.length) {
				sorted.push(arr1.shift());
			} else {
				sorted.push(arr2.shift());
			}
		};

		return sorted.concat(arr1.slice().concat(arr2.slice()));
	};
	execute() {
		return this.mergeSort(this.getMovies());
	}
}
module.exports = { MergeSort };