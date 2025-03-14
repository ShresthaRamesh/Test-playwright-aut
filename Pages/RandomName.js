class RandomName {
    generateRandomName(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const name = "FP-" + Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('') + "-Asset";
        return name;
    }
}

module.exports = RandomName;