define([
    'app'
], function (app) {
    'use strict';

    return app
        .constant('BASE_DIRECTIVES_PATH', '/app/render/directives/')
        .constant('BASE_MODULES_PATH', '/app/render/modules/');
});
