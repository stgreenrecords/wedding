var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Settings = {};

    PORTAL.modules.Settings.selfSelector = "#settings-page-content";

    PORTAL.modules.Settings.init = function ($self) {

        console.log('Component: "Settings"');

        $self.find('#remove-account').on('click', ()=>{
            var isAdmin = confirm("Вы действительно хотите удалить свою страницу? Это действие необратимо!");
            if (isAdmin)
                alert('аккаунт Удались!');
        });

        (function(){  //  функции переключения страниц
            var user_calc  = $self.find('#settings-common');
            var user_tend  = $self.find('#settings-notification');
            var calc_btn =  $self.find('#btn_settings-common');
            var tend_btn = $self.find('#btn_settings-notif');

            calc_btn.on('click', openPageAllSett);
            tend_btn.on('click', openPageNotificationSett);

            function openPageAllSett(event){
                user_tend.addClass('hidden_full');
                user_calc.removeClass('hidden_full');
                tend_btn.removeClass('user_menu_btn_active');
                calc_btn.addClass('user_menu_btn_active');
            }

            function openPageNotificationSett(event){
                user_calc.addClass('hidden_full');
                user_tend.removeClass('hidden_full');
                calc_btn.removeClass('user_menu_btn_active');
                tend_btn.addClass('user_menu_btn_active');
            }
        }());

    };  //----

    return PORTAL;

})(PORTAL || {}, jQuery);