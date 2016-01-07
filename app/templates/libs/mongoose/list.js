'use strict';

//dependencies

module.exports = exports = function(schema /*, options*/ ) {

    /**
     * @function
     * @description extend mongoose collection with static list method to handle both
     *              search and pagination
     * @param  {Request}   request valid express http request
     * @param  {Function} done    a callback to invoke on success or error
     * @return {Object}           
     */
    schema.statics.list = function(request, done) {
        //reference request query
        var queryParams = request.query;
        var result = {};

        //handle search request
        if (queryParams.q) {
            var skip = queryParams.skip || 0;
            var limit = queryParams.limit || 10;
            var sort = request.mquery ? request.mquery.sort : undefined;

            var query = this.search(queryParams.q);
            if (sort) {
                query.sort(sort);
            }

            query.skip(skip).limit(limit).exec(function(error, models) {
                //handle error
                if (error) {
                    done(error);
                }

                //handle success
                else {
                    //prepare result
                    result[this.collection.name] = models;
                    result.pages = skip;
                    result.count = limit;

                    done(null, result);
                }
            }.bind(this));
        }

        //handle pagination request
        else {
            this.paginate(request, function(error, models, pages, total) {
                //handle error
                if (error) {
                    done(error);
                }
                //handle success
                else {
                    //prepare result
                    result[this.collection.name] = models;
                    result.pages = pages;
                    result.count = total;

                    done(null, result);
                }
            }.bind(this));
        }
    };

};