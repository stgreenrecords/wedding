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

        $self.find("button[name='save']").click(function(){
        var recipients = [];
        $(".recipient-container input[class='form-control']").each(function(item){
        recipients.push($(this).val());
        });
            $.ajax({
                url: "/services/rest.mail/update.json",
                type: "PUT",
                data: {
                    id : location.href.substr(location.href.lastIndexOf("/") + 1).replace(".html",""),
                    subject : $self.find("input[name='subject']").val(),
                    text : richtext.trumbowyg('html'),
                    recipients : recipients,
                    allUsers : $self.find("input[name='allUsers']").val(),
                    allPartners : $self.find("input[name='allPartners']").val()
                }
            });
        });


    };

    return PORTAL;

})(PORTAL || {}, jQuery);