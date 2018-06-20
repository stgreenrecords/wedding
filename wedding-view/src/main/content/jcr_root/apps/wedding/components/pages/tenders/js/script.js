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
                offers:'Ищем лучшего специалиста',
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
                firstName:'Эйчантрис',
                lastName:'Денисова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_0.jpg',
                offers:'Необходимо устроить кавардак',
                backGroundImage:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_0.jpg',
                resourcePath:"/home/users/wedding/users/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/tenders/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                datePublication:'1531058937112',
                deadline:'1551289371112',
                moneyLimit:'700',
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
                firstName:'Акаша',
                lastName:'Витальева',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_2.jpg',
                offers:'Ищем лучшего специалиста',
                backGroundImage:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_0.jpg',
                resourcePath:"/home/users/wedding/users/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/tenders/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                datePublication:'1531058937112',
                deadline:'1551289371112',
                moneyLimit:'2200',
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
                        firstName:'Трокси',
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
                        firstName:'Арелия',
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

        ];

        var FakeData = [
            {
                description:'Отличные скидки сегодня',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'xz',
                startDate:'1531289371112',
                title:'скидки 50%'
            },

            {
                description:'',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'xz',
                startDate:'1531289371112',
                title:'скидки 50%'
            },

            {
                firstName:'Мортри',
                lastName:'Петрова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_2.jpg',
                offers:'',
                backGroundImage:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_0.jpg',
                resourcePath:"/home/users/wedding/users/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/tenders/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                datePublication:'1531089371112',
                deadline:'1551289371112',
                moneyLimit:'700',
                city:'minsk',
                cityName:'Минск',
                required:[
                    '',
                    '',
                    '',
                    ''
                ],
                shortText:'',
                proposals:[
                    '',
                    '',
                    '',
                    ''
                ],
                speciality:'rest'
            }

        ];



        var $tender_categ_select = $self.find('#tender_categories_select');
        var $city_select = $self.find('#city_select');

        $tender_categ_select.on('change', getFirstTend);
        $city_select.on('change', getFirstTend);

        $.ajax({ // добавление всех категорий в селект

            url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
            type: "GET",
            dataType: "json",
            success: function (allCategories) {

                $tender_categ_select.find('#photo_select').detach();
                console.dir(allCategories);

                for (var prop in allCategories){
                    if(prop !== 'rest')
                        $tender_categ_select.append(`<option value="${prop}">${prop}</option>`);
                    else
                        $tender_categ_select.append(`<option value="${prop}" selected>${prop}</option>`);
                }

                getFirstTend();

            },
            error: function () {
                console.log("NO success ");
                // getFirstTend();
            }

        });

        function getFirstTend(value){

            var selectItems = {};
            selectItems.$cat_val = $tender_categ_select.val();
            selectItems.$city_val = $city_select.val();
            selectItems.$city_name =  $city_select.find("option:selected").text(); //  TODO Убрать, когда города начнуть приходить в ресте //   может и так работать )()
            selectItems.url_first = "http://wedding-services.mycloud.by/services/rest.tenders/"+selectItems.$city_val+".8.json";
            selectItems.url_all = "http://wedding-services.mycloud.by/services/rest.tenders/"+selectItems.$city_val+".json";
            console.dir(selectItems);

            $.ajax({

                url: selectItems.url_first,
                type: "GET",
                dataType: "json",
                success: function (data) {

                    console.log("success");
                    console.dir(data);
                    data.length == 0 ? drawFirstTend(FakeDataTender2) : drawFirstTend(data);

                }

            });


            function drawFirstTend(data){

                $self.find('#tender_cards-cont > div').detach();
                var first_div = document.querySelector(".hidden_full .tender_card");
                var main_container =  document.querySelector("#tender_cards-cont");
                var copy_div = first_div.cloneNode(true);

                for (var i = 0; i<data.length; i++){
                    var publDate = new Date(data[i].datePublication);
                    var deadLine = new Date(data[i].deadline);
                    copy_div = first_div.cloneNode(true);
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
                    var copy_div = first_div.cloneNode(true);

                    if (data.length > 8){
                        for (var i = 8; i<data.length; i++){
                            var publDate = new Date(data[i].datePublication);
                            var deadLine = new Date(data[i].deadline);
                            copy_div = first_div.cloneNode(true);
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

                }

            });

        }


        function formatDate(datt) {
            var date = new Date (Number(datt));
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;
            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;
            var yy = date.getFullYear();
            return dd + '.' + mm + '.' + yy;
        }



    }; //---

    return PORTAL;

})(PORTAL || {}, jQuery);