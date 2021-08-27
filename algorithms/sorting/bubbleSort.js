const { AbstractAlgorithms } = require('../abstractAlgorithms');

class BubbleSort extends AbstractAlgorithms {
	bubbleSort(arr){		
		let len = arr.length;
			
		let isSwapped = false;
			
		for(let i =0; i < len; i++){

			isSwapped = false;
				
			for(let j = 0; j < len - 1; j++){
				if(arr[j].title > arr[j+1].title){
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
	execute() {
		return this.bubbleSort(this.getMovies())
	}
}

module.exports = { BubbleSort };