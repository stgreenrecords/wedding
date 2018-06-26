var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.User = {};

    PORTAL.modules.User.selfSelector = "#user-page-content";

    PORTAL.modules.User.init = function ($self) {

        console.log('Component: "User"');

        var selectedPerson;
        var calc_aside =  $self.find('#calc_aside_sect');
        var user_tenders = $self.find('#user_tenders');
        var user_id = Cookies.get('userId');
        var user_city = Cookies.get('city');
        console.log(user_city, user_id);

        if (Cookies.get('authStatus') === 'authorized'){

            // var userUrl = 'http://wedding-services.mycloud.by/services/rest.users/minsk.json?userId=a931a267-ff17-4d89-ab80-e478c0a6de0a';
            // var userUrl = 'http://wedding-services.mycloud.by/services/rest.users/minsk.json?id=a9cce9a5-5820-49d8-8bd7-f44fc706cb90';
            var userUrl = `http://wedding-services.mycloud.by/services/rest.users/${user_city}.json?id=${user_id}`;
            console.log(userUrl);
            // console.log(selectedPersonRequest);

            $.ajax({
                url: userUrl,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    selectedPerson = data[0];

                    console.log('INFO:');
                    console.dir(selectedPerson);

                    if (data)
                        fillStrings(selectedPerson);


                    if (Cookies.get('userId') === selectedPerson.id) {
                        console.log("It's REALY MY **** USER ***** CABINET  !!!!");
                        myCabinet();
                    }


                    if (selectedPerson.tenders)
                        fillTenders(selectedPerson.tenders);

                }

            });


            var btn_change = $self.find('.avatar_btn_change');
            var btn_save = $self.find('.btn_change_save_change');


            var firstName =  $self.find('.profil_name');
            var lastName = $self.find('.profil_secondname');
            var phoneNum =  $self.find('.phone_string');
            var eMail = $self.find('.mail_string');
            var vkLink = $self.find('.vk_string');
            var create_tender = $self.find('.create_tender_icon');
            var edit_avatar = $self.find('.edit_avatar_btns');


            function myCabinet(){

                btn_change.removeClass('hidden_full');
                create_tender.removeClass('hidden_full');
                btn_change.on('click', onChangeFields);
                $self.find('.user_avatar_btn_mail').addClass('hidden_full');
                create_tender.on('click', createTender);

            }

            function createTender(){
                //modalWindowsOn();
                console.log('createTender ON');

                var tenderSend = {};
                var date = new Date();
                // tenderSend.datePublication = date;
                // tenderSend.deadline = date/* + 3600000000*/;
                tenderSend.shortText = 'Z,flf,fleeeee';
                tenderSend.path = `${selectedPerson.resourcePath}/tenders`;
                tenderSend.offers = ';kshfaksfh;aksdjfalks;jdhfalskdfbalskdfblaksdnblkajsfdlkasjdfb,.k';
                tenderSend.moneyLimit = '500';
                tenderSend.firstName = selectedPerson.firstName;
                tenderSend.lastName = selectedPerson.lastName;
                tenderSend.city = selectedPerson.city;
                tenderSend.avatar  = selectedPerson.avatar;
                tenderSend.backGroundImage = selectedPerson.backGroundImage;
                tenderSend.id = selectedPerson.id;

                console.dir(tenderSend);
                console.log(tenderSend.path);



                $.ajax({

                    url: 'http://wedding-services.mycloud.by/services/rest.tenders/create.json',
                    type: "POST",
                    dataType: "json",
                    data: tenderSend,
                      beforeSend: function (xhr) {
                          xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                          console.log("beforeSend post !");
                          console.log();
                      },
                    success: function (data) {
                        console.log('Ниже должен быть ответ? наверное:');
                        console.dir(data);
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так :( ');
                        console.log(e);
                    }
                });

            }




            function onChangeFields(){

                console.log('Я могу ВСЕ изменить!!!!');
                btn_change.addClass('hidden_full');
                btn_save.removeClass('hidden_full');
                edit_avatar.removeClass('hidden_full');
                onInputFields();
                btn_save.one('click', saveChangeFields);
            }

            function onInputFields(){

                var changeName = firstName.html();
                var changeLastName = lastName.html();
                var changePhoneNum = phoneNum.html();
                var changeVkLink = vkLink.html();

                firstName.html(`<input value=${changeName}>`);
                lastName.html(`<input value=${changeLastName}>`);
                phoneNum.html(`<input value=${changePhoneNum}>`);
                vkLink.html(`<input value=${changeVkLink}>`);

                console.log(changeName);

            }




            function saveChangeFields() {

                var dataSend = {};
                btn_save.addClass('hidden_full');
                edit_avatar.addClass('hidden_full');
                btn_change.removeClass('hidden_full');

                dataSend.id = selectedPerson.id;
                dataSend.firstName = firstName.find('input').val();
                dataSend.lastName = lastName.find('input').val();
                dataSend.phone = phoneNum.find('input').val();
                dataSend.vkLink = vkLink.find('input').val();

                firstName.html(`${dataSend.firstName}`);
                lastName.html(`${dataSend.lastName}`);
                phoneNum.html(`${dataSend.phone}`);
                vkLink.html(`${dataSend.vkLink}`);
                vkLink.attr('href',`${dataSend.vkLink}`);


                sendChangeRequest(dataSend);
                console.log(dataSend);

            }



            function sendChangeRequest(dataSend){

                $.ajax({

                    url: 'http://wedding-services.mycloud.by/services/rest.users/update.json',
                    type: 'PUT',
                    dataType: 'json',
                    data: dataSend,
                    success: function(data){
                        console.log('What you send for me?');
                        console.log(data);

                    }

                });

                revertStandartFields();

            }

            function revertStandartFields(){


            }



            function fillStrings(selectedPerson){

                firstName.text(selectedPerson.firstName);
                lastName.text(selectedPerson.lastName);
                phoneNum.text(selectedPerson.phone);

                if(selectedPerson.avatar)
                    $self.find(".user_avatar").css("background-image", `url('${selectedPerson.avatar}')`);
                if(selectedPerson.email)
                    eMail.text(selectedPerson.email);
                if(selectedPerson.vkLink) {
                    vkLink.text(selectedPerson.vkLink);
                    vkLink.attr('href',`${dataSend.vkLink}`);
                }
                // $self.find('.fb_string').text(selectedPerson.facebookLink);
                // $self.find('.insta_string').text(selectedPerson.instagramLink);

            }

            function fillTenders(tenders){

                $self.find('.user_tenders-container > div').detach();
                var first_div = document.querySelector(".hidden_full .tender_card");
                var main_container =  document.querySelector(".user_tenders-container");
                var copy_div = first_div.cloneNode(true);

                for (var i = 0; i<tenders.length; i++){
                    var publDate = new Date(tenders[i].datePublication);
                    var deadLine = new Date(tenders[i].deadline);
                    copy_div = first_div.cloneNode(true);
                    copy_div.querySelector(".tender_card_href").setAttribute("href",`/content/wedding/tenders/tender.html?${tenders[i].id}#${tenders[i].city}`);
                    copy_div.querySelector(".publish_date").innerHTML = `${publDate.getDate()}.${publDate.getMonth()+1}.${publDate.getFullYear()}`;
                    copy_div.querySelector(".tender_card-city").innerHTML = `г. ${tenders[i].city}`;
                    copy_div.querySelector(".tender_card-dead_line").innerHTML = `${deadLine.getDate()}.${deadLine.getMonth()+1}.${deadLine.getFullYear()}`;
                    copy_div.querySelector(".tender_card-budget_count").innerHTML = tenders[i].moneyLimit;
                    copy_div.querySelector(".short_text_text").innerHTML = tenders[i].shortText;
                    main_container.appendChild(copy_div);
                }

                user_tenders.find('.tender_card-remove_icon').on('click', removeTender);

            }

            function removeTender(){

                var isAdmin = confirm("Вы действительно хотите удалить тендер?");
                if (isAdmin){
                    alert('Тендер Удались!');
                }

            }

            (function(){  //  функции переключения страниц

                var user_calc  = $self.find('#user_calc');
                var user_tend  = $self.find('#user_tenders');

                var calc_btn =  $self.find('#user_calc_btn');
                var tend_btn = $self.find('#user_tenders_btn');
                var cabinet_aside = $self.find('#cabinet_aside_sect');


                calc_btn.on('click', openPageCalc);
                tend_btn.on('click', openPageTend);



                function openPageCalc(event){
                    console.log(event.target.id);
                    user_tend.addClass('hidden_full');
                    user_calc.removeClass('hidden_full');
                    tend_btn.removeClass('user_menu_btn_active');
                    calc_btn.addClass('user_menu_btn_active');
                    calc_aside.removeClass('hidden_full');
                    cabinet_aside.addClass("hidden_full");
                }

                function openPageTend(event){
                    console.log(event.target.id);
                    user_calc.addClass('hidden_full');
                    user_tend.removeClass('hidden_full');
                    calc_btn.removeClass('user_menu_btn_active');
                    tend_btn.addClass('user_menu_btn_active');
                    cabinet_aside.removeClass('hidden_full');
                    calc_aside.addClass("hidden_full");
                }

            }());

            (function(){  //  функции редактирования бюджета

                var aside_edit  = calc_aside.find('.calc_aside_edit');
                var bird_icon = aside_edit.find('.calc_aside_bird_icon');
                var edit_icon = aside_edit.find('.calc_aside_edit_icon');
                var price_budget =  calc_aside.find('.price_budget');
                var price_budget_val = Number(calc_aside.find('.price_budget span')
                    .html());
                var price_balance = calc_aside.find('.price_balance');
                var input_price = calc_aside.find('.input-price_budget');

                price_balance.html(price_budget_val);
                edit_icon.on('click', editBudget);
                bird_icon.on('click', saveBudget);

                function editBudget() {

                    price_budget_val = Number($self.find('.price_budget span')
                        .html());
                    price_budget.find('span').detach();
                    price_budget.append(`<input class="input-price_budget" type="number" autofocus min="50" max="10000000" step="100" value="${price_budget_val}">`);
                    console.log(price_budget_val);
                    bird_icon.toggleClass('hidden_full');
                    edit_icon.toggleClass('hidden_full');
                    input_price = calc_aside.find('.input-price_budget');

                    input_price.keydown(function(e){ //отлавливаем нажатие клавиш
                        if (e.keyCode === 13) { //если нажали Enter, то true
                            input_price.blur();
                        }
                    });

                    input_price.on('blur', saveBudget);

                }

                function saveBudget(){
                    price_budget_val = $self.find('.input-price_budget').val();
                    price_budget.find('input').detach();
                    price_budget.append(`<span class="span-price_budget"> ${price_budget_val} </span>`);
                    bird_icon.toggleClass('hidden_full');
                    edit_icon.toggleClass('hidden_full');
                    price_balance.html(price_budget_val);

                }

            }());

        }else{
            alert('Войдите или зарегестрируйтесь');
        }

    };

    return PORTAL;

})(PORTAL || {}, jQuery);