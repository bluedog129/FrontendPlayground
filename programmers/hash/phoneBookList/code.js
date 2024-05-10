function solution(phone_book) {
    let phoneMap = {};
    phone_book.forEach(number => {
        phoneMap[number] = true;
    });

    for (let i = 0; i < phone_book.length; i++) {
        let phoneNumber = phone_book[i];
        let prefix = "";
        for (let j = 0; j < phoneNumber.length; j++) {
            prefix += phoneNumber[j];
            if (prefix in phoneMap && j + 1 < phoneNumber.length)
                return false;
        }
    }

    return true;
}