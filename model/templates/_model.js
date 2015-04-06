'use strict';

/**
 * <%= classPlural %> Model
 *
 * @description :: Server-side model for managing <%= className %>.
 */

 //dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

//<%= className %> Schema
var <%= className %>Schema = new Schema({});

//apply plugins
<%= className %>Schema.plugin(require('mongoose-paginate')); 
<%= className %>Schema.plugin(require('mongoose-timestamp'));

//exports <%= className %> model
module.exports = mongoose.model('<%= className %>', <%= className %>Schema);