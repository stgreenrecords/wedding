var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Sales = {};

    PORTAL.modules.Sales.selfSelector = "#sales-page-content";

    PORTAL.modules.Sales.init = function ($self) {

        console.log('Component: "Sales--\Events"');

        var FakeData = [
            {
                description:'Отличные скидки сегодня',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531289371112',
                title:'скидки 30%'
            },

            {
                description:'',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531289371112',
                title:'скидки 20%'
            },

            {
                description:'Отличные скидки на всю зиму',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531289371112',
                title:'Скидки 50%'
            },

            {
                description:'Отличные скидки на всю зиму',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531289371112',
                title:'Бонус 50% на платье'
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
                elem.startDate ? newItem.find('.event_card-start').text(formatDate(Number(elem.startDate))) : '';
                elem.endDate ? newItem.find('.event_card-finish').text(formatDate(Number(elem.endDate))) : '';
                elem.description ? newItem.find('.event_card-description_text').text(elem.description.substr(0, 40)) : '';
                listWrapper.append(newItem);

            });

            wrapper.append(listWrapper);

        }

        /* $self.find('#tender_cards-cont > div').detach();
         var first_div = document.querySelector(".hidden_full .tender_card");
         var main_container =  document.querySelector("#tender_cards-cont");
         var copy_div = first_div.cloneNode(true);

         for (var i = 0; i<data.length; i++){
             var publDate = new Date(data[i].datePublication);
             // var publDate = now.format("yyyy-mm-dd"); // TODOc - разобраться с форматированием даты.
             // var dateGood = {};
             // publDate.getDate() > 10 ? dateGood.month = publDate.getDate() : dateGood.month = '0'+ ;
             // console.log(publDate.month);
             var deadLine = new Date(data[i].deadline);
             copy_div = first_div.cloneNode(true);
             copy_div.querySelector(".tender_card_href").setAttribute("href",`/content/wedding/tenders/tender.html?${data[i].id}#${data[i].city}`);
             copy_div.querySelector('.tender_card-author_name').innerHTML = data[i].firstName+' ' +data[i].lastName;
             copy_div.querySelector(".mini-avatar").style.backgroundImage = `url('${data[i].avatar}')`;
             copy_div.querySelector(".publish_date").innerHTML = `${publDate.getDate()}.${publDate.getMonth()+1}.${publDate.getFullYear()}`;
             copy_div.querySelector(".tender_card-city").innerHTML = `г. ${selectItems.$city_name}`;
             copy_div.querySelector(".tender_card-dead_line").innerHTML = `${deadLine.getDate()}.${deadLine.getMonth()+1}.${deadLine.getFullYear()}`;
             copy_div.querySelector(".tender_card-budget_count").innerHTML = data[i].moneyLimit;
             copy_div.querySelector(".short_text_text").innerHTML = data[i].shortText;
             main_container.appendChild(copy_div);
         }*/

        // getAllEvent (selectItems);


        function formatDate(datt) {
            var date = new Date (datt);
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            return dd + '.' + mm + '.' + yy;
        }




    };    //---- finish portal

    return PORTAL;

})(PORTAL || {}, jQuery);