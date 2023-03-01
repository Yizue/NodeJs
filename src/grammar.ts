export function variableScope_var(): number {
    if (true) {
        var x = 5;
    }
    return x; // x has global context since its var
}

export function variableScope_const(): void {   
    if (true) {
        const x = 3;
        let y = 4;
    } // const and let dont have global context so these 
}

export function const_canMutate(modifyVal: string): string {   
    const PI = 3.14;
    // PI = 4; -- cannot reassign

    const MY_OBJECT = { key: "value" };
    MY_OBJECT.key = modifyVal; // can modify the existing const object

    return MY_OBJECT.key;
}

export function const_canPushArray(): Array<any> {   
    const arr: Array<string> = ['1', '2'];
    
    arr.push('3');

    return arr;
}

export function stringConcat(a : number, b : string): string {   
    return (a + b);
    //return (a - b); -- will not be allowed, only concat is allowed
}

