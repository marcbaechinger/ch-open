lesson("Bad Parts", function() {

    learn("about some strange comparison behavior", function (){

        var myArray = [0];
        expect(myArray == myArray).toBe(true);
        expect(myArray == !myArray).toBe(FILL_ME_IN);

        myArray = [null, undefined, []];
        expect(myArray == ',,').toBe(FILL_ME_IN);

        expect(Math.min() < Math.max()).toBe(FILL_ME_IN);

        expect(NaN === NaN).toBe(FILL_ME_IN);
        expect(NaN !== NaN).toBe(FILL_ME_IN);

        expect('' == '0').toBe(FILL_ME_IN);
        expect(0 == '').toBe(FILL_ME_IN);
        expect(0 == '0').toBe(FILL_ME_IN);

        expect(false == 0).toBe(FILL_ME_IN);
        expect(false == '0').toBe(FILL_ME_IN);
        expect(false == 'false').toBe(FILL_ME_IN);
    });

    learn("about the quirks of semicolon insertion", function() {

        // Can you spot the difference in those functions below?

        var firstFunction = function() {
            return {
                event: "Workshop Days"
            };
        }

        var secondFunction = function() {
            return
            {
                event: "Workshop Days"
            };
        }

        expect(firstFunction()).toBe(FILL_ME_IN);
        expect(secondFunction()).toBe(FILL_ME_IN);
    });

    learn("about the quirks of variable hoisting", function (){

        var runCount = 0;
        var firstFunction = function(n) {
            for (var i = 0; i < n; i += 1) {
                console.log("Hello!");
                for (var i = 0; i < n; i += 1) {
                    console.log("I am iterating forward ...");
                    runCount++;
                }
            }
        }

        var secondFunction = function(n) {
            for (var i = 0; i < n; i += 1) {
                console.log("Hello!");
                for (var i = n; i > 0; i -= 1) {
                    console.log("I am iterating backward...");
                    runCount++;
                }
            }
        }

        firstFunction(2);
        expect(runCount).toBe(FILL_ME_IN);

        runCount = 0;
        //  secondFunction(2); // Run this at your own risk :-)
        expect(runCount).toBe(FILL_ME_IN);
    })
});
