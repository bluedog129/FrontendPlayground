function solution(answers) {
    const person1 = [1, 2, 3, 4, 5];
    const person2 = [2, 1, 2, 3, 2, 4, 2, 5];
    const person3 = [3, 3, 1, 1, 2, 2, 4, 4, 5, 5];
    
    let p1Count = 0;
    let p2Count = 0;
    let p3Count = 0;
    
    for (let i = 0; i < answers.length; i++) {
        if (person1[i % person1.length] === answers[i])
            p1Count++;
        if (person2[i % person2.length] === answers[i])
            p2Count++;
        if (person3[i % person3.length] === answers[i])
            p3Count++;
    }
    
    const scoreList = [p1Count, p2Count, p3Count];
    let maxScore = Math.max(...scoreList);
    let result = [];
    
    for (let i = 0; i < scoreList.length; i++) {
        if (maxScore === scoreList[i])
            result.push(i + 1);
    }
    
    return result;
}