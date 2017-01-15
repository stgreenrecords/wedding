var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.TopNavigation = {};

    PORTAL.modules.TopNavigation.selfSelector = ".nav_block";

    PORTAL.modules.TopNavigation.init = function ($self) {
        console.log('Component: "TopNavigation"');

        var sessionCookie = PORTAL.utils.get_cookie("wedding-session-id");
        var email = PORTAL.utils.get_cookie("wedding-user");

        var isSessionIdValid = function(paramCookie, paramEmail){
            if (email && sessionCookie){
                $.ajax({
                    url: "/services/verifying",
                    type: "POST",
                    dataType: "json",
                    data: {
                        'wedding-session-id': paramCookie,
                        'wedding-user': paramEmail
                    },
                    success: function (data) {
                        if ( data ){
                            var userNav = $self.find(".user_item");
                            userNav.css("display","block");
                            userNav.find(".basket_count").text(data.basketCount);
                        }
                    }
                });
            } else {
                $self.find(".login_home").css("display","block");
            }

        }

        isSessionIdValid(sessionCookie,email);
    }

    return PORTAL;

})(PORTAL || {}, jQuery);
