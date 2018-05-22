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


        var selectedPersonRequest = `http://wedding-services.mycloud.by/services/rest.partners/${getPartnerSpecCity}.json?id=${getPartnerId}`;


        console.log(selectedPersonRequest);

        $.ajax({

            url: selectedPersonRequest,
            type: "GET",
            dataType: "json",
            success: function (data) {

                if (data.length === 0){
                    // document.location.href = '/content/wedding/catalog/category.html';
                    console.log(" NO data !!!!!!!!!!!!");
                }

                selectedPerson = data[0];

                console.log('INFO:');
                console.dir(selectedPerson);

                $self.find('.profil_name').text(selectedPerson.firstName);
                $self.find('.profil_secondname').text(selectedPerson.lastName);
                $self.find('.partner_speciality').text(selectedPerson.speciality);

                if (selectedPerson.priceEnd || selectedPerson.priceStart)
                    $self.find('.prise_string').text(`${selectedPerson.priceStart}-${selectedPerson.priceEnd} рублей`);
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

                if (Cookies.get('userId') === selectedPerson.id ) {
                    console.log("It's REALY MY CABINET  of Partner  !!!!");
                    myCabinet();
                }

                if (selectedPerson.portfolio)
                    fillPhoto(selectedPerson.portfolio);

                if (selectedPerson.videos)
                    fillVidosy(selectedPerson.videos);

                if (selectedPerson.comments)
                    fillComments(selectedPerson.comments);

            }

        });

        function myCabinet(){
            
            $self.find('.avatar_btn_change').removeClass('hidden_full');
            $self.find('.partner_avatar_btn_calc').addClass('hidden_full');
            $self.find('.partner_avatar_btn_mail').addClass('hidden_full');
            $self.find('.partner_avatar_btn_likes').addClass('hidden_full');            
            $self.find('.avatar_btn_change').on('click', onChangeFields);
        }

        function onChangeFields(){

            console.log('Я могу ВСЕ изменить!!!!');
            $self.find('.avatar_btn_change').addClass('hidden_full');
            $self.find('.btn_change_save_change').removeClass('hidden_full');
            $self.find('.btn_change_save_change').on('click', saveChangeFields);
        }
        
        function saveChangeFields() {
            console.log('Я могу ВСЕ Засейвить !!!!');
        }

        function fillPhoto(photo){

            var wrapper = $self.find('.partner_photo-wrapper');

            photo.forEach(function(elem){

                console.log(elem);
                wrapper.append(`<div class="photo_unit"> <img src='http://wedding-services.mycloud.by${elem}' alt='photo-unit'> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src='http://wedding-services.mycloud.by${elem}' alt='photo-unit'> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src='http://wedding-services.mycloud.by${elem}' alt='photo-unit'> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src='http://wedding-services.mycloud.by${elem}' alt='photo-unit'> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src='http://wedding-services.mycloud.by${elem}' alt='photo-unit'> </div>`);
                wrapper.append(`<div class="photo_unit"> <img src='http://wedding-services.mycloud.by${elem}' alt='photo-unit'> </div>`);
            });

        }

        function fillVidosy(video){

            var vid = $self.find('.video_field');
            var wrapper = $self.find('.partner_video-wrapper');

            video.forEach(function(elem, i, arr){

                var newItem = vid.clone();
                // newItem.find('.video_item').attr('src', elem);
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

    };

    return PORTAL;

})(PORTAL || {}, jQuery);