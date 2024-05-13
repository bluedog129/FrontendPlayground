function solution(sizes) {
    let maxWidth = 0;
    let maxHeight = 0;

    for (let i = 0; i < sizes.length; i++) {
        const [w, h] = sizes[i];
        
        const adjustedWidth = Math.max(w, h);
        const adjustedHeight = Math.min(w, h);
        
        maxWidth = Math.max(maxWidth, adjustedWidth);
        maxHeight = Math.max(maxHeight, adjustedHeight);
    }
    
    const answer = maxWidth * maxHeight;
    
    return answer;
}