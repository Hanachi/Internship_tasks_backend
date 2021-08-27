const { AbstractAlgorithms } = require('../abstractAlgorithms');
class BinarySearch extends AbstractAlgorithms {
	binarySearch(sortedArray, key) {
		let start = 0;
		let end = sortedArray.length - 1;
		
		let matchedItems = [];

		while (start <= end) {
			let middle = Math.floor((start + end) / 2);

			if ((sortedArray[middle].year == key) && (sortedArray[start].year == key)) {
				end = middle + 1;
				matchedItems.push(sortedArray[start]);
			}
			if (sortedArray[middle].year > key) {
				end = middle - 1;
			} else {
				start = start + 1;
				end = middle + 1;
			}
		}
		let result = (matchedItems.length !== 0) ? matchedItems : console.log('Key wasnt found');
		return result;
	}

	execute(key) {
		return this.binarySearch(this.getMovies(), key);
	}

}

module.exports = { BinarySearch };