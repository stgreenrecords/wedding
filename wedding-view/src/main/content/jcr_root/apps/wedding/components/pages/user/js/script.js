var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.User = {};

    PORTAL.modules.User.selfSelector = "#user-page-content";

    PORTAL.modules.User.init = function ($self) {

        console.log('Component: "User"');

    };

    return PORTAL;

})(PORTAL || {}, jQuery);