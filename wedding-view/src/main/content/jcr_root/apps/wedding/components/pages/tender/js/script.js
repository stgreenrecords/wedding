var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Tender = {};

    PORTAL.modules.Tender.selfSelector = "#tender-page-content";

    PORTAL.modules.Tender.init = function ($self) {

        console.log('Component: "TendeR"');

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

            }
        ];


//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-**-*-*-**-*-/*-*-*-*-*-*-/-**-*-*-*-*9-+9-+*+-+9*-9*+-9+-*9+9-+9+9-+9+9+98+98+8+*

        $("textarea").trumbowyg({
            svgPath: '/etc/clientlibs/wedding/external/icons/richtext/icons.svg',
            lang: 'ru'

        });

        var getTendId = (window.location.search).slice(1);
        var getTendCity = (window.location.hash).slice(1);
        var nameSpeciality = {};
        var $commentBtn = $self.find('#tender_add_comment');

        Cookies.get('authStatus') != 'authorized' ? noAut() : '';
        Cookies.get('authStatus') === 'authorized' ? goodAut() : '';


        function noAut(){
            console.log('Войдите или зарегестрируйтесь, чтобы написать комментрарий');
            $commentBtn.on('click', drawAllert);
        }

        function goodAut(){
            $commentBtn.on('click', sendComment);
        }

        // ДОделать   popup  по стилям;

        function drawAllert(){
            // alert('Войдите или зарегестрируйтесь, чтобы написать комментарий');
            modalW.openMWindow(".popup_alert","#popup_modal");
        }

        function sendComment(){

            var content = $self.find('.trumbowyg-editor').html();
            $self.find('.trumbowyg-editor').html('');

            var commentInfo = {	text:content, authorID:Cookies.get('userId'), authorCity:Cookies.get('city'),  avatar:Cookies.get('avatar'),
                speciality:Cookies.get('workSphere'), firstName:Cookies.get('firstName'), lasName:Cookies.get('lasName'), datePublication: +new Date()};

            sendChangeRequest([{proposal:commentInfo}]);

        }


        function sendChangeRequest(dataSend){

            console.dir(dataSend);

            $.ajax({

                url: 'http://weddi ng-services.mycloud.by/services/rest.partners/update.json'+getTendId,
                type: 'PUT',
                dataType: 'json',
                data: dataSend,
                success: function(data){
                    console.log('CallBack:');
                    console.log(data);
                    data.length != 0 ? drawNewComment(data) : drawNewComment(dataSend) ; //!!!!!1**** - Если приходит ответ - он и будет выводиться
                },
                error: function (e) {
                    console.log(e);
                    drawNewComment(dataSend);
                }

            });

        }

        function  drawNewComment(data) {

            var tenderCard = document.querySelector('.hidden_full .tender_card');
            var comment = tenderCard.querySelector('.comment_field');
            var proposals_container = document.querySelector("#tender-cont .tender_card .tender_comment-cont");
            var count = document.querySelector("#tender-cont .tender_card .count_proposals");
            var container = document.querySelector("#tender-cont .tender_card .tender_card-prop-cont");
            container.classList.contains("hidden_full") ? container.classList.remove("hidden_full"): '';
            console.log (count.innerHTML);
            count.innerHTML = Number(count.innerHTML) + 1;

            if (data[0].hasOwnProperty('proposal')&&data[0].proposal != null){

                var prop =  data[0].proposal;
                var commentPoint = comment.cloneNode(true);
                commentPoint.querySelector('.mini-avatar').style.backgroundImage = prop.avatar ? `url('${prop.avatar}')` :  `url('${FakeDataTender[0].avatar}')`;
                commentPoint.querySelector('.comment_field-author_name').innerHTML = prop.firstName ? prop.firstName : '.' ;
                commentPoint.querySelector('.comment_field-author_name').innerHTML += prop.lastName ? ' '+ prop.lastName : ' ';
                commentPoint.querySelector('.comment_field-author_category').innerHTML = prop.speciality ? specialityTranslate(prop.speciality) : '-';
                commentPoint.querySelector('.comment_field-text').innerHTML = prop.text ?  prop.text : '...';
                commentPoint.querySelector('.comment_field-date_fild').innerHTML = prop.datePublication ? formatDate.f(prop.datePublication) : '..:..:..';
                proposals_container.appendChild(commentPoint);

            }

        }


        function getSelectTend(){

            var selectItems = {};

            selectItems.url_one = `http://wedding-services.mycloud.by/services/rest.tenders/${getTendCity}.json?id=${getTendId}`;
            console.dir(selectItems);

            $.ajax({ // добавление всех категорий
                url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    nameSpeciality = data;
                    satrtMainReq();
                }
            });

            function satrtMainReq(){
                $.ajax({
                    url: selectItems.url_one,
                    type: "GET",
                    dataType: "json",
                    success: function (data) {
                        $self.find('#tender-cont > div').detach();
                        console.log(selectItems.url_one);
                        console.dir(data);
                        data.length == 0 ? drawTender(FakeDataTender2) : drawTender(data);     //!!!!!1**** - Если приходит ответ - он и будет выводиться

                    }
                });
            }

        }

        getSelectTend();


        function drawTender(data){

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

            for (var i = 0; i<data.length; i++){

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
                cloneObject.offers.innerHTML = data[i].hasOwnProperty('offers')&&data[i].offers != null
                    ? data[i].offers : FakeDataTender[i].offers;

                if (data[i].hasOwnProperty('proposals')&& data[i].proposals != null && data[i].proposals.length !== 0 )
                    cloneObject.count.innerHTML =  data[i].proposals.length;
                else{
                    cloneObject.count.innerHTML = 0;
                    copy_div.querySelector(".tender_card-prop-cont").classList.add("hidden_full");
                }

                if (data[i].hasOwnProperty('required')&&data[i].required != null){
                    data[i].required.forEach( prop =>{
                        var reqPoint = cloneObject.required.cloneNode(true);
                        reqPoint.innerHTML = prop;
                        required_container.appendChild(reqPoint);
                    });
                }

                if (data[i].hasOwnProperty('proposals')&&data[i].proposals != null){
                    data[i].proposals.forEach( prop =>{
                        var commentPoint = cloneObject.comment.cloneNode(true);
                        commentPoint.querySelector('.mini-avatar').style.backgroundImage = prop.avatar ? `url('${prop.avatar}')` :  `url('${FakeDataTender[0].avatar}')`;
                        commentPoint.querySelector('.comment_field-author_name').innerHTML = prop.firstName ? prop.firstName : '.' ;
                        commentPoint.querySelector('.comment_field-author_name').innerHTML += prop.lastName ? ' '+ prop.lastName : '.';
                        commentPoint.querySelector('.comment_field-author_category').innerHTML = prop.speciality ? specialityTranslate(prop.speciality) : '-';
                        commentPoint.querySelector('.comment_field-text').innerHTML = prop.text ?  prop.text : '...';
                        commentPoint.querySelector('.comment_field-date_fild').innerHTML = prop.datePublication ? formatDate.f(prop.datePublication) : '..:..:..';
                        proposals_container.appendChild(commentPoint);
                    });
                }

                main_container.appendChild(copy_div);
            }
            console.dir(data[0]);
            console.dir(FakeDataTender[0]);
        }

        function specialityTranslate(speciality){
            Object.keys(nameSpeciality).forEach( prop =>  prop === speciality ? speciality = nameSpeciality[prop] : '');
            return speciality;
        }



    };  //---------

    return PORTAL;

})(PORTAL || {}, jQuery);