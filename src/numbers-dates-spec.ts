describe("Testing JS numbers", () => {
    
    describe("Testing number literals", () => {   
        
        /*it("should express binary numbers", function() {  
            expect(parseInt('0b00000000011111111111111111111111', 2)).toBe(8388607); // 0b or 0B is binary literal notation
        });
    
        it("should express octal numbers", function() {  
            expect(parseInt('0o644', 8)).toBe(420); // 0o or 0O is octal literal notation
        });

        it("should express hexadecimal numbers", function() {  
            expect(parseInt('0x123456789ABCDEF', 16)).toBe(81985529216486900); // 0x or 0X is hexadecimal literal notation
        });*/

        it("should express exponentiated numbers", function() {  
            expect(1e3).toBe(1000); // e<#> = 10 to the power of <#>
            expect(175e-2).toBe(1.75); 
        });
    });

    describe("Testing Number object", () => {   

        it("should express inbuilt limits and values of Number object", function() {
            expect(Number.MAX_VALUE).toBe(1.7976931348623157e+308); 
            expect(Number.MIN_VALUE).toBe(5e-324); 
            expect(Number.NaN).toEqual(NaN); 
            //Number.NEGATIVE_INFINITY and Number.POSITIVE_INFINITY returned on overflow operations
            expect(Number.EPSILON).toBeGreaterThan(0); // Infinitesimal value
            expect(Number.EPSILON).toBeLessThan(1e-15);
        });
    
        it("should run inbuilt functions of Number object", function() {
            expect(Number.parseFloat('3.24')).toBe(3.24); // same as global parseFloat
            expect(Number.parseInt('3')).toBe(3); // same as global parseInt
            expect(Number.isInteger(3)).toBe(true); // same as global parsefloat
            expect(Number.isNaN(3)).toBe(false); // more robust than global isNaN
            expect(Number.isNaN(3)).toBe(false); // more robust than global isNaN
        });    
    });

    describe("Testing Math object", () => {   

        it("should express Math.PI", function() {
            expect(Math.PI).toBeGreaterThan(3.14);  
            expect(Math.PI).toBeLessThan(3.15);  
        });
    
        it("should run inbuilt functions of Math object", function() {
            expect(Math.abs(-14)).toBe(14);

            expect(Math.abs(Math.sin(2 * Math.PI))).toBeLessThan(1e-15); 
            // Trig functions : sin(), cos(), tan(), sinh(), cosh(), tanh(), asinh(), acosh(), atanh()

            expect(Math.pow(2, 3)).toBe(8); 
            expect(Math.log(Math.exp(3))).toBe(3); // log(x) == ln(x), exp(x) == e^x, log10() also exists 

            expect(Math.floor(Math.PI)).toBe(3); 
            expect(Math.ceil(Math.PI)).toBe(4); 

            expect(Math.round(Math.PI)).toBe(3); 
            expect(Math.trunc(Math.PI)).toBe(3); 

            expect(Math.sqrt(16)).toBe(4); 

            expect(Math.min(1, 3, 2)).toBe(1); 
            expect(Math.max(1, 3, 2)).toBe(3); 

            // Also exists Math.random()
        });    
    });
});

describe("Testing JS Dates object", () => {
    //JavaScript handles dates similarly to Java. 
    //The two languages have many of the same date methods, 
    //and both languages store dates as the number of milliseconds since January 1, 1970, 00:00:00
    
    it("should able to use Date methods", function() { 
        // let d = new Date(); no parameters : returns today's date
        let d = new Date(2022, 4, 14); // YYYY/MM/DD
        let Xmas95 = new Date("December 25, 1995 13:30:00"); // Date and HR:MIN:SEC
        let Xmas22 = new Date(2022, 11, 25, 9, 30, 0); // YYYY, MM, DD, HR, MIN, SEC
        const ipoDate = new Date();

        expect(Xmas95.getFullYear()).toBe(1995); 
        expect(Xmas22.getMonth()).toBe(11); //Jan is 0 but first day is 1
        d.setHours(1);
        expect(d.getHours()).toBe(1); 
        ipoDate.setTime(Date.parse("Aug 9, 1995"));
        expect(ipoDate.getFullYear()).toBe(1995);
        expect(ipoDate.getDate()).toBe(9); 
        expect(ipoDate.getDay()).toBe(3); // Returns number index of day of week, Sunday being 0, and Saturday being 6 

        // Also method getTime() - returns the number of milliseconds since January 1, 1970, 00:00:00
    });
});