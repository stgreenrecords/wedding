var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.UserModel = {};

    PORTAL.modules.UserModel.selfSelector = "#profile";

    PORTAL.modules.UserModel.init = function ($self) {
        console.log('Component: "UserModel"');

        initListeners($self);

        $(document).ready(function () {
            registerListener($self);
        });
    };

    function initListeners ($self) {
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

        $self.find('.edit-link button').click(function() {
            var $form = $self.find('#user-profile-form');
            var hideClass = 'hide-person-contact';
            if (!$form || !$form.length) {
                return;
            }
            $self.find('.person-contact .person-contact-block .data-value').each(function(index, el) {
                var $element = $(el);
                var key = $element.data('key');
                var value = getOrUpdateInfoField($element);
                var $input = $element.siblings(`input[data-type=${key}]`);
                $input.attr('value', value);
                $element.toggleClass(hideClass);
                $input.toggleClass(hideClass);
            });
            $form.toggleClass(hideClass);
            $(this).toggleClass(hideClass);
        });
    }

    function registerListener($self) {
        PORTAL.modules.LoginRegistration.registerListener(initUserProfileInfo, $self);
    }

    function initUserProfileInfo(userInfo) {
        var $self = this;
        Object.keys(userInfo).forEach(function (key) {
            var $infoElement, text;
            if (key === 'firstName') {
                $infoElement = $self.find('.data-value[data-key=name]');
                text = userInfo['firstName'] && userInfo['lastName'] && `${userInfo['firstName']} ${userInfo['lastName']}` || '';
            } else {
                $infoElement = $self.find(`.data-value[data-key=${key}]`);
                text = userInfo[key] || '';
            }
            if ($infoElement && $infoElement.length) {
                return;
            }
            getOrUpdateInfoField($infoElement, text);
        })
    }

    function getOrUpdateInfoField($field, value) {
        return $field.tagName === 'a' ? $field.attr('href', value) : $field.text(value);
    }

    return PORTAL;

})(PORTAL || {}, jQuery);