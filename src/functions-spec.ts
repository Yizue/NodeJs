describe("Testing Functions and their properties", () => {
    
    describe("Testing primitives are passed by value, and objects are passed by reference", function() {
        let square = function (x : number) : number {
            return x*x;     
        }

        let objMutator = function (theObject: any) : void {
            theObject.make = "Toyota";
        }
          
        it("should return 100 if I pass in primitive, it does not mutuate the original variable", function() {
            let y = 10;       
            let result = square(y);
            
            expect(result).toBe(100);
            expect(y).not.toBe(100);
        });

        it("should modify passed in object inside function that mutates it", function() {
            const mycar = {
                make: "Honda",
                model: "Accord",
                year: 1998,
            };              
              
            // the make property is changed by the function
            objMutator(mycar);
            
            expect(mycar.make).toBe("Toyota");
        });
    });

    describe("Testing function expressions", function() {
        // this is in function expression format, giving it its own name can allow for recursive calling
        let factorial = function f(n : number) : number { 
            return n < 2 ? 1 : n * f(n - 1);
            //return n < 2 ? 1 : n * factorial(n - 1); -- could also just use the assigned variable name too
        }

        // function expressions can be pased into other functions as arguments, 
        // the parameter f accepts cube as a parameter to calculate the cubes of the numbers in an array 
        function map(f: Function, a: Array<number>) {
            const result = new Array(a.length);
            for (let i = 0; i < a.length; i++) {
                result[i] = f(a[i]);
            }
            return result;
        }
        
        const cube = function (x) {
            return x * x * x;
        };
                
          
        it("should return factorial from recursively defined function", function() {
            expect(factorial(4)).toBe(24);
            expect(factorial(6)).toBe(720);
        });

        it("should return mapped array with cubed amounts from using a function with a function parameter - map", function() {
            const numbers = [0, 1, 2, 5, 10];
            const c = map(cube, numbers); 

            expect(c).toEqual([0, 1, 8, 125, 1000]);
        });
    });

    describe("Testing function hoisting", function() {
        square(5); // square here is called before it has been declared, functions are hoised to the top in execution

        function square(n : number) { 
          return n * n;
        }

        /* s(5); // Note: wornt work for function expressions, this throws ReferenceError: Cannot access 'square' before initialization
        const s = function (n) {
            return n * n;
        }; */                
          
        it("should run hoisted function without issue", function() {
            expect(square(5)).toBe(25);
        });
    });

    describe("Testing nested functions and closures", function() {
        function outside(x: number) {
            function inside(y: number) { // This inner function has access to the outer functions' variables, its inside its scope
              return x + y;
            }
            return inside; // calling the inner function here but w/o the arguments here so that it needs to be passed in by the outer funcs' invocation
        }

        //Closures
        //Closures are one of the most powerful features of JavaScript. 
        //JavaScript allows for the nesting of functions and grants the inner function full access to all the variables 
        //and functions defined inside the outer function (and all other variables and functions that the outer function has access to).
        //However, the outer function does not have access to the variables and functions defined inside the inner function. 
        //This provides a sort of encapsulation for the variables of the inner function.

        it("should run nested functions", function() {
            expect(outside(3)(5)).toBe(8); // Pass in the args for both the inner and outer function
        });
    });

    describe("Testing using the arguments array with rest parameters and default parameters", function() {
        function myConcat(separator = ', ', ...args : Array<string>) {
            let result = ""; // initialize list
            // iterate through arguments array, separator is the first one, and extras can be passed in as many as you want
            // in JS you dont need the rest parameters args, but in Typescript yo do since argument counts are controlled there
            for (let i = 1; i < arguments.length; i++) {
              result += arguments[i] + separator;
              //result += args[i] + separator; -- this also works
            }
            return result;
        }

        function multiply(a = 3, b = 4) {
            return a*b;
        }
          
        it("should use the arguments array to concat a string", function() {
            expect(myConcat(" ", "red", "orange", "blue")).toBe('red orange blue '); 
        });

        it("should use the default parameters", function() {
            expect(multiply()).toBe(12); 
        });
    });

    describe("Testing arrow functions (shorthand)", function() {
        let square = (x: number) : number => { return x*x; } // () => {} format
                     
        it("should use the arrow function normally", function() {
            expect(square(10)).toBe(100); 
        });
    });
});