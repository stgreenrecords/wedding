var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Tenders = {};

    PORTAL.modules.Tenders.selfSelector = "#tenders-page-content";

    PORTAL.modules.Tenders.init = function ($self) {

        console.log('Component: "Tenders"');

        var FakeDataTender = [      // Data - фэйко-заменяющая приходящие косяки
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
                    },
                    {
                        firstName:'Dima',
                        lastName:'p',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/_0.png',
                        speciality:'кареты',
                        text:`Здравствуйте Олеся - только кареты.`,
                        datePublication:'1531789771112'
                    },
                    {
                        firstName:'Сергей',
                        lastName:'Лукьянов',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/_0.png',
                        speciality:'rest',
                        text:`Добрый день - все сделаем.`,
                        datePublication:'1532789771112'
                    }
                ]

            }
        ];

        var FakeDataTender2 = [      // Data - фэйко-приходящая
            {
                firstName:'Мортри',
                lastName:'Петрова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_2.jpg',
                offers:'',
                backGroundImage:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_0.jpg',
                resourcePath:"/home/users/wedding/users/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/tenders/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                datePublication:'1531058937112',
                deadline:'1551289371112',
                moneyLimit:'500',
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
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_3.jpg',
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
                    },
                    {
                        firstName:'Dima',
                        lastName:'p',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/_0.png',
                        speciality:'кареты',
                        text:`Здравствуйте Олеся - только кареты.`,
                        datePublication:'1531789771112'
                    },
                    {
                        firstName:'Сергей',
                        lastName:'Лукьянов',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/_0.png',
                        speciality:'rest',
                        text:`Добрый день - все сделаем.`,
                        datePublication:'1532789771112'
                    }
                ]

            },
            {
                firstName:'Ланая',
                lastName:'Филлипова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_1.jpg',
                offers:'Необходимо устроить уголок',
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
                shortText:'Хотим отдохнуть',
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
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_3.jpg',
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
                    },
                    {
                        firstName:'Dima',
                        lastName:'p',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/_0.png',
                        speciality:'кареты',
                        text:`Здравствуйте Олеся - только кареты.`,
                        datePublication:'1531789771112'
                    },
                    {
                        firstName:'Сергей',
                        lastName:'Лукьянов',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/_0.png',
                        speciality:'rest',
                        text:`Добрый день - все сделаем.`,
                        datePublication:'1532789771112'
                    }
                ]

            },
            {
                firstName:'Эйчантрис',
                lastName:'Денисова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_0.jpg',
                offers:'Необходимо устроить кавардак',
                backGroundImage:'/etc/clientlibs/wedding/pages/images/any_img/bgi_16_0.jpg',
                resourcePath:"/home/users/wedding/users/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/tenders/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                datePublication:'1531058937112',
                deadline:'1551289371112',
                moneyLimit:'700',
                city:'minsk',
                cityName:'Минск',
                speciality:'exclusive',
                required:[
                    'Необходимо устроить уголок отдыха для vip гостей',
                    'Стиль - поздний ренесанс',
                    'Так же нужен кальян-мастер',
                    '+ Две лаунч зоны'
                ],
                shortText:' Лучше фоток запилить',
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
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_3.jpg',
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
                    },
                    {
                        firstName:'Dima',
                        lastName:'p',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/_0.png',
                        speciality:'кареты',
                        text:`Здравствуйте Олеся - только кареты.`,
                        datePublication:'1531789771112'
                    },
                    {
                        firstName:'Сергей',
                        lastName:'Лукьянов',
                        avatar:'/etc/clientlibs/wedding/pages/images/any_img/_0.png',
                        speciality:'rest',
                        text:`Добрый день - все сделаем.`,
                        datePublication:'1532789771112'
                    }
                ]

            },
            {
                firstName:'Акаша',
                lastName:'Витальева',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_3.jpg',
                offers:'Ищем лучшего специалиста',
                backGroundImage:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_0.jpg',
                resourcePath:"/home/users/wedding/users/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/tenders/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                datePublication:'1531358937112',
                deadline:'1551289371112',
                moneyLimit:'22',
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
                ]

            },

        ];

