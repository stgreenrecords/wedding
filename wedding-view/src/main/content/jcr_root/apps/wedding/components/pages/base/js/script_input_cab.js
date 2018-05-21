
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

                openMWindow(".window-entrance");

                if (userEmailFromCookie != 'undefined') {
                    $self.find('#user_email').val(userEmailFromCookie);
                }
            }

            function showRegistrationForm() {
                openMWindow(".window-registation");
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
                document.location.reload();
            }

            function setCookiesAuth(authStatusValue, authTypeValue){
                Cookies.set('authStatus', authStatusValue);
                Cookies.set('authType', authTypeValue);
            }

            function enterOfForm(){
                closeMWindow(".window-entrance");
                showCabinetSuccess();
            }

            function closeMWindow(query){
                document.querySelector(query).style.visibility = "hidden";
                modal.style.visibility = "hidden";
            }

            function openMWindow(query){ //gg
                modal.style.visibility = "visible";
                var mwindow3 = document.querySelector(query);
                mwindow3.style.visibility = "visible";
                mwindow3.style.left = (document.documentElement.clientWidth - mwindow3.getBoundingClientRect().width)/2 + "px";
                mwindow3.style.top = (document.documentElement.clientHeight - mwindow3.getBoundingClientRect().height)/3 + "px";
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
                $self.find("#registration-email").val(dataRegistration.email) ;

            }

            entrance.addEventListener("click", showEntranceForm);
            entrance2.addEventListener("click", showEntranceForm);
            registration.addEventListener("click", showRegistrationForm);

            entrance2.addEventListener("click", function(){
                document.querySelector(".window-registation").style.visibility = "hidden";
            });

            function dataRegistrationFill(){
                dataRegistration.ID = userLoginInfo.userID;
                dataRegistration.firstName =  userLoginInfo.firstName;
                dataRegistration.lastName =  userLoginInfo.lastName;
                dataRegistration.email =  userLoginInfo.email;
                dataRegistration.authType = userLoginInfo.authType;
            }

            enter.addEventListener("click", function(){

                enterOfForm();
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
                closeMWindow(".window-registation");
                openMWindow(".window-registation-step2");
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

                closeMWindow(".window-registation-step2");
                openMWindow(".window-registation-step3-partner");

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
                    dataRegistration.path =  '/home/users/wedding/partners/photographers/grodno';

                    if ( work_sphere  &&  tel &&  city && ($self.find("input[name='consent-part']:checked").val() === 'consent-partner')  /*!= 'null'*/) {

                        closeMWindow(".window-registation-step3-partner");
                        sendPartnerRegInfo("http://wedding-services.mycloud.by/services/rest.partners/create.json");
                        console.dir(dataRegistration);
                        showCabinetSuccess();
                        setCookiesAuth('authorized', authType);



                        // document.location.href = `/content/wedding/catalog/category/partner.html#`/*${registrationId}*/;

                    } else /*if ($("input[name='consent']:checked").val() === undefined)*/{
                        $self.find('.registation3_errore_message').css('display','flex');
                        $self.find(".window-registation-step3-partner input").one('focus', function(){
                            $self.find('.registation3_errore_message').css('display','none');
                        });
                    }

                });

            }


            function sendPartnerRegInfo(url_link, city){

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
                         if (data && work_sphere) {
                             console.log('Ниже должен быть ответ:');
                             console.dir(data);
                             console.log('это успех!');
                             Cookies.set('userId', data.id);

                             Cookies.set('userType', 'partner');
                             Cookies.set('workSphere', work_sphere);
                             Cookies.set('city', city);
                             document.location.href = `/content/wedding/catalog/category/partner.html?${data.id}#${work_sphere}&${city}`;
                         }
                    },
                    complete: function () {

                    },
                    error: function (e) {
                        console.log('Что-то пошло не так (');
                        console.log(e);
                    }
                });

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
                        Cookies.set('userId', data.id);
                        // Cookies.set('city', data.city);
                        // showCabinetPage(data);
                        // }
                        // document.location.href = '/content/wedding/catalog.html#'; // TODOC - сделать переход в каталог - когда заполнят всех юзеров
                        document.location.href = `/content/wedding/user.html`;

                    },
                    complete: function () {
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так :( ');
                        console.log(e);
                    }
                });


            }


            function lastStepRegUser(){

                closeMWindow(".window-registation-step2");
                openMWindow(".window-registation-step3-user");

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

                        closeMWindow(".window-registation-step3-user");

                        sendUserRegInfo('http://wedding-services.mycloud.by/services/rest.users/create.json', dataRegistration.city);
                        showCabinetSuccess();
                        setCookiesAuth('authorized', authType);

                        Cookies.set('userType', 'user');
                        Cookies.set('city', city);



                    } else /*if ($("input[name='consent']:checked").val() === undefined)*/{
                        $self.find('.registation3_errore_message').css('display','flex');
                        $self.find(".window-registation-step3-user input").one('focus', function(){
                            $self.find('.registation3_errore_message').css('display','none');
                        });
                    }
                });

            }

            modal.addEventListener("click", function(evt) {
                if (evt.target === document.querySelector("#entrance-form")) {
                    this.style.visibility = "hidden";
                    Array.from(this.children).forEach(function(elem) {
                        elem.style.visibility = "hidden";
                    });
                }
            });


            /*==============================================================================================================================
            ====================================================================================================================================
            ====================================================================================================================================
            ====================================================================================================================================*/


        }()); // end -  --- с окнами входа и регистрации

    };

    return PORTAL;

})(PORTAL || {}, jQuery);





                // TEMP - delete tomorrow

                /*$.ajax({
                    // url: url_link, // 'http://wedding-services.mycloud.by/services/rest.users/create.json'
                    url: 'http://wedding-services.mycloud.by/services/rest.users/create.json',
                    type: "POST",
                    dataType: "json",
                    // data: dataRegistration,
                    data: {'path': '/home/users/wedding/users/minsk','city': 'minsk'},
                    // path: `/home/users/wedding/users/${city}`,
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                        console.log(" Шлем №3 это:  beforeSend post !");
                        // console.log(dataRegistration);
                        console.log({'path': '/home/users/wedding/users/minsk/test','city': 'minsk'});
                    },
                    success: function (data) {
                        // if (data) {
                        console.log('Ниже должен быть ответ:');
                        console.dir(data);
                        console.log('это успех!');
                        Cookies.set('userId', data.id);
                        // showCabinetPage(data);

                        // }
                    },
                    complete: function () {
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так :( ');
                        console.log(e);
                    }
                });*/

