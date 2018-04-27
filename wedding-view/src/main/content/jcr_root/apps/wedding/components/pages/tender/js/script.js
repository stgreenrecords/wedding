var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Tender = {};

    PORTAL.modules.Tender.selfSelector = "#tender-page-content";

    PORTAL.modules.Tender.init = function ($self) {

        console.log('Component: "TendeR"');



        function getSelectTend(value){

            var selectItems = {};
            //  TODO Убрать, когда города начнуть приходить в ресте // Хотя науя? может и так работать )()

            // selectItems.url_first = "http://wedding-services.mycloud.by/services/rest.tenders/"/*+selectItems.$cat_val+"/"*/+selectItems.$city_val+".8.json";
            // selectItems.url_all = "http://wedding-services.mycloud.by/services/rest.tenders/"/*+selectItems.$cat_val+"/"*/+selectItems.$city_val+".json";
            selectItems.url_one = 'http://wedding-services.mycloud.by/services/rest.tenders/gomel.1.json';
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
                    var k=0;

                    // cloneObject.

                    for (var i = 0; i<data.length; i++){
                        var publDate = new Date(data[i].datePublication);
                        var deadLine = new Date(data[i].deadline);
                        // copy_div = first_div.cloneNode(true);
                        k= i%13+1;
                        cloneObject.avatar.style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_"+k+".jpg')";
                        cloneObject.publish_date.innerHTML = `${publDate.getDate()}.${publDate.getMonth()+1}.${publDate.getFullYear()}`;
                        cloneObject.city.innerHTML = `г. нужноВРестеОтправлять `;  /*${selectItems.$city_name}*/
                        cloneObject.deadLine.innerHTML = `${deadLine.getDate()}.${deadLine.getMonth()+1}.${deadLine.getFullYear()}`;
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

        $("textarea").trumbowyg({
            svgPath: '/etc/clientlibs/wedding/external/icons/richtext/icons.svg',
            lang: 'ru'
        });





        function showSelectTend(event){



        }









    };

    return PORTAL;

})(PORTAL || {}, jQuery);