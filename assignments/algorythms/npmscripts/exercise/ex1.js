/**
 * This example is to search sum of max subset of an array
 *
 *
 * **/

//export 
const getSubSum = (arr = []) => {
	let subCounter = 0;
	let checkSum = [];
	while ( subCounter < arr.length) {
		let subArr = arr.slice(subCounter, arr.length);
		let obj = {
			key: [...subArr],
			val: maxSum([...subArr])
		 };
		checkSum.push(obj);
		while (subArr.length > 0) {
			subArr.pop();
			let newObj = {
				key: [...subArr],
				val: maxSum([...subArr])
			}
		 checkSum.push(newObj);
		}
		subCounter++;
	}
	return checkSum; 
}

// getting max sum of array values
// here if array has both positive and negetive values, sum will be on only positive values
// if values are all negetive values, then sum will be max value 
const maxSum = (arr = []) => {
	let sum = 0;
	for( let i = 0; i <  arr.length; i++) {
		sum +=arr[i]; 
	}
	return sum;
}

// getting max value of an array
const getMax = (arr = []) => {
	let max;
	while (arr.length > 0) {
		let val =  arr.pop();
		if((!max && val) || (max && val > max))  max = val;
	}
	return max;
}

//console.log(sortArray([5, -1, -4, 6, -1,  5, -1 ]))

//export 
const sortArray = (unsortedArr = [], propStr) => {
	if (unsortedArr.length <= 1) {
		return unsortedArr;
	}
	let pivt = Math.floor(unsortedArr.length / 2);
	let left = unsortedArr.slice(0, pivt);
	let right = unsortedArr.slice(pivt);
	if(propStr) return mergeObj(sortArray(left, propStr), sortArray(right, propStr), propStr);
	return merge( sortArray(left),sortArray(right) );
}

const merge = (left, right) => {
	let resultArr = [], leftIndex = 0, rightIndex = 0;
	while(left[leftIndex] && right[rightIndex]){
		if(left[leftIndex] > right[rightIndex]) {
			resultArr.push(left[leftIndex++]);
		}
		if(left[leftIndex] <= right[rightIndex]) {
			resultArr.push(right[rightIndex++]);
		}
	}
	return resultArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}
const mergeObj = (left, right, propStr) => {
	let resultArr = [], leftIndex = 0, rightIndex = 0;
	while(left[leftIndex] && right[rightIndex]){
		if(left[leftIndex][propStr] > right[rightIndex][propStr]) {
			resultArr.push(left[leftIndex++]);
		}
		else if(left[leftIndex][propStr] <= right[rightIndex][propStr]) {
			resultArr.push(right[rightIndex++]);
		}
	}
	return resultArr.concat(left.slice(leftIndex)).concat(right.slice(rightIndex));
}


console.log(sortArray(getSubSum([5, -1, -4, 6, -1,  5, -1 ]), 'val'));

