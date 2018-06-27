var PORTAL = (function (PORTAL, $) {

    PORTAL.modules.Settings = {};

    PORTAL.modules.Settings.selfSelector = "#settings-page-content";

    PORTAL.modules.Settings.init = function ($self) {

        console.log('Component: "Settings"');

        var FakeDataSettings = [      // Data - фэйко-заменяющая приходящие косяки
            {
                firstName: 'Лараэль',
                lastName: 'Cеменова',
                email: 'funny@gmail.com',
                resourceType: 'FakeData',
                id: 'f888d202-d2ee-4d30-8de8-1dcd839f4189',
                city: 'gomel',
                newMail: true,
                newAnswer: false,

                newComment: true,
                speciality: 'flowers'
            }
        ];

//*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*--*-*-*-*-*-*-*-*-*-**-*-*-*

        var formSettings = $self.find('#form-settings-page');
        var formNotif = $self.find('#settings-notification');
        var nameField = $self.find('#settings-firstName');
        var nameLastField = $self.find('#settings-lastName');
        var emailField =	$self.find('#settings-email');
        var passwordField = $self.find('#settings-password');
        var newPasswField = $self.find('#settings-password-new');
        var passwRepField = $self.find('#settings-password-repeat');
        var cityField = $self.find('#city_settings');
        var newEmailField = $self.find('#new-mail');
        var newAnswerField = $self.find('#new-answer');
        var eForNotif = $self.find('#email-for_notif');

        var specialityField;
        var newCommentField;
        var dataData = {};
        var userType = Cookies.get('userType');

        $.ajax({ // получение настроек

            url: `/services/rest.getSettings.json?id=${Cookies.get('userId')}`,
            type: 'POST',
            dataType: "json",
            success: function (data) {

                data && data.length ? fillSettings(data) : fillSettings(FakeDataSettings);

            },
            error: function (e) {
                console.log(e);
                fillSettings(FakeDataSettings);   // TODO удалить когда создадут запросы.
            }

        });


        function fillSettings(data){

            nameField.val(data[0].firstName);
            nameLastField.val(data[0].lastName);
            emailField.val(data[0].email);
            cityField.val(data[0].city);

            data[0].newMail && data[0].newMail == true ? newEmailField.attr('checked', true) : '';
            data[0].newAnswer && data[0].newAnswer == true ? newAnswerField.attr('checked', true) : '';
            eForNotif.val(data[0].email);

            if (userType =='partner'){
                createPartnerFields(data[0].speciality ? data[0].speciality : 'rest');
                specialityField = $self.find('.speciality_setting');
                $self.find('.new-answer-label').html('Новые комментарии на страницах акций');
                $self.find('.line-new-answer').after(`<div class="check-line">			 	
											 			<input type="checkbox" id="new-comment" value="comment"  >
											 			<label for="new-comment"> Новый отзыв на Вашей странице</label>
												 	</div>`);
                newCommentField = $self.find('#new-comment');
                data[0].newComment && data[0].newComment == true ? newCommentField.attr('checked', true) : '';
            }
            else if(userType !=='user'){
                alert ('Войдите или зарегестрируйтесь');
                document.location.href = `/content/wedding/catalog.html`;
            }

        }





        function createPartnerFields(spec){

            // formSettings.append(' ');

            $.ajax({ // добавление всех категорий в селект

                url: "http://wedding-services.mycloud.by/services/rest.catalog-categories/home/users/wedding/partners.json",
                type: "GET",
                dataType: "json",
                success: function (allCategories) {

                    var sel = $(document.createElement('select'));
                    sel.addClass('speciality_setting');
                    console.dir(allCategories);

                    // nameSpeciality = allCategories;
                    // Object.keys(allCategories)

                    for (var prop in allCategories){
                        // if(prop !== 'rest')
                        if(spec !== prop)
                            sel.append(`<option value="${prop}">${allCategories[prop]}</option>`);
                        else
                            sel.append(`<option value="${prop}" selected>${allCategories[prop]}</option>`);
                    }

                    formSettings.append(sel);

                    // getFirstTend();

                },
                error: function (e) {
                    console.log(e);
                }

            });

        }



        $self.find('.button_save-settings').on('click', saveSettings);


        $self.find('#remove-account').on('click', ()=>{
            var remove_acc = confirm("Вы действительно хотите удалить свою страницу? Это действие необратимо!");
            if (remove_acc){
                $.ajax({

                    url: `/services/rest.removeAccount.json?id=${Cookies.get('userId')}`,
                    type: 'POST',
                    dataType: "json",
                    success: function (data) {
                        alert('Ваш аккаунт успешно удален!');
                        document.location.href = '/content/wedding/catalog.html';
                    },
                    error: function (e) {
                        alert('Не получилость удалить аккаунт - обратитесь в техподдержку!');
                    }

                });
            }
        });


        function saveSettings(){

            $.ajax({

                url: `/services/rest.setSettings.json?id=${Cookies.get('userId')}`,
                type: 'POST',
                dataType: "json",
                success: function (data) {
                    alert('Данные успешно сохранены');
                },
                error: function (e) {
                    console.log(e);
                    alert('Данные не удалось сохранить');
                }

            });

        }



        (function(){  //  функции переключения страниц
            var user_calc  = $self.find('#settings-common');
            var user_tend  = $self.find('#settings-notification');
            var calc_btn =  $self.find('#btn_settings-common');
            var tend_btn = $self.find('#btn_settings-notif');

            calc_btn.on('click', openPageAllSett);
            tend_btn.on('click', openPageNotificationSett);

            function openPageAllSett(event){
                user_tend.addClass('hidden_full');
                user_calc.removeClass('hidden_full');
                tend_btn.removeClass('user_menu_btn_active');
                calc_btn.addClass('user_menu_btn_active');
            }

            function openPageNotificationSett(event){
                user_calc.addClass('hidden_full');
                user_tend.removeClass('hidden_full');
                calc_btn.removeClass('user_menu_btn_active');
                tend_btn.addClass('user_menu_btn_active');
            }
        }());

    };  //----

    return PORTAL;

})(PORTAL || {}, jQuery);