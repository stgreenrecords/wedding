
var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.ScriptHeader = {};

    PORTAL.modules.ScriptHeader.selfSelector = "#header-block";

    PORTAL.modules.ScriptHeader.init = function ($self) {

        console.log('Component: "#header-block"');

        (function(){ //

            // document.querySelector('#main-menu_ul').addEventListener('click',(e)=>{
            //     var ff = e.target();
            //     console.log( e.target());
            //     ff.addClass('menu_btn_active');
            //     e.currentTarget().childNodes();
            //     console.log( e.currentTarget());
            // });
            //
            // $self.find('#main-menu_ul').on('click', (e)=>{
            //     console.log( e.target());
            // });

            if (document.location.pathname === '/content/wedding/tenders/tender.html') {
                $self.find('.tenders-main_btn').addClass('menu_btn_active');
                console.log('BTN WORK!!!!!!!!!!!!!!!!!!!!!!!!!!!');
            }

            var menuObj = {};
            menuObj.catalog =  $self.find('.catalog-main_btn');
            menuObj.tenders =  $self.find('.tenders-main_btn');
            menuObj.events =  $self.find('.events-main_btn');
            menuObj.weddings =  $self.find('.real_weddings-main_btn');

            switch(document.location.pathname) {
                case '/content/wedding/catalog.html':
                    removeCl();
                    menuObj.catalog.addClass('menu_btn_active');
                    break;
                case '/content/wedding/tenders.html':
                    removeCl();
                    menuObj.tenders.addClass('menu_btn_active');
                    break;
                case '/content/wedding/sales.html':
                    removeCl();
                    menuObj.events.addClass('menu_btn_active');
                    break;
                case '/content/wedding/real-weddings.html':
                    removeCl();
                    menuObj.weddings.addClass('menu_btn_active');
                    break;
            }

            function removeCl() {
                Object.keys(menuObj).forEach(key=> menuObj[key].removeClass('menu_btn_active'));
            }


        }()); // end -  ---

        console.log(document.location.pathname);
    };

    return PORTAL;

})(PORTAL || {}, jQuery);