//-------*-*-*-*-*-*-*-*--*-*-*-*-*-*--*-*-*-***-*-*-*-*-*-*-*

        var $tender_categ_select = $self.find('#tender_categories_select');
        var $city_select = $self.find('#city_select');
        var nameSpeciality = {};
        var container =  document.querySelector("#tender_cards-cont");
        $tender_categ_select.on('change', filtrCateg);
        $city_select.on('change', getFirstTend);

        $.ajax({ // добавление всех категорий в селект

            url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
            type: "GET",
            dataType: "json",
            success: function (allCategories) {

                $tender_categ_select.find('#photo_select').detach();
                console.dir(allCategories);
                nameSpeciality = allCategories;

                for (var prop in allCategories){
                    // if(getFromCatalogCat !== prop)
                    if(prop !== 'rest')
                        $tender_categ_select.append(`<option value="${prop}">${allCategories[prop]}</option>`);
                    else
                        $tender_categ_select.append(`<option value="${prop}" selected>${allCategories[prop]}</option>`);
                }

                getFirstTend();

                filtrCateg();

            },
            error: function (e) {
                console.log(e);
            }

        });

        function filtrCateg(){
            var $cat_val = $tender_categ_select.val();
            console.log($cat_val);
            // container.innerHTML = '';

        }

        function getFirstTend(){

            var selectItems = {};
            selectItems.$cat_val = $tender_categ_select.val();
            selectItems.$city_val = $city_select.val();
            selectItems.$city_name =  $city_select.find("option:selected").text(); //  TODO Убрать, когда города начнуть приходить в ресте //   может и так работать )()
            selectItems.url_first = "http://wedding-services.mycloud.by/services/rest.tenders/"+selectItems.$city_val+".6.json";   //
            selectItems.url_all = "http://wedding-services.mycloud.by/services/rest.tenders/"+selectItems.$city_val+".json";
            console.dir(selectItems);

            $.ajax({
                url: selectItems.url_first,
                type: "GET",
                dataType: "json",
                success: function (data) {

                    console.log( selectItems.url_first);
                    console.dir(data);
                    container.innerHTML = '';
                    data.length == 0 ? drawTender(FakeDataTender2, selectItems) : drawTender(data, selectItems);
                    /*data.length*/ 6 == 6 ? getAllTend(selectItems) : '' ;

                }
            });

        }

        function getAllTend (selectItems){

            $.ajax({
                url: selectItems.url_all,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log("success All_Tend");
                    console.dir(data);
                    data.length > 6 ? drawTender(data, selectItems, 6) : drawTender(FakeDataTender2, selectItems) /*''*/ ; //TODO - заменить на ''
                }
            });

        }

        function drawTender(data, selectItems, label=0){

            var first_div = document.querySelector(".hidden_full .tender_card");
            var wrapper_div = document.createElement('div');
            var main_container =  document.querySelector("#tender_cards-cont");
            var cloneObject ={};

            for (var i = label; i<data.length; i++){

                var copy_div = first_div.cloneNode(true);

                cloneObject.avatar = copy_div.querySelector(".mini-avatar");
                cloneObject.bg = copy_div.querySelector(".tender_card-img");
                cloneObject.publish_date = copy_div.querySelector(".publish_date");
                cloneObject.category =  copy_div.querySelector(".tender_card-need_cat");
                cloneObject.city =  copy_div.querySelector(".tender_card-city");
                cloneObject.deadLine = copy_div.querySelector(".tender_card-dead_line");
                cloneObject.budget = copy_div.querySelector(".tender_card-budget_count");
                cloneObject.count = copy_div.querySelector(".count_proposals");
                cloneObject.offers = copy_div.querySelector(".short_text_text");
                cloneObject.required = copy_div.querySelector(".tender_card-required");
                cloneObject.comment = copy_div.querySelector(".comment_field");

                copy_div.querySelector('.tender_card-author_name').innerHTML = data[i].hasOwnProperty('firstName') && data[i].firstName != null
                && data[i].hasOwnProperty('lastName') && data[i].lastName != null
                    ? data[i].firstName+' ' +data[i].lastName : '';
                cloneObject.avatar.style.backgroundImage = data[i].hasOwnProperty('avatar')&&data[i].avatar != null
                    ? `url('${data[i].avatar}')` : `url('${FakeDataTender[i].avatar}')` ;
                cloneObject.bg.style.backgroundImage = data[i].hasOwnProperty('backGroundImage')&&data[i].backGroundImage != null
                    ? `url('${data[i].backGroundImage}')` : `url('${FakeDataTender[i].backGroundImage}')` ;
                cloneObject.publish_date.innerHTML = data[i].hasOwnProperty('datePublication')&&data[i].datePublication != null
                    ? formatDate.f(data[i].datePublication) : formatDate.f(FakeDataTender[i].datePublication);
                cloneObject.deadLine.innerHTML = data[i].hasOwnProperty('deadline')&&data[i].deadline != null
                    ? formatDate.f(data[i].deadline) : formatDate.f(FakeDataTender[i].deadline);
                cloneObject.category.innerHTML = data[i].hasOwnProperty('speciality')&&data[i].speciality != null
                    ? specialityTranslate(data[i].speciality) : specialityTranslate(FakeDataTender[i].speciality);
                cloneObject.city.innerHTML = data[i].hasOwnProperty('cityName')&&data[i].cityName != null
                    ? data[i].cityName : FakeDataTender[i].cityName;
                cloneObject.budget.innerHTML = data[i].hasOwnProperty('moneyLimit')&&data[i].moneyLimit != null
                    ? data[i].moneyLimit : FakeDataTender[i].moneyLimit;
                data[i].hasOwnProperty('moneyLimit')&&data[i].offers ? cloneObject.offers.innerHTML = data[i].offers : '';

                copy_div.querySelector(".tender_card_href").
                setAttribute("href",`/content/wedding/tenders/tender.html?${data[i].id}#${selectItems.$city_val}`);

                // elem.description ? newItem.find('.event_card-description_text').text(elem.description.substr(0, 40)) : '';

                if (data[i].hasOwnProperty('proposals') && data[i].proposals != null && data[i].proposals.length !== 0 )
                    cloneObject.count.innerHTML = data[i].proposals.length;
                else{
                    cloneObject.count.classList.remove("count_proposals");
                    copy_div.querySelector(".tender_card-proposals").innerHTML ='';
                }

                // wrapper_div.appendChild(copy_div);
                main_container.appendChild(copy_div);
            }
            // main_container.appendChild(wrapper_div);
            console.dir(data);
        }

        function specialityTranslate(speciality){
            Object.keys(nameSpeciality).forEach( prop =>  prop === speciality ? speciality = nameSpeciality[prop] : '');
            return speciality;
        }



    }; //---

    return PORTAL;

})(PORTAL || {}, jQuery);