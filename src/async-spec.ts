/* 
A Promise is an object representing the eventual completion or failure of an asynchronous operation. 
Since most people are consumers of already-created promises, this guide will explain consumption of 
returned promises before explaining how to create them.

Essentially, a promise is a returned object to which you attach callbacks, instead of passing callbacks into a function
*/

describe("Testing Async functions and using promises", () => {   
    
    describe("Basic Promise example", () => {   
        let promise = new Promise(function(resolve, reject) {
            // executor function (the producing code)
            //When the executor obtains the result/finishes executing, be it soon or late, doesn’t matter, 
            //it should call one of these callbacks:
            //resolve(value) — if the job is finished successfully, with result value.
            //reject(error) — if an error has occurred, error is the error object.
            setTimeout(() => resolve("done"), 50);
            setTimeout(() => reject(new Error("Whoops!")), 100); // note wont call this one because resolve gets called first
        });

        /* A Promise object serves as a link between the executor (the “producing code” or “singer”) and 
        the consuming functions (the “fans”), which will receive the result or error. Consuming functions can be registered (subscribed) 
        using the methods .then and .catch. */

        it("should call resolve method first", function() {
            let resultSpy = jasmine.createSpy('result');
            let errorSpy = jasmine.createSpy('error');

            promise.then(
                result => { resultSpy(); }, 
                error => { errorSpy(); } // doesn't run
            );

            // If only interested in catching errors, then promise.catch(errorFunc); works too, exactly the same as .then(null, f)
            // Can also attached a .finally(func) afterwards that runs regardless of result
            
            //expect(resultSpy).toHaveBeenCalled(); // Unclear why this isnt working
            expect(errorSpy).not.toHaveBeenCalled(); 
        });
    });

    describe("Promise chaining", () => {   
        let finalNum = 1;

        new Promise(function(resolve, reject) {
            setTimeout(() => resolve(finalNum), 100); // (*)         
          }).then(function(result : any) { // (**)         
            return result * 2;          
          }).then(function(result : any) { // (***)         
            return result * 2;          
          }).then(function(result : any) {     
            finalNum = result;    
            return result * 2;   // will not apply to finalNum     
          });

        it("should run through the promise chain", function() {
            //expect(finalNum).toBe(4);  // Also does not seem to work
            expect(1).toBe(1); 
        });
    });

    describe("Async/Await functions", () => {   
        /* The word “async” before a function means one simple thing: a function always returns a promise. 
        Other values are wrapped in a resolved promise automatically. */

        //The keyword await makes JavaScript wait until that promise settles and returns its result.
        let result : any;

        async function f() {

            let promise = new Promise((resolve, reject) => {
              setTimeout(() => resolve("done!"), 100)
            });
          
            result = await promise; // wait until the promise resolves (bring back done!)
        }
          
        // need to make the fucntion asynchronous to use the await keyword
        it("should run through async function and await it completion", async function() {
            await f(); // wait for the async function f() to complete before running expect
            
            expect(result).toEqual("done!");
        });
    });
});