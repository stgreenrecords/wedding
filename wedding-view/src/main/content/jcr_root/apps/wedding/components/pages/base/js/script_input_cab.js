var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.CabinetInput = {};

    PORTAL.modules.CabinetInput.selfSelector = "#cabinet-input-block";

    PORTAL.modules.CabinetInput.init = function ($self) {

        console.log('Component: "#cabinet-input-block"');

        // (function(){ // Работа с окнами входа и регистрации

            var entrance = document.getElementById("entrance-cabinet-btn");
            var registration = document.getElementById("registration-btn");
            var entrance2 = document.querySelector(".have-account-entrance");
            var reg_futher2 = document.querySelector('#btn-registration-futher2');
            var enter = document.getElementById("btn-entrance-form");

            var dataRegistration = {};
            var userLoginInfo = {};
            var authType = '';

            var authStatusFromCookie = Cookies.get('authStatus');
            var authTypeFromCookie = Cookies.get('authType');
            var userEmailFromCookie = Cookies.get('userEmail');
            // var userIdFromCookie  = Cookies.get('userId');
            var userTypeFromCookie = Cookies.get('userType');
            var cityFromCookie = Cookies.get('city');
            var workSphereFromCookie = Cookies.get('workSphere');
            var mini_menu = $self.find('.mini-menu');
            var mini_menu_drop = $self.find('.mini-menu-drop');

            mini_menu.on('click', function(event){
                mini_menu_drop.toggleClass('hidden_cl');
                document.addEventListener('keyup', exitMenu);
                // document.addEventListener('click', exitMenu2, true);
            });

            function  exitMenu(e) {
                if (e.keyCode === 27) { //esc
                    mini_menu_drop.toggleClass('hidden_cl');
                    document.removeEventListener('keyup', exitMenu);
                }
            }

            $self.find('#mini-menu_exit').on('click', hideCabinetSuccess);
            $self.find('#mini-menu_exit').on('click', clearCookies);

        PORTAL.modules.CabinetInput.AUTH = PORTAL.modules.CabinetInput.AUTH || {};


        entrance.addEventListener("click", function(evt) {
                this.style.color = "#555";
            });

            if (authStatusFromCookie === "authorized" && authTypeFromCookie)
                showCabinetSuccess();

            function compareUserData(dataCompare) {
                console.log(dataCompare);

                if (Cookies.get('userId') && dataCompare.userId === Cookies.get('userId')) {
                    // alert('compareUser_Data userIdFromCookie WORKS');
                    showCabinetSuccess();
                    Cookies.set('authStatus', 'authorized',{expires:7});

                } else if ( !Cookies.get('userId') || dataCompare.userId !== Cookies.get('userId')) {

                    $.ajax({
                        url: `http://wedding-services.mycloud.by/services/rest.loginUser.json?id=${dataCompare.userId}`, // Запрос юзера по id  при входе
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            if (typeof(data) === 'object' && data.hasOwnProperty('id') && dataCompare.id == data.id ) {
                                setCookiesAll(data);
                                enterOfForm();
                            }else{
                                console.log('Ждет реализации Запрос юзера по id  при входе');
                            }
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });

                } else
                    alert('Зарегестрируйтесь через данную сеть');
            }

            function showEntranceForm() {

                modalW.openMWindow(".window-entrance", "#entrance-form");
                if (userEmailFromCookie != 'undefined') {
                    $self.find('#user_email').val(userEmailFromCookie);
                }
            }

            function showRegistrationForm() {
                modalW.openMWindow(".window-registation", "#entrance-form");
            }

            function inputEmailFill(){
                $self.find('#email_finish-user').val(dataRegistration.email);
                $self.find('#email_finish-patner').val(dataRegistration.email);
            }

            function showCabinetSuccess(){
                cabinet_login.style.display = "none";
                cabinet_success.style.display = "flex";
                $self.find('#mini-menu_my-page').one('click', myPageReloc);
                $self.find('#cabinet_success .mini-avatar').css('backgroundImage', `url("${Cookies.get('avatar')}")`).one('click', myPageReloc);
            }


            function myPageReloc() {
                if (Cookies.get('userType')=='partner')
                    document.location.href = `/content/wedding/catalog/category/partner.html?${Cookies.get('userId')}#${Cookies.get('workSphere')}&${Cookies.get('city')}`;
                else if(Cookies.get('userType')=='user')
                    document.location.href = `/content/wedding/user.html?${Cookies.get('userId')}#${Cookies.get('city')}`;
                else
                    alert ('Войдите или зарегестрируйтесь');
            }

            function hideCabinetSuccess(){
                cabinet_success.style.display = "none";
                cabinet_login.style.display = "block";
            }

            function clearCookies(){
                Cookies.set('authStatus', 'NotAuth');
                Cookies.set('userId', 'null');
                Cookies.set('authType', '');
                Cookies.set('firstName', '');
                Cookies.remove('workSphere');
                Cookies.set('city', '');
                Cookies.set('lastName', '');
                Cookies.set('userType', '');
                Cookies.set('avatar', '');
                document.location.reload();
            }

            function enterOfForm(){
                modalW.closeMWindow(".window-entrance", "#entrance-form");
                showCabinetSuccess();
            }

            /*---*/

            function sendLoginRequest(userId){

                $.ajax({
                    url: `/services/rest.loginUser.json?id=userId`, // Запрос юзера по id / и / или email  при входе
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        if (typeof(data) === 'object' && data.hasOwnProperty('id') && dataCompare.id == data.id ) {
                            setCookiesAll(data);
                            enterOfForm();
                            authType = 'EMAIL';
                        }else{
                            console.log('Ждет реализации Запрос юзера по id  при входе');
                        }
                    },
                    error: function (e) {
                        console.log(e);
                    }
                });

            }

            function inputFirstStepRegFill(){

                $self.find("#registration-firstName").val(dataRegistration.firstName) ;
                $self.find("#registration-lastName").val(dataRegistration.lastName) ;
                $self.find("#registration-email").val(dataRegistration.email);
                $self.find("#vk_finish-user").val(dataRegistration.vkLink); // third step - relocate if will need.
                $self.find("#vk_finish-partner").val(dataRegistration.vkLink); // third step - relocate if will need.

            }

            entrance.addEventListener("click", showEntranceForm);
            entrance2.addEventListener("click", showEntranceForm);
            registration.addEventListener("click", showRegistrationForm);

            entrance2.addEventListener("click", function(){
                document.querySelector(".window-registation").style.visibility = "hidden";
            });

            function dataRegistrationFill(){
                dataRegistration.id = userLoginInfo.userID;
                dataRegistration.firstName =  userLoginInfo.firstName;
                dataRegistration.lastName =  userLoginInfo.lastName;
                dataRegistration.email =  userLoginInfo.email;
                dataRegistration.authType = userLoginInfo.authType;
                dataRegistration.vkLink = userLoginInfo.href;
            }

            enter.addEventListener("click", function(){

                 sendLoginRequest('email_Id');
                // enterOfForm();
                // setCookiesAuth('authorized', 'EMAIL');
                if ($self.find('#remember-ident').val() === 'remember-ident-user'){
                    Cookies.set('userEmail', $self.find('#user_email').val());
                }

            });

            /*---*/

            (function firstStepReg() {

                var $regPassRepeat = $self.find('#registration-password-repeat');

                $regPassRepeat.on('blur', function(){
                    if ($self.find("#registration-password").val() !== $self.find("#registration-password-repeat").val())
                        $regPassRepeat.addClass('inp_red_border');
                });

                $regPassRepeat.on('focus', function(){
                    $regPassRepeat.removeClass('inp_red_border');
                });

                $self.find("#btn-registration-futher").click(function () {

                    var firstName = $self.find("#registration-firstName").val();
                    var lastName = $self.find("#registration-lastName").val();
                    var email = $self.find("#registration-email").val();
                    var password = $self.find("#registration-password").val();
                    var password_rep = $self.find("#registration-password-repeat").val();

                    var regul_passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,16}$/;
                    var regul_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                    if (firstName && lastName && password.match(regul_passw) && email.match(regul_email) && password === password_rep) {
                        secondStepRegWindow();
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



            function secondStepRegWindow(){
                modalW.closeMWindow(".window-registation", "#entrance-form");
                modalW.openMWindow(".window-registation-step2", "#entrance-form");
            }

            reg_futher2.addEventListener("click", function(){

                inputEmailFill();

                if ($self.find("input[name='selected-role']:checked").val() === 'cheked_part'){

                    dataRegistration.userType =  "PARTNER";
                    lastStepRegPartner();

                }else if ($self.find("input[name='selected-role']:checked").val() === 'cheked_us'){

                    dataRegistration.userType =  "USER";
                    lastStepRegUser();

                }

            });

            function lastStepRegPartner(){

                modalW.closeMWindow(".window-registation-step2", "#entrance-form");
                modalW.openMWindow(".window-registation-step3-partner", "#entrance-form");

                $.ajax({ // Запрос на добавление всех категорий в селект
                    url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        var allCategories = data;

                        console.dir(allCategories);
                        for (var prop in allCategories){
                            $self.find('#work-sphere').append(`<option value=${prop}> ${allCategories[prop]} </option>`);
                        }
                    },
                    error: function () { // На случай если запрос не прошел - сферу пишет вручную
                        $self.find('#work-sphere').detach();
                        $self.find('#form-reg-step3-partner').prepend('<p><input id="work-sphere" type="text" placeholder="Сфера деятельности"></p>');
                        console.log("it's BIG Fail");
                    }
                });

                $self.find("#btn-registration-finish-partner").on("click", function(){

                    var work_sphere = $self.find("#work-sphere").val();
                    var city = $self.find("#city_finish-partner").val();
                    var tel = $self.find("#tel_finish-partner").val();
                    var vk = $self.find("#vk_finish-partner").val();
                    var fb = $self.find("#fb_finish-partner").val();
                    var ok = $self.find("#ok_finish-partner").val();
                    /*  var googl = $("#googl_finish-partner").val();*/
                    var site = $self.find("#site_finish-partner").val();

                    dataRegistration.speciality =  work_sphere;
                    dataRegistration.city =  city;
                    dataRegistration.phone =  tel;
                    dataRegistration.vkLink =  vk;
                    dataRegistration.facebookLink =  fb;
                    // dataRegistration.okLink =  ok;
                    dataRegistration.instagramLink =  ok;
                    dataRegistration.siteLink =  site;
                    dataRegistration.authType =  authType;
                    dataRegistration.path =  `/home/users/wedding/partners/${work_sphere}/${city}`;

                    if ( work_sphere  &&  tel &&  city && ($self.find("input[name='consent-part']:checked").val() === 'consent-partner')  /*!= 'null'*/) {

                        modalW.closeMWindow(".window-registation-step3-partner", "#entrance-form");
                        sendPartnerRegInfo("http://wedding-services.mycloud.by/services/rest.partners/create.json", city, work_sphere);
                        console.dir(dataRegistration);

                    } else /*if ($("input[name='consent']:checked").val() === undefined)*/{
                        var errMess = $self.find('.registation3_errore_message');
                        errMess.css('display','flex');
                        setTimeout(()=>{errMess.css('display','none')}, 1900);
                        $self.find(".window-registation-step3-partner input").one('focus', function(){
                            errMess.css('display','none');
                        });
                    }

                });

            }


            function sendPartnerRegInfo(url_link /*, city, work_sphere*/){

                $.ajax({
                    url: url_link,
                    // url: 'http://wedding-services.mycloud.by/services/rest.partners/create.json',
                    type: "POST",
                    dataType: "json",
                    data: dataRegistration,

                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                        console.log("beforeSend post !");
                        console.dir(dataRegistration);
                    },
                    success: function (data) {
                         if (data != []) {
                             showCabinetSuccess();
                             setCookiesAll(data);
                             document.location.href = `/content/wedding/catalog/category/partner.html?${data.id}#${data.speciality}&${data.city}`;
                         }
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так (');
                        console.log(e);
                        modalW.openMWindow("#popup_alert-admin", "#entrance-form");
                    }
                });

            }

            function setCookiesAll(data) {

               Cookies.set('authStatus', 'authorized',{expires:7});
               Cookies.set('authType', authType);
               Cookies.set('userId', data.id);

               if(data.speciality && data.speciality !=null && data.speciality != '') {
                   Cookies.set('userType', 'partner');
                   Cookies.set('workSphere', data.speciality);
                   // $self.find('#mini-menu_my-page a').attr('href', '/content/wedding/catalog/category/partner.html');
               }else
                   Cookies.set('userType', 'user');

               data.city ? Cookies.set('city', data.city) : '';
               data.firstName ? Cookies.set('firstName', data.firstName) : '';
               data.lastName ? Cookies.set('lastName', data.lastName) : '';
               data.avatar ? Cookies.set('avatar', data.avatar)  : Cookies.set('avatar', '/etc/clientlibs/wedding/pages/images/any_img/default_avatar.jpg');
            }

            function sendUserRegInfo(url_link, city){

                $.ajax({
                     url: url_link, // 'http://wedding-services.mycloud.by/services/rest.users/create.json'
                    // url: 'http://wedding-services.mycloud.by/services/rest.users/create.json',
                    type: "POST",
                    dataType: "json",
                    data: dataRegistration, // Все данные
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                        console.log("beforeSend post !");
                        console.dir(dataRegistration);
                    },
                    success: function (data) {
                        // if (data) {
                        console.log('Ниже должен быть ответ:');
                        console.dir(data);
                        setCookiesAll(data);
                        showCabinetSuccess();
                        // document.location.href = '/content/wedding/catalog.html#'; // TODOC - сделать переход в каталог - когда заполнят всех юзеров
                        document.location.href = `/content/wedding/user.html?${data.id}#${data.city}`;
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так :( ');
                        console.log(e);
                        modalW.openMWindow("#popup_alert-admin", "#entrance-form");
                    }
                });

            }


            function lastStepRegUser(){

                modalW.closeMWindow(".window-registation-step2", "#entrance-form");
                modalW.openMWindow(".window-registation-step3-user", "#entrance-form");

                $self.find("#btn-registration-finish-user").on("click", function(){

                    var city = $self.find("#city_finish-user").val();
                    var tel = $self.find("#tel_finish-user").val();
                    var vk = $self.find("#vk_finish-user").val();
                    var fb = $self.find("#fb_finish-user").val();
                    var ok = $self.find("#ok_finish-user").val();

                    dataRegistration.city =  city;
                    dataRegistration.phone =  tel;
                    dataRegistration.vkLink =  vk;
                    dataRegistration.facebookLink =  fb;
                    dataRegistration.instagramLink =  ok;		/*todoc - переделать под инсту*/
                    dataRegistration.path = `/home/users/wedding/users/${city}`; // dataRegistration.resourcePath = `/home/users/wedding/users/${city}`;
                    dataRegistration.authType =  authType;

                    if ( tel && city &&  ($self.find("#consent-user-check:checked").val() === 'consent-user')){

                        modalW.closeMWindow(".window-registation-step3-user", "#entrance-form");

                        sendUserRegInfo('http://wedding-services.mycloud.by/services/rest.users/create.json', dataRegistration.city);


                    } else /*if ($("input[name='consent']:checked").val() === undefined)*/{
                        var errMess = $self.find('.registation3_errore_message');
                        errMess.css('display','flex');
                        setTimeout(()=>{errMess.css('display','none')}, 1900);
                        $self.find(".window-registation-step3-user input").one('focus', function(){
                            errMess.css('display','none');
                        });
                    }
                });

            }


            /*==============================================================================================================================
 =========================           ====================================================================================================================================
            ====================================================================================================================================
  =============================          ====================================================================================================================================*/



        PORTAL.modules.CabinetInput.AUTH.V_K = {
        // var V_K = {

                "login": function () {

                    VK.Auth.login(function (response) {

                        if (response.status === "connected") {

                            var responseUser = response.session.user;
                            console.log('success VK responce');
                            console.dir(response);
                            userLoginInfo.userID = responseUser.hasOwnProperty("id") ? responseUser.id : "";
                            userLoginInfo.firstName = responseUser.hasOwnProperty("first_name") ? responseUser.first_name : "";
                            userLoginInfo.lastName = responseUser.hasOwnProperty("last_name") ? responseUser.last_name : "";
                            userLoginInfo.nickname = responseUser.hasOwnProperty("nickname") ? responseUser.nickname : "";
                            userLoginInfo.email = responseUser.hasOwnProperty("email") ? responseUser.email : "";
                            userLoginInfo.href = responseUser.hasOwnProperty("href") ? responseUser.href : "";
                            userLoginInfo.authType = "V_K";
                            authType = "V_K";

                            dataRegistrationFill();
                            inputFirstStepRegFill();

                        }

                    });

                },

                "status": function () {
                    VK.Auth.getLoginStatus(function (response) {
                        if (response.status === "connected") {
                            // authStatus = true;
                            userLoginInfo.userId = response.session.mid;
                            userLoginInfo.authType = "V_K";
                            authType = "V_K";
                            console.log('The great success !!!!!  getLoginStatus true ');
                            console.log(response);
                            compareUserData(userLoginInfo);
                        }
                    });
                }

            };


        PORTAL.modules.CabinetInput.AUTH.FBOOK = {

               /* "login": function () {

                    FB.login(function(response) {
                        if (response.authResponse) {
                            console.log('Welcome!  Fetching your information.... ');
                            console.log(response);
                            FB.api('/me', function(response) {
                                console.log('Good to see you, ' + response.name + '.');
                            });
                        } else {
                            console.log('User cancelled login or did not fully authorize.');
                        }
                    });

                }*/

                "login": function () {

                    FB.login(function (response) {
                        console.log(response);
                        userLoginInfo.authType = "FBOOK";
                    });

                },

                "status": function () {
                    FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            console.log(response);
                            // var uid = response.authResponse.userID;
                            // var accessToken = response.authResponse.accessToken;
                            compareUserData(response);
                        } else if (response.status === 'not_authorized') {
                            console.log(response);
                            console.log(response.status);
                        } else {
                            console.log('EGC UPS');
                        }
                    });
                }

            };

        PORTAL.modules.CabinetInput.AUTH.GMAIL = {

                "login": function () {
                    GoogleAuth.signIn();
                   // handleAuthClick();
                   console.log(socialUser);
                    // gmail.login(function (response) {
                    //     console.log(response);
                    // });
                },

                "status": function () {
                    googleStatus(GoogleAuth.isSignedIn.get());
                    //compareUserData();
                }
            };

        PORTAL.modules.CabinetInput.AUTH.OK = {

            "login": function () {   // Честно - тут хз все работало вчера, а теперь вылетает какой-то ерор!

                    var config = {
                        app_id: 1264974848,      // <-- insert APP ID here
                        app_key: 'CBANPGGMEBABABABA'     // <-- insert APP PUBLIC KEY here
                    };
                    OKSDK.init(config, function() {
                        OKSDK.Widgets.getBackButtonHtml(function(html) {
                            console.log(html);
                        });
                        OKSDK.REST.call('users.getCurrentUser', null, function(status, data, error) {
                            if (status == 'ok') {
                                console.log('Hello World and hi, ' + data.name + '.');
                                console.dir(data);
                            } else {
                                alert('Unable to retrieve current user ' + OKSDK.Util.toString(error));
                            }
                        });
                    }, function(error) {
                        alert('OKSDK error' + OKSDK.Util.toString(error));
                    });
            },

            "status": function () {

                var config = {
                    app_id: 1264974848,      // <-- insert APP ID here
                    app_key: 'CBANPGGMEBABABABA'     // <-- insert APP PUBLIC KEY here
                };
                OKSDK.init(config, function() {
                    OKSDK.Widgets.getBackButtonHtml(function(html) {
                        console.log(html);
                    });
                    OKSDK.REST.call('users.getCurrentUser', null, function(status, data, error) {
                        if (status == 'ok') {
                            console.log('Hello World and hi, ' + data.name + '.');
                            console.dir(data);
                        } else {
                            alert('Unable to retrieve current user ' + OKSDK.Util.toString(error));
                        }
                    });
                }, function(error) {
                    alert('OKSDK error' + OKSDK.Util.toString(error));
                });

                okRequest();
                //compareUserData();
            }
        };



        PORTAL.modules.CabinetInput.AUTH.EMAIL = {

            "login": function () {
                alert('EMAIL LOGIN');
            },

            "status": function () {
                alert('EMAIL STAtUSs');
            }


        };

        var GoogleAuth;
        var GoogleUser;
        var socialUser = {};
        var googleStatus = function (responce) {
            if (responce) {
                GoogleUser = GoogleAuth.currentUser.get();
                var gUser = GoogleUser.getBasicProfile();
                socialUser.authType = "GMAIL";
                socialUser.userID = gUser.getId();
                socialUser.firstName = gUser.getGivenName();
                socialUser.lastName = gUser.getFamilyName();
                socialUser.nickname = gUser.getName();
                socialUser.email = gUser.getEmail();
                // checkIfUserExist(socialUser, authType);
                // PORTAL.utils.set_cookie("authType", authType, expires);
                // PORTAL.utils.set_cookie("authStatus", "authorized", expires);
                console.log('googleStatus OK:');
                console.log(responce);
            }
        };

        PORTAL.modules.CabinetInput.AUTH.init = function() {				// Можно тестить

            VK.init({
                apiId: 6428473
            });

            /*                window.vkAsyncInit = function() {
                                VK.init({
                                    apiId: 6428473
                                });
                            };*/

            /*  setTimeout(function() {
                  var el = document.createElement("script");
                  el.type = "text/javascript";
                  el.src = "https://vk.com/js/api/openapi.js?154";
                  el.async = true;
                  document.getElementById("vk_api_transport").appendChild(el);
              }, 0);*/

            /*   window.fbAsyncInit = function() {

            };*/

            FB.init({
                appId            : '2118542795094606',
                autoLogAppEvents : true,
                xfbml            : true,
                version          : 'v2.3'
                // version          : 'v3.0'
            });

            /*       (function(d, s, id){
                       var js, fjs = d.getElementsByTagName(s)[0];
                       if (d.getElementById(id)) {return;}
                       js = d.createElement(s); js.id = id;
                       js.src = "https://connect.facebook.net/en_US/sdk.js";
                       fjs.parentNode.insertBefore(js, fjs);
                   }(document, 'script', 'facebook-jssdk'));*/


            gapi.load('client:auth2', initClient);

            function initClient() {
                gapi.client.init({
                    clientId: "405790064850-9mrm6fnma5tghhucol6k3squjlupdj4o.apps.googleusercontent.com",
                    scope: 'https://www.googleapis.com/auth/drive.metadata.readonly'
                }).then(function () {
                    GoogleAuth = gapi.auth2.getAuthInstance();
                    GoogleAuth.isSignedIn.listen(googleStatus);
                    // if (authType == "GMAIL"){
                    //     PORTAL.modules.CabinetInput.AUTH[authType].status();
                    // }
                });
            }
//            handleClientLoad();

            if (authStatusFromCookie !== "authorized" && authTypeFromCookie) {
                //PORTAL.modules.LoginRegistration.AUTH[authType].status();
                PORTAL.modules.CabinetInput.AUTH[authTypeFromCookie].status();
                // V_K.status();
                // showCabinetSuccess();
            }

        };

        PORTAL.modules.CabinetInput.AUTH.init();  // Сделать запуск при начале регистрации / входа и если куки совпадают !


            $self.find("#vk-reg-btn").click(function () {
                PORTAL.modules.CabinetInput.AUTH.V_K.login();
                // V_K.login();
            });

            $self.find("#fb-reg-btn").click(function () {
                PORTAL.modules.CabinetInput.AUTH.FBOOK.login();
            });

            $self.find("#gmail-reg-btn").click(function () {
                PORTAL.modules.CabinetInput.AUTH.GMAIL.login();
            });

            $self.find("#ok-reg-btn").click(function () {
                PORTAL.modules.CabinetInput.AUTH.OK.login();
            });



            $self.find("#vk-login-btn").click(function () {
                PORTAL.modules.CabinetInput.AUTH.V_K.status();
                // V_K.status();
            });

            $self.find("#fb-login-btn").click(function () {
                PORTAL.modules.CabinetInput.AUTH.FBOOK.status();
            });

            $self.find("#gmail-login-btn").click(function () {
                PORTAL.modules.CabinetInput.AUTH.GMAIL.status();
            });

            $self.find("#ok-login-btn").click(function () {
                PORTAL.modules.CabinetInput.AUTH.OK.status();
            });

        // }()); // end -  --- с окнами входа и регистрации

    };

    return PORTAL;

})(PORTAL || {}, jQuery);





