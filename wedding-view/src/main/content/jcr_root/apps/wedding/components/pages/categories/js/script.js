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
                    k=(k+1)%13+1;
                    $block_catalog.append(`<div class="catalog_unit"data_name_cat="${prop}"><p class='catalog_unit-name'>${allCategories[prop]}</p></div>`);
                    $block_catalog.find('.catalog_unit:eq(-1)').css("backgroundImage", "url('/etc/clientlibs/wedding/pages/images/any_img/d2_"+k+".jpg')");
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

    };

    return PORTAL;

})(PORTAL || {}, jQuery);