var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.LandingPartners = {};

    PORTAL.modules.LandingPartners.selfSelector = "#landing-partners-page-content";

    PORTAL.modules.LandingPartners.init = function ($self) {

        console.log('Component: "LandingPartners"');

        (function(){
            console.log("ytkjlasjfd");
            var partners_div = document.querySelectorAll(".with-us-div");

            for (var i =0 ; i<partners_div.length; i++){
                partners_div[i].style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_"+(6-i)+".jpg')";

            }

        })();

    };

    return PORTAL;

})(PORTAL || {}, jQuery);