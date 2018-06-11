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
        var getPartnerId = (window.location.search).slice(1);
        var getPartnerSpecCity = (window.location.hash).slice(1);
        getPartnerSpecCity = getPartnerSpecCity.replace('&','/');

        if (getPartnerId === Cookies.get('userId') )
            console.log("WaU - the MY CABINET  !!!!");

        // if (!getPartnerSpecCity){  //TODOC  - Подключить после подключения регистрации
        //    var getPartnerSpecCity = Cookies.get('partnerSpec') + '/'+ Cookies.get('partnerCity');
        //    var getPartnerId =  Cookies.get('userId');
        // }

        var selectedPersonRequest = `/services/rest.partners/${getPartnerSpecCity}.json?id=${getPartnerId}`;

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

                fillStrings(selectedPerson);

                if (Cookies.get('userId') === selectedPerson.id ) {
                    console.log("It's REALY MY CABINET  of Partner  !!!!");
                    myCabinet();
                }

                if (selectedPerson.portfolio)
                    fillPhoto(selectedPerson.portfolio);

                if (selectedPerson.videos)
                    fillVidosy(selectedPerson.videos);

                if (selectedPerson.events)
                    fillEvents(selectedPerson.events);

                if (selectedPerson.comments)
                    fillComments(selectedPerson.comments);

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

        function onChangeFields(){

            btn_change.addClass('hidden_full');
            btn_save.removeClass('hidden_full');
            btn_save.one('click', saveChangeFields);
            onInputFields();

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

                url: '/services/rest.partners/update.json',
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

        cabinetAttrHide.btn_add_comment.on('click', sendComment);

        function sendComment(){ // узнать что тут надо отправлять !!!

            var content = $self.find('.trumbowyg-editor').html();
            $self.find('.trumbowyg-editor').html('');

            console.log(content);

            var commentInfo = [{content:content,authorID:Cookies.get('userId'),authorCity:Cookies.get('city')}];
            sendChangeRequest({comments:commentInfo});
             commentInfo = {content:content,authorID:Cookies.get('userId'),authorCity:Cookies.get('city')}; //[]
            sendChangeRequest({comments:commentInfo});

            sendChangeRequest({comments:content});



        }

        function myCabinet(){

            btn_change.removeClass('hidden_full');
            btn_change.on('click', onChangeFields);

            for (prop in cabinetAttrHide)
                cabinetAttrHide[prop].addClass('hidden_full');

            for (prop in cabinetAttrVision)
                cabinetAttrVision[prop].removeClass('hidden_full');

            cabinetAttrVision.btn_add_text.on('click', showInnerText);
            cabinetAttrVision.btn_add_video.on('click', showInnerVideo);
            cabinetAttrVision.btn_add_event.on('click', showInnerEvent); // todoc - подумать как реализовать
            cabinetAttrHide.btn_add_comment.off('click', sendComment);

        }

        function showInnerEvent(){
            //modalWindowsOn();
            saveInnerEvent();

        }

        function saveInnerEvent(){
            //modalWindowsOff();
            createEvent();

        }

        function createEvent(){
            //modalWindowsOn();
            console.log('createEvent ON');

            var eventSend = {};
            var date = new Date();
             eventSend.startDate = +date;
             eventSend.endDate = +date + 3600000000;
            eventSend.title = 'Super Better EVENT from Nice MEn';

            eventSend.path = `${selectedPerson.resourcePath}/events`;
            eventSend.resourcePath = `${selectedPerson.resourcePath}/events`;

            eventSend.description = ';kshfaksfh;a ksdjf lks;jdhfalskdfba lskdfbl aksdnblk ajsfd lkasjd fb,.k';

            // eventSend.firstName = selectedPerson.firstName;
            // eventSend.lastName = selectedPerson.lastName;
            // eventSend.city = selectedPerson.city;
            // eventSend.avatar  = selectedPerson.avatar;
            // eventSend.backGroundImage = selectedPerson.backGroundImage;

            eventSend.id = selectedPerson.id;  // Todoс - убрать, когда будет пересылаться через sendChangeRequest

            console.dir(eventSend);
            console.log(eventSend.path);


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



            $.ajax({

                url: 'http://wedding-services.mycloud.by/services/rest.events/create.json  ',
                type: "POST",
                dataType: "json",
                data: eventSend,
                beforeSend: function (xhr) {
                    xhr.setRequestHeader("Authorization", "Basic " + btoa("admin:you_can't_match_this_password"));
                    console.log("beforeSend post !");
                    console.log();
                },
                success: function (data) {
                    console.log('Ниже должен быть ответ Создания ивента:');
                    console.dir(data);
                },
                error: function (e) {
                    console.log('Что-то пошло не так :( ');
                    console.log(e);
                }
            });

            //sendChangeRequest(dataSend);

        }

        function fillEvents(events) {
            console.log(`function fillEvent write ${events.length} events`);
            console.dir(events);
            $self.find('.no_event-text').remove();
            var wrapper = $self.find('.event-wrapper');
            var eventCard = $self.find('.event_card-sample');
            var listWrapper = $(document.createElement('div')); // document.add('div');

            events.forEach(function(elem, i){

                var newItem = eventCard.clone().removeClass('event_card-sample');
                newItem.find('.event_card-title').html(elem.title);
                newItem.find('.event_card-bg').css('backgroundImage', 'url("/etc/clientlibs/wedding/pages/images/profil_partner/common_profil/bgi.jpg")');
                newItem.find('.event_card-start').text(elem.startDate);
                newItem.find('.event_card-finish').text(elem.endDate);
                elem.description ? newItem.find('.event_card-description_text').text(elem.description) : '';
                listWrapper.append(newItem);

            });

            wrapper.append(listWrapper);

        }



        function showInnerVideo(){
            $self.find('.add-video-field').html(`<input value="Вставьте вместо это текста ссылку на Ваше видео с YouTube">`);
            cabinetAttrVision.btn_add_video.one('click', saveInnerVideo);
        }

        function saveInnerVideo(){
            var link =  $self.find('.add-video-field input').val();
            $self.find('.add-video-field').html('');
            sendChangeRequest({videos:link}); // todoc - слать надо массив - в случае подтверждения изменить !!!
            cabinetAttrVision.btn_add_video.one('click', showInnerVideo);
        }




        function showInnerText(){
            var textAreal = $self.find('.content_about_oneself');
            var content =  textAreal.html();
            textAreal.html(`<textarea> ${content} </textarea>`);
            $self.find('textarea').trumbowyg({  // RichText
                svgPath: '/etc/clientlibs/wedding/external/icons/richtext/icons.svg',
                lang: 'ru'
            });
            cabinetAttrVision.btn_add_text.one('click', saveInnerText);
        }

        function saveInnerText(){
            // var textAreal = ;
            var content =  $self.find('.content_about_oneself textarea').val();
            $self.find('.content_about_oneself').html(content);
            sendChangeRequest({description:content});
            cabinetAttrVision.btn_add_text.one('click', showInnerText);
        }




        function sendPortfolio(){

            var photoSend = {};

            // if (photoSend.portfolio || photoSend.portfolio.length >= 1){

            photoSend.portfolio = input_upload.value;
            // photoSend.portfolio = input_upload.files;

            sendChangeRequest(photoSend);

        }


        function sendChangeReq(dataSend){

            console.dir(dataSend);

            console.log(' I am work if that  ');

            $.ajax({

                url: '/services/rest.partners/update.json',
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


        function fillStrings(selectedPerson) {

            $self.find('.profil_name').text(selectedPerson.firstName);
            $self.find('.profil_secondname').text(selectedPerson.lastName);
            $self.find('.partner_speciality').text(selectedPerson.speciality);

            if (selectedPerson.priceStart)
                $self.find('.prise_start').text(selectedPerson.priceStart);
            if (selectedPerson.priceEnd)
                $self.find('.prise_end').text(selectedPerson.priceEnd);
            if (selectedPerson.phone)
                $self.find('.phone_string').text(selectedPerson.phone);
            if (selectedPerson.email)
                $self.find('.mail_string').text(selectedPerson.email);
            if (selectedPerson.siteLink)
                $self.find('.link_string').text(selectedPerson.siteLink);
            if (selectedPerson.vkLink )
                $self.find('.vk_string').text(selectedPerson.vkLink);
            if (selectedPerson.facebookLink )
                $self.find('.fb_string').text(selectedPerson.facebookLink);
            if (selectedPerson.instagramLink )
                $self.find('.insta_string').text(selectedPerson.instagramLink);

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


        function fillComments(comments){ // todoc - расширить и переделать , когда доделают запрос

            var comm = $self.find('.comment_field');
            var wrapper = $self.find('.partner_comments-wrapper');

            comments.forEach(function(elem, i, arr){

                var newItem = comm.clone();
                newItem.find('.comment_field-text').html(elem);
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

    };

    return PORTAL;

})(PORTAL || {}, jQuery);