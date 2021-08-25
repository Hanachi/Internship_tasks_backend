const fs = require('fs');
class AbstractAlgorithms {
  constructor() {
  }

	getMovies() {
		const fileContent = fs.readFileSync('movies.json');
		const moviesData = JSON.parse(fileContent);
		return moviesData;
  }
}
module.exports = { AbstractAlgorithms }