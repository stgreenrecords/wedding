var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Sale = {};

    PORTAL.modules.Sale.selfSelector = "#sale-page-content";

    PORTAL.modules.Sale.init = function ($self) {

        console.log('Component: "Sale--event"');


        var FakeData = [

            {
                firstName:'Гюльчитай', // Real person
                lastName:'Сухова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_7.jpg',
                authorId:'eeb542a6-5df8-4ac3-b871-b48755e9e0f8',
                city:'minsk',
                cityName:'Минск',
                speciality:'organizers',
                description: 'Отличные скидки на всю зиму. Можно делать заказ через сайт, либо звоните по телефонам. Так же, Вас ждет сюрприз...',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531479371112',
                title:'Скидки 50% ',
                background: '/etc/clientlibs/wedding/pages/images/any_img/bgi_14_0.jpg',
                background1: '/etc/clientlibs/wedding/pages/images/any_img/bgi_18_0.jpg',
                background2: '/etc/clientlibs/wedding/pages/images/any_img/bgi_17_0.jpg',
                background3: '/etc/clientlibs/wedding/pages/images/any_img/bgi_5_0.jpg',
            }

        ];

// -*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*


        var getId = (window.location.search).slice(1);
        var getSpecCity = (window.location.hash).slice(1);
        getSpecCity = getSpecCity.replace('&','/');
        var nameSpeciality = {};

        function getSelectEvent(){

            var url_one = `http://wedding-services.mycloud.by/services/rest.events/${getSpecCity}.json?id=${getId}`;

            $.ajax({ // добавление всех категорий
                url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    nameSpeciality = data;
                    satrtMainReq();
                }
            });

            function satrtMainReq(){
                $.ajax({
                    url: url_one,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        $self.find('#tender-cont > div').detach();
                        console.log(url_one);
                        console.dir(data);
                        data.length == 0 ? drawEvent(FakeData) : drawEvent(data);     //!!!!!1**** - Если приходит ответ - он и будет выводиться
                    },
                    error: function (e) {
                        console.log('Error from ajax');
                        console.log(e);
                    }
                });
            }

        }
        getSelectEvent();

        function drawEvent(data) {

            var data;
            $self.find('.no_event-text').remove();
            var wrapper = $self.find('.event-wrapper');
            var eventCard = $self.find('.event_card-sample');
            var listWrapper = $(document.createElement('div')); // document.add('div');

            data.forEach(elem => {

                var newItem = eventCard.clone().removeClass('event_card-sample');

                elem.avatar ? newItem.find('.mini-avatar').css('backgroundImage',`url('${elem.avatar}')`) : '';
                elem.firstName ? newItem.find('.tender_card-author_name').html(elem.firstName) : '';
                elem.lastName ? newItem.find('.tender_card-author_name').html(newItem.find('.tender_card-author_name').html()+' '+elem.lastName) : '';
                elem.speciality ? newItem.find('.card-speciality').html(specialityTranslate(elem.speciality)) : '';

                elem.title ? newItem.find('.event_card-title').html(elem.title.substr(0, 28)): '';
                elem.startDate ? newItem.find('.event_card-start').text(formatDate.f(elem.startDate)) : '';
                elem.endDate ? newItem.find('.event_card-finish').text(formatDate.f(elem.endDate)) : '';
                elem.description ? newItem.find('.event_card-description_text').text(elem.description) : '';
                elem.background ? newItem.find('.event_card-bg').css('backgroundImage', `url("${elem.background}")`)
                    : newItem.find('.event_card-bg').css('backgroundImage', 'url("/etc/clientlibs/wedding/pages/images/any_img/bgi_14_0.jpg")');
                elem.background1 ? newItem.find('.bg2_part1').css('backgroundImage', `url("${elem.background1}")`) : '';
                elem.background2 ? newItem.find('.bg2_part2').css('backgroundImage', `url("${elem.background2}")`) : '';
                elem.background3 ? newItem.find('.bg2_part3').css('backgroundImage', `url("${elem.background3}")`) : '';

                if (elem.authorId && elem.speciality && elem.city){
                    newItem.find('.href_on_partner')
                        .attr('href',`/content/wedding/catalog/category/partner.html?${elem.authorId}#${elem.speciality}&${elem.city}`)
                        .attr('title','Перейти на страницу партнера');
                }

                listWrapper.append(newItem);

            });

            wrapper.append(listWrapper);

        }

        function specialityTranslate(speciality){
            Object.keys(nameSpeciality).forEach( prop =>  prop === speciality ? speciality = nameSpeciality[prop] : '');
            return speciality;
        }


    };

    return PORTAL;

})(PORTAL || {}, jQuery);