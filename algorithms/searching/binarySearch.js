const { AbstractAlgorithms } = require('../abstractAlgorithms');
class BinarySearch extends AbstractAlgorithms {
	binarySearch(sortedArray, key) {
		let start = 0;
		let end = sortedArray.length - 1;

		while (start <= end) {
			let middle = Math.floor((start + end) / 2);

			if (sortedArray[middle].year == key) {
				return sortedArray[middle];
			} else if (sortedArray[middle].year < key) {
				start = middle + 1;
			} else {
				end = middle - 1;
			}
		}
		return console.log('Key wasnt found');
	}
	
	execute(key) {
		return this.binarySearch(this.getMovies(), key);
	}

}

module.exports = { BinarySearch };