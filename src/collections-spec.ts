describe("Testing Arrays", () => {
    
    it("should express Arrays the same", function() {
        const arr1 = new Array(1, 2, 3);
        const arr2 = Array(1, 2, 3);
        const arr3 = [1, 2, 3];

        expect(arr1).toEqual(arr2); 
        expect(arr2).toEqual(arr3); 
    });

    it("should express simple Array properties", function() {
        const arr = [1, 2, 3];

        expect(arr[0]).toEqual(1);
        arr[1] = 4;
        expect(arr.at(1)).toEqual(4); 
        expect(arr.length).toEqual(3); 
    });    

    it("should iterate Array with forEach", function() {
        let s : string = "";
        const colors = ["red", "green", "blue"];

        colors.forEach((color) => s += color + ' '); // iterates over Array, using function with parameter being the iterated array element items

        expect(s).toEqual("red green blue "); 
    });  

    it("should run Array object methods", function() {
        let myArray = ["1", "2", "3"];
        
        myArray = myArray.concat("a", "b", "c");

        expect(myArray).toEqual(["1", "2", "3", "a", "b", "c"]);
        expect(myArray.join('-')).toEqual('1-2-3-a-b-c');

        myArray.push('*');
        expect(myArray).toEqual(["1", "2", "3", "a", "b", "c", "*"]);

        let x = myArray.pop(); // removes last element and returns it
        expect(myArray).toEqual(["1", "2", "3", "a", "b", "c"]);
        expect(x).toBe("*");

        let y = myArray.shift(); // removes first element and returns it
        expect(myArray).toEqual(["2", "3", "a", "b", "c"]);
        expect(y).toBe("1");

        myArray.unshift('4', '5'); // inserts item(s) to the front of array
        expect(myArray).toEqual(["4", "5", "2", "3", "a", "b", "c"]);

        myArray = myArray.slice(1, 4); // slices out array items from array from [start index, end index)
        expect(myArray).toEqual(["5", "2", "3"]);

        myArray.reverse();
        expect(myArray).toEqual(["3", "2", "5"]);

        myArray.sort(); 
        expect(myArray).toEqual(["2", "3", "5"]);
    });

    it("should run Array sort with passed in function", function() {
        // Sorts by last letter of string
        const sortFn = (a : string, b : string) => { 
            if (a[a.length - 1] < b[b.length - 1]) {
              return -1; // Negative number => a < b, a comes before b
            } else if (a[a.length - 1] > b[b.length - 1]) {
              return 1; // Positive number => a > b, a comes after b
            }
            return 0; // Zero => a = b, a and b keep their original order
        };
        
        const myArray = ["Wind", "Rain", "Fire"];
        
        myArray.sort(sortFn); 
        expect(myArray).toEqual(["Wind", "Fire", "Rain"]);
    });

    it("should run Array functions pt2", function() {
        const a = ["a", "b", "a", "b", "a"];

        expect(a.indexOf("b")).toBe(1); // Returns first instance (from beginning) index of parameter
        expect(a.lastIndexOf("b")).toBe(3); // Returns first instance (from ending) index of parameter

        const a1 = ["a", "b", "c"];
        const a2 = a1.map((item) => item.toUpperCase()); // iterates thru each element and runs passed in function (modifying it)
        expect(a2).toEqual(['A', 'B', 'C']);

        const a3 = a1.flatMap((item) => [item.toUpperCase(), item.toLowerCase()]); 
        // iterates thru each element and runs passed in function (modifying it), then flattens map at the end
        expect(a3).toEqual(['A', 'a', 'B', 'b', 'C', 'c']); 

        const a4 = ["a", 10, "b", 20, "c", 30];
        const a5 = a4.filter((item) => typeof item === "number");
        expect(a5).toEqual([10, 20, 30]);

        const first = a4.find((item) => typeof item === "number"); // finds first item (element) where callback function returns true
        expect(first).toEqual(10);
        // Also exists findLast (same as above but finds last match)

        const firstIndex = a4.findIndex((item) => typeof item === "number"); // finds first item (index) where callback function returns true
        expect(firstIndex).toEqual(1);
        // Also exists findLastIndex (same as above but finds last match index)

        const a6 = [1, 2, 3];
        let isNum = (v) => typeof v === "number";
        expect(a6.every(isNum)).toBe(true); // every returns true only if all callback returns are true
        expect(a4.every(isNum)).toBe(false); 
        expect(a6.some(isNum)).toBe(true); // some returns true if at least 1 of the callback returns are true
        expect(a4.some(isNum)).toBe(true);
    });

    it("should run sparse Arrays", function() {
        const a = Array(5); // [ <5 empty items> ]

        // Consecutive commas in array literal:
        const b = [1, 2, , , 5];

        //Note: undefined in array is not considered the same as an empty reference, but:
        expect(b[2]).toBeUndefined();
        //since in array iteration methods, they will skip the empty elements:
        //expect(b.map(v => v+1)).toEqual([2, 3, , , 6]);
        //though Typescript does not allow this behavior
    });

    it("should run 2D Arrays", function() {
        const a = new Array(4);
        for (let i = 0; i < 4; i++) {
            a[i] = new Array(4);
            for (let j = 0; j < 4; j++) {
                a[i][j] = `[${i}, ${j}]`;
            }
        }

        expect(a[1][2]).toEqual('[1, 2]');
    });
});

