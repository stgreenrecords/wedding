var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Sales = {};

    PORTAL.modules.Sales.selfSelector = "#sales-page-content";

    PORTAL.modules.Sales.init = function ($self) {

        console.log('Component: "Sales--\Events"');

        FakeData = [
            {
            description:'Отличные скидки сегодня',
            endDate:'155628937',
            id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
            resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
            resourceType:'xz',
            startDate:'155628937',
            title:'скидки 50%'},

            {
            description:'Отличные скидки сегодня',
            endDate:'155628937',
            id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
            resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
            resourceType:'xz',
            startDate:'155628937',
            title:'скидки 50%'},

            {
            description:'Отличные скидки сегодня',
            endDate:'155628937',
            id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
            resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
            resourceType:'xz',
            startDate:'155628937',
            title:'скидки 50%'}

        ];


        $.ajax({

            url: 'http://wedding-services.mycloud.by/services/rest.events/rest/minsk.json',
            type: "GET",
            dataType: "json",
            success: function (data) {

                console.log("success ajax");
                console.dir(data);

                data.length == 0 ? drawEvent(data) : drawEvent(FakeData); // fake

            },
            error: function (e) {
                console.log('Error from ajax');
                console.log(e);
            }

        });

        function drawEvent(data) {

            $self.find('.event_card-sample').html(data);

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

        }





    };    //---- finish portal

    return PORTAL;

})(PORTAL || {}, jQuery);