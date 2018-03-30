var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Category = {};

    PORTAL.modules.Category.selfSelector = "#category-page-content";

    PORTAL.modules.Category.init = function ($self) {

        console.log('Component: "Category"');

        (function () { // ============   Запросы

            $.ajax({
                url: "http://wedding-services.mycloud.by/services/rest.partners/photographers/minsk.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    var photo_first_five = data;
                    console.log("success");

                    console.dir(data);

                    console.dir(photo_first_five);
                    console.log(photo_first_five[4].firstName);
                    console.log(photo_first_five[4].lastName);
                    console.log(photo_first_five[4].speciality);
                    console.log(photo_first_five[4].type);
                    console.log(photo_first_five[4].vip);

                    var pro_div = document.querySelector(".search-pro");
                    pro_div.style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_5.jpg')";
                    pro_div.querySelector(".pro_phone").innerHTML = photo_first_five[4].phone;
                    pro_div.querySelector(".pro_vk").innerHTML = photo_first_five[4].vkLink;

                    var pro_div2 = document.querySelector(".search-pro2");
                    pro_div2.style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_2.jpg')";
                    pro_div2.querySelector(".pro_phone").innerHTML = photo_first_five[1].phone;
                    pro_div2.querySelector(".pro_vk").innerHTML = photo_first_five[1].vkLink;

                    var first_div = document.querySelector(".search-usually");
                    var main_container =  document.querySelector("#search-usually-cont");
                    var k=0;
                    for (var i = 0; i<photo_first_five.length; i++){
                        var copy_div = first_div.cloneNode(true);
                        k= i%9+1;
                        copy_div.querySelector(".search-usually_img").style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_"+k+".jpg')";
                        copy_div.querySelector(".search-usually_content_name").innerHTML = photo_first_five[i].firstName + " "+ photo_first_five[i].lastName;
                        copy_div.querySelector(".search-usually_content_speciality").innerHTML = photo_first_five[i].speciality;
                        main_container.appendChild(copy_div);
                    }

                }  //  success finish

            });  // ---  AJAX finish

            setTimeout(function () {
                $.ajax({  // ---  AJAX All
                    url: "http://wedding-services.mycloud.by/services/rest.partners/photographers/minsk.json",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        var allUser = data;
                        var all_div = document.querySelectorAll(".search-usually");
                        var first_div = document.querySelector(".search-usually");
                        var main_container =  document.querySelector("#search-usually-cont");
                        var k=0;
                        for (var i = 0; i<allUser.length; i++){
                            var copy_div = first_div.cloneNode(true);
                            k= i%9+1;
                            copy_div.querySelector(".search-usually_img").style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_"+k+".jpg')";
                            copy_div.querySelector(".search-usually_content_name").innerHTML = allUser[i].firstName + " "+ allUser[i].lastName;
                            copy_div.querySelector(".search-usually_content_speciality").innerHTML = allUser[i].speciality;
                            main_container.appendChild(copy_div);
                        }
                    }
                })
            }, 1000);     // ---  AJAX All finish

            $.ajax({
                url: "http://wedding-services.mycloud.by/services/rest.users/minsk.json?userId=a931a267-ff17-4d89-ab80-e478c0a6de0a",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.dir(data);
                }
            });

        }()); // end -  --- Запросы



    };

    return PORTAL;

})(PORTAL || {}, jQuery);