function solution(inputArr = [], command) {
    let sort = { 
        asc: function(arr){
            arr.sort((x, y) => x - y);
        },
        desc: function(arr){
            arr.sort((x, y) => y - x);
        }
    };
    sort[command](inputArr);
    
    return inputArr;
}

solution([14, 7, 17, 6, 8], 'asc')
solution([14, 7, 17, 6, 8], 'desc')