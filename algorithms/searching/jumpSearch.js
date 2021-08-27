const { AbstractAlgorithms } = require('../abstractAlgorithms');
class JumpSearch extends AbstractAlgorithms {
	jumpSearch(sortedArray, target) {
		const arraySize = sortedArray.length;

		if(arraySize < 1) return -1;
		if(sortedArray[0].year > target) return -1;
		if(sortedArray[arraySize - 1].year < target) return -1;

		let targetIndex = [];
		let lowerBound = 0;
		let upperBound = sortedArray[arraySize - 1].year;

		const block = Math.floor(Math.sqrt(arraySize));

		for (let i = block; i < arraySize; i += block) {
			if(sortedArray[i].year < target) {
				lowerBound = i;
			} else {
				upperBound = i;
			}
			
		}
		for (let i = lowerBound; i < upperBound; i+= 1) {
			if(sortedArray[i].year == target) {
				targetIndex.push(sortedArray[i]);	
			}
		}

		return targetIndex;
	}

	execute(key) {
		return this.jumpSearch(this.getMovies(), key);
	}

}

module.exports = { JumpSearch };