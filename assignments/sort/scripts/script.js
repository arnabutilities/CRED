function getIntVal(e) {
    return parseInt(e.querySelector(".value").innerText);
}

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

window.onload = (ev) => {
    var htmlCollectionObject = document.querySelectorAll(".position");
    const fragment = document.createDocumentFragment();

    document.querySelector("#shuffle").addEventListener("click", (event) => {
        var suffledArr = suffleArr([...htmlCollectionObject]);
        suffledArr.map((e, i) => {
            fragment.appendChild(e);
        });
        document.querySelector('ul').appendChild(fragment);
    });

    document.querySelector("#sort").addEventListener("click", (e) => {
        var sortedArr = sort([...htmlCollectionObject]);
        sortedArr.map((element, i) => {
            fragment.appendChild(element);
        });
        document.querySelector('ul').appendChild(fragment);
    });
};

