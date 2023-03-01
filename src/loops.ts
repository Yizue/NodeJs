export function forLoop (iter: number) { 
    let evenNums: number = 0;
    for (let i = 0; i < iter; i++) {
        if (i % 2 === 0)
            evenNums++;
    }
    return evenNums;
}

export function forInLoop (arr: Array<string>) : string { 
    let concat = '';
    for (let i in arr) {
        concat += arr[i];
        if (parseInt(i) < arr.length - 1) // i here is an index that is string type
            concat += ', ';
    }
    return concat;
}

export function whileLoopBreakContinue (breakNum: number) : number {     
    let z : number = 0;
    while (true) {
        z++;
        if (z === breakNum) {
          break; // continue is also an option, they will enter immediately into next loop iteration
        }
        else if (z === 100)
            break;
    }
    return z;
}