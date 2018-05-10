var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Tender = {};

    PORTAL.modules.Tender.selfSelector = "#tender-page-content";

    PORTAL.modules.Tender.init = function ($self) {

        console.log('Component: "TendeR"');

        $("textarea").trumbowyg({
            svgPath: '/etc/clientlibs/wedding/external/icons/richtext/icons.svg',
            lang: 'ru'

        });

        var getTendId = (window.location.search).slice(1);
        var getTendCity = (window.location.hash).slice(1);
        console.log(getTendCity+" "+getTendId);

        function getSelectTend(value){

            var selectItems = {};

            selectItems.url_one = `http://wedding-services.mycloud.by/services/rest.tenders/${getTendCity}.json?id=${getTendId}`;
            console.dir(selectItems);
            var first_div = document.querySelector(".hidden_full .tender_card");
            var copy_div = first_div.cloneNode(true);

            var cloneObject ={};
            cloneObject.avatar = copy_div.querySelector(".mini-avatar");
            cloneObject.publish_date = copy_div.querySelector(".publish_date");
            cloneObject.city =  copy_div.querySelector(".tender_card-city");
            cloneObject.deadLine =copy_div.querySelector(".tender_card-dead_line");
            cloneObject.budget = copy_div.querySelector(".tender_card-budget_count");
            cloneObject.offers = copy_div.querySelector(".tender_card-offers");
            cloneObject.required = copy_div.querySelector(".tender_card-required");

            // PORTAL.sling.createModel(selectItems, selectItems.url_one);

            $.ajax({

                url: selectItems.url_one,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $self.find('#tender-cont > div').detach();
                    console.log("success");
                    console.dir(data);

                    var main_container =  document.querySelector("#tender-cont");
                    var required_container = copy_div.querySelector(".tender_card-full_text");

                    // cloneObject.

                    for (var i = 0; i<data.length; i++){
                        copy_div.querySelector('.tender_card-author_name').innerHTML = data[i].firstName+' ' +data[i].lastName;
                        cloneObject.avatar.style.backgroundImage = `url('${data[i].avatar}')`;
                        cloneObject.publish_date.innerHTML = formatDate(data[i].datePublication);
                        cloneObject.deadLine.innerHTML = formatDate(data[i].deadline);
                        cloneObject.city.innerHTML = data[i].city;  /* г. нужноВРестеОтправлять*/
                        cloneObject.budget.innerHTML = data[i].moneyLimit;
                        cloneObject.offers.innerHTML = data[i].offers;

                        var forRequired;

                        for (var j = 0; j<data[i].required.length; j++)	{
                            forRequired = cloneObject.required;
                            forRequired.innerHTML = data[i].required[j];
                            required_container.appendChild(forRequired);
                        }

                        main_container.appendChild(copy_div);
                    }

                }

            });

        }

        getSelectTend();

        function formatDate(datt) {
            var date = new Date (datt);
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            return dd + '.' + mm + '.' + yy;
        }

    };

    return PORTAL;

})(PORTAL || {}, jQuery);