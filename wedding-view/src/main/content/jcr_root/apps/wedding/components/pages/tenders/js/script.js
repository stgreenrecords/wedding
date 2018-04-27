var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Tenders = {};

    PORTAL.modules.Tenders.selfSelector = "#tenders-page-content";

    PORTAL.modules.Tenders.init = function ($self) {

        console.log('Component: "Tenders"');

        var $tender_categ_select = $self.find('#tender_categories_select');
        var $city_select = $self.find('#city_select');


        $tender_categ_select.on('change', getFirstTend);
        $city_select.on('change', getFirstTend);

        // var getFromCatalogCat = (window.location.hash).slice(1);
        // console.log(getFromCatalogCat);
        var dataUsers;
        var selectedTend;
        var forPersonRequest;
        var selectedPersonRequest;

        $.ajax({ // добавление всех категорий в селект

            url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
            type: "GET",
            dataType: "json",
            success: function (allCategories) {

                $tender_categ_select.find('#photo_select').detach();
                console.dir(allCategories);

                for (var prop in allCategories){
                    if(prop !== 'leading')
                        $tender_categ_select.append(`<option value="${prop}">${prop}</option>`);
                    else
                        $tender_categ_select.append(`<option value="${prop}" selected>${prop}</option>`);
                }

                getFirstTend();

            },
            error: function () {
                console.log("NO success ");
                getFirstTend();
            }

        });

        function getFirstTend(value){

            var selectItems = {};
            selectItems.$cat_val = $tender_categ_select.val();
            selectItems.$city_val = $city_select.val();
            selectItems.$city_name =  $city_select.find("option:selected").text(); //  TODO Убрать, когда города начнуть приходить в ресте // Хотя науя? может и так работать )()
            selectItems.url_first = "http://wedding-services.mycloud.by/services/rest.tenders/"/*+selectItems.$cat_val+"/"*/+selectItems.$city_val+".8.json";
            selectItems.url_all = "http://wedding-services.mycloud.by/services/rest.tenders/"/*+selectItems.$cat_val+"/"*/+selectItems.$city_val+".json";
            console.dir(selectItems);

            $.ajax({

                url: selectItems.url_first,
                type: "GET",
                dataType: "json",
                success: function (data) {

                    console.log("success");
                    console.dir(data);

                    $self.find('#tender_cards-cont > div').detach();

                    var first_div = document.querySelector(".hidden_full .tender_card");
                    var main_container =  document.querySelector("#tender_cards-cont");
                    var k=0;
                    var copy_div = first_div.cloneNode(true);

                    for (var i = 0; i<data.length; i++){
                        var publDate = new Date(data[i].datePublication);
                        // var publDate = now.format("yyyy-mm-dd"); // TODO - разобраться с форматированием даты.
                        // var dateGood = {};
                        // publDate.getDate() > 10 ? dateGood.month = publDate.getDate() : dateGood.month = '0'+ ;
                        // console.log(publDate.month);
                        var deadLine = new Date(data[i].deadline);

                        copy_div = first_div.cloneNode(true);
                        k= i%13+1;
                        copy_div.querySelector(".tender_card_href").setAttribute("href",`/content/wedding/tenders/tender.html?${data[i].id}#${data[i].city}`);
                        copy_div.querySelector('.tender_card-author_name').innerHTML = data[i].firstName+' ' +data[i].lastName;
                        copy_div.querySelector(".mini-avatar").style.backgroundImage = `url('${data[i].avatar}')`;
                        copy_div.querySelector(".publish_date").innerHTML = `${publDate.getDate()}.${publDate.getMonth()+1}.${publDate.getFullYear()}`;
                        copy_div.querySelector(".tender_card-city").innerHTML = `г. ${selectItems.$city_name}`;
                        copy_div.querySelector(".tender_card-dead_line").innerHTML = `${deadLine.getDate()}.${deadLine.getMonth()+1}.${deadLine.getFullYear()}`;
                        copy_div.querySelector(".tender_card-budget_count").innerHTML = data[i].moneyLimit;
                        copy_div.querySelector(".short_text_text").innerHTML = data[i].shortText;
                        main_container.appendChild(copy_div);
                    }

                    getAllTend (selectItems);

                }

            });

        }


        function getAllTend (selectItems){

            $.ajax({

                url: selectItems.url_all,
                type: "GET",
                dataType: "json",
                success: function (data) {

                    console.log("success");
                    console.dir(data);

                    var first_div = document.querySelector(".hidden_full .tender_card");
                    var main_container =  document.querySelector("#tender_cards-cont");
                    var k=0;
                    var copy_div = first_div.cloneNode(true);

                    if (data.length > 8){
                        for (var i = 8; i<data.length; i++){
                            var publDate = new Date(data[i].datePublication);
                            var deadLine = new Date(data[i].deadline);
                            copy_div = first_div.cloneNode(true);
                            k= i%13+1;
                            copy_div.querySelector(".tender_card_href").setAttribute("href",`/content/wedding/tenders/tender.html?${data[i].id}#${data[i].city}`);
                            copy_div.querySelector('.tender_card-author_name').innerHTML = data[i].firstName+' ' +data[i].lastName;
                            copy_div.querySelector(".mini-avatar").style.backgroundImage = `url('${data[i].avatar}')`;
                            copy_div.querySelector(".publish_date").innerHTML = `${publDate.getDate()}.${publDate.getMonth()+1}.${publDate.getFullYear()}`;
                            copy_div.querySelector(".tender_card-city").innerHTML = `г. ${selectItems.$city_name}`;
                            copy_div.querySelector(".tender_card-dead_line").innerHTML = `${deadLine.getDate()}.${deadLine.getMonth()+1}.${deadLine.getFullYear()}`;
                            copy_div.querySelector(".tender_card-budget_count").innerHTML = data[i].moneyLimit;
                            copy_div.querySelector(".short_text_text").innerHTML = data[i].shortText;
                            main_container.appendChild(copy_div);
                        }
                    }

                    $self.find('.search-usually').on('click', showSelectTend);
                    // forPersonRequest = selectItems.url_all;

                }

            });

        }


        function showSelectTend(event){

        }


    };

    return PORTAL;

})(PORTAL || {}, jQuery);