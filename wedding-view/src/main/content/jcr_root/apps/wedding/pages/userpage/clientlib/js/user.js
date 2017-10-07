var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.UserModel = {};

    PORTAL.modules.UserModel.selfSelector = ".user-page-block";

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
        })


    };

    return PORTAL;

})(PORTAL || {}, jQuery);