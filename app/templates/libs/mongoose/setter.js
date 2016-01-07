'use strict';

//dependencies
var _ = require('lodash');

module.exports = exports = function(schema /*, options*/ ) {

    /**
     * @description extend mongoose ObjectId schema type with object setter
     */
    schema.eachPath(function(path, schemaType) {
        //handle auto set schema options
        if (schemaType.options && schemaType.options.autoset) {
            //prevent custom setter overrides
            if (!schemaType.options.set) {
                //add object setter
                schemaType.options.set = function(val) {
                    //handle auto set for array values
                    if (_.isArray(val)) {

                        val = _.map(val, function(v) {
                            return v._id ? v._id : v;
                        });

                        return _.compact(val);
                    }

                    //handle auto set for non array values
                    else {
                        return val._id ? val._id : val;
                    }
                };
            }
        }

    });
};