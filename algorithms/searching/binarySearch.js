const { AbstractAlgorithms } = require('../abstractAlgorithms');
class BinarySearch extends AbstractAlgorithms {
	binarySearch(sortedArray, key) {
		let start = 0;
		let end = sortedArray.length - 1;

		while (start <= end) {
			let middle = Math.floor((start + end) / 2);
			const guess = sortedArray[middle];

			if (guess.year == key) {
				return guess;
			}
			if (guess.year > key) {
				end = middle - 1
			} else {
				start = middle + 1
			}
		}
		return console.log('Key wasnt found');
	}

	execute(key) {
		return this.binarySearch(this.getMovies(), key);
	}

}

module.exports = { BinarySearch };