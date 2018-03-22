<%@page session="false" pageEncoding="utf-8"%>
<%@ taglib prefix="cpn" uri="http://sling.composum.com/cpnl/1.0" %>

<h2 class="foot--title"> <a href=""> Твоя Свадьба </a> </h2>

<div class="phone-div"> <a href="tel:+375445560667"> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/mts.png" alt="МТС"> + 375 44 5560 667 </a> </div>
<div class="phone-div"> <a href="tel:+375447560967"> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/velcom.png" alt="Велком">  + 375 44 7560 967 </a> </div>
<div class="mail-div"> <a href="mailto:info@tvoyasvadba.by"> info@tvoyasvadba.by </a> </div>
<div class="footer-line-div">	_____________________________	</div>
<div class="social-btn-block"> <a href=" "> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/vk.png" alt="Вконтакте"> </a> <a href=" "> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/facebook.png" alt="ВФейсбуке"> </a> <a href=" "> <img src="/etc/clientlibs/wedding/pages/images/landing_parthner/Desktop/Computer_Assets/Main_Page_Social_Media_Icons_operators/insta.png" alt="ВИнстаграме"> </a> </div>

<section id="entrance-form">

	<div class="mwindow window-entrance">

		<div class="container-window-entrance">

			<h2 class="title-inter" >ВХОД</h2>
			<div class="social-inter">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/vk.png" alt="VK">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/facebook.png" alt="F">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/g+.png" alt="G+">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/ok.png" alt="OK">
			</div>

			<p class="mwindow-or"> или </p>

			<form action="" method="post">
				<p><input class="inp-user-email" type="email" name="user-email" placeholder="Введите email">  </p>
				<p><input class="inp-user-password" type="password" name="user-email" placeholder="Введите пароль">  </p>

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
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/vk.png" alt="VK">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/facebook.png" alt="F">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/g+.png" alt="G+">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/ok.png" alt="OK">
			</div>

			<p class="mwindow-or"> или </p>

			<form action="" method="post">

				<p><input class="inp-user-name" type="text" name="user-name" placeholder="Имя / Название компании">  </p>
				<p><input class="inp-user-surname" type="text" name="user-surname" placeholder="Фамилия">  </p>
				<p><input class="inp-user-email" type="email" name="user-email" placeholder="Введите email">  </p>
				<p><input class="inp-user-password" type="password" name="user-password" placeholder="Введите пароль">  </p>
				<p><input class="inp-user-password-repeat" type="password" name="user-password-repeat" placeholder="Подтвердите пароль">  </p>

				<div class="have-account">

					<span> У Вас уже есть аккаунт? </span> <span>   </span> <span class="have-account-entrance"> Войти </span>

				</div>

			</form>

			<div>
				<button id="registration-futher" class="btn-enter"> <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/further.png" alt="ДАЛЕЕ">  </button>
			</div>

		</div>

	</div>

	<div class="mwindow window-registation-step2">

		<div class="container-window-registation-step2">

			<h2 class="title-inter2">В качестве кого вы хотите зарегистрироваться ?</h2>

			<span> Клиента </span>
			<input id="cheked_user" class="inp" name="selected-role" type="radio" >
			<p class="mwindow-or"> или </p>
			<input id="cheked_partner" class="inp" name="selected-role" type="radio" >
			<span> Партнера </span>

			<div><button  id="registration-futher2" class="btn-enter-2"> <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/further.png" alt="ДАЛЕЕ">  </button> </div>

		</div>

	</div>

	<div class="mwindow window-registation-step3-user">

		<div class="container-window-registation-step3-user">

			<h2 class="title-inter2">ЗАВЕРШЕНИЕ РЕГИСТРАЦИИ - (НЕТ В ДИЗАЙНЕ!!!)</h2>

			<form action="" method="post">

				<p><input class="inp-user-name" type="text" name="user-name" placeholder="Город, Страна? (может разбить?)">  </p>
				<p><input class="inp-user-surname" type="text" name="user-surname" placeholder="Номер телефона">  </p>
				<p><input class="inp-user-email" type="email" name="user-email" placeholder="email">  </p>

				<p class="mwindow-or">
				<p> Дополнительная информация </p>
				<p class="dop-info2" > (можете заполнить сейчас или позднее) </p>
				</p>

				<p><input class="inp-user-name" type="text" name="user-name" placeholder="ВКонтакте">  </p>
				<p><input class="inp-user-surname" type="text" name="user-surname" placeholder="Фейсбук">  </p>
				<p><input class="inp-user-email" type="text" name="user-email" placeholder="Одноклассники">  </p>
				<p><input class="inp-user-password" type="text" name="user-password" placeholder="Гугл+ ?(его нет в дизайне) ">  </p>

				<div class="consent-user-div">

					<input type="checkbox" id="consent-partner-check" class="consent-check" name="consent" value="consent-user">
					<span>  Я принимаю </span>
					<span class="consent-working"> Условия сотрудничества </span>

				</div>

				<div>

					<button  id="registration-finish-user" class="btn-enter" type="submit"> <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/registration.png" alt="ЗАРЕГИСТРИРОВАТЬСЯ">  </button>

				</div>
			</form>

		</div>

	</div>

	<div class="mwindow window-registation-step3-partner">

		<div class="container-window-registation-step3-partner">

			<h2 class="title-inter2">ЗАВЕРШЕНИЕ РЕГИСТРАЦИИ</h2>

			<form action="" method="post">

				<select name="City">
					<option value="work-sphere" selected disabled>Сфера деятельности</option>
					<option value="photo">Фотограф</option>
					<option value="aminer">Ведущий</option>
					<option value="style">Стилист</option>
				</select>



				<p><input class="inp-user-name" type="text" name="user-name" placeholder="Город, Страна? (может разбить?)">  </p>
				<p><input class="inp-user-surname" type="text" name="user-surname" placeholder="Номер телефона">  </p>
				<p><input class="inp-user-email" type="email" name="user-email" placeholder="email">  </p>

				<p class="mwindow-or">
				<p> Дополнительная информация </p>
				<p class="dop-info2" > (можете заполнить сейчас или позднее) </p>
				</p>

				<p><input class="inp-user-name" type="text" name="user-name" placeholder="ВКонтакте">  </p>
				<p><input class="inp-user-surname" type="text" name="user-surname" placeholder="Фейсбук">  </p>
				<p><input class="inp-user-email" type="text" name="user-email" placeholder="Одноклассники">  </p>
				<p><input class="inp-user-password" type="text" name="user-password" placeholder="Гугл+ ?(его нет в дизайне) ">  </p>
				<p><input class="inp-user-password-repeat" type="text" name="user-password-repeat" placeholder="Сайт">  </p>


				<div class="consent-user-div">

					<input type="checkbox" id="consent-user-check" class="consent-check" name="consent" value="consent-user">
					<span>  Я принимаю </span>
					<span class="consent-working"> Условия сотрудничества </span>

				</div>


			</form>

			<div>
				<button id="registration-finish-partner" class="btn-enter" type="submit"> <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/registration.png" alt="ЗАРЕГИСТРИРОВАТЬСЯ">  </button>
			</div>

		</div>

	</div>

</section>





<cpn:clientlib type="js" path="/etc/clientlibs/wedding/external" />
<cpn:clientlib type="js" path="/etc/clientlibs/wedding/pages" />

 

	 
