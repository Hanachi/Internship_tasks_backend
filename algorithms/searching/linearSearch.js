const { AbstractAlgorithms } = require('../abstractAlgorithms');
class LinearSearch extends AbstractAlgorithms {
	linearSearch(list, key) {
		for (let element of list) {
			if (element.year == key) {
				return element;
			}
		}
	}

	execute(key) {
		return this.linearSearch(this.getMovies(), key);
	}

}

module.exports = { LinearSearch };