const { AbstractAlgorithms } = require('../abstractAlgorithms');
class JumpSearch extends AbstractAlgorithms {
	jumpSearch(arr, key) {

		let len = arr.length;
		let step = Math.floor(Math.sqrt(len));
		let blockStart = 0, currentStep = step;

		while (arr[Math.min(currentStep, len) - 1].year < key) {
			blockStart = currentStep;
			currentStep += step;

			if (blockStart >= len) {
				return -1;
			}
		}

		while (arr[blockStart].year < key) {
			blockStart++;
			if (blockStart == Math.min(currentStep, len)) {
				return console.log('Target doesnt exist.');
			}
		}

		if (arr[blockStart].year == key) {
			return arr[blockStart]
		}
			return console.log('Target doesnt exist.');
	
	}

	execute(key) {
		return this.jumpSearch(this.getMovies(), key);
	}

}

module.exports = { JumpSearch };