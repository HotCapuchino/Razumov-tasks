function arrayDifference(arr1, arr2) {
    let resultArray = [];
    arr1.forEach(element => {
        if (arr2.indexOf(element) < 0) resultArray.push(element);
    });
    return resultArray;
}

module.exports = {
    arrayDifference: arrayDifference
}