describe("Testing Maps", () => {
    
    it("should run Map properties and functions", function() {
        const sayings = new Map(); // simple key/value pair system
        
        sayings.set("dog", "woof");
        sayings.set("cat", "meow");
        sayings.set("elephant", "toot");
        
        expect(sayings.size).toBe(3);
        expect(sayings.get("dog")).toEqual("woof");
        expect(sayings.has("bird")).toBe(false);
        sayings.delete("dog"); 
        expect(sayings.has("dog")).toBe(false);
    });

    it("should iterate through map", function() {
        const sayings = new Map(); // simple key/value pair system
        
        sayings.set("dog", "woof");
        sayings.set("cat", "meow");
        
        let out : string = "";

        for (const [key, value] of sayings) {
            out += `${key} goes ${value}\n`;
        }
        expect(out).toEqual(`dog goes woof\ncat goes meow\n`);
    });

    /* Comparing Objects to Maps:
    - The keys of an Object are Strings or Symbols, where they can be of any value for a Map.
    - You can get the size of a Map easily, while you have to manually keep track of size for an Object.
    - The iteration of maps is in insertion order of the elements.
    - An Object has a prototype, so there are default keys in the map. (This can be bypassed using map = Object.create(null). 
    - Performs better in scenarios involving frequent additions and removals of key-value pairs. */
});

describe("Testing Sets", () => {
    
    /* Set objects are collections of unique values. You can iterate its elements in insertion order. 
    A value in a Set may only occur once; it is unique in the Set's collection. - main difference from Arrays
    */
    it("should run Set properties and functions", function() {
        const mySet = new Set();
        mySet.add(1);
        mySet.add("some text");
        mySet.add("foo");

        expect(mySet.has(1)).toBe(true); // true
        mySet.delete("foo");
        expect(mySet.size).toBe(2);
    });

    it("should iterate through set", function() {
        const mySet = new Set();
        mySet.add(1);
        mySet.add("some text");
        mySet.add("foo");
        
        let out : string = "";

        for (const v of mySet) {
            out += `${v}\n`;
        }
        expect(out).toEqual(`1\nsome text\nfoo\n`);
    });

    it("should covert between sets and arrays", function() {
        let mySet = new Set([1, 2, 3, 4]); // Array -> Set

        expect(mySet.has(3)).toEqual(true);

        let myArr = Array.from(mySet);
        let myArr2 = [...mySet]; // This is using spread operator:
        /* The spread (...) syntax allows an iterable, such as an array or string, 
        to be expanded in places where zero or more arguments (for function calls) or elements (for array literals) are expected.
        */
        
        expect(myArr).toEqual([1, 2, 3, 4]);
        expect(myArr2).toEqual([1, 2, 3, 4]);      
    });

    /* Arrays vs Set:  
    -Deleting Array elements by value (arr.splice(arr.indexOf(val), 1)) is very slow.
       -> Set objects let you delete elements by their value. With an array, you would have to splice based on an element's index.
    -The value NaN cannot be found with indexOf in an array.
    -Set objects store unique values. You don't have to manually keep track of duplicates.
    */
});