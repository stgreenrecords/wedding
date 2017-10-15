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
            $self.find('.data-value').each(function(index, el) {
                var $element = $(el);
                var key = $element.data('key');
                var value = getOrUpdateInfoField($element);
                var $container = $element.parent('.data-container');
                var $input = $container.length
                    ? $container.siblings('.data-container').find(`[data-type=${key}]`)
                    : $element.siblings(`[data-type=${key}]`);
                $input.length && $input[0].tagName === 'INPUT'
                    ? $input.attr('value', value)
                    : $input.text(value);
                $element.addClass(hideClass);
                $element.parent('.data-container').addClass(hideClass);
            });
            var $inputs = $self.find('[data-type]');
            $inputs.removeClass(hideClass);
            $inputs.parent('.data-container').removeClass(hideClass);
            $form.toggleClass(hideClass);
            $(this).toggleClass(hideClass);
        });

        $self.find('#user-profile-form .update-profile').click(function (event) {
            event.preventDefault();
            var url = $self.find('#user-profile-form').data('url');
            if (!url) {
                return;
            }
            var formData = new FormData;
            var data = {};
            $self.find('[data-type]').each(function(index, field) {
                var $field = $(field);
                if ($field.attr('type') === 'file') {
                    putBinary(formData, $field);
                }
                data[$field.data('type')] = getInputValue($field);
            });
            formData.append('data', JSON.stringify(data));
            formData.append('userID', data.userID);
            $.ajax({
                url: url,
                data: formData,
                processData: false,
                contentType: false,
                type: 'POST',
                success: function (data) {
                    console.log(data);
                    location.reload();
                }
            });
        })
    }

    function putBinary(formData, $field) {
        var file = $field.prop('files')[0];
        if ($field.data('type') === 'avatar' && file) {
            return formData.append('avatar',  file);
        }
        Array.from($field.prop('files')).forEach(function (element, index) {
            formData.append(`portfolio-${index}`, element);
        });
    }

    function registerListener($self) {
        PORTAL.modules.LoginRegistration.registerListener(initUserProfileInfo, $self);
    }

    function initUserProfileInfo(userInfo) {
        var $self = this;
        Object.keys(userInfo).forEach(function (key) {
            if (key === 'userID') {
                $self.find('.user-id[data-type=userID]').val(userInfo[key]);
                return;
            }
            var $infoElement = $self.find(`.data-value[data-key=${key}]`);
            var text = userInfo[key] || '';
            if (!$infoElement || !$infoElement.length) {
                return;
            }
            key === 'avatar' || key === 'portfolio'
                ? updateImage($infoElement, userInfo, key === 'avatar')
                : getOrUpdateInfoField($infoElement, text);
        });
        $self.removeClass('hide-person-contact');
    }

    function getOrUpdateInfoField($field, value) {
        if (value !== undefined) {
            return $field.length && $field[0].tagName === 'A' ? setLinkValue($field, value) : $field.text(value);
        }
        return $field.length && $field[0].tagName === 'A' ? $field.text() : $field.text();
    }

    function updateImage($infoElement, userInfo, avatar) {
        if (avatar) {
            $infoElement.css('background', `url(${userInfo.avatar})`);
            return;
        }
        var html = '';
        userInfo.portfolio.forEach(function (image) {
            html += `<div class="portfolio-block"><div><img src="${image}"></div></div><div id="portfolio-carousel" class="owl-carousel owl-theme"><div><img src="${image}"></div></div>`;
        });
        $infoElement.replaceWith(html);
    }

    function getInputValue($field) {
        return $field.length && $field[0].tagName === 'INPUT'
            ? $field.val()
            : $field.text();
    }

    function setLinkValue($field, value) {
        var link = '#';
        if ($field.data('key') === 'phone') {
            link = `tel:${value.trim()}`;
        } else if (value) {
            link = value;
        }
        $field.attr('href', link);
        $field.text(value);
    }

    return PORTAL;

})(PORTAL || {}, jQuery);