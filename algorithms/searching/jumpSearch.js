const { AbstractAlgorithms } = require('../abstractAlgorithms');
class JumpSearch extends AbstractAlgorithms {
	jumpSearch(sortedArray, target, targetValue) {
		const arraySize = sortedArray.length;
		sortedArray.sort((a, b) => a[target] - b[target]);

		if(arraySize < 1) return -1;

		let targetIndex = [];
		let lowerBound = 0;
		let upperBound = sortedArray[arraySize - 1].year;

		const block = Math.floor(Math.sqrt(arraySize));

		for (let i = block; i < arraySize; i += block) {
			if(sortedArray[i][target] < targetValue) {
				lowerBound = i;
			} else {
				upperBound = i;
			}
			
		}
		for (let i = lowerBound; i < upperBound; i+= 1) {
			if(sortedArray[i][target] == targetValue || sortedArray[i][target].includes(targetValue)) {
				targetIndex.push(sortedArray[i]);	
			}
		}

		return targetIndex;
	}

	execute(key, keyValue) {
		return this.jumpSearch(this.getMovies(), key, keyValue);
	}

}

module.exports = { JumpSearch };