'use strict';

/**
 * <%= className %> model
 *
 * @description :: Server-side model for managing <%= className %>
 */

//dependencies
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
<%if(hasRefs){%>var ObjectId = Schema.Types.ObjectId;<%}%>
<%if(hasMixed){%>var Mixed = Schema.Types.Mixed;<%}%>

//<%= className %> Schema
var <%= className %>Schema = new Schema({
    <%_(fields).forEach(function (definition, field){
    if(_.keys(fields).indexOf(field) < _.size(fields) - 1){%>
    <%= field %>: {
    <%_(definition).forEach(function (value, name){
    if(_.keys(definition).indexOf(name) < _.size(definition) - 1){%>
        <%= name %>: <%= value %>,
    <%}else{%>
        <%= name %>: <%= value %>
    <%}});%>
    },
    <%}else{%>
    <%= field %>: {
    <%_(definition).forEach(function (value, name){
    if(_.keys(definition).indexOf(name) < _.size(definition) - 1){%>
        <%= name %>: <%= value %>,
    <%}else{%>
        <%= name %>: <%= value %>
    <%}});%>
    }
    <%}});%>
});

//apply plugins
<%= className %>Schema.plugin(require('mongoose-paginate')); 
<%= className %>Schema.plugin(require('mongoose-timestamp'));

//exports <%= className %> model
module.exports = mongoose.model('<%= className %>', <%= className %>Schema);