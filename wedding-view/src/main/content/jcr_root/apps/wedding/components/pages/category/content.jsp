<%@page session="false" pageEncoding="utf-8"%>

<div id="category-page-content">

    <main class="main-block">
        <section class="top-bar">
            <div class="top-bar-menu">
                top-bar-menu

            </div>

            <div>

                <select name="partner">
                    <option value="ved">Ведущие</option>
                    <option value="photo" selected>Фотографы</option>
                    <option value="art">Артисты</option>
                </select>

                <select name="City">
                    <option value="minsk" selected disabled>Город</option>
                    <option value="minsk">Минск</option>
                    <option value="minsk">Гомель</option>
                    <option value="minsk">Гродно</option>
                </select>

                <input id="date" type="date" value="2018-06-01">

            </div>

            <div>
                <label for="ticketNum">Бютжет:</label>
                <input type="number" name="min"  placeholder="от" value="500" step="50">
                <input type="number"  placeholder="до" name="max" value="1000" step="50">


                <label for="ticketNum">Сортировать по:</label>
                <select name="sort">
                    <option value="ved">Цене</option>
                    <option value="photo" selected>Популярности</option>
                    <option value="art">Рейтингу</option>
                </select>
            </div>


        </section>


        <div id="search-pro1" class="container-search-pro">
            <div class="search-pro">
                <div class="search-pro_content">
                    <p class="search-usually_content_name">Vrangel	</p>
                    <p class="search-usually_content_hline"> ______________ </p>
                    <p class="search-usually_content_speciality">	ведущий	</p>
                    <div class="search-usually_content_stars">	****	</div>
                    <p class="pro_phone">+ 375 29 654 53 52 </p>
                    <p class="pro_vk"> 1</p>

                </div>

            </div>
        </div>

        <div id="search-pro2" class="container-search-pro">
            <div class="search-pro2">
                <div class="search-pro_content">
                    <p class="search-usually_content_name"> Lina Mid </p>
                    <p class="search-usually_content_hline"> ______________ </p>
                    <p class="search-usually_content_speciality">	агентство	</p>
                    <div class="search-usually_content_stars">	*****	</div>
                    <p class="pro_phone">+ 375 29 654 53 52 </p>
                    <p class="pro_vk"> 1</p>

                </div>

            </div>

        </div>



        <div id="search-usually-cont" class="container-search-usually">
            <div class="search-usually">
                <div class="search-usually_img">	</div>
                <div class="search-usually_content">
                    <p class="search-usually_content_name">Зеленая миля 	</p>
                    <p class="search-usually_content_hline"> ______________ </p>
                    <p class="search-usually_content_speciality">	стилист	</p>
                    <div class="search-usually_content_stars">	*****	</div>
                </div>

            </div>


            <div class="search-usually">
                <div class="search-usually_img">	</div>
                <div class="search-usually_content">
                    <p class="search-usually_content_name">	Красная заря  </p>
                    <p class="search-usually_content_hline"> ______________ </p>
                    <p class="search-usually_content_speciality">	декоратор	</p>
                    <div class="search-usually_content_stars">	*****	</div>
                </div>

            </div>


            <div class="search-usually">
                <div class="search-usually_img">	</div>
                <div class="search-usually_content">
                    <p class="search-usually_content_name">Рыжая паля	 </p>
                    <p class="search-usually_content_hline"> ______________ </p>
                    <p class="search-usually_content_speciality">	фотограф	</p>
                    <div class="search-usually_content_stars">	*****	</div>
                </div>

            </div>



        </div>





    </main>

</div>