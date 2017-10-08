var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.LandingPage = {};

    PORTAL.modules.LandingPage.selfSelector = ".main-bg";

    PORTAL.modules.LandingPage.init = function ($self) {
        console.log('Component: "LandingPage"');

        console.log(PORTAL.utils.categories());
    };

    return PORTAL;

})(PORTAL || {}, jQuery);
