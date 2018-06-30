var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Sales = {};

    PORTAL.modules.Sales.selfSelector = "#sales-page-content";

    PORTAL.modules.Sales.init = function ($self) {

        console.log('Component: "Sales--Events"');

        var FakeData = [
            {
                firstName:'Аврелий',
                lastName:'Сергеев',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_5.jpg',
                city:'minsk',
                cityName:'Минск',
                speciality:'rest',
                description:'Отличные скидки ', /*сегодня и весь сезон, а быть может и всю жизнь туда ее сюда*/
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531289371112',
                title:'скидки 30%',
                background: '/etc/clientlibs/wedding/pages/images/any_img/bgi_5_0.jpg'
            },
            {
                firstName:'Самсон',
                lastName:'Агафонов',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_4_0.jpg',
                city:'minsk',
                cityName:'Минск',
                speciality:'leading',
                description:'',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531399371112',
                title:'скидки 20%',
                background: '/etc/clientlibs/wedding/pages/images/any_img/bgi_5_1.jpg'
            },
            {
                firstName:'Гюльчитай',
                lastName:'Сухова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_7.jpg',
                city:'minsk',
                cityName:'Минск',
                speciality:'cars',
                description:'Отличные скидки на всю зиму',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531479371112',
                title:'Скидки 50%',
                background: '/etc/clientlibs/wedding/pages/images/any_img/bgi_8_1.jpg'
            },
            {
                firstName:'Марк',
                lastName:'Аврелий',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_8.jpg',
                city:'minsk',
                cityName:'Минск',
                speciality:'leading',
                description:'Отличные скидки на всю зиму',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531769371112',
                title:'Бонус 50% на платье',
                background: '/etc/clientlibs/wedding/pages/images/any_img/bgi_12_0.jpg'
            },
            {
                firstName:'Самсон',
                lastName:'Агафонов',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_4_0.jpg',
                city:'minsk',
                cityName:'Минск',
                speciality:'leading',
                description:'',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531399371112',
                title:'скидки 20%',
                background: '/etc/clientlibs/wedding/pages/images/any_img/bgi_1_3.jpg'
            },
            {
                firstName:'Гюльчитай',
                lastName:'Сухова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_7.jpg',
                city:'minsk',
                cityName:'Минск',
                speciality:'exclusive',
                description:'Отличные скидки на всю зиму',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531479371112',
                title:'Скидки 50%',
                background: '/etc/clientlibs/wedding/pages/images/any_img/bgi_16_0.jpg'
            },
            {
                firstName:'Гюльчитай',
                lastName:'Сухова',
                avatar:'/etc/clientlibs/wedding/pages/images/any_img/bgi_1_7.jpg',
                city:'minsk',
                cityName:'Минск',
                speciality:'exclusive',
                description:'Отличные скидки на всю зиму',
                endDate:'1551289371112',
                id:"f888d202-d2ee-4d30-8de8-1dcd839f4189",
                resourcePath:"/home/users/wedding/partners/rest/minsk/ae/uQ3Wtg-Gmbv_9I6q8C1B2/events/50263a88-e97a-43c6-95ef-c2bb7ef97c76",
                resourceType:'FakeData',
                startDate:'1531479371112',
                title:'Скидки 50%',
                background: '/etc/clientlibs/wedding/pages/images/profil_partner/common_profil/bgi.jpg'
            }


        ];


        /**-*-*-*-*-*-**-*-*-*-*-*-*-*-*-*-*-*=-*=-*=-*=-*=-*=-*=-=*--*--=*--=*--*=-*-=--*=--=*--=*--*=--*=--=*--*=--=*--*=--*=-*--=*--*=--*=*/

        var $categ_select = $self.find('#tender_categories_select');
        var $city_select = $self.find('#city_select');
        var $dateField =  $self.find('#date-filtr');
        var nameSpeciality = {};
        var dataData = {};
        var container =  document.querySelector(".event-wrapper");
        var selectItems = {};
        $categ_select.on('change', getEvents);
        $city_select.on('change', getEvents);
        $dateField.on('change', filtrCateg);

        $.ajax({ // добавление всех категорий в селект

            url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
            type: "GET",
            dataType: "json",
            success: function (allCategories) {

                $categ_select.find('#photo_select').detach();
                console.dir(allCategories);
                nameSpeciality = allCategories;

                for (var prop in allCategories){

                    if(prop !== 'rest')
                        $categ_select.append(`<option value="${prop}">${allCategories[prop]}</option>`);
                    else
                        $categ_select.append(`<option value="${prop}" selected>${allCategories[prop]}</option>`);
                }

                $categ_select.prepend(`<option value="all_categories" selected> Показать все </option>`); //  TODO Убрать, когда начнуть приходить ответы

                getEvents();

            },
            error: function (e) {
                console.log(e);
            }

        });

        function filtrCateg(){
            console.log($categ_select.val());
            console.log($city_select.val());
            container.innerHTML = '';
            drawEvent(dataData);
        }

        function getEvents(){

            selectItems.$cat_val = $categ_select.val();
            selectItems.$city_val = $city_select.val();
            selectItems.$city_name =  $city_select.find("option:selected").text(); //  TODO Убрать, когда города начнуть приходить в ресте //   может и так работать )()
            selectItems.url = `http://wedding-services.mycloud.by/services/rest.events/${selectItems.$cat_val}/${selectItems.$city_val}.json`;   //

            $.ajax({
                url: selectItems.url,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(selectItems.url);
                    console.dir(data);
                    container.innerHTML = '';
                    data.length == 0 ? dataData = FakeData : dataData = data ;
                    data.length == 0 ? drawEvent(FakeData, selectItems.$city_val) : drawEvent(data, selectItems.$city_val);
                },
                error: function (e) {
                    console.log('Error from ajax');
                    console.log(e);
                }
            });

        }

        function drawEvent(dataAll) {

            var $cat_val = $categ_select.val();
            var data;
            var dateFiltr = +new Date($dateField.val());
            // var accuracy = 1200000000;
            var acc = 120000000;
            $self.find('.no_event-text').remove();
            var wrapper = $self.find('.event-wrapper');
            var eventCard = $self.find('.event_card-sample');
            var listWrapper = $(document.createElement('div')); // document.add('div');

            dateFiltr ? data = dataAll.filter(item => {return  item.endDate+acc >= dateFiltr && dateFiltr >= item.startDate-acc })  : data = dataAll ;  /* Math.round(item.endDate/accuracy) > Math.round(dateFiltr/accuracy) >*/
            $categ_select.val() !== 'all_categories' ? data = data.filter( item => { return item.speciality == $cat_val}) : data ;
            data.length === 0 ? wrapper.innerHTML = '<p class="alert-null"> Для успешного поиска измените параметры поиска </p>' : '';

            data.forEach(function(elem, i){

                var newItem = eventCard.clone().removeClass('event_card-sample');

                elem.avatar ? newItem.find('.mini-avatar').css('backgroundImage',`url('${elem.avatar}')`) : '';
                elem.firstName ? newItem.find('.tender_card-author_name').html(elem.firstName) : '';
                elem.lastName ? newItem.find('.tender_card-author_name').html(newItem.find('.tender_card-author_name').html()+' '+elem.lastName) : '';

                elem.speciality ? newItem.find('.card-speciality').html(specialityTranslate(elem.speciality)) : '';

                elem.title ? newItem.find('.event_card-title').html(elem.title.substr(0, 12)): '';
                elem.background ? newItem.find('.event_card-bg').css('backgroundImage', `url("${elem.background}")`)
                    : newItem.find('.event_card-bg').css('backgroundImage', 'url("/etc/clientlibs/wedding/pages/images/profil_partner/common_profil/bgi.jpg")');
                elem.startDate ? newItem.find('.event_card-start').text(formatDate.f(elem.startDate)) : '';
                elem.endDate ? newItem.find('.event_card-finish').text(formatDate.f(elem.endDate)) : '';
                elem.description ? newItem.find('.event_card-description_text').text(elem.description.substr(0, 30)) : '';
                elem.id ? newItem.find('.event_card-href').attr('href',`/content/wedding/sales/sale.html?${elem.id}#${elem.speciality}&${selectItems.$city_val}`) : '';
                listWrapper.append(newItem);

            });

            wrapper.append(listWrapper);

        }

        function specialityTranslate(speciality){
            Object.keys(nameSpeciality).forEach( prop =>  prop === speciality ? speciality = nameSpeciality[prop] : '');
            return speciality;
        }



    };    //---- finish portal

    return PORTAL;

})(PORTAL || {}, jQuery);