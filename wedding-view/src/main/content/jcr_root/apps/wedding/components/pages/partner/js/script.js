var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Partner = {};

    PORTAL.modules.Partner.selfSelector = "#partner-page-content";

    PORTAL.modules.Partner.init = function ($self) {

        console.log('Component: "Partner"');

        $self.find('gg').click(function () {
            console.log('so good');
            alert('so good');
        });

        $self.find('gg').on('click', function () {
            console.log('so very good');
            alert('so very good');
        });
        var fuck = sessionStorage.getItem("firstName");

        console.dir(fuck);

        $self.find('.partner_name').text(sessionStorage.getItem('firstName')+" "+ sessionStorage.getItem('lastName'));


        $self.find('#partner_akcii_btn').on('click',function (){
            $self.find('#partner_about_oneself').addClass('hidden_full');
            $self.find('#partner_akcii').removeClass('hidden_full');
        });

        $self.find('#partner_about_oneself_btn').on('click',function (){
            $self.find('#partner_akcii').addClass('hidden_full');
            $self.find('#partner_about_oneself').removeClass('hidden_full');
        });

    };

    return PORTAL;

})(PORTAL || {}, jQuery);