var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.AdminMail = {};

    PORTAL.modules.AdminMail.selfSelector = "#admin-mail-page-content";

    PORTAL.modules.AdminMail.init = function ($self) {

        console.log('Component: "AdminMail"');

        $self.find("input.new-mail-submit").click(function(){
            $.ajax({
                url: "/services/rest.mail.json",
                type: "POST",
                data: {
                    title : $self.find(".new-mail-submit").val()
                }
            });
        });

    };

    return PORTAL;

})(PORTAL || {}, jQuery);