# jasmine-rowtests

This [Jasmine JS](https://github.com/pivotal/jasmine) plugin allows you to test one spec against multiple possible data inputs and will generate a unique spec for each input row.

## Installation

1. Download jasmine-rowtests
2. Place the file somewhere your Jasmine Specrunner can reference.
3. Include jasmine-rowtests.js after you include jasmine.js
4. Begin using it in tests! (See usage details below)

## Usage

Creating row tests is pretty straight forward via the global `given(...)` function and chaining that onto an `it(params)` function. jasmine-rowtests supports two main ways of specifying row tests. For simple, one-paramter row tests, you can pass a single array to the `given(...)` function that contains one item per row as in the following example:

```js
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
        
    });
```

To create row tests for multi-parameter specs, pass an array with one array per row of parameters as in the following example:

```js
    describe('My module', function() {
        
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
```

This will generate one spec per row in your row test such as the following:

```
    My module
        given (null) - should be falsy
        given (undefined) - should be falsy
        given ('') - should be falsy
        given (0) - should be falsy
        given (false) - should be falsy
        given (true, false) - should be greater than
        given (5, 0) - should be greater than
        given (true, 0) - should be greater than
        given ('test', '') - should be greater than
```