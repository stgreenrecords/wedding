var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Landing = {};

    PORTAL.modules.Landing.selfSelector = "#landing-page-content";

    PORTAL.modules.Landing.init = function ($self) {

        console.log('Component: "Landing"');

        $("textarea").trumbowyg({
           lang: 'ru'
        });


    };

    return PORTAL;

})(PORTAL || {}, jQuery);