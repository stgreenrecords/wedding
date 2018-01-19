package wedding.core.servlets;

import jdk.nashorn.internal.ir.annotations.Reference;
import org.apache.felix.scr.annotations.sling.SlingServlet;
import org.apache.jackrabbit.api.security.user.User;
import org.apache.jackrabbit.api.security.user.UserManager;
import org.apache.jackrabbit.rmi.value.SerialValueFactory;
import org.apache.jackrabbit.value.ValueFactoryImpl;
import org.apache.sling.api.SlingHttpServletRequest;
import org.apache.sling.api.SlingHttpServletResponse;
import org.apache.sling.api.resource.ResourceResolver;
import org.apache.sling.api.servlets.SlingSafeMethodsServlet;
import org.apache.sling.jackrabbit.usermanager.CreateUser;
import org.apache.sling.jcr.base.util.AccessControlUtil;

import javax.jcr.RepositoryException;
import javax.jcr.Session;
import javax.jcr.Value;
import javax.servlet.Servlet;
import javax.servlet.ServletException;
import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;
import java.util.*;
import java.util.stream.Stream;

import static wedding.core.rest.site.RestFieldCore.PARTNER_USERS_ROOT_PATH;

@SlingServlet(paths = {"/services/usergeneration"})
public class UserGenerationServlet extends SlingSafeMethodsServlet{

    @Reference
    private CreateUser createUser;

    @Override
    protected void doGet(SlingHttpServletRequest request, SlingHttpServletResponse response) throws ServletException, IOException {
        ResourceResolver resourceResolver = request.getResourceResolver();
        Session session = resourceResolver.adaptTo(Session.class);
        UserManager userManager = Optional.ofNullable(session)
        .map(s -> {
            try {
                return AccessControlUtil.getUserManager(s);
            } catch (RepositoryException e) {
                e.printStackTrace();
            }
            return null;
        }).orElse(null);
        Stream.iterate(BigInteger.ZERO, n -> n.add(BigInteger.ONE)).limit(1000)
        .forEach(i -> {
            String name = UUID.randomUUID().toString();
            try {
                boolean isPartner = Math.random() < 0.5;
                User user;
                if (isPartner){
                    user = Objects.requireNonNull(userManager).createUser(name,"123",() -> name,"/home/users/wedding/partners/photographers/" + CITIES.getCity());
                } else {
                    user = Objects.requireNonNull(userManager).createUser(name,"123",() -> name,"/home/users/wedding/users/" + CITIES.getCity());
                }

                user.setProperty("authType",ValueFactoryImpl.getInstance().createValue(AUTH_TYPES.getAuthType().name()));
                user.setProperty("userId",ValueFactoryImpl.getInstance().createValue(name));
                user.setProperty("firstName",ValueFactoryImpl.getInstance().createValue(NAMES.getName().name()));
                user.setProperty("lastName",ValueFactoryImpl.getInstance().createValue(SECOND_NAME.getName().name()));
                user.setProperty("phone",ValueFactoryImpl.getInstance().createValue("+37529"+ (int)(Math.random()*1000000 +1000000)));
                user.setProperty("email",ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()+"@gmail.com"));
                user.setProperty("vkLink",ValueFactoryImpl.getInstance().createValue("http://vk.com/"+UUID.randomUUID().toString()));
                user.setProperty("facebookLink",ValueFactoryImpl.getInstance().createValue("http://facebook.com/"+UUID.randomUUID().toString()));
                user.setProperty("instagramLink",ValueFactoryImpl.getInstance().createValue("http://instagram.com/"+UUID.randomUUID().toString()));


                if (isPartner){
                    user.setProperty("type",ValueFactoryImpl.getInstance().createValue("partner"));
                    int priceStart = (int)(Math.random()*1000);
                    user.setProperty("priceStart",ValueFactoryImpl.getInstance().createValue(priceStart));
                    user.setProperty("priceEnd",ValueFactoryImpl.getInstance().createValue(priceStart + (int)(Math.random()*200)));
                    user.setProperty("vipStatus",ValueFactoryImpl.getInstance().createValue(Math.random() < 0.5));
                    user.setProperty("bookedDates", SerialValueFactory.makeSerialValueArray(new Value[]
                            {
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),                                ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1)),
                                    ValueFactoryImpl.getInstance().createValue(new GregorianCalendar(2018, Math.round((float)Math.random()*11)+1, Math.round((float)Math.random()*27)+1))
                            }));

                } else {
                    user.setProperty("type",ValueFactoryImpl.getInstance().createValue("user"));
                    if ((int)(Math.random()*10) == 9){
                        user.setProperty("./tenders/tender/tenderId", ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()));
                        user.setProperty("./tenders/tender/photoUrl", ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()));
                        user.setProperty("./tenders/tender/datePublication", ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()));
                        user.setProperty("./tenders/tender/deadline", ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()));
                        user.setProperty("./tenders/tender/shortText", ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()));
                        user.setProperty("./tenders/tender/required", ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()));
                        user.setProperty("./tenders/tender/offers", ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()));
                        user.setProperty("./tenders/tender/city", ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()));
                        user.setProperty("./tenders/tender/moneyLimit", ValueFactoryImpl.getInstance().createValue(UUID.randomUUID().toString()));

                    }
                }




