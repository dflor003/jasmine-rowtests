describe('My module', function() {

	given([
		null,
		undefined,
		'',
		0,
		false])
	.it('should be falsy', function(value) {
		expect(value).toBeFalsy();
	});
	
	given([
		[true, false],
		[5, 0],
		[true, 0],
		['test', '']
	])
	.it('should be greater than', function(first, second) {
		expect(first).toBeGreaterThan(second);
	});
		
});