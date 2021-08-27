const { AbstractAlgorithms } = require('../abstractAlgorithms');
class LinearSearch extends AbstractAlgorithms {
	linearSearch(list, key) {
		let matchedItems = [];
		for (let element of list) {
			if (element.year == key) {
				matchedItems.push(element);
			}
		}
		return matchedItems;
	}

	execute(key) {
		return this.linearSearch(this.getMovies(), key);
	}

}

module.exports = { LinearSearch };