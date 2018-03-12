<%@page session="false" pageEncoding="utf-8"%>
<%@ taglib prefix="cpn" uri="http://sling.composum.com/cpnl/1.0" %>

<h2 class="foot--title"> <a href=""> Твоя Свадьба </a> </h2>

<div class="phone-div"><!--  <img src="" alt="0"> --> <a href="tel:+375445560667"> + 375 44 5560 667 </a> </div>
<div class="phone-div"> <!-- <img src="" alt="V"> --> <a href="tel:+375447560967"> + 375 44 7560 967 </a> </div>
<div class="mail-div" >   <a href="mailto:info@tvoyasvadba.by"> info@tvoyasvadba.by </a> </div>
<div class="line-div">	_____________________________	</div>
<div class="social-btn-block"> VK F @ </div>




<section id="entrance-form">
	<div class="mwindow window-entrance">

		<div class="container-window-entrance">

			<h2 class="title-inter" >ВХОД</h2>
			<div class="social-inter">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/vk.png" alt="VK">	<%--check it--%>
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/facebook.png" alt="F">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/g+.png" alt="G+">
				<img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/ok.png" alt="OK">
			</div>

			<p> или </p>

			<form action="" method="post">
				<p><input class="inp-user-email" type="email" name="user-email" placeholder="Введите email">  </p>
				<p><input class="inp-user-password" type="password" name="user-email" placeholder="Введите пароль">  </p>

				<div class="remember-forget">

					<span><label for="remember-ident">Запомнить</label>
						<input type="checkbox" id="remember-ident" name="remember-ident" value="remember-ident-user">  </span>

					<a class="forget-password" href="#">Забыли пароль?</a>

				</div>

				<div>
					<button class="btn-enter" type="submit"> <img src="/etc/clientlibs/wedding/pages/images/social_media_icons_buttons/enter_button.png" alt="ВХОД">  </button>
				</div>
			</form>

		</div>
	</div>
</section>





<cpn:clientlib type="js" path="/etc/clientlibs/wedding/external" />
<cpn:clientlib type="js" path="/etc/clientlibs/wedding/pages" />

 

	 
