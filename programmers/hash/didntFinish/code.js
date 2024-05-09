function solution(participant, completion) {
    var answer = '';
    
    // 참가자 배열로 해시 테이블 생성
    const participantObject = participant.reduce((acc, name) => {
        acc[name] = acc[name] ? acc[name] + 1 : 1;
        return acc;
    }, {});
    
    // 완주한 선수들로 해시 테이블의 카운트 감소
    completion.forEach(name => {
        if (participantObject[name]) {
            participantObject[name] -= 1;
        }
    });

    // 해시 테이블에서 카운트가 0이 아닌 첫 번째 이름 찾기
    for (let name in participantObject) {
        if (participantObject[name] > 0) {
            answer = name;
            break;
        }
    }
    
    return answer;
}