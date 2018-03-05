var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Categories = {};

    PORTAL.modules.Categories.selfSelector = "#categories-page-content";

    PORTAL.modules.Categories.init = function ($self) {

/*

        addEventListener("DOMContentLoaded",function() {
*/
            (function(){ // Работа с окнами входа и регистрации

                var entrance = document.getElementById("entrance-cabinet-btn");
                var registration = document.getElementById("registration-btn");

                entrance.addEventListener("click", function(evt) {
                    console.log(evt.type);
                    console.log(evt.clientX);
                    this.style.color = "#555";
                });

                var modal = document.querySelector("#entrance-form");

                function showEntranceForm() {

                    modal.style.visibility = "visible";
                    var mwindow = document.querySelector(".mwindow");
                    mwindow.style.visibility = "visible";
                    mwindow.style.left = (document.documentElement.clientWidth - mwindow.getBoundingClientRect().width)/2 + "px";
                    mwindow.style.top = (document.documentElement.clientHeight - mwindow.getBoundingClientRect().height)/3 + "px";
                };


                entrance.addEventListener("click", showEntranceForm);
                console.log(modal.style.visibility);
                window.addEventListener("resize", function(){
                    if (modal.style.visibility == "visible")
                        showEntranceForm();
                });

                modal.addEventListener("click", function(evt) {
                    // evt.stopPropagation();
                    if (evt.target == document.querySelector("#entrance-form")) {
                        this.style.visibility = "hidden";
                        Array.from(this.children).forEach(function(elem) {
                            elem.style.visibility = "hidden";
                        });
                    };
                });








            }()); // end -  --- с окнами входа и регистрации
        /*
                });   //  ---   DOMContentLoaded finish

        */

        (function(){ // ============   Запрос


            var photo_first =  $.ajax({
                url: "http://wedding-services.mycloud.by/services/rest.partners/photographers/minsk.5.json",
                type: "GET",
                dataType: "json",
                // crossDomain: "true",
                success: function (data) {

                    console.log("success");
                    console.dir(data);

                  //  var example_object = JSON.parse(photo_first);
                   // console.dir(example_object);

                        //example_object[1]['id'] = "lalala";
                    // console.dir(data);
                }
            });


        }()); // end -  --- Запрос



        console.log('Component: "Categories"');

    };

    return PORTAL;

})(PORTAL || {}, jQuery);