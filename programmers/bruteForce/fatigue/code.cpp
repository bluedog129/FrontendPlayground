#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

// 최대 던전 수를 저장하는 전역 변수
int max_dungeons = 0;

// 던전 탐험 함수
void explore(int k, int** dungeons, size_t dungeons_rows, bool* visited, int count) {
    // 현재 탐험한 던전 수가 최대 던전 수보다 크다면 갱신
    if (count > max_dungeons) {
        max_dungeons = count;
    }

    // 모든 던전에 대해 시도
    for (size_t i = 0; i < dungeons_rows; i++) {
        if (!visited[i] && k >= dungeons[i][0]) {
            visited[i] = true;
            explore(k - dungeons[i][1], dungeons, dungeons_rows, visited, count + 1);
            visited[i] = false;
        }
    }
}

// 메인 솔루션 함수
int solution(int k, int** dungeons, size_t dungeons_rows, size_t dungeons_cols) {
    // 방문 배열 초기화
    bool visited[dungeons_rows];
    for (size_t i = 0; i < dungeons_rows; i++) {
        visited[i] = false;
    }

    explore(k, dungeons, dungeons_rows, visited, 0);

    return max_dungeons;
}