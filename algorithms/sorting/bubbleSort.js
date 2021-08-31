const { AbstractAlgorithms } = require('../abstractAlgorithms');

class BubbleSort extends AbstractAlgorithms {
	bubbleSort(arr, key){		
		let len = arr.length;
			
		let isSwapped = false;
			
		for(let i =0; i < len; i++){

			isSwapped = false;
				
			for(let j = 0; j < len - 1; j++){
				if(arr[j][key] > arr[j+1][key]){
					let temp = arr[j]
					arr[j] = arr[j+1];
					arr[j+1] = temp;
					isSwapped = true;
				}
			}
			if(!isSwapped){
				break;
			}
		}
		return arr;
	}
	execute(key) {
		return this.bubbleSort(this.getMovies(), key)
	}
}

module.exports = { BubbleSort };