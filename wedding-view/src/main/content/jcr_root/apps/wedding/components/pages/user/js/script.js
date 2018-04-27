var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.User = {};

    PORTAL.modules.User.selfSelector = "#user-page-content";

    PORTAL.modules.User.init = function ($self) {

        console.log('Component: "User"');

        var selectedPerson;

        if (Cookies.get('authStatus') === 'authorized'){

            // var userUrl = 'http://wedding-services.mycloud.by/services/rest.users/minsk.json?userId=a931a267-ff17-4d89-ab80-e478c0a6de0a';
            var userUrl = 'http://wedding-services.mycloud.by/services/rest.users/minsk.json?id=a9cce9a5-5820-49d8-8bd7-f44fc706cb90';
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
//                $self.find(".user_avatar").css("background-image", `url('${selectedPerson.avatar}')`);
                    $self.find('.profil_name').text(selectedPerson.firstName);
                    $self.find('.profil_secondname').text(selectedPerson.lastName);
                    $self.find('.phone_string').text(selectedPerson.phone);
                    $self.find('.mail_string').text(selectedPerson.email);

                    $self.find('.vk_string').text(selectedPerson.vkLink);
                    // $self.find('.fb_string').text(selectedPerson.facebookLink);
                    // $self.find('.insta_string').text(selectedPerson.instagramLink);

                    if (selectedPerson.tenders.length>=1){

                        $self.find('.user_tenders-container > div').detach();
                        var first_div = document.querySelector(".hidden_full .tender_card");
                        var main_container =  document.querySelector(".user_tenders-container");
                        var copy_div = first_div.cloneNode(true);

                        for (var i = 0; i<selectedPerson.tenders.length; i++){
                            var publDate = new Date(selectedPerson.tenders[i].datePublication);
                            var deadLine = new Date(selectedPerson.tenders[i].deadline);
                            copy_div = first_div.cloneNode(true);
                            copy_div.querySelector(".tender_card_href").setAttribute("href",`/content/wedding/tenders/tender.html?${selectedPerson.tenders[i].id}#${selectedPerson.tenders[i].city}`);
                            copy_div.querySelector(".publish_date").innerHTML = `${publDate.getDate()}.${publDate.getMonth()+1}.${publDate.getFullYear()}`;
                            copy_div.querySelector(".tender_card-city").innerHTML = `г. ${selectedPerson.tenders[i].city}`;
                            copy_div.querySelector(".tender_card-dead_line").innerHTML = `${deadLine.getDate()}.${deadLine.getMonth()+1}.${deadLine.getFullYear()}`;
                            copy_div.querySelector(".tender_card-budget_count").innerHTML = selectedPerson.tenders[i].moneyLimit;
                            copy_div.querySelector(".short_text_text").innerHTML = selectedPerson.tenders[i].shortText;
                            main_container.appendChild(copy_div);
                        }

                    }

                }

            });

            var calc_aside =  $self.find('#calc_aside_sect');

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