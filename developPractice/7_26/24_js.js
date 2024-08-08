console.clear();

function readFile() {
    return '파일을 읽어오는 함수가 잘 실행되었다고 치자';
}

function processFile(path) {
    const content = readFile(path);
    const result = content + "OK";

    return result;
}

const result = processFile("file");
console.log(result);