var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.BaseMail = {};

    PORTAL.modules.BaseMail.selfSelector = "#base-mail-page-content";

    PORTAL.modules.BaseMail.init = function ($self) {

        console.log('Component: "BaseMail"');

        var richtext = $(".richtext textarea");

        richtext.trumbowyg({
            lang: 'ru'
        });

        $('.recipient-container').multifield();

        $self.find("button.save").click(function(){
            $.ajax({
                url: "/services/rest.mail.json",
                type: "PUT",
                data: {
                    title : $self.find(".new-mail-submit").val(),
                    subject : $self.find(".new-mail-submit").val(),
                    text : richtext.trumbowyg('html'),
                    recipients : [],
                    allUsers : $self.find(".new-mail-submit").val(),
                    allPartners : $self.find(".new-mail-submit").val()
                }
            });
        });


    };

    return PORTAL;

})(PORTAL || {}, jQuery);