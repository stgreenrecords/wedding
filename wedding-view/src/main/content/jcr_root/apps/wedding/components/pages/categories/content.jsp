<%@page session="false" pageEncoding="utf-8"%>

<div id="categories-page-content">

    <main class="main-block">
        <div class="top-bar">
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
                    <option value="minsk">Минск</option>
                    <option value="minsk" selected>Минск</option>
                    <option value="minsk">Минск</option>
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


        </div>


        <div id="search-vip1" class="container-search-vip">
            Vrangel1
        </div>

        <div id="search-vip2" class="container-search-vip">
            Vrangel2
        </div>

        <div id="search-usually" class="container-search-usually">
            <div class="search-usually1">1</div>
            <div class="search-usually2">2</div>
            <div class="search-usually3">3</div>
            <div class="search-usually4">4</div>
            <div class="search-usually5">5</div>
            <div class="search-usually6">6</div>

        </div>





    </main>


</div>