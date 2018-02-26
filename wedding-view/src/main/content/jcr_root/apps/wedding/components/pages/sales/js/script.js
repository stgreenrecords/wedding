var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Sales = {};

    PORTAL.modules.Sales.selfSelector = "#sales-page-content";

    PORTAL.modules.Sales.init = function ($self) {

        console.log('Component: "Sales"');

    };

    return PORTAL;

})(PORTAL || {}, jQuery);