(function (global) {

    // Must load jasmine to use this plugin
    if (!global.jasmine) throw new Error('jasmine-rowtests: Requires jasmine to run.');

    global.given = function (testData) {
        /// <summary>
        /// Run a single spec with multiple input data sets. Chain the "it" function onto the result.
        /// i.e. 
        ///	    given([
        ///         ['hello', 'world'], 
        ///	        ['foo', 'bar']
        ///	    ])
        ///     .it('should do something with param1 and param2', function(param1, param2) {
        ///	        ... 
        ///	    });
        /// </summary>
        /// <param name="testData">An array of arrays of data. Each inner array will be applied as parameters
        /// to the spec function.</param>
        if (!testData || !testData.length)
            throw new Error('No data provided for given()');

        function getSpecName(name, params) {
            return 'given (' + getParamNames(params) + ') - ' + name;
        }

        function getTestFunction(func, data) {
            // Warning: Closure Voodoo
            return function () { func.apply(global, data); };
        }

        function getParamNames(params) {
            var results = new Array();
            for (var i = 0; i < params.length; i++) {
                var value = params[i];
                results.push(
                    typeof value === 'undefined' ? 'undefined'
                        : value === null ? 'null'
                            : typeof value === 'function' ? 'function(){...}'
                                : typeof value === 'string' ? "'" + value + "'"
                                    : value.toString());
            }
            return results.join(', ');
        }
        
        function runForEachDataItem(description, func, action) {
            for (var i = 0; i < testData.length; i++) {
                var currentData = testData[i] != null && testData[i].push && testData[i].length > 0 ? testData[i] : [testData[i]],
                    currentSpecName = getSpecName(description, currentData),
                    functionWithData = getTestFunction(func, currentData);

                action(currentSpecName, functionWithData);
            }
        }

        return {
            it: function (description, func) {
                runForEachDataItem(description, func, function (specName, funcWithData) {
                    global.it(specName, funcWithData);
                });
            },
            xit: function (description, func) {
                runForEachDataItem(description, func, function (specName, funcWithData) {
                    global.xit(specName, funcWithData);
                });
            }
        };
    };
})(window);