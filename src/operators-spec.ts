describe("Testing JS operators", () => {
    
    describe("Testing assignment operators", () => {   
        

        it("should run assignment operation - addition", function() {
            let x = 2;
            x += 1;           
            expect(x).toBe(3);
        });
    
        it("should run assignment operation - multiplication", function() {
            let x = 2;
            x *= 3;           
            expect(x).toBe(6);
        });
    
        // There are many others, such as:
        // -=, /=, **= (exponentiation), %= (modulo), &&= (and), ||= (or)
    });

    describe("Testing comparison operators", () => {   

        it("should run shallow equality (==) and inequality (!=)", function() {

            //expect(3 == '3').toBe(true); // Typescript does not allow this but JS does
            expect(3 == 3).toBe(true);
            //expect(3 != '4').toBe(true);
            //expect(3 != 4).toBe(true);
        });
    
        it("should run shallow equality (===) and inequality (!==)", function() {

            //expect(3 === '3').toBe(true); // Typescript does not allow this but JS does
            expect(3 === 3).toBe(true);
            //expect(3 !== '4').toBe(true);
            //expect(3 !== 4).toBe(true);
        });
    
        // There are others, such as:
        // >, <, >=, <=, work as usual
    });

    describe("Testing arithmetic operators", () => {   

        it("should run division as if all numbers are floats (number)", function() {

            expect(1 / 2).toBe(0.5);
            expect(1.0 / 2.0).toBe(0.5);
        });
    
        it("should run increment/decrement ops - ++x version", function() {
            let x: number = 3;
            
            expect(++x).toBe(4); // does the increment first, then returns number
            expect(x).toBe(4);

            expect(--x).toBe(3);
            expect(x).toBe(3);
        });

        it("should run increment/decrements ops - x++ version", function() {
            let x: number = 3;
            
            expect(x++).toBe(3); // returns number first, then increments the number
            expect(x).toBe(4);

            expect(x--).toBe(4);
            expect(x).toBe(3);
        });
    });

    /*Bitwise logical operators

    Conceptually, the bitwise logical operators work as follows:

        The operands are converted to thirty-two-bit integers and expressed by a series of bits (zeros and ones). Numbers with more than 32 bits get their most significant bits discarded. For example, the following integer with more than 32 bits will be converted to a 32-bit integer:

        Before: 1110 0110 1111 1010 0000 0000 0000 0110 0000 0000 0001
        After:                 1010 0000 0000 0000 0110 0000 0000 0001

    Each bit in the first operand is paired with the corresponding bit in the second operand: first bit to first bit, second bit to second bit, and so on.
    The operator is applied to each pair of bits, and the result is constructed bitwise.*/

    describe("Testing bitwise operators", () => {   

        it("should run bitwise arithmetic operators", function() {

            expect(15 & 9).toBe(9);  //1111 & 1001 = 1001
            expect(15 | 9).toBe(15); //1111 | 1001 = 1111
            expect(15 ^ 9).toBe(6);  //1111 ^ 1001 = 0110 XOR
            expect(~15).toBe(-16);   //~ 0000 0000 … 0000 1111 = 1111 1111 … 1111 0000 OR, equivalent to -x - 1 in practice
        });
    
        it("should run bitwise shift operators", function() {
            // right operand is how many digits to shift
            
            expect(9<<2).toBe(36); // Left shift - 1001 shifted 2 bits to the left becomes 100100
            expect(9>>2).toBe(2);  // Right shift - 1001 shifted 2 bits to the right becomes 10
        });
    });

    describe("Testing logical operators", () => {   

        it("should run logical operators as expected", function() {

            expect(true && false).toBe(false);  //AND
            expect(false || true).toBe(true); //OR
            expect(!true).toBe(false);  //NOT
        });

        it("should run logical operators (short circuted)", function() {

            // Lazy derivation -  if the left operand is sufficient to eval operation, it will not look at the right operand
            expect(false && null).toBe(false);
            expect(true || null).toBe(true);     
        });
    });

    describe("Testing conditional ternary operators", () => {   
        let isMinor = (age : number) : boolean => {
            return (age >= 18 ? true : false);
        }

        it("conditional ternary operators - minor", function() {
            expect(isMinor(17)).toBe(false);
        });

        it("conditional ternary operators - adult", function() {
            expect(isMinor(18)).toBe(true);
            expect(isMinor(21)).toBe(true);
        });
    });

    describe("Testing typeof operator", () => {   
        const myFun = new Function("5 + 2");
        const shape = "round";
        const size = 1;
        const foo = ["Apple", "Mango", "Orange"];
        const today = new Date();
        const b = true;
        const n = null;
        let doesntExist : any;

        it("should run typeof operator - it returns string of its type", function() {
            expect(typeof myFun).toBe("function");
            expect(typeof shape).toBe("string");
            expect(typeof size).toBe("number");
            expect(typeof foo).toBe("object");
            expect(typeof today).toBe("object");
            expect(typeof b).toBe("boolean");
            expect(typeof n).toBe("object");
            expect(typeof doesntExist).toBe("undefined");
        });
    });

    describe("Testing relational operators", () => {   

        it("should run the 'in' operator - checks if specified property is in object/ or is a member of an array", function() {
            // Arrays
            const trees = ["redwood", "bay", "cedar", "oak", "maple"];

            expect("bay" in trees).toBe(false); // bay is not a property (its the value of property '1')
            expect("length" in trees).toBe(true); // (length is an Array property)

            // built-in objects
            expect("PI" in Math).toBe(true) 
            const myString = new String("coral");
            expect("length" in myString); // string wrapper

            // Custom objects
            const mycar = { make: "Honda", model: "Accord", year: 1998 };
            expect("make" in mycar).toBe(true); // returns true
        });

        it("should run the 'instaceof' operator - checks if specified object is the object type", function() {
            const theDay = new Date(1995, 12, 17);
            
            expect(theDay instanceof Date).toBe(true);
        });
    });
});