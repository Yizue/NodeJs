// Importing specific variables and functions
//import { name, multiply } from './modules';

// Importing using module object
import * as modules from './modules';

describe("Testing module imports/exports", () => {   

    it("should access imported module variables and functions", async function() {
        expect(modules.name).toEqual("square");
        expect(modules.name2).toEqual("triangle");
        expect(modules.multiply(3, 4)).toEqual(12);
        expect(modules.newMultiply(5, 4)).toEqual(20);
    });

    it("should access imported module classes", async function() {
        let mySquare = new modules.Square(4, 6);

        expect(mySquare.getArea()).toEqual(24);
    });
});