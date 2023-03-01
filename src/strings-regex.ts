describe("Testing Strings", () => {
    
    it("should express string literals the same", function() {
        expect('myName').toEqual("myName"); 
    });

    it("should run escape sequences", function() {
        expect("\xA9").toEqual("©"); // hexadecimal esc seq
        expect("\u00A9").toEqual("©"); // unicode esc seq
    });    

    it("should run String object methods", function() {
        const s = new String("Example string literal");

        expect(s.charAt(0)).toEqual("E"); 
        expect(s.includes('lite')).toEqual(true); 
        expect(s.split(' ')).toEqual(['Example', 'string', 'literal']); 
        expect(s.substring(8)).toEqual('string literal'); 
        expect(s.substring(8, 13)).toEqual('string'); 
        expect(s.toUpperCase()).toEqual("EXAMPLE STRING LITERAL"); 

        // Also methods like toLowerCase() and trim()
    });  

    it("should express multiline string literals", function() {
        expect("string text line 1\n\string text line 2").toEqual(`string text line 1
        string text line 2`); 
    });

    it("should embed expressions into multiline string literals", function() {
        let num : number = 5;
        expect(`string text line ${num}: ...`).toEqual(`string text line 5: ...`); 
    });
});

describe("Testing Regex expressions", () => {   

    it("should create reg expression using constant", function() {
        const regex1 = /[A-z]/g; // [] matches anything in that category, g is global indicator
        
        expect("Atta 1".replace(regex1, "0")).toEqual('0000 1'); 
    });

    it("should run RegExp obj", function() {
        const regex2 = new RegExp("/d(b+)d/ig"); // + matches, i flag ignores case 
        
        expect("cdbbdbsbzDBBD".replace(regex2, ';')).toEqual('c;bsbz;');
    });

    // . character acts an wildcard in regex
    // \d - digits, \w - digits and latin letters, \s - whitespace, \t - tab, \n - newline, \r - carriage return, \f -line feed
    // ^ negates the following grouping i.e. [^xyz] == not x, y, z
    // \ escapes a character, i.e. \* escapes '*'
    // \d{#} - expects a series of prior grouping, i.e \d{4} looks for 4 digits in a row
    // \d* - matches prior grouping 0 or more times
    // \d+ - matches prior grouping 1 or more times
    // \d? - matches prior grouping 0 or 1 times
});