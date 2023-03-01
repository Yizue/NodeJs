export default class cfeh {
    constructor() {};

    ifAndElse : Function = (a: any) : string => {
        if (typeof a === "string") {
            return "string";
        }
        else if (typeof a === "number") {
            return "number";
        }
        else {
            return "unknown";
        }
    }

    tryAndCatchFinally : Function = (index: number) => { 
        const months = [
            "Jan", "Feb", "Mar", "Apr", "May", "Jun",
            "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
        ];
    
        try {
            let month : string = months[index];
            if (!months[index])
                throw new Error("Array Exception - Invalid Month: " + (index+1));
        }
        catch (e) {
            this.ifAndElse(e);
        }
        finally {
            this.fin();
        }
    }

    fin : Function = () => {
        // mock
    }
}

export function altTryCatch (index: number, func1: Function, func2: Function) { 
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];

    try {
        let month : string = months[index];
        if (!months[index])
            throw new Error("Array Exception - Invalid Month: " + (index+1));
    }
    catch (e) {
        func1();
    }
    finally {
        func2();
    }
}