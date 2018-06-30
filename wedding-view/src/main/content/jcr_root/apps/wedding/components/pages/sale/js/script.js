var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Sale = {};

    PORTAL.modules.Sale.selfSelector = "#sale-page-content";

    PORTAL.modules.Sale.init = function ($self) {

        console.log('Component: "Sale--event"');


        var FakeData = [

            {
                description:'Отличные скидки сегодня',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531289371112',
                title:'скидки 50%'
            }

        ];


        $.ajax({

            url: 'http://wedding-services.mycloud.by/services/rest.events/rest/minsk.json',
            type: "GET",
            dataType: "json",
            success: function (data) {

                console.log("success ajax");
                console.dir(data);

                data.length != 0 ? drawEvent(data) : drawEvent(FakeData); // fake

            },
            error: function (e) {
                console.log('Error from ajax');
                console.log(e);
            }

        });

        function drawEvent(events) {

            console.log(`function drawEvent write ${events.length} events`);
            console.dir(events);
            $self.find('.no_event-text').remove();
            var wrapper = $self.find('.event-wrapper');
            var eventCard = $self.find('.event_card-sample');
            var listWrapper = $(document.createElement('div')); // document.add('div');

            events.forEach(function(elem, i){

                var newItem = eventCard.clone().removeClass('event_card-sample');
                elem.title ? newItem.find('.event_card-title').html(elem.title.substr(0, 12)): '';
                elem.background ? newItem.find('.event_card-bg').css('backgroundImage', `url("${elem.background}")`)
                    : newItem.find('.event_card-bg').css('backgroundImage', 'url("/etc/clientlibs/wedding/pages/images/profil_partner/common_profil/bgi.jpg")');
                elem.startDate ? newItem.find('.event_card-start').text(formatDate.f(elem.startDate)) : '';
                elem.endDate ? newItem.find('.event_card-finish').text(formatDate.f(elem.endDate)) : '';
                elem.description ? newItem.find('.event_card-description_text').text(elem.description.substr(0, 40)) : '';
                listWrapper.append(newItem);

            });

            wrapper.append(listWrapper);

        }



    };

    return PORTAL;

})(PORTAL || {}, jQuery);