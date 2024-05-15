#include <stdio.h>
#include <stdbool.h>
#include <stdlib.h>

int solution(const char* word) {
    int weights[5] = {781, 156, 31, 6, 1};
    char vowels[6] = "AEIOU";
    int result = 0;
    
    for (int i = 0; i < strlen(word); i++) {
        char *pos = strchr(vowels, word[i]);
        int index = pos - vowels;
        
        result += index * weights[i] + 1;
    }
    
    return result;
}