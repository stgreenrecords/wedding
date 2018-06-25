<%@page session="false" pageEncoding="utf-8"%>
<%@ taglib prefix="cpn" uri="http://sling.composum.com/cpnl/1.0" %>

<h2 class="foot--title"> <a href=""> Твоя Свадьба </a> </h2>

<div class="phone-div"> <a href="tel:+375445560667"> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/mts.png" alt="МТС"> + 375 44 5560 667 </a> </div>
<div class="phone-div"> <a href="tel:+375447560967"> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/velcom.png" alt="Велком">  + 375 44 7560 967 </a> </div>
<div class="mail-div"> <a href="mailto:info@tvoyasvadba.by"> info@tvoyasvadba.by </a> </div>
<div class="footer-line-div">	_____________________________	</div>
<div class="social-btn-block"> <a href=" "> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/vk.png" alt="Вконтакте"> </a> <a href=" "> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/facebook.png" alt="ВФейсбуке"> </a> <a href=" "> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/insta.png" alt="ВИнстаграме"> </a> </div>

<div class="btn-up"> <a href="#"> <img src="/etc/clientlibs/wedding/pages/images/on_all_pages/btn_up.png"> </a> </div>

<section id="cabinet-input-block" >

    <div id="vk_api_transport"></div>

    <div class="cabinet-input">

        <div id="cabinet_login">
            <span id="entrance-cabinet-btn"> Вход </span>
            <span class="vert-line">&#124;</span>
            <span id="registration-btn"> Регистрация </span>
        </div>

        <div id="cabinet_success">

            <div class="for-mail-icon">
                <img src="/etc/clientlibs/wedding/pages/images/on_all_pages/header/messages_icon.png" alt="mail_icon">
            </div>
            <div class="mail-count"> Сообщения (12) </div>
            <div class="mini-avatar"> </div>
            <div class="mini-menu">
                <img src="/etc/clientlibs/wedding/pages/images/on_all_pages/header/drop_arrow_menu.png" alt="drop-down">
                <ul class="mini-menu-drop hidden_cl">
                    <li id="mini-menu_my-page"><a href="/content/wedding/user.html"> Моя страница</a>  </li>
                    <li id="mini-menu_options"><a href="/content/wedding/settings.html"> Настройки </a> </li>
                    <li id="mini-menu_exit"> Выход </li>
                </ul>
            </div>

        </div>

    </div>

    <div id="entrance-form">

        <div class="mwindow window-entrance">

            <div class="container-window-entrance">

                <h2 class="title-inter" >ВХОД</h2>
                <div class="social-inter">
                    <img id="vk-login-btn" src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/vk.png" alt="VK">
                    <img id="fb-login-btn" src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/facebook.png" alt="F">
                    <img id="gmail-login-btn" src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/g+.png" alt="G+">
                    <img id="ok-login-btn" src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/ok.png" alt="OK">
                </div>

                <p class="mwindow-or"> или </p>

                <form action="" method="post">
                    <p><input id="user_email"  type="email" name="user-email" placeholder="Введите email">  </p>
                    <p><input   type="password" name="user-password" placeholder="Введите пароль">  </p>

                    <div class="remember-forget">

                                <span>
                                    <span>Запомнить</span>
                                    <input type="checkbox" id="remember-ident" class="consent-check" name="remember-ident" value="remember-ident-user">
                                </span>

                        <a class="forget-password" href="#">Забыли пароль?</a> <!-- Тут куда? -->

                    </div>

                </form>

                <div>
                    <button id="btn-entrance-form" class="btn-enter" > <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/enter_button.png" alt="ВХОД">  </button>
                </div>

            </div>

        </div>

        <div class="mwindow window-registation">

            <div class="container-window-registation">

                <h2 class="title-inter">РЕГИСТРАЦИЯ</h2>
                <div class="social-inter">
                    <img id="vk-reg-btn" src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/vk.png" alt="VK">
                    <img id="fb-reg-btn" src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/facebook.png" alt="F">
                    <img id="gmail-reg-btn" src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/g+.png" alt="G+">
                    <img id="ok-reg-btn" src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/ok.png" alt="OK">
                </div>

                <p class="mwindow-or"> или </p>

                <form id="form-reg-step1" action="" method="post">

                    <p><input id="registration-firstName" class="inp-user-name" type="text" name="user-name" placeholder="Имя / Название компании" value="Funny">  </p>
                    <p><input id="registration-lastName" class="inp-user-surname" type="text" name="user-surname" placeholder="Фамилия" value="People">  </p>
                    <p><input id="registration-email" class="inp-user-email" type="email" name="user-email" placeholder="Введите email" value="funny@gmail.com">  </p>
                    <p><input id="registration-password" class="inp-user-password" type="password" name="user-password" placeholder="Введите пароль" value="Ss123asdf" title="Пароль должен содержать более 8 символов строчных и заглавных букв и min 1 цифру ">  </p>
                    <p><input id="registration-password-repeat" class="inp-user-password-repeat" type="password" name="user-password-repeat" placeholder="Подтвердите пароль" value="Ss123asdf">  </p>

                    <div class="have-account">

                        <span> У Вас уже есть аккаунт? </span> <span>   </span> <span class="have-account-entrance"> Войти </span>

                    </div>

                </form>

                <div>
                    <button id="btn-registration-futher" class="btn-enter"> <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/further.png" alt="ДАЛЕЕ">  </button>
                </div>

            </div>

        </div>

        <div class="mwindow window-registation-step2">

            <div class="container-window-registation-step2">

                <h2 class="title-inter2">В качестве кого вы хотите зарегистрироваться ?</h2>

                <span title="У вас скоро свадьба. Вам нужны профессионалы"> Клиента </span>
                <input id="cheked_user" class="inp" name="selected-role" type="radio" value="cheked_us" title="У вас скоро свадьба. Вам нужны профессионалы" checked >
                <p class="mwindow-or"> или </p>
                <input id="cheked_partner" class="inp" name="selected-role" type="radio" title="Вы работаете или хотите начать работу в свадебном бизнесе" value="cheked_part"  >
                <span title="Вы работаете или хотите начать работу в свадебном бизнесе"> Партнера </span>

                <div><button  id="btn-registration-futher2" class="btn-enter-2"> <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/further.png" alt="ДАЛЕЕ">  </button> </div>

            </div>

        </div>

        <div class="mwindow window-registation-step3-user">

            <div class="container-window-registation-step3-user">

                <h2 class="title-inter2">ЗАВЕРШЕНИЕ РЕГИСТРАЦИИ</h2>  <!-- ЮЗЕРА -->

                <form id="form-reg-step3-user" action="" method="post">

                    <!-- 	<p><input id="city_finish-user" type="text" name="city" placeholder="Город"  value="Менск">  </p> -->

                    <select id="city_finish-user" name="city_finish-user">
                        <option value="minsk" selected>Минск</option>
                        <option value="brest">Брест</option>
                        <option value="vitebsk">Витебск</option>
                        <option value="gomel">Гомель</option>
                        <option value="grodno">Гродно</option>
                        <option value="mogilev">Могилев</option>
                    </select>

                    <p><input id="tel_finish-user" type="tel" name="tel" placeholder="Номер телефона" value="+375(29)3222232">  </p>
                    <p><input id="email_finish-user" type="email" name="user-email" placeholder="email" disabled>  </p>

                    <p class="mwindow-or">
                    <p> Дополнительная информация </p>
                    <p class="dop-info2" > (можете заполнить сейчас или позднее) </p>
                    </p>

                    <p><input id="vk_finish-user" type="text" name="user-name" placeholder="ВКонтакте" value="vk">  </p>
                    <p><input id="fb_finish-user" type="text" name="user-surname" placeholder="Фейсбук" value="fb">  </p>
                    <p><input id="ok_finish-user" type="text" name="user-email" placeholder="Одноклассники" value="ok">  </p>
                    <!-- 	<p><input id="googl_finish-user" type="text" name="user-password" placeholder="Гугл+ ?(его нет в дизайне)" value="g+">  </p> -->

                    <div class="consent-user-div">

                        <input type="checkbox" id="consent-user-check" class="consent-check" name="consent-us" value="consent-user" checked>
                        <span>  Я принимаю </span>
                        <span class="consent-working"> Условия сотрудничества </span>

                    </div>

                </form>

                <div class="registation3_errore_message"></div>

                <div>
                    <button  id="btn-registration-finish-user" class="btn-enter" type="submit"> <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/registration.png" alt="ЗАРЕГИСТРИРОВАТЬСЯ"></button>
                </div>

            </div>

        </div>

        <div class="mwindow window-registation-step3-partner">

            <div class="container-window-registation-step3-partner">

                <h2 class="title-inter2">ЗАВЕРШЕНИЕ РЕГИСТРАЦИИ</h2>  <!-- ПАРТНЕРА -->

                <form id="form-reg-step3-partner" action="" method="post">

                    <select id="work-sphere" name="work-sphere">
                        <option value="title"  disabled>Сфера деятельности</option>
                        <!-- <option value="photo">Фотограф</option>
                        <option value="aminer">Ведущий</option>
                        <option value="style" selected>Стилист</option> -->
                    </select>

                    <!-- <p><input id="city_finish-partner"  type="text" name="user-name" placeholder="Город, Страна? (может разбить?)" value="Менск">  </p> -->
                    <select id="city_finish-partner" name="city_finish-user">
                        <option value="minsk" selected>Минск</option>
                        <option value="brest">Брест</option>
                        <option value="vitebsk">Витебск</option>
                        <option value="gomel">Гомель</option>
                        <option value="grodno">Гродно</option>
                        <option value="mogilev">Могилев</option>
                    </select>
                    <p><input id="tel_finish-partner" type="tel" name="user-surname" placeholder="Номер телефона" value="+375(29)3222232">  </p>
                    <p><input id="email_finish-patner"  type="email" name="user-email" placeholder="email" disabled>  </p>

                    <p class="mwindow-or">
                    <p> Дополнительная информация </p>
                    <p class="dop-info2" > (можете заполнить сейчас или позднее) </p>
                    </p>

                    <p><input id="vk_finish-partner" type="text" name="user-name" placeholder="ВКонтакте">  </p>
                    <p><input id="fb_finish-partner" type="text" name="user-surname" placeholder="Фейсбук">  </p>
                    <p><input id="ok_finish-partner" type="text" name="user-email" placeholder="Одноклассники">  </p>
                    <!-- 	<p><input id="googl_finish-partner" type="text" name="user-password" placeholder="Гугл+ ?(его нет в дизайне) ">  </p> -->
                    <p><input id="site_finish-partner" type="text" name="user-password-repeat" placeholder="Сайт">  </p>

                    <div class="consent-user-div">

                        <input type="checkbox" id="consent-partner-check" class="consent-check" name="consent-part" value="consent-partner" checked>
                        <span>  Я принимаю </span>
                        <span class="consent-working"> Условия сотрудничества </span>

                    </div>

                </form>

                <div class="registation3_errore_message"></div>

                <div>
                    <button id="btn-registration-finish-partner" class="btn-enter" type="submit"> <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/registration.png" alt="ЗАРЕГИСТРИРОВАТЬСЯ">  </button>
                </div>

            </div>

        </div>

        <div id="popup_alert-admin" class="popup_alert">
            <span class="popup_alert-text">  Ваш аккаунт не зарегестрирован. Обратитесь пожалуйста к администраторам.</span>
        </div>

    </div>



</section>



<script src="/etc/clientlibs/wedding/external/js/jquery/jquery-3.3.1.js"></script>

<cpn:clientlib type="js" path="/etc/clientlibs/wedding/external" />
<cpn:clientlib type="js" path="/etc/clientlibs/wedding/pages" />

 

	 
