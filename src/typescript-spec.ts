describe("Testing Typescript specifics", () => {

    it("should have contextual typing", function() {
        // No type annotations here, but TypeScript can identify that this Array is composed of strings
        const names = ["Alice", "Bob", "Eve"];
        let str: string = "";
        // Contextual typing - dont need to specify the typing for functions here
        names.forEach((s) => { str += s + ' '; });

        expect(str).toEqual('Alice Bob Eve ');
    });

    it("should have defined object typing", function() {
        // The parameter's type annotation is an object type
        // z is an optional property of this object
        function shiftCoords(pt: { x: number, y: number; z?: number }) { // Note: can use either ;  or , to separate the properties
            pt.x++;
            pt.y++;
            pt.z !== undefined ? pt.z++ : pt.z = 0; // check for undefined when using optional properties
            return pt;
        }

        expect(shiftCoords({x: 1, y: 2, z: 3})).toEqual({x: 2, y: 3, z: 4});
        expect(shiftCoords({x: 1, y: 2})).toEqual({x: 2, y: 3, z: 0});
    });

    it("should have union types", function() {
        // The parameter's type annotation is a union of multiple types
        function parseID(ID : number | string) { 
            if (typeof ID === 'string') { // narrow the union type to be able to use methods that only applyt to some of the union's type
                ID = ID.toUpperCase();
            }
            return ID.toString().padStart(9, '0');
        }

        function getFirstThree(x: number[] | string) { // If a function applies to several of the types, then no narrowing is needed
            return x.slice(0, 3);
        }

        expect(parseID(42)).toEqual('000000042');
        expect(parseID('42')).toEqual('000000042');
        expect(parseID('42id')).toEqual('0000042ID');

        expect(getFirstThree('string')).toEqual('str');
        expect(getFirstThree([1,2,3,4])).toEqual([1,2,3]);

        /* NOTE: can also narrow types using typeof, instanceof and in checks against potential typings */
        interface Fish { swim: () => void };
        interface Bird { fly: () => void };
        
        function move(animal: Fish | Bird) {
            if ("swim" in animal) {
                return animal.swim();
            }
            
            return animal.fly();
        }
    });

    it("should be able to use interfaces", function() {
        // Predefine the structure of an object using interfaces
        /* TypeScript is only concerned with the structure of the value we passed to printCoord - 
            it only cares that it has the expected properties. 
        Being concerned only with the structure and capabilities of types is why we call TypeScript a structurally typed type system. */
        interface Point {
            x: number;
            y: number;
            z?: number
        }

        function shiftCoords(pt: Point) { // Now using an interface instead of using an object literal to define the parameter type
            pt.x++;
            pt.y++;
            pt.z !== undefined ? pt.z++ : pt.z = 0; // check for undefined when using optional properties
            return pt;
        }
           
        expect(shiftCoords({x: 1, y: 2, z: 3})).toEqual({x: 2, y: 3, z: 4});
        expect(shiftCoords({x: 1, y: 2})).toEqual({x: 2, y: 3, z: 0});
    });

    it("should be able to use type assertions", function() {
        // if you want to assert a value/object as a given type that TS wont know, you can assert it yourself using as keyword
        let myString = "myString".substring(1, 3) as string;
        
        // cant assert a type it cannot be:
        //const x = "hello" as number;

        expect(typeof myString === 'string').toEqual(true);
    });

    it("should be able to use type literals", function() {
        // numbers and strings can be defined with literals (const)
        const constantString = "Hello World"; // can only be of type 'Hello World'

        function printText(s: string, alignment: "left" | "right" | "center") {
            return s + ' ' + alignment;
        }

        function compare(a: string, b: string): -1 | 0 | 1 { // numeric literal types example
            return a === b ? 0 : a > b ? 1 : -1;
        }

        expect(printText(constantString, 'left')).toEqual("Hello World left");
        expect(compare('12', '11')).toEqual(1);
    });

    it("should be able to use non-null assert operator !", function() {
        function times3(x?: number | null) {
            // Asserting that variable x is not going to be null or undefined, but in this instance, x could be null
            if (x !== null)
                return x! * 3;
            else
                return null;
        }

        expect(times3(2)).toEqual(6);
        expect(times3(null)).toEqual(null);
    });
});