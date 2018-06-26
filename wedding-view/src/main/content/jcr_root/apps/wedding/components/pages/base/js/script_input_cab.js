
var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.CabinetInput = {};

    PORTAL.modules.CabinetInput.selfSelector = "#cabinet-input-block";

    PORTAL.modules.CabinetInput.init = function ($self) {

        console.log('Component: "#cabinet-input-block"');

        (function(){ // Работа с окнами входа и регистрации

            var entrance = document.getElementById("entrance-cabinet-btn");
            var registration = document.getElementById("registration-btn");
            var entrance2 = document.querySelector(".have-account-entrance");
            // var reg_futher = document.querySelector('#btn-registration-futher');
            var reg_futher2 = document.querySelector('#btn-registration-futher2');
            var enter = document.getElementById("btn-entrance-form");
            // var modal = document.querySelector("#entrance-form");

            var dataRegistration = {};
            var userLoginInfo = {};
            var authType = 'EMAIL';

            var authStatusFromCookie = Cookies.get('authStatus');
            var authTypeFromCookie = Cookies.get('authType');
            var userEmailFromCookie = Cookies.get('userEmail');
            var userIdFromCookie  = Cookies.get('userId');
            var userTypeFromCookie = Cookies.get('userType');
            var cityFromCookie = Cookies.get('city');
            var workSphereFromCookie = Cookies.get('workSphere');

            $self.find('.mini-menu').on('click', function(){
                $self.find('.mini-menu-drop').toggleClass('hidden_cl');
            });

            $self.find('#mini-menu_exit').on('click', hideCabinetSuccess);



            if (authStatusFromCookie === "authorized" && authTypeFromCookie ) {
                //PORTAL.modules.LoginRegistration.AUTH[authType].status();
                showCabinetSuccess();
            }

            entrance.addEventListener("click", function(evt) {
                this.style.color = "#555";
            });

            // modalW.modalle("#entrance-form"); //
            // modalW.listenerModal();

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
            }

            function myPageReloc() {
                if (Cookies.get('userType')=='partner')
                    document.location.href = `content/wedding/catalog/category/partner.html?${Cookies.get('userId')}#${Cookies.get('worksphere')}&${Cookies.get('city')}`;
               else if(Cookies.get('userType')=='user')
                    document.location.href = `/content/wedding/user.html`;
                else
                    alert ('Войдите или зарегестрируйтесь');
            }

            function hideCabinetSuccess(){
                cabinet_success.style.display = "none";
                cabinet_login.style.display = "block";

                Cookies.set('authStatus', 'NotAuth');
                Cookies.set('userId', 'null');
                Cookies.set('authType', '');
                Cookies.set('firstName', '');
                Cookies.set('lastName', '');
                Cookies.set('city', '');
                // Cookies.get('userType')=='partner' ? Cookies.set('workSphere', '') : '';
                Cookies.remove('workSphere');
                Cookies.set('userType', '');
                document.location.reload();
            }

            function setCookiesAuth(authStatusValue, authTypeValue){
                Cookies.set('authStatus', authStatusValue);
                Cookies.set('authType', authTypeValue);
            }

            function enterOfForm(){
                modalW.closeMWindow(".window-entrance", "#entrance-form");
                showCabinetSuccess();
            }

            /*---*/

            function sendLoginRequest(url_link){

                $.ajax({
                    url: url_link,
                    type: "GET",
                    dataType: "json",

                    success: function (data) {
                        console.log("Аякс с юзером прошел");
                        showCabinetPage(data);
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так (');
                        console.log(e);
                    }

                });

            }

            function showCabinetPage(data){
                console.log(' ============ showCabinet - in the studia ) ============ ');
                console.dir(data);
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

                $.ajax({ // Запрос на добавление всех категорий в селект
                    url: "http://wedding-services.mycloud.by/services/rest.loginUser.json?id=XXX",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        setCookiesAll(data);
                        enterOfForm();
                    },
                    error: function (e) { // На случай если запрос не прошел - сферу пишет вручную
                       console.log(e);
                    }
                });


                setCookiesAuth('authorized', 'EMAIL');
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
                        $self.find('.registation3_errore_message').css('display','flex');
                        $self.find(".window-registation-step3-partner input").one('focus', function(){
                            $self.find('.registation3_errore_message').css('display','none');
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
                         if (data/* && work_sphere*/) {
                             showCabinetSuccess();
                             setCookiesAll(data);

                             // authType == '' ? document.location.href = `/content/wedding/catalog/category/partner.html?${data.id}#${data.speciality}&${data.city}`
                             //                 :  ;


                             // console.log('Ниже должен быть ответ:');
                             // console.dir(data);
                             // console.log('это успех!');
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

               setCookiesAuth('authorized', authType);
               Cookies.set('userId', data.id);

               if(data.speciality && data.speciality !=null && data.speciality !='') {
                   Cookies.set('userType', 'partner');
                   Cookies.set('workSphere', data.speciality);
                   // $self.find('#mini-menu_my-page a').attr('href', '/content/wedding/catalog/category/partner.html');
               }else
                   Cookies.set('userType', 'user');

               data.city ? Cookies.set('city', data.city): '';
               data.firstName ? Cookies.set('firstName', data.firstName): '';
               data.lastName ? Cookies.set('lastName', data.lastName): '';

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
                        // Cookies.set('userId', data.id);
                        // Cookies.set('city', data.city);
                        // document.location.href = '/content/wedding/catalog.html#'; // TODOC - сделать переход в каталог - когда заполнят всех юзеров
                        // document.location.href = `/content/wedding/user.html`;
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
                        showCabinetSuccess();
                        // setCookiesAuth('authorized', authType);

                        // Cookies.set('userType', 'user');
                        // Cookies.set('city', city);



                    } else /*if ($("input[name='consent']:checked").val() === undefined)*/{
                        $self.find('.registation3_errore_message').css('display','flex');
                        $self.find(".window-registation-step3-user input").one('focus', function(){
                            $self.find('.registation3_errore_message').css('display','none');
                        });
                    }
                });

            }

            // modal.addEventListener("click", function(evt) {
            //     if (evt.target === document.querySelector("#entrance-form")) {
            //         this.style.visibility = "hidden";
            //         Array.from(this.children).forEach(function(elem) {
            //             elem.style.visibility = "hidden";
            //         });
            //     }
            // });


            /*==============================================================================================================================
 =========================           ====================================================================================================================================
            ====================================================================================================================================
  =============================          ====================================================================================================================================*/



            function initSocial() {				// Можно тестить

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

                handleClientLoad();


            }

            initSocial();  // Сделать запуск при начале регистрации / входа и если куки совпадают !



            var V_K = {

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
                            userLoginInfo.authType = "VK";

                            dataRegistrationFill();
                            inputFirstStepRegFill();

                        }

                    });

                },

                "status": function () {
                    VK.Auth.getLoginStatus(function (response) {
                        if (response.status === "connected") {
                            authStatus = true;
                            userLoginInfo.userID = response.session.mid;
                            userLoginInfo.authType = "VK";

                            console.log('The great success !!!!!  getLoginStatus true ');
                            console.log(response);

                        }
                    });
                }

            };


            var FBook = {

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
                    });

                },

                "status": function () {
                    FB.getLoginStatus(function(response) {
                        if (response.status === 'connected') {
                            console.log(response);
                            // var uid = response.authResponse.userID;
                            // var accessToken = response.authResponse.accessToken;
                        } else if (response.status === 'not_authorized') {
                            console.log(response);
                            console.log(response.status);
                        } else {
                            console.log('EGC UPS');
                        }
                    });
                }

            };




            // <button id="authorize-button" style="display: none;">Authorize</button>
            // <button id="signout-button" style="display: none;">Sign Out</button>
            //
            // <pre id="content"></pre>

            // Client ID and API key from the Developer Console
            var CLIENT_ID = '405790064850-9mrm6fnma5tghhucol6k3squjlupdj4o.apps.googleusercontent.com';
            // Array of API discovery doc URLs for APIs used by the quickstart
            var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest"];

            // Authorization scopes required by the API; multiple scopes can be
            // included, separated by spaces.
            var SCOPES = 'https://www.googleapis.com/auth/gmail.readonly';

            var authorizeButton = document.getElementById('authorize-button');
            var signoutButton = document.getElementById('signout-button');

            /**
             *  On load, called to load the auth2 library and API client library.
             */
            function handleClientLoad() {
                gapi.load('client:auth2', initClient);
            }

            /**
             *  Initializes the API client library and sets up sign-in state
             *  listeners.
             */
            function initClient() {
                gapi.client.init({
                    discoveryDocs: DISCOVERY_DOCS,
                    clientId: CLIENT_ID,
                    scope: SCOPES
                }).then(function () {
                    // Listen for sign-in state changes.
                    gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

                    // Handle the initial sign-in state.
                    updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
                    // authorizeButton.onclick = handleAuthClick;
                    // signoutButton.onclick = handleSignoutClick;
                });
            }

            // function updateSigninStatus(isSignedIn) {
            //     if (isSignedIn) {
            //         authorizeButton.style.display = 'none';
            //         signoutButton.style.display = 'block';
            //         listLabels();
            //     } else {
            //         authorizeButton.style.display = 'block';
            //         signoutButton.style.display = 'none';
            //     }
            // }

           // Sign in the user upon button click.

            function handleAuthClick(event) {
                gapi.auth2.getAuthInstance().signIn();
            }

            /**
             *  Sign out the user upon button click.
             */
            function handleSignoutClick(event) {
                gapi.auth2.getAuthInstance().signOut();
            }

            /**
             * Append a pre element to the body containing the given message
             * as its text node. Used to display the results of the API call.
             *
             * @param {string} message Text to be placed in pre element.
             */

            function appendPre(message) {
                // var pre = document.getElementById('content');
                // var textContent = document.createTextNode(message + '\n');
                // pre.appendChild(textContent);
                console.log(message);
            }


             // * Print all Labels in the authorized user's inbox. If no labels
             // * are found an appropriate message is printed.
            function listLabels() {
                gapi.client.gmail.users.labels.list({
                    'userId': 'me'
                }).then(function(response) {
                    var labels = response.result.labels;
                    appendPre('Labels:');

                    if (labels && labels.length > 0) {
                        for (i = 0; i < labels.length; i++) {
                            var label = labels[i];
                            appendPre(label.name)
                        }
                    } else {
                        appendPre('No Labels found.');
                    }
                });
            }



            var GMAIL = {

                "login": function () {

                    handleAuthClick();


                    // gmail.login(function (response) {
                    //     console.log(response);
                    // });

                },

                "status": function () {

                }


            };


            $self.find("#vk-reg-btn").click(function () {
                authType = "VK"; //  replace
                console.log('VK reg ON');
                V_K.login();
            });

            $self.find("#fb-reg-btn").click(function () {
                authType = "FACEBOOK"; //  replace
                FBook.login();
            });

            $self.find("#gmail-reg-btn").click(function () {
                authType = "GMAIL"; //  replace
                GMAIL.login();
            });



            $self.find("#vk-login-btn").click(function () {
                // authType = "FACEBOOK";
                V_K.status();
            });

            $self.find("#fb-login-btn").click(function () {
                // authType = "FACEBOOK";
                FBook.status();
            });




        }()); // end -  --- с окнами входа и регистрации

    };

    return PORTAL;

})(PORTAL || {}, jQuery);

