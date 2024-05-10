function solution(clothes) {
    let answer = 1;
    
    const clothesMap = {};
    
    clothes.forEach(clothe => {
        const [name, type] = clothe;
        if (clothesMap[type])
            clothesMap[type]++;
        else
            clothesMap[type] = 1;
    });
    
    for (const type in clothesMap) {
        answer *= (clothesMap[type] + 1)
    }
    
    return answer - 1;
}
