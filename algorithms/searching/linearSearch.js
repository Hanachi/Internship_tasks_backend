const { AbstractAlgorithms } = require('../abstractAlgorithms');
class LinearSearch extends AbstractAlgorithms {
	linearSearch(list, key, keyValue) {
		let matchedItems = [];
		
		list.sort((a, b) => a.key - b.key);

		for (let element of list) {
			let includesValue = false;
			if (Array.isArray(element[key])) {
				includesValue = element[key].includes(keyValue);
			}
			if (element[key] == keyValue || includesValue) {
				matchedItems.push(element);
			}
		}
		return matchedItems;
	}

	execute(key, keyValue) {
		return this.linearSearch(this.getMovies(), key, keyValue);
	}

}

module.exports = { LinearSearch };