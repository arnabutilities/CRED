/**
 * 
 * @param {HTMLEntityElement} e 
 * @returns number
 * @description Expectation here is, this HTMLEntityElement will be in below format
 * <... [htmlAttributes]>
 *   <... class="value">{{Number}}</span>
 * ...
 * </...>
 */
function getIntVal(e) {
    return parseInt(e.querySelector(".value").innerText);
}

/**
 * 
 * @param {Array} leftSet 
 * @param {Array} rightSet
 * @returns {Array} sorted combined array 
 */
function merge(leftSet, rightSet) {
    var sortedArr = [];
    while (leftSet.length > 0 && rightSet.length > 0) {
        if (getIntVal(leftSet[0]) <= getIntVal(rightSet[0])) {
            sortedArr.push(leftSet.shift());
        } else {
            sortedArr.push(rightSet.shift());
        }
    }
    while (leftSet.length)
        sortedArr.push(leftSet.shift());
    while (rightSet.length)
        sortedArr.push(rightSet.shift());
    return sortedArr;
}

/**
 * 
 * @param {Array} arr unsorted input array
 * @returns Sorted array (merge sort)
 */
function sort(arr) {
    if (arr.length < 2) {
        return arr;
    }
    else {
        var midpoint = parseInt(arr.length / 2);
        var leftArr = arr.slice(0, midpoint);
        var rightArr = arr.slice(midpoint, arr.length);
        return merge(sort(leftArr), sort(rightArr));
    }
}

/**
 * 
 * @param {Array} arr
 * @returns shuffled Array, index of each element changes  
 */
let suffleArr = (arr) => {
    let suffledArr = [];
    let suffledIndex = [];
    while (suffledArr.length < arr.length) {
        let n = Math.floor(Math.random() * arr.length);
        if (suffledIndex.indexOf(n) === -1) {
            suffledArr.push(arr[n]);
            suffledIndex.push(n);
        }
    }
    return suffledArr;
}

/**
 * 
 * Executes once browser renders all html elements 
 */

window.onload = (ev) => {
    var htmlCollectionObject = document.querySelectorAll(".position");
    const fragment = document.createDocumentFragment();

    // perform shuffling the elements on click of button 
    document.querySelector("#shuffle").addEventListener("click", (event) => {
        var suffledArr = suffleArr([...htmlCollectionObject]);
        suffledArr.map((e, i) => {
            fragment.appendChild(e);
        });
        document.querySelector('ul').appendChild(fragment);
    });

    // perform sorting the elements on click of button 
    document.querySelector("#sort").addEventListener("click", (e) => {
        var sortedArr = sort([...htmlCollectionObject]);
        sortedArr.map((element, i) => {
            fragment.appendChild(element);
        });
        document.querySelector('ul').appendChild(fragment);
    });
};

