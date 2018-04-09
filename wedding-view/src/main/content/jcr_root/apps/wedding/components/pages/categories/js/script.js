var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Categories = {};

    PORTAL.modules.Categories.selfSelector = "#categories-page-content";

    PORTAL.modules.Categories.init = function ($self) {

        console.log('Component: "Categories / CATALOG "');

        var $block_catalog =  $self.find('.main-block-catalog');
        var $catalog_unit;
        var $select_category;

        $.ajax({ // добавление всех категорий в каталог

            url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
            type: "GET",
            dataType: "json",
            success: function (allCategories) {

                console.dir(allCategories);
                var k = 0;

                for (var prop in allCategories){
                    k=(k+1)%9+1;
                    $block_catalog.append(`<div class="catalog_unit"data_name_cat="${prop}"><p class='catalog_unit-name'>${prop}</p></div>`);
                    $block_catalog.find('.catalog_unit:eq(-1)').css("backgroundImage", "url('/etc/clientlibs/wedding/pages/images/any_img/d2_"+k+".jpg')");
                    // console.log(`success : ${prop} ${k}`);
                }

                $catalog_unit = $block_catalog.find('.catalog_unit').on('click', showSelectCategory);
            },
            error: function () {
                console.log("NO success AJAX ");
            }

        });

        function showSelectCategory(event){

            var selectedCategory;


            if ($(event.target).attr('data_name_cat')!=undefined)
                selectedCategory = $(event.target).attr('data_name_cat');
            else
                selectedCategory = $(event.target).parents('.catalog_unit').attr('data_name_cat');

            console.log(selectedCategory);

            document.location.href = `/content/wedding/catalog/category.html#${selectedCategory}`;

        }


        /*        (function () { // ============   Запросы

                    var photo_first = $.ajax({
                        url: "http://wedding-services.mycloud.by/services/rest.partners/photographers/minsk.15.json",
                        type: "GET",
                        dataType: "json",
                        success: function (data) {
                            console.log("success");
                            console.dir(data);
                            console.dir(data[1]);
                            var e_ob = data;
                            e_ob[1]["phone"] = "change phone";
                            console.dir(e_ob);
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
                        dataType: 'json',
                        success: function (data) {
                            console.log("success партнёров ");
                            console.dir(data);
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: "http://wedding-services.mycloud.by/services/rest.tenders/gomel.json",
                        dataType: 'json',
                        success: function (data) {
                            console.log("success  тендеры города ");
                            console.dir(data);
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: "http://wedding-services.mycloud.by/services/rest.users/minsk.json",
                        dataType: 'json',
                        success: function (data) {
                            console.log("success все юзеры ");
                            console.dir(data);
                        }
                    });

                    $.ajax({
                        type: "GET",
                        url: "http://wedding-services.mycloud.by/services/rest.users/minsk.json?userId=2f97de50-d5f3-48b8-9fc5-e4b7f0e00918",
                        dataType: 'json',
                        success: function (data) {
                            console.log("success  Юзер конкретный ");
                            console.dir(data);
                        }
                    });

                }()); // end -  --- Запросы*/



    };

    return PORTAL;

})(PORTAL || {}, jQuery);