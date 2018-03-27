
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
            var modal = document.querySelector("#entrance-form"); // (+)

            var dataRegistration = {};
            var authStatusFromCookie;
            var authTypeFromCookie;
            var userEmailFromCookie;

            authStatusFromCookie = Cookies.get('authStatus');
            authTypeFromCookie = Cookies.get('authType');
            userEmailFromCookie = Cookies.get('userEmail');

            $('.mini-menu').on('click', function(){
                $('.mini-menu-drop').toggleClass('hidden_cl');
            });

            $('#mini-menu_exit').on('click', hideCabinetSuccess);

            if (authStatusFromCookie === "authorized" && authTypeFromCookie) {
                //PORTAL.modules.LoginRegistration.AUTH[authType].status();
                showCabinetSuccess();
            }

            entrance.addEventListener("click", function(evt) {
                this.style.color = "#555";
            });

            function showEntranceForm() {
                modal.style.visibility = "visible";
                var mwindow = document.querySelector(".window-entrance");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
                if (userEmailFromCookie != 'undefined') {
                    $('#user_email').val(userEmailFromCookie);
                }
            }

            function showRegistrationForm() {
                modal.style.visibility = "visible";
                var mwindow = document.querySelector(".window-registation");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
            }

            function inputFill(){
                $('#email_finish-user').val(dataRegistration.email);
                $('#email_finish-patner').val(dataRegistration.email);
            }

            function showCabinetSuccess(){
                cabinet_login.style.display = "none";
                cabinet_success.style.display = "flex";
            }

            function hideCabinetSuccess(){
                cabinet_success.style.display = "none";
                cabinet_login.style.display = "block";
                Cookies.set('authStatus', 'NotAuth');
            }

            function setCookiesAuth(authStatusValue, authTypeValue){
                Cookies.set('authStatus', authStatusValue);
                Cookies.set('authType', authTypeValue);
            }

            entrance.addEventListener("click", showEntranceForm);
            entrance2.addEventListener("click", showEntranceForm);
            registration.addEventListener("click", showRegistrationForm);
            entrance2.addEventListener("click", function(){
                document.querySelector(".window-registation").style.visibility = "hidden";
            });

            enter.addEventListener("click", function(){
                document.querySelector(".window-entrance").style.visibility = "hidden";
                showCabinetSuccess();
                modal.style.visibility = "hidden";
                setCookiesAuth('authorized', 'EMAIL');
                if ($('#remember-ident').val() === 'remember-ident-user'){
                    Cookies.set('userEmail', $('#user_email').val());
                }
            });

            function firstStepWindow(){
                document.querySelector(".window-registation").style.visibility = "hidden";
                var mwindow = document.querySelector(".window-registation-step2");
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
                    var regul_email = 	/^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.([a-z][a-z][a-z]|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;

                    if (firstName && lastName && password   && email.match(regul_email)   ) {
                        firstStepWindow();
                        dataRegistration.firstName =  firstName;
                        dataRegistration.lastName =  lastName;
                        dataRegistration.email =  email;
                        dataRegistration.password = password;
                        console.dir(dataRegistration);

                    } else {
                        alert("Все поля должны быть заполнены. Поле Эл. Почта в формате example@domain.com");
                    }
                });
            })();

            function compileInput(){
                return coppl_inp_obj;
            }

            function lastStepRegPartner(){

                console.log("lastStepRegPartner ON success " );

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
                    /*  var googl = $("#googl_finish-partner").val();*/
                    var site = $("#site_finish-partner").val();

                    dataRegistration.workSphere =  work_sphere;
                    dataRegistration.city =  city;
                    dataRegistration.tel =  tel;
                    dataRegistration.vkLink =  vk;
                    dataRegistration.fbLink =  fb;
                    dataRegistration.okLink =  ok;
                    dataRegistration.siteLink =  site;

                    if (($("input[name='consent']:checked").val() === 'consent-user') && city && tel && work_sphere /*!= 'null'*/) {
                        mwindow3.style.visibility = "hidden";
                        modal.style.visibility = "hidden";
                        showCabinetSuccess();
                        console.dir(dataRegistration);

                        sendRegInfo("http://wedding-services.mycloud.by/services/rest.partner.create");

                    } else /*if ($("input[name='consent']:checked").val() === undefined)*/{
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
                    // var googl = $("#googl_finish-user").val();

                    dataRegistration.city =  city;
                    dataRegistration.tel =  tel;
                    dataRegistration.vkLink =  vk;
                    dataRegistration.fbLink =  fb;
                    dataRegistration.okLink =  ok;

                    if (($("input[name='consent']:checked").val() === 'consent-user')   && city && tel){
                        mwindow3.style.visibility = "hidden";
                        modal.style.visibility = "hidden";
                        showCabinetSuccess();
                        console.dir(dataRegistration);

                        sendRegInfo("http://wedding-services.mycloud.by/services/rest.users.create");


                    } else if ($("input[name='consent']:checked").val() === undefined){
                        $('.registation3_errore_message').css('display','flex');
                        $(".window-registation-step3-user input").one('focus', function(){
                            $('.registation3_errore_message').css('display','none');
                        });
                    } else {
                        console.log("Error");
                    }
                });

            }

            function sendRegInfo(url_link){

                $.ajax({
                    url: url_link,
                    type: "POST",
                    dataType: "json",
                    data: dataRegistration,
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

                if ($("input[name='selected-role']:checked").val() === 'cheked_part'){

                    dataRegistration.userType =  "PARTNER";
                    lastStepRegPartner();

                }else if ($("input[name='selected-role']:checked").val() === 'cheked_us'){

                    dataRegistration.userType =  "USER";
                    lastStepRegUser();

                }

            });

            modal.addEventListener("click", function(evt) {
                if (evt.target === document.querySelector("#entrance-form")) {
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
