
var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.CabinetInput = {};

    PORTAL.modules.CabinetInput.selfSelector = "#cabinet-input-block";

    PORTAL.modules.CabinetInput.init = function ($self) {

        console.log('Component: "#cabinet-input-block"');

        (function () { // Работа с окнами входа и регистрации  для лендинга

            var entrance = document.getElementById("entrance-cabinet-btn");

            var registration = document.getElementById("registration-btn");
           // var registration2 = document.querySelector(".btn-become-partner2");
           // var registration3 = document.querySelector(".btn-become-partner");
            var entrance2 = document.querySelector(".have-account-entrance");
            var reg_futher = document.querySelector('#registration-futher');
            var reg_futher2 = document.querySelector('#registration-futher2');
            var reg_fin_user = document.querySelector('#registration-finish-user');
            var reg_fin_part = document.querySelector('#registration-finish-partner');

            var enter = document.getElementById("btn-entrance-form");

            entrance.addEventListener("click", function(evt) {
                console.log(evt.type);
                console.log(evt.clientX);
                this.style.color = "#555";
            });

            registration.addEventListener("click", function(evt) {
                this.style.color = "#555";
                console.log(evt.type);
            });

            var modal = document.querySelector("#entrance-form");

            function showForm(){
                /* Можно написать появление формы - а может и не писать */
                // На вход передается class
            }

            function showEntranceForm() {
                modal.style.visibility = "visible";
                let mwindow = document.querySelector(".window-entrance");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
            };

            function showRegistrationForm() {
                modal.style.visibility = "visible";
                let mwindow = document.querySelector(".window-registation");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
            };

            /* function hiddenModalWindow(){
                 let mwindow = document.querySelector(".window-registation");
             };*/

            var data_registration = {};

            entrance.addEventListener("click", showEntranceForm);
            entrance2.addEventListener("click", showEntranceForm);
            registration.addEventListener("click", showRegistrationForm);
           // registration3.addEventListener("click", showRegistrationForm);
           // registration2.addEventListener("click", showRegistrationForm);
            entrance2.addEventListener("click", function(){
                document.querySelector(".window-registation").style.visibility = "hidden";
            });

            enter.addEventListener("click", function(){
                document.querySelector(".window-entrance").style.visibility = "hidden";
                cabinet_login.style.display = "none";
                cabinet_success.style.display = "flex";
                modal.style.visibility = "hidden";
            });

            reg_futher.addEventListener("click", function(){
                document.querySelector(".window-registation").style.visibility = "hidden";
                /*	document.querySelector(".window-registation-step2").style.visibility = "visible";*/
                let mwindow = document.querySelector(".window-registation-step2");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
            });

            reg_futher2.addEventListener("click", function(){
                document.querySelector(".window-registation-step2").style.visibility = "hidden";
                /*if (radio_value == "user")
                    let mwindow = document.querySelector(".window-registation-step3-user");
                else */
                let mwindow = document.querySelector(".window-registation-step3-partner");

                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
            });

            var btn_finish =  document.querySelector("#registration-finish-partner");

            btn_finish.addEventListener("click", function(){
                document.querySelector(".window-registation-step3-partner").style.visibility = "hidden";
                cabinet_login.style.display = "none";
                cabinet_success.style.display = "flex";
                modal.style.visibility = "hidden";
            });

            window.addEventListener("resize", function(){
                if (modal.style.visibility == "visible"){
                    showEntranceForm();
                }
            });

            modal.addEventListener("click", function(evt) {
                if (evt.target == document.querySelector("#entrance-form")) {
                    this.style.visibility = "hidden";
                    Array.from(this.children).forEach(function(elem) {
                        elem.style.visibility = "hidden";
                    });
                };
            });

        }()); // end -  ---   окнами входа и регистрации  для лендинга

    };

    return PORTAL;

})(PORTAL || {}, jQuery);
