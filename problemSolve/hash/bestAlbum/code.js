function solution(genres, plays) {
    let answer = [];
    let genreMap = new Map();
    
    genres.forEach((genre, index) => {
        if (!genreMap.has(genre)) {
            genreMap.set(genre, []);
        }
        let list = genreMap.get(genre);
        list.push({"playCount" : plays[index], "index" : index});
    });
    
        // 장르별 총 재생 횟수 계산
    let genreTotals = Array.from(genreMap).map(([genre, tracks]) => {
        let totalPlays = tracks.reduce((sum, track) => sum + track.playCount, 0);
        return { genre, totalPlays, tracks };
    });

    // 장르별로 내림차순 정렬 (총 재생 횟수 기준)
    genreTotals.sort((a, b) => b.totalPlays - a.totalPlays);

    // 각 장르 내에서 노래를 재생 횟수에 따라 내림차순, 동일한 경우 고유 번호 오름차순으로 정렬
    genreTotals.forEach(genre => {
        genre.tracks.sort((a, b) => b.playCount - a.playCount || a.index - b.index);
    });

    // 최종적으로 베스트 앨범에 포함될 곡들을 선정
    genreTotals.forEach(genre => {
        let tracks = genre.tracks.slice(0, 2);  // 각 장르에서 최대 2곡 선택
        tracks.forEach(track => {
            answer.push(track.index);
        });
    });
    
    return answer;
}