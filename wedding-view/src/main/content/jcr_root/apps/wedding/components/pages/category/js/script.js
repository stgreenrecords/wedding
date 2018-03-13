var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Category = {};

    PORTAL.modules.Category.selfSelector = "#category-page-content";

    PORTAL.modules.Category.init = function ($self) {


        (function () { // Работа с окнами входа и регистрации

            var entrance = document.getElementById("entrance-cabinet-btn");
            var registration = document.getElementById("registration-btn");

            entrance.addEventListener("click", function (evt) {
                console.log(evt.type);
                console.log(evt.clientX);
                this.style.color = "#555";
            });

            var modal = document.querySelector("#entrance-form");

            function showEntranceForm() {

                modal.style.visibility = "visible";
                var mwindow = document.querySelector(".mwindow");
                mwindow.style.visibility = "visible";
                mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width) / 2 + "px";
                mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height) / 3 + "px";
            };


            entrance.addEventListener("click", showEntranceForm);
            console.log(modal.style.visibility);
            window.addEventListener("resize", function () {
                if (modal.style.visibility == "visible")
                    showEntranceForm();
            });

            modal.addEventListener("click", function (evt) {
                // evt.stopPropagation();
                if (evt.target == document.querySelector("#entrance-form")) {
                    this.style.visibility = "hidden";
                    Array.from(this.children).forEach(function (elem) {
                        elem.style.visibility = "hidden";
                    });
                }
                ;
            });

        }()); // end -  --- с окнами входа и регистрации

        (function () { // ============   Запросы

            $.ajax({
                url: "http://wedding-services.mycloud.by/services/rest.partners/photographers/minsk.8.json",
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
                    var main_container = document.querySelector("#search-usually-cont");

                    for (let i = 0; i < photo_first_five.length; i++) {
                        let copy_div = first_div.cloneNode(true);
                        copy_div.querySelector(".search-usually_img").style.backgroundImage = "url('/etc/clientlibs/wedding/pages/images/any_img/d2_" + (i + 1) + ".jpg')";
                        copy_div.querySelector(".search-usually_content_name").innerHTML = photo_first_five[i].firstName + " " + photo_first_five[i].lastName;
                        copy_div.querySelector(".search-usually_content_speciality").innerHTML = photo_first_five[i].speciality;
                        main_container.appendChild(copy_div);
                    }
                }  //  success finish
            });  // ---  AJAX finish

          /*  // - ==========================================       ЗАкомментировано до возвращения к верстке на КАТАЛОГА 13.03.2018
            $.ajax({  // ---  AJAX 2
                url: "https://api.github.com/emojis",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    var xc = data;
                    console.log("success");
                    console.dir(data);
                    var second_div = document.querySelector(".search-usually");
                    var main_container2 = document.querySelector("#search-usually-cont");

                    for (let prop in xc) {
                        let copy_div = second_div.cloneNode(true);
                        copy_div.querySelector(".search-usually_img").style.backgroundImage = "url('" + xc[prop] + "')";
                        main_container2.appendChild(copy_div);
                    }

                }
            });             // ---  AJAX 2 finish

            setTimeout(function () {
                $.ajax({  // ---  AJAX All
                    url: "http://wedding-services.mycloud.by/services/rest.partners/photographers/minsk.json",
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        var photo_all = data;
                        var all_div = document.querySelectorAll(".search-usually");

                        for (var i = 0; i < all_div.length; i++) {
                            all_div[i].querySelector(".search-usually_content_name").innerHTML = photo_all[i].firstName + " " + photo_all[i].lastName;
                            all_div[i].querySelector(".search-usually_content_speciality").innerHTML = photo_all[i].speciality;
                        }

                    }
                })
            }, 1000);     // ---  AJAX All finish
            */

        }()); // end -  --- Запросы

        console.log('Component: "Category"');

    };

    return PORTAL;

})(PORTAL || {}, jQuery);