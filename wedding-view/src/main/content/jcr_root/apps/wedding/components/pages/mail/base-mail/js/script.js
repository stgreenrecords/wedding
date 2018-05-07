var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.BaseMail = {};

    PORTAL.modules.BaseMail.selfSelector = "#base-mail-page-content";

    PORTAL.modules.BaseMail.init = function ($self) {

        console.log('Component: "BaseMail"');

        $(".richtext textarea").trumbowyg({
           lang: 'ru'
        });

        $('.recipient-container').multifield();

        $self.find("input.new-mail-submit").click(function(){
            $.ajax({
                url: "/services/rest.mail.json",
                type: "PUT",
                data: {
                    title : $self.find(".new-mail-submit").val(),
                    subject : $self.find(".new-mail-submit").val(),
                    text : $self.find(".new-mail-submit").val(),
                    recipients : [],
                    allUsers : $self.find(".new-mail-submit").val(),
                    allPartners : $self.find(".new-mail-submit").val()
                }
            });
        });


    };

    return PORTAL;

})(PORTAL || {}, jQuery);