
var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.ScriptHeader = {};

    PORTAL.modules.ScriptHeader.selfSelector = "#header-block";

    PORTAL.modules.ScriptHeader.init = function ($self) {

        console.log('Component: "#header-block"');

            var menuObj = {};
            menuObj.catalog =  $self.find('.catalog-main_btn');
            menuObj.tenders =  $self.find('.tenders-main_btn');
            menuObj.events =  $self.find('.events-main_btn');
            menuObj.weddings =  $self.find('.real_weddings-main_btn');

            switch(document.location.pathname) {
                case '/content/wedding/catalog.html':
                    menuObj.catalog.addClass('menu_btn_active');
                    break;
                case '/content/wedding/tenders.html':
                    menuObj.tenders.addClass('menu_btn_active');
                    break;
                case '/content/wedding/sales.html':
                    menuObj.events.addClass('menu_btn_active');
                    break;
                case '/content/wedding/real-weddings.html':
                    menuObj.weddings.addClass('menu_btn_active');
                    break;
            }



    };

    return PORTAL;

})(PORTAL || {}, jQuery);

