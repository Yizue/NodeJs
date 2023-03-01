import { altTryCatch } from "./control-flow-error-handling";
import cfeh from './control-flow-error-handling';

describe("Testing control flow", () => {
    
    describe("Testing if else statements", function() {
        let c = new cfeh();

        it("should return string if I pass a string", function() {
            expect(c.ifAndElse("42")).toBe("string");
        });

        it("should return number if I pass a number", function() {
            expect(c.ifAndElse(42)).toBe("number");
        });

        it("should return unknown if I pass anything else", function() {
            expect(c.ifAndElse(true)).toBe("unknown");
        });
    });
});

describe("Testing error handling", () => {
    
    describe("Testing throw and catch operation", function() {
        let spy: any, spyFinally : any;
        let c: cfeh;

        beforeEach(function() {
            c = new cfeh();
            spy = spyOn(c, 'ifAndElse');
            spyFinally = spyOn(c, 'fin');
        });

        it("should not invoke catch with no array exception thrown, and finally is called regardless", function() {
            c.tryAndCatchFinally(0);

            expect(spy).not.toHaveBeenCalled();
            expect(spyFinally).toHaveBeenCalled();
        });

        it("should invoke catch with an array exception thrown, and finally is called regardless", function() {
            c.tryAndCatchFinally(12);

            expect(spy).toHaveBeenCalled();
            expect(spyFinally).toHaveBeenCalled();
        });
    });

    describe("Testing throw and catch operation, using passed mocked functions", function() {
        let spy: any, spyFinally : any;

        beforeEach(function() {
            spy = jasmine.createSpy('spy');
            spyFinally = jasmine.createSpy('spyFinally');
        });

        it("should not invoke catch with no array exception thrown, and finally is called regardless", function() {
            altTryCatch(0, spy, spyFinally);

            expect(spy).not.toHaveBeenCalled();
            expect(spyFinally).toHaveBeenCalled();
        });

        it("should invoke catch with an array exception thrown, and finally is called regardless", function() {
            altTryCatch(12, spy, spyFinally);

            expect(spy).toHaveBeenCalled();
            expect(spyFinally).toHaveBeenCalled();
        });
    });
});
