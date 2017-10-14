var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.UserModel = {};

    PORTAL.modules.UserModel.selfSelector = "#profile";

    PORTAL.modules.UserModel.init = function ($self) {
        console.log('Component: "UserModel"');

        $self.find(".avatar-submit").click(function(){
            var $input = $(".avatar-file");
            var formData = new FormData;

            formData.append('avatar-image', $input.prop('files')[0]);

            $.ajax({
                url: '/services/uploadImg',
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    alert(data);
                }
            });
        });

        $('#profile .edit-link button').click(function() {
            console.log('Invoke!!');
            $('#profile .person-contact .person-contact-block .data-value').each(function(index, el) {
                var key = $(el).data('key');
                console.log(key);
            });
        });
    };

    return PORTAL;

})(PORTAL || {}, jQuery);