// {
//     // Client ID and API key from the Developer Console
//     var CLIENT_ID = '405790064850-9mrm6fnma5tghhucol6k3squjlupdj4o.apps.googleusercontent.com';
//
//     // Array of API discovery doc URLs for APIs used by the quickstart
//     var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];
//
//     // Authorization scopes required by the API; multiple scopes can be included, separated by spaces.
//     var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';
//
//     // var authorizeButton = document.getElementById('authorize-button');
//     // var authorizeButton = document.getElementById('gmail-login-btn');
//     var signoutButton = document.getElementById('signout-button');
//
//     /**  On load, called to load the auth2 library and API client library. */
//     function handleClientLoad() {
//         gapi.load('client:auth2', initClient);
//     }
//
//     /**
//      *  Initializes the API client library and sets up sign-in state
//      *  listeners.
//      */
//     function initClient() {
//         gapi.client.init({
//             discoveryDocs: DISCOVERY_DOCS,
//             clientId: CLIENT_ID,
//             scope: SCOPES
//         }).then(function () {
//             // Listen for sign-in state changes.
//             gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
//
//             // Handle the initial sign-in state.
//             updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//             // authorizeButton.onclick = handleAuthClick;
//             signoutButton.onclick = handleSignoutClick;
//         });
//     }
//
//     /**
//      *  Called when the signed in status changes, to update the UI
//      *  appropriately. After a sign-in, the API is called.
//      */
//     function updateSigninStatus(isSignedIn) {
//         if (isSignedIn) {
//             // authorizeButton.style.display = 'none';
//             // signoutButton.style.display = 'block';
//             listLabels();
//         } else {
//             // authorizeButton.style.display = 'block';
//             // signoutButton.style.display = 'none';
//         }
//     }
//
//     /**
//      *  Sign in the user upon button click.
//      */
//     function handleAuthClick(event) {
//         gapi.auth2.getAuthInstance().signIn();
//     }
//
//     /**
//      *  Sign out the user upon button click.
//      */
//     function handleSignoutClick(event) {
//         gapi.auth2.getAuthInstance().signOut();
//     }
//
//     /**
//      * Append a pre element to the body containing the given message
//      * as its text node. Used to display the results of the API call.
//      *
//      * @param {string} message Text to be placed in pre element.
//      */
//     function appendPre(message) {
//         var pre = document.getElementById('content');
//         var textContent = document.createTextNode(message + '\n');
//         pre.appendChild(textContent);
//     }
//
//     /**
//      * Print all Labels in the authorized user's inbox. If no labels
//      * are found an appropriate message is printed.
//      */
//     function listLabels() {
//         gapi.client.gmail.users.labels.list({
//             'userId': 'me'
//         }).then(function(response) {
//             var labels = response.result.labels;
//             appendPre('Labels:');
//
//             if (labels && labels.length > 0) {
//                 for (i = 0; i < labels.length; i++) {
//                     var label = labels[i];
//                     appendPre(label.name)
//                 }
//             } else {
//                 appendPre('No Labels found.');
//             }
//         });
//     }
//
//
// }
