var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.LoginRegistration = {};

    PORTAL.modules.LoginRegistration.selfSelector = ".login-registration-block";

    var socialUser;
    var currentDate = new Date();
    var expires = currentDate.setTime(currentDate.getTime() + 600000);

    PORTAL.modules.LoginRegistration.AUTH = PORTAL.modules.LoginRegistration.AUTH || {};

    PORTAL.modules.LoginRegistration.AUTH.VK = {

        "login": function () {
            VK.Auth.login(function (response) {
                if (response.status === "connected") {
                    socialUser = response.session.user;
                    checkIfUserExist(socialUser, "VK");
                    PORTAL.utils.set_cookie("authType", "VK", expires);
                    PORTAL.utils.set_cookie("authStatus", "authorized", expires);
                }
            }, VK.access.EMAIL);
        },

        "logout": function () {
            VK.Auth.logout(function (responce) {
                console.log(responce);
            });
        },
        "status": function () {
            VK.Auth.getLoginStatus(function (response) {
                if (response.status === "connected") {
                    authStatus = true;
                    var userID = response.session.mid;
                }
            });

        }

    };

    PORTAL.modules.LoginRegistration.init = function ($self) {
        console.log('Component: "LoginRegistration"');

        var magnificPopup = $.magnificPopup.instance;

        var authStatus = false;

        VK.init({
            apiId: 6153660
        });

        var authStatusFromCookie = PORTAL.utils.get_cookie("authStatus");
        var authType = PORTAL.utils.get_cookie("authType");

        if (authStatusFromCookie === "authorized" && authType) {
            PORTAL.modules.LoginRegistration.AUTH[authType].status();
        }

        var configForPopUp = {
            type: 'inline',
            closeBtnInside: true,
            midClick: true
        };

        var $firstStepSubmit = $self.find("#registration-firstStep");

        $self.find("#first-step-private").click(function(){
            $firstStepSubmit.attr("href","#registration-popup-second-step-private").css("display", "block");
        });

        $self.find("#first-step-partner").click(function(){
            $firstStepSubmit.attr("href","#registration-popup-second-step-partner").css("display", "block");
        });

        $self.find("#login-registration-link").magnificPopup(configForPopUp);

        $self.find("#registration-newAcc").magnificPopup(configForPopUp);

        $self.find("#registration-firstStep").magnificPopup(configForPopUp);

        var $loginPopUp = $self.find("#login-popup");

        $self.find("#vk-login-button").click(function () {
            PORTAL.modules.LoginRegistration.AUTH.VK.login();
        });

    };

    var checkIfUserExist = function (user, type) {
        $.ajax({
            type: "GET",
            url: "/services/checkuser",
            data: {
                "userID": user.id,
                "authType": type
            },
            success: function (isUserExist) {
                if (isUserExist === "true") {
                    drawUser();
                } else {
                    registerNewUser(user);
                }
            }
        });
    };

    var drawUser = function () {

    };

    var registerNewUser = function (user) {
        var userName = user.first_name || user.last_name ? user.first_name + " " + user.last_name : user.nickname || user.href;
        $("#registration-newAcc").css("display", "block").text("Создать аккаунт для " + userName);
    };

    return PORTAL;

})(PORTAL || {}, jQuery);
