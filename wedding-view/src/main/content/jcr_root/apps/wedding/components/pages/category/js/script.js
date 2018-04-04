var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Category = {};

    PORTAL.modules.Category.selfSelector = "#category-page-content";

    PORTAL.modules.Category.init = function ($self) {

        console.log('Component: "Category"');

        $partner_categ_select = $self.find('#partner_categories_select');
        $city_select = $self.find('#city_select');

        $partner_categ_select.on('change', getSelectedCat);
        $city_select.on('change', getSelectedCat);
        $self.find('#search-usually-cont').on('click', showSelectPerson);



        $.ajax({ // добавление всех категорий в селект

            url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
            type: "GET",
            dataType: "json",
            success: function (allCategories) {

                $partner_categ_select.find('#photo_select').detach();
                console.dir(allCategories);

                for (var prop in allCategories){
                    $partner_categ_select.append(`<option value="${prop}">${prop}</option>`);
                }

                getSelectedCat();

            },
            error: function () {
                console.log("NO success ");
                getSelectedCat();
            }

        });

        function getSelectedCat(value){

            var selectItems = {};
            selectItems.$cat_val = $partner_categ_select.val();
            selectItems.$city_val = $city_select.val();
            selectItems.url_first = "http://wedding-services.mycloud.by/services/rest.partners/"+selectItems.$cat_val+"/"+selectItems.$city_val+".14.json";
            selectItems.url_all = "http://wedding-services.mycloud.by/services/rest.partners/"+selectItems.$cat_val+"/"+selectItems.$city_val+".json";

            console.dir(selectItems);

            $.ajax({

                url: selectItems.url_first,
                type: "GET",
                dataType: "json",
                success: function (data) {

                    console.log("success");
                    console.dir(data);

                    var pro_div = document.querySelector(".search-pro");
                    pro_div.style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_5.jpg')";
                    pro_div.querySelector(".search-usually_content_name").innerHTML = data[0].firstName + " "+ data[0].lastName;
                    pro_div.querySelector(".search-usually_content_speciality").innerHTML = data[0].speciality;
                    pro_div.querySelector(".pro_phone").innerHTML = data[0].phone;
                    pro_div.querySelector(".pro_vk").innerHTML = '<a href='+data[0].vkLink+' target="blank">'+data[0].vkLink+'</a>' ;

                    var pro_div2 = document.querySelector(".search-pro2");
                    pro_div2.style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_2.jpg')";
                    pro_div2.querySelector(".search-usually_content_name").innerHTML = data[1].firstName + " "+ data[1].lastName;
                    pro_div2.querySelector(".search-usually_content_speciality").innerHTML = data[1].speciality;
                    pro_div2.querySelector(".pro_phone").innerHTML = data[1].phone;
                    pro_div2.querySelector(".pro_vk").innerHTML = '<a href='+data[1].vkLink+' target="blank">'+data[1].vkLink+'</a>' ;

                    var first_div = document.querySelector(".search-usually");
                    var main_container =  document.querySelector("#search-usually-cont");
                    var k=0;
                    var copy_div = first_div.cloneNode(true);

                    $self.find('#search-usually-cont div').detach();

                    for (var i = 2; i<data.length; i++){
                        copy_div = first_div.cloneNode(true);
                        k= i%9+1;
                        copy_div.querySelector(".search-usually_img").style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_"+k+".jpg')";
                        copy_div.querySelector(".search-usually_content_name").innerHTML = data[i].firstName + " "+ data[i].lastName;
                        copy_div.querySelector(".search-usually_content_speciality").innerHTML = data[i].speciality;
                        copy_div.setAttribute('userId', data[i].userId);
                        main_container.appendChild(copy_div);
                    }

                    getAllPersonInCat (selectItems);

                }

            });

        }


        function getAllPersonInCat (selectItems) {

            $.ajax({

                url: selectItems.url_all,
                type: "GET",
                dataType: "json",
                success: function (allUser) {

                    console.dir(allUser);
                    var all_div = document.querySelectorAll(".search-usually");
                    var first_div = document.querySelector(".search-usually");
                    var main_container =  document.querySelector("#search-usually-cont");
                    var k=0;
                    if (allUser.length > 12){
                        for (var i = 12; i<allUser.length; i++){
                            var copy_div = first_div.cloneNode(true);
                            k= i%9+1;
                            copy_div.querySelector(".search-usually_img").style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_"+k+".jpg')";
                            copy_div.querySelector(".search-usually_content_name").innerHTML = allUser[i].firstName + " "+ allUser[i].lastName;
                            copy_div.querySelector(".search-usually_content_speciality").innerHTML = allUser[i].speciality;
                            main_container.appendChild(copy_div);
                        }
                    }

                }

            });

        }

        function showSelectPerson(event){
            console.log("showSelectPerson");
            console.log($self.find('event.target').attr('userId'));

            $.ajax({
                url: "http://wedding-services.mycloud.by/services/rest.users/minsk.json?userId=a931a267-ff17-4d89-ab80-e478c0a6de0a",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.dir(data);
                }
            });


        }

    };

    return PORTAL;

})(PORTAL || {}, jQuery);