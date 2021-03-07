function squareEveryDigit(num) {
    resultNum = [];
    while (num > 0) {
        console.log(Math.pow(num % 10, 2));
        resultNum.push(Math.pow(num % 10, 2).toFixed(0));
        num = parseInt(num / 10);
        
    }
    return Number(resultNum.reverse().join(''));
}

module.exports = {
    squareEveryDigit: squareEveryDigit
}