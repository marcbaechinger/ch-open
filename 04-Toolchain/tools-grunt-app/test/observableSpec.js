describe("Testing observable", function() {
	var observable;

	beforeEach(function() {
		observable = new Observable();
	});

	it("should have a public api", function() {
		expect(observable).toBeDefined();
		expect(observable.bind).toBeDefined();
		expect(observable.unbind).toBeDefined();
		expect(observable.emit).toBeDefined();
	});
	
	it("should be able to bind event listeners", function() {
		var payload = "adas";
		observable.bind("action", function (data) {
			expect(data).toEqual(data);
		});
		// trigger event
		observable.emit("action", payload);
	});
	
	it("should bind the observable to 'this' inside the listener", function() {
		observable.bind("action", function () {
			expect(this).toEqual(observable);
		});
		// trigger event
		observable.emit("action");
	});
	
	it("should be able to unbind event listeners", function() {
		var payload = "adas",
			event = "action",
			listener = function (data) {
				expect(1).toEqual(2);
			};
		observable.bind(event, listener);
		observable.unbind(event, listener);
		// trigger event "action"
		observable.emit(event, payload);
	});
	
});