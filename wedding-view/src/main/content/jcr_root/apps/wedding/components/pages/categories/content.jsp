<%@page session="false" pageEncoding="utf-8"%>

<div id="categories-page-content">

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







    </main>


</div>