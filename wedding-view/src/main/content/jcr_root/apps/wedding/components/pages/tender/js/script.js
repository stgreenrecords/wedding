var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Tender = {};

    PORTAL.modules.Tender.selfSelector = "#tender-page-content";

    PORTAL.modules.Tender.init = function ($self) {

        console.log('Component: "TendeR"');

        var FakeDataTender = [
            {
                firstName:'Мортри',
                lastName:'Петрова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_2.jpg',
                offers:'Ищем лучшего специалиста',
                backGroundImage:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_0.jpg',
                resourcePath:"/home/users/wedding/users/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/tenders/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                datePublication:'1531058937112',
                deadline:'1551289371112',
                moneyLimit:'7000',
                city:'minsk',
                cityName:'Минск',
                speciality:'rest',
                required:[
                    'Необходимо устроить уголок отдыха для vip гостей',
                    'Стиль - поздний ренесанс',
                    'Так же нужен кальян-мастер',
                    '+ Две лаунч зоны'
                ],
                shortText:'Необходимо устроить уголок отдыха для vip гостей',
                proposals:[
                    {
                        firstName:'Герман',
                        lastName:'Альберт',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_3_0.jpg',
                        speciality:'leading',
                        text:`Здравствуйте Олеся, меня зовут Мария. Буду рада предложить Вам отыграть свадьбу на все 200. 
	                		У нас в арсенале - дерижабль с обезьянами, танцующие пингвины и слон-бормоглот.`,
                        datePublication:'1531089771112'
                    },
                    {
                        firstName:'Cat',
                        lastName:'Dog',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/_0.png',
                        speciality:'rest',
                        text:`Здравствуйте Олеся, меня зовут Мария. Буду рада предложить Вам отыграть свадьбу на все 200. 
	                		У нас в арсенале - дерижабль с обезьянами, танцующие пингвины и слон-бормоглот.`,
                        datePublication:'1531299771112'
                    },
                    {
                        firstName:'Саша',
                        lastName:'Грей',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_23_1.jpg',
                        speciality:'couche',
                        text:`Здравствуйте Олеся, меня зовут Мария. Буду рада предложить Вам отыграть свадьбу на все 200. 
	                		У нас в арсенале - дерижабль с обезьянами, танцующие пингвины и слон-бормоглот.`,
                        datePublication:'1531589771112'
                    }
                ]

            }
        ];



        $("textarea").trumbowyg({
            svgPath: '/etc/clientlibs/wedding/external/icons/richtext/icons.svg',
            lang: 'ru'

        });

        var getTendId = (window.location.search).slice(1);
        var getTendCity = (window.location.hash).slice(1);
        var nameSpeciality = {};
        console.log(getTendCity+" "+getTendId);



        function getSelectTend(){

            var selectItems = {};

            //  TODOс Убрать, когда города начнуть приходить в ресте // или может и так работать )()
            // selectItems.url_first = "http://wedding-services.mycloud.by/services/rest.tenders/"/*+selectItems.$cat_val+"/"*/+selectItems.$city_val+".8.json";
            // selectItems.url_all = "http://wedding-services.mycloud.by/services/rest.tenders/"/*+selectItems.$cat_val+"/"*/+selectItems.$city_val+".json";
            //selectItems.url_one = 'http://wedding-services.mycloud.by/services/rest.tenders/gomel.1.json';

            selectItems.url_one = `http://wedding-services.mycloud.by/services/rest.tenders/${getTendCity}.json?id=${getTendId}`;
            console.dir(selectItems);

            // PORTAL.sling.createModel(selectItems, selectItems.url_one);

            $.ajax({ // добавление всех категорий
                url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    nameSpeciality = data;
                }
            });

            $.ajax({

                url: selectItems.url_one,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    $self.find('#tender-cont > div').detach();
                    console.log("success");
                    console.dir(data);
                    data.length == 0 ? drawTender(FakeDataTender) : drawTender(data);

                }

            });

        }

        getSelectTend();


        function drawTender(data){

            console.dir(data);

            var first_div = document.querySelector(".hidden_full .tender_card");
            var copy_div = first_div.cloneNode(true);

            var cloneObject ={};
            cloneObject.avatar = copy_div.querySelector(".mini-avatar");
            cloneObject.bg = copy_div.querySelector(".tender_card-img");
            cloneObject.publish_date = copy_div.querySelector(".publish_date");
            cloneObject.category =  copy_div.querySelector(".tender_card-need_cat");
            cloneObject.city =  copy_div.querySelector(".tender_card-city");
            cloneObject.deadLine = copy_div.querySelector(".tender_card-dead_line");
            cloneObject.budget = copy_div.querySelector(".tender_card-budget_count");
            cloneObject.count = copy_div.querySelector(".count_proposals");
            cloneObject.offers = copy_div.querySelector(".tender_card-offers");
            cloneObject.required = copy_div.querySelector(".tender_card-required");
            cloneObject.comment = copy_div.querySelector(".comment_field");

            var main_container =  document.querySelector("#tender-cont");
            var required_container = copy_div.querySelector(".tender_card-full_text");
            var proposals_container = copy_div.querySelector(".tender_comment-cont");

            // cloneObject.

            for (var i = 0; i<data.length; i++){

                copy_div.querySelector('.tender_card-author_name').innerHTML = data[i].firstName+' ' +data[i].lastName;

                cloneObject.avatar.style.backgroundImage = `url('${data[i].avatar}')`;
                cloneObject.bg.style.backgroundImage = `url('${data[i].backGroundImage}')`;
                cloneObject.publish_date.innerHTML = formatDate(Number(data[i].datePublication));
                cloneObject.deadLine.innerHTML = formatDate(Number(data[i].deadline));
                cloneObject.category.innerHTML = specialityTranslate(data[i].speciality);
                cloneObject.city.innerHTML = data[i].cityName;
                cloneObject.budget.innerHTML = data[i].moneyLimit;
                cloneObject.offers.innerHTML = data[i].offers;
                cloneObject.count.innerHTML = data[i].proposals.length;

                data[i].required.forEach( prop =>{
                    var reqPoint = cloneObject.required.cloneNode(true);
                    reqPoint.innerHTML = prop;
                    required_container.appendChild(reqPoint);
                });

                data[i].proposals.forEach( prop =>{
                    var commentPoint = cloneObject.comment.cloneNode(true);
                    commentPoint.querySelector('.mini-avatar').style.backgroundImage = `url('${prop.avatar}')`;
                    commentPoint.querySelector('.comment_field-author_name').innerHTML = prop.firstName+' '+ prop.lastName;
                    commentPoint.querySelector('.comment_field-author_category').innerHTML = specialityTranslate(prop.speciality);
                    commentPoint.querySelector('.comment_field-text').innerHTML = prop.text;
                    commentPoint.querySelector('.comment_field-date_fild').innerHTML = formatDate(Number(prop.datePublication));
                    proposals_container.appendChild(commentPoint);
                });

                main_container.appendChild(copy_div);
            }
        }



        function specialityTranslate(speciality){
            for (var prop in nameSpeciality){
                if(prop === speciality){
                    speciality = nameSpeciality[prop];
                }
            }
            return speciality
        }


        function formatDate(datt) {
            var date = new Date (datt);
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            return dd + '.' + mm + '.' + yy;
        }

    return PORTAL;

};)(PORTAL || {}, jQuery);