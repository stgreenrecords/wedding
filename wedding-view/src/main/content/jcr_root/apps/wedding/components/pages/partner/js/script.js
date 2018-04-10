var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Partner = {};

    PORTAL.modules.Partner.selfSelector = "#partner-page-content";

    PORTAL.modules.Partner.init = function ($self) {

        console.log('Component: "Partner"');

        $self.find('#gg').click(function () {
            console.log('so good');
            alert('so good');
        });

        $self.find('#gg').on('click',function () {
            console.log('so very good');
            alert('so very good');
        });

    };

    return PORTAL;

})(PORTAL || {}, jQuery);