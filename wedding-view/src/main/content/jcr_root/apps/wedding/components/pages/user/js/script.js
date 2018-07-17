var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.User = {};

    PORTAL.modules.User.selfSelector = "#user-page-content";

    PORTAL.modules.User.init = function ($self) {

        console.log('Component: "User"');

        var FakeUser = {};
        FakeUser.avatar =  `/etc/clientlibs/wedding/pages/images/any_img/bgi_1_7.jpg`;

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

                    if (selectedPerson.tenders){
                        fillTenders(selectedPerson.tenders);
                    }

                }

            });


            var btn_change = $self.find('.avatar_btn_change');
            var btn_save = $self.find('.btn_change_save_change');

            var firstName =  $self.find('.profil_name');
            var lastName = $self.find('.profil_secondname');
            var phoneNum =  $self.find('.phone_string');
            var email = $self.find('.mail_string');
            var vkLink = $self.find('.vk_string');
            var create_tender = $self.find('.create_tender_icon');
            var edit_avatar = $self.find('.edit_avatar_btns');
            var categ_select = $self.find('#create_categories_select');



            function myCabinet(){

                btn_change.removeClass('hidden_full');
                create_tender.removeClass('hidden_full');
                edit_avatar.removeClass('hidden_full');
                btn_change.on('click', onChangeFields);
                $self.find('.user_avatar_btn_mail').addClass('hidden_full');
                create_tender.on('click', openCreateForm);
                $self.find('#btn-create_save').on('click', createTender);

            }

            function openCreateForm(){
                console.log('openCreateForm ON');
                modalW.openMWindow('#popup-create_tender', '#modal-create_tender');
                $self.find('#close_btn-create_tender').one('click', ()=>{modalW.closeMWindow('#popup-create_tender', '#modal-create_tender')});
                console.dir(allCategories);
            }



            var allCategories = {};

            $.ajax({ // добавление всех категорий
                url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    allCategories = data;
                    console.dir(allCategories);
                    Object.keys(data).forEach( prop => prop !== 'leading' ?  categ_select.append(`<option value="${prop}">${data[prop]}</option>`)
                        : categ_select.append(`<option value="${prop}" selected>${data[prop]}</option>`));
                }
            });

            function specialityTranslate(speciality){
                Object.keys(allCategories).forEach( prop =>  prop === speciality ? speciality = allCategories[prop] : '');
                return speciality;
            }


            var offers = $self.find('.trumbowyg-editor');
            var moneyLimit = $self.find('#create-budget');
            var deadline = $self.find('#create-date');
            var city = $self.find('.create-city_select');

            function createTender(){

                var tenderSend = {};
                tenderSend.id = selectedPerson.id;
                tenderSend.shortText = $self.find('.trumbowyg-editor').text().slice(0 , 30);
                tenderSend.offers = $self.find('.trumbowyg-editor').html();
                tenderSend.speciality = $self.find('#create_categories_select').val();
                // tenderSend.datePublication = +new Date();  - Вылетает ошибка на сервере при отправке тендера с датами
                // tenderSend.deadline = +new Date(deadline.val()); - Вылетает ошибка на сервере при отправке тендера с датами
                tenderSend.moneyLimit = moneyLimit.val();
                tenderSend.path = `${selectedPerson.resourcePath}/tenders`;
                tenderSend.firstName = selectedPerson.firstName;
                tenderSend.lastName = selectedPerson.lastName;
                tenderSend.city = city.val(); //selectedPerson.city;
                tenderSend.avatar  = selectedPerson.avatar ? selectedPerson.avatar : Cookies.get('avatar') ? Cookies.get('avatar') : `/etc/clientlibs/wedding/pages/images/any_img/default_avatar.jpg`;
                tenderSend.backGroundImage = `/etc/clientlibs/wedding/pages/images/any_img/bgi_${Math.round(Math.random()*20)}_0.jpg`; // - не сохраняет
                $self.find('.trumbowyg-editor').html('');
                modalW.closeMWindow('#popup-create_tender', '#modal-create_tender');
                console.dir(tenderSend);


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
                        console.log(tenderSend.path);
                        console.dir(data);
                        data ? fillTenders([tenderSend]) /* fillTenders([data])*/ : fillTenders([tenderSend]); // - НЕ ПРИЛЕТАЕТ СПЕЦИАЛЬНОСТЬ
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так :( ');
                        console.log(e);
                        fillTenders([tenderSend]);
                    }
                });

            }

            function onChangeFields(){
                btn_change.addClass('hidden_full');
                btn_save.removeClass('hidden_full');
                onInputFields();
                btn_save.one('click', saveChangeFields);
                document.addEventListener('keyup', exitWithoutSave);
            }

            function  exitWithoutSave(e) {
                if (e.keyCode === 27) { //esc
                    fillStrings(selectedPerson);
                    btn_save.addClass('hidden_full');
                    btn_save.off('click', saveChangeFields);
                    btn_change.removeClass('hidden_full');
                    document.removeEventListener('keyup', exitWithoutSave);
                }
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
                vkLink.removeAttr('href');
                console.log(changeName);
            }

            function saveChangeFields() {
                var dataSend = {};
                btn_save.addClass('hidden_full');
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
                document.removeEventListener('keyup', exitWithoutSave);

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
                    email.text(selectedPerson.email);
                if(selectedPerson.vkLink) {
                    vkLink.text(selectedPerson.vkLink);
                    vkLink.attr('href',`${selectedPerson.vkLink}`);
                }
                // $self.find('.fb_string').text(selectedPerson.facebookLink);
                // $self.find('.insta_string').text(selectedPerson.instagramLink);

            }

            function fillTenders(tenders){

                $self.find('.text_no_tend').detach();
                var first_div = document.querySelector(".hidden_full .tender_card");
                var main_container =  document.querySelector(".user_tenders-container");
                var copy_div = first_div.cloneNode(true);

                for (var i = 0; i<tenders.length; i++){
                    copy_div = first_div.cloneNode(true);
                    copy_div.querySelector(".tender_card_href").setAttribute("href",`/content/wedding/tenders/tender.html?${tenders[i].id}#${tenders[i].city}`);
                    copy_div.querySelector(".tender_card-city").innerHTML = tenders[i].cityName ?  tenders[i].cityName :
                        tenders[i].city && tenders[i].city != null ? `г. ${сityTranslate(tenders[i].city)}` : 'г. Минск';
                    copy_div.querySelector(".tender_card-need_cat").innerHTML = tenders[i].hasOwnProperty('speciality')&&tenders[i].speciality != null
                        ? specialityTranslate(tenders[i].speciality) : 'ФОТОГРАФ';
                    copy_div.querySelector(".publish_date").innerHTML =  tenders[i].datePublication && tenders[i].datePublication != null
                        ?formatDate.f(tenders[i].datePublication) : formatDate.f(+new Date());
                    copy_div.querySelector(".tender_card-dead_line").innerHTML = tenders[i].deadline && tenders[i].deadline != null
                        ? formatDate.f(tenders[i].deadline) : formatDate.f(+new Date()+10e8*(Math.round(Math.random()*20))) ;
                    copy_div.querySelector(".tender_card-budget_count").innerHTML = tenders[i].moneyLimit && tenders[i].moneyLimit != null ? tenders[i].moneyLimit : '5';
                    tenders[i].shortText && tenders[i].shortText != null && tenders[i].shortText != ' ' ? copy_div.querySelector(".short_text_text").innerHTML = tenders[i].shortText : '';
                    copy_div.querySelector(".tender_card-img").style.backgroundImage = tenders[i].backGroundImage ? `url("${tenders[i].backGroundImage}")`
                        : `url("/etc/clientlibs/wedding/pages/images/any_img/bgi_${Math.round(Math.random()*20)}_0.jpg")`;

                    if (tenders[i].hasOwnProperty('proposals') && tenders[i].proposals != null && tenders[i].proposals.length !== 0 )
                        copy_div.querySelector(".count_proposals").innerHTML =  tenders[i].proposals.length;
                    else{
                        copy_div.querySelector(".count_proposals").classList.add("hidden_full");
                        copy_div.querySelector(".tender_card-proposals").innerHTML ='';
                    }

                    copy_div.querySelector('.tender_card-remove_icon').addEventListener('click', removeTender);
                    copy_div.querySelector('.tender_card-edit_icon').addEventListener('click', changeTender);
                    main_container.prepend(copy_div);
                }

            }

            function changeTender(event){
                // var tenderId = $(e.target).parents('.tender_card').attr('tenderId');
                // req with tenderId
                // openCreateForm();
                // fillCreateForm(tenderId);

            }

            function fillCreateForm(tenderId){
                // createTender(tenderId);
            }

            function сityTranslate(city){
                var objNameCity = {minsk:'Минск',grodno:'Гродно',brest:'Брест',vitebsk:'Витебск',mogilev:'Могилев',gomel:'Гомель'};
                Object.keys(objNameCity).forEach( prop =>  prop === city ? city = objNameCity[prop] : '');
                return city;
            }

            function removeTender(e){

                // var isAdmin = confirm("Вы действительно хотите удалить тендер?");

                // if (isAdmin){

                $.ajax({

                    url: `http://wedding-services.mycloud.by/services/rest.tenders/remove.json?id=${selectedPerson.id}`,
                    type: "POST",
                    dataType: "json",
                    data: {part:`${selectedPerson.resourcePath}/tenders`},
                    beforeSend: function (xhr) {
                        xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                        console.log("beforeSend post !");
                        console.log();
                    },
                    success: function (data) {
                        console.log(tenderSend.path);
                        console.dir(data);
                    },
                    error: function (e) {
                        console.log('Что-то пошло не так :( ');
                        console.log(e);
                    }
                });

                $(e.target).parents('.tender_card').css('display','none');

                // }

            }

            $("textarea").trumbowyg({  // RichText
                svgPath: '/etc/clientlibs/wedding/external/icons/richtext/icons.svg',
                lang: 'ru'
            });



            function preLoadAvatar(){

                var avatar_window = $self.find('.user_avatar');
                var avatar_upload = document.querySelector('#avatar_uploads');
                var save_avatar_btn = avatar_window.find('#save_avatar');
                var dataSend = {};

                avatar_upload.addEventListener('change', updateImageDisplay);
                $self.find('.avatar_remove_icon').on('click', removeAvatar);


                function updateImageDisplay(){

                    var curFiles = avatar_upload.files;

                    // upl_img_src = window.URL.createObjectURL(curFiles[0]);
                    // avatar_window.css('backgroundImage',`url('${upl_img_src}')`);
                    // listItem.appendChild(image);

                    if(curFiles.length === 1 && validFileType(curFiles[0])) {

                        var image = document.createElement('img');
                        // image.src = window.URL.createObjectURL(curFiles[0]);
                        upl_img_src = window.URL.createObjectURL(curFiles[0]);
                        // upl_img_src = image.src;
                        console.log(upl_img_src);
                        avatar_window.css('backgroundImage',`url('${upl_img_src}')`);
                        save_avatar_btn.removeClass('hidden_full');
                        save_avatar_btn.one('click', updAvatar);
                        dataSend.avatarChange = upl_img_src;
                        // dataSend.avatarChange = curFiles[0];
                        document.addEventListener('keyup', exitWithoutUpdAvatar);
                    }

                }

                function removeAvatar(){
                    $self.find('.user_avatar').css('backgroundImage',`url('/etc/clientlibs/wedding/pages/images/any_img/defaultPhoto.png')`);
                    save_avatar_btn.removeClass('hidden_full');
                    save_avatar_btn.one('click', updAvatar);
                    document.addEventListener('keyup', exitWithoutUpdAvatar);
                    dataSend.avatarChange = '/etc/clientlibs/wedding/pages/images/any_img/defaultPhoto.png';
                }

                function exitWithoutUpdAvatar(e){
                    if (e.keyCode === 27) { // esc
                        save_avatar_btn.addClass('hidden_full');
                        save_avatar_btn.off('click', updAvatar);
                        selectedPerson.avatar ? avatar_window.css('backgroundImage',`url('${selectedPerson.avatar}')`)
                            : $self.find('.user_avatar').css('backgroundImage',`url('${FakeUser.avatar}')`);
                        document.removeEventListener('keyup', exitWithoutUpdAvatar);
                    }
                }

                function updAvatar(){

                    save_avatar_btn.addClass('hidden_full');
                    dataSend.id = selectedPerson.id;
                    console.dir(dataSend);
                    $.ajax({
                        // url: 'http://wedding-services.mycloud.by/services/rest.partners/changeAvatar.json',
                        url: 'http://wedding-services.mycloud.by/services/rest.user/update.json',
                        type: 'PUT',
                        dataType: 'json',
                        data: dataSend,
                        success: function(data){
                            console.log('success');
                            data.avatar ? Cookies.set('avatar', data.avatar) : '';
                        },
                        error: function (e) {
                            console.log(e);
                        }
                    });

                    document.removeEventListener('keyup', exitWithoutUpdAvatar);
                }

            }

            preLoadAvatar();

            // function returnFileSize(number) {
            //     if(number < 1024) {
            //         return number + 'bytes';
            //     } else if(number > 1024 && number < 1048576) {
            //         return (number/1024).toFixed(1) + 'KB';
            //     } else if(number > 1048576) {
            //         return (number/1048576).toFixed(1) + 'MB';
            //     }
            // }

            var fileTypes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png'
            ];

            function validFileType(file) {
                for(var i = 0; i < fileTypes.length; i++) {
                    if(file.type === fileTypes[i]) {
                        return true;
                    }
                }
                return false;
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
            document.location.href = '/content/wedding/catalog.html';
        }

    };

    return PORTAL;

})(PORTAL || {}, jQuery);