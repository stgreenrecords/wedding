
var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.ScriptHeader = {};

    PORTAL.modules.ScriptHeader.selfSelector = "#header-block";

    PORTAL.modules.ScriptHeader.init = function ($self) {

        console.log('Component: "#header-block"');

        (function(){ //

            document.querySelector('#main-menu_ul').addEventListener('click',(e)=>{
                var ff = e.target();
                console.log( e.target());
                ff.addClass('menu_btn_active');
                e.currentTarget().childNodes();
                console.log( e.currentTarget());
            });

            $self.find('#main-menu_ul').on('click', (e)=>{
                console.log( e.target());
            });

        }()); // end -  ---
    };

    return PORTAL;

})(PORTAL || {}, jQuery);