/*      $.ajax({
          url: 'http://wedding-services.mycloud.by/services/rest.users/create.json',
          type: "POST",
          dataType: "json",
          data: dataRegistration,
          beforeSend: function (xhr) {
              xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
          },
          success: function (data) {
              console.log("Шлем №2 это:");
              console.dir(dataRegistration);
              console.log('Ниже должен быть ответ:');
              console.dir(data);
              console.log(data);
          },
          error: function (e) {
              console.log('Что-то пошло не так :( ');
              console.log(e);
          }

      });*/

/*          $.ajax({
              url: 'http://wedding-services.mycloud.by/services/rest.users/create.json',
              type: "POST",
              dataType: "json",
              data: {'path': '/home/users/wedding/users/minsk'},
              beforeSend: function (xhr) {
                  xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));

              },
          success: function (data) {
              console.log("Шлем №1 это:");
              console.log({'path': '/home/users/wedding/users/minsk'});
              console.log('Ниже должен быть ответ:');
                  console.dir(data);
              },
              error: function (e) {
                  console.log('Что-то пошло не так :( ');
                  console.log(e);
              }

          });*/



/*
                $.ajax({
                    url: '/services/rest.users/create.json',
                    type: "POST",
                    dataType: "json",
                    data: {'path': '/home/users/wedding/users/minsk/test'}, // Все данные

                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                        console.log("beforeSend post !");
                    },
                    success: function (data) {

                        console.log('Ниже должен быть ответ:');
                        console.dir(data);

                    },
                    complete: function () {
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так   ');
                        console.log(e);
                    }
                });*/


