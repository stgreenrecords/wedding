var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Partner = {};

    PORTAL.modules.Partner.selfSelector = "#partner-page-content";

    PORTAL.modules.Partner.init = function ($self) {

        console.log('Component: "Partner"');

        $("textarea").trumbowyg({  // RichText
            svgPath: '/etc/clientlibs/wedding/external/icons/richtext/icons.svg',
            lang: 'ru'
        });

        var selectedPerson;
        var allCategories = {};
        var getPartnerId = (window.location.search).slice(1);
        var getPartnerSpecCity = (window.location.hash).slice(1);
        getPartnerSpecCity = getPartnerSpecCity.replace('&','/');

        // if (!getPartnerSpecCity){  //TODOC  - Подключить после подключения регистрации
        //    var getPartnerSpecCity = Cookies.get('workSphere') + '/'+ Cookies.get('city');
        //    var getPartnerId =  Cookies.get('userId');
        // }

        if (getPartnerId === Cookies.get('userId') )
            console.log("WaU - the MY CABINET  !!!!");

        var selectedPersonRequest = `http://wedding-services.mycloud.by/services/rest.partners/${getPartnerSpecCity}.json?id=${getPartnerId}`;
        var categ_select = $self.find('#create_categories_select');

        console.log(selectedPersonRequest);

        $.ajax({

            url: selectedPersonRequest,
            type: "GET",
            dataType: "json",
            success: function (data) {

                if (data.length === 0){
                    console.log(" NO data !!!!!!!!!!!!");
                }

                selectedPerson = data[0];
                console.log('INFO:');
                console.dir(selectedPerson);

                $.ajax({ // добавление всех категорий
                    url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        allCategories = data;
                        console.dir(allCategories);
                        // Object.keys(data).forEach( prop => prop !== 'leading' ?  categ_select.append(`<option value="${prop}">${data[prop]}</option>`)
                        //         : categ_select.append(`<option value="${prop}" selected>${data[prop]}</option>`));


                        Cookies.get('authStatus') === 'authorized' && Cookies.get('authType') && Cookies.get('userId') === selectedPerson.id ? myCabinet() : '';
                        Cookies.get('authStatus') === 'authorized' && Cookies.get('authType')  ? authorizedUser() : notAuthorized();

                        selectedPerson.description ? fillDescription(selectedPerson.description) : '';
                        selectedPerson.events ? fillEvents(selectedPerson.events) : '';
                        selectedPerson.portfolio ? fillPhoto(selectedPerson.portfolio) : '';
                        selectedPerson.videos ? fillVidosy(selectedPerson.videos) : '';
                        selectedPerson.comments ? fillComments(selectedPerson.comments) : '';

                    }
                });

            }

        });

        var btn_change = $self.find('.avatar_btn_change');
        var btn_save = $self.find('.btn_change_save_change');

        var cabinetBtn = {};
        var cabinetField = {};
        var cabinetAttrHide = {};
        var cabinetAttrVision = {};

        cabinetAttrHide.btn_mail = $self.find('.partner_avatar_btn_mail');
        cabinetAttrHide.btn_likes = $self.find('.partner_avatar_btn_likes');
        cabinetAttrHide.btn_calc = $self.find('.partner_avatar_btn_calc');
        cabinetAttrHide.comment_area = $self.find('.comment-inter_area');
        cabinetAttrHide.btn_add_comment = $self.find('#btn_add-comment');

        cabinetAttrVision.btn_add_text =  $self.find('#btn_add-text');
        cabinetAttrVision.upload_form =  $self.find('.upload_form');
        cabinetAttrVision.btn_add_video =  $self.find('#btn_add-video');
        cabinetAttrVision.btn_add_event =  $self.find('#btn_add-event');
        cabinetAttrVision.edit_avatar_btns =  $self.find('.edit_avatar_btns');
        cabinetAttrVision.remove_icon =  $self.find('.event_card-remove_icon');

        cabinetField.firstName = $self.find('.profil_name');
        cabinetField.lastName = $self.find('.profil_secondname');

        cabinetField.priceStart = $self.find('.prise_start');
        cabinetField.priceEnd = $self.find('.prise_end');
        cabinetField.phone = $self.find('.phone_string');
        cabinetField.siteLink = $self.find('.link_string');
        cabinetField.vkLink = $self.find('.vk_string');
        cabinetField.facebookLink = $self.find('.fb_string');
        cabinetField.instagramLink = $self.find('.insta_string');

        var btn_upPhoto = $self.find('#btn_upPhoto');
        var input_upload = document.querySelector('.input_upload');
        var inputFinishVal = {};
        var reitVal = 'k';
        var heart_block = $self.find('.heart-block');

        function notAuthorized(){
            console.log("Авторизируйтесь пожалуйста!");
            fillThreeStrings(selectedPerson);
            cabinetAttrHide.btn_mail.on('click', showAlertAuthorized);
            cabinetAttrHide.btn_likes.on('click', showAlertAuthorized);
            cabinetAttrHide.btn_calc.on('click', showAlertAuthorized);
            cabinetAttrHide.btn_add_comment.on('click', showAlertAuthorized);
        }

        function showAlertAuthorized(){
            modalW.openMWindow(".aut_please", "#modal-create_event");
            $self.find('.aut_please').css('color', '#a0a0a0'); //#afa58e #dc5e4e
            setTimeout(()=>{modalW.closeMWindow(".aut_please", "#modal-create_event")}, 900);
        }

        function showAlertSorry(){
            modalW.openMWindow(".dont_work", "#modal-create_event");
            $self.find('.dont_work').css('color', '#a0a0a0'); //#afa58e #dc5e4e
            setTimeout(()=>{modalW.closeMWindow(".dont_work", "#modal-create_event")}, 1200);
        }

        function authorizedUser(){
            console.log("Добро пожаловать!");
            fillStrings(selectedPerson);
            cabinetAttrHide.btn_add_comment.on('click', sendComment);
            cabinetAttrHide.btn_calc.on('click', showAlertSorry);
            $self.find('#close_btn_estimate').on('click', () => modalW.closeMWindow("#popup_estimate", "#modal-create_event"));
            cabinetAttrHide.btn_likes.on('click',  () => modalW.openMWindow("#popup_estimate", "#modal-create_event"));

            cabinetAttrHide.btn_mail.on('click', () => modalW.openMWindow("#popup_mail_event", "#modal-create_event"));
            $self.find('#close_btn_event').on('click', () => modalW.closeMWindow("#popup_mail_event", "#modal-create_event"));
            $self.find('#btn_send_event').on('click', infoForMail);
            $self.find('#btn_estimate').on('click', infoForEstimate);
            heart_block.on('click', estimateVal);
        }



        function estimateVal(ev){
            reitVal = event.target.classList[0].slice(10);
            for (var i = 1 ; i <= 5 ; i++)
                heart_block.find(`.heart-reit${i}`).removeClass('red-heart');
            for (var i = 1; i <= reitVal; i++)
                heart_block.find(`.heart-reit${i}`).addClass('red-heart');
        }

        function infoForEstimate(){

            var dataSend = {};
            dataSend.authorId = Cookies.get('userId');
            var text = $self.find('#popup_estimate .trumbowyg-editor').html();
            console.log(typeof(+reitVal));

            if (text && text !== " " /*&& typeof(reitVal) === 'number'*/){
                dataSend.reitVal = reitVal;
                dataSend.content = text;
                dataSend.authorFirstName = Cookies.get('firstName') ? Cookies.get('firstName') : '';
                dataSend.authorLastName =  Cookies.get('lastName') ? Cookies.get('lastName') : '';
                dataSend.authorAvatar  =  Cookies.get('avatar') ? Cookies.get('avatar')
                    : `/etc/clientlibs/wedding/pages/images/any_img/default_avatar.jpg`;
                dataSend.authorSpeciality = Cookies.get('workSphere') ? Cookies.get('workSphere') : 'Клиент' ;
                dataSend.dateSent = +new Date();
                $self.find('#popup_estimate .trumbowyg-editor').html('');
                modalW.closeMWindow("#popup_estimate", "#modal-create_event");
                modalW.openMWindow(".estimate_success", "#modal-create_event");
                $self.find('.estimate_success').css('color', '#a0a0a0'); //#afa58e #dc5e4e
                setTimeout(()=>{modalW.closeMWindow(".estimate_success", "#modal-create_event")}, 900);
                // sendEstimate(dataSend);
                sendChangeRequest(dataSend);
                fillAltComments([dataSend]);
            }

        }

        function sendEstimate(dataSend){
            console.dir(dataSend);
            $.ajax({
                url: 'http://wedding-services.mycloud.by/services/rest.partner/mail.json',  // вероятный запрос на отправку мыла
                type: 'PUT',
                dataType: 'json',
                data: dataSend,
                success: (data) => {
                    console.log('What you send for me?');
                    console.log(data);
                },
                error: (e) =>{
                    console.log(e);
                }
            });
        }

        function fillComments(comments){ //   - Первый вариант по приходящему сейчас ответу

            var comm = $self.find('.comment_field');
            var wrapper = $self.find('.partner_comments-wrapper');

            comments.forEach(function(elem, i, arr){

                var newItem = comm.clone();
                newItem.find('.comment_field-text').html(elem);
                wrapper.append(newItem);

            });
        }

        function fillAltComments(comments){ // Вариант как в дизайне.

            console.dir(comments);
            var comm = $self.find('.hidden_full .comment_field');
            var wrapper = $self.find('.partner_comments-wrapper');

            comments.forEach(function(elem, i, arr){

                var newItem = comm.clone();

                elem.authorAvatar ? newItem.find('.mini-avatar').css('backgroundImage',`url('${elem.authorAvatar}')`) : '';
                elem.authorFirstName ? newItem.find('.comment_field-author_name').html(elem.authorFirstName) : '';
                elem.authorLastName ? newItem.find('.comment_field-author_name').html(newItem.find('.comment_field-author_name').html()+' '+elem.authorLastName) : '';
                elem.authorSpeciality ? newItem.find('.comment_field-author_category').html(specialityTranslate(elem.authorSpeciality)) : '';

                newItem.find('.comment_field-text').html(elem.content);
                newItem.find('.comment_field-date_fild').text(formatDate.f(elem.dateSent));

                newItem.find('.comment_field-date_fild').text(formatDate.f(elem.dateSent));
                wrapper.append(newItem);

            });

        }

        function sendComment(){ // узнать что тут надо отправлять !!!

            var content = $self.find('#partner_comments .trumbowyg-editor').html();

            if (content && content !== " " /*&& typeof(reitVal) === 'number'*/){


                $self.find('#partner_comments .trumbowyg-editor').html('');

                console.log(content);

                var commentInfo = [{content:content,authorId:Cookies.get('userId'),authorCity:Cookies.get('city')}];
                sendChangeRequest({comments:commentInfo});

                var commentInfo2 = {content: content,
                    reitVal: reitVal,
                    authorId: Cookies.get('userId'),
                    authorCity: Cookies.get('city'),
                    authorFirstName: Cookies.get('firstName'),
                    authorLastName: Cookies.get('lastName'),
                    authorAvatar: Cookies.get('avatar'),
                    authorSpeciality: Cookies.get('workSphere') ? Cookies.get('workSphere') : 'Клиент',
                    dateSent: +new Date()
                };

                sendChangeRequest({comments:commentInfo2});
                sendChangeRequest({comments:content});

                fillAltComments([commentInfo2]);

            }

        }

        function infoForMail(){
            var dataSend = {};
            dataSend.authorId = Cookies.get('userId');
            var text = $self.find('#popup_mail_event .trumbowyg-editor').html();

            if (text && text !== " "){
                dataSend.text = text;
                $self.find('#popup_mail_event .trumbowyg-editor').html('');
                modalW.closeMWindow("#popup_mail_event", "#modal-create_event");
                modalW.openMWindow(".mail_success", "#modal-create_event");
                $self.find('.mail_success').css('color', '#a0a0a0'); //#afa58e #dc5e4e
                setTimeout(()=>{modalW.closeMWindow(".mail_success", "#modal-create_event")}, 900);
                sendMail(dataSend);
            }
        }

        function sendMail(dataSend){

            $.ajax({
                url: 'http://wedding-services.mycloud.by/services/rest.partner/mail.json',  // вероятный запрос на отправку мыла
                type: 'PUT',
                dataType: 'json',
                data: dataSend,
                success: function(data){
                    console.log('What you send for me?');
                    console.log(data);
                }
            });
        }

        function onChangeFields(){

            btn_change.addClass('hidden_full');
            btn_save.removeClass('hidden_full');
            btn_save.one('click', saveChangeFields);
            onInputFields();
            document.addEventListener('keyup', exitWithoutSave);

        }

        function exitWithoutSave(e) {
            if (e.keyCode === 27) { //esc
                fillStrings(selectedPerson);
                btn_save.addClass('hidden_full');
                btn_save.off('click', saveChangeFields);
                // edit_avatar.addClass('hidden_full');
                btn_change.removeClass('hidden_full');
                document.removeEventListener('keyup', exitWithoutSave);
            }
        }

        function onInputFields(){

            var cabinetFieldVal = {};

            for (props in cabinetField){
                cabinetFieldVal[props] = cabinetField[props].html();
                inputFinishVal[props] = cabinetField[props].html(`<input value=${cabinetFieldVal[props]}>`);
            }

            $self.find('.prise_start input').attr('type', 'number');
            $self.find('.prise_end input').attr('type', 'number');

        }

        function saveChangeFields() {

            btn_save.addClass('hidden_full');
            btn_change.removeClass('hidden_full');
            var dataSend = {};
            var start_prise = inputFinishVal.priceStart.find('input').val();
            var end_prise = inputFinishVal.priceEnd.find('input').val();

            if ( +start_prise < 0){
                start_prise = 0 - start_prise;
                inputFinishVal.priceStart.find('input').val( start_prise );
            }

            if (+end_prise < 0){
                end_prise = 0 - end_prise;
                inputFinishVal.priceEnd.find('input').val( end_prise );
            }

            if ( +start_prise > +end_prise ){
                inputFinishVal.priceEnd.find('input').val(start_prise);
                inputFinishVal.priceStart.find('input').val(end_prise);
            }

            for (props in cabinetField){
                dataSend[props] = inputFinishVal[props].find('input').val();
                inputFinishVal[props].html(`${dataSend[props]}`);
            }

            sendChangeRequest(dataSend);

        }

        function sendChangeRequest(dataSend){

            dataSend.id = selectedPerson.id;
            console.dir(dataSend);

            $.ajax({

                url: 'http://wedding-services.mycloud.by/services/rest.partners/update.json',
                type: 'PUT',
                dataType: 'json',
                data: dataSend,
                success: function(data){
                    console.log('What you send for me?');
                    console.log(data);
                },
                error: function (e) {
                    console.log('Что-то пошло не так :( ');
                    console.log(e);
                }

            });

        }

        function myCabinet(){
            console.log("It's REALY MY CABINET  of Partner  !!!!");
            btn_change.removeClass('hidden_full');
            btn_change.on('click', onChangeFields);

            for (prop in cabinetAttrHide)
                cabinetAttrHide[prop].addClass('hidden_full');

            for (prop in cabinetAttrVision)
                cabinetAttrVision[prop].removeClass('hidden_full');

            cabinetAttrVision.btn_add_text.one('click', showInnerText);
            cabinetAttrVision.btn_add_video.on('click', showInnerVideo);
            cabinetAttrVision.btn_add_event.on('click', showInnerEvent);
            $self.find('#btn-create_save').on('click', createEvent);
            cabinetAttrHide.btn_add_comment.off('click', sendComment);

        }

        function showInnerEvent(){

            console.log('openCreate_Form ON');
            modalW.openMWindow('#popup-create_event', '#modal-create_event');
            $self.find('#close_btn-create_event').one('click', ()=>{modalW.closeMWindow('#popup-create_event', '#modal-create_event')});
            console.dir(allCategories);

        }

        function createEvent(){

            var title = $self.find('#create-title');
            var startDate = $self.find('#create-startDate');
            var deadline = $self.find('#create-date');
            var city = $self.find('.create-city_select');

            var eventSend = {};
            city.val(selectedPerson.city);
            eventSend.startDate =  +new Date(startDate.val());
            eventSend.endDate = +new Date(deadline.val());
            eventSend.title = title.val().slice(0 , 20);            //    'Super Better EVENT from Nice MEn';
            eventSend.description = $self.find('.popup-create .trumbowyg-editor').html();
            eventSend.shortText = $self.find('.popup-create .trumbowyg-editor').text().slice(0 , 30);
            eventSend.path = `${selectedPerson.resourcePath}/events`;
            eventSend.resourcePath = `${selectedPerson.resourcePath}/events`;
            eventSend.firstName = selectedPerson.firstName;
            eventSend.lastName = selectedPerson.lastName;
            eventSend.speciality= selectedPerson.speciality;
            eventSend.city =  city.val() && city.val() !== 'city' ? city.val() : selectedPerson.city;
            eventSend.avatar  = selectedPerson.avatar ? selectedPerson.avatar : Cookies.get('avatar') ? Cookies.get('avatar')
                : `/etc/clientlibs/wedding/pages/images/any_img/default_avatar.jpg`;
            eventSend.background = selectedPerson.background ? selectedPerson.background
                : `/etc/clientlibs/wedding/pages/images/any_img/bgi_${Math.round(Math.random()*20)}_0.jpg`;
            eventSend.background1 =  `/etc/clientlibs/wedding/pages/images/any_img/bgi_${Math.round(Math.random()*20)}_0.jpg`;
            eventSend.background2 = `/etc/clientlibs/wedding/pages/images/any_img/bgi_${Math.round(Math.random()*20)}_0.jpg`;
            eventSend.background3 = `/etc/clientlibs/wedding/pages/images/any_img/bgi_${Math.round(Math.random()*20)}_0.jpg`;

            $self.find('.popup-create .trumbowyg-editor').html('');
            eventSend.id = selectedPerson.id;

            modalW.closeMWindow('#popup-create_event', '#modal-create_event');
            console.dir(eventSend);
            console.log(eventSend.path);

            $.ajax({

                url: 'http://wedding-services.mycloud.by/services/rest.events/create.json',
                type: "POST",
                dataType: "json",
                data: eventSend,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                    console.log("beforeSend post !");
                },
                success: function (data) {
                    console.log(eventSend.path);
                    console.dir(data);
                    data ? fillEvents([data]) : fillEvents([eventSend]);
                },
                error: function (e) {
                    console.log('Что-то пошло не так :( ');
                    console.log(e);
                    fillEvents([eventSend]);
                }
            });

        }

        function fillEvents(events) {

            console.dir(events);
            $self.find('.no_event-text').remove();
            var wrapper = $self.find('.events-wrapper');
            var eventCard = $self.find('.event_card-sample');

            events.forEach(function(elem, i){

                var newItem = eventCard.clone().removeClass('event_card-sample');
                elem.title ? newItem.find('.event_card-title').html(elem.title.substr(0, 12)): '';
                elem.background ? newItem.find('.event_card-bg').css('backgroundImage', `url("${elem.background}")`)
                    : newItem.find('.event_card-bg').css('backgroundImage', `url("/etc/clientlibs/wedding/pages/images/any_img/bgi_${Math.round(Math.random()*20)}_0.jpg")`);
                elem.startDate ? newItem.find('.event_card-start').text(formatDate.f(elem.startDate)) : '';
                elem.endDate ? newItem.find('.event_card-finish').text(formatDate.f(elem.endDate)) : '';
                elem.description ? newItem.find('.event_card-description_text').text(elem.description.substr(0, 40)) : '';
                elem.id && elem.speciality && elem.city
                    ? newItem.find('.event_card-href').attr('href',`/content/wedding/sales/sale.html?${elem.id}#${elem.speciality}&${elem.city}`)
                    : '';
                newItem.find('.event_card-remove_icon').on('click', removeEvent);
                wrapper.append(newItem);

            });

        }

        function removeEvent(e){

            $.ajax({
                url: `http://wedding-services.mycloud.by/services/rest.events/remove.json?id=${selectedPerson.id}`,
                type: "POST",
                dataType: "json",
                data: {part:`${selectedPerson.resourcePath}/tenders`},
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                    console.log("beforeSend post !");
                    console.log();
                },
                success: function (data) {
                    console.dir(data);
                },
                error: function (e) {
                    console.log('Что-то пошло не так :( ');
                    console.log(e);
                }
            });

            $(e.target).parents('.event_card').css('display','none');

        }

        /*

Важно! Запрос посылается методом POST
/services/rest.events/create.json

Надо слать дополнительный параметр (path) - путь куда надо сохранять акцию.
    Его можно получить использовав переменную resourcePath
Полученную при запросе партнёра, на странице которого мы находимся + /events

Например
/home/users/wedding/partners/photographers/minsk/e/7RZCTBneVLiGlL2yMggcq/events

Доступные поля, их названия и тип:

String resourcePath; +
String id

*/

        //sendChangeRequest(dataSend);


        function showInnerVideo(){
            $self.find('.add-video-field').html(`<input placeholder="Вставьте ссылку на Ваше видео с YouTube">`);
            cabinetAttrVision.btn_add_video.one('click', saveInnerVideo);
        }

        function saveInnerVideo(){
            var link = $self.find('.add-video-field input').val();
            $self.find('.add-video-field').html('');
            sendChangeRequest({videos:link}); // todoc - слать надо массив - в случае подтверждения изменить !!!
            cabinetAttrVision.btn_add_video.one('click', showInnerVideo);
        }


        function fillDescription(text){
            $self.find('.content_about_oneself').html(text);
        }

        function showInnerText(){
            var textP = $self.find('.content_about_oneself');
            var content =  textP.html();
            textP.addClass('hidden_full');
            var textAreal =  $self.find('.partner_about_oneself--edit');
            textAreal.removeClass('hidden_full');
            textAreal.find('.trumbowyg-editor').html(content);
            cabinetAttrVision.btn_add_text.one('click', saveInnerText);
        }

        function saveInnerText(){
            var textAreal =  $self.find('.partner_about_oneself--edit');
            var content =  textAreal.find('.trumbowyg-editor').html();
            textAreal.addClass('hidden_full');
            var textP = $self.find('.content_about_oneself'); //
            textP.removeClass('hidden_full');
            textP.html(content);
            sendChangeRequest({description:content});
            cabinetAttrVision.btn_add_text.one('click', showInnerText);
        }

        function sendChangeReq(dataSend){

            console.dir(dataSend);

            console.log(' I am work if that  ');

            $.ajax({

                url: 'http://wedding-services.mycloud.by/services/rest.partners/update.json',
                type: 'PUT',
                dataType: 'json',
                data: dataSend,
                // beforeSend: function (xhr) {
                //         xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                //         console.log("beforeSend post !");
                //         console.log();
                // },
                success: function(data){
                    console.log('What you send for me?');
                    console.log(data);

                },
                error: function (e) {
                    console.log('Что-то пошло не так :( ');
                    console.log(e);
                }

            });

        }

        function specialityTranslate(speciality){
            Object.keys(allCategories).forEach( prop =>  prop === speciality ? speciality = allCategories[prop] : '');
            return speciality;
        }

        function fillThreeStrings(selectedPerson) {
            $self.find('.profil_name').text(selectedPerson.firstName);
            $self.find('.profil_secondname').text(selectedPerson.lastName);
            $self.find('.partner_speciality').text(specialityTranslate(selectedPerson.speciality));
        }


        function fillStrings(selectedPerson) {

            var $partnerCard = $self.find('.profile_data');
            var reiting_string =  $partnerCard.find('.profil_reiting_string');

            $partnerCard.find('.profil_name').text(selectedPerson.firstName);
            $partnerCard.find('.profil_secondname').text(selectedPerson.lastName);
            $partnerCard.find('.partner_speciality').text(specialityTranslate(selectedPerson.speciality));

            var z = Math.round(Math.random()*999); // Убрать когда начнет приходить в запросе
            selectedPerson.viewsCount ? $partnerCard.find('.profil_views_count').text(selectedPerson.viewsCount)
                : $self.find('.profil_views_count').text(z);
            selectedPerson.likeCount ? $partnerCard.find('.profil_likes_count').text(selectedPerson.likeCount) : $self.find('.profil_likes_count').text(Math.round(z/(Math.random()*3+4)));
            selectedPerson.reiting ? setReiting(selectedPerson.reiting) : setReiting('4');

            selectedPerson.priceStart ? $partnerCard.find('.prise_start').text(selectedPerson.priceStart) : '';
            selectedPerson.priceEnd ? $partnerCard.find('.prise_end').text(selectedPerson.priceEnd) : '';
            selectedPerson.phone ? $partnerCard.find('.phone_string').text(selectedPerson.phone) : '';
            selectedPerson.email ? $partnerCard.find('.mail_string').text(selectedPerson.email) : '';
            selectedPerson.siteLink ? $partnerCard.find('.link_string').text(selectedPerson.siteLink) : '';
            selectedPerson.vkLink ? $partnerCard.find('.vk_string').text(selectedPerson.vkLink) : '';
            selectedPerson.facebookLink ? $partnerCard.find('.fb_string').text(selectedPerson.facebookLink) : '';
            selectedPerson.instagramLink ? $partnerCard.find('.insta_string').text(selectedPerson.instagramLink) : '';

            function setReiting(val){
                for (var i = 1; i <= val; i++)
                    reiting_string.find(`#reit_heart${i}`).addClass('red-heart');
            }

        }



        function fillPhoto(photo){

            var wrapper = $self.find('.partner_photo-wrapper');
            // todoc -сделать функцию отображения фоток по 12 шт. - когда сделают полный колбек.
            photo.forEach(function(elem){

                console.log(elem);
                wrapper.append(`<div class="photo_unit"> <img src="http://wedding-services.mycloud.by${elem}" alt="photo-unit"> <div class="photo_enhance"> </div> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src="http://wedding-services.mycloud.by${elem}" alt="photo-unit"> <div class="photo_enhance"> </div> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src="http://wedding-services.mycloud.by${elem}" alt="photo-unit"> <div class="photo_enhance"> </div> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src="http://wedding-services.mycloud.by${elem}" alt="photo-unit"> <div class="photo_enhance"> </div> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src="http://wedding-services.mycloud.by${elem}" alt="photo-unit"> <div class="photo_enhance"> </div> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src="http://wedding-services.mycloud.by${elem}" alt="photo-unit"> <div class="photo_enhance"> </div> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src="http://wedding-services.mycloud.by${elem}" alt="photo-unit"> <div class="photo_enhance"> </div> </div>`);

            });

        }


        function fillVidosy(video){

            var vid = $self.find('.video_field');
            var wrapper = $self.find('.partner_video-wrapper');

            video.forEach(function(elem, i, arr){

                var newItem = vid.clone();
                newItem.find('.video_item').attr('src', elem);
                console.log(elem);
                wrapper.append(newItem);

            });

        }

        (function(){  //  функция переключения страниц

            var page_section_btn = {};
            page_section_btn.about = $self.find('#partner_about_btn');
            page_section_btn.photo = $self.find('#partner_photo_btn');
            page_section_btn.video = $self.find('#partner_video_btn');
            page_section_btn.stock = $self.find('#partner_stock_btn');
            page_section_btn.comments = $self.find('#partner_comments_btn');

            var partner_page_section = {};
            partner_page_section.partner_about_btn = $self.find('#partner_about_oneself');
            partner_page_section.partner_photo_btn = $self.find('#partner_photo');
            partner_page_section.partner_video_btn = $self.find('#partner_video');
            partner_page_section.partner_stock_btn = $self.find('#partner_stock');
            partner_page_section.partner_comments_btn = $self.find('#partner_comments');

            console.dir(partner_page_section);
            console.dir(page_section_btn);

            for (var prop in page_section_btn){
                page_section_btn[prop].on('click', openPage);
            }

            function openPage(event){

                console.log(event.target.id);

                for (var propp in partner_page_section){
                    if (propp != event.target.id){
                        partner_page_section[propp].addClass('hidden_full');
                    }
                }
                partner_page_section[event.target.id].removeClass('hidden_full');

                for (var prop in page_section_btn){
                    page_section_btn[prop].removeClass('partner_menu_btn_active');
                }

                $self.find('#'+event.target.id).addClass('partner_menu_btn_active');

            }

        }());



        function upLoadImage(){

            var preview = document.querySelector('.preview_upload-text');
            input_upload.style.opacity = 0;

            input_upload.addEventListener('change', updateImageDisplay);

            function updateImageDisplay() {
                while(preview.firstChild) {
                    preview.removeChild(preview.firstChild);
                }

                var curFiles = input_upload.files;

                if(curFiles.length === 0) {
                    var para = document.createElement('p');
                    para.textContent = 'No files currently selected for upload';
                    preview.appendChild(para);
                } else {
                    var list = document.createElement('ol');
                    preview.appendChild(list);
                    for(var i = 0; i < curFiles.length; i++) {
                        var listItem = document.createElement('li');
                        var para = document.createElement('p');
                        if(validFileType(curFiles[i])) {
                            para.textContent = 'File name ' + curFiles[i].name + ', file size ' + returnFileSize(curFiles[i].size) + '.';
                            var image = document.createElement('img');
                            image.src = window.URL.createObjectURL(curFiles[i]);

                            listItem.appendChild(image);
                            listItem.appendChild(para);

                        } else {
                            para.textContent = 'File name ' + curFiles[i].name + ': Not a valid file type. Update your selection.';
                            listItem.appendChild(para);
                        }

                        list.appendChild(listItem);
                    }
                }
            }

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

            function returnFileSize(number) {
                if(number < 1024) {
                    return number + 'bytes';
                } else if(number > 1024 && number < 1048576) {
                    return (number/1024).toFixed(1) + 'KB';
                } else if(number > 1048576) {
                    return (number/1048576).toFixed(1) + 'MB';
                }
            }

            btn_upPhoto.on('click', sendPortfolio);

        }
        upLoadImage();



        function sendPortfolio(){

            var photoSend = {};

            var data = new FormData();

            console.log(data);

            $.each( files, function( key, value ){
                data.append( key, value );
            });

            // if (photoSend.portfolio || photoSend.portfolio.length >= 1){

            // photoSend.portfolio = input_upload.value;
            // photoSend.portfolio = input_upload.files;

            // sendChangeRequest(photoSend);

            $.ajax({
                url: 'http://wedding-services.mycloud.by/services/rest.partners/update.json',
                type: 'put',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, // Не обрабатываем файлы (Don't process the files)
                contentType: false, // Так jQuery скажет серверу что это строковой запрос
                success: function( respond, textStatus, jqXHR ){

                    // Если все ОК

                    if( typeof respond.error === 'undefined' ){
                        // Файлы успешно загружены, делаем что нибудь здесь

                        // выведем пути к загруженным файлам в блок '.ajax-respond'

                        var files_path = respond.files;
                        var html = '';
                        $.each( files_path, function( key, val ){ html += val +'<br>'; } );
                        $('.ajax-respond').html( html );
                    }
                    else{
                        console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
                    }
                },
                error: function( jqXHR, textStatus, errorThrown ){
                    console.log('ОШИБКИ AJAX запроса: ' + textStatus );
                }
            });

        }



        // Переменная куда будут располагаться данные файлов

        var files;

        // Вешаем функцию на событие
        // Получим данные файлов и добавим их в переменную

        $('#file_upl').change(function(){   //input[type=file]
            files = this.files;
            console.log(files);
        });

        $('.submit.button').click(function( event ){
            event.stopPropagation(); // Остановка происходящего
            event.preventDefault();  // Полная остановка происходящего

            // Создадим данные формы и добавим в них данные файлов из files

            var data = new FormData();

            console.log(data);

            $.each( files, function( key, value ){
                data.append( key, value );
            });

            console.log(data);
            // Отправляем запрос

            $.ajax({
                url: 'http://wedding-services.mycloud.by/services/rest.partners/update.json',
                type: 'put',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, // Не обрабатываем файлы (Don't process the files)
                contentType: false, // Так jQuery скажет серверу что это строковой запрос
                success: function( respond, textStatus, jqXHR ){

                    // Если все ОК

                    if( typeof respond.error === 'undefined' ){
                        // Файлы успешно загружены, делаем что нибудь здесь

                        // выведем пути к загруженным файлам в блок '.ajax-respond'

                        var files_path = respond.files;
                        var html = '';
                        $.each( files_path, function( key, val ){ html += val +'<br>'; } );
                        $('.ajax-respond').html( html );
                    }
                    else{
                        console.log('ОШИБКИ ОТВЕТА сервера: ' + respond.error );
                    }
                },
                error: function( jqXHR, textStatus, errorThrown ){
                    console.log('ОШИБКИ AJAX запроса: ' + textStatus );
                }
            });

        });







        (function() {

            $("#calendar").ionCalendar({
                lang: "ru",
                sundayFirst: false,
                years: "2017-2027",
                format: "DD.MM.YYYY",
                hideArrows: false,
                onClick: function(date){
                    $("#result-1").html("onClick: " + date);
                }
            });

            $("#myDatePicker-1").ionDatePicker({
                format: "DD.MM.YYYY",
                lang: "ru",
                sundayFirst: false,
                years: "2017-2027"
            });

        })();


        //--   fake data ***************

        var FakeDataEvent = [
            {
                description:'Отличные скидки сегодня',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'xz',
                startDate:'1531289371112',
                title:'скидки 50%'
            },

            {
                description:'',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'xz',
                startDate:'1531289371112',
                title:'скидки 50%'
            },

            {
                description:'Отличные скидки сегодня',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'xz',
                startDate:'1531289371112',
                title:'скидки 50%'
            }

        ];



    };  //--- finish

    return PORTAL;

})(PORTAL || {}, jQuery);