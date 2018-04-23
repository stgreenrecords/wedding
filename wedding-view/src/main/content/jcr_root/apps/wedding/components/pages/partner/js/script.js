var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Partner = {};

    PORTAL.modules.Partner.selfSelector = "#partner-page-content";

    PORTAL.modules.Partner.init = function ($self) {

        console.log('Component: "Partner"');

        var selectedPerson;

        if (localStorage.getItem('PersonRequest')){

            var selectedPersonRequest = localStorage.getItem('PersonRequest');
            console.log('ESucsess');
            console.log(selectedPersonRequest);

            $.ajax({
                url: selectedPersonRequest,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    selectedPerson = data[0];

                    console.log('INFO:');
                    console.dir(selectedPerson);

                    $self.find('.profil_name').text(selectedPerson.firstName);
                    $self.find('.profil_secondname').text(selectedPerson.lastName);
                    $self.find('.partner_speciality').text(selectedPerson.speciality);

                    $self.find('.prise_string').text(`${selectedPerson.priceStart} - ${selectedPerson.priceEnd} рублей`);
                    $self.find('.phone_string').text(selectedPerson.phone);
                    $self.find('.mail_string').text(selectedPerson.email);
                    $self.find('.link_string').text(selectedPerson.siteLink);
                    $self.find('.vk_string').text(selectedPerson.vkLink);
                    $self.find('.fb_string').text(selectedPerson.facebookLink);
                    $self.find('.insta_string').text(selectedPerson.instagramLink);
                }
            });


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


        }else{

            document.location.href = '/content/wedding/catalog/category.html';

        }

/*        (function() {  // - работа с календарем
            // page is now ready, initialize the calendar...

            $('#calendar').fullCalendar('option', {
                locale: 'ru',
                isRTL: true
            });

            $('#calendar').fullCalendar({

                dayClick: function() {
                    alert('a day has been clicked!');
                }
                // put your options and callbacks here
            });

            var calendar =  $self.find('#calendar').fullCalendar('getCalendar');
            calendar.next();
            console.log(calendar);

            $('#calendar').fullCalendar('option', 'locale', 'ru');


            calendar.on('dayClick', function(date, jsEvent, view) {
                console.log('clicked on ' + date.format());
            });

        })();*/




    };

    return PORTAL;

})(PORTAL || {}, jQuery);