/*                “tenderId”:”sometenderId”,
”photoUrl”:”/content/photo.jpg”,
”firstName”:”Vasya”,
”secondName”:”Xryshkin”,
”datePublication”:”27-12-1999”,
“deadline”:”28-12-2012”,
“shortText”:”Description”,
” required”:[”Видеографы”, “Фотографы”],
”offers”:”12”,
“city”:”Minsk”,
“moneyLimit”:”100”},
            {…next tender…}]}*/










    } catch (RepositoryException e) {
                e.printStackTrace();
            }
        });
        try {
            session.save();
        } catch (RepositoryException e) {
            e.printStackTrace();
        }
    }
}

enum AUTH_TYPES{
    VK,GMAIL,FACEBOOK;

    static AUTH_TYPES getAuthType(){
        return AUTH_TYPES.values()[(int) (Math.random()*3)];
    }
}

enum CITIES{
    gomel,vitebsk,grodno,minsk;

    static CITIES getCity(){
        return CITIES.values()[(int) (Math.random()*1)];
    }
}

enum NAMES{
    Августа, Агапия, Агафа, Агафия, Агафоклия, Агафоника, Аглаида, Агна, Агния, Агриппина,
    Валентина, Валерия, Варвара, Варсима, Василисса, Васса, Вевея, Вера, Вероника, Вивея,
    Гаафа, Гаиана, Гаиания, Гали, Галина, Глафира, Гликерия, Голиндуха, Горгония, Готия,
    Дамара, Дария, Дасия, Денеготия, Дигна, Дикторина, Динара, Домината, Домна, Домника,
    Мавра, Макария, Македония, Макрина, Малфефа, Мамелхва, Мамика, Мамфуса, Манефа;

    static NAMES getName(){
        return NAMES.values()[(int) (Math.random()*49)];
    }

}

enum SECOND_NAME{
    Абрамов,
    Авдеев,
            Агафонов,
    Аксёнов,
            Александров,
    Алексеев,
            Андреев,
    Анисимов,
            Антонов,
    Артемьев,
            Архипов,
    Афанасьев,
            Баранов,
    Белов,
            Белозёров,
    Белоусов,
            Беляев,
    Беляков,
            Беспалов,
    Бирюков,
            Блинов,
    Блохин,
            Бобров,
    Бобылёв,
            Богданов,
    Большаков,
            Борисов,
    Брагин,
            Буров,
    Быков,
    Васильев,
            Веселов,
    Виноградов,
            Вишняков,
    Владимиров,
            Власов,
    Волков,
            Воробьёв,
    Воронов,
            Воронцов,
    Гаврилов,
            Галкин,
    Герасимов,
            Голубев,
    Горбачёв,
            Горбунов,
    Гордеев,
            Горшков,
    Григорьев,
            Гришин,
    Громов,
            Гуляев,
    Гурьев,
            Гусев,
    Гущин,
            Давыдов,
    Данилов,
            Дементьев,
    Денисов,
            Дмитриев,
    Доронин,
            Дорофеев,
    Дроздов,
            Дьячков,
    Евдокимов,
            Евсеев,
    Егоров,
            Елисеев,
    Емельянов,
            Ермаков,
    Ершов,
            Ефимов,
    Ефремов,
            Жданов,
    Жуков,
            Журавлёв,
    Зайцев,
            Захаров,
    Зимин,
            Зиновьев,
    Зуев,
            Зыков,
    Иванков,
            Иванов,
    Игнатов,
            Игнатьев,
    Ильин,
            Исаев,
    Исаков,
            Кабанов,
    Казаков,
            Калашников,
    Калинин,
            Капустин;

    static SECOND_NAME getName(){
        return SECOND_NAME.values()[(int) (Math.random()*94)];
    }

    }

