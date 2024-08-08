function solution(nums) {
    var answer = 0;
    
    const phoneMonObject = nums.reduce((acc, species) => {
      acc[species] = acc[species] ? acc[species] + 1 : 1;
      return acc;
    }, {});
    
    const speciesCount = Object.keys(phoneMonObject).length;
    const userChoiceLen = nums.length / 2;
    
    answer = Math.min(userChoiceLen, speciesCount);
    
    return answer;
}