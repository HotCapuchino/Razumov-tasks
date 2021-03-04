function replaceWithAlphabeticalOrder(string) {
    string = string.toLowerCase();
    resultString = "";
    for (let i = 0; i < string.length; i++) {
        if (string.charCodeAt(i) >= 97 && string.charCodeAt(i) <= 122)
            resultString += `${string.charCodeAt(i) - 96} `;
    }
    return resultString.trim();
}

module.exports = {
    replaceWithAlphabeticalOrder: replaceWithAlphabeticalOrder
}