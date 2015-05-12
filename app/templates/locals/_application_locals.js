'use strict';
/**
 * @description application local variables which are provided to
 *              all templates rendered within the application.
 * @type {Object}
 */
module.exports = {
    applicationName: '<%= _.slugify(applicationName) %>'
};