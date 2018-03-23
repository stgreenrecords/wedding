
var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.CabinetInput = {};

    PORTAL.modules.CabinetInput.selfSelector = "#cabinet-input-block";

    PORTAL.modules.CabinetInput.init = function ($self) {

        console.log('Component: "#cabinet-input-block"');

        (function(){ // Работа с окнами входа и регистрации

            var entrance = document.getElementById("entrance-cabinet-btn");
            var registration = document.getElementById("registration-btn");
            var entrance2 = document.querySelector(".have-account-entrance");
            var reg_futher = document.querySelector('#btn-registration-futher');
            var reg_futher2 = document.querySelector('#btn-registration-futher2');
            var enter = document.getElementById("btn-entrance-form");

            entrance.addEventListener("click", function(evt) {
                this.style.color = "#555";
            });

            registration.addEventListener("click", function(evt) {
                this.style.color = "#555";
            });

            var modal = document.querySelector("#entrance-form");

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

            var data_registration = {};

            entrance.addEventListener("click", showEntranceForm);
            entrance2.addEventListener("click", showEntranceForm);
            registration.addEventListener("click", showRegistrationForm);
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
                let mwindow = document.querySelector(".window-registation-step2");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
            });

            reg_futher2.addEventListener("click", function(){

                let hide = document.querySelector(".window-registation-step2");

                var mwindow3 = document.querySelector(".window-registation-step3-user");

                if ($("input[name='selected-role']:checked").val() == 'cheked_part'){

                    mwindow3 = document.querySelector(".window-registation-step3-partner");
                    hide.style.visibility = "hidden";

                    $("#btn-registration-finish-partner").on("click", function(){
                        console.log($("input[name='consent']:checked").val());
                        if ($("input[name='consent']:checked").val() == 'consent-user'){
                            mwindow3.style.visibility = "hidden";
                            modal.style.visibility = "hidden";
                            cabinet_login.style.display = "none";
                            cabinet_success.style.display = "flex";
                        } else if ($("input[name='consent']:checked").val() == undefined){
                            $('.registation3_errore_message').css('display','block')
                        } else {
                            console.log("Error");
                        }
                    });

                }else if ($("input[name='selected-role']:checked").val() == 'cheked_us')	{

                    mwindow3 = document.querySelector(".window-registation-step3-user");
                    hide.style.visibility = "hidden";

                    $("#btn-registration-finish-user").on("click", function(){
                        console.log($("input[name='consent']:checked").val());
                        if ($("input[name='consent']:checked").val() == 'consent-user'){
                            mwindow3.style.visibility = "hidden";
                            modal.style.visibility = "hidden";
                            cabinet_login.style.display = "none";
                            cabinet_success.style.display = "flex";
                        } else if ($("input[name='consent']:checked").val() == undefined){
                            $('.registation3_errore_message').css('display','block')
                        } else {
                            console.log("Error");
                        }
                    });

                }

                mwindow3.style.visibility = "visible";
                mwindow3.style.left = (document.documentElement.clientWidth - mwindow3.getBoundingClientRect().width)/2 + "px";
                mwindow3.style.top = (document.documentElement.clientHeight - mwindow3.getBoundingClientRect().height)/3 + "px";

            });

            modal.addEventListener("click", function(evt) {
                if (evt.target == document.querySelector("#entrance-form")) {
                    this.style.visibility = "hidden";
                    Array.from(this.children).forEach(function(elem) {
                        elem.style.visibility = "hidden";
                    });
                };
            });

        }()); // end -  --- с окнами входа и регистрации

    };

    return PORTAL;

})(PORTAL || {}, jQuery);
