var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.LandingPartners = {};

    PORTAL.modules.LandingPartners.selfSelector = "#landing-partners-page-content";

    PORTAL.modules.LandingPartners.init = function ($self) {

        console.log('Component: "LandingPartners"');

        (function(){

            console.log("ytkjlasjfd");
            var partners_div = document.querySelectorAll(".with-us-div");

            for (var i =0 ; i<partners_div.length; i++){
                partners_div[i].style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_"+(6-i)+".jpg')";
            }

            document.querySelector("footer").style.backgroundColor = "#fff";

            var date_finish = new Date(2018, 2, 30, 17, 0, 0, 0);
            console.log(date_finish);
            var current_date = new Date();
            console.log(new Date().toLocaleTimeString());
            console.log(current_date);

            setInterval(function(){
                if (timer_second.innerHTML != 0){
                    timer_second.innerHTML -= 1;

                }
                else if (timer_minute.innerHTML != 0) {
                    timer_second.innerHTML = 59;
                    timer_minute.innerHTML = timer_minute.innerHTML -=1;
                }else if (timer_hour.innerHTML != 0) {
                    timer_second.innerHTML = 59;
                    timer_minute.innerHTML = 59;
                    timer_hour.innerHTML = timer_hour.innerHTML -=1;
                }else if (timer_day.innerHTML != 0) {
                    timer_second.innerHTML = 59;
                    timer_minute.innerHTML = 59;
                    timer_hour.innerHTML = 23;
                    timer_day.innerHTML = timer_day.innerHTML -=1;
                }else {timer_second.innerHTML = "DEAR";
                    timer_minute.innerHTML = "MY";
                    timer_hour.innerHTML = "OUT" ;
                    timer_day.innerHTML = "TIME" ;
                    return}
            }, 	1000);

        })();

    };

    return PORTAL;

})(PORTAL || {}, jQuery);