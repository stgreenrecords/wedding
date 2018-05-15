
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
            var modal = document.querySelector("#entrance-form");

            var dataRegistration = {};
            var userLoginInfo = {};
            var authStatusFromCookie;
            var authTypeFromCookie;
            var userEmailFromCookie;
            var authType = 'EMAIL';

            authStatusFromCookie = Cookies.get('authStatus');
            authTypeFromCookie = Cookies.get('authType');
            userEmailFromCookie = Cookies.get('userEmail');

            $self.find('.mini-menu').on('click', function(){
                $self.find('.mini-menu-drop').toggleClass('hidden_cl');
            });

            $self.find('#mini-menu_exit').on('click', hideCabinetSuccess);

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
                    $self.find('#user_email').val(userEmailFromCookie);
                }
            }

            function showRegistrationForm() {
                modal.style.visibility = "visible";
                var mwindow = document.querySelector(".window-registation");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
            }

            function inputEmailFill(){
                $self.find('#email_finish-user').val(dataRegistration.email);
                $self.find('#email_finish-patner').val(dataRegistration.email);
            }

            function showCabinetSuccess(){
                cabinet_login.style.display = "none";
                cabinet_success.style.display = "flex";
            }

            function hideCabinetSuccess(){
                cabinet_success.style.display = "none";
                cabinet_login.style.display = "block";
                Cookies.set('authStatus', 'NotAuth');
                // Cookies.set('authType', '');
            }

            function setCookiesAuth(authStatusValue, authTypeValue){
                Cookies.set('authStatus', authStatusValue);
                Cookies.set('authType', authTypeValue);
            }

            function enterOfForm(){
                document.querySelector(".window-entrance").style.visibility = "hidden";
                modal.style.visibility = "hidden";
                showCabinetSuccess();
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
                        showCabinetPage(data);
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
                $self.find("#registration-email").val(dataRegistration.email) ;

            }

            entrance.addEventListener("click", showEntranceForm);
            entrance2.addEventListener("click", showEntranceForm);
            registration.addEventListener("click", showRegistrationForm);
            entrance2.addEventListener("click", function(){
                document.querySelector(".window-registation").style.visibility = "hidden";
            });

            function Social(type){
                this.login = function() {
                    console.log(type + ' login function ready');
                },
                    this.logout = function () {
                        console.log(type + ' logout function ready');
                    },
                    this.status = function () {
                        console.log(type + ' status function ready');
                        console.log(this );
                    }
            }

            var  FBook = new Social('FBook');

            FBook.login = function() {

            }

            function dataRegistrationFill(){
                dataRegistration.ID = userLoginInfo.userID;
                dataRegistration.firstName =  userLoginInfo.firstName;
                dataRegistration.lastName =  userLoginInfo.lastName;
                dataRegistration.email =  userLoginInfo.email;
                dataRegistration.authType = userLoginInfo.authType;
            }




            function initSocial(){

                /*VK.init({
                    apiId: 6428473,

                });*/
                // console.log('INIT VK SUCCESS!!!!!!');

       /*         VK.init(function() {
                    // apiId: 6428473
                    console.log('INIT VK SUCCESS!!!!!!');
                    // API initialization succeeded
                    // Your code here
                }, function() {
                    // API initialization failed
                    // Can reload page here
                }, '5.73');*/

          /*      VK.api("wall.post", {"message": "Hello!", "v":"5.73"}, function (data) {
                    alert("Post ID:" + data.response.post_id);
                });

                VK.callMethod("showSettingsBox", 8214);*/

                // window.fbAsyncInit = function () {

              /*  FB.init({
                    appId: '119308788738222',
                    autoLogAppEvents: true,
                    cookie: true,
                    status: true,
                    xfbml: true,
                    oauth: true,
                    version: 'v2.12'
                }, function(err){
                    console.log(err);

                });

                // initialize: function () {
                //      FB.init({ appId: ID приложения, cookie: true, oauth: true}, function(err){
                //           console.log(err);
                //      });
                //
                //       this.render();
                // };

                console.log('INIT FB SUCCESS!!!!!!');

                //     FB.AppEvents.logPageView();
                // };*/



//OK ---------------------------

           /* $.ajax({
                url: 'https://connect.ok.ru/oauth/authorize?client_id={1264974848}&scope={scope}&response_type={{response_type}}&redirect_uri={redirectUri}&layout={layout}&state={state}',
                type: "GET",
                dataType: "json",
                success:  (data) => {

                console.log('success OK !!!!!');

                },
                    error: (e) => {
                        console.log(e);
                    }
                });*/

           /*     OKSDK.init(1264974848, function() {



                    OKSDK.REST.call('users.getCurrentUser', null, function(status, data, error) {
                        if (status == 'ok') {
                            document.getElementById('content').innerHTML = 'Hello World and hi, ' + data.name + '.';
                        } else {
                            alert('Unable to retrieve current user ' + OKSDK.Util.toString(error));
                        }
                    });
                }, function(error) {
                    alert('OKSDK error' + OKSDK.Util.toString(error));
                });*/


            }

            initSocial();




            var V_K = {

                "login": function() {

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

                            /* vk_sid = response.session.sid;
                             console.dir(vk_sid);
                             var vk_req_token = 'https://oauth.vk.com/access_token?client_id=6428473&client_secret=cdphE3qkUL40XOSLiUPO&redirect_uri=http://youwedding&code=';
                             vk_req_token += vk_sid;

                             $.ajax({
                                 url: 'https://oauth.vk.com/access_token',
                                 method: 'POST',
                                 data: vk_req_token,
                                 success: function(response){
                                     console.log(response);
                                 }
                             });

                             console.log(vk_req_token);*/

                            dataRegistrationFill();
                            inputFirstStepRegFill();

                        }

                    });

                    // VK.Auth.login(function(res){
                    //        if (res.status === 'connected') {

                    //            var data = {};
                    //            data = res.session;

                    //            var user = {};
                    //            user = res.session.user;

                    //            VK.Api.call('users.get', { fields: 'sex,photo_50' }, function(res) {
                    //                if(res.response){
                    //                    user.photo = res.response[0].photo_50;
                    //                    user.gender = res.response[0].sex;
                    //                    data.user = user;

                    //                    $.ajax({
                    //                        url: '/auth/vk',
                    //                        method: 'POST',
                    //                        data: data,
                    //                        dataType: 'JSON',
                    //                        success: function(res){
                    //                            console.log(res);
                    //                        }
                    //                    });

                    //                }
                    //            });
                    //        }
                    //    }, 4194304 );

                },

                "logout": function () {
                    console.log('logout VK function ready');
                },

                "status": function () {

                    VK.Auth.getLoginStatus(function (response) {

                        var reqLinkGetUser = 'http://wedding-services.mycloud.by/services/rest.users/minsk.json?userId=';

                        if (response.status === "connected") {
                            userLoginInfo.authStatus = true;
                            userLoginInfo.userID = response.session.mid;
                            userLoginInfo.authType = "VK";
                            // reqLinkGetUser += userLoginInfo.userID;
                            reqLinkGetUser +='a931a267-ff17-4d89-ab80-e478c0a6de0a';
                            var reqData = sendLoginRequest(reqLinkGetUser);
                            setCookiesAuth('authorized', userLoginInfo.authType);
                            enterOfForm();
                            console.log('status function finish');
                            // console.dir(userLoginInfo);
                            // console.dir(reqData);
                        }

                    });

                }
            };

            var FBook = {

                "login": function() {
                    FB.login(function (response) {
                        if (response.status === "connected") {
                            FB.api('/me',
                                {fields: "id,first_name,link,last_name,name"},
                                function (response) {
                                    var responseUser = response;
                                    userLoginInfo.userID = responseUser.hasOwnProperty("id") ? responseUser.id : "";
                                    userLoginInfo.firstName = responseUser.hasOwnProperty("first_name") ? responseUser.first_name : "";
                                    userLoginInfo.lastName = responseUser.hasOwnProperty("last_name") ? responseUser.last_name : "";
                                    userLoginInfo.nickname = responseUser.hasOwnProperty("name") ? responseUser.name : "";
                                    userLoginInfo.href = responseUser.hasOwnProperty("link") ? responseUser.link : "";
                                    userLoginInfo.authType = "FACEBOOK";
                                    dataRegistrationFill();
                                    inputFirstStepRegFill();
                                });
                        }
                    });

                    console.log('login function ready');

                },

                "logout": function () {
                    console.log('logout function ready');
                },

                "status": function () {

                    // sendLoginRequest('/services/rest.login.json?wedding-session-id=1593572684');

                    if (true){
                        setCookiesAuth('authorized', authType);
                        enterOfForm();
                        console.log('status function ready');

                    }

                }

            };

            var GOOGLE = {

                "login": function() {

                    console.log('login  function ready');
                    dataRegistration.googleID = '357951';
                    dataRegistration.firstName =  'ANY_Name';
                    dataRegistration.lastName =  'ANY_Name';
                    dataRegistration.email =  'ANY_email@email.com';
                    inputFirstStepRegFill();
                    console.log('login function ready');
                },

                "logout": function () {
                    console.log('logout function ready');
                },

                "status": function (responce) {

                    // sendLoginRequest('/services/rest.login.json?wedding-session-id=1593572684');

                    if (true){
                        setCookiesAuth('authorized', authType);
                        enterOfForm();
                        console.log('status function ready');

                    }

                }

            };

            var OK = {

                "login": function() {

                    console.log('login  function ready');
                    dataRegistration.okID = '856123';
                    dataRegistration.firstName =  'ANY_Name';
                    dataRegistration.lastName =  'ANY_Name';
                    dataRegistration.email =  'ANY_email@email.com';
                    inputFirstStepRegFill();
                    console.log('login function ready');
                },

                "logout": function () {
                    console.log('logout function ready');
                },

                "status": function () {

                    // sendLoginRequest('/services/rest.login.json?wedding-session-id=1593572684');

                    if (true){
                        setCookiesAuth('authorized', authType);
                        enterOfForm();
                        console.log('status function ready');

                    }

                }

            };

            $self.find("#vk-reg-btn").click(function () {
                authType = "VK";
                V_K.login();
            });

            $self.find("#fb-reg-btn").click(function () {
                authType = "FACEBOOK";
                FBook.login();
            });

            $self.find("#gmail-reg-btn").click(function () {
                authType = "GOOGLE";
                GOOGLE.login();
            });

            $self.find("#ok-reg-btn").click(function () {
                authType = "OK";
                OK.login();
            });



            $self.find("#vk-login-btn").click(function () {
                authType = "VK";
                V_K.status();
            });

            $self.find("#fb-login-btn").click(function () {
                authType = "FACEBOOK";
                FBook.status();
            });

            $self.find("#gmail-login-btn").click(function () {
                authType = "GOOGLE";
                GOOGLE.status();
            });

            $self.find("#ok-login-btn").click(function () {
                authType = "OK";
                OK.status();
            });


            enter.addEventListener("click", function(){

                enterOfForm();
                setCookiesAuth('authorized', 'EMAIL');
                if ($self.find('#remember-ident').val() === 'remember-ident-user'){
                    Cookies.set('userEmail', $self.find('#user_email').val());
                }

            });

            function secondStepRegWindow(){
                document.querySelector(".window-registation").style.visibility = "hidden";
                var mwindow = document.querySelector(".window-registation-step2");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
            }

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
                        // dataRegistration.password = password;
                        console.dir(dataRegistration);

                    } else {
                        alert("Все поля должны быть заполнены. Поле Эл. Почта в формате example@domain.com");
                    }
                });
            })();

            function compileInput(){
                return compl_inp_obj;
            }

            function lastStepRegPartner(){

                console.log("lastStepRegPartner ON success " );

                $self.find(".window-registation-step2").css('visibility', "hidden");
                var mwindow3 = document.querySelector(".window-registation-step3-partner"); // TODO заменить на function
                mwindow3.style.visibility = "visible";
                mwindow3.style.left = (document.documentElement.clientWidth - mwindow3.getBoundingClientRect().width)/2 + "px";
                mwindow3.style.top = (document.documentElement.clientHeight - mwindow3.getBoundingClientRect().height)/3 + "px";

                $.ajax({ // Запрос на добавление всех категорий в селект
                    url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        var allCategories = data;

                        console.dir(allCategories);
                        for (var prop in allCategories){
                            $self.find('#work-sphere').append('<option value="'+prop+ '">' + prop + '</option>');
                        }
                    },
                    error: function () { // На случай если запрос не прошел - сферу пишет вручную
                        $self.find('#work-sphere').detach();
                        $self.find('#form-reg-step3-partner').prepend('<p><input id="work-sphere" type="text" placeholder="Сфера деятельности"></p>');
                        console.log("success allCategories");
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

                    dataRegistration.workSphere =  work_sphere;
                    dataRegistration.city =  city;
                    dataRegistration.tel =  tel;
                    dataRegistration.vkLink =  vk;
                    dataRegistration.fbLink =  fb;
                    dataRegistration.okLink =  ok;
                    dataRegistration.siteLink =  site;

                    if ( work_sphere  &&  tel &&  city && ($self.find("input[name='consent-part']:checked").val() === 'consent-partner')  /*!= 'null'*/) {
                        mwindow3.style.visibility = "hidden";
                        modal.style.visibility = "hidden";
                        showCabinetSuccess();
                        console.dir(dataRegistration);
                        setCookiesAuth('authorized', authType);
                        sendRegInfo("http://wedding-services.mycloud.by/services/rest.partner.create");
                        document.location.href = `/content/wedding/catalog/category/partner.html#`/*${registrationId}*/;

                    } else /*if ($("input[name='consent']:checked").val() === undefined)*/{
                        $self.find('.registation3_errore_message').css('display','flex');
                        $self.find(".window-registation-step3-partner input").one('focus', function(){
                            $self.find('.registation3_errore_message').css('display','none');
                        });
                    }

                });

            }

            function sendUserRegInfo(url_link, city){

                $.ajax({
                    url: url_link, // 'http://wedding-services.mycloud.by/services/rest.users/create.json'
                    type: "POST",
                    dataType: "json",
                    data: dataRegistration, // Все данные из инпутов
                    path: `/home/users/wedding/users/${city}`,
                    beforeSend: function () {
                        console.log("как сча отправлю !");
                    },
                    success: function (data) {

                        console.log(data);
                        // console.dir(dataRegistration);
                        // showCabinetPage(data);
                        console.log('Наверное еще не настроили приемку на сервере | ');

                    },
                    error: function (e) {
                        console.log('Что-то пошло не так (');
                        console.log(e);
                    }
                });

            }

            function lastStepRegUser(){

                console.log("lastStepRegUSSEERRR ON success ");
                $self.find(".window-registation-step2").css('visibility', "hidden");
                var mwindow3 = document.querySelector(".window-registation-step3-user");
                mwindow3.style.visibility = "visible";
                mwindow3.style.left = (document.documentElement.clientWidth - mwindow3.getBoundingClientRect().width)/2 + "px";
                mwindow3.style.top = (document.documentElement.clientHeight - mwindow3.getBoundingClientRect().height)/3 + "px";

                $self.find("#btn-registration-finish-user").on("click", function(){

                    var city = $self.find("#city_finish-user").val();
                    var tel = $self.find("#tel_finish-user").val();
                    var vk = $self.find("#vk_finish-user").val();
                    var fb = $self.find("#fb_finish-user").val();
                    var ok = $self.find("#ok_finish-user").val();

                    dataRegistration.city =  city;
                    dataRegistration.phone =  tel;
                    dataRegistration.vkLink =  vk;
                    dataRegistration.fbLink =  fb;
                    dataRegistration.okLink =  ok;
                    dataRegistration.id =  'ff'+Math.floor(Math.random()*1000000)+'-'+Math.floor(Math.random()*10000)+'-'+Math.floor(Math.random()*10000)+'-'+Math.floor(Math.random()*10000)+'-'+Math.floor(Math.random()*100000000)+'user';

                    if ( tel && city &&  ($self.find("#consent-user-check:checked").val() === 'consent-user')){
                        mwindow3.style.visibility = "hidden";
                        modal.style.visibility = "hidden";
                        sendUserRegInfo('http://wedding-services.mycloud.by/services/rest.users/create.json', dataRegistration.city);
                        showCabinetSuccess();
                        console.dir(dataRegistration);
                        setCookiesAuth('authorized', authType);

                        Cookies.set('userType', 'user');
                        Cookies.set('city', city);
                        Cookies.set('userId', 'id');
                        // document.location.href = '/content/wedding/catalog.html#';

                    } else /*if ($("input[name='consent']:checked").val() === undefined)*/{
                        $self.find('.registation3_errore_message').css('display','flex');
                        $self.find(".window-registation-step3-user input").one('focus', function(){
                            $self.find('.registation3_errore_message').css('display','none');
                        });
                    }
                });

            }

            reg_futher2.addEventListener("click", function(){

                inputEmailFill();

                if ($self.find("input[name='selected-role']:checked").val() === 'cheked_part'){

                    // dataRegistration.userType =  "PARTNER";
                    lastStepRegPartner();

                }else if ($self.find("input[name='selected-role']:checked").val() === 'cheked_us'){

                    // dataRegistration.userType =  "USER";
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
