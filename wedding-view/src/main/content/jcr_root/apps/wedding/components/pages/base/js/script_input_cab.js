
var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.CabinetInput = {};

    PORTAL.modules.CabinetInput.selfSelector = "#cabinet-input-block";

    PORTAL.modules.CabinetInput.init = function ($self) {

        console.log('Component: "#cabinet-input-block"');

        (function(){ // Работа с окнами входа и регистрации

            var entrance = document.getElementById("entrance-cabinet-btn");
            var registration = document.getElementById("registration-btn");
            var registration2 = document.querySelector(".btn-become-partner2");
            var registration3 = document.querySelector(".btn-become-partner");
            var entrance2 = document.querySelector(".have-account-entrance");
            var reg_futher = document.querySelector('#btn-registration-futher');
            var reg_futher2 = document.querySelector('#btn-registration-futher2');

            var enter = document.getElementById("btn-entrance-form");

            var data_registration = {
                "auth_type": '',
                "reg_type": '',
                "firstName": '',
                "lastName": '',
                "email": '',
                "work_sphere": '',
                "city": '',
                "tel": '',
                "vk": '',
                "fb": '',
                "ok": '',
                "googl": '',
                "site": '',
                "id": ''
            };

            entrance.addEventListener("click", function(evt) {
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

            entrance.addEventListener("click", showEntranceForm);
            entrance2.addEventListener("click", showEntranceForm);
            registration.addEventListener("click", showRegistrationForm);
            registration3.addEventListener("click", showRegistrationForm);
            registration2.addEventListener("click", showRegistrationForm);
            entrance2.addEventListener("click", function(){
                document.querySelector(".window-registation").style.visibility = "hidden";
            });

            enter.addEventListener("click", function(){
                document.querySelector(".window-entrance").style.visibility = "hidden";
                cabinet_login.style.display = "none";
                cabinet_success.style.display = "flex";
                modal.style.visibility = "hidden";
            });

            function inputFill(){
                $('#email_finish-user').val(data_registration.email);
                $('#email_finish-patner').val(data_registration.email);
            }

            function firstStepWindow(){

                document.querySelector(".window-registation").style.visibility = "hidden";
                let mwindow = document.querySelector(".window-registation-step2");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";

            }

            (function firstStepReg() {
                $("#btn-registration-futher").click(function () {

                    var firstName = $("#registration-firstName").val();
                    var lastName = $("#registration-lastName").val();
                    var email = $("#registration-email").val();
                    var password = $("#registration-password").val();

                    var regul_passw = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z][a-z][a-z]|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/ig;
                    var regul_email = /"^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z][a-z][a-z]|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$"/

                    if (firstName && lastName && password   && email/*.match(regul_email) */  ) {
                        firstStepWindow();
                        data_registration.firstName =  firstName;
                        data_registration.lastName =  lastName;
                        data_registration.email =  email;
                        data_registration.password = password;
                        console.dir(data_registration);

                    } else {
                        alert("Все поля должны быть заполнены. Поле Эл. Почта в формате example@domain.com");
                    }
                });
            })();

            function compileInput(){
                return coppl_inp_obj;
            }

            function lastStepRegParnter(){

                console.log("lastStepRegParnter ON success " );

                $(".window-registation-step2").css('visibility', "hidden");
                var mwindow3 = document.querySelector(".window-registation-step3-partner"); // TODO заменить на function
                mwindow3.style.visibility = "visible";
                mwindow3.style.left = (document.documentElement.clientWidth - mwindow3.getBoundingClientRect().width)/2 + "px";
                mwindow3.style.top = (document.documentElement.clientHeight - mwindow3.getBoundingClientRect().height)/3 + "px";

                $("#btn-registration-finish-partner").on("click", function(){

                    var work_sphere = $("#work-sphere").val();
                    var city = $("#city_finish-partner").val();
                    var tel = $("#tel_finish-partner").val();
                    var vk = $("#vk_finish-partner").val();
                    var fb = $("#fb_finish-partner").val();
                    var ok = $("#ok_finish-partner").val();
                    var googl = $("#googl_finish-partner").val();
                    var site = $("#site_finish-partner").val();

                    data_registration.work_sphere =  work_sphere;
                    data_registration.city =  city;
                    data_registration.tel =  tel;
                    data_registration.vk =  vk;
                    data_registration.fb =  fb;
                    data_registration.ok =  ok;
                    data_registration.googl =  googl;
                    data_registration.site =  site;

                    if (($("input[name='consent']:checked").val() == 'consent-user') && city && tel && work_sphere /*!= 'null'*/) {
                        mwindow3.style.visibility = "hidden";
                        modal.style.visibility = "hidden";
                        cabinet_login.style.display = "none";
                        cabinet_success.style.display = "flex";
                        console.dir(data_registration);

                        sendRegInfo();

                    } else /*if ($("input[name='consent']:checked").val() == undefined)*/{
                        $('.registation3_errore_message').css('display','flex');
                        $(".window-registation-step3-partner input").one('focus', function(){
                            $('.registation3_errore_message').css('display','none');
                        });
                    }

                });

            }

            function lastStepRegUser(){

                console.log("lastStepRegUSSEERRR ON success ");
                $(".window-registation-step2").css('visibility', "hidden");
                var mwindow3 = document.querySelector(".window-registation-step3-user"); // TODO заменить на function
                mwindow3.style.visibility = "visible";
                mwindow3.style.left = (document.documentElement.clientWidth - mwindow3.getBoundingClientRect().width)/2 + "px";
                mwindow3.style.top = (document.documentElement.clientHeight - mwindow3.getBoundingClientRect().height)/3 + "px";

                $("#btn-registration-finish-user").on("click", function(){

                    var city = $("#city_finish-user").val();
                    var tel = $("#tel_finish-user").val();
                    var vk = $("#vk_finish-user").val();
                    var fb = $("#fb_finish-user").val();
                    var ok = $("#ok_finish-user").val();
                    var googl = $("#googl_finish-user").val();

                    data_registration.city =  city;
                    data_registration.tel =  tel;
                    data_registration.vk =  vk;
                    data_registration.fb =  fb;
                    data_registration.ok =  ok;
                    data_registration.googl =  googl;

                    if (($("input[name='consent']:checked").val() == 'consent-user')   && city && tel){
                        mwindow3.style.visibility = "hidden";
                        modal.style.visibility = "hidden";
                        cabinet_login.style.display = "none";
                        cabinet_success.style.display = "flex";
                        console.dir(data_registration);

                        sendRegInfo();


                    } else if ($("input[name='consent']:checked").val() == undefined){
                        $('.registation3_errore_message').css('display','flex');
                        $(".window-registation-step3-user input").one('focus', function(){
                            $('.registation3_errore_message').css('display','none');
                        });
                    } else {
                        console.log("Error");
                    }
                });

            }

            function sendRegInfo(){

                $.ajax({
                    url: "http://wedding-services.mycloud.by/services/rest.users.create",
                    type: "POST",
                    dataType: "json",
                    data: data_registration,
                    beforeSend: function () {
                        console.log("как сча отправлю !");
                    },
                    success: function (data) {
                        // if (data) {
                        console.log(data);
                        showCabinet();
                        // }
                    },
                    complete: function () {
                        console.log('Наверное еще не настроили приемку на сервере |');
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так (');
                        console.log(e);
                    }
                });

            }

            function showCabinet(){
                console.log(' ============ showCabinet - in the studia ) ============ ');
            }

            reg_futher2.addEventListener("click", function(){

                inputFill();

                if ($("input[name='selected-role']:checked").val() == 'cheked_part'){

                    data_registration.reg_type =  "partner";
                    lastStepRegParnter();

                }else if ($("input[name='selected-role']:checked").val() == 'cheked_us'){

                    data_registration.reg_type =  "user";
                    lastStepRegUser();

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

        }()); // end -  --- с окнами входа и регистрации

    };

    return PORTAL;

})(PORTAL || {}, jQuery);
