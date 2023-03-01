import * as loops from './loops';

describe("Testing loops", () => {
    
    it("should run for loops, returning even number count", function() {
        expect(loops.forLoop(6)).toBe(3);
    });

    it("should run for in loops, return concatenated array as string", function() {
        expect(loops.forInLoop(['a', 'b', 'c'])).toBe('a, b, c');
    });

    it("should run while loops with breaks in them, return number if <= 100", function() {
        expect(loops.whileLoopBreakContinue(99)).toBe(99);
    });

    it("should run while loops with breaks in them, return 100 if number is > 100", function() {
        expect(loops.whileLoopBreakContinue(101)).toBe(100);
    });
});