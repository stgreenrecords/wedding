var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.LandingPartners = {};

    PORTAL.modules.LandingPartners.selfSelector = "#landing-partners-page-content";

    PORTAL.modules.LandingPartners.init = function ($self) {

        console.log('Component: "LandingPartners"');

        var partners_div = document.querySelectorAll(".with-us-div");

        for (var i = 0; i < partners_div.length; i++) {
            partners_div[i].style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_" + (6 - i) + ".jpg')";
        }

        document.querySelector("footer").style.backgroundColor = "#fff";

        var dayTimer = function () {

            var date_finish = new Date(2018, 6, 11, 17, 0, 0, 0);

            var Date_remained = function (date_finish, current_date) {
                this.remained_all = date_finish - current_date;
                this.all_second_remained = this.remained_all / 1000;
                this.all_minute_remained = this.remained_all / 60000;
                this.all_hour_remained = this.remained_all / 3600000;
                this.all_day_remained = this.remained_all / 86400000;
                this.second_remained = Math.floor(this.remained_all % 60000 / 1000);
                this.minute_remained = Math.floor(this.remained_all % 3600000 / 60000);
                this.hour_remained = Math.floor(this.remained_all % 86400000 / 3600000);
                this.day_remained = Math.floor(this.remained_all % 31536000000 / 86400000);

                this.day_remained = this.day_remained < 10 ? '0'+this.day_remained : this.day_remained;
                this.hour_remained = this.hour_remained < 10 ? '0'+this.hour_remained : this.hour_remained;
                this.minute_remained = this.minute_remained < 10 ? '0'+this.minute_remained : this.minute_remained;
                this.second_remained = this.second_remained < 10 ? '0'+this.second_remained : this.second_remained;
            };

            var our_date;
            var current_date = new Date();
            our_date = new Date_remained(date_finish, current_date);

            setInterval(function () {
                current_date = new Date();
                if ((our_date.day_remained > 0) || (our_date.hour_remained > 0) || (our_date.minute_remained > 0) || (our_date.second_remained > 0)) {
                    our_date = new Date_remained(date_finish, current_date);
                    timer_day.innerHTML = our_date.day_remained;
                    timer_hour.innerHTML = our_date.hour_remained;
                    timer_minute.innerHTML = our_date.minute_remained;
                    timer_second.innerHTML = our_date.second_remained;
                } else {
                    timer_second.innerHTML = "DEAR";
                    timer_minute.innerHTML = "MY";
                    timer_hour.innerHTML = "OFF";
                    timer_day.innerHTML = "TIME";

                }
            }, 1000);

        }();

        (function(){  // Доп 2 кнопки на лендинге
            $(".btn-become-partner").on("click", showRegistrationForm);
            $(".btn-become-partner2").on("click", showRegistrationForm);

            function showRegistrationForm() {

                if (Cookies.get('authStatus') !== 'authorized' ){
                    $("#entrance-form").css('visibility','visible');
                    var mwindow = document.querySelector(".window-registation");
                    mwindow.style.visibility = "visible";
                    mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                    mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
                }

            }
        })();

    };

    return PORTAL;

})(PORTAL || {}, jQuery);