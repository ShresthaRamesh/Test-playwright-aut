class RandomGenerator {
    generateRandomName(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const name = "FP-" + Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('') + "-Asset";
        const drivername = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('') + "-driver";
        return { name, drivername };
    }

    generateRandomPhoneNumber(length = 10) {
        const number = '0123456789';
        const phone = "+198" + Array.from({ length: length - 2 }, () => number[Math.floor(Math.random() * number.length)]).join('');
        return phone;
    }

    generateRandomEmail(length = 5) {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const email = Array.from({ length }, () => characters[Math.floor(Math.random() * characters.length)]).join('') + "@fleetpanda.com";
        return email;
    }

    


}

module.exports = RandomGenerator;
