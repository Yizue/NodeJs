import * as grammar from './grammar';

describe("Test Cases that show case the basics of JS grammar and typing", ()=> {

    describe("Test Cases for variable scope and variable types", ()=> {

        it('Should be defined with global scope when using var', () => {
            expect(grammar.variableScope_var()).toBe(5);
        });

        it('Should be able to modify a const object\'s properties', () => {
            let modifyVal = 'newStringVal';
            expect(grammar.const_canMutate(modifyVal)).toBe(modifyVal);
        });

        it('Should be able to push to a const array', () => {
            expect(grammar.const_canPushArray()).toEqual(['1', '2', '3']); // To Equal does deep equality, to compare objects
        });
    });  

    describe("Test Cases for primitives", ()=> {
        const a : boolean = true;
        const b : null = null;
        const c : undefined = undefined;
        const d : number = 3.14;
        const e : BigInt = BigInt(9007199254740991); //An integer with arbitrary precision. For example: 9007199254740992n. -> 2^53
        const f : String = "parsedString";
        const g : Symbol = Symbol("foo"); //A data type whose instances are unique and immutable.
        const h : Object = {}; // Nont a primitive
        
        it('Should match primitive typings', () => {
            expect(a).toEqual(jasmine.any(Boolean));
            expect(b).toBeNull();
            expect(c).toBeUndefined();
            expect(d).toEqual(jasmine.any(Number));
            //expect(e).toEqual(jasmine.any(BigInt)); --No BigInt literals, like the other literals/wrappers for prmitives
            expect(f).toEqual(jasmine.any(String));
            expect(g).toEqual(jasmine.any(Symbol));
        });

        it('Should match non-primitive typings', () => {
            expect(h).toEqual(jasmine.any(Object));
        });

        it('Should not match two different symbol objects', () => {
            expect(g === Symbol("foo")).toBeFalsy();
        });
    });  

    describe("Test Cases for string concat with different primitives", ()=> {
       
        it('Should allow string concat with numbers and strings', () => {
            expect(grammar.stringConcat(42, " is a number")).toBe("42 is a number");
        });
    });  

    describe("Test Cases for parsing strings to numbers", ()=> {
        let numString = "123.45";
        let binaryString = "101"; //Represents 5 in base10
        
        it('Should allow parsing of strings to ints', () => {
            expect(parseInt(numString)).toBe(123);
        });

        it('Should allow parsing of strings to floats', () => {
            expect(parseFloat(numString)).toBe(123.45);
        });

        it('Should allow parsing of binary strings to number', () => {
            expect(parseInt(binaryString, 2)).toBe(5); // Second argument is radix/base
            expect(parseInt(binaryString, 2)).not.toBe(101);
        });
    });  

    describe("Test Cases for Array and Object Literals", ()=> {
        
        function carTypes(name) {
            return name === "Honda" ? name : `Sorry, we don't sell ${name}.`;
        }

        let arrayLiteral = ['Toyota', , 'Hyundai']; //Note that this array literal can have empty entries
        let objectLiteral = { myCar: "Saturn", getCar: carTypes("Honda"), special: arrayLiteral }; 
        //can define obj literals with primitives, functions, and other literals
        
        it('Should have array literals with spaces', () => {
            expect(arrayLiteral[0]).toBe('Toyota');
            expect(arrayLiteral).toEqual(jasmine.arrayContaining(['Hyundai']));
            expect(arrayLiteral[1]).toBeUndefined();
            expect(arrayLiteral.length).toBe(3); // Length is still 3 with an empty entry
        });

        it('Should allow setup of object literals', () => {
            expect(objectLiteral).toEqual(jasmine.objectContaining({myCar: "Saturn"}));
            expect(objectLiteral).toEqual(jasmine.objectContaining({getCar: carTypes("Honda")}));
            expect(objectLiteral).toEqual(jasmine.objectContaining({special: arrayLiteral}));
        });
    });

    describe("Test Cases for Falsy values", ()=> {
        
        it('Should return false for Falsy values', () => {
            expect(undefined).toBeFalsy();
            expect(null).toBeFalsy();
            expect(0).toBeFalsy();
            expect(NaN).toBeFalsy();
            expect("").toBeFalsy();
        });

        it('Should know that Boolean Objects are not inherently falsy', () => {
            const b = new Boolean(false);

            expect(b).toBeTruthy();
        });
    });
});